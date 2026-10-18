import Link from "next/link";
import type { AppLocale } from "@/lib/i18n-routing";
import type { CaseStudyContent, SpeakingRecord, VisionCopy } from "@/types/marketing";

const PAGE_COPY: Record<
  AppLocale,
  {
    home: string;
    crumb: string;
    eyebrow: string;
    title: string;
    intro: string;
    vision: string;
    targetAudience: string;
    challenge: string;
    approach: string;
    deliverables: string;
    outcomes: string;
    evidence: string;
    speakingEyebrow: string;
    speakingTitle: string;
    speakingIntro: string;
    referrals: string;
    cta: string;
  }
> = {
  en: {
    home: "Home",
    crumb: "Delivery Capability",
    eyebrow: "Relevant experience and delivery capability",
    title: "Relevant Experience & Delivery Capability",
    intro:
      "Three cases from the introduction deck. Agilizing's owner confirmed training-material production fell from 10 days to 3 hours. ZOmate and Flower Nice Day state what was delivered, and they do not add a result the client has not confirmed.",
    vision: "Founder Vision",
    targetAudience: "Target audience",
    challenge: "Challenge",
    approach: "Approach",
    deliverables: "Deliverables",
    outcomes: "Outcomes",
    evidence: "Evidence and public sources",
    speakingEyebrow: "Public speaking record",
    speakingTitle: "Verified 2025 talks, workshops, and project showcases",
    speakingIntro:
      "Seven public GDG Hong Kong, Flutter Study Group, PISM, and DevFest records are listed with the exact role and topic. A project showcase is labelled separately from a speaking role.",
    referrals: "Referral Sentences",
    cta: "Book a consultation",
  },
  "zh-hk": {
    home: "首頁",
    crumb: "相關經驗與交付能力",
    eyebrow: "相關經驗與交付能力",
    title: "Agilizing：教材由 10 日變成 3 小時",
    intro:
      "同簡報一樣三個案例：Agilizing 教材由 10 日縮到 3 小時（業主確認）、ZOmate 課堂會籍同 WhatsApp 提醒、Flower Nice Day 網店同販賣機地圖。未確認嘅成效唔會寫成數字。",
    vision: "創辦人 Vision",
    targetAudience: "適合對象",
    challenge: "挑戰",
    approach: "做法",
    deliverables: "交付內容",
    outcomes: "成果方向",
    evidence: "Social proof 與公開來源",
    speakingEyebrow: "公開分享紀錄",
    speakingTitle: "2025 年已核實講座、workshop 與項目展示",
    speakingIntro: "按日期列出 7 個 GDG Hong Kong、Flutter Study Group、PISM 同 DevFest 公開紀錄，並清楚分開講者、主持及項目展示角色。",
    referrals: "Referral 句子",
    cta: "預約諮詢",
  },
  "zh-tw": {
    home: "首頁",
    crumb: "相關經驗與交付能力",
    eyebrow: "相關經驗與交付能力",
    title: "Agilizing：教材由 10 天變成 3 小時",
    intro:
      "與簡報相同的三個案例：Agilizing 教材由 10 天縮到 3 小時（業主確認）、ZOmate 課堂會籍與 WhatsApp 提醒、Flower Nice Day 網店與販賣機地圖。未經確認的成效不會寫成數字。",
    vision: "創辦人 Vision",
    targetAudience: "適合對象",
    challenge: "挑戰",
    approach: "做法",
    deliverables: "交付內容",
    outcomes: "成果方向",
    evidence: "Social proof 與公開來源",
    speakingEyebrow: "公開分享紀錄",
    speakingTitle: "2025 年已核實講座、workshop 與項目展示",
    speakingIntro: "按日期列出 7 個 GDG Hong Kong、Flutter Study Group、PISM 同 DevFest 公開紀錄，並清楚分開講者、主持及項目展示角色。",
    referrals: "Referral 句子",
    cta: "預約諮詢",
  },
  ja: {
    home: "ホーム",
    crumb: "ケーススタディ",
    eyebrow: "プロジェクト事例と proof points",
    title: "Agilizing：教材が10日から3時間に",
    intro:
      "Agilizing Limited のオーナー確認：教材制作を10日から3時間に短縮しました。ほかの2件は ZOmate の授業・会員・WhatsApp 通知と、Flower Nice Day の店舗と自動販売機マップです。未確認の効果は数字にしません。",
    vision: "創業者の Vision",
    targetAudience: "対象",
    challenge: "課題",
    approach: "アプローチ",
    deliverables: "提供内容",
    outcomes: "成果の方向性",
    evidence: "公開情報と根拠",
    speakingEyebrow: "登壇実績",
    speakingTitle: "2025年の講演・ワークショップ・プロジェクト紹介",
    speakingIntro: "役割とテーマを明記した公開記録です。",
    referrals: "紹介文",
    cta: "相談を予約",
  },
  de: {
    home: "Start",
    crumb: "Fallstudien",
    eyebrow: "Projektbeispiele und Proof Points",
    title: "Agilizing: Kursmaterial von 10 Tagen auf 3 Stunden",
    intro:
      "Drei Fälle wie in der Einführung: Agilizing (10 Tage auf 3 Stunden, vom Inhaber bestätigt), ZOmate (Kurse, Mitgliedschaft, WhatsApp) und Flower Nice Day (Shop und Automatenkarte). Unbestätigte Ergebnisse werden nicht als Kennzahl geschrieben.",
    vision: "Founder Vision",
    targetAudience: "Zielgruppe",
    challenge: "Herausforderung",
    approach: "Ansatz",
    deliverables: "Leistungen",
    outcomes: "Ergebnisse",
    evidence: "Nachweise und öffentliche Quellen",
    speakingEyebrow: "Öffentliche Vorträge",
    speakingTitle: "Verifizierte Vorträge, Workshops und Projektvorstellungen 2025",
    speakingIntro: "Öffentliche Einträge mit klar benannter Rolle und Thema.",
    referrals: "Referral-Sätze",
    cta: "Beratung buchen",
  },
};

