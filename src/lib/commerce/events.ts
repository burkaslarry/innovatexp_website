import type Stripe from "stripe";
import { isOfferId } from "@/content/commerce";
import { getStripe } from "./stripe";
import { commerceSql, getOrder, recordPaymentEvent } from "./orders";
import { verifiedSession } from "./state";
import { paymentMode } from "./config";
import { attachCartSession, getCart, getCartOrders, verifyCartSession, type CartCheckout } from "./cart";

type EventDependencies = { stripe?: Stripe; sql?: ReturnType<typeof commerceSql> };

const idOf = (v: string | { id: string } | null | undefined) => typeof v === "string" ? v : v?.id ?? null;

export async function processStripeEvent(event: Stripe.Event, dependencies: EventDependencies = {}) {
  const stripe = dependencies.stripe ?? getStripe();
  const sql = dependencies.sql;
  const live = paymentMode() === "live";
  if (event.livemode !== live) throw new Error("Webhook mode mismatch");
  if (event.type.startsWith("checkout.session.")) {
    const payload = event.data.object as Stripe.Checkout.Session;
    if (payload.metadata?.checkout_id) {
      const cart = await getCart(payload.metadata.checkout_id, sql);
      if (!cart) throw new Error("Checkout not found");
      const session = await stripe.checkout.sessions.retrieve(payload.id, { expand: ["line_items"] });
      if (session.id !== payload.id) throw new Error("Checkout mismatch");
      verifyCartSession(cart, session, live);
      const orders = await getCartOrders(cart, sql);
      if (session.subscription) {
        const sub = await stripe.subscriptions.retrieve(idOf(session.subscription)!);
        if (cart.mode !== "subscription" || sub.metadata.checkout_id !== cart.id || sub.metadata.order_id !== orders[0].id || sub.livemode !== live) {
          throw new Error("Cart subscription mismatch");
        }
      } else if (cart.mode === "subscription" && session.payment_status === "paid") throw new Error("Cart subscription missing");
      // Every item and payment detail has been checked before any order changes.
      await attachCartSession(cart.id, session.id, sql);
      for (const order of orders) await recordPaymentEvent({ eventId: event.id, type: event.type, created: event.created, orderId: order.id,
        state: session.payment_status === "paid" && session.status === "complete" ? "paid" :
          session.status === "expired" || event.type === "checkout.session.async_payment_failed" ? "failed" : "pending",
        paymentIntent: idOf(session.payment_intent), customer: idOf(session.customer), subscription: idOf(session.subscription),
      }, sql);
      if (session.subscription) await syncSubscription(idOf(session.subscription)!, event.created, dependencies);
      return;
    }
    if (!payload.metadata?.order_id) return;
    const order = await getOrder(payload.metadata.order_id, sql);
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
    }, sql);
    if (session.subscription) await syncSubscription(idOf(session.subscription)!, event.created, dependencies);
  } else if (event.type === "charge.refunded") {
    const payload = event.data.object as Stripe.Charge;
    const charge = await stripe.charges.retrieve(payload.id);
    const pi = idOf(charge.payment_intent);
    if (!pi || !charge.amount_refunded) return;
    const payment = await stripe.paymentIntents.retrieve(pi);
    let link: { checkout_id?: string; order_id?: string } = payment.metadata;
    if (!link.checkout_id && !link.order_id) link = await subscriptionLink(stripe, pi, live) ?? {};
    let cart: CartCheckout | null = null;
    if (link.checkout_id) {
      cart = await getCart(link.checkout_id, sql);
      if (!cart) throw new Error("Refund checkout not found");
    }
    if (cart) {
      if (cart.livemode !== live || payment.livemode !== live || charge.livemode !== live ||
        payment.currency !== cart.currency || charge.currency !== cart.currency || payment.amount !== cart.amount ||
        charge.amount !== cart.amount || !Number.isSafeInteger(charge.amount_refunded) ||
        charge.amount_refunded < 1 || charge.amount_refunded > charge.amount) throw new Error("Cart refund mismatch");
      const orders = await getCartOrders(cart, sql);
      // A group refund cannot safely be allocated to individual services. All require review.
      for (const order of orders) await recordPaymentEvent({ eventId: event.id, type: event.type, created: event.created, orderId: order.id,
        state: charge.amount_refunded === charge.amount ? "refunded" : "partially_refunded", paymentIntent: pi }, sql);
      return;
    }
    const orderId = link.order_id;
    if (!orderId) return;
    const order = await getOrder(orderId, sql);
    if (!order || order.payment_state === "refunded") return;
    if (payment.livemode !== live || payment.currency !== order.currency || payment.amount !== order.amount) throw new Error("Refund mismatch");
    await recordPaymentEvent({ eventId: event.id, type: event.type, created: event.created, orderId,
      state: charge.amount_refunded >= charge.amount ? "refunded" : "partially_refunded", paymentIntent: pi }, sql);
  } else if (event.type.startsWith("customer.subscription.")) {
    await syncSubscription((event.data.object as Stripe.Subscription).id, event.created, dependencies);
  } else if (event.type === "invoice.paid" || event.type === "invoice.payment_failed") {
    const invoice = event.data.object as Stripe.Invoice;
    const subscription = invoice.parent?.subscription_details?.subscription;
    if (subscription) await syncSubscription(idOf(subscription)!, event.created, dependencies);
  }
}

