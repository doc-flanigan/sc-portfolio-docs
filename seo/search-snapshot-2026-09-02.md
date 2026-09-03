# Search Snapshot — 2026-09-02

GSC window: 2026-08-04 → 2026-08-31 vs prior 28d (2026-07-07 → 2026-08-03).
BWT: daily series through 2026-08-31. Click Sheet: last 35d. AI-bot logger: last 7d vs prior 7d.
Context: prior window contained Alpha 4.9 launch (Jul 15), Foundation Festival + Free Fly (Jul 29–Aug 10).
Current window is the post-event lull; 4.10 still in PTU.

## GSC 28d (clicks / impressions / position, cur vs prv)

| Site | Clicks | Impr | Pos |
|---|---|---|---|
| starcitizenhelp | 575 / 823 | 54.4k / 70.8k | 8.5 / 8.5 |
| dayonecitizen | 46 / 22 | 10.5k / 7.5k | 10.2 / 13.0 |
| freeflyevent | 41 / 15 | 3.7k / 2.4k | 14.7 / 18.6 |
| iheldtheline | 22 / 5 | 1.2k / 412 | 11.3 / 18.5 |
| bestspacesim | 4 / 2 | 550 / 224 | 12.8 / 16.2 |
| o7meaning | 0 / 0 | 640 / 952 | 18.7 |
| highestfundedgame | 0 / 0 | 592 / 347 | 47.5 / 36.0 |
| 42ndsquadron | 1 / 0 | 47 / 51 | 30.9 |
| o7citizen | 0 / 0 | 20 / 37 | — |

SCH weekly Google clicks: 89, 171, 221, 181, **251 (Jul 27)**, 125, 145, 130, 176 (Aug 24). Position flat → demand, not rank.
SCH Bing last 7d: 205 clicks (+40%), series high. Top Bing pages: keybinds 583, redeem-codes 337, shops 134, sys-req 112.

dayone weekly Google clicks: 0, 0, 5, 7, 8, 14, 14, 12, 8. Top pages cur/prv: inventory 12/10 (pos 7.6),
**party-management 10/1 (pos 7.7)**, redeem-codes 9/3, keybinds 7/4. Migrated pages now rank ~7.6, not 9.3 —
the Aug 8 "lossy transfer" read was partly a lag artefact. Tranche-2 hold stands until the October read (combined clicks).
Country split (dayone): USA 4.1k impr/18 clicks, GBR 1.0k/3, **DEU 528/5 (CTR 0.95%, best of top-10)**, FRA 330/6.

/referral-code (dayone): 1 click / 152 impr / pos 57 — not competitive for "referral code" queries on Google.
Bing: SCH "star citizen coupon code" #1 query (41 clicks, pos 2.8); redeem-codes page 337 clicks.

## German /de/ pilot (7 weeks in)

- **Google: no signal.** 1 click total since Jul 12 (lohnt-sich, 6 impr). Pages get 1–14 impr each over 7 weeks.
  URL Inspection: all 7 indexed, self-canonical, in sitemap, **last crawled Jul 17–18** (not recrawled since launch week).
  GSC returns no query or country rows under the /de/ filter (below threshold).
- **Bing: real but small.** /de/star-citizen-kaufen 15 clicks / 69 impr / pos 3. Queries: "star citizen kaufen" +
  long tail (ohne paypal, wo kann man…). lohnt/starterpaket/echtgeld: 0 Bing queries.
- German CTAs (Sheet): 73 impr / 3 clicks since Jul 12 (all 3 in W34).
- Decision per pre-agreed gate ("expand to French only if German moves"): **do not expand.** Keep pages (zero upkeep).
  Remaining gate not checked: German grounding queries in BWT AI Performance (Chrome pull).

## Referral clicks vs Doc's observed recruits

Doc reports ≥1 new RSI *recruit* (not prospect) per day for ~a week. Tracked CTA clicks say the opposite:

| Period | Clicks | /day |
|---|---|---|
| Jul 30–Aug 2 (Free Fly peak) | 85 | 21.3 |
| Aug 3–23 | 88 | 4.2 |
| Aug 24–Sep 2 | 31 | 3.1 |

Last 7d by site: SCH 10, dayone 3, freefly 0, bestspacesim 2. Recruits are therefore NOT coming from tracked link clicks.
Working explanation: (1) recruit = prospect who later buys a package; the Free Fly cohort (Jul 29–Aug 10, ~200 tracked
clicks) is converting on its own clock; (2) the code is increasingly *read and typed*, not clicked — dayone
/referral-code had 155 AI-bot fetches in 7d, `referral-code-copy` is the #2 CTA (5 copies/14d), SCH redeem-codes is a
top Bing page. Neither path fires an enlist click. Verify on RSI referral dashboard: if prospects are still ticking
daily, the invisible channel is live.

## AI-bot fetches (7d)

4,123 vs 4,232 prior. chatgpt-user 1,446, bytespider 641, oai-searchbot 604 (+32%), claudebot 571, claude-user 228.
By site: SCH 1,510, dayone 1,062 (+27%), iheldtheline 483, freefly 362, bestspacesim 222, o7meaning 228, hfg 218.

## Kill review (was due Aug 28 — overdue)

o7meaning: 0 Google clicks (impr 952→640), 0 Bing clicks. highestfundedgame: 0 Google clicks, pos 47; Bing 2–4 clicks/wk.
Both still get ~220 AI-bot fetches/wk. Data supports killing both on search grounds; AI-fetch volume is the only counter.

## Housekeeping

- GSC OAuth token re-authed 2026-09-02 (expires ~Sep 9). Service account still NOT granted on any property
  (`sites.list` → []) — granting it per GSC-SERVICE-ACCOUNT-SETUP.md ends the weekly re-auth.
- iheldtheline CTAs: 227 impressions, 0 clicks (NavBar/Footer/Homepage all 0.0%) — worth a copy/placement look.
