import Image from "next/image";
import { BarChart3, Bot, CheckCircle2, ClipboardCheck, GraduationCap, LayoutDashboard, MessageSquareText, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WorkflowHealthCheck } from "@/components/WorkflowHealthCheck";
import type { AppLocale } from "@/lib/i18n-routing";

type Lang = "en" | "zh";

const content = {
  zh: {
    problem: {
      eyebrow: "香港中小企常見樽頸",
      title: "AI 未落地，通常不是因為工具不夠，而是流程未執順。",
      intro:
        "特別是 3-30 人的培訓機構、課程營運公司和專業服務 firm，很多重要流程仍然靠 Excel、WhatsApp、Google Forms、email、紙本或不同 SaaS 拼在一起。",
      points: [
        "SOP 只存在老闆或資深同事腦中，交接困難。",
        "Excel、WhatsApp、表單和 email 各自有不同版本的真相。",
        "一位關鍵同事放假，報名、付款、報價或客戶跟進就卡住。",
        "買了 AI 或 CRM 工具，但團隊採用率低，仍然照舊工作。",
        "重複行政令回覆變慢、錯漏增加、follow-up 容易遺漏。",
      ],
    },
    method: {
      eyebrow: "AI 商業升級方法",
      title: "問 → 畫 → 定 KPI → 排優先次序 → 試行 → 驗收",
      intro:
        "InnovateXP 的工作不是一開始叫你重做系統，而是先用 active questionnaire、訪談和團隊 feedback 看清楚流程，再用 Agile checkpoint 小步試行。",
      steps: [
        ["問", "Active questionnaire、管理層 / 持份者訪談、團隊 feedback，先了解真實工作方式。"],
        ["畫", "畫出現況流程、SOP、責任、資料流、handoff 和樽頸。"],
        ["定 KPI", "設定處理時間、錯漏率、回覆速度、完成率、團隊採用率等 baseline。"],
        ["排優先次序", "按影響、成本、風險和落地難度建立 improvement backlog。"],
        ["試行", "優先改善現有工具和做法，驗證一個 AI / automation quick win。"],
        ["驗收", "透過 review checkpoint、KPI review 和 team feedback 決定下一步。"],
      ],
    },
    sprint: {
      eyebrow: "Primary Entry Offer",
      title: "30 日 Founder Pilot / AI Upgrade Discovery Sprint",
      intro:
        "付費體驗及需求驗證。集中處理一個核心流程，例如課程報名、報價跟進、HR 審批或收據行政，不承諾一次完成全面轉型。",
      deliverablesTitle: "包括",
      exclusionsTitle: "不包括",
      deliverables: [
        "Active questionnaire",
        "60 分鐘 kickoff",
        "最多 2 次關鍵持份者訪談",
        "梳理 1 個核心 workflow",
        "SOP / workflow draft",
        "KPI baseline",
        "1 個 AI / automation quick-win 建議及試行指引",
        "Review checkpoint",
        "30 / 60 / 90 日改善路線圖",
      ],
      exclusions: [
        "客製化 SaaS / CRM / AI agent 開發",
        "大型 data migration、data cleansing 或 API integration",
        "代替客戶執行日常營運",
        "法律、會計、稅務、HR、審計或合規意見",
        "第三方訂閱、hosting、WhatsApp、email 或 AI API 成本",
        "保證 ROI、收入或成本節省結果",
      ],
      cta: "預約 30 分鐘流程診斷",
    },
    programs: {
      eyebrow: "Accelerator Programs",
      title: "陪跑帶入場 → 顧問持續改善 → 系統按需要落地",
      intro:
        "這些是 coaching and advisory programs，不是軟件套裝。Automation、CRM、AI agent 或 SaaS 只會在 workflow 和 business case 驗證後另行 scope。",
      cards: [
        {
          name: "3 個月 | AI Upgrade Foundation",
          body: "由流程診斷走到第一個可驗收改善成果。",
          points: ["聚焦 1-2 個 workflow", "SOP v1、角色責任及 handoff", "每月 planning、checkpoint、KPI review", "1 次團隊實戰培訓"],
        },
        {
          name: "6 個月 | AI Upgrade Accelerator",
          body: "擴展至一個部門或 3-4 個相關流程，建立穩定採用習慣。",
          points: ["Agile reviews", "SOP v2 與 exception handling", "KPI dashboard / adoption review", "最多 2 次 workshop"],
          featured: true,
        },
        {
          name: "12 個月 | AI Business Upgrade Partnership",
          body: "將 AI adoption、SOP 和流程優化變成長期管理能力。",
          points: ["年度 roadmap", "跨部門 prioritization", "SOP governance", "最多 4 次 workshop"],
        },
      ],
    },
    useCases: {
      eyebrow: "示範場景 / Example Workflow",
      title: "先用一個具體流程驗證，再決定是否需要系統。",
      cards: [
        {
          title: "課程報名、付款提醒、出席與學員跟進",
          before: "Before: 報名資料散落 WhatsApp、表單、Excel 和 email。",
          after: "After: 梳理報名到 follow-up 流程，建立 SOP、KPI 和可試行的 AI / automation quick win。",
        },
        {
          title: "報價、銷售查詢與 follow-up",
          before: "Before: 不同同事跟進方法不同，報價版本和下一步容易混亂。",
          after: "After: 定義 enquiry handling、quotation workflow、SLA 和跟進責任。",
        },
        {
          title: "HR 審批、收據與會計行政",
          before: "Before: 審批、收據和行政資料靠人手追，容易重複輸入。",
          after: "After: 先整理資料流、責任和 KPI，再判斷是否需要 automation 或 system support。",
        },
      ],
    },
    proof: {
      eyebrow: "相關經驗與已交付能力",
      title: "不靠假 testimonial，先講可驗證能力。",
      columns: [
        {
          title: "Founder background",
          points: ["13-14 年 IT delivery、product、cloud、Agile 經驗", "Former Google Developer Group Hong Kong organizer", "Developer / community / workshop experience"],
        },
        {
          title: "Delivered systems",
          points: ["Check-in system and attendance workflows", "Booking portal and admin workflows", "CRM, dashboard, and workflow automation experience"],
        },
        {
          title: "Delivery style",
          points: ["廣東話 / English support", "Practical AI training for teams", "Founder Pilot 正在招募適合的 SME workflow"],
        },
      ],
    },
    founder: {
      eyebrow: "About Larry",
      title: "Larry Lo, AI 商業升級教練",
      body:
        "我唔係一開始就叫你重做系統。我會先同你梳理流程、設定 KPI，同團隊試行最值得做嘅改善；確認有需要，先再建議合適工具或系統。",
      support:
        "我的角色是 practical B2B coach + technical implementation partner：先幫管理層和團隊看清工作方式，再決定 AI、automation、CRM 或 SaaS 是否值得落地。",
    },
    faq: {
      title: "AI 商業升級 FAQ",
      items: [
        ["你是否賣 software？", "不是以賣 software 作為第一步。InnovateXP 主力做 AI 商業升級陪跑與顧問，先梳理流程、SOP 和 KPI；確認 business case 後，才另行提出 automation、CRM、AI agent 或 SaaS scope。"],
        ["這是否只是 AI training？", "不是。培訓只是其中一部分。加速計劃包括問卷、訪談、SOP mapping、KPI baseline、review checkpoint、team feedback 和實際試行。"],
        ["小團隊適合嗎？", "適合 3-30 人團隊，尤其當老闆或資深同事是 single point of failure。小團隊通常更需要先把一條核心流程整理清楚。"],
        ["需要更換現有系統嗎？", "未必。通常會先改善現有 Excel、表單、WhatsApp、CRM 或其他工具的用法。只有當流程和 business case 清晰，才建議新系統。"],
        ["30 日 Sprint 包括什麼？", "包括 active questionnaire、60 分鐘 kickoff、最多兩次訪談、一條核心流程 map、SOP / workflow draft、KPI baseline、一個 AI / automation quick win 建議、review checkpoint 和 30 / 60 / 90 日 roadmap。"],
        ["Accelerator 之後會怎樣？", "可以按月或季度轉為 AI Business Upgrade Advisory，持續 review KPI、SOP、adoption 和下一輪 improvement backlog。"],
        ["資料私隱如何處理？", "公開表格不收集客戶名單、財務、HR、合約或敏感營運資料。正式項目會先界定資料範圍、權限、工具和第三方成本。"],
      ],
    },
    finalCta: {
      title: "先做一個 3 分鐘檢查，再決定下一步。",
      body:
        "如果你已經知道有一條流程卡住，可以直接預約 30 分鐘流程診斷；如果未清楚由哪裡開始，先完成 Workflow Health Check。",
      health: "做 3 分鐘流程健康檢查",
      book: "預約 30 分鐘流程診斷",
    },
    capabilities: {
      eyebrow: "Capabilities / Solutions",
      title: "系統能力是落地選項，不是第一步。",
      body:
        "下方的 EventXP、SmartSales CRM、dashboard、booking portal 和 AI agent 能力，是已交付或可延伸的 implementation capability。它們會在 workflow、KPI 和 business case 驗證後才成為方案一部分。",
    },
  },
  en: {
    problem: {
      eyebrow: "Common SME bottlenecks in Hong Kong",
      title: "AI usually fails to land because the workflow is unclear, not because the tool is missing.",
      intro:
        "For 3-30 person training providers, course operators, and professional-service firms, critical work often sits across Excel, WhatsApp, Google Forms, email, paper, and disconnected SaaS tools.",
      points: [
        "SOP exists only in the owner’s or senior employee’s head.",
        "Excel, WhatsApp, forms, and email contain different versions of truth.",
        "Work stops when one key person is absent.",
        "AI or CRM tools were purchased, but team adoption remains low.",
        "Repetitive work creates slow response, errors, and missed follow-up.",
      ],
    },
    method: {
      eyebrow: "AI Business Upgrade Method",
      title: "Ask → Map → Define KPIs → Prioritize → Trial → Review",
      intro:
        "InnovateXP does not start by asking you to rebuild your system. We use active questionnaires, interviews, and team feedback to understand the workflow, then run practical Agile checkpoints.",
      steps: [
        ["Ask", "Active questionnaire, management / stakeholder interviews, and team feedback."],
        ["Map", "Current workflow, SOP, ownership, data flow, handoffs, and bottlenecks."],
        ["Define KPIs", "Baseline processing time, error rate, response time, completion rate, and adoption."],
        ["Prioritize", "Build an improvement backlog based on impact, cost, risk, and delivery effort."],
        ["Trial", "Improve current tools first and validate one AI / automation quick win."],
        ["Review", "Use review checkpoints, KPI review, and team feedback to decide the next step."],
      ],
    },
    sprint: {
      eyebrow: "Primary Entry Offer",
      title: "30-day Founder Pilot / AI Upgrade Discovery Sprint",
      intro:
        "A paid discovery and validation sprint focused on one core workflow, such as course enrolment, quotation follow-up, HR approval, or receipt administration. It does not promise full transformation in one month.",
      deliverablesTitle: "Includes",
      exclusionsTitle: "Excludes",
      deliverables: ["Active questionnaire", "60-minute kickoff", "Up to two stakeholder interviews", "Map one core workflow", "SOP / workflow draft", "KPI baseline", "One AI / automation quick-win recommendation and trial guide", "Review checkpoint", "30 / 60 / 90-day improvement roadmap"],
      exclusions: ["Custom SaaS / CRM / AI agent development", "Large data migration, cleansing, or API integration", "Daily operations outsourcing", "Legal, accounting, tax, HR, audit, or compliance advice", "Third-party subscriptions, hosting, WhatsApp, email, or AI API costs", "Guaranteed ROI, revenue, or cost-saving outcomes"],
      cta: "Book a 30-minute Workflow Review",
    },
    programs: {
      eyebrow: "Accelerator Programs",
      title: "Coaching brings you in → Advisory improves continuously → Systems land only when needed",
      intro:
        "These are coaching and advisory programs, not software packages. Automation, CRM, AI agents, or SaaS implementation is scoped separately only after the workflow and business case are validated.",
      cards: [
        { name: "3 months | AI Upgrade Foundation", body: "Move from diagnosis to the first reviewable improvement.", points: ["1-2 workflows", "SOP v1, roles, and handoff", "Monthly planning, checkpoint, KPI review", "One practical team training"] },
        { name: "6 months | AI Upgrade Accelerator", body: "Expand to one department or 3-4 related workflows with adoption habits.", points: ["Agile reviews", "SOP v2 and exception handling", "KPI dashboard / adoption review", "Up to two workshops"], featured: true },
        { name: "12 months | AI Business Upgrade Partnership", body: "Make AI adoption, SOP, and process improvement a long-term management capability.", points: ["Annual roadmap", "Cross-department prioritization", "SOP governance", "Up to four workshops"] },
      ],
    },
    useCases: {
      eyebrow: "Example Workflow",
      title: "Validate one specific workflow before deciding whether a system is needed.",
      cards: [
        { title: "Course enrolment, payment reminders, attendance, learner follow-up", before: "Before: enrolment data lives across WhatsApp, forms, Excel, and email.", after: "After: map the enrolment-to-follow-up workflow, SOP, KPI, and one AI / automation quick win." },
        { title: "Quotations, sales enquiries, and follow-up", before: "Before: every team member follows up differently, and quotation versions are unclear.", after: "After: define enquiry handling, quotation workflow, SLA, and follow-up ownership." },
        { title: "HR approvals, receipts, and accounting administration", before: "Before: approvals, receipts, and admin data require repeated manual chasing.", after: "After: clarify data flow, ownership, and KPIs before considering automation or system support." },
      ],
    },
    proof: {
      eyebrow: "Relevant Experience & Delivery Capability",
      title: "No fake testimonials. Only verifiable capability.",
      columns: [
        { title: "Founder background", points: ["13-14 years of IT delivery, product, cloud, and Agile experience", "Former Google Developer Group Hong Kong organizer", "Developer / community / workshop experience"] },
        { title: "Delivered systems", points: ["Check-in system and attendance workflows", "Booking portal and admin workflows", "CRM, dashboard, and workflow automation experience"] },
        { title: "Delivery style", points: ["Cantonese and English support", "Practical AI training for teams", "Founder Pilot recruitment for suitable SME workflows"] },
      ],
    },
    founder: {
      eyebrow: "About Larry",
      title: "Larry Lo, AI Business Upgrade Coach",
      body:
        "I do not start by telling you to rebuild your system. I first help you clarify the workflow, define KPIs, and trial the most valuable improvement with your team. Only when the need is validated do I recommend suitable tools or systems.",
      support:
        "My role is practical B2B coach plus technical implementation partner: help leadership and teams see how work really happens, then decide whether AI, automation, CRM, or SaaS is worth implementing.",
    },
    faq: {
      title: "AI Business Upgrade FAQ",
      items: [
        ["Are you selling software?", "Software is not the first step. InnovateXP primarily provides AI Business Upgrade coaching and advisory. Automation, CRM, AI agents, or SaaS are scoped separately only after the workflow, SOP, KPI, and business case are clear."],
        ["Is this just AI training?", "No. Training is only one part. The accelerator includes questionnaires, interviews, SOP mapping, KPI baseline, review checkpoints, team feedback, and practical trials."],
        ["Is this suitable for a small team?", "Yes, especially 3-30 person teams where the owner or senior employee is the single point of failure. A small team usually benefits from fixing one core workflow first."],
        ["Do we need to replace our current system?", "Not necessarily. We usually improve how you use existing spreadsheets, forms, WhatsApp, CRM, or other tools first. New systems are recommended only when the workflow and business case are validated."],
        ["What is included in the 30-day sprint?", "Active questionnaire, 60-minute kickoff, up to two interviews, one core workflow map, SOP / workflow draft, KPI baseline, one AI / automation quick-win recommendation, review checkpoint, and a 30 / 60 / 90-day roadmap."],
        ["What happens after the accelerator?", "You can continue with AI Business Upgrade Advisory monthly or quarterly to review KPIs, SOPs, adoption, and the next improvement backlog."],
        ["How do you handle data privacy?", "The public form does not collect customer lists, financials, HR, contracts, or sensitive operational data. A formal project defines data scope, permissions, tools, and third-party costs first."],
      ],
    },
    finalCta: {
      title: "Take 3 minutes before deciding the next step.",
      body:
        "If you already know one workflow is stuck, book a 30-minute Workflow Review. If you are not sure where to begin, start with the Workflow Health Check.",
      health: "Take the 3-minute Workflow Health Check",
      book: "Book a 30-minute Workflow Review",
    },
    capabilities: {
      eyebrow: "Capabilities / Solutions",
      title: "Systems are implementation options, not the starting point.",
      body:
        "EventXP, SmartSales CRM, dashboards, booking portals, and AI agent capabilities below are delivered or extendable implementation capabilities. They become part of the solution only after workflow, KPI, and business case validation.",
    },
  },
} as const;

