import type { AppLocale } from "@/lib/i18n-routing";
import type { CaseStudyContent, SpeakingRecord } from "@/types/marketing";

export const caseStudies: CaseStudyContent[] = [
  {
    slug: "agilizing-training-materials",
    title: "Agilizing Limited: training materials from 10 days to 3 hours",
    summary:
      "Training packs — slides plus AI digital-human clips — went from 10 days to 3 hours. The client owner confirmed this for January–February 2026.",
    context:
      "Agilizing Limited produces corporate training materials. The goal was faster delivery of each pack, not a new classroom product.",
    proofType: "implementation",
    audience: "Training centres that repeat slide decks and short explainer videos.",
    challenge: [
      "Each pack needed slides and an AI digital-human clip.",
      "Production took about 10 days.",
      "Slow output limited how quickly new material could go out.",
    ],
    approach: [
      "Map the existing production steps.",
      "Use AI where it shortens repeat work, with a person still checking the result.",
      "Keep the measured change to the production time the owner confirmed.",
    ],
    deliverables: [
      "A tighter production path for slides and AI digital-human clips.",
      "The same kind of training pack, delivered on the shorter cycle.",
    ],
    outcomes: [
      "Production time: 10 days to 3 hours.",
      "Confirmed by the client owner for January–February 2026.",
    ],
    proofLinks: [{ label: "Agilizing public site", href: "https://agilizing.com" }],
    proofNote: "The time change is the owner's confirmation. This page does not add a savings figure the introduction deck does not state.",
    relatedLinks: [{ label: "AI consulting", href: "/ai-consulting" }],
  },
  {
    slug: "zomate-class-membership-whatsapp",
    title: "ZOmate Limited: classes, membership, and WhatsApp reminders",
    summary:
      "The system connects class booking, membership, and WhatsApp service reminders for ZOMATE FITNESS. Measured results are still waiting on the client.",
    context:
      "ZOMATE FITNESS runs coached classes and memberships. Staff needed booking, membership, and service notices in one place.",
    proofType: "implementation",
    audience: "Fitness studios that book classes, track membership, and message members on WhatsApp.",
    challenge: [
      "Class booking, membership, and service notices were separate.",
      "Reminders had to reach members without a second manual chase.",
    ],
    approach: [
      "Cover booking and membership in the system.",
      "Send WhatsApp reminders for the service schedule.",
    ],
    deliverables: [
      "Class booking and membership in one system.",
      "WhatsApp reminders for bookings and the service schedule.",
    ],
    outcomes: [
      "The system can send service reminders.",
      "No performance number is published until the client confirms it.",
    ],
    proofLinks: [{ label: "ZOMATE FITNESS public site", href: "https://zoesportdiary.com/" }],
    proofNote: "The public site identifies the fitness brand. Results beyond the reminder workflow are not confirmed.",
    relatedLinks: [{ label: "FitnessXP", href: "/fitnessxp" }],
  },
  {
    slug: "flower-nice-day-shop-and-kiosk-map",
    title: "Flower Nice Day: shop catalogue and flower-kiosk map",
    summary:
      "The shop shows bouquets, and the existing public map shows where the flower vending machines are. Delivery of those functions is confirmed. Sales or conversion figures are not.",
    context:
      "Flower Nice Day 販賣美好 needed a clear product list and a way for customers to find a physical vending machine.",
    proofType: "implementation",
    audience: "Retail brands that sell online and also point customers to a physical machine or counter.",
    challenge: [
      "Customers needed to see products and prices in one shop.",
      "They also needed the current flower-kiosk locations.",
    ],
    approach: [
      "Revise the shop so products are the first thing on the page.",
      "Present the brand's existing public kiosk map, which Flower Nice Day keeps up to date.",
    ],
    deliverables: [
      "Revised online shop for the product list.",
      "The public flower-kiosk location map on the brand's site.",
    ],
    outcomes: [
      "A visitor can browse products, then open the map to find a machine.",
      "Those functions are confirmed. No sales or conversion rate is claimed.",
    ],
    proofLinks: [
      { label: "Flower Nice Day shop", href: "https://www.flowerniceday.com" },
      { label: "Flower kiosk map", href: "https://www.flowerniceday.com/pages/flower-kiosk" },
    ],
    proofNote: "Function delivery is confirmed. The introduction deck states there is no sales or conversion figure.",
    relatedLinks: [{ label: "AI consulting", href: "/ai-consulting" }],
  },
];

