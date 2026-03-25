import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "outline" | "ghost";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  children: ReactNode;
  className?: string;
}

const base =
  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-8 py-3 text-base font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-primary text-white shadow-md hover:bg-brand-primary-hover hover:shadow-lg hover:shadow-brand-primary/30 active:scale-[0.98] dark:bg-brand-primary dark:hover:bg-brand-primary-hover",
  outline:
    "border-2 border-slate-200 bg-white text-slate-900 shadow-sm hover:border-brand-primary/40 hover:bg-brand-cream dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800 active:scale-[0.98]",
  ghost:
    "text-brand-primary hover:bg-brand-primary/10 dark:text-brand-primary dark:hover:bg-white/5",
};

export function Button({
  variant = "primary",
  href,
  children,
  className = "",
  type = "button",
  ...rest
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} {...rest}>
      {children}
    </button>
  );
}
