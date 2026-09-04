import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getFitnessXpPageCopy } from "@/content/fitnessxp";
import { fitnessXpSeo } from "@/content/page-seo";
import { getFAQPageSchema, getFitnessXPProductSchema, getHowToSchema } from "@/lib/schema";
import { localeAlternates } from "@/lib/alternate-metadata";
import { isValidLocale, type AppLocale, withLocale } from "@/lib/i18n-routing";
import { getSiteUrl } from "@/lib/site-url";

const siteUrlMeta = getSiteUrl();

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const seo = fitnessXpSeo(locale as AppLocale);
  const alternates = localeAlternates(locale, "/fitnessxp");
  const ogUrl =
    typeof alternates?.canonical === "string" ? alternates.canonical : `${siteUrlMeta}/${locale}/fitnessxp`;
  return {
    title: seo.title,
    description: seo.description,
    keywords: [
      "FitnessXP",
      "培訓機構",
      "補習社",
      "Fitness Center",
      "課堂管理",
      "Yoga Pilates",
      "class management Hong Kong",
      "studio scheduling",
      "Larry Lo",
      "InnovateXP",
    ],
    alternates,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: ogUrl,
      siteName: "InnovateXP Limited",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "InnovateXP FitnessXP" }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: ["/opengraph-image"],
    },
  };
}

export default async function FitnessXpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const loc = locale as AppLocale;
  const c = getFitnessXpPageCopy(loc);
  const pageUrl = `${siteUrlMeta}/${loc}/fitnessxp`;
  const productSchema = getFitnessXPProductSchema();
  const jsonLd = [
    { ...productSchema, url: pageUrl },
    getFAQPageSchema({ url: pageUrl, questions: c.faqs }),
    getHowToSchema({
      name: c.howTitle,
      description: c.ctaBody,
      url: pageUrl,
      steps: c.howSteps,
    }),
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />

        <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-brand-primary dark:text-[color:var(--primary-hover)]">
          {c.eyebrow}
        </p>
        <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">{c.h1}</h1>
        <p className="mb-8 text-lg leading-relaxed text-gray-700 dark:text-gray-300" data-geo-answer>
          {c.lead}
        </p>

        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">{c.roleTitle}</h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300" data-geo-answer>
            {c.roleBody}
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">{c.exampleTitle}</h2>
          <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
            {c.exampleItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">{c.smartTitle}</h2>
          <dl className="space-y-4">
            {c.smartItems.map((item) => (
              <div key={item.label}>
                <dt className="text-lg font-semibold text-gray-900 dark:text-white">{item.label}</dt>
                <dd className="mt-1 text-gray-700 dark:text-gray-300">{item.body}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">{c.referTitle}</h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">{c.referIntro}</p>
          <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
            {c.referItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">{c.howTitle}</h2>
          <ol className="list-inside list-decimal space-y-3 text-gray-700 dark:text-gray-300">
            {c.howSteps.map((step) => (
              <li key={step.name} className="leading-relaxed">
                <span className="font-semibold text-gray-900 dark:text-white">{step.name}。</span> {step.text}
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">{c.faqTitle}</h2>
          <dl className="space-y-6">
            {c.faqs.map((f) => (
              <div key={f.question}>
                <dt className="text-xl font-semibold text-gray-900 dark:text-white">{f.question}</dt>
                <dd className="mt-2 text-gray-700 dark:text-gray-300">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">{c.ctaTitle}</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">{c.ctaBody}</p>
          <div className="flex flex-wrap gap-3">
            <Link href={withLocale(loc, "/bookme")} className="inline-block btn-brand px-6 py-3 font-semibold">
              {c.bookCta}
            </Link>
            <Link
              href={withLocale(loc, "/ai-consulting")}
              className="inline-block rounded-full border-2 border-brand-primary px-6 py-3 font-semibold text-brand-primary dark:border-brand-primary dark:text-[color:var(--primary-hover)]"
            >
              {c.consultingCta}
            </Link>
            <Link
              href={withLocale(loc, "/")}
              className="inline-block rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 dark:border-gray-600 dark:text-slate-200"
            >
              {c.homeCta}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
