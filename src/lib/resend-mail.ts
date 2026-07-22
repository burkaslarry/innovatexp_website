import { Resend } from "resend";

export type QuestionnaireEmailPayload = {
  subject: string;
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
};

function getResendClient(): Resend | null {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return null;
  return new Resend(key);
}

export function getQuestionnaireNotifyEmail(): string {
  return (
    process.env.QUESTIONNAIRE_NOTIFY_EMAIL?.trim() ||
    process.env.LEAD_NOTIFY_EMAIL?.trim() ||
    "info@innovatexp.co"
  );
}

export function getResendFromEmail(): string {
  return (
    process.env.RESEND_FROM_EMAIL?.trim() ||
    process.env.RESEND_FROM?.trim() ||
    "InnovateXP <onboarding@resend.dev>"
  );
}

export async function sendQuestionnaireResendEmail(
  payload: QuestionnaireEmailPayload,
): Promise<{ ok: boolean; id?: string; error?: string; skipped?: boolean }> {
  const client = getResendClient();
  if (!client) {
    return { ok: false, skipped: true, error: "RESEND_API_KEY not configured" };
  }

  const to = getQuestionnaireNotifyEmail();
  const from = getResendFromEmail();

  const text = [
    `Questionnaire: ${payload.questionnaireType}`,
    `Name: ${payload.name}`,
    `Company: ${payload.company}`,
    `Profession / role: ${payload.profession}`,
    `Email: ${payload.email}`,
    `Phone / WhatsApp: ${payload.phone}`,
    payload.industry ? `Industry: ${payload.industry}` : null,
    payload.urgency ? `Urgency: ${payload.urgency}` : null,
    payload.interest ? `Interest: ${payload.interest}` : null,
    "",
    "—— Answers ——",
    payload.formattedQa,
  ]
    .filter((line) => line !== null)
    .join("\n");

  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;line-height:1.5;color:#1a1c1e">
      <h2 style="margin:0 0 12px">New ${escapeHtml(payload.questionnaireType)}</h2>
      <table style="border-collapse:collapse;width:100%;max-width:640px">
        ${row("Name", payload.name)}
        ${row("Company", payload.company)}
        ${row("Profession / role", payload.profession)}
        ${row("Email", payload.email)}
        ${row("Phone / WhatsApp", payload.phone)}
        ${payload.industry ? row("Industry", payload.industry) : ""}
        ${payload.urgency ? row("Urgency", payload.urgency) : ""}
        ${payload.interest ? row("Interest", payload.interest) : ""}
      </table>
      <h3 style="margin:24px 0 8px">Answers</h3>
      <pre style="white-space:pre-wrap;background:#f7f9fc;padding:16px;border-radius:12px;font-size:13px">${escapeHtml(payload.formattedQa)}</pre>
    </div>
  `;

  try {
    const result = await client.emails.send({
      from,
      to: [to],
      replyTo: payload.email.includes("@") ? payload.email : undefined,
      subject: payload.subject,
      text,
      html,
    });

    if (result.error) {
      return { ok: false, error: result.error.message };
    }
    return { ok: true, id: result.data?.id };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Resend send failed" };
  }
}

function row(label: string, value: string) {
  return `<tr><td style="padding:6px 8px;font-weight:700;vertical-align:top;width:160px">${escapeHtml(label)}</td><td style="padding:6px 8px">${escapeHtml(value)}</td></tr>`;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
