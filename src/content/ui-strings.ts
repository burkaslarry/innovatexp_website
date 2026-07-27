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
  mobileBar: {
    book: string;
    whatsapp: string;
    questionnaire: string;
    cart: string;
    cartAria: (count: number) => string;
  };
  nav: {
    upgrade: string;
    sprint: string;
    programs: string;
    advisory: string;
    useCases: string;
    about: string;
    contact: string;
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
  mobileBar: {
    book: "Book review",
    whatsapp: "WhatsApp",
    questionnaire: "Questionnaire",
    cart: "Inquiry cart",
    cartAria: (n) => `Open inquiry cart, ${n} items`,
  },
  nav: {
    upgrade: "AI Business Upgrade",
    sprint: "30-day Sprint",
    programs: "Accelerator Programs",
    advisory: "Advisory",
    useCases: "Use Cases",
    about: "About Founder",
    contact: "Contact",
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
  mobileBar: {
    book: "預約診斷",
    whatsapp: "WhatsApp",
    questionnaire: "填問卷",
    cart: "查詢購物車",
    cartAria: (n) => `開啟查詢購物車，${n} 項`,
  },
  nav: {
    upgrade: "AI 商業升級",
    sprint: "30 日 Sprint",
    programs: "加速計劃",
    advisory: "顧問",
    useCases: "示範場景",
    about: "關於創辦人",
    contact: "聯絡",
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
  mobileBar: {
    book: "レビューを予約",
    whatsapp: "WhatsApp",
    questionnaire: "アンケート",
    cart: "お問い合わせカート",
    cartAria: (n) => `お問い合わせカートを開く（${n}件）`,
  },
  nav: {
    upgrade: "AIビジネスアップグレード",
    sprint: "30日スプリント",
    programs: "アクセラレーター",
    advisory: "アドバイザリー",
    useCases: "ユースケース",
    about: "創設者について",
    contact: "連絡",
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
  mobileBar: {
    book: "Review buchen",
    whatsapp: "WhatsApp",
    questionnaire: "Fragebogen",
    cart: "Anfrage-Warenkorb",
    cartAria: (n) => `Anfrage-Warenkorb öffnen, ${n} Artikel`,
  },
  nav: {
    upgrade: "AI Business Upgrade",
    sprint: "30-Tage-Sprint",
    programs: "Accelerator-Programme",
    advisory: "Beratung",
    useCases: "Anwendungsfälle",
    about: "Über den Gründer",
    contact: "Kontakt",
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
  "zh-tw": { ...zh, notFound: { ...zh.notFound, heading: "找不到頁面", blog: "部落格" } },
  ja: ja,
  de: de,
};

export function uiStrings(locale: AppLocale): UiStrings {
  return map[locale] ?? en;
}
