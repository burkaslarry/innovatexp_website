import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        bg: "var(--background)",
        fg: "var(--foreground)",
        canvas: "var(--bg-base)",
        surface: {
          DEFAULT: "var(--bg-surface)",
          secondary: "var(--bg-secondary)",
          elevated: "var(--bg-elevated)",
        },
        brand: {
          primary: "var(--brand-primary)",
          "primary-hover": "var(--brand-primary-hover)",
          cream: "var(--brand-cream)",
          "cream-warm": "var(--brand-cream-warm)",
          ink: "var(--brand-ink)",
          muted: "var(--brand-muted)",
        },
        oxford: {
          DEFAULT: "var(--oxford-blue)",
          muted: "var(--secondary-color)",
          light: "var(--secondary-hover)",
        },
        primary: {
          DEFAULT: "var(--primary-color)",
          hover: "var(--primary-hover)",
          muted: "var(--primary-muted)",
        },
        secondary: {
          DEFAULT: "var(--secondary-color)",
          hover: "var(--secondary-hover)",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter-sans)",
          "var(--font-noto-cjk)",
          "PingFang HK",
          "PingFang TC",
          "Hiragino Sans GB",
          "Microsoft JhengHei",
          "Segoe UI",
          "sans-serif",
        ],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        soft: "var(--radius-sm)",
        card: "var(--card-radius)",
        pill: "var(--radius-pill)",
        btn: "var(--btn-radius)",
      },
      boxShadow: {
        card: "var(--card-shadow)",
        "card-hover": "var(--shadow-md)",
        fab: "var(--shadow-fab)",
      },
      transitionDuration: {
        fast: "150ms",
        normal: "220ms",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-base) 100%)",
        "premium-border": "linear-gradient(180deg, var(--border-medium), var(--border-light))",
        "brand-cta": "var(--btn-primary-bg)",
        "card-accent": "var(--card-accent)",
      },
    },
  },
  plugins: [],
} satisfies Config;
