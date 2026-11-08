import type { AppLocale } from "@/lib/i18n-routing";

type JourneyStep = { title: string; input: string; output: string; decision: string };
type ServiceChoice = { title: string; body: string; href: string; action: string };
type Solution = { name: string; problem: string; workflow: string; boundary: string; href: string };
type SiteExperience = {
  headline: string;
  introduction: string;
  cases: string;
  servicesTitle: string;
  servicesIntro: string;
  serviceChoices: ServiceChoice[];
  methodTitle: string;
  methodIntro: string;
  input: string;
  output: string;
  decision: string;
  steps: JourneyStep[];
  solutionsTitle: string;
  solutionsIntro: string;
  solutions: Solution[];
  scope: string;
  explore: string;
  aboutTitle: string;
  aboutIntro: string;
  aboutBoundary: string;
  speakingTitle: string;
  speakingIntro: string;
  profile: string;
  bookingNotes: string[];
};

const EN: SiteExperience = {
  headline: "AI consulting for Hong Kong SMEs. Workflow first, then AI.",
  introduction: "InnovateXP helps teams of 3–30 untangle WhatsApp enquiries, spreadsheets, quotes and handoffs. Start with one stuck workflow, name its owner and next step, then decide whether AI, CRM or automation is needed. If your existing tools are enough, we will say so.",
  cases: "See actual client work",
  servicesTitle: "Diagnose, implement or maintain?",
  servicesIntro: "Choose the situation that describes your team. A free 30-minute conversation comes before any paid scope; buying a system is not the default answer.",
  serviceChoices: [
    { title: "I do not know what to fix first", body: "Clarify one workflow with a Snapshot, or validate a wider scope through a qualified Discovery. Written deliverables are separate from the initial conversation.", href: "/services/snapshot", action: "Compare the starting points" },
    { title: "We know the problem and need to build", body: "Agree the process, data, owner and acceptance cases before quoting AI, CRM or automation implementation.", href: "/ai-consulting", action: "See implementation and acceptance" },
    { title: "Our system is live and needs care", body: "Start with a Technical Audit. Agree supported systems, maintenance and response boundaries; response time is not a guaranteed repair time.", href: "/bookme?interest=system-care-audit", action: "Discuss System Care" },
    { title: "Our team needs practice and support", body: "Use practical training and coaching to help people apply AI to their own work, review outputs and build a repeatable habit.", href: "/ai-training", action: "Explore practical training" },
  ],
  methodTitle: "One workflow. Three decision points.",
  methodIntro: "Move forward when the evidence supports it, not because another tool is available. Deliverables and timing are agreed for each paid engagement.",
  input: "Bring", output: "Work towards", decision: "Decision",
  steps: [
    { title: "Diagnose", input: "One anonymised example and the people involved.", output: "A clear problem, owner and next step. Written mapping belongs to the agreed paid scope.", decision: "Clarify the process, scope a Snapshot / Discovery, or keep the existing tools." },
    { title: "Implement", input: "Agreed scope, appropriate data access and acceptance scenarios.", output: "A bounded working process, human review points and an acceptance record.", decision: "Check real cases against the baseline before expanding." },
    { title: "Review and support", input: "Team feedback, usage and the agreed measures.", output: "Updated SOPs, adoption review and scoped care or training.", decision: "Keep, adjust or stop what the evidence does not support." },
  ],
  solutionsTitle: "Choose by the work you need to do.",
  solutionsIntro: "Start with a business situation, not a product name. Confirm scope and third-party costs before choosing a solution.",
  solutions: [
    { name: "SmartSales", problem: "Enquiries, quotes and follow-up are scattered.", workflow: "Enquiry → owner → sales stage → next action", boundary: "Pilot, production setup and monthly care are separate. WhatsApp APIs, AI usage and custom integrations require separate scoping.", href: "/smartsales-crm" },
    { name: "EventXP", problem: "Registration, check-in and follow-up do not connect.", workflow: "Registration → check-in → attendance report → follow-up", boundary: "Configured around your event and member workflow. Confirm participant records, on-site needs and integrations before quoting.", href: "/eventxp" },
    { name: "FitnessXP", problem: "Classes, membership and reminders live in different places.", workflow: "Class booking → membership record → service reminder", boundary: "Confirm the studio's booking and membership rules. Delivered functions are not a promise of retention or revenue gains.", href: "/fitnessxp" },
  ],
  scope: "Scope to confirm", explore: "Explore the workflow",
  aboutTitle: "Larry Lo. Understand the business before choosing technology.",
  aboutIntro: "Founder of InnovateXP and an AI business consultant with 14 years of IT delivery experience. I help Hong Kong SMEs clarify one workflow before recommending systems or automation.",
  aboutBoundary: "Client delivery, community speaking and referrals are different relationships. The records below describe the role, not an institutional endorsement. Client results are published only with permission and clear limitations.",
  speakingTitle: "Public sharing and delivery experience",
  speakingIntro: "Dated records identify the actual topic and role. A project showcase is not labelled as a keynote or client project.",
  profile: "Larry's LinkedIn profile",
  bookingNotes: ["The initial online workflow diagnosis is 30 minutes and free. Snapshot, Discovery and implementation are separately scoped paid services.", "Bring one anonymised enquiry, quote or handoff example. Do not upload client identities, passwords or confidential documents.", "After a successful booking, check the confirmation and calendar details. Use the contact email to ask about changes or cancellations."],
};

