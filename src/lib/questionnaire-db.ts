/**
 * Questionnaire leads → Neon Postgres.
 *
 * Env: DATABASE_URL (Neon pooled or direct connection string)
 */
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

export type QuestionnaireDbPayload = {
  pathId: string;
  questionnaireType: string;
  name: string;
  company: string;
  profession: string;
  email: string;
  phone: string;
  industry?: string;
  urgency?: string;
  interest?: string;
  formattedQa: string;
  answers?: Record<string, string | string[]>;
};

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
        CREATE TABLE IF NOT EXISTS questionnaire_leads (
          id BIGSERIAL PRIMARY KEY,
          path_id VARCHAR(128) NOT NULL DEFAULT 'questionnaire',
          questionnaire_type VARCHAR(255) NOT NULL,
          name VARCHAR(255) NOT NULL,
          company VARCHAR(255),
          profession VARCHAR(255),
          email VARCHAR(255),
          phone VARCHAR(64),
          industry VARCHAR(255),
          urgency VARCHAR(255),
          interest VARCHAR(255),
          answers_text TEXT NOT NULL,
          answers_json JSONB,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS idx_questionnaire_leads_created_at ON questionnaire_leads (created_at DESC)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_questionnaire_leads_email ON questionnaire_leads (email)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_questionnaire_leads_type ON questionnaire_leads (questionnaire_type)`;
    })().catch((err) => {
      schemaReady = null;
      throw err;
    });
  }
  await schemaReady;
}

export async function insertQuestionnaireLead(
  payload: QuestionnaireDbPayload,
): Promise<{ ok: boolean; id?: number; error?: string; skipped?: boolean }> {
  const sql = getSql();
  if (!sql) {
    return { ok: false, skipped: true, error: "DATABASE_URL not configured" };
  }

  try {
    await ensureSchema();
    const rows = await sql`
      INSERT INTO questionnaire_leads (
        path_id,
        questionnaire_type,
        name,
        company,
        profession,
        email,
        phone,
        industry,
        urgency,
        interest,
        answers_text,
        answers_json
      ) VALUES (
        ${payload.pathId},
        ${payload.questionnaireType},
        ${payload.name},
        ${payload.company},
        ${payload.profession},
        ${payload.email},
        ${payload.phone},
        ${payload.industry || null},
        ${payload.urgency || null},
        ${payload.interest || null},
        ${payload.formattedQa},
        ${payload.answers ?? null}
      )
      RETURNING id
    `;
    const id = Number(rows[0]?.id);
    return { ok: true, id: Number.isFinite(id) ? id : undefined };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Database insert failed",
    };
  }
}
