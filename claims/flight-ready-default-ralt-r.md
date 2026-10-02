---
id: flight-ready-default-ralt-r
claim: "In Star Citizen's default keyboard bindings, Flight / Systems Ready is Right Alt + R (not R). Plain R reloads on foot and cycles the sub-target in a ship. U toggles power to all ship systems."
status: verified
sources:
  - "Star Citizen game files (CIG): Data.p4k → Data/Libs/Config/defaultProfile.xml, actions v_flightready = ralt+r (spaceship_general, vehicle_general), v_power_toggle = u; label ui_CICockpitFlightReady = 'Flight / Systems Ready' in Localization/english/global.ini. Build sc-alpha-4.10.0-hotfix (2026-08-28). Extracted with sc-portfolio tools/keybinds/."
  - https://support.robertsspaceindustries.com/hc/en-us/articles/360025028633-Getting-Started-in-the-Verse
lastVerified: 2026-10-02
usage:
  - starcitizenhelp.com /game-guides/keybinds — TL;DR, flight tables, FAQ (corrected 2026-10-02 from "R")
  - dayonecitizen.com /day-one-citizen/keybinds — day-one keys + FAQ (corrected 2026-10-02 from "R")
  - dayonecitizen.com /quick-reference — ship table (mirrors keybinds page)
  - dayonecitizen.com /day-one-citizen/first-flight — power-on step + FAQ/JSON-LD (was "press 1")
  - dayonecitizen.com /day-one-citizen/first-day — step 5 (was "press 1")
---

**Primary source is CIG's own shipped default profile**, which is stronger than any KB article
for "what is the default bind". Only `defaultProfile.xml` defines keyboard defaults; the
`Mappings/layout_*.xml` files are HOTAS layouts plus an optional `layout_keyboard_modswap`.

Background: site copy said "press R for flight ready" for months. That was a community default
that `keybinds-core-defaults` deliberately excluded because no official source named R. The
Getting Started KB article describes flight ready as hold-F on the cockpit buttons "or simply
with U". The game data agrees on U (power all). R is reload / sub-target cycling.

**Re-verify after each major patch:** rerun `python tools/keybinds/extract_p4k.py` and
`build_keybinds.py` against the current LIVE install and diff `keybinds.generated.json`.
