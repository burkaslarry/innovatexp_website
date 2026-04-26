"use client";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqAccordionProps {
  title: string;
  id?: string;
  faqs: FaqItem[];
}

export function FaqAccordion({ title, id, faqs }: FaqAccordionProps) {
  return (
    <section
      id={id}
      className="mb-16 rounded-3xl border border-slate-100 bg-white p-8 shadow-card dark:border-slate-700 dark:bg-slate-900/80"
    >
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 md:text-3xl">
        {title}
      </h2>
      <ul className="divide-y divide-slate-200 dark:divide-slate-600">
        {faqs.map((faq, idx) => {
          const panelId = `${id ?? "faq"}-panel-${idx}`;
          return (
            <li key={idx} className="border-t border-slate-200 first:border-t-0 dark:border-slate-600">
              <h3
                className="py-4 text-left text-base font-semibold text-brand-primary dark:text-white"
              >
                <span>{faq.question}</span>
              </h3>
              <div id={panelId}>
                <p className="pb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
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
