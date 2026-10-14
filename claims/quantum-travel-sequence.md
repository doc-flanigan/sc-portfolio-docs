---
id: quantum-travel-sequence
claim: "In current Star Citizen (Alpha 4.10.2), quantum travel works by holding B briefly (a short hold, about a quarter second; a quick tap does nothing) to switch Master Mode to NAV, middle-clicking to cycle Operating Mode to QT, setting a route (Starmap or a destination marker), letting the quantum drive auto-calibrate, then holding the left mouse button briefly to begin the jump, which ends automatically at the destination (planetside arrivals land about 30 km above/near the surface location)."
status: verified
sources:
  - https://support.robertsspaceindustries.com/hc/en-us/articles/360019449994-How-to-Quantum-Travel
lastVerified: 2026-10-14
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

**CORRECTED 2026-10-14: B and the jump click are short HOLDS, not single presses.** The earlier
"single press, not a hold" reading came from the RSI KB article, which says only "pressing the B
key" and "click the Left-Mouse Button" (article body last edited 2025-06-12). The game's own
defaultProfile.xml (identical in 4.10.0-hotfix and the 4.10.2 build of 2026-10-12; extracted with
tools/keybinds) binds `v_master_mode_cycle_long` ("Cycle Master Mode (Long Press)") to `b` and
`v_toggle_qdrive_engagement` ("Engage Quantum Drive (Hold)") to `mouse1`, both
`activationMode="delayed_press"`. That mode fires only after `pressTriggerThreshold="0.25"`
seconds held. The tap variant `v_master_mode_cycle` is unbound. Middle mouse (`mouse3`) is
`v_operator_mode_cycle_forward`, a tap. dayone already said "hold B" (via keybinds-core-defaults).
SCH's quantum guide said "a single press, not a hold" and was fixed 2026-10-14. When the KB and
the game files disagree on input timing, the game files win.

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

**Re-pinned 4.9 -> 4.10 on 2026-09-16** during the 4.10 release pass. The wording had gone
stale in a way that mattered: it asserted 4.9 was *current* nineteen days after 4.10
shipped. The travel **sequence** itself is unchanged — the 4.10 release notes' Flight,
Quantum Travel and Navigation section contains only bug fixes (Drake Clipper quantum
flash, loss of ship control, post-dock thruster failure) and no Master Mode, Operating
Mode or calibration change. What 4.10 *did* change is quantum **economics**, not
procedure: quantum fuel prices rose substantially and hydrogen tank capacity shrank
fleet-wide. If any usage page above discusses the cost or range of a jump rather than the
keypress sequence, that copy needs its own check against
[[current-alpha-version-4-10-0]] — this claim does not cover it.
