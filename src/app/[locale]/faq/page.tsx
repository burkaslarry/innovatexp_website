import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FaqPageContent } from "@/components/pages/FaqPageContent";
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
    title: zh ? "常見問題｜業務聽診｜InnovateXP" : "FAQ | Business diagnosis | InnovateXP",
    description: zh
      ? "業務聽診、費用點計、CRM、培訓／Fitness 流程同保密——常見問題一次睇晒。"
      : "Business diagnosis, how fees work, CRM, training/fitness workflows, and confidentiality.",
    alternates: localeAlternates(locale, "/faq"),
  };
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  return <FaqPageContent />;
}
