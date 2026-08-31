import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import { VisionXpSection } from "@/components/VisionXpSection";
import { Button } from "@/components/ui/Button";
import { getHomepageContent } from "@/content/homepage";
import { visionXpSeo } from "@/content/page-seo";
import { VISIONXP_DEMO_URL } from "@/content/visionxp";
import { getFAQPageSchema, getHowToSchema, getVisionXPProductSchema } from "@/lib/schema";
import { isValidLocale, type AppLocale } from "@/lib/i18n-routing";
import { localeAlternates } from "@/lib/alternate-metadata";
import { withLocale } from "@/lib/i18n-routing";

const siteUrlMeta =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.innovatexp.co";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const seo = visionXpSeo(locale as AppLocale);
  const alternates = localeAlternates(locale, "/visionxp");
  const ogUrl =
    typeof alternates?.canonical === "string" ? alternates.canonical : `${siteUrlMeta}/${locale}/visionxp`;
  return {
    title: seo.title,
    description: seo.description,
    keywords: [
      "VisionXP",
      "paediatric strabismus training",
      "amblyopia training demo",
      "Hong Kong optometrist portal",
      "InnovateXP",
    ],
    alternates,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: ogUrl,
      siteName: "InnovateXP Limited",
      images: [{ url: "/innovatexp_color_no_bg.svg", width: 1200, height: 630, alt: "InnovateXP VisionXP" }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
  };
}

export default async function VisionXpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const loc = locale as AppLocale;
  const content = getHomepageContent(loc);
  const copy = content.visionXp;
  const page = copy.page;
  const homeHref = withLocale(loc, "/");
  const bookHref = withLocale(loc, "/bookme");
  const pageUrl = `${siteUrlMeta}/${loc}/visionxp`;

  const jsonLd = [
    { ...getVisionXPProductSchema(), url: pageUrl, description: copy.intro },
    getFAQPageSchema({ url: pageUrl, questions: page.faqs }),
    getHowToSchema({
      name: page.howTitle,
      description: page.ctaBody,
      url: pageUrl,
      steps: page.howItems,
    }),
  ];

  const related = [
    {
      href: "/ai-consulting",
      label:
        loc.startsWith("zh") ? "AI 顧問" : loc === "ja" ? "AI コンサル" : loc === "de" ? "KI-Beratung" : "AI Consulting",
    },
    { href: "/eventxp", label: "EventXP" },
    { href: "/sme-ai-workflow", label: "SME AI Workflow" },
    { href: "/bookme", label: content.nav.cta },
  ];

  return (
    <div className="min-h-screen bg-bg text-fg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Header
        variant="main"
        title={content.brandTitle}
        subtitle={content.brandSubtitle}
        navItems={[
          { label: content.nav.home, href: homeHref },
          { label: content.nav.products, href: `${homeHref}#product-packages` },
          { label: content.nav.visionXp, href: `${homeHref}#visionxp` },
        ]}
        ctaLabel={content.nav.cta}
        ctaHref={bookHref}
      />
      <main className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6">
        <VisionXpSection locale={loc} copy={copy} showPageCta={false} />

        <section className="ixp-card mb-10 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-[color:var(--heading-foreground)]">{page.whatTitle}</h2>
          <p className="mt-4 text-base leading-8 text-[color:var(--text-secondary)]">{page.whatBody}</p>
        </section>

        <section className="ixp-card mb-10 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-[color:var(--heading-foreground)]">{page.whoTitle}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-8 text-[color:var(--text-secondary)]">
            {page.whoItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="ixp-card mb-10 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-[color:var(--heading-foreground)]">{page.notTitle}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-8 text-[color:var(--text-secondary)]">
            {page.notItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="ixp-card mb-10 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-[color:var(--heading-foreground)]">{page.howTitle}</h2>
          <ol className="mt-4 grid gap-3 text-base leading-8 text-[color:var(--text-secondary)] md:grid-cols-3">
            {page.howItems.map((step, index) => (
              <li key={step.name}>
                <span className="font-semibold text-[color:var(--heading-foreground)]">
                  {index + 1}. {step.name}
                </span>
                <p className="mt-1">{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={VISIONXP_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center rounded-[var(--btn-radius)] px-6 py-3 text-center text-base btn-brand"
            >
              {copy.demoCta}
            </a>
            <Button href={bookHref} variant="primary">
              {content.nav.cta}
            </Button>
          </div>
        </section>

        <section className="ixp-card mb-10 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-[color:var(--heading-foreground)]">{page.faqTitle}</h2>
          <dl className="mt-4 space-y-6">
            {page.faqs.map((item) => (
              <div key={item.question}>
                <dt className="text-lg font-semibold text-[color:var(--heading-foreground)]">{item.question}</dt>
                <dd className="mt-2 text-base leading-8 text-[color:var(--text-secondary)]">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="ixp-card mb-10 p-6 md:p-8">
          <h2 className="mb-4 text-2xl font-bold text-[color:var(--heading-foreground)]">{page.relatedTitle}</h2>
          <div className="flex flex-wrap gap-3">
            {related.map((item) => (
              <Link
                key={item.href}
                href={withLocale(loc, item.href)}
                className="rounded-full border border-[color:var(--border-light)] px-4 py-2 text-sm font-semibold text-[color:var(--text-secondary)] transition-colors hover:border-[color:var(--brand-primary)] hover:text-[color:var(--brand-primary)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="ixp-card mb-16 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-[color:var(--heading-foreground)]">{page.ctaTitle}</h2>
          <p className="mt-3 text-base leading-8 text-[color:var(--text-secondary)]">{page.ctaBody}</p>
          <div className="mt-6">
            <Button href={bookHref} variant="primary">
              {content.nav.cta}
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
