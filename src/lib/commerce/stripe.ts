import Stripe from "stripe";
import { paymentMode } from "./config";

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  const mode = paymentMode();
  if (!key || !key.startsWith(mode === "test" ? "sk_test_" : "sk_live_")) throw new Error("Stripe key/mode mismatch");
  return new Stripe(key, { maxNetworkRetries: 2 });
}
