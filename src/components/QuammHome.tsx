"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/Header";
import { useLanguage } from "@/app/LanguageContext";
import { getHomepageContent, HOMEPAGE_PLACEHOLDERS } from "@/content/homepage";
import { PRICING, formatHkd } from "@/content/pricing";
import { getBookingHref, getWhatsAppHref } from "@/content/cta-config";
import { trackBookingCtaClick } from "@/lib/analytics";
import { useLocalizedHref } from "@/hooks/useLocalizedHref";
import type { AppLocale } from "@/lib/i18n-routing";

type HomeCopy = {
  eyebrow: string;
  headline: string;
  introduction: string;
  caseLabel: string;
  caseTitle: string;
  caseBody: string;
  caseLink: string;
  solutionsIntro: string;
  moreServices: string;
  aboutTitle: string;
  aboutBody: string;
  aboutLink: string;
  faqLink: string;
  closingTitle: string;
  closingBody: string;
  book: string;
  whatsapp: string;
};

const COPY: Record<AppLocale, HomeCopy> = {
  "zh-hk": {
    eyebrow: "Larry Lo｜業務聽診師",
    headline: "一個人放假就停嘅流程，唔叫流程，叫人質。",
    introduction: "我幫香港團隊搵出邊度漏客、邊度慢、邊個一個人頂住。先執順流程；唔使買系統，我會直講。",
    caseLabel: "真實工作 · Agilizing Limited · 2026 年 1–2 月",
    caseTitle: "教材製作，由 10 日縮到 3 小時。",
    caseBody: "為培訓客戶整理教材製作流程，包括投影片同 AI 數字人短片。呢個係該項目經業主確認嘅結果。",
    caseLink: "了解案例",
    solutionsIntro: "聽診之後，有需要先用。由一條流程開始，揀啱工具同支援。",
    moreServices: "睇全部服務與產品",
    aboutTitle: "由 Larry 親自聽，親自跟。",
    aboutBody: "14 年大企業經驗。先畫清責任同下一步，再決定工具有冇用。",
    aboutLink: "認識 Larry",
    faqLink: "睇全部常見問題",
    closingTitle: "帶你最亂嗰條流程嚟。",
    closingBody: "30 分鐘講清問題同下一步。Snapshot 同 Discovery Sprint 係另外嘅付費服務，按需要先選。",
    book: "預約 30 分鐘業務聽診",
    whatsapp: "WhatsApp 直接問",
  },
  "zh-tw": {
    eyebrow: "Larry Lo｜業務流程顧問",
    headline: "一個人請假就停的流程，不叫流程，叫人質。",
    introduction: "我幫香港團隊找出哪裡漏客、哪裡太慢、哪裡只靠一個人撐住。先理順流程；不需要系統，我會直說。",
    caseLabel: "實際案例 · Agilizing Limited · 2026 年 1–2 月",
    caseTitle: "教材製作，從 10 天縮短至 3 小時。",
    caseBody: "為培訓客戶整理教材製作流程，包括簡報與 AI 數位人短片。這是該專案經業主確認的結果。",
    caseLink: "了解案例",
    solutionsIntro: "診斷之後，有需要才使用工具。從一條流程開始。",
    moreServices: "查看所有服務與產品",
    aboutTitle: "Larry 親自診斷，親自跟進。",
    aboutBody: "14 年大企業經驗。先釐清責任與下一步，再決定工具是否有用。",
    aboutLink: "認識 Larry",
    faqLink: "查看所有常見問題",
    closingTitle: "帶來你最混亂的一條流程。",
    closingBody: "用 30 分鐘釐清問題與下一步。Snapshot 與 Discovery Sprint 是後續付費服務。",
    book: "預約 30 分鐘業務診斷",
    whatsapp: "WhatsApp 直接問",
  },
  en: {
    eyebrow: "Larry Lo | Business workflow diagnosis",
    headline: "If one person takes leave and work stops, the process owns you.",
    introduction: "I help Hong Kong teams find the missed enquiries, slow decisions and handoffs resting on one person. We fix the workflow first. If you do not need a system, I will say so.",
    caseLabel: "Client work · Agilizing Limited · Jan–Feb 2026",
    caseTitle: "Training materials: 10 days to 3 hours.",
    caseBody: "We improved the production workflow for slide decks and AI digital-human short videos. The client owner confirmed this project's result.",
    caseLink: "Read the case",
    solutionsIntro: "Choose tools only after diagnosis. Start with one workflow.",
    moreServices: "Explore all services and products",
    aboutTitle: "Work directly with Larry.",
    aboutBody: "14 years in large enterprises. Clarify ownership and the next step before choosing software.",
    aboutLink: "About Larry",
    faqLink: "All frequently asked questions",
    closingTitle: "Bring your messiest workflow.",
    closingBody: "Use 30 minutes to make the issue and next step clear. Snapshot and Discovery Sprint are separate paid services if needed.",
    book: "Book a 30-minute diagnosis",
    whatsapp: "Ask on WhatsApp",
  },
  ja: {
    eyebrow: "Larry Lo｜業務フロー診断",
    headline: "一人が休むと止まる仕事は、仕組みとは呼べません。",
    introduction: "香港のチームで、問い合わせの取りこぼし、遅い判断、一人に依存する引き継ぎを見つけます。先に業務を整え、システムが不要ならそう伝えます。",
    caseLabel: "事例 · Agilizing Limited · 2026年1–2月",
    caseTitle: "教材制作を10日から3時間へ。",
    caseBody: "スライドと AI デジタルヒューマンの短編動画を含む教材制作フローを改善。結果は顧客オーナーが確認しました。",
    caseLink: "事例を見る",
    solutionsIntro: "診断の後、必要なものだけを選びます。まずは一つの業務から。",
    moreServices: "サービスと製品を見る",
    aboutTitle: "Larry が直接担当します。",
    aboutBody: "大企業で14年の経験。責任と次の一歩を明確にしてからツールを選びます。",
    aboutLink: "Larry について",
    faqLink: "よくある質問をすべて見る",
    closingTitle: "一番困っている業務をお持ちください。",
    closingBody: "30分で課題と次の一歩を整理。Snapshot と Discovery Sprint は必要に応じた別の有料サービスです。",
    book: "30分の診断を予約",
    whatsapp: "WhatsApp で相談",
  },
  de: {
    eyebrow: "Larry Lo | Diagnose von Geschäftsabläufen",
    headline: "Wenn bei einer Abwesenheit alles stillsteht, fehlt ein verlässlicher Ablauf.",
    introduction: "Ich helfe Teams in Hongkong, verlorene Anfragen, langsame Entscheidungen und Übergaben zu erkennen, die von einer Person abhängen. Erst den Ablauf klären; wenn kein System nötig ist, sage ich das.",
    caseLabel: "Kundenprojekt · Agilizing Limited · Jan–Feb 2026",
    caseTitle: "Schulungsmaterial: von 10 Tagen auf 3 Stunden.",
    caseBody: "Wir verbesserten den Ablauf für Präsentationen und kurze KI-Digital-Human-Videos. Der Kunde bestätigte das Ergebnis dieses Projekts.",
    caseLink: "Fall ansehen",
    solutionsIntro: "Werkzeuge erst nach der Diagnose wählen. Beginnen Sie mit einem Ablauf.",
    moreServices: "Alle Leistungen und Produkte",
    aboutTitle: "Larry begleitet Sie persönlich.",
    aboutBody: "14 Jahre Erfahrung in Großunternehmen. Erst Verantwortung und nächste Schritte klären, dann Software wählen.",
    aboutLink: "Über Larry",
    faqLink: "Alle häufigen Fragen",
    closingTitle: "Bringen Sie Ihren schwierigsten Ablauf mit.",
    closingBody: "In 30 Minuten werden Problem und nächster Schritt klar. Snapshot und Discovery Sprint sind bei Bedarf separate kostenpflichtige Leistungen.",
    book: "30-Minuten-Diagnose buchen",
    whatsapp: "Per WhatsApp fragen",
  },
};

