// app/api/calendar/slots/route.ts
import { NextResponse } from 'next/server';
import { notion, CALENDAR_DB_ID, NOTION_BUSY_DB_ID } from '@/lib/notion';
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
} from 'date-fns';

const WORK_START_HOUR = 10;
const WORK_END_HOUR = 20;
const SLOT_DURATION_MINUTES = 60;

const NOTION_DATE_PROPERTY =
  process.env.NOTION_CALENDAR_DATE_PROPERTY?.trim() || 'Date';
const NOTION_BUSY_DATE_PROPERTY =
  process.env.NOTION_BUSY_DATE_PROPERTY?.trim() || NOTION_DATE_PROPERTY;

type BlockInterval = { start: Date; end: Date };

/**
 * Notion Date → busy interval on the selected calendar day.
 * - Date-only (yyyy-MM-dd): blocks entire working window that day.
 * - DateTime + end (e.g. 14:00–17:00): blocks that exact range.
 * - DateTime, no end: 1-hour block (typical single booking row).
 */
function notionDateToBlockInterval(
  startStr: string,
  endStr: string | null | undefined,
  day: Date,
  workStart: number,
  workEnd: number,
  defaultDurationMin: number
): BlockInterval | null {
  const startTrim = startStr.trim();
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(startTrim);

  const dayKey = format(startOfDay(day), 'yyyy-MM-dd');
  const workDayStart = setMinutes(setHours(startOfDay(day), workStart), 0);
  const workDayEnd = setHours(startOfDay(day), workEnd);

  if (dateOnly) {
    if (startTrim !== dayKey) return null;
    return { start: workDayStart, end: workDayEnd };
  }

  const start = parseISO(startTrim);
  if (Number.isNaN(start.getTime())) return null;

  let end: Date;
  if (endStr?.trim()) {
    end = parseISO(endStr.trim());
    if (Number.isNaN(end.getTime())) {
      end = addMinutes(start, defaultDurationMin);
    }
  } else {
    end = addMinutes(start, defaultDurationMin);
  }

  const selStart = startOfDay(day);
  const selEnd = endOfDay(day);
  if (end <= selStart || start >= selEnd) {
    return null;
  }

  const clippedStart = start < workDayStart ? workDayStart : start;
  const clippedEnd = end > workDayEnd ? workDayEnd : end;
  if (!isBefore(clippedStart, clippedEnd)) return null;

  return { start: clippedStart, end: clippedEnd };
}