const ZH: SiteExperience = {
  headline: "香港中小企 AI 顧問：先執順流程，再落地 AI。",
  introduction: "InnovateXP 幫 3–30 人團隊執順 WhatsApp 查詢、Excel 跟進、報價同交接。由一條最卡住嘅流程開始，釐清責任同下一步，再判斷需唔需要 AI、CRM 或自動化。現有工具夠用，我哋會直講。",
  cases: "睇實際案例",
  servicesTitle: "你需要診斷、落地，定維護？",
  servicesIntro: "按團隊而家嘅情況揀入口。先有免費 30 分鐘對話，再決定付費範圍；唔係一開始就叫你買系統。",
  serviceChoices: [
    { title: "未知邊條流程值得先改", body: "用 Snapshot 睇清一條流程，或通過資格確認後做 Discovery。書面交付同首次對話係不同範圍。", href: "/services/snapshot", action: "了解起步方案" },
    { title: "問題清楚，需要實作", body: "先確認流程、資料、負責人同驗收情境，再報 AI、CRM 或自動化落地範圍。", href: "/ai-consulting", action: "睇做法與驗收" },
    { title: "系統已上線，需要照顧", body: "先做 Technical Audit，確認支援系統、維護同回應界線；回應時間唔等於保證修復時間。", href: "/bookme?interest=system-care-audit", action: "了解 System Care" },
    { title: "團隊未識用，或者用唔順", body: "用實作培訓同陪跑，將 AI 放入日常工作，練習覆核輸出同建立可重複嘅做法。", href: "/ai-training", action: "睇實作培訓" },
  ],
  methodTitle: "一條流程，三個決策點。",
  methodIntro: "有證據先行下一步，唔係有新工具就一定要買。每個付費階段嘅交付同排期，會按範圍確認。",
  input: "帶乜嚟", output: "要做到乜", decision: "點決定下一步",
  steps: [
    { title: "業務聽診", input: "一個已遮蓋個人資料嘅例子，同相關負責人。", output: "講清問題、責任同下一步；書面流程圖屬另行確認嘅付費範圍。", decision: "先執流程、選 Snapshot／Discovery，或者沿用現有工具。" },
    { title: "實際落地", input: "確認範圍、合適資料權限，同雙方同意嘅驗收情境。", output: "有邊界嘅實作流程、人工覆核位同驗收紀錄。", decision: "用真實個案對照起始狀況，再決定擴展。" },
    { title: "陪跑檢討", input: "團隊回饋、使用情況同約定指標。", output: "更新 SOP、採用檢討，以及按需要安排維護或培訓。", decision: "保留有效做法；冇證據支持嘅，調整或者停。" },
  ],
  solutionsTitle: "按你嘅營運場景，揀合適方案。",
  solutionsIntro: "先睇你要完成邊件事，唔係先揀產品名。決定前講清楚功能範圍、第三方費用同驗收。",
  solutions: [
    { name: "SmartSales", problem: "查詢、報價同跟進各做各。", workflow: "查詢 → 負責人 → 銷售階段 → 下一步", boundary: "Pilot、正式上線同月費維護分開計。WhatsApp API、AI 用量同客製接駁另行確認及報價。", href: "/smartsales-crm" },
    { name: "EventXP", problem: "報名、報到同會後跟進接唔上。", workflow: "報名 → 報到 → 出席報告 → 跟進", boundary: "按活動及會員流程配置。先確認參加者資料、現場需要同系統接駁，再報價。", href: "/eventxp" },
    { name: "FitnessXP", problem: "課堂、會籍同提醒散落唔同地方。", workflow: "課堂預約 → 會籍記錄 → 服務提醒", boundary: "先確認健身室嘅預約同會籍規則。功能交付唔代表保證續會或收入增長。", href: "/fitnessxp" },
  ],
  scope: "先確認範圍", explore: "了解呢條流程",
  aboutTitle: "Larry Lo｜先聽清楚業務，再揀技術。",
  aboutIntro: "InnovateXP 創辦人、AI 商業顧問，具 14 年 IT 交付經驗。幫香港中小企先理順一條流程，再按需要建議系統或自動化。",
  aboutBoundary: "客戶交付、社群分享同互相轉介係不同關係。以下紀錄描述實際角色，唔代表機構背書；客戶成效只會喺獲准及講清限制後公開。",
  speakingTitle: "公開分享與交付經驗",
  speakingIntro: "按日期列出主題同實際角色。項目展示唔會寫成主題演講或客戶委託。",
  profile: "Larry 嘅 LinkedIn",
  bookingNotes: ["首次網上業務聽診為免費 30 分鐘對話。Snapshot、Discovery 同實作係另外確認範圍嘅付費服務。", "帶一個已遮蓋個人資料嘅查詢、報價或交接例子即可；唔好上載客戶身份、密碼或機密文件。", "預約成功後，請查看確認同日曆資料。需要改期或取消，可以透過聯絡電郵提出。"],
};

