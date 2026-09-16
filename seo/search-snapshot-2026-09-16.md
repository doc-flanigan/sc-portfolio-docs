# Search Snapshot — 2026-09-16

GSC window: rolling 28d ending 2026-09-13 (GSC finalises ~3d back) vs prior 28d.
BWT: daily series through 2026-09-13. Click Sheet: 14d and 90d. AI-bot logger: 14d vs prior 14d.
Context: Alpha **4.10 shipped 2026-08-26** (build 4.10.0-LIVE.12519617, no wipe) — it is inside the
current window and absent from the prior one. 4.10.1 in All-Waves PTU since 2026-09-10.
Free Fly (Jul 29–Aug 10) sits entirely in the **prior** window, which is the single biggest driver
of the declines below. First snapshot with working referrer attribution.

## GSC 28d (clicks / impressions / position, cur vs prv)

| Site | Clicks | Impr | Pos |
|---|---|---|---|
| starcitizenhelp | 586 / 702 | 53.2k / 63.9k | **7.7 / 8.9** |
| dayonecitizen | **51 / 43** | 10.8k / 9.8k | **9.5 / 11.5** |
| iheldtheline | **24 / 14** | 1.5k / 0.7k | **10.1 / 14.6** |
| freeflyevent | 22 / 45 | 2.5k / 4.4k | 14.7 / 14.5 |
| bestspacesim | 4 / 3 | 709 / 451 | 10.4 / 14.7 |
| o7meaning | 0 / 0 | 789 / 854 | 17.0 / 18.5 |
| highestfundedgame | 0 / 0 | 528 / 422 | 41.7 / 39.0 |
| **Total** | **688 / 807** (−15%) | 70.1k / 80.6k (−13%) | |

## BWT 28d (clicks, cur vs prv)

| Site | Clicks | Impr |
|---|---|---|
| starcitizenhelp | **758 / 653** (+16%) | 19.0k / 18.3k (+4%) |
| dayonecitizen | 47 / 92 (−49%) | 3.8k / 6.5k |
| bestspacesim | 42 / 33 (+27%) | 1.4k / 1.4k |
| freeflyevent | 15 / 106 (−86%) | 1.1k / 3.9k |
| iheldtheline | 9 / 3 | 630 / 683 |
| highestfundedgame | 4 / 3 | 422 / 395 |
| o7meaning | 1 / 0 | 1.3k / 0 (newly registered) |
| **Total** | **876 / 890** (−2%) | 27.7k / 31.1k (−11%) |

**Combined Google + Bing: 1,564 vs 1,697 clicks (−8%).**

## Read: SCH's Google decline is demand, not decay

The headline number (−17% Google clicks) is misleading on its own. Three things argue against
treating it as a ranking or quality problem:

1. **Position improved 8.9 → 7.7.** SCH is ranking *better* on 17% fewer impressions.
2. **Bing went the other way in the same window: +16% clicks, +4% impressions.** A genuine site
   problem shows up in both engines. A Google-only divergence points at Google-side demand or SERP
   layout.
3. Top queries all hold top-3: `ccu chain calculator` 2.6, `ccu calculator` 2.7, `keyboard map` 2.2.

Same signature as the July `/tools` lull — impressions halved while position held. Do not "fix"
this. Re-read in October.

SCH top pages: `/game-guides/keybinds` 126 clicks (pos 7.0), `/game-guides/ccu-chains` 113 (6.3),
`/tools` 103 (7.8), `/in-game-shops-directory` 70 (7.3), `/preparing-for-a-new-patch` 58 (5.9).

## Two genuine wins

- **iheldtheline: +71% clicks, +105% impressions, pos 14.6 → 10.1.** Almost entirely
  `/playtest-event` — 19 of 24 clicks at pos 5.4, on `squadron 42 playtest` (5.1) and
  `squadron 42 october event` (4.4). Live interest in the October SQ42 event, converting.
- **dayonecitizen: +19% clicks, pos 11.5 → 9.5.** The migrated tranche-1 pages recovered:
  `inventory-management` pos 7.2, `party-management` 7.4. **Relevant to the early-October
  tranche-1 re-read** — combined clicks on those two topics are no longer collapsing, which is
  the opposite of the Aug 8 reading. Judge on combined clicks, never impressions.

freeflyevent (−51% Google, −86% Bing) is post-Free-Fly decay, consistent across both engines.

## Referral clicks + referrer attribution (14d)

44 tracked clicks ≈ **3.1/day** — flat vs the last snapshot. SCH 26, dayone 9, bestspacesim 6,
freeflyevent 3.

First read on the referrer column (Apps Script fix deployed 2026-09-02):

| Class | Impressions | Clicks | CTR |
|---|---|---|---|
| search | 1,174 | 26 | **2.2%** |
| ai | 483 | 4 | 0.8% |
| direct | 1,194 | 6 | 0.5% |
| unknown | 174 | 1 | 0.6% |

**Search-referred visitors convert ~4x better than direct.** Early data, one window — do not act
on it yet, but it is the first time this has been measurable at all.

## AI-bot fetches (14d vs prior 14d)

