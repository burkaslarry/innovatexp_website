/** Sandbox-only setup. Reads ignored local settings; never logs credentials. */
import { readFile, writeFile } from "node:fs/promises";
import Stripe from "stripe";
import { OFFERS } from "@/content/commerce";
import { offerPriceMatches } from "@/lib/commerce/config";

async function main() {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (process.env.STRIPE_MODE !== "test" || !key?.startsWith("sk_test_")) {
    console.log("Not connected yet. Add your Sandbox sk_test key to the ignored .env.stripe.local file. Never put it in chat or Git.");
    process.exitCode = 1;
    return;
  }
  const stripe = new Stripe(key, { maxNetworkRetries: 2 });
  let product: Stripe.Product | undefined;
  for await (const existing of stripe.products.list({ active: true, limit: 100 })) {
    if (existing.metadata.ixp_offer === "snapshot" && existing.metadata.ixp_setup === "website") { product = existing; break; }
  }
  product ??= await stripe.products.create({
    name: OFFERS.snapshot.name,
    description: "One-workflow diagnosis: interview, one-page scorecard and next-step recommendation. Implementation excluded.",
    metadata: { ixp_offer: "snapshot", ixp_setup: "website" },
  }, { idempotencyKey: "ixp-setup-snapshot-product-test-v1" });
  let price: Stripe.Price | undefined;
  for await (const existing of stripe.prices.list({ product: product.id, active: true, limit: 100 })) {
    if (offerPriceMatches("snapshot", existing)) { price = existing; break; }
  }
  price ??= await stripe.prices.create({
    product: product.id, currency: "hkd", unit_amount: OFFERS.snapshot.amount,
    metadata: { ixp_offer: "snapshot" },
  }, { idempotencyKey: `ixp-setup-snapshot-price-test-${product.id}-${OFFERS.snapshot.amount}` });
  if (product.livemode || price.livemode || !offerPriceMatches("snapshot", price)) throw new Error("Unexpected setup environment");
  const file = ".env.stripe.local";
  let config = await readFile(file, "utf8");
  const setting = `STRIPE_PRICE_SNAPSHOT=${price.id}`;
  config = /^STRIPE_PRICE_SNAPSHOT=.*$/m.test(config) ? config.replace(/^STRIPE_PRICE_SNAPSHOT=.*$/m, setting) : `${config}\n${setting}\n`;
  await writeFile(file, config, { mode: 0o600 });
  console.log("Snapshot Sandbox product and HKD 3,880 one-time price are ready. Price ID saved locally. Payments remain disabled.");
}
main().catch(() => { console.error("Sandbox setup failed. Check account access and local settings; no credentials are printed."); process.exitCode = 1; });
