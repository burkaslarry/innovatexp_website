import Link from "next/link";
import type { AppLocale } from "@/lib/i18n-routing";
import type { CaseStudyContent, VisionCopy } from "@/types/marketing";

function localizedHref(locale: AppLocale, href: string) {
  if (href.startsWith("http")) return href;
  return `/${locale}${href.startsWith("/") ? href : `/${href}`}`;
}

function CaseList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
        {items.map((item) => (
          <li key={item} className="flex gap-2 leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand-primary dark:bg-teal-300" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CaseStudiesPage({
  locale,
  cases,
  vision,
}: {
  locale: AppLocale;
  cases: CaseStudyContent[];
  vision: VisionCopy;
}) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-gray-950 dark:text-white">
      <div className="mx-auto max-w-5xl px-4 py-14 md:py-20">
        <nav className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <Link href={`/${locale}`} className="hover:text-brand-primary dark:hover:text-teal-300">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700 dark:text-gray-300">Case Studies</span>
        </nav>

        <section className="mb-10 rounded-3xl border border-brand-primary/20 bg-white p-8 shadow-sm dark:border-teal-400/20 dark:bg-gray-900 md:p-10">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-brand-primary dark:text-teal-300">
            Project cases and proof points
          </p>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-950 dark:text-white md:text-5xl">
            InnovateXP project cases: AI workflows, training, CRM, and event intelligence
          </h1>
          <p className="max-w-4xl text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            These examples show the kinds of work InnovateXP delivers: EventXP, SmartSales CRM,
            AI training / AI 教班, AI 陪跑課程, custom internal tools, dashboards, booking flows,
            system rescue, and clean architecture refactor. Proof points are phrased as experience
            and capabilities, not inflated guarantees.
          </p>
        </section>

        <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Founder Vision</h2>
          <div className="space-y-4 leading-relaxed text-gray-700 dark:text-gray-300">
            <p>{vision.statement}</p>
            <p>{vision.reason}</p>
            <p>{vision.helps}</p>
          </div>
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {vision.outcomes.map((item) => (
              <li key={item} className="rounded-xl bg-slate-50 p-4 text-gray-700 dark:bg-gray-900 dark:text-gray-300">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <div className="space-y-8">
          {cases.map((item) => (
            <article
              key={item.slug}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900 md:p-8"
            >
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-primary dark:text-teal-300">
                {item.proofType.replace(/-/g, " ")}
              </p>
              <h2 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">{item.title}</h2>
              <p className="mb-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">{item.summary}</p>
              <p className="mb-6 leading-relaxed text-gray-600 dark:text-gray-400">{item.context}</p>
              <p className="mb-6 rounded-xl bg-slate-50 p-4 text-sm font-semibold text-slate-700 dark:bg-gray-800 dark:text-slate-200">
                Target audience: {item.audience}
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                <CaseList title="Challenge" items={item.challenge} />
                <CaseList title="Approach" items={item.approach} />
                <CaseList title="Deliverables" items={item.deliverables} />
                <CaseList title="Outcomes" items={item.outcomes} />
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {item.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={localizedHref(locale, link.href)}
                    className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-slate-600 dark:text-slate-200 dark:hover:border-teal-300 dark:hover:text-teal-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>

        <section className="mt-10 rounded-3xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-500/30 dark:bg-amber-950/20">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Referral Sentences</h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">{vision.referralEnglish}</p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">{vision.referralTraditionalChinese}</p>
          <Link
            href={`/${locale}/bookme`}
            className="mt-6 inline-block rounded-full bg-brand-primary px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-brand-primary-hover dark:bg-[#00B9B3] dark:text-slate-950 dark:hover:bg-[#009e98]"
          >
            Book a consultation
          </Link>
        </section>
      </div>
    </main>
  );
}
