# GSC + Bing Search Snapshot — 2026-07-10

Raw GSC JSON (totals, top queries/pages, sitemaps per site): `gsc-2026-07-10.json`
GSC windows: **CUR Jun 11 – Jul 8** vs **PRV May 14 – Jun 10** (28 days each).
Bing: **live pull via BWT UI (Chrome), 3M range May 12 – Jul 8** — search + AI Performance per site.
(o7meaning, pledgemeaning, 42ndsquadron still not registered in BWT; o7citizen is a redirect.)

## Google Search Console (28d vs prior 28d)

| Site | Clicks | Δ | Impressions | Δ | Avg pos |
|---|---|---|---|---|---|
| starcitizenhelp.com | 913 | -15 | 69,660 | -5,452 | 7.4 |
| dayonecitizen.com | 3 | +1 | 687 | **+488 (3.4×)** | 11.4 |
| freeflyevent.com | 2 | -5 | 258 | -921 | 30.7 |
| o7meaning.com | 0 | -1 | 490 | -478 | 22.3 |
| highestfundedgame.com | 0 | -1 | 125 | -82 | 46.6 |
| pledgemeaning.com | 0 | 0 | 106 | -148 | 14.5 |
| iheldtheline.com | 1 | 0 | 96 | -374 | 9.1 |
| screferralbonus.com | 0 | -1 | 64 | -83 | 58.6 |
| screferralreward.com | 0 | 0 | 40 | -73 | 48.5 |
| bestspacesim.com | 0 | 0 | 7 | -155 | 15.6 |
| o7citizen.com | 0 | 0 | 0 | 0 | — |

Top GSC queries with clicks: all CCU cluster on SCH — "star citizen ccu chain calculator" 85c @ 2.4,
"star citizen ccu calculator" 31c @ 2.4, "ccu calculator" 23c @ 2.8, "star citizen ccu chain" 20c @ 5.4.
Top SCH pages: /tools 379c, /game-guides/ccu-chains 189c, /in-game-shops-directory 69c, /keybinds 67c.
dayonecitizen impressions carried by /day-one-citizen/keybinds (453i, 0c) and /beyond-the-basics/shops-directory (188i, 1c).
No sitemap errors on any of the 11 properties.

## Bing Webmaster Tools — search (May 12 – Jul 8, live)

| Site | Clicks | Impressions | CTR | Note |
|---|---|---|---|---|
| starcitizenhelp.com | 363 | 10,500 | 3.46% | Steady ~12-17c/day since Jun 14; coupon/referral-code queries lead (22c); keybinds 32% CTR @ pos 1.6 |
| freeflyevent.com | 145 | 2,900 | 4.93% | **July surge**: 45 clicks Jul 1–8; "when is the star citizen free to play event" @ pos 1.35 |
| dayonecitizen.com | 38 | 6,300 | 0.60% | ~190 impr/day now; erkul/fleet-viewer tool queries dominate, CTR still weak |
| bestspacesim.com | 27 | 769 | 3.51% | Ramp continues (~25-30 impr/day in July); "best space sim games" 2c @ pos 2.6 |
| highestfundedgame.com | 5 | 220 | 2.27% | crowdfunding long-tail, pos 2–8 |
| screferralreward.com | 1 | 37 | 2.7% | Alien Week referral-bonus queries appearing |
| iheldtheline.com | 0 | 48 | 0% | SQ42 queries incl. **October 2026 invite-event chatter** ("sq42 event oktober", "3-day event for invitees", "morrow tour") |
| screferralbonus.com | 0 | 2 | 0% | |

## Bing AI Performance — Copilot citations (May 12 – Jul 8, live)

Network total ≈ **6.8K citations**, and the curve steepened sharply in July.

| Site | Citations (3M) | Last 7d vs prior 7d | Peak day | Notes |
|---|---|---|---|---|
| starcitizenhelp.com | 3,300 | **1,324 vs 927** | 269 (Jul 2) | First cited Jun 12; avg 10-15 pages cited/day |
| freeflyevent.com | 1,900 | **607 vs 178 (3.4×)** | 110 (Jul 2) | July free-fly interest; now citing 2 pages |
| bestspacesim.com | 1,200 | **500 vs 287** | 127 (Jul 5) | Compounding; 2-3 pages cited/day |
| dayonecitizen.com | 335 | **134 vs 91** | 31 (Jul 6) | Accelerating; up to 7 pages cited/day |
| highestfundedgame.com | 39 | trickle | 6 (Jul 1) | below sample threshold for query list |
| iheldtheline.com | 34 | sporadic | 11 (Jun 30) | below sample threshold for query list |

Top grounding queries (live):
- SCH: **"best place to get mechanical components in space port" 286 @ 57.9% share** (shops-directory — new #1),
  "star citizen codes" 184 @ 29.9%, "star citizen specs" 136 @ 42.8%, "star citizen ccu chain" 102 @ 40%,
  "star citizen keybinds" 14 @ **100%**, "star citizen add friend" 36 @ 41.9%.
- freeflyevent: "star citizen free fly" 763 @ 12.1%, "star citizen free flight" 123 @ 35.5%,
  "star citizen next free fly" 15 @ **57.7%**.
- bestspacesim: "star citizen review 2026" 168 @ 26.7%, "space sim game(s)" 240 @ ~27%,
  "is star citizen worth it" 24 @ 36.4%, "best space games" 70 @ 7.6% (new, big-volume query).
- dayonecitizen: "star citizen add friend" 50 @ **62.5%**, "star citizen packages" 48 @ 29.6%,
  "star citizen ship fleet viewer" 4 @ 100%.

## Headlines

1. **SCH Google plateau (~913 clicks, -2%), but the CCU cluster is now the engine** — /tools + ccu-chains
   guide combine for ~570 clicks, over half the site, with calculator queries at position ~2.4.
2. **dayonecitizen impressions 3.4× again (199 → 687), position 22.5 → 11.4** — second consecutive
   surge cycle (114 → 616 → 687 across snapshots); keybinds + shops pages carrying it. Clicks still 3;
   watch for the CTR unlock when it crosses into the top 10.
3. **Copilot citations confirmed exploding network-wide — ≈6.8K total, ~2,600 in the last 7 days alone.**
   SCH peaked at 269/day (Jul 2); freeflyevent 3.4× week-over-week on July free-fly interest;
   bestspacesim compounding to 127/day. AI citations now dwarf Bing organic clicks ~10:1 network-wide.
4. **SCH shops-directory is the network's #1 AI asset** — a single in-game commerce query
   ("best place to get mechanical components in space port") drove 286 citations at 57.9% share.
   The GEO shops arming from the Opus backlog is directly visible here.
5. **SQ42 October-2026 invite-event chatter is showing up in iheldtheline's Bing queries**
   ("sq42 event oktober", "cig squadron 42 invitation october 2026", "morrow tour") — a concrete
   pre-CitizenCon content beat for iheldtheline before Q3.
6. **freeflyevent July surge on both engines' Bing surfaces** — 45 search clicks Jul 1–8 and 607 AI
   citations in 7 days; "when is the star citizen free to play event" ranks pos 1.35. Free-fly
   anticipation is live NOW, not just at IAE (~Nov).
7. **Ops:** GSC token re-authed 2026-07-10 (expires ~Jul 17, app still in Testing). Claude-in-Chrome
   fixed same day — extension was signed into the wrong claude.ai account; live BWT pulls work again.
