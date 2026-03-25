"use client";

import { motion } from "framer-motion";
import { BarChart3, Camera } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export interface SolutionShowcaseCardProps {
  title: string;
  subtitle: string;
  problemLabel: string;
  problem: string;
  solutionLabel: string;
  solution: string;
  featuresLabel: string;
  features: string[];
  screenshotNote: string;
  ctaHref: string;
  ctaLabel: string;
  index?: number;
}

export function SolutionShowcaseCard({
  title,
  subtitle,
  problemLabel,
  problem,
  solutionLabel,
  solution,
  featuresLabel,
  features,
  screenshotNote,
  ctaHref,
  ctaLabel,
  index = 0,
}: SolutionShowcaseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-32px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Card className="flex h-full flex-col hover:shadow-card-hover dark:hover:shadow-none">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-brand-primary dark:bg-slate-800">
          <BarChart3 className="h-6 w-6" strokeWidth={2} aria-hidden />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
        <p className="mt-1 text-sm font-medium italic text-brand-primary">{subtitle}</p>

        <div className="mt-4 flex flex-1 flex-col gap-3 text-sm">
          <div>
            <p className="mb-1 font-semibold text-brand-primary">{problemLabel}</p>
            <p className="text-slate-600 dark:text-slate-300">{problem}</p>
          </div>
          <div>
            <p className="mb-1 font-semibold text-brand-primary">{solutionLabel}</p>
            <p className="text-slate-600 dark:text-slate-300">{solution}</p>
          </div>
          <div>
            <p className="mb-1 font-semibold text-brand-primary">{featuresLabel}</p>
            <ul className="list-inside list-disc space-y-1 text-slate-600 dark:text-slate-300">
              {features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <p className="mb-3 flex items-center gap-1 text-xs italic text-slate-400">
            <Camera className="h-3.5 w-3.5" aria-hidden />
            {screenshotNote}
          </p>
          <Button href={ctaHref} variant="primary" className="w-full touch-manipulation">
            {ctaLabel}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
