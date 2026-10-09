"use client";

import type { ReactNode } from "react";
import Header from "@/app/components/Header";
import { BookingCtaButton } from "@/components/BookingCtaButton";
import { getHomepageContent, HOMEPAGE_PLACEHOLDERS } from "@/content/homepage";
import { getBookingHref, primaryCtaLabel } from "@/content/cta-config";
import { useLanguage } from "@/app/LanguageContext";
import { useLocalizedHref } from "@/hooks/useLocalizedHref";

export function SitePageShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const { locale } = useLanguage();
  const loc = useLocalizedHref();
  const content = getHomepageContent(locale);
  const bookingHref = getBookingHref(locale);
  const ctaLabel = primaryCtaLabel(locale);

  const navItems = [
    { label: content.nav.home, href: loc("/") },
    { label: content.nav.plans, href: loc("/services") },
    { label: content.nav.products, href: loc("/products") },
    { label: locale === "en" ? "Journal" : locale === "ja" ? "記事" : locale === "de" ? "Journal" : "文章", href: loc("/blog") },
    { label: content.nav.about, href: loc("/about") },
    { label: content.nav.faq, href: loc("/faq") },
  ];

  return (
    <div className="atelier-site min-h-screen bg-[#f7f4ee] text-[#251f19]">
      <Header
        variant="main"
        title={content.brandTitle}
        subtitle={content.brandSubtitle}
        navItems={navItems}
        ctaLabel={ctaLabel}
        ctaHref={bookingHref}
      />
      <main className="mx-auto max-w-6xl px-5 pb-20 pt-12 md:px-10 md:pb-28 md:pt-20">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b6b43]">InnovateXP / {title}</p>
        <h1 className="mt-5 max-w-[16ch] text-[clamp(2.7rem,5vw,5rem)] font-normal leading-[1.14] tracking-[-0.035em] text-[#251f19]">
          {title}
        </h1>
        <div className="mt-10 border-t border-[#c8bba9] pt-8 md:mt-14 md:pt-12">{children}</div>
        <div className="mt-16 border-t border-[#c8bba9] pt-8">
          <BookingCtaButton href={bookingHref} placement="page_footer" className="!rounded-none !bg-[#251f19] !px-7 !text-[#fffdfa] !shadow-none hover:!bg-[#6f5436] hover:!shadow-none">
            {ctaLabel}
          </BookingCtaButton>
        </div>
      </main>
      <footer className="border-t border-[#d8cfc2] bg-[#f7f4ee] py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-4 px-5 text-sm text-[#51483d] md:px-10">
          <a href={loc("/")}>{content.nav.home}</a>
          <a href={`mailto:${HOMEPAGE_PLACEHOLDERS.emailAddress}`}>{HOMEPAGE_PLACEHOLDERS.emailAddress}</a>
          <a href={loc("/privacy-policy")}>{content.footer.privacy}</a>
        </div>
      </footer>
    </div>
  );
}
