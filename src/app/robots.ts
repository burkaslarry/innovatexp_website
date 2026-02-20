import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/private/"],
      },
    ],
    sitemap: "https://www.innovatexp.co/sitemap.xml",
    host: "https://www.innovatexp.co",
  };
}
