"use client";

import type { ReactNode } from "react";
import Header from "@/app/components/Header";
import { useLanguage } from "@/app/LanguageContext";
import { getHomepageContent, HOMEPAGE_PLACEHOLDERS } from "@/content/homepage";
import { getBookingHref, primaryCtaLabel } from "@/content/cta-config";
import { useLocalizedHref } from "@/hooks/useLocalizedHref";

export function EditorialChrome({ children }: { children: ReactNode }) {
  const { locale } = useLanguage();
  const loc = useLocalizedHref();
  const content = getHomepageContent(locale);
  const bookingHref = getBookingHref(locale);

  const navItems = [
    { label: content.nav.home, href: loc("/") },
    { label: content.nav.plans, href: loc("/services") },
    { label: content.nav.products, href: loc("/products") },
    { label: content.nav.about, href: loc("/about") },
    { label: content.nav.faq, href: loc("/faq") },
  ];

  return (
    <div className="min-h-screen bg-[color:var(--bg-base)] text-[color:var(--text-primary)]">
      <Header
        variant="main"
        title={content.brandTitle}
        subtitle={content.brandSubtitle}
        navItems={navItems}
        ctaLabel={primaryCtaLabel(locale)}
        ctaHref={bookingHref}
      />
      {children}
      <footer className="border-t border-[color:var(--border-light)] bg-[color:var(--bg-secondary)] py-10">
        <div className="mx-auto flex max-w-5xl flex-wrap items-end justify-between gap-4 px-5 md:px-8">
          <div>
            <p className="text-lg font-semibold">{content.footer.title}</p>
            <p className="mt-1 text-sm text-[color:var(--text-secondary)]">{content.footer.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-[color:var(--text-secondary)]">
            <a href={loc("/")}>{content.nav.home}</a>
            <a href={loc("/services")}>{content.nav.services}</a>
            <a href={`mailto:${HOMEPAGE_PLACEHOLDERS.emailAddress}`}>{HOMEPAGE_PLACEHOLDERS.emailAddress}</a>
            <a href={loc("/privacy-policy")}>{content.footer.privacy}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
