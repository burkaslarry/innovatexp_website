import { Resend } from "resend";
import { getQuestionnaireNotifyEmail, getResendFromEmail } from "@/lib/resend-mail";

/** Contact and booking mail stays server-side; public Web3Forms keys cannot bypass this quota. */
export async function sendFormNotification(fields: Record<string, string>) {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return { success: false, allSucceeded: false, message: "Email service unavailable." };
  const result = await new Resend(key).emails.send({
    from: getResendFromEmail(),
    to: [getQuestionnaireNotifyEmail()],
    replyTo: fields.email,
    subject: fields.subject || "Website enquiry",
    text: [`Name: ${fields.name || fields.senderName || "-"}`, `Email: ${fields.email}`, "", fields.message].join("\n"),
  });
  return { success: !result.error, allSucceeded: !result.error, message: result.error?.message, ok: !result.error };
}
