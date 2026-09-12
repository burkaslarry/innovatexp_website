"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  getAutomationPackagesCopy,
  scoreAutomationQualifier,
  type QualifierAnswers,
} from "@/content/automation-packages";
import type { AppLocale } from "@/lib/i18n-routing";
import { withLocale } from "@/lib/i18n-routing";

export function AutomationQualifier({ locale }: { locale: AppLocale }) {
  const c = getAutomationPackagesCopy(locale);
  const [answers, setAnswers] = useState<QualifierAnswers>({});
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = c.questions.every((q) => Boolean(answers[q.id]));
  const result = useMemo(
    () => (submitted ? scoreAutomationQualifier(answers, locale) : null),
    [submitted, answers, locale],
  );

  return (
    <section id="qualifier" className="scroll-mt-[var(--header-offset)]">
      <p className="mb-3 text-sm font-semibold tracking-[0.08em] text-[color:var(--secondary-color)]">
        {c.qualifierEyebrow}
      </p>
      <h2 className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold tracking-[-0.02em] text-[color:var(--heading-foreground)]">
        {c.qualifierTitle}
      </h2>
      <p className="mt-3 max-w-[70ch] text-base leading-8 text-[color:var(--text-secondary)]">{c.qualifierIntro}</p>

      {!result ? (
        <form
          className="mt-8 grid gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (!allAnswered) return;
            setSubmitted(true);
          }}
        >
          {c.questions.map((q) => (
            <fieldset key={q.id} className="ixp-card p-5">
              <legend className="text-base font-semibold text-[color:var(--heading-foreground)]">{q.label}</legend>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {q.options.map((opt) => {
                  const selected = answers[q.id] === opt.id;
                  return (
                    <label
                      key={opt.id}
                      className={`cursor-pointer rounded-[var(--radius-md)] border px-4 py-3 text-sm leading-6 transition ${
                        selected
                          ? "border-[color:var(--brand-primary)] bg-[color:var(--bg-secondary)] font-semibold text-[color:var(--heading-foreground)]"
                          : "border-[color:var(--border-light)] text-[color:var(--text-secondary)] hover:border-[color:var(--border-medium)]"
                      }`}
                    >
                      <input
                        type="radio"
                        className="sr-only"
                        name={q.id}
                        value={opt.id}
                        checked={selected}
                        onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: opt.id }))}
                      />
                      {opt.label}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ))}
          <button
            type="submit"
            disabled={!allAnswered}
            className="btn-brand inline-flex min-h-[48px] items-center justify-center px-6 py-3 text-base font-semibold disabled:cursor-not-allowed disabled:opacity-50"
          >
            {c.submit}
          </button>
        </form>
      ) : (
        <div className="mt-8 ixp-card p-6 md:p-8">
          <p className="text-sm font-semibold tracking-[0.08em] text-[color:var(--secondary-color)]">
            {result.tier.toUpperCase()}
          </p>
          <h3 className="mt-2 text-2xl font-bold text-[color:var(--heading-foreground)]">{result.title}</h3>
          <p className="mt-3 text-base leading-8 text-[color:var(--text-secondary)]">{result.body}</p>
          {result.erpHint ? (
            <p className="mt-4 rounded-[var(--radius-md)] border border-[color:var(--border-light)] bg-[color:var(--bg-secondary)] px-4 py-3 text-sm leading-7 text-[color:var(--text-primary)]">
              {result.erpHint}
            </p>
          ) : null}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href={withLocale(locale, "/bookme")} className="btn-brand inline-flex min-h-[48px] items-center justify-center px-6 py-3 text-base font-semibold">
              {result.nextCta}
            </Link>
            <button
              type="button"
              className="inline-flex min-h-[48px] items-center justify-center rounded-[var(--btn-radius)] border border-[color:var(--border-medium)] px-6 py-3 text-base font-semibold text-[color:var(--text-primary)]"
              onClick={() => {
                setSubmitted(false);
                setAnswers({});
              }}
            >
              {c.reset}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
