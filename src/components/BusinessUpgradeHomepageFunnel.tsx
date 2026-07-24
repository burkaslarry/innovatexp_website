import Image from "next/image";
import { BarChart3, Bot, CheckCircle2, ClipboardCheck, GraduationCap, LayoutDashboard, MessageSquareText, ShieldCheck, Users, Wrench } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AddToInquiryButton } from "@/components/inquiry-cart/AddToInquiryButton";
import { consultancyPlanPrice, PricingFunnelSections } from "@/components/PricingFunnelSections";
import { consultancyCatalogId } from "@/content/inquiry-catalog";
import { formatHkd, PRICING } from "@/content/pricing";
import type { AppLocale } from "@/lib/i18n-routing";

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
      eyebrow: "起步方案",
      title: "30 日 AI Upgrade Discovery Sprint",
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
    pricing: {
      eyebrow: "AI 陪跑定價",
      title: "先睇清楚投入，再決定由邊一步開始。",
      intro:
        "首頁先講清楚服務範圍同起步價，避免一開始就叫你填大份問卷。以下是陪跑計劃 / advisory 定價，以 1 間公司、3-5 位核心參與者 / stakeholders 為基準；客製化系統、CRM、AI agent、API integration、20 人 focus group 或大班 workshop 會另行 scope。",
      plans: [
        {
          name: "30 日 Discovery Sprint",
          price: "HK$6,800",
          fit: "適合 2-4 人 focus group／3-5 位核心參與者先試一個 workflow。",
          points: ["60 分鐘 kickoff", "最多 2 次訪談", "1 條 workflow map", "SOP / KPI baseline", "30/60/90 日 roadmap"],
        },
        {
          name: "3 個月 AI Upgrade Foundation",
          price: "HK$26,000",
          fit: "適合 3-5 位核心參與者改善 1-2 條流程，建立第一個可驗收 adoption 成果。",
          points: ["SOP v1 與角色責任", "每月 checkpoint", "KPI review", "1 次團隊實戰培訓"],
          featured: true,
        },
        {
          name: "6 個月 AI Upgrade Accelerator",
          price: "HK$50,000",
          fit: "適合一個小核心團隊或部門代表改善 3-4 條相關流程，需要 adoption tracking。",
          points: ["Agile reviews", "SOP v2", "Adoption review", "最多 2 次 workshop"],
        },
        {
          name: "12 個月 Partnership",
          price: "HK$98,000",
          fit: "適合已驗證方向後，以管理層 / 核心 owner 節奏建立長期 AI adoption governance。",
          points: ["年度 roadmap", "跨部門 prioritization", "SOP governance", "管理層 reviews"],
        },
      ],
      note: "以上不是軟件套餐，也不是 20 人 focus group 價。若要加入更多部門、20 人訪談 / workshop 或多場培訓，會按人數、場次和準備工作另行報價。",
      cta: "預約 30 分鐘流程診斷",
    },
    programs: {
      eyebrow: "加速計劃",
      title: "陪跑帶入場 → 顧問持續改善 → 系統按需要落地",
      intro:
        "這些是陪跑計劃與顧問方案，不是軟件套裝。Automation、CRM、AI agent 或 SaaS 只會在 workflow 和 business case 驗證後另行 scope。",
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
      title: "相關經驗與已交付能力",
      columns: [
        {
          title: "創辦人背景",
          points: ["13-14 年 IT delivery、product、cloud、Agile 經驗", "Former Google Developer Group Hong Kong organizer", "Developer / community / workshop experience"],
        },
        {
          title: "Delivered systems",
          points: ["Check-in system and attendance workflows", "Booking portal and admin workflows", "CRM, dashboard, and workflow automation experience"],
        },
        {
          title: "Delivery style",
          points: ["廣東話 / English support", "Practical AI training for teams", "現正歡迎適合的 SME 參加 30 日 Discovery Sprint"],
        },
      ],
    },
    founder: {
      eyebrow: "關於創辦人",
      title: "InnovateXP 創辦人，AI 商業顧問",
      body:
        "我們不會一開始就叫你重做系統，而是先和你梳理流程、設定 KPI，並和團隊試行最值得做的改善；確認有需要，才再建議合適工具或系統。",
      support:
        "我的角色是 practical B2B consultant + technical implementation partner：先幫管理層和團隊看清工作方式，再決定 AI、automation、CRM 或 SaaS 是否值得落地。",
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
      title: "唔使喺首頁填長問卷。先揀一條流程傾清楚。",
      body:
        "如果你已經知道有一條流程卡住，直接預約 30 分鐘流程診斷。亦可將感興趣嘅服務加入查詢購物車，一次過提交。",
      health: "查看 AI 陪跑定價",
      book: "預約 30 分鐘流程診斷",
    },
    whyUs: {
      eyebrow: "點解揀 InnovateXP",
      title: "Hands-on Architect — 唔只講，一齊做到跑得起。",
      intro:
        "對外定位：AI 商務顧問。陪中小企先執順流程，再用 AI 將查詢、跟進、報價、SOP 同報表升級成可持續系統。",
      points: [
        ["Hands-on Architect", "13+ 年 PM／Agile；同你由 0 到 1 一齊建，唔止交 PowerPoint。"],
        ["活動數據變生意", "EventXP 唔只記出席——評分、回流洞察、高潛力名單，令活動變成可跟進 pipeline。"],
        ["Desert Oasis 定位", "唔賣紅海 check-in／CRM 標籤；幫你用 AI 建立對手難抄嘅數據護城河。"],
        ["先執流程，再落地工具", "陪跑帶入場 → 顧問持續改善 → 系統按需要落地。"],
      ],
    },
    capabilities: {
      eyebrow: "能力 / 解決方案",
      title: "按需系統落地能力",
      intro:
        "EventXP、SmartSales CRM、Accounting Chatbot、dashboard、booking portal 同 AI agent 都係按需落地能力，唔係首頁主角。先確認 workflow、KPI 同 business case，再決定需唔需要系統。",
      items: [
        {
          name: "EventXP",
          body: "活動簽到、名單評分、follow-up 自動化 — 試用 HKD 4,000（1 場活動）。",
          href: "/eventxp",
        },
        {
          name: "SmartSales CRM",
          body: "WhatsApp 銷售 workflow、CRM 基礎、pipeline 跟進 — 試用 HKD 5,000。",
          href: "/smartsales-crm",
        },
        {
          name: "AccountXP",
          body: `收據擷取 pilot 設定 + 首月正式使用 — 體驗方案 ${formatHkd(PRICING.quickCash.accountXpExperience, "zh-hk")}（一次）；維護月費 880 / 1,280 / 1,480。`,
          href: "#accounting-tools-demo",
        },
        {
          name: "Customised Website",
          body: `Starter Base Package ${formatHkd(PRICING.quickCash.websiteStarter, "zh-hk")}（一次）：1 Landing Page + Mobile + WhatsApp/Booking + 基本 SEO + 1 語言（10 工作日）；可加點心紙 add-on。`,
          href: "/pitch-decks",
        },
      ],
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
      title: "30-day AI Upgrade Discovery Sprint",
      intro:
        "A paid discovery and validation sprint focused on one core workflow, such as course enrolment, quotation follow-up, HR approval, or receipt administration. It does not promise full transformation in one month.",
      deliverablesTitle: "Includes",
      exclusionsTitle: "Excludes",
      deliverables: ["Active questionnaire", "60-minute kickoff", "Up to two stakeholder interviews", "Map one core workflow", "SOP / workflow draft", "KPI baseline", "One AI / automation quick-win recommendation and trial guide", "Review checkpoint", "30 / 60 / 90-day improvement roadmap"],
      exclusions: ["Custom SaaS / CRM / AI agent development", "Large data migration, cleansing, or API integration", "Daily operations outsourcing", "Legal, accounting, tax, HR, audit, or compliance advice", "Third-party subscriptions, hosting, WhatsApp, email, or AI API costs", "Guaranteed ROI, revenue, or cost-saving outcomes"],
      cta: "Book a 30-minute Workflow Review",
    },
    pricing: {
      eyebrow: "AI Program Pricing",
      title: "See the investment before filling out a long form.",
      intro:
        "The homepage should make the offer and starting prices clear first. These prices cover program and advisory scopes. Each package assumes one company and 3-5 core participants / stakeholders. Custom systems, CRM, AI agents, API integrations, 20-person focus groups, larger workshops, and third-party costs are scoped separately.",
      plans: [
        {
          name: "30-day Discovery Sprint",
          price: "HK$6,800",
          fit: "For a 2-4 person focus group / 3-5 core participants validating one workflow.",
          points: ["60-minute kickoff", "Up to two interviews", "One workflow map", "SOP / KPI baseline", "30/60/90-day roadmap"],
        },
        {
          name: "3-month AI Upgrade Foundation",
          price: "HK$26,000",
          fit: "For 3-5 core participants improving 1-2 workflows and building the first reviewable adoption result.",
          points: ["SOP v1 and ownership", "Monthly checkpoint", "KPI review", "One practical team training"],
          featured: true,
        },
        {
          name: "6-month AI Upgrade Accelerator",
          price: "HK$50,000",
          fit: "For a small core team or department representatives improving 3-4 related workflows with adoption tracking.",
          points: ["Agile reviews", "SOP v2", "Adoption review", "Up to two workshops"],
        },
        {
          name: "12-month Partnership",
          price: "HK$98,000",
          fit: "For management / core owners building long-term AI adoption governance after the model is validated.",
          points: ["Annual roadmap", "Cross-department prioritization", "SOP governance", "Management reviews"],
        },
      ],
      note: "These are not software packages and not 20-person focus group prices. Larger focus groups, multi-department workshops, extra training sessions, or more stakeholders are scoped by headcount, sessions, and preparation work.",
      cta: "Book a 30-minute Workflow Review",
    },
    programs: {
      eyebrow: "Accelerator Programs",
      title: "Programs bring you in → Advisory improves continuously → Systems land only when needed",
      intro:
        "These are program and advisory offers, not software packages. Automation, CRM, AI agents, or SaaS implementation is scoped separately only after the workflow and business case are validated.",
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
      title: "Relevant Experience & Delivery Capability",
      columns: [
        { title: "Founder background", points: ["13-14 years of IT delivery, product, cloud, and Agile experience", "Former Google Developer Group Hong Kong organizer", "Developer / community / workshop experience"] },
        { title: "Delivered systems", points: ["Check-in system and attendance workflows", "Booking portal and admin workflows", "CRM, dashboard, and workflow automation experience"] },
        { title: "Delivery style", points: ["Cantonese and English support", "Practical AI training for teams", "Discovery Sprint openings for suitable SME workflows"] },
      ],
    },
    founder: {
      eyebrow: "About the founder",
      title: "Founder-led AI Business Consultancy",
      body:
        "I do not start by telling you to rebuild your system. I first help you clarify the workflow, define KPIs, and trial the most valuable improvement with your team. Only when the need is validated do I recommend suitable tools or systems.",
      support:
        "My role is practical B2B consultant plus technical implementation partner: help leadership and teams see how work really happens, then decide whether AI, automation, CRM, or SaaS is worth implementing.",
    },
    faq: {
      title: "AI Business Upgrade FAQ",
      items: [
        ["Are you selling software?", "Software is not the first step. InnovateXP primarily provides AI Business Consultancy and advisory. Automation, CRM, AI agents, or SaaS are scoped separately only after the workflow, SOP, KPI, and business case are clear."],
        ["Is this just AI training?", "No. Training is only one part. The accelerator includes questionnaires, interviews, SOP mapping, KPI baseline, review checkpoints, team feedback, and practical trials."],
        ["Is this suitable for a small team?", "Yes, especially 3-30 person teams where the owner or senior employee is the single point of failure. A small team usually benefits from fixing one core workflow first."],
        ["Do we need to replace our current system?", "Not necessarily. We usually improve how you use existing spreadsheets, forms, WhatsApp, CRM, or other tools first. New systems are recommended only when the workflow and business case are validated."],
        ["What is included in the 30-day sprint?", "Active questionnaire, 60-minute kickoff, up to two interviews, one core workflow map, SOP / workflow draft, KPI baseline, one AI / automation quick-win recommendation, review checkpoint, and a 30 / 60 / 90-day roadmap."],
        ["What happens after the accelerator?", "You can continue with AI Business Upgrade Advisory monthly or quarterly to review KPIs, SOPs, adoption, and the next improvement backlog."],
        ["How do you handle data privacy?", "The public form does not collect customer lists, financials, HR, contracts, or sensitive operational data. A formal project defines data scope, permissions, tools, and third-party costs first."],
      ],
    },
    finalCta: {
      title: "No long questionnaire on the homepage. Pick one workflow and review it.",
      body:
        "If you already know one workflow is stuck, book a 30-minute Workflow Review — or add the offers you want to the inquiry cart and submit once.",
      health: "See AI program pricing",
      book: "Book a 30-minute Workflow Review",
    },
    whyUs: {
      eyebrow: "Why InnovateXP",
      title: "Hands-on Architect — we don’t just talk; we build until it runs.",
      intro:
        "External positioning: AI Business Consultancy. We help SMEs fix workflows first, then use AI to upgrade inquiries, follow-up, quotations, SOPs, and reporting into a repeatable system.",
      points: [
        ["Hands-on Architect", "13+ years PM / Agile. We build with you from 0 to 1 — not slide decks only."],
        ["Event data → revenue", "EventXP doesn’t only track attendance — scoring, retention insight, and high-intent lists turn events into a follow-up pipeline."],
        ["Desert Oasis positioning", "Not another red-ocean check-in or CRM label. We help you build an AI data moat competitors can’t copy easily."],
        ["Workflow first, tools second", "Programs bring you in → advisory improves continuously → systems land only when needed."],
      ],
    },
    capabilities: {
      eyebrow: "Capabilities / Solutions",
      title: "On-demand systems implementation",
      intro:
        "EventXP, SmartSales CRM, Accounting Chatbot, dashboards, booking portals, and AI agents are implementation capabilities — not the homepage lead. Validate workflow, KPIs, and business case first.",
      items: [
        {
          name: "EventXP",
          body: "Event check-in, lead scoring, follow-up automation — trial HKD 4,000 (one event).",
          href: "/eventxp",
        },
        {
          name: "SmartSales CRM",
          body: "WhatsApp sales workflow, CRM baseline, pipeline follow-up — trial HKD 5,000.",
          href: "/smartsales-crm",
        },
        {
          name: "AccountXP",
          body: `Receipt-capture pilot setup + first month live use — experience ${formatHkd(PRICING.quickCash.accountXpExperience)} (one-time); maintenance HKD 880 / 1,280 / 1,480.`,
          href: "#accounting-tools-demo",
        },
        {
          name: "Customised Website",
          body: `Starter Base Package ${formatHkd(PRICING.quickCash.websiteStarter)} (one-time): 1 landing page + mobile + WhatsApp/Booking + basic SEO + 1 language (10 working days); add-on menu available.`,
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
      eyebrow: "台灣與香港中小企業常見瓶頸",
      title: "AI 難以落地，通常不是工具不夠，而是流程還沒有整理清楚。",
      intro:
        "特別是 3-30 人的培訓機構、課程營運公司和專業服務團隊，許多重要流程仍分散在 Excel、WhatsApp、Google Forms、email、紙本或不同 SaaS 工具之中。",
      points: [
        "SOP 只存在老闆或資深同事腦中，交接困難。",
        "Excel、WhatsApp、表單和 email 各自保留不同版本的資料。",
        "關鍵同事不在時，報名、付款、報價或客戶跟進就容易卡住。",
        "已購買 AI 或 CRM 工具，但團隊採用率低，工作方式沒有真正改變。",
        "重複行政工作讓回覆變慢、錯漏增加，也更容易遺漏 follow-up。",
      ],
    },
    method: {
      ...content.zh.method,
      intro:
        "InnovateXP 不會一開始就要求你重做系統，而是先透過問卷、訪談和團隊回饋看清楚流程，再用 Agile checkpoint 小步試行。",
      steps: [
        ["問", "透過問卷、管理層 / 利害關係人訪談與團隊回饋，先理解真實工作方式。"],
        ["畫", "畫出現況流程、SOP、責任、資料流、交接點和瓶頸。"],
        ["定 KPI", "設定處理時間、錯漏率、回覆速度、完成率、團隊採用率等 baseline。"],
        ["排優先順序", "依影響、成本、風險和落地難度建立 improvement backlog。"],
        ["試行", "優先改善現有工具和做法，驗證一個 AI / automation quick win。"],
        ["驗收", "透過 review checkpoint、KPI review 和 team feedback 決定下一步。"],
      ],
    },
    sprint: {
      ...content.zh.sprint,
      intro:
        "付費體驗與需求驗證。集中處理一個核心流程，例如課程報名、報價跟進、HR 審批或收據行政，不承諾一個月完成全面轉型。",
      exclusions: [
        "客製化 SaaS / CRM / AI agent 開發",
        "大型 data migration、data cleansing 或 API integration",
        "代替客戶執行日常營運",
        "法律、會計、稅務、HR、審計或合規意見",
        "第三方訂閱、hosting、WhatsApp、email 或 AI API 成本",
        "保證 ROI、收入或成本節省結果",
      ],
    },
    programs: {
      ...content.zh.programs,
      title: "陪跑帶入場 → 顧問持續改善 → 系統按需要落地",
      intro:
        "這些是陪跑計劃與顧問方案，不是軟體套裝。Automation、CRM、AI agent 或 SaaS 只會在 workflow 和 business case 驗證後另行 scope。",
    },
    pricing: {
      ...content.zh.pricing,
      eyebrow: "AI 陪跑定價",
      title: "先看清楚投入，再決定從哪一步開始。",
      intro:
        "首頁先講清楚服務範圍與起步價，避免一開始就要求你填長問卷。以下是陪跑計劃 / advisory 定價，以 1 間公司、3-5 位核心參與者 / stakeholders 為基準；客製化系統、CRM、AI agent、API integration、20 人 focus group 或大班 workshop 會另行 scope。",
      plans: [
        {
          name: "30 日 Discovery Sprint",
          price: "HK$6,800",
          fit: "適合 2-4 人 focus group／3-5 位核心參與者先試一個 workflow。",
          points: ["60 分鐘 kickoff", "最多 2 次訪談", "1 條 workflow map", "SOP / KPI baseline", "30/60/90 日 roadmap"],
        },
        {
          name: "3 個月 AI Upgrade Foundation",
          price: "HK$26,000",
          fit: "適合 3-5 位核心參與者改善 1-2 條流程，建立第一個可驗收 adoption 成果。",
          points: ["SOP v1 與角色責任", "每月 checkpoint", "KPI review", "1 次團隊實戰培訓"],
          featured: true,
        },
        {
          name: "6 個月 AI Upgrade Accelerator",
          price: "HK$50,000",
          fit: "適合一個小核心團隊或部門代表改善 3-4 條相關流程，需要 adoption tracking。",
          points: ["Agile reviews", "SOP v2", "Adoption review", "最多 2 次 workshop"],
        },
        {
          name: "12 個月 Partnership",
          price: "HK$98,000",
          fit: "適合已驗證方向後，以管理層 / 核心 owner 節奏建立長期 AI adoption governance。",
          points: ["年度 roadmap", "跨部門 prioritization", "SOP governance", "管理層 reviews"],
        },
      ],
      note: "以上不是軟體套裝，也不是 20 人 focus group 價。若要加入更多部門、20 人訪談 / workshop 或多場培訓，會依人數、場次與準備工作另行報價。",
    },
    proof: {
      ...content.zh.proof,
      columns: [
        {
          title: "創辦人背景",
          points: ["13-14 年 IT delivery、product、cloud、Agile 經驗", "Former Google Developer Group Hong Kong organizer", "Developer / community / workshop experience"],
        },
        {
          title: "已交付系統",
          points: ["Check-in system and attendance workflows", "Booking portal and admin workflows", "CRM, dashboard, and workflow automation experience"],
        },
        {
          title: "交付方式",
          points: ["繁體中文 / English support", "Practical AI training for teams", "現正歡迎適合的 SME 參加 30 日 Discovery Sprint"],
        },
      ],
    },
    founder: {
      eyebrow: "關於創辦人",
      title: "InnovateXP 創辦人，AI 商業顧問",
      body:
        "我們不會一開始就要求你重做系統，而是先和你梳理流程、設定 KPI，並和團隊試行最值得做的改善；確認有需要後，才建議合適工具或系統。",
      support:
        "我們的角色是 practical B2B consultant + technical implementation partner：先協助管理層和團隊看清楚工作方式，再決定 AI、automation、CRM 或 SaaS 是否值得落地。",
    },
    finalCta: {
      ...content.zh.finalCta,
      title: "先做一個 3 分鐘檢查，再決定下一步。",
      body:
        "如果你已經知道有一個流程卡住，可以直接預約 30 分鐘流程診斷；如果還不確定從哪裡開始，先完成 Workflow Health Check。",
    },
  },
  ja: {
    ...content.en,
    problem: {
      eyebrow: "SMEによくある業務ボトルネック",
      title: "AIが定着しない理由は、ツール不足ではなくワークフローの曖昧さであることが多いです。",
      intro:
        "3〜30名規模の研修会社、コース運営会社、専門サービス企業では、重要な業務が Excel、WhatsApp、Google Forms、email、紙、複数のSaaSに分散しがちです。",
      points: [
        "SOPがオーナーやベテラン社員の頭の中にしかない。",
        "Excel、WhatsApp、フォーム、emailで情報の版がずれる。",
        "特定の担当者が不在だと、申込、支払い、見積、顧客フォローが止まりやすい。",
        "AIやCRMを導入しても、チームの定着率が低い。",
        "反復的な事務作業で返信が遅くなり、ミスやフォロー漏れが増える。",
      ],
    },
    method: {
      eyebrow: "AIビジネスアップグレードの方法",
      title: "質問 → 可視化 → KPI定義 → 優先順位 → 試行 → レビュー",
      intro:
        "InnovateXPは最初からシステム再構築を勧めません。質問票、インタビュー、チームフィードバックで業務を理解し、小さなAgile checkpointで検証します。",
      steps: [
        ["質問", "質問票、経営層 / 関係者インタビュー、チームフィードバックで実務を把握します。"],
        ["可視化", "現状フロー、SOP、責任、データの流れ、引き継ぎ、ボトルネックを可視化します。"],
        ["KPI定義", "処理時間、エラー率、返信速度、完了率、定着率などのbaselineを設定します。"],
        ["優先順位", "影響、コスト、リスク、実装難易度で改善backlogを作ります。"],
        ["試行", "既存ツールの改善を優先し、AI / automationのquick winを1つ検証します。"],
        ["レビュー", "checkpoint、KPI review、team feedbackで次の一手を決めます。"],
      ],
    },
    sprint: {
      eyebrow: "最初の入口オファー",
      title: "30日 AI Upgrade Discovery Sprint",
      intro:
        "1つの中核ワークフローに集中する有料の発見・検証スプリントです。コース申込、見積フォロー、HR承認、領収書処理などを対象にします。",
      deliverablesTitle: "含まれる内容",
      exclusionsTitle: "含まれない内容",
      deliverables: content.en.sprint.deliverables,
      exclusions: content.en.sprint.exclusions,
      cta: "30分ワークフローレビューを予約",
    },
    programs: {
      eyebrow: "アクセラレータープログラム",
      title: "プログラムで開始 → アドバイザリーで継続改善 → 必要な時だけシステム化",
      intro:
        "ソフトウェアのパッケージ販売ではなく、伴走プログラムとアドバイザリーです。Automation、CRM、AI agent、SaaSは、workflowとbusiness caseの検証後に別途scopeします。",
      cards: content.en.programs.cards,
    },
    pricing: {
      eyebrow: "AIプログラム料金",
      title: "長いフォームに進む前に、まず料金感を確認できます。",
      intro:
        "ホームページでは、まずサービス範囲と開始価格を明確にします。以下は伴走プログラム / アドバイザリーの料金で、1社・3〜5名のcore participants / stakeholdersを想定しています。Custom systems、CRM、AI agents、API integrations、20名focus group、大人数workshop、第三者サービス費用は別途scopeします。",
      plans: [
        { name: "30日 Discovery Sprint", price: "HK$6,800", fit: "2〜4名focus group / 3〜5名core participantsで、1つのworkflowを検証したいチーム向け。", points: ["60分kickoff", "最大2回のインタビュー", "1つのworkflow map", "SOP / KPI baseline", "30/60/90日roadmap"] },
        { name: "3か月 AI Upgrade Foundation", price: "HK$26,000", fit: "3〜5名のcore participantsで、1-2個のworkflowを改善したいチーム向け。", points: ["SOP v1と責任整理", "月次checkpoint", "KPI review", "1回の実践型チーム研修"], featured: true },
        { name: "6か月 AI Upgrade Accelerator", price: "HK$50,000", fit: "小さなcore teamまたは部門代表で、3-4個の関連workflowを改善したいチーム向け。", points: ["Agile reviews", "SOP v2", "Adoption review", "最大2回のworkshop"] },
        { name: "12か月 Partnership", price: "HK$98,000", fit: "方向性検証後、management / core ownersで長期的なAI adoption governanceを整えたいチーム向け。", points: ["年間roadmap", "部門横断prioritization", "SOP governance", "Management reviews"] },
      ],
      note: "上記はソフトウェアパッケージではなく、20名focus groupの料金でもありません。大人数focus group、複数部門workshop、追加研修、stakeholder追加は人数・回数・準備工数に応じて別途見積します。",
      cta: "30分ワークフローレビューを予約",
    },
    useCases: {
      eyebrow: "ワークフロー例",
      title: "まず1つの具体的なワークフローで検証し、システムが必要か判断します。",
      cards: content.en.useCases.cards,
    },
    proof: {
      eyebrow: "関連経験と提供能力",
      title: "関連経験と提供能力",
      columns: content.en.proof.columns,
    },
    founder: {
      eyebrow: "創業者について",
      title: "創業者主導のAIビジネスコンサルティング",
      body:
        "最初からシステムを作り直す提案はしません。まずワークフローとKPIを整理し、チームと一緒に価値の高い改善を試行します。必要性が検証されてから、適切なツールやシステムを提案します。",
      support:
        "役割は実践的なB2Bコンサルタントとテクニカル実装パートナーの組み合わせです。業務の実態を見える化してから、AI、automation、CRM、SaaSを導入すべきか判断します。",
    },
    faq: {
      title: "AIビジネスアップグレード FAQ",
      items: content.en.faq.items,
    },
    finalCta: {
      title: "次のステップを決める前に、3分で確認しましょう。",
      body:
        "詰まっているワークフローが分かっている場合は30分レビューを予約してください。まだ不明な場合は Workflow Health Check から始めてください。",
      health: "プログラム料金を見る",
      book: "30分レビューを予約",
    },
    capabilities: {
      eyebrow: "実装能力 / ソリューション",
      title: "必要に応じたシステム実装",
      intro:
        "EventXP、SmartSales CRM、Accounting Chatbot、dashboards、booking portals、AI agentsは実装能力であり、最初の提案ではありません。workflow、KPI、business caseの検証後に検討します。",
      items: content.en.capabilities.items,
    },
  },
  de: {
    ...content.en,
    problem: {
      eyebrow: "Typische SME-Engpässe",
      title: "AI scheitert oft nicht am Tool, sondern an unklaren Workflows.",
      intro:
        "Bei Trainingsanbietern, Kursbetreibern und Professional-Service-Firmen mit 3–30 Personen liegen wichtige Abläufe oft verstreut in Excel, WhatsApp, Google Forms, email, Papier und verschiedenen SaaS-Tools.",
      points: [
        "SOPs existieren nur im Kopf des Owners oder erfahrener Mitarbeitender.",
        "Excel, WhatsApp, Formulare und email enthalten unterschiedliche Datenstände.",
        "Fällt eine Schlüsselperson aus, stocken Anmeldung, Zahlung, Angebote oder Follow-up.",
        "AI- oder CRM-Tools wurden gekauft, aber im Team kaum übernommen.",
        "Wiederkehrende Admin-Arbeit verlangsamt Antworten und erhöht Fehler sowie verpasste Follow-ups.",
      ],
    },
    method: {
      eyebrow: "Methode für AI Business Upgrade",
      title: "Fragen → Abbilden → KPIs definieren → Priorisieren → Testen → Review",
      intro:
        "InnovateXP startet nicht mit einem System-Neubau. Wir verstehen den Workflow über Fragebogen, Interviews und Teamfeedback und testen Verbesserungen über praktische Agile Checkpoints.",
      steps: [
        ["Fragen", "Fragebogen, Management-/Stakeholder-Interviews und Teamfeedback."],
        ["Abbilden", "Ist-Prozess, SOP, Ownership, Datenfluss, Übergaben und Engpässe."],
        ["KPIs", "Baseline für Bearbeitungszeit, Fehlerquote, Antwortzeit, Abschlussrate und Adoption."],
        ["Priorisieren", "Improvement Backlog nach Wirkung, Kosten, Risiko und Aufwand."],
        ["Testen", "Bestehende Tools zuerst verbessern und einen AI-/Automation-Quick-Win validieren."],
        ["Review", "Mit Checkpoints, KPI Review und Teamfeedback den nächsten Schritt entscheiden."],
      ],
    },
    sprint: {
      eyebrow: "Einstiegsangebot",
      title: "30-Tage AI Upgrade Discovery Sprint",
      intro:
        "Ein bezahlter Discovery- und Validierungssprint für einen Kernworkflow, z.B. Kursanmeldung, Angebots-Follow-up, HR-Freigabe oder Belegadministration.",
      deliverablesTitle: "Enthalten",
      exclusionsTitle: "Nicht enthalten",
      deliverables: content.en.sprint.deliverables,
      exclusions: content.en.sprint.exclusions,
      cta: "30-Minuten-Workflow-Review buchen",
    },
    programs: {
      eyebrow: "Accelerator-Programme",
      title: "Programme zum Start → Advisory für laufende Verbesserung → Systeme nur bei Bedarf",
      intro:
        "Dies sind Programm- und Advisory-Angebote, keine Softwarepakete. Automation, CRM, AI agents oder SaaS werden erst nach validiertem Workflow und Business Case separat scoped.",
      cards: content.en.programs.cards,
    },
    pricing: {
      eyebrow: "AI-Programmpreise",
      title: "Erst die Investition verstehen, dann den nächsten Schritt wählen.",
      intro:
        "Die Startseite zeigt zuerst Angebot und Einstiegspreise, statt mit einem langen Formular zu beginnen. Die Preise gelten für Programme / Advisory und setzen ein Unternehmen mit 3-5 core participants / stakeholders voraus. Custom systems, CRM, AI agents, API integrations, 20-person focus groups, größere workshops und Drittanbieter-Kosten werden separat scoped.",
      plans: [
        { name: "30-Tage Discovery Sprint", price: "HK$6,800", fit: "Für eine 2-4-köpfige Focus Group / 3-5 Kernbeteiligte, die einen Workflow validieren.", points: ["60-Minuten-Kickoff", "Bis zu 2 Interviews", "Eine Workflow-Map", "SOP-/KPI-Baseline", "30/60/90-Tage-Roadmap"] },
        { name: "3-Monate AI Upgrade Foundation", price: "HK$26,000", fit: "Für 3-5 Kernbeteiligte, die 1-2 Workflows und das erste überprüfbare Adoption-Ergebnis erarbeiten.", points: ["SOP v1 und Ownership", "Monatlicher Checkpoint", "KPI-Review", "Ein praktisches Teamtraining"], featured: true },
        { name: "6-Monate AI Upgrade Accelerator", price: "HK$50,000", fit: "Für ein kleines Kernteam oder Abteilungsvertreter mit 3-4 verbundenen Workflows und Adoption-Tracking.", points: ["Agile Reviews", "SOP v2", "Adoption-Review", "Bis zu 2 Workshops"] },
        { name: "12-Monate Partnership", price: "HK$98,000", fit: "Für Management / Kern-Owner, die nach validierter Richtung langfristige AI-Adoption-Governance aufbauen.", points: ["Jahres-Roadmap", "Abteilungsübergreifende Priorisierung", "SOP-Governance", "Management-Reviews"] },
      ],
      note: "Dies sind keine Softwarepakete und keine Preise für 20-Personen-Focus-Groups. Größere Focus Groups, abteilungsübergreifende Workshops, zusätzliche Trainings oder mehr Stakeholder werden nach Teilnehmerzahl, Sessions und Vorbereitung separat angeboten.",
      cta: "30-Minuten-Workflow-Review buchen",
    },
    useCases: {
      eyebrow: "Beispiel-Workflow",
      title: "Einen konkreten Workflow validieren, bevor ein System entschieden wird.",
      cards: content.en.useCases.cards,
    },
    proof: {
      eyebrow: "Relevante Erfahrung & Lieferfähigkeit",
      title: "Relevante Erfahrung und Lieferfähigkeit",
      columns: content.en.proof.columns,
    },
    founder: {
      eyebrow: "Über den Gründer",
      title: "Gründergeführte AI Business Consultancy",
      body:
        "Wir empfehlen nicht sofort einen System-Neubau. Zuerst klären wir Workflow und KPIs und testen mit dem Team die wertvollste Verbesserung. Erst wenn der Bedarf validiert ist, empfehlen wir passende Tools oder Systeme.",
      support:
        "Die Rolle ist praktischer B2B-Berater plus technischer Umsetzungspartner: erst die Arbeitsweise verstehen, dann entscheiden, ob AI, Automation, CRM oder SaaS sinnvoll ist.",
    },
    faq: {
      title: "FAQ zu AI Business Upgrade",
      items: content.en.faq.items,
    },
    finalCta: {
      title: "Drei Minuten prüfen, bevor der nächste Schritt entschieden wird.",
      body:
        "Wenn ein Workflow bereits klar blockiert ist, buche einen 30-Minuten-Review. Wenn der Startpunkt unklar ist, beginne mit dem Workflow Health Check.",
      health: "Programmpreise ansehen",
      book: "30-Minuten-Review buchen",
    },
    capabilities: {
      eyebrow: "Fähigkeiten / Solutions",
      title: "Systemimplementierung nach Bedarf",
      intro:
        "EventXP, SmartSales CRM, Accounting Chatbot, Dashboards, Booking Portals und AI Agents sind Implementierungsfähigkeiten, nicht der Startpunkt. Sie werden erst nach Workflow-, KPI- und Business-Case-Validierung berücksichtigt.",
      items: content.en.capabilities.items,
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
  const c = contentFor(locale);
  const localePrefix = locale === "en" ? "" : `/${locale}`;

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

      <PricingFunnelSections
        locale={locale}
        bookingHref={bookingHref}
        eventXpHref={`${localePrefix}/eventxp`}
        smartSalesHref={`${localePrefix}/smartsales-crm`}
      />

      <section id="why-innovatexp" className="mb-16 scroll-mt-[var(--header-offset)] rounded-3xl border border-brand-primary/25 bg-white p-6 shadow-card dark:border-teal-500/30 dark:bg-slate-900 md:p-10">
        <SectionIntro eyebrow={c.whyUs.eyebrow} title={c.whyUs.title} intro={c.whyUs.intro} />
        <div className="grid gap-4 md:grid-cols-2">
          {c.whyUs.points.map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">
              <div className="mb-3 flex items-center gap-2">
                <Wrench className="h-5 w-5 text-brand-primary dark:text-teal-300" aria-hidden />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="ai-coaching-pricing" className="mb-16 scroll-mt-[var(--header-offset)] rounded-3xl border border-brand-primary/25 bg-white p-6 shadow-card dark:border-teal-500/30 dark:bg-slate-900 md:p-10">
        <SectionIntro eyebrow={c.pricing.eyebrow} title={c.pricing.title} intro={c.pricing.intro} />
        <div className="grid gap-5 lg:grid-cols-4">
          {c.pricing.plans.map((plan, planIndex) => (
            <article
              key={plan.name}
              className={`flex h-full flex-col rounded-2xl border p-5 shadow-sm ${
                "featured" in plan && plan.featured
                  ? "border-brand-primary/55 bg-gradient-to-br from-cyan-50 via-white to-amber-50 dark:border-teal-500/50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-900"
                  : "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800"
              }`}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
              <p className="mt-3 text-lg font-extrabold text-brand-primary dark:text-teal-300">{consultancyPlanPrice(planIndex, locale)}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{plan.fit}</p>
              <ul className="mt-5 grid flex-1 gap-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {plan.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="font-bold text-brand-primary dark:text-teal-300">✓</span>
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
        <p className="mx-auto mt-6 max-w-3xl rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center text-sm leading-relaxed text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          {c.pricing.note}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <AddToInquiryButton itemId="discoverySprint30Day" fullWidth={false} />
          <Button href={bookingHref}>{c.pricing.cta}</Button>
        </div>
      </section>

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
          <Button href="#ai-coaching-pricing">{c.finalCta.health}</Button>
          <Button href={bookingHref} variant="outline">{c.finalCta.book}</Button>
        </div>
      </section>

      <section id="capabilities" className="mb-16 scroll-mt-[var(--header-offset)] rounded-3xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-700 dark:bg-slate-900 md:p-10">
        <SectionIntro eyebrow={c.capabilities.eyebrow} title={c.capabilities.title} intro={c.capabilities.intro} />
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          {c.capabilities.items.map((item, index) => {
            const icons = [MessageSquareText, BarChart3, Bot];
            const Icon = icons[index] ?? Bot;
            const href = item.href.startsWith("#") ? item.href : `${localePrefix}${item.href}`;
            return (
              <a
                key={item.name}
                href={href}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:border-brand-primary/50 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
              >
                <Icon className="mb-3 h-7 w-7 text-brand-primary dark:text-teal-300" aria-hidden />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{item.body}</p>
                <span className="mt-4 text-sm font-semibold text-brand-primary group-hover:underline dark:text-teal-300">
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
