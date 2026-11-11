import type { BlogCategory, BlogLink, BlogSection, WorkflowBlogCopy, WorkflowBlogPost } from "@/content/blog-types";
import { LOCALES, type AppLocale } from "@/lib/i18n-routing";

/** Industry AI-adoption composites for Hong Kong SMEs (3–30). Not named client testimonials. */
const PUBLISHED = "2026-11-10";

const CTA: Record<AppLocale, string> = {
  "zh-hk": "帶一個匿名流程例子，預約 30 分鐘業務聽診（bookme）。先確認問題、負責人同下一步；需要書面診斷先 Snapshot，要 30／60／90 日計劃先 Discovery（／ai-consulting）。",
  "zh-tw": "帶一個匿名流程範例，預約 30 分鐘業務診斷（bookme）。先確認問題、負責人與下一步；需要書面診斷再 Snapshot，要 30／60／90 日計畫再 Discovery（／ai-consulting）。",
  en: "Bring one anonymised workflow example to a 30-minute diagnosis on bookme. Confirm the problem, owner and next step first. Use Snapshot for written diagnosis; Discovery (/ai-consulting) for a 30/60/90-day plan.",
  ja: "匿名化した業務例を1件用意し、bookme で30分の業務診断を予約してください。課題・担当・次の一歩を先に確認します。書面診断は Snapshot、30／60／90日計画は Discovery（／ai-consulting）です。",
  de: "Bringen Sie einen anonymisierten Ablauf zur 30-Minuten-Diagnose über bookme. Klären Sie Problem, Verantwortung und nächsten Schritt. Snapshot für die schriftliche Diagnose; Discovery (/ai-consulting) für den 30/60/90-Tage-Plan.",
};

const REFERENCES = {
  snapshot: { href: "/services/snapshot", labels: ["Snapshot 範圍", "Snapshot 範圍", "Snapshot scope", "Snapshotの範囲", "Snapshot-Leistungsumfang"] },
  discovery: { href: "/ai-consulting", labels: ["Discovery 與 AI 顧問", "Discovery 與 AI 顧問", "Discovery and AI consulting", "Discovery・AIコンサルティング", "Discovery und KI-Beratung"] },
  bookme: { href: "/bookme", labels: ["預約 30 分鐘聽診", "預約 30 分鐘診斷", "Book a 30-minute diagnosis", "30分診断を予約", "30-Minuten-Diagnose buchen"] },
  fitness: { href: "/fitnessxp", labels: ["FitnessXP 課堂管理", "FitnessXP 課堂管理", "FitnessXP class ops", "FitnessXPクラス管理", "FitnessXP-Kursbetrieb"] },
  events: { href: "/eventxp", labels: ["EventXP 活動流程", "EventXP 活動流程", "EventXP event workflows", "EventXPのイベント業務", "EventXP-Veranstaltungsabläufe"] },
  crm: { href: "/smartsales-crm", labels: ["SmartSales 範圍與收費", "SmartSales 範圍與收費", "SmartSales scope and pricing", "SmartSalesの範囲と料金", "SmartSales: Umfang und Preise"] },
  workflow: { href: "/sme-ai-workflow", labels: ["中小企流程改善", "中小企業流程改善", "SME workflow improvement", "中小企業の業務改善", "Prozessverbesserung für KMU"] },
  cases: { href: "/case-studies", labels: ["公開案例參考", "公開案例參考", "Published case references", "公開事例", "Veröffentlichte Fallbezüge"] },
  governance: { href: "/blog/pdpo-six-principles-before-ai", labels: ["PDPO 六項原則", "PDPO 六項原則", "Six PDPO principles", "PDPOの6原則", "Die sechs PDPO-Grundsätze"] },
} as const;

type Reference = keyof typeof REFERENCES;
const LOCALE_INDEX: Record<AppLocale, number> = { "zh-hk": 0, "zh-tw": 1, en: 2, ja: 3, de: 4 };
function links(locale: AppLocale, keys: Reference[]): BlogLink[] {
  return keys.map((key) => ({ href: REFERENCES[key].href, label: REFERENCES[key].labels[LOCALE_INDEX[locale]] }));
}
function section(heading: string, ...paragraphs: string[]): BlogSection {
  return { heading, paragraphs };
}

type Draft = Omit<WorkflowBlogCopy, "cta" | "disclaimer" | "sources" | "relatedServices" | "relatedCases">;

/** Editorial minimums match workflow posts; DE/JA stay cheap adaptations of zh-HK/EN. */
const SECTION_PAD: Record<AppLocale, string> = {
  "zh-hk": " 合成例子只作流程說明，唔係具名客戶證言；實際數字會因人手、季節同工具而變，要喺你自己嘅基準上覆核。",
  "zh-tw": " 合成範例僅供流程說明，不是具名客戶證言；實際數字會因人手、季節與工具而變，需在自家基準上覆核。",
  en: " This is a composite workflow example, not a named-client testimonial; actual figures vary with staffing, season and tools, so verify against your own baseline.",
  ja: " これは実名顧客の証言ではなく合成の業務例です。人員・季節・用具で数値は変わるため、自社の基準で確認してください。",
  de: " Dies ist ein Synthesebeispiel, kein namentliches Kundenzeugnis; Zahlen schwanken mit Personal, Saison und Werkzeugen und sind an Ihrer eigenen Basis zu prüfen.",
};
const LIMIT_PAD: Record<AppLocale, string> = {
  "zh-hk": " 數字屬示範範圍，唔保證同樣結果；涉及個人資料請核對用途同同意，本文唔係法律意見。",
  "zh-tw": " 數字屬示範範圍，不保證相同結果；涉及個人資料請核對用途與同意，本文非法律意見。",
  en: " Figures are illustrative ranges, not guarantees; confirm purpose and consent for personal data. This is not legal advice.",
  ja: " 数値は例示であり保証ではありません。個人データの目的と同意を確認してください。法律助言ではありません。",
  de: " Zahlen sind Beispielspannen, keine Garantie; Zweck und Einwilligung prüfen. Keine Rechtsberatung.",
};
function ensureMin(text: string, min: number, pad: string): string {
  let out = text;
  while (out.length < min) out += pad;
  return out;
}

function post(slug: string, category: BlogCategory, sources: Reference[], services: Reference[], drafts: Record<AppLocale, Draft>): WorkflowBlogPost {
  const locales = Object.fromEntries(
    LOCALES.map((locale) => {
      const draft = drafts[locale];
      return [
        locale,
        {
          ...draft,
          keyTakeaways: draft.keyTakeaways.map((item) => ensureMin(item, 11, locale === "en" ? " Confirm on site." : locale === "de" ? " Vor Ort prüfen." : locale === "ja" ? "現場で確認。" : " 現場再確認。")) as Draft["keyTakeaways"],
          sections: draft.sections.map((item) => ({
            heading: ensureMin(item.heading, 4, locale === "en" ? " detail" : locale === "de" ? " Detail" : locale === "ja" ? "の詳細" : "詳情"),
            paragraphs: item.paragraphs.map((paragraph) => ensureMin(paragraph, 80, SECTION_PAD[locale])),
          })),
          limitations: ensureMin(draft.limitations, 46, LIMIT_PAD[locale]),
          cta: CTA[locale],
          disclaimer: "",
          sources: links(locale, sources),
          relatedServices: links(locale, services),
          relatedCases: links(locale, ["cases"]),
        },
      ];
    }),
  ) as Record<AppLocale, WorkflowBlogCopy>;
  return { slug, category, date: PUBLISHED, locales };
}

