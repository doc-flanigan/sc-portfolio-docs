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
| /tools | /tools | ✅ Already live |
| /* (everything else) | / (homepage) | ✅ Already live |

## Migration Execution Steps (Phase 3)

1. Confirm all dayonecitizen Beyond the Basics pages are live and indexed (check GSC — impressions > 0)
2. Add all redirects to `StarCitizenHelp-live/next.config.ts` in a single commit
3. Push to main → Vercel auto-deploys
4. Go to Google Search Console → Settings → Change of Address → select starcitizenhelp.com → dayonecitizen.com
5. Monitor weekly: StarCitizenHelp impressions should fall, dayonecitizen impressions should rise for the same queries
6. Full sunset confirmed when dayonecitizen reaches position parity on key queries (adding friends, CCU chains, shops directory)

## Monitoring Queries (check monthly in GSC)

- "how to add friends star citizen" — should shift from starcitizenhelp to dayonecitizen
- "star citizen ccu calculator" — same
- "star citizen shops directory" — same
- "star citizen food drink survival" — same
