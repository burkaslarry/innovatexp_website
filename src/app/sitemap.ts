import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://www.innovatexp.co/", lastModified: new Date(), priority: 1.0 },
    {
      url: "https://www.innovatexp.co/reliability",
      lastModified: new Date(),
      priority: 0.8,
    },
    { url: "https://www.innovatexp.co/bookme", lastModified: new Date(), priority: 0.8 },
    {
      url: "https://www.innovatexp.co/compare/smartsales-vs-salesforce",
      lastModified: new Date(),
      priority: 0.7,
    },
  ];
}
