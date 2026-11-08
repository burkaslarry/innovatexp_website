import { randomUUID } from "node:crypto";
import type Stripe from "stripe";
import { cookies } from "next/headers";
import { OFFERS, PURCHASE_POLICY_VERSION, isOfferId, type OfferId } from "@/content/commerce";
import { getCartOffer, MAX_CART_ITEMS, type CartStatus } from "@/content/commerce-cart";
import { isValidLocale, type AppLocale } from "@/lib/i18n-routing";
import { cartAvailableOffers, offerPriceMatches, paymentMode, priceId } from "./config";
import { commerceSql, tokenHash, type Order } from "./orders";
import { cartToken, orderToken, verifyCartToken } from "./tokens";
import { getStripe } from "./stripe";

type Sql = ReturnType<typeof commerceSql>;
export const CART_COOKIE = "ixp_cart_access";
export class CartError extends Error {
  constructor(message: string, readonly status: number) { super(message); this.name = "CartError"; }
}
export type NormalizedCart = {
  requestId: string; email: string; locale: AppLocale; mode: "payment" | "subscription";
  items: { offer: OfferId; invitation?: string }[];
};
export type CartCheckout = {
  id: string; request_id: string; fingerprint: string; email: string; locale: AppLocale;
  livemode: boolean; currency: string; amount: number; mode: "payment" | "subscription";
  items: { orderId: string; offer: OfferId; priceId: string }[];
  access_expires_at: string; checkout_session: string | null; created_at: string;
};
const object = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const onlyKeys = (v: Record<string, unknown>, keys: string[]) => Object.keys(v).every((k) => keys.includes(k));

/** Never accepts amounts, titles, canonical offers, Stripe IDs, or modes from the browser. */
export function normalizeCartRequest(value: unknown): NormalizedCart {
  const invalid = () => new CartError("Invalid checkout request", 400);
  if (!object(value) || !onlyKeys(value, ["items", "email", "locale", "requestId", "policyVersion", "acceptTerms"]) ||
    value.policyVersion !== PURCHASE_POLICY_VERSION || value.acceptTerms !== true ||
    typeof value.email !== "string" || value.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email.trim()) ||
    typeof value.locale !== "string" || !isValidLocale(value.locale) || typeof value.requestId !== "string" ||
    !/^[a-f0-9]{8}-[a-f0-9]{4}-[1-8][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/.test(value.requestId) ||
    !Array.isArray(value.items) || value.items.length < 1 || value.items.length > MAX_CART_ITEMS) throw invalid();
  const seen = new Set<OfferId>();
  const items = value.items.map((item) => {
    if (!object(item) || !onlyKeys(item, ["id", "qty", "invitation"]) || item.qty !== 1) throw invalid();
    const offer = getCartOffer(item.id);
    if (!offer || seen.has(offer)) throw invalid();
    seen.add(offer);
    if (item.invitation !== undefined && (typeof item.invitation !== "string" || !/^[a-f0-9]{64}$/.test(item.invitation))) throw invalid();
    if (OFFERS[offer].qualification && !item.invitation) throw new CartError("Qualification required", 403);
    return { offer, ...(typeof item.invitation === "string" ? { invitation: item.invitation } : {}) };
  }).sort((a, b) => a.offer.localeCompare(b.offer));
  const mode = OFFERS[items[0].offer].mode;
  if (items.some((i) => OFFERS[i.offer].mode !== mode) || (mode === "subscription" && items.length !== 1)) throw invalid();
  return { requestId: value.requestId, email: value.email.trim().toLowerCase(), locale: value.locale, mode, items };
}

export async function getCart(id: string, sql = commerceSql()): Promise<CartCheckout | null> {
  const rows = await sql`SELECT * FROM commerce_checkouts WHERE id = ${id}::uuid`;
  return (rows[0] as unknown as CartCheckout) ?? null;
}
async function cartByRequest(id: string, sql: Sql): Promise<CartCheckout | null> {
  const rows = await sql`SELECT * FROM commerce_checkouts WHERE request_id = ${id}::uuid`;
  return (rows[0] as unknown as CartCheckout) ?? null;
}

