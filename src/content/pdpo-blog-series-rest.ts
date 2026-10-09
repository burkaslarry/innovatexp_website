import type { AppLocale } from "@/lib/i18n-routing";
import type { BlogLocaleCopy, PdpoPost } from "@/content/blog-types";

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

export const PDPO_BLOG_REST: PdpoPost[] = [
  {
    slug: "cross-border-data-hong-kong",
    date: "2026-10-11",
    order: 3,
    locales: {
      "zh-hk": copy("zh-hk", {
        title: "香港公司資料傳去內地或海外，PDPO 點睇？",
        excerpt: "第 33 條跨境限制尚未生效。你仍然要為保安同用途負責。",
        directAnswer:
          "截至本文撰寫，《個人資料（私隱）條例》第 33 條（限制將個人資料移離香港）尚未生效。唔代表可以任意外傳。你仍然要為保安、用途同透明度負責。用海外 API（包括生成式 AI）應當作跨境處理，並考慮私隱專員公署 2022 年建議嘅合約條文。引用前請核對公署最新文本。",
        sections: [
          { heading: "未生效唔等於冇責任", paragraphs: ["第 33 條未生效，只係話強制跨境限制未啟動。六項保障資料原則仍然適用。資料去到邊，你都要講得出邊個處理、用黎做咩、點樣保護。"] },
          { heading: "海外模型就係跨境", paragraphs: ["員工將客戶資料貼入海外聊天工具，或者系統呼叫海外 API，都係資料離開香港。要有合約條款：用途限制、再轉移、保安、刪除、事故通知。公署曾發布建議合約條文，採用前核對年份同版本。"] },
          { heading: "中小企可以做嘅", paragraphs: ["先列出邊啲欄位會離開香港。高敏感欄位留喺企業帳戶、私有雲或本地。低敏感、已公開內容先至用公開工具。"] },
        ],
        faqs: [
          { question: "第 33 條係咪已經生效？", answer: "截至本文撰寫，未生效。唔好喺客戶文件寫成已生效。法例狀態請再核對政府憲報同公署。" },
          { question: "用香港員工、但伺服器喺外國，算唔算跨境？", answer: "資料實際儲存或處理地點喺香港以外，就應該當跨境處理，並用合約同存取控制補上。" },
        ],
      }),
      "zh-tw": copy("zh-tw", {
        title: "香港公司把資料傳到內地或海外，PDPO 怎麼看？",
        excerpt: "第 33 條跨境限制尚未生效。你仍然要為保安與用途負責。",
        directAnswer:
          "截至本文撰寫，《個人資料（私隱）條例》第 33 條（限制將個人資料移離香港）尚未生效。這不代表可以任意外傳。你仍然要為保安、用途與透明度負責。使用海外 API（包括生成式 AI）應視為跨境處理，並考慮私隱專員公署建議的合約條文。引用前請核對最新文本。",
        sections: [
          { heading: "未生效不等於沒有責任", paragraphs: ["第 33 條未生效，只表示強制跨境限制尚未啟動。六項保障資料原則仍然適用。"] },
          { heading: "海外模型就是跨境", paragraphs: ["把客戶資料貼進海外聊天工具，或系統呼叫海外 API，都是資料離開香港。合約應限制用途、再轉移、保安、刪除與事故通知。"] },
          { heading: "中小企業可以做的", paragraphs: ["先列出哪些欄位會離開香港。高敏感欄位留在企業帳戶、私有雲或本地。"] },
        ],
        faqs: [
          { question: "第 33 條已經生效了嗎？", answer: "截至本文撰寫，尚未生效。不要在客戶文件中寫成已生效。請再核對憲報與公署。" },
          { question: "人在香港、伺服器在外國，算跨境嗎？", answer: "資料實際儲存或處理地點在香港以外，就應視為跨境處理。" },
        ],
      }),
      en: copy("en", {
        title: "Sending Hong Kong company data to the mainland or overseas",
        excerpt: "Section 33 is not in force. You are still responsible for security and purpose.",
        directAnswer:
          "As of this article, section 33 of the PDPO — the restriction on transferring personal data out of Hong Kong — is not in force. That does not mean transfers are unrestricted. You remain responsible for security, purpose limitation, and openness. Treat an overseas API, including generative AI, as cross-border processing, and consider the PCPD’s recommended contractual clauses. Verify the latest text before you cite it.",
        sections: [
          { heading: "Not in force is not no duty", paragraphs: ["Section 33 not being in force only means the dedicated transfer restriction has not started. The six data-protection principles still apply. You should be able to say who processes the data, for what, and how it is protected."] },
          { heading: "An overseas model is a transfer", paragraphs: ["Pasting client data into an overseas chat tool, or calling an overseas API, moves data out of Hong Kong. Contracts should limit purpose, onward transfer, security, deletion, and incident notice. The PCPD has published recommended clauses — check the year and version before you adopt them."] },
          { heading: "What an SME can do", paragraphs: ["List which fields leave Hong Kong. Keep highly sensitive fields in an enterprise account, private cloud, or on-prem system. Use public tools only for low-sensitivity or already public content."] },
        ],
        faqs: [
          { question: "Is section 33 in force?", answer: "As of this article, no. Do not tell clients that it is. Recheck the Gazette and the PCPD." },
          { question: "Staff in Hong Kong, servers abroad — is that a transfer?", answer: "If the data is stored or processed outside Hong Kong, treat it as a cross-border transfer and cover it with contract and access control." },
        ],
      }),
      ja: copy("ja", {
        title: "香港企業のデータを内地・海外に送るときPDPOはどう見るか",
        excerpt: "第33条の越境制限は未施行です。保安と利用目的の責任は残ります。",
        directAnswer:
          "本稿執筆時点で、PDPO第33条（個人情報の香港外移転制限）は未施行です。だから自由に送ってよいわけではありません。保安、利用目的、透明性の責任は残ります。生成AIを含む海外APIは越境処理として扱い、PCPDが勧める契約条項を検討してください。引用前に最新テキストを確認してください。",
        sections: [
          { heading: "未施行でも責任はある", paragraphs: ["第33条が未施行なのは、専用の移転制限が始まっていないという意味です。6原則は適用されます。"] },
          { heading: "海外モデルは越境", paragraphs: ["顧客データを海外チャットに貼る、または海外APIを呼ぶことは、データが香港を出ることです。目的、再移転、保安、削除、事故通知を契約で縛ります。"] },
          { heading: "中小企業が先にすること", paragraphs: ["どの項目が香港を出るかを一覧にします。高感度の項目は企業アカウント、プライベートクラウド、またはオンプレに残します。"] },
        ],
        faqs: [
          { question: "第33条は施行されていますか？", answer: "本稿執筆時点では未施行です。顧客向け文書に施行済みと書かないでください。憲報とPCPDを再確認してください。" },
          { question: "人は香港、サーバは外国でも越境ですか？", answer: "保存または処理の場所が香港外なら、越境として契約とアクセス制御で補います。" },
        ],
      }),
      de: copy("de", {
        title: "Wenn Hongkonger Firmendaten aufs Festland oder ins Ausland gehen",
        excerpt: "§ 33 ist nicht in Kraft. Für Sicherheit und Zweck bleiben Sie verantwortlich.",
        directAnswer:
          "Zum Zeitpunkt dieses Textes ist § 33 der PDPO — die Beschränkung der Übermittlung personenbezogener Daten aus Hongkong — nicht in Kraft. Das heißt nicht, dass Übermittlungen frei sind. Sicherheit, Zweckbindung und Transparenz bleiben Ihre Pflicht. Behandeln Sie eine ausländische API, auch generative KI, als grenzüberschreitende Verarbeitung und prüfen Sie die empfohlenen Vertragsklauseln des PCPD. Zitieren Sie nur den aktuellen Text.",
        sections: [
          { heading: "Nicht in Kraft heißt nicht keine Pflicht", paragraphs: ["Dass § 33 nicht gilt, bedeutet nur, dass die spezielle Transferbeschränkung noch nicht läuft. Die sechs Grundsätze gelten weiter."] },
          { heading: "Ein Modell im Ausland ist ein Transfer", paragraphs: ["Kundendaten in ein ausländisches Chat-Tool einzufügen oder eine ausländische API aufzurufen, bewegt Daten aus Hongkong. Verträge sollten Zweck, Weitergabe, Sicherheit, Löschung und Meldung begrenzen."] },
          { heading: "Was ein KMU tun kann", paragraphs: ["Listen Sie, welche Felder Hongkong verlassen. Hochsensible Felder bleiben im Unternehmenskonto, in der Private Cloud oder on-prem."] },
        ],
        faqs: [
          { question: "Ist § 33 in Kraft?", answer: "Zum Zeitpunkt dieses Textes nein. Schreiben Sie Kunden nicht, dass er gilt. Prüfen Sie Gazette und PCPD erneut." },
          { question: "Personal in Hongkong, Server im Ausland — ist das ein Transfer?", answer: "Wenn Daten außerhalb Hongkongs gespeichert oder verarbeitet werden, behandeln Sie das als Transfer." },
        ],
      }),
    },
  },
  {
    slug: "gba-standard-contract-personal-information",
    date: "2026-10-12",
    order: 4,
    locales: {
      "zh-hk": copy("zh-hk", {
        title: "大灣區標準合同：內地同香港之間嘅個人資訊",
        excerpt: "2023 年內地與香港標準合同屬自願安排，唔覆蓋澳門。採用前要律師核對。",
        directAnswer:
          "內地與香港關於個人資訊跨境嘅標準合同（2023）係便利安排，屬自願，唔係自動適用於所有轉移，亦唔覆蓋澳門。佢唔取代香港 PDPO 嘅六項原則，亦唔等於內地《個人信息保護法》已由呢份合同完全滿足。簽之前要由熟悉兩地法例嘅律師核對你嘅實際轉移。",
        sections: [
          { heading: "佢係咩、唔係咩", paragraphs: ["佢係一份可選用嘅合同文本，用黎處理內地同香港之間某些個人資訊流動。佢唔係香港第 33 條嘅生效替代，亦唔適用於澳門。"] },
          { heading: "中小企點判斷使唔使", paragraphs: ["如果你嘅系統、客服或 HR 會把可識別個人資訊由香港傳到內地機構（或相反），先列出欄位同接收方，再問律師係咪適合用標準合同，定係要用其他 PIPL 路徑。"] },
          { heading: "唔好自己填完就當合規", paragraphs: ["標準文本仍然要配合你嘅真實處理者、目的同保安措施。空白條款填錯，比冇合同更易誤導客戶。"] },
        ],
        faqs: [
          { question: "有冇覆蓋澳門？", answer: "呢份內地與香港標準合同唔覆蓋澳門。涉及澳門要另外評估。" },
          { question: "簽咗就代表 PDPO 過關？", answer: "唔代表。香港六項原則同透明度仍然要自行滿足。合同只係跨境安排嘅一部分。" },
        ],
      }),
      "zh-tw": copy("zh-tw", {
        title: "大灣區標準合同：內地與香港之間的個人資訊",
        excerpt: "2023 年內地與香港標準合同是自願安排，不涵蓋澳門。採用前需律師核對。",
        directAnswer:
          "內地與香港關於個人資訊跨境的標準合同（2023）是便利安排，屬自願，不會自動適用於所有轉移，也不涵蓋澳門。它不取代香港 PDPO 的六項原則，也不等於內地《個人信息保護法》已由這份合同完全滿足。簽署前應由熟悉兩地法規的律師核對實際轉移。",
        sections: [
          { heading: "它是什麼、不是什麼", paragraphs: ["它是一份可選用的合同文本，用來處理內地與香港之間某些個人資訊流動。它不是香港第 33 條的生效替代，也不適用於澳門。"] },
          { heading: "中小企業如何判斷", paragraphs: ["如果系統、客服或人資會把可識別個人資訊在香港與內地機構之間傳送，先列出欄位與接收方，再問律師是否適合標準合同或其他 PIPL 路徑。"] },
          { heading: "不要填完就當合規", paragraphs: ["標準文本仍要配合真實處理者、目的與保安措施。空白條款填錯，比沒有合同更容易誤導客戶。"] },
        ],
        faqs: [
          { question: "有涵蓋澳門嗎？", answer: "這份內地與香港標準合同不涵蓋澳門。涉及澳門要另外評估。" },
          { question: "簽了就代表 PDPO 過關嗎？", answer: "不代表。香港六項原則與透明度仍須自行滿足。" },
        ],
      }),
      en: copy("en", {
        title: "The GBA standard contract for mainland–Hong Kong personal information",
        excerpt: "The 2023 mainland–Hong Kong standard contract is voluntary and does not cover Macao. Have a lawyer check it.",
        directAnswer:
          "The 2023 standard contract for cross-boundary personal information between the mainland and Hong Kong is a voluntary facilitation tool. It does not apply automatically to every transfer and it does not cover Macao. It does not replace the six PDPO principles, and it does not by itself mean the mainland Personal Information Protection Law is fully satisfied. Have a lawyer who knows both regimes check the actual transfer before you sign.",
        sections: [
          { heading: "What it is and is not", paragraphs: ["It is an optional contract text for certain personal-information flows between the mainland and Hong Kong. It is not a substitute for section 33 coming into force, and it does not apply to Macao."] },
          { heading: "When an SME should look at it", paragraphs: ["If systems, support, or HR send identifiable personal information from Hong Kong to a mainland organisation, or the other way, list the fields and the recipient, then ask counsel whether the standard contract or another PIPL route fits."] },
          { heading: "Do not treat a filled template as compliance", paragraphs: ["The standard text still has to match the real processor, purpose, and security measures. A wrongly completed schedule misleads clients more than having no contract."] },
        ],
        faqs: [
          { question: "Does it cover Macao?", answer: "This mainland–Hong Kong standard contract does not cover Macao. Macao needs a separate assessment." },
          { question: "Does signing it clear the PDPO?", answer: "No. You still have to meet the six principles and openness duties. The contract is only part of a cross-boundary arrangement." },
        ],
      }),
      ja: copy("ja", {
        title: "大湾区標準契約：内地と香港の間の個人情報",
        excerpt: "2023年の内地・香港標準契約は任意で、マカオは含みません。署名前に弁護士の確認が必要です。",
        directAnswer:
          "2023年の内地・香港個人情報越境標準契約は、利用を便利にする任意の仕組みです。すべての移転に自動適用されず、マカオも含みません。香港PDPOの6原則に代わるものではなく、内地の個人情報保護法をこの契約だけで満たしたことにもなりません。署名前に両法域に通じた弁護士が実際の移転を確認してください。",
        sections: [
          { heading: "何か、何でないか", paragraphs: ["内地と香港の一定の個人情報の流れに使える任意の契約文です。第33条の施行の代わりではなく、マカオには適用されません。"] },
          { heading: "中小企業が検討するとき", paragraphs: ["システム、サポート、人事が識別できる個人情報を香港と内地機関の間で送るなら、項目と受領者を一覧にし、標準契約か別のPIPL経路かを弁護士に確認します。"] },
          { heading: "記入しただけで適合にしない", paragraphs: ["標準文も、実際の処理者、目的、保安措置と一致させる必要があります。"] },
        ],
        faqs: [
          { question: "マカオは含まれますか？", answer: "この内地・香港の標準契約はマカオを含みません。別途評価が必要です。" },
          { question: "署名すればPDPOはクリアですか？", answer: "いいえ。6原則と透明性は別途満たす必要があります。" },
        ],
      }),
      de: copy("de", {
        title: "Der GBA-Standardvertrag für personenbezogene Informationen zwischen Festland und Hongkong",
        excerpt: "Der Standardvertrag von 2023 ist freiwillig und gilt nicht für Macau. Lassen Sie ihn anwaltlich prüfen.",
        directAnswer:
          "Der Standardvertrag von 2023 für den grenzüberschreitenden Fluss personenbezogener Informationen zwischen dem Festland und Hongkong ist ein freiwilliges Hilfsmittel. Er gilt nicht automatisch für jeden Transfer und nicht für Macau. Er ersetzt die sechs PDPO-Grundsätze nicht und erfüllt für sich allein nicht das Festland-PIPL. Lassen Sie den konkreten Transfer von einer Kanzlei prüfen, die beide Regime kennt, bevor Sie unterschreiben.",
        sections: [
          { heading: "Was er ist und nicht ist", paragraphs: ["Ein optionaler Vertragstext für bestimmte Flüsse zwischen Festland und Hongkong. Kein Ersatz für das Inkrafttreten von § 33 und nicht auf Macau anwendbar."] },
          { heading: "Wann ein KMU ihn prüfen sollte", paragraphs: ["Wenn Systeme, Support oder HR identifizierbare Informationen zwischen Hongkong und einer Festland-Organisation senden, listen Sie Felder und Empfänger und fragen Sie, ob der Standardvertrag oder ein anderer PIPL-Weg passt."] },
          { heading: "Ein ausgefülltes Muster ist noch keine Compliance", paragraphs: ["Der Text muss zum echten Verarbeiter, Zweck und zu den Sicherheitsmaßnahmen passen."] },
        ],
        faqs: [
          { question: "Gilt er für Macau?", answer: "Dieser Festland-Hongkong-Standardvertrag gilt nicht für Macau." },
          { question: "Ist die PDPO mit der Unterschrift erledigt?", answer: "Nein. Die sechs Grundsätze und die Transparenzpflicht bleiben." },
        ],
      }),
    },
  },
  {
    slug: "what-is-enterprise-private-ai",
    date: "2026-10-13",
    order: 5,
    locales: {
      "zh-hk": copy("zh-hk", {
        title: "企業私人 AI 同 ChatGPT 有咩分別？",
        excerpt: "私人 AI 係數據邊界：企業帳戶、私有雲、或者本地部署。呢篇唔談價錢。",
        directAnswer:
          "企業私人 AI 唔係另一個聊天視窗咁簡單。分別在於數據邊界：對話同文件停留喺你指定嘅企業帳戶、私有雲，定係你自己機房。公開 ChatGPT 方便試點；合約、發票、員工紀錄呢類資料，應該行有權限、有日誌、有人覆核嘅私人路徑。",
        sections: [
          { heading: "數據不出境、本地部署同數據主權，係邊三層？", paragraphs: ["企業 SaaS：供應商雲端入面開獨立租戶同權限。私有雲：你指定區域同網絡邊界。本地部署：模型同資料留喺你嘅機房或專用伺服器。數據主權係你決定數據留邊，而且可以匯出。三層都要有人覆核輸出。"] },
          { heading: "同公開聊天工具嘅分別", paragraphs: ["公開工具預設係方便個人生產力。私人 AI 預設係公司資產：邊個上載、邊個睇到、日誌留幾耐、可唔可以再訓練，都要寫得出。"] },
          { heading: "適合先試嘅文件", paragraphs: ["內部 SOP、已遮敏嘅發票欄位、標準報價模板。未遮嘅客戶身份同銀行資料留到第二步。"] },
        ],
        faqs: [
          { question: "私人 AI 係咪完全離線？", answer: "唔一定。私有雲仍然上網，只係邊界同權限由你定。完全離線先係本地、而且要你有人維護。" },
          { question: "可唔可以取代律師或會計師？", answer: "唔可以。私人 AI 起草同分類，發送、入帳、簽名仍然要人覆核。" },
        ],
      }),
      "zh-tw": copy("zh-tw", {
        title: "企業私人 AI 與 ChatGPT 有什麼差別？",
        excerpt: "私人 AI 是資料邊界：企業帳戶、私有雲，或本地部署。本文不談價格。",
        directAnswer:
          "企業私人 AI 不是另一個聊天視窗。差別在資料邊界：對話與檔案留在你指定的企業帳戶、私有雲，還是你自己的機房。公開 ChatGPT 適合試點；合約、發票、員工紀錄應走有權限、有日誌、有人覆核的私人路徑。",
        sections: [
          { heading: "三個層次", paragraphs: ["企業 SaaS：在供應商雲端開獨立租戶與權限。私有雲：你指定區域與網路邊界。本地部署：模型與資料留在你的機房。三層都要有人覆核輸出。"] },
          { heading: "與公開聊天工具的差別", paragraphs: ["公開工具預設服務個人生產力。私人 AI 預設是公司資產：誰上傳、誰可看、日誌留多久、能否再訓練，都要說得清楚。"] },
          { heading: "適合先試的文件", paragraphs: ["內部 SOP、已遮罩的發票欄位、標準報價模板。未遮罩的客戶身分與銀行資料留到下一步。"] },
        ],
        faqs: [
          { question: "私人 AI 就是完全離線嗎？", answer: "不一定。私有雲仍然連網，只是邊界與權限由你定。完全離線才是本地，而且要有人維護。" },
          { question: "可以取代律師或會計師嗎？", answer: "不行。私人 AI 負責起草與分類，寄出、入帳、簽名仍要人覆核。" },
        ],
      }),
      en: copy("en", {
        title: "What is enterprise private AI, compared with ChatGPT?",
        excerpt: "Private AI is a data boundary: enterprise tenant, private cloud, or on-prem. This article does not discuss price.",
        directAnswer:
          "Enterprise private AI is not just another chat window. The difference is the data boundary: chats and files stay in an enterprise tenant you specify, a private cloud, or your own machine room. Public ChatGPT is fine for a pilot. Contracts, invoices, and staff records belong on a private path with permissions, logs, and a human review before anything is sent.",
        sections: [
          { heading: "Three levels", paragraphs: ["Enterprise SaaS: a separate tenant and permissions inside the vendor cloud. Private cloud: you choose the region and network boundary. On-prem: the model and the data stay on your servers. All three still need a person to review output. The model does not send a contract by itself."] },
          { heading: "How that differs from a public chat tool", paragraphs: ["A public tool is built for personal productivity. Private AI is a company asset: who uploads, who can read, how long logs are kept, and whether chats train a model should all be writable policy."] },
          { heading: "Documents worth piloting first", paragraphs: ["Internal SOPs, masked invoice fields, and standard quote templates. Unmasked client identity and bank details wait for a later step."] },
        ],
        faqs: [
          { question: "Does private AI mean fully offline?", answer: "Not always. A private cloud is still online; you set the boundary and the permissions. Fully offline means on-prem, and someone has to run it." },
          { question: "Can it replace a lawyer or accountant?", answer: "No. Private AI drafts and classifies. Sending, booking, and signing still need a person." },
        ],
      }),
      ja: copy("ja", {
        title: "企業向けプライベートAIとChatGPTの違いは何か",
        excerpt: "プライベートAIはデータの境界です。企業テナント、プライベートクラウド、またはオンプレ。価格は書きません。",
        directAnswer:
          "企業向けプライベートAIは、別のチャット画面ではありません。違いはデータの境界です。会話とファイルが、指定した企業テナント、プライベートクラウド、または自社のマシン室に残ります。公開ChatGPTは試行に向きます。契約、請求書、従業員記録は、権限、ログ、人の確認がある私的な経路に置きます。",
        sections: [
          { heading: "3つの段階", paragraphs: ["企業SaaS：ベンダーのクラウド内に独立テナントと権限。プライベートクラウド：地域とネットワーク境界を指定。オンプレ：モデルとデータが自社サーバに残る。いずれも出力は人が確認します。"] },
          { heading: "公開チャットとの違い", paragraphs: ["公開ツールは個人の生産性向けです。プライベートAIは会社の資産です。誰が上げ、誰が見て、ログをいつまで残し、再学習に使うかを方針に書けます。"] },
          { heading: "最初に試す文書", paragraphs: ["社内SOP、マスクした請求書項目、標準見積テンプレート。マスクしていない顧客本人情報と銀行情報は次の段階です。"] },
        ],
        faqs: [
          { question: "プライベートAIは完全オフラインですか？", answer: "必ずそうとは限りません。プライベートクラウドはオンラインのまま、境界と権限を決めます。完全オフラインはオンプレで、運用する人が必要です。" },
          { question: "弁護士や会計士の代わりになりますか？", answer: "なりません。下書きと分類はAI、送信・記帳・署名は人が確認します。" },
        ],
      }),
      de: copy("de", {
        title: "Was ist private Unternehmens-KI im Vergleich zu ChatGPT?",
        excerpt: "Private KI ist eine Datengrenze: Unternehmens-Tenant, Private Cloud oder On-Prem. Dieser Text nennt keine Preise.",
        directAnswer:
          "Private Unternehmens-KI ist nicht einfach ein weiteres Chatfenster. Der Unterschied ist die Datengrenze: Gespräche und Dateien bleiben in einem Unternehmens-Tenant, einer Private Cloud oder Ihrem eigenen Maschinenraum. Öffentliches ChatGPT taugt für einen Piloten. Verträge, Rechnungen und Personalakten gehören auf einen privaten Weg mit Rechten, Protokollen und menschlicher Prüfung, bevor etwas hinausgeht.",
        sections: [
          { heading: "Drei Stufen", paragraphs: ["Enterprise-SaaS: eigener Tenant und Rechte in der Cloud des Anbieters. Private Cloud: Sie wählen Region und Netzgrenze. On-Prem: Modell und Daten bleiben auf Ihren Servern. In allen drei Fällen prüft ein Mensch die Ausgabe."] },
          { heading: "Unterschied zum öffentlichen Chat", paragraphs: ["Ein öffentliches Werkzeug ist für persönliche Produktivität gebaut. Private KI ist ein Firmenvermögen: wer hochlädt, wer lesen darf, wie lange Logs bleiben und ob Chats ein Modell trainieren, muss als Richtlinie stehen."] },
          { heading: "Dokumente für den ersten Piloten", paragraphs: ["Interne SOPs, maskierte Rechnungsfelder und Standard-Angebotsvorlagen. Unmaskierte Kundenidentität und Bankdaten kommen später."] },
        ],
        faqs: [
          { question: "Bedeutet private KI vollständig offline?", answer: "Nicht immer. Eine Private Cloud ist online; Sie setzen Grenze und Rechte. Vollständig offline ist On-Prem, und jemand muss es betreiben." },
          { question: "Ersetzt sie Anwalt oder Steuerberater?", answer: "Nein. Private KI entwirft und klassifiziert. Versand, Buchung und Unterschrift bleiben beim Menschen." },
        ],
      }),
    },
  },
  {
    slug: "which-private-ai-deployment-for-smes",
    date: "2026-10-14",
    order: 6,
    locales: {
      "zh-hk": copy("zh-hk", {
        title: "3 至 30 人公司應該點揀私人 AI 部署？",
        excerpt: "多數先由企業 SaaS 加權限開始。高度敏感先至上私有雲。本地部署要有 IT。",
        directAnswer:
          "3 至 30 人嘅公司，多數應先用企業 SaaS 加清楚權限，試一條流程。高度敏感、不能離開指定邊界嘅資料，先考慮私有雲。本地部署只適合你有人維護、而且資料不能離開機房嘅情況。成本由低至高通常係 SaaS、私有雲、本地；控制權就相反。",
        sections: [
          { heading: "點揀", paragraphs: ["問三條：資料可唔可以離開香港或你指定區域？你有冇人每週打理模型同備份？而家痛嘅係邊一條流程？答完先揀層次，唔好先買硬件。"] },
          { heading: "數據不出境同本地部署，對照係點？", paragraphs: ["企業 SaaS：成本較低，控制中等，適合已遮敏嘅客服草稿同內部 SOP。私有雲：成本中等，控制較高，適合合約同發票欄位。本地部署：成本高，控制最高，適合資料不能離場，而且要有 IT。數據主權係你能指定區域同匯出，唔係產品名。"] },
          { heading: "試點範圍", paragraphs: ["只揀一條流程，例如報價草稿或發票分類。30 至 60 日睇人覆核率同返工，再決定第二條。"] },
        ],
        faqs: [
          { question: "一開始就買伺服器划算嗎？", answer: "多數唔划算。未有人維護、未有一條量度得到嘅流程，硬件只會變成閒置。" },
          { question: "私有雲係咪一定喺香港？", answer: "唔一定。你要寫明區域。如果資料不能離開香港，就選香港區域或本地，而唔係只改個產品名。" },
        ],
      }),
      "zh-tw": copy("zh-tw", {
        title: "3 到 30 人的公司該怎麼選私人 AI 部署？",
        excerpt: "多數先從企業 SaaS 加權限開始。高度敏感才上私有雲。本地部署要有 IT。",
        directAnswer:
          "3 到 30 人的公司，多數應先用企業 SaaS 加清楚權限，試一條流程。高度敏感、不能離開指定邊界的資料，才考慮私有雲。本地部署只適合有人維護、而且資料不能離開機房的情況。成本由低到高通常是 SaaS、私有雲、本地；控制權相反。",
        sections: [
          { heading: "怎麼選", paragraphs: ["問三題：資料能不能離開香港或你指定的區域？有沒有人每週打理模型與備份？現在痛的是哪一條流程？答完再選層次。"] },
          { heading: "對照", paragraphs: ["企業 SaaS：成本較低，控制中等。私有雲：成本中等，控制較高。本地：成本高，控制最高，需要 IT。"] },
          { heading: "試點範圍", paragraphs: ["只選一條流程，例如報價草稿或發票分類。30 到 60 天看覆核率與返工，再決定下一條。"] },
        ],
        faqs: [
          { question: "一開始就買伺服器划算嗎？", answer: "多數不划算。沒有人維護、沒有可量測的流程，硬體只會閒置。" },
          { question: "私有雲一定在香港嗎？", answer: "不一定。要寫明區域。資料不能離開香港時，選香港區域或本地。" },
        ],
      }),
      en: copy("en", {
        title: "Which private AI deployment fits a 3- to 30-person firm?",
        excerpt: "Most teams start with enterprise SaaS plus permissions. Private cloud is for highly sensitive data. On-prem needs IT.",
        directAnswer:
          "A firm of 3 to 30 people should usually start with enterprise SaaS and clear permissions, on one workflow. Use a private cloud when the data is highly sensitive and must stay inside a named boundary. Choose on-prem only if someone can run it and the data cannot leave the machine room. Cost usually rises from SaaS to private cloud to on-prem; control rises in the same direction.",
        sections: [
          { heading: "How to choose", paragraphs: ["Ask three questions: may this data leave Hong Kong or your named region? Does someone maintain the model and backups every week? Which one workflow hurts now? Pick the level after the answers, not before the hardware quote."] },
          { heading: "A simple comparison", paragraphs: ["Enterprise SaaS: lower cost, medium control, good for masked support drafts and internal SOPs. Private cloud: mid cost, higher control, a fit for contract and invoice fields. On-prem: high cost, highest control, only with IT and data that cannot leave."] },
          { heading: "Pilot scope", paragraphs: ["One workflow only, such as quote drafts or invoice classification. After 30 to 60 days, look at human-review rate and rework before you add a second workflow."] },
        ],
        faqs: [
          { question: "Should we buy servers first?", answer: "Usually no. Without an owner and a measurable workflow, the hardware sits idle." },
          { question: "Is a private cloud automatically in Hong Kong?", answer: "No. Name the region. If data cannot leave Hong Kong, pick a Hong Kong region or on-prem, not a renamed product." },
        ],
      }),
      ja: copy("ja", {
        title: "3〜30人の会社はどのプライベートAI配置を選ぶか",
        excerpt: "多くは企業SaaSと権限から。高感度はプライベートクラウド。オンプレにはITが必要です。",
        directAnswer:
          "3〜30人の会社は、通常、企業SaaSと明確な権限で1業務から始めます。高感度で、指定した境界を出られないデータだけプライベートクラウドを検討します。オンプレは、運用する人がいて、データがマシン室を出られない場合だけです。費用は通常 SaaS、プライベートクラウド、オンプレの順に上がり、制御も同じ方向に上がります。",
        sections: [
          { heading: "選び方", paragraphs: ["3つ聞きます。データは香港または指定地域を出られるか。毎週モデルとバックアップを見る人はいるか。今痛い業務は1つか。答えてから段階を選びます。"] },
          { heading: "対照", paragraphs: ["企業SaaS：費用は低め、制御は中。プライベートクラウド：費用は中、制御は高。オンプレ：費用は高、制御は最高、ITが必要。"] },
          { heading: "試行の範囲", paragraphs: ["見積下書きや請求書分類など1業務だけ。30〜60日で人の確認率と手戻りを見てから次を足します。"] },
        ],
        faqs: [
          { question: "最初にサーバを買うべきですか？", answer: "多くは不要です。運用者と測れる業務がなければ、機材は遊休になります。" },
          { question: "プライベートクラウドは必ず香港ですか？", answer: "限りません。地域を明記します。香港を出られないなら香港リージョンかオンプレです。" },
        ],
      }),
      de: copy("de", {
        title: "Welche private-KI-Bereitstellung passt zu einer Firma mit 3 bis 30 Personen?",
        excerpt: "Die meisten starten mit Enterprise-SaaS und Rechten. Private Cloud für hochsensible Daten. On-Prem braucht IT.",
        directAnswer:
          "Eine Firma mit 3 bis 30 Personen startet meist mit Enterprise-SaaS und klaren Rechten, an einem Ablauf. Private Cloud, wenn die Daten hochsensibel sind und in einer genannten Grenze bleiben müssen. On-Prem nur, wenn jemand es betreibt und die Daten den Maschinenraum nicht verlassen dürfen. Die Kosten steigen meist von SaaS über Private Cloud zu On-Prem; die Kontrolle ebenso.",
        sections: [
          { heading: "Wie man wählt", paragraphs: ["Drei Fragen: dürfen die Daten Hongkong oder Ihre genannte Region verlassen? Pflegt jemand Modell und Backups jede Woche? Welcher eine Ablauf schmerzt jetzt? Danach die Stufe wählen, nicht vorher die Hardware."] },
          { heading: "Ein einfacher Vergleich", paragraphs: ["Enterprise-SaaS: niedrigere Kosten, mittlere Kontrolle. Private Cloud: mittlere Kosten, höhere Kontrolle. On-Prem: hohe Kosten, höchste Kontrolle, nur mit IT."] },
          { heading: "Pilotumfang", paragraphs: ["Nur ein Ablauf, etwa Angebotsentwürfe oder Rechnungsklassifikation. Nach 30 bis 60 Tagen Prüfrate und Nacharbeit ansehen, bevor ein zweiter Ablauf dazukommt."] },
        ],
        faqs: [
          { question: "Sollen wir zuerst Server kaufen?", answer: "Meist nein. Ohne Betreiber und messbaren Ablauf steht die Hardware still." },
          { question: "Liegt eine Private Cloud automatisch in Hongkong?", answer: "Nein. Nennen Sie die Region. Wenn Daten Hongkong nicht verlassen dürfen, Hongkong-Region oder On-Prem." },
        ],
      }),
    },
  },
  {
    slug: "ai-on-contracts-and-invoices",
    date: "2026-10-15",
    order: 7,
    locales: {
      "zh-hk": copy("zh-hk", {
        title: "合約同發票用 AI：最少資料、分層權限、人覆核",
        excerpt: "只抽取完成該步驟所需欄位。發送同入帳仍然要人確認。唔會把保留期寫成法律。",
        directAnswer:
          "合約同發票可以用 AI 起草、分類同抽出欄位，但每次只取完成該步驟所需嘅最少資料，並按角色分層。模型輸出唔等於已發送或已入帳。人要覆核先至出去。保留幾耐係你嘅營運同法律問題，呢篇唔會把任何日數寫成法例。",
        sections: [
          { heading: "最少資料", paragraphs: ["報價草稿可能只需項目、數量、單價。客戶身份證、銀行戶口、全份合約正文，唔好默認扔入同一個提示。做完就停，唔好順手摘要成個檔案。"] },
          { heading: "分層權限", paragraphs: ["前線睇到遮敏摘要。財務先睇到金額同發票號。管理層先睇到完整合約。日誌記低邊個開過，而唔係人人同一個管理員帳號。"] },
          { heading: "人覆核", paragraphs: ["AI 可以標出漏項同異常金額。寄出、簽名、入帳、改信用額，仍然係人。AccountXP 這一類流程就係把報價到收款串起，而唔係取代覆核。"] },
        ],
        faqs: [
          { question: "發票要保留幾多日？", answer: "呢篇唔提供法定保留期。稅務同商業紀錄要求視你嘅情況而定，問會計師或律師，唔好用一篇網誌當期限。" },
          { question: "AI 標錯金額點算？", answer: "未覆核就唔入帳。異常要回到原檔，而唔係叫模型再估一次當事實。" },
        ],
      }),
      "zh-tw": copy("zh-tw", {
        title: "合約與發票用 AI：最少資料、分層權限、人覆核",
        excerpt: "只抽取完成該步驟所需欄位。寄出與入帳仍要人確認。本文不把保留期寫成法律。",
        directAnswer:
          "合約與發票可以用 AI 起草、分類與抽出欄位，但每次只取完成該步驟所需的最少資料，並依角色分層。模型輸出不等於已寄出或已入帳。人要覆核才出去。保留多久是你的營運與法律問題，本文不會把任何天數寫成法律。",
        sections: [
          { heading: "最少資料", paragraphs: ["報價草稿可能只需項目、數量、單價。客戶身分證、銀行帳戶、整份合約正文，不要預設丟進同一個提示。"] },
          { heading: "分層權限", paragraphs: ["前線看到遮罩摘要。財務才看到金額與發票號。管理層才看到完整合約。日誌記錄誰開過。"] },
          { heading: "人覆核", paragraphs: ["AI 可以標出漏項與異常金額。寄出、簽名、入帳仍是人。AccountXP 這類流程是把報價到收款串起來，不是取代覆核。"] },
        ],
        faqs: [
          { question: "發票要保留多少天？", answer: "本文不提供法定保留期。請問會計師或律師，不要用一篇網誌當期限。" },
          { question: "AI 標錯金額怎麼辦？", answer: "未覆核就不入帳。異常要回到原檔，而不是再讓模型猜一次當成事實。" },
        ],
      }),
      en: copy("en", {
        title: "AI on contracts and invoices: minimum data, layered access, human review",
        excerpt: "Extract only the fields that step needs. Sending and booking still need a person. This article does not state a retention period as law.",
        directAnswer:
          "AI can draft, classify, and extract fields from contracts and invoices, but each step should take only the minimum data that step needs, split by role. Model output is not a sent document or a booked entry. A person reviews it before it leaves. How long you keep records is an operational and legal question. This article does not state any number of days as law.",
        sections: [
          { heading: "Minimum data", paragraphs: ["A quote draft may need only line items, quantity, and price. Do not drop an ID number, bank account, and the full contract into the same prompt by default. Stop when the step is done."] },
          { heading: "Layered access", paragraphs: ["Front line sees a masked summary. Finance sees amounts and invoice numbers. Leadership sees the full contract. Logs should show who opened a file, not one shared admin login for everyone."] },
          { heading: "Human review", paragraphs: ["AI can flag missing items and odd amounts. Sending, signing, and booking stay with a person. A flow such as AccountXP connects quote to cash. It does not replace that review."] },
        ],
        faqs: [
          { question: "How many days must we keep an invoice?", answer: "This article does not give a statutory retention period. Ask your accountant or lawyer. Do not treat a blog post as the deadline." },
          { question: "What if the model misreads an amount?", answer: "Do not book it until a person checks the source file. Do not ask the model to guess again and treat that as fact." },
        ],
      }),
      ja: copy("ja", {
        title: "契約と請求書へのAI：最小データ、層別権限、人の確認",
        excerpt: "その手順に必要な項目だけを取り出します。送信と記帳は人が確認します。保有期間を法律としては書きません。",
        directAnswer:
          "AIは契約と請求書の下書き、分類、項目抽出ができます。ただし各手順はその手順に必要な最小データだけを、役割ごとに分けて取ります。モデルの出力は送信済みでも記帳済みでもありません。人が確認してから出します。どれだけ保管するかは運用と法律の問題です。本稿は日数を法律として書きません。",
        sections: [
          { heading: "最小データ", paragraphs: ["見積下書きに必要なのは品目、数量、単価だけのことがあります。身分証、口座、契約全文を同じプロンプトに入れないでください。"] },
          { heading: "層別の権限", paragraphs: ["現場はマスクした要約。経理は金額と請求番号。経営は契約全文。ログは誰が開いたかを残します。"] },
          { heading: "人の確認", paragraphs: ["AIは欠落と異常金額を印づけできます。送信、署名、記帳は人です。AccountXPのような流れは見積から入金までをつなぎ、確認の代わりにはなりません。"] },
        ],
        faqs: [
          { question: "請求書は何日保管すべきですか？", answer: "本稿は法定の保有期間を示しません。会計士または弁護士に確認してください。" },
          { question: "金額を読み間違えたら？", answer: "人が原票を確認するまで記帳しません。モデルにもう一度推測させて事実にしないでください。" },
        ],
      }),
      de: copy("de", {
        title: "KI für Verträge und Rechnungen: minimale Daten, abgestufte Rechte, menschliche Prüfung",
        excerpt: "Nur die Felder entnehmen, die der Schritt braucht. Versand und Buchung prüft ein Mensch. Keine Aufbewahrungsfrist als Gesetz.",
        directAnswer:
          "KI kann Verträge und Rechnungen entwerfen, klassifizieren und Felder ziehen. Jeder Schritt nimmt nur die minimalen Daten, die er braucht, getrennt nach Rolle. Die Ausgabe des Modells ist weder ein versandtes Dokument noch eine Buchung. Ein Mensch prüft, bevor etwas hinausgeht. Wie lange Sie aufbewahren, ist eine Betriebs- und Rechtsfrage. Dieser Text nennt keine Frist als Gesetz.",
        sections: [
          { heading: "Minimale Daten", paragraphs: ["Ein Angebotsentwurf braucht oft nur Position, Menge und Preis. Ausweis, Bankkonto und den vollen Vertrag nicht standardmäßig in denselben Prompt legen."] },
          { heading: "Abgestufte Rechte", paragraphs: ["Die Front sieht eine maskierte Zusammenfassung. Finanzen sehen Beträge und Rechnungsnummern. Die Leitung sieht den vollen Vertrag. Logs zeigen, wer geöffnet hat."] },
          { heading: "Menschliche Prüfung", paragraphs: ["KI kann fehlende Posten und auffällige Beträge markieren. Versand, Unterschrift und Buchung bleiben beim Menschen. Ein Ablauf wie AccountXP verbindet Angebot und Zahlung. Er ersetzt die Prüfung nicht."] },
        ],
        faqs: [
          { question: "Wie viele Tage müssen wir eine Rechnung aufbewahren?", answer: "Dieser Text nennt keine gesetzliche Frist. Fragen Sie Ihre Steuerberatung oder Kanzlei." },
          { question: "Was, wenn das Modell einen Betrag falsch liest?", answer: "Nicht buchen, bis ein Mensch die Quelldatei prüft. Das Modell nicht noch einmal raten lassen und das als Tatsache nehmen." },
        ],
      }),
    },
  },
  {
    slug: "whatsapp-ai-crm-direct-marketing",
    date: "2026-10-16",
    order: 8,
    locales: {
      "zh-hk": copy("zh-hk", {
        title: "WhatsApp AI 客服同 CRM：個人資料同直接促銷",
        excerpt: "回覆查詢同主動促銷係兩件事。促銷要有同意同拒收方法。",
        directAnswer:
          "用 AI 協助回覆客戶自己發起嘅 WhatsApp 查詢，同向佢推銷新產品，係兩件事。回覆要守收集目的同保安。直接促銷要有同意，並提供拒收方法。把對話原封不動倒入 CRM 再群發，就係新用途，唔可以當客戶問過價就等於同意接收所有推廣。",
        sections: [
          { heading: "查詢同促銷分開", paragraphs: ["客戶問運費，AI 可以起草回覆，人先發送。之後推新課程、新折扣，就係直接促銷。名單、同意紀錄、拒收，要另簿記載。"] },
          { heading: "CRM 入面留咩", paragraphs: ["留階段、負責人、下一步，同必要標籤。唔好把身份證、完整地址默認同步去每一個銷售帳號。對話日誌要有保留規則，但呢篇唔把日數寫成法律。"] },
          { heading: "AI 草稿", paragraphs: ["草稿可以加快回覆。發送掣仍然係人。模型唔應該自己加一句「順便介紹新產品」，除非呢個客人已有促銷同意。"] },
        ],
        faqs: [
          { question: "客人 WhatsApp 過我哋，可唔可以之後群發？", answer: "問過一次唔等於同意所有直接促銷。促銷要有同意同拒收。具體字眼請對照公署直接促銷指引。" },
          { question: "AI 客服可唔可以自動發送？", answer: "高風險內容（價格、承諾、促銷）應該人確認先發送。自動發送只適合你已寫死、而且不含新促銷嘅短回覆。" },
        ],
      }),
      "zh-tw": copy("zh-tw", {
        title: "WhatsApp AI 客服與 CRM：個人資料與直接促銷",
        excerpt: "回覆查詢與主動促銷是兩件事。促銷要有同意與拒收方法。",
        directAnswer:
          "用 AI 協助回覆客戶自己發起的 WhatsApp 查詢，與向他推銷新產品，是兩件事。回覆要守收集目的與保安。直接促銷要有同意，並提供拒收方法。把對話原封不動倒進 CRM 再群發，就是新用途，不能把問過價當成同意接收所有推廣。",
        sections: [
          { heading: "查詢與促銷分開", paragraphs: ["客戶問運費，AI 可以起草回覆，人先發送。之後推新課程或折扣就是直接促銷。名單、同意紀錄、拒收要分開記載。"] },
          { heading: "CRM 裡留什麼", paragraphs: ["留階段、負責人、下一步與必要標籤。不要把身分證與完整地址默認同步給每個業務帳號。"] },
          { heading: "AI 草稿", paragraphs: ["草稿可以加快回覆。發送鍵仍是人。模型不應自己加一句新產品介紹，除非這位客戶已有促銷同意。"] },
        ],
        faqs: [
          { question: "客戶 WhatsApp 過我們，之後可以群發嗎？", answer: "問過一次不等於同意所有直接促銷。促銷要有同意與拒收。請對照公署直接促銷指引。" },
          { question: "AI 客服可以自動發送嗎？", answer: "價格、承諾、促銷應由人確認後再送。自動發送只適合已寫死、且不含新促銷的短回覆。" },
        ],
      }),
      en: copy("en", {
        title: "WhatsApp AI support and CRM: personal data and direct marketing",
        excerpt: "Answering an enquiry and promoting a new offer are different. Promotion needs consent and an opt-out.",
        directAnswer:
          "Using AI to help answer a WhatsApp enquiry the customer started is not the same as promoting a new product to them. The reply must still respect purpose and security. Direct marketing needs consent and a way to opt out. Pouring the whole chat into a CRM and broadcasting is a new purpose. A price question is not consent to every future promotion.",
        sections: [
          { heading: "Separate the enquiry from the promotion", paragraphs: ["If a customer asks about shipping, AI may draft the reply and a person sends it. A later push for a new course or discount is direct marketing. Keep the list, the consent record, and the opt-out apart from the support thread."] },
          { heading: "What belongs in the CRM", paragraphs: ["Keep stage, owner, next step, and the tags you will act on. Do not sync ID numbers and full addresses to every sales login by default. Have a retention rule for chat logs. This article does not state a number of days as law."] },
          { heading: "AI drafts", paragraphs: ["A draft can speed the reply. A person still presses send. The model should not add “here is a new product” unless that customer has already consented to promotion."] },
        ],
        faqs: [
          { question: "They WhatsApp’d us once. Can we broadcast later?", answer: "One enquiry is not consent to all direct marketing. Promotion needs consent and an opt-out. Check the PCPD’s direct-marketing guidance for the wording." },
          { question: "Can the AI agent send by itself?", answer: "Price, promises, and promotions should wait for a person. Auto-send only fits a short reply you have already written, with no new promotion inside it." },
        ],
      }),
      ja: copy("ja", {
        title: "WhatsAppのAI応対とCRM：個人情報とダイレクトマーケティング",
        excerpt: "問い合わせへの返信と販促は別です。販促には同意と拒否の手段が必要です。",
        directAnswer:
          "顧客が始めたWhatsAppの問い合わせにAIで返信することと、新商品を売り込むことは別です。返信は目的と保安を守ります。ダイレクトマーケティングには同意と拒否の手段が必要です。会話をそのままCRMに流して一斉送信するのは新しい目的です。一度値段を聞いたことは、すべての販促への同意ではありません。",
        sections: [
          { heading: "問い合わせと販促を分ける", paragraphs: ["送料の質問にはAIが下書きし、人が送ります。その後の新コースや割引はダイレクトマーケティングです。名簿、同意、拒否は応対とは別に記録します。"] },
          { heading: "CRMに残すもの", paragraphs: ["段階、担当、次の行動、使うタグを残します。身分証と全文の住所を全部の営業アカウントへ同期しないでください。"] },
          { heading: "AIの下書き", paragraphs: ["下書きは返信を速くします。送信は人です。その顧客に販促の同意がなければ、モデルが新商品の一文を足してはいけません。"] },
        ],
        faqs: [
          { question: "一度WhatsAppした相手に一斉送信できますか？", answer: "一度の問い合わせはすべてのダイレクトマーケティングへの同意ではありません。PCPDの指針で文言を確認してください。" },
          { question: "AI応対は自動送信できますか？", answer: "価格、約束、販促は人が確認してから送ります。自動送信は、新しい販促を含まない決まった短文だけです。" },
        ],
      }),
      de: copy("de", {
        title: "WhatsApp-KI-Service und CRM: personenbezogene Daten und Direktwerbung",
        excerpt: "Eine Anfrage zu beantworten und ein neues Angebot zu senden, ist nicht dasselbe. Werbung braucht Einwilligung und Widerspruch.",
        directAnswer:
          "KI zu nutzen, um eine vom Kunden begonnene WhatsApp-Anfrage zu beantworten, ist nicht dasselbe, wie ihm ein neues Produkt anzubieten. Die Antwort muss Zweck und Sicherheit beachten. Direktwerbung braucht Einwilligung und eine Widerspruchsmöglichkeit. Den ganzen Chat ins CRM zu kippen und zu versenden, ist ein neuer Zweck. Eine Preisfrage ist keine Einwilligung in jede künftige Werbung.",
        sections: [
          { heading: "Anfrage und Werbung trennen", paragraphs: ["Fragt der Kunde nach Versandkosten, darf KI den Entwurf schreiben und ein Mensch senden. Ein späterer Hinweis auf einen neuen Kurs oder Rabatt ist Direktwerbung. Liste, Einwilligung und Widerspruch getrennt vom Support führen."] },
          { heading: "Was ins CRM gehört", paragraphs: ["Stufe, Verantwortliche, nächsten Schritt und die Tags, auf die Sie handeln. Ausweis und volle Adresse nicht standardmäßig an jedes Verkaufslogin synchronisieren."] },
          { heading: "KI-Entwürfe", paragraphs: ["Ein Entwurf beschleunigt die Antwort. Ein Mensch drückt Senden. Das Modell soll keinen neuen Produkthinweis anfügen, wenn keine Werbeeinwilligung vorliegt."] },
        ],
        faqs: [
          { question: "Sie haben uns einmal geschrieben. Dürfen wir später broadcasten?", answer: "Eine Anfrage ist keine Einwilligung in alle Direktwerbung. Prüfen Sie die PCPD-Hinweise zur Direktwerbung." },
          { question: "Darf der KI-Agent selbst senden?", answer: "Preis, Versprechen und Werbung warten auf einen Menschen. Auto-Versand nur für einen kurzen, bereits festgelegten Text ohne neue Werbung." },
        ],
      }),
    },
  },
  {
    slug: "pcpd-ai-model-framework-sme-checklist",
    date: "2026-10-17",
    order: 9,
    locales: {
      "zh-hk": copy("zh-hk", {
        title: "PCPD AI 個人資料保障模範框架：中小企 Checklist",
        excerpt: "用一頁清單對照管治、風險、人覆核同透明度。引用框架前核對公署正式名稱同日期。",
        directAnswer:
          "私隱專員公署曾發布人工智能個人資料保障方面嘅模範框架，方便機構自評。中小企唔使做成厚報告：一頁清單覆蓋管治負責人、資料清單、風險、人覆核、透明度同事故處理就夠起步。引用框架名稱同日期前，請到公署網站核對正式文本。",
        sections: [
          { heading: "一頁清單", paragraphs: ["1 邊個負責 AI 同個人資料。2 邊啲流程用 AI、碰唔碰到個人資料。3 供應商同數據會唔會離開香港。4 邊個覆核輸出。5 點告知客戶同事。6 出錯或外洩點上報。"] },
          { heading: "點用", paragraphs: ["每季用十五分鐘剔一次。未做到嘅項先寫負責人同日期，唔好一次過買齊工具。框架係自評，唔係證書。"] },
          { heading: "同聽診點接", paragraphs: ["業務聽診先聽一條真實流程，再對住呢張清單睇邊項未做。工具係跟住缺口選，而唔係先選模型。"] },
        ],
        faqs: [
          { question: "做完清單係咪就合規？", answer: "唔係。清單係起步。具體轉移、促銷、保留期仍然要按你嘅情況同最新指引判斷。" },
          { question: "框架係咪強制？", answer: "模範框架係指引性質。唔好寫成法例已經強制採用某一份文本。採用前核對公署最新版本。" },
        ],
      }),
      "zh-tw": copy("zh-tw", {
        title: "PCPD AI 個人資料保障模範框架：中小企業 Checklist",
        excerpt: "用一頁清單對照治理、風險、人覆核與透明度。引用前核對公署正式名稱與日期。",
        directAnswer:
          "私隱專員公署曾發布人工智能個人資料保障方面的模範框架，方便機構自評。中小企業不必做成厚報告：一頁清單涵蓋治理負責人、資料清單、風險、人覆核、透明度與事故處理即可起步。引用名稱與日期前，請到公署網站核對正式文本。",
        sections: [
          { heading: "一頁清單", paragraphs: ["1 誰負責 AI 與個人資料。2 哪些流程用 AI、是否碰到個人資料。3 供應商與資料會不會離開香港。4 誰覆核輸出。5 如何告知客戶與同事。6 出錯或外洩如何上報。"] },
          { heading: "怎麼用", paragraphs: ["每季用十五分鐘勾一次。未完成的項目先寫負責人與日期。框架是自評，不是證書。"] },
          { heading: "與診斷怎麼接", paragraphs: ["業務診斷先聽一條真實流程，再對這張清單看哪一項未做。工具跟著缺口選。"] },
        ],
        faqs: [
          { question: "做完清單就合規嗎？", answer: "不是。清單是起步。具體轉移、促銷、保留期仍要按你的情況與最新指引判斷。" },
          { question: "框架是強制的嗎？", answer: "模範框架屬指引。不要寫成法例已強制採用某一文本。採用前核對公署最新版本。" },
        ],
      }),
      en: copy("en", {
        title: "PCPD AI personal-data model framework: an SME checklist",
        excerpt: "A one-page check for governance, risk, human review, and openness. Verify the PCPD title and date before you cite the framework.",
        directAnswer:
          "The PCPD has published a model framework to help organisations self-assess AI and personal data. An SME does not need a thick report. A one-page checklist is enough to start: an owner, a data list, risk, human review, openness, and incident handling. Before you cite the framework’s title or date, verify the official text on the PCPD site.",
        sections: [
          { heading: "The one-page list", paragraphs: ["1 Who owns AI and personal data. 2 Which workflows use AI and whether they touch personal data. 3 Whether vendors or data leave Hong Kong. 4 Who reviews output. 5 How customers and staff are told. 6 How errors and breaches are escalated."] },
          { heading: "How to use it", paragraphs: ["Tick it for fifteen minutes once a quarter. For each gap, name an owner and a date. The framework is a self-check, not a certificate."] },
          { heading: "How it meets a diagnosis", paragraphs: ["A business diagnosis listens to one real workflow, then marks which line on this list is still open. Tools follow the gap."] },
        ],
        faqs: [
          { question: "Does finishing the checklist mean we comply?", answer: "No. It is a start. Transfers, marketing, and retention still depend on your facts and the latest guidance." },
          { question: "Is the framework mandatory?", answer: "A model framework is guidance. Do not describe a particular text as legally compulsory. Check the PCPD’s latest version before you adopt it." },
        ],
      }),
      ja: copy("ja", {
        title: "PCPDのAI個人情報保護モデル枠組み：中小企業チェックリスト",
        excerpt: "ガバナンス、リスク、人の確認、透明性を1枚で照合します。引用前に公署の正式名称と日付を確認してください。",
        directAnswer:
          "PCPDは、AIと個人情報の自己評価に使うモデル枠組みを公表しています。中小企業に厚い報告書は不要です。責任者、データ一覧、リスク、人の確認、透明性、事故対応の1枚で始められます。名称や日付を引用する前に、公署サイトの正式テキストを確認してください。",
        sections: [
          { heading: "1枚の項目", paragraphs: ["1 AIと個人情報の責任者。2 どの業務がAIを使い、個人情報に触れるか。3 ベンダーやデータが香港を出るか。4 誰が出力を確認するか。5 顧客と従業員への説明。6 誤りや漏えいの上申。"] },
          { heading: "使い方", paragraphs: ["四半期に15分で印を付けます。未了には担当と日付を書きます。枠組みは自己評価であり、証明書ではありません。"] },
          { heading: "診断とのつなぎ", paragraphs: ["業務診断は1つの実業務を聞き、この一覧のどこが未了かを見ます。ツールは隙間の後です。"] },
        ],
        faqs: [
          { question: "一覧を終えたら適合ですか？", answer: "いいえ。始まりです。移転、販促、保有は事実と最新指針で判断します。" },
          { question: "枠組みは強制ですか？", answer: "モデル枠組みは指針です。特定の文本が法律で強制だと書かないでください。最新版を確認してください。" },
        ],
      }),
      de: copy("de", {
        title: "PCPD-Modellrahmen für KI und personenbezogene Daten: Checkliste für KMU",
        excerpt: "Eine Seite für Steuerung, Risiko, menschliche Prüfung und Transparenz. Titel und Datum beim PCPD prüfen, bevor Sie den Rahmen zitieren.",
        directAnswer:
          "Der PCPD hat einen Modellrahmen veröffentlicht, mit dem Organisationen KI und personenbezogene Daten selbst prüfen. Ein KMU braucht keinen dicken Bericht. Eine Seite reicht zum Start: Verantwortliche, Datenliste, Risiko, menschliche Prüfung, Transparenz und Vorfälle. Prüfen Sie Titel und Datum auf der PCPD-Website, bevor Sie den Rahmen zitieren.",
        sections: [
          { heading: "Die eine Seite", paragraphs: ["1 Wer KI und personenbezogene Daten verantwortet. 2 Welche Abläufe KI nutzen und ob sie personenbezogene Daten berühren. 3 Ob Anbieter oder Daten Hongkong verlassen. 4 Wer die Ausgabe prüft. 5 Wie Kunden und Personal informiert werden. 6 Wie Fehler und Pannen eskaliert werden."] },
          { heading: "Wie man sie nutzt", paragraphs: ["Einmal im Quartal fünfzehn Minuten abhaken. Für jede Lücke eine Person und ein Datum. Der Rahmen ist eine Selbstprüfung, kein Zertifikat."] },
          { heading: "Wie das zur Diagnose passt", paragraphs: ["Eine Geschäftsdiagnose hört einen echten Ablauf und markiert, welche Zeile noch offen ist. Werkzeuge folgen der Lücke."] },
        ],
        faqs: [
          { question: "Ist die Liste am Ende schon Compliance?", answer: "Nein. Sie ist ein Start. Transfer, Werbung und Aufbewahrung hängen von Ihren Fakten und der aktuellen Guidance ab." },
          { question: "Ist der Rahmen verpflichtend?", answer: "Ein Modellrahmen ist Guidance. Schreiben Sie keinen bestimmten Text als gesetzlich erzwungen. Prüfen Sie die aktuelle PCPD-Fassung." },
        ],
      }),
    },
  },
  {
    slug: "hong-kong-ai-privacy-local-faq",
    date: "2026-10-18",
    order: 10,
    locales: {
      "zh-hk": copy("zh-hk", {
        title: "香港企業 AI 私隱在地 FAQ",
        excerpt: "中小企最常問嘅 AI 同個人資料問題，逐條短答。全部只係一般資訊。",
        directAnswer:
          "香港企業用 AI 碰到個人資料時，最常見問題可以收成幾條短答：PDPO 冇禁止 AI；細公司唔免；公開聊天工具要有紅線；第 33 條截至本文未生效但跨境仍然要管；促銷要有同意；私人 AI 係數據邊界而唔係自動合規。以下每條都只係一般資訊，唔係法律意見。",
        sections: [
          { heading: "點用呢頁", paragraphs: ["每條答案都指向本系列其他篇。如果你嘅流程同時有合約、WhatsApp 同海外 API，唔好只睇一條就當完成。預約聽診時帶住一條真實例子。"] },
          { heading: "仍然要核對嘅位置", paragraphs: ["外洩通報係咪變為強制、第 33 條有冇生效、公署框架同僱員指引嘅正式名稱同日期，都要喺依賴前再睇公署同憲報。呢篇故意唔把呢啲狀態寫死。"] },
        ],
        faqs: [
          { question: "PDPO 禁唔禁 AI？", answer: "唔禁。碰到可識別個人資料就要守六項原則。" },
          { question: "三個人嘅公司使唔使理？", answer: "要。控制個人資料就適用，唔係睇人頭。" },
          { question: "員工用自己 ChatGPT 帳號做公司嘢，公司有冇事？", answer: "公司作為資料使用者仍然可能要負責。所以要有一頁紙政策同紅區。" },
          { question: "遮咗姓名可唔可以貼合約？", answer: "如果電話、地址、合約編號仍然識認到人，就未夠。" },
          { question: "第 33 條生效未？", answer: "截至本文撰寫未生效。狀態請再核對，唔好寫入客戶保證。" },
          { question: "用海外 API 算唔算跨境？", answer: "資料喺香港以外處理，就當跨境，用合約同權限補上。" },
          { question: "大灣區標準合同包唔包澳門？", answer: "內地與香港嗰份唔包澳門。" },
          { question: "私人 AI 係咪一定合法？", answer: "唔係。邊界清楚只係起步，用途、保安、透明度仍然要做。" },
          { question: "可唔可以將客服對話拿去訓練模型？", answer: "除非當初收集目的同透明度涵蓋再訓練，否則係新用途。預設唔好。" },
          { question: "WhatsApp 問過價可唔可以之後促銷？", answer: "唔可以自動當有同意。促銷要另有同意同拒收。" },
          { question: "AI 可唔可以自動改信用額或發送報價？", answer: "唔應該。金額、承諾、簽名要人覆核。" },
          { question: "發票要保留幾耐？", answer: "呢篇唔提供法定日數。問會計師或律師。" },
        ],
      }),
      "zh-tw": copy("zh-tw", {
        title: "香港企業 AI 私隱在地 FAQ",
        excerpt: "中小企業最常問的 AI 與個人資料問題，逐條短答。全部只是一般資訊。",
        directAnswer:
          "香港企業用 AI 碰到個人資料時，最常見的問題可以收成幾條短答：PDPO 沒有禁止 AI；小公司不免；公開聊天工具要有紅線；第 33 條截至本文未生效但跨境仍然要管；促銷要有同意；私人 AI 是資料邊界而不是自動合規。以下每條都只是一般資訊，不是法律意見。",
        sections: [
          { heading: "怎麼用這一頁", paragraphs: ["每條答案都指向本系列其他篇。如果流程同時有合約、WhatsApp 與海外 API，不要只看一條就當成完成。"] },
          { heading: "仍要核對的位置", paragraphs: ["外洩通報是否改為強制、第 33 條是否生效、公署框架與僱員指引的正式名稱與日期，都要在依賴前再看公署與憲報。"] },
        ],
        faqs: [
          { question: "PDPO 禁止 AI 嗎？", answer: "不禁止。碰到可識別個人資料就要守六項原則。" },
          { question: "三個人的公司需要管嗎？", answer: "需要。控制個人資料就適用，不是看人數。" },
          { question: "員工用自己的 ChatGPT 做公司的事，公司有責任嗎？", answer: "公司作為資料使用者仍可能要負責。所以要有一頁政策與紅區。" },
          { question: "遮掉姓名就可以貼合約嗎？", answer: "如果電話、地址、合約編號仍能識別到人，就還不夠。" },
          { question: "第 33 條生效了嗎？", answer: "截至本文撰寫尚未生效。狀態請再核對，不要寫進客戶保證。" },
          { question: "使用海外 API 算跨境嗎？", answer: "資料在香港以外處理，就視為跨境，用合約與權限補上。" },
          { question: "大灣區標準合同包含澳門嗎？", answer: "內地與香港那一份不包含澳門。" },
          { question: "私人 AI 就一定合法嗎？", answer: "不是。邊界清楚只是起步，用途、保安、透明度仍然要做。" },
          { question: "可以把客服對話拿去訓練模型嗎？", answer: "除非當初的收集目的與透明度涵蓋再訓練，否則是新用途。預設不要。" },
          { question: "WhatsApp 問過價之後可以促銷嗎？", answer: "不能自動當成有同意。促銷要另有同意與拒收。" },
          { question: "AI 可以自動改信用額或發送報價嗎？", answer: "不應該。金額、承諾、簽名要人覆核。" },
          { question: "發票要保留多久？", answer: "本文不提供法定天數。請問會計師或律師。" },
        ],
      }),
      en: copy("en", {
        title: "Hong Kong enterprise AI privacy: local FAQ",
        excerpt: "Short answers to the questions Hong Kong SMEs ask most about AI and personal data. General information only.",
        directAnswer:
          "When a Hong Kong firm’s AI touches personal data, the frequent questions compress to a few answers: the PDPO does not ban AI; small firms are not exempt; public chat tools need a red zone; section 33 is not in force as of this article, but cross-border processing still needs control; promotion needs consent; private AI is a data boundary, not automatic compliance. Every answer below is general information, not legal advice.",
        sections: [
          { heading: "How to use this page", paragraphs: ["Each answer points at another post in this series. If one workflow mixes contracts, WhatsApp, and an overseas API, do not stop after a single line. Bring one real example to a diagnosis."] },
          { heading: "What you should recheck", paragraphs: ["Whether breach notification has become mandatory, whether section 33 is in force, and the official title and date of PCPD framework and staff guidance should be rechecked against the PCPD and the Gazette before you rely on them. This page deliberately does not freeze those statuses."] },
        ],
        faqs: [
          { question: "Does the PDPO ban AI?", answer: "No. If the workflow touches identifiable personal data, the six principles apply." },
          { question: "Does a three-person firm have to care?", answer: "Yes. The test is whether you control personal data, not headcount." },
          { question: "If staff use a personal ChatGPT account for company work, is the company exposed?", answer: "The company, as data user, may still be responsible. That is why you need a one-page policy and a red zone." },
          { question: "Can we paste a contract after removing the name?", answer: "Not if a phone number, address, or contract ID still identifies the person." },
          { question: "Is section 33 in force?", answer: "Not as of this article. Recheck before you put the status into a client promise." },
          { question: "Is an overseas API a cross-border transfer?", answer: "If the data is processed outside Hong Kong, treat it as one and cover it by contract and permissions." },
          { question: "Does the GBA standard contract cover Macao?", answer: "The mainland–Hong Kong text does not." },
          { question: "Is private AI automatically lawful?", answer: "No. A clear boundary is a start. Purpose, security, and openness still have to be done." },
          { question: "Can we train a model on support chats?", answer: "Not by default. Retraining is a new purpose unless the original notice covered it." },
          { question: "They asked a price on WhatsApp. Can we promote later?", answer: "Do not treat that as consent. Promotion needs its own consent and an opt-out." },
          { question: "Can AI change a credit limit or send a quote by itself?", answer: "It should not. Amounts, promises, and signatures need a person." },
          { question: "How long must we keep an invoice?", answer: "This article states no statutory number of days. Ask your accountant or lawyer." },
        ],
      }),
      ja: copy("ja", {
        title: "香港企業のAIプライバシー現地FAQ",
        excerpt: "中小企業が最も聞く、AIと個人情報の質問への短い答えです。すべて一般情報です。",
        directAnswer:
          "香港企業のAIが個人情報に触れるとき、よくある質問は短く答えられます。PDPOはAIを禁止しない。小規模でも免除されない。公開チャットには赤線が要る。第33条は本稿執筆時点で未施行だが越境は管理する。販促には同意が要る。プライベートAIはデータの境界であり、自動的な適合ではない。以下はすべて一般情報であり、法律意見ではありません。",
        sections: [
          { heading: "このページの使い方", paragraphs: ["各回答はシリーズの他の記事を指します。契約、WhatsApp、海外APIが同じ業務にあるなら、1行で終えないでください。診断には実例を1つ持ってきます。"] },
          { heading: "再確認すべき点", paragraphs: ["漏えい通知が強制になったか、第33条が施行されたか、PCPDの枠組みと従業員指針の正式名称と日付は、依拠する前に公署と憲報で再確認します。このページはそれらを固定しません。"] },
        ],
        faqs: [
          { question: "PDPOはAIを禁止しますか？", answer: "しません。識別できる個人情報に触れるなら6原則が適用されます。" },
          { question: "3人の会社でも対象ですか？", answer: "はい。見るのは人数ではなく、個人情報を管理しているかです。" },
          { question: "従業員が個人のChatGPTで会社の仕事をすると、会社に責任はありますか？", answer: "資料使用者としての会社が責任を負うことがあります。だから1枚の方針と赤区が必要です。" },
          { question: "名前を消せば契約を貼れますか？", answer: "電話、住所、契約番号で人を識別できるなら不十分です。" },
          { question: "第33条は施行されていますか？", answer: "本稿執筆時点では未施行です。顧客向けの約束に書く前に再確認してください。" },
          { question: "海外APIは越境ですか？", answer: "香港外で処理されるなら越境として、契約と権限で補います。" },
          { question: "大湾区標準契約はマカオを含みますか？", answer: "内地・香港の文本は含みません。" },
          { question: "プライベートAIなら適法ですか？", answer: "自動的にはなりません。境界は始まりで、目的、保安、透明性は別です。" },
          { question: "応対の会話でモデルを再学習できますか？", answer: "当初の目的と説明が再学習を含まない限り、新しい目的です。既定ではしません。" },
          { question: "WhatsAppで値段を聞いた相手に後から販促できますか？", answer: "同意とはみなせません。販促には別の同意と拒否が必要です。" },
          { question: "AIが与信枠や見積を自動で送ってよいですか？", answer: "よくありません。金額、約束、署名は人が確認します。" },
          { question: "請求書はどれだけ保管しますか？", answer: "本稿は法定の日数を示しません。会計士または弁護士に確認してください。" },
        ],
      }),
      de: copy("de", {
        title: "FAQ: KI und Datenschutz für Unternehmen in Hongkong",
        excerpt: "Kurze Antworten auf die Fragen, die Hongkonger KMU zu KI und personenbezogenen Daten am häufigsten stellen. Nur allgemeine Information.",
        directAnswer:
          "Wenn KI eines Hongkonger Unternehmens personenbezogene Daten berührt, lassen sich die häufigen Fragen kurz beantworten: Die PDPO verbietet KI nicht. Kleine Firmen sind nicht ausgenommen. Öffentliche Chat-Tools brauchen eine rote Zone. § 33 ist zum Zeitpunkt dieses Textes nicht in Kraft, grenzüberschreitende Verarbeitung braucht trotzdem Kontrolle. Werbung braucht Einwilligung. Private KI ist eine Datengrenze, keine automatische Compliance. Jede Antwort ist allgemeine Information, keine Rechtsberatung.",
        sections: [
          { heading: "Wie man diese Seite nutzt", paragraphs: ["Jede Antwort zeigt auf einen anderen Beitrag der Serie. Wenn ein Ablauf Verträge, WhatsApp und eine ausländische API mischt, hören Sie nicht nach einer Zeile auf. Bringen Sie ein echtes Beispiel in die Diagnose."] },
          { heading: "Was Sie erneut prüfen sollten", paragraphs: ["Ob eine Meldung bei Datenpannen Pflicht geworden ist, ob § 33 in Kraft ist, und Titel sowie Datum von PCPD-Rahmen und Mitarbeiterhinweisen sollten Sie vor einer Entscheidung an PCPD und Gazette prüfen. Diese Seite friert diese Stände bewusst nicht ein."] },
        ],
        faqs: [
          { question: "Verbietet die PDPO KI?", answer: "Nein. Berührt der Ablauf identifizierbare personenbezogene Daten, gelten die sechs Grundsätze." },
          { question: "Muss sich eine Firma mit drei Personen darum kümmern?", answer: "Ja. Entscheidend ist, ob Sie personenbezogene Daten verantworten, nicht die Kopfzahl." },
          { question: "Wenn Mitarbeitende ein privates ChatGPT für Firmenarbeit nutzen, haftet die Firma?", answer: "Als data user kann die Firma verantwortlich bleiben. Deshalb brauchen Sie eine Seite Richtlinie und eine rote Zone." },
          { question: "Dürfen wir einen Vertrag einfügen, wenn der Name fehlt?", answer: "Nicht, wenn Telefon, Adresse oder Vertragsnummer die Person noch erkennbar machen." },
          { question: "Ist § 33 in Kraft?", answer: "Zum Zeitpunkt dieses Textes nein. Prüfen Sie den Stand, bevor Sie ihn einem Kunden zusagen." },
          { question: "Ist eine ausländische API ein Transfer?", answer: "Wird außerhalb Hongkongs verarbeitet, behandeln Sie es als Transfer und decken Sie es mit Vertrag und Rechten." },
          { question: "Gilt der GBA-Standardvertrag für Macau?", answer: "Der Text Festland–Hongkong gilt nicht für Macau." },
          { question: "Ist private KI automatisch rechtmäßig?", answer: "Nein. Eine klare Grenze ist ein Anfang. Zweck, Sicherheit und Transparenz bleiben." },
          { question: "Dürfen wir Support-Chats zum Training nutzen?", answer: "Nicht standardmäßig. Nachtraining ist ein neuer Zweck, wenn der ursprüngliche Hinweis ihn nicht abdeckte." },
          { question: "Jemand hat auf WhatsApp nach dem Preis gefragt. Dürfen wir später werben?", answer: "Das ist keine Einwilligung. Werbung braucht eine eigene Einwilligung und Widerspruch." },
          { question: "Darf KI ein Kreditlimit ändern oder ein Angebot selbst senden?", answer: "Sie sollte nicht. Beträge, Versprechen und Unterschriften prüft ein Mensch." },
          { question: "Wie lange müssen wir eine Rechnung aufbewahren?", answer: "Dieser Text nennt keine gesetzliche Zahl von Tagen. Fragen Sie Steuerberatung oder Kanzlei." },
        ],
      }),
    },
  },
];
