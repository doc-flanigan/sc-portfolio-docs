---
id: event-foundation-festival-2026
claim: "The Foundation Festival 2026 Free Fly runs July 29 – August 10, 2026, with five ships free to fly (RSI Aurora Mk II, Drake Cutter, Drake Golem, Crusader Intrepid, RSI Salvation) and no purchase required. The companion referral bonus (Comm-Link 21225) runs until August 12, 2026, 20:00 UTC: the recruiter earns an Argo ATLS (LTI, non-meltable, non-giftable, one per player) and the recruited player earns a 'Ready for Anything' Career Kit — both granted only when the new player uses a referral code AND pledges for a starter pack or ship; the standard 50,000 UEC signup bonus still requires no purchase. Twitch Drops run July 29 – August 12."
status: verified
sources:
  - https://robertsspaceindustries.com/en/comm-link/transmission/21211-Foundation-Festival-2026
  - https://robertsspaceindustries.com/en/comm-link/transmission/21225-Foundation-Festival-2026-Referral-Bonus
  - https://robertsspaceindustries.com/en/comm-link/transmission/21237-Twitch-Drops-Foundation-Festival-2026
  - https://support.robertsspaceindustries.com/hc/en-us/articles/360037529633-Welcome-to-the-Star-Citizen-Free-Fly-Event
lastVerified: 2026-07-29
usage:
  - freeflyevent-site/src/data/events.ts — canonical record (id foundation-festival-2026, 2026-07-29T16:00Z → 2026-08-10T23:59Z, bonusOverride expires 2026-08-12T20:00Z)
  - freeflyevent.com /foundation-festival-2026 — GEO answer, live-status box, referral-terms section, FAQ, Event JSON-LD
  - freeflyevent.com /next-free-fly — live-event callout box, GEO answer, FAQ entries 1 and 3
  - freeflyevent.com /event-history — event timeline entry (derived from events.ts)
  - dayonecitizen.com /free-fly-events — live-event banner + upcoming timeline entry
  - starcitizenhelp.com /enlist — REFERRAL_BONUS config (referral-bonus.ts), ReferralBonusBanner headline, and EnlistNow bonus card (campaign name, Jul 29 – Aug 12 window, Argo ATLS referrer reward, Career Kit recruit reward)
  - freeflyevent.com /free-fly-schedule — 2026 windows table + live-status copy (derived from events.ts)
  - freeflyevent.com /free-ships-right-now — live free-ship list + FAQ answer (derived from events.ts)
---

Verified 2026-07-29 (event day) against Comm-Link body text via api.star-citizen.wiki
(RSI pages are JS-rendered and curl-blocked; the wiki API mirrors the official text and
is the sanctioned source per freeflyevent-site CLAUDE.md).

Known gaps, all confirmed absent from official sources as of 2026-07-29 — do NOT fill
from fan sites or prior years:

- **Ship names — RESOLVED 2026-07-29.** The official Free Fly KB article (support
  article 360037529633, edited 2026-07-29T16:34Z) names all five: RSI Aurora Mk II,
  Drake Cutter, Drake Golem, Crusader Intrepid, RSI Salvation. events.ts `ships`, the
  /foundation-festival-2026 FAQ, and the live-status box updated same day.
- **Free Fly end TIME unpublished.** 21211 says "July 29 through August 10" with no
  time. events.ts uses 2026-08-10T23:59:00Z as a conservative end-of-day cutoff; site
  copy warns not to rely on the final hours.
- **Referral minimum-pledge dollar amount unrecoverable.** 21225 reads "(minimum ) on
  the Pledge Store" — the figure is stripped by a wiki-API text-extraction bug (same
  gap in the 2024 record, comm-link 20005). Site copy avoids naming an amount. Likely
  $40 per referral-recruitment-point-40-usd precedent, but NOT verified for this promo.

Timing nuances that matter (do not conflate): Free Fly access ends Aug 10; referral
promo ends Aug 12 20:00 UTC; Twitch Drops end Aug 12 (no time given). The new player's
Career Kit is granted AFTER the promo ends Aug 12; the recruiter's ATLS is granted
immediately on the qualifying pledge.

Related: [[referral-bonus-no-purchase-required]] (50k UEC needs no purchase — still
true and restated on the page), [[referral-code-24h-window]],
[[foundation-festival-2026-expected]] (superseded pre-announcement claim).
