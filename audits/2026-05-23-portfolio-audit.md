# SC Portfolio Audit — 2026-05-23

**Auditor:** Claude Code (automated, read-only)
**Repos audited:** dayonecitizen-main, freeflyevent-site, screferralreward-site, screferralbonus-site, bestspacesim-site, StarCitizenHelp-live, pledgemeaning-site, o7meaning-site, fundedgame-site, iheldtheline-site
**Method:** 6 parallel subagents (5 code-audit + 1 sc-fact-check via RSI Comm-Link API)
**Scope:** Routing, broken links, referral codes, SEO/metadata, content accuracy, cross-site links, style/UX, fact-check

---

## Summary

- **screferralreward.com is returning 404s** — the apex domain was never added to Vercel; only `www.screferralreward.com` is provisioned.
- **StarCitizenHelp `/enlist` meta says "5,000 UEC"** — the actual referral bonus is 50,000 UEC; this wrong figure appears in Google search snippets for the conversion-critical page.
- **`worth-buying` page claims Squadron 42 is included in standard packages** — false since February 2016; will actively mislead buyers.
- **13 Day One Citizen guide pages + the Tools page are absent from `sitemap.ts`** — Google cannot discover the site's core content via the sitemap.
- **Multiple footers contain cross-portfolio link lists** — violates the body-copy-only SEO rule on at least 5 sites; StarCitizenHelp's footer links to satellite sites directly contradicting the authority-migration strategy.

---

## 1. Routing & Domain Issues

### dayonecitizen-main
- **www.dayonecitizen.com → dayonecitizen.com redirect is MISSING.** `next.config.mjs` has explicit www redirects for all legacy domains (o7citizen, o7citizens, o7citizen.gg) but none for the primary domain's own www subdomain. If Vercel is not handling this at the dashboard level, the primary domain has a www/non-www duplicate-content risk.
- All legacy domain redirects (o7citizen.com, o7citizens.com, o7citizen.gg) correctly use `permanent: true` (308). ✅

### freeflyevent-site
- www→non-www intentionally delegated to Vercel edge (documented in code comments after a May 19 redirect-loop incident). ✅
- `vercel.app` alias → `freeflyevent.com` redirect correctly scoped to production alias only. ✅

### screferralreward-site ⚠️ CRITICAL
- **Root cause of reported Vercel routing failure: `screferralreward.com` (apex) has not been added as a domain in the Vercel project.** Only `www.screferralreward.com` is provisioned. The `next.config.mjs` www→apex redirect is correctly coded but non-functional — Vercel has no project to route apex requests to.
- Fix: Vercel dashboard → project Settings → Domains → add `screferralreward.com` (without www).

### screferralbonus-site
- www→non-www redirect correctly coded in `next.config.mjs`. ✅
- SESSION-2026-04-27.md notes a prior "Invalid Configuration" resolved by domain re-add — confirm completion.

### bestspacesim-site
- www redirect present. ✅
- `/free-fly` redirect points to `www.freeflyevent.com` (with www prefix); other links use bare domain `freeflyevent.com`. Inconsistent but not broken.

### StarCitizenHelp-live
- www redirect present. ✅
- Legacy numeric slug redirects (1–12 → named slugs) present. ✅
- **Authority-migration 301 redirects to dayonecitizen.com: ABSENT.** None of the planned sunset redirects pointing pages to dayonecitizen.com have been implemented yet. This is expected at the current stage of the plan but flagged per audit spec.
- **`vite.dreamhost.config.js` and `dist/` folder present at repo root.** A full stale Vite static build exists with an old `sitemap.xml` and `robots.txt` missing newer guide slugs. If deployed accidentally this would serve the wrong site. The `vite.dreamhost.config.js` references a `client/src` alias that doesn't match the current `src/` structure.

### pledgemeaning-site ⚠️
- **`next.config.mjs` is empty (`const nextConfig = {}`) — no www redirect exists.** The www redirect audit from 2026-05-19 reportedly fixed 6 satellite sites; pledgemeaning-site appears to still be missing the fix.

### o7meaning-site
- www redirect present in `next.config.mjs`. ✅
- `/in-gaming` is a "Coming Soon" stub: `robots: { index: false }`, not in sitemap, disallowed in robots.ts. Consistent but the NavBar still exposes it to users. Low risk.

