import type { ReactNode } from "react";

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  eyebrow?: ReactNode;
  className?: string;
  /** Use h1 on dedicated landing pages; keep h2 inside multi-section homepages. */
  as?: "h1" | "h2";
}

export function SectionHeader({
  title,
  subtitle,
  align = "center",
  eyebrow,
  className = "",
  as = "h2",
}: SectionHeaderProps) {
  const alignCls =
    align === "center" ? "text-center mx-auto max-w-3xl" : "text-left max-w-none";
  const Heading = as;

  return (
    <div className={`mb-10 ${alignCls} ${className}`}>
      {eyebrow}
      <Heading className="font-sans text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-[-0.02em] text-[color:var(--heading-foreground)]">
        {title}
      </Heading>
      {subtitle ? (
        <p className="mt-3 text-base leading-8 text-[color:var(--text-secondary)] md:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