const solutionPages = [
  { id: "consultancy", path: "/ai-consulting" },
  { id: "eventxp", path: "/eventxp" },
  { id: "smartsales", path: "/smartsales-crm" },
] as const;

const sectionClass = "mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28";
const eyebrowClass = "text-xs font-semibold uppercase tracking-[0.18em] text-[#8b6b43]";
const titleClass = "mt-5 max-w-[19ch] text-[clamp(2.3rem,5vw,5rem)] font-normal leading-[1.12] tracking-[-0.035em]";
const textLinkClass = "inline-flex min-h-11 items-center border-b border-[#8b6b43] text-sm font-semibold transition hover:text-[#8b6b43] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4";

export function QuammHome() {
  const { locale } = useLanguage();
  const loc = useLocalizedHref();
  const content = getHomepageContent(locale);
  const copy = COPY[locale];
  const bookingHref = getBookingHref(locale);
  const whatsappHref = getWhatsAppHref(locale);
  const snapshot = formatHkd(PRICING.quickCash.aiReadinessAssessment, locale === "zh-tw" ? "zh-hk" : locale);
  const discovery = formatHkd(PRICING.quickCash.aiDiscoverySprint, locale === "zh-tw" ? "zh-hk" : locale);
  const priceLine = locale === "en"
    ? `Paid next steps: Snapshot ${snapshot}; Discovery Sprint ${discovery} for teams up to 10.`
    : locale === "ja"
      ? `有料の次の段階：Snapshot ${snapshot}、10人以下の Discovery Sprint ${discovery}。`
      : locale === "de"
        ? `Optionale Folgeschritte: Snapshot ${snapshot}; Discovery Sprint ${discovery} für bis zu 10 Personen.`
        : `後續付費方案：Snapshot ${snapshot}；10 人或以下 Discovery Sprint ${discovery}。`;

  return (
    <div className="atelier-home min-h-screen bg-[#f7f4ee] text-[#251f19]">
      <Header
        variant="main"
        title={content.brandTitle}
        subtitle={content.brandSubtitle}
        navItems={[
          { label: content.nav.home, href: loc("/") },
          { label: content.nav.plans, href: loc("/services") },
          { label: content.nav.products, href: loc("/products") },
          { label: content.nav.cases, href: loc("/case-studies") },
          { label: content.nav.about, href: loc("/about") },
          { label: content.nav.faq, href: loc("/faq") },
        ]}
        ctaLabel={copy.book}
        ctaHref={bookingHref}
      />
      <main id="main-content">
        <section className={`${sectionClass} grid items-center gap-12 pt-14 md:grid-cols-[1.08fr_0.92fr] md:gap-20 md:pt-24`} aria-labelledby="home-title">
          <div>
            <p className={eyebrowClass}>{copy.eyebrow}</p>
            <h1 id="home-title" className="mt-6 max-w-[16ch] text-[clamp(2.65rem,5.7vw,6.1rem)] font-normal leading-[1.14] tracking-[-0.045em]">{copy.headline}</h1>
            <p data-geo-answer className="mt-7 max-w-[48ch] text-lg leading-[1.9] md:text-xl">{copy.introduction}</p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link href={bookingHref} onClick={() => trackBookingCtaClick("hero")} className="inline-flex min-h-12 items-center justify-center bg-[#252019] px-7 text-sm font-semibold text-[#f7f4ee] transition hover:bg-[#654b32] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">{copy.book}</Link>
              <a href={whatsappHref} className={textLinkClass}>{copy.whatsapp}</a>
            </div>
          </div>
          <figure className="relative aspect-[4/5] w-full overflow-hidden bg-[#d9d0c2] md:aspect-[5/6]">
            <Image src="/hero-larry.webp" alt={content.hero.imageAlt} fill priority sizes="(max-width: 768px) 100vw, 45vw" className="object-cover object-[center_22%]" />
            <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-6 pb-6 pt-14 text-sm text-white">Larry Lo · InnovateXP</figcaption>
          </figure>
        </section>

        <section id="pain-points" className="border-t border-[#d8cfc2] bg-[#efe9df]" aria-labelledby="pain-title">
          <div className={sectionClass}>
            <p className={eyebrowClass}>{content.problem.eyebrow}</p>
            <h2 id="pain-title" className={titleClass}>{content.problem.title}</h2>
            <ul className="mt-12 grid gap-x-10 gap-y-0 border-t border-[#c8bba9] md:grid-cols-2">
              {content.problem.items.map((item, index) => (
                <li key={item.title} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-[#c8bba9] py-7 md:py-9">
                  <span className="pt-1 text-xs text-[#8b6b43]">0{index + 1}</span>
                  <div><h3 className="text-2xl font-normal md:text-3xl">{item.title}</h3><p className="mt-3 max-w-[48ch] leading-8">{item.body}</p></div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="method" className="border-t border-[#d8cfc2]" aria-labelledby="method-title">
          <div className={sectionClass}>
            <p className={eyebrowClass}>{content.approach.eyebrow}</p>
            <h2 id="method-title" className={titleClass}>{content.approach.title}</h2>
            <p className="mt-6 max-w-[60ch] text-lg leading-8">{content.approach.intro}</p>
            <ol className="mt-12 divide-y divide-[#d8cfc2] border-y border-[#d8cfc2]">
              {content.approach.steps.map((step, index) => (
                <li key={step.title} className="grid gap-4 py-8 md:grid-cols-[5rem_minmax(0,0.8fr)_minmax(0,1fr)] md:gap-10">
                  <span className="pt-1 text-sm text-[#8b6b43]">0{index + 1}</span>
                  <h3 className="text-2xl font-normal md:text-3xl">{step.title}</h3>
                  <p className="max-w-[55ch] leading-8">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="case-study" className="border-t border-[#d8cfc2] bg-[#252019] text-[#f7f4ee]" aria-labelledby="case-title">
          <div className={`${sectionClass} grid gap-8 md:grid-cols-[0.6fr_1.4fr] md:gap-16`}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d7b88c]">{copy.caseLabel}</p>
            <div>
              <h2 id="case-title" className="max-w-[16ch] text-[clamp(2.4rem,5vw,5.2rem)] font-normal leading-[1.12] tracking-[-0.035em] text-[#f7f4ee]">{copy.caseTitle}</h2>
              <p data-geo-answer className="mt-7 max-w-[55ch] text-lg leading-9 text-[#e4d9ca]">{copy.caseBody}</p>
              <Link href={loc("/case-studies")} className="mt-7 inline-flex min-h-11 items-center border-b border-[#d7b88c] text-sm font-semibold text-[#f7f4ee] hover:text-[#d7b88c]">{copy.caseLink} →</Link>
            </div>
          </div>
        </section>

        <section id="solutions" className="border-t border-[#d8cfc2]" aria-labelledby="solutions-title">
          <div className={sectionClass}>
            <p className={eyebrowClass}>{content.products.eyebrow}</p>
            <h2 id="solutions-title" className={titleClass}>{content.products.title}</h2>
            <p className="mt-6 max-w-[60ch] text-lg leading-8">{copy.solutionsIntro}</p>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {solutionPages.map(({ id, path }, index) => {
                const item = content.products.items.find((product) => product.id === id);
                if (!item) return null;
                return <Link key={id} href={loc(path)} className="group flex min-h-72 flex-col border border-[#c8bba9] bg-[#fbf9f5] p-7 transition hover:border-[#8b6b43] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
                  <span className="text-xs text-[#8b6b43]">0{index + 1}</span>
                  <h3 className="mt-10 text-2xl font-normal">{item.name}</h3>
                  <p className="mt-4 text-sm leading-7">{item.body}</p>
                  <span className="mt-auto pt-7 text-sm font-semibold text-[#8b6b43]" aria-hidden="true">↗</span>
                </Link>;
              })}
            </div>
            <Link href={loc("/services")} className={`mt-8 ${textLinkClass}`}>{copy.moreServices} →</Link>
          </div>
        </section>

        <section id="about" className="border-t border-[#d8cfc2] bg-[#efe9df]" aria-labelledby="about-title">
          <div className={`${sectionClass} grid gap-7 md:grid-cols-[0.9fr_1.1fr] md:gap-20`}>
            <p className={eyebrowClass}>{content.whyUs.eyebrow}</p>
            <div><h2 id="about-title" className={titleClass}>{copy.aboutTitle}</h2><p className="mt-6 max-w-[55ch] text-lg leading-8">{copy.aboutBody}</p><Link href={loc("/about")} className={`mt-6 ${textLinkClass}`}>{copy.aboutLink} →</Link></div>
          </div>
        </section>

        <section id="faq" className="border-t border-[#d8cfc2]" aria-labelledby="faq-title">
          <div className={sectionClass}>
            <h2 id="faq-title" className={titleClass}>{content.faq.title}</h2>
            <div className="mt-10 divide-y divide-[#d8cfc2] border-y border-[#d8cfc2]">
              {content.faq.items.map((item) => <article key={item.question} className="grid gap-4 py-7 md:grid-cols-[0.9fr_1.1fr] md:gap-12"><h3 className="text-xl font-normal">{item.question}</h3><p className="max-w-[65ch] leading-8">{item.answer}</p></article>)}
            </div>
            <Link href={loc("/faq")} className={`mt-7 ${textLinkClass}`}>{copy.faqLink} →</Link>
          </div>
        </section>

        <section id="contact" className="border-t border-[#d8cfc2] bg-[#e6dccd]" aria-labelledby="contact-title">
          <div className={sectionClass}>
            <p className={eyebrowClass}>InnovateXP · Larry Lo</p>
            <h2 id="contact-title" className={titleClass}>{copy.closingTitle}</h2>
            <p className="mt-6 max-w-[60ch] text-lg leading-8">{copy.closingBody}</p>
            <p className="mt-3 text-sm leading-7">{priceLine}</p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link href={bookingHref} onClick={() => trackBookingCtaClick("final_cta")} className="inline-flex min-h-12 items-center justify-center bg-[#252019] px-7 text-sm font-semibold text-[#f7f4ee] transition hover:bg-[#654b32]">{copy.book}</Link>
              <a href={whatsappHref} className={textLinkClass}>{copy.whatsapp}</a>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-[#d8cfc2] px-5 py-10 text-sm md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div><p className="text-xl text-[#251f19]">InnovateXP Limited</p><a className={textLinkClass} href={`mailto:${HOMEPAGE_PLACEHOLDERS.emailAddress}`}>{HOMEPAGE_PLACEHOLDERS.emailAddress}</a></div>
          <nav className="flex flex-wrap gap-x-6 gap-y-1" aria-label="Footer"><Link href={loc("/services")}>{content.nav.plans}</Link><Link href={loc("/products")}>{content.nav.products}</Link><Link href={loc("/about")}>{content.nav.about}</Link><Link href={loc("/privacy-policy")}>{content.footer.privacy}</Link></nav>
        </div>
      </footer>
    </div>
  );
}
