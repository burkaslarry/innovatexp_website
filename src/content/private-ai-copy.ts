import type { AppLocale } from "@/lib/i18n-routing";

export type PrivateAiCopy = {
  eyebrow: string;
  h1: string;
  answer: string;
  support: string;
  tableTitle: string;
  columns: [string, string, string, string, string];
  rows: [string, string, string, string, string][];
  fitTitle: string;
  fit: string[];
  stepsTitle: string;
  steps: { title: string; body: string }[];
  legal: string;
  disclaimer: string;
  faqTitle: string;
  faqs: { question: string; answer: string }[];
  ctaTitle: string;
  ctaBody: string;
  cta: string;
  linksTitle: string;
  links: { href: string; label: string }[];
};

const links = {
  "zh-hk": [
    { href: "/blog/what-is-enterprise-private-ai", label: "企業私人 AI 同 ChatGPT 有咩分別" },
    { href: "/blog/which-private-ai-deployment-for-smes", label: "3–30 人公司點揀部署" },
    { href: "/blog/ai-on-contracts-and-invoices", label: "AI 處理合約同發票" },
  ],
  "zh-tw": [
    { href: "/blog/what-is-enterprise-private-ai", label: "企業私人 AI 與 ChatGPT 的差別" },
    { href: "/blog/which-private-ai-deployment-for-smes", label: "3–30 人公司如何選部署" },
    { href: "/blog/ai-on-contracts-and-invoices", label: "AI 處理合約與發票" },
  ],
  en: [
    { href: "/blog/what-is-enterprise-private-ai", label: "Private AI compared with ChatGPT" },
    { href: "/blog/which-private-ai-deployment-for-smes", label: "Which deployment fits 3–30 people" },
    { href: "/blog/ai-on-contracts-and-invoices", label: "AI on contracts and invoices" },
  ],
  ja: [
    { href: "/blog/what-is-enterprise-private-ai", label: "プライベートAIとChatGPTの違い" },
    { href: "/blog/which-private-ai-deployment-for-smes", label: "3〜30人の配置の選び方" },
    { href: "/blog/ai-on-contracts-and-invoices", label: "契約と請求書をAIで扱う" },
  ],
  de: [
    { href: "/blog/what-is-enterprise-private-ai", label: "Private KI und ChatGPT" },
    { href: "/blog/which-private-ai-deployment-for-smes", label: "Welche Bereitstellung bei 3–30 Personen" },
    { href: "/blog/ai-on-contracts-and-invoices", label: "KI für Verträge und Rechnungen" },
  ],
} as const;

