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
      ? "業務聽診、AI 流程設計、變革管理、品牌溫度、WhatsApp CRM 與活動跟進。聽診後先報價，唔使買系統會直講。"
      : "Business diagnosis, AI workflow design, change management, brand warmth, WhatsApp CRM. Quoted after diagnosis — we'll say so if you shouldn't buy.",
    alternates: localeAlternates(locale, "/services"),
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  return <ServicesPageContent />;
}
