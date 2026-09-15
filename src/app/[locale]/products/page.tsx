import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductsPageContent } from "@/components/pages/ProductsPageContent";
import { localeAlternates } from "@/lib/alternate-metadata";
import { isValidLocale, localeUsesChineseCopy, type AppLocale } from "@/lib/i18n-routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const zh = localeUsesChineseCopy(locale as AppLocale);
  return {
    title: zh ? "產品方案｜InnovateXP" : "Products | InnovateXP",
    description: zh
      ? "FitnessXP、AccountXP、SmartSales CRM、EventXP、Online Presence——聽診釐清流程後嘅可選產品。"
      : "FitnessXP, AccountXP, SmartSales CRM, EventXP, Online Presence — optional products after workflow clarity.",
    alternates: localeAlternates(locale, "/products"),
  };
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  return <ProductsPageContent />;
}
