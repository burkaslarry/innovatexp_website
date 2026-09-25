import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicesPageContent } from "@/components/pages/ServicesPageContent";
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
    title: zh ? "服務｜業務聽診與 AI 落地｜InnovateXP" : "Services | Diagnosis & AI landing | InnovateXP",
    description: zh
      ? "業務聽診、AI 流程設計同 0 到 1 陪跑。Snapshot HK$3,000；10 人或以下 Discovery Sprint HK$6,800。唔使買系統會直講。"
      : "Business Workflow Diagnosis, practical AI implementation, and 0-to-1 co-running. Snapshot HK$3,000; Discovery Sprint HK$6,800 for teams up to 10.",
    alternates: localeAlternates(locale, "/services"),
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  return <ServicesPageContent />;
}
