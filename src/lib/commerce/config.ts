import { OFFERS, PURCHASE_POLICY_VERSION, type OfferId } from "@/content/commerce";

export function paymentMode(): "test" | "live" {
  const mode = process.env.STRIPE_MODE;
  if (mode !== "test" && mode !== "live") throw new Error("Payment mode not configured");
  if (mode === "live" && process.env.PAYMENTS_LIVE_APPROVED !== "true") throw new Error("Live payments are not approved");
  return mode;
}
export function paymentsEnabled(): boolean {
  return process.env.PAYMENTS_ENABLED === "true" && process.env.PAYMENT_TERMS_APPROVED === PURCHASE_POLICY_VERSION;
}
export function requirePayments() {
  if (!paymentsEnabled()) throw new Error("Payments disabled");
  return paymentMode();
}
export function priceId(offer: OfferId): string {
  const id = process.env[`STRIPE_PRICE_${offer.replace(/([A-Z])/g, "_$1").toUpperCase()}`]?.trim();
  if (!id?.startsWith("price_")) throw new Error("Offer price not configured");
  return id;
}
export function snapshotCheckoutAvailable(): boolean {
  try {
    requirePayments(); priceId("snapshot");
    return Boolean(process.env.STRIPE_SECRET_KEY && process.env.DATABASE_URL && process.env.INTAKE_TOKEN_SECRET);
  } catch { return false; }
}
export function offerPriceMatches(offer: OfferId, price: { unit_amount: number | null; currency: string; recurring?: { interval: string; interval_count: number } | null; active: boolean }) {
  return price.active && price.unit_amount === OFFERS[offer].amount && price.currency === "hkd" &&
    (OFFERS[offer].mode === "subscription" ? price.recurring?.interval === "month" && price.recurring.interval_count === 1 : !price.recurring);
}
