/**
 * SEO sanity checks without TS runtime: parses LOCALES / static paths / blog keys from source files.
 */
import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");

function read(rel) {
  return fs.readFileSync(path.join(repoRoot, rel), "utf8");
}

function parseLocales(src) {
  const block = src.match(/export const LOCALES = \[([\s\S]*?)\]\s+as const/)?.[1];
  if (!block) throw new Error("Could not parse LOCALES from i18n-routing.ts");
  return [...block.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
}

function parseStaticPaths(src) {
  return [...src.matchAll(/\{\s*path:\s*"([^"]+)"/g)].map((m) => m[1]);
}

function parseBlogSlugs(src) {
  return [...src.matchAll(/^\s*"([^"]+)":\s*\{/gm)].map((m) => m[1]);
}

function main() {
  const locales = parseLocales(read("src/lib/i18n-routing.ts"));
  const paths = parseStaticPaths(read("src/lib/site-routes.ts"));
  const blogSlugs = parseBlogSlugs(read("src/content/blog-posts.ts"));

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "https://www.innovatexp.co";

  const entries = [];
  for (const locale of locales) {
    for (const p of paths) {
      const suffix = p === "/" ? "" : p;
      entries.push(`${siteUrl}/${locale}${suffix}`);
    }
    for (const slug of blogSlugs) {
      entries.push(`${siteUrl}/${locale}/blog/${slug}`);
    }
  }

  const expected = locales.length * paths.length + locales.length * blogSlugs.length;
  if (entries.length !== expected) {
    console.error(`seo-check: internal URL builder mismatch (${entries.length} vs ${expected}).`);
    process.exit(1);
  }

  const badUrl = entries.find((u) => !/^https?:\/\//.test(u));
  if (badUrl) {
    console.error(`seo-check: invalid URL ${badUrl}`);
    process.exit(1);
  }

  console.log(
    `seo-check: ok — ${entries.length} URLs (${locales.length} locales × (${paths.length} paths + ${blogSlugs.length} blog posts)).`,
  );
}

main();
