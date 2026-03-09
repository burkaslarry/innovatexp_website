// app/api/calendar/slots/route.ts
import { NextResponse } from 'next/server';
import { notion, CALENDAR_DB_ID } from '@/lib/notion';
import {
  parseISO,
  format,
  addMinutes,
  isBefore,
  setHours,
  setMinutes,
  isAfter,
} from 'date-fns';

// Define daily booking hours (e.g., 10 AM to 8 PM)
const WORK_START_HOUR = 10;
const WORK_END_HOUR = 20; // Up to 19:59, not including 20:00
const SLOT_DURATION_MINUTES = 60; // Each slot is 60 minutes

// Date property name in your 業務拜訪 (business visit) Notion database. Must match the DB.
const NOTION_DATE_PROPERTY = 'Date';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get('date'); // Expected format: YYYY-MM-DD

  if (!dateParam) {
    return NextResponse.json(
      {
        success: false,
        error: 'Date parameter is required.',
        notionStatus: 'invalid-request',
      },
      { status: 400 }
    );
  }

  try {
    const selectedDate = parseISO(dateParam);
    if (isNaN(selectedDate.getTime())) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid date format.',
          notionStatus: 'invalid-request',
        },
        { status: 400 }
      );
    }

    // 1. Generate all potential booking slots for the day
    const potentialSlots: { start: Date; end: Date }[] = [];
    let currentTime = setMinutes(setHours(selectedDate, WORK_START_HOUR), 0);
    const workEndTime = setHours(selectedDate, WORK_END_HOUR);

    while (isBefore(currentTime, workEndTime)) {
      const slotEnd = addMinutes(currentTime, SLOT_DURATION_MINUTES);
      if (isBefore(slotEnd, workEndTime) || slotEnd.getTime() === workEndTime.getTime()) {
        potentialSlots.push({ start: new Date(currentTime), end: slotEnd });
      }
      currentTime = slotEnd;
    }

    // 2. Fetch booked slots from 業務拜訪 Notion database (direct query by date)
    let bookedSlots: { start: Date; end: Date }[] = [];
    let notionStatus: 'success' | 'not-configured' | 'api-error' = 'not-configured';
    let notionErrorMessage: string | null = null;

    if (notion && CALENDAR_DB_ID && CALENDAR_DB_ID !== 'YOUR_NOTION_DATABASE_ID') {
      try {
        const dayStart = format(selectedDate, "yyyy-MM-dd");
        const dayEnd = format(selectedDate, "yyyy-MM-dd");

        console.log(`🔍 Querying 業務拜訪 Notion database for date: ${dayStart}`);
        console.log(`📅 Notion DB ID: ${CALENDAR_DB_ID.substring(0, 8)}...`);

        // Query the database directly: all pages whose Date falls on the selected day
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await (notion as any).databases.query({
          database_id: CALENDAR_DB_ID,
          filter: {
            and: [
              {
                property: NOTION_DATE_PROPERTY,
                date: { on_or_after: dayStart },
              },
              {
                property: NOTION_DATE_PROPERTY,
                date: { on_or_before: dayEnd },
              },
            ],
          },
          sorts: [{ property: NOTION_DATE_PROPERTY, direction: 'ascending' }],
        });

        const results = response.results;
        console.log(`📊 Found ${results.length} 業務拜訪 entries for ${dayStart}`);

        bookedSlots = results
          .map((page: unknown) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const props = (page as any).properties;
            const dateProp = props[NOTION_DATE_PROPERTY];
            if (!dateProp || dateProp.type !== 'date' || !dateProp.date) {
              return null;
            }
            const startDateStr = dateProp.date.start;
            const endDateStr = dateProp.date.end;
            if (!startDateStr) return null;

            const start = parseISO(startDateStr);
            const end = endDateStr ? parseISO(endDateStr) : addMinutes(start, SLOT_DURATION_MINUTES);

            if (start.toDateString() !== selectedDate.toDateString()) {
              return null;
            }
            console.log(`  📌 Booked: ${format(start, 'yyyy-MM-dd HH:mm')} - ${format(end, 'HH:mm')}`);
            return { start, end };
          })
          .filter((slot: { start: Date; end: Date } | null): slot is { start: Date; end: Date } => slot !== null);

        notionStatus = 'success';
        console.log(`✅ Processed ${bookedSlots.length} booked slots from 業務拜訪 database`);
      } catch (notionError: unknown) {
        notionStatus = 'api-error';
        notionErrorMessage = (notionError as Error)?.message || 'Unknown Notion API error';
        console.error('⚠️ Notion 業務拜訪 query failed:', notionErrorMessage);
      }
    } else {
      console.warn('⚠️ Notion not configured - set NOTION_CALENDAR_DB_ID to your 業務拜訪 database ID');
    }

    // 3. Filter out already booked slots
    const now = new Date();
    const availableSlots = potentialSlots.filter(potentialSlot => {
      // Skip slots that have already passed today
      if (isBefore(potentialSlot.start, now)) {
        return false;
      }

      // Check if this slot overlaps with any booked slot
      const isBooked = bookedSlots.some(bookedSlot => {
        // Overlap logic: (start1 < end2) && (end1 > start2)
        return (
          isBefore(potentialSlot.start, bookedSlot.end) && 
          isAfter(potentialSlot.end, bookedSlot.start)
        );
      });
      return !isBooked;
    });

    // 4. Format output
    const formattedAvailableSlots = availableSlots.map(slot => ({
      start: format(slot.start, "yyyy-MM-dd'T'HH:mm:ssXXX"),
      end: format(slot.end, "yyyy-MM-dd'T'HH:mm:ssXXX"),
      display: format(slot.start, 'HH:mm') + ' - ' + format(slot.end, 'HH:mm'),
    }));

    return NextResponse.json({ 
      success: notionStatus !== 'api-error',
      slots: formattedAvailableSlots,
      notionStatus,
      notionErrorMessage: notionErrorMessage || undefined,
    });

  } catch (error) {
    console.error('Error fetching calendar slots:', error);
    return NextResponse.json({
      success: false,
      error: 'An unexpected error occurred while fetching available slots',
      notionStatus: 'server-error',
      slots: [],
    }, { status: 500 });
  }
}
