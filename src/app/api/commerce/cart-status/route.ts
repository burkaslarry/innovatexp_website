import { NextResponse } from "next/server";
import { CartError, currentCart, getCartStatus } from "@/lib/commerce/cart";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" };
export async function GET() {
  try {
    const cart = await currentCart();
    if (!cart) return NextResponse.json({ error: "Access required" }, { status: 403, headers });
    return NextResponse.json(await getCartStatus(cart), { headers });
  } catch (error) {
    return NextResponse.json({ error: error instanceof CartError ? error.message : "Status unavailable" }, {
      status: error instanceof CartError ? error.status : 503, headers,
    });
  }
}
