import { NextResponse } from "next/server";
import { currentOrder } from "@/lib/commerce/access";
import { saveIntake } from "@/lib/commerce/orders";
import { getSiteUrl } from "@/lib/site-url";

export async function POST(req: Request) {
  try {
    if (req.headers.get("origin") !== new URL(getSiteUrl()).origin) return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
    const order = await currentOrder();
    if (!order || order.payment_state !== "paid") return NextResponse.json({ error: "Paid access required" }, { status: 403 });
    const b = await req.json();
    if (typeof b.workflow !== "string" || b.workflow.trim().length < 10 || b.workflow.length > 4000 ||
      typeof b.company !== "string" || !b.company.trim() || b.company.length > 200 ||
      typeof b.timezone !== "string" || b.timezone.length > 80) return NextResponse.json({ error: "Invalid intake" }, { status: 400 });
    try { new Intl.DateTimeFormat("en", { timeZone: b.timezone }); } catch { return NextResponse.json({ error: "Invalid timezone" }, { status: 400 }); }
    await saveIntake(order, { company: b.company.trim(), workflow: b.workflow.trim(), timezone: b.timezone });
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch { return NextResponse.json({ error: "Intake unavailable" }, { status: 503 }); }
}
