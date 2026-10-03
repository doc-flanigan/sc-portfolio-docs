# IAE 2956 + Anniversary sale readiness

**Goal:** every site's content, conversion flows, speed and facts in top shape for the biggest
buying window of the year (IAE ~late Nov + the Anniversary sale).
**Why:** the baseline is about 0.6 recruits a day. The Sep 27 – Oct 3 starter-pack sale (-25%,
$60 → $45) brought 13 recruits in 7 days, about 3×. Commit days on their own show no effect
on prospects (correlation 0.00, Aug 21 – Oct 2) or recruits (none once the sale week is
excluded). Sales and events drive purchases. The sites set how much of that demand we catch.

**Owner:** Doc. **Created:** 2026-10-02. Work this top to bottom across sessions, and tick items
here as they land.

## Fixed dates and rules
- IAE 2956 is unannounced. IAE 2955 ran Nov 20 – Dec 3, 2025, and the "Save the Date"
  historically posts around Nov 6–7.
- **Structure freeze ~Nov 6**, so Google and Bing recrawl before the traffic. After the freeze,
  only data edits: dates, prices, bonuses.
- Content ownership (2026-10-02): freeflyevent owns Free Fly dates and the event-window signup;
  dayone owns "should I buy" and onboarding. Others link; they don't restate.
- No A/B tests on primary CTAs during the event: keep the shipped winners. Don't touch the SCH
  domain move (January).
- Local builds: use `npx next build`. `npm run build` fires a real IndexNow ping (postbuild).

