---
id: quantum-travel-sequence
claim: "In current Star Citizen (Alpha 4.9), quantum travel works by pressing B once to switch Master Mode to NAV, middle-clicking to cycle Operating Mode to QT, setting a route (Starmap or a destination marker), letting the quantum drive auto-calibrate (no hold required), then left-clicking to begin the jump, which ends automatically at the destination (planetside arrivals land about 30 km above/near the surface location)."
status: verified
sources:
  - https://support.robertsspaceindustries.com/hc/en-us/articles/360019449994-How-to-Quantum-Travel
lastVerified: 2026-07-28
usage:
  - dayonecitizen.com /beyond-the-basics/quantum-travel — metadata, hero, step-by-step, Starmap section, tips, troubleshooting, interdiction section
  - dayonecitizen.com /beyond-the-basics — quantum-travel guide card description
  - dayonecitizen.com /day-one-citizen/first-day — flight section copy
  - dayonecitizen.com /day-one-citizen/first-flight — FAQ JSON-LD + body FAQ answer
  - dayonecitizen.com /day-one-citizen/keybinds — FAQ JSON-LD, intro body copy, keybind table row, FAQ answer
  - dayonecitizen.com /quick-reference — day-one keys table, flight keys table, flight section copy
  - dayonecitizen.com /llms.txt — quantum-travel page summary line
  - starcitizenhelp.com /game-guides/how-to-quantum-travel — metaDescription, TL;DR, step-by-step, Starmap section, tips, troubleshooting, interdiction section, FAQ details, HowTo/FAQPage JSON-LD (guide id 15, src/data/guides.ts)
  - starcitizenhelp.com /game-guides/keybinds — TL;DR and keybind list B-key entries (src/data/guides.ts)
  - StarCitizenHelp-live/src/data/drafts/guide-15-quantum-travel.txt — dead draft mirror of guide 15, kept in sync for consistency (not rendered on the live site)
---

Superseded the old "hold B to spool, press B again to jump" (and one spot's
"hold R to spool") mechanic our copy described. Confirmed against the RSI
Knowledge Base article "How to Quantum Travel" (current as of Alpha 4.9):
B is a single press that sets Master Mode to NAV, not a hold; QT mode is
entered via a middle-click cycling Operating Modes; the quantum drive
auto-calibrates once a destination is targeted (no button hold); the jump
itself begins with a left-click. The Starmap's route button reads "Route to
this Location," not the old "Set Destination" wording.

This claim complements `keybinds-core-defaults.md` (which already correctly
states B switches Master Mode to NAV) — that file was not stale and needed
no edit; this entry covers the full downstream QT sequence (QT mode entry,
calibration, jump, arrival) that the copy across both sites had wrong.

2026-07-28 fix pass: dayonecitizen-main PR #67 (merged to main), StarCitizenHelp-live commit e5cc0cf (pushed to main, direct — no PR flow on that repo).
