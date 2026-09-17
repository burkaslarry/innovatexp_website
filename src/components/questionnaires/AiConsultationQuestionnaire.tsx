"use client";

import { M3QuestionnaireForm } from "@/components/questionnaires/M3QuestionnaireForm";
import { getConsultationCopy, isHighIntent } from "@/content/questionnaires/consultation";
import type { AppLocale } from "@/lib/i18n-routing";

export function AiConsultationQuestionnaire({
  locale,
  bookingHref,
  whatsappHref,
}: {
  locale: AppLocale;
  bookingHref: string;
  whatsappHref?: string;
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
      showBookingOnSuccess
      requireContact
      requirePhoneOrEmail
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
