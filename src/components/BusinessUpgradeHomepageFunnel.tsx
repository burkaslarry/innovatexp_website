import Image from "next/image";
import { BarChart3, Bot, CheckCircle2, ClipboardCheck, GraduationCap, LayoutDashboard, MessageSquareText, ShieldCheck, Users, Wrench } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AddToInquiryButton } from "@/components/inquiry-cart/AddToInquiryButton";
import { ProductEntryGrid } from "@/components/ProductEntryGrid";
import { FaqAccordion } from "@/components/FaqAccordion";
import { uiStrings } from "@/content/ui-strings";
import { consultancyPlanPrice, PricingFunnelSections } from "@/components/PricingFunnelSections";
import { consultancyCatalogId } from "@/content/inquiry-catalog";
import { formatHkd, PRICING } from "@/content/pricing";
import type { AppLocale } from "@/lib/i18n-routing";

const content = {
  zh: {
    problem: {
      eyebrow: "樽頸",
      title: "AI 未落地，多數係流程未執順，唔係工具不夠。",
      intro: "3–30 人培訓／專業服務團隊，關鍵流程常散落 Excel、WhatsApp、表單同 email。",
      points: [
        "SOP 只喺老闆腦中，一缺人就斷。",
        "報價／跟進／付款各有各版本。",
        "買咗 AI／CRM，團隊仍然照舊做。",
      ],
    },
    paths: {
      eyebrow: "兩條路，唔好混淆",
      title: "主攻陪跑；工具只係入場磚。",
      items: [
        ["主攻", "Discovery Sprint → Premium Accelerator", "高價值陪跑，先驗證一條流程再擴展。"],
        ["入場磚", "EventXP／SmartSales／AccountXP／Website", "低門檻試用引流；唔取代 Sprint。"],
        ["常見場景", "報價→跟進→收款（Proposal-to-Cash）", "同活動轉商機，可用工具輔助，仍以陪跑主線。"],
      ],
    },
    method: {
      eyebrow: "方法",
      title: "問 → 畫 → 試 → 驗",
      intro: "先睇清楚流程，再小步試行；唔一開始叫你重做系統。",
      steps: [
        ["問／畫", "問卷、訪談，畫出 workflow 同樽頸。"],
        ["試", "改善現有做法，驗證一個 AI／automation quick win。"],
        ["驗", "Review checkpoint 決定下一步（Sprint／Accelerator／工具）。"],
      ],
    },
    sprint: {
      eyebrow: "入場主線",
      title: "30 日 Discovery Sprint",
      intro: "付費驗證一條核心流程（報名、報價跟進、收據行政等）。唔承諾一個月全面轉型。",
      deliverablesTitle: "包括",
      exclusionsTitle: "不包括",
      deliverables: [
        "Kickoff + 最多 2 次訪談",
        "1 條 workflow map／SOP draft",
        "KPI baseline + quick-win 建議",
        "Review + 30/60/90 日 roadmap",
      ],
      exclusions: [
        "客製化系統／大型 integration",
        "代替日常營運或合規意見",
        "保證 ROI／第三方訂閱成本",
      ],
      cta: "預約 30 分鐘診斷",
    },
    pricing: {
      eyebrow: "主攻定價",
      title: "Sprint／Accelerator — 先睇投入。",
      intro: "以 1 間公司、3–5 位核心參與者為基準。客製系統、大班 workshop 另行 scope。",
      plans: [
        {
          name: "30 日 Discovery Sprint",
          price: "HK$6,800",
          fit: "先試一條 workflow。",
          points: ["Kickoff + 訪談", "Workflow map", "SOP／KPI", "30/60/90 roadmap"],
        },
        {
          name: "3 個月 Foundation",
          price: "HK$26,000",
          fit: "改善 1–2 條流程，建立可驗收成果。",
          points: ["SOP v1", "每月 checkpoint", "KPI review", "1 次培訓"],
        },
        {
          name: "6 個月 Accelerator",
          price: "HK$50,000",
          fit: "3–4 條相關流程 + adoption tracking。",
          points: ["Agile reviews", "SOP v2", "Adoption review", "最多 2 次 workshop"],
          featured: true,
        },
        {
          name: "12 個月 Partnership",
          price: "HK$98,000",
          fit: "長期 AI adoption governance。",
          points: ["年度 roadmap", "跨部門優先序", "SOP governance", "管理層 reviews"],
        },
      ],
      note: "唔係軟件套餐。加人／加場次另行報價。",
      cta: "預約 30 分鐘診斷",
    },
    programs: {
      eyebrow: "加速計劃",
      title: "陪跑主線 → 系統按需要落地",
      intro: "Automation／CRM／SaaS 只會喺 workflow 驗證後另行 scope。",
      cards: [
        {
          name: "3 個月 | Foundation",
          body: "診斷到第一個可驗收改善。",
          points: ["1–2 個 workflow", "SOP v1", "每月 checkpoint", "1 次培訓"],
        },
        {
          name: "6 個月 | Accelerator",
          body: "擴展至部門級流程同採用習慣。",
          points: ["Agile reviews", "SOP v2", "Adoption review", "最多 2 次 workshop"],
          featured: true,
        },
        {
          name: "12 個月 | Partnership",
          body: "長期 AI adoption 管理能力。",
          points: ["年度 roadmap", "跨部門優先序", "SOP governance", "最多 4 次 workshop"],
        },
      ],
    },
    useCases: {
      eyebrow: "示範場景",
      title: "先驗證一條流程，再決定要唔要系統。",
      cards: [
        {
          title: "課程報名／跟進",
          before: "資料散落 WhatsApp、表單、Excel。",
          after: "SOP + KPI + 一個可試嘅 quick win。",
        },
        {
          title: "報價→跟進→收款",
          before: "跟進方法不一，報價版本混亂。",
          after: "定義 enquiry、quotation SLA 同責任。",
        },
        {
          title: "收據／會計行政",
          before: "人手追單、重複輸入。",
          after: "先理資料流同 KPI，再考慮 automation。",
        },
      ],
    },
    proof: {
      eyebrow: "經驗",
      title: "Hands-on 交付，唔止講。",
      columns: [
        {
          title: "背景",
          points: ["13+ 年 IT／product／Agile", "前 GDG Hong Kong organizer"],
        },
        {
          title: "已交付",
          points: ["Check-in／出席 workflow", "Booking／CRM／dashboard"],
        },
        {
          title: "方式",
          points: ["廣東話／英文", "歡迎適合客參加 Discovery Sprint"],
        },
      ],
    },
    founder: {
      eyebrow: "創辦人",
      title: "AI 商業顧問 · Hands-on Architect",
      body: "先執流程、定 KPI、試最值得做嘅改善；確認需要先建議工具或系統。",
      support: "B2B consultant + technical partner：睇清工作方式，再決定 AI／automation／CRM 值唔值得落地。",
    },
    faq: {
      title: "FAQ",
      items: [
        ["係咪一開始賣 software？", "唔係。主線係陪跑／顧問；工具係入場磚。系統只會喺 business case 清晰後另行 scope。"],
        ["小團隊適合嗎？", "適合 3–30 人，尤其一人缺就斷嘅團隊——先執一條核心流程。"],
        ["要換現有系統嗎？", "未必。多數先改善現有工具用法。"],
        ["Sprint 之後？", "可升 Foundation／Accelerator，或按需要加 EventXP／SmartSales／AccountXP 試用。"],
      ],
    },
    finalCta: {
      title: "唔使填長問卷。揀一條流程傾清楚。",
      body: "已知卡點 → 約 30 分鐘診斷；想一次過問多項 → 加入查詢購物車提交。",
      health: "睇 Sprint／Accelerator 定價",
      book: "預約 30 分鐘診斷",
    },
    whyUs: {
      eyebrow: "點解 InnovateXP",
      title: "守住高價值陪跑；工具只開門。",
      intro: "AI 商務顧問：主攻 Sprint／Accelerator；Quick Cash 工具係引流入場磚。",
      points: [
        ["主攻 Premium", "Discovery Sprint → Accelerator；高價值陪跑先。"],
        ["入場磚", "EventXP／SmartSales／AccountXP／Website — 先試，唔取代陪跑。"],
        ["Hands-on", "13+ 年 PM／Agile；一齊做到跑得起。"],
        ["流程先於工具", "驗證 workflow 先落地系統。"],
      ],
    },
    capabilities: {
      eyebrow: "入場磚一覽",
      title: "按需落地，唔係首頁主角",
      intro: "先確認 workflow 同 business case，再決定要唔要系統。",
      items: [
        {
          name: "EventXP",
          body: "簽到、評分、follow-up — 試用 HKD 4,000／場。",
          href: "/eventxp",
        },
        {
          name: "SmartSales CRM",
          body: "WhatsApp 銷售 workflow — 試用 HKD 5,000。",
          href: "/smartsales-crm",
        },
        {
          name: "AccountXP",
          body: `體驗方案 ${formatHkd(PRICING.quickCash.accountXpExperience, "zh-hk")}；其後月費 880／1,280／1,480。`,
          href: "#accounting-tools-demo",
        },
        {
          name: "Website Starter",
          body: `Base Package ${formatHkd(PRICING.quickCash.websiteStarter, "zh-hk")}（10 工作日）。`,
          href: "/pitch-decks",
        },
      ],
    },
  },
  en: {
    problem: {
      eyebrow: "Bottleneck",
      title: "AI usually fails because the workflow is unclear — not because a tool is missing.",
      intro: "For 3–30 person training and professional-service teams, critical work often sits across Excel, WhatsApp, forms, and email.",
      points: [
        "SOP lives only in the owner’s head — one absence breaks the chain.",
        "Quotes, follow-up, and payments have competing versions of truth.",
        "AI / CRM was purchased, but the team still works the old way.",
      ],
    },
    paths: {
      eyebrow: "Two paths — don’t mix them",
      title: "Advisory is the core; tools are entry bricks.",
      items: [
        ["Core", "Discovery Sprint → Premium Accelerator", "High-value coaching: validate one workflow, then expand."],
        ["Entry bricks", "EventXP / SmartSales / AccountXP / Website", "Low-friction trials to open the door — not a Sprint substitute."],
        ["Common scene", "Quote → follow-up → cash (Proposal-to-Cash)", "Tools can assist; the main line stays paid advisory."],
      ],
    },
    method: {
      eyebrow: "Method",
      title: "Ask → Map → Trial → Review",
      intro: "Clarify the workflow first; trial in small steps. We don’t start by rebuilding your stack.",
      steps: [
        ["Ask / Map", "Questionnaire and interviews; map workflow and bottlenecks."],
        ["Trial", "Improve current practice; validate one AI / automation quick win."],
        ["Review", "Checkpoint decides Sprint / Accelerator / tool next steps."],
      ],
    },
    sprint: {
      eyebrow: "Primary entry",
      title: "30-day Discovery Sprint",
      intro: "Paid validation of one core workflow (enrolment, quote follow-up, receipts, etc.). Not a full transformation in 30 days.",
      deliverablesTitle: "Includes",
      exclusionsTitle: "Excludes",
      deliverables: [
        "Kickoff + up to two interviews",
        "One workflow map / SOP draft",
        "KPI baseline + quick-win guide",
        "Review + 30/60/90-day roadmap",
      ],
      exclusions: [
        "Custom systems / large integrations",
        "Day-to-day ops or compliance advice",
        "Guaranteed ROI / third-party subscription costs",
      ],
      cta: "Book a 30-minute review",
    },
    pricing: {
      eyebrow: "Core pricing",
      title: "Sprint / Accelerator — see the investment first.",
      intro: "Priced for one company and 3–5 core participants. Custom systems and large workshops are scoped separately.",
      plans: [
        {
          name: "30-day Discovery Sprint",
          price: "HK$6,800",
          fit: "Validate one workflow.",
          points: ["Kickoff + interviews", "Workflow map", "SOP / KPI", "30/60/90 roadmap"],
        },
        {
          name: "3-month Foundation",
          price: "HK$26,000",
          fit: "Improve 1–2 workflows; first reviewable result.",
          points: ["SOP v1", "Monthly checkpoint", "KPI review", "One training"],
        },
        {
          name: "6-month Accelerator",
          price: "HK$50,000",
          fit: "3–4 related workflows + adoption tracking.",
          points: ["Agile reviews", "SOP v2", "Adoption review", "Up to two workshops"],
          featured: true,
        },
        {
          name: "12-month Partnership",
          price: "HK$98,000",
          fit: "Long-term AI adoption governance.",
          points: ["Annual roadmap", "Cross-team priorities", "SOP governance", "Leadership reviews"],
        },
      ],
      note: "Not software packages. Extra people or sessions are scoped separately.",
      cta: "Book a 30-minute review",
    },
    programs: {
      eyebrow: "Accelerator programs",
      title: "Advisory first → systems only when needed",
      intro: "Automation / CRM / SaaS is scoped only after the workflow is validated.",
      cards: [
        { name: "3 months | Foundation", body: "From diagnosis to the first reviewable win.", points: ["1–2 workflows", "SOP v1", "Monthly checkpoint", "One training"] },
        { name: "6 months | Accelerator", body: "Department-scale workflows and adoption habits.", points: ["Agile reviews", "SOP v2", "Adoption review", "Up to two workshops"], featured: true },
        { name: "12 months | Partnership", body: "Long-term AI adoption as a management capability.", points: ["Annual roadmap", "Cross-team priorities", "SOP governance", "Up to four workshops"] },
      ],
    },
    useCases: {
      eyebrow: "Example workflows",
      title: "Validate one workflow before deciding on a system.",
      cards: [
        { title: "Course enrolment / follow-up", before: "Data scattered across WhatsApp, forms, Excel.", after: "SOP + KPI + one trialable quick win." },
        { title: "Quote → follow-up → cash", before: "Inconsistent follow-up; quote versions collide.", after: "Define enquiry, quotation SLA, and ownership." },
        { title: "Receipts / admin", before: "Manual chasing and re-entry.", after: "Clarify data flow and KPIs before automation." },
      ],
    },
    proof: {
      eyebrow: "Experience",
      title: "Hands-on delivery — not slides only.",
      columns: [
        { title: "Background", points: ["13+ years IT / product / Agile", "Former GDG Hong Kong organizer"] },
        { title: "Delivered", points: ["Check-in / attendance workflows", "Booking / CRM / dashboards"] },
        { title: "Style", points: ["Cantonese / English", "Discovery Sprint openings for fit SMEs"] },
      ],
    },
    founder: {
      eyebrow: "Founder",
      title: "AI Business Consultancy · Hands-on Architect",
      body: "Clarify workflow, set KPIs, trial the highest-value fix first — then recommend tools or systems when needed.",
      support: "Practical B2B consultant + technical partner: see how work really happens, then decide if AI / automation / CRM is worth landing.",
    },
    faq: {
      title: "FAQ",
      items: [
        ["Do you sell software first?", "No. The core offer is paid advisory. Tools are entry bricks. Systems are scoped only when the business case is clear."],
        ["Suitable for a small team?", "Yes — especially 3–30 people where one absence breaks the chain. Fix one core workflow first."],
        ["Must we replace our stack?", "Not necessarily. We usually improve how you use what you already have."],
        ["After the Sprint?", "Move to Foundation / Accelerator, or add EventXP / SmartSales / AccountXP trials as needed."],
      ],
    },
    finalCta: {
      title: "No long form on the homepage. Pick one workflow.",
      body: "Know the bottleneck → book a 30-minute review. Want several offers at once → add them to the inquiry cart.",
      health: "See Sprint / Accelerator pricing",
      book: "Book a 30-minute review",
    },
    whyUs: {
      eyebrow: "Why InnovateXP",
      title: "Protect the high-value path; tools only open the door.",
      intro: "AI Business Consultancy: Sprint / Accelerator is the core. Quick Cash tools are lead-in bricks.",
      points: [
        ["Premium first", "Discovery Sprint → Accelerator is the core close."],
        ["Entry bricks", "EventXP / SmartSales / AccountXP / Website — try first, don’t replace advisory."],
        ["Hands-on", "13+ years PM / Agile — we build until it runs."],
        ["Workflow before tools", "Validate the workflow before landing a system."],
      ],
    },
    capabilities: {
      eyebrow: "Entry bricks",
      title: "On-demand systems — not the homepage lead",
      intro: "Confirm workflow and business case before choosing a system.",
      items: [
        {
          name: "EventXP",
          body: "Check-in, scoring, follow-up — trial HKD 4,000 / event.",
          href: "/eventxp",
        },
        {
          name: "SmartSales CRM",
          body: "WhatsApp sales workflow — trial HKD 5,000.",
          href: "/smartsales-crm",
        },
        {
          name: "AccountXP",
          body: `Experience ${formatHkd(PRICING.quickCash.accountXpExperience)}; then HKD 880 / 1,280 / 1,480 / mo.`,
          href: "#accounting-tools-demo",
        },
        {
          name: "Website Starter",
          body: `Base Package ${formatHkd(PRICING.quickCash.websiteStarter)} (10 working days).`,
          href: "/pitch-decks",
        },
      ],
    },
  },
} as const;

