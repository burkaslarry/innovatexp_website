"use client";

import type { ReactNode } from "react";
import Header from "@/app/components/Header";
import { useLanguage } from "@/app/LanguageContext";
import { BLOG_CHROME } from "@/content/blog-chrome";
import { getHomepageContent, getMainNavigation, HOMEPAGE_PLACEHOLDERS } from "@/content/homepage";
import { getBookingHref, primaryCtaLabel } from "@/content/cta-config";
import { useLocalizedHref } from "@/hooks/useLocalizedHref";
import type { AppLocale } from "@/lib/i18n-routing";

export function BlogFrame({ children }: { children: ReactNode }) {
  const { locale } = useLanguage();
  const loc = useLocalizedHref();
  const content = getHomepageContent(locale);
  const chrome = BLOG_CHROME[locale as AppLocale] ?? BLOG_CHROME.en;

  const navItems = getMainNavigation(locale);

  return (
    <div className="atelier-site min-h-screen bg-canvas text-fg">
      <Header
        variant="main"
        title={content.brandTitle}
        subtitle={content.brandSubtitle}
        navItems={navItems}
        ctaLabel={primaryCtaLabel(locale)}
        ctaHref={getBookingHref(locale)}
      />
      {children}
      <footer className="border-t border-[color:var(--border-light)] bg-[color:var(--bg-secondary)] py-8">
        <div className="mx-auto flex max-w-3xl flex-wrap gap-4 px-5 text-sm text-[color:var(--text-secondary)] md:px-8">
          <a href={loc("/")}>{content.nav.home}</a>
          <a href={loc("/blog")}>{chrome.blog}</a>
          <a href={`mailto:${HOMEPAGE_PLACEHOLDERS.emailAddress}`}>{HOMEPAGE_PLACEHOLDERS.emailAddress}</a>
          <a href={loc("/privacy-policy")}>{content.footer.privacy}</a>
        </div>
      </footer>
    </div>
  );
}
