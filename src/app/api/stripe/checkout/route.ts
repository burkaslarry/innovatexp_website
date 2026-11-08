import { NextResponse } from "next/server";
import { OFFERS, PURCHASE_POLICY_VERSION, isOfferId, type OfferId } from "@/content/commerce";
import { isValidLocale } from "@/lib/i18n-routing";
import { getSiteUrl } from "@/lib/site-url";
import { enforceFormSubmissionLimit } from "@/lib/form-submission-limit";
import { requireOfferPayments, priceId, offerPriceMatches } from "@/lib/commerce/config";
import { getStripe } from "@/lib/commerce/stripe";
import { attachSession, createOrder } from "@/lib/commerce/orders";
import { setOrderCookie } from "@/lib/commerce/access";
import { orderToken } from "@/lib/commerce/tokens";

export const runtime = "nodejs";
export async function POST(req: Request) {
  try {
    const site = new URL(getSiteUrl()).origin;
    if (req.headers.get("origin") !== site) return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
    if (Number(req.headers.get("content-length") || 0) > 4096) return NextResponse.json({ error: "Request too large" }, { status: 413 });
    const b = await req.json();
    if (!isOfferId(b.offer) || !isValidLocale(b.locale) || b.policyVersion !== PURCHASE_POLICY_VERSION || b.acceptTerms !== true ||
      typeof b.email !== "string" || b.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) ||
      typeof b.requestId !== "string" || !/^[a-f0-9-]{36}$/.test(b.requestId)) return NextResponse.json({ error: "Invalid checkout request" }, { status: 400 });
    const offer = b.offer as OfferId;
    const mode = requireOfferPayments(offer);
    const blocked = await enforceFormSubmissionLimit(req);
    if (blocked) return blocked;
    const stripe = getStripe();
    const price = await stripe.prices.retrieve(priceId(b.offer));
    if (price.livemode !== (mode === "live") || !offerPriceMatches(b.offer, price)) throw new Error("Price configuration mismatch");
    const order = await createOrder({ id: b.requestId, offer: b.offer, locale: b.locale, email: b.email.trim().toLowerCase(), live: mode === "live", invitation: b.invitation });
    if (order.payment_state !== "pending") return NextResponse.json({ error: "Order already processed" }, { status: 409 });
    const session = order.checkout_session ? await stripe.checkout.sessions.retrieve(order.checkout_session) : await stripe.checkout.sessions.create({
      mode: OFFERS[offer].mode, customer_email: order.email,
      ...(OFFERS[offer].mode === "payment" ? { customer_creation: "always" as const, payment_intent_data: { metadata: { order_id: order.id } } } : { subscription_data: { metadata: { order_id: order.id } } }),
      client_reference_id: order.id, metadata: { order_id: order.id, offer: b.offer, policy_version: PURCHASE_POLICY_VERSION },
      line_items: [{ price: price.id, quantity: 1 }],
      consent_collection: { terms_of_service: "required" },
      locale: b.locale === "zh-hk" || b.locale === "zh-tw" ? "zh-HK" : b.locale,
      success_url: `${site}/${b.locale}/checkout/success`, cancel_url: `${site}/${b.locale}/checkout/cancel`,
    }, { idempotencyKey: `checkout:${order.id}` });
    if (!session.url || session.status !== "open") return NextResponse.json({ error: "Checkout expired; start a new order" }, { status: 409 });
    await attachSession(order.id, session.id);
    await setOrderCookie(orderToken(order.id, new Date(order.access_expires_at).getTime()));
    return NextResponse.json({ url: session.url }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Checkout unavailable", error instanceof Error ? error.name : "Error");
    return NextResponse.json({ error: "Payment temporarily unavailable" }, { status: 503 });
  }
}
