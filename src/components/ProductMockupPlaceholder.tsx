"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";

/** Placeholder frame or real product screenshot. */
export function ProductMockupPlaceholder({
  label,
  className = "",
  imageSrc,
  imageAlt = "",
}: {
  label: string;
  className?: string;
  /** e.g. /eventxp-admin.png — when set, shows image instead of dashed placeholder */
  imageSrc?: string;
  imageAlt?: string;
}) {
  if (imageSrc) {
    return (
      <figure className={`w-full ${className}`}>
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border-2 border-slate-200 bg-slate-100 shadow-md dark:border-slate-600 dark:bg-slate-800">
          <Image
            src={imageSrc}
            alt={imageAlt || label}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>
        {label ? (
          <figcaption className="mt-2 text-center text-xs font-medium text-brand-primary/90 dark:text-teal-300/90">
            {label}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <div
      className={`flex aspect-[16/10] w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-slate-100/80 text-oxford-muted dark:border-slate-600 dark:from-slate-800/80 dark:to-slate-900/80 dark:text-slate-400 ${className}`}
    >
      <ImageIcon className="h-8 w-8 opacity-60" strokeWidth={1.5} aria-hidden />
      <span className="max-w-[14rem] px-4 text-center text-xs font-medium leading-snug">{label}</span>
    </div>
  );
}
