import "next/dist/server/node-environment-baseline";
import { test, before, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import { createHmac, randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
import { setTestDatabase } from "@/lib/db";
import type Stripe from "stripe";
import { NextRequest } from "next/server";
import { workAsyncStorage } from "next/dist/server/app-render/work-async-storage.external";
import { workUnitAsyncStorage } from "next/dist/server/app-render/work-unit-async-storage.external";
import { createRequestStoreForAPI } from "next/dist/server/async-storage/request-store";
import { CART_OFFERS, getCartOffer, MAX_CART_ITEMS, type CartCheckoutItem } from "@/content/commerce-cart";
import { INQUIRY_CATALOG } from "@/content/inquiry-catalog";
import { OFFERS, PURCHASE_POLICY_VERSION, type OfferId } from "@/content/commerce";
import { cartAvailableOffers } from "@/lib/commerce/config";
import { createInvitation, createOrder, getOrder, recordPaymentEvent, tokenHash } from "@/lib/commerce/orders";
import { CART_COOKIE, CartError, attachCartSession, cartForToken, createCart, getCart, getCartOrders, getCartStatus,
  normalizeCartRequest, setCartCookie, startCartCheckout, type CartCheckout } from "@/lib/commerce/cart";
import { processStripeEvent, reconcileOrder } from "@/lib/commerce/events";
import { cartToken, orderToken, verifyCartToken, verifyOrderToken } from "@/lib/commerce/tokens";
import { GET as availability, POST as checkout } from "@/app/api/stripe/cart/route";
import { GET as status } from "@/app/api/commerce/cart-status/route";

const db = new PGlite();
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
const prices = Object.fromEntries(Object.keys(OFFERS).map((offer) => [offer, `price_${offer}`]));
const site = "https://example.test";
const email = "buyer@example.test";
const payload = (items: CartCheckoutItem[] = [{ id: "aiReadinessAssessment", qty: 1 }]) => ({
  items, email, locale: "en", requestId: randomUUID(), policyVersion: PURCHASE_POLICY_VERSION, acceptTerms: true,
});
const normal = (items?: CartCheckoutItem[]) => normalizeCartRequest(payload(items));
const invitation = (offer: OfferId, buyer = email) => createInvitation(offer, buyer, "Approved scoped service", sql);
const count = async (table: string) => (await db.query<{ n: number }>(`SELECT count(*)::int AS n FROM ${table}`)).rows[0].n;
const assertCode = (code: number) => (e: unknown) => e instanceof CartError && e.status === code;
let localDatabaseRequests = 0;

before(async () => {
  await db.exec(await readFile(new URL("../migrations/20261013-commerce.sql", import.meta.url), "utf8"));
  await db.exec(await readFile(new URL("../migrations/20261109-cart-checkouts.sql", import.meta.url), "utf8"));
  // Route tests send every query through the production SQL adapter to local PGlite, never a remote database.
  setTestDatabase({
    query: (text, values) => { localDatabaseRequests++; return db.query(text, values); },
    transaction: (fn) => { localDatabaseRequests++; return db.transaction((tx) => fn(tx)); },
  });
});
beforeEach(() => {
  Object.assign(process.env, {
    PAYMENTS_ENABLED: "true", PAYMENT_TERMS_APPROVED: PURCHASE_POLICY_VERSION, STRIPE_MODE: "test",
    STRIPE_SECRET_KEY: "sk_test_local_fixture", STRIPE_WEBHOOK_SECRET: "whsec_local_fixture",
    INTAKE_TOKEN_SECRET: "local-test-signing-key-not-real".repeat(2), DATABASE_URL: "postgresql://local:local@cart.test/local",
    NEXT_PUBLIC_SITE_URL: site, SUBSCRIPTIONS_ENABLED: "true",
  });
  delete process.env.PAYMENTS_LIVE_APPROVED;
  delete process.env.VERCEL;
  for (const offer of Object.keys(OFFERS)) process.env[`STRIPE_PRICE_${offer.replace(/([A-Z])/g, "_$1").toUpperCase()}`] = prices[offer];
});
after(async () => { setTestDatabase(null); await db.close(); });

async function group(items?: CartCheckoutItem[]) { return createCart(normal(items), false, prices, sql); }
async function pair() {
  return group([{ id: "aiReadinessAssessment", qty: 1 }, { id: "aiDiscoverySprint", qty: 1, invitation: await invitation("discovery") }]);
}
function sessionFor(cart: CartCheckout, overrides: Record<string, unknown> = {}): Stripe.Checkout.Session {
  return { id: `cs_${cart.id}`, metadata: { checkout_id: cart.id }, client_reference_id: cart.id,
    livemode: false, currency: "hkd", amount_total: cart.amount, mode: cart.mode,
    payment_status: "paid", status: "complete", customer_details: { email }, customer_email: email,
    payment_intent: `pi_${cart.id}`, customer: "cus_local", subscription: null,
    line_items: { has_more: false, data: cart.items.map((i) => ({ price: { id: i.priceId }, quantity: 1 })) },
    ...overrides } as unknown as Stripe.Checkout.Session;
}
function eventFor(cart: CartCheckout, type = "checkout.session.completed"): Stripe.Event {
  return { id: `evt_${randomUUID()}`, type, livemode: false, created: 1,
    data: { object: { id: `cs_${cart.id}`, metadata: { checkout_id: cart.id } } } } as unknown as Stripe.Event;
}
function webhookStripe(session: Stripe.Checkout.Session) {
  return { checkout: { sessions: { retrieve: async (id: string, options: unknown) => {
    assert.equal(id, session.id); assert.deepEqual(options, { expand: ["line_items"] }); return session;
  } } } } as unknown as Stripe;
}
async function dispatch(cart: CartCheckout, overrides: Record<string, unknown> = {}, event = eventFor(cart)) {
  return processStripeEvent(event, { stripe: webhookStripe(sessionFor(cart, overrides)), sql });
}
async function requestContext<T>(cookie: string, run: () => Promise<T>) {
  const req = new NextRequest(`${site}/api/commerce/cart-status?cart=1&session_id=cs_fake`, { headers: { cookie } });
  const store = createRequestStoreForAPI(req, new URL(req.url), { tags: [], expirationsByCacheKind: new Map() }, undefined, undefined);
  const work = { route: "/api/commerce/cart-status", isStaticGeneration: false } as Parameters<typeof workAsyncStorage.run>[0];
  return workAsyncStorage.run(work, () => workUnitAsyncStorage.run(store, run));
}

function checkoutStripe() {
  const calls: { params: Stripe.Checkout.SessionCreateParams; options: Stripe.RequestOptions }[] = [];
  const sessions = new Map<string, Stripe.Checkout.Session>();
  const idempotency = new Map<string, Stripe.Checkout.Session>();
  const overrides = new Map<string, Record<string, unknown>>();
  let loseResponse = false;
  const stripe = {
    prices: { retrieve: async (id: string) => {
      const offer = Object.keys(prices).find((o) => prices[o] === id)! as OfferId;
      return { id, unit_amount: OFFERS[offer].amount, currency: "hkd", livemode: false, active: true,
        recurring: OFFERS[offer].mode === "subscription" ? { interval: "month", interval_count: 1 } : null, ...overrides.get(id) };
    } },
    checkout: { sessions: {
      create: async (params: Stripe.Checkout.SessionCreateParams, options: Stripe.RequestOptions) => {
        calls.push({ params, options });
        let session = idempotency.get(options.idempotencyKey!);
        if (!session) {
          const lines = params.line_items!.map((i) => ({ price: { id: i.price }, quantity: i.quantity }));
          session = { id: `cs_${randomUUID()}`, url: "https://checkout.stripe.test/local", metadata: params.metadata,
            client_reference_id: params.client_reference_id, mode: params.mode, customer_email: params.customer_email,
            customer_details: null, currency: "hkd", livemode: false, payment_status: "unpaid", status: "open",
            amount_total: params.line_items!.reduce((n, i) => n + OFFERS[Object.keys(prices).find((o) => prices[o] === i.price)! as OfferId].amount, 0),
            line_items: { data: lines, has_more: false } } as unknown as Stripe.Checkout.Session;
          sessions.set(session.id, session); idempotency.set(options.idempotencyKey!, session);
        }
        if (loseResponse) { loseResponse = false; throw new Error("Simulated lost Stripe response"); }
        return session;
      },
      retrieve: async (id: string) => sessions.get(id)!,
    } },
  } as unknown as Stripe;
  return { stripe, calls, sessions, overrides, loseNextResponse: () => { loseResponse = true; } };
}

test("catalogue mapping only sells approved visible offers; unsupported and hidden items stay quote-only", () => {
  assert.equal(MAX_CART_ITEMS, 8);
  assert.equal(getCartOffer("aiReadinessAssessment"), "snapshot");
  assert.equal(getCartOffer("aiDiscoverySprint"), "discovery");
  assert.equal(getCartOffer("discoverySprint30Day"), "discovery");
  assert.equal(getCartOffer("accountXpExperience"), "accountXp");
  assert.equal(getCartOffer("eventXpTrial"), "eventXp");
  assert.equal(getCartOffer("smartSalesTrial"), "smartSales");
  assert.equal(getCartOffer("websiteStarter"), "websiteStarter");
  assert.equal(getCartOffer("promptTrainingDay"), "promptTraining");
  assert.equal(getCartOffer("sessionCredits2000"), "sessionCredits2000");
  for (const item of INQUIRY_CATALOG) if (!(item.id in CART_OFFERS) || item.hidePublicPrice) assert.equal(getCartOffer(item.id), null);
  for (const id of ["snapshot", "discovery11To30", "__proto__", "constructor", null, 1]) assert.equal(getCartOffer(id), null);
});

test("clinic credit packs are purchasable online without an invitation", async () => {
  for (const offer of ["sessionCredits1000", "sessionCredits2000", "sessionCredits4000"] as const) {
    assert.equal(OFFERS[offer].qualification, false);
    assert.ok(cartAvailableOffers().includes(offer));
  }
  const input = normalizeCartRequest(payload([{ id: "sessionCredits1000", qty: 1 }]));
  assert.equal(input.items.length, 1);
  assert.equal(input.items[0].offer, "sessionCredits1000");
  assert.equal(input.items[0].invitation, undefined);
  const order = await createOrder({ id: randomUUID(), offer: "sessionCredits2000", email, locale: "en", live: false }, sql);
  assert.equal(order.offer, "sessionCredits2000");
  assert.equal(order.amount, 560_000);
  assert.equal(order.payment_state, "pending");
});

test("request validation rejects alias duplicates, quantities, excessive size, mixed modes, and client prices", () => {
  const token = "a".repeat(64);
  const bad = [null, [], {}, { ...payload(), items: [] }, { ...payload(), items: Array(9).fill({ id: "aiReadinessAssessment", qty: 1 }) },
    ...[0, 2, -1, 1.5, "1", null].map((qty) => ({ ...payload(), items: [{ id: "aiReadinessAssessment", qty }] })),
    { ...payload(), items: [{ id: "aiDiscoverySprint", qty: 1, invitation: token }, { id: "discoverySprint30Day", qty: 1, invitation: token }] },
    { ...payload(), items: [{ id: "systemCareEssential", qty: 1, invitation: token }, { id: "aiReadinessAssessment", qty: 1 }] },
    { ...payload(), items: [{ id: "systemCareEssential", qty: 1, invitation: token }, { id: "systemCareGrowth", qty: 1, invitation: token }] },
    ...["amount", "priceId", "title", "mode", "offer"].map((key) => ({ ...payload(), items: [{ id: "aiReadinessAssessment", qty: 1, [key]: "tampered" }] })),
    { ...payload(), amount: 1 }, { ...payload(), items: [{ id: "foundation3Month", qty: 1 }] },
    { ...payload(), locale: "xx" }, { ...payload(), email: "invalid" }, { ...payload(), email: "x".repeat(255) + "@test.test" },
    { ...payload(), requestId: "-".repeat(36) }, { ...payload(), requestId: randomUUID().toUpperCase() },
    { ...payload(), policyVersion: "old" }, { ...payload(), acceptTerms: false },
    { ...payload(), items: [{ id: "aiReadinessAssessment", qty: 1, invitation: "no" }] }];
  for (const input of bad) assert.throws(() => normalizeCartRequest(input), assertCode(400));
  assert.throws(() => normal([{ id: "aiDiscoverySprint", qty: 1 }]), assertCode(403));
  assert.equal(normal([{ id: "systemCareEssential", qty: 1, invitation: token }]).mode, "subscription");
});

test("readiness is config-only, returns canonical offers without price IDs, and fails closed on every prerequisite", async () => {
  const beforeCalls = localDatabaseRequests;
  assert.deepEqual(cartAvailableOffers(), Object.keys(OFFERS));
  const response = await availability();
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.deepEqual(await response.json(), { availableOffers: Object.keys(OFFERS) });
  assert.equal(localDatabaseRequests, beforeCalls);
  for (const key of ["PAYMENTS_ENABLED", "PAYMENT_TERMS_APPROVED", "STRIPE_MODE", "STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET", "DATABASE_URL", "INTAKE_TOKEN_SECRET"]) {
    const prior = process.env[key]; delete process.env[key]; assert.deepEqual(cartAvailableOffers(), []); process.env[key] = prior;
  }
  for (const key of ["pk_test_publishable", "rk_live_wrong_mode", "sk_live_wrong_mode", " "]) { process.env.STRIPE_SECRET_KEY = key; assert.deepEqual(cartAvailableOffers(), []); }
  process.env.STRIPE_SECRET_KEY = "rk_test_restricted"; assert.notDeepEqual(cartAvailableOffers(), []);
  process.env.STRIPE_SECRET_KEY = "sk_test_fixture";
  process.env.INTAKE_TOKEN_SECRET = "short"; assert.deepEqual(cartAvailableOffers(), []);
  process.env.INTAKE_TOKEN_SECRET = "a".repeat(40);
  delete process.env.SUBSCRIPTIONS_ENABLED;
  assert.deepEqual(cartAvailableOffers(), Object.keys(OFFERS).filter((o) => OFFERS[o as OfferId].mode === "payment"));
  delete process.env.STRIPE_PRICE_DISCOVERY;
  assert.equal(cartAvailableOffers().includes("discovery"), false);
  process.env.STRIPE_MODE = "live"; process.env.STRIPE_SECRET_KEY = "sk_live_fixture";
  assert.deepEqual(cartAvailableOffers(), []);
});

test("POST enforces origin, JSON, actual streamed size, schema and unavailable gates without side effects", async () => {
  const request = (body: string, headers: Record<string, string> = {}) => new Request(`${site}/api/stripe/cart`, {
    method: "POST", body, headers: { origin: site, "content-type": "application/json", ...headers },
  });
  for (const [req, code] of [
    [request(JSON.stringify(payload()), { origin: "https://other.test" }), 403],
    [request("{}", { "content-length": "4097" }), 413], [request(" ".repeat(4097), { "content-length": "1" }), 413],
    [request("{}", { "content-type": "text/plain" }), 400], [request("{"), 400], [request("null"), 400],
    [request(JSON.stringify({ ...payload(), amount: 1 })), 400],
  ] as const) {
    const response = await checkout(req); assert.equal(response.status, code); assert.equal(response.headers.get("cache-control"), "no-store");
  }
  delete process.env.STRIPE_WEBHOOK_SECRET;
  const response = await checkout(request(JSON.stringify(payload())));
  assert.equal(response.status, 503); assert.deepEqual(await response.json(), { error: "Payment temporarily unavailable" });
});

test("the actual POST shares the existing daily submission limit before contacting Stripe", async () => {
  await db.exec(`CREATE TABLE IF NOT EXISTS innovatexp_website_form_submission_quota (
    day DATE NOT NULL, identity TEXT NOT NULL, submissions INTEGER NOT NULL DEFAULT 0, PRIMARY KEY(day, identity))`);
  const day = new Date(Date.now() + 8 * 3600_000).toISOString().slice(0, 10);
  const identity = createHmac("sha256", process.env.DATABASE_URL!).update("ip:127.0.0.1").digest("hex");
  await sql`INSERT INTO innovatexp_website_form_submission_quota (day, identity, submissions) VALUES (${day}, ${identity}, 3)
    ON CONFLICT (day, identity) DO UPDATE SET submissions = 3`;
  const previous = process.env.NODE_ENV; Object.assign(process.env, { NODE_ENV: "test" });
  try {
    const response = await requestContext("", () => checkout(new Request(`${site}/api/stripe/cart`, {
      method: "POST", body: JSON.stringify(payload()), headers: { origin: site, "content-type": "application/json" },
    })));
    assert.equal(response.status, 429); assert.equal(response.headers.get("cache-control"), "no-store");
    assert.ok(Number(response.headers.get("retry-after")) > 0);
  } finally { Object.assign(process.env, { NODE_ENV: previous }); }
});

test("an invalid, expired, wrong-email, wrong-offer or used invitation never consumes another item", async () => {
  const valid = await invitation("discovery");
  const expired = await invitation("eventXp");
  await sql`UPDATE innovatexp_website_commerce_invitations SET expires_at = NOW() - INTERVAL '1 second' WHERE token_hash = ${tokenHash(expired)}`;
  const otherEmail = await invitation("eventXp", "other@example.test");
  const otherOffer = await invitation("accountXp");
  const used = await invitation("eventXp");
  await createOrder({ id: randomUUID(), offer: "eventXp", email, locale: "en", live: false, invitation: used }, sql);
  const groupsBefore = await count("innovatexp_website_commerce_checkouts"), ordersBefore = await count("innovatexp_website_commerce_orders");
  for (const invalid of ["0".repeat(64), expired, otherEmail, otherOffer, used]) {
    await assert.rejects(group([{ id: "aiDiscoverySprint", qty: 1, invitation: valid }, { id: "eventXpTrial", qty: 1, invitation: invalid }]), assertCode(403));
    assert.equal((await sql`SELECT order_id FROM innovatexp_website_commerce_invitations WHERE token_hash = ${tokenHash(valid)}`)[0].order_id, null);
    assert.equal(await count("innovatexp_website_commerce_checkouts"), groupsBefore); assert.equal(await count("innovatexp_website_commerce_orders"), ordersBefore);
  }
  const accepted = await group([{ id: "aiDiscoverySprint", qty: 1, invitation: valid }, { id: "eventXpTrial", qty: 1, invitation: await invitation("eventXp") }]);
  assert.equal((await getCartOrders(accepted, sql)).length, 2);
  await assert.rejects(group([{ id: "aiDiscoverySprint", qty: 1, invitation: valid }]), assertCode(403));
});

test("retries preserve group/order identity; normalized ordering and aliases match but cart/locale/email/mode/invitation changes conflict", async () => {
  const token = await invitation("discovery");
  const body = payload([{ id: "aiReadinessAssessment", qty: 1 }, { id: "aiDiscoverySprint", qty: 1, invitation: token }]);
  const input = normalizeCartRequest(body);
  const first = await createCart(input, false, prices, sql);
  assert.notEqual(first.id, input.requestId); // Browser-selected IDs never become signed access IDs.
  const reordered = normalizeCartRequest({ ...body, email: "  BUYER@example.test  ", items: [{ id: "discoverySprint30Day", qty: 1, invitation: token }, body.items[0]] });
  assert.deepEqual((await createCart(reordered, false, prices, sql)).items, first.items);
  assert.equal((await createCart(reordered, false, prices, sql)).id, first.id);
  for (const changed of [ { ...input, email: "other@example.test" }, { ...input, locale: "de" as const },
    { ...input, items: input.items.slice(0, 1) }, { ...input, items: input.items.map((i) => i.offer === "discovery" ? { ...i, invitation: "b".repeat(64) } : i) } ]) {
    await assert.rejects(createCart(changed, false, prices, sql), assertCode(409));
  }
  await assert.rejects(createCart(input, true, prices, sql), assertCode(409));
  await assert.rejects(createCart(input, false, { ...prices, snapshot: "price_changed" }, sql), assertCode(409));
  assert.equal((await getCartOrders(first, sql)).length, 2);
});

test("overlapping retries create one group, while competing carts cannot share invitations", async () => {
  const token = await invitation("discovery");
  const input = normal([{ id: "aiReadinessAssessment", qty: 1 }, { id: "aiDiscoverySprint", qty: 1, invitation: token }]);
  const results = await Promise.all([createCart(input, false, prices, sql), createCart(input, false, prices, sql)]);
  assert.equal(results[0].id, results[1].id);
  assert.equal((await getCartOrders(results[0], sql)).length, 2);
  const secondToken = await invitation("discovery");
  const first = normal([{ id: "aiDiscoverySprint", qty: 1, invitation: secondToken }]);
  const competing = await Promise.allSettled([createCart(first, false, prices, sql), createCart({ ...first, requestId: randomUUID() }, false, prices, sql)]);
  assert.equal(competing.filter((r) => r.status === "fulfilled").length, 1);
  assert.equal(competing.filter((r) => r.status === "rejected").length, 1);
});

test("every authoritative Stripe Price is checked before creating any orders or claiming invitations", async () => {
  const token = await invitation("discovery");
  const input = normal([{ id: "aiReadinessAssessment", qty: 1 }, { id: "aiDiscoverySprint", qty: 1, invitation: token }]);
  const fake = checkoutStripe();
  const beforeGroups = await count("innovatexp_website_commerce_checkouts");
  for (const invalid of [{ unit_amount: 1 }, { currency: "usd" }, { recurring: { interval: "month", interval_count: 1 } },
    { active: false }, { livemode: true }, { id: "price_other" }, { transform_quantity: { divide_by: 10 } }, { custom_unit_amount: {} }]) {
    fake.overrides.set(prices.snapshot, invalid);
    await assert.rejects(startCartCheckout(input, site, { stripe: fake.stripe, sql }), assertCode(503));
    assert.equal(await count("innovatexp_website_commerce_checkouts"), beforeGroups);
    assert.equal((await sql`SELECT order_id FROM innovatexp_website_commerce_invitations WHERE token_hash = ${tokenHash(token)}`)[0].order_id, null);
  }
  assert.equal(fake.calls.length, 0);
  const sub = normal([{ id: "systemCareEssential", qty: 1, invitation: await invitation("systemCareEssential") }]);
  for (const recurring of [null, { interval: "year", interval_count: 1 }, { interval: "month", interval_count: 2 }]) {
    fake.overrides.set(prices.systemCareEssential, { recurring });
    await assert.rejects(startCartCheckout(sub, site, { stripe: fake.stripe, sql }), assertCode(503));
  }
});

test("Stripe checkout uses server line items and group metadata, attaches only to the group, and recovers a lost response idempotently", async () => {
  const input = normal([{ id: "aiReadinessAssessment", qty: 1 }, { id: "eventXpTrial", qty: 1, invitation: await invitation("eventXp") }]);
  const fake = checkoutStripe(); fake.loseNextResponse();
  await assert.rejects(startCartCheckout(input, site, { stripe: fake.stripe, sql }), /Simulated/);
  const result = await startCartCheckout(input, site, { stripe: fake.stripe, sql });
  assert.equal(fake.calls.length, 2); assert.equal(fake.sessions.size, 1);
  assert.deepEqual(fake.calls[0], fake.calls[1]);
  const { params, options } = fake.calls[1];
  assert.equal(options.idempotencyKey, `cart-checkout:${result.cart.id}`);
  assert.deepEqual(params.line_items, result.cart.items.map((i) => ({ price: prices[i.offer], quantity: 1 })));
  assert.deepEqual(params.payment_intent_data?.metadata, { checkout_id: result.cart.id });
  assert.equal(params.metadata?.checkout_id, result.cart.id); assert.equal(params.metadata?.order_id, undefined);
  assert.equal(params.client_reference_id, result.cart.id);
  assert.equal(params.success_url, `${site}/en/checkout/success?cart=1`); assert.equal(params.cancel_url, `${site}/en/checkout/cancel`);
  const saved = (await getCart(result.cart.id, sql))!;
  assert.ok(saved.checkout_session);
  for (const order of await getCartOrders(saved, sql)) assert.equal(order.checkout_session, null);
  const retry = await startCartCheckout(input, site, { stripe: fake.stripe, sql });
  assert.equal(retry.url, result.url); assert.equal(fake.calls.length, 2);
  await assert.rejects(attachCartSession(saved.id, "cs_different", sql), assertCode(409));
});

test("expired and processed groups are never recreated, including beyond Stripe's idempotency window", async () => {
  const input = normal(); const cart = await createCart(input, false, prices, sql); const fake = checkoutStripe();
  await sql`UPDATE innovatexp_website_commerce_checkouts SET created_at = NOW() - INTERVAL '24 hours' WHERE id = ${cart.id}::uuid`;
  await assert.rejects(startCartCheckout(input, site, { stripe: fake.stripe, sql }), assertCode(409));
  assert.equal(fake.calls.length, 0);
  const fresh = normal(); const result = await startCartCheckout(fresh, site, { stripe: fake.stripe, sql });
  const sessionId = (await getCart(result.cart.id, sql))!.checkout_session!;
  fake.sessions.get(sessionId)!.status = "expired";
  await assert.rejects(startCartCheckout(fresh, site, { stripe: fake.stripe, sql }), assertCode(409));
  assert.equal(fake.calls.length, 1);
  await recordPaymentEvent({ eventId: `evt_${randomUUID()}`, type: "test", created: 1, orderId: result.cart.items[0].orderId, state: "paid" }, sql);
  await assert.rejects(startCartCheckout(fresh, site, { stripe: fake.stripe, sql }), assertCode(409));
  assert.equal(fake.calls.length, 1);
});

test("subscription singleton retains order_id lifecycle metadata, plus checkout_id, and never bundles another offer", async () => {
  const fake = checkoutStripe();
  const result = await startCartCheckout(normal([{ id: "systemCareGrowth", qty: 1, invitation: await invitation("systemCareGrowth") }]), site, { stripe: fake.stripe, sql });
  assert.equal(fake.calls[0].params.mode, "subscription");
  assert.deepEqual(fake.calls[0].params.subscription_data?.metadata, { order_id: result.cart.items[0].orderId, checkout_id: result.cart.id });
  assert.equal(fake.calls[0].params.payment_intent_data, undefined);
});

test("group webhook rejects every mismatched line item, pagination, identity, email, live mode, total, currency and checkout mode before any write", async () => {
  const cart = await pair(); const good = sessionFor(cart);
  const lines = good.line_items!.data;
  const corruptions = [
    { line_items: undefined }, { line_items: { data: lines, has_more: true } }, { line_items: { data: lines } },
    { line_items: { data: lines.slice(1), has_more: false } }, { line_items: { data: [...lines, lines[0]], has_more: false } },
    { line_items: { data: [lines[0], lines[0]], has_more: false } },
    { line_items: { data: [{ ...lines[0], quantity: 2 }, lines[1]], has_more: false } },
    { line_items: { data: [{ price: { id: "price_unknown" }, quantity: 1 }, lines[1]], has_more: false } },
    { metadata: { checkout_id: randomUUID() } }, { client_reference_id: randomUUID() },
    { customer_details: { email: "other@example.test" } }, { customer_details: null, customer_email: null },
    { livemode: true }, { amount_total: cart.amount - 1 }, { currency: "usd" }, { mode: "subscription" },
  ];
  const beforeEvents = await count("innovatexp_website_commerce_events"), beforeOutbox = await count("innovatexp_website_commerce_outbox");
  for (const invalid of corruptions) {
    await assert.rejects(dispatch(cart, invalid));
    assert.deepEqual((await getCartOrders(cart, sql)).map((o) => o.payment_state), ["pending", "pending"]);
    assert.equal((await getCart(cart.id, sql))!.checkout_session, null);
    assert.equal(await count("innovatexp_website_commerce_events"), beforeEvents); assert.equal(await count("innovatexp_website_commerce_outbox"), beforeOutbox);
  }
  await assert.rejects(dispatch(cart, {}, { ...eventFor(cart), livemode: true }));
  await attachCartSession(cart.id, "cs_other", sql); await assert.rejects(dispatch(cart));
});

test("group validates every persisted order before paying the first one", async () => {
  const cart = await pair();
  await sql`UPDATE innovatexp_website_commerce_orders SET email = 'wrong@example.test' WHERE id = ${cart.items[1].orderId}::uuid`;
  await assert.rejects(dispatch(cart));
  assert.equal((await getOrder(cart.items[0].orderId, sql))!.payment_state, "pending");
});

test("group paid events retrieve current state and create one receipt with exactly one durable fulfillment per order", async () => {
  const cart = await pair();
  const event = eventFor(cart);
  const beforeEvents = await count("innovatexp_website_commerce_events"), beforeOutbox = await count("innovatexp_website_commerce_outbox");
  await dispatch(cart, { line_items: { data: sessionFor(cart).line_items!.data.reverse(), has_more: false } }, event);
  await dispatch(cart, {}, event); await dispatch(cart, {}, eventFor(cart, "checkout.session.async_payment_succeeded"));
  assert.deepEqual((await getCartOrders(cart, sql)).map((o) => o.payment_state), ["paid", "paid"]);
  assert.equal(await count("innovatexp_website_commerce_events"), beforeEvents + 2); assert.equal(await count("innovatexp_website_commerce_outbox"), beforeOutbox + 2);
  assert.equal((await getCartStatus(cart, sql)).status, "paid");
  for (const item of (await getCartStatus(cart, sql)).items) assert.ok(item.intakeUrl?.startsWith("/api/commerce/access?token="));
});

test("a crash between item updates retries safely without falsely reporting paid or losing fulfillment", async () => {
  const cart = await pair(); const event = eventFor(cart);
  const beforeOutbox = await count("innovatexp_website_commerce_outbox");
  let transactions = 0;
  const failing = (...args: Parameters<typeof tag>) => tag(...args);
  failing.transaction = async (queries: Captured[]) => {
    if (++transactions === 2) throw new Error("Simulated interruption between orders");
    return tag.transaction(queries);
  };
  await assert.rejects(processStripeEvent(event, { stripe: webhookStripe(sessionFor(cart)), sql: failing as unknown as typeof sql }), /Simulated/);
  assert.equal((await getCartStatus(cart, sql)).status, "pending");
  assert.equal(await count("innovatexp_website_commerce_outbox"), beforeOutbox + 1);
  await dispatch(cart, {}, event); await dispatch(cart, {}, event);
  assert.equal((await getCartStatus(cart, sql)).status, "paid");
  assert.equal(await count("innovatexp_website_commerce_outbox"), beforeOutbox + 2);
});

test("unpaid/open sessions and redirect-only status never become paid; failed or expired sessions are failures", async () => {
  for (const [overrides, type, expected] of [
    [{ payment_status: "unpaid" }, "checkout.session.completed", "pending"],
    [{ status: "open" }, "checkout.session.completed", "pending"],
    [{ payment_status: "unpaid", status: "expired", customer_details: null }, "checkout.session.expired", "failed"],
    [{ payment_status: "unpaid" }, "checkout.session.async_payment_failed", "failed"],
  ] as const) {
    const cart = await pair(); await dispatch(cart, overrides, eventFor(cart, type));
    const result = await getCartStatus(cart, sql); assert.equal(result.status, expected);
    assert.ok(result.items.every((i) => i.intakeUrl === undefined));
  }
});

async function refund(cart: CartCheckout, amount: number, changes: { charge?: Record<string, unknown>; payment?: Record<string, unknown>; stripe?: Record<string, unknown> } = {}, eventId = `evt_${randomUUID()}`) {
  const stripe = { charges: { retrieve: async () => ({ id: "ch_local", payment_intent: `pi_${cart.id}`, livemode: false, currency: "hkd", amount: cart.amount, amount_refunded: amount, ...changes.charge }) },
    paymentIntents: { retrieve: async () => ({ id: `pi_${cart.id}`, metadata: { checkout_id: cart.id }, livemode: false, currency: "hkd", amount: cart.amount, ...changes.payment }) },
    ...changes.stripe } as unknown as Stripe;
  return processStripeEvent({ id: eventId, type: "charge.refunded", created: 2, livemode: false, data: { object: { id: "ch_local" } } } as Stripe.Event, { stripe, sql });
}
test("group partial/full refunds mark ALL orders for review, retain one receipt, and cannot be undone by delayed or duplicate events", async () => {
  const cart = await pair(); await dispatch(cart);
  const beforeEvents = await count("innovatexp_website_commerce_events"), beforeOutbox = await count("innovatexp_website_commerce_outbox");
  const eventId = `evt_${randomUUID()}`;
  await refund(cart, 1, {}, eventId); await refund(cart, 1, {}, eventId); await dispatch(cart);
  assert.deepEqual((await getCartOrders(cart, sql)).map((o) => o.payment_state), ["partially_refunded", "partially_refunded"]);
  let result = await getCartStatus(cart, sql); assert.equal(result.status, "partially_refunded");
  assert.ok(result.items.every((i) => !i.intakeUrl));
  assert.equal(await count("innovatexp_website_commerce_outbox"), beforeOutbox);
  assert.equal(await count("innovatexp_website_commerce_events"), beforeEvents + 2); // One refund receipt, one later checkout receipt.
  for (const row of await sql`SELECT fulfillment_state FROM innovatexp_website_commerce_orders WHERE checkout_id = ${cart.id}::uuid`) assert.equal(row.fulfillment_state, "review_required");
  await refund(cart, cart.amount); await dispatch(cart); await refund(cart, 1);
  result = await getCartStatus(cart, sql); assert.equal(result.status, "refunded"); assert.ok(result.items.every((i) => i.status === "refunded" && !i.intakeUrl));
});

test("refund mismatches do not change any order, and a refund preceding completion is safe", async () => {
  const cart = await pair();
  for (const changes of [{ charge: { livemode: true } }, { charge: { currency: "usd" } }, { charge: { amount: cart.amount + 1 } },
    { payment: { livemode: true } }, { payment: { currency: "usd" } }, { payment: { amount: 1 } }]) await assert.rejects(refund(cart, 1, changes));
  await assert.rejects(refund(cart, cart.amount + 1));
  assert.ok((await getCartOrders(cart, sql)).every((o) => o.payment_state === "pending"));
  await refund(cart, cart.amount); await dispatch(cart);
  assert.ok((await getCartOrders(cart, sql)).every((o) => o.payment_state === "refunded"));
});

test("subscription singleton webhook and later lifecycle preserve the individual order linkage", async () => {
  const cart = await group([{ id: "systemCareEssential", qty: 1, invitation: await invitation("systemCareEssential") }]);
  // Subscription-mode Checkout Sessions have no PaymentIntent; nothing PI-based is persisted.
  const session = sessionFor(cart, { subscription: "sub_local", payment_intent: null });
  const stripe = webhookStripe(session);
  let sub = { id: "sub_local", metadata: { checkout_id: cart.id, order_id: cart.items[0].orderId }, livemode: false, customer: "cus_local", status: "active" };
  stripe.subscriptions = { retrieve: async () => sub } as unknown as Stripe["subscriptions"];
  await processStripeEvent(eventFor(cart), { stripe, sql });
  assert.equal((await getOrder(cart.items[0].orderId, sql))!.subscription_status, "active");
  assert.equal((await sql`SELECT payment_intent FROM innovatexp_website_commerce_orders WHERE id = ${cart.items[0].orderId}::uuid`)[0].payment_intent, null);
  sub = { ...sub, status: "canceled" };
  await processStripeEvent({ ...eventFor(cart), type: "customer.subscription.deleted", created: 3, data: { object: { id: "sub_local" } } } as Stripe.Event, { stripe, sql });
  assert.equal((await getOrder(cart.items[0].orderId, sql))!.subscription_status, "canceled");
  const invoiceLookup = (livemode = false, link: Omit<typeof sub, "metadata"> & { metadata: Record<string, string> } = sub) => ({
    invoicePayments: { list: async (params: Stripe.InvoicePaymentListParams) => {
      assert.deepEqual(params.payment, { type: "payment_intent", payment_intent: `pi_${cart.id}` });
      return { data: [{ livemode: false, invoice: { livemode, parent: { subscription_details: { subscription: "sub_local" } } } }] };
    } },
    subscriptions: { retrieve: async (id: string) => { assert.equal(id, "sub_local"); return link; } },
  });
  // The invoice PaymentIntent has no metadata; the refund is resolved through invoice -> subscription.
  await assert.rejects(refund(cart, cart.amount, { payment: { metadata: {} }, stripe: invoiceLookup(true) }), /Refund subscription mismatch/);
  await refund(cart, cart.amount, { payment: { metadata: {} }, stripe: { invoicePayments: { list: async () => ({ data: [] }) } } });
  await refund(cart, cart.amount, { payment: { metadata: {} }, stripe: invoiceLookup(false, { ...sub, metadata: {} }) });
  assert.notEqual((await getCartStatus(cart, sql)).status, "refunded", "Unlinked refunds never touch an order");
  await refund(cart, cart.amount, { payment: { metadata: {} }, stripe: invoiceLookup() });
  assert.equal((await getCartStatus(cart, sql)).status, "refunded");
});

test("admin reconciliation resolves grouped orders through their checkout session", async () => {
  const cart = await pair();
  await attachCartSession(cart.id, `cs_${cart.id}`, sql);
  assert.equal((await getOrder(cart.items[1].orderId, sql))!.checkout_session, null);
  const session = sessionFor(cart);
  const stripe = { checkout: { sessions: { retrieve: async (id: string) => { assert.equal(id, session.id); return session; } } } } as unknown as Stripe;
  await reconcileOrder(cart.items[1].orderId, { stripe, sql });
  assert.equal((await getCartStatus(cart, sql)).status, "paid");
  await assert.rejects(reconcileOrder(randomUUID(), { stripe, sql }), /Checkout not found/);
  await assert.rejects(reconcileOrder("not-a-uuid", { stripe, sql }), /Order required/);
});

test("private status requires the separate signed cart cookie; no redirect/query/order cookie is authority", async () => {
  const cart = await pair();
  const expires = new Date(cart.access_expires_at).getTime();
  const token = cartToken(cart.id, expires);
  // An intake/order token signed for the same UUID must never act as cart authority.
  for (const cookie of ["", `ixp_order_access=${token}`, `${CART_COOKIE}=bad`, `${CART_COOKIE}=${token.replace(cart.id, randomUUID())}`,
    `${CART_COOKIE}=${cartToken(cart.id, Date.now() - 1000)}`, `${CART_COOKIE}=${orderToken(cart.id, expires)}`]) {
    const response = await requestContext(cookie, status);
    assert.equal(response.status, 403); assert.equal(response.headers.get("cache-control"), "no-store");
    assert.deepEqual(await response.json(), { error: "Access required" });
  }
  assert.ok(await cartForToken(token, sql), "Local adapter accepts the signed token");
  assert.equal(await cartForToken(orderToken(cart.id, expires), sql), null);
  assert.equal(verifyOrderToken(token), null, "A cart token is not an intake token");
  assert.equal(String((await getCart(cart.id))?.access_expires_at), String(cart.access_expires_at), "HTTP adapter preserves expiry");
  assert.ok(await cartForToken(token), "HTTP adapter accepts the signed token");
  let response = await requestContext(`${CART_COOKIE}=${token}`, status);
  assert.equal(response.status, 200); let body = await response.json();
  assert.equal(body.status, "pending"); assert.ok(body.items.every((i: { intakeUrl?: string }) => !i.intakeUrl));
  assert.deepEqual(Object.keys(body).sort(), ["items", "requestId", "status"]);
  assert.equal(body.requestId, cart.request_id);
  const first = cart.items[0].orderId;
  await recordPaymentEvent({ eventId: `evt_${randomUUID()}`, type: "test", created: 1, orderId: first, state: "paid" }, sql);
  response = await requestContext(`${CART_COOKIE}=${token}`, status); body = await response.json();
  assert.equal(body.status, "pending");
  const paid = body.items.find((i: { status: string }) => i.status === "paid");
  assert.equal(verifyOrderToken(new URL(paid.intakeUrl, site).searchParams.get("token")), first);
  assert.ok(body.items.every((i: Record<string, unknown>) => !i.email && !i.customer && !i.id));
  await sql`UPDATE innovatexp_website_commerce_checkouts SET access_expires_at = NOW() - INTERVAL '1 second' WHERE id = ${cart.id}::uuid`;
  assert.equal(await cartForToken(token, sql), null);
  assert.equal((await requestContext(`${CART_COOKIE}=${token}`, status)).status, 403);
});

test("cart cookie is expiring, HTTP-only, SameSite=Lax, root-scoped and secure in production", async () => {
  const cart = await group();
  const previous = process.env.NODE_ENV; Object.assign(process.env, { NODE_ENV: "production" });
  try {
    await requestContext("", async () => {
      await setCartCookie(cart);
      const cookie = workUnitAsyncStorage.getStore();
      assert.equal(cookie?.type, "request");
      if (cookie?.type !== "request") throw new Error("Missing request store");
      const saved = cookie.mutableCookies.get(CART_COOKIE)!;
      assert.equal(saved.httpOnly, true); assert.equal(saved.secure, true); assert.equal(saved.sameSite, "lax"); assert.equal(saved.path, "/");
      assert.ok(saved.expires); assert.ok(saved.maxAge! > 0 && saved.maxAge! <= 30 * 86400);
      assert.equal(verifyCartToken(saved.value), cart.id);
      assert.equal(verifyOrderToken(saved.value), null);
      assert.equal(cookie.mutableCookies.get("ixp_order_access"), undefined);
    });
  } finally { Object.assign(process.env, { NODE_ENV: previous }); }
});
