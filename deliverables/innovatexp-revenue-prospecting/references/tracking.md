# Outreach and commercial outcomes

Reuse campaign records without overwriting other campaigns. The original run is `output/linkedin-outreach-2026-10-12/outreach-log.json` in the InnovateXP website workspace: 38 historical verified sends (28 people, 10 pages), not 38 qualified leads. Page messaging was limited. Reconcile the current file before resuming; a date change does not prove quota reset.

Keep stable person/account IDs and separate activities. Existing fields are `name`, `company`, `url`, `message`, `status`, `evidence`; preserve them and migrate additively. Store sensitive questionnaire details in an authorized private store, not a Git-tracked marketing repository.

Account fields: canonical recipient/company domain, country/timezone, industry/size evidence, source/date/checked date, signal class, concrete problem, real answers/unknowns, role/authority, fit decision, campaign/channel, authorization scope/date, owner, next action/date and opt-out.

Activity fields: draft ID, exact recipient/message (or protected reference), draft/attempt/verified-send timestamps and evidence; reply date/class; questionnaire submission; confirmed/attended meeting; proposal; won/lost; contract currency/value; collected/refunded amount and supporting reference. Record errors/corrections separately; edits do not count as extra recipients.

Store UTC timestamps, display the user's timezone, and record the prospect's timezone for scheduling. Avoid storing whole unrelated histories or credentials.

States: researched, research_needed, drafted, send_pending, sent_verified, replied, qualified, meeting_confirmed, meeting_attended, proposal, won, lost, nurture, opted_out, blocked. A lead can have several activities/milestones. A channel failure does not turn a draft into a send.

Metrics, with campaign cohort and time window:

- Sent: unique recipients with verified evidence, not activities.
- Reply/positive reply rate: distinct replying/positively replying recipients divided by verified sends. Exclude unrelated earlier messages.
- Qualification/meeting booking rate: qualified recipients/confirmed-meeting recipients divided by verified sends; state denominator. Forms/requests are not bookings.
- Attendance: attended divided by confirmed meetings whose scheduled time has passed.
- Proposal win rate: won divided by decided proposals; exclude undecided proposals.
- Won revenue, collected payments and refunds: separate sums per currency/period. Open pipeline is neither won nor collected revenue.

Unchecked data is unknown. Automated receipts are not positive replies. Calendar/order evidence establishes meetings/payments; CTA clicks or a browser success URL do not.

At a blocker report confirmed sent/unique/remaining counts, replies and qualification only if checked, pending drafts, platform message and recovery requirement. Preserve proof screenshots where browser instructions require them. Do not promise unattended continuation without an authorized configured automation.
