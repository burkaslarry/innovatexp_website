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
  notThis: string;
  diagnosisLink: string;
  productsLink: string;
};

const COPY: Record<AppLocale, SessionCreditsCopy> = {
  "zh-hk": {
    metaTitle: "即時問診點數｜已上線項目｜InnovateXP",
    metaDescription:
      "只限已展示項目同流程、系統或網店升級嘅客戶。定價每小時 HK$400。1,000 點冇贈送；2,000 送 200 點；4,000 送 400 點。唔係 AI 導入方案。",
    kicker: "已上線項目",
    title: "即時問診點數",
    lead: "你已經同我哋展示過項目同流程，系統或者網店升級亦已經喺度行緊。一節兩小時，用 300 點，席上問、席上解決。呢個計劃同 AI 導入方案無關。",
    boundary: "未有上線項目、流程、系統或網店，唔可以買呢組點數。新流程要先做業務聽診，唔好用點數代替導入。",
    sessionRule: "1 節 = 2 小時 = 300 點",
    buyRule: "定價每小時 HK$400。只可以買 1,000、2,000 或 4,000 點。1,000 點冇贈送。2,000 送 200 點；4,000 送 400 點。",
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
    ctaNote: "放入查詢後，我哋會確認你嘅項目已經上線，先至開通點數。",
    notThis: "呢頁唔係 AI 導入收費。",
    diagnosisLink: "未有上線項目，去業務聽診",
    productsLink: "已上線項目的即時問診點數",
  },
  "zh-tw": {
    metaTitle: "即時問診點數｜已上線專案｜InnovateXP",
    metaDescription:
      "只限已展示專案與流程、系統或網店升級的客戶。定價每小時 HK$400。1,000 點沒有加送；2,000 加送 200 點；4,000 加送 400 點。不是 AI 導入方案。",
    kicker: "已上線專案",
    title: "即時問診點數",
    lead: "你已經向我們展示過專案與流程，系統或網店升級也已經在運行。一節兩小時，使用 300 點，當場問、當場解決。這個計劃與 AI 導入方案無關。",
    boundary: "還沒有上線專案、流程、系統或網店，不能購買這組點數。新流程要先做業務診斷，不要用點數代替導入。",
    sessionRule: "1 節 = 2 小時 = 300 點",
    buyRule: "定價每小時 HK$400。只能購買 1,000、2,000 或 4,000 點。1,000 點沒有加送。2,000 加送 200 點；4,000 加送 400 點。",
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
    ctaNote: "放入查詢後，我們會確認你的專案已經上線，才開通點數。",
    notThis: "本頁不是 AI 導入收費。",
    diagnosisLink: "還沒有上線專案，前往業務診斷",
    productsLink: "已上線專案的即時問診點數",
  },
  en: {
    metaTitle: "Session credits for live projects | InnovateXP",
    metaDescription:
      "Only after a live project and workflow, system, or shop upgrade. Rate is HK$400 per hour. 1,000 credits include no bonus; 2,000 include 200; 4,000 include 400. Not an AI implementation package.",
    kicker: "Already live",
    title: "Session credits",
    lead: "You have already shown us the project and the workflow, and the system or shop upgrade is already running. One session is two hours and 300 credits. We diagnose it and resolve it in that session. This plan is not an AI implementation package.",
    boundary: "If the project, workflow, system, or shop is not already live, you cannot buy these credits. A new workflow starts with a business diagnosis, not with this balance.",
    sessionRule: "1 session = 2 hours = 300 credits",
    buyRule: "The rate is HK$400 per hour. You can buy only 1,000, 2,000, or 4,000 credits. The 1,000 pack has no bonus. The 2,000 pack includes 200 bonus credits. The 4,000 pack includes 400.",
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
    ctaNote: "After you add a pack to the enquiry, we confirm the project is already live before the credits open.",
    notThis: "This page is not AI implementation pricing.",
    diagnosisLink: "No live project yet — book a diagnosis",
    productsLink: "Session credits for a live project",
  },
  ja: {
    metaTitle: "稼働中案件のセッションクレジット｜InnovateXP",
    metaDescription:
      "すでに稼働中のプロジェクト向け。料金は1時間 HK$400。1,000クレジットに追加なし。2,000は200追加、4,000は400追加。AI導入パッケージではありません。",
    kicker: "すでに稼働中",
    title: "セッションクレジット",
    lead: "プロジェクトと業務フローをすでに提示し、システムまたはネットショップのアップグレードが動いている方向けです。1セッションは2時間、300クレジット。その場で診断し、その場で解決します。AI導入パッケージとは別です。",
    boundary: "稼働中のプロジェクト、フロー、システム、ネットショップがない場合は購入できません。新しい業務は業務診断から始め、この残高では代替しません。",
    sessionRule: "1セッション = 2時間 = 300クレジット",
    buyRule: "料金は1時間 HK$400。購入できるのは 1,000、2,000、4,000 クレジットだけです。1,000 に追加はありません。2,000 は 200 追加。4,000 は 400 追加。",
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
    ctaNote: "問い合わせに入れたあと、案件が稼働中であることを確認してからクレジットを開きます。",
    notThis: "このページは AI 導入の料金ではありません。",
    diagnosisLink: "まだ稼働前なら、業務診断へ",
    productsLink: "稼働中案件のセッションクレジット",
  },
  de: {
    metaTitle: "Session-Guthaben für laufende Projekte | InnovateXP",
    metaDescription:
      "Nur bei laufendem Projekt und Ablauf, System oder Shop. Satz: HK$400 pro Stunde. 1.000 Credits ohne Bonus; 2.000 plus 200; 4.000 plus 400. Kein KI-Einführungspaket.",
    kicker: "Bereits live",
    title: "Session-Guthaben",
    lead: "Sie haben Projekt und Ablauf schon gezeigt, und das System oder Shop-Upgrade läuft bereits. Eine Session dauert zwei Stunden und kostet 300 Credits. Diagnose und Lösung passieren in dieser Session. Das ist kein KI-Einführungspaket.",
    boundary: "Ohne laufendes Projekt, Ablauf, System oder Shop können Sie dieses Guthaben nicht kaufen. Ein neuer Ablauf beginnt mit einer Geschäftsdiagnose, nicht mit diesem Kontostand.",
    sessionRule: "1 Session = 2 Stunden = 300 Credits",
    buyRule: "Der Satz ist HK$400 pro Stunde. Sie können nur 1.000, 2.000 oder 4.000 Credits kaufen. 1.000 enthält keinen Bonus. 2.000 enthalten 200 Bonus-Credits. 4.000 enthalten 400.",
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
    ctaNote: "Nach der Anfrage prüfen wir, dass das Projekt schon läuft, bevor das Guthaben offen ist.",
    notThis: "Diese Seite ist nicht die KI-Einführung.",
    diagnosisLink: "Noch kein laufendes Projekt — Diagnose buchen",
    productsLink: "Session-Guthaben für ein laufendes Projekt",
  },
};

export function getSessionCreditsCopy(locale: AppLocale): SessionCreditsCopy {
  return COPY[locale];
}

export function sessionCreditPacks(locale: PricingLocale) {
  const { creditsPerSession, hoursPerSession, hourlyRateHkd, packs } = PRICING.sessionCredits;
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
      listHourlyLabel: formatHkd(hourlyRateHkd, locale),
      recommended: index === 1,
      bestRate: row.hourly === lowestHourly && tiedForLowest.length === 1,
    };
  });
}
