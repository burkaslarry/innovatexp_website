"use client";

import { useState } from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqAccordionProps {
  title: string;
  id?: string;
  faqs: FaqItem[];
  /** First item open by default (ignored when defaultOpenAll) */
  defaultOpenIndex?: number;
  /** Expand every FAQ answer by default */
  defaultOpenAll?: boolean;
}

export function FaqAccordion({
  title,
  id,
  faqs,
  defaultOpenIndex = 0,
  defaultOpenAll = false,
}: FaqAccordionProps) {
  const [openSet, setOpenSet] = useState<Set<number>>(() => {
    if (defaultOpenAll) return new Set(faqs.map((_, i) => i));
    if (defaultOpenIndex >= 0 && defaultOpenIndex < faqs.length) return new Set([defaultOpenIndex]);
    return new Set();
  });

  const toggle = (idx: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <section
      id={id}
      className="mb-16 scroll-mt-[var(--header-offset)] rounded-[var(--card-radius)] border border-[color:var(--border-light)] bg-[color:var(--card-bg)] p-6 shadow-card md:p-8"
    >
      <h2 className="mb-6 text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-[-0.02em] text-[color:var(--heading-foreground)]">
        {title}
      </h2>
      <ul className="divide-y divide-[color:var(--border-light)]">
        {faqs.map((faq, idx) => {
          const panelId = `${id ?? "faq"}-panel-${idx}`;
          const buttonId = `${id ?? "faq"}-button-${idx}`;
          const isOpen = openSet.has(idx);
          return (
            <li key={idx} className="border-t border-[color:var(--border-light)] first:border-t-0">
              <h3 className="py-0">
                <button
                  type="button"
                  id={buttonId}
                  className="flex min-h-[56px] w-full items-center justify-between gap-4 py-4 text-left text-base font-semibold text-[color:var(--text-primary)] transition hover:text-[color:var(--brand-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(idx)}
                >
                  <span>{faq.question}</span>
                  <svg
                    className={`h-5 w-5 shrink-0 text-[color:var(--text-tertiary)] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                className="pb-4"
              >
                <p className="max-w-[75ch] whitespace-pre-line text-base leading-8 text-[color:var(--text-secondary)]">
                  {faq.answer}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
