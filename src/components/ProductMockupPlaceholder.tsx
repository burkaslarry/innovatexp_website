"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";

/** Placeholder frame or real product screenshot. */
export function ProductMockupPlaceholder({
  label,
  className = "",
  imageSrc,
  imageAlt = "",
  onClick,
}: {
  label: string;
  className?: string;
  /** e.g. /eventxp-admin.png — when set, shows image instead of dashed placeholder */
  imageSrc?: string;
  imageAlt?: string;
  onClick?: () => void;
}) {
  if (imageSrc) {
    return (
      <figure className={`w-full ${className}`}>
        <button
          type="button"
          onClick={onClick}
          className={`relative aspect-[16/10] w-full overflow-hidden rounded-xl border-2 border-slate-200 bg-slate-100 shadow-md dark:border-slate-600 dark:bg-slate-800 ${
            onClick ? "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary" : "cursor-default"
          }`}
          aria-label={imageAlt || label}
        >
          <Image
            src={imageSrc}
            alt={imageAlt || label}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </button>
        {label ? (
          <figcaption className="mt-2 text-center text-xs font-medium text-brand-primary/90 dark:text-teal-300/90">
            {onClick ? (
              <button
                type="button"
                onClick={onClick}
                className="underline decoration-brand-primary/40 underline-offset-2 hover:text-brand-primary dark:hover:text-teal-300"
              >
                {label}
              </button>
            ) : (
              label
            )}
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
