# Website conversion and Stripe implementation

The website keeps its existing Next.js/Vercel architecture, design, five locale routes and inquiry/booking paths. Snapshot remains HK$3,880, Discovery ≤10 people remains HK$6,880 and 11–30 remains HK$13,600. Prices are read from the existing catalog. The 14-day Snapshot upgrade top-up remains HK$3,000.

## Implemented

- Snapshot service page, homepage links, entry/implementation/recurring product journeys, existing 73-second AccountXP video and explicit pilot acceptance/human review.
- System Care Technical Audit prerequisite and qualified purchase invitations. Standard Snapshot can use direct checkout; Discovery, pilots and subscriptions need an operator-approved scope and email-bound invitation.
- Server-created Stripe Checkout Sessions with allowlisted Price IDs, exact currency/amount/recurrence checks, fixed quantity, terms acceptance and retry keys. This is the managed-checkout path from the PDF; there is no parallel public Payment Link path that could bypass qualification.
- Signed raw-body webhook processing, authoritative session retrieval, order/payment/fulfillment records, duplicate-event tolerance, refund-safe state transitions and durable notification work.
- Private paid intake and Stripe customer portal bound to an order access cookie. Portal identity comes from the stored order, never a customer ID supplied by the browser. Returning to a success page cannot authorize fulfillment.
- Questionnaire country/timezone and 31–60 / 61+ / unknown options, bounded server validation, submission deduplication and notification retry. A saved lead is acknowledged even if its email fails.
- Booking dates use Hong Kong availability and UTC storage, explicit customer timezone, server-side slot validation and serialized overlap checks. Duplicate reservation retries do not insert again.
- Purchase/refund/cancellation terms and payment privacy disclosures; private payment/intake pages have noindex metadata, no sitemap entries, no-referrer headers and no initial analytics scripts.
- Non-personal funnel events; operator records for qualification/proposals/wins, separate from verified order payment state. Existing GA4 installation is retained.
- Tests, typecheck and dependency scan in CI; no deployment command in CI. This branch has Vercel Git deployment disabled.

## Activation checklist — external configuration remains required

No real payment, production database migration, bank setup or deployment was performed while writing these changes. Checkout is closed by default.

1. Review the purchase/refund terms and product scope with the company. Confirm interview capacity, delivery scheduling, taxes and supported international service areas. The new terms require company approval before live use.
2. An authorized company operator completes Stripe Hong Kong verification and OCBC company payout setup in Stripe. Do not put bank credentials or Stripe secrets into source or chat.
3. Use an isolated Neon preview database and safe notification recipients. Back up/review existing schemas. Apply `migrations/20261013-commerce.sql`; apply `migrations/20261013-questionnaire.sql` after the existing questionnaire table is present. These migrations are additive and are never run automatically by the new payment code. Existing form helpers still initialize their original tables on demand; an existing questionnaire table needs the additive migration before the revised form API is enabled.
4. Create test-mode Stripe prices at the catalog amounts. One-time offers must not have recurrence; care plans use monthly recurrence. Map IDs using `.env.example`. The SDK currently uses its pinned package's default API version; register a compatible snapshot-format event destination and confirm it in a test environment.
5. Configure `STRIPE_MODE=test`, the test secret key, endpoint signing secret, `INTAKE_TOKEN_SECRET` and `COMMERCE_JOB_SECRET` (at least 32 random characters), sender and recipient settings. Set `PAYMENT_TERMS_APPROVED=2026-10-13` after review and `PAYMENTS_ENABLED=true` only when ready to test. `PAYMENTS_LIVE_APPROVED=true` is an additional deliberate live activation gate.
6. Register `/api/stripe/webhook` for checkout completion, async success/failure, expiration, charge refunds, subscription creation/update/deletion, invoice paid and invoice payment failed. Enable only payment methods tested for the actual account.
7. Configure an authenticated worker/scheduler to POST `/api/commerce/jobs` with the job bearer secret, or run the local operator retry action regularly. Without this step paid orders still persist, but queued emails are not automatically sent. Pending jobs stay in the database. Claim leases avoid simultaneous workers; Resend idempotency protects immediate retry, while delivery remains at-least-once across provider timeout/retention boundaries.
8. Configure the Stripe customer portal for payment updates and cancellation at period end. Keep plan changes disabled until approved tier-mapping and service scope rules are supplied. Grace periods, service suspension and invoice/tax settings require a company decision; this change records subscription status but does not automatically shut down a customer's external system.
9. Exercise success, cancel, asynchronous payment, refund, duplicate/delayed webhook, failed email, unpaid intake and customer isolation in preview. Check the receipt email and private link on another device. Test all existing locales and mobile layout.
10. Request approval for production release. A Git push to this branch is not a release. Do not merge/push to production `main` or bind live resources before approval.

## Operator commands

Run `npm run commerce:admin` from the repository root with a JSON object on stdin. Load secret environment settings outside Git. Do not run against production accidentally. Generated invitation/access URLs are private capabilities: send only to the intended customer and do not commit them or put them in analytics.

Actions:

- `invite`: `offer`, `email`, `scope` and optional `locale`. Scope must contain agreed deliverables, exclusions, delivery/acceptance, support limits and any subscription/cancellation/grace rules. A System Care invitation is issued only after an accepted Technical Audit. The token expires in seven days and is linked to one order.
- `reconcile`: `orderId`. Retrieves the known Checkout Session from Stripe and passes it through the same verification rules. This repairs a missed completion webhook; it does not treat a redirect as proof. Refunds also need webhook delivery or manual Stripe refund reconciliation before stale paid records are used.
- `retry`: retries queued commerce and questionnaire notifications.
- `access`: `orderId`. Generates a fresh 30-day private link for a paid order when a customer needs access again. Check customer identity before sharing it. No public “lookup by email” endpoint exists.
- `outcome`: `company`, `stage`, `note`. Stages: researched, contacted, replied, qualified, meeting, proposal, won, lost. Keep private lead details out of source.
- `report`: summarizes initial orders by offer, currency and payment state. These are initial order amounts, not net collected recurring revenue; renewal invoices, tax, fees and partial refunds must be reconciled in Stripe before financial reporting.

The billing portal remains available to an authorized subscriber with an active access link, including when a renewal payment needs fixing. Access URLs expire; support can regenerate after identity verification. No general customer-login system is introduced.

## Verification and rollback

Run lint, typecheck, `npm test`, source SEO/schema/public-claims checks, `npm audit --audit-level=high`, production-only audit and build. Payment transaction tests use PGlite locally, not production Neon. Tests cover price/currency mismatch, qualification, duplicate payments, durable-work rollback, refund ordering, unpaid intake, token tampering, raw-body signatures, timezone and invalid questionnaires. Real Stripe Checkout, SMTP/provider delivery and production scheduling require the activation checklist above.

Rollback: turn off `PAYMENTS_ENABLED` to remove new direct purchase access, then revert presentation as needed. Keep the webhook endpoint, database/event history and job processing compatible with checkouts already created. Do not drop paid order tables. Review unresolved pending events, partial refunds and notification jobs before rollback is considered complete.

The AccountXP video is an existing asset, not a new generated demo. Text describes the workflow and the VTT track supplies a short description; it is not a verbatim transcript of the audio. Full translated audio captions require an accurate transcript before being advertised as complete captions.

References: [Stripe Checkout](https://docs.stripe.com/api/checkout/sessions), [Stripe webhooks](https://docs.stripe.com/webhooks), [Vercel Git deployment controls](https://vercel.com/docs/project-configuration/git-configuration).
