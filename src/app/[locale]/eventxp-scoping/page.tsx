import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { isValidLocale, localeUsesChineseCopy, type AppLocale } from "@/lib/i18n-routing";
import { localeAlternates } from "@/lib/alternate-metadata";
import { eventXpScopingSeo } from "@/content/page-seo";
import { EventXpScopingForm } from "@/components/pages/EventXpScopingForm";

const siteUrlMeta =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.innovatexp.co";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const seo = eventXpScopingSeo(locale as AppLocale);
  const alternates = localeAlternates(locale, "/eventxp-scoping");
  const ogUrl =
    typeof alternates?.canonical === "string" ? alternates.canonical : `${siteUrlMeta}/${locale}/eventxp-scoping`;
  return {
    title: seo.title,
    description: seo.description,
    alternates,
    openGraph: {
      title: seo.ogTitle ?? seo.title,
      description: seo.ogDescription ?? seo.description,
      url: ogUrl,
      siteName: "InnovateXP Limited",
      images: [{ url: "/innovatexp_color_no_bg.svg", width: 1200, height: 630, alt: "InnovateXP EventXP Scoping" }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.ogTitle ?? seo.title,
      description: seo.ogDescription ?? seo.description,
    },
  };
}

export default async function EventXpScopingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const loc = locale as AppLocale;
  const zh = localeUsesChineseCopy(loc);

  return (
    <main className="min-h-screen bg-[color:var(--canvas)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: zh ? "EventXP" : "EventXP", item: `${siteUrlMeta}/${locale}/eventxp` },
              { "@type": "ListItem", position: 2, name: zh ? "方案診斷表格" : "Solution Scoping", item: `${siteUrlMeta}/${locale}/eventxp-scoping` },
            ],
          }).replace(/</g, "\\u003c"),
        }}
      />
      <section className="container mx-auto max-w-3xl px-4 pb-10 pt-12 md:pt-16">
        <Link
          href={`/${locale}/eventxp`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {zh ? "返回 EventXP" : "Back to EventXP"}
        </Link>
        <h1 className="mt-4 text-3xl font-bold tracking-[-0.02em] text-[color:var(--heading-foreground)] md:text-4xl">
          {zh ? "EventXP 方案診斷表格" : "EventXP Solution Scoping Form"}
        </h1>
        <p className="mt-3 text-base leading-7 text-[color:var(--text-secondary)]">
          {zh
            ? "講你現有嘅報名、check-in、報告同跟進流程，同你需要嘅功能。我哋會按你嘅流程配置一份初步方案同報價——唔使買我會直講。"
            : "Tell us about your current registration, check-in, reporting and follow-up workflow, and the capabilities you need. We'll configure a scoped proposal and quote — if you don't need it, we'll say so."}
        </p>
      </section>
      <section className="container mx-auto max-w-3xl px-4 pb-16">
        <EventXpScopingForm zh={zh} locale={loc} />
        <p className="mx-auto mt-6 max-w-2xl text-xs leading-5 text-[color:var(--text-tertiary)]">
          {zh
            ? "提交後資料會安全儲存並只用作回覆此查詢。瀏覽器唔會代你發送未經授權嘅 WhatsApp 訊息。"
            : "Your submission is stored securely and used only to respond to this enquiry. Your browser will not send WhatsApp messages on your behalf without your action."}
        </p>
      </section>
    </main>
  );
}
