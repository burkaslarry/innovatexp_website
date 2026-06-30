import type { AppLocale } from "@/lib/i18n-routing";
import type { CaseStudyContent } from "@/types/marketing";

export const caseStudies: CaseStudyContent[] = [
  {
    slug: "eventxp-event-follow-up",
    title: "EventXP: event attendance to buyer intelligence",
    summary:
      "EventXP turns event attendance records into cleaner follow-up signals for organizers, communities, and training teams.",
    context:
      "Event teams often finish an event with spreadsheets, attendance marks, and scattered notes. The business value depends on what happens next: who attended, who showed interest, and who deserves follow-up.",
    proofType: "product",
    audience: "Event organizers, JCI/BNI-style communities, training providers, and membership groups.",
    challenge: [
      "Manual check-in creates inconsistent attendance records.",
      "Post-event follow-up is delayed because lists need cleanup first.",
      "Organizers struggle to compare attendee quality across repeat events.",
    ],
    approach: [
      "Design a structured check-in and attendance model.",
      "Prepare reporting views that can support follow-up prioritization.",
      "Connect event operations with sales or membership next actions.",
    ],
    deliverables: [
      "Event profile and attendee data structure.",
      "QR/check-in flow and attendance visibility.",
      "Post-event reporting and follow-up segmentation concept.",
    ],
    outcomes: [
      "Cleaner event operations and fewer manual reconciliation steps.",
      "A practical base for buyer intelligence and follow-up planning.",
      "Better continuity between event attendance, sales follow-up, and community engagement.",
    ],
    relatedLinks: [
      { label: "EventXP", href: "/eventxp" },
      { label: "SME AI Workflow", href: "/sme-ai-workflow" },
    ],
  },
  {
    slug: "smartsales-whatsapp-crm",
    title: "SmartSales CRM: WhatsApp-first sales follow-up automation",
    summary:
      "SmartSales CRM helps chat-led teams structure leads, next actions, and sales follow-up without enterprise CRM overhead.",
    context:
      "Many Hong Kong SMEs run sales through WhatsApp, inboxes, spreadsheets, and memory. The risk is not only missing a lead; it is losing the shared context needed for consistent follow-up.",
    proofType: "product",
    audience: "3-15 person sales teams, service SMEs, B2B consultants, and founder-led businesses.",
    challenge: [
      "Customer messages arrive faster than teams can organize them.",
      "Managers lack pipeline visibility without micromanaging each chat.",
      "Follow-up quality depends too much on individual habits.",
    ],
    approach: [
      "Structure the lead pipeline around chat-led work.",
      "Define ownership, stages, reminders, and next actions.",
      "Use AI support for drafts and prioritization while keeping human approval.",
    ],
    deliverables: [
      "WhatsApp-friendly CRM workflow model.",
      "Lead stages, contact context, task reminders, and reporting views.",
      "AI-assisted draft and follow-up patterns where suitable.",
    ],
    outcomes: [
      "A clearer sales operating rhythm for busy SME teams.",
      "Less dependence on memory and scattered spreadsheets.",
      "Better visibility for owners and managers reviewing weekly pipeline progress.",
    ],
    relatedLinks: [
      { label: "SmartSales CRM", href: "/smartsales-crm" },
      { label: "Proposal-to-Cash AI", href: "/proposal-to-cash-ai" },
    ],
  },
  {
    slug: "ai-training-jci-peninsula",
    title: "AI workshop/demo sessions for JCI Peninsula",
    summary:
      "InnovateXP has delivered practical AI workshop/demo sessions for JCI Peninsula, connecting AI tools with real business usage.",
    context:
      "Business communities need AI sessions that are clear enough for non-technical participants but practical enough to inspire real workflow changes afterwards.",
    proofType: "training",
    audience: "Business communities, schools, SMEs, and professional groups exploring AI adoption.",
    challenge: [
      "Participants have different AI maturity levels.",
      "Generic AI demos do not always connect to local business workflows.",
      "Teams need confidence and examples before implementation.",
    ],
    approach: [
      "Use practical demonstrations and local business scenarios.",
      "Explain AI strengths, limitations, and review habits.",
      "Connect tool usage with next-step implementation opportunities.",
    ],
    deliverables: [
      "Workshop/demo content for AI tools and workflow thinking.",
      "Practical examples for business teams.",
      "Follow-up paths into AI coaching or workflow implementation.",
    ],
    outcomes: [
      "Participants gain a clearer understanding of what AI can and cannot do.",
      "Business teams can identify realistic AI workflow candidates.",
      "AI learning becomes a bridge to adoption rather than a one-off seminar.",
    ],
    relatedLinks: [
      { label: "AI Training", href: "/ai-training" },
      { label: "AI Coaching", href: "/ai-coaching" },
    ],
  },
  {
    slug: "system-rescue-clean-architecture",
    title: "System rescue, technical audit, and clean architecture refactor",
    summary:
      "InnovateXP can review fragile systems, clarify architecture boundaries, and refactor toward maintainable delivery.",
    context:
      "Some AI or web projects fail not because the idea is wrong, but because the codebase becomes hard to change. A technical audit can reveal whether the next step should be refactor, rebuild, or workflow redesign.",
    proofType: "technical-audit",
    audience: "SMEs with unstable web apps, booking flows, dashboards, admin portals, or internal systems.",
    challenge: [
      "Business logic is mixed into UI pages or scripts.",
      "Content, routes, API calls, and analytics are hard to maintain.",
      "The team wants AI features but the current codebase cannot safely support them.",
    ],
    approach: [
      "Inspect architecture, data flow, dependencies, and failure points.",
      "Separate framework-specific code from content, domain, and reusable UI.",
      "Prioritize the smallest set of changes that reduces delivery risk.",
    ],
    deliverables: [
      "Technical audit notes and risk map.",
      "Refactor plan for content/domain/UI/route separation.",
      "Targeted implementation or rescue sprint where appropriate.",
    ],
    outcomes: [
      "A clearer system boundary for future AI and automation work.",
      "Reduced maintenance risk and easier onboarding for future developers.",
      "Better foundation for SEO, GEO, analytics, and reliable user flows.",
    ],
    relatedLinks: [
      { label: "SME AI Workflow", href: "/sme-ai-workflow" },
      { label: "AI-era Quality", href: "/ai-era-quality" },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudyContent | undefined {
  return caseStudies.find((item) => item.slug === slug);
}

const caseStudiesZhTw: CaseStudyContent[] = [
  {
    ...caseStudies[0],
    title: "EventXP：由活動出席紀錄走向 buyer intelligence",
    summary: "EventXP 將活動出席資料整理成更清晰的後續跟進訊號，適合活動主辦、社群與培訓團隊。",
    context: "活動結束後，團隊常只剩試算表、簽到紀錄與零散 notes。真正的商業價值取決於下一步：誰有出席、誰有興趣、誰值得優先跟進。",
    audience: "活動主辦、JCI/BNI 類型社群、培訓機構與會員制團體。",
    challenge: ["人手簽到容易產生不一致的出席紀錄。", "名單需要清理，導致活動後跟進延遲。", "主辦方難以比較不同活動的參與品質。"],
    approach: ["設計結構化 check-in 與 attendance model。", "準備支援 follow-up prioritization 的 reporting views。", "把活動營運連接到 sales 或 membership next actions。"],
    deliverables: ["活動 profile 與 attendee data structure。", "QR/check-in flow 與 attendance visibility。", "活動後 reporting 與 follow-up segmentation concept。"],
    outcomes: ["活動營運更清晰，減少手動整理。", "建立 buyer intelligence 與 follow-up planning 的基礎。", "活動出席、銷售跟進與社群經營之間更有延續性。"],
  },
  {
    ...caseStudies[1],
    title: "SmartSales CRM：WhatsApp-first 銷售跟進自動化",
    summary: "SmartSales CRM 協助以 WhatsApp 為主要溝通渠道的團隊整理 leads、next actions 與 sales follow-up。",
    context: "許多香港中小企業以 WhatsApp、inbox、試算表與記憶管理銷售。風險不只是漏掉 lead，而是失去團隊共享的客戶情境。",
    audience: "3-15 人 sales teams、服務型 SME、B2B consultants 與 founder-led businesses。",
    challenge: ["客戶訊息進來太快，團隊來不及整理。", "管理者缺乏 pipeline visibility。", "跟進品質太依賴個人習慣。"],
    approach: ["圍繞 chat-led work 設計 lead pipeline。", "定義 ownership、stages、reminders 與 next actions。", "使用 AI 支援草稿與 prioritization，但保留 human approval。"],
    deliverables: ["WhatsApp-friendly CRM workflow model。", "Lead stages、contact context、task reminders 與 reporting views。", "適合時加入 AI-assisted draft 與 follow-up patterns。"],
    outcomes: ["忙碌 SME 團隊有更清晰的 sales operating rhythm。", "降低對記憶與零散試算表的依賴。", "老闆與 managers 每週 review pipeline 時更有可視性。"],
  },
  {
    ...caseStudies[2],
    title: "JCI Peninsula AI workshop/demo sessions",
    summary: "InnovateXP 曾為 JCI Peninsula 提供實務 AI workshop/demo sessions，將 AI tools 連接到真實商務使用場景。",
    context: "Business communities 需要 AI sessions 既能讓非技術參加者理解，也能啟發實際 workflow changes。",
    audience: "Business communities、學校、中小企業與探索 AI adoption 的專業團體。",
    challenge: ["參加者 AI 成熟度不同。", "Generic AI demos 不一定連接到本地商務流程。", "團隊需要信心與例子，才會進一步實作。"],
    approach: ["使用 practical demonstrations 與 local business scenarios。", "說明 AI strengths、limitations 與 review habits。", "把工具使用連接到下一步 AI coaching 或 workflow implementation。"],
    deliverables: ["AI tools 與 workflow thinking 的 workshop/demo content。", "給 business teams 的 practical examples。", "後續 AI coaching 或 workflow implementation 路徑。"],
    outcomes: ["參加者更清楚 AI 能做什麼與不能做什麼。", "Business teams 可辨識實際 AI workflow candidates。", "AI learning 成為 adoption 的起點，而非一次性 seminar。"],
  },
  {
    ...caseStudies[3],
    title: "System rescue、technical audit 與 clean architecture refactor",
    summary: "InnovateXP 可檢視脆弱系統、釐清 architecture boundaries，並重構至更容易維護的 delivery structure。",
    context: "有些 AI 或 web projects 失敗，不是 idea 錯，而是 codebase 太難改。Technical audit 可判斷下一步應 refactor、rebuild 或 workflow redesign。",
    audience: "已有不穩定 web apps、booking flows、dashboards、admin portals 或 internal systems 的 SME。",
    challenge: ["Business logic 混在 UI pages 或 scripts。", "Content、routes、API calls 與 analytics 難以維護。", "團隊想加 AI features，但現有 codebase 支撐不了。"],
    approach: ["檢查 architecture、data flow、dependencies 與 failure points。", "分離 framework-specific code、content、domain 與 reusable UI。", "優先處理最能降低 delivery risk 的小步改動。"],
    deliverables: ["Technical audit notes 與 risk map。", "Content/domain/UI/route separation refactor plan。", "依需要進行 targeted implementation 或 rescue sprint。"],
    outcomes: ["未來 AI 與 automation work 有更清晰的 system boundary。", "降低維護風險，讓 future developers 更易接手。", "SEO、GEO、analytics 與 reliable user flows 有更好基礎。"],
  },
];

const caseStudiesJa: CaseStudyContent[] = [
  {
    ...caseStudies[0],
    title: "EventXP：イベント出席データから buyer intelligence へ",
    summary: "EventXP はイベント出席記録を整理し、主催者・コミュニティ・研修チームのフォローアップ判断を支援します。",
    context: "イベント後に残るのは表計算、出席印、断片的なメモになりがちです。価値は、誰が参加し、誰に関心があり、誰を優先フォローすべきかを見極めることにあります。",
    audience: "イベント主催者、JCI/BNI 型コミュニティ、研修提供者、会員組織。",
    challenge: ["手作業チェックインでは出席記録が不揃いになりやすい。", "リスト整理に時間がかかり、フォローアップが遅れる。", "複数イベント間で参加品質を比較しにくい。"],
    approach: ["構造化された check-in と attendance model を設計。", "フォロー優先度を判断できる reporting views を準備。", "イベント運営を sales または membership next actions に接続。"],
    deliverables: ["イベント profile と attendee data structure。", "QR/check-in flow と attendance visibility。", "イベント後 reporting と follow-up segmentation concept。"],
    outcomes: ["イベント運営が整理され、手作業の照合作業が減る。", "buyer intelligence と follow-up planning の土台ができる。", "出席、営業フォロー、コミュニティ運営の連続性が高まる。"],
  },
  {
    ...caseStudies[1],
    title: "SmartSales CRM：WhatsApp-first sales follow-up automation",
    summary: "SmartSales CRM は chat-led チームが leads、next actions、sales follow-up を整理するための実務型 CRM です。",
    context: "香港の多くの SME は WhatsApp、inbox、表計算、記憶で営業を管理しています。リスクは lead を逃すだけでなく、共有すべき顧客文脈を失うことです。",
    audience: "3-15 名の sales teams、サービス SME、B2B consultants、founder-led businesses。",
    challenge: ["顧客メッセージが多く、整理が追いつかない。", "管理者が pipeline visibility を得にくい。", "フォロー品質が個人習慣に依存しすぎる。"],
    approach: ["chat-led work を中心に lead pipeline を構造化。", "ownership、stages、reminders、next actions を定義。", "AI は下書きと prioritization を支援し、human approval を残す。"],
    deliverables: ["WhatsApp-friendly CRM workflow model。", "Lead stages、contact context、task reminders、reporting views。", "必要に応じた AI-assisted draft と follow-up patterns。"],
    outcomes: ["忙しい SME チームに営業のリズムが生まれる。", "記憶と散らばった表計算への依存が減る。", "経営者・manager が週次 pipeline を見やすくなる。"],
  },
  {
    ...caseStudies[2],
    title: "JCI Peninsula 向け AI workshop/demo sessions",
    summary: "InnovateXP は JCI Peninsula に実践的な AI workshop/demo sessions を提供し、AI ツールを実業務につなげました。",
    context: "Business communities には、非技術者にもわかりやすく、実際の workflow change につながる AI セッションが必要です。",
    audience: "Business communities、学校、SME、AI adoption を検討する専門団体。",
    challenge: ["参加者の AI 成熟度が異なる。", "一般的な AI demo は地域の業務フローにつながりにくい。", "実装へ進むには自信と具体例が必要。"],
    approach: ["実演と local business scenarios を使用。", "AI strengths、limitations、review habits を説明。", "ツール利用を AI coaching または workflow implementation へ接続。"],
    deliverables: ["AI tools と workflow thinking の workshop/demo content。", "Business teams 向け practical examples。", "次の AI coaching または workflow implementation path。"],
    outcomes: ["参加者が AI の可能性と限界を理解する。", "Business teams が現実的な AI workflow candidates を見つけられる。", "AI learning が一回限りの seminar ではなく adoption の入口になる。"],
  },
  {
    ...caseStudies[3],
    title: "System rescue、technical audit、clean architecture refactor",
    summary: "InnovateXP は不安定なシステムをレビューし、architecture boundaries を明確にして保守しやすい構造へ改善します。",
    context: "AI や web projects が失敗する理由は idea ではなく、codebase が変えにくいことの場合があります。Technical audit は refactor、rebuild、workflow redesign の判断材料になります。",
    audience: "不安定な web apps、booking flows、dashboards、admin portals、internal systems を持つ SME。",
    challenge: ["Business logic が UI pages や scripts に混在している。", "Content、routes、API calls、analytics が保守しにくい。", "AI features を追加したいが現行 codebase が耐えられない。"],
    approach: ["architecture、data flow、dependencies、failure points を確認。", "framework-specific code、content、domain、reusable UI を分離。", "delivery risk を下げる最小変更から優先。"],
    deliverables: ["Technical audit notes と risk map。", "Content/domain/UI/route separation の refactor plan。", "必要に応じた targeted implementation または rescue sprint。"],
    outcomes: ["今後の AI/automation work の system boundary が明確になる。", "保守リスクが下がり future developers が入りやすい。", "SEO、GEO、analytics、reliable user flows の基盤が整う。"],
  },
];

const caseStudiesDe: CaseStudyContent[] = [
  {
    ...caseStudies[0],
    title: "EventXP: von Event-Teilnahme zu Buyer Intelligence",
    summary: "EventXP verwandelt Event-Anwesenheitsdaten in klarere Follow-up-Signale für Organisatoren, Communities und Trainingsteams.",
    context: "Nach Events bleiben oft Tabellen, Anwesenheitsmarkierungen und verstreute Notizen. Der Wert entsteht danach: wer war da, wer zeigte Interesse und wer verdient priorisiertes Follow-up.",
    audience: "Event-Organisatoren, JCI/BNI-ähnliche Communities, Trainingsanbieter und Mitgliedergruppen.",
    challenge: ["Manuelles Check-in erzeugt inkonsistente Anwesenheitsdaten.", "Listen müssen erst bereinigt werden, wodurch Follow-up verzögert wird.", "Teilnahmequalität ist über wiederkehrende Events schwer vergleichbar."],
    approach: ["Strukturiertes Check-in- und Attendance-Modell entwerfen.", "Reporting Views für Follow-up-Priorisierung vorbereiten.", "Event Operations mit Sales- oder Membership-Next-Actions verbinden."],
    deliverables: ["Event-Profil und attendee data structure.", "QR/check-in flow und attendance visibility.", "Post-event reporting und follow-up segmentation concept."],
    outcomes: ["Klarere Event Operations und weniger manuelle Abstimmung.", "Basis für buyer intelligence und follow-up planning.", "Bessere Verbindung zwischen Teilnahme, Sales Follow-up und Community Engagement."],
  },
  {
    ...caseStudies[1],
    title: "SmartSales CRM: WhatsApp-first Sales Follow-up Automation",
    summary: "SmartSales CRM hilft chat-led Teams, Leads, Next Actions und Sales Follow-up ohne Enterprise-CRM-Overhead zu strukturieren.",
    context: "Viele KMUs in Hongkong steuern Sales über WhatsApp, Inboxes, Tabellen und Gedächtnis. Das Risiko ist nicht nur ein verpasster Lead, sondern verlorener Kundenkontext.",
    audience: "Sales Teams mit 3-15 Personen, Service-KMUs, B2B-Berater und founder-led businesses.",
    challenge: ["Kundennachrichten kommen schneller rein, als Teams sie organisieren können.", "Manager haben wenig pipeline visibility.", "Follow-up-Qualität hängt zu stark von Einzelgewohnheiten ab."],
    approach: ["Lead pipeline um chat-led work strukturieren.", "Ownership, stages, reminders und next actions definieren.", "AI für Drafts und Priorisierung nutzen, human approval behalten."],
    deliverables: ["WhatsApp-friendly CRM workflow model.", "Lead stages, contact context, task reminders und reporting views.", "AI-assisted draft und follow-up patterns, wo passend."],
    outcomes: ["Klarerer Sales Operating Rhythm für KMU-Teams.", "Weniger Abhängigkeit von Gedächtnis und verstreuten Tabellen.", "Bessere wöchentliche Pipeline-Sicht für Owner und Manager."],
  },
  {
    ...caseStudies[2],
    title: "AI workshop/demo sessions für JCI Peninsula",
    summary: "InnovateXP hat praktische AI workshop/demo sessions für JCI Peninsula geliefert und AI-Tools mit realem Business-Einsatz verbunden.",
    context: "Business Communities brauchen AI-Sessions, die für Nicht-Techniker verständlich sind und trotzdem echte Workflow-Veränderungen anstoßen.",
    audience: "Business Communities, Schulen, KMUs und professionelle Gruppen mit AI-Adoption-Interesse.",
    challenge: ["Teilnehmende haben unterschiedliche AI-Reifegrade.", "Generische AI-Demos passen nicht immer zu lokalen Business-Workflows.", "Teams brauchen Vertrauen und Beispiele vor der Umsetzung."],
    approach: ["Praktische Demonstrationen und local business scenarios nutzen.", "AI strengths, limitations und review habits erklären.", "Tool-Nutzung mit AI coaching oder workflow implementation verbinden."],
    deliverables: ["Workshop/demo content für AI tools und workflow thinking.", "Praktische Beispiele für Business Teams.", "Follow-up-Pfade zu AI coaching oder workflow implementation."],
    outcomes: ["Teilnehmende verstehen besser, was AI kann und was nicht.", "Business Teams erkennen realistische AI workflow candidates.", "AI learning wird Brücke zur Adoption statt einmaligem Seminar."],
  },
  {
    ...caseStudies[3],
    title: "System rescue, technical audit und Clean-Architecture-Refactor",
    summary: "InnovateXP prüft fragile Systeme, klärt architecture boundaries und refaktoriert in Richtung wartbarer Delivery.",
    context: "AI- oder Web-Projekte scheitern manchmal nicht an der Idee, sondern daran, dass die Codebase schwer änderbar wird. Ein technical audit hilft bei der Entscheidung: refactor, rebuild oder workflow redesign.",
    audience: "KMUs mit instabilen Web Apps, Buchungsflows, Dashboards, Admin Portals oder internen Systemen.",
    challenge: ["Business logic ist in UI pages oder scripts vermischt.", "Content, routes, API calls und analytics sind schwer wartbar.", "Das Team will AI features, aber die aktuelle Codebase trägt sie nicht sicher."],
    approach: ["Architecture, data flow, dependencies und failure points prüfen.", "Framework-specific code von content, domain und reusable UI trennen.", "Kleinste Änderungen priorisieren, die delivery risk reduzieren."],
    deliverables: ["Technical audit notes und risk map.", "Refactor plan für content/domain/UI/route separation.", "Targeted implementation oder rescue sprint, wo sinnvoll."],
    outcomes: ["Klarere system boundary für künftige AI- und Automation-Arbeit.", "Weniger Wartungsrisiko und leichteres Onboarding zukünftiger Entwickler.", "Bessere Grundlage für SEO, GEO, analytics und zuverlässige User Flows."],
  },
];

export function getCaseStudies(locale: AppLocale): CaseStudyContent[] {
  switch (locale) {
    case "zh-hk":
    case "zh-tw":
      return caseStudiesZhTw;
    case "ja":
      return caseStudiesJa;
    case "de":
      return caseStudiesDe;
    default:
      return caseStudies;
  }
}
