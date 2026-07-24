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
  "flex min-h-[48px] items-center justify-center gap-2 rounded-full px-8 py-3 text-center text-base font-bold transition-all duration-normal ease-[cubic-bezier(0.25,0.1,0.25,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-50 active:scale-[0.96]";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-primary text-white shadow-card hover:bg-brand-primary-hover hover:shadow-card-hover",
  outline:
    "border border-[color:var(--border-medium)] bg-surface text-[color:var(--text-primary)] shadow-card hover:border-brand-primary/40 hover:bg-surface-secondary",
  ghost:
    "text-secondary hover:bg-primary/10 dark:text-[color:var(--secondary-color)] dark:hover:bg-white/5",
  ctaLight:
    "border border-[color:var(--border-medium)] bg-surface text-[color:var(--text-primary)] shadow-card hover:bg-brand-primary hover:text-white hover:border-brand-primary",
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
