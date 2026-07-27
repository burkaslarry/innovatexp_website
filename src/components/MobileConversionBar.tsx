"use client";

import Link from "next/link";
import { MessageCircle, CalendarClock, ClipboardList, ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, withLocale } from "@/lib/i18n-routing";
import { uiStrings } from "@/content/ui-strings";
import { useInquiryCart } from "@/context/InquiryCartContext";

const defaultWhatsAppMessage =
  "你好！我喺 InnovateXP 網站睇到，想了解點樣將 WhatsApp inquiry / 活動 lead 變成可跟進 pipeline。";

export function MobileConversionBar() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const ui = uiStrings(locale);
  const { itemCount, setDrawerOpen } = useInquiryCart();

  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^\d]/g, "");
  const whatsappHref = rawNumber
    ? `https://wa.me/${rawNumber}?text=${encodeURIComponent(defaultWhatsAppMessage)}`
    : withLocale(locale, "/bookme");

  const bookHref = withLocale(locale, "/bookme");
  const questionnaireHref = withLocale(locale, "/ai-consultation-questionnaire");

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-[color:var(--border-light)] bg-surface/95 shadow-card backdrop-blur-md md:hidden"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      role="navigation"
      aria-label="Quick actions"
    >
      <div className="flex items-stretch gap-1 px-2 py-2">
        <Link
          href={bookHref}
          className="flex min-h-[48px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-brand-primary px-2 text-xs font-bold text-white transition active:scale-[0.98] sm:text-sm"
        >
          <CalendarClock className="h-4 w-4 shrink-0" aria-hidden />
          <span className="truncate">{ui.mobileBar.book}</span>
        </Link>
        <a
          href={whatsappHref}
          target={rawNumber ? "_blank" : undefined}
          rel={rawNumber ? "noopener noreferrer" : undefined}
          className="flex min-h-[48px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-[color:var(--border-medium)] bg-surface px-2 text-xs font-bold text-[color:var(--text-primary)] transition active:scale-[0.98] sm:text-sm"
        >
          <MessageCircle className="h-4 w-4 shrink-0 text-brand-primary" aria-hidden />
          <span className="truncate">{ui.mobileBar.whatsapp}</span>
        </a>
        {itemCount > 0 ? (
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="relative flex min-h-[48px] flex-1 items-center justify-center gap-1.5 rounded-xl border-2 border-brand-primary bg-surface-secondary px-2 text-xs font-bold text-brand-primary transition active:scale-[0.98] sm:text-sm"
            aria-label={ui.mobileBar.cartAria(itemCount)}
          >
            <ShoppingCart className="h-4 w-4 shrink-0" aria-hidden />
            <span className="truncate">{ui.mobileBar.cart}</span>
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-primary px-1 text-[10px] font-bold text-white">
              {itemCount > 9 ? "9+" : itemCount}
            </span>
          </button>
        ) : (
          <Link
            href={questionnaireHref}
            className="flex min-h-[48px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-[color:var(--border-medium)] bg-surface px-2 text-xs font-bold text-[color:var(--text-primary)] transition active:scale-[0.98] sm:text-sm"
          >
            <ClipboardList className="h-4 w-4 shrink-0 text-brand-primary" aria-hidden />
            <span className="truncate">{ui.mobileBar.questionnaire}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
