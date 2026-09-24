# EventXP Solution Scoping Form — setup & fallback

A 6-stage lead-qualification form at `/[locale]/eventxp-scoping` that submits to
`POST /api/eventxp-scoping`, stores a secured lead record, and notifies InnovateXP
through a configurable WhatsApp adapter.

## Environment variables

All variables are **server-only**. None are exposed to the frontend bundle.

| Variable | Required | Purpose |
|---|---|---|
| `WEB3FORMS_ACCESS_KEY` | yes | Stores the secured lead record (full payload) into the InnovateXP inbox. Already used elsewhere on the site. |
| `EVENTXP_WHATSAPP_MODE` | no | `WHATSAPP_LINK` (default) or `WHATSAPP_API`. |
| `WHATSAPP_NUMBER` | for LINK mode | Recipient number for the prefilled `wa.me` link (digits, e.g. `85293103031`). Already used by `/api/whatsapp`. |
| `WHATSAPP_CLOUD_API_TOKEN` | for API mode | WhatsApp Cloud API access token. |
| `WHATSAPP_CLOUD_PHONE_ID` | for API mode | Sender phone number ID. |
| `WHATSAPP_CLOUD_RECIPIENT` | for API mode | InnovateXP internal recipient number. |
| `EVENTXP_WEBHOOK_URL` | optional | External webhook (Make / n8n / custom) preferred over Cloud API when set. |
| `EVENTXP_LEAD_RATE_LIMIT` | optional | Override default `3` per hour per IP+email. |

## How the WhatsApp adapter works

- **WHATSAPP_LINK (default):** the API returns a prefilled `wa.me` link. The user
  must press **Send** themselves — a browser cannot silently send WhatsApp on the
  user's behalf. The on-screen confirmation makes this explicit.
- **WHATSAPP_API:** sends an **internal** notification to InnovateXP (never to the
  lead). Tries `EVENTXP_WEBHOOK_URL` first, then WhatsApp Cloud API directly.
- **Fallback:** if API mode is selected but delivery fails (or is unconfigured),
  the adapter falls back to LINK mode so the lead is never lost.

## WhatsApp message content

The internal message is deliberately minimal — it contains the Lead ID,
organisation, contact name/role, event volume, current tools, main problem,
required capabilities, launch date, budget, and commercial preference. It
**does not** include email, full phone, or address. The full record lives in the
secured lead store, referenced by Lead ID.

## Privacy & data handling

- Server-side validation and sanitisation on every field (enum allow-listing,
  length caps, email/phone format).
- Honeypot field (`website`) silently accepts bot submissions.
- In-memory rate limit: 3 submissions / hour / (IP hash + email). For
  production-grade limits, back this with Vercel KV / Upstash Redis (cold starts
  reset the in-memory bucket).
- Only an IP **hash** is stored in the lead record, never the raw IP.
- Consent version (`eventxp-scoping-v1`) is recorded with each submission.
- Marketing consent is captured separately from contact permission.
- Form progress is saved in `localStorage` and cleared on successful submit.
- Failures are logged without personal data.

## Fallback procedures

- **Web3Forms down:** the API still attempts the WhatsApp adapter and returns
  success to the user with a Lead ID; a warning is logged. The lead may not be
  persisted to inbox, so monitor server logs and follow up via the WhatsApp
  notification.
- **WhatsApp API down / unconfigured:** adapter falls back to LINK mode; user
  sees the "Open WhatsApp & send" button.
- **Both down:** the API returns a 502 with a generic message; no internals leak.

## Testing

```
npx tsx scripts/test-eventxp-scoping.ts   # 8 validation + message unit tests
```

Live API smoke tests (dev server running):

```
# valid → 200 with leadId + waMeLink
curl -X POST http://localhost:3000/api/eventxp-scoping \
  -H 'content-type: application/json' -d @<valid-payload.json>

# invalid → 400 validation_failed
# honeypot → 200 { ok:true, leadId:null }
# 4th same-email submission → 429 rate_limited
```
