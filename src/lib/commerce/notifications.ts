import { Resend } from "resend";
import { OFFERS } from "@/content/commerce";
import { getSiteUrl } from "@/lib/site-url";
import { commerceSql, type Order } from "./orders";
import { orderToken } from "./tokens";

export async function drainCommerceOutbox() {
  const sql = commerceSql();
  const rows = await sql`UPDATE commerce_outbox SET locked_until = NOW() + INTERVAL '5 minutes', attempts = attempts + 1
    WHERE id IN (SELECT id FROM commerce_outbox WHERE sent_at IS NULL AND available_at <= NOW()
      AND (locked_until IS NULL OR locked_until < NOW()) ORDER BY available_at LIMIT 10 FOR UPDATE SKIP LOCKED)
    RETURNING *`;
  let delivered = 0;
  for (const job of rows) {
    try {
      const orders = await sql`SELECT * FROM commerce_orders WHERE id = ${job.order_id}::uuid`;
      const order = orders[0] as unknown as Order;
      if (!order || order.payment_state !== "paid") {
        await sql`UPDATE commerce_outbox SET sent_at = NOW(), locked_until = NULL WHERE id = ${job.id}`;
        continue;
      }
      const key = process.env.RESEND_API_KEY;
      const from = process.env.SENDER_EMAIL;
      const testRecipient = process.env.COMMERCE_TEST_EMAIL;
      if (!key || !from || (!order.livemode && !testRecipient)) throw new Error("Notification configuration missing");
      const zh = order.locale.startsWith("zh");
      const link = `${getSiteUrl()}/api/commerce/access?token=${encodeURIComponent(orderToken(order.id, new Date(order.access_expires_at).getTime()))}`;
      const intake = job.kind === "intake";
      const recipient = intake ? process.env.COMMERCE_NOTIFY_EMAIL : order.email;
      if (!recipient) throw new Error("Notification recipient missing");
      const text = intake ? `Order ${order.id}\n${JSON.stringify(order.intake, null, 2)}` : zh
        ? `已核對 ${OFFERS[order.offer].name} 付款 HK$${order.amount / 100}。\n請用以下私人連結填寫服務問卷或管理訂阅：\n${link}\n請勿轉寄。連結 30 日內有效。\n訂單：${order.id}`
        : `Payment verified for ${OFFERS[order.offer].name}: HK$${order.amount / 100}.\nUse this private link for intake or billing management:\n${link}\nDo not forward. Access expires after 30 days.\nOrder: ${order.id}`;
      const result = await new Resend(key).emails.send({ from, to: order.livemode ? recipient : testRecipient!, subject: intake ? "InnovateXP — paid intake received" : zh ? "InnovateXP — 付款已核對及下一步" : "InnovateXP — verified payment and next steps", text }, { idempotencyKey: `commerce-${job.id}` });
      if (result.error) throw new Error("Notification provider failed");
      await sql`UPDATE commerce_outbox SET sent_at = NOW(), locked_until = NULL WHERE id = ${job.id}`;
      delivered++;
    } catch {
      await sql`UPDATE commerce_outbox SET locked_until = NULL,
        available_at = NOW() + INTERVAL '5 minutes' WHERE id = ${job.id}`;
    }
  }
  return { delivered, attempted: rows.length };
}
