import type { AppLocale } from "@/lib/i18n-routing";

export type BlogChrome = {
  seriesTitle: string;
  seriesLead: string;
  indexKicker: string;
  archiveTitle: string;
  archiveNote: string;
  directAnswer: string;
  faq: string;
  inThisSeries: string;
  book: string;
  back: string;
  previous: string;
  next: string;
  home: string;
  blog: string;
  part: (n: number, total: number) => string;
};

export const BLOG_CHROME: Record<AppLocale, BlogChrome> = {
  "zh-hk": {
    seriesTitle: "PDPO・跨境資料\n企業私人 AI",
    seriesLead:
      "十篇給香港 3 至 30 人團隊。每篇先答一句，再講可以即刻做嘅步驟。全部只係一般資訊，並非法律意見。",
    indexKicker: "閱讀系列",
    archiveTitle: "較早的英文筆記",
    archiveNote: "CRM、活動同課堂營運。呢幾篇暫以英文刊登。",
    directAnswer: "直接答案",
    faq: "常見問題",
    inThisSeries: "本系列",
    book: "預約 1 小時業務聽診",
    back: "返回系列",
    previous: "上一篇",
    next: "下一篇",
    home: "首頁",
    blog: "Blog",
    part: (n, total) => `${String(n).padStart(2, "0")} / ${String(total).padStart(2, "0")}`,
  },
  "zh-tw": {
    seriesTitle: "PDPO、跨境資料\n企業私人 AI",
    seriesLead:
      "十篇給香港 3 到 30 人的團隊。每篇先答一句，再寫可以立刻做的步驟。全部只是一般資訊，並非法律意見。",
    indexKicker: "閱讀系列",
    archiveTitle: "較早的英文筆記",
    archiveNote: "CRM、活動與課堂營運。這幾篇目前以英文刊登。",
    directAnswer: "直接答案",
    faq: "常見問題",
    inThisSeries: "本系列",
    book: "預約 1 小時業務診斷",
    back: "返回系列",
    previous: "上一篇",
    next: "下一篇",
    home: "首頁",
    blog: "Blog",
    part: (n, total) => `${String(n).padStart(2, "0")} / ${String(total).padStart(2, "0")}`,
  },
  en: {
    seriesTitle: "PDPO, cross-border data,\nand private AI",
    seriesLead:
      "Ten notes for Hong Kong teams of 3 to 30 people. Each one opens with a direct answer, then the steps you can take this week. General information, not legal advice.",
    indexKicker: "A reading series",
    archiveTitle: "Earlier notes",
    archiveNote: "CRM, events, and class operations.",
    directAnswer: "Direct answer",
    faq: "Questions",
    inThisSeries: "In this series",
    book: "Book a 1-hour diagnosis",
    back: "Back to the series",
    previous: "Previous",
    next: "Next",
    home: "Home",
    blog: "Blog",
    part: (n, total) => `${String(n).padStart(2, "0")} / ${String(total).padStart(2, "0")}`,
  },
  ja: {
    seriesTitle: "PDPO・越境データ\n企業プライベートAI",
    seriesLead:
      "香港の3〜30人チーム向け、10本。各本は最初に一文で答え、その週にできる手順を書きます。一般情報であり、法律意見ではありません。",
    indexKicker: "読み物シリーズ",
    archiveTitle: "以前の英語ノート",
    archiveNote: "CRM、イベント、クラス運営。これらは現在英語です。",
    directAnswer: "直接の答え",
    faq: "質問",
    inThisSeries: "このシリーズ",
    book: "1時間の業務診断を予約",
    back: "シリーズに戻る",
    previous: "前へ",
    next: "次へ",
    home: "ホーム",
    blog: "Blog",
    part: (n, total) => `${String(n).padStart(2, "0")} / ${String(total).padStart(2, "0")}`,
  },
  de: {
    seriesTitle: "PDPO, Datentransfer\nund private KI",
    seriesLead:
      "Zehn Beiträge für Hongkonger Teams mit 3 bis 30 Personen. Jeder beginnt mit einer direkten Antwort, danach die Schritte für diese Woche. Allgemeine Information, keine Rechtsberatung.",
    indexKicker: "Eine Lesereihe",
    archiveTitle: "Frühere Notizen",
    archiveNote: "CRM, Events und Kursbetrieb. Diese Texte sind auf Englisch.",
    directAnswer: "Direkte Antwort",
    faq: "Fragen",
    inThisSeries: "In dieser Reihe",
    book: "Einstündige Diagnose buchen",
    back: "Zurück zur Reihe",
    previous: "Zurück",
    next: "Weiter",
    home: "Start",
    blog: "Blog",
    part: (n, total) => `${String(n).padStart(2, "0")} / ${String(total).padStart(2, "0")}`,
  },
};
