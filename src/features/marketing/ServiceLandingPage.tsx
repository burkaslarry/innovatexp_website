import Link from "next/link";
import type { AppLocale } from "@/lib/i18n-routing";
import type { ServicePageContent } from "@/types/marketing";

const LABELS: Record<
  AppLocale,
  {
    home: string;
    cases: string;
    audience: string;
    painPoints: string;
    deliverables: string;
    outcomes: string;
    modules: string;
    pricing: string;
    proofPoints: string;
    faq: string;
    related: string;
  }
> = {
  en: {
    home: "Home",
    cases: "See project cases",
    audience: "Target Audience",
    painPoints: "Pain Points",
    deliverables: "Deliverables",
    outcomes: "Expected Outcomes",
    modules: "Example Modules",
    pricing: "Pricing & Program Options",
    proofPoints: "Proof Points",
    faq: "FAQ",
    related: "Related InnovateXP Services",
  },
  "zh-hk": {
    home: "首頁",
    cases: "查看案例",
    audience: "適合對象",
    painPoints: "常見痛點",
    deliverables: "交付內容",
    outcomes: "預期成果",
    modules: "課程／陪跑模組",
    pricing: "定價與計劃選項",
    proofPoints: "經驗與 proof points",
    faq: "常見問題",
    related: "相關 InnovateXP 服務",
  },
  "zh-tw": {
    home: "首頁",
    cases: "查看案例",
    audience: "適合對象",
    painPoints: "常見痛點",
    deliverables: "交付內容",
    outcomes: "預期成果",
    modules: "課程／陪跑模組",
    pricing: "定價與計劃選項",
    proofPoints: "經驗與 proof points",
    faq: "常見問題",
    related: "相關 InnovateXP 服務",
  },
  ja: {
    home: "ホーム",
    cases: "事例を見る",
    audience: "対象",
    painPoints: "よくある課題",
    deliverables: "提供内容",
    outcomes: "期待できる成果",
    modules: "モジュール例",
    pricing: "Pricing & Program Options",
    proofPoints: "実績・根拠",
    faq: "FAQ",
    related: "関連サービス",
  },
  de: {
    home: "Start",
    cases: "Projektbeispiele ansehen",
    audience: "Zielgruppe",
    painPoints: "Herausforderungen",
    deliverables: "Leistungen",
    outcomes: "Erwartete Ergebnisse",
    modules: "Beispielmodule",
    pricing: "Pricing & Program Options",
    proofPoints: "Proof Points",
    faq: "FAQ",
    related: "Verwandte InnovateXP-Services",
  },
};

function localizedHref(locale: AppLocale, href: string) {
  if (href.startsWith("http")) return href;
  const [path, hash] = href.split("#");
  const normalized = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return hash ? `/${locale}${normalized}#${hash}` : `/${locale}${normalized}`;
}

function BulletSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
      <ul className="space-y-3 text-gray-700 dark:text-gray-300">
        {items.map((item) => (
          <li key={item} className="flex gap-3 leading-relaxed">
            <span className="mt-2 h-2 w-2 flex-none rounded-full bg-brand-primary dark:bg-teal-300" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ServiceLandingPage({
  locale,
  content,
}: {
  locale: AppLocale;
  content: ServicePageContent;
}) {
  const labels = LABELS[locale];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-gray-950 dark:text-white">
      <div className="mx-auto max-w-5xl px-4 py-14 md:py-20">
        <nav className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <Link href={`/${locale}`} className="hover:text-brand-primary dark:hover:text-teal-300">
            {labels.home}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700 dark:text-gray-300">{content.title}</span>
        </nav>

        <section className="mb-10 rounded-3xl border border-brand-primary/20 bg-white p-8 shadow-sm dark:border-teal-400/20 dark:bg-gray-900 md:p-10">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-brand-primary dark:text-teal-300">
            {content.eyebrow}
          </p>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-950 dark:text-white md:text-5xl">
            {content.title}
          </h1>
          <p className="max-w-4xl text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            {content.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={localizedHref(locale, content.cta.href)}
              className="rounded-full bg-brand-primary px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-brand-primary-hover dark:bg-[#00B9B3] dark:text-slate-950 dark:hover:bg-[#009e98]"
            >
              {content.cta.label}
            </Link>
            <Link
              href={localizedHref(locale, "/case-studies")}
              className="rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-900 transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:hover:border-teal-300 dark:hover:text-teal-300"
            >
              {labels.cases}
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{content.cta.note}</p>
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          <BulletSection title={labels.audience} items={content.audience} />
          <BulletSection title={labels.painPoints} items={content.painPoints} />
          <BulletSection title={labels.deliverables} items={content.deliverables} />
          <BulletSection title={labels.outcomes} items={content.expectedOutcomes} />
        </div>

        {content.modules ? (
          <section className="mt-6 rounded-2xl border border-cyan-200 bg-cyan-50 p-6 dark:border-teal-500/30 dark:bg-teal-950/20">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">{labels.modules}</h2>
            <ol className="space-y-3 text-gray-700 dark:text-gray-300">
              {content.modules.map((item, index) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white dark:bg-teal-300 dark:text-slate-950">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        {content.pricing ? (
          <section className="mt-6 rounded-2xl border border-brand-primary/25 bg-white p-6 shadow-sm dark:border-teal-500/30 dark:bg-gray-900">
            <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">{content.pricing.title || labels.pricing}</h2>
            <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">{content.pricing.intro}</p>
            <div className="grid gap-4 md:grid-cols-2">
              {content.pricing.plans.map((plan) => (
                <article key={plan.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                  <p className="mt-2 font-semibold text-brand-primary dark:text-teal-300">{plan.price}</p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">{plan.fit}</p>
                  <ul className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-2 leading-relaxed">
                        <span className="font-bold text-brand-primary dark:text-teal-300">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <p className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-gray-600 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-300">
              {content.pricing.note}
            </p>
          </section>
        ) : null}

        <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-500/30 dark:bg-amber-950/20">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">{labels.proofPoints}</h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            {content.proofPoints.map((item) => (
              <li key={item} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">{labels.faq}</h2>
          <dl className="space-y-5">
            {content.faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
                <dt className="text-lg font-semibold text-gray-900 dark:text-white">{faq.question}</dt>
                <dd className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">{labels.related}</h2>
          <div className="flex flex-wrap gap-3">
            {content.relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={localizedHref(locale, link.href)}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-slate-600 dark:text-slate-200 dark:hover:border-teal-300 dark:hover:text-teal-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