### fundedgame-site ⚠️
- www redirect for `highestfundedgame.com` present. ✅
- **`vercel.json` has `"redirects": []` — empty array.** The `mostfundedgame.com` → `highestfundedgame.com` redirect was never added. Any traffic to `mostfundedgame.com` goes nowhere. `www.mostfundedgame.com` is also unhandled.

### iheldtheline-site ⚠️
- **`next.config.mjs` contains no `redirects()` function.** No `www.iheldtheline.com` → `iheldtheline.com` redirect exists. Same pattern as pledgemeaning-site.

---

## 2. Broken Internal Links

| Site | Verdict |
|---|---|
| dayonecitizen-main | ✅ All 26 internal hrefs resolve to existing page.tsx files |
| freeflyevent-site | ✅ All internal routes valid. `<a href="/giveaway.html">` use is acceptable for a static HTML file |
| screferralreward-site | ✅ All routes valid |
| screferralbonus-site | ✅ All routes valid |
| bestspacesim-site | ✅ All routes valid |
| StarCitizenHelp-live | ✅ All routes valid (dynamic `[slug]` routes rely on guide data; `adding-friends-contacts` slug not confirmed in data but redirect points to it) |
| pledgemeaning-site | ✅ All routes valid |
| o7meaning-site | ✅ `/in-gaming` exists as a stub; user-visible but not a 404 |
| fundedgame-site | ✅ All routes valid |
| iheldtheline-site | ✅ All routes valid |

**Additional flag — pledgemeaning-site:** Sub-pages (`/what-is-uec`, `/what-is-lti`, `/what-is-ccu`) use raw `<a href="/">` and `<a href="/what-is-xxx">` instead of Next.js `<Link>` for their "Related Terms" card grids — 9 instances across 3 files. Bypasses client-side routing prefetch.

---

## 3. Referral Code Issues

**All 10 repos correctly use only `STAR-GCQJ-N6NC` (×2) and `STAR-C2GJ-XSSS` (×1) in their rotators.** No removed codes (Jake/Reload `STAR-RXW4-JPN3`, etc.) found in any live code. ✅

### Minor issues

- **`src/data/glossary.ts` (dayonecitizen-main):** Two entries use raw URL text (not links) pointing to `pledgemeaning.com` and `freeflyevent.com` (lines 136, 968). The text is non-functional — no `href`. Should either be removed or converted to proper `<SourceLink>` components.
- **screferralreward-site CTAButton:** No `trackingLabel` prop passed at any call site — all CTA clicks log as `label: 'unknown'`. Analytics by placement is impossible.
- **screferralbonus-site CTAButton:** Same — all click logs have `label: 'unknown'`.
- **screferralbonus-site CTAButton:** Uses `rel="noopener noreferrer sponsored"` — more SEO-correct than screferralreward-site which uses only `rel="noopener noreferrer"`. screferralreward-site should match.
- **CLAUDE.md stale (iheldtheline-site, StarCitizenHelp-live):** Both still list `STAR-RXW4-JPN3` in the referral codes section. Actual code is correct; only the docs are wrong.
- **pledgemeaning-site `page.tsx` line 249:** Cross-links to `screferralreward.com` (singular). Confirm this is the intended domain (not `screferralrewards.com` plural).
- **screferralreward-site `src/data/faq.ts` lines 14, 30:** States a "**$40 USD** qualifying pledge threshold" for the recruiter's recruitment point. This figure has not been verified against current RSI referral program documentation. If wrong it could mislead users about when a referral "counts."

---

## 4. SEO & AI Citation Issues

### dayonecitizen-main ⚠️ HIGH
- **CRITICAL: 13 live pages missing from `sitemap.ts`.** All 12 individual Day One Citizen guide sub-pages (`/day-one-citizen/worth-buying` through `/day-one-citizen/first-flight`) and `/tools` exist as fully-built pages with metadata but do not appear in `src/app/sitemap.ts`. These are the site's core content. File: `src/app/sitemap.ts`.
- **All ~19 page-level `description` metadata strings exceed 160 characters.** Every page including the homepage is over Google's ~155-char truncation point. Descriptions are well-written but all need trimming.
- **`src/app/page.tsx` line 50:** The "$700M+ crowdfunding" claim links to `fundedgame.com` (a portfolio satellite) as its source — not an official RSI Comm-Link, CIG tracker, or credible third-party. The CLAUDE.md standard requires factual claims to link to verifiable sources.

