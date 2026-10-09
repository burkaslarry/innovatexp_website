import type { AppLocale } from "@/lib/i18n-routing";
import { PRICING, formatHkd, sessionCreditListPriceHkd, type PricingLocale } from "@/content/pricing";

export type SessionCreditsCopy = {
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  title: string;
  lead: string;
  boundary: string;
  sessionRule: string;
  buyRule: string;
  recommended: string;
  bestRate: string;
  bonus: (n: number) => string;
  noBonus: string;
  totalCredits: (n: number) => string;
  sessions: (sessions: number, hours: number, remainder: number) => string;
  unit: (price: string) => string;
  prepaid: string;
  ctaNote: string;
  seriesHeading: string;
  seriesIntro: string;
  steps: string[];
  sameLine: string;
  whatsappLabel: string;
  whatsappPrefill: (credits: string, price: string) => string;
  notThis: string;
  diagnosisLink: string;
  productsLink: string;
};

const COPY: Record<AppLocale, SessionCreditsCopy> = {
  "zh-hk": {
    metaTitle: "即時問診點數｜已上線項目｜InnovateXP",
    metaDescription:
      "只限已展示項目同流程、系統或網店升級嘅客戶。1,000 點 HK$3,000，冇贈送；2,000 點 HK$5,600，送 200 點；4,000 點 HK$10,000，送 400 點。唔係 AI 導入方案。",
    kicker: "已上線項目",
    title: "即時問診點數",
    lead: "你已經同我哋展示過項目同流程，系統或者網店升級亦已經喺度行緊。一節兩小時，用 300 點，席上問、席上解決。呢個計劃同 AI 導入方案無關。",
    boundary: "未有上線項目、流程、系統或網店，唔可以買呢組點數。新流程要先做業務聽診，唔好用點數代替導入。",
    sessionRule: "1 節 = 2 小時 = 300 點",
    buyRule: "只可以買 1,000、2,000 或 4,000 點。1,000 點冇贈送。2,000 送 200 點；4,000 送 400 點。",
    recommended: "最常揀",
    bestRate: "每小時最抵",
    bonus: (n) => `送 ${n.toLocaleString("en-HK")} 點`,
    noBonus: "冇贈送",
    totalCredits: (n) => `合共 ${n.toLocaleString("en-HK")} 點`,
    sessions: (sessions, hours, remainder) =>
      remainder > 0
        ? `${sessions} 節 · ${hours} 小時，餘 ${remainder.toLocaleString("en-HK")} 點留到下一節`
        : `${sessions} 節 · ${hours} 小時`,
    unit: (price) => `每小時 ${price}`,
    prepaid: "一次買入，唔係月費",
    ctaNote:
      "撳按鈕會開 WhatsApp 去 9310 3031。我哋確認條線已經上線，你先用 FPS 或銀行轉帳付該包價錢。入帳之後先開點數同預約。",
    seriesHeading: "一節做咩",
    seriesIntro:
      "帶一條已經喺度行緊嘅線，四選一：教材、報價、WhatsApp 跟進、收據分類。一節唔會四條一齊做。",
    steps: [
      "一齊寫低咩算做完、咩算錯。",
      "AI 先出一版，你按嗰啲例子指出漏咗咩。",
      "嗰一條意見寫進下一輪規則，唔會喺評論再寫一次。",
    ],
    sameLine: "卡上嘅節數用喺同一條線。1,000 點夠 3 節，餘 100 點留下一節。換另一條線就當新一輪。",
    whatsappLabel: "用 WhatsApp 發送",
    whatsappPrefill: (credits, price) =>
      `我想買即時問診點數 ${credits}（${price}）。已上線、只做一條：教材／報價／WhatsApp 跟進／收據分類。`,
    notThis: "呢頁唔係 AI 導入收費。",
    diagnosisLink: "未有上線項目，去業務聽診",
    productsLink: "已上線項目的即時問診點數",
  },
  "zh-tw": {
    metaTitle: "即時問診點數｜已上線專案｜InnovateXP",
    metaDescription:
      "只限已展示專案與流程、系統或網店升級的客戶。1,000 點 HK$3,000，沒有加送；2,000 點 HK$5,600，加送 200 點；4,000 點 HK$10,000，加送 400 點。不是 AI 導入方案。",
    kicker: "已上線專案",
    title: "即時問診點數",
    lead: "你已經向我們展示過專案與流程，系統或網店升級也已經在運行。一節兩小時，使用 300 點，當場問、當場解決。這個計劃與 AI 導入方案無關。",
    boundary: "還沒有上線專案、流程、系統或網店，不能購買這組點數。新流程要先做業務診斷，不要用點數代替導入。",
    sessionRule: "1 節 = 2 小時 = 300 點",
    buyRule: "只能購買 1,000、2,000 或 4,000 點。1,000 點沒有加送。2,000 加送 200 點；4,000 加送 400 點。",
    recommended: "最常選",
    bestRate: "每小時最划算",
    bonus: (n) => `加送 ${n.toLocaleString("en-HK")} 點`,
    noBonus: "沒有加送",
    totalCredits: (n) => `合計 ${n.toLocaleString("en-HK")} 點`,
    sessions: (sessions, hours, remainder) =>
      remainder > 0
        ? `${sessions} 節 · ${hours} 小時，餘 ${remainder.toLocaleString("en-HK")} 點留到下一節`
        : `${sessions} 節 · ${hours} 小時`,
    unit: (price) => `每小時 ${price}`,
    prepaid: "一次買入，不是月費",
    ctaNote:
      "按鈕會開啟 WhatsApp 到 9310 3031。我們確認該條線已經上線後，請用 FPS 或銀行轉帳支付該方案。入帳後才開通點數與預約。",
    seriesHeading: "一節做什麼",
    seriesIntro:
      "帶一條已經在跑的線，四選一：教材、報價、WhatsApp 跟進、收據分類。一節不會四條一起做。",
    steps: [
      "一起寫下什麼算做完、什麼算錯。",
      "AI 先出一版，你按那些例子指出漏了什麼。",
      "那一條意見寫進下一輪規則，不會在評論裡再寫一次。",
    ],
    sameLine: "卡片上的節數用在同一條線。1,000 點夠 3 節，餘 100 點留到下一節。換另一條線就當作新的一輪。",
    whatsappLabel: "用 WhatsApp 發送",
    whatsappPrefill: (credits, price) =>
      `我想買即時問診點數 ${credits}（${price}）。已上線、只做一條：教材／報價／WhatsApp 跟進／收據分類。`,
    notThis: "本頁不是 AI 導入收費。",
    diagnosisLink: "還沒有上線專案，前往業務診斷",
    productsLink: "已上線專案的即時問診點數",
  },
  en: {
    metaTitle: "Session credits for live projects | InnovateXP",
    metaDescription:
      "Only after a live project and workflow, system, or shop upgrade. 1,000 credits HK$3,000 with no bonus; 2,000 credits HK$5,600 plus 200; 4,000 credits HK$10,000 plus 400. Not an AI implementation package.",
    kicker: "Already live",
    title: "Session credits",
    lead: "You have already shown us the project and the workflow, and the system or shop upgrade is already running. One session is two hours and 300 credits. We diagnose it and resolve it in that session. This plan is not an AI implementation package.",
    boundary: "If the project, workflow, system, or shop is not already live, you cannot buy these credits. A new workflow starts with a business diagnosis, not with this balance.",
    sessionRule: "1 session = 2 hours = 300 credits",
    buyRule: "You can buy only 1,000, 2,000, or 4,000 credits. The 1,000 pack has no bonus. The 2,000 pack includes 200 bonus credits. The 4,000 pack includes 400.",
    recommended: "Most chosen",
    bestRate: "Lowest rate",
    bonus: (n) => `+${n.toLocaleString("en-HK")} bonus`,
    noBonus: "No bonus",
    totalCredits: (n) => `${n.toLocaleString("en-HK")} credits in total`,
    sessions: (sessions, hours, remainder) =>
      remainder > 0
        ? `${sessions} sessions · ${hours} hours, ${remainder.toLocaleString("en-HK")} credits left for the next session`
        : `${sessions} sessions · ${hours} hours`,
    unit: (price) => `${price} per hour`,
    prepaid: "Prepaid pack, not a monthly fee",
    ctaNote:
      "The button opens WhatsApp to 9310 3031. After we confirm the line is already live, pay that pack by FPS or bank transfer. Credits and the booking open after the payment arrives.",
    seriesHeading: "What one session does",
    seriesIntro:
      "Bring one line that is already running. Choose one: courseware, a quotation, WhatsApp follow-up, or receipt sorting. One session does not cover all four.",
    steps: [
      "We write down what counts as done and what counts as wrong.",
      "AI drafts one version. You mark what it missed against those examples.",
      "That comment is written into the rule for the next round. It is not repeated as another comment.",
    ],
    sameLine:
      "The sessions on a pack stay on that same line. 1,000 credits cover 3 sessions, with 100 credits left. A different line starts a new round.",
    whatsappLabel: "Send on WhatsApp",
    whatsappPrefill: (credits, price) =>
      `I want session credits ${credits} (${price}). The live line is one of: courseware, quotation, WhatsApp follow-up, or receipt sorting.`,
    notThis: "This page is not AI implementation pricing.",
    diagnosisLink: "No live project yet — book a diagnosis",
    productsLink: "Session credits for a live project",
  },
  ja: {
    metaTitle: "稼働中案件のセッションクレジット｜InnovateXP",
    metaDescription:
      "すでに稼働中のプロジェクト向け。1,000クレジット HK$3,000（追加なし）。2,000は HK$5,600 で 200 追加。4,000は HK$10,000 で 400 追加。AI導入パッケージではありません。",
    kicker: "すでに稼働中",
    title: "セッションクレジット",
    lead: "プロジェクトと業務フローをすでに提示し、システムまたはネットショップのアップグレードが動いている方向けです。1セッションは2時間、300クレジット。その場で診断し、その場で解決します。AI導入パッケージとは別です。",
    boundary: "稼働中のプロジェクト、フロー、システム、ネットショップがない場合は購入できません。新しい業務は業務診断から始め、この残高では代替しません。",
    sessionRule: "1セッション = 2時間 = 300クレジット",
    buyRule: "購入できるのは 1,000、2,000、4,000 クレジットだけです。1,000 に追加はありません。2,000 は 200 追加。4,000 は 400 追加。",
    recommended: "いちばん選ばれる",
    bestRate: "1クレジット最安",
    bonus: (n) => `+${n.toLocaleString("en-HK")} 追加`,
    noBonus: "追加なし",
    totalCredits: (n) => `合計 ${n.toLocaleString("en-HK")} クレジット`,
    sessions: (sessions, hours, remainder) =>
      remainder > 0
        ? `${sessions} セッション · ${hours} 時間、残り ${remainder.toLocaleString("en-HK")} は次回へ`
        : `${sessions} セッション · ${hours} 時間`,
    unit: (price) => `1時間 ${price}`,
    prepaid: "前払い。月額ではありません",
    ctaNote:
      "ボタンは WhatsApp 9310 3031 を開きます。その業務が稼働中だと確認したあと、FPS または銀行振込でそのパックを支払います。着金後にクレジットと予約を開きます。",
    seriesHeading: "1セッションですること",
    seriesIntro:
      "すでに動いている業務を一つ持ってきます。教材、見積、WhatsApp のフォロー、領収書の分類から一つ。1セッションで四つは扱いません。",
    steps: [
      "何が完了で、何が誤りかを一緒に書きます。",
      "AI が下書きを一つ出します。その例に照らして、抜けを指摘します。",
      "その指摘は次のルールに書き込みます。コメントとしてもう一度は書きません。",
    ],
    sameLine:
      "パックのセッション数は同じ業務に使います。1,000 クレジットで 3 セッション、残り 100 は次回へ。別の業務は新しい回です。",
    whatsappLabel: "WhatsApp で送る",
    whatsappPrefill: (credits, price) =>
      `セッションクレジット ${credits}（${price}）を希望します。稼働中の業務は一つ：教材／見積／WhatsAppフォロー／領収書の分類。`,
    notThis: "このページは AI 導入の料金ではありません。",
    diagnosisLink: "まだ稼働前なら、業務診断へ",
    productsLink: "稼働中案件のセッションクレジット",
  },
  de: {
    metaTitle: "Session-Guthaben für laufende Projekte | InnovateXP",
    metaDescription:
      "Nur bei laufendem Projekt und Ablauf, System oder Shop. 1.000 Credits HK$3.000 ohne Bonus; 2.000 Credits HK$5.600 plus 200; 4.000 Credits HK$10.000 plus 400. Kein KI-Einführungspaket.",
    kicker: "Bereits live",
    title: "Session-Guthaben",
    lead: "Sie haben Projekt und Ablauf schon gezeigt, und das System oder Shop-Upgrade läuft bereits. Eine Session dauert zwei Stunden und kostet 300 Credits. Diagnose und Lösung passieren in dieser Session. Das ist kein KI-Einführungspaket.",
    boundary: "Ohne laufendes Projekt, Ablauf, System oder Shop können Sie dieses Guthaben nicht kaufen. Ein neuer Ablauf beginnt mit einer Geschäftsdiagnose, nicht mit diesem Kontostand.",
    sessionRule: "1 Session = 2 Stunden = 300 Credits",
    buyRule: "Sie können nur 1.000, 2.000 oder 4.000 Credits kaufen. 1.000 enthält keinen Bonus. 2.000 enthalten 200 Bonus-Credits. 4.000 enthalten 400.",
    recommended: "Am häufigsten gewählt",
    bestRate: "Niedrigster Satz",
    bonus: (n) => `+${n.toLocaleString("de-DE")} Bonus`,
    noBonus: "Kein Bonus",
    totalCredits: (n) => `${n.toLocaleString("de-DE")} Credits gesamt`,
    sessions: (sessions, hours, remainder) =>
      remainder > 0
        ? `${sessions} Sessions · ${hours} Stunden, ${remainder.toLocaleString("de-DE")} Credits für die nächste Session`
        : `${sessions} Sessions · ${hours} Stunden`,
    unit: (price) => `${price} pro Stunde`,
    prepaid: "Einmalig vorausbezahlt, keine Monatsgebühr",
    ctaNote:
      "Der Button öffnet WhatsApp an 9310 3031. Nach der Bestätigung, dass die Linie schon läuft, zahlen Sie das Paket per FPS oder Überweisung. Guthaben und Termin öffnen sich nach Zahlungseingang.",
    seriesHeading: "Was eine Session leistet",
    seriesIntro:
      "Bringen Sie eine Linie mit, die schon läuft. Eine von vier: Kursmaterial, Angebot, WhatsApp-Nachfassen oder Belegsortierung. Eine Session deckt nicht alle vier ab.",
    steps: [
      "Wir schreiben auf, was fertig ist und was falsch ist.",
      "Die KI erstellt einen Entwurf. Sie markieren, was daran fehlt.",
      "Dieser Hinweis wird zur Regel für die nächste Runde. Er wird nicht noch einmal als Kommentar geschrieben.",
    ],
    sameLine:
      "Die Sessions eines Pakets bleiben auf derselben Linie. 1.000 Credits reichen für 3 Sessions, 100 Credits bleiben. Eine andere Linie ist eine neue Runde.",
    whatsappLabel: "Per WhatsApp senden",
    whatsappPrefill: (credits, price) =>
      `Ich möchte Session-Credits ${credits} (${price}). Die laufende Linie ist eine: Kursmaterial / Angebot / WhatsApp-Nachfassen / Belegsortierung.`,
    notThis: "Diese Seite ist nicht die KI-Einführung.",
    diagnosisLink: "Noch kein laufendes Projekt — Diagnose buchen",
    productsLink: "Session-Guthaben für ein laufendes Projekt",
  },
};

