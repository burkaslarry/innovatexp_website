import { NextResponse } from "next/server";
import { currentOrder } from "@/lib/commerce/access";
import { getStripe } from "@/lib/commerce/stripe";
import { getSiteUrl } from "@/lib/site-url";

export async function POST(req: Request) {
  try {
    const site = new URL(getSiteUrl()).origin;
    if (req.headers.get("origin") !== site) return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
    const order = await currentOrder();
    if (!order?.customer || !order.subscription) return NextResponse.json({ error: "Subscription access required" }, { status: 403 });
    const session = await getStripe().billingPortal.sessions.create({ customer: order.customer, return_url: `${site}/${order.locale}/intake/snapshot` });
    return NextResponse.json({ url: session.url }, { headers: { "Cache-Control": "no-store" } });
  } catch { return NextResponse.json({ error: "Portal unavailable" }, { status: 503 }); }
}
