import type { Metadata } from "next";
import { isValidLocale, localeUsesChineseCopy, type AppLocale } from "@/lib/i18n-routing";
import { localeAlternates } from "@/lib/alternate-metadata";
import { bookmeSeo } from "@/content/page-seo";
import { getFAQPageSchema } from "@/lib/schema";
import { getSiteUrl } from "@/lib/site-url";

const siteUrlMeta = getSiteUrl();

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const seo = bookmeSeo(locale as AppLocale);
  const alternates = localeAlternates(locale, "/bookme");
  const ogUrl =
    typeof alternates?.canonical === "string" ? alternates.canonical : `${siteUrlMeta}/${locale}/bookme`;
  return {
    title: seo.title,
    description: seo.description,
    alternates,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: ogUrl,
      siteName: "InnovateXP Limited",
      images: [{ url: "/innovatexp_color_no_bg.svg", width: 1200, height: 630, alt: "InnovateXP – Book a Call" }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
  };
}

export default async function BookMeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return <>{children}</>;

  const zh = localeUsesChineseCopy(locale as AppLocale);
  const faqs = zh
    ? [
        {
          question: "預約諮詢要收費嗎？",
          answer: "30 分鐘流程診斷／策略會議可免費預約，用來釐清瓶頸同下一步；付費方案（試用、Sprint、陪跑）會喺診斷後再確認。",
        },
        {
          question: "會議講咩？",
          answer: "通常會對齊你而家最痛嘅一條 workflow（銷售、活動、行政或 AI 採用），評估是否適合工具試用或 Discovery Sprint。",
        },
        {
          question: "點樣取消或改期？",
          answer: "請盡早用確認電郵內嘅連結改期，或電郵 info@innovatexp.co。",
        },
      ]
    : [
        {
          question: "Is the consultation free?",
          answer:
            "The 30-minute workflow / strategy session can be booked free to clarify bottlenecks and next steps. Paid trials, sprints, and advisory programs are confirmed after diagnosis.",
        },
        {
          question: "What will we discuss?",
          answer:
            "We usually align on your most painful workflow (sales, events, admin, or AI adoption) and whether a tool trial or Discovery Sprint is the right next step.",
        },
        {
          question: "How do I reschedule?",
          answer: "Use the link in your confirmation email, or email info@innovatexp.co as early as possible.",
        },
      ];

  const jsonLd = getFAQPageSchema({
    url: `${siteUrlMeta}/${locale}/bookme`,
    questions: faqs,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      {children}
    </>
  );
}
