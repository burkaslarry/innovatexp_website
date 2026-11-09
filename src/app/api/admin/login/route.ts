import { NextResponse } from "next/server";
import { getSiteUrl } from "@/lib/site-url";
import { ADMIN_COOKIE, adminConfigured, createSessionValue, passwordMatches } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 15 * 60_000;
const MAX_ATTEMPTS = 8;
const attempts = new Map<string, { count: number; reset: number }>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  if (attempts.size > 500) for (const [id, entry] of attempts) if (entry.reset <= now) attempts.delete(id);
  const entry = attempts.get(key);
  if (!entry || entry.reset <= now) {
    attempts.set(key, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

function clientKey(req: Request): string {
  const forwarded = process.env.VERCEL
    ? req.headers.get("x-vercel-forwarded-for")
    : req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "local";
}

export async function POST(req: Request) {
  const site = new URL(getSiteUrl()).origin;
  const origin = req.headers.get("origin");
  if (origin && origin !== site) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const key = clientKey(req);
  if (rateLimited(key)) {
    return NextResponse.redirect(new URL("/admin?error=rate", site), { status: 303, headers: { "Cache-Control": "no-store" } });
  }

  let password = "";
  try {
    const type = (req.headers.get("content-type") || "").toLowerCase();
    if (type.includes("application/json")) {
      const body = await req.json();
      password = typeof body?.password === "string" ? body.password : "";
    } else {
      const form = await req.formData();
      password = String(form.get("password") ?? "");
    }
  } catch {
    password = "";
  }

  if (!adminConfigured() || !passwordMatches(password)) {
    return NextResponse.redirect(new URL("/admin?error=1", site), { status: 303, headers: { "Cache-Control": "no-store" } });
  }

  attempts.delete(key);
  const session = createSessionValue();
  const response = NextResponse.redirect(new URL("/admin/orders", site), { status: 303 });
  response.cookies.set(ADMIN_COOKIE, session.value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    expires: session.expires,
  });
  response.headers.set("Cache-Control", "no-store");
  return response;
}
