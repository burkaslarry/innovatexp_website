import type Stripe from "stripe";
import { isOfferId } from "@/content/commerce";
import { getStripe } from "./stripe";
import { commerceSql, getOrder, recordPaymentEvent } from "./orders";
import { verifiedSession } from "./state";
import { paymentMode } from "./config";

const idOf = (v: string | { id: string } | null | undefined) => typeof v === "string" ? v : v?.id ?? null;

export async function processStripeEvent(event: Stripe.Event) {
  const stripe = getStripe();
  const live = paymentMode() === "live";
  if (event.livemode !== live) throw new Error("Webhook mode mismatch");
  if (event.type.startsWith("checkout.session.")) {
    const payload = event.data.object as Stripe.Checkout.Session;
    if (!payload.metadata?.order_id) return;
    const order = await getOrder(payload.metadata.order_id);
    if (!order || !isOfferId(order.offer) || order.livemode !== live) throw new Error("Order not found");
    if (order.checkout_session && order.checkout_session !== payload.id) throw new Error("Checkout mismatch");
    // Resolve current state rather than trusting an older event snapshot.
    const session = await stripe.checkout.sessions.retrieve(payload.id, { expand: ["line_items"] });
    if (session.client_reference_id !== order.id || session.metadata?.offer !== order.offer ||
      session.currency !== order.currency || session.amount_total !== order.amount ||
      session.customer_details?.email?.toLowerCase() !== order.email) throw new Error("Payment details mismatch");
    const paid = verifiedSession(order.offer, session, live);
    await recordPaymentEvent({ eventId: event.id, type: event.type, created: event.created, orderId: order.id,
      state: paid ? "paid" : session.status === "expired" || event.type === "checkout.session.async_payment_failed" ? "failed" : "pending",
      paymentIntent: idOf(session.payment_intent), customer: idOf(session.customer), subscription: idOf(session.subscription),
    });
    if (session.subscription) await syncSubscription(idOf(session.subscription)!, event.created);
  } else if (event.type === "charge.refunded") {
    const payload = event.data.object as Stripe.Charge;
    const charge = await stripe.charges.retrieve(payload.id);
    const pi = idOf(charge.payment_intent);
    if (!pi || !charge.amount_refunded) return;
    const payment = await stripe.paymentIntents.retrieve(pi);
    const orderId = payment.metadata.order_id;
    if (!orderId) return;
    const order = await getOrder(orderId);
    if (!order || order.payment_state === "refunded") return;
    if (payment.livemode !== live || payment.currency !== order.currency || payment.amount !== order.amount) throw new Error("Refund mismatch");
    await recordPaymentEvent({ eventId: event.id, type: event.type, created: event.created, orderId,
      state: charge.amount_refunded >= charge.amount ? "refunded" : "partially_refunded", paymentIntent: pi });
  } else if (event.type.startsWith("customer.subscription.")) {
    await syncSubscription((event.data.object as Stripe.Subscription).id, event.created);
  } else if (event.type === "invoice.paid" || event.type === "invoice.payment_failed") {
    const invoice = event.data.object as Stripe.Invoice;
    const subscription = invoice.parent?.subscription_details?.subscription;
    if (subscription) await syncSubscription(idOf(subscription)!, event.created);
  }
}

export async function syncSubscription(id: string, eventCreated: number) {
  const sub = await getStripe().subscriptions.retrieve(id);
  const orderId = sub.metadata.order_id;
  if (!orderId) return;
  const order = await getOrder(orderId);
  if (!order || sub.livemode !== order.livemode) throw new Error("Subscription mismatch");
  await commerceSql()`UPDATE commerce_orders SET subscription = ${sub.id}, customer = ${idOf(sub.customer)},
    subscription_status = CASE WHEN subscription_status = 'canceled' THEN 'canceled' ELSE ${sub.status} END,
    stripe_event_created = ${eventCreated}, updated_at = NOW() WHERE id = ${order.id}::uuid AND stripe_event_created <= ${eventCreated}`;
}
