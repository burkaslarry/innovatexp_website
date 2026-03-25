"use client";

/**
 * @deprecated Prefer `@/components/FaqAccordion` for new pages.
 */
import { FaqAccordion } from "@/components/FaqAccordion";

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
  return <FaqAccordion title={title} id={id} faqs={faqs} />;
}
