import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getEventXPProductSchema,
  getFAQPageSchema,
  getOrganizationSchema,
  getPersonSchema,
  getWebSiteSchema,
} from "@/lib/schema";
import { isValidLocale, localeUsesChineseCopy, type AppLocale } from "@/lib/i18n-routing";
import { localeAlternates } from "@/lib/alternate-metadata";
import { eventXpSeo } from "@/content/page-seo";
import { EventXpSections } from "@/components/pages/EventXpSections";
import { PRICING, formatHkd } from "@/content/pricing";

const siteUrlMeta =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.innovatexp.co";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const seo = eventXpSeo(locale as AppLocale);
  const alternates = localeAlternates(locale, "/eventxp");
  const ogUrl =
    typeof alternates?.canonical === "string" ? alternates.canonical : `${siteUrlMeta}/${locale}/eventxp`;
  return {
    title: seo.title,
    description: seo.description,
    alternates,
    openGraph: {
      title: seo.ogTitle ?? seo.title,
      description: seo.ogDescription ?? seo.description,
      url: ogUrl,
      siteName: "InnovateXP Limited",
      images: [{ url: "/innovatexp_color_no_bg.svg", width: 1200, height: 630, alt: "InnovateXP EventXP" }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.ogTitle ?? seo.title,
      description: seo.ogDescription ?? seo.description,
    },
  };
}

export default async function EventXpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const loc = locale as AppLocale;
  const zh = localeUsesChineseCopy(loc);
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.innovatexp.co";
  const pageUrl = `${siteUrl}/${locale}/eventxp`;

  const faqs = zh
    ? [
        { question: "EventXP 係咪只係 BNI 用？", answer: "唔係。EventXP 係按你機構流程配置嘅活動暨會員營運方案，適合商會、協會、培訓機構、社區組織同企業內部活動。BNI 嘅流程只係其中一個 implementation example，唔係產品嘅通用術語。" },
        { question: "EventXP 同一般售票軟件有咩分別？", answer: "售票軟件主要處理公開賣票；EventXP 處理嘅係機構內部嘅活動營運——會員同嘉賓記錄、現場 check-in、出席報告同活動後跟進，並按你現有流程配置，唔係逼你改流程就軟件。" },
        { question: "我而家用緊 Excel 同 WhatsApp，可以點過渡？", answer: "可以先做一次流程診斷，搵出最花時間同最容易出錯嘅位，再由報名或 check-in 其中一環開始配置，逐步擴展到報告同跟進。現有 roster 可以 import 入系統，唔使由零開始。" },
        { question: "kiosk check-in 同 QR check-in 有咩分別？", answer: "QR check-in 係參加者出示 QR code 由工作人員掃描；kiosk check-in 係設置自助裝置畀參加者自己掃描或輸入資料。兩者 EventXP 都支援，按場地同人手安排選擇。" },
        { question: "AI 配對同座位安排係咪必須？", answer: "唔係。AI matching 同 seating 係 optional module，按活動需要啟用。基本活動可以完全唔用，仍可完成報名、check-in 同報告流程。" },
        { question: "收費點計？", answer: `單場流程試行 ${formatHkd(PRICING.quickCash.eventXpTrial, loc)}；持續方案由每月 ${formatHkd(PRICING.tools.eventXp.maintenanceStarterMonthly, loc)} 起。較大範圍按流程診斷後報價，唔使買我會直講。` },
        { question: "可以配合我而家嘅 CRM 嗎？", answer: "可以。integrations 係 optional module，按你現有系統嘅 API 或匯出格式配置。診斷時會一齊評估銜接方式。" },
        { question: "資料點處理？", answer: "資料儲存同存取會按你機構嘅 privacy 要求配置。活動後保留期限、存取權限同 hosting 方式會喺實施前講清楚。我哋唔會代你發未經授權嘅訊息。" },
      ]
    : [
        { question: "Is EventXP only for BNI?", answer: "No. EventXP is a workflow-configured event and membership operations solution for associations, training providers, community organisations and corporate teams. BNI is only one optional implementation example, not the product's universal terminology." },
        { question: "How is EventXP different from generic ticketing software?", answer: "Ticketing tools focus on public sales; EventXP handles internal event operations — member and guest records, on-site check-in, attendance reporting and post-event follow-up — configured around your existing workflow rather than forcing you to adapt to the software." },
        { question: "We currently use Excel and WhatsApp — how do we transition?", answer: "Start with a workflow diagnosis to find the slowest, most error-prone steps, then configure from registration or check-in and expand to reporting and follow-up. Existing rosters can be imported, so you don't start from zero." },
        { question: "What's the difference between kiosk and QR check-in?", answer: "QR check-in has staff scan an attendee's QR code; kiosk check-in sets up a self-service device for attendees to scan or enter their details themselves. EventXP supports both — choose by venue and staffing." },
        { question: "Are AI matching and seating required?", answer: "No. AI matching and seating are optional modules, enabled when an event needs them. Basic events can run registration, check-in and reporting without them." },
        { question: "How is pricing determined?", answer: `A one-event workflow trial is ${formatHkd(PRICING.quickCash.eventXpTrial, loc)}; ongoing plans start at ${formatHkd(PRICING.tools.eventXp.maintenanceStarterMonthly, loc)}/month. Larger scopes are quoted after diagnosis. If you don't need it, we'll say so.` },
        { question: "Can it integrate with our existing CRM?", answer: "Yes. Integrations are an optional module, configured to your system's API or export format. The diagnosis covers the integration approach too." },
        { question: "How is data handled?", answer: "Storage and access are configured to your organisation's privacy requirements. Retention, access control and hosting are agreed before implementation. We do not send messages on your behalf without authorisation." },
      ];

  const jsonLd = [
    getWebSiteSchema(),
    getOrganizationSchema(),
    getPersonSchema(),
    { ...getEventXPProductSchema(), url: pageUrl },
    getFAQPageSchema({ url: pageUrl, questions: faqs }),
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: zh ? "首頁" : "Home", item: `${siteUrl}/${locale}` },
        { "@type": "ListItem", position: 2, name: "EventXP", item: pageUrl },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-[color:var(--canvas)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <EventXpSections locale={loc} zh={zh} faqs={faqs} />
    </main>
  );
}
