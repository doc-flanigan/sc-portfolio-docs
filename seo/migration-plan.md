# StarCitizenHelp Migration Plan

**Timeline:** 6–18 months (medium sunset — light content investment while dayonecitizen mirrors content)
**Goal:** Transfer StarCitizenHelp's Google authority to dayonecitizen.com via 301 redirects after equivalent content is live and indexed.

## Pre-conditions (must ALL be true before any redirect goes live)

1. dayonecitizen.com equivalent page is live and confirmed indexed in GSC (impressions visible)
2. The StarCitizenHelp page has been cross-linking to dayonecitizen.com for at least 60 days
3. dayonecitizen /tools page confirmed live and indexed

Do NOT rush. Premature redirects before dayonecitizen has authority on the query cause a temporary traffic drop that can take weeks to recover.

## Page-by-Page Redirect Map

| StarCitizenHelp page | dayonecitizen destination | dayonecitizen page status |
|---|---|---|
| /game-guides/how-to-add-friends | /beyond-the-basics/adding-friends | Plan 3 |
| /game-guides/food-drink-survival | /beyond-the-basics/food-drink-survival | Plan 3 |
| /game-guides/party-management | /beyond-the-basics/party-management | Plan 3 |
| /game-guides/ccu-chains | /beyond-the-basics/ccu-chains | Plan 3 |
| /game-guides/in-game-shops-directory | /beyond-the-basics/shops-directory | Plan 3 |
| /game-guides/ship-equipment | /beyond-the-basics/ship-equipment | Plan 3 |
| /game-guides/inventory-management | /beyond-the-basics/inventory-management | Plan 3 |
| /tools | /tools | ⚠️ HANDLE WITH CARE — see below |
| /* (everything else) | / (homepage) | ✅ Already live |

### ⚠️ /tools (CCU calculator) — the network's single most valuable page. Do NOT rush it.

**June 2026 GSC (SCH):** `/tools` earned **432 clicks (+234 MoM, more than doubled)** — the top page on the whole site. Its query cluster is a clean sweep we own: "star citizen ccu chain calculator" (85), "star citizen ccu calculator" (39), "ccu calculator" (23). Losing this in a botched migration would cost the biggest single asset in the portfolio and a whole high-intent keyword cluster that could take weeks-to-months to rebuild.

**Rules for migrating `/tools` (all must hold):**
1. **Migrate it LAST**, after every other tranche has demonstrably transferred (Google rank + Copilot citations moved to dayone, SCH-side declining as expected).
2. **The dayone CCU calculator must be a real, working port** — not a stub or a link-out. Live, indexed, AND already ranking for at least one of the three CCU-calculator queries before any 301 fires.
3. **Mirror the query-matched title/H1/meta exactly** so intent match carries over. The winning queries are calculator-name searches, not generic guide searches.
4. **Keep `/tools` live on SCH until the dayone calculator is confirmed ranking** — a soft overlap window, not a hard cutover. Only 301 once dayone holds a comparable position.
5. **Watch "star citizen ccu calculator" + "star citizen ccu chain calculator" weekly** (not monthly) through the cutover; roll back the /tools 301 immediately if the cluster drops and dayone hasn't caught it.

If in doubt, DON'T migrate `/tools` this tranche — it is fine for the calculator to live on SCH indefinitely while everything else migrates. The tool ranking is worth more than tidiness.

## Migration Execution Steps (Phase 3)

1. Confirm all dayonecitizen Beyond the Basics pages are live and indexed (check GSC — impressions > 0)
2. Add all redirects to `StarCitizenHelp-live/next.config.ts` in a single commit
3. Push to main → Vercel auto-deploys
4. Go to Google Search Console → Settings → Change of Address → select starcitizenhelp.com → dayonecitizen.com
5. Monitor weekly: StarCitizenHelp impressions should fall, dayonecitizen impressions should rise for the same queries
6. Full sunset confirmed when dayonecitizen reaches position parity on key queries (adding friends, CCU chains, shops directory)

## Monitoring Queries (check monthly in GSC)

- "how to add friends star citizen" — should shift from starcitizenhelp to dayonecitizen
- "star citizen ccu calculator" — **WEEKLY during any /tools cutover, not monthly** (see /tools care section)
- "star citizen ccu chain calculator" — **WEEKLY during any /tools cutover** (SCH's single highest-value query, 85 clicks/mo)
- "star citizen shops directory" — same
- "star citizen food drink survival" — same
