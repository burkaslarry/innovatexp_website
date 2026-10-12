import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
import Stripe from "stripe";
import { createOrder, getOrder, recordPaymentEvent, saveIntake, createInvitation } from "@/lib/commerce/orders";
import { orderToken, verifyOrderToken } from "@/lib/commerce/tokens";
import { nextPaymentState, verifiedSession } from "@/lib/commerce/state";
import { offerPriceMatches, requirePayments } from "@/lib/commerce/config";
import { POST as webhook } from "@/app/api/stripe/webhook/route";
import { PURCHASE_POLICY_VERSION } from "@/content/commerce";
import { reserveCalendarBooking } from "@/lib/site-records";

const db = new PGlite();
before(async () => { await db.exec(await readFile("migrations/20261013-commerce.sql", "utf8")); });
after(() => db.close());
type Captured = { query: string; values: unknown[] };
const tag = (strings: TemplateStringsArray, ...values: unknown[]) => {
  const query = strings.reduce((s, v, i) => s + (i ? `$${i}` : "") + v, "");
  return { query, values, then: (resolve: (rows: unknown[]) => unknown, reject?: (e: unknown) => unknown) => db.query(query, values).then((r) => r.rows).then(resolve, reject) };
};
tag.transaction = async (queries: Captured[]) => db.transaction(async (tx) => {
  const results = [];
  for (const q of queries) results.push((await tx.query(q.query, q.values)).rows);
  return results;
});
const sql = tag as unknown as NonNullable<Parameters<typeof getOrder>[1]>;
const make = (id: string = randomUUID()) => createOrder({ id, offer: "snapshot", email: "buyer@example.test", locale: "en", live: false }, sql);

test("server prices preserve approved amounts and reject incompatible Stripe prices", () => {
  assert.equal(offerPriceMatches("snapshot", { active: true, unit_amount: 388000, currency: "hkd", recurring: null }), true);
  assert.equal(offerPriceMatches("discovery", { active: true, unit_amount: 688000, currency: "hkd", recurring: null }), true);
  assert.equal(offerPriceMatches("snapshot", { active: true, unit_amount: 300000, currency: "hkd" }), false);
  assert.equal(offerPriceMatches("snapshot", { active: true, unit_amount: 388000, currency: "usd" }), false);
  assert.equal(offerPriceMatches("snapshot", { active: true, unit_amount: 388000, currency: "hkd", recurring: { interval: "month", interval_count: 1 } }), false);
});

test("payment activation is closed until terms and live payment approval exist", () => {
  const prior = { ...process.env };
  try {
    delete process.env.PAYMENTS_ENABLED;
    assert.throws(requirePayments);
    process.env.PAYMENTS_ENABLED = "true"; process.env.PAYMENT_TERMS_APPROVED = PURCHASE_POLICY_VERSION;
    process.env.STRIPE_MODE = "live"; delete process.env.PAYMENTS_LIVE_APPROVED;
    assert.throws(requirePayments);
    process.env.STRIPE_MODE = "test"; assert.equal(requirePayments(), "test");
  } finally { process.env = prior; }
});

test("checkout retry creates one immutable order", async () => {
  const first = await make();
  await make(first.id);
  assert.equal((await db.query<{ n: number }>("SELECT count(*)::int AS n FROM commerce_orders WHERE id = $1", [first.id])).rows[0].n, 1);
  await assert.rejects(createOrder({ id: first.id, offer: "snapshot", email: "other@example.test", locale: "en", live: false }, sql));
});

test("reservation transaction rejects overlap, accepts adjacent slots and deduplicates retries", async () => {
  await db.exec(`CREATE TABLE calendar_bookings (id BIGSERIAL PRIMARY KEY, visitor_name TEXT, visitor_email TEXT,
    visitor_phone TEXT, visitor_company TEXT, starts_at TIMESTAMPTZ, ends_at TIMESTAMPTZ, message TEXT)`);
  const input = { name: "Test", email: "booking@example.test", phone: "", company: "Test", startsAt: "2026-10-14T02:00:00Z", endsAt: "2026-10-14T02:30:00Z", message: "" };
  const first = await reserveCalendarBooking(sql, input);
  assert.equal(first.ok, true);
  const duplicate = await reserveCalendarBooking(sql, input);
  assert.equal(duplicate.id, first.id);
  assert.equal(duplicate.duplicate, true);
  const conflict = await reserveCalendarBooking(sql, { ...input, email: "other@example.test", startsAt: "2026-10-14T02:15:00Z", endsAt: "2026-10-14T02:45:00Z" });
  assert.equal(conflict.conflict, true);
  assert.equal((await reserveCalendarBooking(sql, { ...input, startsAt: "2026-10-14T02:30:00Z", endsAt: "2026-10-14T03:00:00Z" })).ok, true);
});

test("custom checkout needs a scoped invitation and cannot reuse it for a second order", async () => {
  const args = { id: randomUUID(), offer: "discovery" as const, email: "buyer@example.test", locale: "en" as const, live: false };
  await assert.rejects(createOrder(args, sql));
  const invitation = await createInvitation("discovery", args.email, "Approved one-workflow scope with acceptance criteria", sql);
  await assert.rejects(createOrder({ ...args, email: "other@example.test", invitation }, sql));
  const order = await createOrder({ ...args, invitation }, sql);
  assert.equal(order.amount, 688000);
  await assert.rejects(createOrder({ ...args, id: randomUUID(), invitation }, sql));
});

