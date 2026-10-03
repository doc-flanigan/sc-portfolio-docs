# Sale-intent keyword research: IAE + Anniversary sale (2026-10-02)

Question: does a distinct sale-intent page on dayonecitizen.com earn its place, beyond
`/day-one-citizen/worth-buying`, `/starter-package`, `/first-ship` and freeflyevent.com `/iae-2956`?

## Data caveats (read first)
- **GSC, last IAE (2025-11-01..12-15):** dayonecitizen.com, freeflyevent.com, bestspacesim.com returned **zero rows** (no indexed footprint then). starcitizenhelp.com had 558 queries, none with sale/anniversary/IAE intent (only "star citizen warbond ccu", 1 impr).
- **Bing GetKeyword has no usable seasonality:** history only goes back ~Jun 2026 (every Sep 2025 to Mar 2026 month returns 0). Most sale phrases return 0 impressions even for Jun-Sep 2026. The Nov-Dec 2025 vs other-months comparison **cannot be made from our data**. Seasonality below is from CIG's calendar and SERP evidence, not our numbers.
- Our sale-intent volume is tiny in absolute terms. Treat this as a SERP-gap and AI-citation play, not a traffic-volume play.

## Candidate queries and numbers
GSC = last 90 days (2026-07-04..09-29), impressions / avg position. Bing = QueryStats weekly rows (Jun-Sep 2026) or GetKeyword monthly impressions.

| Query | Our data | Notes |
|---|---|---|
| "star citizen first ship to buy" | dayone `/first-ship`: 8 impr, pos 5.5 (GSC) | already ours |
| "star citizen starter pack" | dayone Bing: ~6-29 impr/wk Jul-Aug, pos 1-4, 6 clicks on 2026-08-07; GetKeyword 36 (Jun) / 32 (Aug) | strongest buy-intent signal we own, on `/starter-package` |
| "best star citizen starter ship" / "starter ship star citizen" | dayone `/first-ship`: 1 impr each, pos 22-28 | weak |
| "iae 2956 date" / "intergalactic aerospace expo 2026" | freeflyevent `/next-free-fly` 15 / 14 impr, pos 7-9 (GSC); Bing "iae 2956" 23 impr 2026-09-25 | date intent: freeflyevent owns it, do not duplicate |
| "star citizen iae 2026" / "iae star citizen 2026" | freeflyevent Bing 11 / 5 impr (2026-09-25 week) | rising as event nears |
| "star citizen discount code(s)" | dayone `/beyond-the-basics/redeem-codes` 4+1 impr, pos 45-51; SCH Bing 3 impr pos 4 | coupon intent, not sale guide |
| "star citizen buyback token schedule 2026" | dayone `/` 1-2 impr, pos 20-27 | tangential; sale-adjacent |
| "is star citizen worth it 2026" | bestspacesim 4-9 impr, pos 22-24 (GSC) | owned by worth-buying |
| "star citizen anniversary sale" (+ 2025) | 0 impressions anywhere (GSC + Bing) | no footprint; demand unmeasurable here |
| "star citizen iae sale", "ship sale", "black friday", "what to buy", "should i buy", "warbond" | 0 | no footprint |

Net: no sale-phrase query has measurable volume in our data. Existing buy-intent we own: starter pack (Bing), first ship to buy (GSC).

## What we already rank for
- `/day-one-citizen/starter-package`: "star citizen starter pack" pos 1-4 on Bing.
- `/day-one-citizen/first-ship`: "first ship to buy" pos 5.5 on Google.
- `/day-one-citizen/worth-buying`: no GSC rows in 90d (cites $45 sale / $60 list as of Sep 2026; mentions Free Fly around IAE in November, nothing on the sale itself).
- freeflyevent.com: IAE date queries, pos 3-10, `/iae-2956` plus `/next-free-fly`.

