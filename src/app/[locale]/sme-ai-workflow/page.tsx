import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialCta, EditorialSection, ServiceEditorial } from "@/components/editorial/ServiceEditorial";
import { smeAutomationSeo } from "@/content/page-seo";
import { localeAlternates } from "@/lib/alternate-metadata";
import { isValidLocale, type AppLocale } from "@/lib/i18n-routing";
import { getFAQPageSchema, getOrganizationSchema } from "@/lib/schema";
import { getSiteUrl } from "@/lib/site-url";

const PATH = "/sme-ai-workflow";

type Copy = {
  h1: string;
  answer: string;
  stepsTitle: string;
  steps: string[];
  faqs: { question: string; answer: string }[];
  cta: string;
};

const COPY: Record<AppLocale, Copy> = {
  "zh-hk": {
    h1: "香港中小企 AI 自動化",
    answer: "香港中小企 AI 自動化嘅低成本第一步，係揀一條重複流程，先診斷、再建立、再上線。善敏教材由 10 日縮至 3 小時，時間縮短。",
    stepsTitle: "30 日：先診斷、再建立、再上線",
    steps: ["第一週畫出現況同負責人。", "第二週揀一個改動同覆核位。", "第三週用真實單試。", "第四週比較時間同漏單，先決定擴唔擴。"],
    faqs: [
      { question: "冇 IT 同事做唔做到？", answer: "做到。第一步多用現有 WhatsApp、試算表同表單，重要欄位仍然人手確認。" },
      { question: "低成本第一步係咩價？", answer: "Snapshot 業務聽診 HK$3,880。10 人或以下 Discovery Sprint HK$6,880 起。未試點之前唔簽年度大系統。" },
      { question: "數碼轉型係咪一定要換晒系統？", answer: "唔係。中小企 AI 可以由一條線開始。見到對比先至第二條。" },
      { question: "Agilizing 可唔可以當承諾？", answer: "10 日縮至 3 小時 係該中心業主確認結果，唔係你嘅預測。" },
      { question: "點樣先唔會買咗冇人用？", answer: "上線前寫低邊個每日打開、邊個改錯、邊個先可以發送。少一行就容易停喺創辦人部機。" },
    ],
    cta: "預約 1 小時業務聽診",
  },
  "zh-tw": {
    h1: "香港中小企 AI 自動化",
    answer: "香港中小企業 AI 自動化的低成本第一步，是選一條重複流程，先診斷、再建立、再上線。善敏教材由 10 日縮至 3 小時，時間縮短。",
    stepsTitle: "30 日：先診斷、再建立、再上線",
    steps: ["第一週畫出現況與負責人。", "第二週選一個改動與覆核位。", "第三週用真實單據試。", "第四週比較時間與漏單，再決定是否擴展。"],
    faqs: [
      { question: "沒有 IT 同事做得到嗎？", answer: "做得到。第一步多用現有 WhatsApp、試算表與表單，重要欄位仍由人確認。" },
      { question: "低成本第一步是什麼價格？", answer: "Snapshot HK$3,880。10 人以下 Discovery Sprint HK$6,880 起。未試點前不簽年度大系統。" },
      { question: "數碼轉型一定要換掉全部系統嗎？", answer: "不是。中小企 AI 可以由一條線開始。" },
      { question: "Agilizing 可以當成承諾嗎？", answer: "10 日縮至 3 小時 是該中心業主確認的結果，不是您的預測。" },
      { question: "如何避免買了沒人用？", answer: "上線前寫下誰每天打開、誰改正、誰可以發送。" },
    ],
    cta: "預約 1 小時業務診斷",
  },
  en: {
    h1: "AI-powered business process automation for Hong Kong SMEs",
    answer: "Hong Kong SMEs start AI-powered business process automation on one repeated workflow. We diagnose it, build a working version, and launch within 30 days. At Agilizing, training materials fell from 10 days to 3 hours. AI integration waits until someone will actually use it.",
    stepsTitle: "Thirty days: diagnose, build, launch",
    steps: ["Week one draws the path and the owner.", "Week two picks one change and a review point.", "Week three uses real cases.", "Week four compares time and dropped items before a second workflow."],
    faqs: [
      { question: "Can we start without an IT colleague?", answer: "Yes. The first step usually adds a draft or sort to WhatsApp, a spreadsheet, and a form. People still confirm important fields." },
      { question: "What does the low-cost first step cost?", answer: "Snapshot is HK$3,880. Discovery Sprint starts at HK$6,880 for up to 10 people. A large annual system waits until the pilot." },
      { question: "Is this an AI training or an AI workshop?", answer: "The workflow page is the build. AI training and an AI workshop sit beside it when the team needs practice on the same task." },
      { question: "Is the Agilizing figure a promise?", answer: "Ten days to three hours is verified for that centre. It is not your forecast." },
      { question: "How do we avoid shelfware?", answer: "Before launch, name who opens it daily, who corrects errors, and who may send. A Free Process Assessment conversation can decide whether the paid Snapshot is useful." },
    ],
    cta: "Book a 1-hour diagnosis",
  },
  ja: {
    h1: "香港SME向けAI業務プロセス自動化",
    answer: "香港の中小企業は、繰り返す業務を1つ診断し、動く形を作り、30日以内に公開します。Agilizingの教材は10日から3時間、月あたり少なくともHK$50,000の削減です。",
    stepsTitle: "30日：診断し、作り、公開する",
    steps: ["1週目は経路と担当。", "2週目は一つの変更と確認点。", "3週目は実例。", "4週目に時間と漏れを比べ、次を決める。"],
    faqs: [
      { question: "IT担当がいなくてもできますか？", answer: "できます。最初は今の道具に下書きか分類を足し、重要項目は人が確認します。" },
      { question: "最初の費用は？", answer: "SnapshotはHK$3,880。10人以下のDiscovery SprintはHK$6,880から。" },
      { question: "全システムを替える必要がありますか？", answer: "ありません。一本で前後が見えてから次です。" },
      { question: "Agilizingの数字は約束ですか？", answer: "そのセンターで確認済みであり、御社の予測ではありません。" },
      { question: "買って使われないのを避けるには？", answer: "誰が毎日開き、誰が直し、誰が送信できるかを先に書きます。" },
    ],
    cta: "1時間の診断を予約",
  },
  de: {
    h1: "KI-gestützte Prozessautomatisierung für Hongkonger KMU",
    answer: "Hongkonger KMU starten mit einem wiederholten Ablauf. Wir diagnostizieren, bauen eine nutzbare Fassung und starten innerhalb von 30 Tagen. Bei Agilizing: 10 Tage auf 3 Stunden,.",
    stepsTitle: "30 Tage: diagnostizieren, bauen, starten",
    steps: ["Woche eins: Weg und Verantwortlicher.", "Woche zwei: eine Änderung und ein Prüfpunkt.", "Woche drei: echte Fälle.", "Woche vier: Zeit und Verluste vergleichen."],
    faqs: [
      { question: "Ohne IT-Kollegen?", answer: "Ja. Entwurf oder Sortierung zu vorhandenen Werkzeugen. Wichtige Felder prüft ein Mensch." },
      { question: "Was kostet der erste Schritt?", answer: "Snapshot HK$3.880. Discovery Sprint ab HK$6.880 für bis zu 10 Personen." },
      { question: "Müssen wir alle Systeme tauschen?", answer: "Nein. Eine Linie, dann die nächste nach einem Vergleich." },
      { question: "Ist die Agilizing-Zahl ein Versprechen?", answer: "Belegt für dieses Zentrum, nicht Ihre Prognose." },
      { question: "Wie vermeiden wir ungenutzte Software?", answer: "Vor dem Start benennen: wer öffnet, wer korrigiert, wer senden darf." },
    ],
    cta: "Einstündige Diagnose buchen",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const seo = smeAutomationSeo(locale);
  const alternates = localeAlternates(locale, PATH);
  return {
    title: seo.title,
    description: seo.description,
    alternates,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: typeof alternates?.canonical === "string" ? alternates.canonical : `${getSiteUrl()}/${locale}${PATH}`,
      siteName: "InnovateXP Limited",
    },
  };
}

export default async function SmeAiWorkflowPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const loc = locale as AppLocale;
  const copy = COPY[loc];
  const pageUrl = `${getSiteUrl()}/${locale}${PATH}`;
  const service = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "InnovateXP Limited",
    url: pageUrl,
    description: copy.answer,
    areaServed: "Hong Kong",
    provider: { "@id": `${getSiteUrl()}/#organization` },
  };
  const jsonLd = [getOrganizationSchema(), service, getFAQPageSchema({ url: pageUrl, questions: copy.faqs })];

  return (
    <ServiceEditorial eyebrow="InnovateXP" title={copy.h1} answer={copy.answer}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <EditorialSection title={copy.stepsTitle}>
        <ol className="grid gap-4 md:grid-cols-2">
          {copy.steps.map((step, index) => (
            <li key={step} className="ixp-card p-6">
              <p className="text-[0.72rem] font-semibold tracking-[0.2em] text-[color:var(--pain-accent)]">0{index + 1}</p>
              <p className="mt-3 text-lg leading-8">{step}</p>
            </li>
          ))}
        </ol>
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
