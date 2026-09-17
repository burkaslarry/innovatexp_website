/* F06: Bookme page - Diagnosis intake (same as questionnaire) then calendar booking. */
'use client';

import { useMemo, useState } from 'react';
import { useLanguage } from '../../LanguageContext';
import { uiStrings } from '@/content/ui-strings';
import { getLocaleFromPathname, localeUsesChineseCopy } from '@/lib/i18n-routing';
import { usePathname } from 'next/navigation';
import Header from '../../components/Header';
import QuotationWizard from '@/components/QuotationWizard';
import { AiConsultationQuestionnaire } from '@/components/questionnaires/AiConsultationQuestionnaire';
import type { Answers } from '@/components/questionnaires/M3QuestionnaireForm';
import { buildWhatsAppHref } from '@/lib/whatsapp-contact';

type IntakePayload = { answers: Answers; formattedQa: string };

export default function BookVisitPage() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const ui = uiStrings(locale);
  const zh = localeUsesChineseCopy(locale);
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [phase, setPhase] = useState<'intake' | 'booking'>('intake');
  const [intake, setIntake] = useState<IntakePayload | null>(null);

  const whatsappHref = useMemo(
    () =>
      buildWhatsAppHref(
        zh
          ? '你好，我想預約 30 分鐘業務聽診。'
          : 'Hi — I would like to book a 30-minute Business Workflow Diagnosis.',
      ),
    [zh],
  );

  const prefill = useMemo(() => {
    if (!intake) return undefined;
    const a = intake.answers;
    return {
      name: String(a.name || '').trim(),
      email: String(a.email || '').trim(),
      phone: String(a.phone || '').trim(),
      company: String(a.company || '').trim(),
    };
  }, [intake]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-950">
      <Header variant="booking" title={t('bookme.header.title')} subtitle={t('bookme.header.subtitle')} />

      <main className="pt-24">
        <div className="mx-auto max-w-5xl px-3 sm:px-5 md:px-6">
          <div className="mx-auto max-w-4xl py-8 md:px-6 md:py-10">
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/60 sm:p-6 md:p-10">
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white md:text-3xl">
                {t('bookme.title')}
              </h1>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 md:text-base">
                {zh
                  ? '先填業務聽診前小問卷（同諮詢問卷同一套），再揀 30 分鐘時段。唔硬推產品。'
                  : 'Complete the same pre-diagnosis mini form first, then pick a 30-minute slot. No hard sell.'}
              </p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Email:{' '}
                <a
                  href="mailto:info@innovatexp.co"
                  className="font-semibold text-brand-primary underline decoration-brand-primary/40 underline-offset-2 hover:text-brand-primary-hover dark:text-[color:var(--primary-hover)]"
                >
                  info@innovatexp.co
                </a>
              </p>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950/40 sm:p-5 md:p-5">
                <p className="text-sm font-bold text-slate-900 dark:text-white">{t('bookme.info.title')}</p>
                <ul className="mt-3 grid gap-2 text-sm text-slate-700 dark:text-slate-300 sm:grid-cols-3">
                  <li className="flex items-start gap-2 rounded-lg bg-white px-3 py-2 dark:bg-slate-900/60">
                    <span className="mt-0.5 text-brand-primary dark:text-[color:var(--primary-hover)]">•</span>
                    <span>{t('bookme.info.monday_friday')}</span>
                  </li>
                  <li className="flex items-start gap-2 rounded-lg bg-white px-3 py-2 dark:bg-slate-900/60">
                    <span className="mt-0.5 text-brand-primary dark:text-[color:var(--primary-hover)]">•</span>
                    <span>{t('bookme.info.one_hour')}</span>
                  </li>
                  <li className="flex items-start gap-2 rounded-lg bg-white px-3 py-2 dark:bg-slate-900/60">
                    <span className="mt-0.5 text-brand-primary dark:text-[color:var(--primary-hover)]">•</span>
                    <span>{t('bookme.info.confirmation')}</span>
                  </li>
                </ul>
                <button
                  type="button"
                  onClick={() => setShowGuidelines((v) => !v)}
                  className="mt-4 flex w-full items-center justify-between gap-3 text-left text-sm font-semibold text-brand-primary dark:text-[color:var(--primary-hover)]"
                >
                  <span>{showGuidelines ? ui.bookme.hideDetails : ui.bookme.showDetails}</span>
                  <svg
                    className={`h-5 w-5 transition-transform ${showGuidelines ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showGuidelines ? (
                  <div className="mt-3 rounded-xl border border-gray-200 bg-white p-5 text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-brand-primary dark:text-[color:var(--primary-hover)]">•</span>
                        <span>{t('bookme.info.cancel')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-brand-primary dark:text-[color:var(--primary-hover)]">•</span>
                        <span>{t('bookme.info.online')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-brand-primary dark:text-[color:var(--primary-hover)]">•</span>
                        <span>{t('bookme.info.notion')}</span>
                      </li>
                    </ul>
                  </div>
                ) : null}
              </div>

              <div className="mt-8">
                {phase === 'intake' ? (
                  <div className="space-y-4">
                    <AiConsultationQuestionnaire
                      locale={locale}
                      whatsappHref={whatsappHref}
                      handoffOnSubmit
                      onSubmittedAnswers={(payload) => {
                        setIntake(payload);
                        setPhase('booking');
                      }}
                    />
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setIntake(null);
                          setPhase('booking');
                        }}
                        className="text-sm font-semibold text-slate-600 underline-offset-2 hover:underline dark:text-slate-300"
                      >
                        {zh ? '已填過／直接揀時間' : 'Already done / skip to pick a time'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <button
                      type="button"
                      onClick={() => setPhase('intake')}
                      className="text-sm font-semibold text-brand-primary underline-offset-2 hover:underline"
                    >
                      {zh ? '← 返回聽診前問卷' : '← Back to pre-diagnosis form'}
                    </button>
                    <QuotationWizard
                      bookingOnly
                      diagnosticQaOverride={intake?.formattedQa}
                      prefillIdentity={prefill}
                    />
                  </div>
                )}
              </div>
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