export const speakingRecords: SpeakingRecord[] = [
  {
    date: "2025-04-26",
    event: "GDG Hong Kong 2025 Flutter Study Group #1",
    role: "Host with Lydia So",
    topic: "Flutter Fundamentals & UI Building",
  },
  {
    date: "2025-05-24",
    event: "GDG Hong Kong 2025 Flutter Study Group #2",
    role: "Speaker with Keith Chong",
    topic: "State Management Basics",
  },
  {
    date: "2025-06-21",
    event: "GDG Hong Kong 2025 Flutter Study Group #3",
    role: "Speaker",
    topic: "State management with Gemini / Vertex AI",
  },
  {
    date: "2025-06-21",
    event: "PISM Sharing — ISC2 HK Chapter × PISA",
    role: "Speaker",
    topic: "Hands-on with Gemini 2.5 Pro",
  },
  {
    date: "2025-06-24",
    event: "GDG Hong Kong Gen AI Study Jam #2",
    role: "Project showcase",
    topic: "Flutter and AI image-generation project (not the main talk)",
  },
  {
    date: "2025-10-11",
    event: "GDG Hong Kong",
    role: "Speaker",
    topic: "Accelerating Development and Teamwork with Vibe Coding",
  },
  {
    date: "2025-11-15",
    event: "DevFest Hong Kong 2025",
    role: "Speaker",
    topic: "The AI Blueprint: Making Software Faster with SDD, RUP, and Vibe Coding",
  },
];

const speakingRecordsZh: SpeakingRecord[] = [
  { ...speakingRecords[0], role: "主持（與 Lydia So）", topic: "Flutter 基礎與介面建構" },
  { ...speakingRecords[1], role: "講者（與 Keith Chong）", topic: "狀態管理基礎" },
  { ...speakingRecords[2], role: "講者", topic: "結合 Gemini / Vertex AI 的狀態管理" },
  { ...speakingRecords[3], role: "講者", topic: "Gemini 2.5 Pro 實作" },
  { ...speakingRecords[4], role: "項目展示（非主講）", topic: "Flutter + AI 圖像生成個人項目" },
  { ...speakingRecords[5], role: "講者", topic: "用 Vibe Coding 加快開發與團隊協作" },
  { ...speakingRecords[6], role: "講者", topic: "AI Blueprint：用 SDD、RUP 與 Vibe Coding 加快軟件交付" },
];

export function getCaseStudy(slug: string): CaseStudyContent | undefined {
  return caseStudies.find((item) => item.slug === slug);
}

const caseStudiesZhTw: CaseStudyContent[] = [
  {
    ...caseStudies[0],
    title: "Agilizing Limited：教材製作由 10 日縮短至 3 小時",
    summary: "培訓教材包括投影片同 AI 數字人短片，製作時間由 10 日縮到 3 小時。2026 年 1–2 月由客戶業主確認。",
    context: "Agilizing Limited 做企業培訓教材。目標係加快每一套教材交付，而唔係開一門新課。",
    audience: "重複製作投影片同短講解片嘅培訓中心。",
    challenge: ["每套教材要有投影片同 AI 數字人短片。", "原本大約 10 日先出一套。", "出得慢，新教材就趕唔切。"],
    approach: ["先整理原有製作步驟。", "重複工作先用 AI 縮短，結果仍由人檢查。", "公開數字只保留業主確認嘅製作時間。"],
    deliverables: ["投影片同 AI 數字人短片嘅製作流程。", "同一類教材，以較短週期交付。"],
    outcomes: ["製作時間：10 日 → 3 小時。", "2026 年 1–2 月，客戶業主確認。"],
    proofNote: "時間變化係業主確認。呢頁唔加簡報冇寫嘅慳錢數字。",
  },
  {
    ...caseStudies[1],
    title: "ZOmate Limited：課堂、會籍與 WhatsApp 提醒",
    summary: "系統涵蓋 ZOMATE FITNESS 嘅課堂預約、會籍同 WhatsApp 服務提醒。實際成效未有客戶確認，所以唔報數字。",
    context: "ZOMATE FITNESS 提供健身同會籍服務。課堂預約、會籍同服務通知要接埋一齊。",
    audience: "要排課堂、跟會籍，並用 WhatsApp 通知會員嘅健身室。",
    challenge: ["預約、會籍同服務通知原本分開。", "提醒唔應該再靠人手追一次。"],
    approach: ["系統涵蓋預約同會籍。", "用 WhatsApp 發服務時間提醒。"],
    deliverables: ["課堂預約同會籍放喺同一個系統。", "預約同服務安排嘅 WhatsApp 提醒。"],
    outcomes: ["系統可以發服務提醒。", "未有客戶確認嘅成效數字，唔喺呢頁公布。"],
    proofNote: "公開網站對得上呢個健身品牌。提醒流程以外嘅成效未經客戶確認。",
  },
  {
    ...caseStudies[2],
    title: "Flower Nice Day 販賣美好：網店商品同販賣機地圖",
    summary: "網店展示花束商品，品牌現有嘅公開地圖顯示鮮花販賣機位置。功能交付已確認。未有銷售或轉換率數據。",
    context: "顧客要睇到商品，亦要搵到實體鮮花販賣機。",
    audience: "網上賣貨，同時要帶顧客去實體機或櫃檯嘅零售品牌。",
    challenge: ["商品同價錢要喺網店一眼睇到。", "顧客要知道而家邊度有販賣機。"],
    approach: ["改版網店，商品列表放前面。", "呈現 Flower Nice Day 自己更新嘅販賣機位置地圖。"],
    deliverables: ["改版後嘅商品網店。", "品牌網站上嘅鮮花販賣機位置地圖。"],
    outcomes: ["顧客可以先睇商品，再開地圖搵購買位置。", "呢兩項功能已確認。唔報銷售或轉換率。"],
    proofNote: "功能交付已確認。簡報寫明未有銷售或轉換率數據。",
  },
];

