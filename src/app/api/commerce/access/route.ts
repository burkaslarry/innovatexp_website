import { NextResponse } from "next/server";
import { getOrder } from "@/lib/commerce/orders";
import { setOrderCookie } from "@/lib/commerce/access";
import { verifyOrderToken } from "@/lib/commerce/tokens";
import { getSiteUrl } from "@/lib/site-url";

export async function GET(req: Request) {
  try {
    const token = new URL(req.url).searchParams.get("token");
    const id = verifyOrderToken(token);
    const order = id ? await getOrder(id) : null;
    if (!order || order.payment_state !== "paid" || new Date(order.access_expires_at).getTime() <= Date.now()) throw new Error("Invalid access");
    await setOrderCookie(token!);
    return NextResponse.redirect(new URL(`/${order.locale}/intake/snapshot`, getSiteUrl()), { headers: { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" } });
  } catch {
    return NextResponse.json({ error: "Invalid or expired access" }, { status: 403, headers: { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" } });
  }
}
