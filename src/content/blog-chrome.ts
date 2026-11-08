import type { AppLocale } from "@/lib/i18n-routing";
import type { BlogCategory } from "@/content/blog-types";

export type BlogChrome = {
  indexTitle: string;
  indexLead: string;
  categories: Record<BlogCategory, { title: string; description: string }>;
  browse: string;
  keyTakeaways: string;
  limitations: string;
  sources: string;
  relatedServices: string;
  relatedCases: string;
  relatedArticles: string;
  author: string;
  published: string;
  modified: string;
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
    indexTitle: "先睇清流程，\n再決定點用 AI。",
    indexLead: "畀中小企嘅實用 Insights：由 SOP、資料治理到 CRM、活動同 AI 可見度。先答問題，再講步驟、限制同可核對嘅來源。",
    categories: {
      "workflow-sop": { title: "流程與 SOP", description: "揀第一條自動化、整理交接，同分階段搬走舊表。" },
      "ai-data-governance": { title: "AI 與資料治理", description: "用可量度嘅試點、人工覆核同資料邊界，代替成效承諾。" },
      "crm-events-membership": { title: "CRM、活動與會員", description: "由查詢、出席到續期，講清楚邊個跟、下一步做乜。" },
      "ai-visibility": { title: "AI 可見度", description: "GEO、AEO、SEO 可以做乜、點量度，同邊啲唔可以保證。" },
      "guides-comparisons": { title: "實用指南與比較", description: "比較服務範圍、成本同適配，唔係只比較工具名。" },
    },
    browse: "按主題閱讀", keyTakeaways: "三個重點", limitations: "限制與注意", sources: "來源與參考",
    relatedServices: "相關服務", relatedCases: "相關案例", relatedArticles: "延伸閱讀",
    author: "作者", published: "發布", modified: "更新",
    seriesTitle: "PDPO・跨境資料\n企業私人 AI",
    seriesLead:
      "十五篇給香港 3 至 30 人團隊。每篇先答一句，再講可以即刻做嘅步驟。全部只係一般資訊，並非法律意見。",
    indexKicker: "Insights · 實務筆記",
    archiveTitle: "較早的英文筆記",
    archiveNote: "CRM、活動同課堂營運。呢幾篇暫以英文刊登。",
    directAnswer: "直接答案",
    faq: "常見問題",
    inThisSeries: "本系列",
    book: "預約 30 分鐘業務聽診",
    back: "返回 Insights",
    previous: "上一篇",
    next: "下一篇",
    home: "首頁",
    blog: "Insights",
    part: (n, total) => `${String(n).padStart(2, "0")} / ${String(total).padStart(2, "0")}`,
  },
  "zh-tw": {
    indexTitle: "先看清流程，\n再決定如何用 AI。",
    indexLead: "給中小企業的實用 Insights：從 SOP、資料治理到 CRM、活動與 AI 可見度。先回答問題，再說明步驟、限制與可核對來源。",
    categories: {
      "workflow-sop": { title: "流程與 SOP", description: "選擇第一條自動化、改善交接，並分階段遷移舊表。" },
      "ai-data-governance": { title: "AI 與資料治理", description: "用可量度試點、人工覆核與資料界線，取代成效承諾。" },
      "crm-events-membership": { title: "CRM、活動與會員", description: "從查詢、出席到續期，釐清負責人與下一步。" },
      "ai-visibility": { title: "AI 可見度", description: "GEO、AEO、SEO 的工作、量度方式與不能保證的結果。" },
      "guides-comparisons": { title: "實用指南與比較", description: "比較服務範圍、成本與適配，而不只是工具名稱。" },
    },
    browse: "按主題閱讀", keyTakeaways: "三個重點", limitations: "限制與注意", sources: "來源與參考",
    relatedServices: "相關服務", relatedCases: "相關案例", relatedArticles: "延伸閱讀",
    author: "作者", published: "發布", modified: "更新",
    seriesTitle: "PDPO、跨境資料\n企業私人 AI",
    seriesLead:
      "十五篇給香港 3 到 30 人的團隊。每篇先答一句，再寫可以立刻做的步驟。全部只是一般資訊，並非法律意見。",
    indexKicker: "Insights · 實務筆記",
    archiveTitle: "較早的英文筆記",
    archiveNote: "CRM、活動與課堂營運。這幾篇目前以英文刊登。",
    directAnswer: "直接答案",
    faq: "常見問題",
    inThisSeries: "本系列",
    book: "預約 30 分鐘業務診斷",
    back: "返回 Insights",
    previous: "上一篇",
    next: "下一篇",
    home: "首頁",
    blog: "Insights",
    part: (n, total) => `${String(n).padStart(2, "0")} / ${String(total).padStart(2, "0")}`,
  },
  en: {
    indexTitle: "Understand the workflow.\nThen decide what to change.",
    indexLead: "Practical Insights for SMEs: SOPs, data governance, CRM, events and AI visibility. Direct answers, useful steps, clear limits and sources you can check.",
    categories: {
      "workflow-sop": { title: "Workflow & SOP", description: "Choose a first automation, improve handovers and migrate old spreadsheets in stages." },
      "ai-data-governance": { title: "AI & data governance", description: "Measurable pilots, human review and data boundaries instead of outcome promises." },
      "crm-events-membership": { title: "CRM, events & membership", description: "Connect enquiries, attendance and renewals with an owner and a next action." },
      "ai-visibility": { title: "AI visibility", description: "What GEO, AEO and SEO can improve, what to measure and what cannot be guaranteed." },
      "guides-comparisons": { title: "Practical guides & comparisons", description: "Compare scope, cost and fit rather than software names alone." },
    },
    browse: "Browse by topic", keyTakeaways: "Three key takeaways", limitations: "Limitations", sources: "Sources & references",
    relatedServices: "Related services", relatedCases: "Related cases", relatedArticles: "Further reading",
    author: "By", published: "Published", modified: "Updated",
    seriesTitle: "PDPO, cross-border data,\nand private AI",
    seriesLead:
      "Fifteen notes for Hong Kong teams of 3 to 30 people. Each one opens with a direct answer, then the steps you can take this week. General information, not legal advice.",
    indexKicker: "Insights · field notes",
    archiveTitle: "Earlier notes",
    archiveNote: "CRM, events, and class operations.",
    directAnswer: "Direct answer",
    faq: "Questions",
    inThisSeries: "In this series",
    book: "Book a 30-minute diagnosis",
    back: "Back to Insights",
    previous: "Previous",
    next: "Next",
    home: "Home",
    blog: "Insights",
    part: (n, total) => `${String(n).padStart(2, "0")} / ${String(total).padStart(2, "0")}`,
  },
  ja: {
    indexTitle: "業務を理解してから、\n変えることを決める。",
    indexLead: "中小企業向けの実務Insights。SOP、データ管理、CRM、イベント、AIでの可視性を、答え・手順・限界・出典とともに解説します。",
    categories: {
      "workflow-sop": { title: "業務フロー・SOP", description: "最初の自動化、引き継ぎ改善、旧表の段階的移行。" },
      "ai-data-governance": { title: "AI・データガバナンス", description: "成果の約束より、測れる試行、人の確認、データの境界。" },
      "crm-events-membership": { title: "CRM・イベント・会員", description: "問い合わせ、参加、更新に担当者と次の行動を付ける。" },
      "ai-visibility": { title: "AIでの可視性", description: "GEO・AEO・SEOで改善できること、測定、保証できないこと。" },
      "guides-comparisons": { title: "実践ガイド・比較", description: "製品名だけでなく範囲、費用、適合性を比較する。" },
    },
    browse: "テーマ別に読む", keyTakeaways: "三つの要点", limitations: "限界と注意点", sources: "出典・参考資料",
    relatedServices: "関連サービス", relatedCases: "関連事例", relatedArticles: "あわせて読む",
    author: "著者", published: "公開日", modified: "更新日",
    seriesTitle: "PDPO・越境データ\n企業プライベートAI",
    seriesLead:
      "香港の3〜30人チーム向け、15本。各本は最初に一文で答え、その週にできる手順を書きます。一般情報であり、法律意見ではありません。",
    indexKicker: "Insights · 実務ノート",
    archiveTitle: "以前の英語ノート",
    archiveNote: "CRM、イベント、クラス運営。これらは現在英語です。",
    directAnswer: "直接の答え",
    faq: "質問",
    inThisSeries: "このシリーズ",
    book: "30分の業務診断を予約",
    back: "Insightsに戻る",
    previous: "前へ",
    next: "次へ",
    home: "ホーム",
    blog: "Insights",
    part: (n, total) => `${String(n).padStart(2, "0")} / ${String(total).padStart(2, "0")}`,
  },
  de: {
    indexTitle: "Den Ablauf verstehen.\nDann Veränderungen entscheiden.",
    indexLead: "Praktische Insights für KMU: Arbeitsanweisungen, Datenverantwortung, CRM, Events und KI-Sichtbarkeit. Direkte Antworten, konkrete Schritte, klare Grenzen und prüfbare Quellen.",
    categories: {
      "workflow-sop": { title: "Abläufe & SOP", description: "Die erste Automatisierung wählen, Übergaben verbessern und Tabellen schrittweise migrieren." },
      "ai-data-governance": { title: "KI & Datenverantwortung", description: "Messbare Piloten, menschliche Prüfung und Datengrenzen statt Erfolgsversprechen." },
      "crm-events-membership": { title: "CRM, Events & Mitgliedschaft", description: "Anfragen, Teilnahme und Verlängerungen mit Zuständigkeit und nächstem Schritt verbinden." },
      "ai-visibility": { title: "KI-Sichtbarkeit", description: "Was GEO, AEO und SEO verbessern, was messbar ist und was nicht garantiert wird." },
      "guides-comparisons": { title: "Praxisleitfäden & Vergleiche", description: "Umfang, Kosten und Eignung vergleichen statt nur Produktnamen." },
    },
    browse: "Nach Thema lesen", keyTakeaways: "Drei Kernaussagen", limitations: "Grenzen", sources: "Quellen & Hinweise",
    relatedServices: "Passende Leistungen", relatedCases: "Verwandte Fälle", relatedArticles: "Weiterlesen",
    author: "Autor", published: "Veröffentlicht", modified: "Aktualisiert",
    seriesTitle: "PDPO, Datentransfer\nund private KI",
    seriesLead:
      "Fünfzehn Beiträge für Hongkonger Teams mit 3 bis 30 Personen. Jeder beginnt mit einer direkten Antwort, danach die Schritte für diese Woche. Allgemeine Information, keine Rechtsberatung.",
    indexKicker: "Insights · Praxisnotizen",
    archiveTitle: "Frühere Notizen",
    archiveNote: "CRM, Events und Kursbetrieb. Diese Texte sind auf Englisch.",
    directAnswer: "Direkte Antwort",
    faq: "Fragen",
    inThisSeries: "In dieser Reihe",
    book: "30-minütige Diagnose buchen",
    back: "Zurück zu Insights",
    previous: "Zurück",
    next: "Weiter",
    home: "Start",
    blog: "Insights",
    part: (n, total) => `${String(n).padStart(2, "0")} / ${String(total).padStart(2, "0")}`,
  },
};
