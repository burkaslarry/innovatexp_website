// app/api/calendar/slots/route.ts
import { NextResponse } from 'next/server';
import { notion, CALENDAR_DB_ID } from '@/lib/notion';
import { 
  startOfDay, 
  endOfDay, 
  parseISO, 
  format, 
  addMinutes, 
  isBefore, 
  setHours, 
  setMinutes,
  isAfter
} from 'date-fns';

// Define daily booking hours (e.g., 10 AM to 8 PM)
const WORK_START_HOUR = 10;
const WORK_END_HOUR = 20; // Up to 19:59, not including 20:00
const SLOT_DURATION_MINUTES = 60; // Each slot is 60 minutes

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

    // 2. Generate all potential booking slots for the day
    const potentialSlots: { start: Date; end: Date }[] = [];
    let currentTime = setMinutes(setHours(selectedDate, WORK_START_HOUR), 0);
    const workEndTime = setHours(selectedDate, WORK_END_HOUR);

    while (isBefore(currentTime, workEndTime)) {
      const slotEnd = addMinutes(currentTime, SLOT_DURATION_MINUTES);
      // Only add if slot ends before or at work end time
      if (isBefore(slotEnd, workEndTime) || slotEnd.getTime() === workEndTime.getTime()) {
        potentialSlots.push({ start: new Date(currentTime), end: slotEnd });
      }
      currentTime = slotEnd;
    }

    // 1. Try to fetch booked slots from Notion (if configured)
    let bookedSlots: { start: Date; end: Date }[] = [];
    let notionStatus: 'success' | 'not-configured' | 'api-error' = 'not-configured';
    let notionErrorMessage: string | null = null;
    
    // Check if Notion is properly configured
    if (notion && CALENDAR_DB_ID && CALENDAR_DB_ID !== 'YOUR_NOTION_DATABASE_ID') {
      try {
        const startOfSelectedDay = startOfDay(selectedDate);
        const endOfSelectedDay = endOfDay(selectedDate);

        // Format dates for Notion - use ISO format with time to ensure proper matching
        // Notion date filters work better with full ISO strings
        const startDateStr = format(startOfSelectedDay, "yyyy-MM-dd'T'00:00:00");
        const endDateStr = format(endOfSelectedDay, "yyyy-MM-dd'T'23:59:59");

        console.log(`🔍 Querying Notion for date: ${dateParam}`);
        console.log(`📅 Date range: ${startDateStr} to ${endDateStr}`);
        console.log(`📅 Notion DB ID: ${CALENDAR_DB_ID.substring(0, 8)}...`);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await (notion as any).databases.query({
          database_id: CALENDAR_DB_ID,
          filter: {
            and: [
              {
                property: 'Date',
                date: {
                  on_or_after: startDateStr,
                },
              },
              {
                property: 'Date',
                date: {
                  on_or_before: endDateStr,
                },
              },
            ],
          },
          sorts: [{ property: 'Date', direction: 'ascending' }],
        });

        console.log(`📊 Found ${response.results.length} existing events in Notion`);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        bookedSlots = response.results.map((page: any) => {
          const props = page.properties;
          const startDateStr = props.Date?.date?.start;
          const endDateStr = props.Date?.date?.end;

          const start = startDateStr ? parseISO(startDateStr) : null;
          let end = endDateStr ? parseISO(endDateStr) : null;

          if (start && !end) {
            // If no explicit end time, assume SLOT_DURATION_MINUTES
            end = addMinutes(start, SLOT_DURATION_MINUTES);
          }

          if (start) {
            console.log(`  📌 Booked: ${format(start, 'yyyy-MM-dd HH:mm')} - ${end ? format(end, 'HH:mm') : 'N/A'}`);
          }

          return { start: start!, end: end! };
        }).filter((slot: { start: Date; end: Date }) => slot.start && slot.end);

        notionStatus = 'success';
        console.log(`✅ Processed ${bookedSlots.length} booked slots`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (notionError: any) {
        // If Notion query fails, mark as API error
        notionStatus = 'api-error';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const err = notionError as any;
        notionErrorMessage = err?.message || 'Unknown Notion API error';
        console.error('❌ Notion query failed:', notionErrorMessage);
        console.error('Error details:', JSON.stringify(notionError, null, 2));
      }
    } else {
      console.warn('⚠️ Notion not configured - returning all slots as available');
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