## Phase 0 — baseline + clear the decks (by Oct 9)
- [ ] Merge, in order: freeflyevent **#17**, confirm it's deployed (`/free-fly.ics` returns 200),
      then dayone **#124**. Also: freeflyevent **#19** (CLS fix, stacked on #17, so it retargets to
      main after #17), freeflyevent **#18** and SCH **#67**. #18 and #19 both touch
      `should-i-buy/page.tsx` (#19 only adds `revalidate`), so expect a one-line conflict on the
      second of the two.
- [ ] **GSC re-auth before ~Oct 5:** `node auth.mjs` in `gsc-mcp-server/`. The token issued
      2026-09-28 expires 7 days later (OAuth testing mode). The CI service account is still not
      granted access.
- [x] Conversion baseline (below)
- [x] Speed baseline (below). The one real problem (freeflyevent desktop CLS) is fixed in #19.

## Phase 1 — fix + build (Oct 6 – Oct 31)
- [ ] Speed: only polish left (SCH guide text LCP ~3s on mobile; see baseline)
- [x] **freeflyevent measurement gap** (freeflyevent #20): the EventStatusBanner hero/bar CTA logs clicks but no
      impressions, so the site that converts during the event shows only ~105 impressions per 28
      days in the Sheet. Add impression logging to the banner CTA before IAE, so event CTR is
      measurable.
- [x] Sheet hygiene (cta-report.mjs filters them, 2026-10-02): preview deploys (`*.vercel.app`) and `localhost` write rows. Filter them in
      `cta-report.mjs`, or gate `/api/log` writes to production hosts.
- [x] Accuracy sweep (2026-10-02, all six sites): live is still Alpha 4.10.1, and prices were already dated. PRs: dayone #126, freeflyevent #21, SCH #69, bestspacesim #5, iheldtheline #9, fundedgame #3. Ledger: added `sq42-release-q2-2027`, marked the 2026-target claims superseded, Manchester playtest verified, fixed the `$1,000` gifting claim. Loose ends: SCH `patch-status.ts` PTU build is behind (cron), the role-pack prices are undated, and the Steam / Game Pass wording dated "as of July 2026" needs a re-check.
  - [ ] prices are dated and checked against the live store page (the ld+json hides sales)
  - [ ] 4.10.x / "current patch" references
  - [ ] "next event" wording
  - [ ] ledger re-verify for buyer-facing claims
- [x] Announcement rehearsal (2026-10-02). See `iae-announcement-runbook.md`; nothing hard-failed. It found 6 copy bugs that don't follow the data; fixes are in progress (`fix/iae-flip-copy` on freeflyevent and dayone). Re-run the rehearsal after merge.
  - [ ] add a fake `iae-2026` to freeflyevent `events.ts`, then check that `/iae-2956`,
        `/next-free-fly`, `/free-fly-schedule`, `/is-star-citizen-free`, the banner, the
        countdown, `/free-fly.ics` and `llms.txt` all flip
  - [ ] the same for a `bonusOverride`
  - [ ] the same for dayone `next-free-fly.ts` and `referral-bonus.ts`
  - [ ] write the 5-minute announcement-day runbook from what this rehearsal shows
- [ ] Sale-intent content (`sale-intent-keywords-2026-10.md`): 0 measured volume for sale phrases. Recommendation: a "buying during a sale" section on dayone `/starter-package` (which already ranks #1–4 for "star citizen starter pack") rather than a new page. **Doc to decide.** Original item: "Buying during IAE / the
      Anniversary sale — which starter, what to skip". Update `keyword-research.md` first.
- [ ] Getting-started video refresh for 4.10.x (Doc's top priority; video pipeline)
- [ ] Low-CTR CTAs worth a look (≥ 100 impressions, 0–0.6% CTR, last 28d):
  - dayone `glossary-inline` (264 impressions / 0 clicks)
  - dayone `nav-cta` (880 / 5)
  - iheldtheline `NavBar CTA` (332 / 1)
  - iheldtheline `Footer CTA` (118 / 0)

  Fix before the freeze, or leave alone.

## Phase 2 — freeze + verify (Nov 1 – ~Nov 6)
- [ ] `npm run deep-diag`, `npm run site-health`, `npm run verify-referral`. All must be clean.
- [ ] Sitemaps submitted, `npm run indexnow`
- [ ] Mobile smoke test of every conversion path: freeflyevent home → enlist, dayone
      `/referral-code`, SCH `/enlist`, the nav buttons

## Phase 3 — announcement → event end (data edits only)
- [ ] The day the Comm-Link posts: add `iae-2026` (CLAUDE.md runbook) and the referral promo
      `bonusOverride`. Update dayone `next-free-fly.ts`.
- [ ] Update sale prices daily while they change (dated wording)
- [ ] Daily: `cta-report.mjs --days 1`, recruits per day from the RSI dashboard

## Phase 4 — readout (after Dec 3)
- [ ] Recruits per day during the event vs the ~0.6/day baseline and the ~1.9/day small-sale
      week. Clicks by site and CTA. What to keep for the next sale.

---

## Baseline — conversion (cta-report, 28d to 2026-10-02)

| Site | CTA impressions | Clicks | CTR |
|---|---|---|---|
| starcitizenhelp.com | 3,441 | 60 | 1.7% |
| dayonecitizen.com | 1,676 | 22 | 1.3% |
| bestspacesim.com | 447 | 13 | 2.9% |
| iheldtheline.com | 488 | 1 | 0.2% |
| freeflyevent.com | 105* | 3 | — |

\* The banner CTA has no impression logging (see Phase 1).

- SCH `Navbar` is the network's engine: 50 of SCH's 60 clicks, 1.5% CTR.
- Best per-button CTRs: SCH `EnlistNow` 23.5% (17 impressions), bestspacesim
  `vs-elite-dangerous` 10.8%.
- Prospects over the same window: ~39. Recruits: ~0.6/day outside sales.
- AI user-triggered fetches are down 47% vs the prior 28d (5,743 vs 10,748; chatgpt-user
  3,324 vs 8,615). This is separate from sale readiness, but worth a look.

## Baseline — speed (local Lighthouse 12 vs production, 2026-10-02)

PageSpeed Insights rate-limits without an API key, so this used local Lighthouse: lab data only,
simulated slow-4G on mobile. Rerun for the Phase 2 check with `node speed-baseline.mjs` in `gsc-mcp-server/`.

**Verdict: speed is not the bottleneck.**
- All 29 pages (the conversion pages, every homepage, and the top GSC landing pages) score
  **90–99 on mobile**.
- Desktop scores 95–100, except two freeflyevent pages:

| Page | Desktop | CLS | Status |
|---|---|---|---|
| freeflyevent `/` | 89 | 0.225 | **Fixed in freeflyevent #19:** 100 / 0.000 |
| freeflyevent `/event-guide` | 83 | 0.338 | **Fixed in #19:** 100 / 0.004 |

What #19 fixes:
- EventStatusBanner rendered a placeholder, then a taller real banner. It is now
  server-rendered, which also puts the status and enlist link in the crawlable HTML.
- LightboxImage's button didn't reserve the image's space. It is now `w-full`.

Slowest on mobile (LCP over 2.5s, all still scoring 90 or more). This is Phase 1 polish, not
urgent:

| Page | Mobile LCP |
|---|---|
| SCH food-drink-survival | 3.5s |
| freeflyevent `/event-guide` | 3.25s |
| SCH keybinds | 3.0s, TBT 203ms (the explorer's JS) |
| SCH preparing-for-a-new-patch | 3.0s |
| SCH shops-directory / adding-friends / ccu-chains / ship-equipment | 2.9s |
| freeflyevent `/iae-2956` | 2.7s |

On the SCH guides, the LCP element is the TL;DR text paragraph, so the delay is render-blocking
CSS and fonts, not images.

Fastest: dayone (2.1–2.6s LCP across the board) and bestspacesim `/` (1.8s).
- [ ] Phase 1: look at SCH guide render-blocking (font preload / critical CSS). It's a
      nice-to-have.
