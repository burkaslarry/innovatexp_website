/**
 * Website records live in Neon. The site does not use a Notion client.
 */
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let schemaReady: Promise<void> | null = null;

function getSql(): NeonQueryFunction<false, false> | null {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) return null;
  return neon(url);
}

async function ensureSchema() {
  const sql = getSql();
  if (!sql) throw new Error("DATABASE_URL not configured");
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS calendar_bookings (
          id BIGSERIAL PRIMARY KEY,
          visitor_name VARCHAR(255) NOT NULL,
          visitor_email VARCHAR(255) NOT NULL,
          visitor_phone VARCHAR(64),
          visitor_company VARCHAR(255),
          starts_at TIMESTAMPTZ NOT NULL,
          ends_at TIMESTAMPTZ NOT NULL,
          message TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS idx_calendar_bookings_range ON calendar_bookings (starts_at, ends_at)`;
      await sql`
        CREATE TABLE IF NOT EXISTS newsletter_subscribers (
          id BIGSERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          interests JSONB,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers (email)`;
    })().catch((err) => {
      schemaReady = null;
      throw err;
    });
  }
  await schemaReady;
}

export type BusyInterval = { startsAt: string; endsAt: string };

export async function listBusyIntervals(dayStartIso: string, dayEndIso: string): Promise<BusyInterval[]> {
  const sql = getSql();
  if (!sql) return [];
  await ensureSchema();
  const rows = await sql`
    SELECT starts_at, ends_at
    FROM calendar_bookings
    WHERE starts_at < ${dayEndIso}::timestamptz
      AND ends_at > ${dayStartIso}::timestamptz
  `;
  return rows.map((row) => ({
    startsAt: new Date(row.starts_at as string).toISOString(),
    endsAt: new Date(row.ends_at as string).toISOString(),
  }));
}

export async function insertCalendarBooking(input: {
  name: string;
  email: string;
  phone: string;
  company: string;
  startsAt: string;
  endsAt: string;
  message: string;
}): Promise<{ ok: boolean; id?: number; skipped?: boolean; error?: string }> {
  const sql = getSql();
  if (!sql) return { ok: false, skipped: true, error: "DATABASE_URL not configured" };
  try {
    await ensureSchema();
    const rows = await sql`
      INSERT INTO calendar_bookings (
        visitor_name, visitor_email, visitor_phone, visitor_company, starts_at, ends_at, message
      ) VALUES (
        ${input.name},
        ${input.email},
        ${input.phone || null},
        ${input.company || null},
        ${input.startsAt}::timestamptz,
        ${input.endsAt}::timestamptz,
        ${input.message || null}
      )
      RETURNING id
    `;
    const id = Number(rows[0]?.id);
    return { ok: true, id: Number.isFinite(id) ? id : undefined };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Insert failed" };
  }
}

export async function insertNewsletterSubscriber(input: {
  name: string;
  email: string;
  interests: string[];
}): Promise<{ ok: boolean; skipped?: boolean; error?: string }> {
  const sql = getSql();
  if (!sql) return { ok: false, skipped: true, error: "DATABASE_URL not configured" };
  try {
    await ensureSchema();
    await sql`
      INSERT INTO newsletter_subscribers (name, email, interests)
      VALUES (${input.name}, ${input.email}, ${JSON.stringify(input.interests)}::jsonb)
    `;
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Insert failed" };
  }
}
