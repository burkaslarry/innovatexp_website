/* Diagnosis intake followed by a 30-minute calendar booking. */
'use client';

import { useMemo, useState } from 'react';
import { useLanguage } from '../../LanguageContext';
import { getLocaleFromPathname } from '@/lib/i18n-routing';
import type { AppLocale } from '@/lib/i18n-routing';
import { usePathname } from 'next/navigation';
import Header from '../../components/Header';
import QuotationWizard from '@/components/QuotationWizard';
import { AiConsultationQuestionnaire } from '@/components/questionnaires/AiConsultationQuestionnaire';
import type { Answers } from '@/components/questionnaires/M3QuestionnaireForm';
import { buildWhatsAppHref } from '@/lib/whatsapp-contact';

type IntakePayload = { answers: Answers; formattedQa: string };

type BookingCopy = {
  eyebrow: string;
  heading: string;
  intro: string;
  steps: [string, string];
  stepDetail: [string, string];
  contact: string;
  skip: string;
  back: string;
  information: string;
  whatsappMessage: string;
};

const BOOKING_COPY: Record<AppLocale, BookingCopy> = {
  'zh-hk': {
    eyebrow: 'InnovateXP / 業務聽診',
    heading: '預約 30 分鐘業務聽診',
    intro: '帶你最亂嗰條流程嚟。先填簡短問卷，等我了解情況；之後揀時段。已填過問卷可以直接揀時間。',
    steps: ['講清問題', '揀時間'],
    stepDetail: ['約 2 分鐘問卷', '30 分鐘對話'],
    contact: '有問題？直接電郵',
    skip: '已填過問卷？直接揀時間 →',
    back: '← 返回問卷',
    information: '預約詳情',
    whatsappMessage: '你好，我想預約 30 分鐘業務聽診。',
  },
  'zh-tw': {
    eyebrow: 'InnovateXP / 業務診斷',
    heading: '預約 30 分鐘業務診斷',
    intro: '帶來你最混亂的一條流程。先填簡短問卷，讓我了解情況，再選擇時段。已填過問卷可直接選時間。',
    steps: ['釐清問題', '選擇時間'],
    stepDetail: ['約 2 分鐘問卷', '30 分鐘對話'],
    contact: '有問題？請寄信至',
    skip: '已填過問卷？直接選時間 →',
    back: '← 返回問卷',
    information: '預約詳情',
    whatsappMessage: '你好，我想預約 30 分鐘業務診斷。',
  },
  en: {
    eyebrow: 'InnovateXP / Business diagnosis',
    heading: 'Book a 30-minute workflow diagnosis',
    intro: 'Bring the workflow that keeps getting stuck. A short form helps me prepare; then choose a time. If you already completed it, go straight to the calendar.',
    steps: ['Describe the issue', 'Choose a time'],
    stepDetail: ['About 2 minutes', '30-minute conversation'],
    contact: 'Questions? Email',
    skip: 'Already completed the form? Pick a time →',
    back: '← Back to the form',
    information: 'Booking details',
    whatsappMessage: 'Hi — I would like to book a 30-minute Business Workflow Diagnosis.',
  },
  ja: {
    eyebrow: 'InnovateXP / 業務診断',
    heading: '30分の業務診断を予約',
    intro: '一番困っている業務をお持ちください。短い事前フォームで状況を共有し、日時を選びます。記入済みなら日時選択へ進めます。',
    steps: ['課題を共有', '日時を選択'],
    stepDetail: ['約2分のフォーム', '30分の対話'],
    contact: 'お問い合わせ',
    skip: '記入済みですか？日時を選択 →',
    back: '← フォームに戻る',
    information: '予約について',
    whatsappMessage: 'こんにちは。30分の業務診断を予約したいです。',
  },
  de: {
    eyebrow: 'InnovateXP / Ablaufdiagnose',
    heading: '30-minütige Ablaufdiagnose buchen',
    intro: 'Bringen Sie den Ablauf mit, der immer wieder stockt. Ein kurzes Formular hilft bei der Vorbereitung; danach wählen Sie einen Termin. Bereits ausgefüllt? Gehen Sie direkt zum Kalender.',
    steps: ['Problem beschreiben', 'Termin wählen'],
    stepDetail: ['Etwa 2 Minuten', '30 Minuten Gespräch'],
    contact: 'Fragen? Schreiben Sie an',
    skip: 'Formular schon ausgefüllt? Termin wählen →',
    back: '← Zurück zum Formular',
    information: 'Buchungsdetails',
    whatsappMessage: 'Hallo, ich möchte eine 30-minütige Ablaufdiagnose buchen.',
  },
};

