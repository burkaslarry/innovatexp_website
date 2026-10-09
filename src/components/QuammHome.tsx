"use client";

import Image from "next/image";
import Link from "next/link";
import LanguageSwitcher from "@/app/LanguageSwitcher";
import { useLanguage } from "@/app/LanguageContext";
import { getHomepageContent, HOMEPAGE_PLACEHOLDERS } from "@/content/homepage";
import { PRICING, formatHkd } from "@/content/pricing";
import { getBookingHref, getWhatsAppHref } from "@/content/cta-config";
import { trackBookingCtaClick } from "@/lib/analytics";
import { useLocalizedHref } from "@/hooks/useLocalizedHref";
import type { AppLocale } from "@/lib/i18n-routing";

type Copy = {
  kicker: string;
  line1: string;
  line2: string;
  line3: string;
  aside: string;
  workTitle: string;
  steps: { title: string; body: string }[];
  caseKicker: string;
  caseTitle: string;
  caseBody: string;
  why: string;
  book: string;
  whatsapp: string;
};

const COPY: Record<AppLocale, Copy> = {
  "zh-hk": {
    kicker: "Larry Lo｜香港 3–30 人團隊嘅業務聽診",
    line1: "唔使買",
    line2: "系統",
    line3: "我會直講",
    aside: "一個人放假就停嘅流程，唔叫流程，叫人質。",
    workTitle: "點做",
    steps: [
      { title: "聽診", body: "30 分鐘。畫低查詢、報價、跟進、收錢，邊度一個人放假就停。" },
      { title: "建立", body: "只改一個漏位。未見到有人用，唔加系統。" },
      { title: "上線", body: "30 日內交到有人每日打開嘅做法。" },
    ],
    caseKicker: "2026年1–2月 · Agilizing Limited",
    caseTitle: "教材製作由 10 日縮到 3 小時",
    caseBody: "為培訓客戶做教材流程，包括投影片同 AI 數字人短片。業主確認。呢個係嗰次工作嘅時間，唔係你嘅預測。",
    why: "14 年大企業經驗，2012–2026。先聽診，再決定買唔買。",
    book: "預約 30 分鐘業務聽診",
    whatsapp: "WhatsApp",
  },
  "zh-tw": {
    kicker: "Larry Lo｜香港 3–30 人團隊的業務診斷",
    line1: "不必買",
    line2: "系統",
    line3: "我會直說",
    aside: "一個人放假就停的流程，不叫流程，叫人質。",
    workTitle: "怎麼做",
    steps: [
      { title: "診斷", body: "30 分鐘。畫出查詢、報價、跟進、收款，哪裡一個人放假就停。" },
      { title: "建立", body: "只改一個漏洞。還沒有人用，不加系統。" },
      { title: "上線", body: "30 日內交到有人每天打開的做法。" },
    ],
    caseKicker: "2026年1–2月 · Agilizing Limited",
    caseTitle: "教材製作由 10 日縮到 3 小時",
    caseBody: "為培訓客戶做教材流程，包括投影片與 AI 數字人短片。業主確認。這是該次工作的時間，不是您的預測。",
    why: "14 年大型企業經驗，2012–2026。先診斷，再決定買不買。",
    book: "預約 30 分鐘業務診斷",
    whatsapp: "WhatsApp",
  },
  en: {
    kicker: "Larry Lo · workflow diagnosis for Hong Kong teams of 3–30",
    line1: "I will say",
    line2: "if you should",
    line3: "not buy",
    aside: "A process that stops when one person is on leave is not a process. It is a hostage.",
    workTitle: "How",
    steps: [
      { title: "Diagnose", body: "Thirty minutes. Map enquiry, quote, follow-up, and payment. Mark where one absence stops the line." },
      { title: "Build", body: "Change one leak. No system until someone will use it." },
      { title: "Launch", body: "Within 30 days, a version someone opens every day." },
    ],
    caseKicker: "Jan–Feb 2026 · Agilizing Limited",
    caseTitle: "Training materials: 10 days to 3 hours",
    caseBody: "A training-material workflow, including slide decks and AI digital-human short videos. Owner-confirmed. That timing is theirs, not your forecast.",
    why: "14 years in large enterprises, 2012–2026. Diagnose first, then decide whether to buy.",
    book: "Book a 30-minute diagnosis",
    whatsapp: "WhatsApp",
  },
  ja: {
    kicker: "Larry Lo｜香港の3〜30人チームの業務診断",
    line1: "買わなくて",
    line2: "いいなら",
    line3: "そう言います",
    aside: "一人が休むと止まる手順は、手順ではなく人質です。",
    workTitle: "進め方",
    steps: [
      { title: "診断", body: "30分。問い合わせ、見積、追客、入金のどこで止まるかを描きます。" },
      { title: "作成", body: "漏れは一箇所。使う人がいるまで仕組みは足しません。" },
      { title: "公開", body: "30日以内に、毎日開く形まで。" },
    ],
    caseKicker: "2026年1–2月 · Agilizing Limited",
    caseTitle: "教材制作を10日から3時間へ",
    caseBody: "研修教材の制作。スライドとAIデジタルヒューマンの短編を含む。オーナー確認。その時間は先方のもので、御社の予測ではありません。",
    why: "大企業での14年、2012–2026。先に診断し、買うかはそれからです。",
    book: "30分の診断を予約",
    whatsapp: "WhatsApp",
  },
  de: {
    kicker: "Larry Lo · Ablaufdiagnose für Teams mit 3–30 Personen in Hongkong",
    line1: "Ich sage",
    line2: "wenn Sie",
    line3: "nicht kaufen",
    aside: "Ein Ablauf, der stoppt, wenn eine Person frei hat, ist kein Ablauf. Er ist eine Geisel.",
    workTitle: "Vorgehen",
    steps: [
      { title: "Diagnose", body: "30 Minuten. Anfrage, Angebot, Nachfassen, Zahlung. Wo eine Abwesenheit alles stoppt." },
      { title: "Bauen", body: "Eine undichte Stelle. Kein System, bevor jemand es nutzt." },
      { title: "Start", body: "In 30 Tagen eine Fassung, die jemand täglich öffnet." },
    ],
    caseKicker: "Jan–Feb 2026 · Agilizing Limited",
    caseTitle: "Schulungsmaterial: 10 Tage auf 3 Stunden",
    caseBody: "Ablauf für Schulungsmaterial, inklusive Folien und kurzer KI-Digital-Human-Videos. Vom Inhaber bestätigt. Das ist deren Zeit, nicht Ihre Prognose.",
    why: "14 Jahre in Großunternehmen, 2012–2026. Zuerst diagnostizieren, dann entscheiden, ob gekauft wird.",
    book: "30-Minuten-Diagnose buchen",
    whatsapp: "WhatsApp",
  },
};

