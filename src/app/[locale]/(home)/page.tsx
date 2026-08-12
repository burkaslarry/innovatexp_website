"use client";

import React, { useMemo } from "react";
import Header from "../../components/Header";
import { Hero } from "@/components/Hero";
import { BusinessUpgradeHomepageFunnel } from "@/components/BusinessUpgradeHomepageFunnel";
import { getHomepageContent, HOMEPAGE_PLACEHOLDERS } from "@/content/homepage";
import { uiStrings } from "@/content/ui-strings";
import { useLanguage } from "../../LanguageContext";
import { useLocalizedHref } from "@/hooks/useLocalizedHref";

function LandingPage() {
  const { locale } = useLanguage();
  const loc = useLocalizedHref();
  const content = getHomepageContent(locale);
  const ui = uiStrings(locale);

  const bookingHref = loc("/bookme");
  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^\d]/g, "");
  const whatsappHref = rawNumber
    ? `https://wa.me/${rawNumber}?text=${encodeURIComponent(ui.whatsappPrefill)}`
    : bookingHref;

  const scrollToAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const id = href.slice(1);
    const offset =
      parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-offset"), 10) || 180;
    if (id === "") window.scrollTo({ top: 0, behavior: "smooth" });
    else {
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
    }
  };

  const navItems = useMemo(() => {
    return [
      { label: content.nav.home, href: "#top" },
      { label: content.nav.diagnosis, href: "#workflow-diagnosis" },
      { label: content.nav.services, href: "#service-approach" },
      { label: content.nav.flagship, href: "#flagship-products" },
      { label: content.nav.cases, href: "#case-directions" },
      { label: content.nav.about, href: "#about-larry" },
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
        ctaLabel={content.nav.cta}
        ctaHref={bookingHref}
      />

      <main className="mx-auto max-w-[1280px] bg-bg px-4 py-8 pb-10 text-fg sm:px-6 md:py-12">
        <Hero
          eyebrow={content.hero.eyebrow}
          title={content.hero.title}
          tagline="先執順流程，再落地 AI"
          description={content.hero.description}
          primaryHref={bookingHref}
          primaryLabel={content.hero.primaryCta}
          secondaryHref="#workflow-diagnosis"
          secondaryLabel={content.hero.secondaryCta}
          onSecondaryClick={(e) => scrollToAnchor(e, "#workflow-diagnosis")}
          trustBadges={content.hero.trustPoints}
          imageSrc="/mypresent.jpg"
          imageAlt={content.hero.imageAlt}
        />

        <BusinessUpgradeHomepageFunnel locale={locale} bookingHref={bookingHref} whatsappHref={whatsappHref} />
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
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <a href={`mailto:${HOMEPAGE_PLACEHOLDERS.emailAddress}`}>{HOMEPAGE_PLACEHOLDERS.emailAddress}</a>
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
