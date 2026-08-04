"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  lines: readonly string[];
  id?: string;
  className?: string;
};

/**
 * B11 tagline reveal — words activate individually on scroll (IntersectionObserver).
 */
export function TaglineRevealSection({ lines, id, className = "" }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<Set<number>>(() => new Set());

  const words = useMemo(() => {
    const out: { text: string; index: number; lineBreakAfter?: boolean }[] = [];
    let idx = 0;
    lines.forEach((line, lineIndex) => {
      const parts = line.trim().split(/\s+/).filter(Boolean);
      parts.forEach((text, partIndex) => {
        out.push({
          text,
          index: idx,
          lineBreakAfter: partIndex === parts.length - 1 && lineIndex < lines.length - 1,
        });
        idx += 1;
      });
    });
    return out;
  }, [lines]);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const spans = root.querySelectorAll<HTMLElement>("[data-word-index]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const i = Number((entry.target as HTMLElement).dataset.wordIndex);
          setActive((prev) => {
            if (prev.has(i)) return prev;
            const next = new Set(prev);
            next.add(i);
            return next;
          });
        });
      },
      { rootMargin: "-12% 0px -40% 0px", threshold: 0 },
    );

    spans.forEach((span) => observer.observe(span));
    return () => observer.disconnect();
  }, [words]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`mb-16 scroll-mt-[var(--header-offset)] py-12 md:py-16 ${className}`}
      aria-label="Core benefit"
    >
      <div className="mx-auto max-w-[680px] px-2 text-center">
        <p
          className="text-4xl font-semibold leading-tight tracking-tight text-wrap-balance md:text-5xl lg:text-6xl"
          style={{ textWrap: "balance" }}
        >
          {words.map((w) => (
            <span key={w.index} className="inline">
              <span
                data-word-index={w.index}
                className="inline-block transition-[color,opacity] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                style={{
                  color: active.has(w.index)
                    ? "var(--text-primary)"
                    : "color-mix(in srgb, var(--text-primary) 30%, transparent)",
                }}
              >
                {w.text}
              </span>
              {w.lineBreakAfter ? <br /> : <span>&nbsp;</span>}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
