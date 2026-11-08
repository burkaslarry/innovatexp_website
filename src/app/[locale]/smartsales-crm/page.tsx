import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SitePageShell } from "@/components/SitePageShell";
import { smartSalesScope } from "@/content/smartsales-scope";
import { SERVICE_DECISION_COPY } from "@/content/service-decision-copy";
import { formatHkd } from "@/content/pricing";
import { smartSalesSeo } from "@/content/page-seo";
import { localeAlternates } from "@/lib/alternate-metadata";
import { getFAQPageSchema } from "@/lib/schema";
import { getSiteUrl } from "@/lib/site-url";
import { isValidLocale, localeUsesChineseCopy, type AppLocale } from "@/lib/i18n-routing";

const DECISION: Record<AppLocale, { features: string; benefits: string[]; workflow: string[]; inputs: string; related: string }> = {
  en: {
    features: "What the CRM helps your team do",
    benefits: ["Contacts and opportunities keep an enquiry and its sales stage together.", "A named owner and next-action task make follow-up responsibility visible.", "A basic pipeline report supports review of open opportunities; it does not predict revenue."],
    workflow: ["Record the enquiry and assign an owner.", "Update the stage, quote status and next follow-up task as the sale progresses.", "Review overdue tasks and the pipeline with the team; staff remain responsible for contact and decisions."],
    inputs: "Bring anonymised sample records, current stages, user roles and an owner who can approve the workflow. State record counts, data sources and a baseline such as overdue follow-ups. Production imports require cleaned CSVs within the selected tier's limits, not raw customer lists at the first conversation.",
    related: "ZOMATE FITNESS connects classes, membership and WhatsApp service reminders. It is related implementation experience, not evidence of a standard SmartSales deployment or a promise that integrations are included. Client-confirmed performance metrics are not yet published.",
  },
  "zh-hk": {
    features: "CRM 幫團隊處理啲乜",
    benefits: ["客戶同商機記錄，將查詢同銷售階段放埋一齊。", "負責人同下一步任務，令跟進責任睇得清。", "基本銷售流程報表方便覆核未完成商機，唔係收入預測。"],
    workflow: ["記錄查詢，指派負責人。", "按進展更新階段、報價狀態同下一步跟進任務。", "團隊覆核逾期任務同銷售流程；聯絡同決定仍然由人負責。"],
    inputs: "帶匿名樣本、現有階段、使用者角色，同一位可以確認流程嘅負責人。講清筆數、資料來源同基準，例如逾期跟進數量。正式匯入要用符合所選級別上限嘅已整理 CSV；第一次傾唔需要交原始客戶名單。",
    related: "ZOMATE FITNESS 串連課堂、會籍同 WhatsApp 服務提醒。呢個係相關實施經驗，唔代表標準 SmartSales 部署，亦唔代表接駁已包。客戶確認嘅成效數字尚未公布。",
  },
  "zh-tw": {
    features: "CRM 如何協助團隊",
    benefits: ["客戶與商機記錄，將詢問與銷售階段整合。", "指定負責人與下一步任務，讓追蹤責任清楚可見。", "基本銷售流程報表可檢視未完成商機，但不是營收預測。"],
    workflow: ["記錄詢問並指派負責人。", "依進度更新階段、報價狀態與下一步追蹤任務。", "團隊檢視逾期任務與銷售流程；聯絡與決策仍由人員負責。"],
    inputs: "準備匿名樣本、現有階段、使用者角色，以及能核准流程的負責人。說明筆數、資料來源與基準，例如逾期追蹤數量。正式匯入須使用符合所選級別上限的已整理 CSV；初次討論不需要原始客戶名單。",
    related: "ZOMATE FITNESS 串連課堂、會籍與 WhatsApp 服務提醒。這是相關實施經驗，不代表標準 SmartSales 部署，也不代表已包含串接。客戶確認的成效數據尚未公布。",
  },
  ja: {
    features: "CRM が支える業務",
    benefits: ["連絡先と商談で、問い合わせと営業段階をまとめます。", "責任者と次のタスクにより、フォロー担当が明確になります。", "基本的な案件レポートで進行中の商談を確認できます。売上予測ではありません。"],
    workflow: ["問い合わせを記録し、責任者を割り当てます。", "進捗に合わせて段階、見積もり状況、次のフォローを更新します。", "チームで期限超過タスクと案件を確認します。連絡と判断は人が担当します。"],
    inputs: "匿名化したサンプル、現在の段階、利用者の役割、承認できる責任者をご準備ください。件数、データ元、対応期限超過などの基準値を確認します。本番取込は選択プランの上限内の整理済み CSV が必要で、初回相談に顧客名簿は不要です。",
    related: "ZOMATE FITNESS は授業、会員、WhatsApp のサービス通知を連携しています。関連する実装経験であり、標準 SmartSales の導入実績や連携込みの証明ではありません。顧客確認済みの効果指標は未公表です。",
  },
  de: {
    features: "Wobei das CRM Ihr Team unterstützt",
    benefits: ["Kontakte und Verkaufschancen verbinden Anfrage und Vertriebsphase.", "Verantwortliche und nächste Aufgaben machen die Zuständigkeit für Nachfassaktionen sichtbar.", "Ein einfacher Pipeline-Bericht unterstützt die Prüfung offener Chancen, nicht die Umsatzprognose."],
    workflow: ["Anfrage erfassen und eine verantwortliche Person zuweisen.", "Phase, Angebotsstatus und nächste Nachfassaufgabe im Verlauf aktualisieren.", "Überfällige Aufgaben und Pipeline gemeinsam prüfen. Kontakt und Entscheidungen bleiben beim Team."],
    inputs: "Bereiten Sie anonymisierte Datensätze, aktuelle Phasen, Rollen und eine freigabeberechtigte Person vor. Nennen Sie Datenmengen, Quellen und einen Ausgangswert wie überfällige Aufgaben. Produktivimporte benötigen bereinigte CSVs innerhalb der Tarifgrenzen; zum Erstgespräch sind keine rohen Kundenlisten nötig.",
    related: "ZOMATE FITNESS verbindet Kurse, Mitgliedschaft und WhatsApp-Servicehinweise. Das ist verwandte Implementierungserfahrung, kein Beleg für eine Standard-SmartSales-Einführung oder enthaltene Schnittstellen. Kundenbestätigte Leistungskennzahlen sind noch nicht veröffentlicht.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const seo = smartSalesSeo(locale as AppLocale);
  return { title: seo.title, description: seo.description, alternates: localeAlternates(locale, "/smartsales-crm"), openGraph: { title: seo.ogTitle || seo.title, description: seo.ogDescription || seo.description, images: ["/opengraph-image"] } };
}
export default async function SmartSalesCrmPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const loc = locale as AppLocale;
  const zh = localeUsesChineseCopy(loc);
  const c = smartSalesScope(loc);
  const d = SERVICE_DECISION_COPY[loc];
  const decision = DECISION[loc];
  const price = (amount: number) => formatHkd(amount, loc);
  const h2 = "text-2xl leading-snug md:text-3xl";
  const section = "mt-14 border-t border-[#c8bba9] pt-8";
  const schema = getFAQPageSchema({ url: `${getSiteUrl()}/${locale}/smartsales-crm`, questions: c.faqs });
  return <SitePageShell title={c.title} actionLabel={c.cta} actionHref={`/${locale}/bookme`}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <p className="max-w-3xl text-xl leading-9" data-geo-answer>{c.lead}</p>
    <p className="mt-5 border-l-2 border-[#8b6b43] pl-4 text-base leading-8">{c.boundary}</p>
    <div className={`${section} grid gap-10 md:grid-cols-2`}>
      <section><h2 className={h2}>{decision.features}</h2><ul className="mt-5 list-disc space-y-3 pl-5 leading-8">{decision.benefits.map(item => <li key={item}>{item}</li>)}</ul></section>
      <section><h2 className={h2}>{d.process}</h2><ol className="mt-5 list-decimal space-y-3 pl-5 leading-8">{decision.workflow.map(item => <li key={item}>{item}</li>)}</ol></section>
    </div>
    <section className={section}><h2 className={h2}>{d.preparation}</h2><p className="mt-4 max-w-3xl leading-8">{decision.inputs}</p></section>
    <section className={section} aria-labelledby="pilot-title">
      <h2 id="pilot-title" className={h2}>{c.pilot.name}</h2>
      <p className="mt-4 text-3xl text-[#6f5436]">{price(c.pilot.amount)} <span className="text-sm">{zh ? "一次性" : "one-time"}</span></p>
      <p className="mt-3 leading-8">{c.pilot.summary}</p>
      <ul className="mt-4 list-disc space-y-2 pl-5 leading-8">{c.pilot.items.map(item => <li key={item}>{item}</li>)}</ul>
    </section>
    <section className={section} aria-labelledby="setup-title">
      <h2 id="setup-title" className={h2}>{zh ? "正式上線：一次性建置費。" : "Production setup: one-time implementation."}</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2">{c.setup.map(tier => <article key={tier.name} className="border border-[#c8bba9] p-6">
        <h3 className="text-2xl">{tier.name}</h3><p className="mt-3 text-3xl text-[#6f5436]">{price(tier.amount)} <span className="text-sm">{zh ? "起／一次性" : "from / one-time"}</span></p>
        <p className="mt-4 leading-8">{tier.summary}</p><ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7">{tier.items.map(item => <li key={item}>{item}</li>)}</ul>
      </article>)}</div>
    </section>
    <section className={section} aria-labelledby="care-title">
      <h2 id="care-title" className={h2}>{c.careTitle}</h2><p className="mt-4 max-w-3xl leading-8">{c.careBody}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">{c.care.map(tier => <article key={tier.name} className="bg-[#eee8de] p-5"><h3 className="text-lg">{tier.name}</h3><p className="mt-3 text-2xl">{price(tier.amount)} <span className="text-sm">{zh ? "／月起" : "/month from"}</span></p><p className="mt-3 text-sm leading-7">{zh ? `每月最多 ${tier.hours} 小時遠程支援` : `Up to ${tier.hours} remote support hours per month`}</p></article>)}</div>
      <p className="mt-5 border-l-2 border-[#8b6b43] pl-4 text-sm leading-7">{c.careExcludes}</p>
    </section>
    <section className={section}><h2 className={h2}>{c.casesTitle}</h2><p className="mt-3 text-sm leading-7 text-[#6f5436]">{c.casesNote}</p>
      <div className="mt-6 space-y-6">{c.cases.map(example => <article key={example.title} className="border border-[#c8bba9] p-6"><h3 className="text-xl">{example.title}</h3><p className="mt-3 leading-8">{example.scope}</p><p className="mt-3 leading-8">{example.result}</p><p className="mt-4 font-semibold text-[#6f5436]">{example.budget}</p></article>)}</div>
    </section>
    <section className={section}><h2 className={h2}>{c.existingTitle}</h2><p className="mt-4 max-w-3xl leading-8">{c.existingBody}</p><Link href={`/${locale}/compare/smartsales-vs-salesforce`} className="mt-4 inline-flex min-h-11 items-center underline">{zh ? "SmartSales 與 Salesforce 比較" : "Compare SmartSales and Salesforce"}</Link></section>
    <section className={section}><h2 className={h2}>{c.acceptanceTitle}</h2><ol className="mt-5 list-decimal space-y-3 pl-5 leading-8">{c.acceptance.map(item => <li key={item}>{item}</li>)}</ol></section>
    <section className={section}><h2 className={h2}>{c.faqTitle}</h2><dl className="mt-5">{c.faqs.map(faq => <div key={faq.question} className="border-b border-[#d8cfc2] py-5"><dt className="text-lg font-semibold">{faq.question}</dt><dd className="mt-3 max-w-3xl leading-8">{faq.answer}</dd></div>)}</dl></section>
    <section className={section}><h2 className={h2}>{d.cases}</h2><p className="mt-4 max-w-3xl leading-8">{decision.related}</p>
      <nav className="mt-4 flex flex-wrap gap-6" aria-label={d.cases}>
        <Link className="inline-flex min-h-11 items-center underline" href={`/${locale}/case-studies#zomate-class-membership-whatsapp`}>ZOMATE FITNESS</Link>
        <Link className="inline-flex min-h-11 items-center underline" href={`/${locale}/case-studies`}>{d.cases}</Link>
        <Link className="inline-flex min-h-11 items-center underline" href={`/${locale}/services`}>{d.services}</Link>
      </nav>
    </section>
  </SitePageShell>;
}
