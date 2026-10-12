import { createHmac, timingSafeEqual } from "node:crypto";

export function orderToken(orderId: string, expires: number): string {
  const secret = process.env.INTAKE_TOKEN_SECRET;
  if (!secret || secret.length < 32) throw new Error("Intake signing secret not configured");
  const payload = `${orderId}.${expires}`;
  return `${payload}.${createHmac("sha256", secret).update(payload).digest("hex")}`;
}
export function verifyOrderToken(token: unknown, now = Date.now()): string | null {
  if (typeof token !== "string" || token.length > 180) return null;
  const [id, expires, signature, extra] = token.split(".");
  if (extra || !/^[a-f0-9-]{36}$/.test(id || "") || !/^\d{13}$/.test(expires || "") || !/^[a-f0-9]{64}$/.test(signature || "") || Number(expires) <= now) return null;
  const expected = orderToken(id, Number(expires)).split(".")[2];
  return timingSafeEqual(Buffer.from(expected), Buffer.from(signature)) ? id : null;
}
