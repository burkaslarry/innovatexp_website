"use client";

import React, { useState } from "react";

type FAQItem = { question: string; answer: string };

export default function FAQ({
  title,
  id,
  faqs,
}: {
  title: string;
  id: string;
  faqs: FAQItem[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id={id} className="mb-16 bg-white dark:bg-gray-800 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-700 shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{title}</h2>
      <ul className="space-y-2">
        {faqs.map((faq, idx) => (
          <li key={idx} className="border-b border-gray-200 dark:border-gray-600 last:border-0">
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full text-left py-3 flex justify-between items-center gap-2 text-gray-900 dark:text-white font-medium hover:text-orange-600 dark:hover:text-orange-400"
              aria-expanded={openIndex === idx}
            >
              {faq.question}
              <span className="text-orange-500 shrink-0">{openIndex === idx ? "−" : "+"}</span>
            </button>
            {openIndex === idx && (
              <p className="pb-3 text-gray-600 dark:text-gray-300 text-sm pl-0">{faq.answer}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
