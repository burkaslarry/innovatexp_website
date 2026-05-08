import type { Metadata } from "next";
import Link from "next/link";
import { BackToHomeControl } from "@/components/BackToHomeControl";
import { getFAQPageSchema } from "@/lib/schema";
import { isValidLocale } from "@/lib/i18n-routing";
import { localeAlternates } from "@/lib/alternate-metadata";

const siteUrlMeta =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.innovatexp.co";

const path = "/compare/smartsales-vs-salesforce";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const alternates = localeAlternates(locale, path);
  const ogUrl =
    typeof alternates?.canonical === "string" ? alternates.canonical : `${siteUrlMeta}/${locale}${path}`;
  const title = "SmartSales CRM vs Salesforce — 香港中小企怎麼揀？";
  const description =
    "香港中小企選 SmartSales CRM 還係 Salesforce？一表看清 setup 時間、價錢、WhatsApp 整合、語言支援。";
  return {
    title,
    description,
    authors: [{ name: "Larry Lo", url: "https://www.linkedin.com/in/larry-lo-804a50165/" }],
    alternates,
    openGraph: {
      title,
      description,
      url: ogUrl,
      siteName: "InnovateXP Limited",
      images: [{ url: "/innovatexp_color_no_bg.svg", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function SmartSalesVsSalesforcePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.innovatexp.co";
  const pageUrl = `${siteUrl}/${locale}${path}`;

  const headline = "SmartSales CRM vs Salesforce: Which is right for Hong Kong SMEs?";

  const faqQuestions = [
    {
      question: "Can SmartSales replace Salesforce?",
      answer:
        "中小企 use case yes。Enterprise 複雜 compliance no。In practice, Hong Kong SME teams can run day-to-day sales on SmartSales; enterprises with heavy policy, integration, and global org requirements typically keep Salesforce or use a hybrid.",
    },
    {
      question: "What is the migration path from Salesforce to SmartSales?",
      answer:
        "Most teams export contacts, accounts, and open opportunities from Salesforce (CSV or reports), map fields during founder-led onboarding, then cut over in phases so reps keep working during transition. Book a consultation for a tailored migration plan and timeline.",
    },
    {
      question: "Does Sales Cloud include native WhatsApp Business API?",
      answer:
        "Salesforce does not treat WhatsApp as a first-class native channel the way a Hong Kong–focused SME stack often requires; teams usually rely on third-party connectors or partner implementations, which adds cost and integration work compared with a natively chat-aligned CRM.",
    },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline,
    inLanguage: ["en", "zh-HK"],
    url: pageUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
      url: pageUrl,
    },
    datePublished: "2026-05-08",
    dateModified: "2026-05-08",
    image: [`${siteUrl}/innovatexp_color_no_bg.svg`],
    author: {
      "@type": "Person",
      name: "Larry Lo",
      url: "https://www.linkedin.com/in/larry-lo-804a50165/",
    },
    publisher: {
      "@type": "Organization",
      name: "InnovateXP Limited",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/innovatexp_color_no_bg.svg`,
      },
    },
    about: [
      "SmartSales CRM",
      "Salesforce Sales Cloud",
      "Hong Kong SMEs",
      "CRM comparison",
      "WhatsApp sales",
    ],
  };

  const jsonLd = [articleSchema, getFAQPageSchema({ url: pageUrl, questions: faqQuestions })];

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <BackToHomeControl />
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">{headline}</h1>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
          <strong className="font-semibold text-gray-900 dark:text-white">SmartSales CRM</strong> wins when a Hong Kong SME needs fast
          rollout, WhatsApp-native sales workflows, and mixed Cantonese–English operations without a six-month IT project.{" "}
          <strong className="font-semibold text-gray-900 dark:text-white">Salesforce Sales Cloud</strong> wins when you operate across many countries, need deep enterprise identity and reporting stacks, and can sustain a partner-led implementation program.
        </p>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Quick comparison table</h2>
          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-gray-700">
            <table className="w-full min-w-[640px] text-left text-sm text-gray-700 dark:text-gray-300">
              <thead className="bg-slate-50 dark:bg-gray-800 text-gray-900 dark:text-white">
                <tr>
                  <th className="p-3 font-semibold border-b border-slate-200 dark:border-gray-700" scope="col" />
                  <th className="p-3 font-semibold border-b border-slate-200 dark:border-gray-700" scope="col">
                    SmartSales CRM
                  </th>
                  <th className="p-3 font-semibold border-b border-slate-200 dark:border-gray-700" scope="col">
                    Salesforce Sales Cloud
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100 dark:border-gray-800">
                  <th className="p-3 font-medium text-gray-900 dark:text-white align-top" scope="row">
                    Setup time
                  </th>
                  <td className="p-3">1–2 weeks</td>
                  <td className="p-3">6–12 weeks</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-gray-800">
                  <th className="p-3 font-medium text-gray-900 dark:text-white align-top" scope="row">
                    Starting price
                  </th>
                  <td className="p-3">HKD 10,800 + HKD 880/mo</td>
                  <td className="p-3">USD 25/user/mo + impl. cost</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-gray-800">
                  <th className="p-3 font-medium text-gray-900 dark:text-white align-top" scope="row">
                    WhatsApp Business API
                  </th>
                  <td className="p-3">✅ native</td>
                  <td className="p-3">⚠️ via 3rd-party</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-gray-800">
                  <th className="p-3 font-medium text-gray-900 dark:text-white align-top" scope="row">
                    Cantonese / mixed CN-EN
                  </th>
                  <td className="p-3">✅ native</td>
                  <td className="p-3">❌</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-gray-800">
                  <th className="p-3 font-medium text-gray-900 dark:text-white align-top" scope="row">
                    Implementation
                  </th>
                  <td className="p-3">Founder-led, in-person</td>
                  <td className="p-3">Partner ecosystem</td>
                </tr>
                <tr>
                  <th className="p-3 font-medium text-gray-900 dark:text-white align-top" scope="row">
                    Best for
                  </th>
                  <td className="p-3">3–15 person HK sales teams</td>
                  <td className="p-3">Enterprises 100+ users globally</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">When to choose SmartSales</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>3–15 人 HK sales team</li>
            <li>WhatsApp 係主要 lead channel</li>
            <li>要 1 個月內看到 ROI</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">When to choose Salesforce</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>多國邊聯邦</li>
            <li>要 enterprise SSO / advanced reporting</li>
            <li>IT team 足夠領 implementation</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">FAQ</h2>
          {faqQuestions.map((item) => (
            <div key={item.question} className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.question}</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </section>

        <section className="bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Talk through your CRM choice</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Book a short call to map your team size, WhatsApp volume, and whether SmartSales or a Salesforce-class stack fits your next 90 days.
          </p>
          <Link
            href={`/${locale}/bookme`}
            className="inline-block rounded-full bg-brand-primary py-3 px-6 font-semibold text-white transition-colors hover:bg-brand-primary-hover dark:bg-[#00B9B3] dark:text-slate-950 dark:hover:bg-[#009e98]"
          >
            Book a free consultation
          </Link>
        </section>
      </div>
    </main>
  );
}
