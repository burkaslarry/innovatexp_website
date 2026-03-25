This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Bookme / Notion calendar

Available slots on `/bookme` come from **every row** in your Notion database(s) whose **Date** falls on the selected day. Overlapping times are removed from the picker.

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

Brand tokens: `brand-primary` (#E87D3E), `brand-cream`, `brand-cream-warm` (see `tailwind.config.ts`).

Optional: set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` for the contact form (falls back to the previous embedded key if unset).

# Deploy trigger
