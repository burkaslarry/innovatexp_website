/**
 * Single source for public conversion CTAs.
 * Primary: book a 30-min Business Workflow Diagnosis.
 * Secondary (once on homepage): WhatsApp via /api/whatsapp.
 */
import { withLocale, type AppLocale } from "@/lib/i18n-routing";
import { buildWhatsAppHref } from "@/lib/whatsapp-contact";
import { uiStrings } from "@/content/ui-strings";

/** Locale-agnostic booking path. */
export const BOOKING_PATH = "/bookme" as const;

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
  return withLocale(locale, BOOKING_PATH);
}

export function getWhatsAppHref(locale: AppLocale): string {
  return buildWhatsAppHref(uiStrings(locale).whatsappPrefill);
}

export function primaryCtaLabel(locale: AppLocale): string {
  const labels: Record<AppLocale, string> = {
    en: PRIMARY_CTA_LABEL_EN,
    "zh-hk": PRIMARY_CTA_LABEL_ZH,
    "zh-tw": "預約 30 分鐘業務診斷",
    ja: "30分の業務診断を予約",
    de: "30-Minuten-Diagnose buchen",
  };
  return labels[locale];
}

export function secondaryWhatsAppLabel(locale: AppLocale): string {
  const labels: Record<AppLocale, string> = {
    en: SECONDARY_WHATSAPP_LABEL_EN,
    "zh-hk": SECONDARY_WHATSAPP_LABEL_ZH,
    "zh-tw": "透過 WhatsApp 詢問",
    ja: "WhatsApp で相談",
    de: "Über WhatsApp fragen",
  };
  return labels[locale];
}