// Subscription PaymentIntents carry no metadata; the link lives on the subscription behind the invoice.
async function subscriptionLink(stripe: Stripe, pi: string, live: boolean) {
  const payments = await stripe.invoicePayments.list({ payment: { type: "payment_intent", payment_intent: pi }, limit: 1, expand: ["data.invoice"] });
  const invoicePayment = payments.data[0];
  if (!invoicePayment) return null;
  const invoice = typeof invoicePayment.invoice === "string" ? await stripe.invoices.retrieve(invoicePayment.invoice) : invoicePayment.invoice;
  if ("deleted" in invoice) return null;
  const subscription = idOf(invoice.parent?.subscription_details?.subscription);
  if (!subscription) return null;
  const sub = await stripe.subscriptions.retrieve(subscription);
  if (invoicePayment.livemode !== live || invoice.livemode !== live || sub.livemode !== live) throw new Error("Refund subscription mismatch");
  return sub.metadata.checkout_id || sub.metadata.order_id ? { checkout_id: sub.metadata.checkout_id, order_id: sub.metadata.order_id } : null;
}

export async function reconcileOrder(orderId: string, dependencies: EventDependencies = {}) {
  if (!/^[a-f0-9-]{36}$/.test(orderId)) throw new Error("Order required");
  const rows = await (dependencies.sql ?? commerceSql())`SELECT COALESCE(c.checkout_session, o.checkout_session) AS session
    FROM innovatexp_website_commerce_orders o LEFT JOIN innovatexp_website_commerce_checkouts c ON c.id = o.checkout_id WHERE o.id = ${orderId}::uuid`;
  const sessionId = rows[0]?.session as string | undefined;
  if (!sessionId) throw new Error("Checkout not found");
  const session = await (dependencies.stripe ?? getStripe()).checkout.sessions.retrieve(sessionId);
  await processStripeEvent({ id: `reconcile_${session.id}_${Date.now()}`, object: "event", api_version: null, pending_webhooks: 0, request: null,
    type: "checkout.session.completed", created: Math.floor(Date.now() / 1000), livemode: session.livemode, data: { object: session } } as Stripe.Event, dependencies);
}

export async function syncSubscription(id: string, eventCreated: number, dependencies: EventDependencies = {}) {
  const sub = await (dependencies.stripe ?? getStripe()).subscriptions.retrieve(id);
  const orderId = sub.metadata.order_id;
  if (!orderId) return;
  const order = await getOrder(orderId, dependencies.sql);
  if (!order || sub.livemode !== order.livemode) throw new Error("Subscription mismatch");
  await (dependencies.sql ?? commerceSql())`UPDATE innovatexp_website_commerce_orders SET subscription = ${sub.id}, customer = ${idOf(sub.customer)},
    subscription_status = CASE WHEN subscription_status = 'canceled' THEN 'canceled' ELSE ${sub.status} END,
    stripe_event_created = ${eventCreated}, updated_at = NOW() WHERE id = ${order.id}::uuid AND stripe_event_created <= ${eventCreated}`;
}