function localizedHref(locale: AppLocale, href: string) {
  if (href.startsWith("http")) return href;
  return `/${locale}${href.startsWith("/") ? href : `/${href}`}`;
}

function CaseList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
        {items.map((item) => (
          <li key={item} className="flex gap-2 leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand-primary dark:bg-teal-300" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CaseStudiesPage({
  locale,
  cases,
  speaking,
  vision,
}: {
  locale: AppLocale;
  cases: CaseStudyContent[];
  speaking: SpeakingRecord[];
  vision: VisionCopy;
}) {
  const copy = PAGE_COPY[locale];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-gray-950 dark:text-white">
      <div className="mx-auto max-w-5xl px-4 py-14 md:py-20">
        <nav className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <Link href={`/${locale}`} className="hover:text-brand-primary dark:hover:text-teal-300">
            {copy.home}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700 dark:text-gray-300">{copy.crumb}</span>
        </nav>

        <section className="mb-10 rounded-3xl border border-brand-primary/20 bg-white p-8 shadow-sm dark:border-teal-400/20 dark:bg-gray-900 md:p-10">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-brand-primary dark:text-[color:var(--primary-hover)]">
            {copy.eyebrow}
          </p>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-950 dark:text-white md:text-5xl">
            {copy.title}
          </h1>
          <p className="max-w-4xl text-lg leading-relaxed text-gray-700 dark:text-gray-300" data-geo-answer>
            {copy.intro}
          </p>
        </section>

        <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">{copy.vision}</h2>
          <div className="space-y-4 leading-relaxed text-gray-700 dark:text-gray-300">
            <p>{vision.statement}</p>
            <p>{vision.reason}</p>
            <p>{vision.helps}</p>
          </div>
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {vision.outcomes.map((item) => (
              <li key={item} className="rounded-xl bg-slate-50 p-4 text-gray-700 dark:bg-gray-900 dark:text-gray-300">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900 md:p-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-primary dark:text-[color:var(--primary-hover)]">
            {copy.speakingEyebrow}
          </p>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{copy.speakingTitle}</h2>
          <p className="mt-3 max-w-4xl leading-relaxed text-gray-600 dark:text-gray-300">{copy.speakingIntro}</p>
          <ol className="mt-6 grid gap-4 md:grid-cols-2">
            {speaking.map((item) => (
              <li
                key={`${item.date}-${item.event}-${item.topic}`}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-700 dark:bg-gray-800"
              >
                <time dateTime={item.date} className="text-sm font-bold text-brand-primary dark:text-teal-300">
                  {item.date}
                </time>
                <h3 className="mt-2 text-lg font-bold text-gray-900 dark:text-white">{item.event}</h3>
                <p className="mt-1 text-sm font-semibold text-slate-600 dark:text-slate-300">{item.role}</p>
                <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">{item.topic}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="space-y-8">
          {cases.map((item) => (
            <article
              key={item.slug}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900 md:p-8"
            >
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-primary dark:text-[color:var(--primary-hover)]">
                {item.proofType.replace(/-/g, " ")}
              </p>
              <h2 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">{item.title}</h2>
              <p className="mb-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">{item.summary}</p>
              <p className="mb-6 leading-relaxed text-gray-600 dark:text-gray-400">{item.context}</p>
              <p className="mb-6 rounded-xl bg-slate-50 p-4 text-sm font-semibold text-slate-700 dark:bg-gray-800 dark:text-slate-200">
                {copy.targetAudience}: {item.audience}
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                <CaseList title={copy.challenge} items={item.challenge} />
                <CaseList title={copy.approach} items={item.approach} />
                <CaseList title={copy.deliverables} items={item.deliverables} />
                <CaseList title={copy.outcomes} items={item.outcomes} />
              </div>

              <section className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-500/30 dark:bg-emerald-950/20">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{copy.evidence}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">{item.proofNote}</p>
                {item.proofLinks.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {item.proofLinks.map((link) => {
                      const external = link.href.startsWith("http");
                      return (
                        <Link
                          key={link.href}
                          href={localizedHref(locale, link.href)}
                          target={external ? "_blank" : undefined}
                          rel={external ? "noopener noreferrer" : undefined}
                          className="rounded-full border border-emerald-300 bg-white px-4 py-2 text-sm font-semibold text-emerald-900 transition-colors hover:border-emerald-600 dark:border-emerald-700 dark:bg-gray-900 dark:text-emerald-200"
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </section>

              <div className="mt-6 flex flex-wrap gap-3">
                {item.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={localizedHref(locale, link.href)}
                    className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-slate-600 dark:text-slate-200 dark:hover:border-teal-300 dark:hover:text-teal-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>

        <section className="mt-10 rounded-3xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-500/30 dark:bg-amber-950/20">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">{copy.referrals}</h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">{vision.referralEnglish}</p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">{vision.referralTraditionalChinese}</p>
          <Link
            href={`/${locale}/bookme`}
            className="mt-6 inline-block btn-brand px-6 py-3 font-semibold shadow-sm transition-colors hover:bg-brand-primary-hover "
          >
            {copy.cta}
          </Link>
        </section>
      </div>
    </main>
  );
}