/** One statement commits the group, orders, and ALL invitation claims, or none of them. */
export async function createCart(input: NormalizedCart, live: boolean, prices: Record<string, string>, sql = commerceSql()): Promise<CartCheckout> {
  const fingerprint = tokenHash(JSON.stringify({ email: input.email, locale: input.locale, mode: input.mode, live,
    items: input.items.map((i) => ({ offer: i.offer, priceId: prices[i.offer], invitation: i.invitation ? tokenHash(i.invitation) : null })) }));
  const retry = (cart: CartCheckout) => {
    if (cart.fingerprint !== fingerprint) throw new CartError("Checkout retry mismatch", 409);
    return cart;
  };
  const prior = await cartByRequest(input.requestId, sql);
  if (prior) return retry(prior);
  const id = randomUUID();
  const resolved = input.items.map((i) => ({ orderId: randomUUID(), offer: i.offer, priceId: prices[i.offer],
    amount: OFFERS[i.offer].amount, invitationHash: OFFERS[i.offer].qualification && i.invitation ? tokenHash(i.invitation) : null }));
  const required = input.items.filter((i) => OFFERS[i.offer].qualification).length;
  const items = resolved.map(({ orderId, offer, priceId: price }) => ({ orderId, offer, priceId: price }));
  const expires = new Date(Date.now() + 30 * 86400_000).toISOString();
  await sql`
    WITH requested AS MATERIALIZED (
      SELECT * FROM jsonb_to_recordset(${JSON.stringify(resolved)}::jsonb)
        AS x("orderId" uuid, offer text, "priceId" text, amount integer, "invitationHash" text)
    ), eligible AS MATERIALIZED (
      SELECT i.token_hash FROM commerce_invitations i JOIN requested r ON r."invitationHash" = i.token_hash
      WHERE i.offer = r.offer AND lower(i.email) = ${input.email} AND i.expires_at > NOW() AND i.order_id IS NULL
      ORDER BY i.token_hash FOR UPDATE OF i
    ), new_checkout AS (
      INSERT INTO commerce_checkouts (id, request_id, fingerprint, email, locale, livemode, currency, amount, mode, items, access_expires_at)
      SELECT ${id}::uuid, ${input.requestId}::uuid, ${fingerprint}, ${input.email}, ${input.locale}, ${live}, 'hkd',
        ${resolved.reduce((n, i) => n + i.amount, 0)}, ${input.mode}, ${JSON.stringify(items)}::jsonb, ${expires}::timestamptz
      WHERE (SELECT count(*) FROM eligible) = ${required}
      ON CONFLICT (request_id) DO NOTHING RETURNING id
    ), new_orders AS (
      INSERT INTO commerce_orders (id, checkout_id, offer, locale, email, amount, policy_version, livemode, access_expires_at)
      SELECT r."orderId", c.id, r.offer, ${input.locale}, ${input.email}, r.amount, ${PURCHASE_POLICY_VERSION}, ${live}, ${expires}::timestamptz
      FROM requested r CROSS JOIN new_checkout c RETURNING id
    )
    UPDATE commerce_invitations i SET order_id = r."orderId"
    FROM requested r JOIN new_orders o ON o.id = r."orderId"
    WHERE i.token_hash = r."invitationHash" AND i.token_hash IN (SELECT token_hash FROM eligible)
  `;
  const cart = await cartByRequest(input.requestId, sql);
  if (!cart) throw new CartError("Invalid invitation", 403);
  return retry(cart);
}

export async function getCartOrders(cart: CartCheckout, sql = commerceSql()): Promise<Order[]> {
  const rows = await sql`SELECT * FROM commerce_orders WHERE checkout_id = ${cart.id}::uuid`;
  const orders = rows as unknown as Order[];
  if (!cart.items.length || cart.items.length > MAX_CART_ITEMS || orders.length !== cart.items.length ||
    new Set(cart.items.map((i) => i.orderId)).size !== cart.items.length || new Set(cart.items.map((i) => i.offer)).size !== cart.items.length ||
    (cart.mode === "subscription" && cart.items.length !== 1)) throw new Error("Checkout orders mismatch");
  const sorted = cart.items.map((item) => {
    const order = orders.find((o) => o.id === item.orderId);
    if (!order || !isOfferId(item.offer) || order.offer !== item.offer || order.email !== cart.email || order.locale !== cart.locale ||
      order.livemode !== cart.livemode || order.currency !== cart.currency || OFFERS[item.offer].mode !== cart.mode ||
      order.amount !== OFFERS[item.offer].amount || !item.priceId.startsWith("price_")) throw new Error("Checkout orders mismatch");
    return order;
  });
  if (sorted.reduce((n, o) => n + o.amount, 0) !== cart.amount) throw new Error("Checkout amount mismatch");
  return sorted;
}

export async function attachCartSession(id: string, session: string, sql = commerceSql()) {
  const rows = await sql`UPDATE commerce_checkouts SET checkout_session = ${session}, updated_at = NOW()
    WHERE id = ${id}::uuid AND (checkout_session IS NULL OR checkout_session = ${session}) RETURNING id`;
  if (!rows.length) throw new CartError("Checkout session mismatch", 409);
}

/** Checks the authoritative session, including the exact multiset (not just its total). */
export function verifyCartSession(cart: CartCheckout, session: Stripe.Checkout.Session, live: boolean) {
  if (cart.livemode !== live || session.livemode !== live || session.metadata?.checkout_id !== cart.id ||
    session.client_reference_id !== cart.id || (cart.checkout_session && session.id !== cart.checkout_session) ||
    session.currency !== cart.currency || session.amount_total !== cart.amount || session.mode !== cart.mode ||
    (session.customer_details?.email ?? session.customer_email)?.toLowerCase() !== cart.email ||
    !session.line_items || session.line_items.has_more !== false || session.line_items.data.length !== cart.items.length) {
    throw new Error("Cart payment details mismatch");
  }
  const remaining = cart.items.map((i) => i.priceId);
  for (const line of session.line_items.data) {
    const index = remaining.indexOf(line.price?.id ?? "");
    if (index < 0 || line.quantity !== 1) throw new Error("Cart line items mismatch");
    remaining.splice(index, 1);
  }
  if (remaining.length) throw new Error("Cart line items mismatch");
}