### freeflyevent-site
- **Homepage missing explicit canonical.** `generateMetadata()` never sets `alternates: { canonical: '/' }` in any state (ACTIVE, CANCELLED_FREE_FLY, or default). All other pages have it. Since freeflyevent.com is the Bing authority hub, this is important.
- **Default page title is 62 chars** ("Star Citizen Free Fly Events 2026 — Play Free, No Purchase") — 2 chars over the soft 60-char guideline. Minor.
- **`giveaway.html` correctly in sitemap at priority 0.9 with no noindex.** ✅ (Should remain indexed until entries close May 27.)
- robots.ts: ✅ No issues.

### screferralreward-site
- Metadata: all correct. ✅
- **FAQ factual flag:** `src/data/faq.ts` lines 14, 30 — "$40 USD qualifying pledge threshold" for recruiter points needs verification.
- Minor: subpages have no page-level `openGraph.images` override — inherits layout OG image. Low risk.

### screferralbonus-site ⚠️
- **No `openGraph.images` defined anywhere** — neither in layout.tsx nor any page. All social media shares (Discord, Twitter, Facebook) produce blank/no-image cards.
- **Incorrect `sameAs` in Organization JSON-LD:** `layout.tsx` line 66 uses `sameAs: ['https://dayonecitizen.com', 'https://screferralrewards.com']`. The plural domain `screferralrewards.com` was never registered — this will fail search engine sameAs validation.

### bestspacesim-site
- All three pages have correct metadata within limits. ✅
- OG image path (`/images/hero/hero-01.jpg`) is relative and resolves via `metadataBase` — verify `NEXT_PUBLIC_SITE_URL` env var is set in Vercel.
- `/star-citizen` Review JSON-LD schema present. ✅

### StarCitizenHelp-live ⚠️
- **`/enlist/page.tsx` (lines 6, 10, 18): description and OG description say "earn 5,000 UEC bonus credits at signup."** The actual referral bonus is **50,000 UEC** — stale by a factor of 10. This wrong figure appears in Google search snippets for the highest-conversion page on the domain.
- `/getting-started` title is only 33 chars ("Getting Started with Star Citizen") — could be more keyword-rich for CTR.
- `/game-guides` title is only 11 chars ("Game Guides") — not keyword-optimized for "star citizen game guides" queries.
- `/about` title template renders as "About | StarCitizenHelp" — 5-char base, not optimized.
- **`dist/public/sitemap.xml` is stale** — missing newer guide slugs, `/cookie-policy`, `/privacy-policy`, `/glossary`. Should not be served. The live Next.js `src/app/sitemap.ts` is correct.

### pledgemeaning-site ⚠️
- **No `alternates.canonical` set on any page** — neither homepage nor sub-pages have canonical tags. All other repos set these explicitly.
- **No `openGraph.images` defined on homepage or layout** — social shares produce no preview image on all pages.
- **No OG block on any sub-page** (`/what-is-uec`, `/what-is-lti`, `/what-is-ccu`) — only title and description are set; no openGraph or twitter fields.

### o7meaning-site
- Metadata well-formed on all pages. ✅ Canonicals, OG, Twitter, JSON-LD all present.
- `/in-gaming` stub correctly has `robots: { index: false }` and is absent from sitemap. ✅

### fundedgame-site
- Metadata: title, description, canonical, OG all present via layout.tsx. ✅
- `/the-story` has no Twitter card metadata (OG is present, Twitter card block is absent).
- No JSON-LD schema on either page — a story/content page like `/the-story` would benefit from Article schema.

### iheldtheline-site
- `/about` page has no `openGraph` block in its metadata export.
- `/news` and `/videos` have no `openGraph.images` in page-level metadata.
- All other pages have solid metadata. ✅

---

## 5. Content & Pricing Issues

