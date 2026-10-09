import { NextResponse } from "next/server";
import {
  parseISO,
  format,
  addMinutes,
  isBefore,
  setHours,
  setMinutes,
  isAfter,
  startOfDay,
  endOfDay,
} from "date-fns";
import { listBusyIntervals } from "@/lib/site-records";

const WORK_START_HOUR = 10;
const WORK_END_HOUR = 20;
const SLOT_DURATION_MINUTES = 60;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get("date");

  if (!dateParam) {
    return NextResponse.json({ success: false, error: "Date parameter is required.", slots: [] }, { status: 400 });
  }

  const selectedDate = parseISO(dateParam);
  if (Number.isNaN(selectedDate.getTime())) {
    return NextResponse.json({ success: false, error: "Invalid date format.", slots: [] }, { status: 400 });
  }

  const potentialSlots: { start: Date; end: Date }[] = [];
  let currentTime = setMinutes(setHours(startOfDay(selectedDate), WORK_START_HOUR), 0);
  const workEndTime = setHours(startOfDay(selectedDate), WORK_END_HOUR);

  while (isBefore(currentTime, workEndTime)) {
    const slotEnd = addMinutes(currentTime, SLOT_DURATION_MINUTES);
    if (isBefore(slotEnd, workEndTime) || slotEnd.getTime() === workEndTime.getTime()) {
      potentialSlots.push({ start: new Date(currentTime), end: slotEnd });
    }
    currentTime = slotEnd;
  }

  let booked: { start: Date; end: Date }[] = [];
  try {
    const intervals = await listBusyIntervals(startOfDay(selectedDate).toISOString(), endOfDay(selectedDate).toISOString());
    booked = intervals.map((interval) => ({ start: parseISO(interval.startsAt), end: parseISO(interval.endsAt) }));
  } catch (error) {
    console.error("Booking store query failed:", error instanceof Error ? error.message : error);
    return NextResponse.json({ success: false, error: "Could not read booked times.", slots: [] }, { status: 500 });
  }

  const now = new Date();
  const availableSlots = potentialSlots.filter((potentialSlot) => {
    if (isBefore(potentialSlot.start, now)) return false;
    return !booked.some(
      (bookedSlot) => isBefore(potentialSlot.start, bookedSlot.end) && isAfter(potentialSlot.end, bookedSlot.start),
    );
  });

  return NextResponse.json({
    success: true,
    slots: availableSlots.map((slot) => ({
      start: format(slot.start, "yyyy-MM-dd'T'HH:mm:ssXXX"),
      end: format(slot.end, "yyyy-MM-dd'T'HH:mm:ssXXX"),
      display: `${format(slot.start, "HH:mm")} - ${format(slot.end, "HH:mm")}`,
    })),
  });
}
