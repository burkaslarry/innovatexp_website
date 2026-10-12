# Booking questionnaire qualification

Source checked 2026-10-13: local `src/content/questionnaires/consultation.ts`, `src/components/questionnaires/AiConsultationQuestionnaire.tsx` and `src/app/[locale]/bookme/page.tsx`. Entry: https://innovatexp.co/bookme. Live content could not be verified during authoring; refresh the live form or source when available. Do not assume deployment matches this snapshot.

The flow requests context, then offers calendar selection. Submitted form and confirmed reservation are distinct. Website locales are `en`, `zh-hk`, `zh-tw`, `ja`, `de`; website language does not prove delivery capability.

| Actual field | Qualification use |
|---|---|
| `name`, `company`, `role` | Identity and responsible role: founder, operations, sales, admin, other. Title alone does not prove buying authority. |
| `phone`, `email` | Prospect-supplied contacts, only for an authorized channel. |
| `teamSize` | Bands 1–2, 3–10, 11–30, 31+. Clarify 31–60 versus 61+ and public bands overlapping 3–60. |
| `industry`, `industryOther` | Training/education, clinic, fitness, professional services, retail, other. |
| `painLine`, `painLineOther` | Enquiry follow-up, quotation/handoff, booking/payment, course operations, event follow-up, founder firefighting, other. |
| `painExample` | Concrete example of what gets stuck or missed; actual statement/observation, not a guessed problem. |
| `tools`, `toolsCrmName`, `toolsOther` | WhatsApp, spreadsheets, paper/verbal, CRM/system, other. A WhatsApp number alone does not prove workflow chaos. |
| `lineOwners` | Respondent only, 2–3 people, whole team. Clarify responsible owner and approval path. |
| `monthlyLoss` | Lost leads/slower conversion, staff time, customer experience, unsure. A loss category is not a monetary estimate. Obtain baseline quantities before calculating impact. |
| `afterDiagnosis` | Clarity/ownership, SOP, whether tools are needed, implementation/co-running, exploratory understanding. |
| `toolAttitude` | Process-only, open to trial, already decided on automation, undecided. Openness is not a purchase. |
| `constraints` | Budget not approved, sensitive data, resistance, vendor lock-in, none. |
| `startWhen` | This week, two weeks, this month, form only. Timing of diagnosis, not necessarily a paid project. |
| `preferredSlots`, `notes` | Scheduling preferences/context. Confirm timezone and an actual available slot. |

The current `isHighIntent` treats this-week/two-week timing or an already-buy tools answer as high intent. Use as routing/urgency only, not a substitute for qualification.

Supplemental fields outside the existing form: operating country, timezone, preferred language, exact size where needed, buying authority and follow-up-channel permission. Do not present these as existing fields.

Current site notices still say 3–30. The approved skill target is 3–60: flag the website mismatch in a website task instead of silently excluding 31–60 or modifying website code during prospecting.

Ask progressively: one relevant question first; then concrete example, tools/owner, timing and desired outcome; then offer the questionnaire and 30-minute diagnosis. A form does not reserve a slot or commit someone to paid work.

Do not request client lists, financial details or sensitive personal data. Private operational answers are not permission for a public case study or partner disclosure.
