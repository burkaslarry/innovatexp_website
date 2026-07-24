import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPremiumConsultingBundle } from "@/content/pillar-bundles";
import { getFAQPageSchema } from "@/lib/schema";
import {
  isValidLocale,
  localeToHtmlLang,
  localeUsesChineseCopy,
  type AppLocale,
} from "@/lib/i18n-routing";
import { localeAlternates } from "@/lib/alternate-metadata";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.innovatexp.co";

const PATH = "/premium-ai-consulting";
const OG_IMAGE = "/opengraph-image" as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const b = getPremiumConsultingBundle(locale);
  const alternates = localeAlternates(locale, PATH);
  const ogUrl =
    typeof alternates?.canonical === "string" ? alternates.canonical : `${siteUrl}/${locale}${PATH}`;
  return {
    title: b.metaTitle,
    description: b.metaDescription,
    alternates,
    openGraph: {
      title: b.metaTitle,
      description: b.metaDescription,
      url: ogUrl,
      siteName: "InnovateXP Limited",
      images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: b.metaTitle,
      description: b.metaDescription,
      images: [OG_IMAGE],
    },
  };
}

export default async function PremiumAiConsultingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const loc = locale as AppLocale;
  const b = getPremiumConsultingBundle(loc);
  const pageUrl = `${siteUrl}/${locale}${PATH}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: b.headline,
    description: b.metaDescription,
    inLanguage: localeToHtmlLang(loc),
    url: pageUrl,
    datePublished: "2026-05-18",
    dateModified: "2026-05-18",
    author: {
      "@type": "Person",
      name: "InnovateXP founder",
      url: "https://www.linkedin.com/in/innovatexp/",
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
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl, url: pageUrl },
    about: ["AI consulting", "CRM implementation", "SmartSales CRM", "EventXP", "Hong Kong SME"],
  };

  const faqLd = getFAQPageSchema({
    url: pageUrl,
    questions: b.faqs,
  });

  const bookLabel = localeUsesChineseCopy(loc) ? "預約 Premium 諮詢" : "Book a premium consultation";

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleSchema, faqLd]).replace(/</g, "\\u003c"),
        }}
      />
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <nav className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <Link href={`/${locale}`} className="hover:text-brand-primary dark:hover:text-teal-300">
            {localeUsesChineseCopy(loc) ? "首頁" : "Home"}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700 dark:text-gray-300">{b.headline}</span>
        </nav>

        <h1 className="mb-8 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
          {b.headline}
        </h1>

        <div className="mb-12 space-y-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {b.intro.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>

        {b.sections.map((sec) => (
          <section key={sec.title} className="mb-10">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">{sec.title}</h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              {sec.paragraphs.map((p) => (
                <p key={p.slice(0, 28)} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">FAQ</h2>
          <dl className="space-y-6">
            {b.faqs.map((f) => (
              <div key={f.question}>
                <dt className="text-lg font-semibold text-gray-900 dark:text-white">{f.question}</dt>
                <dd className="mt-2 text-gray-700 dark:text-gray-300">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-gray-700 dark:bg-gray-800">
          <Link
            href={`/${locale}/bookme`}
            className="inline-block rounded-full bg-brand-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-primary-hover "
          >
            {bookLabel}
          </Link>
        </section>
      </div>
    </main>
  );
}
