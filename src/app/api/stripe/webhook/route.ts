import { NextResponse } from "next/server";
import { getStripe } from "@/lib/commerce/stripe";
import { processStripeEvent } from "@/lib/commerce/events";

export const runtime = "nodejs";
export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: "Webhook unavailable" }, { status: 503 });
  const body = Buffer.from(await req.arrayBuffer());
  if (body.length > 1_000_000) return NextResponse.json({ error: "Request too large" }, { status: 413 });
  let event;
  try {
    event = getStripe().webhooks.constructEvent(body, req.headers.get("stripe-signature") || "", secret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }
  try {
    await processStripeEvent(event);
    // Email delivery is durable work, retried separately; it cannot fail the payment transaction.
    return NextResponse.json({ received: true });
  } catch {
    console.error("Stripe event processing failed", event.id, event.type);
    return NextResponse.json({ error: "Retry required" }, { status: 503 });
  }
}
