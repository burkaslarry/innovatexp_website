/**
 * Single source for public conversion CTAs.
 * Primary: book a 30-min Business Workflow Diagnosis.
 * Secondary (once on homepage): WhatsApp via /api/whatsapp.
 */
import { withLocale, type AppLocale } from "@/lib/i18n-routing";
import { buildWhatsAppHref } from "@/lib/whatsapp-contact";
import { uiStrings } from "@/content/ui-strings";

/** Locale-agnostic path fallback when TODO_BOOKING_URL is unset. */
export const BOOKING_PATH = "/bookme" as const;

/**
 * Canonical booking URL (required).
 * getBookingHref() injects the active locale: https://innovatexp.co/{locale}/bookme
 */
export const TODO_BOOKING_URL = "https://innovatexp.co/bookme" as const;

export const PRIMARY_CTA_LABEL_ZH = "預約 30 分鐘業務聽診";
export const PRIMARY_CTA_LABEL_EN = "Book a 30-min diagnosis";
export const SECONDARY_WHATSAPP_LABEL_ZH = "WhatsApp 直接問";
export const SECONDARY_WHATSAPP_LABEL_EN = "Ask on WhatsApp";

/** GA4 / Plausible event name for the primary conversion CTA. */
export const BOOKING_CTA_EVENT = "book_diagnosis_click" as const;

export type BookingCtaPlacement =
  | "header"
  | "header_mobile"
  | "hero"
  | "case_study"
  | "final_cta"
  | "page_footer"
  | "other";

export function getBookingHref(locale: AppLocale): string {
  if (TODO_BOOKING_URL) {
    try {
      const url = new URL(TODO_BOOKING_URL);
      const path = url.pathname.replace(/\/$/, "") || "/";
      if (path === "/bookme") {
        url.pathname = `/${locale}/bookme`;
      }
      return url.toString();
    } catch {
      return TODO_BOOKING_URL;
    }
  }
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
