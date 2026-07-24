"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "@/app/ThemeContext";
import { createInnovateXpM3Theme } from "@/lib/m3-theme";

/**
 * Follows site ThemeContext (localStorage + system) so questionnaire MUI
 * surfaces match Tailwind `dark` class — not only prefers-color-scheme.
 */
export function useInnovateXpM3Theme() {
  const { theme } = useTheme();
  const [mode, setMode] = useState<"light" | "dark">(theme);

  useEffect(() => {
    setMode(theme);
  }, [theme]);

  // Also watch html.dark for the pre-hydration script / external toggles
  useEffect(() => {
    const sync = () => {
      setMode(document.documentElement.classList.contains("dark") ? "dark" : "light");
    };
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  return useMemo(() => createInnovateXpM3Theme(mode), [mode]);
}