async function queryBlockedIntervalsForDay(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  n: any,
  databaseId: string,
  dateProperty: string,
  day: Date
): Promise<BlockInterval[]> {
  const dayStart = format(day, 'yyyy-MM-dd');
  const dayEnd = format(day, 'yyyy-MM-dd');
  const blocks: BlockInterval[] = [];
  let cursor: string | undefined;

  do {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await n.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: dateProperty,
            date: { on_or_after: dayStart },
          },
          {
            property: dateProperty,
            date: { on_or_before: dayEnd },
          },
        ],
      },
      sorts: [{ property: dateProperty, direction: 'ascending' }],
      page_size: 100,
      start_cursor: cursor,
    });

    for (const page of response.results) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const props = (page as any).properties;
      const dateProp = props?.[dateProperty];
      if (!dateProp || dateProp.type !== 'date' || !dateProp.date?.start) {
        continue;
      }
      const interval = notionDateToBlockInterval(
        dateProp.date.start,
        dateProp.date.end,
        day,
        WORK_START_HOUR,
        WORK_END_HOUR,
        SLOT_DURATION_MINUTES
      );
      if (interval) {
        blocks.push(interval);
        console.log(
          `  📌 Block: ${format(interval.start, 'yyyy-MM-dd HH:mm')} → ${format(interval.end, 'HH:mm')}`
        );
      }
    }
    cursor = response.has_more ? response.next_cursor : undefined;
  } while (cursor);

  return blocks;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get('date');

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

    const potentialSlots: { start: Date; end: Date }[] = [];
    let currentTime = setMinutes(setHours(selectedDate, WORK_START_HOUR), 0);
    const workEndTime = setHours(selectedDate, WORK_END_HOUR);

    while (isBefore(currentTime, workEndTime)) {
      const slotEnd = addMinutes(currentTime, SLOT_DURATION_MINUTES);
      if (
        isBefore(slotEnd, workEndTime) ||
        slotEnd.getTime() === workEndTime.getTime()
      ) {
        potentialSlots.push({ start: new Date(currentTime), end: slotEnd });
      }
      currentTime = slotEnd;
    }

    let bookedSlots: BlockInterval[] = [];
    let notionStatus: 'success' | 'not-configured' | 'api-error' =
      'not-configured';
    let notionErrorMessage: string | null = null;

    const configured =
      notion &&
      CALENDAR_DB_ID &&
      CALENDAR_DB_ID !== 'YOUR_NOTION_DATABASE_ID';

    if (configured) {
      try {
        const dbIds: { id: string; prop: string; label: string }[] = [
          {
            id: CALENDAR_DB_ID!,
            prop: NOTION_DATE_PROPERTY,
            label: 'bookings',
          },
        ];
        if (
          NOTION_BUSY_DB_ID &&
          NOTION_BUSY_DB_ID !== CALENDAR_DB_ID &&
          NOTION_BUSY_DB_ID !== 'YOUR_NOTION_DATABASE_ID'
        ) {
          dbIds.push({
            id: NOTION_BUSY_DB_ID,
            prop: NOTION_BUSY_DATE_PROPERTY,
            label: 'busy-calendar',
          });
        }

        const n = notion;
        for (const { id, prop, label } of dbIds) {
          console.log(
            `🔍 Notion [${label}] DB ${id.substring(0, 8)}… date="${prop}" for ${format(selectedDate, 'yyyy-MM-dd')}`
          );
          const part = await queryBlockedIntervalsForDay(
            n,
            id,
            prop,
            selectedDate
          );
          bookedSlots = bookedSlots.concat(part);
        }

        notionStatus = 'success';
        console.log(
          `✅ Total ${bookedSlots.length} blocked interval(s) from Notion (bookings + busy)`
        );
      } catch (notionError: unknown) {
        notionStatus = 'api-error';
        notionErrorMessage =
          (notionError as Error)?.message || 'Unknown Notion API error';
        console.error('⚠️ Notion query failed:', notionErrorMessage);
      }
    } else {
      console.warn(
        '⚠️ Notion not configured - set NOTION_CALENDAR_DB_ID (and optionally NOTION_BUSY_DB_ID for your main calendar)'
      );
    }

    const now = new Date();
    const availableSlots = potentialSlots.filter(potentialSlot => {
      if (isBefore(potentialSlot.start, now)) {
        return false;
      }
      const isBooked = bookedSlots.some(bookedSlot => {
        return (
          isBefore(potentialSlot.start, bookedSlot.end) &&
          isAfter(potentialSlot.end, bookedSlot.start)
        );
      });
      return !isBooked;
    });

    const formattedAvailableSlots = availableSlots.map(slot => ({
      start: format(slot.start, "yyyy-MM-dd'T'HH:mm:ssXXX"),
      end: format(slot.end, "yyyy-MM-dd'T'HH:mm:ssXXX"),
      display:
        format(slot.start, 'HH:mm') + ' - ' + format(slot.end, 'HH:mm'),
    }));

    return NextResponse.json({
      success: notionStatus !== 'api-error',
      slots: formattedAvailableSlots,
      notionStatus,
      notionErrorMessage: notionErrorMessage || undefined,
      sources: {
        bookingsDb: Boolean(CALENDAR_DB_ID && CALENDAR_DB_ID !== 'YOUR_NOTION_DATABASE_ID'),
        busyDb: Boolean(
          NOTION_BUSY_DB_ID &&
            NOTION_BUSY_DB_ID !== CALENDAR_DB_ID &&
            NOTION_BUSY_DB_ID !== 'YOUR_NOTION_DATABASE_ID'
        ),
      },
    });
  } catch (error) {
    console.error('Error fetching calendar slots:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred while fetching available slots',
        notionStatus: 'server-error',
        slots: [],
      },
      { status: 500 }
    );
  }
}
