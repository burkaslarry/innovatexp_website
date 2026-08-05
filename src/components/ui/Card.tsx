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
        /* Style 3 light accent bar + Style B dark flat card via .ixp-card */
        "ixp-card transition-shadow duration-300",
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
