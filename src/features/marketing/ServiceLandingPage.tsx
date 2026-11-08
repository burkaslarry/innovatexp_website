import Link from "next/link";
import { SitePageShell } from "@/components/SitePageShell";
import { SERVICE_DECISION_COPY } from "@/content/service-decision-copy";
import type { AppLocale } from "@/lib/i18n-routing";
import type { ServicePageContent } from "@/types/marketing";

const LABELS: Record<AppLocale, { painPoints: string; outcomes: string; modules: string; pricing: string; proof: string; related: string }> = {
  en: { painPoints: "Problems to address", outcomes: "Changes to evaluate", modules: "Example modules", pricing: "Pricing and programme options", proof: "Experience and evidence", related: "Related services" },
  "zh-hk": { painPoints: "要處理嘅問題", outcomes: "要覆核嘅改變", modules: "課程／陪跑模組", pricing: "定價與計劃選項", proof: "經驗與證據", related: "相關服務" },
  "zh-tw": { painPoints: "需要處理的問題", outcomes: "需要評估的改變", modules: "課程／陪跑模組", pricing: "定價與計畫選項", proof: "經驗與證據", related: "相關服務" },
  ja: { painPoints: "取り組む課題", outcomes: "確認する変化", modules: "モジュール例", pricing: "料金・プログラム", proof: "経験と根拠", related: "関連サービス" },
  de: { painPoints: "Zu lösende Probleme", outcomes: "Zu prüfende Veränderungen", modules: "Beispielmodule", pricing: "Preise und Programme", proof: "Erfahrung und Belege", related: "Verwandte Leistungen" },
};

function localizedHref(locale: AppLocale, href: string) {
  if (href.startsWith("http")) return href;
  const [path, hash] = href.split("#");
  const normalized = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return hash ? `/${locale}${normalized}#${hash}` : `/${locale}${normalized}`;
}

const sectionClass = "mt-12 border-t border-[#c8bba9] pt-8";
const headingClass = "text-2xl leading-snug md:text-3xl";

function BulletSection({ title, items }: { title: string; items: string[] }) {
  return <section>
    <h2 className={headingClass}>{title}</h2>
    <ul className="mt-5 list-disc space-y-3 pl-5 leading-8">{items.map(item => <li key={item}>{item}</li>)}</ul>
  </section>;
}

export function ServiceLandingPage({ locale, content }: { locale: AppLocale; content: ServicePageContent }) {
  const labels = LABELS[locale];
  const decision = SERVICE_DECISION_COPY[locale];
  const course = content.schemaKind === "Course";
  const steps = course ? decision.courseSteps : decision.processSteps;
  const inputs = course ? decision.courseInputs : decision.inputs;

  return (
    <SitePageShell title={content.title} actionLabel={content.cta.label} actionHref={localizedHref(locale, content.cta.href)}>
      <p className="text-xs font-semibold uppercase tracking-widest text-[#8b6b43]">{content.eyebrow}</p>
      <p className="mt-4 max-w-3xl text-xl leading-9" data-geo-answer>{content.intro}</p>
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
        <Link href={localizedHref(locale, content.cta.href)} className="inline-flex min-h-11 items-center bg-[#251f19] px-6 py-3 text-[#fffdfa]">{content.cta.label}</Link>
        <Link href={`/${locale}/case-studies`} className="inline-flex min-h-11 items-center underline underline-offset-4">{decision.cases}</Link>
      </div>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-[#51483d]">{content.cta.note}</p>
      <div className={`${sectionClass} grid gap-10 md:grid-cols-2`}>
        <BulletSection title={decision.fit} items={content.audience} />
        <BulletSection title={decision.deliverables} items={content.deliverables} />
      </div>
      <div className={`${sectionClass} grid gap-10 md:grid-cols-2`}>
        <section><h2 className={headingClass}>{decision.process}</h2><ol className="mt-5 list-decimal space-y-3 pl-5 leading-8">{steps.map(step => <li key={step}>{step}</li>)}</ol></section>
        <BulletSection title={decision.preparation} items={inputs} />
      </div>
      <section className={sectionClass}>
        <h2 className={headingClass}>{decision.boundaries}</h2>
        <p className="mt-4 max-w-3xl leading-8">{course ? decision.courseBoundary : decision.scopeNote}</p>
      </section>
      <div className={`${sectionClass} grid gap-10 md:grid-cols-2`}>
        <BulletSection title={labels.painPoints} items={content.painPoints} />
        <BulletSection title={labels.outcomes} items={content.expectedOutcomes} />
      </div>
      {content.modules?.length ? <section className={sectionClass}>
        <h2 className={headingClass}>{labels.modules}</h2>
        <ol className="mt-5 list-decimal space-y-3 pl-5 leading-8">{content.modules.map(item => <li key={item}>{item}</li>)}</ol>
      </section> : null}
      {content.pricing ? <section className={sectionClass}>
        <h2 className={headingClass}>{content.pricing.title || labels.pricing}</h2>
        <p className="mt-4 max-w-3xl leading-8">{content.pricing.intro}</p>
        <div className="mt-6 divide-y divide-[#d8cfc2]">{content.pricing.plans.map(plan => <article key={plan.name} className="py-7">
          <div className="flex flex-wrap items-baseline justify-between gap-3"><h3 className="text-xl font-semibold">{plan.name}</h3><p className="text-xl text-[#6f5436]">{plan.price}</p></div>
          <p className="mt-3 max-w-3xl leading-8">{plan.fit}</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-8">{plan.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            {plan.method?.length ? <div><h4 className="text-lg font-semibold">{decision.process}</h4><ol className="mt-3 list-decimal space-y-2 pl-5 leading-8">{plan.method.map(step => <li key={step}>{step}</li>)}</ol></div> : null}
            {plan.effects?.length ? <div><h4 className="text-lg font-semibold">{labels.outcomes}</h4><ul className="mt-3 list-disc space-y-2 pl-5 leading-8">{plan.effects.map(effect => <li key={effect}>{effect}</li>)}</ul></div> : null}
          </div>
        </article>)}</div>
        <p className="mt-4 border-l-2 border-[#8b6b43] pl-4 text-sm leading-7">{content.pricing.note}</p>
      </section> : null}
      <section className={sectionClass}><h2 className={headingClass}>{labels.proof}</h2><ul className="mt-5 space-y-3 leading-8">{content.proofPoints.map(item => <li key={item}>{item}</li>)}</ul></section>
      <section className={sectionClass}>
        <h2 className={headingClass}>{decision.faq}</h2>
        <dl className="mt-6 space-y-6">{content.faqs.map(faq => <div key={faq.question}><dt className="text-lg font-semibold">{faq.question}</dt><dd className="mt-2 max-w-3xl leading-8">{faq.answer}</dd></div>)}</dl>
      </section>
      <nav className={sectionClass} aria-label={labels.related}>
        <h2 className={headingClass}>{labels.related}</h2>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          <Link href={`/${locale}/services`} className="inline-flex min-h-11 items-center underline">{decision.services}</Link>
          {content.relatedLinks.map(link => <Link key={link.href} href={localizedHref(locale, link.href)} className="inline-flex min-h-11 items-center underline">{link.label}</Link>)}
        </div>
      </nav>
    </SitePageShell>
  );
}
