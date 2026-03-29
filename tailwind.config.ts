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
        brand: {
          primary: "#1242de",
          "primary-hover": "#0e35b5",
          cream: "#FFF9F2",
          "cream-warm": "#FEF9E7",
          ink: "#1a1a2e",
          muted: "#64748b",
        },
        /** Oxford Blue — headings, primary actions (light), icon accents */
        oxford: {
          DEFAULT: "#002147",
          muted: "#1e3a5f",
          light: "#4a6fa5",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-main)",
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
        "card-hover": "0 10px 40px -10px rgb(18 66 222 / 0.22)",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #7c3aed 0%, #4f46e5 35%, #0f172a 100%)",
        "premium-border":
          "linear-gradient(135deg, #EAB308, #1242de, #6366f1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
