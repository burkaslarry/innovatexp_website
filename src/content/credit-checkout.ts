import { PRICING } from "@/content/pricing";
import type { AppLocale } from "@/lib/i18n-routing";

/** Total credits including the pack bonus; 0 for anything that is not a credit pack. */
export function creditsForOffer(offer: string): number {
  const pack = PRICING.sessionCredits.packs.find((item) => item.id === offer);
  return pack ? pack.credits + pack.bonusCredits : 0;
}

export type CreditCheckoutCopy = {
  heading: string;
  clinicHeading: string;
  intro: string;
  selectLabel: string;
  creditsWord: string;
  bonus: (n: number) => string;
  noBonus: string;
  busy: string;
  unavailable: string;
  paidHeading: string;
  paidBody: string;
  bookLabel: string;
  prefill: (credits: string, price: string) => string;
};

const COPY: Record<AppLocale, CreditCheckoutCopy> = {
  "zh-hk": {
    heading: "網上購買點數",
    clinicHeading: "網上購買門診點數",
    intro:
      "揀一個點數包，用信用卡付款。付款後用同一電郵 WhatsApp 9310 3031 掛號，我哋確認檔期後先開通點數。",
    selectLabel: "點數包",
    creditsWord: "點",
    bonus: (n) => `送 ${n.toLocaleString("en-HK")} 點`,
    noBonus: "冇贈送",
    busy: "處理中…",
    unavailable: "網上付款暫時未開，請用 WhatsApp 掛號。",
    paidHeading: "付款已確認",
    paidBody:
      "下一步用同一電郵 WhatsApp 9310 3031 約時間。我哋確認檔期後開通點數；未預約唔會扣鐘。",
    bookLabel: "用 WhatsApp 約期",
    prefill: (credits, price) =>
      `我買咗 Vibe Code 門診點數 ${credits}（${price}），付款電郵：____。想約嘅時段：`,
  },
  "zh-tw": {
    heading: "線上購買點數",
    clinicHeading: "線上購買門診點數",
    intro:
      "選擇一個點數包，用信用卡付款。付款後用同一電郵 WhatsApp 9310 3031 掛號，我們確認檔期後才開通點數。",
    selectLabel: "點數包",
    creditsWord: "點",
    bonus: (n) => `加送 ${n.toLocaleString("en-HK")} 點`,
    noBonus: "沒有加送",
    busy: "處理中…",
    unavailable: "線上付款暫時未開，請用 WhatsApp 掛號。",
    paidHeading: "付款已確認",
    paidBody:
      "下一步用同一電郵 WhatsApp 9310 3031 約時間。我們確認檔期後開通點數；未預約不會扣時數。",
    bookLabel: "用 WhatsApp 約時間",
    prefill: (credits, price) =>
      `我買了 Vibe Code 門診點數 ${credits}（${price}），付款電郵：____。想約的時段：`,
  },
  en: {
    heading: "Buy credits online",
    clinicHeading: "Buy clinic credits online",
    intro:
      "Choose a pack and pay by card. After payment, message WhatsApp 9310 3031 from the same email to book. Credits are activated once we confirm the slot.",
    selectLabel: "Credit pack",
    creditsWord: "credits",
    bonus: (n) => `+${n.toLocaleString("en-HK")} bonus`,
    noBonus: "No bonus",
    busy: "Processing…",
    unavailable: "Online payment is not open yet. Please book on WhatsApp.",
    paidHeading: "Payment confirmed",
    paidBody:
      "Next, message WhatsApp 9310 3031 from the same email with your preferred slots. Credits are activated once the slot is confirmed; nothing is deducted before then.",
    bookLabel: "Book on WhatsApp",
    prefill: (credits, price) =>
      `I paid for ${credits} Vibe Code clinic credits (${price}). Payment email: ____. Preferred slots:`,
  },
  ja: {
    heading: "クレジットをオンラインで購入",
    clinicHeading: "クリニックのクレジットをオンラインで購入",
    intro:
      "パックを選び、カードでお支払いください。お支払い後、同じメールアドレスから WhatsApp 9310 3031 へご連絡ください。枠を確認したうえでクレジットを有効にします。",
    selectLabel: "クレジットパック",
    creditsWord: "クレジット",
    bonus: (n) => `+${n.toLocaleString("en-HK")} 追加`,
    noBonus: "追加なし",
    busy: "処理中…",
    unavailable: "オンライン決済は現在ご利用いただけません。WhatsApp でご予約ください。",
    paidHeading: "お支払いを確認しました",
    paidBody:
      "同じメールアドレスから WhatsApp 9310 3031 へ、希望日時をお知らせください。枠の確定後にクレジットを有効にします。確定前は消費されません。",
    bookLabel: "WhatsApp で予約",
    prefill: (credits, price) =>
      `Vibe Code クリニックのクレジット ${credits}（${price}）を購入しました。決済メール：____。希望日時：`,
  },
  de: {
    heading: "Credits online kaufen",
    clinicHeading: "Clinic-Credits online kaufen",
    intro:
      "Wählen Sie ein Paket und zahlen Sie per Karte. Melden Sie sich danach mit derselben E-Mail per WhatsApp an 9310 3031, um einen Termin zu buchen. Die Credits werden nach Terminbestätigung freigeschaltet.",
    selectLabel: "Credit-Paket",
    creditsWord: "Credits",
    bonus: (n) => `+${n.toLocaleString("de-DE")} Bonus`,
    noBonus: "Kein Bonus",
    busy: "Wird verarbeitet…",
    unavailable: "Die Online-Zahlung ist noch nicht offen. Bitte buchen Sie per WhatsApp.",
    paidHeading: "Zahlung bestätigt",
    paidBody:
      "Melden Sie sich mit derselben E-Mail per WhatsApp an 9310 3031 und nennen Sie Ihre Wunschtermine. Die Credits werden nach Terminbestätigung freigeschaltet; vorher wird nichts abgezogen.",
    bookLabel: "Termin per WhatsApp",
    prefill: (credits, price) =>
      `Ich habe ${credits} Vibe-Code-Clinic-Credits (${price}) bezahlt. Zahlungs-E-Mail: ____. Wunschtermine:`,
  },
};

export function getCreditCheckoutCopy(locale: AppLocale, variant: "credits" | "clinic" = "credits"): CreditCheckoutCopy {
  const copy = COPY[locale];
  return { ...copy, heading: variant === "clinic" ? copy.clinicHeading : copy.heading };
}
