import { OFFERS, type OfferId } from "@/content/commerce";

export type PaymentState = "pending" | "paid" | "failed" | "partially_refunded" | "refunded";
export function nextPaymentState(current: PaymentState, incoming: PaymentState): PaymentState {
  if (current === "refunded") return current;
  if (incoming === "refunded") return incoming;
  if (current === "partially_refunded" && incoming !== "partially_refunded") return current;
  if (current === "paid" && (incoming === "failed" || incoming === "pending")) return current;
  return incoming;
}
export function verifiedSession(offer: OfferId, session: { mode: string | null; payment_status: string; currency: string | null; amount_total: number | null; livemode: boolean }, live: boolean) {
  return session.mode === OFFERS[offer].mode && session.payment_status === "paid" &&
    session.currency === "hkd" && session.amount_total === OFFERS[offer].amount && session.livemode === live;
}