test("duplicate paid events create one work item and delayed events cannot undo a refund", async () => {
  const order = await make();
  const paid = { eventId: `evt_${randomUUID()}`, type: "checkout.session.completed", created: 1, orderId: order.id, state: "paid" as const };
  await recordPaymentEvent(paid, sql); await recordPaymentEvent(paid, sql);
  assert.equal((await db.query<{ n: number }>("SELECT count(*)::int AS n FROM commerce_outbox WHERE order_id = $1", [order.id])).rows[0].n, 1);
  await recordPaymentEvent({ ...paid, eventId: `evt_${randomUUID()}`, state: "refunded" }, sql);
  await recordPaymentEvent(paid, sql);
  assert.equal((await getOrder(order.id, sql))?.payment_state, "refunded");
});

test("payment transaction rolls back receipt and status if durable work cannot be inserted", async () => {
  const order = await make();
  const eventId = `evt_${randomUUID()}`;
  await db.exec("ALTER TABLE commerce_outbox RENAME TO temporarily_unavailable_outbox");
  try {
    await assert.rejects(recordPaymentEvent({ eventId, type: "checkout.session.completed", created: 1, orderId: order.id, state: "paid" }, sql));
    assert.equal((await getOrder(order.id, sql))?.payment_state, "pending");
    assert.equal((await db.query<{ n: number }>("SELECT count(*)::int AS n FROM commerce_events WHERE id = $1", [eventId])).rows[0].n, 0);
  } finally { await db.exec("ALTER TABLE temporarily_unavailable_outbox RENAME TO commerce_outbox"); }
});

test("intake rejects unpaid access and retries preserve the first submission with one notification", async () => {
  let order = await make();
  const intake = { company: "Test company", workflow: "A slow quote approval workflow", timezone: "Europe/Berlin" };
  await assert.rejects(saveIntake(order, intake, sql));
  await recordPaymentEvent({ eventId: `evt_${randomUUID()}`, type: "checkout.session.completed", created: 1, orderId: order.id, state: "paid" }, sql);
  order = (await getOrder(order.id, sql))!;
  await saveIntake(order, intake, sql); await saveIntake(order, { ...intake, workflow: "Changed" }, sql);
  assert.equal((await getOrder(order.id, sql))?.intake?.workflow, intake.workflow);
  assert.equal((await db.query<{ n: number }>("SELECT count(*)::int AS n FROM commerce_outbox WHERE order_id = $1 AND kind = 'intake'", [order.id])).rows[0].n, 1);
});

test("order tokens reject tampering, expiration and wrong secrets", () => {
  const old = process.env.INTAKE_TOKEN_SECRET; process.env.INTAKE_TOKEN_SECRET = "a".repeat(40);
  try {
    const id = randomUUID(); const expires = Date.now() + 60000; const token = orderToken(id, expires);
    assert.equal(verifyOrderToken(token), id); assert.equal(verifyOrderToken(token, expires + 1), null);
    assert.equal(verifyOrderToken(token.replace(id, randomUUID())), null);
    process.env.INTAKE_TOKEN_SECRET = "b".repeat(40); assert.equal(verifyOrderToken(token), null);
  } finally { if (old) process.env.INTAKE_TOKEN_SECRET = old; else delete process.env.INTAKE_TOKEN_SECRET; }
});

test("payment proof excludes unpaid sessions, wrong totals and the wrong environment", () => {
  const session = { mode: "payment", payment_status: "paid", amount_total: 388000, currency: "hkd", livemode: false };
  assert.equal(verifiedSession("snapshot", session, false), true);
  assert.equal(verifiedSession("snapshot", { ...session, payment_status: "unpaid" }, false), false);
  assert.equal(verifiedSession("snapshot", { ...session, amount_total: 300000 }, false), false);
  assert.equal(verifiedSession("snapshot", session, true), false);
  assert.equal(nextPaymentState("paid", "failed"), "paid");
  assert.equal(nextPaymentState("partially_refunded", "paid"), "partially_refunded");
});

test("webhook verifies exact raw bytes and rejects altered or unsigned payloads", async () => {
  const prior = { ...process.env };
  process.env.STRIPE_MODE = "test"; process.env.STRIPE_SECRET_KEY = "sk_test_placeholder";
  process.env.STRIPE_WEBHOOK_SECRET = "whsec_test_secret";
  const payload = JSON.stringify({ id: "evt_unknown", object: "event", type: "test.unknown", livemode: false, created: 1, data: { object: {} } });
  const signature = Stripe.webhooks.generateTestHeaderString({ payload, secret: process.env.STRIPE_WEBHOOK_SECRET });
  const request = (body: string, sig?: string) => new Request("https://example.test/api/stripe/webhook", { method: "POST", body, headers: sig ? { "stripe-signature": sig } : {} });
  try {
    assert.equal((await webhook(request(payload, signature))).status, 200);
    assert.equal((await webhook(request(payload + " ", signature))).status, 400);
    assert.equal((await webhook(request(payload))).status, 400);
  } finally { process.env = prior; }
});
