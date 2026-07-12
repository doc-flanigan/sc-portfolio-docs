# AI-Search Visibility Benchmark — Repeatable Check

**Purpose:** Measure how often the network appears in the web-search grounding
layer AI assistants use, by simulating a newcomer's question journey. Re-run
the exact battery below and compare against the baseline table. First run
(baseline): **2026-07-07**.

## Method

1. Run each query below through web search (Claude Code `WebSearch`, or any
   engine an AI assistant grounds on). Keep the query text EXACTLY as written —
   the battery only works longitudinally if the queries stay fixed.
2. For each query, record: which network domains appear in the result links,
   at what position, and whether the AI-synthesized answer text visibly
   borrows network copy (that's a GEO win even without a link).
3. Tally hit rate = queries with ≥1 network appearance / 13.
4. Compare to the baseline below; note movement per query.

**Network domains to watch for:** dayonecitizen.com, starcitizenhelp.com,
freeflyevent.com, bestspacesim.com, iheldtheline.com, pledgemeaning.com,
o7meaning.com, screferralreward.com, screferralbonus.com,
highestfundedgame.com, mostfundedgame.com, 42ndsquadron.com.

**Known competitors to track:** citizen-logbook.com, scfocus.org,
startstarcitizen.com, screfer.com, starcitizen-freefly.de, citizenfreefly.com,
starcitizen.tools (wiki), boostroom.com.

## The 13-query battery (do not edit wording)

1. `what is star citizen game worth playing`
2. `is star citizen worth buying 2026`
3. `is star citizen free to play`
4. `star citizen referral code 50000 UEC`
5. `how to add friends in star citizen`
6. `star citizen keybinds beginners guide`
7. `when is the next star citizen free fly event`
8. `star citizen system requirements can my pc run it`
9. `what does o7 mean gaming`
10. `most funded video game ever crowdfunding record`
11. `star citizen ccu calculator upgrade chain`
12. `squadron 42 release date 2026`
13. `star citizen where to buy armor weapons shops`

## German battery — 7 queries (added 2026-07-12, do not edit wording)

Added the day the /de/ pilot shipped (7 German pages on dayonecitizen.com).
Same method as above; queries in German, watch for `dayonecitizen.com/de/*`.
Score separately from the English battery (hit rate = /7).

1. `star citizen kaufen wo und preis`
2. `lohnt sich star citizen 2026`
3. `welches star citizen starterpaket`
4. `ist star citizen auf steam`
5. `star citizen schiffe echtgeld pay to win`
6. `gibt es star citizen auf deutsch`
7. `star citizen empfehlungscode 50000 uec`

**German baseline = launch day (pages hours old, unindexed → 0/7 by
definition; not separately run).** Pre-launch SERP holders per the recon
(`german-serp-recon-2026-07.md`): Q1 GameStar (2019-stale) + dlcompare
key-shop; Q2 YouTube-only; Q3 neckarushangar.de; Q4 giga.de /
starcitizen-community.de; Q5 sc-kantine.de; Q6 data void (community
translation threads); Q7 starcitizen-freefly.de (entrenched) + starship24
(stale 5.000-UEC figure). First scored run: **2026-07-28** alongside the
English battery. Expect Q6 (auf deutsch) and Q5 (Echtgeld) to move first —
weakest incumbents; Q7 is the long game against starcitizen-freefly.de.

## Baseline — 2026-07-07

**Hit rate: 5/13 (38%). SCH accounted for all substantive hits. DOC: 0.**

| # | Query | Network result | Notes |
|---|---|---|---|
| 1 | worth playing | ❌ | gamersbynight, boostroom, metacritic |
| 2 | worth buying 2026 | ❌ | competitor screfer.com ranked; freeflyevent /should-i-buy (3 days old) absent |
| 3 | free to play | ❌ | freeflyevent /is-star-citizen-free absent in THIS engine (performs on Bing) |
| 4 | referral code | ❌ | citizen-logbook #1; crowded dedicated-site field; DOC /referral-code shipped this day |
| 5 | add friends | ✅ SCH #2 | AI answer built from SCH's four-methods copy |
| 6 | keybinds | ✅ SCH #1 | AI answer = network "F, F1, R, N, B" framing verbatim |
| 7 | next free fly | ✅ freeflyevent #7 | behind starcitizen-freefly.de #1, citizenfreefly.com #2 |
| 8 | system requirements | ❌ | citizen-logbook present; dayone /system-specs absent |
| 9 | o7 meaning | ❌ | o7meaning.com invisible; generic slang sites own it |
| 10 | most funded game | ❌ | Wikipedia/Guinness SERP; highestfundedgame invisible (zero GEO markup at baseline) |
| 11 | ccu calculator | ✅✅ SCH #1 + #2 | /tools AND /ccu-chains; answer text largely SCH's |
| 12 | sq42 release date | ❌ | iheldtheline /release-date (rebuilt 2026-07-05) not yet surfacing |
| 13 | shops / buy armor | ✅ SCH #2 | new CTR-optimized meta title already rendering in results |

## Baseline caveats

- This measures a Google/Brave-style grounding layer — the network's WEAKEST
  engine. Copilot grounds on Bing, where BWT shows a much stronger picture
  (SCH 312 Bing clicks in 3 weeks, freeflyevent is the Bing engine, dayone
  222 Copilot citations accelerating post-llms.txt). Treat this benchmark as
  the pessimistic bound, not total AI visibility.
- Single-run sample; positions fluctuate. Directional moves matter, not ±2 ranks.

## What to watch on re-runs

- **dayonecitizen anywhere at all** — its first appearance signals the
  indexing stall is breaking (baseline: 5/33 pages indexed).
- **Q4 referral code:** does dayonecitizen.com/referral-code (shipped
  2026-07-07) enter? Does citizen-logbook stay #1?
- **Q2/Q3:** freeflyevent /should-i-buy and /is-star-citizen-free surfacing.
- **Q12:** iheldtheline /release-date surfacing.
- **Q10:** highestfundedgame after its GEO arming (queued next on the audit).
- **Post-migration (tranche-2):** whether SCH's slots for Q5/Q6/Q11/Q13
  transfer to dayonecitizen equivalents — this is the key migration-health
  signal in AI search, complementing the Friday GSC migration report.

## Cadence

Re-run every ~3 weeks. Next run due: **~2026-07-28** (aligns with the
tranche-2 window closing and the mid-July index recheck). Both batteries
(13 English + 7 German) run together; report hit rates separately
(x/13 and y/7). Log each run's table in this file below the baseline,
newest first.
