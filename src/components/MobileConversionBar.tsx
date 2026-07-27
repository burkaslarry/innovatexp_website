"use client";

import Link from "next/link";
import { useState } from "react";
import { MessageCircle, CalendarClock, ClipboardList, ShoppingCart, MoreHorizontal, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, withLocale } from "@/lib/i18n-routing";
import { uiStrings } from "@/content/ui-strings";
import { useInquiryCart } from "@/context/InquiryCartContext";

export function MobileConversionBar() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const ui = uiStrings(locale);
  const { itemCount, setDrawerOpen } = useInquiryCart();
  const [moreOpen, setMoreOpen] = useState(false);

  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^\d]/g, "");
  const whatsappHref = rawNumber
    ? `https://wa.me/${rawNumber}?text=${encodeURIComponent(ui.whatsappPrefill)}`
    : withLocale(locale, "/bookme");

  const bookHref = withLocale(locale, "/bookme");
  const questionnaireHref = withLocale(locale, "/ai-consultation-questionnaire");

  return (
    <>
      {moreOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/25 md:hidden"
          aria-label={ui.mobileBar.closeMore}
          onClick={() => setMoreOpen(false)}
        />
      ) : null}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-[color:var(--border-light)] bg-surface/95 shadow-card backdrop-blur-md md:hidden"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
        role="navigation"
        aria-label="Quick actions"
      >
        {moreOpen ? (
          <div className="border-b border-[color:var(--border-light)] px-3 py-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wide text-[color:var(--text-secondary)]">
                {ui.mobileBar.more}
              </span>
              <button
                type="button"
                onClick={() => setMoreOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[color:var(--text-secondary)]"
                aria-label={ui.mobileBar.closeMore}
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <Link
              href={questionnaireHref}
              className="mt-2 flex min-h-[44px] items-center gap-2 rounded-xl px-3 text-sm font-semibold text-brand-primary"
              onClick={() => setMoreOpen(false)}
            >
              <ClipboardList className="h-4 w-4" aria-hidden />
              {ui.mobileBar.questionnaire}
            </Link>
          </div>
        ) : null}
        <div className="flex items-stretch gap-1 px-2 py-2">
          <Link
            href={bookHref}
            className="flex min-h-[48px] flex-1 items-center justify-center gap-1 rounded-xl bg-brand-primary px-1.5 text-[11px] font-bold text-white transition active:scale-[0.98] sm:text-xs"
          >
            <CalendarClock className="h-4 w-4 shrink-0" aria-hidden />
            <span className="truncate">{ui.mobileBar.book}</span>
          </Link>
          <a
            href={whatsappHref}
            target={rawNumber ? "_blank" : undefined}
            rel={rawNumber ? "noopener noreferrer" : undefined}
            className="flex min-h-[48px] flex-1 items-center justify-center gap-1 rounded-xl border border-[color:var(--border-medium)] bg-surface px-1.5 text-[11px] font-bold text-[color:var(--text-primary)] transition active:scale-[0.98] sm:text-xs"
          >
            <MessageCircle className="h-4 w-4 shrink-0 text-brand-primary" aria-hidden />
            <span className="truncate">{ui.mobileBar.whatsapp}</span>
          </a>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className={`relative flex min-h-[48px] flex-1 items-center justify-center gap-1 rounded-xl border px-1.5 text-[11px] font-bold transition active:scale-[0.98] sm:text-xs ${
              itemCount > 0
                ? "border-2 border-brand-primary bg-surface-secondary text-brand-primary"
                : "border border-[color:var(--border-medium)] bg-surface text-[color:var(--text-primary)]"
            }`}
            aria-label={itemCount > 0 ? ui.mobileBar.cartAria(itemCount) : ui.cart.emptyAria}
          >
            <ShoppingCart className="h-4 w-4 shrink-0" aria-hidden />
            <span className="truncate">{ui.mobileBar.cart}</span>
            {itemCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-primary px-1 text-[10px] font-bold text-white">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            ) : null}
          </button>
          <button
            type="button"
            onClick={() => setMoreOpen((v) => !v)}
            className="flex min-h-[48px] flex-1 items-center justify-center gap-1 rounded-xl border border-[color:var(--border-medium)] bg-surface px-1.5 text-[11px] font-bold text-[color:var(--text-primary)] transition active:scale-[0.98] sm:text-xs"
            aria-expanded={moreOpen}
            aria-label={ui.mobileBar.more}
          >
            <MoreHorizontal className="h-4 w-4 shrink-0 text-brand-primary" aria-hidden />
            <span className="truncate">{ui.mobileBar.more}</span>
          </button>
        </div>
      </div>
    </>
  );
}
