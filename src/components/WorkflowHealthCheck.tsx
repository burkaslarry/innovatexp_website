"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { AppLocale } from "@/lib/i18n-routing";

type Lang = "en" | "zh";

type HealthCheckState = {
  industry: string;
  teamSize: string;
  workflow: string;
  currentTools: string[];
  weeklyHours: string;
  failureMode: string;
  singlePersonDependency: string;
  sopStatus: string;
  kpi: string;
  urgency: string;
  internalOwner: string;
  pilotInvestment: string;
};

type LeadState = {
  name: string;
  email: string;
  whatsapp: string;
  company: string;
  consent: boolean;
};

const initialState: HealthCheckState = {
  industry: "",
  teamSize: "",
  workflow: "",
  currentTools: [],
  weeklyHours: "",
  failureMode: "",
  singlePersonDependency: "",
  sopStatus: "",
  kpi: "",
  urgency: "",
  internalOwner: "",
  pilotInvestment: "",
};

const initialLeadState: LeadState = {
  name: "",
  email: "",
  whatsapp: "",
  company: "",
  consent: false,
};

const copy = {
  zh: {
    eyebrow: "3 分鐘流程健康檢查",
    title: "先揀一個最值得改善的流程。",
    intro:
      "這不是報價表，也不會要求你輸入客戶資料、財務數字或營運機密。只需回答基本情況，幫你判斷應先做流程梳理、AI 試行，還是已經適合評估 automation / SaaS。",
    privacy:
      "私隱提示：請勿在公開表格輸入客戶姓名、電話、合約、薪酬、財務明細或任何敏感資料。這個檢查只用作初步流程判斷，答案只會留在此頁面完成結果顯示。",
    required: "請完成所有題目，先可以查看建議下一步。",
    submit: "查看建議下一步",
    reset: "重新填寫",
    resultTitle: "初步建議",
    result:
      "你目前最適合先做流程梳理，未必需要立即開發系統。預約 30 分鐘，揀一個最值得改善嘅流程。",
    resultDetail:
      "如果你有內部負責人、願意提供基本流程資料，下一步可以做 30 日 Discovery Sprint：梳理一個核心流程、建立 SOP / KPI baseline，並驗證一個 AI 或 automation quick win。",
    book: "預約 30 分鐘流程診斷",
    leadTitle: "想我跟進？可自願留下聯絡方法",
    leadIntro:
      "只需留下公司、email 和 WhatsApp，並同意 InnovateXP 用這次流程健康檢查內容聯絡你。不會要求你在公開表格提供客戶名單或敏感資料。",
    leadName: "稱呼（選填）",
    leadEmail: "Email",
    leadWhatsapp: "WhatsApp",
    leadCompany: "公司 / 機構",
    consent:
      "我同意 InnovateXP 使用以上聯絡資料及本次問卷答案，就 AI 商業升級、流程診斷或 30 日 Discovery Sprint 與我聯絡。",
    leadSubmit: "送出並請 InnovateXP 跟進",
    leadSending: "送出中...",
    leadSuccess: "已收到，InnovateXP 會跟進。",
    leadRequired: "請填寫公司、有效 email、WhatsApp，並勾選同意。",
    leadFail: "暫時未能送出，請直接預約 30 分鐘流程診斷。",
    questions: {
      industry: "你的行業最接近哪一類？",
      teamSize: "團隊人數大約是？",
      workflow: "最想先改善哪一條流程？",
      currentTools: "現在主要靠哪些工具處理？",
      weeklyHours: "每星期大約花多少人手時間在這條流程？",
      failureMode: "最常出現的問題是？",
      singlePersonDependency: "是否依賴某一位老闆或資深同事才做得順？",
      sopStatus: "目前 SOP 狀態如何？",
      kpi: "最想改善哪個 KPI？",
      urgency: "改善急切程度？",
      internalOwner: "內部是否有人可以負責試行和 checkpoint？",
      pilotInvestment: "如果方向清晰，是否願意投資一個小型 pilot？",
    },
    options: {
      industry: ["培訓機構 / 課程營運", "專業服務 / 顧問 / Agency", "教育 / 會員 / 社群", "工程 / 商業服務", "其他 SME"],
      teamSize: ["1–2 人", "3–10 人", "11–30 人", "31–100 人", "100+ 人"],
      workflow: ["課程報名、付款、出席與學員跟進", "報價、銷售查詢與 follow-up", "HR 審批、收據與會計行政", "SOP / 知識管理 / 內部培訓", "其他重複流程"],
      currentTools: ["Excel / Google Sheets", "WhatsApp", "Google Forms / Typeform", "Email", "Paper / PDF", "CRM / SaaS", "Accounting / HR tool"],
      weeklyHours: ["少於 3 小時", "3–8 小時", "9–20 小時", "20 小時以上", "不確定"],
      failureMode: ["回覆慢", "容易錯漏", "資料版本不一致", "交接困難", "跟進遺漏", "團隊不願使用新工具"],
      singlePersonDependency: ["是，非常依賴一個人", "部分依賴", "不太依賴", "不確定"],
      sopStatus: ["主要在腦中", "有簡單文字記錄", "有 SOP 但很少更新", "有清晰 SOP 和負責人", "不確定"],
      kpi: ["處理時間", "錯漏率", "回覆速度", "完成率", "團隊採用率", "管理層可視性"],
      urgency: ["今個月要處理", "1–3 個月內", "3–6 個月內", "只是先了解"],
      internalOwner: ["有，已知道是誰", "可能有，但未確認", "暫時沒有", "不確定"],
      pilotInvestment: ["願意先做 30 日 Discovery Sprint", "可能願意，想先了解範圍", "暫時未準備投資", "只想了解工具"],
    },
  },
  en: {
    eyebrow: "3-minute Workflow Health Check",
    title: "Pick one workflow worth fixing first.",
    intro:
      "This is not a quotation form. Please do not enter customer data, financial details, or operational secrets. The goal is to decide whether you should start with workflow mapping, an AI trial, or a validated automation / SaaS discussion.",
    privacy:
      "Privacy note: do not enter customer names, phone numbers, contracts, payroll, financial details, or sensitive operational data. This check is for initial workflow triage only and stays on this page to show your result.",
    required: "Please complete every question before viewing the recommendation.",
    submit: "Show my next step",
    reset: "Start again",
    resultTitle: "Initial recommendation",
    result:
      "You are most likely better served by workflow clarification first. You may not need custom software yet. Book 30 minutes and choose one workflow worth improving.",
    resultDetail:
      "If you have an internal owner and can provide basic workflow context, the next step is a 30-day Discovery Sprint: map one core workflow, draft SOP / KPI baseline, and validate one AI or automation quick win.",
    book: "Book a 30-minute Workflow Review",
    leadTitle: "Want follow-up? You can voluntarily leave your contact details",
    leadIntro:
      "Leave your company, email, and WhatsApp only if you want InnovateXP to follow up on this workflow health check. Do not enter customer lists or sensitive operational data in this public form.",
    leadName: "Name (optional)",
    leadEmail: "Email",
    leadWhatsapp: "WhatsApp",
    leadCompany: "Company / organisation",
    consent:
      "I consent to InnovateXP using my contact details and questionnaire answers to follow up about AI Business Upgrade, workflow review, or a 30-day Discovery Sprint.",
    leadSubmit: "Submit and request follow-up",
    leadSending: "Sending...",
    leadSuccess: "Received. InnovateXP will follow up.",
    leadRequired: "Please enter company, valid email, WhatsApp, and tick consent.",
    leadFail: "Could not submit right now. Please book a 30-minute Workflow Review directly.",
    questions: {
      industry: "Which industry best describes you?",
      teamSize: "Approximate team size?",
      workflow: "Which workflow should improve first?",
      currentTools: "Which tools do you currently rely on?",
      weeklyHours: "How many manual hours per week does this workflow take?",
      failureMode: "What fails most often?",
      singlePersonDependency: "Does this depend on one owner or senior employee?",
      sopStatus: "What is the current SOP status?",
      kpi: "Which KPI should improve first?",
      urgency: "How urgent is this?",
      internalOwner: "Is there an internal owner for trial and checkpoints?",
      pilotInvestment: "If the direction is clear, would you invest in a small pilot?",
    },
    options: {
      industry: ["Training provider / course operator", "Professional services / consulting / agency", "Education / membership / community", "Engineering / business services", "Other SME"],
      teamSize: ["1–2 people", "3–10 people", "11–30 people", "31–100 people", "100+ people"],
      workflow: ["Course enrolment, payment, attendance, learner follow-up", "Quotations, sales enquiries, follow-up", "HR approvals, receipts, accounting admin", "SOP / knowledge management / internal training", "Other repeat workflow"],
      currentTools: ["Excel / Google Sheets", "WhatsApp", "Google Forms / Typeform", "Email", "Paper / PDF", "CRM / SaaS", "Accounting / HR tool"],
      weeklyHours: ["Under 3 hours", "3–8 hours", "9–20 hours", "20+ hours", "Not sure"],
      failureMode: ["Slow response", "Errors", "Different versions of truth", "Difficult handover", "Missed follow-up", "Low tool adoption"],
      singlePersonDependency: ["Yes, heavily dependent", "Partly dependent", "Not very dependent", "Not sure"],
      sopStatus: ["Mostly in people’s heads", "Simple notes exist", "SOP exists but rarely updated", "Clear SOP and owner", "Not sure"],
      kpi: ["Processing time", "Error rate", "Response time", "Completion rate", "Team adoption", "Management visibility"],
      urgency: ["This month", "Within 1–3 months", "Within 3–6 months", "Just exploring"],
      internalOwner: ["Yes, we know who", "Probably, not confirmed", "Not yet", "Not sure"],
      pilotInvestment: ["Ready for a 30-day Discovery Sprint", "Maybe, want scope first", "Not ready to invest yet", "Only asking about tools"],
    },
  },
} satisfies Record<Lang, {
  eyebrow: string;
  title: string;
  intro: string;
  privacy: string;
  required: string;
  submit: string;
  reset: string;
  resultTitle: string;
  result: string;
  resultDetail: string;
  book: string;
  leadTitle: string;
  leadIntro: string;
  leadName: string;
  leadEmail: string;
  leadWhatsapp: string;
  leadCompany: string;
  consent: string;
  leadSubmit: string;
  leadSending: string;
  leadSuccess: string;
  leadRequired: string;
  leadFail: string;
  questions: Record<keyof HealthCheckState, string>;
  options: Record<keyof HealthCheckState, string[]>;
}>;