export async function startCartCheckout(input: NormalizedCart, site: string, dependencies: { stripe?: Stripe; sql?: Sql } = {}) {
  const available = cartAvailableOffers();
  if (input.items.some((i) => !available.includes(i.offer))) throw new CartError("Payment temporarily unavailable", 503);
  const live = paymentMode() === "live";
  const stripe = dependencies.stripe ?? getStripe();
  // Complete all remote validation BEFORE consuming any invitation or creating an order.
  const resolved = await Promise.all(input.items.map(async (i) => {
    const id = priceId(i.offer);
    const price = await stripe.prices.retrieve(id);
    if (price.id !== id || price.livemode !== live || !offerPriceMatches(i.offer, price) || price.transform_quantity || price.custom_unit_amount) {
      throw new CartError("Payment temporarily unavailable", 503);
    }
    return [i.offer, id] as const;
  }));
  const sql = dependencies.sql ?? commerceSql();
  const cart = await createCart(input, live, Object.fromEntries(resolved), sql);
  const orders = await getCartOrders(cart, sql);
  if (new Date(cart.access_expires_at).getTime() <= Date.now() || orders.some((o) => o.payment_state !== "pending")) {
    throw new CartError("Checkout already processed or expired", 409);
  }
  // Stripe can forget idempotency keys after 24h. Never recreate an unattached old session.
  if (!cart.checkout_session && Date.now() - new Date(cart.created_at).getTime() >= 23 * 3600_000) {
    throw new CartError("Checkout expired; start a new cart", 409);
  }
  const session = cart.checkout_session ? await stripe.checkout.sessions.retrieve(cart.checkout_session, { expand: ["line_items"] }) :
    await stripe.checkout.sessions.create({
      mode: cart.mode, customer_email: cart.email,
      ...(cart.mode === "payment" ? { customer_creation: "always" as const, payment_intent_data: { metadata: { checkout_id: cart.id } } } :
        { subscription_data: { metadata: { order_id: cart.items[0].orderId, checkout_id: cart.id } } }),
      client_reference_id: cart.id, metadata: { checkout_id: cart.id, policy_version: PURCHASE_POLICY_VERSION },
      line_items: cart.items.map((i) => ({ price: i.priceId, quantity: 1 })),
      consent_collection: { terms_of_service: "required" },
      locale: cart.locale === "zh-hk" || cart.locale === "zh-tw" ? "zh-HK" : cart.locale,
      success_url: `${site}/${cart.locale}/checkout/success?cart=1`, cancel_url: `${site}/${cart.locale}/checkout/cancel`,
      expand: ["line_items"],
    }, { idempotencyKey: `cart-checkout:${cart.id}` });
  verifyCartSession(cart, session, live);
  if (!session.url || session.status !== "open") throw new CartError("Checkout expired; start a new cart", 409);
  await attachCartSession(cart.id, session.id, sql);
  return { cart, url: session.url };
}

export async function cartForToken(token: unknown, sql?: Sql): Promise<CartCheckout | null> {
  const id = verifyCartToken(token);
  if (!id) return null;
  const cart = await getCart(id, sql);
  return cart && new Date(cart.access_expires_at).getTime() > Date.now() ? cart : null;
}
export async function currentCart() {
  return cartForToken((await cookies()).get(CART_COOKIE)?.value);
}
export async function setCartCookie(cart: CartCheckout) {
  const expires = new Date(cart.access_expires_at);
  (await cookies()).set(CART_COOKIE, cartToken(cart.id, expires.getTime()), {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", expires,
    maxAge: Math.max(0, Math.floor((expires.getTime() - Date.now()) / 1000)),
  });
}
export async function getCartStatus(cart: CartCheckout, sql = commerceSql()): Promise<CartStatus> {
  if (new Date(cart.access_expires_at).getTime() <= Date.now()) throw new CartError("Access required", 403);
  const orders = await getCartOrders(cart, sql);
  const states = orders.map((o) => o.payment_state);
  const status = states.every((s) => s === "refunded") ? "refunded" :
    states.some((s) => s === "refunded" || s === "partially_refunded") ? "partially_refunded" :
    states.every((s) => s === "paid") ? "paid" : states.some((s) => s === "failed") ? "failed" : "pending";
  return { status, requestId: cart.request_id, items: orders.map((o) => ({ offer: o.offer, status: o.payment_state,
    ...(o.payment_state === "paid" && new Date(o.access_expires_at).getTime() > Date.now() ?
      { intakeUrl: `/api/commerce/access?token=${encodeURIComponent(orderToken(o.id, new Date(o.access_expires_at).getTime()))}` } : {}) })) };
}
