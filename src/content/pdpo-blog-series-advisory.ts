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
  "zh-hk": "想先睇一條真實流程？預約 1 小時業務聽診：innovatexp.co/bookme。",
  "zh-tw": "想先看一條真實流程？預約 1 小時業務診斷：innovatexp.co/bookme。",
  en: "Want a first look at one real workflow? Book a 1-hour business diagnosis at innovatexp.co/bookme.",
  ja: "実際の業務を1つ先に見ますか。1時間の業務診断は innovatexp.co/bookme で予約できます。",
  de: "Einen echten Ablauf zuerst ansehen? Buchen Sie eine einstündige Diagnose unter innovatexp.co/bookme.",
};

function copy(locale: AppLocale, fields: Omit<BlogLocaleCopy, "disclaimer" | "cta">): BlogLocaleCopy {
  return { ...fields, disclaimer: DISCLAIMER[locale], cta: CTA[locale] };
}

export const PDPO_BLOG_ADVISORY: PdpoPost[] = [
  {
    slug: "how-to-choose-ai-consulting-hong-kong",
    date: "2026-10-16",
    order: 11,
    locales: {
      "zh-hk": copy("zh-hk", {
        title: "香港 AI 專業顧問服務點揀？中小企 7 條問題",
        excerpt: "揀 AI 專業顧問服務，先睇會唔會搵業務樽頸，同肯唔肯講你暫時唔使買系統。",
        directAnswer:
          "揀 AI 專業顧問服務，唔好只睇識幾多工具。要睇對方會唔會先搵業務樽頸，交唔交到可落地流程，同肯唔肯講你暫時唔使買系統。",
        sections: [
          {
            heading: "香港 AI 人工智能公司大致有邊三類？",
            paragraphs: [
              "第一類賣現成工具：CRM、聊天機械人、課程平台。第二類做開發：按你張圖寫系統。第三類做顧問：先聽你而家點做，再決定要唔要寫程式。三類都可以有用，但 3–30 人公司最容易買錯嘅，係未畫清流程就簽開發約。",
              "專屬 AI 企業顧問應該交到你睇得明嘅嘢：一張流程圖、邊個負責下一步、一份同事跟得到嘅做法，同埋一個真係用得著嘅 AI 助手或草稿位。如果對方開場就報一套軟件，你要問：呢套嘢解決我邊一步？",
            ],
          },
          {
            heading: "七條問題，點樣分開賣工具同做顧問？",
            paragraphs: [
              "一，有冇同你行業相近、可以核實嘅案例，而唔係淨係 demo。二，收費寫不寫明起步價同邊啲唔包。三，會唔會收軟件佣金；如果會，有冇講。四，第一個月交咩，而唔係只交簡報。五，邊個同你開會，係咪轉手畀初級同事。六，數據放邊、可唔可以匯出。七，如果聽完覺得你未使買，佢肯唔肯直講。",
              "業務樽頸多數唔係「未用最新模型」，而係查詢冇人跟、報價要等人、交接靠記憶。顧問如果跳過呢步，之後任何自動化都係幫你更快做錯。Free Process Assessment 可以係第一次對話：帶一條最亂嘅線，先睇值唔值得做付費 Snapshot。",
            ],
          },
          {
            heading: "慳到嘅時間同多接嘅客，點樣先至數得到？",
            paragraphs: [
              "慳到可核實嘅時間，先叫節流。覆客快、跟進準、少漏單，先有機會開源。兩件事都要有前後對比，唔好用別人嘅口號代替你自己嘅數字。",
              "善敏教育中心 Agilizing 嘅教材製作，由一位助手人手做、一套要 10 日，壓縮到 3 小時，並教材時間縮短，其後先拓展到社福界同國泰相關工作。呢個係業主確認的個案，唔代表每間公司都有同一筆數。你要先量自己條流程嘅工時同出錯次數。",
            ],
          },
          {
            heading: "第一次開會，你應該帶咩走？",
            paragraphs: [
              "帶一條真實例子：最近一張遲咗嘅報價、一個冇人跟嘅 WhatsApp、或者一套做咗十日嘅教材。顧問如果只講模型名稱，你就知道對方未開始聽。問清楚邊個改輸出、邊個先可以對外發送、資料可唔可以匯出。",
              "三日內你應該收到下一步，而唔係一份新產品目錄。下一步可以係「先執責任，暫不買系統」，也可以係一個三十日試點。兩種都係專業交付。InnovateXP 由 Snapshot HK$3,880 開始；十人或以下 Discovery Sprint 由 HK$6,880 起。",
            ],
          },
        ],
        faqs: [
          {
            question: "AI 顧問收費大概幾多？",
            answer: "InnovateXP 公開起步價：Snapshot 業務聽診 HK$3,880；10 人或以下 Discovery Sprint HK$6,880 起。11–30 人 Discovery 為 HK$13,600。之後先按流程複雜程度報價。",
          },
          {
            question: "用 AI 可唔可以節流同開源？",
            answer: "可以，但要先揀啱流程。慳時間係節流；覆客快、跟進準先係開源。未量度之前，唔好當任何百分比係承諾。",
          },
          {
            question: "免費流程檢查同付費聽診有咩分別？",
            answer: "第一次對話用來判斷值唔值得做。付費 Snapshot 先至交書面診斷同下一步。預約：innovatexp.co/bookme。",
          },
        ],
      }),
      "zh-tw": copy("zh-tw", {
        title: "香港 AI 專業顧問服務怎麼挑？中小企業 7 個問題",
        excerpt: "挑選 AI 專業顧問服務，先看對方會不會找出業務瓶頸，以及肯不肯說你暫時不必買系統。",
        directAnswer:
          "挑選 AI 專業顧問服務，不要只看對方會用多少工具。要看會不會先找出業務瓶頸、交不交得出可落地的流程，以及肯不肯說你暫時不必買系統。",
        sections: [
          {
            heading: "香港 AI 人工智能公司大致有哪三類？",
            paragraphs: [
              "第一類賣現成工具，第二類按圖開發，第三類做顧問：先聽你現在怎麼做，再決定要不要寫程式。3–30 人的公司最容易買錯的，是流程還沒畫清就簽開發合約。",
              "專屬 AI 企業顧問應交出流程圖、負責人、同事跟得上的做法，以及一個用得上的助手或草稿位。如果開場就報一套軟件，要問它解決哪一步。",
            ],
          },
          {
            heading: "七個問題，怎麼分開賣工具和做顧問？",
            paragraphs: [
              "有沒有可核實的相近案例、收費是否寫明起步價與不含項目、會不會收軟件佣金、第一個月交什麼、誰來開會、資料放在哪裡能不能匯出、聽完若覺得你還不必買，對方肯不肯直說。",
              "業務瓶頸常常是查詢沒人跟、報價在等人、交接靠記憶。Free Process Assessment 可以是第一次對話：帶一條最亂的線，先看值不值得做付費 Snapshot。",
            ],
          },
          {
            heading: "節流和開源，如何才不是口號？",
            paragraphs: [
              "省下可核實的時間才叫節流。回覆快、跟進準、少漏單，才有機會開源。兩者都要有前後對比。",
              "善敏教育中心 Agilizing 的教材由 10 日縮至 3 小時，其後才擴到社福界與國泰相關工作。這是業主確認的個案，不代表每家公司都有同一筆數字。",
            ],
          },
        ],
        faqs: [
          { question: "AI 顧問收費大概多少？", answer: "Snapshot HK$3,880；10 人以下 Discovery Sprint HK$6,880 起。11–30 人為 HK$13,600。其後按流程複雜程度報價。" },
          { question: "用 AI 可以節流和開源嗎？", answer: "可以，但要先選對流程。省時間是節流；回覆快、跟進準才是開源。未量度前不要把任何百分比當成承諾。" },
          { question: "免費流程檢查和付費診斷有何不同？", answer: "第一次對話用來判斷值不值得做。付費 Snapshot 才交書面診斷。預約：innovatexp.co/bookme。" },
        ],
      }),
      en: copy("en", {
        title: "How should a Hong Kong SME choose AI consulting?",
        excerpt: "Choose AI consulting by whether they find the bottleneck and will say if you should not buy a system yet.",
        directAnswer:
          "Choose an AI consulting service by the bottleneck they find, the workflow they can hand over, and whether they will say you should not buy a system yet. Tool fluency alone is a weak test.",
        sections: [
          {
            heading: "What are the three kinds of Hong Kong AI companies?",
            paragraphs: [
              "Some sell a finished tool. Some build to a specification. Some consult: they learn how the work happens now, then decide whether software is justified. Firms of 3–30 people most often overbuy the build before the path is drawn.",
              "A dedicated AI business consultant should leave a process map, a named owner for the next step, a way of working the team can follow, and one assistant or draft point people actually use.",
            ],
          },
          {
            heading: "Which seven questions separate a tool pitch from advisory?",
            paragraphs: [
              "Ask for a checkable case near your trade, a written starting fee and exclusions, whether software commission exists, what month one delivers, who attends the meetings, where data sits and whether you can export it, and whether they will tell you not to buy.",
              "The bottleneck is often an enquiry with no owner, a quote waiting on someone, or a handoff stored in memory. A Free Process Assessment can be that first conversation: bring one messy line before you pay for a Snapshot.",
            ],
          },
          {
            heading: "How do time saved and revenue show up without a slogan?",
            paragraphs: [
              "Time you can recount is the saving. Faster replies and fewer dropped follow-ups are what create room for revenue. Both need a before-and-after on your own work.",
              "At Agilizing, a training centre, producing a set of materials fell from 10 days to 3 hours, before the same pattern reached social-service work and Cathay-related work. That figure is verified for that engagement. It is not a promise for yours.",
            ],
          },
        ],
        faqs: [
          { question: "What does AI consulting cost to start?", answer: "InnovateXP publishes Snapshot at HK$3,880 and Discovery Sprint from HK$6,880 for up to 10 people. Teams of 11–30 are HK$13,600. Later work is scoped after diagnosis." },
          { question: "Can AI both save cost and win work?", answer: "It can, after the right workflow is chosen. Saved hours are the cost side. Faster, more reliable follow-up is the revenue side. Do not treat an unverified percentage as a promise." },
          { question: "How is a free process conversation different from Snapshot?", answer: "The first conversation decides whether paid work is useful. Snapshot is the written diagnosis. Book at innovatexp.co/bookme." },
        ],
      }),
      ja: copy("ja", {
        title: "香港のAI専門顧問サービスはどう選ぶか",
        excerpt: "ツールの数ではなく、ボトルネックを見つけるか、まだ買わなくてよいと言えるかを見ます。",
        directAnswer:
          "AI専門顧問サービスは、業務のボトルネックを先に見つけるか、渡せる手順があるか、まだシステムを買わなくてよいと言えるかで選びます。ツールの数だけでは足りません。",
        sections: [
          { heading: "香港のAI企業は大きく3種類ですか？", paragraphs: ["既製品を売る会社、仕様どおりに開発する会社、今の仕事のやり方を聞いてからソフトが要るかを決める顧問です。3〜30人の会社が失敗しやすいのは、流れを描く前に開発契約を結ぶことです。専属のAI企業顧問が渡すべきものは、フロー図、次の担当、チームが追える手順、実際に使う助手か下書きです。"] },
          { heading: "売り込みと顧問を分ける7つの質問は？", paragraphs: ["近い業種で確認できる事例、開始価格と含まれないもの、ソフトの手数料、最初の月に渡すもの、会議に出る人、データの場所と書き出し、買わなくてよいときにそう言うか。ボトルネックは最新モデルの不足ではなく、問い合わせの放置、見積の待ち、記憶による引き継ぎであることが多いです。Free Process Assessment は、いちばん乱れた業務を1つ持ってくる最初の会話です。"] },
          { heading: "時間削減と売上はスローガンなしでどう見るか？", paragraphs: ["数えられる時間だけが削減です。返信が速く、フォローが漏れないことが売上の余地です。Agilizing（善敏教育中心）では教材が10日から3時間になり、し、その後に福祉分野とキャセイ関連の仕事へ広がりました。確認済みの事例であり、御社への約束ではありません。"] },
        ],
        faqs: [
          { question: "AI顧問の起点料金は？", answer: "SnapshotはHK$3,880。10人以下のDiscovery SprintはHK$6,880から。11〜30人はHK$13,600。その後は診断のあとで見積もります。" },
          { question: "AIでコスト削減と売上の両方は可能ですか？", answer: "適切な業務を選んでからです。時間は削減、速い確実なフォローが売上側です。測る前の割合は約束にしません。" },
          { question: "無料の流れ確認と有料診断の違いは？", answer: "最初の会話は、有料にする価値があるかの判断です。Snapshotが書面の診断です。予約は innovatexp.co/bookme。" },
        ],
      }),
      de: copy("de", {
        title: "Wie wählt ein Hongkonger KMU KI-Beratung?",
        excerpt: "Wählen Sie danach, ob der Engpass gefunden wird und ob man Ihnen vom Kauf abrät.",
        directAnswer:
          "Wählen Sie KI-Beratung danach, ob der Engpass gefunden wird, ob ein nutzbarer Ablauf übergeben wird, und ob man Ihnen sagt, dass Sie noch kein System kaufen sollten.",
        sections: [
          { heading: "Welche drei Arten von KI-Firmen gibt es in Hongkong?", paragraphs: ["Manche verkaufen ein fertiges Werkzeug, manche bauen nach Spezifikation, manche beraten: sie lernen den heutigen Ablauf und entscheiden dann, ob Software nötig ist. Firmen mit 3–30 Personen kaufen oft den Bau, bevor der Weg gezeichnet ist. Ein zugeordneter KI-Berater hinterlässt eine Ablaufkarte, einen Verantwortlichen, eine nachvollziehbare Arbeitsweise und einen Assistenten oder Entwurf, den das Team nutzt."] },
          { heading: "Welche sieben Fragen trennen Verkauf und Beratung?", paragraphs: ["Prüfbarer Fall, Startpreis und Ausschlüsse, Softwareprovision, Lieferung im ersten Monat, wer in den Terminen sitzt, Speicherort und Export, und ob man vom Kauf abrät. Der Engpass ist oft eine Anfrage ohne Besitzer, ein wartendes Angebot oder eine Übergabe im Gedächtnis. Ein Free Process Assessment ist das erste Gespräch mit einem unübersichtlichen Ablauf."] },
          { heading: "Wie zeigen sich Zeit und Umsatz ohne Slogan?", paragraphs: ["Nur nachzählbare Zeit ist eine Ersparnis. Schnellere Antworten und weniger verlorene Nachfassen schaffen Raum für Umsatz. Bei Agilizing sank die Materialerstellung von 10 Tagen auf 3 Stunden und sparte mindestens HK$50.000 im Monat, bevor das Muster in die Sozialarbeit und Cathay-bezogene Arbeit ging. Belegt für diesen Fall, kein Versprechen für Ihren."] },
        ],
        faqs: [
          { question: "Was kostet der Einstieg?", answer: "Snapshot HK$3.880. Discovery Sprint ab HK$6.880 für bis zu 10 Personen, HK$13.600 für 11–30. Danach nach Diagnose." },
          { question: "Kann KI Kosten senken und Umsatz stützen?", answer: "Nach dem richtigen Ablauf. Gesparte Stunden sind die Kostenseite. Schnelleres, zuverlässiges Follow-up die Umsatzseite. Kein ungemessener Prozentsatz als Versprechen." },
          { question: "Was unterscheidet das erste Gespräch vom Snapshot?", answer: "Das erste Gespräch entscheidet, ob bezahlte Arbeit sinnvoll ist. Der Snapshot ist die schriftliche Diagnose. Buchung: innovatexp.co/bookme." },
        ],
      }),
    },
  },
  {
    slug: "hong-kong-sme-ai-automation-first-step",
    date: "2026-10-17",
    order: 12,
    locales: {
      "zh-hk": copy("zh-hk", {
        title: "香港中小企 AI 自動化：低成本第一步",
        excerpt: "低成本第一步唔係買大系統，而係揀一條重複流程，30 日內先診斷、再建立、再上線。",
        directAnswer:
          "香港中小企 AI 自動化嘅低成本第一步，係揀一條重複流程，畫清楚後用輕量方案試 30 日，見到對比先擴展。",
        sections: [
          {
            heading: "中小企 AI 通常由邊五條流程開始？",
            paragraphs: [
              "報價、入單、WhatsApp 查詢、課堂或活動報名跟進、每月重複嘅行政核對。呢五條嘅共同點係：步驟熟、出錯可數、唔使先換晒公司系統。",
              "低門檻 AI 方案多數用你已經有嘅 WhatsApp、試算表同表單，加上一個草稿或分類位。輕量化係指範圍窄，唔係指馬虎。人仍然確認金額、承諾同對外發送。",
            ],
          },
          {
            heading: "30 日裡面點樣先診斷、再建立、再上線？",
            paragraphs: [
              "第一週畫出現況：邊一步等人、邊一步重複、邊個先可以改數字。第二週揀一個改動，寫低責任同覆核位。第三週用真實單試，而唔係用示範數據。第四週比較前後：時間、漏單、返工。呢個就係我哋自己嘅做法，用三十日由診斷去到上線。",
              "AI-powered business process automation 變成人人唔用，通常係因為一次過上三條流程，或者輸出冇人負責改。一條流程見完對比，先至加第二條。定制系統留到輕量化方案證明唔夠用。",
            ],
          },
          {
            heading: "政府資助可唔可以一併考慮？",
            paragraphs: [
              "香港中小企有時會問 BUD、TVP 一類資助可唔可以補貼數碼轉型。計劃名稱、資格同截止日期會變，發布前核實官方文本，唔好憑文章申請。",
              "Agilizing 教材由 10 日縮至 3 小時，係先收窄到「一套教材點出」呢一條流程，而唔係一次過換晒製作部門。你嘅低成本第一步都應該窄到一個月內睇到前後。",
            ],
          },
          {
            heading: "香港中小企 AI 自動化，點樣避免買咗冇人用？",
            paragraphs: [
              "上線之前寫三行：邊個每日打開、邊個改錯、邊個先可以發送。少咗任何一行，自動化就會停喺創辦人部機。試點只用真實單，示範數據會令第四週嘅對比失真。",
              "三十日結束時只留一個決定：繼續、收窄，或者停。停都係結果。數碼轉型失敗，好多時係因為冇人被允許停一條冇人用嘅線，於是第二條、第三條疊上去。香港中小企 AI 自動化值得做，係因為你可以先用一個月證明一條線。",
              "預算可以細到：現有帳號嘅用量，加一次業務聽診。Snapshot 係 HK$3,880。十人或以下 Discovery Sprint 由 HK$6,880 起。呢個先係低成本第一步嘅價，而唔係未試點就簽年度大系統。輕量化同低門檻 AI 方案都係指範圍，唔係指可以跳過覆核。同事如果要學新畫面，先教一個動作：打開、改一句、送去覆核。多過一個動作，第四週就會冇人開。報價、入單、查詢、報名跟進、月結核對，五條裡面只准揀一條做第一個月。第二條要等第一條有人可以示範。示範時用真單，唔好用練習檔。停得到，先算你控制到呢條線。控制唔到就未算自動化。",
            ],
          },
        ],
        faqs: [
          { question: "冇 IT 同事做唔做到？", answer: "做到。第一步多數用現有 WhatsApp、試算表同表單，加一個 AI 草稿或分類，重要欄位仍然人手確認。" },
          { question: "幾耐見到效果？", answer: "一條流程通常四週內看到前後對比。對比係工時同漏單，唔係未量度嘅回報百分比。" },
          { question: "輕量化方案同定制系統點揀？", answer: "現有工具加覆核位已經夠，就先唔定制。只有試完證明缺某一個你而家冇嘅能力，先至寫系統。" },
        ],
      }),
      "zh-tw": copy("zh-tw", {
        title: "香港中小企 AI 自動化：低成本第一步",
        excerpt: "低成本第一步不是買大系統，而是選一條重複流程，30 日內先診斷、再建立、再上線。",
        directAnswer:
          "香港中小企 AI 自動化的低成本第一步，是選一條最常重複的流程，先畫清楚，再用輕量化方案試 30 日。看到對比再擴展，數碼轉型就不會變成大工程。",
        sections: [
          { heading: "中小企 AI 通常從哪五條流程開始？", paragraphs: ["報價、入單、WhatsApp 查詢、課程或活動報名跟進、每月重複的行政核對。共同點是步驟熟、出錯可數、不必先更換全公司系統。低門檻 AI 方案多用既有的 WhatsApp、試算表與表單，加上草稿或分類。金額、承諾與對外發送仍由人確認。"] },
          { heading: "30 日內如何先診斷、再建立、再上線？", paragraphs: ["第一週畫出現況，第二週選一個改動並寫下責任與覆核，第三週用真實單據試，第四週比較時間、漏單與返工。這是我們自己的三十日做法。AI-powered business process automation 變成沒人用，常常是因為一次上三條流程，或輸出沒人負責改。定制系統留到輕量化方案證明不夠用。"] },
          { heading: "政府資助可以一併考慮嗎？", paragraphs: ["BUD、TVP 等計劃的名稱、資格與截止日期會變，發布前核實官方文本。Agilizing 由 10 日縮至 3 小時，是先收窄到一套教材如何產出，而不是一次換掉整個製作部門。"] },
        ],
        faqs: [
          { question: "沒有 IT 同事做得到嗎？", answer: "做得到。第一步多用現有 WhatsApp、試算表與表單，重要欄位仍由人確認。" },
          { question: "多久看到效果？", answer: "一條流程通常四週內看到前後對比。對比的是工時與漏單，不是未量度的報酬百分比。" },
          { question: "輕量化方案和定制系統怎麼選？", answer: "現有工具加覆核已夠，就先不定制。試完證明缺一個你現在沒有的能力，才寫系統。" },
        ],
      }),
      en: copy("en", {
        title: "Hong Kong SME AI automation: the low-cost first step",
        excerpt: "The low-cost first step is one repeated workflow, diagnosed, built, and launched within 30 days.",
        directAnswer:
          "The low-cost first step in Hong Kong SME AI automation is one repeated workflow, drawn clearly, then tried for 30 days with a light setup. Extend only after you can compare before and after. Digital change stays a project you can finish.",
        sections: [
          { heading: "Which five workflows do SMEs usually start with?", paragraphs: ["Quotes, order entry, WhatsApp enquiries, class or event follow-up, and a monthly admin check. They are familiar, errors are countable, and you do not replace every system first. A low-threshold setup uses the WhatsApp, spreadsheet, and form you already have, plus one draft or classification step. People still confirm amounts, promises, and anything sent outside."] },
          { heading: "How do you diagnose, build, and launch within 30 days?", paragraphs: ["Week one draws the current path. Week two picks one change, an owner, and a review point. Week three tries real cases. Week four compares time, dropped items, and rework. That is our own 30-day sequence. AI-powered business process automation goes unused when three workflows launch at once or nobody owns the output. Custom software waits until the light version proves a missing capability."] },
          { heading: "Can a grant sit beside the first step?", paragraphs: ["Teams ask about BUD or TVP. Names, eligibility, and deadlines change — verify the official text before you apply. Agilizing’s drop from 10 days to 3 hours, came from narrowing to how one set of materials is produced, not from replacing the whole department in a month."] },
        ],
        faqs: [
          { question: "Can we start without an IT colleague?", answer: "Yes. The first step usually adds an AI draft or sort to WhatsApp, a spreadsheet, and a form. People still confirm important fields." },
          { question: "When is a comparison visible?", answer: "One workflow usually shows a before-and-after within four weeks: hours and dropped items, not an unverified return percentage." },
          { question: "When is custom software justified?", answer: "After the light setup proves you lack a capability you do not have today. Until then, do not commission a build." },
        ],
      }),
      ja: copy("ja", {
        title: "香港の中小企業AI自動化：低コストの第一歩",
        excerpt: "第一歩は大型システムの購入ではなく、繰り返す業務を1つ、30日で診断し、作り、公開することです。",
        directAnswer:
          "香港の中小企業AI自動化の低コストな第一歩は、いちばん繰り返す業務を1つ選び、描いてから、軽い仕組みで30日試すことです。前後を比べてから広げます。",
        sections: [
          { heading: "最初の5つの業務は何ですか？", paragraphs: ["見積、受注、WhatsAppの問い合わせ、講座やイベントのフォロー、毎月の事務照合です。手順が慣れ、誤りが数えられ、全システムを先に替えません。低い入口は、今のWhatsApp、表、フォームに下書きか分類を足すことです。金額、約束、外部送信は人が確認します。"] },
          { heading: "30日で診断し、作り、公開するには？", paragraphs: ["1週目は現状、2週目は一つの変更と担当と確認点、3週目は実例、4週目は時間・漏れ・やり直しの比較です。これが私たちの30日の順序です。AI-powered business process automation が使われないのは、一度に3本上げるか、出力の責任者がいないときです。カスタムは、軽い案では足りないと分かってからです。"] },
          { heading: "助成金は一緒に考えられますか？", paragraphs: ["BUDやTVPは名称、資格、期限が変わります。申請前に公式文書を確認してください（公開前に核实）。Agilizingは10日から3時間、月あたり少なくともHK$50,000の削減を、教材1セットの作り方に絞った結果として得ました。"] },
        ],
        faqs: [
          { question: "IT担当がいなくてもできますか？", answer: "できます。最初は今の道具に下書きか分類を足し、重要項目は人が確認します。" },
          { question: "いつ比較が見えますか？", answer: "1本なら通常4週以内に時間と漏れの前後です。未計測の割合ではありません。" },
          { question: "カスタムはいつですか？", answer: "軽い仕組みで、今ない能力が足りないと分かってからです。" },
        ],
      }),
      de: copy("de", {
        title: "KI-Automatisierung für Hongkonger KMU: der günstige erste Schritt",
        excerpt: "Der erste Schritt ist ein wiederholter Ablauf, in 30 Tagen diagnostiziert, gebaut und gestartet.",
        directAnswer:
          "Der günstige erste Schritt der KI-Automatisierung für Hongkonger KMU ist ein wiederholter Ablauf, klar gezeichnet und 30 Tage leicht erprobt. Erweitern Sie erst nach einem Vorher-nachher.",
        sections: [
          { heading: "Mit welchen fünf Abläufen starten KMU?", paragraphs: ["Angebot, Auftragserfassung, WhatsApp-Anfragen, Kurs- oder Event-Follow-up und ein monatlicher Admin-Abgleich. Sie sind vertraut, Fehler sind zählbar, und nicht jedes System wird zuerst ersetzt. Ein niedriger Einstieg nutzt vorhandenes WhatsApp, eine Tabelle und ein Formular plus einen Entwurf oder eine Sortierung. Beträge, Zusagen und Versand bleiben beim Menschen."] },
          { heading: "Wie diagnostiziert, baut und startet man in 30 Tagen?", paragraphs: ["Woche eins zeichnet den Ist-Weg. Woche zwei wählt eine Änderung, einen Verantwortlichen und einen Prüfpunkt. Woche drei nutzt echte Fälle. Woche vier vergleicht Zeit, Verluste und Nacharbeit. Das ist unsere eigene 30-Tage-Folge. AI-powered business process automation bleibt ungenutzt, wenn drei Abläufe zugleich starten oder niemand die Ausgabe verantwortet. Individuelle Software wartet, bis die leichte Fassung eine fehlende Fähigkeit belegt."] },
          { heading: "Kann eine Förderung daneben stehen?", paragraphs: ["BUD und TVP ändern Namen, Anspruch und Fristen. Prüfen Sie den amtlichen Text vor dem Antrag. Agilizings Weg von 10 Tagen auf 3 Stunden und mindestens HK$50.000 im Monat kam vom Verengen auf einen Materialsatz, nicht vom Austausch der ganzen Abteilung."] },
        ],
        faqs: [
          { question: "Geht es ohne IT-Kollegen?", answer: "Ja. Der erste Schritt ergänzt vorhandene Werkzeuge um Entwurf oder Sortierung. Wichtige Felder prüft ein Mensch." },
          { question: "Wann sieht man einen Vergleich?", answer: "Ein Ablauf zeigt meist innerhalb von vier Wochen Stunden und verlorene Fälle, keinen ungemessenen Prozentsatz." },
          { question: "Wann ist individuelle Software gerechtfertigt?", answer: "Wenn die leichte Fassung eine Fähigkeit belegt, die Sie heute nicht haben." },
        ],
      }),
    },
  },
  {
    slug: "ai-training-versus-coaching",
    date: "2026-10-18",
    order: 13,
    locales: {
      "zh-hk": copy("zh-hk", {
        title: "AI 培訓 vs AI 陪跑：一次工作坊點解唔夠？",
        excerpt: "一次 AI 培訓教到生成式 AI 應用實務，但要工作坊加真實專案再陪跑 30 日，先至用得落日常。",
        directAnswer:
          "一次 AI 培訓教到生成式 AI 應用實務，但多數上完就停。工作坊加真實專案，再陪跑 30 日，先用得落日常。",
        sections: [
          {
            heading: "點解 AI 培訓之後使用率會跌？",
            paragraphs: [
              "課堂用公開例子，返到公司就碰到自己嘅檔案、客戶名同交期。沒有人指定第一條流程，員工就當堂上完。生成式 AI 應用實務要綁住一份真係要交嘅作業，而唔係十個示範提示。",
              "半日教概念，半日做真專案：每個部門只揀一條流程。做完即刻有人第二日用。呢個先係 AI 專案實戰工作坊，而唔係工具展覽。",
            ],
          },
          {
            heading: "生產力局推動企業 AI 應用，同陪跑有咩關係？",
            paragraphs: [
              "香港生產力促進局有推動企業應用 AI 的計劃，當中包括名為「一企業一 AI Coach」的安排。呢個係機構計劃名稱，只可引用，唔係 InnovateXP 嘅服務名。計劃詳情、資格同官方用字，發布前核實生產力局文本。",
              "我哋自己嘅做法係：AI training 教得明，AI workshop 用你嘅單做，AI integration 先至接落你而家嘅表同通訊工具。3–30 人團隊反而易落地，因為決策人就喺房入面。",
            ],
          },
          {
            heading: "AI+行業升級，三類公司可以點起步？",
            paragraphs: [
              "培訓中心：一套教材嘅大綱、投影片同講稿草稿，講師仍改事實同例子。社福機構：活動通知同個案摘要草稿，敏感資料先遮，對外發送仍由人確認。專業服務：會議紀錄變做待辦，金額同承諾留人手。",
              "Agilizing 由 10 日縮至 3 小時，就係培訓教材呢一條，而唔係上完一堂通用 AI 課。資助例如 TVP 可唔可以補貼，視乎當期計劃，發布前核實。",
            ],
          },
          {
            heading: "工作坊第二日，點樣先算用咗？",
            paragraphs: [
              "第二日有人用昨日嘅草稿做真工作，先算用咗。如果淨係收藏提示詞，使用率會喺一週內跌返零。陪跑要睇嘅係：邊一份輸出被改完發送、邊一份被棄用、棄用原因係事實錯定係冇人負責。",
              "細團隊唔使等齊三十人先開班。三個人可以即日揀一條線。AI+行業升級唔係換行業名，而係把生成式 AI 應用實務嵌進你而家交貨嘅方式。InnovateXP 唔用任何公營計劃名稱做自己嘅服務名。",
              "陪跑每週只睇三件事：邊一份草稿被改完送出、邊一份被棄、棄係因為事實錯定係冇主人。三十日結束先決定第二條流程。一次過教五個部門，通常五個都停。AI 專案實戰工作坊嘅價值，在於房入面已經有一份要交嘅作業，而唔係一套新詞彙。生成式 AI 應用實務要包含「邊類資料唔貼進公開工具」，否則堂上教完，同事第二日就會把客戶名貼去個人帳戶。工作坊結束前，每人交一張紙：明日用邊份草稿、邊個覆核、邊類資料禁止貼上。冇呢張紙，就當堂未完。陪跑第一週只收呢張紙嘅結果，唔收新題目。新題目留到第二個月。第一個月只收一張紙，唔收第二條流程。第二個月先再開題。未用完第一張紙，唔好開新班。",
            ],
          },
        ],
        faqs: [
          { question: "培訓要幾多人先做？", answer: "3–30 人都可以。細團隊決策短，反而更易把工作坊成果用落第二日。" },
          { question: "有冇資助？", answer: "視乎當期計劃，例如 TVP。名稱同資格發布前核實，唔好憑本文申請。" },
          { question: "一次工作坊可唔可以代替陪跑？", answer: "通常唔夠。工作坊產生第一份真作業；陪跑 30 日先處理第二日冇人用、輸出要改、權限未定呢啲問題。" },
        ],
      }),
      "zh-tw": copy("zh-tw", {
        title: "AI 培訓 vs AI 陪跑：一次工作坊為什麼不夠？",
        excerpt: "一次 AI 培訓教得到生成式 AI 應用實務，但要工作坊加真實專案再陪跑 30 日，才用得進日常。",
        directAnswer:
          "一次 AI 培訓可以教會生成式 AI 應用實務，但許多公司上完課就停。有效做法是工作坊加真實專案，再陪跑 30 日，讓 AI 專案實戰工作坊當天用進日常工作。",
        sections: [
          { heading: "為什麼 AI 培訓之後使用率會掉？", paragraphs: ["課堂用公開例子，回到公司就碰到自己的檔案、客戶名與交期。沒有人指定第一條流程，員工就當課上完了。生成式 AI 應用實務要綁一份真的要交的作業。半日教概念，半日做真專案，每個部門只選一條流程。"] },
          { heading: "生產力局推動企業 AI 應用，和陪跑有什麼關係？", paragraphs: ["香港生產力促進局推動企業應用 AI，其中有名為「一企業一 AI Coach」的安排。這是機構計劃名稱，只可引用，不是 InnovateXP 的服務名。詳情發布前核實官方文本。我們的做法是 AI training 教得懂，AI workshop 用你的單據，AI integration 才接到現有的表與通訊工具。"] },
          { heading: "AI+行業升級，三類公司如何起步？", paragraphs: ["培訓中心做教材草稿，講師仍改事實。社福機構做活動通知與個案摘要草稿，敏感資料先遮。專業服務把會議紀錄變成待辦，金額與承諾留人。Agilizing 由 10 日縮至 3 小時，是教材這一條，不是一堂通用課。TVP 等資助發布前核實。"] },
        ],
        faqs: [
          { question: "培訓要多少人？", answer: "3–30 人都可以。小團隊決策短，更容易把成果用到第二天。" },
          { question: "有沒有資助？", answer: "視當期計劃，例如 TVP。名稱與資格發布前核實。" },
          { question: "一次工作坊可以代替陪跑嗎？", answer: "通常不夠。工作坊產生第一份真作業；陪跑 30 日處理第二天沒人用、輸出要改、權限未定。" },
        ],
      }),
      en: copy("en", {
        title: "AI training vs coaching: why one workshop is not enough",
        excerpt: "One AI training session teaches practice. A workshop plus a real project and 30 days of coaching is what reaches daily work.",
        directAnswer:
          "One AI training session can teach practical generative AI. Many teams stop when the room empties. A workshop on a real project, then 30 days of coaching, is what carries an AI workshop into the next morning’s work.",
        sections: [
          { heading: "Why does usage fall after AI training?", paragraphs: ["The class uses public examples. The office has your files, client names, and deadlines. If nobody names the first workflow, the session stays a session. Practical generative AI has to be tied to a deliverable someone must send. Half a day for the idea, half a day on one workflow per team."] },
          { heading: "How does a public AI-coach programme relate, without becoming our name?", paragraphs: ["The Hong Kong Productivity Council promotes enterprise AI use, including an arrangement titled 「一企業一 AI Coach」. That is the programme’s name. Cite it only. It is not an InnovateXP service name. Verify the official wording before you rely on it. Our own sequence is AI training people can explain, an AI workshop on your documents, then AI integration into the sheet and the channel you already use."] },
          { heading: "What does an industry upgrade look like for three kinds of teams?", paragraphs: ["A training centre drafts a module; the trainer still corrects facts. A social-service team drafts notices and case summaries after sensitive fields are masked. A professional firm turns notes into tasks and leaves money and promises with a person. Agilizing’s 10 days to 3 hours,, was that materials path, not a generic class. Grants such as TVP need an official check before you apply."] },
        ],
        faqs: [
          { question: "How many people do we need?", answer: "Three to thirty. A small team decides faster, so Tuesday’s work is more likely to use Monday’s result." },
          { question: "Is there a grant?", answer: "It depends on the current scheme, for example TVP. Verify the name and eligibility before you apply." },
          { question: "Can one workshop replace coaching?", answer: "Usually not. The workshop produces the first real piece. Thirty days of coaching handles unused output, edits, and permissions." },
        ],
      }),
      ja: copy("ja", {
        title: "AI研修と伴走：1回のワークショップでは足りない理由",
        excerpt: "1回のAI研修で実務は教えられます。日常に残すには、実案件と30日の伴走が要ります。",
        directAnswer:
          "1回のAI研修で生成AIの実務は教えられますが、多くの会社は教室を出ると止まります。実案件のワークショップと30日の伴走が、翌日の仕事に残します。",
        sections: [
          { heading: "研修後に使用率が落ちるのはなぜですか？", paragraphs: ["教室は公開例、会社は自社ファイルと顧客名と期限です。最初の業務が指名されないと、授業で終わります。半日は概念、半日は部門ごとに1本の実案件です。"] },
          { heading: "公的なAIコーチ計画と、私たちの伴走はどう違いますか？", paragraphs: ["香港生産力促進局は企業のAI活用を推進し、「一企業一 AI Coach」という名称の仕組みがあります。これは計画の名前であり、InnovateXPのサービス名ではありません。公式文言は依拠前に確認してください。私たちの順序は、説明できるAI training、自社文書でのAI workshop、今の表と連絡手段へのAI integrationです。"] },
          { heading: "3種類の会社の第一歩は？", paragraphs: ["研修センターは教材の下書き、講師が事実を直す。福祉は通知と事例要約の下書き、機微情報は先に隠す。専門サービスは議事をタスクにし、金額と約束は人に残す。Agilizingの10日から3時間、月あたり少なくともHK$50,000は教材の一本であり、汎用授業ではありません。TVPなどの助成は申請前に公式確認です。"] },
        ],
        faqs: [
          { question: "何人からできますか？", answer: "3〜30人です。小さいチームの方が翌日に使いやすいです。" },
          { question: "助成はありますか？", answer: "当期の制度によります。例えばTVP。名称と資格は申請前に確認してください。" },
          { question: "1回のワークショップで伴走の代わりになりますか？", answer: "通常はなりません。ワークショップは最初の本物、30日は使われない出力と権限を扱います。" },
        ],
      }),
      de: copy("de", {
        title: "KI-Schulung oder Begleitung: warum ein Workshop nicht reicht",
        excerpt: "Eine Schulung lehrt die Praxis. Ein Workshop plus echtes Projekt und 30 Tage Begleitung erreichen den Alltag.",
        directAnswer:
          "Eine KI-Schulung kann praktische generative KI lehren. Viele Teams hören auf, wenn der Raum leer ist. Ein Workshop am echten Projekt und 30 Tage Begleitung tragen die Arbeit in den nächsten Morgen.",
        sections: [
          { heading: "Warum fällt die Nutzung nach der Schulung?", paragraphs: ["Der Kurs nutzt öffentliche Beispiele. Das Büro hat Ihre Dateien, Kundennamen und Fristen. Ohne einen benannten ersten Ablauf bleibt es ein Kurs. Ein halber Tag Idee, ein halber Tag ein Ablauf pro Team."] },
          { heading: "Wie hängt ein öffentliches KI-Coach-Programm zusammen, ohne unser Name zu werden?", paragraphs: ["Der Hong Kong Productivity Council fördert KI in Unternehmen, einschließlich einer Anordnung mit dem Namen 「一企業一 AI Coach」. Das ist der Programmname. Nur zitieren. Es ist kein InnovateXP-Dienst. Offiziellen Wortlaut prüfen, bevor Sie sich darauf stützen. Unsere Folge: AI training, das man erklären kann, ein AI workshop an Ihren Unterlagen, dann AI integration in Tabelle und Kanal, die Sie schon nutzen."] },
          { heading: "Wie sieht der Einstieg für drei Arten von Teams aus?", paragraphs: ["Ein Schulungszentrum entwirft ein Modul, die Lehrperson korrigiert Fakten. Ein sozialer Träger entwirft Hinweise und Fallzusammenfassungen nach Maskierung. Eine Kanzlei macht aus Notizen Aufgaben und lässt Beträge bei einem Menschen. Agilizings 10 Tage auf 3 Stunden und mindestens HK$50.000 im Monat war dieser Materialweg, kein allgemeiner Kurs. TVP vor dem Antrag amtlich prüfen."] },
        ],
        faqs: [
          { question: "Wie viele Personen brauchen wir?", answer: "Drei bis dreißig. Ein kleines Team entscheidet schneller, der nächste Tag nutzt das Ergebnis eher." },
          { question: "Gibt es eine Förderung?", answer: "Je nach aktuellem Programm, zum Beispiel TVP. Name und Anspruch vor dem Antrag prüfen." },
          { question: "Ersetzt ein Workshop die Begleitung?", answer: "Meist nicht. Der Workshop liefert das erste echte Stück. 30 Tage behandeln ungenutzte Ausgabe, Korrektur und Rechte." },
        ],
      }),
    },
  },
  {
    slug: "generative-engine-optimization-geo",
    date: "2026-10-19",
    order: 14,
    locales: {
      "zh-hk": copy("zh-hk", {
        title: "生成式引擎優化 GEO：點樣等 ChatGPT 推薦你間公司？",
        excerpt: "生成式引擎優化（GEO）令 AI 答案引用你：開篇直接答、FAQ、schema，同第三方提及。",
        directAnswer:
          "生成式引擎優化（GEO）係令 AI 答案引用你：開篇直接答、加 FAQ 同 schema、統一公司描述，並喺第三方被提及。",
        sections: [
          {
            heading: "SEO、GEO 同 AEO 有咩分別？",
            paragraphs: [
              "SEO 爭搜尋結果排名。GEO 爭 AI 答案入面嘅引用同推薦。AEO 係把頁面寫成問題嘅直接答案，等摘錄引擎拎到一句完整回覆。三樣疊加，唔係二揀一。",
              "中小企做得到嘅五步：一，每頁第一段用四十至六十字答「你做咩、幫邊個、有咩業主確認結果」。二，小題用問句。三，頁尾 FAQ 配 FAQPage。四，公司名、人名稱謂、服務描述各頁一致。五，商會、媒體、目錄有你嘅正確名。",
            ],
          },
          {
            heading: "點樣用自己網站睇前後，而唔係估？",
            paragraphs: [
              "Search Console 睇邊條查詢帶來展示同點擊。改完直接答案同 FAQ 之後，用同一組買家問題再問 ChatGPT 同搜尋摘要，記錄有冇引用你嘅網址或公司名。前後至少隔幾個星期，唔好第二日就宣布成功。",
              "Agilizing 由 10 日縮至 3 小時，可以寫進案例頁，因為係業主確認數字。未核實嘅百分比唔好寫成事實，AI 會照引。免費 AI Visibility 迷你檢查係一個起點，用來睇 AI 而家點介紹你，而唔係保證排名。",
            ],
          },
          {
            heading: "改完一頁之後，你記錄咩？",
            paragraphs: [
              "同一組五條買家問題，改頁前後各問一次，記下：有冇提到 InnovateXP 或你公司名、有冇引用網址、答案同你網站第一段一唔一致。不一致就改第一段，而唔係再寫一篇空泛文章。",
              "第三方提及要同你網站用同一個服務描述。商會簡介寫「賣軟件」，網站寫「先執流程」，AI 就會揀其中一句，而且多數揀錯。生成式引擎優化 GEO 係把你已經做緊嘅事講清楚，唔係製造你未做過嘅成果。",
              "每頁只答一個問題。顧問頁答點樣開始，私人 AI 頁答資料點樣留低，案例頁答已核實數字。混埋一頁，摘錄就會取錯句。schema 要同可見文字一致，唔好喺 JSON-LD 寫一個網站冇寫嘅承諾。改完用同一組問題再問，先至知道有冇引用。目錄、商會同媒體嘅名稱要同網站一樣，包括「InnovateXP」同服務一句話。多一個別名，AI 就會當成兩間公司。生成式引擎優化 GEO 唔取代你同客人傾偈，只係令已經寫清楚嘅答案可以被引用。問句小標要係客人真係會打嘅問題，唔好用內部專案代號。答不到嘅問題，寧願唔開小標。引用出現之後，核對佢引嘅係邊一段，再收窄該段，而唔係再加一千字。生成式引擎優化 GEO 獎勵清楚，唔獎勵長。一頁一個問題就夠。多過一個，摘錄就會揀錯句，再改要由頭計。同日改、同日判，睇唔到分別。至少隔兩個星期再問同一組問題，先記低有冇引用。",
            ],
          },
        ],
        faqs: [
          { question: "做 GEO 要唔要放棄 SEO？", answer: "唔使。GEO 建基於頁面可以被找到、標題清楚、內容答到問題。SEO 仍然係底。" },
          { question: "幾耐先見到 AI 開始引用？", answer: "通常兩至三個月先觀察到引用有冇出現。中間要改頁同記錄同一組問題，而唔係每日改口。" },
          { question: "迷你檢查同完整診斷有咩分別？", answer: "迷你檢查用少數買家問題睇 AI 點介紹你。完整診斷先至比較競爭對手同排優先次序。預約業務聽診：innovatexp.co/bookme。" },
        ],
      }),
      "zh-tw": copy("zh-tw", {
        title: "生成式引擎優化 GEO：如何讓 ChatGPT 推薦你的公司？",
        excerpt: "生成式引擎優化（GEO）讓 AI 答案引用你：開篇直接答、FAQ、schema，以及第三方提及。",
        directAnswer:
          "生成式引擎優化（GEO）是讓 ChatGPT、Google AI 摘要等答案引用或推薦你。每頁開頭直接回答，加上 FAQ 與 schema，統一公司名與服務描述，並在第三方被提及。",
        sections: [
          { heading: "SEO、GEO 與 AEO 有什麼差別？", paragraphs: ["SEO 爭搜尋排名。GEO 爭 AI 答案中的引用。AEO 把頁面寫成可摘錄的直接答案。三者疊加。中小企業五步：開篇直接答、問句小標、FAQ 與 FAQPage、各頁名稱一致、商會與目錄出現正確名稱。"] },
          { heading: "如何用自己的網站看前後？", paragraphs: ["用 Search Console 看查詢。改完直接答案與 FAQ 後，用同一組買家問題再問，記錄有沒有引用網址或公司名。Agilizing 由 10 日縮至 3 小時 可以寫，因為已核實。未核實百分比不要寫成事實。免費 AI Visibility 迷你檢查是起點，不是排名保證。"] },
        ],
        faqs: [
          { question: "做 GEO 要放棄 SEO 嗎？", answer: "不用。GEO 建基於找得到、標題清楚、內容回答問題。" },
          { question: "多久看到 AI 開始引用？", answer: "通常兩到三個月才觀察引用是否出現。" },
          { question: "迷你檢查和完整診斷有何不同？", answer: "迷你檢查用少數問題看 AI 如何介紹你。完整診斷才比較競爭對手。預約：innovatexp.co/bookme。" },
        ],
      }),
      en: copy("en", {
        title: "Generative engine optimization: how ChatGPT mentions your firm",
        excerpt: "GEO helps AI answers cite you: a direct opening, FAQs, schema, and third-party mentions.",
        directAnswer:
          "Generative engine optimization (GEO) is how ChatGPT, Google AI summaries, and similar answers cite or recommend you. Open each page with a direct answer, add FAQs and schema, keep the company name and service description consistent, and be mentioned on third-party sites.",
        sections: [
          { heading: "How do SEO, GEO, and AEO differ?", paragraphs: ["SEO competes for ranked links. GEO competes for a citation inside an AI answer. AEO writes the page as an answer an extractor can lift. You stack them. Five steps a small firm can do: a short opening that says what you do, who you help, and which result is verified; question headings; an FAQ with FAQPage; the same name and service line on every page; and correct mentions in chambers, press, and directories."] },
          { heading: "How do you compare your own site instead of guessing?", paragraphs: ["Search Console shows queries, impressions, and clicks. After you change the opening and the FAQ, ask the same buyer questions again and record whether your URL or name appears. Wait weeks, not a day. Agilizing’s 10 days to 3 hours can be stated because it is verified. An unverified percentage should not be written as fact; an answer engine will repeat it. A free AI Visibility mini check shows how AI introduces you now. It does not guarantee rank."] },
        ],
        faqs: [
          { question: "Do we drop SEO to do GEO?", answer: "No. GEO sits on pages that can be found, with clear titles and answers." },
          { question: "How long before an AI answer cites you?", answer: "Usually two to three months of watching the same question set, not a verdict the next morning." },
          { question: "How is a mini check different from a full diagnosis?", answer: "A mini check uses a few buyer questions. A full diagnosis compares competitors and sets priority. Book a workflow diagnosis at innovatexp.co/bookme." },
        ],
      }),
      ja: copy("ja", {
        title: "生成エンジン最適化GEO：ChatGPTに会社を推薦させるには",
        excerpt: "GEOは、冒頭の直接回答、FAQ、schema、第三者言及でAIの回答に引用されることです。",
        directAnswer:
          "生成エンジン最適化（GEO）は、ChatGPTやGoogleのAI要約があなたを引用または推薦するようにすることです。各ページの冒頭で答え、FAQとschemaを足し、社名とサービス説明を揃え、第三者サイトで言及されます。",
        sections: [
          { heading: "SEO、GEO、AEOの違いは？", paragraphs: ["SEOは順位、GEOはAI回答内の引用、AEOは抜き出せる直接回答です。三つは重ねます。小さな会社の5歩は、何をするか・誰を助けるか・確認済みの結果を短く書く、見出しを質問にする、FAQとFAQPage、各ページで名称を揃える、商工会や名簿に正しい名前を出すことです。"] },
          { heading: "自社サイトで前後を見るには？", paragraphs: ["Search Consoleでクエリを見ます。冒頭とFAQを変えたあと、同じ買い手の質問で再確認し、URLや社名が出るかを記録します。数週間空けます。Agilizingの10日から3時間、月あたり少なくともHK$50,000は確認済みなので書けます。未確認の割合は事実にしないでください。無料のAI Visibilityミニチェックは、今AIがどう紹介するかを見る起点であり、順位の保証ではありません。"] },
        ],
        faqs: [
          { question: "GEOのためにSEOをやめますか？", answer: "やめません。見つかるページと明確な答えの上に乗ります。" },
          { question: "引用が見えるまでどれくらい？", answer: "同じ質問セットで通常2〜3か月です。" },
          { question: "ミニチェックと完全な診断の違いは？", answer: "ミニチェックは少数の質問です。完全な診断は競合と比べ優先順位を付けます。予約は innovatexp.co/bookme。" },
        ],
      }),
      de: copy("de", {
        title: "Generative Engine Optimization: wie ChatGPT Ihre Firma nennt",
        excerpt: "GEO hilft KI-Antworten, Sie zu zitieren: direkter Anfang, FAQ, Schema und Erwähnungen Dritter.",
        directAnswer:
          "Generative Engine Optimization (GEO) sorgt dafür, dass ChatGPT, Google-KI-Zusammenfassungen und ähnliche Antworten Sie zitieren oder empfehlen. Jede Seite beginnt mit einer direkten Antwort, plus FAQ und Schema, einheitlichem Namen und Beschreibung, und Erwähnungen auf fremden Seiten.",
        sections: [
          { heading: "Wie unterscheiden sich SEO, GEO und AEO?", paragraphs: ["SEO kämpft um den Rang. GEO kämpft um das Zitat in der KI-Antwort. AEO schreibt die Seite als hebbare Antwort. Sie stapeln sie. Fünf Schritte: eine kurze Öffnung mit Leistung, Zielgruppe und belegtem Ergebnis; Frageüberschriften; FAQ mit FAQPage; derselbe Name auf jeder Seite; korrekte Nennungen in Kammern, Presse und Verzeichnissen."] },
          { heading: "Wie vergleichen Sie die eigene Website statt zu raten?", paragraphs: ["Die Search Console zeigt Suchanfragen. Nach Änderung von Öffnung und FAQ stellen Sie dieselben Käuferfragen erneut und notieren, ob URL oder Name erscheint. Warten Sie Wochen. Agilizings 10 Tage auf 3 Stunden und mindestens HK$50.000 im Monat dürfen stehen, weil sie belegt sind. Ein ungeprüfter Prozentsatz wird von der Antwortmaschine wiederholt, also nicht als Fakt schreiben. Ein kostenloser AI-Visibility-Mini-Check zeigt, wie KI Sie heute vorstellt. Er garantiert keinen Rang."] },
        ],
        faqs: [
          { question: "Geben wir SEO für GEO auf?", answer: "Nein. GEO steht auf findbaren Seiten mit klaren Antworten." },
          { question: "Wie lange bis zu einem Zitat?", answer: "Meist zwei bis drei Monate bei demselben Fragensatz." },
          { question: "Was unterscheidet Mini-Check und volle Diagnose?", answer: "Der Mini-Check nutzt wenige Fragen. Die Diagnose vergleicht Wettbewerber. Buchung: innovatexp.co/bookme." },
        ],
      }),
    },
  },
  {
    slug: "ai-consultant-vs-management-consultant-vs-saas",
    date: "2026-10-20",
    order: 15,
    locales: {
      "zh-hk": copy("zh-hk", {
        title: "AI 顧問 vs 管理顧問 vs SaaS 供應商",
        excerpt: "管理顧問交報告，SaaS 賣軟件，AI 顧問由聽診開始落地流程再陪團隊用順。",
        directAnswer:
          "管理顧問多數交報告，SaaS 賣軟件。AI 顧問由聽診落地流程再陪團隊用順。想要專業顧問支援，可以由一條流程試起。",
        sections: [
          {
            heading: "三類供應者，交嘢有咩唔同？",
            paragraphs: [
              "管理顧問擅長診斷同建議，成果往往係報告同簡報。SaaS 供應商賣一個登入，成功取決於你團隊肯唔肯改習慣。AI 顧問如果名實相符，會留低流程、覆核位同人用得落嘅助手，而唔係只留一份建議。",
              "專業顧問支援喺呢度係指有人同你一齊改一條線，而唔係代你做晒日常營運。AI Automation Consulting 同一般 IT 外判嘅分別：外判按規格交系統；顧問先問呢個規格係咪你而家嘅樽頸。",
            ],
          },
          {
            heading: "邊種情況揀邊類？",
            paragraphs: [
              "你已經知道要邊個功能、只差人寫，先搵開發或 SaaS。你未知道問題係工具定係責任，先做聽診。你要董事會一份獨立意見、而唔係落地，先搵管理顧問。三樣可以先後做，唔使同一日簽齊。",
              "Agilizing 由 10 日縮至 3 小時，係一條教材流程嘅前後，唔係買一套平台之後自動出現。未睇你條線之前，唔會把呢個數字寫成你嘅預測。",
            ],
          },
          {
            heading: "一份比較，點樣先唔會變成銷售稿？",
            paragraphs: [
              "用四欄就夠：誰負責診斷、一個月內交咩、邊個擁有數據、停約之後你仲有咩。報告、登入、流程圖係三種唔同嘅交付。如果你需要嘅係流程圖同人用得落，就唔好用軟件名單代替。",
              "專業顧問支援可以同 SaaS 先後發生。先聽診，證明缺一個現成功能，先至買。AI Automation Consulting 喺呢個順序入面係中間嗰段：把規格問清楚，再決定外判定係用現有工具。大項目留到一條線已經行順。",
              "問外判三句：停約之後流程圖歸邊個、數據可唔可以匯出、邊個負責同事第二日仍然用。三句答唔到，就未到簽開發嘅時候。管理顧問報告可以幫你對董事會解釋，但解釋完仍然要有人落地。三類人可以合作，次序先係聽診，再係工具。專業顧問支援嘅檢驗好簡單：一個月後，除咗顧問之外，有冇同事可以示範條流程。示範唔到，就係報告或者登入，未算落地。AI Automation Consulting 要交到呢個示範，而唔係再加一個未有人用嘅帳號。如果三方同時提案，先要求各用同一條流程寫：一個月交咩、邊個擁有數據、停約剩低咩。冇共同題目，比較表就只係廣告並列。專業顧問支援唔等於最長嘅建議書。最短而答到三句嘅，先值得進入下一步。答唔到就繼續聽，唔好簽。簽完先問，已經遲。比較要喺簽約之前，而且要用同一條流程。題目唔同，表就冇用。先統一題目，再比價錢，唔好靠估。",
            ],
          },
        ],
        faqs: [
          { question: "AI 顧問會唔會取代管理顧問？", answer: "唔會。管理顧問仍然適合獨立評估同組織設計。AI 顧問適合要親手改一條流程、並陪團隊用順嘅情況。" },
          { question: "買 SaaS 之前使唔使顧問？", answer: "如果你未能量度邊一步最慢，先聽診再買。如果你已經清楚缺一個現成功能，可以直接試軟件，但仍然要有人負責採用。" },
          { question: "可唔可以先做一條流程？", answer: "可以。Snapshot HK$3,880，Discovery Sprint 10 人或以下 HK$6,880 起。預約：innovatexp.co/bookme。" },
        ],
      }),
      "zh-tw": copy("zh-tw", {
        title: "AI 顧問 vs 管理顧問 vs SaaS 供應商",
        excerpt: "管理顧問交報告，SaaS 賣軟件，AI 顧問由診斷開始落地流程再陪團隊用順。",
        directAnswer:
          "管理顧問多數交報告，SaaS 供應商賣軟件。AI 顧問由診斷開始，親手落地流程與助手，再陪團隊用到順。想要專業顧問支援又不想一開始簽大專案，可以由一條流程試起。",
        sections: [
          { heading: "三類供應者交出的東西有何不同？", paragraphs: ["管理顧問的成果常常是報告。SaaS 賣一個登入，成敗在團隊肯不肯改習慣。名實相符的 AI 顧問留下流程、覆核位和用得上的助手。專業顧問支援是有人跟你改一條線，不是代做日常營運。AI Automation Consulting 與一般 IT 外包的差別：外包按規格交系統；顧問先問這個規格是不是現在的瓶頸。"] },
          { heading: "什麼情況選哪一類？", paragraphs: ["已經知道要哪個功能，才找開發或 SaaS。還不知道是工具還是責任，先診斷。要一份獨立意見而不是落地，才找管理顧問。Agilizing 由 10 日縮至 3 小時，是一條教材流程的前後，不是買平台後自動出現。"] },
        ],
        faqs: [
          { question: "AI 顧問會取代管理顧問嗎？", answer: "不會。管理顧問仍適合獨立評估與組織設計。AI 顧問適合要親手改一條流程並陪團隊用順。" },
          { question: "買 SaaS 之前需要顧問嗎？", answer: "如果還能量度不到最慢的一步，先診斷再買。如果已清楚缺一個現成功能，可以直接試，但仍要有人負責採用。" },
          { question: "可以先做一條流程嗎？", answer: "可以。Snapshot HK$3,880，10 人以下 Discovery Sprint HK$6,880 起。預約：innovatexp.co/bookme。" },
        ],
      }),
      en: copy("en", {
        title: "AI consultant vs management consultant vs SaaS vendor",
        excerpt: "Management consultants leave a report. SaaS vendors sell software. An AI consultant lands one workflow and stays while the team adopts it.",
        directAnswer:
          "A management consultant usually leaves a report. A SaaS vendor sells software. An AI consultant starts with a diagnosis, lands the workflow and the assistant, and stays until the team runs it. If you want professional support without a large contract first, start with one workflow.",
        sections: [
          { heading: "What does each party actually hand over?", paragraphs: ["Management consulting is strong at diagnosis and advice; the artefact is often a report. SaaS sells a login; success depends on whether habits change. An AI consultant who matches the name leaves a path, a review point, and an assistant people use. Professional support here means someone changes one line with you, not someone who runs your whole operation. AI Automation Consulting differs from ordinary IT outsourcing: outsourcing delivers to a specification; consulting first asks whether that specification is the bottleneck."] },
          { heading: "When do you choose which?", paragraphs: ["If you already know the missing feature, talk to a builder or a SaaS vendor. If you cannot tell tool from ownership, diagnose first. If you need an independent opinion for a board and not a landed workflow, use a management consultant. You can sequence them. Agilizing’s 10 days to 3 hours is the before-and-after of one materials path, not a number that appears after buying a platform. It is not your forecast."] },
        ],
        faqs: [
          { question: "Does an AI consultant replace a management consultant?", answer: "No. Management consulting still fits independent assessment and organisation design. AI consulting fits landing one workflow and staying for adoption." },
          { question: "Do we need a consultant before SaaS?", answer: "If you cannot yet measure the slowest step, diagnose before you buy. If you already know the missing feature, trial the software, and still name an owner for adoption." },
          { question: "Can we start with one workflow?", answer: "Yes. Snapshot is HK$3,880. Discovery Sprint starts at HK$6,880 for up to 10 people. Book at innovatexp.co/bookme." },
        ],
      }),
      ja: copy("ja", {
        title: "AI顧問と経営コンサルタントとSaaSの違い",
        excerpt: "経営顧問は報告書、SaaSはソフト、AI顧問は診断から手順を落地し、チームが回るまで伴います。",
        directAnswer:
          "経営コンサルタントは報告書を残し、SaaSはソフトウェアを売ります。AI顧問は診断から始め、手順と助手を渡し、チームが回るまで伴います。大きな契約の前に専門的な支援が要るなら、業務は1本から試します。",
        sections: [
          { heading: "三者は何を渡しますか？", paragraphs: ["経営顧問の成果物は報告書であることが多いです。SaaSはログインを売り、習慣が変わるかに成否がかかります。名のとおりのAI顧問は、経路、確認点、人が使う助手を残します。ここでの専門顧問支援は、一本の線を一緒に変えることで、日常運用の代行ではありません。AI Automation Consulting と一般的なIT外注の違いは、外注が仕様どおりに渡し、顧問はその仕様が今のボトルネックかを先に問うことです。"] },
          { heading: "どの場合にどれを選びますか？", paragraphs: ["足りない機能が分かっているなら開発かSaaS。道具か責任か分からないなら先に診断。落地ではなく取締役向けの独立意見なら経営顧問。Agilizingの10日から3時間、月あたり少なくともHK$50,000は教材1本の前後であり、プラットフォーム購入後に自動で出る数字ではありません。"] },
        ],
        faqs: [
          { question: "AI顧問は経営顧問を置き換えますか？", answer: "置き換えません。独立評価と組織設計は経営顧問、一本を落地して採用まで伴うのはAI顧問です。" },
          { question: "SaaSの前に顧問は必要ですか？", answer: "いちばん遅いステップを測れないなら、買う前に診断します。機能が明確なら試せますが、採用の担当は必要です。" },
          { question: "業務1本から始められますか？", answer: "できます。SnapshotはHK$3,880。10人以下のDiscovery SprintはHK$6,880から。予約は innovatexp.co/bookme。" },
        ],
      }),
      de: copy("de", {
        title: "KI-Berater, Managementberater oder SaaS-Anbieter",
        excerpt: "Managementberater lassen einen Bericht. SaaS verkauft Software. Ein KI-Berater setzt einen Ablauf und bleibt bei der Annahme.",
        directAnswer:
          "Ein Managementberater lässt meist einen Bericht. Ein SaaS-Anbieter verkauft Software. Ein KI-Berater beginnt mit der Diagnose, setzt Ablauf und Assistent um und bleibt, bis das Team ihn trägt. Wer fachliche Unterstützung ohne Großvertrag will, startet mit einem Ablauf.",
        sections: [
          { heading: "Was übergibt jede Seite?", paragraphs: ["Managementberatung ist stark in Diagnose und Rat; das Artefakt ist oft ein Bericht. SaaS verkauft einen Login; Erfolg hängt an geänderten Gewohnheiten. Ein KI-Berater, der den Namen trägt, lässt einen Weg, einen Prüfpunkt und einen genutzten Assistenten. Fachliche Unterstützung heißt hier, eine Linie mit Ihnen zu ändern, nicht den ganzen Betrieb zu führen. AI Automation Consulting unterscheidet sich von gewöhnlichem IT-Outsourcing: Outsourcing liefert nach Spezifikation; Beratung fragt zuerst, ob diese Spezifikation der Engpass ist."] },
          { heading: "Wann wählen Sie wen?", paragraphs: ["Kennen Sie die fehlende Funktion, sprechen Sie mit Bau oder SaaS. Können Sie Werkzeug und Verantwortung nicht trennen, diagnostizieren Sie zuerst. Braucht der Vorstand eine unabhängige Meinung und keinen gesetzten Ablauf, nehmen Sie Managementberatung. Agilizings 10 Tage auf 3 Stunden und mindestens HK$50.000 im Monat ist das Vorher-nachher eines Materialwegs, keine Zahl, die nach einem Plattformkauf erscheint, und nicht Ihre Prognose."] },
        ],
        faqs: [
          { question: "Ersetzt der KI-Berater den Managementberater?", answer: "Nein. Unabhängige Bewertung und Organisationsdesign bleiben Managementberatung. Einen Ablauf setzen und bei der Annahme bleiben ist KI-Beratung." },
          { question: "Brauchen wir Beratung vor SaaS?", answer: "Wenn Sie den langsamsten Schritt noch nicht messen, diagnostizieren Sie vor dem Kauf. Kennen Sie die Funktion, testen Sie die Software und benennen Sie trotzdem einen Owner." },
          { question: "Können wir mit einem Ablauf starten?", answer: "Ja. Snapshot HK$3.880. Discovery Sprint ab HK$6.880 für bis zu 10 Personen. Buchung: innovatexp.co/bookme." },
        ],
      }),
    },
  },
];
