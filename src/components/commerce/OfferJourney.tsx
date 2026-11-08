import Link from "next/link";
import { withLocale, type AppLocale } from "@/lib/i18n-routing";
import { AddToInquiryButton } from "@/components/inquiry-cart/AddToInquiryButton";

type JourneyCopy = { label: string; rows: [string, string, string][] };
const COPY: Record<AppLocale, JourneyCopy> = {
  "zh-hk": { label: "選擇下一步", rows: [
    ["01 · 看清問題", "免費業務聽診 → 固定範圍 Snapshot → 通過資格確認嘅 Discovery。", "了解 Snapshot"],
    ["02 · 落地改善", "CRM、網站、自動化及客製開發：先確認流程、交付及驗收，再報價。", "預約需求確認"],
    ["03 · 持續支援", "System Care 須先通過 Technical Audit，確認系統、支援範圍及月費。", "安排技術審核"],
  ] },
  "zh-tw": { label: "選擇下一步", rows: [
    ["01 · 釐清問題", "免費業務診斷 → 固定範圍 Snapshot → 通過資格確認的 Discovery。", "了解 Snapshot"],
    ["02 · 實作改善", "CRM、網站、自動化及客製開發：先確認流程、交付及驗收，再報價。", "預約需求確認"],
    ["03 · 持續支援", "System Care 須先通過 Technical Audit，確認系統、支援範圍及月費。", "安排技術審核"],
  ] },
  en: { label: "Choose your next step", rows: [
    ["01 · Clarify", "Free diagnosis → fixed-scope Snapshot → qualified Discovery.", "Explore Snapshot"],
    ["02 · Implement", "CRM, websites, automation and custom development: agree the workflow, deliverables and acceptance before quoting.", "Confirm requirements"],
    ["03 · Maintain", "System Care starts with an accepted Technical Audit and agreed systems, support limits and monthly fees.", "Arrange a Technical Audit"],
  ] },
  ja: { label: "次のステップを選ぶ", rows: [
    ["01 · 整理する", "無料の業務診断 → 範囲を限定した Snapshot → 適合確認後の Discovery。", "Snapshot を見る"],
    ["02 · 実装する", "CRM、ウェブサイト、自動化、個別開発。業務、成果物、検収条件を確認してから見積もります。", "要件を相談する"],
    ["03 · 維持する", "System Care は Technical Audit の確認後に開始。対象システム、支援範囲、月額料金を合意します。", "技術監査を相談する"],
  ] },
  de: { label: "Nächsten Schritt wählen", rows: [
    ["01 · Klären", "Kostenlose Diagnose → klar begrenzter Snapshot → Discovery nach Eignungsprüfung.", "Snapshot ansehen"],
    ["02 · Umsetzen", "CRM, Websites, Automatisierung und individuelle Entwicklung: Ablauf, Lieferumfang und Abnahme vor dem Angebot klären.", "Anforderungen besprechen"],
    ["03 · Betreuen", "System Care beginnt mit einem akzeptierten Technical Audit und vereinbarten Systemen, Supportgrenzen und Monatsgebühren.", "Technische Prüfung vereinbaren"],
  ] },
};
const PATHS = ["/services/snapshot", "/bookme", "/bookme?interest=system-care-audit"];

export function OfferJourney({ locale }: { locale: AppLocale }) {
  const c = COPY[locale];
  return (
    <section className="my-9 grid gap-5 border-y border-[#c8bba9] py-7 md:grid-cols-3" aria-label={c.label}>
      {c.rows.map(([title, text, label], index) => (
        <article key={title}>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="mt-3 text-sm leading-7">{text}</p>
          <Link className="mt-4 inline-flex min-h-11 items-center border-b border-[#8b6b43] text-sm font-semibold" href={withLocale(locale, PATHS[index])}>{label}</Link>
          {index === 0 ? <div className="mt-4"><AddToInquiryButton itemId="aiReadinessAssessment" fullWidth={false} /></div> : null}
        </article>
      ))}
    </section>
  );
}