const localizedContent = {
  en: content.en,
  "zh-hk": content.zh,
  "zh-tw": {
    ...content.zh,
    problem: {
      ...content.zh.problem,
      eyebrow: "瓶頸",
      title: "AI 難以落地，多數是流程還沒整理清楚。",
      intro: "3–30 人培訓／專業服務團隊，關鍵流程常散落 Excel、WhatsApp、表單與 email。",
    },
    founder: {
      ...content.zh.founder,
      eyebrow: "創辦人",
      body: "先梳理流程、設定 KPI、試行最值得做的改善；確認需要後，再建議工具或系統。",
    },
    finalCta: {
      ...content.zh.finalCta,
      title: "不用填長問卷。先選一條流程談清楚。",
      body: "已知卡點 → 約 30 分鐘診斷；想一次問多項 → 加入查詢購物車提交。",
    },
  },
  ja: {
    ...content.en,
    problem: {
      eyebrow: "ボトルネック",
      title: "AIが定着しない理由は、ツール不足ではなくワークフローの曖昧さであることが多いです。",
      intro: "3〜30名の研修／専門サービスチームでは、重要な業務が Excel、WhatsApp、フォーム、email に散らばりがちです。",
      points: [
        "SOPがオーナーの頭の中にしかない。",
        "見積・フォロー・支払いの情報が食い違う。",
        "AI／CRMを導入しても、現場は旧来のやり方のまま。",
      ],
    },
    paths: {
      eyebrow: "二つの道を混ぜない",
      title: "伴走が本線。ツールは入口だけ。",
      items: [
        ["本線", "Discovery Sprint → Premium Accelerator", "高付加価値の伴走で、まず1つのworkflowを検証。"],
        ["入口", "EventXP／SmartSales／AccountXP／Website", "低摩擦のトライアル。Sprintの代わりにはならない。"],
        ["よくある場面", "見積→フォロー→入金（Proposal-to-Cash）", "ツールは補助。本線は有料伴走。"],
      ],
    },
    pricing: {
      ...content.en.pricing,
      eyebrow: "本線の料金",
      title: "Sprint／Accelerator — まず投資感を確認。",
      cta: "30分レビューを予約",
    },
    sprint: {
      ...content.en.sprint,
      eyebrow: "本線の入口",
      title: "30日 Discovery Sprint",
      cta: "30分レビューを予約",
    },
    whyUs: {
      ...content.en.whyUs,
      eyebrow: "なぜ InnovateXP",
      title: "高付加価値の伴走を守り、ツールは入口にとどめる。",
    },
    finalCta: {
      ...content.en.finalCta,
      health: "Sprint／Accelerator料金を見る",
      book: "30分レビューを予約",
    },
  },
  de: {
    ...content.en,
    problem: {
      eyebrow: "Engpass",
      title: "AI scheitert oft nicht am Tool, sondern an unklaren Workflows.",
      intro: "Bei Teams mit 3–30 Personen liegen kritische Abläufe oft in Excel, WhatsApp, Formularen und E-Mail.",
      points: [
        "SOP nur im Kopf des Owners — eine Abwesenheit reißt die Kette.",
        "Angebote, Follow-up und Zahlungen haben konkurrierende Wahrheiten.",
        "AI / CRM gekauft — das Team arbeitet trotzdem wie früher.",
      ],
    },
    paths: {
      eyebrow: "Zwei Wege — nicht vermischen",
      title: "Advisory ist Kern; Tools sind Einstiegsbausteine.",
      items: [
        ["Kern", "Discovery Sprint → Premium Accelerator", "Hochwertiges Coaching: einen Workflow validieren, dann erweitern."],
        ["Einstieg", "EventXP / SmartSales / AccountXP / Website", "Niedrigschwellige Trials — kein Ersatz für den Sprint."],
        ["Szene", "Angebot → Follow-up → Cash (Proposal-to-Cash)", "Tools können helfen; die Hauptlinie bleibt bezahltes Advisory."],
      ],
    },
    pricing: {
      ...content.en.pricing,
      eyebrow: "Kernpreise",
      title: "Sprint / Accelerator — zuerst die Investition sehen.",
      cta: "30-Minuten-Review buchen",
    },
    sprint: {
      ...content.en.sprint,
      cta: "30-Minuten-Review buchen",
    },
    finalCta: {
      ...content.en.finalCta,
      health: "Sprint-/Accelerator-Preise ansehen",
      book: "30-Minuten-Review buchen",
    },
  },
} as unknown as Record<AppLocale, typeof content.en>;

