"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/Header";
import { useLanguage } from "@/app/LanguageContext";
import { getHomepageContent, getMainNavigation, HOMEPAGE_PLACEHOLDERS } from "@/content/homepage";
import { getSiteExperience } from "@/content/site-experience";
import { getCaseStudies } from "@/content/case-studies";
import { PRICING, formatHkd } from "@/content/pricing";
import { getBookingHref, getWhatsAppHref, primaryCtaLabel, secondaryWhatsAppLabel } from "@/content/cta-config";
import { trackBookingCtaClick } from "@/lib/analytics";
import { useLocalizedHref } from "@/hooks/useLocalizedHref";
import { WorkflowMethod } from "@/components/WorkflowMethod";
import { SolutionPreview } from "@/components/SolutionPreview";

const sectionClass = "mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24";
const titleClass = "max-w-[24ch] text-[clamp(2rem,4.5vw,4.2rem)] font-normal leading-[1.2] tracking-[-0.025em]";
const linkClass = "inline-flex min-h-11 items-center border-b border-[#8b6b43] text-sm font-semibold hover:text-[#6f5436] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4";

export function QuammHome() {
  const { locale } = useLanguage();
  const loc = useLocalizedHref();
  const content = getHomepageContent(locale);
  const c = getSiteExperience(locale);
  const cases = getCaseStudies(locale);
  const bookingHref = getBookingHref(locale);
  const bookingLabel = primaryCtaLabel(locale);
  const navigation = getMainNavigation(locale);

  return (
    <div className="atelier-home min-h-screen bg-[#f7f4ee] text-[#251f19]">
      <Header variant="main" title={content.brandTitle} subtitle={content.brandSubtitle} navItems={navigation} ctaLabel={bookingLabel} ctaHref={bookingHref} />
      <main id="main-content">
        <section className={`${sectionClass} grid items-center gap-10 pt-12 md:grid-cols-[1.15fr_0.85fr] md:gap-16`} aria-labelledby="home-title">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6f5436]">Larry Lo / InnovateXP</p>
            <h1 id="home-title" className="mt-5 max-w-[19ch] text-[clamp(2.2rem,5vw,5.3rem)] font-normal leading-[1.16] tracking-[-0.035em]">{c.headline}</h1>
            <p data-geo-answer className="mt-7 max-w-[52ch] text-lg leading-9">{c.introduction}</p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link href={bookingHref} onClick={() => trackBookingCtaClick("hero")} className="inline-flex min-h-12 items-center justify-center bg-[#251f19] px-6 py-3 text-sm font-semibold text-[#fffdfa] hover:bg-[#654b32] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">{bookingLabel}</Link>
              <a href="#case-study" className={linkClass}>{c.cases}</a>
            </div>
          </div>
          <figure className="relative aspect-[4/5] w-full overflow-hidden bg-[#d9d0c2]">
            <Image src="/hero-larry.webp" alt={content.hero.imageAlt} fill priority sizes="(max-width: 768px) 100vw, 40vw" className="object-cover object-[center_22%]" />
            <figcaption className="absolute bottom-0 left-0 right-0 bg-[#251f19] px-5 py-4 text-sm text-[#fffdfa]">Larry Lo · {content.brandSubtitle}</figcaption>
          </figure>
        </section>

        <section id="pain-points" className="border-t border-[#d8cfc2] bg-[#efe9df]" aria-labelledby="pain-title">
          <div className={sectionClass}>
            <h2 id="pain-title" className={titleClass}>{content.problem.title}</h2>
            <ul className="mt-10 grid gap-x-10 md:grid-cols-2">
              {content.problem.items.map((item) => <li key={item.title} className="border-t border-[#c8bba9] py-6"><h3 className="text-2xl font-normal">{item.title}</h3><p className="mt-3 max-w-[50ch] leading-8">{item.body}</p></li>)}
            </ul>
            <Link href={loc("/ai-consultation-questionnaire#workflow-readiness")} className={`mt-5 ${linkClass}`}>{{ en: "Try the free workflow self-check", "zh-hk": "做免費流程自評", "zh-tw": "進行免費流程自評", ja: "無料の業務セルフチェック", de: "Kostenloser Workflow-Selbstcheck" }[locale]} →</Link>
          </div>
        </section>

        <section id="method" className="border-t border-[#d8cfc2]"><div className={sectionClass}><WorkflowMethod locale={locale} /></div></section>

        <section id="case-study" className="border-t border-[#d8cfc2]" aria-labelledby="case-title">
          <div className={sectionClass}>
            <h2 id="case-title" className={titleClass}>{c.cases}</h2>
            <article className="case-evidence mt-10 bg-[#251f19] p-6 text-[#fffdfa] md:p-10">
              <p className="text-xs uppercase tracking-[0.15em] text-[#e5c49c]">Agilizing Limited · 2026 / 01–02</p>
              <h3 className="mt-5 max-w-4xl text-3xl font-normal leading-snug text-[#fffdfa] md:text-4xl">{cases[0].title}</h3>
              <p className="mt-5 max-w-3xl text-lg leading-8">{cases[0].summary}</p>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#e5dccc]">{cases[0].proofNote}</p>
              <Link href={loc(`/case-studies#${cases[0].slug}`)} className="mt-6 inline-flex min-h-11 items-center border-b border-[#e5c49c] text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">{c.cases} →</Link>
            </article>
            <div className="grid gap-8 md:grid-cols-2">
              {cases.slice(1).map((item) => <article key={item.slug} className="border-b border-[#c8bba9] py-8"><h3 className="text-2xl font-normal leading-snug">{item.title}</h3><p className="mt-4 leading-8">{item.summary}</p><Link href={loc(`/case-studies#${item.slug}`)} className={`mt-4 ${linkClass}`}>{c.cases} →</Link></article>)}
            </div>
          </div>
        </section>

        <section id="solutions" className="border-t border-[#d8cfc2] bg-[#efe9df]"><div className={sectionClass}><SolutionPreview locale={locale} /></div></section>

        <section id="services" className="border-t border-[#d8cfc2]" aria-labelledby="services-title">
          <div className={sectionClass}>
            <h2 id="services-title" className={titleClass}>{c.servicesTitle}</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8">{c.servicesIntro}</p>
            <div className="mt-10 grid gap-8 md:grid-cols-2">{c.serviceChoices.map(item => <article key={item.href} className="border-t border-[#c8bba9] pt-6"><h3 className="text-2xl">{item.title}</h3><p className="mt-4 max-w-xl leading-8">{item.body}</p><Link href={loc(item.href)} className={`mt-4 ${linkClass}`}>{item.action} →</Link></article>)}</div>
          </div>
        </section>

        <section id="about" className="border-t border-[#d8cfc2] bg-[#efe9df]"><div className={`${sectionClass} grid gap-8 md:grid-cols-2`}><h2 className={titleClass}>{c.aboutTitle}</h2><div><p className="text-lg leading-9">{c.aboutIntro}</p><Link href={loc("/about")} className={`mt-6 ${linkClass}`}>{navigation[5].label} →</Link></div></div></section>

        <section id="faq" className="border-t border-[#d8cfc2]" aria-labelledby="faq-title"><div className={sectionClass}><h2 id="faq-title" className={titleClass}>{content.faq.title}</h2><div className="mt-10 divide-y divide-[#d8cfc2] border-y border-[#d8cfc2]">{content.faq.items.map(item => <article key={item.question} className="grid gap-4 py-7 md:grid-cols-[0.9fr_1.1fr] md:gap-12"><h3 className="text-xl font-normal">{item.question}</h3><p className="max-w-[65ch] leading-8">{item.answer}</p></article>)}</div><Link href={loc("/faq")} className={`mt-6 ${linkClass}`}>{content.nav.faq} →</Link></div></section>

        <section id="contact" className="border-t border-[#d8cfc2] bg-[#e6dccd]" aria-labelledby="contact-title"><div className={sectionClass}><h2 id="contact-title" className={titleClass}>{content.finalCta.title}</h2><p className="mt-6 max-w-3xl text-lg leading-8">{c.bookingNotes[0]}</p><p className="mt-4 text-sm">Snapshot {formatHkd(PRICING.quickCash.aiReadinessAssessment, locale)} · Discovery ≤10: {formatHkd(PRICING.consultancy.discoverySprint30Day, locale)} / 11–30: {formatHkd(PRICING.consultancy.discoveryWorkshop11To30, locale)}</p><div className="mt-8 flex flex-wrap items-center gap-6"><Link href={bookingHref} onClick={() => trackBookingCtaClick("final_cta")} className="inline-flex min-h-12 items-center bg-[#251f19] px-6 py-3 text-sm font-semibold text-[#fffdfa] hover:bg-[#654b32]">{bookingLabel}</Link><a href={getWhatsAppHref(locale)} className={linkClass}>{secondaryWhatsAppLabel(locale)}</a></div></div></section>
      </main>
      <footer className="border-t border-[#d8cfc2] px-5 py-10 text-sm md:px-10"><div className="mx-auto flex max-w-7xl flex-col gap-6"><a className="w-fit underline underline-offset-4" href={`mailto:${HOMEPAGE_PLACEHOLDERS.emailAddress}`}>{HOMEPAGE_PLACEHOLDERS.emailAddress}</a><nav className="flex flex-wrap gap-x-6 gap-y-4" aria-label="Footer">{navigation.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}<Link href={loc("/privacy-policy")}>{content.footer.privacy}</Link></nav></div></footer>
    </div>
  );
}
