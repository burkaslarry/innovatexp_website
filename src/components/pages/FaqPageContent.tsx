"use client";

import { SitePageShell } from "@/components/SitePageShell";
import { FaqAccordion } from "@/components/FaqAccordion";
import { getHomepageContent } from "@/content/homepage";
import { useLanguage } from "@/app/LanguageContext";

export function FaqPageContent() {
  const { locale } = useLanguage();
  const c = getHomepageContent(locale);
  const title = c.faq.title;
  const extended = c.faqExtended?.items ?? [];

  return (
    <SitePageShell title={title}>
      <FaqAccordion id="faq-core" title={c.faq.title} faqs={c.faq.items} defaultOpenAll={false} />
      {extended.length > 0 ? (
        <div className="mt-10">
          <FaqAccordion
            id="faq-more"
            title={c.faqExtended?.title ?? (locale === "en" ? "More FAQ" : "更多常見問題")}
            faqs={extended}
            defaultOpenAll={false}
          />
        </div>
      ) : null}
    </SitePageShell>
  );
}