export const PRIVATE_AI_COPY: Record<AppLocale, PrivateAiCopy> = {
  "zh-hk": {
    eyebrow: "私人 AI",
    h1: "香港 PDPO 合規私人 AI｜為 3–30 人公司而設",
    answer: "企業私人 AI 係你控制存取同存放位置嘅系統。3–30 人公司多數由企業版開始，高敏感先至考慮本地部署。",
    support: "InnovateXP 先聽一條真實流程：邊啲欄位可以入、邊啲要人覆核、邊個睇到。數據治理同安全合規由呢條線開始，而唔係由買伺服器開始。",
    tableTitle: "三種部署點比較？",
    columns: ["方式", "成本", "資料控制", "維護", "適合"],
    rows: [
      ["企業版 SaaS", "低", "中", "低", "大部分 3–30 人公司"],
      ["私有雲", "中", "高", "中", "專業服務、處理敏感檔案"],
      ["本地伺服器", "高", "最高", "高", "有 IT 支援、資料要留喺公司"],
    ],
    fitTitle: "邊類公司先要認真考慮？",
    fit: [
      "成日處理客戶合約、發票、醫療或財務資料。",
      "員工已經用個人聊天帳號貼上客戶名，需要一條准用路徑。",
      "只處理公開文案、又有使用政策，未必需要本地伺服器。",
    ],
    stepsTitle: "流程：聽診、試點、落地",
    steps: [
      { title: "聽診", body: "揀一條流程，畫出欄位、存放位置同邊個可以發送。" },
      { title: "試點", body: "企業版或私有雲先跑真實單，設定權限同人工覆核。" },
      { title: "落地", body: "見到前後對比先擴。數據主權係你決定數據留邊，唔係口號。" },
    ],
    legal: "跨境轉移同 PDPO 適用範圍會變。本頁法律內容待律師覆核，唔好當成合規結論。數據不出境要視乎供應商實際處理地點，唔可以只睇銷售頁。",
    disclaimer: "本頁只作一般資訊，並非法律意見。",
    faqTitle: "常見問題",
    faqs: [
      { question: "10 個人的公司需要企業私人 AI 嗎？", answer: "如果每日處理客戶合約、醫療或財務資料，就值得由企業版同使用政策開始。否則政策加現有工具可能已經夠。" },
      { question: "本地部署係咪最安全？", answer: "控制最高，維護亦最高。冇人更新同管權限，本地伺服器可以比一個管得好嘅企業版更危險。" },
      { question: "數據不出境係咪代表一定留喺香港伺服器？", answer: "待律師覆核。銷售頁寫香港，不代表模型推理或備份唔會喺外地。要問處理地、日誌同刪除。" },
      { question: "私人 AI 會唔會比公開聊天蠢？", answer: "視乎模型。接上你公司已核實嘅文件之後，內部問題往往答得更貼。" },
      { question: "部署要幾耐？", answer: "企業版可以數日內開始試。私有雲試點通常數星期。本地伺服器視乎你有冇人維護。" },
      { question: "之後可唔可以轉？", answer: "可以，所以一開始就要數據可以匯出。鎖死喺一個登入，就冇數據主權。" },
    ],
    ctaTitle: "下一步",
    ctaBody: "預約 1 小時業務聽診，帶一條會碰到客戶資料嘅流程。",
    cta: "預約 1 小時業務聽診",
    linksTitle: "相關文章",
    links: [...links["zh-hk"]],
  },
  "zh-tw": {
    eyebrow: "私人 AI",
    h1: "香港 PDPO 合規私人 AI｜為 3–30 人公司而設",
    answer: "企業私人 AI 是你控制存取與存放位置的系統。3–30 人公司多數由企業版開始，高敏感才考慮本地部署。",
    support: "InnovateXP 先聽一條真實流程：哪些欄位可以進入、哪些要人覆核、誰看得到。資料治理與安全合規從這條線開始。",
    tableTitle: "三種部署如何比較？",
    columns: ["方式", "成本", "資料控制", "維護", "適合"],
    rows: [
      ["企業版 SaaS", "低", "中", "低", "大部分 3–30 人公司"],
      ["私有雲", "中", "高", "中", "專業服務、處理敏感檔案"],
      ["本地伺服器", "高", "最高", "高", "有 IT 支援、資料要留在公司"],
    ],
    fitTitle: "哪類公司要認真考慮？",
    fit: ["每天處理客戶合約、發票、醫療或財務資料。", "員工已用個人帳號貼上客戶姓名，需要一條准用路徑。", "只處理公開文案且已有使用政策，未必需要本地伺服器。"],
    stepsTitle: "流程：診斷、試點、落地",
    steps: [
      { title: "診斷", body: "選一條流程，畫出欄位、存放位置與誰可以發送。" },
      { title: "試點", body: "企業版或私有雲先跑真實單據，設定權限與人工覆核。" },
      { title: "落地", body: "看到前後對比再擴。數據主權是你決定資料留在哪裡。" },
    ],
    legal: "跨境轉移與 PDPO 適用範圍會變。本頁法律內容待律師覆核。數據不出境要看供應商實際處理地點。",
    disclaimer: "本頁只作一般資訊，並非法律意見。",
    faqTitle: "常見問題",
    faqs: [
      { question: "10 人的公司需要企業私人 AI 嗎？", answer: "若每日處理合約、醫療或財務資料，可由企業版與使用政策開始。否則政策加現有工具可能已夠。" },
      { question: "本地部署最安全嗎？", answer: "控制最高，維護也最高。沒人更新與管權限時，本地伺服器可以更危險。" },
      { question: "數據不出境是否代表一定留在香港伺服器？", answer: "待律師覆核。銷售頁寫香港，不代表推理或備份不在外地。" },
      { question: "私人 AI 會比公開聊天差嗎？", answer: "視模型而定。接上已核實的公司文件後，內部問題往往更貼。" },
      { question: "部署要多久？", answer: "企業版可於數日內試。私有雲試點通常數週。本地伺服器視乎有沒有人維護。" },
      { question: "之後可以換嗎？", answer: "可以，所以一開始就要能匯出。鎖在一個登入裡，就沒有數據主權。" },
    ],
    ctaTitle: "下一步",
    ctaBody: "預約 1 小時業務診斷，帶一條會碰到客戶資料的流程。",
    cta: "預約 1 小時業務診斷",
    linksTitle: "相關文章",
    links: [...links["zh-tw"]],
  },
  en: {
    eyebrow: "Private AI",
    h1: "PDPO-minded private AI for Hong Kong firms of 3–30",
    answer: "A private AI solution Hong Kong teams can run is one where you control access and where files sit. Most firms of 3–30 start with an enterprise tenant. Local servers come later, for highly sensitive work.",
    support: "InnovateXP starts with one real workflow: which fields may enter, who reviews the output, and who can send it. Data governance and security compliance begin on that line, not with a server purchase.",
    tableTitle: "How do the three deployments compare?",
    columns: ["Option", "Cost", "Control", "Upkeep", "Fit"],
    rows: [
      ["Enterprise SaaS", "Low", "Medium", "Low", "Most firms of 3–30"],
      ["Private cloud", "Medium", "High", "Medium", "Professional firms with sensitive files"],
      ["On-prem server", "High", "Highest", "High", "Teams with IT support and a hard residency need"],
    ],
    fitTitle: "Who should take this seriously?",
    fit: [
      "You handle client contracts, invoices, clinical, or financial records every week.",
      "Staff already paste client names into personal chat accounts.",
      "You only draft public copy and already have a use policy — a local server may be unnecessary.",
    ],
    stepsTitle: "Diagnose, pilot, then land",
    steps: [
      { title: "Diagnose", body: "Pick one workflow. Name the fields, the storage location, and who may send." },
      { title: "Pilot", body: "Run real cases on an enterprise tenant or private cloud, with permissions and human review." },
      { title: "Land", body: "Extend after a before-and-after. Data sovereignty means you decide where data stays." },
    ],
    legal: "Cross-border transfer and how the PDPO applies can change. Legal statements on this page are pending lawyer review. Data not leaving a jurisdiction depends on where the vendor actually processes it, not on a sales page.",
    disclaimer: "This page is general information, not legal advice.",
    faqTitle: "Questions",
    faqs: [
      { question: "Does a 10-person firm need private AI?", answer: "If the week is full of contracts, clinical, or financial records, start with an enterprise tenant and a use policy. Otherwise the policy plus current tools may be enough." },
      { question: "Is on-prem the safest?", answer: "It is the highest control and the highest upkeep. An unpatched server with loose access can be riskier than a well-administered enterprise tenant." },
      { question: "Does “data stays put” mean a Hong Kong server?", answer: "Pending lawyer review. A sales page that says Hong Kong does not prove inference and backups stay there." },
      { question: "Will private AI be worse than public chat?", answer: "It depends on the model. On your own checked documents, internal questions are often more relevant." },
      { question: "How long does deployment take?", answer: "An enterprise tenant can start in days. A private-cloud pilot is often a few weeks. On-prem depends on who maintains it." },
      { question: "Can we switch later?", answer: "Yes, if you can export from day one. A login you cannot leave is not data sovereignty." },
    ],
    ctaTitle: "Next step",
    ctaBody: "Book a 1-hour diagnosis and bring one workflow that touches client data.",
    cta: "Book a 1-hour diagnosis",
    linksTitle: "Related notes",
    links: [...links.en],
  },
  ja: {
    eyebrow: "プライベートAI",
    h1: "香港の3〜30人企業向け、PDPOを意識したプライベートAI",
    answer: "プライベートAIは、アクセスと保管場所を自社が決める仕組みです。3〜30人は企業版から始め、機微な業務だけローカル配置を検討します。",
    support: "InnovateXPは実在の業務を1つ聞きます。どの項目を入れてよいか、誰が確認し、誰が送信できるか。データガバナンスと安全な運用は、サーバ購入の前にこの一本から始まります。",
    tableTitle: "3つの配置を比べると？",
    columns: ["方式", "費用", "制御", "保守", "向き"],
    rows: [
      ["企業版SaaS", "低", "中", "低", "ほとんどの3〜30人"],
      ["プライベートクラウド", "中", "高", "中", "機微なファイルを扱う専門職"],
      ["オンプレ", "高", "最高", "高", "ITがいて、データを社内に残す必要がある"],
    ],
    fitTitle: "真剣に検討するのは誰ですか？",
    fit: ["契約、請求、医療、財務を毎週扱う。", "従業員が個人チャットに顧客名を貼っている。", "公開文案だけで利用方針があるなら、オンプレは不要なことがあります。"],
    stepsTitle: "診断、試行、本番",
    steps: [
      { title: "診断", body: "業務を1つ選び、項目、保管場所、送信できる人を書きます。" },
      { title: "試行", body: "企業版かプライベートクラウドで実例を回し、権限と人の確認を置きます。" },
      { title: "落地", body: "前後を見てから広げます。データ主権は、データをどこに残すかを自社が決めることです。" },
    ],
    legal: "越境移転とPDPOの適用は変わります。法律に触れる文は弁護士の確認待ちです。データが域外に出ないかは、販売ページではなく実際の処理場所で判断します。",
    disclaimer: "本ページは一般情報であり、法律意見ではありません。",
    faqTitle: "質問",
    faqs: [
      { question: "10人の会社にプライベートAIは必要ですか？", answer: "契約、医療、財務が毎日なら、企業版と利用方針から始めます。そうでなければ方針と既存ツールで足りることがあります。" },
      { question: "オンプレが最も安全ですか？", answer: "制御は最大、保守も最大です。更新と権限が無いサーバは、管理された企業版より危険になり得ます。" },
      { question: "データが外に出ないとは香港サーバですか？", answer: "弁護士の確認待ちです。販売ページの「香港」は、推論とバックアップの場所を証明しません。" },
      { question: "公開チャットより劣りますか？", answer: "モデルによります。確認済みの社内文書につながると、社内の問いに合いやすくなります。" },
      { question: "どれくらいかかりますか？", answer: "企業版は数日で試せます。プライベートクラウドは通常数週。オンプレは保守する人がいるかによります。" },
      { question: "後から乗り換えられますか？", answer: "書き出せるなら可能です。出られないログインはデータ主権ではありません。" },
    ],
    ctaTitle: "次",
    ctaBody: "顧客データに触れる業務を1つ持って、1時間の診断を予約してください。",
    cta: "1時間の診断を予約",
    linksTitle: "関連記事",
    links: [...links.ja],
  },
  de: {
    eyebrow: "Private KI",
    h1: "PDPO-bewusste private KI für Hongkonger Firmen mit 3–30 Personen",
    answer: "Private KI heißt: Sie bestimmen Zugriff und Speicherort. Firmen mit 3–30 Personen starten meist mit einem Enterprise-Tenant. Lokale Server kommen bei hochsensiblen Abläufen.",
    support: "InnovateXP beginnt mit einem echten Ablauf: welche Felder hinein dürfen, wer prüft, wer senden darf. Data Governance und Sicherheit beginnen auf dieser Linie, nicht mit einem Serverkauf.",
    tableTitle: "Wie vergleichen sich die drei Arten?",
    columns: ["Art", "Kosten", "Kontrolle", "Pflege", "Passend"],
    rows: [
      ["Enterprise-SaaS", "Niedrig", "Mittel", "Niedrig", "Die meisten Firmen mit 3–30"],
      ["Private Cloud", "Mittel", "Hoch", "Mittel", "Sensible Akten in Professionen"],
      ["Lokaler Server", "Hoch", "Am höchsten", "Hoch", "IT vorhanden und Daten müssen im Haus bleiben"],
    ],
    fitTitle: "Wer sollte das ernst nehmen?",
    fit: ["Verträge, Rechnungen, Klinik- oder Finanzakten jede Woche.", "Mitarbeitende fügen Kundennamen in private Chats ein.", "Nur öffentliche Texte plus Nutzungsregel — ein lokaler Server kann unnötig sein."],
    stepsTitle: "Diagnose, Pilot, Umsetzung",
    steps: [
      { title: "Diagnose", body: "Einen Ablauf wählen. Felder, Speicherort und Sender benennen." },
      { title: "Pilot", body: "Echte Fälle auf Enterprise-Tenant oder Private Cloud, mit Rechten und menschlicher Prüfung." },
      { title: "Umsetzung", body: "Erst nach einem Vorher-nachher erweitern. Datensouveränität heißt, Sie entscheiden, wo Daten bleiben." },
    ],
    legal: "Grenzüberschreitende Übermittlung und die PDPO können sich ändern. Rechtliche Sätze auf dieser Seite warten auf anwaltliche Prüfung. Ob Daten das Gebiet verlassen, hängt vom tatsächlichen Verarbeitungsort ab, nicht von einer Verkaufsseite.",
    disclaimer: "Diese Seite ist allgemeine Information, keine Rechtsberatung.",
    faqTitle: "Fragen",
    faqs: [
      { question: "Braucht eine Firma mit 10 Personen private KI?", answer: "Bei Verträgen, Klinik- oder Finanzakten täglich: Enterprise-Tenant und Nutzungsregel. Sonst reichen Regel und vorhandene Werkzeuge oft." },
      { question: "Ist ein lokaler Server am sichersten?", answer: "Höchste Kontrolle, höchste Pflege. Ein ungepflegter Server kann riskanter sein als ein gut verwalteter Tenant." },
      { question: "Heißt „Daten bleiben hier“ ein Server in Hongkong?", answer: "Anwaltliche Prüfung ausstehend. „Hongkong“ auf einer Verkaufsseite beweist nicht, wo Inferenz und Backups liegen." },
      { question: "Ist private KI schlechter als öffentlicher Chat?", answer: "Das hängt vom Modell ab. An geprüften eigenen Dokumenten sind interne Fragen oft treffender." },
      { question: "Wie lange dauert die Bereitstellung?", answer: "Ein Enterprise-Tenant kann in Tagen starten. Eine Private Cloud oft in Wochen. Lokal hängt es davon ab, wer pflegt." },
      { question: "Können wir später wechseln?", answer: "Ja, wenn Sie von Anfang an exportieren können. Ein Login ohne Ausweg ist keine Datensouveränität." },
    ],
    ctaTitle: "Nächster Schritt",
    ctaBody: "Buchen Sie eine einstündige Diagnose und bringen Sie einen Ablauf mit, der Kundendaten berührt.",
    cta: "Einstündige Diagnose buchen",
    linksTitle: "Verwandte Beiträge",
    links: [...links.de],
  },
};