const ZH_TW: SiteExperience = {
  ...ZH,
  headline: "香港中小企業 AI 顧問：先理順流程，再導入 AI。",
  introduction: "InnovateXP 協助 3–30 人團隊整理 WhatsApp 詢問、Excel 跟進、報價與交接。從一條最卡住的流程開始，釐清責任與下一步，再判斷是否需要 AI、CRM 或自動化。現有工具足夠，我們會直說。",
  cases: "查看實際案例", servicesTitle: "你需要診斷、實作，還是維護？",
  servicesIntro: "依照團隊現況選擇入口。先進行免費 30 分鐘對話，再決定付費範圍，不會一開始就要求購買系統。",
  serviceChoices: [
    { title: "不知道該先改善哪條流程", body: "以 Snapshot 釐清一條流程，或通過資格確認後進行 Discovery。書面交付與初次對話是不同範圍。", href: "/services/snapshot", action: "了解起步方案" },
    { title: "問題明確，需要實作", body: "先確認流程、資料、負責人及驗收情境，再為 AI、CRM 或自動化實作報價。", href: "/ai-consulting", action: "查看做法與驗收" },
    { title: "系統已上線，需要維護", body: "先進行 Technical Audit，確認支援系統、維護與回應界線。回應時間不等於保證修復時間。", href: "/bookme?interest=system-care-audit", action: "了解 System Care" },
    { title: "團隊需要練習與支援", body: "透過實作培訓與陪跑，把 AI 放進日常工作，練習檢查輸出並建立可重複的做法。", href: "/ai-training", action: "查看實作培訓" },
  ],
  methodIntro: "有證據才前進，不是有新工具就一定要買。每個付費階段的交付與排程均依範圍確認。",
  input: "準備資料", output: "目標交付", decision: "下一步決策",
  steps: [
    { title: "業務診斷", input: "一個已匿名處理的例子與相關負責人。", output: "釐清問題、責任與下一步；書面流程圖屬另行確認的付費範圍。", decision: "先整理流程、選擇 Snapshot／Discovery，或沿用現有工具。" },
    { title: "實際落地", input: "確認範圍、適當資料權限與雙方同意的驗收情境。", output: "有界線的實作流程、人工檢查點與驗收紀錄。", decision: "以真實個案對照基準，再決定是否擴展。" },
    { title: "陪跑檢討", input: "團隊回饋、使用情況與約定指標。", output: "更新 SOP、採用檢討，以及按需要安排維護或培訓。", decision: "保留有效做法；缺乏證據支持的項目則調整或停止。" },
  ],
  solutionsTitle: "依照營運情境，選擇合適方案。", solutionsIntro: "先看需要完成什麼工作，而不是先選產品名稱。決定前確認功能範圍、第三方費用與驗收。",
  solutions: [
    { name: "SmartSales", problem: "詢問、報價與跟進分散處理。", workflow: "詢問 → 負責人 → 銷售階段 → 下一步", boundary: "Pilot、正式上線及月費維護分開計費。WhatsApp API、AI 用量及客製整合另行確認與報價。", href: "/smartsales-crm" },
    { name: "EventXP", problem: "報名、報到與活動後跟進沒有串連。", workflow: "報名 → 報到 → 出席報告 → 跟進", boundary: "依照活動與會員流程配置。先確認參加者資料、現場需要及系統整合，再報價。", href: "/eventxp" },
    { name: "FitnessXP", problem: "課堂、會籍與提醒分散在不同地方。", workflow: "課堂預約 → 會籍紀錄 → 服務提醒", boundary: "先確認健身房的預約與會籍規則。功能交付不代表保證續會或收入成長。", href: "/fitnessxp" },
  ],
  explore: "了解這條流程", aboutTitle: "Larry Lo｜先了解業務，再選擇技術。",
  aboutIntro: "InnovateXP 創辦人、AI 商業顧問，具備 14 年 IT 交付經驗。協助香港中小企業先釐清一條流程，再按需要建議系統或自動化。",
  aboutBoundary: "客戶交付、社群分享與互相轉介是不同關係。以下紀錄描述實際角色，不代表機構背書。客戶成效須經授權並註明限制才會公開。",
  speakingIntro: "依日期列出主題與實際角色。項目展示不會寫成主題演講或客戶委託。", profile: "Larry 的 LinkedIn",
  bookingNotes: ["首次線上業務診斷為免費 30 分鐘對話。Snapshot、Discovery 與實作是另外確認範圍的付費服務。", "準備一個已匿名處理的詢問、報價或交接例子即可；請勿上傳客戶身分、密碼或機密文件。", "預約成功後，請查看確認與日曆資料。需要改期或取消，請透過聯絡電子郵件提出。"],
};