function contentFor(locale: AppLocale) {
  return localizedContent[locale] ?? localizedContent.en;
}

function SectionIntro({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="mx-auto mb-8 max-w-3xl text-center">
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-brand-primary dark:text-[color:var(--primary-hover)]">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
        {title}
      </h2>
      {intro ? (
        <p className="mt-4 text-base leading-relaxed text-slate-700 dark:text-slate-300 md:text-lg">
          {intro}
        </p>
      ) : null}
    </div>
  );
}

export function BusinessUpgradeHomepageFunnel({
  locale,
  bookingHref,
}: {
  locale: AppLocale;
  bookingHref: string;
}) {
  const c = contentFor(locale);
  const localePrefix = locale === "en" ? "" : `/${locale}`;

  return (
    <>
      <section id="ai-business-upgrade" className="mb-16 scroll-mt-[var(--header-offset)] rounded-3xl border border-[color:var(--border-light)] bg-surface p-6 shadow-card md:p-10">
        <SectionIntro {...c.problem} />
        <div className="grid gap-4 md:grid-cols-3">
          {c.problem.points.map((point) => (
            <div key={point} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <CheckCircle2 className="mb-3 h-5 w-5 text-brand-primary dark:text-[color:var(--primary-hover)]" aria-hidden />
              {point}
            </div>
          ))}
        </div>
      </section>

      <section id="offer-paths" className="mb-16 scroll-mt-[var(--header-offset)] rounded-3xl border border-[color:var(--border-light)] bg-surface p-6 shadow-card md:p-10">
        <SectionIntro eyebrow={c.paths.eyebrow} title={c.paths.title} />
        <div className="grid gap-4 md:grid-cols-3">
          {c.paths.items.map(([label, title, body]) => (
            <div key={label} className="rounded-2xl border border-[color:var(--border-light)] bg-surface-secondary p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-primary dark:text-[color:var(--primary-hover)]">{label}</p>
              <h3 className="mt-2 text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="product-pillars" className="mb-16 scroll-mt-[var(--header-offset)]">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-brand-primary dark:text-[color:var(--primary-hover)]">
            {uiStrings(locale).productStrip.eyebrow}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
            {uiStrings(locale).productStrip.title}
          </h2>
        </div>
        <ProductEntryGrid
          items={[
            {
              href: `${localePrefix}/eventxp`,
              title: uiStrings(locale).productStrip.eventxp.title,
              blurb: `${uiStrings(locale).productStrip.eventxp.blurb} · ${formatHkd(PRICING.quickCash.eventXpTrial, locale === "de" ? "de" : locale === "ja" ? "ja" : locale.startsWith("zh") ? "zh-hk" : "en")} trial`,
              cta: uiStrings(locale).productStrip.eventxp.cta,
              icon: "event",
            },
            {
              href: `${localePrefix}/smartsales-crm`,
              title: uiStrings(locale).productStrip.smartsales.title,
              blurb: `${uiStrings(locale).productStrip.smartsales.blurb} · ${formatHkd(PRICING.quickCash.smartSalesTrial, locale === "de" ? "de" : locale === "ja" ? "ja" : locale.startsWith("zh") ? "zh-hk" : "en")} trial`,
              cta: uiStrings(locale).productStrip.smartsales.cta,
              icon: "crm",
            },
            {
              href: "#ai-coaching-pricing",
              title: uiStrings(locale).productStrip.ai.title,
              blurb: uiStrings(locale).productStrip.ai.blurb,
              cta: uiStrings(locale).productStrip.ai.cta,
              icon: "ai",
            },
          ]}
        />
      </section>

      <section id="ai-coaching-pricing" className="mb-16 scroll-mt-[var(--header-offset)] rounded-3xl border border-[color:var(--border-light)] bg-surface p-6 shadow-card md:p-10">
        <SectionIntro eyebrow={c.pricing.eyebrow} title={c.pricing.title} intro={c.pricing.intro} />
        <div className="grid gap-5 lg:grid-cols-4">
          {c.pricing.plans.map((plan, planIndex) => (
            <article
              key={plan.name}
              className={`flex h-full flex-col rounded-2xl border p-5 shadow-sm ${
                "featured" in plan && plan.featured
                  ? "border-brand-primary/40 bg-surface-secondary"
                  : "border-[color:var(--border-light)] bg-surface-secondary"
              }`}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
              <p className="mt-3 text-lg font-extrabold text-brand-primary dark:text-[color:var(--primary-hover)]">{consultancyPlanPrice(planIndex, locale)}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{plan.fit}</p>
              <ul className="mt-5 grid flex-1 gap-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {plan.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="font-bold text-brand-primary dark:text-[color:var(--primary-hover)]">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <AddToInquiryButton itemId={consultancyCatalogId(planIndex)} />
              </div>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-3xl rounded-2xl border border-[color:var(--border-light)] bg-surface-secondary p-4 text-center text-sm leading-relaxed text-[color:var(--text-secondary)]">
          {c.pricing.note}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <AddToInquiryButton itemId="discoverySprint30Day" fullWidth={false} />
          <Button href={bookingHref}>{c.pricing.cta}</Button>
        </div>
      </section>

      <section id="discovery-sprint" className="mb-16 scroll-mt-[var(--header-offset)] rounded-3xl border border-[color:var(--border-light)] bg-surface p-6 shadow-card md:p-10">
        <SectionIntro eyebrow={c.sprint.eyebrow} title={c.sprint.title} intro={c.sprint.intro} />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-surface-secondary p-6 shadow-card">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
              <ClipboardCheck className="h-5 w-5 text-brand-primary dark:text-[color:var(--primary-hover)]" aria-hidden />
              {c.sprint.deliverablesTitle}
            </h3>
            <ul className="grid gap-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {c.sprint.deliverables.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="font-bold text-brand-primary dark:text-[color:var(--primary-hover)]">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[color:var(--border-light)] bg-surface-secondary p-6 shadow-card">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
              <ShieldCheck className="h-5 w-5 text-brand-primary dark:text-[color:var(--primary-hover)]" aria-hidden />
              {c.sprint.exclusionsTitle}
            </h3>
            <ul className="grid gap-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {c.sprint.exclusions.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="font-bold text-slate-400">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <Button href={bookingHref}>{c.sprint.cta}</Button>
        </div>
      </section>

      <section id="programs" className="mb-16 scroll-mt-[var(--header-offset)] rounded-3xl border border-[color:var(--border-light)] bg-surface p-6 shadow-card md:p-10">
        <SectionIntro eyebrow={c.programs.eyebrow} title={c.programs.title} intro={c.programs.intro} />
        <p className="mx-auto mb-8 max-w-2xl text-center text-sm font-semibold text-brand-primary dark:text-[color:var(--primary-hover)]">
          <a href="#ai-coaching-pricing" className="underline decoration-brand-primary/40 underline-offset-2 hover:decoration-brand-primary">
            {uiStrings(locale).programsSection.pricingLink}
          </a>
        </p>
        <ol className="relative mx-auto max-w-4xl space-y-0">
          {c.programs.cards.map((card, cardIndex) => {
            const planIndex = cardIndex + 1;
            const duration = uiStrings(locale).programsSection.durationLabels[cardIndex];
            return (
              <li
                key={card.name}
                className={`relative flex gap-4 pb-8 last:pb-0 md:gap-6 ${
                  cardIndex < c.programs.cards.length - 1 ? "border-l-2 border-brand-primary/25 pl-6 md:pl-8 ml-3 md:ml-4" : "pl-6 md:pl-8 ml-3 md:ml-4"
                }`}
              >
                <span
                  className={`absolute left-0 top-0 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full text-xs font-bold md:h-7 md:w-7 ${
                    "featured" in card && card.featured
                      ? "bg-brand-primary text-white"
                      : "border-2 border-brand-primary bg-surface text-brand-primary"
                  }`}
                >
                  {cardIndex + 1}
                </span>
                <article
                  className={`flex-1 rounded-2xl border p-5 shadow-sm ${
                    "featured" in card && card.featured
                      ? "border-brand-primary/40 bg-surface-secondary"
                      : "border-[color:var(--border-light)] bg-surface-secondary"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{card.name}</h3>
                    <span className="rounded-full bg-brand-primary/10 px-2.5 py-0.5 text-xs font-bold text-brand-primary dark:bg-brand-primary/20 dark:text-[color:var(--primary-hover)]">
                      {duration}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{card.body}</p>
                  <ul className="mt-4 grid gap-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    {card.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="font-bold text-brand-primary dark:text-[color:var(--primary-hover)]">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    <AddToInquiryButton itemId={consultancyCatalogId(planIndex)} />
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
        <div className="mt-8 flex justify-center">
          <Button href={bookingHref}>{c.pricing.cta}</Button>
        </div>
      </section>

      <section id="why-innovatexp" className="mb-16 scroll-mt-[var(--header-offset)] rounded-3xl border border-[color:var(--border-light)] bg-surface p-6 shadow-card md:p-10">
        <SectionIntro eyebrow={c.whyUs.eyebrow} title={c.whyUs.title} intro={c.whyUs.intro} />
        <div className="grid gap-4 md:grid-cols-2">
          {c.whyUs.points.map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">
              <div className="mb-3 flex items-center gap-2">
                <Wrench className="h-5 w-5 text-brand-primary dark:text-[color:var(--primary-hover)]" aria-hidden />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <PricingFunnelSections
        locale={locale}
        bookingHref={bookingHref}
        eventXpHref={`${localePrefix}/eventxp`}
        smartSalesHref={`${localePrefix}/smartsales-crm`}
      />

      <section id="use-cases" className="mb-16 scroll-mt-[var(--header-offset)] rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-card dark:border-slate-700 dark:bg-slate-900/80 md:p-10">
        <SectionIntro {...c.useCases} />
        <div className="grid gap-6 lg:grid-cols-3">
          {c.useCases.cards.map((item) => (
            <div key={item.title} className="rounded-2xl border border-[color:var(--border-light)] bg-surface-secondary p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.before}</p>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-brand-primary dark:text-[color:var(--primary-hover)]">{item.after}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="capability-proof" className="mb-16 scroll-mt-[var(--header-offset)] rounded-3xl border border-[color:var(--border-light)] bg-surface p-6 shadow-card md:p-10">
        <SectionIntro {...c.proof} />
        <div className="grid gap-6 lg:grid-cols-3">
          {c.proof.columns.map((column, index) => {
            const Icon = [Users, LayoutDashboard, GraduationCap][index] ?? CheckCircle2;
            return (
              <div key={column.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">
                <Icon className="mb-4 h-7 w-7 text-brand-primary dark:text-[color:var(--primary-hover)]" aria-hidden />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{column.title}</h3>
                <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {column.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section id="about-founder" className="mb-16 scroll-mt-[var(--header-offset)] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card dark:border-slate-700 dark:bg-slate-900">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[280px]">
            <Image
              src="/mypresent.jpg"
              alt={c.founder.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 460px"
              loading="lazy"
            />
          </div>
          <div className="p-6 md:p-10">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-brand-primary dark:text-[color:var(--primary-hover)]">
              {c.founder.eyebrow}
            </p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">{c.founder.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-relaxed text-gray-900 dark:text-white">{c.founder.body}</p>
            <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-300">{c.founder.support}</p>
          </div>
        </div>
      </section>

      <FaqAccordion
        id="faq"
        title={c.faq.title}
        faqs={c.faq.items.map(([question, answer]) => ({ question, answer }))}
        defaultOpenIndex={0}
      />

      <section className="mb-16 rounded-3xl border border-[color:var(--border-light)] bg-surface p-6 shadow-card md:p-10 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">{c.finalCta.title}</h2>
        <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-slate-700 dark:text-slate-300">{c.finalCta.body}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button href="#ai-coaching-pricing">{c.finalCta.health}</Button>
          <Button href={bookingHref} variant="outline">{c.finalCta.book}</Button>
        </div>
      </section>

      <section id="capabilities" className="mb-16 scroll-mt-[var(--header-offset)] rounded-3xl border border-[color:var(--border-light)] bg-surface p-6 shadow-card md:p-10">
        <SectionIntro eyebrow={c.capabilities.eyebrow} title={c.capabilities.title} intro={c.capabilities.intro} />
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2 lg:grid-cols-4">
          {c.capabilities.items.map((item, index) => {
            const icons = [MessageSquareText, BarChart3, Bot, LayoutDashboard];
            const Icon = icons[index] ?? Bot;
            const href = item.href.startsWith("#") ? item.href : `${localePrefix}${item.href}`;
            return (
              <a
                key={item.name}
                href={href}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:border-brand-primary/50 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
              >
                <Icon className="mb-3 h-7 w-7 text-brand-primary dark:text-[color:var(--primary-hover)]" aria-hidden />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{item.body}</p>
                <span className="mt-4 text-sm font-semibold text-brand-primary group-hover:underline dark:text-[color:var(--primary-hover)]">
                  {locale === "zh-hk" || locale === "zh-tw" ? "了解詳情 →" : "Learn more →"}
                </span>
              </a>
            );
          })}
        </div>
      </section>
    </>
  );
}
