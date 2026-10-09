import type { AppLocale } from "@/lib/i18n-routing";
import type { BlogLocaleCopy, PdpoPost } from "@/content/blog-types";
import { PDPO_BLOG_ADVISORY } from "@/content/pdpo-blog-series-advisory";
import { PDPO_BLOG_REST } from "@/content/pdpo-blog-series-rest";

const DISCLAIMER: Record<AppLocale, string> = {
  "zh-hk": "本文只作一般資訊，並非法律意見。私隱專員公署指引會更新，發布或依賴前請核對最新版本。",
  "zh-tw": "本文只作一般資訊，並非法律意見。香港個人資料私隱專員公署指引會更新，採用前請核對最新版本。",
  en: "This article is general information, not legal advice. PCPD guidance changes — check the latest version before you rely on it.",
  ja: "本稿は一般情報であり、法律意見ではありません。PCPDの指針は更新されるため、依拠する前に最新版を確認してください。",
  de: "Dieser Text ist allgemeine Information, keine Rechtsberatung. Die PCPD-Hinweise ändern sich — prüfen Sie die aktuelle Fassung.",
};

const CTA: Record<AppLocale, string> = {
  "zh-hk": "想先睇一條真實流程會唔會碰到個人資料？預約 1 小時業務聽診。",
  "zh-tw": "想先看一條真實流程會不會碰到個人資料？預約 1 小時業務診斷。",
  en: "Want a first look at whether one real workflow touches personal data? Book a 1-hour business diagnosis.",
  ja: "実際の1業務が個人情報に触れるか、先に確認しますか。1時間の業務診断を予約できます。",
  de: "Prüfen Sie zuerst an einem echten Ablauf, ob personenbezogene Daten betroffen sind. Buchen Sie eine einstündige Geschäftsdiagnose.",
};

function copy(
  locale: AppLocale,
  fields: Omit<BlogLocaleCopy, "disclaimer" | "cta">,
): BlogLocaleCopy {
  return { ...fields, disclaimer: DISCLAIMER[locale], cta: CTA[locale] };
}

