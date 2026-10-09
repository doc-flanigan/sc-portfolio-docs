---
id: current-alpha-version-4-10-2
claim: "The current live Star Citizen build is Alpha 4.10.2, released October 9, 2026 as build 4.10.2-LIVE.12881860; its release notes list Long Term Persistence as preserved (no wipe), with new accounts starting on 20,000 aUEC."
status: verified
sources:
  - https://robertsspaceindustries.com/en/comm-link/Patch-Notes/21351-Star-Citizen-Alpha-4102
  - https://robertsspaceindustries.com/patch-notes
  - https://status.robertsspaceindustries.com/issues/2026-10-09_live-deployment/index.html
lastVerified: 2026-10-09
usage:
  - starcitizenhelp.com /updates — current-patch header + 4.10.2 entry + RELEASE_FACTS FAQ
  - starcitizenhelp.com /game-guides/rsi-discovery-month — "arrived with Alpha 4.10.2" line
  - dayonecitizen.com /day-one-citizen/next-wipe — next-wipe answer + "did 4.10.2 wipe" answer (no)
  - bestspacesim.com /is-star-citizen-a-scam, /is-star-citizen-worth-it, /star-citizen — "current live build" copy
  - StarCitizenHelp-live/src/data/patch-status.ts — LIVE_VERSION
---

Flipped 2026-10-09, the day of release (supersedes current-alpha-version-4-10-1, retained as
history because "did 4.10.1 wipe" answers still render). First release pass on time: the
source-watch autopilot opened dayone PR #134 within hours, and this session caught it the
same day.

Build Information block in the LIVE notes (comm-link 21351, header "October 9th, 2026"):
`VERSION 4.10.2-LIVE.12881860`, "Long Term Persistence: LTP Preserved", "Starting aUEC:
20,000". The explicit LTP line exists, so "the release notes list LTP as preserved" is a fair
paraphrase. There is NO separate wipe sentence — do not write "the notes say no wipe".

TRAP: the Spectrum abridged LIVE post (channel 190048) prints "VERSION 4.10.1-LIVE.12881860"
— a typo. Use the RSI comm-link build string.

Headline content (Spectrum LIVE post + Discovery thread, 2026-10-09): RSI Discovery Month
in-game event (see rsi-discovery-month-event), RSI Constellation Mk IV Gold Standard update,
Physics Networking Overhaul, experimental VR updates; "closes 71 bugs and 5 stability issues
since 4.10.1 went live", 13 via the Issue Council. Deployment: servers offline 10:30 UTC,
window "not expected to exceed 4 hours".

Next in PTU: nothing found in channel 190048 as of 2026-10-09. Version-dependent — on the
next release, re-check the LIVE notes, flip this claim, update every usage page above, and
end with sync-claims + gen-sources + deploy.

History: the source-watch autopilot wrote a first version of this claim on 2026-10-09 sourced
only to the RSI status page (routine-maintenance wording, LTP unconfirmed). Replaced the same day
with this comm-link-21351-sourced version once the Patch-Notes post was readable.
