import { PHONE_DIAL_CUSTOM } from "@/lib/phone-dial-codes";

/** Normalise HK WhatsApp input to E.164 +852… for links and CRM. */
export function normalizeHKWhatsapp(input: string): string {
  const raw = input.trim();
  if (!raw) return "";
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 0) return raw;
  if (raw.startsWith("+") && digits.length >= 8) {
    return `+${digits}`;
  }
  if (digits.startsWith("852")) {
    return `+${digits}`;
  }
  if (digits.length === 8) {
    return `+852${digits}`;
  }
  if (digits.length >= 9 && !digits.startsWith("852")) {
    return `+${digits}`;
  }
  return `+852${digits}`;
}

/** E.164: max 15 digits total including country code (ITU-T E.164). */
const E164_MIN_TOTAL = 8;
const E164_MAX_TOTAL = 15;

/**
 * Build E.164 from country calling code + national number (digits only in local part).
 * If `selectedDial` is PHONE_DIAL_CUSTOM, use `customDialDigits` (1–3 digits) as CC.
 */
export function normalizeWhatsappE164(
  selectedDial: string,
  nationalNumberInput: string,
  customDialDigits: string,
): string {
  let cc = selectedDial.replace(/\D/g, "");
  if (selectedDial === PHONE_DIAL_CUSTOM) {
    cc = customDialDigits.replace(/\D/g, "").slice(0, 3);
  }
  const national = nationalNumberInput.replace(/\D/g, "");
  if (!cc || !national) return "";
  const all = `${cc}${national}`;
  if (all.length < E164_MIN_TOTAL || all.length > E164_MAX_TOTAL) return "";
  return `+${all}`;
}
