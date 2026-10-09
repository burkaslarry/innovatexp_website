import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialCta, EditorialSection, ServiceEditorial } from "@/components/editorial/ServiceEditorial";
import { localeAlternates } from "@/lib/alternate-metadata";
import { isValidLocale, type AppLocale } from "@/lib/i18n-routing";
import { getFAQPageSchema } from "@/lib/schema";
import { getSiteUrl } from "@/lib/site-url";

const PATH = "/ai-training-materials";

const SEO: Record<AppLocale, { title: string; description: string }> = {
  "zh-hk": {
    title: "培訓教材AI製作｜培訓中心與社福｜InnovateXP",
    description: "為培訓中心、社福機構同企業培訓部製作教材草稿。半日工作坊加 4 週落地。Agilizing：10 日縮至 3 小時。",
  },
  "zh-tw": {
    title: "培訓教材AI製作｜培訓中心與社福｜InnovateXP",
    description: "為培訓中心、社福機構與企業培訓部製作教材草稿。半日工作坊加 4 週落地。Agilizing：10 日縮至 3 小時。",
  },
  en: {
    title: "AI Training Materials for Centres | InnovateXP",
    description: "Draft training materials for centres, social services, and corporate L&D. A workshop plus four weeks. Agilizing: 10 days to 3 hours.",
  },
  ja: {
    title: "研修教材のAI制作｜香港｜InnovateXP",
    description: "研修センター、福祉、企業研修向けに教材の下書きを作ります。ワークショップと4週。Agilizingは10日から3時間。",
  },
  de: {
    title: "KI-Schulungsmaterial für Zentren | InnovateXP",
    description: "Entwürfe für Schulungszentren, soziale Träger und Firmenakademien. Workshop plus vier Wochen. Agilizing: 10 Tage auf 3 Stunden.",
  },
};

type Copy = {
  h1: string;
  answer: string;
  groups: { title: string; points: string[] }[];
  weeksTitle: string;
  weeks: string[];
  caseTitle: string;
  caseBody: string;
  note: string;
  faqs: { question: string; answer: string }[];
  cta: string;
};

