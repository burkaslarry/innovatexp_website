import { getSessionCreditsCopy, type SessionCreditsCopy } from "@/content/session-credits";
import type { AppLocale } from "@/lib/i18n-routing";

type ClinicCopy = Pick<
  SessionCreditsCopy,
  | "metaTitle" | "metaDescription" | "title" | "lead" | "boundary" | "sessionRule" | "buyRule"
  | "ctaNote" | "careNote" | "seriesHeading" | "seriesIntro" | "steps" | "sameLine"
  | "whatsappLabel" | "whatsappPrefill" | "notThis" | "diagnosisLink" | "productsLink"
>;

/** Same prepaid packs as session credits; only the framing and booking rules change. */
const CLINIC: Record<AppLocale, ClinicCopy> = {
  "zh-hk": {
    metaTitle: "Vibe Code 門診｜已上線項目｜InnovateXP",
    metaDescription:
      "預約制，一節兩小時用 300 點。帶一條已上線嘅線嚟，即場起第一版、同場定好覆核人。只限已有項目、流程、系統或網店嘅客戶，唔係 AI 導入方案。",
    title: "Vibe Code 門診",
    lead: "門診係掛號制：一節兩小時，用 300 點。你帶一條已經喺度行緊嘅線，我哋即場起第一版，同場寫好咩算做完、邊個覆核。未有上線項目，唔可以掛號。",
    boundary: "門診只處理已經上線嘅一條線。新流程、新系統、新網店要先做業務聽診，唔可以用門診鐘數代替導入。",
    sessionRule: "1 節 = 2 小時 = 300 點，需預先預約",
    buyRule:
      "只可以買 1,000、2,000 或 4,000 點。1,000 點冇贈送；2,000 送 200 點；4,000 送 400 點。點數只喺同一條線用。",
    ctaNote:
      "撳按鈕會開 WhatsApp 去 9310 3031 掛號：講明邊一條線、想帶走咩，我哋先確認有冇空檔，再開點數同預約時間。即場 walk-in 唔接受。",
    careNote: "System Care 月費買嘅係回應時間，唔包門診鐘數；門診按點數另計。Priority 客戶可優先排期。",
    seriesHeading: "一節門診做咩",
    seriesIntro:
      "帶一條已經喺度行緊嘅線，四選一：教材、報價、WhatsApp 跟進、收據分類。一節只做一條，唔會四條一齊做。",
    steps: [
      "開場講清楚今日帶走咩：一版可覆核嘅草稿，定係一條改好嘅規則。",
      "AI 即場出第一版，你按自己嘅例子指出漏咗咩。",
      "收工前寫低：邊個覆核、下一節之前要準備咩。",
    ],
    sameLine:
      "點數同預約都用喺同一條線。1,000 點夠 3 節，餘 100 點留到下一節。換線就當新一輪，要重新掛號。",
    whatsappLabel: "用 WhatsApp 掛號",
    whatsappPrefill: (credits, price) =>
      `我想掛 Vibe Code 門診 ${credits}（${price}）。已上線、只做一條：教材／報價／WhatsApp 跟進／收據分類。想預約嘅時段：`,
    notThis: "門診唔係 AI 導入收費。",
    diagnosisLink: "未有上線項目，去業務聽診",
    productsLink: "已上線項目嘅即時問診點數",
  },
  "zh-tw": {
    metaTitle: "Vibe Code 門診｜已上線專案｜InnovateXP",
    metaDescription:
      "預約制，一節兩小時使用 300 點。帶一條已上線的線來，現場起第一版、當場定好覆核人。只限已有專案、流程、系統或網店的客戶，不是 AI 導入方案。",
    title: "Vibe Code 門診",
    lead: "門診是掛號制：一節兩小時，使用 300 點。你帶一條已經在運行的線，我們現場起第一版，當場寫好什麼算完成、誰來覆核。沒有上線專案，不能掛號。",
    boundary: "門診只處理已經上線的一條線。新流程、新系統、新網店要先做業務診斷，不能用門診時數代替導入。",
    sessionRule: "1 節 = 2 小時 = 300 點，需事先預約",
    buyRule:
      "只可以買 1,000、2,000 或 4,000 點。1,000 點沒有贈送；2,000 送 200 點；4,000 送 400 點。點數只用在同一條線。",
    ctaNote:
      "按下按鈕會開啟 WhatsApp 至 9310 3031 掛號：說明哪一條線、想帶走什麼，我們先確認時段，再開點數與預約時間。不接受現場 walk-in。",
    careNote: "System Care 月費買的是回應時間，不含門診時數；門診按點數另計。Priority 客戶可優先排期。",
    seriesHeading: "一節門診做什麼",
    seriesIntro:
      "帶一條已經在運行的線，四選一：教材、報價、WhatsApp 跟進、收據分類。一節只做一條，不會四條一起做。",
    steps: [
      "開場講清楚今天帶走什麼：一版可覆核的草稿，還是一條改好的規則。",
      "AI 現場出第一版，你按自己的例子指出漏了什麼。",
      "結束前寫下：誰覆核、下一節之前要準備什麼。",
    ],
    sameLine:
      "點數與預約都用在同一條線。1,000 點夠 3 節，餘 100 點留到下一節。換線視為新一輪，要重新掛號。",
    whatsappLabel: "用 WhatsApp 掛號",
    whatsappPrefill: (credits, price) =>
      `我想掛 Vibe Code 門診 ${credits}（${price}）。已上線、只做一條：教材／報價／WhatsApp 跟進／收據分類。想預約的時段：`,
    notThis: "門診不是 AI 導入收費。",
    diagnosisLink: "還沒有上線專案，前往業務診斷",
    productsLink: "已上線專案的即時問診點數",
  },
  en: {
    metaTitle: "Vibe Code Clinic for live projects | InnovateXP",
    metaDescription:
      "By appointment. One two-hour session uses 300 credits. Bring one line that is already live; we build the first version and agree the reviewer in the room. Not an AI implementation package.",
    title: "Vibe Code Clinic",
    lead: "The clinic runs by appointment: one two-hour session, 300 credits. Bring one line that is already running. We build the first version in the room and write down what counts as done and who approves it. No live project, no appointment.",
    boundary: "The clinic handles one line that is already live. New workflows, systems or shops start with a business diagnosis; clinic hours do not replace implementation.",
    sessionRule: "1 session = 2 hours = 300 credits, booked in advance",
    buyRule:
      "Buy 1,000, 2,000, or 4,000 credits only. 1,000 has no bonus; 2,000 includes 200; 4,000 includes 400. Credits stay on one line.",
    ctaNote:
      "The button opens WhatsApp to 9310 3031: tell us which line and what you want to take away. We confirm a slot first, then activate credits and book the time. No walk-ins.",
    careNote: "System Care buys response time, not clinic hours. Clinic time is billed in credits; Priority clients get first pick of slots.",
    seriesHeading: "What one clinic session covers",
    seriesIntro:
      "Bring one line that is already running, and choose one: courseware, a quotation, WhatsApp follow-up, or receipt sorting. One line per session.",
    steps: [
      "Open by naming what you leave with: one reviewable draft, or one fixed rule.",
      "AI drafts in the room. You mark what it missed against your own examples.",
      "Before you leave, write down who approves it and what to prepare for the next session.",
    ],
    sameLine:
      "Credits and bookings stay on the same line. 1,000 credits covers 3 sessions with 100 left over. A different line is a new round and a new appointment.",
    whatsappLabel: "Book on WhatsApp",
    whatsappPrefill: (credits, price) =>
      `I want to book the Vibe Code Clinic, ${credits} credits (${price}). Already live, one line only: courseware / quotation / WhatsApp follow-up / receipt sorting. Preferred slots:`,
    notThis: "The clinic is not AI implementation pricing.",
    diagnosisLink: "No live project yet — book a diagnosis",
    productsLink: "Session credits for a live project",
  },
  ja: {
    metaTitle: "Vibe Code クリニック｜稼働中案件｜InnovateXP",
    metaDescription:
      "予約制。1セッション2時間で300クレジット。稼働中の業務を一つ持ち込み、その場で初版を作り、確認者を決めます。AI導入パッケージではありません。",
    title: "Vibe Code クリニック",
    lead: "クリニックは予約制です。1セッション2時間、300クレジット。すでに動いている業務を一つ持ち込んでください。その場で初版を作り、何が完了で誰が確認するかを書き留めます。稼働中の案件がなければ予約できません。",
    boundary: "扱うのは稼働中の業務一つだけです。新しいフロー、システム、ネットショップは業務診断から始めます。クリニックの時間で導入を代替できません。",
    sessionRule: "1セッション = 2時間 = 300クレジット、事前予約制",
    buyRule:
      "購入できるのは 1,000、2,000、4,000 クレジットだけです。1,000 に追加なし。2,000 は 200 追加。4,000 は 400 追加。クレジットは同じ業務にのみ使います。",
    ctaNote:
      "ボタンは WhatsApp 9310 3031 を開きます。どの業務か、何を持ち帰りたいかを伝えてください。空きを確認してから、クレジットと日時を確定します。当日の飛び込みは受け付けません。",
    careNote: "System Care は対応時間を買うもので、クリニックの時間は含みません。クリニックはクレジット別会計です。Priority は優先的に枠を確保できます。",
    seriesHeading: "1セッションの内容",
    seriesIntro:
      "稼働中の業務を一つ持ち込み、教材・見積・WhatsAppフォロー・領収書分類から一つ選びます。1セッションで複数は扱いません。",
    steps: [
      "最初に、今日持ち帰るものを決めます。確認できる初版か、直したルールのどちらかです。",
      "AI がその場で初版を出します。ご自身の例に照らして抜けを指摘します。",
      "終わる前に、誰が確認するか、次回までに何を準備するかを書きます。",
    ],
    sameLine:
      "クレジットと予約は同じ業務に使います。1,000 で 3 セッション、残り 100 は次回へ。別の業務は新しい回として予約し直します。",
    whatsappLabel: "WhatsApp で予約",
    whatsappPrefill: (credits, price) =>
      `Vibe Code クリニック ${credits}（${price}）を予約したいです。稼働中、業務は一つ：教材／見積／WhatsAppフォロー／領収書分類。希望日時：`,
    notThis: "クリニックは AI 導入の料金ではありません。",
    diagnosisLink: "まだ稼働前なら、業務診断へ",
    productsLink: "稼働中案件のセッションクレジット",
  },
  de: {
    metaTitle: "Vibe Code Sprechstunde für laufende Projekte | InnovateXP",
    metaDescription:
      "Nur mit Termin. Eine Sitzung von zwei Stunden kostet 300 Credits. Bringen Sie eine bereits laufende Linie mit; erste Version und Freigabe werden im Termin festgelegt. Kein KI-Einführungspaket.",
    title: "Vibe Code Sprechstunde",
    lead: "Die Sprechstunde läuft nur mit Termin: eine Sitzung von zwei Stunden, 300 Credits. Bringen Sie eine bereits laufende Linie mit. Wir bauen die erste Version im Termin und halten fest, was als fertig gilt und wer freigibt. Ohne laufendes Projekt kein Termin.",
    boundary: "Behandelt wird genau eine bereits laufende Linie. Neue Abläufe, Systeme oder Shops beginnen mit einer Geschäftsdiagnose; Sprechstunden ersetzen keine Einführung.",
    sessionRule: "1 Sitzung = 2 Stunden = 300 Credits, nur mit Termin",
    buyRule:
      "Kaufbar sind nur 1.000, 2.000 oder 4.000 Credits. 1.000 ohne Bonus; 2.000 mit 200; 4.000 mit 400. Credits gelten nur für dieselbe Linie.",
    ctaNote:
      "Der Button öffnet WhatsApp an 9310 3031: nennen Sie die Linie und was Sie mitnehmen wollen. Wir bestätigen zuerst einen Termin und schalten danach Credits frei. Ohne Termin keine Teilnahme.",
    careNote: "System Care kauft Reaktionszeit, keine Sprechstunden. Sprechstunden werden in Credits abgerechnet; Priority-Kunden erhalten Termine zuerst.",
    seriesHeading: "Was eine Sitzung umfasst",
    seriesIntro:
      "Bringen Sie eine laufende Linie mit und wählen Sie eine: Kursmaterial, Angebot, WhatsApp-Nachfassen oder Belegsortierung. Eine Linie pro Sitzung.",
    steps: [
      "Zu Beginn wird festgehalten, was Sie mitnehmen: ein prüfbarer Entwurf oder eine korrigierte Regel.",
      "Die KI erstellt den Entwurf im Termin. Sie markieren an Ihren Beispielen, was fehlt.",
      "Vor dem Ende notieren wir, wer freigibt und was bis zur nächsten Sitzung vorzubereiten ist.",
    ],
    sameLine:
      "Credits und Termine gelten für dieselbe Linie. 1.000 Credits reichen für 3 Sitzungen, 100 bleiben für die nächste. Eine andere Linie ist eine neue Runde mit neuem Termin.",
    whatsappLabel: "Per WhatsApp buchen",
    whatsappPrefill: (credits, price) =>
      `Ich möchte die Vibe Code Sprechstunde buchen, ${credits} Credits (${price}). Bereits live, nur eine Linie: Kursmaterial / Angebot / WhatsApp-Nachfassen / Belegsortierung. Wunschtermine:`,
    notThis: "Die Sprechstunde ist nicht die KI-Einführung.",
    diagnosisLink: "Noch kein laufendes Projekt — Diagnose buchen",
    productsLink: "Session-Guthaben für ein laufendes Projekt",
  },
};

export function getVibeCodeClinicCopy(locale: AppLocale): SessionCreditsCopy {
  return { ...getSessionCreditsCopy(locale), ...CLINIC[locale] };
}
