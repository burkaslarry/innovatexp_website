import Stripe from "stripe";
import { paymentMode, stripeKeyMatchesMode } from "./config";

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!stripeKeyMatchesMode(key, paymentMode())) throw new Error("Stripe key/mode mismatch");
  return new Stripe(key, { maxNetworkRetries: 2 });
}
