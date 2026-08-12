"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/** B7 viewport fade-up reveal via IntersectionObserver. */
export function ScrollReveal({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-[800ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${
        visible
          ? "translate-y-0 opacity-100 blur-0"
          : "translate-y-16 opacity-0 blur-md"
      } ${className}`}
    >
      {children}
    </div>
  );
}
