import type { NextConfig } from "next";

/**
 * Canonical Next config lives in next.config.mjs (Next loads .mjs before .ts).
 * Keep this file as a typed mirror for editors only — do not add runtime-only
 * settings here unless you also update next.config.mjs.
 */
const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
  },
  async redirects() {
    return [
      {
        source: "/:locale/creative-studio/artkal-bead-pattern",
        destination: "/:locale/creative-studio/bead-pattern",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
