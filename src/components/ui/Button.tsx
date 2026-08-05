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
  "flex min-h-[48px] items-center justify-center gap-2 rounded-full px-3 py-2 text-center text-base font-semibold transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] active:translate-y-px";

const variants: Record<ButtonVariant, string> = {
  primary:
    "btn text-white shadow-card hover:shadow-card-hover hover:brightness-105 hover:text-white [&_svg]:text-white",
  outline:
    "border border-[color:var(--border-medium)] bg-surface text-[color:var(--text-primary)] shadow-card hover:border-brand-primary/40 hover:bg-surface-secondary",
  ghost:
    "text-secondary hover:bg-primary/10 dark:text-[color:var(--secondary-color)] dark:hover:bg-white/5",
  ctaLight:
    "border border-[color:var(--border-medium)] bg-surface text-[color:var(--text-primary)] shadow-card hover:bg-brand-primary hover:text-white hover:border-brand-primary hover:[&_svg]:text-white",
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
