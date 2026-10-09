"use client";

import Link from "next/link";
import { SitePageShell } from "@/components/SitePageShell";
import { getHomepageContent } from "@/content/homepage";
import { useLanguage } from "@/app/LanguageContext";
import { withLocale, localeUsesChineseCopy } from "@/lib/i18n-routing";

export function ServicesPageContent() {
  const { locale } = useLanguage();
  const c = getHomepageContent(locale);
  const title =
    locale === "en" || locale === "de" || locale === "ja" ? "Services" : "服務";

  return (
    <SitePageShell title={title}>
      <p className="text-base leading-8 text-[color:var(--text-secondary)]">{c.services.title}</p>
      <div className="mt-8 grid gap-4">
        {c.services.items.map((item) => (
          <article key={item.title} className="ixp-card p-5 md:p-6">
            <h2 className="text-xl font-semibold text-[color:var(--heading-foreground)]">{item.title}</h2>
            <p className="mt-3 text-base leading-8 text-[color:var(--text-secondary)]">{item.body}</p>
          </article>
        ))}
      </div>
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-[color:var(--heading-foreground)]">{c.consultancy.title}</h2>
        <p className="mt-3 text-base leading-8 text-[color:var(--text-secondary)]">{c.consultancy.intro}</p>
        <p className="mt-2 text-sm leading-7 text-[color:var(--text-secondary)]">{c.consultancy.fitNote}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {c.consultancy.plans.map((plan) => (
            <article key={plan.name} className="ixp-card p-5">
              <h3 className="text-lg font-semibold text-[color:var(--heading-foreground)]">{plan.name}</h3>
              <p className="mt-1 text-sm font-semibold text-[color:var(--brand-primary)]">{plan.priceLabel}</p>
              <p className="mt-3 text-sm leading-7 text-[color:var(--text-secondary)]">{plan.body}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[color:var(--text-secondary)]">
                {plan.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href={withLocale(locale, "/ai-training-materials")} className="inline-flex min-h-11 items-center rounded-lg border border-[color:var(--brand-primary)] px-5 py-3 text-sm font-semibold text-[color:var(--brand-primary)]">
          {localeUsesChineseCopy(locale) ? "培訓教材 AI 製作" : locale === "ja" ? "研修教材のAI制作" : locale === "de" ? "KI-Schulungsmaterial" : "AI training materials"}
        </Link>
        <Link href={withLocale(locale, "/ai-consulting")} className="inline-flex min-h-11 items-center rounded-lg bg-[color:var(--brand-primary)] px-5 py-3 text-sm font-semibold text-white">
          {localeUsesChineseCopy(locale) ? "AI 商業顧問：點樣由業務聽診開始" : "AI consulting: start with workflow diagnosis"}
        </Link>
        <Link href={withLocale(locale, "/case-studies")} className="inline-flex min-h-11 items-center rounded-lg border border-[color:var(--brand-primary)] px-5 py-3 text-sm font-semibold text-[color:var(--brand-primary)]">
          {localeUsesChineseCopy(locale) ? "睇交付經驗" : "See delivery experience"}
        </Link>
      </div>
    </SitePageShell>
  );
}
