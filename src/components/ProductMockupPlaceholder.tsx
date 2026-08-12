"use client";

import Image from "next/image";
import { BriefcaseBusiness, ImageIcon, Network } from "lucide-react";

export function ProductMockupPlaceholder({
  label,
  className = "",
  imageSrc,
  imageAlt = "",
  variant = "generic",
}: {
  label: string;
  className?: string;
  imageSrc?: string;
  imageAlt?: string;
  variant?: "generic" | "portrait" | "workflow";
}) {
  if (imageSrc) {
    return (
      <figure className={`w-full ${className}`}>
        <div
          className="relative aspect-[16/10] w-full overflow-hidden rounded-[var(--card-radius)] border border-[color:var(--border-light)] bg-[color:var(--bg-elevated)] shadow-card"
          aria-label={imageAlt || label}
        >
          <Image
            src={imageSrc}
            alt={imageAlt || label}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>
        {label ? (
          <figcaption className="mt-3 text-center text-sm font-medium text-[color:var(--text-secondary)]">
            {label}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  const Icon = variant === "portrait" ? BriefcaseBusiness : variant === "workflow" ? Network : ImageIcon;
  const aspectClass = variant === "portrait" ? "aspect-[4/5]" : "aspect-[16/10]";

  return (
    <div
      className={`flex ${aspectClass} w-full flex-col items-center justify-center gap-3 rounded-[var(--card-radius)] border border-dashed border-[color:var(--border-medium)] bg-[color:var(--bg-elevated)] px-6 text-[color:var(--text-secondary)] ${className}`}
    >
      <Icon className="h-8 w-8 opacity-70" strokeWidth={1.5} aria-hidden />
      <span className="max-w-[18rem] text-center text-sm font-medium leading-relaxed">{label}</span>
    </div>
  );
}
