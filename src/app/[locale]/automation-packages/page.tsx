import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AutomationQualifier } from "@/components/AutomationQualifier";
import { getAutomationPackagesCopy } from "@/content/automation-packages";
import { localeAlternates } from "@/lib/alternate-metadata";
import { getFAQPageSchema } from "@/lib/schema";
import { isValidLocale, localeUsesChineseCopy, type AppLocale, withLocale } from "@/lib/i18n-routing";

const OG_IMAGE = "/opengraph-image" as const;
const siteUrlMeta =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.innovatexp.co";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const c = getAutomationPackagesCopy(locale as AppLocale);
  const alternates = localeAlternates(locale, "/automation-packages");
  const ogUrl =
    typeof alternates?.canonical === "string"
      ? alternates.canonical
      : `${siteUrlMeta}/${locale}/automation-packages`;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates,
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: ogUrl,
      siteName: "InnovateXP Limited",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: c.metaTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: c.metaTitle,
      description: c.metaDescription,
      images: [OG_IMAGE],
    },
  };
}

export default async function AutomationPackagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const loc = locale as AppLocale;
  const c = getAutomationPackagesCopy(loc);
  const zh = localeUsesChineseCopy(loc);
  const siteUrl = siteUrlMeta;
  const pageUrl = `${siteUrl}/${loc}/automation-packages`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${pageUrl}#service`,
    name: zh ? "InnovateXP 業務聽診＋n8n／ERP 自動化服務" : "InnovateXP diagnosis + n8n/ERP automation",
    description: c.metaDescription,
    provider: {
      "@type": "Person",
      name: "Larry Lo",
      jobTitle: "AI Business Consultant",
      worksFor: { "@type": "Organization", name: "InnovateXP Limited" },
    },
    areaServed: { "@type": "AdministrativeArea", name: "Hong Kong" },
    brand: { "@type": "Brand", name: "InnovateXP" },
    url: pageUrl,
    offers: c.packages.slice(0, 5).map((p) => ({
      "@type": "Offer",
      name: p.name,
      description: p.includes,
      priceCurrency: "HKD",
      category: "BusinessProcessAutomation",
    })),
  };

  const eeatSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${pageUrl}#eeat`,
    name: c.eeatTitle,
    about: {
      "@type": "Person",
      name: "Larry Lo",
      jobTitle: "AI Business Consultant",
      description: c.lead,
      worksFor: { "@type": "Organization", name: "InnovateXP Limited", url: siteUrl },
    },
    mainEntity: c.eeat.map((item) => ({
      "@type": "Thing",
      name: item.label,
      description: item.body,
    })),
  };

  const faqSchema = getFAQPageSchema({
    url: pageUrl,
    questions: c.faqs,
  });

  return (
    <main className="min-h-screen bg-bg text-fg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eeatSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="mx-auto max-w-[1100px] px-4 py-12 sm:px-6 md:py-16">
        <p className="mb-3 text-sm font-semibold tracking-[0.08em] text-[color:var(--secondary-color)]">
          {c.eyebrow}
        </p>
        <h1 className="max-w-[22ch] text-[clamp(1.9rem,4.5vw,3rem)] font-bold tracking-[-0.02em] text-[color:var(--heading-foreground)]">
          {c.h1}
        </h1>
        <p className="mt-5 max-w-[72ch] text-lg leading-8 text-[color:var(--text-secondary)]">{c.lead}</p>
        <p className="mt-4 max-w-[72ch] text-base font-semibold leading-8 text-[color:var(--heading-foreground)]">
          {c.brandPromise}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href={withLocale(loc, "/bookme")}
            className="btn-brand inline-flex min-h-[48px] items-center justify-center px-6 py-3 text-base font-semibold"
          >
            {c.bookCta}
          </Link>
          <a
            href="#qualifier"
            className="inline-flex min-h-[48px] items-center justify-center rounded-[var(--btn-radius)] border border-[color:var(--border-medium)] px-6 py-3 text-base font-semibold text-[color:var(--text-primary)]"
          >
            {c.qualifierTitle}
          </a>
        </div>

        <section className="mt-16">
          <h2 className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold text-[color:var(--heading-foreground)]">
            {c.serviceFirstTitle}
          </h2>
          <p className="mt-4 max-w-[70ch] text-base leading-8 text-[color:var(--text-secondary)]">
            {c.serviceFirstBody}
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <article className="ixp-card p-5">
              <h3 className="text-lg font-semibold text-[color:var(--heading-foreground)]">{c.hermesTitle}</h3>
              <p className="mt-3 text-sm font-semibold text-[color:var(--secondary-color)]">
                {zh ? "✅ 適合" : "✅ Fit"}
              </p>
              <ul className="mt-2 grid gap-2 text-sm leading-7 text-[color:var(--text-secondary)]">
                {c.hermesYes.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm font-semibold text-[color:var(--pain-accent)]">
                {zh ? "❌ 唔適合" : "❌ Don’t"}
              </p>
              <ul className="mt-2 grid gap-2 text-sm leading-7 text-[color:var(--text-secondary)]">
                {c.hermesNo.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-7 text-[color:var(--text-primary)]">{c.hermesUncensoredNote}</p>
            </article>
            <article className="ixp-card p-5">
              <h3 className="text-lg font-semibold text-[color:var(--heading-foreground)]">{c.erpTitle}</h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--text-secondary)]">{c.erpIntro}</p>
              <ul className="mt-4 grid gap-3">
                {c.erpOptions.map((opt) => (
                  <li key={opt.name} className="border-t border-[color:var(--border-light)] pt-3 first:border-0 first:pt-0">
                    <p className="font-semibold text-[color:var(--heading-foreground)]">{opt.name}</p>
                    <p className="text-sm text-[color:var(--text-secondary)]">{opt.fit}</p>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold text-[color:var(--heading-foreground)]">
            {c.eeatTitle}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {c.eeat.map((item) => (
              <article key={item.label} className="ixp-card p-5">
                <h3 className="text-base font-bold text-[color:var(--heading-foreground)]">{item.label}</h3>
                <p className="mt-2 text-sm leading-7 text-[color:var(--text-secondary)]">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold text-[color:var(--heading-foreground)]">
            {c.spectrumTitle}
          </h2>
          <p className="mt-3 max-w-[70ch] text-base leading-8 text-[color:var(--text-secondary)]">
            {c.spectrumIntro}
          </p>
          <div className="mt-6 overflow-x-auto rounded-[var(--card-radius)] border border-[color:var(--border-light)]">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[color:var(--bg-secondary)] text-[color:var(--heading-foreground)]">
                <tr>
                  <th className="p-3 font-semibold">{zh ? "方案" : "Package"}</th>
                  <th className="p-3 font-semibold">Setup</th>
                  <th className="p-3 font-semibold">{zh ? "月費" : "Monthly"}</th>
                  <th className="p-3 font-semibold">{zh ? "包含" : "Includes"}</th>
                  <th className="p-3 font-semibold">{zh ? "適合" : "Best for"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[color:var(--border-light)]">
                {c.packages.map((row) => (
                  <tr key={row.id} className="bg-[color:var(--card-bg)] align-top">
                    <td className="p-3 font-semibold text-[color:var(--heading-foreground)]">{row.name}</td>
                    <td className="p-3 text-[color:var(--text-primary)]">{row.setup}</td>
                    <td className="p-3 text-[color:var(--text-primary)]">{row.monthly}</td>
                    <td className="p-3 text-[color:var(--text-secondary)]">{row.includes}</td>
                    <td className="p-3 text-[color:var(--text-secondary)]">
                      {row.bestFor}
                      <span className="mt-1 block text-xs text-[color:var(--text-tertiary)]">
                        {zh ? "唔賣：" : "Avoid: "}
                        {row.avoidWhen}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-7 text-[color:var(--text-secondary)]">{c.passThrough}</p>
        </section>

        <div className="mt-16">
          <AutomationQualifier locale={loc} />
        </div>

        <section className="mt-16">
          <h2 className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold text-[color:var(--heading-foreground)]">
            {c.faqTitle}
          </h2>
          <div className="mt-6 grid gap-4">
            {c.faqs.map((faq) => (
              <article key={faq.question} className="ixp-card p-5">
                <h3 className="text-base font-semibold text-[color:var(--heading-foreground)]">{faq.question}</h3>
                <p className="mt-2 text-sm leading-7 text-[color:var(--text-secondary)]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 ixp-card p-6 md:p-8">
          <h2 className="text-2xl font-bold text-[color:var(--heading-foreground)]">
            {zh ? "下一步" : "Next step"}
          </h2>
          <p className="mt-3 max-w-[65ch] text-base leading-8 text-[color:var(--text-secondary)]">
            {zh
              ? "預約業務聽診確認卡住收入嘅線，再決定 Lite／Starter／AI API／Private GPU。產品頁只係落地選項，唔取代顧問服務。"
              : "Book a diagnosis to confirm the revenue-blocking line, then choose Lite / Starter / AI API / Private GPU. Product pages are landing options — not a substitute for advisory."}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href={withLocale(loc, "/bookme")}
              className="btn-brand inline-flex min-h-[48px] items-center justify-center px-6 py-3 text-base font-semibold"
            >
              {c.bookCta}
            </Link>
            <Link
              href={withLocale(loc, "/ai-consulting")}
              className="inline-flex min-h-[48px] items-center justify-center rounded-[var(--btn-radius)] border border-[color:var(--border-medium)] px-6 py-3 text-base font-semibold text-[color:var(--text-primary)]"
            >
              {zh ? "AI 顧問主線" : "AI consulting mainline"}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
