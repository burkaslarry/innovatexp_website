/** Operator-only local tool. JSON arrives on stdin; database/Stripe secrets stay in env. */
import { randomUUID } from "node:crypto";
import { isOfferId } from "@/content/commerce";
import { createInvitation, commerceSql, getOrder } from "@/lib/commerce/orders";
import { processStripeEvent } from "@/lib/commerce/events";
import { getStripe } from "@/lib/commerce/stripe";
import { drainCommerceOutbox } from "@/lib/commerce/notifications";
import { retryQuestionnaireNotifications } from "@/lib/questionnaire-notifications";
import { orderToken } from "@/lib/commerce/tokens";
import { getSiteUrl } from "@/lib/site-url";

async function main() {
  let input = ""; for await (const chunk of process.stdin) input += chunk;
  const b = JSON.parse(input);
  if (b.action === "invite") {
    if (!isOfferId(b.offer) || typeof b.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) || typeof b.scope !== "string" || b.scope.length < 20 || b.scope.length > 8000) throw new Error("Approved offer, email and written scope required");
    const token = await createInvitation(b.offer, b.email, b.scope);
    console.log(`${getSiteUrl()}/api/commerce/invitation?locale=${b.locale === "en" ? "en" : "zh-hk"}&token=${token}`);
  } else if (b.action === "retry") {
    console.log({ commerce: await drainCommerceOutbox(), questionnaire: (await retryQuestionnaireNotifications()).filter(Boolean).length });
  } else if (b.action === "reconcile") {
    if (typeof b.orderId !== "string") throw new Error("Order required");
    const order = await getOrder(b.orderId);
    if (!order?.checkout_session) throw new Error("Checkout not found");
    const session = await getStripe().checkout.sessions.retrieve(order.checkout_session);
    await processStripeEvent({ id: `reconcile_${session.id}_${Date.now()}`, object: "event", api_version: null, pending_webhooks: 0, request: null, type: "checkout.session.completed", created: Math.floor(Date.now() / 1000), livemode: session.livemode, data: { object: session } });
    console.log({ reconciled: true });
  } else if (b.action === "access") {
    const order = await getOrder(String(b.orderId));
    if (!order || order.payment_state !== "paid") throw new Error("Paid order required");
    const expires = Date.now() + 30 * 86400_000;
    await commerceSql()`UPDATE commerce_orders SET access_expires_at = ${new Date(expires).toISOString()}::timestamptz WHERE id = ${order.id}::uuid`;
    console.log(`${getSiteUrl()}/api/commerce/access?token=${encodeURIComponent(orderToken(order.id, expires))}`);
  } else if (b.action === "outcome") {
    if (!["researched", "contacted", "replied", "qualified", "meeting", "proposal", "won", "lost"].includes(b.stage) || typeof b.company !== "string" || b.company.length > 200 || typeof b.note !== "string" || b.note.length > 2000) throw new Error("Invalid outcome");
    await commerceSql()`INSERT INTO commerce_outcomes(id, company, stage, note) VALUES (${randomUUID()}::uuid, ${b.company}, ${b.stage}, ${b.note})`;
    console.log({ recorded: true });
  } else if (b.action === "report") {
    console.log(await commerceSql()`SELECT offer, currency, payment_state, count(*)::integer AS orders, sum(amount)::bigint AS amount_minor_units
      FROM commerce_orders GROUP BY offer, currency, payment_state ORDER BY offer, payment_state`);
  } else throw new Error("Unknown action");
}
main().catch(() => { console.error("Commerce operation failed. Check configuration and input; no credentials are printed."); process.exitCode = 1; });
