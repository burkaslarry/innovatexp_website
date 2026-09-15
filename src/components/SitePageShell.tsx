"use client";

import type { ReactNode } from "react";
import Header from "@/app/components/Header";
import { Button } from "@/components/ui/Button";
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
    { label: content.nav.about, href: loc("/about") },
    { label: content.nav.faq, href: loc("/faq") },
  ];

  return (
    <div className="min-h-screen bg-bg text-fg">
      <Header
        variant="main"
        title={content.brandTitle}
        subtitle={content.brandSubtitle}
        navItems={navItems}
        ctaLabel={ctaLabel}
        ctaHref={bookingHref}
      />
      <main className="mx-auto max-w-[960px] px-4 py-10 sm:px-6 md:py-14">
        <h1 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-[-0.02em] text-[color:var(--heading-foreground)]">
          {title}
        </h1>
        <div className="mt-8">{children}</div>
        <div className="mt-12 border-t border-[color:var(--border-light)] pt-8">
          <Button href={bookingHref} variant="primary" className="px-6">
            {ctaLabel}
          </Button>
        </div>
      </main>
      <footer className="border-t border-[color:var(--border-light)] bg-[color:var(--bg-secondary)] py-8">
        <div className="mx-auto flex max-w-[960px] flex-wrap gap-4 px-4 text-sm text-[color:var(--text-secondary)] sm:px-6">
          <a href={loc("/")}>{content.nav.home}</a>
          <a href={`mailto:${HOMEPAGE_PLACEHOLDERS.emailAddress}`}>{HOMEPAGE_PLACEHOLDERS.emailAddress}</a>
          <a href={loc("/privacy-policy")}>{content.footer.privacy}</a>
        </div>
      </footer>
    </div>
  );
}
