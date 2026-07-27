"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { DEFAULT_LOCALE, isValidLocale, withLocale, type AppLocale } from "@/lib/i18n-routing";
import { uiStrings } from "@/content/ui-strings";

export default function NotFound() {
  const params = useParams();
  const raw = params?.locale;
  const locale: AppLocale =
    typeof raw === "string" && isValidLocale(raw) ? raw : DEFAULT_LOCALE;
  const h = (path: string) => withLocale(locale, path);
  const ui = uiStrings(locale);

  return (
    <main className="min-h-screen bg-canvas flex flex-col items-center justify-center px-4 pb-24 md:pb-8">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-2">{ui.notFound.title}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">{ui.notFound.heading}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-8">{ui.notFound.body}</p>
        <nav className="flex flex-wrap gap-4 justify-center">
          <Link
            href={h("/")}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-brand-primary px-6 font-bold text-white transition duration-300 hover:bg-brand-primary-hover"
          >
            {ui.notFound.home}
          </Link>
          <Link
            href={h("/bookme#quotation-wizard")}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border-2 border-gray-300 bg-white px-6 font-bold text-gray-900 transition duration-300 hover:border-brand-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-brand-primary"
          >
            {ui.notFound.contact}
          </Link>
          <Link
            href={h("/bookme")}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border-2 border-gray-300 bg-white px-6 font-bold text-gray-900 transition duration-300 hover:border-brand-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-brand-primary"
          >
            {ui.notFound.book}
          </Link>
          <Link
            href={h("/ai-consulting")}
            className="inline-flex min-h-[44px] items-center justify-center px-6 font-semibold text-brand-primary hover:underline dark:text-[color:var(--primary-hover)]"
          >
            {ui.notFound.aiConsulting}
          </Link>
          <Link
            href={h("/blog")}
            className="inline-flex min-h-[44px] items-center justify-center px-6 font-semibold text-brand-primary hover:underline dark:text-[color:var(--primary-hover)]"
          >
            {ui.notFound.blog}
          </Link>
        </nav>
        <p className="mt-8 text-sm text-gray-400 dark:text-gray-500">
          {ui.notFound.reportPrefix}{" "}
          <a
            href="mailto:info@innovatexp.co?subject=Broken%20link%20report"
            className="text-brand-primary hover:underline dark:text-[color:var(--primary-hover)]"
          >
            {ui.notFound.reportLink}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