### dayonecitizen-main ⚠️
- **`buying-the-game/page.tsx` line 155 says packages include `1,000 starting aUEC`.** The adjacent `starter-package` page consistently states `10,000 starting UEC`. The `buying-the-game` figure is likely the old pre-update value; `10,000` is current. These two guide pages contradict each other.
- **Aurora MR vs Aurora Mk II naming inconsistency:** `starter-package/page.tsx` uses "Aurora Mk II" (current), `buying-the-game/page.tsx` uses "Aurora MR" (older name). The Citizen Starter Pack now ships with the Aurora Mk II; "Aurora MR" may confuse new players.
- Starter package prices ($45 WB/$60, $51 WB/$60, $75, $80, $85, $125) all match the current spec on `starter-package` page. ✅

### freeflyevent-site
- **All events in `src/data/events.ts` have correct statuses.** No event with a past end date is marked ACTIVE or UPCOMING. Status is derived from real time, not hardcoded flags. ✅
- DefenseCon 2026 is correctly marked ACTIVE through May 27. ✅
- **`should-i-buy` page lists "Avenger Titan Starter" at `~$55`.** The spec's Generalist DefenseCon Starter Pack ($51 WB/$60) is not shown at all — this is the promoted package during the current event window. The `should-i-buy` page should include the Generalist package and reconcile the Avenger Titan price.

### StarCitizenHelp-live ⚠️
- **`GiveawayBanner.tsx` has no expiry check.** The `ReferralBonusBanner` uses `getBonusWindow()` to auto-hide after May 27. The `GiveawayBanner` is hardcoded with no date-gate — it will persist indefinitely after the campaign ends unless manually removed. Action required by 2026-05-28.
- **`EnlistNow.tsx` hardcodes DefenseCon 2956 dates** ("May 14 – May 27, 2026") and "DefenseCon 2956 clothing" copy. Needs cleanup after May 27.
- `referral-bonus.ts` correctly sets `endDate: "2026-05-28T00:00:00Z"` — the bonus banner auto-hides. ✅
- Patch version references in the Updates page: correctly shows Alpha 4.8 as current. ✅

