import { NextRequest, NextResponse } from "next/server";

/**
 * Server-only WhatsApp redirect — keeps the number out of client JS and page copy.
 * Set WHATSAPP_NUMBER (digits, e.g. 85293103031) in the environment.
 */
function digitsFromEnv(): string | null {
  const raw = process.env.WHATSAPP_NUMBER || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!raw) return null;
  const digits = raw.replace(/[^\d]/g, "");
  return digits.length >= 8 ? digits : null;
}

export async function GET(req: NextRequest) {
  const digits = digitsFromEnv();
  if (!digits) {
    return NextResponse.redirect(new URL("/bookme", req.url), 302);
  }
  const text = req.nextUrl.searchParams.get("text") ?? "";
  const target = new URL(`https://wa.me/${digits}`);
  if (text) target.searchParams.set("text", text);
  return NextResponse.redirect(target, 302);
}
