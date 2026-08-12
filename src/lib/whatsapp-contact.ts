/** Larry's public WhatsApp (digits only, for wa.me). Env overrides when set. */
export const DEFAULT_WHATSAPP_DIGITS = "85293103031";

export function getWhatsAppDigits(): string {
  const fromEnv = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^\d]/g, "");
  return fromEnv || DEFAULT_WHATSAPP_DIGITS;
}

export function buildWhatsAppHref(prefill: string): string {
  return `https://wa.me/${getWhatsAppDigits()}?text=${encodeURIComponent(prefill)}`;
}
