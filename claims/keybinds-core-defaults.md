---
id: keybinds-core-defaults
claim: "By default in Star Citizen, F is the interaction key, F1 opens the mobiGlas, N raises and lowers landing gear, and B (in the pilot seat) switches the ship's Master Mode to NAV for quantum travel."
status: verified
sources:
  - https://support.robertsspaceindustries.com/hc/en-us/articles/360025028633-Getting-Started-in-the-Verse
  - https://support.robertsspaceindustries.com/hc/en-us/articles/360019449994-How-to-Quantum-Travel
lastVerified: 2026-10-02
usage:
  - dayonecitizen.com /day-one-citizen/keybinds — bold day-one answer, keybind tables, FAQ
  - dayonecitizen.com /quick-reference — day-one keys, on-foot, flight, and capacitor tables (data mirrors the keybinds page; update both together)
  - dayonecitizen.com /day-one-citizen/first-flight, /day-one-citizen/first-day — NAV step (hold B)
  - dayonecitizen.com /beyond-the-basics/quantum-travel — master-mode steps + troubleshooting (hold B)
  - starcitizenhelp.com /game-guides/keybinds — curated tables + full game-file list (2026-10-02)
---

Getting Started in the 'Verse (edited 2025-06-23) confirms F = interaction key ("controls all interaction between you and the world"), F1 opens mobiGlas, N raises landing gear. How to Quantum Travel (edited 2025-06-12) confirms pressing B sets Master Mode to NAV before a quantum jump.

**2026-10-02 game-file check** (`defaultProfile.xml`, build sc-alpha-4.10.0-hotfix, via `tools/keybinds/`): F = Interaction Mode, F1 = mobiGlas (Toggle), N = Landing System (Toggle, tap), **B = Cycle Master Mode (Long Press)**. So "press B" means *hold* B; site copy should say hold or long-press. Flight ready is **Right Alt + R**, now its own claim: `flight-ready-default-ralt-r`.

**Caveat found during verification:** the Getting Started article describes Flight Ready as hold-F on the cockpit buttons "or simply with U" — it never names R. R = flight ready is the long-standing community-documented default and stays in site copy, but this ledger claim deliberately excludes it; don't cite these sources for the R binding. Re-check after major control reworks (Master Modes-era articles).
