"use client";

import React, { useMemo } from "react";
import Header from "../../components/Header";
import { Hero } from "@/components/Hero";
import { BusinessUpgradeHomepageFunnel } from "@/components/BusinessUpgradeHomepageFunnel";
import { getHomepageContent, HOMEPAGE_PLACEHOLDERS } from "@/content/homepage";
import {
  getBookingHref,
  getWhatsAppHref,
  primaryCtaLabel,
  secondaryWhatsAppLabel,
} from "@/content/cta-config";
import { trackBookingCtaClick } from "@/lib/analytics";
import { useLanguage } from "../../LanguageContext";
import { useLocalizedHref } from "@/hooks/useLocalizedHref";
import { PRICING, formatHkd } from "@/content/pricing";

function LandingPage() {
  const { locale } = useLanguage();
  const loc = useLocalizedHref();
  const content = getHomepageContent(locale);

  const bookingHref = getBookingHref(locale);
  const whatsappHref = getWhatsAppHref(locale);
  const ctaLabel = primaryCtaLabel(locale);

  const navItems = useMemo(() => {
    return [
      { label: content.nav.home, href: "#top" },
      { label: content.nav.diagnosis, href: "#pain-points" },
      { label: content.nav.services, href: "#method" },
      { label: content.nav.cases, href: "#case-study" },
      { label: content.nav.about, href: "#why-me" },
      { label: content.nav.faq, href: "#faq" },
    ];
  }, [content]);

  return (
    <div id="top" className="min-h-screen bg-bg text-fg transition-colors duration-200">
      <Header
        variant="main"
        title={content.brandTitle}
        subtitle={content.brandSubtitle}
        navItems={navItems}
        ctaLabel={ctaLabel}
        ctaHref={bookingHref}
      />

      <main className="mx-auto max-w-[1280px] bg-bg px-4 py-6 pb-10 text-fg sm:px-6 md:py-10">
        {/* Section 1 — Hero: who I help + what I fix; primary + WhatsApp only */}
        <Hero
          eyebrow={content.hero.eyebrow}
          title={content.hero.title}
          description={content.hero.description}
          primaryHref={bookingHref}
          primaryLabel={ctaLabel}
          onPrimaryClick={() => trackBookingCtaClick("hero")}
          secondaryHref={whatsappHref}
          secondaryLabel={secondaryWhatsAppLabel(locale)}
          trustBadges={content.hero.trustPoints}
          imageSrc="/mypresent.jpg"
          imageAlt={content.hero.imageAlt}
        />

        <aside className="mb-16 mt-6 rounded-[var(--card-radius)] border border-[color:var(--brand-primary)]/30 bg-[color:var(--bg-secondary)] px-5 py-4">
          <p className="text-sm font-semibold leading-7 text-[color:var(--heading-foreground)]">
            {locale === "en"
              ? `Transparent starting point: Snapshot ${formatHkd(PRICING.quickCash.aiReadinessAssessment, locale)} · Discovery Sprint ${formatHkd(PRICING.quickCash.aiDiscoverySprint, locale)} for teams up to 10. Diagnose first, then decide whether to proceed.`
              : `透明入場價：Snapshot 業務聽診 ${formatHkd(PRICING.quickCash.aiReadinessAssessment, locale)} · Discovery Sprint（10 人或以下）${formatHkd(PRICING.quickCash.aiDiscoverySprint, locale)}。先聽診，再決定使唔使落地。`}
          </p>
        </aside>

        <BusinessUpgradeHomepageFunnel
          locale={locale}
          bookingHref={bookingHref}
          whatsappHref={whatsappHref}
        />
      </main>

      <footer className="border-t border-[color:var(--border-light)] bg-[color:var(--bg-secondary)] py-10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-lg font-semibold text-[color:var(--heading-foreground)]">{content.footer.title}</p>
            <p className="mt-1 text-sm text-[color:var(--text-secondary)]">{content.footer.role}</p>
            <p className="mt-3 text-sm text-[color:var(--text-secondary)]">{content.footer.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-[color:var(--text-secondary)]">
            <a href={HOMEPAGE_PLACEHOLDERS.linkedinUrl} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={`mailto:${HOMEPAGE_PLACEHOLDERS.emailAddress}`}>{HOMEPAGE_PLACEHOLDERS.emailAddress}</a>
            <a href={loc("/services")}>{content.nav.services}</a>
            <a href={loc("/products")}>
              {locale === "en" ? "Post-diagnosis options" : "聽診後落地選項"}
            </a>
            <a href={loc("/about")}>{content.nav.about}</a>
            <a href={loc("/faq")}>{content.nav.faq}</a>
            <a href={loc("/privacy-policy")}>{content.footer.privacy}</a>
          </div>
        </div>
        <div className="mx-auto mt-6 max-w-[1280px] px-4 text-sm text-[color:var(--text-tertiary)] sm:px-6">
          {content.footer.copyright}
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
