import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutPageContent } from "@/components/pages/AboutPageContent";
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
    title: zh ? "關於 Larry Lo｜InnovateXP" : "About Larry Lo | InnovateXP",
    description: zh
      ? "AI 商業顧問 Larry Lo／InnovateXP：14 年大企業經驗，先執順流程再落地 AI，保留人嘅溫度。"
      : "AI Business Consultant Larry Lo / InnovateXP: 14 years enterprise experience. Fix the workflow first, then land AI — with human warmth.",
    alternates: localeAlternates(locale, "/about"),
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  return <AboutPageContent />;
}
