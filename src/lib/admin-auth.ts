import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/** Ops login. ADMIN_PANEL_SECRET is preferred; CRON_SECRET is the existing fallback so no new secret is required. */
export const ADMIN_COOKIE = "ixp_ops_session";
const SESSION_HOURS = 12;

function adminSecret(): string | null {
  const value = (process.env.ADMIN_PANEL_SECRET || process.env.CRON_SECRET || "").trim();
  return value.length >= 24 ? value : null;
}

export function adminConfigured(): boolean {
  return adminSecret() !== null;
}

export function passwordMatches(candidate: string): boolean {
  const secret = adminSecret();
  if (!secret || !candidate) return false;
  const given = Buffer.from(candidate, "utf8");
  const expected = Buffer.from(secret, "utf8");
  return given.length === expected.length && timingSafeEqual(given, expected);
}

function signature(payload: string): string {
  return createHmac("sha256", adminSecret()!).update(`ops-session:${payload}`).digest("hex");
}

export function createSessionValue(): { value: string; expires: Date } {
  const expires = Date.now() + SESSION_HOURS * 3600_000;
  const payload = `${expires}.${randomBytes(18).toString("hex")}`;
  return { value: `${payload}.${signature(payload)}`, expires: new Date(expires) };
}

export function verifySessionValue(value: string | undefined): boolean {
  if (!value || !adminSecret()) return false;
  const parts = value.split(".");
  if (parts.length !== 3) return false;
  const [expires, nonce, mac] = parts;
  if (!/^\d{13}$/.test(expires) || !/^[a-f0-9]{36}$/.test(nonce) || !/^[a-f0-9]{64}$/.test(mac)) return false;
  if (Number(expires) <= Date.now()) return false;
  const expected = Buffer.from(signature(`${expires}.${nonce}`), "hex");
  const given = Buffer.from(mac, "hex");
  return given.length === expected.length && timingSafeEqual(given, expected);
}

export async function hasAdminSession(): Promise<boolean> {
  return verifySessionValue((await cookies()).get(ADMIN_COOKIE)?.value);
}
