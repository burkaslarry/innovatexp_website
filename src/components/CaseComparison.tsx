import React from "react";
import Link from "next/link";
import type { AppLocale } from "@/lib/i18n-routing";
import type { CaseStudyContent } from "@/types/marketing";

const COPY: Record<AppLocale, {
  audience: string; comparison: string; before: string; delivered: string; evidence: string;
  limits: string; sources: string; related: string; approach: string;
  proofTypes: Record<CaseStudyContent["proofType"], string>;
}> = {
  en: {
    audience: "Who this is relevant to", comparison: "Before, delivered work and evidence", before: "Before · the challenge",
    delivered: "Delivered · the scope", evidence: "Evidence · reported outcomes", limits: "What the evidence does and does not show",
    sources: "Sources", related: "Related services", approach: "How the work was approached",
    proofTypes: { implementation: "Implementation", product: "Product", training: "Training", "technical-audit": "Technical audit" },
  },
  "zh-hk": {
    audience: "適合參考嘅團隊", comparison: "原本情況、交付同證據", before: "之前 · 面對嘅問題",
    delivered: "交付 · 做咗啲咩", evidence: "證據 · 已記錄成果", limits: "證據支持到邊，仲有咩未確認",
    sources: "資料來源", related: "相關服務", approach: "展開做法",
    proofTypes: { implementation: "實作交付", product: "產品", training: "培訓", "technical-audit": "技術審核" },
  },
  "zh-tw": {
    audience: "適合參考的團隊", comparison: "原況、交付與證據", before: "之前 · 面臨的問題",
    delivered: "交付 · 完成的範圍", evidence: "證據 · 已記錄成果", limits: "證據支持的範圍與尚未確認之處",
    sources: "資料來源", related: "相關服務", approach: "展開執行方式",
    proofTypes: { implementation: "實作交付", product: "產品", training: "培訓", "technical-audit": "技術審核" },
  },
  ja: {
    audience: "参考となる対象", comparison: "導入前・提供内容・根拠", before: "導入前 · 課題",
    delivered: "提供した範囲", evidence: "根拠 · 報告された成果", limits: "根拠が示すこと・未確認のこと",
    sources: "情報源", related: "関連サービス", approach: "取り組み方を見る",
    proofTypes: { implementation: "実装", product: "製品", training: "研修", "technical-audit": "技術監査" },
  },
  de: {
    audience: "Für wen dieser Fall relevant ist", comparison: "Ausgangslage, Umsetzung und Belege", before: "Vorher · die Aufgabe",
    delivered: "Geliefert · der Umfang", evidence: "Belege · berichtete Ergebnisse", limits: "Was belegt ist und was offenbleibt",
    sources: "Quellen", related: "Passende Leistungen", approach: "Vorgehensweise ansehen",
    proofTypes: { implementation: "Umsetzung", product: "Produkt", training: "Schulung", "technical-audit": "Technische Prüfung" },
  },
};

function localizedHref(locale: AppLocale, href: string) {
  return /^https?:\/\//.test(href) ? href : `/${locale}${href.startsWith("/") ? href : `/${href}`}`;
}

function ItemList({ items }: { items: string[] }) {
  return <ul className="list-disc space-y-3 pl-5 leading-relaxed text-[#51483d]">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

/** No slider or hidden "after": scope and qualifications are present in the server HTML. */
export function CaseComparison({ locale, item }: { locale: AppLocale; item: CaseStudyContent }) {
  const copy = COPY[locale];
  const linkClass = "inline-flex min-h-11 items-center border border-[#c8bba9] px-4 py-3 text-sm font-semibold text-[#251f19] underline underline-offset-4 hover:border-[#6f5436] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6f5436]";

  return (
    <article id={item.slug} className="scroll-mt-28 border-t border-[#c8bba9] py-8 md:py-10">
      <p className="text-xs font-semibold tracking-wide text-[#6f5436]">{copy.proofTypes[item.proofType]}</p>
      <h2 className="mt-3 text-3xl font-normal leading-tight md:text-4xl">{item.title}</h2>
      <p className="mt-4 max-w-4xl text-lg leading-relaxed text-[#51483d]">{item.summary}</p>
      <p className="mt-3 max-w-4xl leading-relaxed text-[#51483d]">{item.context}</p>
      <p className="mt-4 text-sm leading-relaxed text-[#51483d]"><span className="font-semibold text-[#251f19]">{copy.audience}: </span>{item.audience}</p>

      <section aria-label={copy.comparison} className="mt-6 grid border-y border-[#c8bba9] bg-[#fffdfa] lg:grid-cols-3">
        <div className="p-5 md:p-6">
          <h3 className="mb-4 text-lg font-semibold">{copy.before}</h3>
          <ItemList items={item.challenge} />
        </div>
        <div className="border-t border-[#c8bba9] p-5 md:p-6 lg:border-l lg:border-t-0">
          <h3 className="mb-4 text-lg font-semibold">{copy.delivered}</h3>
          <ItemList items={item.deliverables} />
        </div>
        <div className="border-t border-[#c8bba9] p-5 md:p-6 lg:border-l lg:border-t-0">
          <h3 className="mb-4 text-lg font-semibold">{copy.evidence}</h3>
          <ItemList items={item.outcomes} />
          <h4 className="mt-5 border-t border-[#d8cfc2] pt-4 text-sm font-semibold">{copy.limits}</h4>
          <p className="mt-2 text-sm leading-relaxed text-[#51483d]">{item.proofNote}</p>
        </div>
      </section>

      <div className="mt-5">
        <h3 className="text-sm font-semibold">{copy.sources}</h3>
        <ul className="mt-2 flex flex-wrap gap-3">
          {item.proofLinks.map((link) => (
            <li key={link.href}>
              <Link href={localizedHref(locale, link.href)} prefetch={false} className={linkClass}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <details className="mt-5 border-y border-[#d8cfc2]">
        <summary className="min-h-11 cursor-pointer py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6f5436]">{copy.approach}</summary>
        <div className="pb-5 pt-2"><ItemList items={item.approach} /></div>
      </details>
      <nav aria-label={copy.related} className="mt-5">
        <p className="text-sm font-semibold">{copy.related}</p>
        <ul className="mt-2 flex flex-wrap gap-3">
          {item.relatedLinks.map((link) => (
            <li key={link.href}><Link href={localizedHref(locale, link.href)} className={linkClass}>{link.label}</Link></li>
          ))}
        </ul>
      </nav>
    </article>
  );
}
