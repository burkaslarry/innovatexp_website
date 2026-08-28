import Image from "next/image";
import { AddToInquiryButton } from "@/components/inquiry-cart/AddToInquiryButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { HomepageContent } from "@/content/homepage";
import type { InquiryCatalogItemId } from "@/content/inquiry-catalog";
import type { AppLocale } from "@/lib/i18n-routing";

const POSTER_LOCALE_DIR: Record<AppLocale, string> = {
  en: "en",
  "zh-hk": "zh-hk",
  "zh-tw": "zh-tw",
  ja: "ja",
  de: "en",
};

const SYSTEM_CARE_INQUIRY_IDS = [
  "systemCareEssential",
  "systemCareGrowth",
  "systemCarePriority",
] as const satisfies readonly InquiryCatalogItemId[];

export function ProductPackagesSection({
  locale,
  content,
}: {
  locale: AppLocale;
  content: HomepageContent["products"];
}) {
  const dir = POSTER_LOCALE_DIR[locale] ?? "en";

  return (
    <section id="product-packages" className="mb-16 scroll-mt-[var(--header-offset)]">
      <SectionHeader
        title={content.title}
        subtitle={content.intro}
        eyebrow={
          <p className="mb-3 text-sm font-semibold tracking-[0.08em] text-[color:var(--secondary-color)]">
            {content.eyebrow}
          </p>
        }
      />
      <div className="grid gap-6 lg:grid-cols-2">
        {content.items.map((item) => (
          <article key={item.id} className="ixp-card overflow-hidden">
            <div className="relative aspect-[3/4] w-full bg-[color:var(--bg-secondary)] sm:aspect-[4/5]">
              <Image
                src={`/posters/${dir}/${item.poster}`}
                alt={`${item.name} — ${item.tagline}`}
                fill
                className="object-contain object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-3 p-5 md:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[color:var(--secondary-color)]">
                {item.eyebrow}
              </p>
              <h3 className="text-xl font-semibold text-[color:var(--heading-foreground)]">{item.name}</h3>
              <p className="text-base font-medium text-[color:var(--heading-foreground)]">{item.tagline}</p>
              <p className="text-sm font-semibold text-[color:var(--brand-primary)]">{item.price}</p>
              <p className="text-base leading-8 text-[color:var(--text-secondary)]">{item.body}</p>
              <ul className="space-y-1.5 text-sm leading-7 text-[color:var(--text-secondary)]">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--brand-primary)]" aria-hidden />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-10 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="ixp-card p-5 md:p-7">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[color:var(--secondary-color)]">
            {content.systemCare.eyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[color:var(--heading-foreground)]">
            {content.systemCare.title}
          </h2>
          <p className="mt-3 leading-7 text-[color:var(--text-secondary)]">{content.systemCare.intro}</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {content.systemCare.tiers.map((tier, index) => (
              <article key={tier.name} className="flex flex-col rounded-2xl border border-[color:var(--border-light)] bg-[color:var(--bg-secondary)] p-4">
                <h3 className="font-bold text-[color:var(--heading-foreground)]">{tier.name}</h3>
                <p className="mt-1 text-lg font-extrabold text-[color:var(--brand-primary)]">{tier.price}</p>
                <p className="mt-2 text-sm font-semibold text-[color:var(--heading-foreground)]">{tier.response}</p>
                <ul className="mt-3 mb-4 flex-1 space-y-2 text-sm leading-6 text-[color:var(--text-secondary)]">
                  {tier.points.map((point) => (
                    <li key={point}>· {point}</li>
                  ))}
                </ul>
                <AddToInquiryButton itemId={SYSTEM_CARE_INQUIRY_IDS[index] ?? "systemCareEssential"} size="small" />
              </article>
            ))}
          </div>
          <p className="mt-5 rounded-xl border border-amber-300/70 bg-amber-50 p-4 text-sm leading-7 text-amber-950 dark:border-amber-500/30 dark:bg-amber-950/20 dark:text-amber-100">
            {content.systemCare.boundary}
          </p>
        </section>

        <section className="ixp-card p-5 md:p-7">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[color:var(--secondary-color)]">
            {content.readiness.eyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[color:var(--heading-foreground)]">
            {content.readiness.title}
          </h2>
          <p className="mt-1 text-2xl font-extrabold text-[color:var(--brand-primary)]">{content.readiness.price}</p>
          <p className="mt-3 leading-7 text-[color:var(--text-secondary)]">{content.readiness.intro}</p>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-[color:var(--text-secondary)]">
            {content.readiness.points.map((point) => (
              <li key={point}>· {point}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm font-semibold leading-7 text-[color:var(--heading-foreground)]">
            {content.readiness.excludes}
          </p>
          <p className="mt-3 rounded-xl bg-[color:var(--bg-secondary)] p-4 text-sm font-bold leading-7 text-[color:var(--brand-primary)]">
            {content.readiness.upgrade}
          </p>
          <div className="mt-4">
            <AddToInquiryButton itemId="aiReadinessAssessment" size="small" />
          </div>
          <div className="mt-5 border-t border-[color:var(--border-light)] pt-5">
            <h3 className="font-bold text-[color:var(--heading-foreground)]">{content.readiness.educationTitle}</h3>
            <p className="mt-2 text-sm leading-7 text-[color:var(--text-secondary)]">
              {content.readiness.educationIntro}
            </p>
            <ul className="mt-3 mb-4 space-y-2 text-sm leading-7 text-[color:var(--text-secondary)]">
              {content.readiness.educationPoints.map((point) => (
                <li key={point}>· {point}</li>
              ))}
            </ul>
            <AddToInquiryButton itemId="educationTrack" size="small" />
          </div>
        </section>
      </div>
      <div className="mt-6 rounded-[var(--card-radius)] border border-[color:var(--border-light)] bg-[color:var(--bg-secondary)] px-5 py-4">
        <p className="text-base font-semibold text-[color:var(--heading-foreground)]">{content.securityTitle}</p>
        <p className="mt-1 text-sm leading-7 text-[color:var(--text-secondary)]">{content.securityNote}</p>
      </div>
    </section>
  );
}
