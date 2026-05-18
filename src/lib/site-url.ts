/** Canonical public site URL (no trailing slash). */
export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://www.innovatexp.co")
  );
}
