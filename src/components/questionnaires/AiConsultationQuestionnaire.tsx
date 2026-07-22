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
  const q = c.questions;

  const steps = [
    { title: c.sectionA, questionIds: ["industry", "role", "teamSize"] },
    { title: c.sectionB, questionIds: ["workflows", "painPoints", "weeklyHours", "keyPersonRisk"] },
    { title: c.sectionC, questionIds: ["currentTools", "outcomes", "urgency"] },
    { title: c.sectionD, questionIds: ["interest", "name", "company", "email", "phone", "website"] },
  ];

  return (
    <M3QuestionnaireForm
      eyebrow={c.eyebrow}
      title={c.title}
      intro={c.intro}
      privacy={c.privacy}
      questions={q}
      steps={steps}
      pathId="ai-consultation-questionnaire"
      subjectPrefix="AI Consultation Questionnaire"
      bookingHref={bookingHref}
      whatsappHref={whatsappHref}
      showBookingOnSuccess
      requireContact
      isHighIntent={isHighIntent}
      copy={{
        next: c.next,
        back: c.back,
        submit: c.submit,
        sending: c.sending,
        requiredError: c.requiredError,
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
