import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

export const MINI_CHECK_CAMPAIGN = "workshop-2026-10-17";
export const MINI_CHECK_CAPACITY = 6;

export type MiniCheckRegistration = {
  name: string;
  company: string;
  website: string;
  websiteHost: string;
  service: string;
  email: string;
  whatsapp: string;
  question: string;
  locale: string;
};

let schemaReady: Promise<void> | null = null;

function getSql(): NeonQueryFunction<false, false> {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) throw new Error("DATABASE_URL not configured");
  return neon(url);
}

async function ensureSchema(sql: NeonQueryFunction<false, false>) {
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS ai_visibility_mini_registrations (
          id BIGSERIAL PRIMARY KEY,
          campaign TEXT NOT NULL,
          name TEXT NOT NULL,
          company TEXT NOT NULL,
          website TEXT NOT NULL,
          website_host TEXT NOT NULL,
          service TEXT NOT NULL,
          email TEXT,
          whatsapp TEXT,
          buyer_question TEXT,
          locale TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          UNIQUE (campaign, website_host)
        )
      `;
      await sql`
        CREATE OR REPLACE FUNCTION reserve_ai_visibility_mini(
          p_campaign TEXT, p_capacity INTEGER, p_name TEXT, p_company TEXT,
          p_website TEXT, p_website_host TEXT, p_service TEXT,
          p_email TEXT, p_whatsapp TEXT, p_question TEXT, p_locale TEXT
        ) RETURNS TABLE(outcome TEXT, lead_id BIGINT, seat_number INTEGER)
        LANGUAGE plpgsql AS $$
        DECLARE booked INTEGER; existing_id BIGINT; inserted_id BIGINT;
        BEGIN
          PERFORM pg_advisory_xact_lock(hashtextextended(p_campaign, 0));
          SELECT r.id INTO existing_id
          FROM ai_visibility_mini_registrations r
          WHERE r.campaign = p_campaign
            AND (r.website_host = p_website_host
              OR (p_email IS NOT NULL AND lower(r.email) = lower(p_email))
              OR (p_whatsapp IS NOT NULL AND r.whatsapp = p_whatsapp))
          LIMIT 1;
          IF existing_id IS NOT NULL THEN
            RETURN QUERY SELECT 'duplicate'::TEXT, existing_id, NULL::INTEGER;
            RETURN;
          END IF;
          SELECT count(*)::INTEGER INTO booked
          FROM ai_visibility_mini_registrations r WHERE r.campaign = p_campaign;
          IF booked >= p_capacity THEN
            RETURN QUERY SELECT 'full'::TEXT, NULL::BIGINT, NULL::INTEGER;
            RETURN;
          END IF;
          INSERT INTO ai_visibility_mini_registrations
            (campaign, name, company, website, website_host, service, email, whatsapp, buyer_question, locale)
          VALUES
            (p_campaign, p_name, p_company, p_website, p_website_host, p_service,
             p_email, p_whatsapp, p_question, p_locale)
          RETURNING id INTO inserted_id;
          RETURN QUERY SELECT 'confirmed'::TEXT, inserted_id, booked + 1;
        END $$
      `;
    })().catch((error) => {
      schemaReady = null;
      throw error;
    });
  }
  await schemaReady;
}

export async function reserveMiniCheck(registration: MiniCheckRegistration) {
  const sql = getSql();
  await ensureSchema(sql);
  const rows = await sql`
    SELECT * FROM reserve_ai_visibility_mini(
      ${MINI_CHECK_CAMPAIGN}, ${MINI_CHECK_CAPACITY}, ${registration.name},
      ${registration.company}, ${registration.website}, ${registration.websiteHost},
      ${registration.service}, ${registration.email || null}, ${registration.whatsapp || null},
      ${registration.question || null}, ${registration.locale}
    )
  `;
  const row = rows[0];
  return {
    outcome: String(row?.outcome || "error") as "confirmed" | "duplicate" | "full" | "error",
    leadId: row?.lead_id ? Number(row.lead_id) : null,
    seatNumber: row?.seat_number ? Number(row.seat_number) : null,
  };
}

export async function miniCheckCapacity() {
  const sql = getSql();
  await ensureSchema(sql);
  const rows = await sql`
    SELECT count(*)::INTEGER AS booked FROM ai_visibility_mini_registrations
    WHERE campaign = ${MINI_CHECK_CAMPAIGN}
  `;
  return Math.max(0, MINI_CHECK_CAPACITY - Number(rows[0]?.booked || 0));
}
