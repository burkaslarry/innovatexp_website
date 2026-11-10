import type { AppLocale } from "@/lib/i18n-routing";
import { PRICING, formatHkd } from "@/content/pricing";

export const AI_VISIBILITY_TECHNICAL_COPY: Record<AppLocale, { title: string; question: string; answer: string; measurementQuestion: string; measurementAnswer: string; inputs: string; sources: string }> = {
  en: {
    title: "Technical note · November 2026",
    question: "Does Google AI search require special schema or llms.txt?",
    answer: "No. Google says its normal SEO requirements apply to AI Overviews and AI Mode; no special schema, AI text file or llms.txt is required. FAQ rich results stopped appearing on May 7, 2026; HowTo rich results ended in 2023. Useful visible FAQs still help readers, but markup does not guarantee an AI mention or a rich result.",
    measurementQuestion: "What can the sampled measurements tell us?",
    measurementAnswer: "Brand mentions, website citations and leads are different measures. A mention may have no link; a citation may bring no enquiry. We compare recorded questions, dates, platforms, locations and cited URLs. Mention share is a share of this sample, not market share. Answers vary between checks, so a before/after change does not prove causation. Google Search Console includes AI-feature traffic in Web search reporting, not a dedicated AI performance report; it cannot independently attribute leads to AI answers.",
    inputs: "Prepare your website, main services, buyer questions and target languages/regions, a content owner, and any existing baseline. Agree relevant analytics or Search Console access separately; do not send passwords or identifiable customer enquiries.",
    sources: "Official Google guidance",
  },
  "zh-hk": {
    title: "技術說明 · 2026 年 11 月",
    question: "Google AI 搜尋要特別 schema 或 llms.txt 嗎？",
    answer: "唔需要。Google 表明 AI Overviews 同 AI Mode 沿用一般 SEO 要求，唔需要特別 schema、AI 文字檔或 llms.txt。FAQ 複合搜尋結果已於 2026 年 5 月 7 日停止顯示；HowTo 複合搜尋結果於 2023 年結束。有用嘅可見 FAQ 仍然方便讀者，但標記唔保證 AI 提及或複合搜尋結果。",
    measurementQuestion: "抽樣數字可以說明啲乜？",
    measurementAnswer: "品牌提及、網站引用同詢盤係三個唔同指標。提及可以冇連結，引用亦未必帶來詢盤。我哋對照記錄低嘅問題、日期、平台、地區同引用網址。提及比例只代表呢組樣本，唔係市場佔有率。答案會變，前後差異唔等於因果證明。Google Search Console 將 AI 功能流量計入網頁搜尋報告，唔係獨立 AI 成效報告，亦唔能夠單靠佢將詢盤歸因於 AI 答案。",
    inputs: "準備網站、主要服務、買家問題、目標語言／地區、一位內容負責人同已有基準。分析工具或 Search Console 權限另行確認；唔好傳密碼或可識別客戶嘅查詢。",
    sources: "Google 官方說明",
  },
  "zh-tw": {
    title: "技術說明 · 2026 年 11 月",
    question: "Google AI 搜尋需要特殊 schema 或 llms.txt 嗎？",
    answer: "不需要。Google 表明 AI Overviews 與 AI Mode 沿用一般 SEO 要求，不需要特殊 schema、AI 文字檔或 llms.txt。FAQ 複合式搜尋結果已於 2026 年 5 月 7 日停止顯示；HowTo 複合式搜尋結果於 2023 年結束。有用的可見 FAQ 仍有助讀者理解，但標記不保證 AI 提及或複合式搜尋結果。",
    measurementQuestion: "抽樣數據能說明什麼？",
    measurementAnswer: "品牌提及、網站引用與詢問名單是不同指標。提及可能沒有連結，引用也不一定帶來詢問。我們比較記錄的問題、日期、平台、地區與引用網址。提及比例只代表這組樣本，不是市占率。答案會變動，前後差異不能證明因果。Google Search Console 將 AI 功能流量納入網頁搜尋報告，並非獨立 AI 成效報告，也無法單憑它將詢問歸因於 AI 答案。",
    inputs: "準備網站、主要服務、買家問題、目標語言／地區、內容負責人與既有基準。分析工具或 Search Console 權限另行確認；請勿傳送密碼或可識別客戶的詢問內容。",
    sources: "Google 官方說明",
  },
  ja: {
    title: "技術上の注意 · 2026年11月",
    question: "Google の AI 検索に専用 schema や llms.txt は必要ですか？",
    answer: "いいえ。Google は AI Overviews と AI Mode に通常の SEO 要件が適用され、専用 schema、AI テキストファイル、llms.txt は不要と説明しています。FAQ リッチリザルトは2026年5月7日に表示を終了し、HowTo リッチリザルトは2023年に終了しました。画面上の FAQ は読者に役立ちますが、マークアップで AI の言及やリッチリザルトが保証されるわけではありません。",
    measurementQuestion: "サンプルの測定結果から何が分かりますか？",
    measurementAnswer: "ブランドへの言及、サイトの引用、見込み客の問い合わせは別の指標です。言及にリンクがない場合も、引用が問い合わせにつながらない場合もあります。質問、日付、サービス、地域、引用 URL を記録して比較します。言及率はこのサンプル内の割合であり、市場シェアではありません。回答は変動するため、前後の差は因果関係の証明になりません。Google Search Console は AI 機能の流入をウェブ検索に含めて集計し、専用 AI レポートではありません。それだけで問い合わせを AI 回答に帰属させることはできません。",
    inputs: "サイト、主なサービス、購入者の質問、対象言語・地域、内容の責任者、既存の基準値をご準備ください。分析や Search Console の権限は別途確認します。パスワードや顧客を特定できる問い合わせは送らないでください。",
    sources: "Google 公式ガイド",
  },
  de: {
    title: "Technischer Hinweis · November 2026",
    question: "Braucht die Google-KI-Suche spezielles Schema oder llms.txt?",
    answer: "Nein. Laut Google gelten für AI Overviews und AI Mode die üblichen SEO-Anforderungen. Spezielles Schema, KI-Textdateien oder llms.txt sind nicht erforderlich. FAQ-Rich-Results werden seit dem 7. Mai 2026 nicht mehr angezeigt; HowTo-Rich-Results endeten 2023. Sichtbare FAQs helfen Lesern weiterhin, doch Markup garantiert weder KI-Erwähnungen noch Rich Results.",
    measurementQuestion: "Was sagen die Stichprobenmessungen aus?",
    measurementAnswer: "Markenerwähnungen, Website-Zitate und Leads sind unterschiedliche Messgrößen. Eine Erwähnung muss keinen Link enthalten, ein Zitat keine Anfrage erzeugen. Wir vergleichen protokollierte Fragen, Daten, Plattformen, Regionen und zitierte URLs. Der Erwähnungsanteil bezieht sich auf diese Stichprobe, nicht auf den Marktanteil. Antworten schwanken; Vorher-Nachher-Unterschiede beweisen keine Kausalität. Google Search Console erfasst KI-Funktionen im Bericht zur Websuche, nicht in einem eigenen KI-Leistungsbericht. Daraus allein lassen sich Leads nicht KI-Antworten zuordnen.",
    inputs: "Bereiten Sie Website, Hauptleistungen, Käuferfragen, Zielsprachen/-regionen, eine inhaltlich verantwortliche Person und vorhandene Ausgangswerte vor. Analyse- oder Search-Console-Zugänge werden separat vereinbart; keine Passwörter oder identifizierbaren Kundenanfragen senden.",
    sources: "Offizielle Google-Hinweise",
  },
};