function languageFor(locale: AppLocale): Lang {
  return locale === "zh-hk" || locale === "zh-tw" ? "zh" : "en";
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
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-brand-primary dark:text-teal-300">
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
  const c = content[languageFor(locale)];

  return (
    <>
      <section id="ai-business-upgrade" className="mb-16 scroll-mt-[var(--header-offset)] rounded-3xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-700 dark:bg-slate-900 md:p-10">
        <SectionIntro {...c.problem} />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {c.problem.points.map((point) => (
            <div key={point} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <CheckCircle2 className="mb-3 h-5 w-5 text-brand-primary dark:text-teal-300" aria-hidden />
              {point}
            </div>
          ))}
        </div>
      </section>

      <WorkflowHealthCheck locale={locale} bookingHref={bookingHref} />

      <section id="method" className="mb-16 scroll-mt-[var(--header-offset)] rounded-3xl border border-brand-primary/25 bg-white p-6 shadow-card dark:border-teal-500/30 dark:bg-slate-900 md:p-10">
        <SectionIntro {...c.method} />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {c.method.steps.map(([title, body], index) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white dark:bg-teal-300 dark:text-slate-950">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="discovery-sprint" className="mb-16 scroll-mt-[var(--header-offset)] rounded-3xl border border-slate-200 bg-gradient-to-br from-cyan-50 via-white to-amber-50 p-6 shadow-card dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-gray-900 md:p-10">
        <SectionIntro eyebrow={c.sprint.eyebrow} title={c.sprint.title} intro={c.sprint.intro} />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
            <h3 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
              <ClipboardCheck className="h-6 w-6 text-brand-primary dark:text-teal-300" aria-hidden />
              {c.sprint.deliverablesTitle}
            </h3>
            <ul className="grid gap-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300 sm:grid-cols-2">
              {c.sprint.deliverables.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="font-bold text-brand-primary dark:text-teal-300">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <h3 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
              <ShieldCheck className="h-6 w-6 text-brand-primary dark:text-teal-300" aria-hidden />
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

      <section id="programs" className="mb-16 scroll-mt-[var(--header-offset)] rounded-3xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-700 dark:bg-slate-900 md:p-10">
        <SectionIntro {...c.programs} />
        <div className="grid gap-6 lg:grid-cols-3">
          {c.programs.cards.map((program) => (
            <div
              key={program.name}
              className={`rounded-2xl border p-6 shadow-sm ${
                "featured" in program && program.featured
                  ? "border-brand-primary/50 bg-gradient-to-br from-cyan-50 via-white to-amber-50 dark:border-teal-500/50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-900"
                  : "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800"
              }`}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{program.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{program.body}</p>
              <ul className="mt-5 grid gap-3 text-sm text-slate-700 dark:text-slate-300">
                {program.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="font-bold text-brand-primary dark:text-teal-300">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="use-cases" className="mb-16 scroll-mt-[var(--header-offset)] rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-card dark:border-slate-700 dark:bg-slate-900/80 md:p-10">
        <SectionIntro {...c.useCases} />
        <div className="grid gap-6 lg:grid-cols-3">
          {c.useCases.cards.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.before}</p>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-brand-primary dark:text-teal-300">{item.after}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="capability-proof" className="mb-16 scroll-mt-[var(--header-offset)] rounded-3xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-700 dark:bg-slate-900 md:p-10">
        <SectionIntro {...c.proof} />
        <div className="grid gap-6 lg:grid-cols-3">
          {c.proof.columns.map((column, index) => {
            const Icon = [Users, LayoutDashboard, GraduationCap][index] ?? CheckCircle2;
            return (
              <div key={column.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">
                <Icon className="mb-4 h-7 w-7 text-brand-primary dark:text-teal-300" aria-hidden />
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

      <section id="about-larry" className="mb-16 scroll-mt-[var(--header-offset)] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card dark:border-slate-700 dark:bg-slate-900">
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
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-brand-primary dark:text-teal-300">
              {c.founder.eyebrow}
            </p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">{c.founder.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-relaxed text-gray-900 dark:text-white">{c.founder.body}</p>
            <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-300">{c.founder.support}</p>
          </div>
        </div>
      </section>

      <section id="faq" className="mb-16 scroll-mt-[var(--header-offset)] rounded-3xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-700 dark:bg-slate-900 md:p-10">
        <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">{c.faq.title}</h2>
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {c.faq.items.map(([question, answer]) => (
            <div key={question} className="py-5">
              <h3 className="text-lg font-bold text-brand-primary dark:text-teal-300">{question}</h3>
              <p className="mt-2 leading-relaxed text-slate-700 dark:text-slate-300">{answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16 rounded-3xl border border-brand-primary/25 bg-gradient-to-r from-cyan-50 via-white to-amber-50 p-6 text-center shadow-card dark:border-teal-500/30 dark:from-slate-900 dark:via-slate-900 dark:to-gray-900 md:p-10">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">{c.finalCta.title}</h2>
        <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-slate-700 dark:text-slate-300">{c.finalCta.body}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button href="#workflow-health-check">{c.finalCta.health}</Button>
          <Button href={bookingHref} variant="outline">{c.finalCta.book}</Button>
        </div>
      </section>

      <section id="capabilities" className="mb-16 scroll-mt-[var(--header-offset)] rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-card dark:border-slate-700 dark:bg-slate-900 md:p-10">
        <SectionIntro {...c.capabilities} />
        <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-3">
          {[MessageSquareText, BarChart3, Bot].map((Icon, index) => (
            <div key={index} className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800">
              <Icon className="mx-auto h-7 w-7 text-brand-primary dark:text-teal-300" aria-hidden />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
