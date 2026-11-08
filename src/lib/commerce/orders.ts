import { createHash, randomUUID } from "node:crypto";
import { neon } from "@neondatabase/serverless";
import { OFFERS, PURCHASE_POLICY_VERSION, type OfferId } from "@/content/commerce";
import type { AppLocale } from "@/lib/i18n-routing";
import type { PaymentState } from "./state";

export type Order = {
  id: string; offer: OfferId; locale: AppLocale; email: string; amount: number; currency: string;
  livemode: boolean; payment_state: PaymentState; checkout_session: string | null;
  customer: string | null; subscription: string | null; subscription_status: string | null;
  access_expires_at: string; intake: Record<string, string> | null;
};
export function commerceSql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("Order database not configured");
  return neon(url);
}
export async function getOrder(id: string, sql = commerceSql()): Promise<Order | null> {
  const rows = await sql`SELECT * FROM commerce_orders WHERE id = ${id}::uuid`;
  return (rows[0] as unknown as Order) ?? null;
}
export function tokenHash(token: string) { return createHash("sha256").update(token).digest("hex"); }

export async function createOrder(input: { id: string; offer: OfferId; email: string; locale: AppLocale; live: boolean; invitation?: string }, sql = commerceSql()) {
  const offer = OFFERS[input.offer];
  const expires = new Date(Date.now() + 30 * 86400_000).toISOString();
  if (offer.qualification) {
    if (!input.invitation || !/^[a-f0-9]{64}$/.test(input.invitation)) throw new Error("Qualification required");
    const rows = await sql`
      WITH eligible AS (
        UPDATE commerce_invitations SET order_id = ${input.id}::uuid
        WHERE token_hash = ${tokenHash(input.invitation)} AND offer = ${input.offer}
          AND lower(email) = ${input.email} AND expires_at > NOW() AND (order_id IS NULL OR order_id = ${input.id}::uuid)
        RETURNING offer
      )
      INSERT INTO commerce_orders (id, offer, locale, email, amount, policy_version, livemode, access_expires_at)
      SELECT ${input.id}::uuid, ${input.offer}, ${input.locale}, ${input.email}, ${offer.amount}, ${PURCHASE_POLICY_VERSION}, ${input.live}, ${expires}::timestamptz
      FROM eligible ON CONFLICT (id) DO NOTHING RETURNING id
    `;
    // Invitation and order are linked atomically. A deferred FK permits the CTE's insert.
    if (!rows.length) {
      const prior = await getOrder(input.id, sql);
      if (!prior || prior.offer !== input.offer || prior.email !== input.email || prior.livemode !== input.live) throw new Error("Invalid invitation");
    }
  } else {
    await sql`INSERT INTO commerce_orders (id, offer, locale, email, amount, policy_version, livemode, access_expires_at)
      VALUES (${input.id}::uuid, ${input.offer}, ${input.locale}, ${input.email}, ${offer.amount}, ${PURCHASE_POLICY_VERSION}, ${input.live}, ${expires}::timestamptz)
      ON CONFLICT (id) DO NOTHING`;
  }
  const order = await getOrder(input.id, sql);
  if (!order || order.offer !== input.offer || order.email !== input.email || order.locale !== input.locale || order.livemode !== input.live || order.amount !== offer.amount) throw new Error("Checkout retry mismatch");
  return order;
}

export async function attachSession(id: string, session: string) {
  await commerceSql()`UPDATE commerce_orders SET checkout_session = ${session}, updated_at = NOW()
    WHERE id = ${id}::uuid AND (checkout_session IS NULL OR checkout_session = ${session})`;
}

export async function recordPaymentEvent(input: {
  eventId: string; type: string; created: number; orderId: string; state: PaymentState;
  paymentIntent?: string | null; customer?: string | null; subscription?: string | null;
}, sql = commerceSql()) {
  // Receipt, state transition and work item commit together. A crash before commit is retryable.
  await sql.transaction([
    sql`INSERT INTO commerce_events (id, type, created) VALUES (${input.eventId}, ${input.type}, ${input.created}) ON CONFLICT DO NOTHING`,
    sql`UPDATE commerce_orders SET
      payment_state = CASE
        WHEN payment_state = 'refunded' THEN 'refunded'
        WHEN ${input.state} = 'refunded' THEN 'refunded'
        WHEN payment_state = 'partially_refunded' THEN 'partially_refunded'
        WHEN ${input.state} = 'partially_refunded' THEN 'partially_refunded'
        WHEN payment_state = 'paid' AND ${input.state} IN ('pending', 'failed') THEN 'paid'
        ELSE ${input.state} END,
      fulfillment_state = CASE WHEN ${input.state} IN ('refunded', 'partially_refunded') THEN 'review_required'
        WHEN ${input.state} = 'paid' AND fulfillment_state = 'awaiting_payment' THEN 'ready' ELSE fulfillment_state END,
      payment_intent = COALESCE(${input.paymentIntent ?? null}, payment_intent),
      customer = COALESCE(${input.customer ?? null}, customer), subscription = COALESCE(${input.subscription ?? null}, subscription), updated_at = NOW()
      WHERE id = ${input.orderId}::uuid`,
    sql`INSERT INTO commerce_outbox (order_id, kind)
      SELECT id, 'paid' FROM commerce_orders WHERE id = ${input.orderId}::uuid AND payment_state = 'paid'
      ON CONFLICT (order_id, kind) DO NOTHING`,
  ]);
}

export async function saveIntake(order: Order, input: Record<string, string>, sql = commerceSql()) {
  const results = await sql.transaction([sql`UPDATE commerce_orders SET intake = ${JSON.stringify(input)}::jsonb,
      fulfillment_state = 'intake_received', updated_at = NOW()
    WHERE id = ${order.id}::uuid AND payment_state = 'paid' AND access_expires_at > NOW() AND intake IS NULL RETURNING id`,
    sql`INSERT INTO commerce_outbox (order_id, kind) SELECT id, 'intake' FROM commerce_orders
      WHERE id = ${order.id}::uuid AND payment_state = 'paid' AND intake IS NOT NULL AND access_expires_at > NOW()
      ON CONFLICT (order_id, kind) DO NOTHING`]);
  if (!results[0].length) {
    const current = await getOrder(order.id, sql);
    if (!current?.intake || current.payment_state !== "paid") throw new Error("Intake unavailable");
  }
}

export async function createInvitation(offer: OfferId, email: string, scope: string, sql = commerceSql()) {
  if (!OFFERS[offer].qualification || !scope.trim()) throw new Error("Qualified scope required");
  const token = createHash("sha256").update(randomUUID()).update(randomUUID()).digest("hex");
  await sql`INSERT INTO commerce_invitations (token_hash, offer, email, scope, expires_at)
    VALUES (${tokenHash(token)}, ${offer}, ${email.toLowerCase().trim()}, ${scope}, NOW() + INTERVAL '7 days')`;
  return token;
}
