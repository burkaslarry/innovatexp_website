# InnovateXP website

Next.js (App Router) marketing site for InnovateXP: WhatsApp CRM, EventXP, AI consulting, booking, and SEO.

## Feature map (code comments)

Source files use leading block comments in this form so features stay traceable in docs and git history:

```text
F01: Feature name - What this file or module does in one line.
```

Index (copy into a new file when adding scope):

```text
F01: Internationalization - `LanguageProvider` reads URL `locale` (`en` | `zh-hk` | `zh-tw` | `ja` | `de`). Cantonese UI uses `translations.zh` in `LanguageContext.tsx`; `zh-tw` / `ja` / `de` overlay `src/messages/homepage.*.json` and `src/messages/bookme.*.json`, then fall back to English. Non-home routes still mostly use EN/ZH maps until migrated.
F02: Homepage marketing - Landing page sections: hero, products, pricing, FAQs, and modals.
F03: Route-scoped JSON-LD - Injects Organization, Service, FAQ, and page-specific structured data by path.
F04: Shared schema builders - Reusable Organization/Product helpers consumed by JSON-LD and tooling.
F05: Root layout (`app/layout.tsx`) - HTML shell, fonts, theme boot script, Hotjar. Per-locale metadata and providers live in `app/[locale]/layout.tsx`.
F06: Bookme page - Booking/quotation entry with header, guidelines, and QuotationWizard mount.
F07: Calendar booking API - POST handler: validates input, writes Notion, emails ICS/Web3Forms confirmations.
F08: Quotation wizard - Self-serve quote flow, calendar integration, and lead capture UI.
F09: Floating WhatsApp CTA - Fixed wa.me link from env or fallback to bookme anchor.
F10: Sitemap generation - `src/lib/site-routes.ts` enumerates localized marketing paths + blog slugs; `src/app/sitemap.ts` emits absolute URLs per locale.
F11: Robots rules - allow-all with sitemap and host URL from env.
F12: Pitch decks download page - Lists PDF deck links under public/decks.
F13: Reliability (server) - Metadata and Article JSON-LD for the reliability manifesto route.
F14: Reliability (client) - Bilingual copy, comparison table, and CTAs for /reliability.
F15: Hero section - Animated hero with primary/secondary CTAs and optional trust badges.
F16: Schema validation script - CI guard that StructuredData.tsx still contains required SEO tokens.
F17: Locale routes & hreflang - Middleware redirects unprefixed URLs to `/zh-hk/...`; marketing pages under `/en`, `/zh-hk`, `/zh-tw`, `/ja`, `/de` with `alternates.languages`; sitemap lists every locale × static path × blog post.
```

## Internationalization

- **Routes:** Middleware sends bare paths to `/zh-hk` by default; localized marketing URLs are `/en`, `/zh-hk`, `/zh-tw`, `/ja`, `/de` (see `src/lib/i18n-routing.ts`).
- **Runtime:** `LanguageProvider` in `src/app/[locale]/layout.tsx` passes the segment locale into `t()`. HK uses the large `translations.zh` object; TW/JA/DE merge `homepage.{zh-tw,ja,de}.json` and `bookme.{zh-tw,ja,de}.json` over English.
- **JSON-LD:** `StructuredData.tsx` picks copy per `AppLocale` (five explicit locales, no zh/en boolean).
- **Homepage overlays:** edit `src/messages/homepage.{zh-tw,ja,de}.json` manually (no bundled machine translation). **Bookme page:** edit `src/messages/bookme.{zh-tw,ja,de}.json`. After changing EN keys in `LanguageContext.tsx`, update those JSON files and run `node scripts/generate-home-i18n.mjs` to verify coverage. For Traditional Chinese aligned to HK copy on the homepage only, run `node scripts/sync-homepage-zhtw-from-zh.mjs`.

## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser; you’ll be redirected to `/zh-hk` by middleware.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) for Geist.

## Bookme / Notion calendar

Available slots on `/zh-hk/bookme` (or `/en/bookme`) come from **every row** in your Notion database(s) whose **Date** falls on the selected day. Overlapping times are removed from the picker.

| Variable | Purpose |
|----------|---------|
| `NOTION_TOKEN` | Notion integration secret |
| `NOTION_CALENDAR_DB_ID` | Database where **bookings** are stored (and any other rows that should block time if you use one DB) |
| `NOTION_BUSY_DB_ID` | *(Optional)* Second database — e.g. your main **Notion Calendar**. All events on that day block those hours (e.g. 2–5 pm busy). |
| `NOTION_CALENDAR_DATE_PROPERTY` | Date property name on the bookings DB (default: `Date`) |
| `NOTION_BUSY_DATE_PROPERTY` | Date property on the busy DB if different (default: same as above) |

**Marking 2–5 pm as busy:** In Notion, set the row’s Date to **start and end time** (e.g. 14:00 → 17:00). Date-only rows block the **whole** working window (10:00–20:00) for that day. Share both databases with your integration.

## UI components (`src/components`)

Reusable marketing UI (Tailwind + **lucide-react** + **framer-motion**): `Hero`, `SolutionShowcase`, `PricingComparisonTable`, `PriceCard`, `PremiumPriceCard`, `ImplementationTimeline`, `FaqAccordion`, `ContactForm`, plus primitives in `src/components/ui/` (`Button`, `Card`, `SectionHeader`).

Brand tokens: `brand-primary` (#0e34af), `brand-cream`, `brand-cream-warm` (see `tailwind.config.ts`).

Optional: set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` for the contact form (falls back to the previous embedded key if unset).

## SEO maintenance (Search Console & rich results)

Periodically in [Google Search Console](https://search.google.com/search-console): check **Enhancements** / **Experience** reports for FAQ, Article, or breadcrumb issues after schema changes. Use [Rich Results Test](https://search.google.com/test/rich-results) on sample URLs across locales, e.g. `https://www.innovatexp.co/zh-hk/` and `https://www.innovatexp.co/en/smartsales-crm`.

Run `npm run seo:check` for a quick sitemap cardinality check and `npm run seo:validate-schema` after editing `StructuredData.tsx`.

## Deploy on Vercel

Connect this GitHub repo to a Vercel project and deploy **Production** from `main` (dashboard: Production Branch = `main`). Pushing `main` triggers a production deployment when Git integration is enabled.

CLI alternative (logged-in): `npx vercel --prod` from the repo root.

Production releases may be tagged (e.g. `prod/10.0`) for traceability.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)
