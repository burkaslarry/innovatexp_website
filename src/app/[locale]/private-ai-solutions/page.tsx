import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialCta, EditorialSection, ServiceEditorial } from "@/components/editorial/ServiceEditorial";
import { PRIVATE_AI_COPY } from "@/content/private-ai-copy";
import { privateAiSeo } from "@/content/page-seo";
import { localeAlternates } from "@/lib/alternate-metadata";
import { isValidLocale, type AppLocale } from "@/lib/i18n-routing";
import { getFAQPageSchema } from "@/lib/schema";
import { getSiteUrl } from "@/lib/site-url";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const seo = privateAiSeo(locale as AppLocale);
  const alternates = localeAlternates(locale, "/private-ai-solutions");
  return {
    title: seo.title,
    description: seo.description,
    alternates,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: typeof alternates?.canonical === "string" ? alternates.canonical : undefined,
      siteName: "InnovateXP Limited",
    },
  };
}

export default async function PrivateAiSolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const loc = locale as AppLocale;
  const copy = PRIVATE_AI_COPY[loc];
  const pageUrl = `${getSiteUrl()}/${locale}/private-ai-solutions`;
  const jsonLd = getFAQPageSchema({ url: pageUrl, questions: copy.faqs });

  return (
    <ServiceEditorial eyebrow={copy.eyebrow} title={copy.h1} answer={copy.answer}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <p className="max-w-2xl text-lg leading-8 text-[color:var(--text-secondary)]">{copy.support}</p>

      <EditorialSection title={copy.tableTitle}>
        <div className="grid gap-4 md:grid-cols-3">
          {copy.rows.map((row) => (
            <article key={row[0]} className="ixp-card flex flex-col gap-4 p-6">
              <h3 className="font-[family-name:var(--font-heading)] text-2xl tracking-tight">{row[0]}</h3>
              <dl className="space-y-3 text-sm leading-6 text-[color:var(--text-secondary)]">
                {row.slice(1).map((cell, index) => (
                  <div key={copy.columns[index + 1]}>
                    <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--text-tertiary)]">{copy.columns[index + 1]}</dt>
                    <dd className="mt-1 text-[color:var(--text-primary)]">{cell}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </EditorialSection>

      <EditorialSection title={copy.fitTitle}>
        <ul className="grid gap-3 md:grid-cols-2">
          {copy.fit.map((item) => (
            <li key={item} className="surface-section px-5 py-4 leading-7">{item}</li>
          ))}
        </ul>
      </EditorialSection>

      <EditorialSection title={copy.stepsTitle}>
        <ol className="grid gap-4 md:grid-cols-3">
          {copy.steps.map((step, index) => (
            <li key={step.title} className="ixp-card p-6">
              <p className="text-[0.72rem] font-semibold tracking-[0.2em] text-[color:var(--pain-accent)]">0{index + 1}</p>
              <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 leading-7 text-[color:var(--text-secondary)]">{step.body}</p>
            </li>
          ))}
        </ol>
      </EditorialSection>

      <p className="max-w-2xl text-sm leading-7 text-[color:var(--text-tertiary)]">{copy.legal}</p>
      <p className="max-w-2xl text-sm font-semibold leading-7">{copy.disclaimer}</p>

      <EditorialSection title={copy.faqTitle}>
        <dl className="divide-y divide-[color:var(--border-light)] border-y border-[color:var(--border-light)]">
          {copy.faqs.map((faq) => (
            <div key={faq.question} className="py-6">
              <dt className="text-xl font-semibold">{faq.question}</dt>
              <dd className="mt-2 max-w-3xl leading-7 text-[color:var(--text-secondary)]">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </EditorialSection>

      <EditorialSection title={copy.linksTitle}>
        <ul className="flex flex-col gap-3">
          {copy.links.map((item) => (
            <li key={item.href}>
              <Link href={`/${locale}${item.href}`} className="text-lg font-semibold text-[color:var(--brand-green)] underline decoration-[color:var(--pain-accent)] underline-offset-4">{item.label}</Link>
            </li>
          ))}
        </ul>
      </EditorialSection>

      <EditorialCta href={`/${locale}/bookme`} title={copy.ctaTitle} body={copy.ctaBody} label={copy.cta} />
    </ServiceEditorial>
  );
}
