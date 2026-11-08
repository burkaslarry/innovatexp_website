import { after, NextResponse } from "next/server";
import { getStripe } from "@/lib/commerce/stripe";
import { processStripeEvent } from "@/lib/commerce/events";
import { drainCommerceOutbox } from "@/lib/commerce/notifications";

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
  } catch {
    console.error("Stripe event processing failed", event.id, event.type);
    return NextResponse.json({ error: "Retry required" }, { status: 503 });
  }
  // The event is committed; email delivery must never make Stripe retry it. Cron re-drains missed jobs.
  try {
    after(() => drainCommerceOutbox().catch(() => console.error("Commerce outbox drain failed", event.id)));
  } catch {
    console.error("Commerce outbox drain not scheduled", event.id);
  }
  return NextResponse.json({ received: true });
}
