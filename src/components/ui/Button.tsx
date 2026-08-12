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
  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[var(--btn-radius)] px-6 py-3 text-center text-base font-semibold transition-all duration-normal ease-[cubic-bezier(0.25,0.1,0.25,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

const variants: Record<ButtonVariant, string> = {
  primary:
    "btn-brand shadow-card hover:-translate-y-px hover:shadow-card-hover [&_svg]:text-inherit",
  outline:
    "border border-[color:var(--border-medium)] bg-[color:var(--card-bg)] text-[color:var(--text-primary)] shadow-sm hover:border-brand-primary/35 hover:bg-surface-secondary",
  ghost:
    "text-[color:var(--secondary-color)] hover:bg-primary/10 dark:text-[color:var(--secondary-color)] dark:hover:bg-white/5",
  ctaLight:
    "border border-[color:var(--border-medium)] bg-[color:var(--card-bg)] text-[color:var(--text-primary)] shadow-card hover:-translate-y-px hover:border-brand-primary/35 hover:bg-surface-secondary",
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