const PDPO_BLOG_HEAD: PdpoPost[] = [
  {
    slug: "pdpo-six-principles-before-ai",
    date: "2026-10-09",
    order: 1,
    locales: {
      "zh-hk": copy("zh-hk", {
        title: "香港中小企用 AI 前要知嘅 PDPO 6 大原則",
        excerpt: "PDPO 冇禁止用 AI。一碰到個人資料，就要守六項保障資料原則。",
        directAnswer:
          "《個人資料（私隱）條例》（第 486 章）冇禁止使用 AI。只要 AI 處理到可識別嘅個人資料，就要守六項原則。數據治理同安全合規都由呢度開始。",
        sections: [
          { heading: "邊啲算個人資料", paragraphs: ["姓名、電話、身份證號碼、合約、發票、住址、員工紀錄，只要可以識認一個人，就係個人資料。匿名統計通常唔算，但要確認真係拆唔返。"] },
          { heading: "數據治理同安全合規，點樣落到 AI？", paragraphs: ["收集要有明確目的。資料要準，保留唔好長過需要。用途唔好超出當初講過嘅範圍。要有存取控制同加密。要話畀資料當事人知你用緊咩。當事人可以要求查閱同改正。安全合規係權限同日誌，唔係買一個工具名。"] },
          { heading: "中小企點起步", paragraphs: ["先畫一張資料地圖：邊個欄位、邊個系統、邊個睇到。再揀一條流程做試點，唔好一次過接晒所有部門。"] },
        ],
        faqs: [
          { question: "細公司用唔用免？", answer: "唔免。條例唔係淨係管大企業。只要你控制個人資料，六項原則都適用。" },
          { question: "外洩要唔要通知？", answer: "截至本文撰寫，香港未有強制外洩通報。私隱專員公署強烈鼓勵自願通知。法例修訂前請再核對公署最新立場，唔好當呢句係永久法律結論。" },
        ],
      }),
      "zh-tw": copy("zh-tw", {
        title: "香港中小企業導入 AI 前要知道的 PDPO 六大原則",
        excerpt: "PDPO 沒有禁止使用 AI。一旦碰到個人資料，就要遵守六項保障資料原則。",
        directAnswer:
          "《個人資料（私隱）條例》（第 486 章）沒有禁止使用 AI。只要 AI 處理到可識別的個人資料，就要同時遵守收集目的、準確與保留、使用、保安、透明度，以及查閱與改正這六項原則。",
        sections: [
          { heading: "什麼算個人資料", paragraphs: ["姓名、電話、身分證字號、合約、發票、地址、員工紀錄，只要能識別一個人，就是個人資料。真正無法還原的統計通常不算。"] },
          { heading: "六項原則如何落到 AI", paragraphs: ["收集要有明確目的。資料要正確，保存不要超過需要。用途不要超出當初說明的範圍。要有存取控制與加密。要告知當事人。當事人可以要求查閱與改正。"] },
          { heading: "中小企業如何起步", paragraphs: ["先畫一張資料地圖：哪些欄位、哪些系統、誰看得到。再選一條流程做試點。"] },
        ],
        faqs: [
          { question: "小公司可以豁免嗎？", answer: "不行。條例不是只規範大企業。只要你控制個人資料，六項原則都適用。" },
          { question: "外洩一定要通報嗎？", answer: "截至本文撰寫，香港尚未強制外洩通報，私隱專員公署強烈鼓勵自願通知。採用前請再核對公署最新立場。" },
        ],
      }),
      en: copy("en", {
        title: "Six PDPO principles Hong Kong SMEs should know before using AI",
        excerpt: "The PDPO does not ban AI. If a workflow touches personal data, the six data-protection principles apply.",
        directAnswer:
          "Hong Kong’s Personal Data (Privacy) Ordinance (Cap. 486) does not ban AI. If an AI workflow touches identifiable personal data, you still have to meet the six principles: collection purpose, accuracy and retention, use, security, openness, and access and correction.",
        sections: [
          { heading: "What counts as personal data", paragraphs: ["Names, phone numbers, ID numbers, contracts, invoices, addresses, and staff records count when a person can be identified. Truly irreversible statistics usually do not."] },
          { heading: "How the six principles land on AI", paragraphs: ["Collect for a stated purpose. Keep data accurate and no longer than needed. Do not use it for a new purpose you never explained. Limit access and encrypt it. Tell people what you are doing. Honour access and correction requests."] },
          { heading: "A practical first step", paragraphs: ["Draw a one-page data map: fields, systems, and who can see them. Pilot one workflow before you connect every department."] },
        ],
        faqs: [
          { question: "Are small firms exempt?", answer: "No. The Ordinance is not limited to large companies. If you control personal data, the six principles apply." },
          { question: "Is breach notification mandatory?", answer: "As of this article, Hong Kong does not have a mandatory breach-notification duty. The PCPD strongly encourages voluntary notification. Recheck the PCPD’s latest position before you treat this as settled." },
        ],
      }),
      ja: copy("ja", {
        title: "香港の中小企業がAIを使う前に知るPDPOの6原則",
        excerpt: "PDPOはAIを禁止していません。個人情報に触れるなら6つの保護原則が適用されます。",
        directAnswer:
          "香港の個人資料（私隠）条例（第486章）はAIを禁止していません。識別できる個人情報をAIが扱うなら、収集目的、正確性と保有、利用、保安、透明性、開示・訂正の6原則を同時に守る必要があります。",
        sections: [
          { heading: "個人情報に当たるもの", paragraphs: ["氏名、電話、身分証番号、契約、請求書、住所、従業員記録は、人を識別できるなら個人情報です。復元できない統計は通常当たりません。"] },
          { heading: "6原則をAIに落とす", paragraphs: ["目的を明示して集める。正確に保ち、必要以上に持たない。説明していない目的に使わない。アクセス制御と暗号化をする。本人に知らせる。開示と訂正に応える。"] },
          { heading: "最初の一歩", paragraphs: ["項目、システム、閲覧者を1枚の資料地図にします。全部門を一度につなげず、1業務で試します。"] },
        ],
        faqs: [
          { question: "小規模企業は免除されますか？", answer: "されません。条例は大企業だけを対象にしていません。個人情報を管理するなら6原則が適用されます。" },
          { question: "漏えい通知は義務ですか？", answer: "本稿執筆時点では香港に強制通知義務はありません。PCPDは自主通知を強く勧めています。依拠する前に最新見解を確認してください。" },
        ],
      }),
      de: copy("de", {
        title: "Sechs PDPO-Grundsätze, bevor Hongkonger KMU KI nutzen",
        excerpt: "Die PDPO verbietet KI nicht. Sobald personenbezogene Daten betroffen sind, gelten die sechs Grundsätze.",
        directAnswer:
          "Hongkongs Personal Data (Privacy) Ordinance (Cap. 486) verbietet KI nicht. Sobald ein KI-Ablauf identifizierbare personenbezogene Daten berührt, gelten die sechs Grundsätze: Erhebungszweck, Richtigkeit und Aufbewahrung, Nutzung, Sicherheit, Transparenz sowie Auskunft und Berichtigung.",
        sections: [
          { heading: "Was personenbezogene Daten sind", paragraphs: ["Name, Telefon, Ausweisnummer, Verträge, Rechnungen, Adressen und Personalakten zählen, wenn eine Person erkennbar ist. Wirklich irreversible Statistiken in der Regel nicht."] },
          { heading: "Wie die sechs Grundsätze auf KI treffen", paragraphs: ["Nur für einen genannten Zweck erheben. Daten richtig und nicht länger als nötig halten. Nicht für einen neuen, unerklärten Zweck nutzen. Zugriff begrenzen und verschlüsseln. Betroffene informieren. Auskunft und Berichtigung ermöglichen."] },
          { heading: "Der erste Schritt", paragraphs: ["Eine Seite Datenkarte: Felder, Systeme, wer sie sieht. Einen Ablauf pilotieren, nicht alle Abteilungen auf einmal."] },
        ],
        faqs: [
          { question: "Sind kleine Firmen ausgenommen?", answer: "Nein. Die Verordnung gilt nicht nur für Großunternehmen. Wer personenbezogene Daten verantwortet, muss die sechs Grundsätze einhalten." },
          { question: "Ist eine Meldung bei Datenpannen Pflicht?", answer: "Zum Zeitpunkt dieses Textes gibt es in Hongkong keine Pflicht zur Meldung. Der PCPD empfiehlt freiwillige Meldung nachdrücklich. Prüfen Sie die aktuelle Haltung, bevor Sie das als endgültig behandeln." },
        ],
      }),
    },
  },
  {
    slug: "staff-chatgpt-and-pdpo",
    date: "2026-10-10",
    order: 2,
    locales: {
      "zh-hk": copy("zh-hk", {
        title: "員工用 ChatGPT 會唔會犯 PDPO？",
        excerpt: "風險唔係開帳號，而係將姓名、電話、合約貼入公開工具。",
        directAnswer:
          "員工用公開 ChatGPT 唔會自動犯法。風險係將姓名、電話、身份證、合約或客戶紀錄貼入你控制唔到嘅公開模型。公司要有一頁紙政策：邊啲可以貼、邊啲要覆核、邊啲禁止。",
        sections: [
          { heading: "綠、黃、紅", paragraphs: ["綠：公開產品說明、已公開嘅市場資料。黃：內部流程草稿，要遮姓名同電話先至貼。紅：身份證、銀行戶口、未公開合約、員工紀律紀錄、客戶對話原文。"] },
          { heading: "點寫一頁紙政策", paragraphs: ["寫明批准工具、禁止欄位、邊個批黃區、違規點處理。新同事第一日要睇過。私隱專員公署有生成式 AI 僱員指引，引用前請核對公署網站上嘅正式名稱同日期。"] },
          { heading: "管理者要做嘅", paragraphs: ["抽查一個月貼過嘅內容。將紅區改去企業帳戶或私人 AI，而唔係靠口頭叫人小心。"] },
        ],
        faqs: [
          { question: "用公司電郵開 ChatGPT 就安全？", answer: "唔係。帳號係邊個開，同你貼入去嘅內容係兩件事。公開消費級工具仍然可能用對話改進模型，要睇該計劃嘅條款。" },
          { question: "遮咗名就一定得？", answer: "如果仲有電話、合約編號、地址，仍然可以識認到人。黃區要遮到無法識認，先至當綠區。" },
        ],
      }),
      "zh-tw": copy("zh-tw", {
        title: "員工使用 ChatGPT 會不會違反 PDPO？",
        excerpt: "風險不是開帳號，而是把姓名、電話、合約貼進公開工具。",
        directAnswer:
          "員工使用公開 ChatGPT 不會自動違法。風險是把姓名、電話、身分證、合約或客戶紀錄貼進你無法控制的公開模型。公司需要一頁政策：哪些可貼、哪些要覆核、哪些禁止。",
        sections: [
          { heading: "綠、黃、紅", paragraphs: ["綠：已公開的產品說明與市場資料。黃：內部流程草稿，先遮姓名與電話。紅：身分證、銀行帳戶、未公開合約、員工紀律紀錄、客戶對話原文。"] },
          { heading: "一頁政策要寫什麼", paragraphs: ["寫明核准工具、禁止欄位、誰核准黃區、違規如何處理。新同事第一天就要看過。引用公署生成式 AI 僱員指引前，請核對正式名稱與日期。"] },
          { heading: "管理者要做的事", paragraphs: ["抽查一個月內貼過的內容。紅區改走企業帳戶或私人 AI，不要只靠口頭提醒。"] },
        ],
        faqs: [
          { question: "用公司信箱開 ChatGPT 就安全嗎？", answer: "不是。帳號歸屬與貼進去的內容是兩件事。公開消費級工具仍可能依方案條款使用對話。" },
          { question: "遮掉姓名就一定可以嗎？", answer: "如果還有電話、合約編號或地址，仍可能識別到人。黃區要遮到無法識別，才當成綠區。" },
        ],
      }),
      en: copy("en", {
        title: "Can staff use of ChatGPT breach the PDPO?",
        excerpt: "The risk is not opening an account. It is pasting names, phones, and contracts into a public tool.",
        directAnswer:
          "Staff using public ChatGPT is not automatically unlawful. The risk is pasting names, phone numbers, ID numbers, contracts, or client records into a public model you do not control. Give the team a one-page policy: what may be pasted, what needs review, and what is banned.",
        sections: [
          { heading: "Green, amber, red", paragraphs: ["Green: public product copy and published market facts. Amber: internal drafts after names and phone numbers are removed. Red: ID numbers, bank details, unpublished contracts, staff discipline records, and raw client chats."] },
          { heading: "What the one-pager should say", paragraphs: ["Name the approved tools, banned fields, who may clear amber items, and what happens if someone breaks the rule. New joiners read it on day one. If you cite PCPD generative-AI staff guidance, verify the official title and date on the PCPD site first."] },
          { heading: "What managers should do", paragraphs: ["Sample a month of pastes. Move red-zone work to an enterprise account or private AI instead of relying on a verbal reminder."] },
        ],
        faqs: [
          { question: "Is a company-email ChatGPT account safe?", answer: "Not by itself. Who owns the login and what gets pasted are different questions. Consumer plans may still use chats under their terms." },
          { question: "Is removing the name enough?", answer: "Not if a phone number, contract ID, or address still identifies the person. Amber becomes green only when the person cannot be identified." },
        ],
      }),
      ja: copy("ja", {
        title: "従業員のChatGPT利用はPDPO違反になるか",
        excerpt: "リスクはアカウント開設ではなく、氏名・電話・契約を公開ツールに貼ることです。",
        directAnswer:
          "公開ChatGPTの利用自体が自動的に違法になるわけではありません。リスクは、氏名、電話、身分証番号、契約、顧客記録を、自社が制御できない公開モデルに貼ることです。何を貼ってよいか、何を確認するか、何を禁止するかを1枚の方針にします。",
        sections: [
          { heading: "緑・黄・赤", paragraphs: ["緑：公開済みの製品説明と市場情報。黄：氏名と電話を消した社内下書き。赤：身分証、口座、未公開契約、懲戒記録、顧客チャット原文。"] },
          { heading: "1枚の方針に書くこと", paragraphs: ["承認ツール、禁止項目、黄を誰が許可するか、違反時の扱いを書きます。入社初日に読ませます。PCPDの生成AI従業員指針を引用する前に、正式名称と日付を確認してください。"] },
          { heading: "管理者がやること", paragraphs: ["1か月分の貼り付けを抜き取ります。赤は口頭注意ではなく、企業アカウントかプライベートAIへ移します。"] },
        ],
        faqs: [
          { question: "会社メールのChatGPTなら安全ですか？", answer: "それだけでは安全ではありません。ログインの帰属と貼る内容は別です。消費者向けプランは規約次第で会話を使うことがあります。" },
          { question: "名前を消せば十分ですか？", answer: "電話、契約番号、住所が残って人を識別できるなら不十分です。識別できない状態になって初めて緑です。" },
        ],
      }),
      de: copy("de", {
        title: "Verstößt die ChatGPT-Nutzung durch Mitarbeitende gegen die PDPO?",
        excerpt: "Das Risiko ist nicht das Konto, sondern das Einfügen von Namen, Telefonnummern und Verträgen.",
        directAnswer:
          "Die Nutzung von öffentlichem ChatGPT ist nicht automatisch rechtswidrig. Das Risiko ist, Namen, Telefonnummern, Ausweisnummern, Verträge oder Kundendaten in ein öffentliches Modell einzufügen, das Sie nicht kontrollieren. Eine Seite Richtlinie reicht als Start: erlaubt, prüfpflichtig, verboten.",
        sections: [
          { heading: "Grün, gelb, rot", paragraphs: ["Grün: veröffentlichte Produkt- und Markttexte. Gelb: interne Entwürfe nach Entfernen von Name und Telefon. Rot: Ausweis, Bankdaten, unveröffentlichte Verträge, Disziplinarakten, rohe Kundenchats."] },
          { heading: "Was auf die eine Seite gehört", paragraphs: ["Genehmigte Werkzeuge, verbotene Felder, wer Gelb freigibt, und die Folge bei Verstößen. Neue Mitarbeitende lesen das am ersten Tag. Zitieren Sie PCPD-Hinweise zu generativer KI erst nach Prüfung von Titel und Datum."] },
          { heading: "Was Führungskräfte tun", paragraphs: ["Einen Monat Einfügungen stichprobenartig prüfen. Rote Arbeit in ein Unternehmenskonto oder private KI verlagern, nicht nur mündlich ermahnen."] },
        ],
        faqs: [
          { question: "Ist ChatGPT mit Firmen-E-Mail sicher?", answer: "Nicht allein deshalb. Wem das Login gehört und was eingefügt wird, sind zwei Fragen. Verbraucherpläne können Chats nach ihren Bedingungen nutzen." },
          { question: "Reicht es, den Namen zu entfernen?", answer: "Nein, wenn Telefon, Vertragsnummer oder Adresse die Person noch erkennbar machen. Gelb wird Grün erst, wenn keine Identifikation mehr möglich ist." },
        ],
      }),
    },
  },
];

export const PDPO_BLOG_SERIES: PdpoPost[] = [...PDPO_BLOG_HEAD, ...PDPO_BLOG_REST, ...PDPO_BLOG_ADVISORY];
