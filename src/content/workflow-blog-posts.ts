import { formatHkd, PRICING } from "@/content/pricing";
import type { BlogCategory, BlogLink, BlogSection, WorkflowBlogCopy, WorkflowBlogPost } from "@/content/blog-types";
import { LOCALES, type AppLocale } from "@/lib/i18n-routing";

const PUBLISHED = "2026-11-09";
const CTA: Record<AppLocale, string> = {
  "zh-hk": "帶一個匿名流程例子，預約 30 分鐘業務聽診，先確認問題、負責人同下一步，唔使先揀軟件。",
  "zh-tw": "帶一個匿名流程範例，預約 30 分鐘業務診斷，先確認問題、負責人與下一步，不必先選軟體。",
  en: "Bring one anonymised workflow example to a 30-minute business diagnosis. Identify the problem, owner and next step before choosing software.",
  ja: "匿名化した業務例を1件用意して、30分の業務診断をご予約ください。ソフトを選ぶ前に、課題・担当者・次の一歩を整理します。",
  de: "Bringen Sie einen anonymisierten Ablauf zur 30-minütigen Geschäftsdiagnose mit. Klären Sie Problem, Verantwortung und nächsten Schritt, bevor Sie Software auswählen.",
};

// References are existing service/case routes or verified official Google documentation.
const REFERENCES = {
  snapshot: { href: "/services/snapshot", labels: ["Snapshot 範圍", "Snapshot 範圍", "Snapshot scope", "Snapshotの範囲", "Snapshot-Leistungsumfang"] },
  discovery: { href: "/ai-consulting", labels: ["Discovery 與 AI 顧問", "Discovery 與 AI 顧問", "Discovery and AI consulting", "Discovery・AIコンサルティング", "Discovery und KI-Beratung"] },
  terms: { href: "/purchase-terms", labels: ["購買與升級條款", "購買與升級條款", "Purchase and upgrade terms", "購入・アップグレード条件", "Kauf- und Upgrade-Bedingungen"] },
  workflow: { href: "/sme-ai-workflow", labels: ["中小企流程改善", "中小企業流程改善", "SME workflow improvement", "中小企業の業務改善", "Prozessverbesserung für KMU"] },
  crm: { href: "/smartsales-crm", labels: ["SmartSales 範圍與收費", "SmartSales 範圍與收費", "SmartSales scope and pricing", "SmartSalesの範囲と料金", "SmartSales: Umfang und Preise"] },
  events: { href: "/eventxp", labels: ["EventXP 活動流程", "EventXP 活動流程", "EventXP event workflows", "EventXPのイベント業務", "EventXP-Veranstaltungsabläufe"] },
  privateAi: { href: "/private-ai-solutions", labels: ["私人 AI 與資料邊界", "私人 AI 與資料邊界", "Private AI and data boundaries", "プライベートAIとデータ境界", "Private KI und Datengrenzen"] },
  governance: { href: "/blog/pdpo-six-principles-before-ai", labels: ["PDPO 六項原則", "PDPO 六項原則", "Six PDPO principles", "PDPOの6原則", "Die sechs PDPO-Grundsätze"] },
  visibility: { href: "/ai-seo-update-package", labels: ["AI 可見度與網站內容", "AI 可見度與網站內容", "AI visibility and website content", "AIでの可視性とサイト内容", "KI-Sichtbarkeit und Website-Inhalte"] },
  cases: { href: "/case-studies", labels: ["Agilizing、ZOmate 與 Flower Nice Day 案例", "Agilizing、ZOmate 與 Flower Nice Day 案例", "Agilizing, ZOmate and Flower Nice Day cases", "Agilizing・ZOmate・Flower Nice Dayの事例", "Fälle: Agilizing, ZOmate und Flower Nice Day"] },
  googleAi: { href: "https://developers.google.com/search/docs/appearance/ai-features", labels: ["Google：AI 功能與網站", "Google：AI 功能與網站", "Google: AI features and your website", "Google：AI機能とウェブサイト", "Google: KI-Funktionen und Websites"] },
  googleUpdates: { href: "https://developers.google.com/search/updates", labels: ["Google Search 文件更新", "Google Search 文件更新", "Google Search documentation updates", "Google Searchドキュメント更新", "Google Search: Dokumentationsupdates"] },
} as const;

type Reference = keyof typeof REFERENCES;
const LOCALE_INDEX: Record<AppLocale, number> = { "zh-hk": 0, "zh-tw": 1, en: 2, ja: 3, de: 4 };
function links(locale: AppLocale, keys: Reference[]): BlogLink[] {
  return keys.map((key) => ({ href: REFERENCES[key].href, label: REFERENCES[key].labels[LOCALE_INDEX[locale]] }));
}
function section(heading: string, ...paragraphs: string[]): BlogSection { return { heading, paragraphs }; }
const price = (amount: number, locale: AppLocale) => formatHkd(amount, locale);

type Draft = Omit<WorkflowBlogCopy, "cta" | "disclaimer" | "sources" | "relatedServices" | "relatedCases">;
function post(slug: string, category: BlogCategory, sources: Reference[], services: Reference[], drafts: Record<AppLocale, Draft>): WorkflowBlogPost {
  const locales = Object.fromEntries(LOCALES.map((locale) => [locale, {
    ...drafts[locale], cta: CTA[locale], disclaimer: "",
    sources: links(locale, sources), relatedServices: links(locale, services), relatedCases: links(locale, ["cases"]),
  }])) as Record<AppLocale, WorkflowBlogCopy>;
  return { slug, category, date: PUBLISHED, locales };
}

