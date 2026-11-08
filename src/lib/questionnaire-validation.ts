import { getConsultationCopy } from "@/content/questionnaires/consultation";
import { isValidLocale } from "@/lib/i18n-routing";
import { validTimezone } from "@/lib/booking-slots";

export function validateQuestionnaire(body: unknown): string | null {
  if (!body || typeof body !== "object" || Array.isArray(body)) return "Invalid form";
  const b = body as Record<string, unknown>;
  if (typeof b.submissionId !== "string" || !/^[a-f0-9-]{36}$/.test(b.submissionId) || b.consent !== true) return "Consent and submission reference required";
  if (b.pathId !== "ai-consultation-questionnaire" && b.pathId !== "ai-feedback-questionnaire") return "Invalid form type";
  if (typeof b.locale !== "string" || !isValidLocale(b.locale)) return "Invalid locale";
  if (!b.answers || typeof b.answers !== "object" || Array.isArray(b.answers)) return "Invalid answers";
  const answers = b.answers as Record<string, unknown>;
  if (Object.keys(answers).length > 50 || Object.entries(answers).some(([key, v]) => key.length > 80 ||
    (typeof v === "string" ? v.length > 4000 : !Array.isArray(v) || v.length > 12 || v.some((x) => typeof x !== "string" || x.length > 200)))) return "Answers too large";
  if (Object.entries(b).some(([key, v]) => key !== "answers" && typeof v === "string" && v.length > (key === "formattedQa" ? 16000 : 255))) return "Field too large";
  if (b.pathId === "ai-consultation-questionnaire") {
    for (const field of getConsultationCopy(b.locale).questions) {
      if (field.showWhen) {
        const parent = answers[field.showWhen.fieldId];
        if (!(Array.isArray(parent) ? parent.includes(field.showWhen.optionId) : parent === field.showWhen.optionId)) continue;
      }
      const value = answers[field.id];
      if (value !== undefined && (field.type === "multi" ? !Array.isArray(value) : typeof value !== "string")) return "Invalid answer type";
      if (field.required && (Array.isArray(value) ? !value.length : typeof value !== "string" || !value.trim())) return "Required answer missing";
      if (value && field.options) {
        const values = Array.isArray(value) ? value : [value];
        if (values.some((v) => !field.options!.some((o) => o.id === v))) return "Invalid option";
      }
    }
    if (!validTimezone(answers.timezone)) return "Invalid operating timezone";
  }
  return null;
}