const COPY: Record<AppLocale, Copy> = {
  "zh-hk": {
    h1: "培訓教材 AI 製作",
    answer: "InnovateXP 幫培訓中心、社福機構同企業培訓部，用生成式 AI 應用實務出教材草稿。講師仍然改事實。Agilizing 由 10 日縮至 3 小時。",
    groups: [
      { title: "培訓中心得到咩？", points: ["一套課嘅大綱同投影片草稿更快出。", "講稿同練習用同一個事實來源。", "講師留低改例子同語氣嘅時間。", "新課題可以先試一課，而唔係一次過換晒教材庫。"] },
      { title: "社福機構得到咩？", points: ["活動通知同簡介有可覆用草稿。", "個案摘要先遮敏感欄，先至入工具。", "前線同事用低門檻 AI 方案，唔使新系統。", "對外發送仍然由人確認。"] },
      { title: "企業培訓部得到咩？", points: ["內訓由一份真實流程做教材，而唔係通用示範。", "AI 專案實戰工作坊半日教學、半日做真專案。", "輕量化係範圍窄，方便四週內見對比。", "AI+行業升級係把做法嵌進你而家交貨嘅方式。"] },
    ],
    weeksTitle: "四週點交？",
    weeks: ["第 1 週：揀一套要出嘅教材，收齊現有大綱同禁止貼上嘅資料。", "第 2 週：AI 培訓加工作坊，出第一版草稿。", "第 3 週：講師改事實，學員或同事試用。", "第 4 週：比較工時同返工，決定第二套使唔使做。"],
    caseTitle: "Agilizing",
    caseBody: "Agilizing Limited 教材製作由 10 日縮到 3 小時，包括投影片同 AI 數字人短片。呢個係業主確認嘅項目結果，唔係其他公司嘅預測。",
    note: "香港生產力促進局推動企業應用 AI，當中有名為「一企業一 AI Coach」的計劃。呢個係機構計劃名稱，只可引用，唔係 InnovateXP 嘅服務名。計劃用字發布前核實。",
    faqs: [
      { question: "係咪取代講師？", answer: "唔係。草稿由 AI 出，事實、例子同語氣由講師改完先用。" },
      { question: "幾多人先開班？", answer: "3–30 人都可以。細團隊更易第二日用到昨日嘅草稿。" },
      { question: "低門檻係咪等於唔使覆核？", answer: "唔係。低門檻 AI 方案係指用現有工具同窄範圍，金額、承諾同對外發送仍然人手確認。" },
      { question: "有冇資助？", answer: "視乎當期計劃，例如 TVP。名稱同資格發布前核實，唔好憑本頁申請。" },
      { question: "同一般 AI 培訓有咩分別？", answer: "一般課教工具。呢頁係一套真教材由 10 日呢類工時縮短。上完要有人第二日改完發送。" },
    ],
    cta: "預約 1 小時業務聽診",
  },
  "zh-tw": {
    h1: "培訓教材 AI 製作",
    answer: "InnovateXP 協助培訓中心、社福機構與企業培訓部，用生成式 AI 應用實務產出教材草稿。講師仍然修改事實。Agilizing 由 10 日縮至 3 小時。",
    groups: [
      { title: "培訓中心得什麼？", points: ["一套課的大綱與投影片草稿更快。", "講稿與練習用同一個事實來源。", "講師留下改例子與語氣的時間。", "新課題先試一課，而不是一次換掉教材庫。"] },
      { title: "社福機構得什麼？", points: ["活動通知與簡介有可覆用草稿。", "個案摘要先遮敏感欄再進工具。", "前線用低門檻方案，不必新系統。", "對外發送仍由人確認。"] },
      { title: "企業培訓部得什麼？", points: ["內訓用一條真實流程做教材。", "工作坊半日教學、半日做真專案。", "輕量化指範圍窄，四週內能比較。", "行業升級是嵌進你現在交貨的方式。"] },
    ],
    weeksTitle: "四週如何交付？",
    weeks: ["第 1 週：選定一套教材，收齊大綱與禁止貼上的資料。", "第 2 週：培訓加工作坊，出第一版草稿。", "第 3 週：講師改事實，同事試用。", "第 4 週：比較工時與返工，再決定第二套。"],
    caseTitle: "Agilizing",
    caseBody: "Agilizing Limited 教材製作由 10 日縮至 3 小時，包括簡報與 AI 數位人短片。業主確認的項目結果，不是其他公司的預測。",
    note: "香港生產力促進局推動企業應用 AI，其中有「一企業一 AI Coach」計劃。這是機構名稱，只可引用，不是 InnovateXP 的服務名。用字發布前核實。",
    faqs: [
      { question: "會取代講師嗎？", answer: "不會。草稿由 AI 出，事實與語氣由講師改完才用。" },
      { question: "多少人開班？", answer: "3–30 人都可以。" },
      { question: "低門檻等於不用覆核嗎？", answer: "不是。對外發送、金額與承諾仍由人確認。" },
      { question: "有資助嗎？", answer: "視當期計劃。發布前核實，不要憑本頁申請。" },
      { question: "和一般 AI 培訓有何不同？", answer: "一般課教工具。這一頁是一套真教材的工時縮短，而且第二天有人改完發送。" },
    ],
    cta: "預約 1 小時業務診斷",
  },
  en: {
    h1: "AI training materials",
    answer: "InnovateXP helps training centres, social-service teams, and corporate learning teams draft materials with practical generative AI. A trainer still corrects the facts. At Agilizing, production fell from 10 days to 3 hours.",
    groups: [
      { title: "Training centres", points: ["Outlines and slide drafts move faster.", "Script and exercises share one fact source.", "Trainers keep time for examples and tone.", "A new topic starts as one module, not a full library replacement."] },
      { title: "Social-service organisations", points: ["Notices and blurbs get a reusable draft.", "Case summaries are masked before they enter a tool.", "Front-line staff use a low-threshold setup, not a new system.", "Anything sent out is still confirmed by a person."] },
      { title: "Corporate learning teams", points: ["Internal courses use one real workflow, not a generic demo.", "An AI workshop is half teaching, half a live project.", "Light means a narrow scope you can compare in four weeks.", "An industry upgrade is a change in how you already deliver."] },
    ],
    weeksTitle: "Four-week delivery",
    weeks: ["Week 1: choose one module and list what must not be pasted.", "Week 2: AI training plus workshop, first draft.", "Week 3: the trainer corrects facts; colleagues try it.", "Week 4: compare hours and rework before a second module."],
    caseTitle: "Agilizing",
    caseBody: "Agilizing Limited cut training-material production from 10 days to 3 hours, confirmed by the client owner. This project result is not a forecast for another team.",
    note: "The Hong Kong Productivity Council promotes enterprise AI use, including a programme named 「一企業一 AI Coach」. That name is theirs. Cite it only. It is not an InnovateXP service. Verify the official wording before you rely on it.",
    faqs: [
      { question: "Does this replace the trainer?", answer: "No. AI drafts. The trainer corrects facts, examples, and tone before anything is used." },
      { question: "How many people?", answer: "Three to thirty. A small team is more likely to use yesterday’s draft tomorrow." },
      { question: "Does low-threshold mean no review?", answer: "No. Amounts, promises, and anything sent outside still need a person." },
      { question: "Is there a grant?", answer: "It depends on the current scheme. Verify before you apply. Do not apply from this page." },
      { question: "How is this different from a generic AI class?", answer: "A class teaches tools. This page is about shortening a real module, with someone editing and sending it the next day." },
    ],
    cta: "Book a 1-hour diagnosis",
  },
  ja: {
    h1: "研修教材のAI制作",
    answer: "InnovateXPは研修センター、福祉、企業研修が、生成AIの実務で教材の下書きを作るのを助けます。事実は講師が直します。Agilizingは10日から3時間です。",
    groups: [
      { title: "研修センター", points: ["アウトラインとスライドの下書きが速い。", "台本と演習が同じ事実源。", "講師は例と口調を直す時間を残す。", "新しい題は1コマから。"] },
      { title: "福祉", points: ["案内文に再利用できる下書き。", "事例要約は機微項目を隠してから。", "現場は新しいシステムではなく低い入口。", "外部送信は人が確認。"] },
      { title: "企業研修", points: ["実在の業務で教材を作る。", "半日は授業、半日は実案件。", "軽いとは4週で比べられる範囲。", "業界の更新は、今の納め方に埋め込むこと。"] },
    ],
    weeksTitle: "4週の渡し方",
    weeks: ["1週目：1教材と、貼ってはいけない資料。", "2週目：研修とワークショップで初稿。", "3週目：講師が事実を直し、試す。", "4週目：時間とやり直しを比べ、次を決める。"],
    caseTitle: "Agilizing",
    caseBody: "Agilizing Limitedの教材制作は10日から3時間へ短縮。顧客オーナーが確認した案件結果であり、他社への予測ではありません。",
    note: "香港生産力促進局は企業のAI活用を推進し、「一企業一 AI Coach」という計画名があります。これは機関の名称です。引用のみ。InnovateXPのサービス名ではありません。公式文言は依拠前に確認してください。",
    faqs: [
      { question: "講師の代わりですか？", answer: "いいえ。下書きはAI、事実と口調は講師が直してから使います。" },
      { question: "何人から？", answer: "3〜30人です。" },
      { question: "低い入口は確認不要ですか？", answer: "いいえ。外部送信は人が確認します。" },
      { question: "助成は？", answer: "当期の制度によります。このページから申請しないでください。" },
      { question: "一般的なAI研修との違いは？", answer: "研修は道具を教えます。このページは本物の教材の時間短縮で、翌日に直して送ります。" },
    ],
    cta: "1時間の診断を予約",
  },
  de: {
    h1: "KI-Schulungsmaterial",
    answer: "InnovateXP hilft Schulungszentren, sozialen Trägern und Firmenakademien, Materialentwürfe mit praktischer generativer KI zu erstellen. Eine Lehrperson korrigiert die Fakten. Bei Agilizing: 10 Tage auf 3 Stunden.",
    groups: [
      { title: "Schulungszentren", points: ["Gliederung und Folienentwurf schneller.", "Skript und Übung aus einer Faktenquelle.", "Zeit für Beispiele und Ton bleibt.", "Ein neues Thema beginnt als ein Modul."] },
      { title: "Soziale Träger", points: ["Hinweise mit wiederverwendbarem Entwurf.", "Fallzusammenfassungen erst nach Maskierung.", "Niedrige Schwelle, kein neues System.", "Versand bestätigt ein Mensch."] },
      { title: "Firmenakademien", points: ["Interne Kurse aus einem echten Ablauf.", "Halb Lehre, halb echtes Projekt.", "Leicht heißt ein Umfang, den man in vier Wochen vergleicht.", "Branchenupgrade heißt: in die heutige Lieferung einbetten."] },
    ],
    weeksTitle: "Lieferung in vier Wochen",
    weeks: ["Woche 1: ein Modul und was nicht eingefügt werden darf.", "Woche 2: Schulung plus Workshop, erster Entwurf.", "Woche 3: Faktenkorrektur und Probe.", "Woche 4: Stunden und Nacharbeit, dann das zweite Modul."],
    caseTitle: "Agilizing",
    caseBody: "Agilizing Limited verkürzte die Produktion von Schulungsmaterial von 10 Tagen auf 3 Stunden, bestätigt vom Kundeninhaber. Kein Versprechen für andere Projekte.",
    note: "Der Hong Kong Productivity Council fördert KI in Unternehmen, einschließlich eines Programms namens 「一企業一 AI Coach」. Das ist dessen Name. Nur zitieren. Kein InnovateXP-Dienst. Offiziellen Wortlaut prüfen.",
    faqs: [
      { question: "Ersetzt das die Lehrperson?", answer: "Nein. KI entwirft. Fakten, Beispiele und Ton korrigiert die Lehrperson." },
      { question: "Wie viele Personen?", answer: "Drei bis dreißig." },
      { question: "Heißt niedrige Schwelle ohne Prüfung?", answer: "Nein. Versand bestätigt ein Mensch." },
      { question: "Gibt es eine Förderung?", answer: "Je nach aktuellem Programm. Nicht anhand dieser Seite beantragen." },
      { question: "Unterschied zu einem allgemeinen KI-Kurs?", answer: "Ein Kurs lehrt Werkzeuge. Diese Seite verkürzt ein echtes Modul, das am nächsten Tag korrigiert und gesendet wird." },
    ],
    cta: "Einstündige Diagnose buchen",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const seo = SEO[locale];
  const alternates = localeAlternates(locale, PATH);
  return {
    title: seo.title,
    description: seo.description,
    alternates,
    openGraph: { title: seo.title, description: seo.description, siteName: "InnovateXP Limited" },
  };
}

export default async function AiTrainingMaterialsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const loc = locale as AppLocale;
  const copy = COPY[loc];
  const pageUrl = `${getSiteUrl()}/${locale}${PATH}`;
  const jsonLd = getFAQPageSchema({ url: pageUrl, questions: copy.faqs });

  return (
    <ServiceEditorial eyebrow="InnovateXP" title={copy.h1} answer={copy.answer}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="grid gap-4 md:grid-cols-3">
        {copy.groups.map((group) => (
          <section key={group.title} className="ixp-card p-6">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl tracking-tight">{group.title}</h2>
            <ul className="mt-4 space-y-3 leading-7 text-[color:var(--text-secondary)]">
              {group.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <EditorialSection title={copy.weeksTitle}>
        <ol className="grid gap-4 md:grid-cols-2">
          {copy.weeks.map((week, index) => (
            <li key={week} className="surface-section px-5 py-4 leading-7">
              <span className="mr-3 text-[0.72rem] font-semibold tracking-[0.18em] text-[color:var(--pain-accent)]">0{index + 1}</span>
              {week}
            </li>
          ))}
        </ol>
      </EditorialSection>
      <EditorialSection title={copy.caseTitle}>
        <p className="max-w-3xl text-lg leading-8">{copy.caseBody}</p>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[color:var(--text-tertiary)]">{copy.note}</p>
      </EditorialSection>
      <EditorialSection title="FAQ">
        <dl className="divide-y divide-[color:var(--border-light)] border-y border-[color:var(--border-light)]">
          {copy.faqs.map((faq) => (
            <div key={faq.question} className="py-6">
              <dt className="text-xl font-semibold">{faq.question}</dt>
              <dd className="mt-2 max-w-3xl leading-7 text-[color:var(--text-secondary)]">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </EditorialSection>
      <EditorialCta href={`/${locale}/bookme`} title={copy.cta} label={copy.cta} />
    </ServiceEditorial>
  );
}
