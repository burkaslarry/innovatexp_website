# InnovateXP website

Next.js (App Router) marketing site for InnovateXP: WhatsApp CRM, EventXP, AI consulting, booking, and SEO.

## Feature map (code comments)

Source files use leading block comments in this form so features stay traceable in docs and git history:

```text
F01: Feature name - What this file or module does in one line.
```

Index (copy into a new file when adding scope):

```text
F01: Internationalization - Central EN/ZH strings, LanguageProvider, and t() lookups.
F02: Homepage marketing - Landing page sections: hero, products, pricing, FAQs, and modals.
F03: Route-scoped JSON-LD - Injects Organization, Service, FAQ, and page-specific structured data by path.
F04: Shared schema builders - Reusable Organization/Product helpers consumed by JSON-LD and tooling.
F05: Root layout - HTML shell, fonts, theme boot script, Hotjar (after load); no locale-specific metadata.
F06: Bookme page - Booking/quotation entry with header, guidelines, and QuotationWizard mount.
F07: Calendar booking API - POST handler: validates input, writes Notion, emails ICS/Web3Forms confirmations.
F08: Quotation wizard - Self-serve quote flow, calendar integration, and lead capture UI.
F09: Floating WhatsApp CTA - Fixed wa.me link from env or fallback to bookme anchor.
F10: Sitemap generation - Declares static routes and blog slugs for search engines.
F11: Robots rules - allow-all with sitemap and host URL from env.
F12: Pitch decks download page - Lists PDF deck links under public/decks.
F13: Reliability (server) - Metadata and Article JSON-LD for the reliability manifesto route.
F14: Reliability (client) - Bilingual copy, comparison table, and CTAs for /reliability.
F15: Hero section - Animated hero with primary/secondary CTAs and optional trust badges.
F16: Schema validation script - CI guard that StructuredData.tsx still contains required SEO tokens.
F17: Locale routes & hreflang - Middleware redirects unprefixed URLs to `/zh-hk/...`; marketing pages under `/en` and `/zh-hk` with `alternates.languages`; sitemap lists both locales.
```

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

Periodically in [Google Search Console](https://search.google.com/search-console): check **Enhancements** / **Experience** reports for FAQ, Article, or breadcrumb issues after schema changes. Use [Rich Results Test](https://search.google.com/test/rich-results) on sample URLs in both locales, e.g. `https://www.innovatexp.co/zh-hk/` and `https://www.innovatexp.co/en/smartsales-crm`.

## Deploy on Vercel

Deploy from the Vercel dashboard or CLI. Production releases are tagged (e.g. `prod/10.0`) for traceability.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)