export function getSessionCreditsCopy(locale: AppLocale): SessionCreditsCopy {
  return COPY[locale];
}

const SESSION_CREDIT_WHATSAPP = "85293103031";

export function sessionCreditWhatsAppHref(text: string): string {
  return `https://wa.me/${SESSION_CREDIT_WHATSAPP}?text=${encodeURIComponent(text)}`;
}

export function sessionCreditPacks(locale: PricingLocale) {
  const { creditsPerSession, hoursPerSession, packs } = PRICING.sessionCredits;
  const creditsPerHour = creditsPerSession / hoursPerSession;
  const priced = packs.map((pack) => {
    const total = pack.credits + pack.bonusCredits;
    const priceHkd = sessionCreditListPriceHkd(pack.credits);
    const sessions = Math.floor(total / creditsPerSession);
    const remainder = total % creditsPerSession;
    const hourly = priceHkd / (total / creditsPerHour);
    return { pack, total, priceHkd, sessions, remainder, hourly };
  });
  const lowestHourly = Math.min(...priced.map((row) => row.hourly));
  return priced.map((row, index) => {
    const tiedForLowest = priced.filter((item) => item.hourly === lowestHourly);
    const hourlyAmount = Math.round(row.hourly);
    return {
      ...row.pack,
      priceHkd: row.priceHkd,
      total: row.total,
      sessions: row.sessions,
      remainder: row.remainder,
      hours: row.sessions * hoursPerSession,
      priceLabel: formatHkd(row.priceHkd, locale),
      unitLabel: formatHkd(hourlyAmount, locale),
      recommended: index === 1,
      bestRate: row.hourly === lowestHourly && tiedForLowest.length === 1,
    };
  });
}
