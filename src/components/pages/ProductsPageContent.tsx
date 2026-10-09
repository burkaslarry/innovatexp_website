"use client";

import Link from "next/link";
import { SitePageShell } from "@/components/SitePageShell";
import { ProductPackagesSection } from "@/components/ProductPackagesSection";
import { getHomepageContent } from "@/content/homepage";
import { getSessionCreditsCopy } from "@/content/session-credits";
import { useLanguage } from "@/app/LanguageContext";
import { useLocalizedHref } from "@/hooks/useLocalizedHref";

export function ProductsPageContent() {
  const { locale } = useLanguage();
  const loc = useLocalizedHref();
  const c = getHomepageContent(locale);
  const credits = getSessionCreditsCopy(locale);
  const title =
    locale === "en" || locale === "de" || locale === "ja" ? "Products" : "產品方案";

  return (
    <SitePageShell title={title}>
      <p className="mb-4 text-base leading-8 text-[color:var(--text-secondary)]">{c.products.intro}</p>
      <p className="mb-8">
        <Link href={loc("/session-credits")} className="font-semibold text-[color:var(--heading-foreground)] underline underline-offset-4">
          {credits.productsLink}
        </Link>
      </p>
      <ProductPackagesSection locale={locale} content={c.products} />
    </SitePageShell>
  );
}