const linkClass =
  "underline decoration-transparent underline-offset-4 transition hover:decoration-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#272727]";

export function QuammHome() {
  const { locale } = useLanguage();
  const loc = useLocalizedHref();
  const content = getHomepageContent(locale);
  const copy = COPY[locale];
  const h1Name =
    locale === "en"
      ? "AI business consultant"
      : locale === "ja"
        ? "AIビジネスコンサルタント"
        : locale === "de"
          ? "KI-Berater"
          : "AI 商業顧問";
  const bookingHref = getBookingHref(locale);
  const whatsappHref = getWhatsAppHref(locale);
  const snapshot = formatHkd(PRICING.quickCash.aiReadinessAssessment, locale === "zh-tw" ? "zh-hk" : locale);
  const discovery = formatHkd(PRICING.quickCash.aiDiscoverySprint, locale === "zh-tw" ? "zh-hk" : locale);
  const priceLine =
    locale === "en"
      ? `Snapshot ${snapshot}. Discovery Sprint ${discovery} for up to 10 people.`
      : locale === "ja"
        ? `Snapshot ${snapshot}。10人以下の Discovery Sprint ${discovery}。`
        : locale === "de"
          ? `Snapshot ${snapshot}. Discovery Sprint ${discovery} für bis zu 10 Personen.`
          : locale === "zh-tw"
            ? `Snapshot ${snapshot}。10 人以下 Discovery Sprint ${discovery}。`
            : `Snapshot ${snapshot}。10 人或以下 Discovery Sprint ${discovery}。`;

  return (
    <div className="quamm-frame min-h-screen bg-[#9a9b94] text-[#272727]">
      <header className="flex items-center justify-between gap-4 px-5 py-5 md:px-10">
        <Link href={loc("/")} className={`${linkClass} font-[family-name:var(--font-heading)] text-lg tracking-[0.18em]`}>
          INNOVATEXP
        </Link>
        <nav className="flex items-center gap-4 text-sm md:gap-7" aria-label="InnovateXP">
          <Link className={`${linkClass} hidden sm:inline`} href="#pain">
            {content.nav.diagnosis}
          </Link>
          <Link className={`${linkClass} hidden md:inline`} href="#work">
            {content.nav.services}
          </Link>
          <Link className={`${linkClass} hidden lg:inline`} href="#products">
            {content.nav.products}
          </Link>
          <Link className={`${linkClass} hidden sm:inline`} href="#case">
            {content.nav.cases}
          </Link>
          <Link className={linkClass} href={loc("/blog")}>
            {locale === "en" ? "Journal" : locale === "ja" ? "記事" : locale === "de" ? "Journal" : "文章"}
          </Link>
          <LanguageSwitcher className="max-w-[7.5rem] cursor-pointer border border-[#272727]/30 bg-transparent px-2 py-1 text-xs text-[#272727] sm:max-w-none" />
          <Link
            href={bookingHref}
            onClick={() => trackBookingCtaClick("header")}
            className={`${linkClass} font-semibold`}
          >
            {locale === "en" || locale === "de" ? "Book" : locale === "ja" ? "予約" : "預約"}
          </Link>
        </nav>
      </header>

      <main>
        <section className="px-5 pb-16 pt-8 md:px-10 md:pb-24 md:pt-14">
          <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-16">
            <div>
              <p className="text-sm leading-6 md:text-base">{copy.kicker}</p>
              <h1 className="mt-4 max-w-[12ch] font-[family-name:var(--font-heading)] text-[clamp(2.75rem,6vw,5.25rem)] font-normal leading-[1.08] tracking-normal">
                {h1Name}
              </h1>
              <p className="mt-6 max-w-xl font-[family-name:var(--font-heading)] text-[clamp(1.65rem,3vw,2.4rem)] font-normal leading-[1.25] tracking-normal">
                {locale === "zh-hk" || locale === "zh-tw"
                  ? `${copy.line1}${copy.line2}，${copy.line3}。`
                  : locale === "ja"
                    ? `${copy.line1}${copy.line2}、${copy.line3}。`
                    : `${copy.line1} ${copy.line2} ${copy.line3}.`}
              </p>
              <p className="mt-5 max-w-xl text-lg leading-8">{copy.aside}</p>
              <Link
                href={bookingHref}
                onClick={() => trackBookingCtaClick("hero")}
                className="quamm-book mt-8 inline-flex min-h-12 items-center px-6 text-base font-semibold"
              >
                {copy.book}
              </Link>
            </div>
            <Image
              src="/hero-larry.webp"
              alt={locale === "en" || locale === "de" || locale === "ja" ? "Larry Lo speaking with a microphone" : "Larry Lo 拿住麥克風講緊嘢"}
              width={471}
              height={567}
              priority
              className="h-auto w-full max-w-[220px] object-cover"
            />
          </div>
        </section>

        <section id="pain" className="border-t border-[#272727]/20 px-5 py-16 md:px-10 md:py-24">
          <h2 className="max-w-[16ch] font-[family-name:var(--font-heading)] text-4xl leading-[1.05] font-normal md:text-6xl">{content.problem.title}</h2>
          <ul className="mt-12 grid gap-8 md:grid-cols-2">
            {content.problem.items.map((item) => (
              <li key={item.title}>
                <h3 className="font-[family-name:var(--font-heading)] text-3xl font-normal">{item.title}</h3>
                <p className="mt-3 max-w-md text-base leading-7">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="work" className="border-t border-[#272727]/20 px-5 py-16 md:px-10 md:py-24">
          <h2 className="font-[family-name:var(--font-heading)] text-5xl font-normal leading-none md:text-7xl">{content.approach.title}</h2>
          <ol className="mt-12 divide-y divide-[#272727]/20 border-y border-[#272727]/20">
            {content.approach.steps.map((step, index) => (
              <li key={step.title} className="grid gap-3 py-8 md:grid-cols-[8rem_minmax(0,1fr)_minmax(0,1.2fr)] md:items-baseline md:gap-8">
                <p className="text-xs tracking-[0.2em]">0{index + 1}</p>
                <h3 className="font-[family-name:var(--font-heading)] text-4xl font-normal leading-none md:text-6xl">{step.title}</h3>
                <p className="max-w-md text-base leading-7 md:text-lg md:leading-8">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="products" className="border-t border-[#272727]/20 px-5 py-16 md:px-10 md:py-24">
          <h2 className="font-[family-name:var(--font-heading)] text-4xl font-normal leading-none md:text-6xl">{content.products.title}</h2>
          <ul className="mt-12 grid gap-8 md:grid-cols-2">
            {content.products.items.map((item) => (
              <li key={item.id}>
                <h3 className="font-[family-name:var(--font-heading)] text-3xl font-normal">{item.name}</h3>
                <p className="mt-3 max-w-md text-base leading-7">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="case" className="px-5 py-16 md:px-10 md:py-24">
          <p className="text-sm tracking-[0.14em]">{copy.caseKicker}</p>
          <h2 className="mt-4 max-w-[14ch] font-[family-name:var(--font-heading)] text-4xl leading-[1.05] md:text-6xl">{copy.caseTitle}</h2>
          <p className="mt-6 max-w-xl text-base leading-7 md:text-lg md:leading-8">{copy.caseBody}</p>
          <p className="mt-8 max-w-xl text-base leading-7 md:text-lg md:leading-8">{copy.why}</p>
        </section>

        <section className="border-t border-[#272727]/20 px-5 py-16 md:px-10 md:py-24">
          <h2 className="max-w-[12ch] font-[family-name:var(--font-heading)] text-5xl leading-[0.95] md:text-7xl">{copy.book}</h2>
          <p className="mt-6 text-sm leading-6">{priceLine}</p>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-lg">
            <Link href={bookingHref} onClick={() => trackBookingCtaClick("final_cta")} className={linkClass}>
              {copy.book}
            </Link>
            <a href={whatsappHref} className={linkClass}>
              {copy.whatsapp}
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#272727]/20 px-5 py-10 text-sm leading-6 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-[family-name:var(--font-heading)] text-2xl">InnovateXP Limited</p>
            <a className={linkClass} href={`mailto:${HOMEPAGE_PLACEHOLDERS.emailAddress}`}>
              {HOMEPAGE_PLACEHOLDERS.emailAddress}
            </a>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="InnovateXP Limited policies">
            <Link className={linkClass} href={loc("/privacy-policy")}>Privacy</Link>
            <Link className={linkClass} href={loc("/whatsapp-agent/terms")}>Terms</Link>
            <Link className={linkClass} href={loc("/services")}>{locale === "en" ? "Services" : "服務"}</Link>
            <Link className={linkClass} href={loc("/about")}>{locale === "en" ? "About" : "關於"}</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