export default function BookVisitPage() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const copy = BOOKING_COPY[locale];
  const [phase, setPhase] = useState<'intake' | 'booking'>('intake');
  const [intake, setIntake] = useState<IntakePayload | null>(null);

  const whatsappHref = useMemo(() => buildWhatsAppHref(copy.whatsappMessage), [copy.whatsappMessage]);
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
    <div className="atelier-booking min-h-screen bg-[#f7f4ee] text-[#251f19]">
      <Header variant="booking" title="InnovateXP Limited" subtitle={copy.eyebrow} />
      <main className="mx-auto max-w-7xl px-5 pb-20 pt-10 md:px-10 md:pb-28 md:pt-20">
        <div className="grid gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-start md:gap-16">
          <div className="md:sticky md:top-32">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b6b43]">{copy.eyebrow}</p>
            <h1 className="mt-5 max-w-[15ch] text-[clamp(2.3rem,4.5vw,4.8rem)] font-normal leading-[1.16] tracking-[-0.035em]">{copy.heading}</h1>
            <p className="mt-6 max-w-[47ch] text-base leading-8 md:text-lg">{copy.intro}</p>
            <ol className="mt-8 grid grid-cols-2 border-y border-[#c8bba9] py-5">
              {copy.steps.map((label, index) => (
                <li key={label} className="pr-3">
                  <span className="text-xs font-semibold text-[#8b6b43]">0{index + 1}</span>
                  <p className="mt-2 text-base font-semibold text-[#251f19]">{label}</p>
                  <p className="mt-1 text-sm">{copy.stepDetail[index]}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm leading-7">{copy.contact} <a className="border-b border-[#8b6b43] font-semibold text-[#251f19]" href="mailto:info@innovatexp.co">info@innovatexp.co</a></p>
          </div>

          <div className="border border-[#d8cfc2] bg-[#fffdfa] p-4 sm:p-7 md:p-9">
            {phase === 'intake' ? (
              <div className="space-y-5">
                <AiConsultationQuestionnaire
                  locale={locale}
                  whatsappHref={whatsappHref}
                  handoffOnSubmit
                  embedded
                  onSubmittedAnswers={(payload) => {
                    setIntake(payload);
                    setPhase('booking');
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    setIntake(null);
                    setPhase('booking');
                  }}
                  className="inline-flex min-h-11 items-center border-b border-[#8b6b43] text-sm font-semibold text-[#251f19] hover:text-[#8b6b43] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  {copy.skip}
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                <button
                  type="button"
                  onClick={() => setPhase('intake')}
                  className="inline-flex min-h-11 items-center border-b border-[#8b6b43] text-sm font-semibold text-[#251f19] hover:text-[#8b6b43]"
                >
                  {copy.back}
                </button>
                <QuotationWizard bookingOnly diagnosticQaOverride={intake?.formattedQa} prefillIdentity={prefill} />
              </div>
            )}
          </div>
        </div>

        <details className="mt-12 max-w-3xl border-t border-[#c8bba9] pt-5 text-sm">
          <summary className="cursor-pointer font-semibold text-[#251f19]">{copy.information}</summary>
          <ul className="mt-4 space-y-2 leading-7">
            <li>{t('bookme.info.monday_friday')}</li>
            <li>{t('bookme.info.one_hour')}</li>
            <li>{t('bookme.info.confirmation')}</li>
            <li>{t('bookme.info.cancel')}</li>
            <li>{t('bookme.info.online')}</li>
          </ul>
        </details>
      </main>
      <footer className="border-t border-[#d8cfc2] px-5 py-8 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4 text-sm">
          <span>InnovateXP Limited</span>
          <span>{t('footer.copyright')}</span>
        </div>
      </footer>
    </div>
  );
}
