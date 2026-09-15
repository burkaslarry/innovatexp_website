/**
 * Single source for public conversion CTAs.
 * Primary: book a 30-min Business Workflow Diagnosis.
 * Secondary (once on homepage): WhatsApp via /api/whatsapp.
 */
import { withLocale, type AppLocale } from "@/lib/i18n-routing";
import { buildWhatsAppHref } from "@/lib/whatsapp-contact";
import { uiStrings } from "@/content/ui-strings";

/** Locale-agnostic path; always prefix with withLocale / useLocalizedHref. */
export const BOOKING_PATH = "/bookme" as const;

/**
 * If BOOKING_PATH ever becomes an external URL, set it here and use getBookingHref.
 * Keep as path so locale routing stays correct.
 */
export const TODO_BOOKING_URL = null as string | null;

export const PRIMARY_CTA_LABEL_ZH = "預約 30 分鐘業務聽診";
export const PRIMARY_CTA_LABEL_EN = "Book a 30-min diagnosis";
export const SECONDARY_WHATSAPP_LABEL_ZH = "WhatsApp 直接問";
export const SECONDARY_WHATSAPP_LABEL_EN = "Ask on WhatsApp";

export function getBookingHref(locale: AppLocale): string {
  if (TODO_BOOKING_URL) return TODO_BOOKING_URL;
  return withLocale(locale, BOOKING_PATH);
}

export function getWhatsAppHref(locale: AppLocale): string {
  return buildWhatsAppHref(uiStrings(locale).whatsappPrefill);
}

export function primaryCtaLabel(locale: AppLocale): string {
  return locale === "en" || locale === "de" || locale === "ja"
    ? PRIMARY_CTA_LABEL_EN
    : PRIMARY_CTA_LABEL_ZH;
}

export function secondaryWhatsAppLabel(locale: AppLocale): string {
  return locale === "en" || locale === "de" || locale === "ja"
    ? SECONDARY_WHATSAPP_LABEL_EN
    : SECONDARY_WHATSAPP_LABEL_ZH;
}
