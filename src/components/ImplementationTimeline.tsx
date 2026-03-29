"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

export interface TimelinePhase {
  title: string;
  duration: string;
  description: string;
}

export interface ImplementationTimelineProps {
  title: string;
  intro: string;
  phases: TimelinePhase[];
}

export function ImplementationTimeline({
  title,
  intro,
  phases,
}: ImplementationTimelineProps) {
  return (
    <section className="mb-16 rounded-3xl border border-slate-100 bg-white p-8 shadow-card dark:border-slate-700 dark:bg-slate-900/80 md:p-10">
      <SectionHeader title={title} subtitle={intro} align="left" className="max-w-none" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {phases.map((phase, i) => (
          <motion.div
            key={phase.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
          >
            <Card className="h-full border-slate-100 dark:border-slate-700">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                {phase.title}
              </h3>
              <p className="mt-2 font-semibold text-brand-primary dark:text-teal-300">
                {phase.duration}
              </p>
              <p className="mt-2 text-slate-600 dark:text-slate-300">{phase.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