export type ServiceDecisionCopy = {
  fit: string;
  unfit: string;
  deliverables: string;
  process: string;
  preparation: string;
  boundaries: string;
  faq: string;
  cases: string;
  services: string;
  snapshot: string;
  book: string;
  inputs: string[];
  processSteps: string[];
  scopeNote: string;
  courseInputs: string[];
  courseSteps: string[];
  courseBoundary: string;
  snapshotDifference: string;
  snapshotQuestion: string;
  scheduleQuestion: string;
  correctionQuestion: string;
  caseNote: string;
};

type ConsultingCopy = {
  title: string;
  answer: string;
  fit: string;
  unfit: string;
  free: string;
  pricing: string;
  snapshot: string;
  discovery: string;
  smallTeam: string;
  mediumTeam: string;
  ongoing: string;
  quoted: string;
  quoteDetail: string;
  toolsQuestion: string;
  toolsAnswer: string;
  costQuestion: string;
  outcomeQuestion: string;
  outcomeAnswer: string;
};

const CONSULTING_COPY: Record<AppLocale, ConsultingCopy> = {
  en: {
    title: "Hong Kong AI consulting firm: one workflow first",
    answer: "Looking for a Hong Kong AI consultant or AI consulting firm? InnovateXP helps teams of 3–30 name one sales or operations bottleneck, ownership and a baseline, then decide Snapshot, Discovery, a better manual process—or not buying yet. Book a free 30 minutes on bookme.",
    fit: "Teams with a recurring delay, lost enquiry or unclear handoff, and an owner ready to review a real example.",
    unfit: "Not a fit for guaranteed revenue, an instant AI rollout or buying software without reviewing the workflow.",
    free: "Start with a free 30-minute conversation about one workflow. It checks fit and a possible next step; a written diagnosis is separate paid work.",
    pricing: "Paid work, clearly separated", snapshot: "A 60–90-minute interview, one-page readiness scorecard, three blockers and a recommendation on whether to enter Discovery. No implementation.",
    discovery: "Map one workflow, name owners, establish baseline measures and a 30/60/90-day action plan. This is planning, not a guaranteed launch within 30 days.",
    smallTeam: "Discovery · up to 10 people", mediumTeam: "Discovery · 11–30 people", ongoing: "Implementation and ongoing advisory", quoted: "Scoped quote after diagnosis",
    quoteDetail: "Longer programmes, additional workflows and software work are quoted after diagnosis. Larger teams are scoped separately. Agree deliverables, responsibilities, acceptance and timing before proceeding.",
    toolsQuestion: "Must we buy AI or a CRM?", toolsAnswer: "No. If existing tools are sufficient, clarify the workflow and responsibilities first. Any software or integration follows a separate assessment and agreed scope.",
    costQuestion: "How much does paid diagnosis cost?", outcomeQuestion: "Does a case study predict our results?", outcomeAnswer: "No. Agilizing's owner confirmed training-material production fell from 10 days to 3 hours in January–February 2026. That implementation result is not a Snapshot deliverable or a promise for another team.",
  },
  "zh-hk": {
    title: "香港 AI 顧問公司：先聽診一條流程",
    answer: "搵香港 AI 顧問／ai 顧問公司？InnovateXP 幫 3–30 人中小企找出一條銷售或營運樽頸，定清負責人同起始數字，再決定 Snapshot、Discovery、只改人手做法，定暫時唔買系統。免費 30 分鐘由 bookme 開始。",
    fit: "經常慢報價、漏查詢或交接唔清楚，而且有負責人願意用真實例子一齊覆核嘅團隊。",
    unfit: "唔適合要求保證收入、即刻全公司上 AI，或未睇流程就決定買系統嘅需求。",
    free: "先用免費 30 分鐘傾一條流程，確認適唔適合同下一步。書面診斷係另一項付費工作。",
    pricing: "付費工作，分清範圍", snapshot: "60–90 分鐘訪談、一頁準備度評分、三個主要阻力，同是否進入 Discovery 嘅建議。唔包系統實施。",
    discovery: "畫清一條流程、定負責人同基準數字，交 30／60／90 日行動計劃。呢個係規劃，唔係保證 30 日內上線。",
    smallTeam: "Discovery · 10 人或以下", mediumTeam: "Discovery · 11–30 人", ongoing: "實施同持續顧問支援", quoted: "聽診後按範圍報價",
    quoteDetail: "較長陪跑、額外流程同軟件工作都喺聽診後報價。較大團隊另定範圍；開始前確認交付、責任、驗收同排期。",
    toolsQuestion: "一定要買 AI 或 CRM？", toolsAnswer: "唔一定。現有工具夠用，就先執流程同責任。軟件或系統接駁先另作評估，再確認範圍。",
    costQuestion: "付費診斷幾多錢？", outcomeQuestion: "案例成效可唔可以當我哋嘅預測？", outcomeAnswer: "唔可以。Agilizing 善敏業主確認，2026 年 1–2 月教材製作由 10 日縮至 3 小時。呢個係實施結果，唔係 Snapshot 交付，亦唔係對其他團隊嘅承諾。",
  },
  "zh-tw": {
    title: "香港 AI 顧問公司：先診斷一條流程",
    answer: "找香港 AI 顧問／AI 顧問公司？InnovateXP 協助 3–30 人中小企業找出一條銷售或營運瓶頸，釐清負責人與起始指標，再決定 Snapshot、Discovery、只改善人工流程，或暫時不買系統。免費 30 分鐘由 bookme 開始。",
    fit: "經常延遲報價、遺漏詢問或交接不清楚，且有負責人願意提供實際案例並共同審查的團隊。",
    unfit: "不適合要求保證營收、立即全面導入 AI，或尚未檢視流程就決定購買系統的需求。",
    free: "先以免費 30 分鐘討論一條流程，確認是否適合與下一步。書面診斷是另一項付費工作。",
    pricing: "付費工作與範圍", snapshot: "60–90 分鐘訪談、一頁準備度評分、三個主要阻礙，以及是否進入 Discovery 的建議。不包含系統實施。",
    discovery: "整理一條流程、確認負責人與基準指標，提供 30／60／90 日行動計畫。這是規劃，不是保證 30 日內上線。",
    smallTeam: "Discovery · 10 人以下（含）", mediumTeam: "Discovery · 11–30 人", ongoing: "實施與持續顧問支援", quoted: "診斷後依範圍報價",
    quoteDetail: "較長期支援、額外流程與軟體工作均於診斷後報價。較大團隊另訂範圍；開始前確認交付、責任、驗收與時程。",
    toolsQuestion: "一定要購買 AI 或 CRM 嗎？", toolsAnswer: "不一定。若現有工具已足夠，先改善流程與責任分工。軟體或系統串接另行評估，再確認範圍。",
    costQuestion: "付費診斷的費用是多少？", outcomeQuestion: "案例成效可以當作我們的預測嗎？", outcomeAnswer: "不可以。Agilizing 善敏業主確認，2026 年 1–2 月教材製作由 10 日縮短至 3 小時。這是實施結果，並非 Snapshot 交付，也不是對其他團隊的承諾。",
  },
  ja: {
    title: "AI コンサルティングは業務の整理から",
    answer: "InnovateXP は中小企業の営業・運営業務から一つのボトルネックを特定し、責任者と基準値を明確にします。その後に AI、自動化、または手作業の改善が適切かを判断します。",
    fit: "見積もりの遅れ、問い合わせの対応漏れ、曖昧な引き継ぎがあり、実例を一緒に検討できる責任者がいるチーム。",
    unfit: "売上保証、即時の全社 AI 導入、業務を確認せずにソフトウェアを購入したい場合には適しません。",
    free: "まず無料の30分相談で一つの業務を話し合い、適合性と次の一歩を確認します。書面による診断は別の有料業務です。",
    pricing: "有料業務の範囲と料金", snapshot: "60〜90分の面談、1ページの準備度評価、三つの主な障害、Discovery に進むべきかの提案。実装は含みません。",
    discovery: "一つの業務を図式化し、責任者、基準指標、30・60・90日の行動計画を整理します。計画策定であり、30日以内の本番稼働を保証するものではありません。",
    smallTeam: "Discovery · 10人以下", mediumTeam: "Discovery · 11〜30人", ongoing: "実装と継続的な助言", quoted: "診断後に範囲を定めて見積もり",
    quoteDetail: "長期支援、追加業務、ソフトウェア開発は診断後に見積もります。大人数のチームは別途範囲を確認し、着手前に成果物、責任、検収、日程を合意します。",
    toolsQuestion: "AI や CRM の購入は必須ですか？", toolsAnswer: "いいえ。既存ツールで十分なら、まず手順と役割を整理します。ソフトウェアや外部連携は別途評価し、範囲を合意します。",
    costQuestion: "有料診断の料金はいくらですか？", outcomeQuestion: "事例の成果は自社にも当てはまりますか？", outcomeAnswer: "いいえ。Agilizing のオーナーは2026年1〜2月に教材制作が10日から3時間になったと確認しています。これは実装の結果であり、Snapshot の成果物や他社への保証ではありません。",
  },
  de: {
    title: "KI-Beratung beginnt beim Arbeitsablauf",
    answer: "InnovateXP hilft KMU, einen Engpass in Vertrieb oder Betrieb zu erkennen, Verantwortung zu klären und einen Ausgangswert festzuhalten. Erst danach entscheiden wir, ob KI, Automatisierung oder ein besserer manueller Ablauf sinnvoll ist.",
    fit: "Teams mit wiederkehrenden Verzögerungen, verlorenen Anfragen oder unklaren Übergaben und einer verantwortlichen Person, die ein echtes Beispiel prüfen kann.",
    unfit: "Nicht geeignet für Umsatzgarantien, eine sofortige unternehmensweite KI-Einführung oder Softwarekäufe ohne Prüfung des Ablaufs.",
    free: "Beginnen Sie mit einem kostenlosen 30-Minuten-Gespräch über einen Ablauf. Es klärt Eignung und nächste Schritte; eine schriftliche Diagnose ist eine separate bezahlte Leistung.",
    pricing: "Bezahlte Leistungen mit klarer Abgrenzung", snapshot: "Ein 60–90-minütiges Interview, eine einseitige Bereitschaftsbewertung, drei Haupthindernisse und eine Empfehlung zum Einstieg in Discovery. Keine Implementierung.",
    discovery: "Einen Ablauf abbilden, Verantwortliche und Ausgangswerte bestimmen und einen 30/60/90-Tage-Aktionsplan erstellen. Das ist Planung, keine garantierte Produktivsetzung innerhalb von 30 Tagen.",
    smallTeam: "Discovery · bis 10 Personen", mediumTeam: "Discovery · 11–30 Personen", ongoing: "Implementierung und laufende Beratung", quoted: "Angebot nach Diagnose und Abgrenzung",
    quoteDetail: "Längere Begleitung, weitere Abläufe und Softwarearbeiten werden nach der Diagnose angeboten. Größere Teams werden separat abgegrenzt. Lieferumfang, Verantwortung, Abnahme und Termine werden vorab vereinbart.",
    toolsQuestion: "Müssen wir KI oder ein CRM kaufen?", toolsAnswer: "Nein. Reichen vorhandene Werkzeuge aus, klären wir zunächst Ablauf und Zuständigkeiten. Software und Schnittstellen werden separat bewertet und vereinbart.",
    costQuestion: "Was kostet die bezahlte Diagnose?", outcomeQuestion: "Sagt eine Fallstudie unsere Ergebnisse voraus?", outcomeAnswer: "Nein. Agilizings Inhaber bestätigte für Januar–Februar 2026 eine Verkürzung der Materialproduktion von 10 Tagen auf 3 Stunden. Das ist ein Implementierungsergebnis, keine Snapshot-Leistung oder Zusage für andere Teams.",
  },
};

