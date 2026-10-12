-- Existing questionnaire table must be present. Additive, no data removal.
BEGIN;
ALTER TABLE questionnaire_leads ADD COLUMN IF NOT EXISTS submission_id UUID;
ALTER TABLE questionnaire_leads ADD COLUMN IF NOT EXISTS notification_sent_at TIMESTAMPTZ;
ALTER TABLE questionnaire_leads ADD COLUMN IF NOT EXISTS notification_locked_until TIMESTAMPTZ;
CREATE UNIQUE INDEX IF NOT EXISTS questionnaire_submission_id ON questionnaire_leads(submission_id);
COMMIT;
