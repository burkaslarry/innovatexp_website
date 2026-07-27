import type { AppLocale } from "@/lib/i18n-routing";

type UiStrings = {
  notFound: {
    title: string;
    heading: string;
    body: string;
    home: string;
    contact: string;
    book: string;
    aiConsulting: string;
    blog: string;
    reportLink: string;
    reportPrefix: string;
  };
  whatsappPrefill: string;
  mobileBar: {
    book: string;
    whatsapp: string;
    questionnaire: string;
    cart: string;
    more: string;
    closeMore: string;
    cartAria: (count: number) => string;
  };
  desktopCta: {
    book: string;
  };
  cart: {
    emptyAria: string;
    coachmark: string;
    emptyHint: string;
  };
  inquiry: {
    addLabel: string;
  };
  bookme: {
    showDetails: string;
    hideDetails: string;
  };
  nav: {
    upgrade: string;
    products: string;
    sprint: string;
    programs: string;
    advisory: string;
    useCases: string;
    about: string;
    contact: string;
  };
  programsSection: {
    pricingLink: string;
    durationLabels: [string, string, string];
  };
  productStrip: {
    eyebrow: string;
    title: string;
    eventxp: { title: string; blurb: string; cta: string };
    smartsales: { title: string; blurb: string; cta: string };
    ai: { title: string; blurb: string; cta: string };
  };
  wizardProgress: {
    label: (current: number, total: number) => string;
    phasePath: string;
    phaseResult: string;
    phaseBooking: string;
    phaseIdentity: string;
    escapeWhatsApp: string;
    escapeBook: string;
  };
};

const en: UiStrings = {
  notFound: {
    title: "404",
    heading: "Page not found",
    body: "This page does not exist or may have been moved. The rest of the site is working normally.",
    home: "Home",
    contact: "Contact us",
    book: "Book a call",
    aiConsulting: "AI Consulting",
    blog: "Blog",
    reportPrefix: "If you followed a broken link, you can",
    reportLink: "report it to us",
  },
  whatsappPrefill:
    "Hi — I found InnovateXP online and would like to learn how to turn WhatsApp inquiries / event leads into a follow-up pipeline.",
  mobileBar: {
    book: "Book review",
    whatsapp: "WhatsApp",
    questionnaire: "Questionnaire",
    cart: "Inquiry cart",
    more: "More",
    closeMore: "Close menu",
    cartAria: (n) => `Open inquiry cart, ${n} items`,
  },
  desktopCta: {
    book: "Book a 30-minute review",
  },
  cart: {
    emptyAria: "Open inquiry cart",
    coachmark: "You can bundle several packages here and send one inquiry — no payment on the site.",
    emptyHint: "Cart is empty. Tap “Add to inquiry” on any offer card.",
  },
  inquiry: {
    addLabel: "Add to inquiry",
  },
  bookme: {
    showDetails: "Show all booking details",
    hideDetails: "Hide extra details",
  },
  nav: {
    upgrade: "AI Business Upgrade",
    products: "Products",
    sprint: "30-day Sprint",
    programs: "Accelerator Programs",
    advisory: "Advisory",
    useCases: "Use Cases",
    about: "About Founder",
    contact: "Contact",
  },
  programsSection: {
    pricingLink: "Full pricing is in the Sprint / Accelerator section above ↑",
    durationLabels: ["3 months", "6 months", "12 months"],
  },
  productStrip: {
    eyebrow: "Product entry points",
    title: "Try tools or explore advisory — same workflow-first approach",
    eventxp: {
      title: "EventXP",
      blurb: "Event check-in, lead scoring, and follow-up for HK organizers.",
      cta: "Explore EventXP",
    },
    smartsales: {
      title: "SmartSales CRM",
      blurb: "WhatsApp-first CRM with draft-first reply workflows.",
      cta: "Explore SmartSales",
    },
    ai: {
      title: "AI Business Upgrade",
      blurb: "Discovery Sprint and accelerator programs before systems.",
      cta: "View advisory pricing",
    },
  },
  wizardProgress: {
    label: (c, t) => `Step ${c} of ${t}`,
    phasePath: "Diagnosis",
    phaseResult: "Summary",
    phaseBooking: "Pick a slot",
    phaseIdentity: "Your details",
    escapeWhatsApp: "Prefer WhatsApp?",
    escapeBook: "Talk to us instead",
  },
};

