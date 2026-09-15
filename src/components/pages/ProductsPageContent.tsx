"use client";

import { SitePageShell } from "@/components/SitePageShell";
import { ProductPackagesSection } from "@/components/ProductPackagesSection";
import { VisionXpSection } from "@/components/VisionXpSection";
import { getHomepageContent } from "@/content/homepage";
import { useLanguage } from "@/app/LanguageContext";

export function ProductsPageContent() {
  const { locale } = useLanguage();
  const c = getHomepageContent(locale);
  const title =
    locale === "en" || locale === "de" || locale === "ja" ? "Products" : "產品方案";

  return (
    <SitePageShell title={title}>
      <p className="mb-8 text-base leading-8 text-[color:var(--text-secondary)]">{c.products.intro}</p>
      <ProductPackagesSection locale={locale} content={c.products} />
      <VisionXpSection locale={locale} copy={c.visionXp} />
    </SitePageShell>
  );
}