User-triggered: **3,326 vs 4,140 (−19.7%)**, almost all ChatGPT (2,219 vs 3,180, −30%).
Per site: SCH 1,653 (−23%), dayone 670 (+7%), iheldtheline 407, bestspacesim 297 (flat),
hfg 128, freefly 124, o7meaning 24 (−85%).
Top pages: SCH `/` 381, SCH `/updates` 266, iheldtheline `/` 250, bestspacesim `/` 240,
dayone `/` 228, SCH `/ship-equipment` 179.

**Caveat, and it matters:** this window overlaps the 20 days when the network was serving
*"Alpha 4.10 is not out yet"* inside FAQPage JSON-LD, and `/updates` is the #2 most-fetched page.
The staleness was corrected 2026-09-16. **Re-pull in ~2 weeks** to separate that from ordinary
demand — until then, do not attribute this drop to either cause.

## Canonical hijack (747live.bet)

**3 hijacked of 159 inspected**, down from 4 on Aug 8. No new pages taken — this reverses the
"spreading" trend. All three on iheldtheline:

- `/cast/henry-cavill` — crawled 2026-07-29
- `/news/sq42-2016-delay-citizencon-2946` — crawled 2026-07-28
- `/news/squadron-42-announced-gdc-2012` — crawled 2026-07-29

**All three crawl dates predate the 2026-08-26 middleware defense by ~a month.** Google has not
re-evaluated them since the fix, so these are stale verdicts, not evidence of failure. Defense
verified live today: correct self-referencing HTML canonical **plus** `Link: rel="canonical"` HTTP
header (visible on GET; **a HEAD request does not show it** — that cost a false alarm this
session). `freeflyevent /is-star-citizen-free`, flagged as never-recrawled since Jul 1, is clean.

Still blocked on Doc: the escalation at `gsc-mcp-server/spam-report-747live-2026-07-18.md` is
drafted and unposted. Re-index requests do not move this.

## A/B decisions made this session

| Experiment | Result | Action |
|---|---|---|
| SCH Navbar copy | b `Claim 50K UEC Bonus` 0.909% (84/9,245) vs a `Enlist · 50K UEC` 0.323% (30/9,289) — **+181%, z=5.10, p<1e-6**, non-overlapping CIs, 3.3x the sample needed for 80% power | **b shipped**, test disarmed, `~a/~b` suffix dropped |
| dayone nav-cta styling | pulse 0.229% (9/3,933) vs plain 0.251% (11/4,384) — p=0.84, CIs overlap | **Null. Plain shipped**, pulse + its CSS removed |

On the dayone null: at a ~0.24% baseline, 8,317 impressions cannot resolve a small effect
(detecting the observed −9% needs ~771k/arm). What it rules out is any effect large enough to
matter. The harness works — the same mechanism found +181% on a *copy* change at SCH. Animation
was not the lever.

**Left running, genuinely underpowered (not null):** bestspacesim `home-hero` (179/188 impr),
freeflyevent `home-referral-bonus` (44/32), iheldtheline `NavBar CTA` (298/250).

Also shipped: SCH's winning nav CTA now routes through the on-site `/enlist` explainer rather than
straight to RSI, because RSI's `/enlist` bounces signed-in players and codes cannot be added to an
existing account. Funnel is now `Navbar → EnlistNow`, both logged.

## Open items

- **dayone indexing is still the real problem.** Many `/beyond-the-basics/*` and
  `/day-one-citizen/*` pages sit at "Discovered – currently not indexed", and three are
  "unknown to Google", despite a clean 47-URL sitemap read on 2026-09-14. Fix directly
  (internal links, content depth) — not with 301s.
- **Kill review still overdue** (was due Aug 28). o7meaning: 0 Google clicks, 1 Bing click,
  AI fetches −85% (162 → 24) — the AI-volume counter-argument from the Sep 2 snapshot has
  now largely evaporated. highestfundedgame: 0 Google clicks, pos 41.7, 4 Bing clicks.
- **SCH guides are stale and were deliberately not date-bumped.** `guides.ts` stamps sit at
  May 10–15, 2026 with "Updated for Alpha 4.9" markers. 4.10 changed component stats, shop
  stock and ASOP claim pricing that those guides describe. They need content re-verification,
  not a date bump — a fresh stamp on unchecked content is worse than an honest old date.
- **ReferralCTA on SCH has zero importers** — dead component, flagged not deleted.
- **iheldtheline CTAs still 0 clicks** (NavBar 116 impr / 0 clicks in 14d; 250/0 on arm b over
  90d). Carried from the Sep 2 snapshot unresolved. Likely dead placement, not bad copy.

## Housekeeping

- GSC OAuth re-authed 2026-09-16 (expires ~Sep 23). Added **`gsc-mcp-server/auth-remote.mjs`** —
  splits consent from token exchange so re-auth works from a phone; `auth.mjs` needs a
  localhost listener on the same machine and cannot be used remotely.
- **The weekly re-auth is still avoidable.** Granting the service account per
  `GSC-SERVICE-ACCOUNT-SETUP.md` ends it permanently. Carried from the Sep 2 snapshot, still not done.
- o7meaning BWT registration has landed (was pending on Doc). 42ndsquadron: 0 clicks both engines.
- `site-health`: **0 FAIL, 0 warn** across 112 sitemap URLs and all 5 redirect-only domains.
- Sitemaps all clean, 0 errors: SCH 26 (read Sep 6), dayone 47 (Sep 14), freefly 11 (Sep 12),
  iheldtheline 48 (Sep 13).
