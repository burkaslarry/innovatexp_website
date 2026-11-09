import { NextResponse } from "next/server";
import { getSiteUrl } from "@/lib/site-url";
import { ADMIN_COOKIE } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const site = new URL(getSiteUrl()).origin;
  const origin = req.headers.get("origin");
  if (origin && origin !== site) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const response = NextResponse.redirect(new URL("/admin", site), { status: 303 });
  response.cookies.set(ADMIN_COOKIE, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/admin", maxAge: 0 });
  response.headers.set("Cache-Control", "no-store");
  return response;
}