export const WORKFLOW_BLOG_POSTS: WorkflowBlogPost[] = [
  post("whatsapp-excel-need-crm", "crm-events-membership", ["crm", "governance"], ["crm", "workflow"], {
    "zh-hk": {
      title: "WhatsApp 加 Excel，幾時先真係需要 CRM？",
      excerpt: "唔係訊息多就要換系統。先睇負責人、下一步同交接有冇經常斷線。",
      directAnswer: "如果團隊已經睇唔到邊個跟客、下次幾時聯絡，同一客戶又有幾份版本，就值得評估 CRM；如果只係欄位唔清，先整理 Excel 同 SOP 可能已經夠。",
      keyTakeaways: ["用交接失誤判斷需要，唔好用訊息數量判斷。", "先定客戶、負責人、階段同下一步四類資料。", "用匿名樣本驗收，唔好一開始搬晒聊天記錄。"],
      sections: [
        section("先查最近幾單點樣漏跟", "抽幾宗完成、停滯同重複聯絡嘅查詢。逐宗寫低來源、負責人、最後一次行動同承諾日期。如果要問三個人先搵到答案，問題係共享狀態；如果人人都有記錄但唔更新，就要先改責任同工作習慣。"),
        section("一張表可以先驗證規則", "用唯一客戶編號連結聯絡人同商機；階段寫成可判斷嘅狀態，例如待確認需求、已報價、待決定。每筆開放商機都要有負責人同下一步日期。唔好將同一個客戶每次 WhatsApp 訊息都當成新商機。", "如果一位同事可以穩定維護、交接少、權限要求簡單，保留試算表係合理選擇。若多人同時更新、需要逾期清單或限制查閱，先用同一套規則測試 CRM。"),
        section("點驗收 CRM，而唔係只睇示範", "用匿名例子試建立查詢、分派負責人、同事放假交接、合併重複資料同匯出紀錄。要求現場列出未有下一步嘅商機。SmartSales 先做有邊界流程；WhatsApp API、自動發訊、AI 同系統接駁要另外確認範圍及費用，唔代表可以讀取所有私人聊天歷史。"),
      ],
      limitations: "CRM 唔會自動修好重複資料、同意紀錄或團隊紀律。涉及個人資料要先確認用途、權限同保留期；本文係流程建議，唔係法律意見。",
      faqs: [{ question: "可以繼續用 WhatsApp 嗎？", answer: "可以先保留對話渠道，把客戶狀態同下一步放喺共享紀錄。任何自動同步要先驗證帳戶、API 權限同報價，唔好假設已包括。" }],
    },
    "zh-tw": {
      title: "WhatsApp 加 Excel，何時才真正需要 CRM？",
      excerpt: "不是訊息多就要換系統。先檢查負責人、下一步與交接是否經常中斷。",
      directAnswer: "當團隊無法確定誰負責客戶、何時再次聯絡，而且同一客戶出現多個版本，就值得評估 CRM；若只是欄位不清，整理 Excel 與 SOP 可能已經足夠。",
      keyTakeaways: ["以交接失誤判斷需求，不以訊息量判斷。", "先定義客戶、負責人、階段與下一步。", "先用匿名樣本驗收，不要立即搬移全部對話。"],
      sections: [
        section("先檢查最近漏掉的跟進", "抽取已完成、停滯與重複聯絡的查詢，記下來源、負責人、最後行動與承諾日期。若要詢問多人才能拼出答案，問題在共享狀態；若已有紀錄卻無人更新，應先處理責任與工作習慣。"),
        section("用一張表測試規則", "以唯一客戶編號連結聯絡人和商機；階段應是可判定的狀態，例如待確認需求、已報價、待決定。每筆開放商機都要有負責人和下一步日期，不要把每則訊息都建立為新商機。", "如果一人能穩定維護、交接少且權限簡單，保留試算表很合理。多人同時更新、需要逾期清單或限制查閱時，再以同一組規則測試 CRM。"),
        section("驗收實際工作，而非展示畫面", "用匿名案例測試建立查詢、分派、請假交接、合併重複資料及匯出。請供應方列出沒有下一步的商機。SmartSales 先處理限定流程；WhatsApp API、自動傳訊、AI 與系統整合須另行確認範圍和費用，不能假設可讀取全部私人對話。"),
      ],
      limitations: "CRM 不會自行修正重複資料、同意紀錄或工作紀律。個人資料的用途、權限與保存期限須先確認；本文為流程建議，並非法律意見。",
      faqs: [{ question: "可以繼續使用 WhatsApp 嗎？", answer: "可以保留對話管道，將狀態和下一步放在共享紀錄。自動同步須先驗證帳戶、API 權限及報價，不能假設已包含。" }],
    },
    en: {
      title: "WhatsApp plus Excel: do you actually need a CRM?",
      excerpt: "Message volume is not the deciding factor. Look for lost ownership, unclear next actions and broken handovers.",
      directAnswer: "Consider a CRM when the team cannot reliably identify a customer's owner, next contact date or latest record. If the problem is simply inconsistent fields, a tidier spreadsheet and a written SOP may be enough.",
      keyTakeaways: ["Judge the need by handover failures, not message volume.", "Define customer identity, owner, stage and next action first.", "Accept the workflow with anonymised examples before migrating conversations."],
      sections: [
        section("Audit a few recent enquiries", "Choose completed, stalled and duplicate enquiries. Record their source, owner, last action and promised date. If you need several colleagues to reconstruct one enquiry, shared status is missing. If a shared record exists but nobody updates it, fix responsibility and working habits before buying software."),
        section("Test the rules in one shared table", "Give each customer a stable identifier and distinguish contacts from opportunities. Define stages through observable events: requirements pending, quotation sent, decision pending. Every open opportunity needs an owner and a dated next action; each WhatsApp message is not a new opportunity.", "A spreadsheet remains reasonable when one person maintains it reliably, handovers are rare and permissions are simple. Concurrent updates, overdue queues and restricted access are reasons to test the same rules in a CRM."),
        section("Accept a workflow, not a sales demonstration", "Using anonymised examples, test enquiry creation, assignment, holiday cover, duplicate resolution and export. Ask to see opportunities with no next action. SmartSales starts with a bounded workflow. WhatsApp APIs, automated sending, AI and integrations require separate scope and pricing; access to all personal chat history is not promised."),
      ],
      limitations: "A CRM cannot repair consent records, duplicate data or working habits on its own. Confirm purpose, access and retention before using personal data. This is workflow guidance, not legal advice.",
      faqs: [{ question: "Can we keep WhatsApp?", answer: "Yes: keep the conversation channel while recording status and next actions centrally. Validate account access, API permissions and price before assuming any automatic synchronisation is included." }],
    },
    ja: {
      title: "WhatsAppとExcelだけで十分？CRMが必要になる境目",
      excerpt: "メッセージ数より、担当者・次の行動・引き継ぎの欠落を確認しましょう。",
      directAnswer: "顧客の担当者、次回連絡日、最新の記録が分からなくなったらCRMを検討します。列の定義が曖昧なだけなら、Excelの整理と手順書で足りる場合があります。",
      keyTakeaways: ["件数ではなく引き継ぎの失敗で判断する。", "顧客ID、担当者、段階、次の行動を先に決める。", "会話を移行する前に匿名サンプルで業務を検証する。"],
      sections: [
        section("最近の問い合わせを追跡する", "完了、停滞、重複連絡の例を選び、流入元、担当、最後の行動、約束日を記録します。複数人に聞かなければ状況が分からないなら共有状態が不足しています。記録があるのに更新されない場合は、購入前に責任分担と習慣を見直します。"),
        section("まず一つの表でルールを試す", "固定の顧客IDで連絡先と商談を結びます。段階は要件確認待ち、見積送付済み、判断待ちなど、事実で判定できるものにします。進行中の商談には担当者と次回行動日を必須とし、メッセージごとに商談を作らないようにします。", "一人で安定して管理でき、引き継ぎや権限制限が少ないなら表計算を維持する選択も合理的です。同時更新、期限超過一覧、閲覧制限が必要になったら、同じルールをCRMで試します。"),
        section("デモではなく日常業務で受け入れる", "匿名データで登録、担当割り当て、休暇時の引き継ぎ、重複統合、エクスポートを試します。次の行動が未設定の商談も表示できるか確認します。SmartSalesは範囲を絞った業務から始めます。WhatsApp API、自動送信、AI、連携は別途範囲と料金の確認が必要で、個人の全チャット履歴を取得できるとは限りません。"),
      ],
      limitations: "CRMだけで同意記録、重複データ、運用習慣は改善しません。個人情報の目的、権限、保存期間を確認してください。本稿は業務上の一般情報であり法律助言ではありません。",
      faqs: [{ question: "WhatsAppは引き続き使えますか？", answer: "会話には使い続け、状態と次の行動を共有記録に残せます。自動同期はアカウント、API権限、料金を確認してから判断します。" }],
    },
    de: {
      title: "WhatsApp und Excel: Brauchen Sie wirklich ein CRM?",
      excerpt: "Nicht die Nachrichtenmenge entscheidet, sondern fehlende Zuständigkeit, nächste Schritte und verlässliche Übergaben.",
      directAnswer: "Ein CRM wird interessant, wenn Zuständigkeit, nächster Kontakttermin oder aktueller Kundenstand nicht zuverlässig auffindbar sind. Bei uneinheitlichen Spalten reichen möglicherweise eine aufgeräumte Tabelle und eine klare Arbeitsanweisung.",
      keyTakeaways: ["Übergabefehler statt Nachrichtenmenge bewerten.", "Kundenkennung, Verantwortung, Phase und nächste Aktion zuerst definieren.", "Mit anonymisierten Beispielen abnehmen, bevor Gespräche migriert werden."],
      sections: [
        section("Einige aktuelle Anfragen nachvollziehen", "Wählen Sie abgeschlossene, stockende und doppelt bearbeitete Anfragen. Notieren Sie Quelle, Verantwortlichen, letzte Aktion und zugesagten Termin. Müssen mehrere Kollegen den Stand rekonstruieren, fehlt eine gemeinsame Sicht. Existiert diese bereits, wird aber nicht gepflegt, müssen zunächst Verantwortung und Arbeitsgewohnheiten geklärt werden."),
        section("Regeln in einer gemeinsamen Tabelle testen", "Verknüpfen Sie Kontakte und Verkaufschancen über eine stabile Kundenkennung. Phasen sollten beobachtbare Ereignisse ausdrücken: Bedarf ungeklärt, Angebot versendet, Entscheidung ausstehend. Jede offene Chance braucht einen Verantwortlichen und einen datierten nächsten Schritt. Nicht jede Nachricht ist eine neue Chance.", "Eine Tabelle bleibt sinnvoll, wenn eine Person sie zuverlässig pflegt und Übergaben sowie Zugriffsregeln einfach sind. Gleichzeitige Änderungen, überfällige Aufgaben und eingeschränkte Ansichten sprechen dafür, dieselben Regeln in einem CRM zu testen."),
        section("Abläufe statt Vorführungen abnehmen", "Testen Sie mit anonymisierten Daten Anlage, Zuweisung, Urlaubsvertretung, Dublettenbereinigung und Export. Lassen Sie Chancen ohne nächste Aktion anzeigen. SmartSales beginnt mit einem abgegrenzten Ablauf. WhatsApp-APIs, automatischer Versand, KI und Integrationen erfordern gesonderte Prüfung und Preise; vollständiger Zugriff auf private Chatverläufe wird nicht zugesagt."),
      ],
      limitations: "Ein CRM repariert weder Einwilligungen noch Dubletten oder Arbeitsgewohnheiten automatisch. Zweck, Zugriff und Aufbewahrung personenbezogener Daten müssen geklärt sein. Dies ist Prozessberatung, keine Rechtsberatung.",
      faqs: [{ question: "Können wir WhatsApp behalten?", answer: "Ja, als Gesprächskanal; Status und nächste Aktionen werden gemeinsam dokumentiert. Automatische Synchronisierung setzt geprüfte Kontozugänge, API-Berechtigungen und ein gesondertes Angebot voraus." }],
    },
  }),
  post("snapshot-vs-discovery", "guides-comparisons", ["snapshot", "discovery", "terms"], ["snapshot", "discovery"], {
    "zh-hk": {
      title: "Snapshot 定 Discovery：應該由邊一步開始？",
      excerpt: "Snapshot 先判斷問題；Discovery 先確認範圍，再落實一條流程。兩者唔係同一份交付。",
      directAnswer: `未肯定問題喺邊，先考慮 ${price(PRICING.quickCash.aiReadinessAssessment, "zh-hk")} Snapshot；已有流程負責人、例子同改善目標，就評估 Discovery。Discovery 10 人或以下 ${price(PRICING.consultancy.discoverySprint30Day, "zh-hk")}，11–30 人 ${price(PRICING.consultancy.discoveryWorkshop11To30, "zh-hk")}，按範圍確認。`,
      keyTakeaways: ["Snapshot 係書面診斷，唔包系統實施。", "Discovery 要先確認流程、責任同驗收。", "30 分鐘初步聽診唔等於付費 Snapshot 訪談。"],
      sections: [
        section("Snapshot 適合未睇清阻力嘅團隊", "Snapshot 聚焦一條流程，包含 60–90 分鐘訪談、一頁準備度評分、三個主要阻力，同是否進入 Discovery 嘅建議。準備匿名例子、目前工具同最易卡住嘅交接；唔需要先提交客戶名單或財務明細。", "佢唔包括 SOP 製作、原型、開發、系統實施、培訓或持續支援。付款後確認訪談時間，訪談前確認書面交付日期，唔好將評估當成已買到自動化。"),
        section("Discovery 要有可以驗收嘅工作範圍", "如果已知某條流程反覆漏跟或重複輸入，列明起點、終點、負責人、資料來源同成功條件，再確認 Discovery 範圍。分清診斷、流程設計、試點同後續正式建置；接駁、開發及維護唔應默認無限包括。", `10 人或以下參考價係 ${price(PRICING.consultancy.discoverySprint30Day, "zh-hk")}，11–30 人係 ${price(PRICING.consultancy.discoveryWorkshop11To30, "zh-hk")}；更大團隊或額外流程要另定範圍。`),
        section("先問三條問題，再決定付款", "我哋知唔知最痛係邊一步？有冇一位可以拍板嘅流程負責人？可唔可以用匿名樣本講清楚完成標準？未答到，先用 30 分鐘業務聽診釐清；唔使為咗揀方案而先揀軟件。", `符合條件而且喺 14 日內升級，可以補 ${price(PRICING.quickCash.aiReadinessDiscoveryTopUp, "zh-hk")} 至 10 人或以下 Discovery。先核對購買條款同適用範圍，唔好將呢個安排套用到所有團隊規模。`),
      ],
      limitations: "以上係公開範圍嘅比較，唔係個別項目報價或交付保證。資料準備、接駁權限、團隊規模同新增需求都可能改變排期及費用。",
      faqs: [{ question: "一定要先買 Snapshot 嗎？", answer: "唔一定。如果問題、負責人同範圍已清楚，可以先評估 Discovery 適配；仍需確認書面範圍，唔係自動直接開工。" }],
    },
    "zh-tw": {
      title: "Snapshot 或 Discovery：應該從哪一步開始？",
      excerpt: "Snapshot 先釐清問題；Discovery 確認範圍後推進一條流程，兩者交付不同。",
      directAnswer: `尚未確認問題，可先考慮 ${price(PRICING.quickCash.aiReadinessAssessment, "zh-tw")} Snapshot；已有流程負責人、範例與改善目標，則評估 Discovery。10 人以下（含 10 人）${price(PRICING.consultancy.discoverySprint30Day, "zh-tw")}，11–30 人 ${price(PRICING.consultancy.discoveryWorkshop11To30, "zh-tw")}，須確認範圍。`,
      keyTakeaways: ["Snapshot 是書面診斷，不含系統實施。", "Discovery 需要先確認流程、責任與驗收。", "30 分鐘初步診斷不同於付費 Snapshot 訪談。"],
      sections: [
        section("Snapshot 用來釐清阻力", "聚焦一條流程，包含 60–90 分鐘訪談、一頁準備度評分、三個主要阻力與是否進入 Discovery 的建議。準備匿名範例、現有工具和卡住的交接即可，不要提交客戶名單或財務明細。", "不包括 SOP 製作、原型、開發、實施、培訓或持續支援。付款後確認訪談時間，訪談前確認書面交付日期；購買評估並不等於購買自動化系統。"),
        section("Discovery 需要可驗收的範圍", "若已知某條流程反覆漏追蹤或重複輸入，請列出起點、終點、負責人、資料來源和成功條件。確認診斷、流程設計、試點及後續正式建置的界線，不能假設整合、開發與維護無限包含。", `10 人以下（含 10 人）參考價 ${price(PRICING.consultancy.discoverySprint30Day, "zh-tw")}；11–30 人 ${price(PRICING.consultancy.discoveryWorkshop11To30, "zh-tw")}。更大團隊或額外流程須另訂範圍。`),
        section("付款前先回答三個問題", "最痛的是哪一步？誰能對流程拍板？能否以匿名樣本說明完成標準？還無法回答，就先透過 30 分鐘業務診斷整理，不必為了選方案而先選軟體。", `符合條件且於 14 日內升級，可補 ${price(PRICING.quickCash.aiReadinessDiscoveryTopUp, "zh-tw")} 至 10 人以下（含 10 人）Discovery。請核對購買條款，不要直接套用到所有團隊規模。`),
      ],
      limitations: "本文比較公開範圍，不是個別專案報價或交付保證。資料準備、權限、團隊規模與新增需求可能影響費用及時程。",
      faqs: [{ question: "必須先購買 Snapshot 嗎？", answer: "不必。如果問題、負責人與範圍已明確，可以先評估 Discovery 適配，但仍須確認書面範圍。" }],
    },
    en: {
      title: "Snapshot or Discovery: which starting point fits?",
      excerpt: "Snapshot clarifies the problem. Discovery needs an agreed workflow and acceptance scope. They are different purchases.",
      directAnswer: `Consider a ${price(PRICING.quickCash.aiReadinessAssessment, "en")} Snapshot if the problem is still unclear. Evaluate Discovery when you have a workflow owner, examples and an improvement goal: ${price(PRICING.consultancy.discoverySprint30Day, "en")} for up to 10 people, or ${price(PRICING.consultancy.discoveryWorkshop11To30, "en")} for 11–30, subject to scope.`,
      keyTakeaways: ["Snapshot is a written diagnosis, not implementation.", "Discovery requires agreed workflow ownership and acceptance.", "The introductory 30-minute diagnosis is not the paid Snapshot interview."],
      sections: [
        section("Use Snapshot to identify the blockers", "Snapshot covers one workflow: a 60–90-minute interview, a one-page readiness scorecard, three main blockers and a recommendation on whether to proceed to Discovery. Bring an anonymised example, current tools and the handover that stalls. Do not submit customer lists or financial records.", "SOP production, prototypes, development, implementation, training and ongoing support are excluded. Agree the interview after payment and the written delivery date before the interview. Buying an assessment is not buying an automated system."),
        section("Give Discovery an acceptance boundary", "If a workflow repeatedly loses follow-ups or duplicates entry, identify its start, end, owner, data sources and acceptance criteria. Confirm what diagnosis, process design, pilot work and subsequent production setup actually include. Do not assume integrations, development or maintenance are unlimited.", `The reference price is ${price(PRICING.consultancy.discoverySprint30Day, "en")} for up to 10 people and ${price(PRICING.consultancy.discoveryWorkshop11To30, "en")} for 11–30. Larger teams and additional workflows need separate scoping.`),
        section("Answer three questions before paying", "Which step hurts most? Who can approve a change? Can an anonymised sample demonstrate an acceptable result? If these are unclear, begin with a 30-minute business diagnosis rather than choosing software to justify a package.", `An eligible upgrade within 14 days adds ${price(PRICING.quickCash.aiReadinessDiscoveryTopUp, "en")} to reach Discovery for up to 10 people. Check purchase terms and eligibility; this arrangement does not automatically apply to every team size.`),
      ],
      limitations: "This compares public scopes, not an individual project quote or delivery guarantee. Data readiness, permissions, team size and added requirements can affect the price and schedule.",
      faqs: [{ question: "Must we buy Snapshot first?", answer: "No. If the problem, owner and boundary are already clear, assess Discovery directly. Fit and a written scope still need agreement before work starts." }],
    },
    ja: {
      title: "SnapshotとDiscovery、どちらから始めるべき？",
      excerpt: "Snapshotは課題の診断、Discoveryは合意した業務範囲を進めるための別のサービスです。",
      directAnswer: `課題が不明確なら ${price(PRICING.quickCash.aiReadinessAssessment, "ja")} のSnapshot、担当者・事例・改善目標が明確ならDiscoveryを検討します。Discoveryは10人以下 ${price(PRICING.consultancy.discoverySprint30Day, "ja")}、11〜30人 ${price(PRICING.consultancy.discoveryWorkshop11To30, "ja")} で、範囲の確認が必要です。`,
      keyTakeaways: ["Snapshotは書面診断でありシステム実装ではない。", "Discoveryでは責任者と受け入れ条件を合意する。", "初回30分診断と有料Snapshotの面談は異なる。"],
      sections: [
        section("Snapshotで障害を特定する", "一つの業務について60〜90分の面談を行い、1ページの準備度評価、主な障害3点、Discoveryに進むべきかの提案をまとめます。匿名例、使用中のツール、止まる引き継ぎを用意してください。顧客名簿や財務明細は送らないでください。", "SOP作成、試作、開発、実装、研修、継続支援は含みません。支払い後に面談を調整し、面談前に書面の納期を合意します。診断購入は自動化の完成を意味しません。"),
        section("Discoveryの受け入れ範囲を決める", "追客漏れや二重入力が続く業務なら、開始と終了、担当者、データ元、完成条件を記載します。診断、設計、試行、本番導入のどこまでを含むか確認し、連携・開発・保守が無制限に含まれるとは考えないでください。", `参考価格は10人以下 ${price(PRICING.consultancy.discoverySprint30Day, "ja")}、11〜30人 ${price(PRICING.consultancy.discoveryWorkshop11To30, "ja")}。人数や対象業務が増える場合は別途範囲を定めます。`),
        section("支払い前の三つの質問", "最も困る工程はどこか、誰が変更を承認するか、匿名例で合格条件を説明できるか。答えが曖昧なら、まず30分の業務診断で整理します。プランを選ぶためにソフトを先に決める必要はありません。", `条件を満たす14日以内のアップグレードでは ${price(PRICING.quickCash.aiReadinessDiscoveryTopUp, "ja")} を追加して10人以下のDiscoveryに進めます。購入条件を確認し、他の人数区分にも適用できると想定しないでください。`),
      ],
      limitations: "公開範囲の比較であり、個別見積もりや納期保証ではありません。データ準備、権限、人数、追加要件によって費用と日程が変わります。",
      faqs: [{ question: "Snapshotは必須ですか？", answer: "いいえ。課題、担当者、範囲が明確なら直接Discoveryの適合性を確認できます。ただし開始前に書面の合意が必要です。" }],
    },
    de: {
      title: "Snapshot oder Discovery: Welcher Einstieg passt?",
      excerpt: "Snapshot klärt das Problem. Discovery setzt einen vereinbarten Ablauf und Abnahmekriterien voraus. Die Leistungen unterscheiden sich.",
      directAnswer: `Ist das Problem unklar, kommt ein Snapshot für ${price(PRICING.quickCash.aiReadinessAssessment, "de")} infrage. Mit Verantwortlichem, Beispielen und Verbesserungsziel lässt sich Discovery prüfen: ${price(PRICING.consultancy.discoverySprint30Day, "de")} bis 10 Personen, ${price(PRICING.consultancy.discoveryWorkshop11To30, "de")} für 11–30, jeweils nach Umfangsprüfung.`,
      keyTakeaways: ["Snapshot ist eine schriftliche Diagnose, keine Implementierung.", "Discovery braucht Zuständigkeit und vereinbarte Abnahmekriterien.", "Die einführende 30-Minuten-Diagnose ist nicht das bezahlte Snapshot-Gespräch."],
      sections: [
        section("Mit Snapshot die Hindernisse klären", "Snapshot betrachtet einen Ablauf: ein Gespräch von 60–90 Minuten, eine einseitige Bereitschaftsbewertung, drei wesentliche Hindernisse und eine Empfehlung zu Discovery. Bringen Sie ein anonymisiertes Beispiel, vorhandene Werkzeuge und eine stockende Übergabe mit. Keine Kundenlisten oder Finanzunterlagen einreichen.", "SOP-Erstellung, Prototypen, Entwicklung, Implementierung, Schulung und laufender Support sind ausgeschlossen. Nach Zahlung wird das Gespräch vereinbart; dessen schriftlicher Liefertermin wird vorher abgestimmt. Eine Analyse ist kein fertiges Automatisierungssystem."),
        section("Discovery durch eine klare Abnahme begrenzen", "Bei wiederholt verlorenen Nachfassaktionen oder doppelter Eingabe halten Sie Anfang, Ende, Verantwortung, Datenquellen und Erfolgskriterien fest. Klären Sie die Grenzen zwischen Diagnose, Prozessgestaltung, Pilot und späterem Produktivaufbau. Integrationen, Entwicklung und Wartung sind nicht automatisch unbegrenzt enthalten.", `Der Richtpreis beträgt ${price(PRICING.consultancy.discoverySprint30Day, "de")} bis 10 Personen und ${price(PRICING.consultancy.discoveryWorkshop11To30, "de")} für 11–30. Größere Teams und weitere Abläufe werden gesondert abgegrenzt.`),
        section("Drei Fragen vor dem Kauf", "Welcher Schritt schmerzt am meisten? Wer darf Änderungen freigeben? Lässt sich ein akzeptables Ergebnis mit einem anonymisierten Beispiel zeigen? Falls nicht, starten Sie mit der 30-minütigen Geschäftsdiagnose, statt eine Software zur Rechtfertigung eines Pakets auszuwählen.", `Ein berechtigtes Upgrade innerhalb von 14 Tagen kostet zusätzlich ${price(PRICING.quickCash.aiReadinessDiscoveryTopUp, "de")} bis zum Discovery-Preis für höchstens 10 Personen. Bedingungen prüfen; die Regel gilt nicht automatisch für jede Teamgröße.`),
      ],
      limitations: "Dies ist ein Vergleich öffentlicher Leistungsumfänge, kein individuelles Angebot oder Lieferungsversprechen. Datenlage, Zugänge, Teamgröße und zusätzliche Anforderungen beeinflussen Preis und Termin.",
      faqs: [{ question: "Ist Snapshot vorgeschrieben?", answer: "Nein. Sind Problem, Verantwortung und Grenze klar, kann Discovery direkt geprüft werden. Eignung und schriftlicher Umfang müssen trotzdem vor Beginn vereinbart sein." }],
    },
  }),
  post("choose-first-automation-workflow", "workflow-sop", ["workflow", "governance"], ["workflow", "discovery"], {
    "zh-hk": {
      title: "第一條自動化流程點揀：由重複、可覆核嘅工作開始",
      excerpt: "唔好由最大部門開始。揀一條有清楚輸入、規則、負責人同回復方法嘅流程。",
      directAnswer: "第一條自動化應該重複發生、規則相對穩定、資料可取得，而且出錯可以由人覆核或回復。先做草稿、整理或提醒，唔好一開始自動付款或發送不可撤回嘅訊息。",
      keyTakeaways: ["先揀有穩定規則同可取得資料嘅工作。", "每次試行都要有負責人、人工覆核同停機方法。", "先記錄基線，再用相同口徑評估試點。"],
      sections: [
        section("列三個候選，唔好列一百個工具", "寫低最近經常重複嘅工作，例如整理查詢、起草報價跟進或分類文件。逐項記錄頻率、實際處理時間、例外情況、資料敏感度同最終批准人。高頻但規則日日變，未必比低頻但穩定嘅工作更適合先做。"),
        section("用一頁 SOP 畫清楚邊界", "寫出觸發條件、輸入欄位、操作步驟、輸出同驗收人。例如收到已確認查詢後，產生待覆核草稿，而唔係直接發畀客。漏欄位、重複提交、無權限同模型無法判斷，都要列明交返邊個處理。", "任何一步要覆寫原始資料、對外發送或涉及付款，都加人工批准。保留原始紀錄同版本，指定邊個可以暫停，試行失敗時用原來流程接手。"),
        section("一條流程先做完一個循環", "先記錄現況，再用匿名樣本測一般、缺資料、重複同例外個案。每次輸出記錄覆核時間同修正原因，而唔係只睇示範有幾快。到約定檢討日先決定保留、修改或停止，再考慮第二條流程。"),
      ],
      limitations: "涉及敏感資料、重要決策或不可逆操作，要更嚴格權限同專業覆核。呢份選擇方法唔保證節省時間；如果輸入唔穩定，先整理資料可能更實際。",
      faqs: [{ question: "一定要用 AI 嗎？", answer: "唔一定。固定規則嘅驗證、提醒同資料搬運，普通自動化可能更容易測試。只有需要理解非結構化內容時，先評估 AI 同人工覆核成本。" }],
    },
    "zh-tw": {
      title: "如何選擇第一條自動化流程：從重複、可覆核的工作開始",
      excerpt: "先找輸入、規則、負責人及回復方式明確的流程，而不是最大的部門。",
      directAnswer: "第一條自動化應重複發生、規則穩定、資料可取得，而且錯誤能由人工覆核或回復。先做草稿、整理與提醒，不要立即自動付款或傳送無法撤回的訊息。",
      keyTakeaways: ["先選規則穩定、資料可取得的工作。", "試行必須有負責人、人工覆核及停止方式。", "先記錄基準，再用同樣口徑評估。"],
      sections: [
        section("列出三個候選流程", "從最近反覆進行的工作選起，例如整理查詢、起草報價跟進或分類文件。記錄頻率、實際處理時間、例外、資料敏感度與最終批准者。規則天天改變的高頻工作，未必比穩定的低頻工作更適合試行。"),
        section("以一頁 SOP 確認界線", "寫下觸發條件、輸入、步驟、輸出與驗收人。例如收到已確認查詢後產生待審草稿，而非直接傳送。缺欄位、重複提交、無權限及無法判斷的情況，都要指定轉交對象。", "覆寫原始資料、對外傳送與付款應加上人工批准。保留原始紀錄和版本，指定可暫停流程的人，並讓原有流程能在失敗時接手。"),
        section("完成一個循環再擴大", "先量度現況，再以匿名樣本測試一般、缺資料、重複與例外情境。每次輸出記下審查時間及修正原因，不能只看展示速度。到約定檢討日決定保留、調整或停止，再考慮第二條流程。"),
      ],
      limitations: "敏感資料、重要決策或不可逆操作需要更嚴格的權限與專業覆核。本方法不保證節省時間；輸入不穩定時，先整理資料可能更有用。",
      faqs: [{ question: "一定要使用 AI 嗎？", answer: "不一定。固定規則的驗證、提醒和資料轉移，傳統自動化可能更容易測試。需要理解非結構化內容時，再評估 AI 及人工覆核成本。" }],
    },
    en: {
      title: "How to choose your first automation workflow",
      excerpt: "Start with repeatable, reviewable work that has a clear input, owner and fallback—not the biggest department.",
      directAnswer: "Choose work that repeats, follows reasonably stable rules, has accessible inputs and allows human review or recovery. Drafting, organising and reminders are safer starting points than automatic payments or irreversible outbound messages.",
      keyTakeaways: ["Prefer stable rules and accessible inputs over impressive demos.", "Name an owner, review gate and stop procedure before testing.", "Record a baseline and compare the pilot on the same basis."],
      sections: [
        section("Shortlist three workflows, not a hundred tools", "List repeated work from recent operations: organising enquiries, drafting quotation follow-ups or classifying documents. For each, record frequency, active handling time, exceptions, sensitivity and the final approver. High frequency is not enough: a process whose rules change daily may be a worse first candidate than a smaller stable one."),
        section("Write a one-page operating boundary", "Describe the trigger, input fields, steps, output and accepting owner. An example boundary is producing a reviewable draft after an enquiry is confirmed, not sending it directly. Missing fields, duplicate submissions, denied access and uncertain model output each need an explicit human destination.", "Require approval before overwriting original data, sending externally or moving money. Keep the original records and versions. Name the person who can pause the workflow and document how the existing process takes over after failure."),
        section("Finish one review cycle before expanding", "Measure the current process, then test anonymised normal, missing-data, duplicate and exception cases. Log review time and correction reasons for every output rather than timing only the demonstration. At the agreed review date, decide whether to retain, change or stop the workflow before adding another."),
      ],
      limitations: "Sensitive data, consequential decisions and irreversible operations need stricter access controls and specialist review. This selection method does not guarantee savings. Unstable inputs may make data cleanup the better first project.",
      faqs: [{ question: "Does the first automation need AI?", answer: "No. Deterministic validation, reminders and data movement may be easier to test without it. Assess AI when interpretation of unstructured content is genuinely needed, including the cost of human review." }],
    },
    ja: {
      title: "最初に自動化する業務の選び方",
      excerpt: "大きな部署より、入力・担当・復旧手順が明確で、繰り返し検証できる業務から。",
      directAnswer: "反復性があり、ルールが比較的安定し、入力データが利用でき、人による確認や復旧が可能な業務を選びます。自動決済や取り消せない送信より、下書き、整理、リマインダーが適しています。",
      keyTakeaways: ["派手なデモより安定したルールと入力を優先する。", "担当者、確認工程、停止手順を決める。", "現状値を記録し、同じ条件で試行を比べる。"],
      sections: [
        section("ツールではなく候補業務を三つ挙げる", "問い合わせ整理、見積後の連絡文案、文書分類など、最近繰り返した仕事を挙げます。頻度、実作業時間、例外、機密性、最終承認者を記録してください。件数が多くてもルールが毎日変わる業務より、小規模で安定した仕事が適する場合があります。"),
        section("1ページで運用境界を決める", "開始条件、入力項目、手順、出力、受け入れ担当を記載します。例えば確認済みの問い合わせから確認用の下書きを作り、直接送信はしません。欠損、重複、権限不足、AIの判断不能を誰に戻すかも決めます。", "原本の上書き、外部送信、送金には人の承認を設けます。元データと版を残し、停止できる担当を決め、失敗時に既存の手順へ戻す方法を書きます。"),
        section("一回の評価周期を終えてから広げる", "現状を測定した後、匿名化した通常例、欠損例、重複例、例外を試します。デモの速さだけでなく、毎回の確認時間と修正理由を記録します。合意した見直し日に継続、修正、中止を判断してから次の業務へ進みます。"),
      ],
      limitations: "機密情報、重要な判断、不可逆操作には厳しい権限制御と専門家の確認が必要です。時間短縮の保証はありません。入力が不安定ならデータ整理を先に行う方が適切です。",
      faqs: [{ question: "最初からAIが必要ですか？", answer: "不要な場合もあります。固定ルールの検証、通知、データ転送は通常の自動化の方が試しやすいことがあります。非構造化情報の解釈が必要な場合に、確認負担も含めてAIを検討します。" }],
    },
    de: {
      title: "Den ersten Automatisierungsprozess sinnvoll auswählen",
      excerpt: "Wiederholbare, prüfbare Arbeit mit klaren Eingaben, Verantwortung und Rückfallweg ist ein besserer Anfang als die größte Abteilung.",
      directAnswer: "Wählen Sie wiederkehrende Arbeit mit stabilen Regeln, zugänglichen Daten und menschlicher Prüfung oder Wiederherstellung. Entwürfe, Ordnung und Erinnerungen eignen sich eher zum Einstieg als automatische Zahlungen oder unumkehrbare Nachrichten.",
      keyTakeaways: ["Stabile Regeln und verfügbare Eingaben vor eindrucksvollen Demos priorisieren.", "Verantwortlichen, Prüfschritt und Stoppverfahren benennen.", "Ausgangswerte erfassen und unter gleichen Bedingungen vergleichen."],
      sections: [
        section("Drei Abläufe statt hundert Tools auswählen", "Sammeln Sie wiederkehrende Arbeit: Anfragen ordnen, Angebotsnachfassaktionen entwerfen oder Dokumente einteilen. Erfassen Sie Häufigkeit, aktive Bearbeitungszeit, Ausnahmen, Vertraulichkeit und Freigabeverantwortung. Häufigkeit allein reicht nicht: täglich wechselnde Regeln können einen kleinen stabilen Ablauf zum besseren Kandidaten machen."),
        section("Die Betriebsgrenze auf einer Seite festhalten", "Beschreiben Sie Auslöser, Eingabefelder, Schritte, Ergebnis und Abnahme. Ein bestätigter Eingang könnte einen prüfbaren Entwurf erzeugen, aber keinen direkten Versand. Fehlende Felder, Dubletten, verweigerter Zugriff und unklare Modellausgaben brauchen jeweils eine zuständige Person.", "Vor Überschreiben, externem Versand oder Geldbewegungen ist eine Freigabe nötig. Bewahren Sie Originale und Versionen auf. Benennen Sie die Person, die pausieren darf, und beschreiben Sie die Rückkehr zum bisherigen Verfahren."),
        section("Einen Prüfzyklus abschließen", "Messen Sie den bisherigen Ablauf und testen Sie dann anonymisierte Normalfälle, Lücken, Dubletten und Ausnahmen. Protokollieren Sie Prüfzeit und Korrekturgründe jedes Ergebnisses, nicht nur die Geschwindigkeit der Demo. Am vereinbarten Termin entscheiden Sie über Fortsetzung, Änderung oder Stopp, bevor ein zweiter Ablauf hinzukommt."),
      ],
      limitations: "Vertrauliche Daten, folgenreiche Entscheidungen und unumkehrbare Aktionen brauchen strengere Zugriffe und fachliche Prüfung. Einsparungen sind nicht garantiert; bei instabilen Eingaben kann Datenbereinigung zuerst sinnvoller sein.",
      faqs: [{ question: "Muss die erste Automatisierung KI nutzen?", answer: "Nein. Regelbasierte Prüfung, Erinnerungen und Datentransfer sind oft ohne KI leichter zu testen. Prüfen Sie KI bei tatsächlichem Interpretationsbedarf unstrukturierter Inhalte einschließlich des menschlichen Prüfaufwands." }],
    },
  }),
  post("measure-ai-pilot-hours-errors-rework", "ai-data-governance", ["workflow", "governance", "cases"], ["discovery", "privateAi"], {
    "zh-hk": {
      title: "AI 試點點量度：工時、錯誤、返工同維護要一齊計",
      excerpt: "一個快嘅示範唔等於節省。用相同樣本口徑，分開處理時間、覆核、修正及維護。",
      directAnswer: "先記錄人工基線，再量度試點嘅處理、覆核、返工同維護時間，以及錯誤類型。用同一類工作比較；AI 出答案快，唔代表整條流程快或值得擴大。",
      keyTakeaways: ["人工基線同試點要用相同工作量及難度。", "覆核、返工、維護唔可以藏喺節省數字之外。", "事先定停止條件，唔好完成示範先改成功標準。"],
      sections: [
        section("先定量度單位同資料權限", "揀一個完成單位，例如一張已覆核單據或一份已批准教材；分開實際工時同等候時間。記錄樣本量、複雜度、缺資料率同錯誤定義。用匿名樣本，限制日誌可見範圍及保留期，唔好為量度而額外收集個人資料。"),
        section("示意公式：唔係客戶成效", "以下只係計算方法，並非實測結果：每期人工工時 = 件數 × 每件人工分鐘 ÷ 60。試點工時 = 件數 ×（操作 + 覆核 + 返工分鐘）÷ 60 + 每期維護工時。淨工時差 = 人工工時 − 試點工時；負數即增加工作。一次性設定同培訓另列。", "錯誤率 = 有確認錯誤嘅已檢查輸出 ÷ 已檢查輸出；返工率 = 要修正嘅已完成項目 ÷ 已完成項目。分母為零就寫不適用。安全事故、錯誤付款等嚴重問題要另記，唔可以畀平均數沖淡。"),
        section("先寫擴大、修改同停止條件", "試行前由流程負責人同覆核者確認可接受錯誤、工時上限、抽查方式同檢討日期。權限外洩或未批准對外發送可以設為立即停止條件。記錄版本、修正原因、維護人及時間；若樣本太少或難度改變，就延長觀察，唔好硬算 ROI。", "Agilizing 教材製作由 10 日到 3 小時，只限客戶業主確認嘅 2026 年 1–2 月個案。唔可以當成其他流程嘅預測，亦唔應換算成 ROI 百分比。ZOmate 同 Flower Nice Day 案例唔提供效能數字。"),
      ],
      limitations: "公式係示意，唔包含所有財務成本，亦唔係保證回報。API／AI 用量、接駁、一次性設定、授權同機會成本要另外記錄；不同難度或抽樣方法會令比較失真。",
      faqs: [{ question: "只量度模型回覆時間得唔得？", answer: "唔夠。由資料準備到覆核、修正及交付都要計；等候時間同實際工時分開，先知道係縮短交付定減少人手工作。" }],
    },
    "zh-tw": {
      title: "如何衡量 AI 試點：工時、錯誤、返工與維護一起看",
      excerpt: "快速展示不等於節省。以一致樣本口徑計算處理、覆核、修正與維護。",
      directAnswer: "先記錄人工基準，再量度試點的操作、覆核、返工和維護時間，以及錯誤類型。比較同類工作；AI 回答快，不代表整條流程更快或值得擴大。",
      keyTakeaways: ["基準與試點使用相同工作量及難度。", "覆核、返工、維護不能排除在節省計算之外。", "事先約定停止條件，不要事後調整成功標準。"],
      sections: [
        section("定義完成單位與資料權限", "選擇一個完成單位，例如已覆核單據或已批准教材；區分實際工時與等待時間。記下樣本量、複雜度、缺資料率及錯誤定義。使用匿名樣本，限制日誌權限與保存期限，不要為了量度額外蒐集個人資料。"),
        section("示意公式，不是客戶成果", "以下是計算方法，不是實測結果：每期人工工時 = 件數 × 每件人工分鐘 ÷ 60。試點工時 = 件數 ×（操作 + 覆核 + 返工分鐘）÷ 60 + 每期維護工時。淨工時差 = 人工工時 − 試點工時；負值代表增加工作。一次性設定與培訓另列。", "錯誤率 = 有確認錯誤的已檢查輸出 ÷ 已檢查輸出；返工率 = 需要修正的已完成項目 ÷ 已完成項目。分母為零時標記不適用。資料外洩或錯誤付款等重大問題應獨立記錄，不能被平均值掩蓋。"),
        section("預先約定擴大、修改與停止條件", "由負責人與覆核者先確認可接受錯誤、工時上限、抽查方式及檢討日期。權限外洩或未批准傳送可列為立即停止條件。記錄版本、修正原因、維護者與時間；樣本不足或難度改變時，延長觀察而非勉強計算 ROI。", "Agilizing 教材製作由 10 天至 3 小時，僅限客戶業主確認的 2026 年 1–2 月案例。不能預測其他流程，也不應換算為 ROI 百分比。ZOmate 與 Flower Nice Day 案例沒有提供效能數字。"),
      ],
      limitations: "公式僅供示意，不包含所有財務成本或保證回報。API／AI 用量、整合、一次性設定、授權及機會成本須另記；工作難度與抽樣方式差異會影響比較。",
      faqs: [{ question: "只量度模型回應時間可以嗎？", answer: "不夠。資料準備、覆核、修正及交付都應計入；等待時間和實際工時分開，才能分辨交付加速與人力減少。" }],
    },
    en: {
      title: "Measuring an AI pilot: hours, errors, rework and maintenance",
      excerpt: "A fast demonstration is not a saving. Measure preparation, handling, review, correction and upkeep on a comparable sample.",
      directAnswer: "Record the manual baseline, then measure pilot handling, review, rework and maintenance alongside error types. Compare like-for-like work: a fast model response does not prove a faster end-to-end process or justify expansion.",
      keyTakeaways: ["Use comparable volume and difficulty for the baseline and pilot.", "Include review, rework and maintenance in the workload.", "Agree stopping conditions before the demo, not success criteria afterwards."],
      sections: [
        section("Define the unit and protect the measurement data", "Choose a completed unit, such as one reviewed receipt or one approved training pack. Separate active labour from elapsed waiting time. Record sample size, complexity, missing-input rate and the definition of an error. Use anonymised samples and restricted, time-limited logs; measurement is not a reason to collect more personal data."),
        section("Illustrative formulas, not customer outcomes", "These are calculation methods, not measured results: manual hours per period = volume × manual minutes per item ÷ 60. Pilot hours = volume × (handling + review + rework minutes per item) ÷ 60 + maintenance hours per period. Net hours difference = manual hours − pilot hours; a negative value means more work. Record one-time setup and training separately.", "Error rate = inspected outputs with confirmed errors ÷ inspected outputs. Rework rate = completed items needing correction ÷ completed items. Mark a zero denominator as not applicable. Log serious events such as data exposure or incorrect payments separately so averages cannot hide them."),
        section("Agree expand, change and stop decisions", "Before testing, the owner and reviewer should agree acceptable errors, workload limits, sampling and the review date. Permission leaks or unapproved external sending can trigger immediate suspension. Log versions, correction reasons, maintainer and time. If the sample is small or its difficulty changes, extend observation instead of forcing an ROI calculation.", "Agilizing's training-material production changed from 10 days to 3 hours in the specific January–February 2026 case confirmed by the client owner. This is not a forecast for other workflows or an ROI percentage. The ZOmate and Flower Nice Day cases provide no performance figures."),
      ],
      limitations: "The formulas are illustrative, not a full financial model or return guarantee. Track API/AI usage, integrations, setup, licences and opportunity costs separately. Differences in difficulty or sampling can invalidate a comparison.",
      faqs: [{ question: "Can we just time the model response?", answer: "No. Include preparation, review, correction and delivery. Distinguish elapsed waiting from active labour to tell faster turnaround from reduced human work." }],
    },
    ja: {
      title: "AI試行の測り方：工数・誤り・手戻り・保守を分ける",
      excerpt: "速いデモは削減の証明ではありません。同じ条件で処理、確認、修正、保守を測ります。",
      directAnswer: "手作業の基準を記録し、試行の操作、確認、手戻り、保守時間と誤りの種類を測定します。同じ仕事を比較してください。モデルの返答速度だけでは全体の改善や拡大の根拠になりません。",
      keyTakeaways: ["基準と試行の量・難易度をそろえる。", "確認、手戻り、保守を工数に含める。", "成功基準を後付けせず停止条件を先に合意する。"],
      sections: [
        section("完了単位と測定データの権限", "確認済みの領収書1件や承認済み教材1組など、完了単位を決めます。実作業時間と待ち時間を分け、件数、難易度、入力欠損率、誤りの定義を記録します。匿名サンプルを使い、ログの閲覧権限と保存期間を制限します。測定のために個人情報を増やさないでください。"),
        section("計算例であり顧客の成果ではない式", "以下は計算方法の例であり実測値ではありません。期間内の手作業時間 = 件数 × 1件の作業分数 ÷ 60。試行時間 = 件数 ×（操作 + 確認 + 手戻りの分数）÷ 60 + 期間内の保守時間。正味工数差 = 手作業時間 − 試行時間。負数は作業増を意味します。初期設定と研修は別に記録します。", "誤り率 = 誤りを確認した検査済み出力 ÷ 検査済み出力。手戻り率 = 修正が必要な完了項目 ÷ 完了項目。分母がゼロなら適用不可とします。漏えいや誤送金など重大な事象は別記し、平均値に埋もれさせません。"),
        section("拡大・修正・停止の条件を決める", "担当者と確認者が許容誤り、工数上限、抽出方法、評価日を先に合意します。権限漏れや未承認の外部送信は即時停止条件にできます。版、修正理由、保守担当と時間を記録し、標本が少ない場合や難易度が変わった場合は、無理にROIを算出せず観察を続けます。", "Agilizingの教材制作が10日から3時間になったのは、顧客オーナーが確認した2026年1〜2月の個別事例です。他業務の予測やROI割合には使いません。ZOmateとFlower Nice Dayの事例には性能数値がありません。"),
      ],
      limitations: "式は説明用であり、完全な財務モデルや利益保証ではありません。API・AI利用、連携、初期設定、ライセンス、機会費用は別途記録します。難易度や抽出方法の違いで比較が無効になることがあります。",
      faqs: [{ question: "モデルの応答時間だけ測ればよいですか？", answer: "いいえ。準備、確認、修正、納品も含めます。待ち時間と実作業を分け、納期短縮なのか人の負担削減なのかを確認します。" }],
    },
    de: {
      title: "KI-Piloten messen: Stunden, Fehler, Nacharbeit und Wartung",
      excerpt: "Eine schnelle Demo ist keine Einsparung. Vorbereitung, Bearbeitung, Prüfung, Korrektur und Pflege gehören zum Vergleich.",
      directAnswer: "Erfassen Sie den manuellen Ausgangszustand und danach Bearbeitung, Prüfung, Nacharbeit, Wartung sowie Fehlerarten im Piloten. Vergleichen Sie gleichartige Arbeit: Eine schnelle Modellantwort beweist keinen schnelleren Gesamtprozess.",
      keyTakeaways: ["Menge und Schwierigkeit im Ausgangszustand und Piloten vergleichbar halten.", "Prüfung, Nacharbeit und Wartung in den Aufwand aufnehmen.", "Abbruchbedingungen vorab vereinbaren statt Erfolgskriterien nachträglich ändern."],
      sections: [
        section("Einheit und Datenschutz festlegen", "Wählen Sie eine abgeschlossene Einheit, etwa einen geprüften Beleg oder freigegebene Schulungsunterlagen. Trennen Sie Arbeits- von Wartezeit. Erfassen Sie Stichprobengröße, Schwierigkeit, fehlende Eingaben und Fehlerdefinitionen. Nutzen Sie anonymisierte Beispiele und zugriffsbeschränkte, befristete Protokolle; Messung rechtfertigt keine zusätzliche Sammlung personenbezogener Daten."),
        section("Illustrative Formeln, keine Kundenergebnisse", "Die folgenden Formeln erläutern eine Methode, keine gemessenen Ergebnisse: manuelle Stunden pro Zeitraum = Menge × manuelle Minuten je Einheit ÷ 60. Pilotstunden = Menge × (Bearbeitungs- + Prüf- + Nacharbeitsminuten je Einheit) ÷ 60 + Wartungsstunden im Zeitraum. Nettostundendifferenz = manuelle Stunden − Pilotstunden. Ein negativer Wert bedeutet Mehrarbeit. Einrichtung und Schulung separat erfassen.", "Fehlerquote = geprüfte Ausgaben mit bestätigtem Fehler ÷ geprüfte Ausgaben. Nacharbeitsquote = korrekturbedürftige abgeschlossene Einheiten ÷ abgeschlossene Einheiten. Bei Nenner null: nicht anwendbar. Schwere Vorfälle wie Datenoffenlegung oder Fehlzahlungen separat ausweisen, damit Durchschnittswerte sie nicht verdecken."),
        section("Erweitern, ändern oder stoppen", "Verantwortliche und Prüfer vereinbaren akzeptable Fehler, Aufwandsgrenzen, Stichproben und Prüftermin vorab. Berechtigungslecks oder unfreigegebener Versand können sofortige Stopps auslösen. Version, Korrekturgrund, Wartungsverantwortlichen und Zeit protokollieren. Bei kleinen Stichproben oder veränderter Schwierigkeit länger beobachten, statt einen ROI zu erzwingen.", "Agilizings Schulungsmaterialproduktion sank im vom Kundeninhaber bestätigten Einzelfall Januar–Februar 2026 von 10 Tagen auf 3 Stunden. Das ist weder eine Prognose für andere Abläufe noch eine ROI-Prozentangabe. Für ZOmate und Flower Nice Day werden keine Leistungszahlen angegeben."),
      ],
      limitations: "Die Formeln sind illustrativ, kein vollständiges Finanzmodell und keine Renditezusage. API-/KI-Verbrauch, Integrationen, Einrichtung, Lizenzen und Opportunitätskosten gesondert erfassen. Abweichende Schwierigkeit oder Stichproben können den Vergleich entwerten.",
      faqs: [{ question: "Reicht die Antwortzeit des Modells?", answer: "Nein. Vorbereitung, Prüfung, Korrektur und Übergabe gehören dazu. Wartezeit und aktive Arbeit getrennt messen, um kürzere Durchlaufzeit von weniger Personalaufwand zu unterscheiden." }],
    },
  }),
  post("post-event-follow-up-eventxp", "crm-events-membership", ["events", "crm", "governance"], ["events", "crm"], {
    "zh-hk": {
      title: "活動完咗之後點跟進？由 EventXP 出席紀錄到下一步",
      excerpt: "簽到唔係終點。活動前先定資料用途、跟進負責人同有意義嘅下一步。",
      directAnswer: "先把報名、出席同跟進狀態分開，為每個需要跟進嘅參加者指定負責人、理由同日期。EventXP 可以作活動流程起點，但 CRM 交接、訊息發送同會員規則要另外確認。",
      keyTakeaways: ["出席唔等於同意接受所有推廣。", "每個跟進要有負責人、目的同下一步日期。", "量度完成跟進與回覆，唔好只報簽到人數。"],
      sections: [
        section("活動前就設計活動後嘅資料", "只收集會用到嘅欄位，例如報名識別碼、興趣、聯絡方式同適當同意紀錄。分清報名未到、已到、要求資料同不再聯絡。避免現場自由文字包含敏感資訊，並限制工作人員可見範圍。"),
        section("活動後先分流，再安排聯絡", "先核對重複報名同出席資料，保留原始匯出。按參加者要求分為寄資料、安排會面、下次活動通知或毋須行動。每項寫低負責人、日期同訊息草稿；冇清楚目的嘅名單唔應一次過群發。", "EventXP 同 CRM 之間先用已確認欄位作受控交接；驗證名單筆數、識別碼同同意狀態。自動接駁、WhatsApp 發送、模板審批同平台用量要先評估及報價，唔係簽到後自動包埋。"),
        section("檢討真正完成咗乜", "定義已分派、已聯絡、有回覆、約到下一步等狀態，分開記錄同一活動嘅群組。回覆率要寫清楚分母係已送達、已聯絡定已報名，唔好混用。逐項檢查逾期跟進及退訂處理，先知道係交接問題定訊息唔相關。", "如果涉及會員續期，先確認到期日、會員身份同聯絡用途；積分、優惠券、自動扣款唔應視為標準活動跟進功能。ZOmate 案例可以參考課堂與會員流程，但唔係 EventXP 成效或轉換率證據。"),
      ],
      limitations: "本文係流程建議，唔保證報名、回覆或成交數字，亦唔係法律意見。推廣用途、退訂、資料保留及不同平台規則，要由負責人核實。",
      faqs: [{ question: "活動後可以直接將全部人放入銷售名單嗎？", answer: "唔應只因出席就假設有推廣同意。先確認收集時用途、適用規則同退訂處理；只交接獲准及有需要嘅資料。" }],
    },
    "zh-tw": {
      title: "活動後如何跟進？從 EventXP 出席紀錄到下一步",
      excerpt: "簽到不是終點。活動前就應確認資料用途、跟進負責人與下一步。",
      directAnswer: "把報名、出席與跟進狀態分開，為需要跟進的參加者指定負責人、理由和日期。EventXP 可作為活動流程起點，但 CRM 交接、訊息傳送與會員規則須另外確認。",
      keyTakeaways: ["出席不代表同意所有行銷用途。", "每次跟進需要負責人、目的及日期。", "衡量完成跟進與回覆，不只計算簽到人數。"],
      sections: [
        section("活動前設計資料欄位", "只收集會採取行動的欄位，例如報名識別碼、興趣、聯絡方式與適當同意紀錄。區分未到、已到、索取資料及不再聯絡。避免現場自由文字包含敏感資訊，並限制工作人員可見範圍。"),
        section("先分類再聯絡", "核對重複報名與出席資料，保留原始匯出。依參加者要求分為寄送資料、安排會面、下次活動通知或不需行動。每項註明負責人、日期和訊息草稿；目的不明的名單不應直接群發。", "EventXP 與 CRM 先依確認欄位受控交接，核對筆數、識別碼及同意狀態。自動整合、WhatsApp 傳送、模板審批和平台用量須另行評估報價，不是簽到後自動包含。"),
        section("檢討實際完成的行動", "定義已分派、已聯絡、有回覆及已約定下一步，並按同一活動群組記錄。回覆率須明確標示分母是已送達、已聯絡或已報名，不能混用。檢查逾期任務與退訂處理，判斷問題在交接還是訊息相關性。", "若包含會員續期，先核對到期日、會員身分與聯絡用途。積分、優惠券、自動扣款不是標準跟進功能。ZOmate 可供參考課堂及會員流程，並非 EventXP 成效或轉換率證據。"),
      ],
      limitations: "本文不保證報名、回覆或成交數字，也不是法律意見。行銷用途、退訂、保存期限與平台規則須由負責人核實。",
      faqs: [{ question: "能直接把全部參加者加入銷售名單嗎？", answer: "不能僅因出席就推定行銷同意。先核對收集目的、適用規則和退訂處理，只交接獲准且必要的資料。" }],
    },
    en: {
      title: "Post-event follow-up: from EventXP attendance to a next action",
      excerpt: "Check-in is a starting point. Define data use, ownership and a relevant next step before the event opens.",
      directAnswer: "Separate registration, attendance and follow-up status. Give each relevant follow-up an owner, reason and date. EventXP can anchor the event workflow, but CRM handover, message sending and membership rules require their own agreed scope.",
      keyTakeaways: ["Attendance is not blanket marketing consent.", "Every follow-up needs an owner, purpose and due date.", "Measure completed follow-ups and responses, not just check-ins."],
      sections: [
        section("Design the after-event record before the event", "Collect only fields you will use: a registration identifier, interests, contact channel and appropriate consent records. Distinguish registered/no-show, attended, requested information and do-not-contact. Avoid sensitive free-text notes and restrict what event staff can see."),
        section("Triage before sending", "Reconcile duplicate registrations and attendance while retaining the original export. Route requests into information delivery, a meeting, a future-event notice or no action. Assign an owner, due date and draft message to each task. An unexplained list is not a reason for a bulk send.", "Start EventXP-to-CRM handover with agreed fields and controlled transfer. Check counts, identifiers and consent status. Automatic integrations, WhatsApp sending, template approvals and platform usage need feasibility review and pricing; they are not automatically included with check-in."),
        section("Review what actually happened", "Define assigned, contacted, replied and next-step-agreed states within the same event cohort. Specify whether the response-rate denominator is delivered messages, contacted people or registrations; do not interchange them. Check overdue actions and opt-outs to distinguish failed handovers from irrelevant messages.", "For membership renewal, verify expiry dates, membership identity and contact purpose. Points, coupons and automatic billing are not standard follow-up assumptions. ZOmate offers a related class/membership workflow example, not evidence of EventXP conversion or performance."),
      ],
      limitations: "This workflow guidance does not guarantee registrations, responses or sales and is not legal advice. The owner must confirm marketing purposes, opt-outs, retention and platform rules.",
      faqs: [{ question: "Can we add every attendee to a sales list?", answer: "Do not infer marketing permission from attendance alone. Check the original collection purpose, applicable rules and opt-out handling; transfer only permitted and necessary data." }],
    },
    ja: {
      title: "イベント後のフォロー：EventXPの参加記録を次の行動へ",
      excerpt: "受付で終わらせず、開催前にデータ用途、担当者、次の行動を決めます。",
      directAnswer: "登録、参加、フォロー状態を分け、必要な連絡に担当者、理由、期限を付けます。EventXPをイベント業務の起点にできますが、CRMへの引き継ぎ、送信、会員ルールは別途範囲を確認します。",
      keyTakeaways: ["参加は包括的な宣伝同意ではない。", "連絡ごとに担当、目的、期限を付ける。", "受付人数だけでなく完了した連絡と返信を測る。"],
      sections: [
        section("開催前に終了後の記録を設計する", "登録ID、関心、連絡手段、適切な同意記録など使う項目だけを集めます。登録後欠席、参加、資料希望、連絡不要を区別します。機密情報を自由記述欄に残さず、スタッフの閲覧範囲を制限します。"),
        section("送信前に分類する", "元のエクスポートを保管しつつ重複と参加状況を照合します。資料送付、面談、次回案内、対応不要に分け、担当、期限、文案を設定します。目的不明の名簿に一斉送信しないでください。", "EventXPからCRMへの引き継ぎは合意した項目を管理下で移し、件数、ID、同意状態を確認します。自動連携、WhatsApp送信、テンプレート承認、利用料は別途実現性と料金を確認する必要があります。"),
        section("実際の行動を振り返る", "同じイベント参加群の中で、割当済み、連絡済み、返信あり、次の行動合意済みを定義します。返信率の分母が配信済み、連絡済み、登録者のどれか明記します。期限超過と配信停止処理を確認し、引き継ぎか内容の問題かを見分けます。", "会員更新なら期限、本人識別、連絡目的を確認します。ポイント、クーポン、自動課金を標準フォロー機能と考えないでください。ZOmateはクラス・会員業務の参考例であり、EventXPの転換率や性能の証拠ではありません。"),
      ],
      limitations: "登録、返信、売上の保証ではなく法律助言でもありません。宣伝用途、配信停止、保存期間、プラットフォーム規則は担当者が確認してください。",
      faqs: [{ question: "参加者全員を営業リストに入れられますか？", answer: "参加だけで宣伝への同意を推定しません。収集時の目的、適用ルール、配信停止対応を確認し、許可された必要なデータだけを移します。" }],
    },
    de: {
      title: "Nach dem Event: Von EventXP-Teilnahme zur nächsten Aktion",
      excerpt: "Check-in ist der Anfang. Datenzweck, Zuständigkeit und sinnvolle Folgeschritte gehören vorab geklärt.",
      directAnswer: "Trennen Sie Anmeldung, Teilnahme und Nachfassstatus. Jede relevante Nachfassaktion erhält Verantwortlichen, Grund und Termin. EventXP kann den Veranstaltungsablauf abbilden; CRM-Übergabe, Nachrichtenversand und Mitgliedschaftsregeln brauchen gesonderte Vereinbarungen.",
      keyTakeaways: ["Teilnahme ist keine pauschale Werbeeinwilligung.", "Jede Nachfassaktion braucht Zweck, Zuständigkeit und Termin.", "Erledigte Kontakte und Antworten statt nur Check-ins messen."],
      sections: [
        section("Den Datensatz für danach vorher planen", "Erfassen Sie nur nutzbare Felder: Anmeldekennung, Interessen, Kontaktkanal und geeignete Einwilligungsnachweise. Unterscheiden Sie angemeldet/abwesend, anwesend, Informationswunsch und keine weitere Kontaktaufnahme. Vermeiden Sie sensible Freitextnotizen und beschränken Sie die Sicht der Veranstaltungsmitarbeiter."),
        section("Vor dem Versand sortieren", "Gleichen Sie doppelte Anmeldungen und Teilnahme ab, behalten Sie den Originalexport. Ordnen Sie Wünsche nach Informationsversand, Gespräch, nächster Veranstaltung oder keiner Aktion. Jede Aufgabe erhält Verantwortlichen, Termin und Entwurf. Eine Liste ohne klaren Zweck rechtfertigt keinen Massenversand.", "Beginnen Sie die EventXP-CRM-Übergabe mit vereinbarten Feldern und kontrolliertem Transfer. Prüfen Sie Anzahl, Kennungen und Einwilligungsstatus. Automatische Integrationen, WhatsApp-Versand, Vorlagenfreigaben und Plattformverbrauch werden gesondert geprüft und kalkuliert."),
        section("Tatsächliche Folgeschritte prüfen", "Definieren Sie zugewiesen, kontaktiert, geantwortet und nächster Schritt vereinbart für dieselbe Veranstaltungskohorte. Benennen Sie den Nenner der Antwortquote: zugestellte Nachrichten, kontaktierte Personen oder Anmeldungen. Überfällige Aufgaben und Abmeldungen zeigen, ob Übergabe oder Relevanz der Nachricht problematisch sind.", "Bei Mitgliedschaftsverlängerungen prüfen Sie Ablaufdatum, Identität und Kontaktzweck. Punkte, Gutscheine und automatische Abbuchung sind keine selbstverständlichen Standardfunktionen. ZOmate liefert ein verwandtes Kurs-/Mitgliedschaftsbeispiel, keinen Nachweis für EventXP-Konversion oder Leistung."),
      ],
      limitations: "Die Anleitung garantiert keine Anmeldungen, Antworten oder Verkäufe und ersetzt keine Rechtsberatung. Werbezwecke, Abmeldungen, Aufbewahrung und Plattformregeln müssen geprüft werden.",
      faqs: [{ question: "Dürfen alle Teilnehmenden auf eine Vertriebsliste?", answer: "Werbeerlaubnis folgt nicht allein aus Teilnahme. Prüfen Sie Erhebungszweck, geltende Regeln und Abmeldung. Übergeben Sie nur erlaubte und erforderliche Daten." }],
    },
  }),
  post("smartsales-enterprise-crm-checklist", "guides-comparisons", ["crm"], ["crm", "discovery"], {
    "zh-hk": {
      title: "SmartSales 定企業 CRM：先用決策清單，唔好先比功能數量",
      excerpt: "以流程、權限、既有系統同總成本判斷；唔靠未核實嘅競品規格或價錢。",
      directAnswer: "單一團隊需要客戶、商機、負責人同跟進任務，可以評估 SmartSales；跨部門權限、既有平台投資或大量接駁，就應同時評估沿用企業 CRM。未確認版本、範圍同總成本，唔應宣稱邊個較平或較好。",
      keyTakeaways: ["先確認需求同現有系統可重用部分。", "Pilot、正式建置同每月維護係三份獨立範圍。", "用同一組驗收情境比較供應方，唔好比較宣傳字眼。"],
      sections: [
        section("用六條問題寫出需求", "有幾多使用者同角色？有幾條 pipeline？資料來源同筆數係乜？邊啲人唔可以睇到某啲資料？邊啲系統必須接駁？離開平台時要匯出乜？答案會影響資料清理、權限測試、培訓同交付責任，唔只係功能清單。"),
        section("SmartSales 收費要分三層睇", `限定流程 Pilot ${price(PRICING.tools.smartSales.trial, "zh-hk")}；正式建置 Starter ${price(PRICING.tools.smartSales.setupStarter, "zh-hk")} 起、Growth ${price(PRICING.tools.smartSales.setupGrowth, "zh-hk")} 起；維護 Starter ${price(PRICING.tools.smartSales.maintenanceStarterMonthly, "zh-hk")}／月起。Pilot 唔會自動抵扣上線費，月費唔包首次建置。`, "WhatsApp API、AI 用量、第三方授權、託管、接駁同客製會員積分另列。標準內部提醒唔等於自動對外發訊；會員優惠、退款扣分、支付同 portal 要先出規則同獨立報價。"),
        section("先驗證沿用，再比較遷移", "如果已有 Salesforce、Odoo 或其他平台，先查版本、授權、設定同資料存取。請各方示範同一組情境：新查詢、交接、限制權限、逾期跟進、資料匯出。同時問清楚由邊個維護、變更點報價及失敗點復原。", "比較總成本時分開一次性清理與建置、每月維護、授權與用量、培訓同退出成本。企業供應方規格及價錢以當前書面報價為準；唔好將 SmartSales 上線價當成其他平台客製費用。"),
      ],
      limitations: "呢份係選擇清單，唔係產品排名或競品規格聲明。適配受實際版本、資料質素、法規同整合權限影響；公開起價唔係所有需求嘅最終價。",
      faqs: [{ question: "已有企業 CRM，仲要換嗎？", answer: "唔一定。先睇設定、責任同採用習慣可唔可以改善；沿用可能減少重複建置，但未檢查前唔保證更平。" }],
    },
    "zh-tw": {
      title: "SmartSales 或企業 CRM：先用決策清單，不先比功能數量",
      excerpt: "依流程、權限、既有投資與總成本判斷，不引用未核實的競品規格或價格。",
      directAnswer: "單一團隊需要客戶、商機、負責人及跟進任務，可評估 SmartSales；跨部門權限、既有平台投資或大量整合，則應同時評估沿用企業 CRM。未確認版本、範圍及總成本前，不宜宣稱誰更便宜或更好。",
      keyTakeaways: ["先確認需求與既有系統可重用部分。", "Pilot、正式建置、每月維護是獨立範圍。", "用相同驗收情境比較，不比較宣傳文字。"],
      sections: [
        section("以六個問題整理需求", "有多少使用者和角色？幾條 pipeline？資料來源和筆數？哪些人不能看到哪些資料？必須整合哪些系統？退出平台時要匯出什麼？答案決定清理、權限測試、培訓與交付責任，而不只是功能表。"),
        section("分開看 SmartSales 三層費用", `限定流程 Pilot ${price(PRICING.tools.smartSales.trial, "zh-tw")}；正式建置 Starter ${price(PRICING.tools.smartSales.setupStarter, "zh-tw")} 起、Growth ${price(PRICING.tools.smartSales.setupGrowth, "zh-tw")} 起；Starter 維護 ${price(PRICING.tools.smartSales.maintenanceStarterMonthly, "zh-tw")}／月起。Pilot 不自動抵扣建置費，月費不含首次建置。`, "WhatsApp API、AI 用量、第三方授權、託管、整合與客製會員積分另外計價。內部提醒不是自動對外傳送；會員優惠、退款扣分、支付及 portal 須先確認規則並獨立報價。"),
        section("先檢查沿用，再比較遷移", "已有 Salesforce、Odoo 或其他平台時，先檢查版本、授權、設定與資料存取。請供應方展示同一組情境：新查詢、交接、權限限制、逾期跟進及匯出。確認維護者、變更計價及失敗回復方式。", "總成本要分開一次性清理和建置、維護、授權與用量、培訓及退出費用。其他供應方規格與價格以當前書面報價為準，不能把 SmartSales 建置價當成其他平台客製費用。"),
      ],
      limitations: "這是決策清單，不是產品排名或競品規格聲明。適配取決於版本、資料品質、法規和整合權限，公開起價不是所有需求的最終價格。",
      faqs: [{ question: "已有企業 CRM，仍需更換嗎？", answer: "不一定。先改善設定、責任與使用習慣。沿用可能減少重複建置，但檢查前不能保證更便宜。" }],
    },
    en: {
      title: "SmartSales or enterprise CRM: a decision checklist",
      excerpt: "Compare workflow fit, permissions, existing investment and total cost—not unverified competitor specifications or prices.",
      directAnswer: "Evaluate SmartSales for a bounded team's contacts, opportunities, ownership and follow-up tasks. Also assess keeping an enterprise CRM when cross-team permissions, existing investment or extensive integrations dominate. No option is inherently cheaper or better without edition, scope and cost checks.",
      keyTakeaways: ["Check requirements and reusable existing configuration first.", "Pilot, production setup and monthly care are separate scopes.", "Compare providers against identical acceptance scenarios."],
      sections: [
        section("Write requirements with six questions", "How many users and roles? How many pipelines? Which data sources and record counts? Who must not see which records? Which integrations are mandatory? What must be exported when leaving? These answers determine cleanup, permission tests, training and delivery responsibility—not just the feature list."),
        section("Separate the three SmartSales cost layers", `The bounded workflow pilot is ${price(PRICING.tools.smartSales.trial, "en")}. Production setup starts at ${price(PRICING.tools.smartSales.setupStarter, "en")} for Starter or ${price(PRICING.tools.smartSales.setupGrowth, "en")} for Growth. Starter care starts at ${price(PRICING.tools.smartSales.maintenanceStarterMonthly, "en")}/month. The pilot is not automatically credited to setup; monthly care does not include initial implementation.`, "WhatsApp APIs, AI usage, third-party licences, hosting, integrations and custom loyalty rules are separate. Internal reminders are not automatic external messaging. Benefits, refund point reversals, payments and member portals need agreed rules and a separate quote."),
        section("Test reuse before pricing migration", "If you already use Salesforce, Odoo or another platform, inspect the edition, licences, configuration and data access. Ask each provider to demonstrate the same enquiry, handover, restricted-access, overdue-task and export scenarios. Ask who maintains it, how changes are priced and how failures are recovered.", "Separate one-time cleanup/setup, recurring care, licences/usage, training and exit costs. Obtain current written specifications and quotes from enterprise providers. SmartSales setup pricing is not a quote for customising another platform."),
      ],
      limitations: "This is a decision checklist, not a product ranking or competitor specification sheet. Fit depends on edition, data quality, regulatory requirements and integration permissions. Starting prices are not final quotes for every requirement.",
      faqs: [{ question: "Should we replace an existing enterprise CRM?", answer: "Not necessarily. Check configuration, responsibility and adoption first. Reuse may avoid duplicate implementation, but it cannot be promised cheaper before inspection." }],
    },
    ja: {
      title: "SmartSalesか企業向けCRMか：判断チェックリスト",
      excerpt: "未確認の競合仕様や価格ではなく、業務、権限、既存投資、総費用で比較します。",
      directAnswer: "一つのチームの顧客、商談、担当、フォロー管理ならSmartSalesを検討できます。部門横断の権限、既存投資、多数の連携が重要なら企業向けCRMの継続利用も評価します。版、範囲、費用を確認せず優劣は決められません。",
      keyTakeaways: ["要件と再利用できる設定を先に調べる。", "試行、本番構築、月次保守は別の範囲。", "同じ受け入れシナリオで比較する。"],
      sections: [
        section("六つの質問で要件を書く", "利用人数と役割はいくつか、パイプラインはいくつか、データ元と件数は何か、誰に見せてはいけない情報があるか、必須連携は何か、解約時に何を出力するか。これらが整理、権限テスト、研修、納品責任を決めます。機能数だけでは判断できません。"),
        section("SmartSalesの費用を三つに分ける", `限定業務の試行は ${price(PRICING.tools.smartSales.trial, "ja")}。本番構築はStarter ${price(PRICING.tools.smartSales.setupStarter, "ja")} から、Growth ${price(PRICING.tools.smartSales.setupGrowth, "ja")} から。Starter保守は月額 ${price(PRICING.tools.smartSales.maintenanceStarterMonthly, "ja")} からです。試行費は自動で構築費に充当されず、月額保守に初期導入は含まれません。`, "WhatsApp API、AI利用、外部ライセンス、ホスティング、連携、会員ポイントの個別開発は別費用です。内部通知は外部への自動送信とは異なります。特典、返金時のポイント取消、決済、会員ポータルはルール合意と別見積もりが必要です。"),
        section("移行前に再利用を検証する", "Salesforce、Odooなどを利用中なら、版、ライセンス、設定、データアクセスを調べます。各社に同じ新規問い合わせ、引き継ぎ、閲覧制限、期限超過、出力の例を実演してもらいます。保守担当、変更料金、障害時の復旧も確認します。", "初回整理・構築、月次保守、ライセンス・利用料、研修、退出費用を分けます。他社の仕様と価格は現在の書面見積もりで確認し、SmartSalesの構築価格を他製品のカスタマイズ価格とみなさないでください。"),
      ],
      limitations: "製品ランキングや競合仕様表ではありません。適合性は版、品質、法規、連携権限によります。開始価格は全要件の最終見積もりではありません。",
      faqs: [{ question: "既存の企業向けCRMは入れ替えるべきですか？", answer: "必ずしもそうではありません。設定、責任、定着を先に確認します。再利用で重複構築を減らせる場合もありますが、調査前に安くなるとは約束できません。" }],
    },
    de: {
      title: "SmartSales oder Enterprise-CRM: eine Entscheidungsliste",
      excerpt: "Prozesspassung, Berechtigungen, bestehende Investitionen und Gesamtkosten statt ungeprüfter Wettbewerberdaten vergleichen.",
      directAnswer: "Prüfen Sie SmartSales für Kontakte, Chancen, Zuständigkeit und Nachfassaufgaben eines abgegrenzten Teams. Bei komplexen Zugriffsregeln, bestehenden Investitionen oder vielen Integrationen sollte auch das vorhandene Enterprise-CRM geprüft werden. Ohne Edition, Umfang und Kosten ist keine Lösung pauschal besser oder günstiger.",
      keyTakeaways: ["Anforderungen und wiederverwendbare Konfiguration zuerst prüfen.", "Pilot, Produktivaufbau und monatliche Pflege getrennt betrachten.", "Anbieter anhand identischer Abnahmeszenarien vergleichen."],
      sections: [
        section("Sechs Fragen an die Anforderungen", "Wie viele Nutzer und Rollen? Wie viele Pipelines? Welche Quellen und Datensatzmengen? Wer darf welche Daten nicht sehen? Welche Integrationen sind Pflicht? Was muss beim Ausstieg exportiert werden? Die Antworten bestimmen Bereinigung, Berechtigungstests, Schulung und Lieferverantwortung statt nur eine Funktionsliste."),
        section("Drei SmartSales-Kostenebenen trennen", `Der begrenzte Prozesspilot kostet ${price(PRICING.tools.smartSales.trial, "de")}. Produktivaufbau beginnt bei ${price(PRICING.tools.smartSales.setupStarter, "de")} für Starter oder ${price(PRICING.tools.smartSales.setupGrowth, "de")} für Growth. Starter Care beginnt bei ${price(PRICING.tools.smartSales.maintenanceStarterMonthly, "de")}/Monat. Der Pilot wird nicht automatisch auf den Aufbau angerechnet; monatliche Pflege enthält keine Erstimplementierung.`, "WhatsApp-APIs, KI-Verbrauch, externe Lizenzen, Hosting, Integrationen und individuelle Treueregeln sind separat. Interne Erinnerungen sind kein automatischer externer Versand. Vorteile, Punkterücknahme bei Erstattung, Zahlungen und Mitgliederportale benötigen Regeln und ein eigenes Angebot."),
        section("Wiederverwendung vor Migration prüfen", "Bei vorhandenem Salesforce, Odoo oder anderer Plattform prüfen Sie Edition, Lizenzen, Konfiguration und Datenzugriff. Jeder Anbieter soll dieselben Szenarien für Anfrage, Übergabe, eingeschränkten Zugriff, überfällige Aufgaben und Export zeigen. Klären Sie Wartungsverantwortung, Änderungspreise und Wiederherstellung.", "Trennen Sie einmalige Bereinigung und Einrichtung, laufende Pflege, Lizenzen und Verbrauch, Schulung sowie Ausstieg. Enterprise-Anbieter müssen aktuelle schriftliche Spezifikationen und Angebote liefern. SmartSales-Aufbaupreise sind keine Angebote für die Anpassung anderer Plattformen."),
      ],
      limitations: "Dies ist eine Entscheidungshilfe, keine Rangliste oder Wettbewerber-Spezifikation. Eignung hängt von Edition, Datenqualität, Vorschriften und Integrationsrechten ab. Einstiegspreise sind keine Endangebote für jede Anforderung.",
      faqs: [{ question: "Sollten wir unser Enterprise-CRM ersetzen?", answer: "Nicht unbedingt. Konfiguration, Verantwortung und Nutzung zuerst prüfen. Wiederverwendung kann Doppelarbeit vermeiden; niedrigere Kosten sind vor Prüfung nicht zugesagt." }],
    },
  }),
  (() => {
    const geo = post("geo-aeo-seo-measurement-limits", "ai-visibility", ["googleAi", "googleUpdates"], ["visibility", "discovery"], {
    "zh-hk": {
      title: "香港 AI 顧問點睇 GEO／AEO？邊啲能量度、點開始",
      excerpt: "畀想改善搜尋同 AI 可見度嘅香港中小企：能量度嘅係曝光同點擊；唔保證排名或 AI 引用。起步用 Snapshot／Discovery，聯絡去 bookme。",
      directAnswer: "如果你係香港 3–30 人團隊，想搵 AI 顧問搞清 GEO／AEO／SEO，可以量度索引、曝光、點擊同有紀錄嘅 AI 抽查；唔可以保證排名或引用。先對齊服務頁同作者證據，再決定 Snapshot 或 Discovery；聯絡由 bookme 或／ai-consulting 開始。llms.txt 同 schema 唔係引用入場券。",
      keyTakeaways: ["先做好可抓取、可索引、有證據嘅正文，再談 GEO。", "抽查 AI 答案要記錄日期、問題、地區同來源。", "下一步係 Snapshot／Discovery 或 bookme，唔係保證上榜。"],
      sections: [
        section("呢篇畀邊個、點開始", "適合已經有網站、想改善買家問題可見度，又唔想買「保證 AI 引用」嘅香港中小企。先核對／ai-consulting 服務範圍：一條流程、負責人、可量度基準。免費 30 分鐘聽診用 bookme；需要書面診斷先考慮 Snapshot，要規劃 30／60／90 日先考慮 Discovery。", "SEO 聚焦搜尋可見度；AEO 常用嚟描述易於回答問題嘅內容；GEO 常用嚟描述生成式答案入面嘅可見度。呢啲名稱唔係認證。主要答案、服務範圍、作者同來源要以 HTML 正文呈現。Google 官方指引話 AI 功能冇額外技術要求，唔需要特別 AI 檔案或 schema。"),
        section("一張可重複嘅量度表", "用 Search Console 記錄目標頁面、查詢、日期範圍、曝光同點擊，再用網站分析記錄有意義嘅查詢或預約。Google AI 功能流量包含喺 Web 搜尋報表，唔應將整份報表增長都歸因於 AI。改內容、活動宣傳同季節因素要一齊記低。", "AI 答案抽查固定一組有代表性問題，記錄日期、平台、地區、登入狀態、答案同可點擊來源。一次出現或冇出現只係觀察；不同版本、個人化同隨機性令抽查唔等於市場佔有率。"),
        section("FAQ、引用承諾同點聯絡", "截至本文修訂，Google 文件更新指出 FAQ 複合式搜尋結果由 2026 年 5 月 7 日停止出現。保留有用 FAQ 可以幫讀者，但唔應再用 FAQ rich results 作服務承諾。llms.txt 同 schema 可以整理真實頁面，但唔保證引用、排名或流量。", "驗收應寫可交付項目：正文修訂、來源核對、索引檢查同量度記錄。想帶一條真實流程傾，去 bookme；想對照顧問範圍，睇／ai-consulting。"),
      ],
      limitations: "搜尋同 AI 平台規則會改，量度可能受私隱設定、追蹤缺漏及樣本偏差影響。本文使用所列官方 Google 文件，唔代表其他 AI 平台採用相同報表或規則。",
      faqs: [
        { question: "加 schema 就會畀 AI 引用嗎？", answer: "唔會有呢個保證。只標示頁面上真實可見嘅內容；平台仍自行決定索引、展示同引用。" },
        { question: "GEO 顧問點樣開始？", answer: "帶網站同三至五條買家問題，先做免費 30 分鐘聽診（bookme）。需要書面診斷先 Snapshot；需要 30／60／90 日計劃先 Discovery。" },
        { question: "可唔可以保證上 AI 答案？", answer: "唔可以。顧問交付係內容、量度同流程邊界，唔係排名或引用保證。" },
      ],
    },
    "zh-tw": {
      title: "香港 AI 顧問如何看待 GEO／AEO？能量度什麼、如何開始",
      excerpt: "給想改善搜尋與 AI 可見度的香港中小企業：能量度的是曝光與點擊；不保證排名或 AI 引用。起步用 Snapshot／Discovery，聯絡走 bookme。",
      directAnswer: "若你是香港 3–30 人團隊，想找 AI 顧問釐清 GEO／AEO／SEO，可以量度索引、曝光、點擊與有紀錄的 AI 抽查；不能保證排名或引用。先對齊服務頁與作者證據，再決定 Snapshot 或 Discovery；聯絡由 bookme 或／ai-consulting 開始。llms.txt 與 schema 不是引用資格證明。",
      keyTakeaways: ["先提供可抓取、可索引且有證據的正文，再談 GEO。", "AI 抽查要記錄日期、問題、地區及來源。", "下一步是 Snapshot／Discovery 或 bookme，不是保證上榜。"],
      sections: [
        section("這篇給誰、如何開始", "適合已有網站、想改善買家問題可見度，又不想購買「保證 AI 引用」的香港中小企業。先核對／ai-consulting 服務範圍。免費 30 分鐘診斷用 bookme；需要書面診斷再考慮 Snapshot，要規劃 30／60／90 日再考慮 Discovery。", "SEO 著重搜尋可見度；AEO 常指易於回答的內容；GEO 常指生成式回答中的可見度。這些名稱不是認證。主要答案應出現在 HTML 正文。Google 說明 AI 功能沒有額外技術要求。"),
        section("建立可重複的量度表", "以 Search Console 記錄目標頁面、查詢、日期區間、曝光與點擊，再以網站分析追蹤有意義的查詢或預約。Google AI 功能流量包含於 Web 搜尋報表，不能把全部增長都歸因於 AI。", "用固定的一組代表性問題抽查 AI，記下日期、平台、地區、登入狀態、回答和可點擊來源。出現一次或沒有出現只是觀察。"),
        section("FAQ、引用承諾與如何聯絡", "截至修訂時，Google 文件更新指出 FAQ 複合式搜尋結果自 2026 年 5 月 7 日停止出現。有用的 FAQ 仍可保留，但不能再將 FAQ rich results 作為服務承諾。", "驗收應列出正文修訂、來源核對、索引檢查與量度紀錄。想討論一條真實流程，前往 bookme；要對照顧問範圍，見／ai-consulting。"),
      ],
      limitations: "平台規則可能改變，私隱設定、追蹤缺漏及抽樣偏差會影響量度。本文引用所列 Google 官方文件，不能推定其他 AI 平台有相同規則或報表。",
      faqs: [
        { question: "加入 schema 就能取得 AI 引用嗎？", answer: "不能保證。只標示頁面上真實可見的內容；平台仍自行決定索引、展示與引用。" },
        { question: "GEO 顧問要如何開始？", answer: "帶網站與三至五條買家問題，先做免費 30 分鐘診斷（bookme）。需要書面診斷再 Snapshot；需要 30／60／90 日計畫再 Discovery。" },
        { question: "可以保證出現在 AI 回答嗎？", answer: "不可以。顧問交付是內容、量度與流程邊界，不是排名或引用保證。" },
      ],
    },
    en: {
      title: "GEO/AEO with a Hong Kong AI consultant: what to measure, how to start",
      excerpt: "For Hong Kong SMEs improving search and AI visibility: measure impressions and clicks; do not promise rankings or citations. Start with Snapshot/Discovery; contact via bookme.",
      directAnswer: "If you are a Hong Kong team of 3–30 looking for an AI consultant on GEO/AEO/SEO, you can measure indexing, impressions, clicks and logged AI samples—not rankings or citations. Align service pages and author evidence, then choose Snapshot or Discovery. Start on bookme or /ai-consulting. Neither llms.txt nor schema is a citation ticket.",
      keyTakeaways: ["Make crawlable, evidenced main content before talking GEO.", "Log date, prompt, region and sources when sampling AI answers.", "Next step is Snapshot/Discovery or bookme—not a ranking promise."],
      sections: [
        section("Who this is for, and how to start", "This fits Hong Kong SMEs that already have a site, want clearer answers to buyer questions, and will not buy a “guaranteed AI citation” pitch. Review /ai-consulting: one workflow, an owner, a measurable baseline. Use bookme for a free 30-minute conversation; Snapshot for written diagnosis; Discovery for a 30/60/90-day plan.", "SEO concerns search visibility. AEO commonly describes answer-oriented content; GEO commonly describes visibility in generated answers. These labels are not certifications. Put answers, boundaries, author and sources in the HTML body. Google says its AI features need no special AI files or schema."),
        section("Keep a repeatable measurement sheet", "Record target pages, queries, date ranges, impressions and clicks in Search Console. Use site analytics for meaningful enquiries or bookings. Google AI-feature traffic is included in the Web search report; do not attribute all report growth to AI. Log content changes, campaigns and seasonality.", "Sample a fixed set of representative questions and record date, platform, region, login state, answer and clickable sources. One appearance or absence is only an observation."),
        section("FAQ promises and how to contact", "At revision, Google's documentation updates state that FAQ rich results stopped appearing from May 7, 2026. Keep useful FAQs for readers; do not sell FAQ rich-result appearance. llms.txt and schema can describe a real page but neither guarantees citations, rankings or traffic.", "Define acceptance around content revisions, source checks, indexing checks and measurement records. Bring one real workflow via bookme; compare consulting scope on /ai-consulting."),
      ],
      limitations: "Search and AI platform rules change. Privacy settings, tracking gaps and sampling bias affect measurement. The linked official Google guidance does not establish identical reporting or rules for other AI platforms.",
      faqs: [
        { question: "Will adding schema earn an AI citation?", answer: "There is no such guarantee. Mark up truthful visible content; platforms still decide indexing, display and citation." },
        { question: "How do we start GEO work with a consultant?", answer: "Bring the site and three to five buyer questions to a free 30-minute conversation on bookme. Use Snapshot for written diagnosis; Discovery for a 30/60/90-day plan." },
        { question: "Can you guarantee appearance in AI answers?", answer: "No. Consulting delivers content, measurement and workflow boundaries—not ranking or citation guarantees." },
      ],
    },
    ja: {
      title: "GEO・AEO・SEO：測れること、保証できないこと",
      excerpt: "読みやすさ、索引可能性、根拠は改善できますが、順位やAI引用は保証できません。",
      directAnswer: "索引状態、検索表示、クリック、関連クエリ、問い合わせは測定でき、AI回答も条件を記録して抽出確認できます。ただしGEO・AEO・SEOのいずれも順位や引用を保証しません。llms.txtやschemaも引用の切符ではありません。",
      keyTakeaways: ["根拠がありクロール・索引可能な本文を整える。", "AI確認では日付、質問、地域、出典を残す。", "FAQは読者に有用だがGoogleのFAQリッチリザルトは終了。"],
      sections: [
        section("用語と制御できる作業を分ける", "SEOは検索での可視性、AEOは回答しやすい内容、GEOは生成回答での可視性を指す表現として使われます。認証や特別な順位資格ではありません。回答、サービス範囲、著者、出典をログインや操作なしで読めるHTML本文に置きます。", "GoogleはAI機能に追加技術要件はなく、特別なAIファイルやschemaは不要と説明しています。索引とスニペット表示の資格は前提条件であって掲載保証ではありません。構造化データは画面上の事実に合わせます。"),
        section("再現できる測定表を作る", "Search Consoleで対象ページ、クエリ、期間、表示、クリックを記録し、サイト分析で問い合わせや予約を追います。GoogleのAI機能の流入はWeb検索レポートに含まれるため、全増加をAIの成果としないでください。本文修正、広告、季節性も記録します。", "代表的な質問を固定し、日付、プラットフォーム、地域、ログイン状態、回答、クリックできる出典を残します。一度の掲載や不掲載は観察にすぎません。版、個人化、変動があるため、市場占有率の測定にはなりません。"),
        section("FAQと引用の約束を見直す", "公開時点のGoogle更新情報では、FAQリッチリザルトは2026年5月7日からGoogle検索に表示されなくなりました。読者に役立つFAQは残せますが、リッチリザルト掲載を成果として約束しないでください。", "llms.txtは情報整理、schemaは実際のページ説明に使えますが、引用、順位、流入の保証はありません。受け入れ条件は本文修正、出典確認、索引チェック、測定記録にし、特定の回答への登場保証にはしません。"),
      ],
      limitations: "検索とAIの規則は変わります。プライバシー設定、追跡欠落、抽出偏りも測定に影響します。引用したGoogle公式資料から、他のAIにも同じ規則や報告があるとは言えません。",
      faqs: [{ question: "schemaを追加すればAIに引用されますか？", answer: "保証はありません。見える事実を正しく記述しますが、索引、表示、引用は各プラットフォームが判断します。" }],
    },
    de: {
      title: "GEO, AEO und SEO: Was ist messbar, was nicht garantiert?",
      excerpt: "Lesbare, indexierbare und belegte Inhalte verbessern, ohne Rankings oder KI-Zitate zu versprechen.",
      directAnswer: "Indexierung, Impressionen, Klicks, relevante Suchanfragen und Anfragen sind messbar; KI-Antworten lassen sich strukturiert stichprobenartig dokumentieren. GEO, AEO und SEO garantieren weder Rankings noch Zitate. llms.txt und Schema sind keine Eintrittskarten für Quellenangaben.",
      keyTakeaways: ["Mit crawlbarem, indexierbarem und belegtem Hauptinhalt beginnen.", "Datum, Frage, Region und Quellen bei KI-Stichproben protokollieren.", "FAQ helfen weiterhin Lesern; Googles FAQ-Rich-Results sind eingestellt."],
      sections: [
        section("Begriffe von kontrollierbarer Arbeit trennen", "SEO betrifft Suchsichtbarkeit. AEO bezeichnet häufig antwortorientierte Inhalte, GEO die Sichtbarkeit in generierten Antworten. Das sind keine Zertifizierungen oder besonderen Rankingberechtigungen. Antworten, Leistungsgrenzen, Autor und Quellen gehören in den HTML-Text, ohne Anmeldung oder Klick erreichbar.", "Laut Google bestehen für KI-Funktionen keine zusätzlichen technischen Anforderungen und keine Pflicht zu speziellen KI-Dateien oder Schema. Indexierung und Snippet-Berechtigung sind Voraussetzungen, keine Anzeigezusage. Strukturierte Daten müssen sichtbaren Inhalten entsprechen und dürfen keine versteckten oder unbelegten Aussagen ergänzen."),
        section("Eine wiederholbare Messliste führen", "Erfassen Sie Zielseiten, Suchanfragen, Zeiträume, Impressionen und Klicks in Search Console sowie sinnvolle Anfragen oder Buchungen in der Website-Analyse. Googles KI-Traffic ist im Web-Suchbericht enthalten; nicht jedes Wachstum darf KI zugeschrieben werden. Inhaltspflege, Kampagnen und Saisonfaktoren ebenfalls dokumentieren.", "Prüfen Sie feste repräsentative Fragen und notieren Sie Datum, Plattform, Region, Anmeldestatus, Antwort und anklickbare Quellen. Ein Treffer oder Ausbleiben ist nur eine Beobachtung. Versionen, Personalisierung und Schwankungen machen daraus keine Marktanteilsmessung."),
        section("FAQ- und Zitatversprechen aktualisieren", "Zum Veröffentlichungsstand besagen Googles Dokumentationsupdates, dass FAQ-Rich-Results seit dem 7. Mai 2026 nicht mehr in Google Search erscheinen. Nützliche FAQ können bleiben, ihre Rich-Result-Anzeige darf aber nicht als Ergebnis verkauft werden.", "llms.txt kann Informationen ordnen, Schema eine reale Seite beschreiben. Beides garantiert weder Zitate noch Rankings oder Traffic. Abnahme sollte sich auf Textüberarbeitung, Quellenprüfung, Indexierungsprüfung und Messprotokolle beziehen, nicht auf garantierte Nennung in einer bestimmten Antwort."),
      ],
      limitations: "Regeln von Such- und KI-Plattformen ändern sich. Datenschutzeinstellungen, Trackinglücken und Stichprobenverzerrung beeinflussen Messungen. Die verlinkten Google-Quellen belegen keine identischen Regeln für andere KI-Plattformen.",
      faqs: [{ question: "Sichert Schema ein KI-Zitat?", answer: "Nein. Kennzeichnen Sie wahrheitsgemäße sichtbare Inhalte. Plattformen entscheiden weiterhin selbst über Indexierung, Anzeige und Quellenangaben." }],
    },
  });
    return { ...geo, modifiedDate: "2026-11-10" };
  })(),
  post("phased-legacy-spreadsheet-migration", "workflow-sop", ["workflow", "crm", "governance"], ["workflow", "crm"], {
    "zh-hk": {
      title: "舊 Excel 點分階段搬遷：唔使一晚換晒所有表",
      excerpt: "先盤點、清理同測一條流程，再平行核對及切換，保留回復方法。",
      directAnswer: "先確認邊份表係準、欄位點對應同邊個負責，再用小批匿名樣本試搬。通過筆數、欄位、權限及流程驗收後，先切換一條流程；唔好將所有舊表一次過匯入新系統。",
      keyTakeaways: ["先定唯一來源、欄位定義同資料負責人。", "分批搬遷，要有對帳、例外清單同回復點。", "切換後限制舊表編輯，避免兩邊各自更新。"],
      sections: [
        section("第一階段：盤點同清理", "列出共享表、個人副本、公式、隱藏欄位同外部連結，標明用途、擁有人及保留需要。唔需要嘅舊資料先按已確認政策處理，唔好因為搬遷就擴大收集或永久保留。", "建立欄位對照表：來源欄、目標欄、格式、必填規則、轉換方法。保留原始值，另加穩定識別碼；電話保留國碼、日期寫清楚時區、金額確認幣別。合併重複客戶要由業務負責人判斷，唔好只靠同名。"),
        section("第二階段：小批試搬同驗收", "用匿名樣本測一般、缺值、重複同例外。比對輸入、成功、拒收筆數，檢查關聯、公式結果同權限；無法轉換嘅項目進入例外清單，唔好默默略過。讓真正用家完成一次查詢到跟進流程，而唔係只驗證檔案上傳成功。"),
        section("第三階段：受控切換同回復", "約定切換窗口、暫停更新時間同最後增量資料。平行期間明確指定邊個系統可以寫入，逐日核對差異，避免兩套真相。驗收後將舊表設為唯讀並限制存取，保留已測試嘅回復副本及決策人。", "再搬下一條流程前，確認支援負責人、資料修正途徑同保留期限。ZOmate 同 Flower Nice Day 可參考業務流程範圍，但唔係試算表遷移速度或效能證據。"),
      ],
      limitations: "公式、巨集、歷史聊天及外部接駁未必可直接搬走。資料清理、授權、API／AI 用量同整合應另定範圍，唔保證零停機或零遺漏。涉及個人資料請核對適用要求。",
      faqs: [{ question: "搬完就刪晒舊表得唔得？", answer: "唔好即刻刪。先完成驗收、回復測試同保留要求確認；期間設唯讀並限制存取，到批准嘅期限再按政策處理。" }],
    },
    "zh-tw": {
      title: "舊試算表如何分階段遷移：不必一夜更換所有表格",
      excerpt: "先盤點、清理、測試單一流程，再核對與切換，保留回復方式。",
      directAnswer: "先確認權威資料來源、欄位對應與負責人，再以少量匿名樣本試搬。通過筆數、欄位、權限及流程驗收後，只切換一條流程，不要一次匯入全部舊表。",
      keyTakeaways: ["先定唯一來源、欄位定義及資料負責人。", "分批搬移，保留對帳、例外清單與回復點。", "切換後限制舊表編輯，避免兩邊各自更新。"],
      sections: [
        section("第一階段：盤點與清理", "列出共用表、個人副本、公式、隱藏欄位及外部連結，記錄用途、擁有人與保存需求。不需保留的資料應按已確認政策處理，不要因遷移而擴大蒐集或永久保存。", "建立欄位對照：來源、目標、格式、必填規則及轉換方法。保留原值並加入穩定識別碼；電話保留國碼、日期標明時區、金額確認幣別。重複客戶合併須由業務負責人判斷，不能只靠同名。"),
        section("第二階段：小批試搬與驗收", "以匿名樣本測試正常、缺值、重複及例外，比對輸入、成功與拒收筆數，檢查關聯、公式結果及權限。無法轉換的項目列入例外清單，不可默默略過。讓實際使用者完成一次查詢到跟進，不只確認上傳成功。"),
        section("第三階段：受控切換與回復", "約定切換時段、停止更新時間及最後增量。並行期間指定唯一可寫入系統，每日核對差異。驗收後將舊表設為唯讀並限制存取，保留已測試回復副本及決策人。", "下一階段前，確認支援負責人、修正途徑與保存期限。ZOmate 和 Flower Nice Day 可供理解流程範圍，不是試算表遷移速度或效能證據。"),
      ],
      limitations: "公式、巨集、歷史對話與外部整合不一定能直接搬移。清理、授權、API／AI 用量及整合須另定範圍，不保證零停機或零遺漏。個人資料應核對適用要求。",
      faqs: [{ question: "搬完就可以刪除舊表嗎？", answer: "先完成驗收、回復測試與保存要求確認。期間設為唯讀並限制存取，到批准期限再按政策處理。" }],
    },
    en: {
      title: "A phased migration from legacy spreadsheets",
      excerpt: "Inventory, clean and test one workflow, reconcile the data, then switch with a recovery plan.",
      directAnswer: "Identify the authoritative sheet, field mapping and owner, then trial a small anonymised batch. Switch one workflow only after record counts, fields, permissions and user acceptance pass. Do not import every old spreadsheet at once.",
      keyTakeaways: ["Define the source of truth, field meanings and data owner first.", "Migrate in batches with reconciliation, exceptions and recovery points.", "Restrict editing of old sheets after cutover to prevent two competing records."],
      sections: [
        section("Phase one: inventory and clean", "List shared sheets, personal copies, formulas, hidden columns and external links. Assign purpose, owner and retention needs. Handle obsolete data under an agreed policy; migration is not a reason to collect more information or retain it forever.", "Build a mapping of source field, target field, format, required rules and transformation. Preserve original values and add stable identifiers. Keep country codes in phone numbers, specify time zones for dates and currencies for amounts. A business owner should resolve duplicate customers rather than merging on name alone."),
        section("Phase two: trial a small batch", "Use anonymised normal, missing, duplicate and exception examples. Reconcile input, successful and rejected counts, then check relationships, formula results and permissions. Put unconvertible items in an exception list rather than silently skipping them. Have actual users complete an enquiry-to-follow-up workflow; a successful upload is not acceptance."),
        section("Phase three: controlled cutover and recovery", "Agree the change window, update freeze and final delta. During parallel operation, designate one writable system and reconcile differences so there are not two competing truths. After acceptance, make old sheets read-only with restricted access. Keep a tested recovery copy and name the person who can authorise rollback.", "Before moving another workflow, confirm support ownership, correction routes and retention deadlines. ZOmate and Flower Nice Day illustrate business workflow scope; they are not evidence of spreadsheet migration speed or performance."),
      ],
      limitations: "Formulas, macros, historic chats and external integrations may not transfer directly. Scope cleanup, licences, API/AI usage and integrations separately. Zero downtime or zero omissions are not guaranteed; check applicable personal-data requirements.",
      faqs: [{ question: "Can we delete the old sheets immediately?", answer: "First complete acceptance, recovery testing and retention checks. Keep restricted read-only copies during that period, then apply the approved disposal policy at the agreed deadline." }],
    },
    ja: {
      title: "古いスプレッドシートを段階的に移行する方法",
      excerpt: "棚卸し、整理、小規模検証、照合を経て切り替え、復旧手段を残します。",
      directAnswer: "正本の表、項目対応、担当者を確認してから、少量の匿名データで試します。件数、項目、権限、利用者の受け入れを確認した後、一つの業務だけ切り替えます。全ての旧表を一括投入しないでください。",
      keyTakeaways: ["正本、項目の意味、データ責任者を定義する。", "照合、例外一覧、復旧点を付けて分割移行する。", "切り替え後は旧表の編集を制限し二重更新を防ぐ。"],
      sections: [
        section("第1段階：棚卸しと整理", "共有表、個人コピー、数式、非表示列、外部リンクを列挙し、目的、担当、保存要件を付けます。不要データは合意済み方針に沿って扱い、移行を理由に収集や保存を増やさないでください。", "元項目、先項目、形式、必須ルール、変換方法を対応表にします。元の値を残し固定IDを付け、電話の国番号、日付の時間帯、金額の通貨を確認します。同名だけで顧客を統合せず、業務担当者が判断します。"),
        section("第2段階：小規模試行", "匿名化した通常、欠損、重複、例外を使い、入力・成功・拒否件数を照合します。関連、計算結果、権限を確認し、変換不能は例外一覧に残します。アップロード成功だけでなく、実際の利用者が問い合わせからフォローまで完了できるか試します。"),
        section("第3段階：管理下の切り替えと復旧", "切替時間、更新停止、最終差分を合意します。並行期間でも書き込み先を一つに決め、差を照合して二つの正本を作らないようにします。受け入れ後は旧表を閲覧限定にし、アクセスを制限します。検証済み復旧コピーと戻す判断者を用意します。", "次の業務へ進む前に、支援担当、訂正方法、保存期限を確認します。ZOmateとFlower Nice Dayは業務範囲の参考であり、表計算移行の速度や性能を示す証拠ではありません。"),
      ],
      limitations: "数式、マクロ、過去のチャット、外部連携は直接移せない場合があります。整理、ライセンス、API・AI利用、連携は別途範囲を定めます。無停止や欠落ゼロは保証しません。個人情報の適用要件も確認してください。",
      faqs: [{ question: "移行後すぐ旧表を消してよいですか？", answer: "受け入れ、復旧テスト、保存要件の確認を先に終えます。その間は閲覧限定で管理し、承認された期限に廃棄方針を適用します。" }],
    },
    de: {
      title: "Alte Tabellen schrittweise migrieren",
      excerpt: "Inventarisieren, bereinigen, einen Ablauf testen und abgleichen; anschließend mit Rückfallplan umstellen.",
      directAnswer: "Bestimmen Sie maßgebliche Tabelle, Feldzuordnung und Verantwortlichen. Testen Sie eine kleine anonymisierte Charge und wechseln Sie erst nach Prüfung von Anzahl, Feldern, Rechten und Anwenderabnahme einen Ablauf. Nicht alle alten Tabellen gleichzeitig importieren.",
      keyTakeaways: ["Verbindliche Quelle, Feldbedeutungen und Datenverantwortung festlegen.", "In Chargen mit Abgleich, Ausnahmen und Wiederherstellungspunkten migrieren.", "Alte Tabellen nach Umstellung vor konkurrierenden Änderungen schützen."],
      sections: [
        section("Phase eins: Bestand und Bereinigung", "Listen Sie gemeinsame Tabellen, persönliche Kopien, Formeln, ausgeblendete Spalten und externe Verknüpfungen auf. Ordnen Sie Zweck, Eigentümer und Aufbewahrung zu. Veraltete Daten nach vereinbarter Richtlinie behandeln; Migration rechtfertigt weder zusätzliche Sammlung noch unbegrenzte Aufbewahrung.", "Erstellen Sie eine Zuordnung von Quellfeld, Zielfeld, Format, Pflichtregeln und Umwandlung. Originalwerte behalten und stabile Kennungen ergänzen. Ländervorwahl, Zeitzone und Währung klären. Dubletten muss ein fachlich Verantwortlicher prüfen; gleiche Namen reichen nicht zum Zusammenführen."),
        section("Phase zwei: kleine Charge erproben", "Testen Sie anonymisierte Normalfälle, Lücken, Dubletten und Ausnahmen. Gleichen Sie Eingangs-, Erfolgs- und Ablehnungszahlen ab; prüfen Sie Beziehungen, Formelergebnisse und Berechtigungen. Nicht konvertierbare Datensätze kommen auf eine Ausnahmeliste. Tatsächliche Nutzer sollen Anfrage und Nachfassen durchführen; ein erfolgreicher Upload allein ist keine Abnahme."),
        section("Phase drei: kontrollierter Wechsel und Rückkehr", "Vereinbaren Sie Umstellungsfenster, Schreibstopp und letzte Änderungen. Bestimmen Sie auch im Parallelbetrieb ein einziges beschreibbares System und gleichen Sie Unterschiede ab. Nach Abnahme alte Tabellen schreibschützen und Zugriffe beschränken. Eine getestete Wiederherstellungskopie und eine entscheidungsberechtigte Person müssen vorhanden sein.", "Vor dem nächsten Ablauf Supportverantwortung, Korrekturwege und Aufbewahrungsfristen bestätigen. ZOmate und Flower Nice Day veranschaulichen Geschäftsprozesse, belegen aber keine Geschwindigkeit oder Leistung einer Tabellenmigration."),
      ],
      limitations: "Formeln, Makros, alte Chats und externe Integrationen lassen sich möglicherweise nicht direkt übertragen. Bereinigung, Lizenzen, API-/KI-Verbrauch und Integrationen gesondert vereinbaren. Ausfallfreiheit oder vollständige Fehlerfreiheit sind nicht garantiert; Datenschutzanforderungen prüfen.",
      faqs: [{ question: "Können alte Tabellen sofort gelöscht werden?", answer: "Zuerst Abnahme, Wiederherstellungstest und Aufbewahrung prüfen. Bis dahin eingeschränkte schreibgeschützte Kopien behalten und anschließend die genehmigte Löschrichtlinie zum vereinbarten Zeitpunkt anwenden." }],
    },
  }),
];
