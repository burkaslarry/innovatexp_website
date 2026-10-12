import Link from "next/link";
import { commerceCopy } from "@/content/commerce";
import type { AppLocale } from "@/lib/i18n-routing";

export function OfferJourney({ locale }: { locale: AppLocale }) {
  const zh = locale.startsWith("zh"); const c = commerceCopy(locale);
  const rows = zh ? [
    ["01 · 看清問題", "免費業務聽診 → 固定範圍 Snapshot → 通過資格確認的 Discovery。", c.detail, "/services/snapshot"],
    ["02 · 落地改善", "CRM、網站、自動化及客製開發：先確認流程、交付及驗收，再報價。", "預約需求確認", "/bookme"],
    ["03 · 持續支援", "System Care 須先通過 Technical Audit，確認系統、支援範圍及月費。", "安排技術審核", "/bookme?interest=system-care-audit"],
  ] : [
    ["01 · Clarify", "Free diagnosis → fixed-scope Snapshot → qualified Discovery.", c.detail, "/services/snapshot"],
    ["02 · Implement", "CRM, websites, automation and custom development: agree the workflow, deliverables and acceptance before quoting.", "Confirm requirements", "/bookme"],
    ["03 · Maintain", "System Care starts with an accepted Technical Audit and agreed systems, support limits and monthly fees.", "Arrange a Technical Audit", "/bookme?interest=system-care-audit"],
  ];
  return <section className="my-9 grid gap-5 border-y border-[#c8bba9] py-7 md:grid-cols-3" aria-label={zh ? "選擇下一步" : "Choose your next step"}>{rows.map(([title, text, label, path]) => <article key={title}><h2 className="text-lg font-semibold">{title}</h2><p className="mt-3 text-sm leading-7">{text}</p><Link className="mt-4 inline-flex min-h-11 items-center border-b border-[#8b6b43] text-sm font-semibold" href={`/${locale}${path}`}>{label}</Link></article>)}</section>;
}