const JA: SiteExperience = {
  headline: "香港の中小企業向けAI顧問。業務を整えてからAIを。",
  introduction: "InnovateXPは3〜30人のチームのWhatsApp問い合わせ、表計算、見積もり、引き継ぎを整理します。まず一つの業務と責任者、次の行動を明確にし、AI・CRM・自動化が必要か判断します。既存ツールで十分なら、そうお伝えします。",
  cases: "実際の事例を見る", servicesTitle: "診断、実装、それとも保守？",
  servicesIntro: "チームの状況から選べます。まず無料の30分相談、その後に有料の範囲を確認します。システム購入が前提ではありません。",
  serviceChoices: [
    { title: "何から直すか分からない", body: "Snapshotで一つの業務を整理し、適合確認後にDiscoveryで範囲を検証します。書面の成果物は初回相談とは別です。", href: "/services/snapshot", action: "開始プランを確認" },
    { title: "課題は明確、実装したい", body: "業務、データ、責任者、受入条件を合意してからAI・CRM・自動化を見積もります。", href: "/ai-consulting", action: "実装と受入を確認" },
    { title: "稼働中のシステムを保守したい", body: "Technical Audit後に対象、保守、応答範囲を確認します。応答時間は修復期限の保証ではありません。", href: "/bookme?interest=system-care-audit", action: "System Careを相談" },
    { title: "チームに練習と支援が必要", body: "実務研修と伴走でAIを仕事に取り入れ、出力の確認と再現可能な手順を練習します。", href: "/ai-training", action: "実務研修を見る" },
  ],
  methodTitle: "一つの業務、三つの判断。", methodIntro: "新しいツールではなく、根拠をもとに進みます。有料段階の成果物と日程は個別に合意します。",
  input: "用意するもの", output: "目指す成果物", decision: "判断",
  steps: [
    { title: "診断", input: "匿名化した一例と関係する担当者。", output: "課題、責任者、次の行動。書面の業務図は別途有料範囲です。", decision: "業務を整理、Snapshot／Discoveryを検討、または既存ツールを継続。" },
    { title: "実装", input: "合意した範囲、適切なデータ権限、受入条件。", output: "限定した業務、人による確認点、受入記録。", decision: "実例を基準と比較してから拡大を判断。" },
    { title: "見直しと支援", input: "チームの意見、利用状況、合意した指標。", output: "SOP更新、定着確認、必要な保守・研修。", decision: "効果のある手順を残し、根拠のないものは調整・停止。" },
  ],
  solutionsTitle: "必要な業務から選ぶ。", solutionsIntro: "製品名より業務を先に。機能範囲、第三者費用、受入条件を確認して選びます。",
  solutions: [
    { name: "SmartSales", problem: "問い合わせ、見積もり、フォローが分散。", workflow: "問い合わせ → 担当者 → 商談段階 → 次の行動", boundary: "試行・本番構築・月額保守は別料金。WhatsApp API、AI使用量、独自連携は別途確認と見積もりが必要です。", href: "/smartsales-crm" },
    { name: "EventXP", problem: "申込、受付、事後対応がつながらない。", workflow: "申込 → 受付 → 出席報告 → フォロー", boundary: "イベントと会員業務に合わせて設定。参加者データ、現場対応、連携を確認後に見積もります。", href: "/eventxp" },
    { name: "FitnessXP", problem: "クラス、会員、通知が別々。", workflow: "予約 → 会員記録 → サービス通知", boundary: "スタジオの予約・会員規則を先に確認。機能の納品は継続率や売上の保証ではありません。", href: "/fitnessxp" },
  ],
  scope: "確認する範囲", explore: "業務の詳細を見る", aboutTitle: "Larry Lo。技術を選ぶ前に業務を理解する。",
  aboutIntro: "InnovateXP創業者、AIビジネス顧問。ITデリバリー経験14年。香港の中小企業で一つの業務を整理してからシステムや自動化を提案します。",
  aboutBoundary: "顧客への納品、コミュニティ登壇、紹介は異なる関係です。記録は実際の役割を示し、組織の推薦を意味しません。顧客成果は許可と限界の明記を前提に公開します。",
  speakingTitle: "公開活動と実務経験", speakingIntro: "日付、テーマ、実際の役割を示します。プロジェクト紹介を基調講演や顧客案件と呼びません。", profile: "LarryのLinkedIn",
  bookingNotes: ["初回オンライン業務診断は無料の30分相談です。Snapshot、Discovery、実装は別途範囲を確認する有料サービスです。", "匿名化した問い合わせ、見積もり、引き継ぎ例を一つ用意してください。顧客の個人情報、パスワード、機密資料は送らないでください。", "予約成功後に確認とカレンダー情報をご確認ください。変更・取消は連絡用メールでご相談ください。"],
};