## SERP competition (web search 2026-10-02)
- "star citizen anniversary sale what to buy": RSI comm-links dominate (Anniversary Sale transmissions 13396 / 14314, AnniVERSEary Sale category posts 15070-15078), plus eBay listings, a Substack, a Steam thread. **RSI itself ranks**, but its posts are year-specific and dated.
- "IAE sale best ships": starcitizen.tools wiki, star-citizen.help ("Ship Sales 2026: Full Calendar & When to Buy", a fan site), The Impound (reseller, **storefront**), Steam threads. 1 fan-site guide; no beginner-framed "what to skip" piece.
- "best starter ship to buy": startstarcitizen.com, timesaver.gg, ltihangar.com, oronst.com (the last three are **resellers**). Crowded and commercial; startstarcitizen.com is the incumbent.
- "star citizen black friday sale": generic Black Friday noise, a forum thread, RSI Military post, The Impound. CIG does not discount at Black Friday; it runs the anniversary sale at normal prices plus Free Fly. Weak SERP, but the query is a likely "is there a deal" intent we could answer honestly.

Read: the gap is an **honest, non-selling, new-player-framed sale guide** ("what a sale actually changes, what to skip"). Fan-site competition is thin; resellers hold the commercial slots.

## Recommendation: BUILD, narrow and cheap
1. Build one evergreen-URL page; do not build a seasonal-only URL (keeps year-over-year equity).
2. Target cluster: "star citizen anniversary sale", "star citizen iae sale", "what to buy in star citizen sale", "star citizen black friday" (answer: there are no discounts, here is what there is), secondary "star citizen sale what to skip".
3. URL `/day-one-citizen/sale-guide`; title "Star Citizen Anniversary & IAE Sale: What a New Player Should Buy (and Skip)"; H1 "The Star Citizen Sale: What to Buy, What to Skip".
4. Publish by ~Nov 10, before IAE is announced, so it is indexed when searches spike. Expect low absolute volume (our data shows ~0 today); the justification is SERP gap plus AI-answer citation, not clicks. Reassess 2 weeks after the sale ends; if it earns under ~50 impressions, fold into worth-buying and redirect.
5. Do NOT build if it needs to restate pricing, ship lists or dates that live on other pages. It must be a decision layer that links out.

### Outline
1. Short answer up top: the sale is optional; the cheapest correct entry is the starter pack, and you can play free during Free Fly first.
2. What actually happens in the sale window (Anniversary sale returning limited ships at normal prices, IAE ship showcase). Link out for dates. Verify every claim against the claims ledger before publish.
3. If you are new: the one decision (game package vs wait for Free Fly). Link `/starter-package`, `/worth-buying`.
4. What to skip: buying big ships before you have played, melting or CCU chains as a first purchase, LTI/reseller grey market (neutral warning; no recommending resellers).
5. If you already own a package: how to think about a ship upgrade, linking `/beyond-the-basics/ccu-chains`.
6. Black Friday FAQ (no discounts; what exists instead).
7. FAQ block with schema; sources section citing RSI comm-links.

### Links to this page (add on publish)
From `/day-one-citizen/worth-buying`, `/starter-package`, `/first-ship`, `/beyond-the-basics/ccu-chains`, `/referral-code`, the hub nav or homepage seasonal strip (Nov only), and freeflyevent `/iae-2956` (cross-site, one contextual link).

### Links from this page
`/starter-package`, `/worth-buying`, `/first-ship`, `/ships-real-money`, `/beyond-the-basics/ccu-chains`, `/referral-code` (single code STAR-GCQJ-N6NC only, via `/enlist`), and freeflyevent.com `/iae-2956` for dates (do not restate dates).

## Fan-site policy note
CIG's fan-site / non-commercial rules apply. The page must not read as a storefront:
- No price tables as a sales list, no "buy now" buttons, no affiliate or reseller links, no ship-by-ship purchase ranking, no "deals" language beyond reporting what CIG announced.
- Single referral code only, in the standard referral block, never as the page's call to action.
- Frame as decision help and what-to-skip; cite RSI as the source of prices and dates; keep tone per `SHARED_CONVENTIONS.md`.
- Resellers (The Impound, LTI Hangar, Oronst) dominate commercial SERPs; do not mimic them.

## Cautions
- Several SERP snippets (starcitizen.tools on "IAE 2955", star-citizen.help) are third-party; sale facts must be re-verified against RSI before writing.
- The 2026 sale dates are not announced as of 2026-10-02; write date-agnostic copy.
