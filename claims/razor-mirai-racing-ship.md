---
id: razor-mirai-racing-ship
claim: "The Razor is a racing-focused ship manufactured by Mirai, a subsidiary brand of MISC."
status: verified
sources:
  - https://robertsspaceindustries.com/pledge/ships/razor/Razor
  - https://api.star-citizen.wiki/api/v2/vehicles/Razor
lastVerified: 2026-07-29
usage:
  - starcitizenhelp.com /glossary — Mirai entry credits the Razor racing line (correct as-is)
---

Added 2026-07-29, replacing the erroneous `razor-misc-racing-ship` claim. Verify
against the cited source(s) before re-use.

VERIFICATION TRAP: the standalone pledge page
(robertsspaceindustries.com/pledge/Standalone-Ships/Razor) carries stale JSON-LD
metadata — `brand.name: "MISC"` — left over from before the Razor line moved to
the Mirai brand (the internal class name is still `MISC_Razor`). RSI's ship
matrix lists Razor, Razor EX, and Razor LX under Mirai (code MRAI), and the
in-game display name is "Mirai Razor". Do not source manufacturer facts from
standalone-pledge-page JSON-LD; use the ship matrix.
