"use client";

import React, { useEffect, useId, useReducer, useRef } from "react";
import type { AppLocale } from "@/lib/i18n-routing";
import {
  INITIAL_READINESS_STATE,
  READINESS_CHOICES,
  READINESS_QUESTIONS,
  WORKFLOW_READINESS_COPY,
  missingReadinessAnswers,
  workflowReadinessReducer,
  type ReadinessQuestion,
} from "@/content/questionnaires/workflow-readiness";

/** Independent of the contact intake. Safe to mount more than once, including on /services. */
export function WorkflowReadiness({ locale }: { locale: AppLocale }) {
  return <WorkflowReadinessForm key={locale} locale={locale} />;
}

function WorkflowReadinessForm({ locale }: { locale: AppLocale }) {
  const copy = WORKFLOW_READINESS_COPY[locale];
  const id = useId();
  const [state, dispatch] = useReducer(workflowReadinessReducer, INITIAL_READINESS_STATE);
  const firstInputs = useRef<Partial<Record<ReadinessQuestion, HTMLInputElement | null>>>({});
  const resultHeading = useRef<HTMLHeadingElement>(null);
  const result = state.recommendation ? copy.recommendations[state.recommendation] : null;

  useEffect(() => {
    if (state.recommendation) resultHeading.current?.focus();
  }, [state.recommendation]);

  function showResult() {
    const missing = missingReadinessAnswers(state.answers);
    dispatch({ type: "submit" });
    if (missing.length) firstInputs.current[missing[0]]?.focus();
    else resultHeading.current?.focus();
  }

  const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6f5436]";

  return (
    <section
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-privacy ${id}-boundary`}
      className="atelier-site mb-12 border border-[#c8bba9] bg-[#fffdfa] p-5 text-[#251f19] sm:p-8"
    >
      <p className="text-xs font-semibold tracking-wide text-[#6f5436]">{copy.eyebrow}</p>
      <h2 id={`${id}-title`} className="mt-3 text-3xl font-normal leading-tight sm:text-4xl">{copy.title}</h2>
      <p className="mt-4 leading-relaxed text-[#51483d]">{copy.intro}</p>
      <p id={`${id}-privacy`} className="mt-4 text-sm leading-relaxed text-[#51483d]">{copy.privacy}</p>
      <p id={`${id}-boundary`} className="mt-4 border-l-2 border-[#8b6b43] pl-4 text-sm leading-relaxed text-[#51483d]">{copy.boundary}</p>
      <p id={`${id}-instructions`} className="mt-6 font-medium leading-relaxed">{copy.instructions}</p>
      <noscript><p className="mt-4">{copy.noScript}</p></noscript>

      {state.missing.length > 0 && (
        <div id={`${id}-error`} role="alert" className="mt-5 border-l-2 border-[#8b3c2a] bg-[#f7f4ee] p-4">
          <p className="font-semibold">{copy.incomplete}</p>
          <ul className="mt-2">
            {state.missing.map((question) => (
              <li key={question}>
                <button type="button" onClick={() => firstInputs.current[question]?.focus()} className={`min-h-11 py-2 text-left underline underline-offset-4 ${focus}`}>
                  {copy.questions[question].label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* No form action or free-text fields: even before hydration there is nothing to submit. */}
      <div className="mt-6 space-y-6">
        {READINESS_QUESTIONS.map((question) => {
          const q = copy.questions[question];
          const invalid = state.missing.includes(question);
          return (
            <fieldset
              key={question}
              aria-describedby={`${id}-${question}-hint ${id}-instructions${invalid ? ` ${id}-error` : ""}`}
              aria-invalid={invalid || undefined}
              className="min-w-0 border-t border-[#c8bba9] pt-4"
            >
              <legend className="max-w-full pr-3 text-lg font-semibold">{q.label}</legend>
              <p id={`${id}-${question}-hint`} className="mb-3 text-sm leading-relaxed text-[#51483d]">{q.hint}</p>
              <div className="grid gap-2">
                {READINESS_CHOICES.map((choice, index) => (
                  <label
                    key={choice}
                    htmlFor={`${id}-${question}-${choice}`}
                    className={`flex min-h-11 cursor-pointer items-start gap-3 border px-4 py-3 leading-relaxed focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#6f5436] ${state.answers[question] === choice ? "border-[#6f5436] bg-[#f7f4ee]" : "border-[#d8cfc2] hover:border-[#6f5436]"}`}
                  >
                    <input
                      ref={index === 0 ? (element) => { firstInputs.current[question] = element; } : undefined}
                      id={`${id}-${question}-${choice}`}
                      name={`${id}-${question}`}
                      type="radio"
                      value={choice}
                      required
                      checked={state.answers[question] === choice}
                      onChange={() => dispatch({ type: "answer", question, choice })}
                      className="mt-1 h-5 w-5 shrink-0 accent-[#6f5436]"
                    />
                    <span>{choice === "unsure" ? copy.unsure : q[choice]}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={showResult} className={`min-h-11 bg-[#251f19] px-5 py-3 font-semibold text-[#fffdfa] hover:bg-[#6f5436] ${focus}`}>
          {copy.submit}
        </button>
        <button
          type="button"
          onClick={() => { dispatch({ type: "reset" }); firstInputs.current.workflow?.focus(); }}
          className={`min-h-11 border border-[#c8bba9] px-5 py-3 font-semibold hover:border-[#6f5436] ${focus}`}
        >
          {copy.reset}
        </button>
      </div>

      {result && (
        <section aria-labelledby={`${id}-result-title`} className="mt-8 border-t-2 border-[#8b6b43] pt-6">
          <p className="text-sm text-[#6f5436]">{copy.resultLabel}</p>
          <h3 ref={resultHeading} tabIndex={-1} id={`${id}-result-title`} className={`mt-2 text-2xl font-normal ${focus}`}>{result.title}</h3>
          <p className="mt-3 leading-relaxed text-[#51483d]">{result.why}</p>
          <h4 className="mt-5 font-semibold">{copy.evidence}</h4>
          <dl className="mt-2 divide-y divide-[#d8cfc2] text-sm">
            {READINESS_QUESTIONS.map((question) => {
              const answer = state.answers[question]!;
              return (
                <div key={question} className="py-3">
                  <dt className="font-medium">{copy.questions[question].label}</dt>
                  <dd className="mt-1 text-[#51483d]">{answer === "unsure" ? copy.unsure : copy.questions[question][answer]}</dd>
                </div>
              );
            })}
          </dl>
          <h4 className="mt-5 font-semibold">{copy.nextSteps}</h4>
          <ol className="mt-3 list-decimal space-y-3 pl-5 leading-relaxed text-[#51483d]">
            {result.steps.map((step) => <li key={step}>{step}</li>)}
          </ol>
          <a href={`/${locale}/bookme`} className={`mt-5 inline-flex min-h-11 items-center py-3 font-semibold underline underline-offset-4 ${focus}`}>
            {copy.book}
          </a>
        </section>
      )}
      <a href={`/${locale}/ai-consulting`} className={`mt-4 inline-flex min-h-11 items-center py-3 text-sm font-semibold underline underline-offset-4 ${focus}`}>
        {copy.services}
      </a>
    </section>
  );
}