export function getConsultingDecisionCopy(locale: AppLocale) {
  const c = CONSULTING_COPY[locale];
  const snapshot = formatHkd(PRICING.quickCash.aiReadinessAssessment, locale);
  const discovery = formatHkd(PRICING.consultancy.discoverySprint30Day, locale);
  const discovery11To30 = formatHkd(PRICING.consultancy.discoveryWorkshop11To30, locale);
  return {
    ...c,
    packages: [
      { name: "Snapshot", price: snapshot, detail: c.snapshot },
      { name: c.smallTeam, price: discovery, detail: c.discovery },
      { name: c.mediumTeam, price: discovery11To30, detail: c.discovery },
      { name: c.ongoing, price: c.quoted, detail: c.quoteDetail },
    ],
    faqs: [
      { question: SERVICE_DECISION_COPY[locale].snapshotQuestion, answer: c.free },
      { question: c.costQuestion, answer: `Snapshot: ${snapshot}. ${c.smallTeam}: ${discovery}. ${c.mediumTeam}: ${discovery11To30}. ${c.quoteDetail}` },
      { question: c.toolsQuestion, answer: c.toolsAnswer },
      { question: c.outcomeQuestion, answer: c.outcomeAnswer },
    ],
  };
}

export const SERVICE_DECISION_COPY: Record<AppLocale, ServiceDecisionCopy> = {
  en: {
    fit: "Who this fits", unfit: "When to pause", deliverables: "What you receive", process: "How the work progresses", preparation: "What to prepare", boundaries: "Scope and acceptance", faq: "Frequently asked questions", cases: "Relevant delivery experience", services: "Compare services", snapshot: "Explore paid Snapshot", book: "Book a free 30-minute conversation",
    inputs: ["One anonymised example from enquiry or task to completion, plus the tools used. Do not send customer lists, financial records or passwords.", "A workflow owner who can explain handoffs and approve changes.", "A starting measure, such as turnaround time, missed follow-ups or rework. If unknown, identify how it could be recorded."],
    processSteps: ["Agree the problem, participants and one priority workflow.", "Review a sample, the current steps and a baseline before choosing tools.", "Confirm deliverables and review criteria; test any agreed changes with the owner."],
    scopeNote: "Agree deliverables, inputs, responsibilities and acceptance criteria in writing before paid work. Review against those criteria, not a promised revenue or time saving. Extra workflows, integrations and ongoing support require a separate scope; the schedule depends on access, materials and approvals.",
    courseInputs: ["Audience, experience level, preferred language and session length.", "An anonymised work example and the tools/accounts participants are permitted to use; no customer data or passwords.", "A team contact and a task participants should be able to demonstrate after the session."],
    courseSteps: ["Agree the audience, learning objectives and suitable examples.", "Practise selected modules with human review of AI output.", "Review exercises against the agreed learning objectives and identify next steps."],
    courseBoundary: "Confirm the agenda, materials and exercise review before booking. Training is not a production deployment, certification or performance guarantee. Software implementation and ongoing support are separate unless explicitly included in the agreed scope.",
    snapshotDifference: "The free 30-minute conversation helps check fit. Snapshot is separate paid written work: a 60–90-minute interview and a one-page readiness scorecard, not implementation.",
    snapshotQuestion: "Is Snapshot the free conversation?", scheduleQuestion: "When is the scorecard delivered?", correctionQuestion: "What if the findings need correction?",
    caseNote: "Agilizing's training-material workflow is an implementation example, not a Snapshot deliverable or a forecast of your results.",
  },
  "zh-hk": {
    fit: "適合邊啲團隊", unfit: "幾時應該先停一停", deliverables: "會收到啲乜", process: "點樣開展", preparation: "你要準備啲乜", boundaries: "範圍同驗收", faq: "常見問題", cases: "相關交付經驗", services: "比較服務", snapshot: "了解付費 Snapshot", book: "預約免費 30 分鐘業務聽診",
    inputs: ["一個由查詢或任務到完成嘅匿名例子，同目前用緊嘅工具。唔好提交客戶名單、財務明細或密碼。", "一位講得清交接、可以確認改動嘅流程負責人。", "一個起始數字，例如處理時間、漏跟進或返工次數；未有數字就先確認點樣記錄。"],
    processSteps: ["定清問題、參與者同一條優先流程。", "用例子核對目前步驟同基準，之後先揀工具。", "確認交付同覆核標準，由負責人試用已同意嘅改動。"],
    scopeNote: "付費工作開始前，書面確認交付、資料、責任同驗收標準；按標準覆核，唔以保證收入或節省時間驗收。額外流程、接駁同持續支援另定範圍；排期視乎權限、材料同批核。",
    courseInputs: ["參與對象、經驗、語言同課堂長度。", "匿名工作例子，同參與者獲准使用嘅工具／帳戶；唔好提供客戶資料或密碼。", "一位團隊聯絡人，同課後希望參與者示範嘅任務。"],
    courseSteps: ["確認對象、學習目標同適合嘅例子。", "按所選模組實作，由人覆核 AI 輸出。", "按已定學習目標檢視練習，再揀下一步。"],
    courseBoundary: "預約前確認課程、材料同練習覆核方式。培訓唔等於正式系統上線、認證或成效保證。軟件實施同持續支援另議，除非已明列喺同意範圍。",
    snapshotDifference: "免費 30 分鐘聽診係先確認適唔適合。Snapshot 係另一項付費書面工作：60–90 分鐘訪談同一頁準備度評分，唔包系統實施。",
    snapshotQuestion: "Snapshot 係咪免費聽診？", scheduleQuestion: "幾時收到書面評分？", correctionQuestion: "發現資料有錯可以點處理？",
    caseNote: "Agilizing 善敏嘅教材流程係實施案例，唔係 Snapshot 交付，亦唔係你嘅成效預測。",
  },
  "zh-tw": {
    fit: "適合哪些團隊", unfit: "何時應先暫緩", deliverables: "交付內容", process: "執行方式", preparation: "需要準備的資料", boundaries: "範圍與驗收", faq: "常見問題", cases: "相關交付經驗", services: "比較服務", snapshot: "了解付費 Snapshot", book: "預約免費 30 分鐘業務診斷",
    inputs: ["一個從詢問或任務到完成的匿名案例，以及目前使用的工具。請勿提交客戶名單、財務明細或密碼。", "一位能說明交接並核准變更的流程負責人。", "一項起始指標，例如處理時間、遺漏追蹤或重工次數；若尚無資料，先確認記錄方式。"],
    processSteps: ["確認問題、參與者與一條優先流程。", "使用案例核對目前步驟與基準，再選擇工具。", "確認交付與審查標準，由負責人測試已同意的變更。"],
    scopeNote: "付費工作開始前，以書面確認交付、資料、責任與驗收標準。依標準審查，而非承諾營收或節省時間。額外流程、串接與持續支援另訂範圍；時程取決於權限、材料與核准。",
    courseInputs: ["參與對象、經驗程度、語言與課程長度。", "匿名工作案例，以及參與者獲准使用的工具／帳號；請勿提供客戶資料或密碼。", "一位團隊聯絡人，以及課後希望參與者能示範的任務。"],
    courseSteps: ["確認對象、學習目標與合適的案例。", "依所選模組實作，由人員審查 AI 輸出。", "依約定學習目標檢視練習，再確認下一步。"],
    courseBoundary: "預約前確認課程、材料與練習審查方式。培訓不等於正式系統部署、認證或成效保證。軟體實施與持續支援另議，除非已明列於約定範圍。",
    snapshotDifference: "免費 30 分鐘診斷用於確認是否適合。Snapshot 是另一項付費書面工作：60–90 分鐘訪談與一頁準備度評分，不包含系統實施。",
    snapshotQuestion: "Snapshot 就是免費診斷嗎？", scheduleQuestion: "何時收到書面評分？", correctionQuestion: "發現資料有誤可以如何處理？",
    caseNote: "Agilizing 善敏的教材流程是實施案例，並非 Snapshot 交付，也不是您的成效預測。",
  },
  ja: {
    fit: "適しているチーム", unfit: "見送るべき場合", deliverables: "提供するもの", process: "進め方", preparation: "ご準備いただくもの", boundaries: "範囲と検収", faq: "よくある質問", cases: "関連する納品事例", services: "サービスを比較", snapshot: "有料 Snapshot の詳細", book: "無料の30分相談を予約",
    inputs: ["問い合わせや作業の開始から完了までの匿名化した事例と、現在のツール。顧客名簿、財務明細、パスワードは送らないでください。", "引き継ぎを説明し、変更を承認できる業務責任者。", "処理時間、対応漏れ、手戻りなどの開始時点の指標。不明な場合は記録方法を確認します。"],
    processSteps: ["課題、参加者、優先する一つの業務を合意します。", "事例で現在の手順と基準値を確認してからツールを選びます。", "成果物と確認基準を合意し、責任者が対象の変更を試します。"],
    scopeNote: "有料業務の前に成果物、資料、責任、検収基準を書面で確認します。売上や時間短縮の保証ではなく、合意した基準で確認します。追加業務、連携、継続支援は別途定義し、日程は権限、資料、承認の準備状況に応じます。",
    courseInputs: ["参加者の役割、経験、希望言語、研修時間。", "匿名化した業務例と使用を許可されたツール・アカウント。顧客情報やパスワードは不要です。", "チームの窓口と、研修後に実演できるようにしたい課題。"],
    courseSteps: ["対象者、学習目標、適切な事例を合意します。", "選択した項目を実習し、AI の出力を人が確認します。", "学習目標に沿って演習を振り返り、次の一歩を決めます。"],
    courseBoundary: "予約前に内容、教材、演習の確認方法を合意します。研修は本番導入、資格認定、成果保証ではありません。明記された場合を除き、ソフトウェア実装と継続支援は別途です。",
    snapshotDifference: "無料の30分相談は適合性を確認する場です。Snapshot は別の有料業務で、60〜90分の面談と1ページの準備度評価を提供します。システム実装は含みません。",
    snapshotQuestion: "Snapshot は無料相談と同じですか？", scheduleQuestion: "評価書はいつ届きますか？", correctionQuestion: "記載内容に誤りがある場合は？",
    caseNote: "Agilizing の教材制作は実装事例です。Snapshot の成果物でも、お客様の成果の予測でもありません。",
  },
  de: {
    fit: "Für wen es passt", unfit: "Wann Sie besser warten", deliverables: "Was Sie erhalten", process: "So gehen wir vor", preparation: "Was Sie vorbereiten", boundaries: "Umfang und Abnahme", faq: "Häufige Fragen", cases: "Relevante Projekterfahrung", services: "Leistungen vergleichen", snapshot: "Kostenpflichtigen Snapshot ansehen", book: "Kostenloses 30-Minuten-Gespräch buchen",
    inputs: ["Ein anonymisiertes Beispiel vom Eingang einer Anfrage oder Aufgabe bis zum Abschluss und die genutzten Werkzeuge. Keine Kundenlisten, Finanzunterlagen oder Passwörter senden.", "Eine verantwortliche Person, die Übergaben erklären und Änderungen freigeben kann.", "Einen Ausgangswert wie Bearbeitungszeit, versäumte Nachfassaktionen oder Nacharbeit. Fehlt er, klären wir die mögliche Erfassung."],
    processSteps: ["Problem, Beteiligte und einen vorrangigen Ablauf vereinbaren.", "Beispiel, Arbeitsschritte und Ausgangswerte prüfen, bevor Werkzeuge gewählt werden.", "Lieferumfang und Prüfkriterien festlegen; vereinbarte Änderungen mit der verantwortlichen Person testen."],
    scopeNote: "Vor bezahlter Arbeit werden Lieferumfang, Unterlagen, Verantwortung und Abnahmekriterien schriftlich vereinbart. Maßstab sind diese Kriterien, keine Umsatz- oder Zeitersparnisgarantie. Weitere Abläufe, Schnittstellen und laufende Betreuung werden separat abgegrenzt; Termine hängen von Zugängen, Unterlagen und Freigaben ab.",
    courseInputs: ["Zielgruppe, Vorkenntnisse, gewünschte Sprache und Dauer.", "Ein anonymisiertes Arbeitsbeispiel und zugelassene Werkzeuge/Konten; keine Kundendaten oder Passwörter.", "Eine Kontaktperson und eine Aufgabe, die Teilnehmende anschließend demonstrieren sollen."],
    courseSteps: ["Zielgruppe, Lernziele und passende Beispiele abstimmen.", "Ausgewählte Module üben und KI-Ausgaben durch Menschen prüfen.", "Übungen anhand der Lernziele auswerten und nächste Schritte festlegen."],
    courseBoundary: "Agenda, Materialien und Übungsprüfung werden vor der Buchung abgestimmt. Training ist keine Produktivsetzung, Zertifizierung oder Erfolgsgarantie. Softwareimplementierung und laufende Betreuung sind separat, sofern nicht ausdrücklich vereinbart.",
    snapshotDifference: "Das kostenlose 30-Minuten-Gespräch prüft die Eignung. Snapshot ist eine separate bezahlte Leistung: ein 60–90-minütiges Interview und eine einseitige Bereitschaftsbewertung, keine Implementierung.",
    snapshotQuestion: "Ist Snapshot das kostenlose Gespräch?", scheduleQuestion: "Wann wird die Bewertung geliefert?", correctionQuestion: "Was passiert bei sachlichen Fehlern?",
    caseNote: "Agilizings Ablauf zur Erstellung von Schulungsmaterial ist ein Implementierungsbeispiel, keine Snapshot-Leistung und keine Prognose Ihrer Ergebnisse.",
  },
};