const caseStudiesJa: CaseStudyContent[] = [
  {
    ...caseStudies[0],
    title: "Agilizing Limited：教材制作を10日から3時間へ",
    summary: "研修教材はスライドと AI デジタルヒューマン動画です。制作時間は10日から3時間になりました。2026年1–2月に顧客オーナーが確認しています。",
    context: "Agilizing Limited は企業研修の教材を作ります。目的は各教材の納品を速くすることです。",
    audience: "スライドと短い解説動画を繰り返し作る研修センター。",
    challenge: ["各教材にスライドと AI デジタルヒューマン動画が必要。", "以前は約10日かかっていた。", "遅いと新しい教材が間に合わない。"],
    approach: ["既存の制作手順を整理。", "繰り返し作業に AI を使い、結果は人が確認。", "公開する数字はオーナーが確認した制作時間だけ。"],
    deliverables: ["スライドと AI 動画の制作手順。", "同じ種類の教材を短い周期で納品。"],
    outcomes: ["制作時間：10日 → 3時間。", "2026年1–2月、顧客オーナー確認。"],
    proofNote: "時間の変化はオーナー確認です。紹介資料にない節約額は書きません。",
  },
  {
    ...caseStudies[1],
    title: "ZOmate Limited：授業、会員、WhatsApp リマインダー",
    summary: "ZOMATE FITNESS の授業予約、会員、WhatsApp のサービス通知をつなぎます。効果の数字は顧客確認前のため掲載しません。",
    context: "ZOMATE FITNESS はフィットネスと会員サービスを提供しています。予約、会員、通知を一つにまとめる必要がありました。",
    audience: "授業予約、会員管理、WhatsApp 通知が必要なフィットネスクラブ。",
    challenge: ["予約、会員、通知が別々だった。", "リマインダーを手作業でもう一度追いたくない。"],
    approach: ["システムで予約と会員を扱う。", "WhatsApp でサービス予定を通知する。"],
    deliverables: ["授業予約と会員を一つのシステムに。", "予約とサービス予定の WhatsApp 通知。"],
    outcomes: ["サービス通知を送れる。", "顧客未確認の効果数字は掲載しない。"],
    proofNote: "公開サイトはフィットネスのブランドと一致します。通知以外の効果は未確認です。",
  },
  {
    ...caseStudies[2],
    title: "Flower Nice Day：店舗と自動販売機の地図",
    summary: "店舗で花束を見せ、既存の公開地図で生花自動販売機の場所を示します。機能の納品は確認済みです。売上や転換率のデータはありません。",
    context: "顧客は商品と、実店舗の自動販売機の場所の両方が必要でした。",
    audience: "オンラインで売り、実機やカウンターへ案内する小売ブランド。",
    challenge: ["商品と価格を店舗で一目で見せる。", "今どこに自動販売機があるかを示す。"],
    approach: ["店舗を改修し、商品一覧を前に出す。", "Flower Nice Day が更新する既存の公開地図を載せる。"],
    deliverables: ["改修した商品店舗。", "ブランドサイト上の自動販売機マップ。"],
    outcomes: ["商品を見てから、地図で購入場所を探せる。", "この機能は確認済み。売上や転換率は主張しない。"],
    proofNote: "機能納品は確認済みです。紹介資料に売上・転換率はないとあります。",
  },
];

