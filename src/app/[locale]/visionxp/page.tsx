import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import { VisionXpSection } from "@/components/VisionXpSection";
import { Button } from "@/components/ui/Button";
import { getHomepageContent } from "@/content/homepage";
import { visionXpSeo } from "@/content/page-seo";
import { VISIONXP_DEMO_URL } from "@/content/visionxp";
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
  const homeHref = withLocale(loc, "/");
  const bookHref = withLocale(loc, "/bookme");
  const pageUrl = `${siteUrlMeta}/${loc}/visionxp`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "VisionXP",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    url: pageUrl,
    description: copy.intro,
    offers: {
      "@type": "Offer",
      url: VISIONXP_DEMO_URL,
      price: "0",
      priceCurrency: "HKD",
      description: "Frontend-only public demo. Implementation scoped after Discovery.",
    },
    publisher: {
      "@type": "Organization",
      name: "InnovateXP Limited",
      url: siteUrlMeta,
    },
  };

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
        <VisionXpSection locale={loc} copy={copy} />
        <section className="ixp-card mb-16 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-[color:var(--heading-foreground)]">
            {loc.startsWith("zh") ? "點樣開始" : loc === "ja" ? "始め方" : loc === "de" ? "So starten" : "How it starts"}
          </h2>
          <ol className="mt-4 grid gap-3 text-base leading-8 text-[color:var(--text-secondary)] md:grid-cols-3">
            <li>
              <span className="font-semibold text-[color:var(--heading-foreground)]">1. </span>
              {loc.startsWith("zh")
                ? "打開 live demo，行家長同視光師入口。"
                : loc === "ja"
                  ? "ライブデモで保護者と専門職の入口を確認する。"
                  : loc === "de"
                    ? "Live-Demo öffnen und beide Portale durchgehen."
                    : "Open the live demo and walk the parent and optometrist portals."}
            </li>
            <li>
              <span className="font-semibold text-[color:var(--heading-foreground)]">2. </span>
              {loc.startsWith("zh")
                ? "預約 Discovery，鎖定一條診所或家長流程。"
                : loc === "ja"
                  ? "Discovery でクリニックまたは保護者の1本のフローを確定する。"
                  : loc === "de"
                    ? "Discovery buchen und einen Klinik- oder Eltern-Workflow festlegen."
                    : "Book Discovery and lock one clinic or parent workflow."}
            </li>
            <li>
              <span className="font-semibold text-[color:var(--heading-foreground)]">3. </span>
              {loc.startsWith("zh")
                ? "需要落地先報 Implementation Sprint。"
                : loc === "ja"
                  ? "実装が必要なら Implementation Sprint を見積する。"
                  : loc === "de"
                    ? "Umsetzung nur als Implementation Sprint nach Scope."
                    : "Quote an Implementation Sprint only after the workflow is clear."}
            </li>
          </ol>
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
