import type { ReactNode, HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Extra padding */
  padded?: boolean;
}

export function Card({
  children,
  className = "",
  padded = true,
  ...rest
}: CardProps) {
  return (
    <div
      className={[
        "rounded-3xl border border-slate-100 bg-white shadow-card transition-shadow duration-300 dark:border-slate-700 dark:bg-slate-900/80",
        padded ? "p-8" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}
