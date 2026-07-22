"use client";

import { M3QuestionnaireForm } from "@/components/questionnaires/M3QuestionnaireForm";
import { getFeedbackCopy } from "@/content/questionnaires/feedback";
import type { AppLocale } from "@/lib/i18n-routing";

export function AiFeedbackQuestionnaire({ locale }: { locale: AppLocale }) {
  const c = getFeedbackCopy(locale);
  const steps = [
    { title: "1", questionIds: ["service", "satisfaction", "beforeAfter"] },
    { title: "2", questionIds: ["worked", "improve", "recommend"] },
    { title: "3", questionIds: ["caseStudy", "name", "email", "discountNote"] },
  ];

  return (
    <M3QuestionnaireForm
      eyebrow={c.eyebrow}
      title={c.title}
      intro={c.intro}
      privacy={c.privacy}
      questions={c.questions}
      steps={steps}
      pathId="ai-feedback-questionnaire"
      subjectPrefix="AI Feedback Questionnaire"
      showBookingOnSuccess={false}
      requireContact={false}
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
      }}
    />
  );
}
