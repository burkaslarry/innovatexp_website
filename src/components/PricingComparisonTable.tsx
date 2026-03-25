"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export interface PricingTableRow {
  plan: string;
  price: string;
  bestFor: string;
  features: string;
  highlighted?: boolean;
}

export interface PricingComparisonTableProps {
  title: string;
  columns: { plan: string; price: string; bestFor: string; features: string };
  rows: PricingTableRow[];
}

export function PricingComparisonTable({
  title,
  columns,
  rows,
}: PricingComparisonTableProps) {
  return (
    <motion.div
      className="mb-8 overflow-x-auto"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="mb-4 text-center text-2xl font-bold text-slate-900 dark:text-white">
        {title}
      </h3>
      <table className="min-w-full overflow-hidden rounded-xl border border-slate-200 bg-white text-left dark:border-slate-600 dark:bg-slate-900">
        <thead>
          <tr className="bg-slate-100 dark:bg-slate-800">
            <th className="border-b border-slate-200 px-4 py-3 font-bold text-slate-900 dark:border-slate-600 dark:text-white">
              {columns.plan}
            </th>
            <th className="border-b border-slate-200 px-4 py-3 font-bold text-slate-900 dark:border-slate-600 dark:text-white">
              {columns.price}
            </th>
            <th className="border-b border-slate-200 px-4 py-3 font-bold text-slate-900 dark:border-slate-600 dark:text-white">
              {columns.bestFor}
            </th>
            <th className="border-b border-slate-200 px-4 py-3 font-bold text-slate-900 dark:border-slate-600 dark:text-white">
              {columns.features}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={
                row.highlighted
                  ? "bg-amber-50/90 dark:bg-amber-950/25"
                  : "border-b border-slate-100 last:border-0 dark:border-slate-700"
              }
            >
              <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">
                <span className="inline-flex items-center gap-1.5">
                  {row.highlighted ? (
                    <Star
                      className="h-4 w-4 fill-amber-400 text-amber-500"
                      aria-hidden
                    />
                  ) : null}
                  {row.plan}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{row.price}</td>
              <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{row.bestFor}</td>
              <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{row.features}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