const caseStudiesDe: CaseStudyContent[] = [
  {
    ...caseStudies[0],
    title: "Agilizing Limited: Schulungsmaterial von 10 Tagen auf 3 Stunden",
    summary: "Die Pakete bestehen aus Folien und KI-Clips mit einer digitalen Person. Die Produktion sank von 10 Tagen auf 3 Stunden. Der Inhaber hat das für Januar–Februar 2026 bestätigt.",
    context: "Agilizing Limited erstellt Schulungsmaterial für Unternehmen. Ziel war schnellere Lieferung, kein neues Kursprodukt.",
    audience: "Trainingszentren, die Folien und kurze Erklärclips wiederholt produzieren.",
    challenge: ["Jedes Paket braucht Folien und einen KI-Clip.", "Die Produktion dauerte etwa 10 Tage.", "Neue Materialien kamen zu spät."],
    approach: ["Die bestehenden Schritte aufnehmen.", "Wiederholungen mit KI kürzen, das Ergebnis prüft ein Mensch.", "Öffentlich bleibt nur die vom Inhaber bestätigte Zeit."],
    deliverables: ["Ein kürzerer Produktionsweg für Folien und KI-Clips.", "Dieselbe Art Paket im kürzeren Takt."],
    outcomes: ["Produktionszeit: 10 Tage auf 3 Stunden.", "Bestätigt vom Inhaber für Januar–Februar 2026."],
    proofNote: "Die Zeitänderung ist die Bestätigung des Inhabers. Eine Ersparnis, die nicht in der Einführung steht, wird hier nicht ergänzt.",
  },
  {
    ...caseStudies[1],
    title: "ZOmate Limited: Kurse, Mitgliedschaft und WhatsApp-Erinnerungen",
    summary: "Das System verbindet Kursbuchung, Mitgliedschaft und WhatsApp-Erinnerungen für ZOMATE FITNESS. Kennzahlen warten auf die Bestätigung des Kunden.",
    context: "ZOMATE FITNESS bietet Training und Mitgliedschaften. Buchung, Mitgliedschaft und Hinweise sollten zusammenliegen.",
    audience: "Studios, die Kurse planen, Mitgliedschaften führen und über WhatsApp schreiben.",
    challenge: ["Buchung, Mitgliedschaft und Hinweise lagen getrennt.", "Erinnerungen sollten nicht noch einmal von Hand nachgefasst werden."],
    approach: ["Buchung und Mitgliedschaft im System führen.", "WhatsApp-Erinnerungen zum Serviceplan senden."],
    deliverables: ["Kursbuchung und Mitgliedschaft in einem System.", "WhatsApp-Erinnerungen zu Buchung und Serviceplan."],
    outcomes: ["Das System kann Service-Erinnerungen senden.", "Unbestätigte Kennzahlen werden nicht veröffentlicht."],
    proofNote: "Die öffentliche Website gehört zur Fitnessmarke. Ergebnisse jenseits der Erinnerungen sind nicht bestätigt.",
  },
  {
    ...caseStudies[2],
    title: "Flower Nice Day: Shop und Karte der Blumenautomaten",
    summary: "Der Shop zeigt Sträuße, die bestehende öffentliche Karte die Automaten. Die Funktionen sind geliefert. Verkaufs- oder Conversion-Zahlen gibt es nicht.",
    context: "Kundinnen und Kunden brauchten Produkte und den Standort eines Automaten.",
    audience: "Marken, die online verkaufen und zu einem Automaten oder Tresen führen.",
    challenge: ["Produkte und Preise müssen im Shop sichtbar sein.", "Die aktuellen Automatenstandorte müssen auffindbar sein."],
    approach: ["Den Shop so überarbeiten, dass die Produktliste vorn steht.", "Die bestehende öffentliche Karte zeigen, die Flower Nice Day pflegt."],
    deliverables: ["Überarbeiteter Shop mit Produktliste.", "Karte der Blumenautomaten auf der Markenwebsite."],
    outcomes: ["Besucher sehen Produkte und öffnen dann die Karte.", "Diese Funktionen sind bestätigt. Keine Verkaufs- oder Conversion-Rate."],
    proofNote: "Die Lieferung der Funktionen ist bestätigt. Die Einführung nennt keine Verkaufs- oder Conversion-Zahl.",
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

export function getSpeakingRecords(locale: AppLocale): SpeakingRecord[] {
  return locale === "zh-hk" || locale === "zh-tw" ? speakingRecordsZh : speakingRecords;
}
