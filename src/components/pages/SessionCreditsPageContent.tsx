"use client";

import Link from "next/link";
import { SitePageShell } from "@/components/SitePageShell";
import { AddToInquiryButton } from "@/components/inquiry-cart/AddToInquiryButton";
import { getSessionCreditsCopy, sessionCreditPacks } from "@/content/session-credits";
import { useLanguage } from "@/app/LanguageContext";
import { useLocalizedHref } from "@/hooks/useLocalizedHref";
import type { InquiryCatalogItemId } from "@/content/inquiry-catalog";
import type { PricingLocale } from "@/content/pricing";

export function SessionCreditsPageContent() {
  const { locale } = useLanguage();
  const loc = useLocalizedHref();
  const copy = getSessionCreditsCopy(locale);
  const packs = sessionCreditPacks(locale as PricingLocale);

  return (
    <SitePageShell title={copy.title}>
      <p data-geo-answer="" className="max-w-[42rem] text-lg leading-relaxed text-[color:var(--text-primary)]">
        {copy.lead}
      </p>
      <p className="mt-4 text-sm font-semibold text-[color:var(--heading-foreground)]">{copy.sessionRule}</p>
      <p className="mt-2 max-w-[42rem] text-sm leading-7 text-[color:var(--text-secondary)]">{copy.buyRule}</p>

      <div className="mt-10 grid items-stretch gap-px border border-[color:var(--border-light)] bg-[color:var(--border-light)] md:grid-cols-3">
        {packs.map((pack) => (
          <article
            key={pack.id}
            className="flex flex-col bg-[color:var(--bg-primary)] p-6"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="font-[family-name:var(--font-heading)] text-2xl text-[color:var(--heading-foreground)]">
                {pack.credits.toLocaleString(locale === "de" ? "de-DE" : "en-HK")}
              </h2>
              {pack.recommended ? (
                <span className="text-xs font-medium tracking-[0.08em] text-[color:var(--text-tertiary)]">{copy.recommended}</span>
              ) : null}
            </div>
            <p className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(2rem,4vw,2.75rem)] font-semibold tracking-[-0.03em] text-[color:var(--heading-foreground)]">{pack.priceLabel}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[color:var(--text-tertiary)]">{copy.prepaid}</p>
            <p className="mt-4 text-sm font-semibold text-[color:var(--heading-foreground)]">
              {pack.bonusCredits > 0 ? copy.bonus(pack.bonusCredits) : copy.noBonus}
            </p>
            {pack.bonusCredits > 0 ? (
              <p className="text-sm text-[color:var(--text-secondary)]">{copy.totalCredits(pack.total)}</p>
            ) : null}
            <p className="mt-3 flex-1 text-sm leading-6 text-[color:var(--text-secondary)]">
              {copy.sessions(pack.sessions, pack.hours, pack.remainder)}
            </p>
            <p className="mt-3 text-sm text-[color:var(--text-tertiary)]">{copy.unit(pack.listHourlyLabel)}</p>
            <div className="mt-5">
              <AddToInquiryButton itemId={pack.id as InquiryCatalogItemId} />
            </div>
          </article>
        ))}
      </div>

      <p className="mt-6 text-sm leading-7 text-[color:var(--text-secondary)]">{copy.ctaNote}</p>
      <p className="mt-5 rounded-xl border border-amber-300/70 bg-amber-50 p-4 text-sm leading-7 text-amber-950 dark:border-amber-500/30 dark:bg-amber-950/20 dark:text-amber-100">
        {copy.boundary}
      </p>
      <p className="mt-4 text-sm text-[color:var(--text-secondary)]">
        {copy.notThis}{" "}
        <Link href={loc("/bookme")} className="font-semibold text-[color:var(--heading-foreground)] underline underline-offset-4">
          {copy.diagnosisLink}
        </Link>
      </p>
    </SitePageShell>
  );
}
