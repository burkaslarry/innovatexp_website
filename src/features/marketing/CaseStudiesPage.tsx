import { CaseComparison } from "@/components/CaseComparison";
import { SitePageShell } from "@/components/SitePageShell";
import type { AppLocale } from "@/lib/i18n-routing";
import type { CaseStudyContent, SpeakingRecord, VisionCopy } from "@/types/marketing";

const PAGE_COPY: Record<AppLocale, {
  title: string; intro: string; vision: string; speakingEyebrow: string;
  speakingTitle: string; speakingIntro: string; referrals: string; cta: string;
}> = {
  en: {
    title: "What we delivered. What supports it.",
    intro: "Three client workflows: training-material production, class and membership operations, and a shop with a kiosk map. Compare the delivered scope with reported outcomes and the limits of the evidence. Unconfirmed results are not turned into metrics.",
    vision: "Founder’s perspective",
    speakingEyebrow: "Public speaking record",
    speakingTitle: "2025 talks, workshops and project showcases",
    speakingIntro: "Seven public GDG Hong Kong, Flutter Study Group, PISM and DevFest records, with roles and topics. A project showcase is distinct from a speaking role; these records are not client outcome evidence.",
    referrals: "Introductions in English and Traditional Chinese",
    cta: "Book a consultation",
  },
  "zh-hk": {
    title: "交付咗啲咩，有咩證據支持。",
    intro: "三個客戶流程：培訓教材製作、課堂同會籍營運，以及網店同販賣機地圖。將交付範圍、已記錄成果同證據限制放埋一齊睇；未確認嘅成效唔會寫成數字。",
    vision: "創辦人嘅想法",
    speakingEyebrow: "公開分享紀錄",
    speakingTitle: "2025 年講座、工作坊與項目展示",
    speakingIntro: "保留 7 個 GDG Hong Kong、Flutter Study Group、PISM 同 DevFest 公開紀錄，列明角色同主題。項目展示唔等於主講；分享紀錄亦唔係客戶成效證據。",
    referrals: "英文及繁體中文介紹句子",
    cta: "預約諮詢",
  },
  "zh-tw": {
    title: "交付了什麼，有什麼證據支持。",
    intro: "三個客戶流程：培訓教材製作、課程與會籍營運，以及網店與販賣機地圖。一起比較交付範圍、已記錄成果及證據限制；未經確認的成效不會寫成數字。",
    vision: "創辦人的想法",
    speakingEyebrow: "公開分享紀錄",
    speakingTitle: "2025 年講座、工作坊與專案展示",
    speakingIntro: "保留 7 個 GDG Hong Kong、Flutter Study Group、PISM 與 DevFest 公開紀錄，列明角色與主題。專案展示不同於主講；分享紀錄也不是客戶成效證據。",
    referrals: "英文及繁體中文介紹句子",
    cta: "預約諮詢",
  },
  ja: {
    title: "提供したものと、その根拠。",
    intro: "研修教材の制作、授業・会員管理、店舗と自動販売機マップという3つの顧客業務を紹介します。提供範囲、報告された成果、根拠の限界を並べて確認できます。未確認の効果を数値にはしません。",
    vision: "創業者の考え",
    speakingEyebrow: "公開の登壇記録",
    speakingTitle: "2025年の講演・ワークショップ・プロジェクト紹介",
    speakingIntro: "GDG Hong Kong、Flutter Study Group、PISM、DevFest の公開記録7件を役割・テーマとともに掲載しています。プロジェクト紹介と登壇は区別し、これらを顧客の成果の証拠とはしません。",
    referrals: "英語と繁体字中国語の紹介文",
    cta: "相談を予約",
  },
  de: {
    title: "Was wir geliefert haben. Was es belegt.",
    intro: "Drei Kundenabläufe: Schulungsmaterial, Kurs- und Mitgliederverwaltung sowie ein Shop mit Automatenkarte. Vergleichen Sie den gelieferten Umfang mit berichteten Ergebnissen und den Grenzen der Belege. Unbestätigte Ergebnisse werden nicht zu Kennzahlen.",
    vision: "Die Sicht des Gründers",
    speakingEyebrow: "Öffentliche Vortragsaufzeichnungen",
    speakingTitle: "Vorträge, Workshops und Projektvorstellungen 2025",
    speakingIntro: "Sieben öffentliche Einträge von GDG Hong Kong, Flutter Study Group, PISM und DevFest mit Rolle und Thema. Eine Projektvorstellung ist kein Hauptvortrag; diese Einträge sind keine Belege für Kundenergebnisse.",
    referrals: "Vorstellungstexte auf Englisch und traditionellem Chinesisch",
    cta: "Beratung buchen",
  },
};

export function CaseStudiesPage({ locale, cases, speaking, vision }: {
  locale: AppLocale;
  cases: CaseStudyContent[];
  speaking: SpeakingRecord[];
  vision: VisionCopy;
}) {
  const copy = PAGE_COPY[locale];

  return (
    <SitePageShell title={copy.title} actionLabel={copy.cta} actionHref={`/${locale}/bookme`}>
      <p className="mb-8 max-w-4xl text-lg leading-relaxed text-[#51483d]" data-geo-answer>{copy.intro}</p>
      <div>
        {cases.map((item) => <CaseComparison key={item.slug} locale={locale} item={item} />)}
      </div>

      <section className="mt-10 border-t border-[#c8bba9] pt-8">
        <p className="text-xs font-semibold tracking-wide text-[#6f5436]">{copy.speakingEyebrow}</p>
        <h2 className="mt-3 text-3xl font-normal">{copy.speakingTitle}</h2>
        <p className="mt-4 max-w-4xl leading-relaxed text-[#51483d]">{copy.speakingIntro}</p>
        <ol className="mt-6 grid gap-x-8 md:grid-cols-2">
          {speaking.map((item) => (
            <li key={`${item.date}-${item.event}-${item.topic}`} className="border-t border-[#d8cfc2] py-5">
              <time dateTime={item.date} className="text-sm font-semibold text-[#6f5436]">{item.date}</time>
              <h3 className="mt-2 text-lg font-semibold">{item.event}</h3>
              <p className="mt-1 text-sm font-semibold text-[#51483d]">{item.role}</p>
              <p className="mt-2 leading-relaxed text-[#51483d]">{item.topic}</p>
            </li>
          ))}
        </ol>
      </section>

      <details className="mt-10 border-y border-[#c8bba9]">
        <summary className="min-h-11 cursor-pointer py-4 text-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6f5436]">{copy.vision}</summary>
        <div className="space-y-4 pb-6 leading-relaxed text-[#51483d]">
          <p>{vision.statement}</p>
          <p>{vision.reason}</p>
          <p>{vision.helps}</p>
          <ul className="list-disc space-y-2 pl-5">{vision.outcomes.map((item) => <li key={item}>{item}</li>)}</ul>
          <h2 className="pt-4 text-lg font-semibold text-[#251f19]">{copy.referrals}</h2>
          <p lang="en">{vision.referralEnglish}</p>
          <p lang="zh-Hant">{vision.referralTraditionalChinese}</p>
        </div>
      </details>
    </SitePageShell>
  );
}
