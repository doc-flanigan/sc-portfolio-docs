---
id: event-iae-2956
claim: "Intergalactic Aerospace Expo 2956 runs 13–27 November 2026 at New Babbage, microTech (Free Fly 13 Nov 16:00 UTC – 27 Nov 20:00 UTC); Star Citizen is free to play for the whole event, with 200+ ships and ground vehicles to try via show-floor kiosks on a manufacturer schedule (RSI Nov 13–14, Origin 14–15, Anvil 15–16, Crusader + Tumbril 16–17, Drake 17–18, Argo / Consolidated Outland / Greycat / Grey's Market 18–19, Kruger / Mirai / MISC 19–20, Aegis 20–21, Aopoa / Banu / Esperia / Gatac 21–22, Best in Show Nov 22, Finale Nov 23–27 with every IAE vehicle free)."
status: verified
sources:
  - https://robertsspaceindustries.com/en/comm-link/transmission/21389-Countdown-To-IAE-2956
lastVerified: 2026-11-06
usage:
  - freeflyevent-site/src/data/events.ts — canonical record (id iae-2026, 2026-11-13T16:00Z → 2026-11-27T20:00Z)
  - freeflyevent.com /iae-2956 — confirmed dates, venue, schedule
  - freeflyevent.com /is-star-citizen-free — "Recent Free Fly windows" table row + FAQ
  - freeflyevent.com /free-fly-schedule — confirmed row
  - dayonecitizen.com /free-fly-events — NEXT_FREE_FLY (src/data/next-free-fly.ts)
  - dayonecitizen.com /day-one-citizen/starter-package — "When the sale window is" (#sale) + FAQ + JSON-LD
  - starcitizenhelp.com /game-guides/ccu-chains — "Planning CCUs Around IAE 2956" section (dates + manufacturer schedule)
  - StarCitizenHelp-live/src/data/next-free-fly.ts — mirror of dayone NEXT_FREE_FLY
---

Verified 2026-11-06 against the comm-link ("Countdown to IAE 2956 - The Ultimate Ship Show
Returns", posted 2026-11-06). Exact UTC times come from the page's own "Add to calendar" ICS
(DTSTART 20261113T160000Z, DTEND 20261127T200000Z); the body copy says only "November 13 to 27".
Manufacturer days come from the "Pledge & Free Rental Schedule" image on the same page; the
ship lineup is not published yet ("check back as the show approaches"). No referral promotion
is mentioned in this comm-link — do not claim one. The Anniversary sale is not mentioned either.
