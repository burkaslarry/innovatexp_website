import Link from "next/link";
import type { PrivacyPolicyContent } from "@/types/legal";
import { localeUsesChineseCopy, type AppLocale } from "@/lib/i18n-routing";

export function LegalPolicyPage({
  locale,
  content,
  homeLabel,
}: {
  locale: AppLocale;
  content: PrivacyPolicyContent;
  homeLabel?: string;
}) {
  const home = homeLabel ?? (localeUsesChineseCopy(locale) ? "首頁" : "Home");
  const effectiveLabel = localeUsesChineseCopy(locale) ? "生效日期" : "Effective date";
  const updatedLabel = localeUsesChineseCopy(locale) ? "最後更新" : "Last updated";

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <nav className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <Link href={`/${locale}`} className="hover:text-brand-primary dark:hover:text-teal-300">
            {home}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700 dark:text-gray-300">{content.breadcrumb}</span>
        </nav>

        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
          {content.title}
        </h1>
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          {effectiveLabel}: {content.effectiveDate}
        </p>
        <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          {updatedLabel}: {content.lastUpdated}
        </p>

        <div className="mb-12 space-y-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {content.intro.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>

        {content.sections.map((sec) => (
          <section key={sec.title} className="mb-10">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">{sec.title}</h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              {sec.paragraphs.map((p) => (
                <p key={p.slice(0, 28)} className="leading-relaxed">
                  {p}
                </p>
              ))}
              {sec.bullets?.length ? (
                <ul className="list-disc space-y-2 pl-6">
                  {sec.bullets.map((item) => (
                    <li key={item.slice(0, 24)} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>
        ))}

        <section className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">{content.contactTitle}</h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            {content.contactLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