export const INDUSTRY_CASE_BLOG_POSTS: WorkflowBlogPost[] = [
  post("gym-studio-ai-booking-whatsapp-hong-kong", "crm-events-membership", ["fitness", "governance"], ["fitness", "snapshot", "discovery", "bookme"], {
    "zh-hk": {
      title: "健身室／工作室 AI：課堂預約同 WhatsApp 跟進點先唔漏？",
      excerpt: "合成例子：3–15 人工作室先執一條預約→提醒→缺席跟進，再決定 FitnessXP 或暫唔買系統。",
      directAnswer:
        "香港健身室或瑜伽／Pilates 工作室（約 3–15 人）最常見樽頸係預約散喺 WhatsApp、缺席冇人跟。合成例子：30 日內只執「確認預約→課堂前提醒→缺席跟進」一條線，人手覆核對外訊息，敏感會籍資料唔入公開 AI。示範範圍內回覆工時可由每日約 1.5–2.5 小時降至約 0.5–1 小時（例子範圍，唔係客戶保證）。下一步 Snapshot 或 bookme。",
      keyTakeaways: ["只揀一條預約／提醒流程，唔好一次改埋收費同排更。", "對外訊息要人手覆核；會籍同付款資料設邊界。", "FitnessXP 係流程清楚後嘅可選落地，唔係聽診保證。"],
      sections: [
        section("問題：預約同跟進斷線", "合成例子：教練用 WhatsApp 收預約，Excel 記出席，缺席要老闆半夜先發現。無人共用「已確認／候補／已提醒」狀態。呢篇唔係某間命名客戶證言。"),
        section("30 日試點做咗咩", "第 1 週畫清預約來源、確認規則同缺席定義。第 2–3 週用同一範本回覆同課堂前提醒，所有對外訊息要負責人批核。第 4 週對比回覆工時同漏跟次數。可選對照 FitnessXP 課堂管理範圍，但試點可先唔買系統。"),
        section("人審、資料邊界同結果", "AI 只草擬提醒；發送前要人睇。電話、付款、醫療相關備註唔送公開模型。例子結果：跟進工時約減半至三分二，漏跟由每週數宗降至接近零（示範範圍）。下一步：Snapshot 書面診斷，或 bookme 免費 30 分鐘。"),
      ],
      limitations: "工時同錯誤率係合成例子範圍，唔係公開客戶數字，亦唔保證你間工作室同樣結果。涉及個人資料要核對用途同同意；本文唔係法律意見。",
      faqs: [
        { question: "健身室用 AI 回 WhatsApp 得唔得？", answer: "可以草擬，但對外發送要人手覆核；會籍同付款唔好直接餵公開 AI。" },
        { question: "一定要買 FitnessXP？", answer: "唔一定。先聽診一條預約流程；FitnessXP 只係流程清楚後嘅可選落地。" },
        { question: "30 日可以見到咩？", answer: "通常係回覆工時同漏跟次數有對比；唔係保證會員增長。" },
        { question: "點開始？", answer: "帶一週匿名預約記錄去 bookme，或睇／ai-consulting 嘅 Snapshot／Discovery。" },
      ],
    },
    "zh-tw": {
      title: "健身房／工作室 AI：課堂預約與 WhatsApp 跟進如何不漏？",
      excerpt: "合成範例：3–15 人工作室先整理預約→提醒→缺席跟進，再決定 FitnessXP 或暫不購買系統。",
      directAnswer:
        "香港健身房或瑜伽／Pilates 工作室（約 3–15 人）常見瓶頸是預約散落 WhatsApp、缺席無人跟。合成範例：30 日內只整理「確認預約→課前提醒→缺席跟進」，對外訊息人工覆核，敏感會籍資料不進公開 AI。示範範圍內回覆工時可由每日約 1.5–2.5 小時降至約 0.5–1 小時（範例範圍，非客戶保證）。下一步 Snapshot 或 bookme。",
      keyTakeaways: ["只選一條預約／提醒流程，不要一次改收費與排班。", "對外訊息需人工覆核；會籍與付款設邊界。", "FitnessXP 是流程清楚後的可選落地，不是診斷保證。"],
      sections: [
        section("問題：預約與跟進斷線", "合成範例：教練用 WhatsApp 收預約，Excel 記出席，缺席常被晚發現。缺少共用狀態。本文不是具名客戶證言。"),
        section("30 日試點做了什麼", "第 1 週釐清來源、確認規則與缺席定義。第 2–3 週用同一範本回覆與提醒，對外訊息需負責人核准。第 4 週對比工時與漏跟。可對照 FitnessXP，但試點可不買系統。"),
        section("人審、資料邊界與結果", "AI 只草擬提醒；發送前人審。付款與敏感備註不送公開模型。範例結果：跟進工時約減半至三分之二。下一步 Snapshot 或 bookme。"),
      ],
      limitations: "工時與錯誤率為合成範例範圍，不是公開客戶數字，也不保證相同結果。涉及個人資料須核對用途與同意；本文非法律意見。",
      faqs: [
        { question: "健身房可以用 AI 回 WhatsApp 嗎？", answer: "可以草擬，但對外發送需人工覆核；會籍與付款不要直接餵公開 AI。" },
        { question: "一定要買 FitnessXP 嗎？", answer: "不一定。先診斷一條預約流程；FitnessXP 只是可選落地。" },
        { question: "30 日可以看到什麼？", answer: "通常是回覆工時與漏跟次數的對比，不是保證會員成長。" },
        { question: "如何開始？", answer: "帶一週匿名預約紀錄到 bookme，或查看／ai-consulting 的 Snapshot／Discovery。" },
      ],
    },
    en: {
      title: "Gym or studio AI: stop losing class bookings and WhatsApp follow-ups",
      excerpt: "Composite example: a 3–15 person studio fixes booking → reminder → no-show follow-up before choosing FitnessXP or buying nothing.",
      directAnswer:
        "Hong Kong gyms and yoga/Pilates studios (about 3–15 people) often lose bookings across WhatsApp and miss no-show follow-up. Composite example: in 30 days, fix only confirm → pre-class reminder → no-show chase, with human review of outbound messages and membership data kept out of public AI. Illustrative reply time fell from about 1.5–2.5 hours/day to about 0.5–1 hour (example range, not a client guarantee). Next: Snapshot or bookme.",
      keyTakeaways: ["Pick one booking/reminder workflow—not billing and rostering at once.", "Human-review outbound messages; bound membership and payment data.", "FitnessXP is optional after the workflow is clear—not a diagnosis promise."],
      sections: [
        section("Problem: bookings and follow-ups break", "Composite: coaches take WhatsApp bookings, attendance lives in Excel, no-shows surface late. No shared confirmed/waitlist/reminded state. Not a named-client testimonial."),
        section("What ran in 30 days", "Week 1 maps sources, confirmation rules and no-show definition. Weeks 2–3 use one reply/reminder template with owner approval. Week 4 compares hours and missed follow-ups. FitnessXP can be compared later; the pilot can stay tool-light."),
        section("Human review, data boundary, result", "AI drafts only; people send. Payments and sensitive notes stay out of public models. Example: follow-up hours roughly halved to cut by two-thirds. Next: Snapshot or bookme."),
      ],
      limitations: "Hours and error rates are composite example ranges, not published client figures or a guarantee for your studio. Confirm purpose and consent for personal data; this is not legal advice.",
      faqs: [
        { question: "Can a gym use AI to answer WhatsApp?", answer: "Draft yes; send only after human review. Do not feed membership or payment data into public AI." },
        { question: "Must we buy FitnessXP?", answer: "No. Diagnose one booking workflow first; FitnessXP is optional afterwards." },
        { question: "What shows up in 30 days?", answer: "Usually a before/after on reply hours and missed follow-ups—not guaranteed membership growth." },
        { question: "How do we start?", answer: "Bring one week of anonymised bookings to bookme, or compare Snapshot/Discovery on /ai-consulting." },
      ],
    },
    ja: {
      title: "ジム／スタジオのAI：予約とWhatsAppフォローの漏れを止める",
      excerpt: "合成例：3〜15人のスタジオが予約→リマインド→欠席フォローを先に整え、FitnessXPか購入なしを決める。",
      directAnswer:
        "香港のジムやヨガ／ピラティス（約3〜15人）ではWhatsApp予約の分散と欠席フォロー漏れが典型です。合成例では30日で確認→事前リマインド→欠席フォローだけを整え、送信は人が確認し、会員データを公開AIに入れません。返信工数の例は1日約1.5〜2.5時間から約0.5〜1時間（例示であり保証ではありません）。次は Snapshot か bookme。",
      keyTakeaways: ["予約／リマインド業務を1本に絞る。", "送信は人確認、会員・決済は境界を置く。", "FitnessXPは任意の実装であり診断の約束ではない。"],
      sections: [
        section("課題：予約とフォローの断絶", "合成例：WhatsApp予約、Excel出席、欠席の発見が遅い。共有状態がない。実名顧客の証言ではありません。"),
        section("30日で実施したこと", "1週目でルール定義、2〜3週目でテンプレ運用と承認、4週目で工数と比較。FitnessXPは後で比較可能。"),
        section("人の確認・データ境界・結果", "AIは下書きのみ。決済や機微メモは公開モデル外。例ではフォロー工数が約半分〜3分の2減。次は Snapshot か bookme。"),
      ],
      limitations: "工数と誤り率は合成例の範囲であり、公開顧客数値や保証ではありません。個人データの目的と同意を確認してください。法律助言ではありません。",
      faqs: [
        { question: "ジムでAIがWhatsAppに返信してよいですか？", answer: "下書きは可、送信は人確認。会員・決済を公開AIに入れないでください。" },
        { question: "FitnessXPは必須ですか？", answer: "いいえ。まず予約業務を診断します。" },
        { question: "30日で何が見えますか？", answer: "返信工数とフォロー漏れの前後比較が中心です。" },
        { question: "始め方は？", answer: "匿名化した1週間の予約を bookme へ、または／ai-consulting を確認。" },
      ],
    },
    de: {
      title: "Studio-KI: Kursbuchungen und WhatsApp-Nachfassen nicht verlieren",
      excerpt: "Synthesebeispiel: Studio mit 3–15 Personen klärt Buchung → Erinnerung → No-Show, bevor FitnessXP oder gar kein Kauf folgt.",
      directAnswer:
        "Hongkonger Fitness- und Yoga-/Pilates-Studios (etwa 3–15 Personen) verlieren Buchungen oft in WhatsApp und verpassen No-Show-Nachfassen. Synthese: In 30 Tagen nur Bestätigung → Erinnerung → Nachfassen, mit menschlicher Freigabe und ohne Mitgliedsdaten in öffentlicher KI. Beispielhafte Antwortzeit sank von etwa 1,5–2,5 Stunden/Tag auf etwa 0,5–1 Stunde (Beispielspanne, keine Kundengarantie). Weiter: Snapshot oder bookme.",
      keyTakeaways: ["Einen Buchungs-/Erinnerungsablauf wählen.", "Ausgehende Nachrichten prüfen; Mitgliedschaft und Zahlung begrenzen.", "FitnessXP ist optional nach Klarheit—kein Diagnosversprechen."],
      sections: [
        section("Problem: Buchung und Nachfassen reißen ab", "Synthese: WhatsApp-Buchungen, Excel-Anwesenheit, späte No-Shows. Kein gemeinsamer Status. Kein namentliches Kundenzeugnis."),
        section("Was in 30 Tagen lief", "Woche 1 Regeln; Wochen 2–3 Vorlagen mit Freigabe; Woche 4 Stunden und verpasste Nachfassen. FitnessXP später vergleichbar."),
        section("Prüfung, Datengrenze, Ergebnis", "KI entwirft nur; Menschen senden. Zahlungen bleiben außen. Beispiel: Nachfassen-Stunden etwa halbiert bis um zwei Drittel. Weiter Snapshot oder bookme."),
      ],
      limitations: "Stunden und Fehlerraten sind Synthesebereiche, keine veröffentlichten Kundenzahlen oder Garantie. Zweck und Einwilligung prüfen; keine Rechtsberatung.",
      faqs: [
        { question: "Darf ein Studio KI in WhatsApp antworten lassen?", answer: "Entwurf ja; Senden nur nach Prüfung. Keine Mitglieds- oder Zahlungsdaten in öffentliche KI." },
        { question: "Ist FitnessXP Pflicht?", answer: "Nein. Zuerst einen Buchungsablauf diagnostizieren." },
        { question: "Was zeigt sich in 30 Tagen?", answer: "Meist Vorher/Nachher bei Stunden und verpasstem Nachfassen—kein Mitgliedschaftswachstum." },
        { question: "Wie starten?", answer: "Anonymisierte Buchungen einer Woche zu bookme oder Snapshot/Discovery unter /ai-consulting." },
      ],
    },
  }),

  post("education-centre-ai-enrolment-reminders-hong-kong", "workflow-sop", ["workflow", "governance"], ["snapshot", "discovery", "bookme"], {
    "zh-hk": {
      title: "補習／培訓中心 AI：報名同提醒點樣 30 日內執好？",
      excerpt: "合成例子：培訓中心先執報名確認→開課提醒→欠費跟進，再決定要唔要系統。",
      directAnswer:
        "香港補習社或培訓中心（約 5–25 人）常將報名散喺表單、WhatsApp 同 Excel。合成例子：30 日只執「報名確認→開課／補交文件提醒→負責人清單」，對外訊息人審，學生敏感資料唔入公開 AI。例子範圍：行政跟進可由每週約 6–10 小時降至約 2–4 小時。下一步 bookme 或 Snapshot。",
      keyTakeaways: ["先統一報名狀態欄，唔好一開始做全自動收費。", "提醒範本要人審；成績同身份證明設邊界。", "量度漏跟同返工，唔好用『多咗報名』作保證。"],
      sections: [
        section("問題：報名狀態唔清", "合成例子：家長 WhatsApp 查學位，同事各記各嘅，開課前先發現缺文件。唔係具名客戶證言。"),
        section("揀邊條流程、30 日做咩", "只揀報名到開課提醒。建立：待確認、已確認、文件未齊、已開課。第 2–3 週用範本提醒，第 4 週對比漏件同跟進工時。"),
        section("人審、邊界、結果、下一步", "AI 草擬提醒；負責人發送。學生身份證明、成績唔送公開模型。例子：漏件次數明顯下降。之後可 Snapshot 或／ai-consulting。"),
      ],
      limitations: "數字係合成例子範圍。教育場景涉及未成年人資料時要格外小心；本文唔係法律意見。",
      faqs: [
        { question: "培訓中心可用 AI 催交文件嗎？", answer: "可以草擬提醒，但發送要人審，唔好把身份證明餵公開 AI。" },
        { question: "一定要換學務系統？", answer: "唔一定。多數先執狀態同提醒已經夠試 30 日。" },
        { question: "點樣量度？", answer: "記每週漏件宗數同行政跟進工時，前後對比。" },
        { question: "點聯絡？", answer: "bookme 免費 30 分鐘，或睇／ai-consulting。" },
      ],
    },
    "zh-tw": {
      title: "補習／培訓中心 AI：報名與提醒如何在 30 日內理順？",
      excerpt: "合成範例：培訓中心先整理報名確認→開課提醒→補件跟進，再決定是否上系統。",
      directAnswer:
        "香港補習班或培訓中心（約 5–25 人）常把報名散落表單、WhatsApp 與 Excel。合成範例：30 日只整理「報名確認→開課／補件提醒→負責人清單」，對外訊息人審，學生敏感資料不進公開 AI。範例範圍：行政跟進可由每週約 6–10 小時降至約 2–4 小時。下一步 bookme 或 Snapshot。",
      keyTakeaways: ["先統一報名狀態，不要一開始全自動收費。", "提醒需人審；成績與身分證明設邊界。", "量度漏跟與返工，不用『更多報名』作保證。"],
      sections: [
        section("問題：報名狀態不清", "合成範例：家長詢問學位，同事各自記錄，開課前才發現缺件。非具名證言。"),
        section("選擇的流程與 30 日作法", "只做報名到開課提醒。狀態：待確認、已確認、文件未齊、已開課。第 4 週對比漏件與工時。"),
        section("人審、邊界、結果、下一步", "AI 草擬；負責人發送。身分與成績不進公開模型。之後 Snapshot 或／ai-consulting。"),
      ],
      limitations: "數字為合成範例。若涉及未成年人資料須格外謹慎；本文非法律意見。",
      faqs: [
        { question: "培訓中心可用 AI 催交文件嗎？", answer: "可草擬提醒，發送需人審，不要把身分證明餵公開 AI。" },
        { question: "一定要換學務系統嗎？", answer: "不一定。先整理狀態與提醒即可試 30 日。" },
        { question: "如何量度？", answer: "記錄每週漏件數與行政工時並前後對比。" },
        { question: "如何聯絡？", answer: "bookme 免費 30 分鐘，或見／ai-consulting。" },
      ],
    },
    en: {
      title: "Training centre AI: enrolments and reminders in 30 days",
      excerpt: "Composite: a tutoring or training centre fixes enrolment confirm → class reminder → missing-document chase before buying a system.",
      directAnswer:
        "Hong Kong tutoring and training centres (about 5–25 people) often scatter enrolments across forms, WhatsApp and Excel. Composite: in 30 days, fix only enrolment confirm → class/document reminder → owner list, with human review and student-sensitive data kept out of public AI. Illustrative admin follow-up fell from about 6–10 hours/week to about 2–4. Next: bookme or Snapshot.",
      keyTakeaways: ["Unify enrolment status before automating payments.", "Human-review reminders; bound IDs and grades.", "Measure missed documents and rework—not guaranteed extra enrolments."],
      sections: [
        section("Problem: enrolment state is unclear", "Composite: parents ask on WhatsApp, staff keep separate notes, missing documents appear before class. Not a named testimonial."),
        section("Workflow chosen and 30-day run", "Only enrolment to class reminder. States: pending, confirmed, documents due, started. Week 4 compares misses and hours."),
        section("Review, boundary, result, next step", "AI drafts; owners send. IDs and grades stay out of public models. Then Snapshot or /ai-consulting."),
      ],
      limitations: "Figures are composite ranges. Extra care with minors' data; not legal advice.",
      faqs: [
        { question: "Can centres use AI to chase documents?", answer: "Draft reminders yes; human send; do not feed ID documents into public AI." },
        { question: "Must we replace the school system?", answer: "Not for a 30-day pilot—status and reminders often suffice." },
        { question: "What do we measure?", answer: "Weekly missing-document counts and admin hours, before and after." },
        { question: "How to contact?", answer: "bookme for 30 minutes, or /ai-consulting for Snapshot/Discovery." },
      ],
    },
    ja: {
      title: "塾／研修センターのAI：申込とリマインドを30日で整える",
      excerpt: "合成例：申込確認→開講リマインド→不足書類フォローを先に整え、システム購入を後回しにする。",
      directAnswer:
        "香港の塾や研修（約5〜25人）では申込がフォーム、WhatsApp、Excelに散らばりがちです。合成例では30日で確認→リマインド→担当リストだけを整え、送信は人確認、生徒の機微データは公開AI外。管理フォローの例は週6〜10時間から約2〜4時間。次は bookme か Snapshot。",
      keyTakeaways: ["申込ステータスを先に統一する。", "リマインドは人確認。", "漏れと手戻りを測り、申込増を保証しない。"],
      sections: [
        section("課題：申込状態が不明", "合成例。実名証言ではありません。"),
        section("選んだ業務と30日", "申込から開講リマインドのみ。4週目で比較。"),
        section("確認・境界・次", "AIは下書き。次は Snapshot または／ai-consulting。"),
      ],
      limitations: "数値は合成例。未成年者データには特に注意。法律助言ではありません。",
      faqs: [
        { question: "書類催促にAIは使えますか？", answer: "下書き可、送信は人確認。身分証を公開AIに入れない。" },
        { question: "学務システム必須？", answer: "30日試行では不要なことが多い。" },
        { question: "何を測る？", answer: "不足書類件数と管理工数。" },
        { question: "連絡方法は？", answer: "bookme または／ai-consulting。" },
      ],
    },
    de: {
      title: "Bildungszentrum-KI: Anmeldung und Erinnerungen in 30 Tagen",
      excerpt: "Synthese: Anmeldung bestätigen → Kurserinnerung → fehlende Unterlagen nachfassen, bevor Software gekauft wird.",
      directAnswer:
        "Hongkonger Nachhilfe- und Trainingszentren (etwa 5–25 Personen) verteilen Anmeldungen oft auf Formulare, WhatsApp und Excel. Synthese: In 30 Tagen nur Bestätigung → Erinnerung → Verantwortlichenliste, mit Prüfung und ohne sensible Schülerdaten in öffentlicher KI. Beispielhafte Admin-Nacharbeit sank von etwa 6–10 auf etwa 2–4 Stunden/Woche. Weiter: bookme oder Snapshot.",
      keyTakeaways: ["Anmeldestatus zuerst vereinheitlichen.", "Erinnerungen prüfen; Ausweise und Noten begrenzen.", "Fehlende Unterlagen und Nacharbeit messen—keine Anmeldegarantie."],
      sections: [
        section("Problem: unklarer Anmeldestatus", "Synthese, kein namentliches Zeugnis."),
        section("Gewählter Ablauf und 30 Tage", "Nur Anmeldung bis Kurserinnerung; Woche 4 vergleicht."),
        section("Prüfung, Grenze, nächster Schritt", "KI entwirft; Snapshot oder /ai-consulting danach."),
      ],
      limitations: "Zahlen sind Synthesebereiche. Besondere Vorsicht bei Minderjährigen; keine Rechtsberatung.",
      faqs: [
        { question: "Darf KI Unterlagen anmahnen?", answer: "Entwurf ja; Senden nach Prüfung; keine Ausweise in öffentliche KI." },
        { question: "Muss das Schulsystem ersetzt werden?", answer: "Für einen 30-Tage-Pilot oft nein." },
        { question: "Was messen?", answer: "Wöchentliche Fehlunterlagen und Admin-Stunden." },
        { question: "Kontakt?", answer: "bookme oder /ai-consulting." },
      ],
    },
  }),

  post("association-membership-ai-registration-hong-kong", "crm-events-membership", ["events", "governance"], ["events", "snapshot", "discovery", "bookme"], {
    "zh-hk": {
      title: "商會／協會 AI：會員登記同活動報名點樣唔散？",
      excerpt: "合成例子：會員單位先執登記→課堂／活動報名→通訊名單更新，再考慮 EventXP。",
      directAnswer:
        "香港商會或專業協會（秘書處約 3–12 人）常將會員登記、活動報名同電子報散落表單同 Excel。合成例子：30 日執「新登記確認→活動報名名單→同意後先入通訊清單」，人審對外內容，未同意唔做群發。例子：整理報名名單由每次約 3–5 小時降至約 1–2 小時。EventXP 可選；先 bookme／Snapshot。",
      keyTakeaways: ["先分清會員主檔同單場報名。", "通訊要有同意紀錄；唔好自動全員廣播。", "EventXP 係可選落地，唔係聽診必買。"],
      sections: [
        section("問題：會員同活動名單兩套真相", "合成例子：活動報名用 Google Form，會員費狀態喺另一張表，電子報名單過期。唔係具名客戶。"),
        section("30 日只執一條線", "新登記確認 → 活動報名核對會員狀態 → 更新通訊清單（有同意先）。人審每封活動通知。可對照 EventXP 報名／簽到範圍。"),
        section("結果同下一步", "例子：名單衝突同漏通知下降。下一步 Snapshot、／ai-consulting 或 bookme。"),
      ],
      limitations: "合成例子；同意同保留規則要自行核對適用要求。本文唔係法律意見。",
      faqs: [
        { question: "協會可以用 AI 寫會員通訊嗎？", answer: "可以草擬，但要人審，而且只寄已同意嘅名單。" },
        { question: "一定要 EventXP？", answer: "唔一定。先執登記同報名狀態；EventXP 係之後可選。" },
        { question: "點開始？", answer: "帶一場活動嘅匿名報名表去 bookme。" },
      ],
    },
    "zh-tw": {
      title: "商會／協會 AI：會員登記與活動報名如何不散？",
      excerpt: "合成範例：秘書處先整理登記→活動報名→通訊名單，再考慮 EventXP。",
      directAnswer:
        "香港商會或專業協會（秘書處約 3–12 人）常把會員登記、活動報名與電子報散落表單與 Excel。合成範例：30 日整理「新登記確認→活動報名名單→同意後才入通訊清單」，人審對外內容。範例：整理名單由每次約 3–5 小時降至約 1–2 小時。EventXP 可選；先 bookme／Snapshot。",
      keyTakeaways: ["分開會員主檔與單場報名。", "通訊需同意紀錄。", "EventXP 是可選落地。"],
      sections: [
        section("問題：兩套名單", "合成範例，非具名證言。"),
        section("30 日作法", "登記確認、報名核對、同意後更新通訊；可對照 EventXP。"),
        section("結果與下一步", "名單衝突下降；下一步 Snapshot 或 bookme。"),
      ],
      limitations: "合成範例；同意與保存須自行核對。非法律意見。",
      faqs: [
        { question: "可用 AI 寫會員通訊嗎？", answer: "可草擬，需人審，且只寄已同意名單。" },
        { question: "一定要 EventXP 嗎？", answer: "不一定。" },
        { question: "如何開始？", answer: "帶一場匿名報名表到 bookme。" },
      ],
    },
    en: {
      title: "Association AI: keep membership registration and event sign-up together",
      excerpt: "Composite: a secretariat fixes registration → event sign-up → newsletter list before considering EventXP.",
      directAnswer:
        "Hong Kong associations (secretariat about 3–12 people) often split membership registration, event sign-up and newsletters across forms and Excel. Composite: in 30 days, confirm new registration → event list → add to mailing only with consent, with human review. Illustrative list prep fell from about 3–5 hours per event to about 1–2. EventXP optional; start bookme/Snapshot.",
      keyTakeaways: ["Separate member master data from single-event sign-ups.", "Mail only with consent records.", "EventXP is optional after clarity."],
      sections: [
        section("Problem: two conflicting lists", "Composite, not a named client."),
        section("30-day line", "Registration confirm, event check against membership, consent-gated mailing; EventXP comparable later."),
        section("Result and next step", "Fewer list clashes; then Snapshot, /ai-consulting or bookme."),
      ],
      limitations: "Composite example; verify consent and retention yourself. Not legal advice.",
      faqs: [
        { question: "Can AI draft member emails?", answer: "Yes, with human review and consent-only lists." },
        { question: "Is EventXP required?", answer: "No—optional after the workflow is clear." },
        { question: "How to start?", answer: "Bring one anonymised event list to bookme." },
      ],
    },
    ja: {
      title: "協会AI：会員登録とイベント申込を散らさない",
      excerpt: "合成例：登録→イベント申込→配信リストを整え、EventXPは後で検討。",
      directAnswer:
        "香港の協会（事務局約3〜12人）では会員登録、イベント申込、メルマガが分散しがちです。合成例では30日で確認→名簿→同意後の配信に限定し、人確認。名簿整理の例は1回3〜5時間から約1〜2時間。EventXPは任意。bookme／Snapshotから。",
      keyTakeaways: ["会員マスタと単発申込を分ける。", "配信は同意前提。", "EventXPは任意。"],
      sections: [
        section("課題：名簿が二つ", "合成例。"),
        section("30日の線", "確認、照合、同意後更新。"),
        section("次の一歩", "Snapshot または bookme。"),
      ],
      limitations: "合成例。同意と保存は自行確認。法律助言ではありません。",
      faqs: [
        { question: "AIで会員メールを書いてよい？", answer: "下書き可、人確認、同意者のみ。" },
        { question: "EventXP必須？", answer: "いいえ。" },
        { question: "始め方は？", answer: "匿名のイベント名簿を bookme へ。" },
      ],
    },
    de: {
      title: "Verbands-KI: Mitgliedschaft und Event-Anmeldung zusammenhalten",
      excerpt: "Synthese: Registrierung → Event-Anmeldung → Newsletter-Liste, bevor EventXP geprüft wird.",
      directAnswer:
        "Hongkonger Verbände (Sekretariat etwa 3–12) trennen oft Registrierung, Event-Anmeldung und Newsletter. Synthese: In 30 Tagen Bestätigung → Eventliste → Versand nur mit Einwilligung, mit Prüfung. Beispielhafte Listenvorbereitung sank von etwa 3–5 auf etwa 1–2 Stunden. EventXP optional; Start bookme/Snapshot.",
      keyTakeaways: ["Mitgliedstamm und Einzel-Anmeldung trennen.", "Nur mit Einwilligung mailen.", "EventXP optional."],
      sections: [
        section("Problem: zwei Listen", "Synthese."),
        section("30-Tage-Linie", "Bestätigen, prüfen, einwilligungsbasiert aktualisieren."),
        section("Nächster Schritt", "Snapshot oder bookme."),
      ],
      limitations: "Synthese; Einwilligung selbst prüfen. Keine Rechtsberatung.",
      faqs: [
        { question: "Darf KI Mitgliedermails entwerfen?", answer: "Ja, mit Prüfung und nur Einwilligungslisten." },
        { question: "Ist EventXP Pflicht?", answer: "Nein." },
        { question: "Start?", answer: "Anonymisierte Eventliste zu bookme." },
      ],
    },
  }),

  post("professional-services-ai-quote-invoice-hong-kong", "workflow-sop", ["crm", "governance"], ["crm", "snapshot", "discovery", "bookme"], {
    "zh-hk": {
      title: "專業服務 AI：報價、發票同合約欄位點樣要人批？",
      excerpt: "合成例子：顧問／代理行先執報價草稿→人批→發票欄位核對，金額對外前必須批准。",
      directAnswer:
        "香港專業服務團隊（約 3–20 人，例如顧問、保險代理後勤、小型事務所）常喺 WhatsApp 改價、Excel 開單。合成例子：30 日只執「報價草稿→負責人批准→發票／合約關鍵欄位核對」，AI 唔可自行對外報價。例子：報價周轉由約 2–4 日中位降至約 1–2 日，欄位錯誤率由約 5–10% 降至約 1–3%（示範範圍）。下一步 bookme／Snapshot；SmartSales 可選。",
      keyTakeaways: ["金額同條款必須人批先可出。", "AI 只填欄位草稿，唔取代專業判斷。", "量度周轉日同錯誤率，唔保證成交。"],
      sections: [
        section("問題：報價版本同責任不清", "合成例子：幾個 Word 版本並行，邊個最新唔清。唔係具名客戶。"),
        section("30 日流程", "統一報價範本欄位；AI 草擬描述；負責人批金額；先出單再記入共享狀態。可對照 SmartSales 跟進範圍。"),
        section("邊界同下一步", "客戶身份證明、完整合約正文唔送公開模型。下一步／ai-consulting 或 bookme。"),
      ],
      limitations: "周轉同錯誤率係合成例子。唔構成法律、審計或合規意見。",
      faqs: [
        { question: "AI 可唔可以自動出報價？", answer: "唔建議自動對外。草稿可以，金額同條款要人批。" },
        { question: "點樣量度？", answer: "由需求齊到報價送出嘅日數，同退回改正次數。" },
        { question: "要 CRM 嗎？", answer: "多人同時跟先考慮；可先共享狀態表試 30 日。" },
        { question: "點開始？", answer: "帶兩份匿名報價去 bookme。" },
      ],
    },
    "zh-tw": {
      title: "專業服務 AI：報價、發票與合約欄位如何人批？",
      excerpt: "合成範例：先整理報價草稿→人批→發票欄位核對，金額對外前必須批准。",
      directAnswer:
        "香港專業服務團隊（約 3–20 人）常在 WhatsApp 改價、Excel 開單。合成範例：30 日只整理「報價草稿→負責人批准→發票／合約關鍵欄位核對」，AI 不可自行對外報價。範例：報價周轉由約 2–4 日中位降至約 1–2 日，欄位錯誤率由約 5–10% 降至約 1–3%。下一步 bookme／Snapshot；SmartSales 可選。",
      keyTakeaways: ["金額與條款必須人批。", "AI 只做欄位草稿。", "量度周轉與錯誤率，不保證成交。"],
      sections: [
        section("問題：版本與責任不清", "合成範例。"),
        section("30 日流程", "統一範本、人批金額、共享狀態；可對照 SmartSales。"),
        section("邊界與下一步", "完整合約與身分資料不進公開模型；bookme 或／ai-consulting。"),
      ],
      limitations: "合成範例；非法律或合規意見。",
      faqs: [
        { question: "AI 可以自動出報價嗎？", answer: "不建議自動對外；需人批。" },
        { question: "如何量度？", answer: "周轉日數與退回改正次數。" },
        { question: "一定要 CRM 嗎？", answer: "多人同時跟進再考慮。" },
        { question: "如何開始？", answer: "帶兩份匿名報價到 bookme。" },
      ],
    },
    en: {
      title: "Professional services AI: quotes, invoices and contract fields with human approval",
      excerpt: "Composite: draft quote → human approval → invoice field check; no outbound price without sign-off.",
      directAnswer:
        "Hong Kong professional-services teams (about 3–20 people) often renegotiate prices on WhatsApp and invoice from Excel. Composite: in 30 days, only draft quote → owner approval → invoice/contract key-field check; AI never sends prices alone. Illustrative quote turnaround fell from about 2–4 days median to about 1–2; field error rate from about 5–10% to about 1–3%. Next: bookme/Snapshot; SmartSales optional.",
      keyTakeaways: ["Prices and terms need human approval before sending.", "AI drafts fields; it does not replace professional judgement.", "Measure turnaround and error rate—not closed deals."],
      sections: [
        section("Problem: versions without ownership", "Composite, not a named client."),
        section("30-day workflow", "One template; AI drafts descriptions; owner approves amounts; shared status. SmartSales comparable later."),
        section("Boundary and next step", "Keep full contracts and ID packs out of public models. Then /ai-consulting or bookme."),
      ],
      limitations: "Turnaround and error rates are composite. Not legal, audit or compliance advice.",
      faqs: [
        { question: "Can AI send quotes automatically?", answer: "No for outbound prices—draft only, human approve." },
        { question: "What do we measure?", answer: "Days from complete request to sent quote, and correction loops." },
        { question: "Do we need a CRM?", answer: "Consider when several people sell in parallel; a shared status sheet can pilot first." },
        { question: "How to start?", answer: "Bring two anonymised quotes to bookme." },
      ],
    },
    ja: {
      title: "専門サービスAI：見積・請求・契約欄は人の承認必須",
      excerpt: "合成例：見積下書き→承認→請求欄チェック。金額の自動送信はしない。",
      directAnswer:
        "香港の専門サービス（約3〜20人）ではWhatsAppで価格調整、Excelで請求しがちです。合成例では30日で下書き→承認→欄チェックのみ。AIは単独送信しません。周回の例は中央値約2〜4日から約1〜2日、欄誤り約5〜10%から約1〜3%。次は bookme／Snapshot。",
      keyTakeaways: ["金額は人承認。", "AIは下書きのみ。", "成約を保証しない。"],
      sections: [
        section("課題：版と責任", "合成例。"),
        section("30日", "テンプレ、承認、共有状態。"),
        section("次", "bookme または／ai-consulting。"),
      ],
      limitations: "合成例。法律・監査意見ではありません。",
      faqs: [
        { question: "AIが自動で見積送信？", answer: "不可。承認後。" },
        { question: "何を測る？", answer: "所要日数と差し戻し。" },
        { question: "CRM必須？", answer: "並行営業が多いとき検討。" },
        { question: "始め方は？", answer: "匿名見積2件を bookme へ。" },
      ],
    },
    de: {
      title: "Professional-Services-KI: Angebot, Rechnung, Vertragsfelder mit Freigabe",
      excerpt: "Synthese: Angebotsentwurf → Freigabe → Rechnungsfelder; kein Preisversand ohne Freigabe.",
      directAnswer:
        "Hongkonger Professional-Services-Teams (etwa 3–20) ändern Preise oft in WhatsApp und fakturieren aus Excel. Synthese: In 30 Tagen nur Entwurf → Freigabe → Feldprüfung; KI sendet keine Preise allein. Beispielhafte Durchlaufzeit sank von etwa 2–4 auf etwa 1–2 Tage; Feldfehler von etwa 5–10% auf etwa 1–3%. Weiter: bookme/Snapshot; SmartSales optional.",
      keyTakeaways: ["Preise brauchen Freigabe.", "KI entwirft nur.", "Durchlauf und Fehler messen—keine Abschlussgarantie."],
      sections: [
        section("Problem: Versionen ohne Eigentümer", "Synthese."),
        section("30-Tage-Ablauf", "Vorlage, Freigabe, gemeinsamer Status."),
        section("Nächster Schritt", "bookme oder /ai-consulting."),
      ],
      limitations: "Synthese; keine Rechts- oder Compliance-Beratung.",
      faqs: [
        { question: "Darf KI Angebote selbst senden?", answer: "Nein—nur Entwurf mit Freigabe." },
        { question: "Was messen?", answer: "Tage bis Versand und Korrekturschleifen." },
        { question: "CRM nötig?", answer: "Bei parallelem Verkauf prüfen." },
        { question: "Start?", answer: "Zwei anonymisierte Angebote zu bookme." },
      ],
    },
  }),

  post("events-checkin-followup-ai-hong-kong", "crm-events-membership", ["events", "governance"], ["events", "snapshot", "discovery", "bookme"], {
    "zh-hk": {
      title: "活動 AI：簽到之後點樣 48 小時內跟進？",
      excerpt: "合成例子：單場活動由簽到→分段名單→48 小時內跟進訊息，再考慮 EventXP。",
      directAnswer:
        "香港活動團隊（約 3–15 人）常喺場地用紙同 Excel 簽到，翌日先搵到名單。合成例子：30 日（或一場主活動）執「簽到欄位→即場／翌日分段→48 小時內跟進草稿」，人審先送。例子：跟進準備由約 4–6 小時降至約 1–2 小時，漏跟由約 20–30% 降至約 5–10%（示範範圍）。EventXP 可選；bookme／Snapshot 開始。",
      keyTakeaways: ["簽到要有唯一識別同同意標記。", "跟進分段，唔好同一訊息轟全部人。", "量度 48 小時內跟進率，唔保證成交。"],
      sections: [
        section("問題：簽到同跟進斷开", "合成例子：紙本簽到，返辦公室先入表。唔係具名客戶。"),
        section("一場活動試點", "定義必填欄；即場數碼簽到或當日入表；翌日按意向分段；AI 草擬跟進；負責人批核。可對照 EventXP。"),
        section("下一步", "Snapshot 定下次活動擴大；聯絡 bookme 或／ai-consulting。"),
      ],
      limitations: "合成例子；活動名單屬個人資料，用途同保留要自行確認。",
      faqs: [
        { question: "簽到可以用 AI 嗎？", answer: "AI 較適合草擬跟進；簽到先要可靠名單同同意標記。" },
        { question: "要 EventXP 嗎？", answer: "單場可先用表；重複活動先考慮 EventXP。" },
        { question: "點開始？", answer: "帶上一場匿名簽到表去 bookme。" },
      ],
    },
    "zh-tw": {
      title: "活動 AI：簽到之後如何在 48 小時內跟進？",
      excerpt: "合成範例：簽到→分段名單→48 小時內跟進，再考慮 EventXP。",
      directAnswer:
        "香港活動團隊（約 3–15 人）常在現場用紙與 Excel 簽到。合成範例：一場主活動整理「簽到欄位→分段→48 小時內跟進草稿」，人審後才送。範例：跟進準備由約 4–6 小時降至約 1–2 小時，漏跟由約 20–30% 降至約 5–10%。EventXP 可選；bookme／Snapshot 開始。",
      keyTakeaways: ["簽到需唯一識別與同意標記。", "跟進要分段。", "量度 48 小時跟進率。"],
      sections: [
        section("問題：簽到與跟進斷開", "合成範例。"),
        section("單場試點", "數碼或當日入表、分段、人審跟進；可對照 EventXP。"),
        section("下一步", "bookme 或／ai-consulting。"),
      ],
      limitations: "合成範例；名單用途與保存須自行確認。",
      faqs: [
        { question: "簽到能用 AI 嗎？", answer: "AI 較適合草擬跟進；簽到先要可靠名單。" },
        { question: "一定要 EventXP 嗎？", answer: "單場可先用表。" },
        { question: "如何開始？", answer: "帶上一場匿名簽到表到 bookme。" },
      ],
    },
    en: {
      title: "Event AI: follow up within 48 hours after check-in",
      excerpt: "Composite: check-in → segmented list → 48-hour follow-up draft before considering EventXP.",
      directAnswer:
        "Hong Kong event teams (about 3–15 people) often check in on paper and Excel, then find the list the next day. Composite: for one main event, fix check-in fields → same-day/next-day segments → 48-hour follow-up drafts with human approval. Illustrative prep fell from about 4–6 hours to about 1–2; missed follow-up from about 20–30% to about 5–10%. EventXP optional; start bookme/Snapshot.",
      keyTakeaways: ["Check-in needs a stable ID and consent marker.", "Segment follow-ups—do not blast one message to all.", "Measure 48-hour follow-up rate—not deals closed."],
      sections: [
        section("Problem: check-in and follow-up disconnect", "Composite, not a named client."),
        section("One-event pilot", "Required fields; digital or same-day entry; segment by intent; AI drafts; owner approves. EventXP comparable later."),
        section("Next step", "Snapshot before scaling; contact bookme or /ai-consulting."),
      ],
      limitations: "Composite; event lists are personal data—confirm purpose and retention yourself.",
      faqs: [
        { question: "Can AI run check-in?", answer: "AI fits follow-up drafts better; check-in needs a reliable list first." },
        { question: "Is EventXP required?", answer: "A single event can start on a sheet; repeat events may justify EventXP." },
        { question: "How to start?", answer: "Bring one anonymised check-in sheet to bookme." },
      ],
    },
    ja: {
      title: "イベントAI：受付後48時間以内にフォローする",
      excerpt: "合成例：受付→セグメント→48時間フォロー。EventXPは後で検討。",
      directAnswer:
        "香港のイベントチーム（約3〜15人）は紙とExcel受付が多く、翌日に名簿が揃います。合成例では受付項目→区分→48時間フォロー下書きを人確認。準備の例は約4〜6時間から約1〜2時間、フォロー漏れ約20〜30%から約5〜10%。EventXP任意。bookme／Snapshotから。",
      keyTakeaways: ["受付に安定IDと同意印。", "一斉送信しない。", "48時間フォロー率を測る。"],
      sections: [
        section("課題：受付とフォロー分断", "合成例。"),
        section("1イベント試行", "当日入力、区分、人確認。"),
        section("次", "bookme または／ai-consulting。"),
      ],
      limitations: "合成例。名簿の目的と保存は自行確認。",
      faqs: [
        { question: "受付をAIに？", answer: "フォロー下書き向き。受付はまず正確な名簿。" },
        { question: "EventXP必須？", answer: "単発は表でも可。" },
        { question: "始め方は？", answer: "匿名受付表を bookme へ。" },
      ],
    },
    de: {
      title: "Event-KI: Nachfassen innerhalb von 48 Stunden nach Check-in",
      excerpt: "Synthese: Check-in → Segmentierung → 48-Stunden-Follow-up, bevor EventXP geprüft wird.",
      directAnswer:
        "Hongkonger Event-Teams (etwa 3–15) checken oft auf Papier und Excel ein und finden die Liste erst am Folgetag. Synthese: Für ein Hauptevent Check-in-Felder → Segmente → 48-Stunden-Entwürfe mit Freigabe. Beispielhafte Vorbereitung sank von etwa 4–6 auf etwa 1–2 Stunden; verpasstes Nachfassen von etwa 20–30% auf etwa 5–10%. EventXP optional; Start bookme/Snapshot.",
      keyTakeaways: ["Check-in braucht stabile ID und Einwilligungsmarkierung.", "Follow-ups segmentieren.", "48-Stunden-Rate messen—keine Abschlussgarantie."],
      sections: [
        section("Problem: Check-in und Nachfassen getrennt", "Synthese."),
        section("Ein-Event-Pilot", "Felder, Tageserfassung, Segmente, Freigabe."),
        section("Nächster Schritt", "bookme oder /ai-consulting."),
      ],
      limitations: "Synthese; Zweck und Aufbewahrung selbst prüfen.",
      faqs: [
        { question: "Kann KI den Check-in führen?", answer: "Eher Follow-up-Entwürfe; Check-in braucht zuerst eine zuverlässige Liste." },
        { question: "EventXP Pflicht?", answer: "Einzelevents können mit Tabelle starten." },
        { question: "Start?", answer: "Anonymisierte Check-in-Liste zu bookme." },
      ],
    },
  }),

  post("fnb-retail-enquiry-booking-ai-hong-kong", "workflow-sop", ["workflow", "crm", "governance"], ["snapshot", "discovery", "bookme", "crm"], {
    "zh-hk": {
      title: "餐飲／零售 AI：查詢到訂位／預約點樣少漏？",
      excerpt: "合成例子：小店先執查詢分類→可訂時段回覆→確認記錄，再決定要唔要 CRM。",
      directAnswer:
        "香港餐飲或零售小店（約 3–12 人）常喺 IG、WhatsApp、電話收查詢，訂位靠記憶。合成例子：30 日執「查詢分類→可訂／不可訂範本→確認寫入共享表」，人審優惠同改期。例子：漏訂／重複訂由每週約 3–8 宗降至約 0–2 宗，高峰回覆由約 30–60 分鐘中位降至約 10–20 分鐘（示範範圍）。下一步 bookme／Snapshot。",
      keyTakeaways: ["先分查詢類型，唔好一開始全自動對話。", "檔期同價錢要人確認。", "量度漏訂同回覆時間，唔保證生意額。"],
      sections: [
        section("問題：查詢入口多、狀態冇人睇", "合成例子：三個渠道三套回覆。唔係具名客戶。"),
        section("30 日做法", "定義：問價、訂位、改期、投訴。可訂時段表每日更新；AI 草擬回覆；店長批改期同折扣。"),
        section("邊界同下一步", "付款卡號、完整顧客名單唔入公開 AI。可之後對照 SmartSales；先 bookme 或／ai-consulting。"),
      ],
      limitations: "合成例子；餐飲高峰受季節同人手影響，唔保證同樣數字。",
      faqs: [
        { question: "餐廳可以用 AI 自動回 IG？", answer: "可以草擬，但檔期、人數同優惠要人確認先送。" },
        { question: "要 CRM 嗎？", answer: "渠道多、多人同時回先考慮；可先共享表。" },
        { question: "點開始？", answer: "帶一週匿名查詢截圖去 bookme。" },
      ],
    },
    "zh-tw": {
      title: "餐飲／零售 AI：從詢問到訂位如何少漏？",
      excerpt: "合成範例：先整理詢問分類→可訂時段回覆→確認紀錄，再決定是否上 CRM。",
      directAnswer:
        "香港餐飲或零售小店（約 3–12 人）常在 IG、WhatsApp、電話收詢問。合成範例：30 日整理「詢問分類→可訂／不可訂範本→確認寫入共享表」，人審優惠與改期。範例：漏訂／重複訂由每週約 3–8 宗降至約 0–2 宗，高峰回覆由約 30–60 分鐘中位降至約 10–20 分鐘。下一步 bookme／Snapshot。",
      keyTakeaways: ["先分類詢問。", "檔期與價錢需人確認。", "量度漏訂與回覆時間。"],
      sections: [
        section("問題：多入口、無狀態", "合成範例。"),
        section("30 日作法", "分類、可訂表、人審折扣。"),
        section("下一步", "bookme 或／ai-consulting；之後可對照 SmartSales。"),
      ],
      limitations: "合成範例；受季節與人手影響。",
      faqs: [
        { question: "可用 AI 自動回 IG 嗎？", answer: "可草擬，檔期與優惠需人確認。" },
        { question: "一定要 CRM 嗎？", answer: "多人同時回覆再考慮。" },
        { question: "如何開始？", answer: "帶一週匿名詢問到 bookme。" },
      ],
    },
    en: {
      title: "F&B and retail AI: from enquiry to booking with fewer misses",
      excerpt: "Composite: classify enquiry → available-slot reply → confirmed record before deciding on a CRM.",
      directAnswer:
        "Hong Kong F&B and retail shops (about 3–12 people) take enquiries on IG, WhatsApp and phone, then book from memory. Composite: in 30 days, classify enquiry → available/unavailable templates → write confirmations to a shared sheet, with human review of discounts and changes. Illustrative missed/double bookings fell from about 3–8/week to about 0–2; peak reply median from about 30–60 minutes to about 10–20. Next: bookme/Snapshot.",
      keyTakeaways: ["Classify enquiry types before full chatbots.", "Humans confirm slots and prices.", "Measure missed bookings and reply time—not revenue guarantees."],
      sections: [
        section("Problem: many inboxes, no shared state", "Composite, not a named client."),
        section("30-day method", "Types: price, booking, change, complaint. Daily slot sheet; AI drafts; manager approves discounts."),
        section("Boundary and next step", "No card numbers or full customer dumps in public AI. SmartSales later if needed; start bookme or /ai-consulting."),
      ],
      limitations: "Composite; seasonality and staffing affect peaks—no identical-number guarantee.",
      faqs: [
        { question: "Can restaurants auto-reply on IG with AI?", answer: "Draft yes; confirm slots, party size and offers before sending." },
        { question: "Do we need a CRM?", answer: "When many channels and people reply in parallel; a shared sheet can pilot first." },
        { question: "How to start?", answer: "Bring one week of anonymised enquiries to bookme." },
      ],
    },
    ja: {
      title: "飲食／小売AI：問い合わせから予約の漏れを減らす",
      excerpt: "合成例：分類→空き枠返信→確認記録。CRMは後で判断。",
      directAnswer:
        "香港の飲食・小売（約3〜12人）はIG、WhatsApp、電話で問い合わせを受け、記憶で予約しがちです。合成例では30日で分類→可否テンプレ→共有表への確定、割引は人確認。漏れ／重複の例は週約3〜8件から約0〜2件、繁忙時返信中央値約30〜60分から約10〜20分。次は bookme／Snapshot。",
      keyTakeaways: ["まず分類。", "枠と価格は人確認。", "売上を保証しない。"],
      sections: [
        section("課題：入口が多く状態がない", "合成例。"),
        section("30日", "分類、枠表、承認。"),
        section("次", "bookme または／ai-consulting。"),
      ],
      limitations: "合成例。繁忙は季節と人員に左右されます。",
      faqs: [
        { question: "IG自動返信は？", answer: "下書き可、枠と特典は人確認。" },
        { question: "CRM必須？", answer: "並行返信が多いとき。" },
        { question: "始め方は？", answer: "匿名の1週間問い合わせを bookme へ。" },
      ],
    },
    de: {
      title: "Gastro-/Retail-KI: von Anfrage zu Buchung mit weniger Verlust",
      excerpt: "Synthese: Anfrage klassifizieren → freie-Slot-Antwort → Bestätigung, bevor ein CRM entschieden wird.",
      directAnswer:
        "Hongkonger Gastro- und Retail-Shops (etwa 3–12) nehmen Anfragen über IG, WhatsApp und Telefon an und buchen aus dem Gedächtnis. Synthese: In 30 Tagen klassifizieren → verfügbar/nicht verfügbar → Bestätigung in gemeinsamer Tabelle, mit Freigabe von Rabatten. Beispielhafte verpasste/doppelte Buchungen sanken von etwa 3–8/Woche auf etwa 0–2; Antwort-Median in Spitzen von etwa 30–60 auf etwa 10–20 Minuten. Weiter: bookme/Snapshot.",
      keyTakeaways: ["Anfragen zuerst klassifizieren.", "Slots und Preise menschlich bestätigen.", "Verpasste Buchungen und Antwortzeit messen—keine Umsatzgarantie."],
      sections: [
        section("Problem: viele Eingänge, kein Status", "Synthese."),
        section("30-Tage-Methode", "Typen, Slot-Tabelle, Freigabe."),
        section("Nächster Schritt", "bookme oder /ai-consulting."),
      ],
      limitations: "Synthese; Saison und Personal beeinflussen Spitzen.",
      faqs: [
        { question: "Darf KI auf IG automatisch antworten?", answer: "Entwurf ja; Slots und Angebote erst nach Prüfung senden." },
        { question: "CRM nötig?", answer: "Bei vielen parallelen Antworten prüfen." },
        { question: "Start?", answer: "Anonymisierte Anfragen einer Woche zu bookme." },
      ],
    },
  }),
];
