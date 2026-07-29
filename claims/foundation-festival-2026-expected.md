---
id: foundation-festival-2026-expected
claim: "SUPERSEDED 2026-07-29 by event-foundation-festival-2026: CIG confirmed the Foundation Festival 2026 Free Fly (Jul 29 – Aug 10) in Comm-Link 21211 and published full referral-bonus terms in Comm-Link 21225. The pre-announcement claim below no longer reflects official state."
status: superseded
supersededBy: event-foundation-festival-2026
sources:
  - https://robertsspaceindustries.com/en/comm-link/transmission/21237-Twitch-Drops-Foundation-Festival-2026
  - https://robertsspaceindustries.com/en/comm-link/transmission/21211-Foundation-Festival-2026
  - https://robertsspaceindustries.com/en/comm-link/transmission/21225-Foundation-Festival-2026-Referral-Bonus
lastVerified: 2026-07-29
usage:
  - (none — freeflyevent.com /next-free-fly watch note and dayonecitizen.com /free-fly-events banner note were repointed to event-foundation-festival-2026 on 2026-07-29; dayonecitizen.com update still pending, see that claim file)
---

**2026-07-26 update (sc-event-tracker):** Official confirmation has landed. Comm-Link 21237
"Twitch Drops: Foundation Festival 2026" (published 2026-07-22, channel: Transmission) is
the only 2026 Foundation Festival comm-link found in either the live api.star-citizen.wiki
API or the local corpus as of this check. Key findings from the full body text:

- **Start date — VERIFIED:** "Starting July 29, with the launch of Foundation Festival..."
  (FAQ Q5). This is the only explicit festival date in the source. No festival *end* date is
  stated anywhere in the comm-link.
