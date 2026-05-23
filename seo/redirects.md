# Redirects

All active redirects across the portfolio. Update when adding or changing redirects.

## Domain-Level Redirects

| From | To | Type | Status |
|---|---|---|---|
| o7citizen.com/* | dayonecitizen.com/* | 308 permanent (1:1 path) | ✅ Live |
| www.o7citizen.com/* | dayonecitizen.com/* | 308 permanent | ✅ Live |
| o7citizens.com | dayonecitizen.com | 301 permanent | ✅ Live |
| o7citizen.gg | dayonecitizen.com | 301 permanent | Verify |
| screferralrewards.com (plural) | screferralreward.com (singular) | 301 permanent | ✅ Live (owner confirmed) |
| highestfundedgame.com | fundedgame.com | 301 permanent | Verify |
| mostfundedgame.com | fundedgame.com | 301 permanent | Verify |
| www.starcitizenhelp.com/* | starcitizenhelp.com/* | 301 permanent | ✅ Live (in next.config.ts) |

## StarCitizenHelp Internal Redirects (Legacy Slug Cleanup)

Defined in `StarCitizenHelp-live/next.config.ts`. These redirect old numeric guide URLs to their slug equivalents.

| From | To | Status |
|---|---|---|
| /game-guides/1 | /game-guides/ship-equipment | ✅ Live |
| /game-guides/2 | /game-guides/first-days | ✅ Live |
| /game-guides/3 | /game-guides/medical-gameplay | ✅ Live |
| /game-guides/4 | /game-guides/keybinds | ✅ Live |
| /game-guides/5 | /game-guides/inventory-management | ✅ Live |
| /game-guides/6 | /game-guides/transit-system | ✅ Live |
| /game-guides/7 | /game-guides/in-game-shops-directory | ✅ Live |
| /game-guides/8 | /game-guides/how-to-add-friends | ✅ Live |
| /game-guides/adding-friends-contacts | /game-guides/how-to-add-friends | ✅ Live |
| /game-guides/9 | /game-guides/party-management | ✅ Live |
| /game-guides/10 | /game-guides/food-drink-survival | ✅ Live |
| /game-guides/11 | /game-guides/ccu-chains | ✅ Live |
| /game-guides/12 | /game-guides/preparing-for-a-new-patch | ✅ Live |

## Planned: StarCitizenHelp → dayonecitizen Migration (Phase 3)

These redirects go live only AFTER the dayonecitizen equivalent page is confirmed indexed. See `migration-plan.md` for sequencing.

| From (starcitizenhelp.com) | To (dayonecitizen.com) |
|---|---|
| /game-guides/how-to-add-friends | /beyond-the-basics/adding-friends |
| /game-guides/food-drink-survival | /beyond-the-basics/food-drink-survival |
| /game-guides/party-management | /beyond-the-basics/party-management |
| /game-guides/ccu-chains | /beyond-the-basics/ccu-chains |
| /game-guides/in-game-shops-directory | /beyond-the-basics/shops-directory |
| /game-guides/ship-equipment | /beyond-the-basics/ship-equipment |
| /game-guides/inventory-management | /beyond-the-basics/inventory-management |
| /tools | /tools |
| /* (catch-all) | / |
