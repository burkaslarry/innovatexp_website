// app/bookme/page.tsx
'use client';

import { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import Header from '../components/Header';
import QuotationWizard from '@/components/QuotationWizard';

export default function BookVisitPage() {
  const { t } = useLanguage();
  const [showGuidelines, setShowGuidelines] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-950">
      <Header variant="booking" title={t('bookme.header.title')} subtitle={t('bookme.header.subtitle')} />

      <main className="pt-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-4xl px-6 py-10">
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/60 md:p-10">
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white md:text-3xl">
                {t('bookme.title')}
              </h1>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 md:text-base">
                {t('bookme.subtitle')}
              </p>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950/40">
                <button
                  type="button"
                  onClick={() => setShowGuidelines((v) => !v)}
                  className="flex w-full items-center justify-between gap-3 text-left"
                >
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{t('bookme.info.title')}</span>
                  <svg
                    className={`h-5 w-5 text-slate-600 transition-transform dark:text-slate-300 ${
                      showGuidelines ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showGuidelines ? (
                  <div className="mt-3 rounded-xl border border-gray-200 bg-white p-5 text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-brand-primary dark:text-teal-300">•</span>
                        <span>{t('bookme.info.monday_friday')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-brand-primary dark:text-teal-300">•</span>
                        <span>{t('bookme.info.one_hour')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-brand-primary dark:text-teal-300">•</span>
                        <span>{t('bookme.info.confirmation')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-brand-primary dark:text-teal-300">•</span>
                        <span>{t('bookme.info.cancel')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-brand-primary dark:text-teal-300">•</span>
                        <span>{t('bookme.info.online')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-brand-primary dark:text-teal-300">•</span>
                        <span>{t('bookme.info.notion')}</span>
                      </li>
                    </ul>
                  </div>
                ) : null}
              </div>

              <QuotationWizard />
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-700 bg-gray-900 py-6 text-center dark:bg-gray-950">
        <p className="text-slate-400">{t('footer.copyright')}</p>
      </footer>
    </div>
  );
}