- **Twitch Drops campaign window (NOT the festival's own dates):** "From July 29 through
  August 12, watch any Drops enabled Star Citizen stream for a total of four hours to unlock
  the ATLS Foundation Fest Livery for free." This July 29–Aug 12 range is specific to the
  Twitch promo, not stated to be the festival's start/end window — do not conflate the two on
  site copy.
- **Free Fly — NOT FOUND.** No mention of free-account access, trial ships, or a Free Fly
  component anywhere in comm-link 21237. Do not state a 2026 Foundation Festival Free Fly as
  fact; prior years (2024/2025) did pair Foundation Festival with a Free Fly window (see
  historic comm-links "Foundation Festival Free Fly Referral Bonus", ids 18749/19342 — but
  those are OLD editions re-ingested by the wiki under a 2026-05-25 `created_at` timestamp,
  not 2026 announcements; don't cite their `created_at` as a 2026 date).
  Community precedent only — no official 2026 word yet.
- **Referral bonus — PARTIALLY confirmed, terms incomplete.** Exact quote from comm-link
  21237, FAQ Q11: *"Additionally, during Foundation Festival, recruiting a new player will
  earn you a free Argo ATLS. More details coming soon!"* This confirms a recruiter-side
  reward (free Argo ATLS) is planned, but CIG has NOT yet published: whether the recruit also
  gets a reward, any bonus-UEC amount, any "double rewards" mechanic, or the referral
  program's start/end dates. No dedicated "Foundation Festival 2026 Referral Bonus"
  comm-link exists yet (the search index's `Foundation Festival 2024 Referral Bonus` id 20005
  and `Foundation Festival Free Fly Referral Bonus` ids 18749/19342 are prior-year records,
  not 2026).
- Also checked and empty: Developer Tracker RSS (no CIG-staff Spectrum post on Foundation
  Festival 2026 dates/Free Fly/referral beyond a community Q&A thread — "clarification on the
  payed twitch drops", 2026-07-23 — which only clarifies Twitch Drops eligibility, not
  festival dates); TWISC comm-links through 2026-07-20 (id 21267) — no Foundation Festival
  mention.
- **Flip trigger:** re-check api.star-citizen.wiki for a dedicated "Foundation Festival 2026"
  or "Foundation Festival 2026 Referral Bonus" / "...Free Fly" comm-link — CIG's own FAQ says
  "more details coming soon" on the referral piece, so a follow-up post is expected before or
  around July 29.

Prior note (2026-07-12/13, superseded): archive search topped out at the 2025 edition
(id 20622) with no 2026 announcement. That gap is now closed by comm-link 21237.

**2026-07-29 update (sc-event-tracker):** Event has now launched; dedicated comm-links
exist. Re-verified against comm-link 21211 "Foundation Festival 2026" (rsi_url:
https://robertsspaceindustries.com/en/comm-link/transmission/21211-Foundation-Festival-2026)
and comm-link 21225 "Foundation Festival 2026 Referral Bonus" (rsi_url:
https://robertsspaceindustries.com/en/comm-link/transmission/21225-Foundation-Festival-2026-Referral-Bonus).

- **Free Fly — NOW CONFIRMED (supersedes the 2026-07-26 "NOT FOUND" note above).**
  Comm-link 21211 body (wiki API `translations.en_EN`, this is the FULL text returned —
  the API only ever exposed the intro paragraph for this record, nothing was truncated by
  our fetch): *"From July 29 through August 10, everyone can play for free and explore the
  'verse with five distinct ships."* Dates July 29 – August 10, 2026. No time-of-day/UTC
  given for either endpoint in this comm-link.
- **Ship list — UNVERIFIED.** The five ships are not named anywhere in comm-link 21211's
  indexed text, nor in comm-link 21237 (Twitch Drops), nor in the two most recent TWISC
  posts (21267, 21273 — 21273 explicitly says "Full rundown coming your way soon," i.e.
  CIG had not yet published the list as of publication). The RSI Free Fly / Foundation
  Festival landing pages (`/en/foundation-festival`, `/free-fly`) are JS-rendered client
  shells — direct curl (both plain and Googlebot UA) returns an empty React shell with no
  server-rendered ship data, matching this repo's documented JS-rendering caveat for RSI
  pages. Do not publish a ship list without a fresh check for a follow-up comm-link.
- **Free Fly end time — NOT PUBLISHED.** No UTC/timezone given for the August 10 end of
  the Free Fly window in any comm-link found. Do not conflate with the *separate* Aug 12
  windows below.
- **Referral bonus reward — CONFIRMED, minimum pledge amount UNVERIFIABLE from our
  sources.** Comm-link 21225: referring player gets an Argo ATLS (LTI, non-meltable,
  non-giftable); referred player gets a "Ready for Anything" Career Kit (RSI Venture armor
  set + undersuit, RSI MacFlex backpack, Pyro RYT Multi-Tool, Greycat Cambio-Lite SRT
  attachment/canister, Behring P4-AR rifle, all-purpose container) plus the standard 50,000
  aUEC + referral-program point. Bonus is granted when "a new player uses your referral
  code and pledges for a starter pack or ship (minimum )" — **the wiki API strips the
  dollar figure in every locale we checked (en_EN, and confirmed the same stripping bug on
  the 2024 precedent, comm-link 20005)**; direct curl of the live RSI comm-link page (both
  plain and Googlebot UA) returns an empty JS shell with no body text. Could not verify the
  amount from any allowed source — do not publish "$40" or any figure without a fresh
  source. Referral bonus promotion runs **until August 12, 2026, 20:00 UTC** (this UTC time
  IS explicitly stated, unlike the Free Fly's own end date).
- **Twitch Drops window (separate from Free Fly):** confirmed July 29 – August 12 for the
  ATLS Foundation Fest Livery (4hrs watch) and Banu Lockbox Replica (sub) — comm-link
  21237. Do not conflate with the Free Fly's July 29–Aug 10 window.
- **Net effect:** three distinct end dates exist for three distinct sub-promotions —
  Free Fly ends Aug 10 (no time published), Referral Bonus and Twitch Drops both end Aug 12
  (Referral Bonus has an explicit 20:00 UTC cutoff; Twitch Drops does not state a time).
  Site copy must not merge these.
- **Flip trigger:** re-check for a dedicated ship-list/schedule comm-link (TWISC 21273
  promised one "soon") and re-check comm-link 21225's live page for the stripped pledge
  minimum once CIG's next TWISC or a fan livestream/dev post surfaces it via an official
  channel.
