"use client";

import { M3QuestionnaireForm } from "@/components/questionnaires/M3QuestionnaireForm";
import { getConsultationCopy, isHighIntent } from "@/content/questionnaires/consultation";
import type { Answers } from "@/components/questionnaires/M3QuestionnaireForm";
import type { AppLocale } from "@/lib/i18n-routing";

export function AiConsultationQuestionnaire({
  locale,
  bookingHref,
  whatsappHref,
  handoffOnSubmit,
  onSubmittedAnswers,
  successPrimaryLabel,
  embedded,
}: {
  locale: AppLocale;
  bookingHref?: string;
  whatsappHref?: string;
  handoffOnSubmit?: boolean;
  onSubmittedAnswers?: (payload: { answers: Answers; formattedQa: string }) => void;
  successPrimaryLabel?: string;
  embedded?: boolean;
}) {
  const c = getConsultationCopy(locale);

  return (
    <M3QuestionnaireForm
      eyebrow={c.eyebrow}
      title={c.title}
      intro={c.intro}
      privacy={c.privacy}
      questions={c.questions}
      steps={c.steps}
      notices={c.notices}
      pathId="ai-consultation-questionnaire"
      subjectPrefix="業務聽診前小問卷 / Diagnosis Intake"
      bookingHref={bookingHref}
      whatsappHref={whatsappHref}
      showBookingOnSuccess={Boolean(bookingHref) && !handoffOnSubmit}
      requireContact
      requirePhoneOrEmail
      handoffOnSubmit={handoffOnSubmit}
      onSubmittedAnswers={onSubmittedAnswers}
      successPrimaryLabel={successPrimaryLabel}
      embedded={embedded}
      isHighIntent={isHighIntent}
      copy={{
        next: c.next,
        back: c.back,
        submit: c.submit,
        sending: c.sending,
        requiredError: c.requiredError,
        contactRequiredError: c.contactRequiredError,
        failError: c.failError,
        consent: c.consent,
        successTitle: c.successTitle,
        successBody: c.successBody,
        highIntentBody: c.highIntentBody,
        bookCta: c.bookCta,
        whatsappCta: c.whatsappCta,
        pricingEyebrow: c.pricingEyebrow,
        pricingTitle: c.pricingTitle,
        pricingIntro: c.pricingIntro,
        pricingCards: c.pricingCards,
      }}
    />
  );
}
