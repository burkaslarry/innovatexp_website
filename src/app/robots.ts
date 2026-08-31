/* F11: Robots rules — allow search + AI answer crawlers; point to sitemap + llms.txt. */
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.innovatexp.co";

  const allowAll = {
    allow: "/" as const,
  };

  return {
    rules: [
      { userAgent: "*", ...allowAll },
      // Explicit allow for major AI / answer-engine crawlers (GEO visibility)
      { userAgent: "GPTBot", ...allowAll },
      { userAgent: "ChatGPT-User", ...allowAll },
      { userAgent: "OAI-SearchBot", ...allowAll },
      { userAgent: "ClaudeBot", ...allowAll },
      { userAgent: "Claude-User", ...allowAll },
      { userAgent: "Claude-SearchBot", ...allowAll },
      { userAgent: "Google-Extended", ...allowAll },
      { userAgent: "Googlebot", ...allowAll },
      { userAgent: "PerplexityBot", ...allowAll },
      { userAgent: "Applebot-Extended", ...allowAll },
      { userAgent: "Bytespider", ...allowAll },
      { userAgent: "CCBot", ...allowAll },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
