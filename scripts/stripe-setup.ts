/** Idempotent Stripe catalogue + webhook setup. Reads an ignored env file; never logs credentials or IDs. */
import { readFile, writeFile } from "node:fs/promises";
import Stripe from "stripe";
import { OFFERS, type OfferId } from "@/content/commerce";
import { CART_OFFERS } from "@/content/commerce-cart";
import { getInquiryCatalogItem, type InquiryCatalogItemId } from "@/content/inquiry-catalog";
import { offerPriceMatches, priceEnvName } from "@/lib/commerce/config";

const EVENTS: Stripe.WebhookEndpointCreateParams.EnabledEvent[] = [
  "checkout.session.completed", "checkout.session.async_payment_succeeded", "checkout.session.async_payment_failed",
  "checkout.session.expired", "charge.refunded", "customer.subscription.created", "customer.subscription.updated",
  "customer.subscription.deleted", "invoice.paid", "invoice.payment_failed",
];

/** Stripe product description = the website catalogue blurb for that offer. */
function offerDescription(offer: OfferId): string {
  const id = (Object.entries(CART_OFFERS).find(([, o]) => o === offer)?.[0] ?? "discoverySprint30Day") as InquiryCatalogItemId;
  const blurb = getInquiryCatalogItem(id)?.blurbEn;
  if (!blurb) throw new Error("Missing catalogue description");
  return blurb;
}

async function main() {
  const file = process.argv[2];
  const mode = process.env.STRIPE_MODE;
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  const site = process.env.SITE_URL?.trim();
  if (!file || (mode !== "test" && mode !== "live") || !key?.match(mode === "live" ? /^(sk|rk)_live_/ : /^(sk|rk)_test_/)) {
    console.log("Not connected. Put STRIPE_MODE and the matching secret key in the ignored env file. Never put it in chat or Git.");
    process.exitCode = 1;
    return;
  }
  const live = mode === "live";
  const stripe = new Stripe(key, { maxNetworkRetries: 2 });
  const settings: Record<string, string> = {};

  for (const offer of Object.keys(OFFERS) as OfferId[]) {
    const def = OFFERS[offer];
    let product: Stripe.Product | undefined;
    for await (const p of stripe.products.list({ active: true, limit: 100 })) {
      if (p.metadata.ixp_offer === offer && p.metadata.ixp_setup === "website") { product = p; break; }
    }
    const description = offerDescription(offer);
    product ??= await stripe.products.create({ name: def.name, description, metadata: { ixp_offer: offer, ixp_setup: "website" } },
      { idempotencyKey: `ixp-setup-${mode}-product-${offer}-v1` });
    if (product.name !== def.name || product.description !== description) {
      product = await stripe.products.update(product.id, { name: def.name, description });
      console.log(`${offer}: name/description synced with website`);
    }
    let price: Stripe.Price | undefined;
    const stale: Stripe.Price[] = [];
    for await (const p of stripe.prices.list({ product: product.id, active: true, limit: 100 })) {
      if (!price && offerPriceMatches(offer, p)) price = p; else stale.push(p);
    }
    price ??= await stripe.prices.create({
      product: product.id, currency: "hkd", unit_amount: def.amount, metadata: { ixp_offer: offer },
      ...(def.mode === "subscription" ? { recurring: { interval: "month" as const, interval_count: 1 } } : {}),
    }, { idempotencyKey: `ixp-setup-${mode}-price-${product.id}-${def.amount}-${def.mode}` });
    if (product.livemode !== live || price.livemode !== live || !offerPriceMatches(offer, price)) throw new Error("Unexpected setup environment");
    if (product.default_price !== price.id) await stripe.products.update(product.id, { default_price: price.id });
    for (const p of stale) await stripe.prices.update(p.id, { active: false });
    if (stale.length) console.log(`${offer}: archived ${stale.length} price(s) that no longer match the website`);
    settings[priceEnvName(offer)] = price.id;
    console.log(`${offer}: HKD ${def.amount / 100} ${def.mode === "subscription" ? "monthly" : "one-time"} ready`);
  }

  if (site?.startsWith("https://")) {
    const url = `${site.replace(/\/$/, "")}/api/stripe/webhook`;
    let existing: Stripe.WebhookEndpoint | undefined;
    for await (const w of stripe.webhookEndpoints.list({ limit: 100 })) if (w.url === url) { existing = w; break; }
    if (existing) {
      await stripe.webhookEndpoints.update(existing.id, { enabled_events: EVENTS, disabled: false });
      console.log("Webhook already exists; events updated. Its signing secret is only shown once, so keep the saved one or roll it in the Dashboard.");
    } else {
      const created = await stripe.webhookEndpoints.create({ url, enabled_events: EVENTS, description: "InnovateXP website cart" });
      if (created.livemode !== live || !created.secret?.startsWith("whsec_")) throw new Error("Unexpected webhook");
      settings.STRIPE_WEBHOOK_SECRET = created.secret;
      console.log("Webhook created for the site URL; signing secret saved locally.");
    }
  } else {
    console.log("SITE_URL is not https; webhook skipped (use a local listener for development).");
  }

  let config = await readFile(file, "utf8");
  for (const [name, value] of Object.entries(settings)) {
    const line = `${name}=${value}`;
    const re = new RegExp(`^${name}=.*$`, "m");
    config = re.test(config) ? config.replace(re, line) : `${config.replace(/\n?$/, "\n")}${line}\n`;
  }
  await writeFile(file, config, { mode: 0o600 });
  console.log(`Saved ${Object.keys(settings).length} settings to ${file}. Payments remain disabled.`);
}
main().catch((error) => {
  console.error(`Stripe setup failed (${error instanceof Stripe.errors.StripeError ? error.type : "local"}). No credentials are printed.`);
  process.exitCode = 1;
});