const zh: UiStrings = {
  notFound: {
    title: "404",
    heading: "找不到頁面",
    body: "此頁面不存在或已移動。網站其他部分仍可正常瀏覽。",
    home: "返回首頁",
    contact: "聯絡我們",
    book: "預約通話",
    aiConsulting: "AI 商務顧問",
    blog: "Blog",
    reportPrefix: "如你透過失效連結進入，可以",
    reportLink: "通知我們",
  },
  whatsappPrefill:
    "你好！我喺 InnovateXP 網站睇到，想了解點樣將 WhatsApp inquiry / 活動 lead 變成可跟進 pipeline。",
  mobileBar: {
    book: "預約診斷",
    whatsapp: "WhatsApp",
    questionnaire: "填問卷",
    cart: "查詢購物車",
    more: "更多",
    closeMore: "關閉選單",
    cartAria: (n) => `開啟查詢購物車，${n} 項`,
  },
  desktopCta: {
    book: "預約 30 分鐘診斷",
  },
  cart: {
    emptyAria: "開啟查詢購物車",
    coachmark: "可以一次過加入多個方案再提交查詢，網站唔會收款。",
    emptyHint: "購物車係空嘅。喺定價卡撳「加入查詢」開始。",
  },
  inquiry: {
    addLabel: "加入查詢",
  },
  bookme: {
    showDetails: "顯示全部預約須知",
    hideDetails: "收起其他須知",
  },
  nav: {
    upgrade: "AI 商業升級",
    products: "產品入口",
    sprint: "30 日 Sprint",
    programs: "加速計劃",
    advisory: "顧問",
    useCases: "示範場景",
    about: "關於創辦人",
    contact: "聯絡",
  },
  programsSection: {
    pricingLink: "完整價格見上方「Sprint／Accelerator 定價」↑",
    durationLabels: ["3 個月", "6 個月", "12 個月"],
  },
  productStrip: {
    eyebrow: "產品入口",
    title: "試用工具或了解陪跑 — 同樣以流程先行",
    eventxp: {
      title: "EventXP",
      blurb: "活動簽到、名單評分與 follow-up，適合香港活動主辦方。",
      cta: "了解 EventXP",
    },
    smartsales: {
      title: "SmartSales CRM",
      blurb: "WhatsApp 優先 CRM，draft-first 回覆流程。",
      cta: "了解 SmartSales",
    },
    ai: {
      title: "AI 商業升級",
      blurb: "Discovery Sprint 與加速器，先驗證流程再談系統。",
      cta: "睇陪跑定價",
    },
  },
  wizardProgress: {
    label: (c, t) => `第 ${c} 步，共 ${t} 步`,
    phasePath: "診斷問答",
    phaseResult: "摘要",
    phaseBooking: "選時段",
    phaseIdentity: "聯絡資料",
    escapeWhatsApp: "想用 WhatsApp？",
    escapeBook: "直接預約傾",
  },
};

const ja: UiStrings = {
  ...en,
  notFound: {
    ...en.notFound,
    heading: "ページが見つかりません",
    body: "このページは存在しないか、移動した可能性があります。サイトの他の部分は正常に動作しています。",
    home: "ホーム",
    contact: "お問い合わせ",
    book: "通話を予約",
    aiConsulting: "AIコンサルティング",
    blog: "ブログ",
    reportPrefix: "壊れたリンクから来た場合は、",
    reportLink: "ご報告ください",
  },
  whatsappPrefill:
    "InnovateXPのサイトを見ました。WhatsApp問い合わせやイベントリードをフォロー可能なパイプラインにしたいです。",
  mobileBar: {
    book: "レビューを予約",
    whatsapp: "WhatsApp",
    questionnaire: "アンケート",
    cart: "お問い合わせカート",
    more: "その他",
    closeMore: "閉じる",
    cartAria: (n) => `お問い合わせカートを開く（${n}件）`,
  },
  desktopCta: {
    book: "30分レビューを予約",
  },
  cart: {
    emptyAria: "お問い合わせカートを開く",
    coachmark: "複数パッケージをまとめて問い合わせできます。サイト上での決済はありません。",
    emptyHint: "カートは空です。オファーカードの「Add to inquiry」をタップしてください。",
  },
  inquiry: {
    addLabel: "お問い合わせに追加",
  },
  bookme: {
    showDetails: "予約詳細をすべて表示",
    hideDetails: "詳細を隠す",
  },
  nav: {
    upgrade: "AIビジネスアップグレード",
    products: "プロダクト",
    sprint: "30日スプリント",
    programs: "アクセラレーター",
    advisory: "アドバイザリー",
    useCases: "ユースケース",
    about: "創設者について",
    contact: "連絡",
  },
  programsSection: {
    pricingLink: "料金は上の Sprint / Accelerator セクションを参照 ↑",
    durationLabels: ["3ヶ月", "6ヶ月", "12ヶ月"],
  },
  productStrip: {
    eyebrow: "プロダクト入口",
    title: "ツール試用または伴走プログラム — ワークフロー優先",
    eventxp: {
      title: "EventXP",
      blurb: "香港のイベント運営向けチェックインとフォローアップ。",
      cta: "EventXPを見る",
    },
    smartsales: {
      title: "SmartSales CRM",
      blurb: "WhatsApp優先CRM、draft-first返信。",
      cta: "SmartSalesを見る",
    },
    ai: {
      title: "AIビジネスアップグレード",
      blurb: "Discovery Sprintとアクセラレーター。",
      cta: "料金を見る",
    },
  },
  wizardProgress: {
    label: (c, t) => `ステップ ${c}/${t}`,
    phasePath: "診断",
    phaseResult: "サマリー",
    phaseBooking: "日時選択",
    phaseIdentity: "連絡先",
    escapeWhatsApp: "WhatsAppで相談？",
    escapeBook: "直接予約",
  },
};

