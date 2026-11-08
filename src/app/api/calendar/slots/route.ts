import { NextResponse } from "next/server";
import { listBusyIntervals } from "@/lib/site-records";
import { slotsForDay, slotLabel, validTimezone, PROVIDER_TIMEZONE } from "@/lib/booking-slots";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const day = params.get("date") || "";
  const timezone = params.get("timezone") || PROVIDER_TIMEZONE;
  const slots = slotsForDay(day);
  if (!slots.length || !validTimezone(timezone)) return NextResponse.json({ success: false, error: "Invalid date/timezone", slots: [] }, { status: 400 });
  try {
    const booked = await listBusyIntervals(slots[0].start, slots[slots.length - 1].end);
    const available = slots.filter((s) => Date.parse(s.start) > Date.now() && !booked.some((b) => Date.parse(s.start) < Date.parse(b.endsAt) && Date.parse(s.end) > Date.parse(b.startsAt)));
    return NextResponse.json({ success: true, providerTimezone: PROVIDER_TIMEZONE, slots: available.map((s) => ({ ...s, display: slotLabel(s.start, s.end, timezone) })) }, { headers: { "Cache-Control": "no-store" } });
  } catch { return NextResponse.json({ success: false, error: "Availability unavailable", slots: [] }, { status: 503 }); }
}
