# Homepage conversion restructure — CHANGES

## Goal
Restructure innovatexp.co homepage so every section serves exactly one of: credibility, clarity of offer, or the single conversion action「預約 30 分鐘業務聽診」. Hide all consulting list prices.

## What was removed from the homepage
- Hero scare line「你每個月漏緊唔止 HK$25,000」(HK$25,000 now appears only inside the verified Agilizing case)
- Pain-point banner quote repeating the HK$25,000 claim
- Consultancy plans grid (`#service-plans` / `ConsultancyMainlineSection`)
- Automation starter-pack teaser with public Snapshot / Discovery / trial figures
- Five service-module cards
- Multi-case grid with【待確認】metrics
- Full About Larry long-form section
- Product packages + VisionXP blocks
- Partnership section as a headed marketing block
- Extra homepage FAQs (kept 5; moved the rest)
- Floating Speed Dial / FAB CTAs on the homepage root
- Final-section WhatsApp button (WhatsApp secondary CTA appears once, in the hero)
- All consulting list prices (Snapshot / Discovery / 14-day trial / 「視 SOP 複雜程度決定」tiers) from homepage copy, meta, and consulting JSON-LD offers

## New homepage structure (6 sections after sticky header)
1. **Hero** — who I help + what I fix; primary CTA + WhatsApp text link; 3 proof chips
2. **痛點** — 4 tightened cards (no price banner)
3. **業務聽診方法** — 3 steps; Step 1 note: 聽診本身唔會推銷系統
4. **一個真實案例** — Agilizing only (with numbers) + 3「情境參考」cards + primary CTA
5. **為咩揀我** — comparison table (price-free last row) + short About blurb → `/about`
6. **FAQ (5) + final CTA** — primary booking button only

Quiet partner logo strip remains near the bottom (no headline).

## Where moved blocks now live
| Former homepage block | New home |
|---|---|
| 5 service cards + consultancy plans | `/services` |
| Product packages + VisionXP | `/products` (SaaS prices may remain here) |
| Extra FAQs | `/faq` |
| Full About Larry + partner list | `/about` |
| Booking / WhatsApp URL helpers | `src/content/cta-config.ts` |

## Every place a consulting price was stripped (high level)
- `src/messages/landing.*.json` — hero, problem, approach, consultancy, cases, whyUs, faq, finalCta, consultancy product poster
- `src/content/page-seo.ts` — home, bookme, AI consulting meta
- `src/lib/schema.ts` — consulting `AggregateOffer` list prices removed
- `src/app/components/StructuredData.tsx` — org/service descriptions + OfferCatalog prices
- `src/content/automation-packages.ts` — Snapshot/Discovery/trial list figures
- `src/content/service-pages.ts` — consultancy display prices
- `src/content/pricing-labels.ts` — 「視 SOP…」→ qualitative quote-after-diagnosis
- `src/content/questionnaires/consultation.ts` — Snapshot/Discovery card prices
- `src/content/inquiry-catalog.ts` — consulting description strings
- `src/components/PricingFunnelSections.tsx` — discovery formatters
- `src/app/LanguageContext.tsx` + `src/messages/homepage.*.json` — AI consulting / wizard / FAQ strings
- `public/llms.txt`, `llms.zh-hk.txt`, `llms-full.txt` — citation briefs

**Kept (allowed):** Agilizing case HK$25,000/mo; product SaaS prices on `/products` (e.g. FitnessXP, SmartSales, EventXP, AccountXP, website packages). Internal `src/content/pricing.ts` numeric constants remain for quote tooling but are not surfaced as consulting list prices in public homepage/consulting UI.

## New routes
- `/[locale]/services`
- `/[locale]/products`
- `/[locale]/faq`
- `/[locale]/about`

Added to `STATIC_LOCALIZED_PATHS` for sitemap.

## Primary CTA placements (homepage)
1. Sticky header (right)
2. Hero primary button
3. After Agilizing case study
4. Final CTA section

Secondary WhatsApp: hero only.

## Booking URL + conversion analytics (follow-up)
- `TODO_BOOKING_URL` = `https://innovatexp.co/bookme` (locale injected → `/{locale}/bookme`)
- Click event `book_diagnosis_click` with `placement` prop fired to GA4 and/or Plausible
- Set `NEXT_PUBLIC_GA4_MEASUREMENT_ID` and/or `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (see `.env.analytics.example`)

