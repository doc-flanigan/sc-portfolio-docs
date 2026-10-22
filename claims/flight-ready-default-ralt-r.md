---
id: flight-ready-default-ralt-r
claim: "In Star Citizen's default keyboard bindings, Flight / Systems Ready is Right Alt + R (not R). Plain R reloads on foot and cycles the sub-target in a ship. U toggles power to all ship systems."
status: unverifiable
sources:
  - https://support.robertsspaceindustries.com/hc/en-us/articles/360025028633-Getting-Started-in-the-Verse
lastVerified: 2026-10-22
usage:
  - starcitizenhelp.com /game-guides/keybinds — TL;DR, flight tables, FAQ (corrected 2026-10-02 from "R")
  - dayonecitizen.com /day-one-citizen/keybinds — day-one keys + FAQ (corrected 2026-10-02 from "R")
  - dayonecitizen.com /quick-reference — ship table (mirrors keybinds page)
  - dayonecitizen.com /day-one-citizen/first-flight — power-on step + FAQ/JSON-LD (was "press 1")
  - dayonecitizen.com /day-one-citizen/first-day — step 5 (was "press 1")
  - dayonecitizen.com / (six-step path) + "Do this now" boxes on /day-one-citizen/keybinds and /first-flight — via src/data/day-one-steps.ts (added 2026-10-02)
  - dayonecitizen.com /day-one-citizen/first-flight — power-down/restart instruction (Right Alt + R) (2026-10-18)
---

**Status `unverifiable` since 2026-10-22:** no official CIG page states the default Flight
Ready bind, and the ledger cites official URLs only. The Getting Started KB article (the one
source kept) describes flight ready as hold-F on the cockpit buttons "or simply with U", so it
confirms U; it does not name Right Alt + R. The Right Alt + R / plain-R wording on the sites is
left as is (it matches the in-game default keybindings screen); it just no longer appears in
the public Sources blocks.

Background: site copy said "press R for flight ready" for months. That was a community default
that `keybinds-core-defaults` deliberately excluded because no official source named R.

**Re-check after each major patch** in Options → Keybindings on a LIVE install, and flip to
`verified` only if CIG publishes a default-bindings page.
