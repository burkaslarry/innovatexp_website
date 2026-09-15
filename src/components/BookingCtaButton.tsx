"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { trackBookingCtaClick } from "@/lib/analytics";
import type { BookingCtaPlacement } from "@/content/cta-config";

const base =
  "btn-brand inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[var(--btn-radius)] px-6 py-3 text-center text-base font-semibold shadow-card transition-all duration-normal hover:-translate-y-px hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-[0.98]";

/**
 * Primary booking CTA with conversion click tracking (GA4 + Plausible).
 */
export function BookingCtaButton({
  href,
  placement,
  children,
  className = "",
}: {
  href: string;
  placement: BookingCtaPlacement;
  children: ReactNode;
  className?: string;
}) {
  const onClick = () => {
    trackBookingCtaClick(placement);
  };

  const isExternal = /^https?:\/\//i.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        className={`${base} ${className}`.trim()}
        onClick={onClick}
        data-cta="book-diagnosis"
        data-cta-placement={placement}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={`${base} ${className}`.trim()}
      onClick={onClick}
      data-cta="book-diagnosis"
      data-cta-placement={placement}
    >
      {children}
    </Link>
  );
}
