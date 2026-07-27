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
  /** First item open by default */
  defaultOpenIndex?: number;
}

export function FaqAccordion({ title, id, faqs, defaultOpenIndex = 0 }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    defaultOpenIndex >= 0 && defaultOpenIndex < faqs.length ? defaultOpenIndex : null,
  );

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id={id}
      className="mb-16 rounded-3xl border border-slate-100 bg-white p-8 shadow-card dark:border-slate-700 dark:bg-slate-900/80"
    >
      <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-3xl">{title}</h2>
      <ul className="divide-y divide-slate-200 dark:divide-slate-600">
        {faqs.map((faq, idx) => {
          const panelId = `${id ?? "faq"}-panel-${idx}`;
          const buttonId = `${id ?? "faq"}-button-${idx}`;
          const isOpen = openIndex === idx;
          return (
            <li key={idx} className="border-t border-slate-200 first:border-t-0 dark:border-slate-600">
              <h3 className="py-0">
                <button
                  type="button"
                  id={buttonId}
                  className="flex w-full items-center justify-between gap-3 py-4 text-left text-base font-semibold text-brand-primary transition hover:text-brand-primary-hover dark:text-white dark:hover:text-[color:var(--primary-hover)]"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(idx)}
                >
                  <span>{faq.question}</span>
                  <svg
                    className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 dark:text-slate-400 ${isOpen ? "rotate-180" : ""}`}
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
                className={isOpen ? "pb-4" : ""}
              >
                {isOpen ? (
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{faq.answer}</p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
