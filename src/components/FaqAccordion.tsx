"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
          const open = openIndex === idx;
          return (
            <li key={idx} className="border-t border-slate-200 first:border-t-0 dark:border-slate-600">
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : idx)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left text-base font-medium text-brand-primary transition-colors hover:text-brand-primary-hover dark:text-white dark:hover:text-[#00B9B3]"
                aria-expanded={open}
              >
                <span>{faq.question}</span>
                <span className="shrink-0 text-brand-primary dark:text-[#00B9B3]">
                  {open ? (
                    <Minus className="h-5 w-5" strokeWidth={2.5} aria-hidden />
                  ) : (
                    <Plus className="h-5 w-5" strokeWidth={2.5} aria-hidden />
                  )}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {faq.answer}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
