// app/api/calendar/slots/route.ts
import { NextResponse } from 'next/server';
import { CALENDAR_DB_ID } from '@/lib/notion';
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
    if (CALENDAR_DB_ID && CALENDAR_DB_ID !== 'YOUR_NOTION_DATABASE_ID') {
      try {
        const notionToken = process.env.NOTION_TOKEN;
        if (!notionToken) {
          throw new Error('NOTION_TOKEN not configured');
        }

        console.log(`🔍 Querying Notion for date: ${dateParam}`);
        console.log(`📅 Notion DB ID: ${CALENDAR_DB_ID.substring(0, 8)}...`);

        // Use Notion API REST endpoint directly
        const response = await fetch(`https://api.notion.com/v1/databases/${CALENDAR_DB_ID}/query`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${notionToken}`,
            'Notion-Version': '2024-06-15',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page_size: 100,
          }),
        });

        if (!response.ok) {
          throw new Error(`Notion API returned ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(`📊 Found ${data.results.length} events in Notion`);

        // Extract booked slots from results
        bookedSlots = data.results
          .map((page: any) => {
            const props = page.properties;
            
            // Try to find a date property
            let startDateStr: string | null = null;
            let endDateStr: string | null = null;
            
            // Search for date properties dynamically
            for (const propName in props) {
              const prop = props[propName];
              if (prop.type === 'date' && prop.date) {
                startDateStr = prop.date.start;
                endDateStr = prop.date.end;
                break;
              }
            }
            
            if (!startDateStr) {
              return null;
            }

            const start = parseISO(startDateStr);
            let end = endDateStr ? parseISO(endDateStr) : null;

            if (start && !end) {
              end = addMinutes(start, SLOT_DURATION_MINUTES);
            }

            // Only include events on the selected date
            if (start.toDateString() === selectedDate.toDateString()) {
              console.log(`  📌 Booked: ${format(start, 'yyyy-MM-dd HH:mm')} - ${end ? format(end, 'HH:mm') : 'N/A'}`);
              return { start, end: end! };
            }

            return null;
          })
          .filter(Boolean);

        notionStatus = 'success';
        console.log(`✅ Processed ${bookedSlots.length} booked slots`);
      } catch (notionError: any) {
        // If Notion query fails, gracefully degrade
        notionStatus = 'api-error';
        notionErrorMessage = notionError?.message || 'Unknown Notion API error';
        console.error('⚠️ Notion query failed:', notionErrorMessage);
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
