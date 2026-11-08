"use client";

import Link from "next/link";
import { SitePageShell } from "@/components/SitePageShell";
import { getHomepageContent } from "@/content/homepage";
import { useLanguage } from "@/app/LanguageContext";
import { withLocale, localeUsesChineseCopy } from "@/lib/i18n-routing";
import { OfferJourney } from "@/components/commerce/OfferJourney";
import { getSiteExperience } from "@/content/site-experience";
import { WorkflowMethod } from "@/components/WorkflowMethod";
import { WorkflowReadiness } from "@/components/questionnaires/WorkflowReadiness";

export function ServicesPageContent() {
  const { locale } = useLanguage();
  const c = getHomepageContent(locale);
  const experience = getSiteExperience(locale);

  return (
    <SitePageShell title={experience.servicesTitle}>
      <p data-geo-answer className="max-w-3xl text-lg leading-8 text-[color:var(--text-secondary)]">{experience.servicesIntro}</p>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {experience.serviceChoices.map(item => <article key={item.href} className="border-t border-[#c8bba9] pt-5"><h2 className="text-2xl">{item.title}</h2><p className="mt-4 leading-8">{item.body}</p><Link href={withLocale(locale, item.href)} className="mt-4 inline-flex min-h-11 items-center border-b border-[#8b6b43] text-sm font-semibold">{item.action} →</Link></article>)}
      </div>
      <OfferJourney locale={locale} />
      <div className="mt-8 grid gap-4">
        {c.services.items.map((item) => (
          <article key={item.title} className="ixp-card p-5 md:p-6">
            <h2 className="text-xl font-semibold text-[color:var(--heading-foreground)]">{item.title}</h2>
            <p className="mt-3 text-base leading-8 text-[color:var(--text-secondary)]">{item.body}</p>
          </article>
        ))}
      </div>
      <section className="mt-14"><WorkflowMethod locale={locale} /></section>
      <div className="mt-14"><WorkflowReadiness locale={locale} /></div>
      <section className="mt-12 border-t border-[#c8bba9] pt-8">
        <p className="text-xs uppercase tracking-widest text-[#8b6b43]">{localeUsesChineseCopy(locale) ? "獨立製作委託" : "Production commissions"}</p>
        <h2 className="mt-3 text-2xl">{localeUsesChineseCopy(locale) ? "AI 品牌短片／TVC 製作" : "AI brand films / TVC production"}</h2>
        <p className="mt-3 text-base leading-8">{localeUsesChineseCopy(locale) ? "分鏡、keyframe、逐鏡生成、剪接同字幕。先確認 brief，再按鏡數及交付要求報價。" : "Storyboards, keyframes, shot generation, editing and subtitles. Agree a brief, then quote by production scope."}</p>
        <Link href={withLocale(locale, "/ai-video-production")} className="mt-4 inline-flex min-h-11 items-center border-b border-[#8b6b43] text-sm font-semibold">{localeUsesChineseCopy(locale) ? "查看製作流程及驗收方式 →" : "View production and acceptance process →"}</Link>
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
