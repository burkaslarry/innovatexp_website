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

/** Count a completed calendar reservation as the conversion for future headline tests. */
export function trackBookingConfirmed(): void {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", "booking_confirmed", { event_category: "conversion" });
  } catch {
    /* ignore analytics errors */
  }
  try {
    window.plausible?.("booking_confirmed");
  } catch {
    /* ignore analytics errors */
  }
}