const de: UiStrings = {
  ...en,
  notFound: {
    ...en.notFound,
    heading: "Seite nicht gefunden",
    body: "Diese Seite existiert nicht oder wurde verschoben. Der Rest der Website funktioniert normal.",
    home: "Startseite",
    contact: "Kontakt",
    book: "Termin buchen",
    aiConsulting: "AI-Beratung",
    blog: "Blog",
    reportPrefix: "Wenn Sie einem defekten Link gefolgt sind, können Sie uns",
    reportLink: "Bescheid geben",
  },
  whatsappPrefill:
    "Hallo — ich habe InnovateXP online gefunden und möchte erfahren, wie WhatsApp-Anfragen / Event-Leads in eine Follow-up-Pipeline werden.",
  mobileBar: {
    book: "Review buchen",
    whatsapp: "WhatsApp",
    questionnaire: "Fragebogen",
    cart: "Anfrage-Warenkorb",
    more: "Mehr",
    closeMore: "Menü schließen",
    cartAria: (n) => `Anfrage-Warenkorb öffnen, ${n} Artikel`,
  },
  desktopCta: {
    book: "30-Minuten-Review buchen",
  },
  cart: {
    emptyAria: "Anfrage-Warenkorb öffnen",
    coachmark: "Mehrere Pakete bündeln und eine Anfrage senden — keine Zahlung auf der Website.",
    emptyHint: "Warenkorb ist leer. „Add to inquiry“ auf einer Angebotskarte tippen.",
  },
  inquiry: {
    addLabel: "Zur Anfrage hinzufügen",
  },
  bookme: {
    showDetails: "Alle Buchungsdetails anzeigen",
    hideDetails: "Details ausblenden",
  },
  nav: {
    upgrade: "AI Business Upgrade",
    products: "Produkte",
    sprint: "30-Tage-Sprint",
    programs: "Accelerator-Programme",
    advisory: "Beratung",
    useCases: "Anwendungsfälle",
    about: "Über den Gründer",
    contact: "Kontakt",
  },
  programsSection: {
    pricingLink: "Preise siehe Sprint / Accelerator oben ↑",
    durationLabels: ["3 Monate", "6 Monate", "12 Monate"],
  },
  productStrip: {
    eyebrow: "Produkt-Einstieg",
    title: "Tools testen oder Advisory — workflow-first",
    eventxp: {
      title: "EventXP",
      blurb: "Check-in und Follow-up für HK-Veranstalter.",
      cta: "EventXP entdecken",
    },
    smartsales: {
      title: "SmartSales CRM",
      blurb: "WhatsApp-first CRM mit Draft-first-Antworten.",
      cta: "SmartSales entdecken",
    },
    ai: {
      title: "AI Business Upgrade",
      blurb: "Discovery Sprint und Accelerator vor Systemen.",
      cta: "Preise ansehen",
    },
  },
  wizardProgress: {
    label: (c, t) => `Schritt ${c} von ${t}`,
    phasePath: "Diagnose",
    phaseResult: "Zusammenfassung",
    phaseBooking: "Termin wählen",
    phaseIdentity: "Kontaktdaten",
    escapeWhatsApp: "Lieber WhatsApp?",
    escapeBook: "Direkt buchen",
  },
};

const map: Record<AppLocale, UiStrings> = {
  en: en,
  "zh-hk": zh,
  "zh-tw": {
    ...zh,
    notFound: { ...zh.notFound, heading: "找不到頁面", blog: "部落格" },
    inquiry: { addLabel: "加入查詢" },
  },
  ja: ja,
  de: de,
};

export function uiStrings(locale: AppLocale): UiStrings {
  return map[locale] ?? en;
}
