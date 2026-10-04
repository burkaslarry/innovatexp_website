import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const COOKIE = "ixp_form_session";
let schemaReady: Promise<unknown> | undefined;

/** Shared contact/booking quota. Counts accepted attempts before any side effects. */
export async function enforceFormSubmissionLimit(req: Request): Promise<NextResponse | null> {
  const databaseUrl = process.env.DATABASE_URL?.trim();
  if (!databaseUrl) return unavailable();
  try {
    const hash = (value: string) => createHmac("sha256", databaseUrl).update(value).digest("hex");
    const jar = await cookies();
    const [candidate, signature] = (jar.get(COOKIE)?.value || "").split(".");
    const expected = hash(`session:${candidate}`);
    const valid = /^[a-f0-9-]{36}$/.test(candidate || "") && /^[a-f0-9]{64}$/.test(signature || "") &&
      timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
    const session = valid ? candidate : randomUUID();
    jar.set(COOKIE, `${session}.${hash(`session:${session}`)}`, {
      httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30,
    });
    // Vercel overwrites this header; do not trust arbitrary client-supplied forwarding headers in production.
    const forwarded = process.env.VERCEL
      ? req.headers.get("x-vercel-forwarded-for")
      : process.env.NODE_ENV !== "production" ? req.headers.get("x-forwarded-for") || "127.0.0.1" : null;
    if (!forwarded) return unavailable();
    const ip = forwarded.split(",")[0].trim();
    const ipKey = hash(`ip:${ip}`);
    const sessionKey = hash(`sid:${session}`);
    const day = new Date(Date.now() + 8 * 3600_000).toISOString().slice(0, 10);
    const sql = neon(databaseUrl);
    schemaReady ??= sql`CREATE TABLE IF NOT EXISTS form_submission_quota (
      day DATE NOT NULL, identity TEXT NOT NULL, submissions INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY (day, identity)
    )`.catch((error: unknown) => { schemaReady = undefined; throw error; });
    await schemaReady;
    await sql`DELETE FROM form_submission_quota WHERE day < ${day}::date - 7`;
    const keys = [ipKey, sessionKey].sort();
    const results = await sql.transaction([
      sql`INSERT INTO form_submission_quota (day, identity) VALUES (${day}, ${keys[0]}), (${day}, ${keys[1]}) ON CONFLICT DO NOTHING`,
      sql`SELECT identity FROM form_submission_quota WHERE day = ${day} AND identity IN (${keys[0]}, ${keys[1]}) ORDER BY identity FOR UPDATE`,
      sql`UPDATE form_submission_quota SET submissions = submissions + 1
        WHERE day = ${day} AND identity IN (${keys[0]}, ${keys[1]})
        AND NOT EXISTS (SELECT 1 FROM form_submission_quota WHERE day = ${day} AND identity IN (${keys[0]}, ${keys[1]}) AND submissions >= 3)
        RETURNING submissions`,
    ]);
    if (results[2].length === 2) return null;
    const reset = Date.parse(`${day}T00:00:00+08:00`) + 86400_000;
    return NextResponse.json({ success: false, ok: false, error: "今日已達 3 次提交上限，請明日再試。Daily limit of 3 submissions reached. Please try again tomorrow." }, {
      status: 429, headers: { "Retry-After": String(Math.max(1, Math.ceil((reset - Date.now()) / 1000))), "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Form quota unavailable", error instanceof Error ? error.message : "Unknown error");
    return unavailable();
  }
}

function unavailable() {
  return NextResponse.json({ success: false, ok: false, error: "暫時未能提交，請稍後再試。Submission temporarily unavailable." }, { status: 503 });
}
