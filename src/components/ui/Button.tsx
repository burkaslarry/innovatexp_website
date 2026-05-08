import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes, MouseEventHandler } from "react";

export type ButtonVariant = "primary" | "outline" | "ghost" | "ctaLight";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  children: ReactNode;
  className?: string;
}

const base =
  "flex min-h-[48px] items-center justify-center gap-2 rounded-full px-8 py-3 text-center text-base font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-[#00B9B3]";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-primary text-white shadow-md hover:bg-brand-primary-hover hover:shadow-lg active:scale-[0.98] dark:bg-[#00B9B3] dark:text-slate-950 dark:hover:bg-[#009e98] dark:shadow-none",
  outline:
    "border-2 border-slate-200 bg-white text-slate-900 shadow-sm hover:border-brand-primary/40 hover:bg-brand-cream dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800 active:scale-[0.98]",
  ghost:
    "text-brand-primary hover:bg-brand-primary/10 dark:text-teal-300 dark:hover:bg-white/5",
  ctaLight:
    "group border-2 border-slate-900/20 bg-white text-slate-900 shadow-md hover:border-black hover:bg-black hover:text-white active:scale-[0.98] dark:border-slate-500 dark:bg-white dark:text-slate-950 dark:hover:border-black dark:hover:bg-black dark:hover:text-white",
};

export function Button({
  variant = "primary",
  href,
  children,
  className = "",
  type = "button",
  onClick,
  ...rest
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`.trim();

  if (href) {
    return (
      <Link
        href={href}
        className={cls}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement> | undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
