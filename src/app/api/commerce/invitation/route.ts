import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { commerceSql, tokenHash } from "@/lib/commerce/orders";
import { isValidLocale } from "@/lib/i18n-routing";
import { getSiteUrl } from "@/lib/site-url";

export async function GET(req: Request) {
  const params = new URL(req.url).searchParams;
  const token = params.get("token") || "";
  const requestedLocale = params.get("locale") || "zh-hk";
  const locale = isValidLocale(requestedLocale) ? requestedLocale : "zh-hk";
  try {
    if (!/^[a-f0-9]{64}$/.test(token)) throw new Error("Invalid invitation");
    const rows = await commerceSql()`SELECT offer FROM commerce_invitations WHERE token_hash = ${tokenHash(token)} AND expires_at > NOW()`;
    if (!rows.length) throw new Error("Expired invitation");
    (await cookies()).set("ixp_checkout_invitation", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 7 * 86400 });
    return NextResponse.redirect(new URL(`/${locale}/checkout/invitation`, getSiteUrl()));
  } catch { return NextResponse.json({ error: "Invalid invitation" }, { status: 403 }); }
}
