import { NextResponse } from "next/server";
import { currentOrder } from "@/lib/commerce/access";

export async function GET() {
  try {
    const order = await currentOrder();
    if (!order) return NextResponse.json({ error: "Access required" }, { status: 403 });
    return NextResponse.json({ status: order.payment_state, offer: order.offer }, { headers: { "Cache-Control": "no-store" } });
  } catch { return NextResponse.json({ error: "Status unavailable" }, { status: 503 }); }
}
