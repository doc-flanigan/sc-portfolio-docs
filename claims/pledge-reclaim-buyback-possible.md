---
id: pledge-reclaim-buyback-possible
claim: "Reclaiming (melting) a pledge is intended to be permanent, but depending on the pledge type it can sometimes be bought back via the Pledge Buy Back tool -- not all reclaimed pledges qualify, and RSI Player Relations will not manually reverse a reclaim."
status: verified
sources:
  - https://support.robertsspaceindustries.com/hc/en-us/articles/115013193627-Reclaim-a-Pledge
lastVerified: 2026-08-28
usage:
  - starcitizenhelp.com src/views/Tools.tsx — CCU vs melting FAQ entry
---

Added 2026-08-28 during source-watch copy-fix pass. Source article explicitly states
"Depending on the pledge type, you may be able to buy it back!" and "Not all reclaimed
pledges can be bought back using the Pledge Buy Back tool," and separately that "As a
policy, RSI Player Relations will not assist with reversing reclaimed pledges." Prior
site copy on starcitizenhelp.com's Tools.tsx overstated this as flatly "cannot be undone,"
which contradicts the buyback mechanism; corrected to reflect conditional reversibility.