const localizedCopy = {
  en: copy.en,
  "zh-hk": copy.zh,
  "zh-tw": {
    ...copy.zh,
    title: "先選一個最值得改善的流程。",
    intro:
      "這不是報價表，也不會要求你輸入客戶資料、財務數字或營運機密。只要回答基本情況，就能初步判斷應先做流程梳理、AI 試行，或進一步評估 automation / SaaS。",
    privacy:
      "隱私提醒：請勿在公開表單輸入客戶姓名、電話、合約、薪資、財務明細或任何敏感資料。這份檢查只用於初步流程判斷，答案會用來在此頁顯示結果。",
    required: "請完成所有題目，才能查看建議下一步。",
    result:
      "你目前最適合先做流程梳理，不一定需要立即開發系統。建議預約 30 分鐘，一起選出一個最值得改善的流程。",
    resultDetail:
      "如果你有內部負責人，也願意提供基本流程背景，下一步可以做 30 日 Discovery Sprint：梳理一個核心流程、建立 SOP / KPI baseline，並驗證一個 AI 或 automation quick win。",
    leadTitle: "想要我們後續聯絡？可自願留下聯絡方式",
    leadIntro:
      "只要留下公司、email 和 WhatsApp，並同意 InnovateXP 使用這次流程健康檢查內容聯絡你。不會要求你在公開表單提供客戶名單或敏感資料。",
    leadName: "稱呼（選填）",
    leadCompany: "公司 / 機構",
    consent:
      "我同意 InnovateXP 使用以上聯絡資料及本次問卷答案，就 AI 商業升級、流程診斷或 30 日 Discovery Sprint 與我聯絡。",
    leadRequired: "請填寫公司、有效 email、WhatsApp，並勾選同意。",
    leadFail: "目前無法送出，請直接預約 30 分鐘流程診斷。",
    questions: {
      ...copy.zh.questions,
      industry: "你的產業最接近哪一類？",
      teamSize: "團隊人數大約是多少？",
      workflow: "最想先改善哪一個流程？",
      currentTools: "目前主要依靠哪些工具處理？",
      weeklyHours: "每週大約花多少人工時間在這個流程？",
      failureMode: "最常出現的問題是什麼？",
      singlePersonDependency: "是否依賴某一位老闆或資深同事才運作順暢？",
      sopStatus: "目前 SOP 狀態如何？",
      urgency: "改善的急迫程度？",
      internalOwner: "內部是否有人可以負責試行和 checkpoint？",
    },
    options: {
      ...copy.zh.options,
      teamSize: ["1–2 人", "3–10 人", "11–30 人", "31–100 人", "100 人以上"],
      weeklyHours: ["少於 3 小時", "3–8 小時", "9–20 小時", "20 小時以上", "不確定"],
      internalOwner: ["有，已知道是誰", "可能有，但尚未確認", "目前沒有", "不確定"],
      pilotInvestment: ["願意先做 30 日 Discovery Sprint", "可能願意，想先了解範圍", "目前尚未準備投資", "只是想了解工具"],
    },
  },
  ja: {
    ...copy.en,
    eyebrow: "3分間ワークフロー診断",
    title: "まず改善すべきワークフローを1つ選びましょう。",
    intro:
      "これは見積フォームではありません。顧客データ、財務情報、業務上の機密情報は入力しないでください。目的は、ワークフロー整理、AI試行、または automation / SaaS 検討のどこから始めるべきかを判断することです。",
    privacy:
      "プライバシーに関する注意：顧客名、電話番号、契約、給与、財務明細、機密性の高い業務情報は入力しないでください。この診断は初期判断のためのものです。",
    required: "おすすめの次のステップを見るには、すべての質問に回答してください。",
    submit: "次のステップを見る",
    reset: "最初からやり直す",
    resultTitle: "初期診断",
    result:
      "現時点では、すぐにシステム開発へ進むよりも、まずワークフローを整理する方が適しています。30分のレビューで、改善すべきワークフローを1つ選びましょう。",
    resultDetail:
      "社内担当者がいて、基本的な業務背景を共有できる場合、次のステップは30日間のDiscovery Sprintです。1つの中核ワークフロー、SOP / KPI baseline、AIまたはautomationのquick winを検証します。",
    book: "30分ワークフローレビューを予約",
    leadTitle: "フォローアップを希望する場合は、任意で連絡先を残せます",
    leadIntro:
      "会社名、email、WhatsApp は、InnovateXPからのフォローアップを希望する場合のみ入力してください。顧客リストや機密業務データは入力しないでください。",
    leadName: "名前（任意）",
    leadEmail: "Email",
    leadWhatsapp: "WhatsApp",
    leadCompany: "会社 / 組織",
    consent:
      "InnovateXP が、AI Business Upgrade、ワークフローレビュー、30日Discovery Sprintに関する連絡のため、連絡先と回答内容を使用することに同意します。",
    leadSubmit: "送信してフォローアップを依頼",
    leadSending: "送信中...",
    leadSuccess: "受け付けました。InnovateXPから連絡します。",
    leadRequired: "会社名、有効なemail、WhatsAppを入力し、同意にチェックしてください。",
    leadFail: "現在送信できません。30分ワークフローレビューを直接予約してください。",
    questions: {
      industry: "最も近い業種はどれですか？",
      teamSize: "チーム規模はどのくらいですか？",
      workflow: "最初に改善したいワークフローは？",
      currentTools: "現在主に使っているツールは？",
      weeklyHours: "このワークフローに週何時間ほど手作業がかかりますか？",
      failureMode: "最もよく起きる問題は？",
      singlePersonDependency: "特定のオーナーやベテラン社員に依存していますか？",
      sopStatus: "現在のSOPの状態は？",
      kpi: "最初に改善したいKPIは？",
      urgency: "どのくらい急いでいますか？",
      internalOwner: "試行やcheckpointを担当できる社内担当者はいますか？",
      pilotInvestment: "方向性が明確なら、小規模pilotに投資できますか？",
    },
    options: {
      industry: ["研修会社 / コース運営", "専門サービス / コンサル / 代理店", "教育 / 会員 / コミュニティ", "エンジニアリング / ビジネスサービス", "その他のSME"],
      teamSize: ["1–2人", "3–10人", "11–30人", "31–100人", "100人以上"],
      workflow: ["コース申込、支払い、出席、受講者フォロー", "見積、営業問い合わせ、フォローアップ", "HR承認、領収書、会計事務", "SOP / ナレッジ管理 / 社内研修", "その他の反復業務"],
      currentTools: copy.en.options.currentTools,
      weeklyHours: ["3時間未満", "3–8時間", "9–20時間", "20時間以上", "不明"],
      failureMode: ["返信が遅い", "ミスが起きる", "情報のバージョンがずれる", "引き継ぎが難しい", "フォロー漏れ", "ツール定着率が低い"],
      singlePersonDependency: ["はい、大きく依存している", "一部依存している", "あまり依存していない", "不明"],
      sopStatus: ["主に人の頭の中", "簡単なメモはある", "SOPはあるが更新されていない", "明確なSOPと担当者がいる", "不明"],
      kpi: ["処理時間", "エラー率", "返信速度", "完了率", "チーム定着率", "管理側の見える化"],
      urgency: ["今月中", "1–3か月以内", "3–6か月以内", "まず情報収集"],
      internalOwner: ["はい、担当者がいる", "候補はいるが未確定", "まだいない", "不明"],
      pilotInvestment: ["30日Discovery Sprintを検討できる", "範囲を確認してから検討", "まだ投資準備はない", "ツールを知りたいだけ"],
    },
  },
  de: {
    ...copy.en,
    eyebrow: "3-Minuten-Workflow-Check",
    title: "Wähle zuerst einen Workflow, der sich wirklich lohnt.",
    intro:
      "Dies ist kein Angebotsformular. Bitte keine Kundendaten, Finanzdetails oder Betriebsgeheimnisse eingeben. Ziel ist zu klären, ob Workflow Mapping, ein AI Trial oder eine validierte Automation-/SaaS-Diskussion der richtige nächste Schritt ist.",
    privacy:
      "Datenschutzhinweis: Bitte keine Kundennamen, Telefonnummern, Verträge, Gehaltsdaten, Finanzdetails oder sensiblen Betriebsdaten eingeben. Dieser Check dient nur der ersten Workflow-Einschätzung.",
    required: "Bitte alle Fragen beantworten, bevor die Empfehlung angezeigt wird.",
    submit: "Nächsten Schritt anzeigen",
    reset: "Neu starten",
    resultTitle: "Erste Empfehlung",
    result:
      "Wahrscheinlich ist zuerst Workflow-Klärung sinnvoller als sofortige Softwareentwicklung. Buche 30 Minuten und wähle einen Workflow, der verbessert werden sollte.",
    resultDetail:
      "Wenn es intern einen Owner gibt und grundlegender Workflow-Kontext geteilt werden kann, ist der nächste Schritt ein 30-tägiger Discovery Sprint: ein Kernworkflow, SOP / KPI baseline und ein AI- oder Automation-Quick-Win.",
    book: "30-Minuten-Workflow-Review buchen",
    leadTitle: "Follow-up gewünscht? Kontaktdaten sind freiwillig",
    leadIntro:
      "Unternehmen, email und WhatsApp nur angeben, wenn InnovateXP zu diesem Workflow Health Check nachfassen soll. Bitte keine Kundenlisten oder sensiblen Betriebsdaten eingeben.",
    leadName: "Name (optional)",
    leadEmail: "Email",
    leadWhatsapp: "WhatsApp",
    leadCompany: "Unternehmen / Organisation",
    consent:
      "Ich stimme zu, dass InnovateXP meine Kontaktdaten und Antworten nutzt, um zu AI Business Upgrade, Workflow Review oder 30-day Discovery Sprint Kontakt aufzunehmen.",
    leadSubmit: "Absenden und Follow-up anfragen",
    leadSending: "Wird gesendet...",
    leadSuccess: "Erhalten. InnovateXP meldet sich.",
    leadRequired: "Bitte Unternehmen, gültige email, WhatsApp eingeben und Zustimmung anhaken.",
    leadFail: "Senden derzeit nicht möglich. Bitte direkt einen 30-Minuten-Workflow-Review buchen.",
    questions: {
      industry: "Welche Branche passt am besten?",
      teamSize: "Ungefähre Teamgröße?",
      workflow: "Welcher Workflow soll zuerst verbessert werden?",
      currentTools: "Welche Tools nutzt ihr derzeit?",
      weeklyHours: "Wie viele manuelle Stunden pro Woche kostet dieser Workflow?",
      failureMode: "Was geht am häufigsten schief?",
      singlePersonDependency: "Hängt der Ablauf von einer Schlüsselperson ab?",
      sopStatus: "Wie ist der aktuelle SOP-Status?",
      kpi: "Welche KPI soll zuerst verbessert werden?",
      urgency: "Wie dringend ist es?",
      internalOwner: "Gibt es intern einen Owner für Trial und Checkpoints?",
      pilotInvestment: "Wenn die Richtung klar ist, wäre ein kleiner Pilot möglich?",
    },
    options: {
      industry: ["Trainingsanbieter / Kursbetrieb", "Professional Services / Beratung / Agentur", "Bildung / Mitglieder / Community", "Engineering / Business Services", "Andere SME"],
      teamSize: ["1–2 Personen", "3–10 Personen", "11–30 Personen", "31–100 Personen", "100+ Personen"],
      workflow: ["Kursanmeldung, Zahlung, Anwesenheit, Teilnehmer-Follow-up", "Angebote, Sales-Anfragen, Follow-up", "HR-Freigaben, Belege, Buchhaltungsadmin", "SOP / Wissensmanagement / internes Training", "Anderer wiederkehrender Workflow"],
      currentTools: copy.en.options.currentTools,
      weeklyHours: ["Unter 3 Stunden", "3–8 Stunden", "9–20 Stunden", "20+ Stunden", "Nicht sicher"],
      failureMode: ["Langsame Antwort", "Fehler", "Unterschiedliche Datenstände", "Schwierige Übergabe", "Verpasstes Follow-up", "Geringe Tool-Adoption"],
      singlePersonDependency: ["Ja, stark abhängig", "Teilweise abhängig", "Nicht stark abhängig", "Nicht sicher"],
      sopStatus: ["Meist in den Köpfen", "Einfache Notizen vorhanden", "SOP existiert, wird selten aktualisiert", "Klare SOP und Owner", "Nicht sicher"],
      kpi: ["Bearbeitungszeit", "Fehlerquote", "Antwortzeit", "Abschlussrate", "Team-Adoption", "Management-Transparenz"],
      urgency: ["Diesen Monat", "Innerhalb von 1–3 Monaten", "Innerhalb von 3–6 Monaten", "Nur informieren"],
      internalOwner: ["Ja, bekannt", "Wahrscheinlich, aber nicht bestätigt", "Noch nicht", "Nicht sicher"],
      pilotInvestment: ["Bereit für 30-day Discovery Sprint", "Vielleicht, erst Scope klären", "Noch nicht investitionsbereit", "Nur Tool-Informationen"],
    },
  },
} satisfies Record<AppLocale, typeof copy.en>;