### bestspacesim-site ⚠️
- **`/star-citizen/page.tsx` line 23: states "The current live build is Alpha 4.7."** Alpha 4.8 launched May 2026 (confirmed by StarCitizenHelp's Updates page). This is factually outdated in the flagship review page.

### fundedgame-site
- Crowdfunding figures ($967M+, 6.4M+ backers) are sourced from `ccugame.app/statistics/funding-dashboard`. ✅
- Body copy rounds to "nearly $1 billion" / "more than 6 million backers" — conservative/safe rounding. ✅

---

## 6. Cross-Site Link Issues

### Cross-link rule recap (from SHARED_CONVENTIONS.md):
Cross-site links must appear in **body copy only**, never in footers, sidebars, or link lists.

| Site | Body copy cross-links | Footer/link-list cross-links | Status |
|---|---|---|---|
| dayonecitizen-main | freeflyevent.com, fundedgame.com, screferralreward.com all in body copy ✅ | None in footer ✅ | Clean |
| freeflyevent-site | dayonecitizen.com ×5, screferralreward.com ×2 in body ✅ | Two dayonecitizen.com links in footer (attribution) ⚠️ | Minor |
| screferralreward-site | dayonecitizen.com in body ✅, freeflyevent.com in body ✅ | dayonecitizen.com in footer attribution line ⚠️ | Minor |
| screferralbonus-site | dayonecitizen.com in body ✅ | **"Network" section with dayonecitizen.com + screferralrewards.com (wrong plural domain)** ❌ | VIOLATION |
| bestspacesim-site | dayonecitizen.com in body ×4 ✅ | **dayonecitizen.com in footer "New to SC?" nav column** ❌ | VIOLATION |
| StarCitizenHelp-live | dayonecitizen.com in guide footerHtml ✅, freeflyevent.com in event guides ✅ (allowed per CLAUDE.md) | **freeflyevent.com + o7meaning.com + iheldtheline.com in footer "Community resources" bar** ❌ | CRITICAL VIOLATION |
| pledgemeaning-site | dayonecitizen.com in body copy ✅ | **dayonecitizen.com in footer "Network" column; dayonecitizen.com in NavBar "Hub →" link** ❌ | VIOLATION |
| o7meaning-site | dayonecitizen.com in body copy on /in-star-citizen ✅ | None in footer ✅ | Clean |
| fundedgame-site | dayonecitizen.com in body ✅ | **"Network" column with dayonecitizen.com + freeflyevent.com + screferralrewards.com (wrong plural)** ❌ | VIOLATION |
| iheldtheline-site | dayonecitizen.com in body ✅ | **"SC Community" link list with dayonecitizen.com + freeflyevent.com + starcitizenhelp.com** ❌ | VIOLATION |

**Five sites have cross-portfolio links in footer link lists.** StarCitizenHelp is the most critical — its footer links to satellite sites (freeflyevent.com, o7meaning.com, iheldtheline.com) directly contradicts the authority-migration strategy of pointing authority only toward dayonecitizen.com.

**SCH About page body copy** (`About.tsx` lines 79–83) also links to `freeflyevent.com` and `o7meaning.com` — the site's own CLAUDE.md permits only dayonecitizen.com cross-links, making these an authority dilution even in body copy.

**bestspacesim.com CLAUDE.md** specifies cross-links to `dayonecitizen.com` and `freeflyevent.com` (not `screferralreward.com`). The audit spec calls for a screferralreward.com link — this discrepancy should be reconciled.

---

## 7. Style & UX Issues

### Footer spec compliance (fan disclaimer + FTC disclosure + RSI badge)

| Site | Fan disclaimer | FTC disclosure (names code) | RSI badge |
|---|---|---|---|
| dayonecitizen-main | ✅ | ✅ (present, brief) | ✅ |
| freeflyevent-site | ✅ | ⚠️ Present but **does not name STAR-GCQJ-N6NC** | ✅ (alt text slightly off spec) |
| screferralreward-site | ✅ | ✅ | ✅ (alt text slightly off spec) |
| screferralbonus-site | ✅ | ✅ | ✅ (alt text matches spec exactly) |
| bestspacesim-site | ⚠️ Abbreviated (no "Star Citizen®") | ⚠️ Present but **does not name STAR-GCQJ-N6NC** | ❌ **File exists but never referenced in any component** |
| StarCitizenHelp-live | ✅ (no ® symbol) | ⚠️ Present but **does not name STAR-GCQJ-N6NC** | ✅ (alt text slightly off spec; image in `/images/` not `/public/`) |
| pledgemeaning-site | ✅ | ✅ (names STAR-GCQJ-N6NC) | ⚠️ Alt text "Made by community badge" not "Made by the Star Citizen Community" |
| o7meaning-site | ✅ | ⚠️ Present but **does not name STAR-GCQJ-N6NC** | ✅ (alt text correct) |
| fundedgame-site | ✅ | ❌ **MISSING** — no FTC disclosure at all | ❌ **MISSING** — file exists in public/ but not referenced |
| iheldtheline-site | ✅ | ❌ **MISSING** — no FTC disclosure at all | ✅ (in `/images/brand/` subdirectory) |

### Click tracking (`/api/log`)

- All sites have `/api/log` route handlers. ✅
- All CTAButton components fire `/api/log` on click. ✅
- **iheldtheline-site DISCORD_CLICK_WEBHOOK_URL:** env var was reportedly missing at end of the 2026-05-17 session; user added it and a deploy was triggered. Cannot verify from code whether it's active in production.
- **screferralreward-site and screferralbonus-site:** No `trackingLabel` prop is passed at any CTAButton call site — all clicks log as `label: 'unknown'`. Analytics by placement is impossible on both sites.

### DiscordCTA placement

- **dayonecitizen-main:** Present on `buying-the-game`. Missing from `starter-package` and `worth-buying` (high-intent buying-decision pages).
- **freeflyevent-site:** Present on homepage. Missing from `/event-guide` (step-by-step new player guide — highest-funnel page).
- Other sites: DiscordCTA not specified in their CLAUDE.md — no violation.

### Raw `<a>` for internal navigation

- **pledgemeaning-site:** 9 instances across `what-is-uec/page.tsx`, `what-is-lti/page.tsx`, `what-is-ccu/page.tsx` — all "Related Terms" card links use raw `<a>` instead of `<Link>`. Should use `<Link>` for prefetching.
- All other sites use `<Link>` for internal navigation. ✅ (Exceptions for static files like `/giveaway.html` are acceptable.)

### Other UX gaps

- **dayonecitizen-main `/tools`:** No CTAButton anywhere on the page. Tools users are researching ships (pre-purchase intent) — should have at least one referral CTA.
- **StarCitizenHelp-live `FloatingCTA`:** Not imported in `layout.tsx` — not globally rendered. Only appears if individually imported per page. Confirm it's active on high-intent pages.

---

## 8. Fact-Check Results

Fact-checked against RSI Comm-Link API, Developer Tracker, and RSI Knowledge Base. RS store prices unverifiable (JS-rendered).

| # | Claim | File | Verdict | Official Source |
|---|---|---|---|---|
| 1 | "Alpha since 2012" | worth-buying/page.tsx | ⚠️ Rephrase | Alpha opened 2013; crowdfunding launched Oct 2012. Use "in development since 2012." [Source](https://robertsspaceindustries.com/en/comm-link/transmission/15189-Package-Split-Information) |
| 2 | SQ42 "included in all standard game packages" | worth-buying/page.tsx | ❌ WRONG | SQ42 sold separately since Feb 14, 2016. Fix: remove or correct. [Source](https://robertsspaceindustries.com/en/comm-link/transmission/15189-Package-Split-Information) |
| 3 | Both Stanton and Pyro systems are live | worth-buying/page.tsx | ✅ Verified | Pyro added with Alpha 4.0, Dec 2024. [Source](https://robertsspaceindustries.com/en/comm-link/Patch-Notes/20360-Star-Citizen-Alpha-40-copy-en) |
| 4 | Free Fly events run several times per year | worth-buying/page.tsx | ✅ Verified | IAE 2025, Invictus 2025, DefenseCon 2956 all confirmed. [Source](https://robertsspaceindustries.com/en/comm-link/transmission/21147-DefenseCon-2956-About) |
| 5 | "Free Fly gives access to the full game" | worth-buying/page.tsx | ⚠️ Rephrase | Players get loaner ships + rotating roster, not unrestricted access. Rephrase. [Source](https://robertsspaceindustries.com/en/comm-link/transmission/21129-DefenseCon-2956-Schedule) |
| 6 | "10,000 starting UEC" in packages | starter-package/page.tsx | ⚠️ Wrong label | Amount plausible; label should be "aUEC" (alpha currency) not "UEC" (purchasable). [Source](https://robertsspaceindustries.com/en/comm-link/transmission/21084-DefenseCon-2956-Referral-Bonus) |
| 7 | Drake Golem is a mining ship | starter-package/page.tsx | ✅ Verified | Flight-ready as of Alpha 4.1.0. [Source](https://robertsspaceindustries.com/en/comm-link/transmission/20410-Drake-Golem) |
| 8 | RSI Salvation is a salvage ship | starter-package/page.tsx | ✅ Verified | Flight-ready in Alpha 4.4.0. [Source](https://robertsspaceindustries.com/en/comm-link/transmission/20865-RSI-Salvation) |
| 9 | Aegis Avenger Titan in Duelist pack | starter-package/page.tsx | ✅ Verified | Confirmed Aegis product. [Source](https://robertsspaceindustries.com/en/pledge/ships/aegis-avenger/Avenger-Titan) |
| 10 | Drake Cutlass Black in Privateer pack | starter-package/page.tsx | ✅ Verified | Long-standing Drake ship. [Source](https://robertsspaceindustries.com/en/comm-link/transmission/21129-DefenseCon-2956-Schedule) |
| 11 | Starter pack prices ($45 WB / $60, etc.) | starter-package/page.tsx | ⚠️ Unverifiable | RSI store is JS-rendered; exact prices cannot be confirmed via API. Add "check RSI store for current price." |
| 12 | DefenseCon 2956 dates: May 14 – May 27 2026 | freeflyevent-site/src/data/events.ts | ✅ Verified | [Source](https://robertsspaceindustries.com/en/comm-link/transmission/21129-DefenseCon-2956-Schedule) |
| 13 | Free Fly reinstated May 18 after server cancellation | events.ts | ✅ Verified | [Source](https://robertsspaceindustries.com/en/comm-link/transmission/21147-DefenseCon-2956-About) |
| 14 | Bonus of "50,000 UEC" in events.ts bonusOverride | events.ts | ⚠️ Wrong label | Amount correct; should be "aUEC" not "UEC." [Source](https://robertsspaceindustries.com/en/comm-link/transmission/21084-DefenseCon-2956-Referral-Bonus) |
| 15 | IAE 2025 dates: Nov 21 – Dec 2 2025 | events.ts | ⚠️ Unverifiable | No official Comm-Link returned for IAE 2025; dates match historical pattern but unconfirmed. |
| 16 | Invictus Launch Week 2025: May 23 – June 3 | events.ts | ⚠️ Unverifiable | Same as above — no 2025 Invictus Comm-Link returned. |
| 17 | SCH /enlist meta: "earn 5,000 UEC bonus credits" | StarCitizenHelp enlist/page.tsx | ❌ WRONG | Actual bonus is **50,000 aUEC**. Stale by 10×, wrong currency label. All three metadata fields affected. [Source](https://robertsspaceindustries.com/en/comm-link/transmission/21084-DefenseCon-2956-Referral-Bonus) |
| 18 | SCH body (EnlistNow.tsx): "50,000 aUEC Bonus" | EnlistNow.tsx | ✅ Verified | Body copy is correct; error is confined to page.tsx meta tags. |
| 19 | "Applying a referral code grants 50,000 UEC" | GettingStarted.tsx | ⚠️ Wrong label | Amount correct; label should be "aUEC." [Source](https://robertsspaceindustries.com/en/comm-link/transmission/21084-DefenseCon-2956-Referral-Bonus) |
| 20 | "Star Citizen still in active development" | GettingStarted.tsx | ✅ Verified | Alpha 4.8 released May 2026. [Source](https://robertsspaceindustries.com/en/comm-link/Patch-Notes/21168-Star-Citizen-Alpha-48) |
| 21 | "Windows only, not macOS or Linux" | GettingStarted.tsx | ✅ Verified | [Source](https://support.robertsspaceindustries.com/hc/en-us/articles/360042417374) |
| 22 | "Ship purchases will be reset during major updates" | GettingStarted.tsx | ❌ WRONG | Pledged (store-purchased) ships are NEVER wiped. Only earned aUEC and items are reset. [Source](https://robertsspaceindustries.com/en/comm-link/Patch-Notes/21168-Star-Citizen-Alpha-48) |
| 23 | o7meaning FAQ: "50,000 UEC when you sign up" | o7meaning-site src/data/faq.ts | ⚠️ Misleading | Signing up yields 5,000 aUEC; 50,000 aUEC bonus requires a first purchase. The distinction matters. |

---

## Recommended Fix Priority

### P1 — Fix immediately (broken, losing traffic/conversions)

1. **screferralreward.com apex domain not in Vercel** — site returns 404 for direct visitors. Add apex domain in Vercel dashboard. (`screferralreward-site` — Vercel config)
2. **StarCitizenHelp `/enlist` meta says "5,000 UEC"** — wrong by 10× in the exact page Google indexes for "Star Citizen referral code." Fix lines 6, 10, 18 in `StarCitizenHelp-live/src/app/enlist/page.tsx` to "50,000 aUEC."
3. **`worth-buying` claims SQ42 is included in standard packages** — false since 2016; will cause direct buyer confusion. Fix `dayonecitizen-main/src/app/day-one-citizen/worth-buying/page.tsx`.
4. **13 Day One Citizen guide pages + Tools absent from sitemap** — Google cannot discover the site's main content. Add all routes to `dayonecitizen-main/src/app/sitemap.ts`.
5. **GiveawayBanner has no expiry check** — will persist on StarCitizenHelp after campaign ends May 27. Add date-gate or remove banner before 2026-05-28. (`StarCitizenHelp-live/src/components/banners/GiveawayBanner.tsx`)
6. **GettingStarted.tsx: "Ship purchases will be reset"** — incorrect; pledged ships are never wiped. Actively misleads potential buyers. Fix `StarCitizenHelp-live`.

### P2 — Fix soon (SEO or compliance degradation)

7. **fundedgame-site `vercel.json` redirects empty** — mostfundedgame.com goes nowhere. Add `mostfundedgame.com` → `highestfundedgame.com` redirect in Vercel.
8. **fundedgame-site + iheldtheline-site FTC disclosures missing** — required for affiliate compliance. Add FTC disclosure to `Footer.tsx` in both repos (name the code explicitly).
9. **bestspacesim `/star-citizen` references Alpha 4.7** — current is 4.8. Update `src/app/star-citizen/page.tsx` line 23.
10. **bestspacesim missing RSI "Made by the Community" badge** — file exists but never rendered. Add `<Image>` to `Footer.tsx`.
11. **StarCitizenHelp Footer satellite links** — breaks the authority-migration strategy. Remove `freeflyevent.com`, `o7meaning.com`, `iheldtheline.com` from `Footer.tsx` "Community resources" section; remove same from `About.tsx` body copy.
12. **Footer link lists on 5 sites** — all cross-portfolio footer/nav links should move to body copy or be removed: `screferralbonus-site/Footer.tsx`, `pledgemeaning-site/Footer.tsx` (+ NavBar Hub link), `fundedgame-site/Footer.tsx`, `iheldtheline-site/Footer.tsx`.
13. **screferralbonus no `og:image`** — all social shares show no image. Add OG image to `screferralbonus-site/src/app/layout.tsx`.
14. **screferralbonus `sameAs` JSON-LD uses non-existent `screferralrewards.com`** — change to `screferralreward.com` or remove.
15. **pledgemeaning-site missing canonical tags and OG images on all pages** — add to layout and all 4 page.tsx files.
16. **www redirect missing on pledgemeaning-site and iheldtheline-site** — add `redirects()` to `next.config.mjs` in both.
17. **www.dayonecitizen.com redirect missing** — confirm Vercel dashboard handles this; if not, add to `next.config.mjs`.
18. **dayonecitizen-main: all 19 metadata descriptions over 160 chars** — trim each to ≤155 chars.
19. **`buying-the-game` says 1,000 aUEC vs `starter-package` says 10,000** — fix `buying-the-game/page.tsx` line 155.
20. **Aurora MR / Aurora Mk II naming inconsistency** across dayonecitizen-main guide pages.
21. **"UEC" should be "aUEC" throughout** — events.ts bonusOverride, GettingStarted.tsx, multiple dayonecitizen copy instances.

### P3 — Polish (nice to have)

22. freeflyevent-site homepage: add explicit `alternates: { canonical: '/' }` to `generateMetadata()`.
23. freeflyevent-site + bestspacesim + o7meaning FTC disclosures should name `STAR-GCQJ-N6NC` explicitly.
24. dayonecitizen-main `fundedgame.com` citation → replace with RSI Comm-Link or CIG tracker URL.
25. dayonecitizen-main glossary.ts: two plain-text `pledgemeaning.com` and `freeflyevent.com` URLs (lines 136, 968) — either remove or convert to `<SourceLink>`.
26. Both screferralreward + screferralbonus CTAButton call sites: add `trackingLabel` props.
27. screferralreward-site CTAButton: add `rel="sponsored"` to match screferralbonus pattern.
28. Verify `$40 USD` recruiter threshold in `screferralreward-site/src/data/faq.ts` against current RSI referral program docs.
29. freeflyevent `/event-guide`: add `DiscordCTA` — highest-funnel new-player page.
30. dayonecitizen-main `starter-package` + `worth-buying`: add `DiscordCTA`.
31. dayonecitizen-main `/tools`: add a CTAButton at page bottom.
32. pledgemeaning-site sub-pages: replace raw `<a href="...">` with `<Link>` for internal navigation (9 instances).
33. o7meaning FAQ line 84: "50,000 UEC when they sign up" → "50,000 aUEC when they make their first purchase using a referral code."
34. freeflyevent-site `should-i-buy`: add Generalist DefenseCon Starter Pack; reconcile Avenger Titan price.
35. StarCitizenHelp `EnlistNow.tsx`: remove/update hardcoded DefenseCon 2956 dates after May 27.
36. StarCitizenHelp `vite.dreamhost.config.js` + `dist/` folder: gitignore or delete to prevent accidental wrong-build deployment.
37. CLAUDE.md files for `iheldtheline-site` and `StarCitizenHelp-live`: remove stale reference to `STAR-RXW4-JPN3` code.
38. IAE 2025 and Invictus 2025 event dates in `events.ts`: flag for manual verification against RSI Comm-Link archive.
39. fundedgame-site `/the-story`: add Twitter card metadata; consider Article JSON-LD schema.
40. iheldtheline-site `/about` and `/news`, `/videos`: add `openGraph` blocks to page-level metadata.

---

*Audit complete. No files were modified during this audit.*
