import {
  BOOKING_CTA_EVENT,
  type BookingCtaPlacement,
} from "@/content/cta-config";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    plausible?: (event: string, options?: { props?: Record<string, string | number | boolean> }) => void;
  }
}

/**
 * Fire the primary conversion event to GA4 and/or Plausible when present.
 * Safe no-op if neither script is loaded.
 */
export function trackBookingCtaClick(placement: BookingCtaPlacement): void {
  if (typeof window === "undefined") return;

  const props = { placement };

  try {
    window.gtag?.("event", BOOKING_CTA_EVENT, {
      event_category: "conversion",
      event_label: placement,
      placement,
    });
  } catch {
    /* ignore analytics errors */
  }

  try {
    window.plausible?.(BOOKING_CTA_EVENT, { props });
  } catch {
    /* ignore analytics errors */
  }
}
