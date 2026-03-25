"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  SolutionShowcaseCard,
  type SolutionShowcaseCardProps,
} from "@/components/SolutionShowcaseCard";

export interface SolutionShowcaseProps {
  title: string;
  cards: Omit<SolutionShowcaseCardProps, "index">[];
  className?: string;
}

export function SolutionShowcase({ title, cards, className = "" }: SolutionShowcaseProps) {
  return (
    <section className={`mb-16 ${className}`}>
      <SectionHeader title={title} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map((card, i) => (
          <SolutionShowcaseCard key={card.title} {...card} index={i} />
        ))}
      </div>
    </section>
  );
}
