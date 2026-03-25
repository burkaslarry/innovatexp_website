"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  eyebrow?: ReactNode;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  align = "center",
  eyebrow,
  className = "",
}: SectionHeaderProps) {
  const alignCls =
    align === "center" ? "text-center mx-auto max-w-3xl" : "text-left max-w-none";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-10 ${alignCls} ${className}`}
    >
      {eyebrow}
      <h2 className="font-sans text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          {subtitle}
        </p>
      ) : null}
    </motion.div>
  );
}
