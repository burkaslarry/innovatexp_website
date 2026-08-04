"use client";

import React, { useMemo } from "react";
import { useLanguage } from "../../LanguageContext";
import Header from "../../components/Header";
import { useLocalizedHref } from "@/hooks/useLocalizedHref";
import { Hero } from "@/components/Hero";
import { Button } from "@/components/ui/Button";
import { BusinessUpgradeHomepageFunnel } from "@/components/BusinessUpgradeHomepageFunnel";
import { uiStrings } from "@/content/ui-strings";

function LandingPage() {
  const { t, locale } = useLanguage();
  const loc = useLocalizedHref();

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
    const labels = uiStrings(locale).nav;
    return [
      { label: labels.upgrade, href: "#ai-business-upgrade" },
      { label: labels.products, href: "#product-pillars" },
      { label: labels.sprint, href: "#discovery-sprint" },
      { label: labels.programs, href: "#programs" },
      { label: labels.advisory, href: "#capability-proof" },
      { label: labels.useCases, href: "#use-cases" },
      { label: labels.about, href: "#about-founder" },
      { label: labels.contact, href: loc("/bookme") },
    ];
  }, [locale, loc]);

  return (
    <div className="min-h-screen bg-bg text-fg transition-colors duration-200">
      <Header
        variant="main"
        title={t("header.title")}
        subtitle={t("header.subtitle")}
        navItems={navItems}
      />

      <main className="mx-auto max-w-7xl bg-bg px-6 py-12 pb-8 text-fg md:leading-relaxed">
        <Hero
          title={t("hero.title")}
          tagline={t("hero.tagline")}
          description={t("hero.description")}
          primaryHref="#ai-coaching-pricing"
          primaryLabel={t("hero.book_meeting")}
          onPrimaryClick={(e) => scrollToAnchor(e, "#ai-coaching-pricing")}
          secondaryHref={loc("/bookme")}
          secondaryLabel={t("hero.case_studies")}
          trustBadges={[t("hero.badge.experience"), t("hero.badge.language")]}
          bottomTagline={t("hero.bottom_tagline")}
          imageAlt={t("hero.image_alt")}
        />

        <BusinessUpgradeHomepageFunnel locale={locale} bookingHref={loc("/bookme")} />
      </main>

      <footer className="border-t border-[color:var(--border-light)] bg-surface-secondary py-12 text-center">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <Button href={loc("/bookme")} variant="primary">
              {t("hero.book_meeting")}
            </Button>
          </div>

          <address className="not-italic border-t border-gray-200 pt-8 dark:border-gray-700">
            <strong>InnovateXP Limited</strong>
            <p className="text-gray-900 dark:text-gray-300">{t("footer.copyright")}</p>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Email:{" "}
              <a href="mailto:info@innovatexp.co" className="text-secondary hover:underline">
                info@innovatexp.co
              </a>
            </p>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{t("footer.localized_deployment")}</p>
          </address>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
