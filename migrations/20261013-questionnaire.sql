-- Questionnaire leads. Safe to re-run; no data removal.
BEGIN;
CREATE TABLE IF NOT EXISTS innovatexp_website_questionnaire_leads (
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
  submission_id UUID UNIQUE,
  notification_sent_at TIMESTAMPTZ,
  notification_locked_until TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE innovatexp_website_questionnaire_leads ADD COLUMN IF NOT EXISTS submission_id UUID;
ALTER TABLE innovatexp_website_questionnaire_leads ADD COLUMN IF NOT EXISTS notification_sent_at TIMESTAMPTZ;
ALTER TABLE innovatexp_website_questionnaire_leads ADD COLUMN IF NOT EXISTS notification_locked_until TIMESTAMPTZ;
CREATE UNIQUE INDEX IF NOT EXISTS innovatexp_website_questionnaire_submission_id ON innovatexp_website_questionnaire_leads(submission_id);
CREATE INDEX IF NOT EXISTS idx_innovatexp_website_questionnaire_leads_created_at ON innovatexp_website_questionnaire_leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_innovatexp_website_questionnaire_leads_email ON innovatexp_website_questionnaire_leads (email);
CREATE INDEX IF NOT EXISTS idx_innovatexp_website_questionnaire_leads_type ON innovatexp_website_questionnaire_leads (questionnaire_type);
COMMIT;
