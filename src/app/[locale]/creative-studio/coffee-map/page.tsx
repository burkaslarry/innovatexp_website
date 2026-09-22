import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackToHomeControl } from "@/components/BackToHomeControl";
import { CoffeeShopMap } from "@/components/creative-studio/CoffeeShopMap";
import { coffeeMapSeo } from "@/content/page-seo";
import { localeAlternates } from "@/lib/alternate-metadata";
import { isValidLocale, localeUsesChineseCopy, type AppLocale } from "@/lib/i18n-routing";
import { getSiteUrl } from "@/lib/site-url";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const seo = coffeeMapSeo(locale as AppLocale);
  return {
    title: seo.title,
    description: seo.description,
    keywords: [
      "Hong Kong coffee shops",
      "香港咖啡店",
      "specialty coffee Hong Kong",
      "Google Maps",
      "cafe map",
    ],
    alternates: localeAlternates(locale, "/creative-studio/coffee-map"),
  };
}

export default async function CoffeeMapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const loc = locale as AppLocale;
  const zh = localeUsesChineseCopy(loc);
  const pageUrl = `${getSiteUrl()}/${loc}/creative-studio/coffee-map`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: zh ? "香港咖啡店清單" : "Hong Kong coffeeshop list",
    url: pageUrl,
    itemListElement: [],
  };

  return (
    <main className="mx-auto min-h-screen max-w-[1280px] px-4 py-10 text-[color:var(--text-primary)] sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <BackToHomeControl />
      <nav className="mb-4 text-sm font-semibold">
        <Link href={`/${loc}/creative-studio`} className="text-brand-primary underline-offset-2 hover:underline">
          {zh ? "← Creative Studio 自由創作" : "← Creative Studio"}
        </Link>
      </nav>
      <header className="ixp-card mb-8 p-6 md:p-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-primary">
          {zh ? "Creative Studio" : "Creative Studio"}
        </p>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl">
          {zh ? "香港咖啡店地圖" : "Hong Kong Coffeeshop Map"}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[color:var(--text-secondary)]">
          {zh
            ? "收錄香港特色咖啡店，按地區篩選，並喺 Google 地圖顯示。每間店可一鍵打開 Google Maps 導航。"
            : "A curated list of Hong Kong specialty coffee shops, filterable by neighborhood and shown on Google Maps. Each shop opens straight into Google Maps for directions."}
        </p>
      </header>
      <CoffeeShopMap zh={zh} />
    </main>
  );
}