function copyFor(locale: AppLocale) {
  return localizedCopy[locale] ?? localizedCopy.en;
}

function languageFor(locale: AppLocale): Lang {
  return locale === "zh-hk" || locale === "zh-tw" ? "zh" : "en";
}

export function WorkflowHealthCheck({
  locale,
  bookingHref,
}: {
  locale: AppLocale;
  bookingHref: string;
}) {
  const c = copyFor(locale);
  const [answers, setAnswers] = useState<HealthCheckState>(initialState);
  const [lead, setLead] = useState<LeadState>(initialLeadState);
  const [submitted, setSubmitted] = useState(false);
  const [showError, setShowError] = useState(false);
  const [leadStatus, setLeadStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [leadError, setLeadError] = useState("");

  const fields = useMemo(
    () => Object.keys(initialState) as Array<keyof HealthCheckState>,
    []
  );

  const isComplete = fields.every((field) => {
    const value = answers[field];
    return Array.isArray(value) ? value.length > 0 : value.trim().length > 0;
  });

  const updateSingle = (field: keyof HealthCheckState, value: string) => {
    setAnswers((current) => ({ ...current, [field]: value }));
  };

  const toggleTool = (tool: string) => {
    setAnswers((current) => {
      const exists = current.currentTools.includes(tool);
      return {
        ...current,
        currentTools: exists
          ? current.currentTools.filter((item) => item !== tool)
          : [...current.currentTools, tool],
      };
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isComplete) {
      setShowError(true);
      return;
    }
    setShowError(false);
    setSubmitted(true);
  };

  const formatSummary = () => {
    const lines = fields.map((field) => {
      const value = answers[field];
      const display = Array.isArray(value) ? value.join(", ") : value;
      return `${c.questions[field]}: ${display}`;
    });
    return [
      languageFor(locale) === "zh" ? "3 分鐘流程健康檢查" : "3-minute Workflow Health Check",
      "",
      ...lines,
      "",
      `${c.resultTitle}: ${c.result}`,
      c.resultDetail,
    ].join("\n");
  };

  const submitLead = async () => {
    setLeadError("");
    const email = lead.email.trim();
    const company = lead.company.trim();
    const whatsapp = lead.whatsapp.trim();
    if (!company || !whatsapp || !lead.consent || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setLeadStatus("error");
      setLeadError(c.leadRequired);
      return;
    }

    setLeadStatus("sending");
    try {
      const response = await fetch("/api/questionnaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pathId: "workflow-health-check",
          questionnaireType: "Workflow Health Check",
          subject: `Workflow Health Check lead — ${company}`,
          name: lead.name.trim() || "-",
          company,
          profession: String(answers.industry || ""),
          email,
          phone: whatsapp,
          industry: answers.industry,
          urgency: answers.urgency,
          interest: answers.pilotInvestment,
          formattedQa: formatSummary(),
          answers: {
            ...answers,
            name: lead.name,
            company: lead.company,
            email: lead.email,
            phone: lead.whatsapp,
          },
        }),
      });
      if (!response.ok) throw new Error("Lead submission failed");
      setLeadStatus("success");
    } catch {
      setLeadStatus("error");
      setLeadError(c.leadFail);
    }
  };

  return (
    <section
      id="workflow-health-check"
      className="mb-16 scroll-mt-[var(--header-offset)] rounded-3xl border border-brand-primary/25 bg-gradient-to-br from-cyan-50 via-white to-amber-50 p-6 shadow-card dark:border-teal-500/30 dark:from-slate-900 dark:via-slate-900 dark:to-gray-900 md:p-10"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-brand-primary dark:text-teal-300">
          {c.eyebrow}
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          {c.title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-700 dark:text-slate-300 md:text-lg">
          {c.intro}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-5xl" noValidate>
        <div className="grid gap-5 md:grid-cols-2">
          {fields.map((field) => (
            <fieldset
              key={field}
              className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80"
            >
              <legend className="mb-3 text-base font-bold text-slate-900 dark:text-white">
                {c.questions[field]}
              </legend>
              {field === "currentTools" ? (
                <div className="grid gap-2">
                  {c.options[field].map((option) => (
                    <label
                      key={option}
                      className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 transition hover:border-brand-primary/50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    >
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary"
                        checked={answers.currentTools.includes(option)}
                        onChange={() => toggleTool(option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="grid gap-2">
                  {c.options[field].map((option) => (
                    <label
                      key={option}
                      className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 transition hover:border-brand-primary/50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    >
                      <input
                        type="radio"
                        name={field}
                        className="mt-1 h-4 w-4 border-slate-300 text-brand-primary focus:ring-brand-primary"
                        checked={answers[field] === option}
                        onChange={() => updateSingle(field, option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </fieldset>
          ))}
        </div>

        <p className="mt-5 rounded-2xl border border-slate-200 bg-white/80 p-4 text-sm leading-relaxed text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
          {c.privacy}
        </p>

        {showError ? (
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200">
            {c.required}
          </p>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button type="submit" className="sm:min-w-[220px]">
            {c.submit}
          </Button>
          {submitted ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setAnswers(initialState);
                setLead(initialLeadState);
                setSubmitted(false);
                setShowError(false);
                setLeadStatus("idle");
                setLeadError("");
              }}
            >
              {c.reset}
            </Button>
          ) : null}
        </div>
      </form>

      {submitted ? (
        <div
          className="mx-auto mt-8 max-w-3xl rounded-3xl border border-brand-primary/30 bg-white p-6 shadow-md dark:border-teal-500/40 dark:bg-slate-900 md:p-8"
          role="status"
          aria-live="polite"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {c.resultTitle}
          </h3>
          <p className="mt-3 text-lg font-semibold leading-relaxed text-brand-primary dark:text-teal-300">
            {c.result}
          </p>
          <p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">
            {c.resultDetail}
          </p>
          <div className="mt-6">
            <Button href={bookingHref}>{c.book}</Button>
          </div>
          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white">{c.leadTitle}</h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{c.leadIntro}</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {c.leadName}
                <input
                  value={lead.name}
                  onChange={(event) => setLead((current) => ({ ...current, name: event.target.value }))}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-brand-primary dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                  autoComplete="name"
                />
              </label>
              <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {c.leadCompany}
                <input
                  value={lead.company}
                  onChange={(event) => setLead((current) => ({ ...current, company: event.target.value }))}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-brand-primary dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                  autoComplete="organization"
                />
              </label>
              <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {c.leadEmail}
                <input
                  type="email"
                  value={lead.email}
                  onChange={(event) => setLead((current) => ({ ...current, email: event.target.value }))}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-brand-primary dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                  autoComplete="email"
                />
              </label>
              <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {c.leadWhatsapp}
                <input
                  type="tel"
                  value={lead.whatsapp}
                  onChange={(event) => setLead((current) => ({ ...current, whatsapp: event.target.value }))}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-brand-primary dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                  autoComplete="tel"
                />
              </label>
            </div>
            <label className="mt-4 flex gap-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={lead.consent}
                onChange={(event) => setLead((current) => ({ ...current, consent: event.target.checked }))}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary"
              />
              <span>{c.consent}</span>
            </label>
            {leadStatus === "success" ? (
              <p className="mt-3 text-sm font-semibold text-green-700 dark:text-green-300">{c.leadSuccess}</p>
            ) : null}
            {leadStatus === "error" ? (
              <p className="mt-3 text-sm font-semibold text-red-700 dark:text-red-300">{leadError}</p>
            ) : null}
            <div className="mt-4">
              <Button type="button" onClick={() => void submitLead()} disabled={leadStatus === "sending"}>
                {leadStatus === "sending" ? c.leadSending : c.leadSubmit}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
