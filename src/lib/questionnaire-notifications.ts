import { neon } from "@neondatabase/serverless";
import { sendQuestionnaireResendEmail } from "@/lib/resend-mail";
import { submitToWeb3FormsContact } from "@/lib/web3forms-submit";

export async function notifyQuestionnaireLead(id: number) {
  const url = process.env.DATABASE_URL;
  if (!url) return false;
  const sql = neon(url);
  const rows = await sql`UPDATE questionnaire_leads SET notification_locked_until = NOW() + INTERVAL '5 minutes'
    WHERE id = ${id} AND notification_sent_at IS NULL AND (notification_locked_until IS NULL OR notification_locked_until < NOW()) RETURNING *`;
  if (!rows.length) return false;
  const lead = rows[0];
  try {
    const recipient = process.env.QUESTIONNAIRE_TEST_EMAIL || lead.email || "noreply@innovatexp.co";
    const subject = `${lead.questionnaire_type} — ${lead.company}`;
    const result = await sendQuestionnaireResendEmail({ subject, questionnaireType: String(lead.questionnaire_type), name: String(lead.name), company: String(lead.company), profession: String(lead.profession || ""), email: String(recipient), phone: String(lead.phone || ""), industry: String(lead.industry || ""), urgency: String(lead.urgency || ""), interest: String(lead.interest || ""), formattedQa: String(lead.answers_text) });
    const success = result.ok || (await submitToWeb3FormsContact({ subject, from_name: "InnovateXP Limited", name: String(lead.name), email: String(recipient), message: String(lead.answers_text) })).success;
    if (success) await sql`UPDATE questionnaire_leads SET notification_sent_at = NOW(), notification_locked_until = NULL WHERE id = ${id}`;
    else await sql`UPDATE questionnaire_leads SET notification_locked_until = NOW() + INTERVAL '5 minutes' WHERE id = ${id}`;
    return success;
  } catch { return false; }
}
export async function retryQuestionnaireNotifications() {
  const url = process.env.DATABASE_URL; if (!url) throw new Error("Database unavailable");
  const rows = await neon(url)`SELECT id FROM questionnaire_leads WHERE submission_id IS NOT NULL AND notification_sent_at IS NULL
    AND (notification_locked_until IS NULL OR notification_locked_until < NOW()) ORDER BY created_at LIMIT 10`;
  return Promise.all(rows.map((r) => notifyQuestionnaireLead(Number(r.id))));
}