const DE: SiteExperience = {
  headline: "KI-Beratung für Hongkongs KMU. Erst der Ablauf, dann KI.",
  introduction: "InnovateXP hilft Teams mit 3–30 Personen, WhatsApp-Anfragen, Tabellen, Angebote und Übergaben zu ordnen. Wir klären einen stockenden Ablauf, seine Verantwortung und den nächsten Schritt. Erst danach entscheiden wir über KI, CRM oder Automatisierung. Reichen vorhandene Werkzeuge, sagen wir das.",
  cases: "Echte Kundenprojekte ansehen", servicesTitle: "Diagnose, Umsetzung oder Wartung?",
  servicesIntro: "Wählen Sie nach Ihrer Situation. Ein kostenloses 30-Minuten-Gespräch kommt vor jedem kostenpflichtigen Auftrag. Ein neues System ist nicht automatisch die Antwort.",
  serviceChoices: [
    { title: "Der erste Verbesserungsbedarf ist unklar", body: "Ein Snapshot klärt einen Ablauf; eine qualifizierte Discovery prüft einen größeren Umfang. Schriftliche Ergebnisse sind vom Erstgespräch getrennt.", href: "/services/snapshot", action: "Einstiege vergleichen" },
    { title: "Das Problem ist klar, die Umsetzung fehlt", body: "Ablauf, Daten, Verantwortung und Abnahmefälle werden vereinbart, bevor wir KI, CRM oder Automatisierung anbieten.", href: "/ai-consulting", action: "Umsetzung und Abnahme ansehen" },
    { title: "Ein laufendes System braucht Betreuung", body: "Zuerst ein Technical Audit, dann Systeme, Wartung und Reaktionsgrenzen vereinbaren. Reaktionszeit ist keine garantierte Reparaturfrist.", href: "/bookme?interest=system-care-audit", action: "System Care besprechen" },
    { title: "Das Team braucht Übung und Begleitung", body: "Praktische Schulung und Coaching helfen, KI im Alltag anzuwenden, Ergebnisse zu prüfen und wiederholbare Abläufe aufzubauen.", href: "/ai-training", action: "Praktische Schulung ansehen" },
  ],
  methodTitle: "Ein Ablauf. Drei Entscheidungen.", methodIntro: "Nachweise bestimmen den nächsten Schritt, nicht das nächste Werkzeug. Ergebnisse und Termine jedes bezahlten Auftrags werden vereinbart.",
  input: "Mitbringen", output: "Ziel", decision: "Entscheidung",
  steps: [
    { title: "Diagnostizieren", input: "Ein anonymisiertes Beispiel und die zuständigen Personen.", output: "Problem, Verantwortung und nächster Schritt. Schriftliche Prozesskarten gehören zum vereinbarten bezahlten Umfang.", decision: "Ablauf klären, Snapshot / Discovery planen oder vorhandene Werkzeuge behalten." },
    { title: "Umsetzen", input: "Vereinbarter Umfang, geeigneter Datenzugriff und Abnahmefälle.", output: "Ein begrenzter Arbeitsablauf, menschliche Prüfpunkte und ein Abnahmeprotokoll.", decision: "Echte Fälle mit dem Ausgangswert vergleichen, bevor der Umfang wächst." },
    { title: "Prüfen und begleiten", input: "Rückmeldungen, Nutzung und vereinbarte Kennzahlen.", output: "Aktualisierte SOPs, Nutzungsprüfung und passende Wartung oder Schulung.", decision: "Wirksames behalten; Unbelegtes anpassen oder stoppen." },
  ],
  solutionsTitle: "Nach der Aufgabe auswählen.", solutionsIntro: "Beginnen Sie mit der Arbeit, nicht mit einem Produktnamen. Funktionsumfang, Drittanbietergebühren und Abnahme werden vorab geklärt.",
  solutions: [
    { name: "SmartSales", problem: "Anfragen, Angebote und Nachfassen sind verstreut.", workflow: "Anfrage → Verantwortlicher → Verkaufsphase → nächste Aktion", boundary: "Pilot, Einrichtung und monatliche Betreuung sind getrennt. WhatsApp-APIs, KI-Nutzung und individuelle Integrationen werden separat angeboten.", href: "/smartsales-crm" },
    { name: "EventXP", problem: "Anmeldung, Check-in und Nachbereitung sind getrennt.", workflow: "Anmeldung → Check-in → Anwesenheitsbericht → Nachbereitung", boundary: "An Ihren Veranstaltungs- und Mitgliederablauf angepasst. Teilnehmerdaten, Vor-Ort-Bedarf und Integrationen werden vor dem Angebot geprüft.", href: "/eventxp" },
    { name: "FitnessXP", problem: "Kurse, Mitgliedschaften und Erinnerungen sind verstreut.", workflow: "Kursbuchung → Mitgliedsdatensatz → Service-Erinnerung", boundary: "Zuerst Buchungs- und Mitgliedschaftsregeln klären. Gelieferte Funktionen garantieren weder Bindung noch Umsatzwachstum.", href: "/fitnessxp" },
  ],
  scope: "Umfang klären", explore: "Ablauf ansehen", aboutTitle: "Larry Lo. Das Geschäft verstehen, bevor die Technik kommt.",
  aboutIntro: "Gründer von InnovateXP und KI-Unternehmensberater mit 14 Jahren IT-Delivery-Erfahrung. Ich helfe Hongkonger KMU, zuerst einen Ablauf zu klären und erst dann Systeme oder Automatisierung zu wählen.",
  aboutBoundary: "Kundenarbeit, Community-Vorträge und Empfehlungen sind unterschiedliche Beziehungen. Die Einträge beschreiben Rollen, keine institutionelle Billigung. Kundenergebnisse erscheinen nur mit Erlaubnis und klaren Grenzen.",
  speakingTitle: "Öffentliche Beiträge und Projekterfahrung", speakingIntro: "Datierte Einträge benennen Thema und tatsächliche Rolle. Eine Projektvorstellung ist keine Keynote und kein Kundenauftrag.", profile: "Larrys LinkedIn-Profil",
  bookingNotes: ["Die erste Online-Ablaufdiagnose ist ein kostenloses 30-Minuten-Gespräch. Snapshot, Discovery und Umsetzung sind separate kostenpflichtige Leistungen mit vereinbartem Umfang.", "Bringen Sie ein anonymisiertes Beispiel einer Anfrage, eines Angebots oder einer Übergabe mit. Keine Kundenidentitäten, Passwörter oder vertraulichen Dokumente hochladen.", "Prüfen Sie nach erfolgreicher Buchung die Bestätigung und Kalenderangaben. Änderungen und Absagen können Sie per Kontakt-E-Mail anfragen."],
};

const COPY: Record<AppLocale, SiteExperience> = { en: EN, "zh-hk": ZH, "zh-tw": ZH_TW, ja: JA, de: DE };

export function getSiteExperience(locale: AppLocale): SiteExperience {
  return COPY[locale];
}
