# Portfolio Audit — 2026-05-23 (post-fix re-audit)

**Scope:** All 10 sites  
**Method:** 6 parallel read-only agents  
**Previous audit:** 2026-05-23 morning session (v1) — this audit was run after all v1 fixes were applied

---

## Executive Summary

Two systemic issues span virtually every site in the portfolio:

1. **aUEC vs UEC** — The referral bonus is 50,000 *aUEC* (alpha UEC, earned in-game). Nearly every site labels it "50,000 UEC" — the real-money purchasable currency. The footer FTC disclosures were fixed in the morning session but body copy, CTAs, data files, and JSON-LD schemas were not. One site (screferralbonus) has a FAQ answer that actively claims the bonus is "real, persistent UEC — separate from aUEC," which directly contradicts the audit standard.

2. **Cross-link rule violations** — Several satellite sites link to other satellites in body copy. The rule is: each satellite only cross-links to dayonecitizen.com. Exceptions: freeflyevent.com ↔ screferralreward.com (mutual permitted). All other satellite→satellite links violate the network structure.

> **Note on STAR-C2GJ-XSSS:** This is Doc's second legitimate code and belongs in the rotator at 1x weight. Multiple audit agents incorrectly flagged it as stale. It is correct and should remain. The Jake/Reload codes removed on 2026-05-18 were different codes entirely.

---

## Cross-Portfolio Issues

### [CROSS-P1] aUEC vs UEC labeling — portfolio-wide

The 50,000 referral bonus is aUEC. Incorrect "UEC" usages found in:

| Site | Locations | Notes |
|------|-----------|-------|
| dayonecitizen-main | `site.ts:10` (ueecBonus field), glossary.ts, referral-bonus.ts, next-free-fly.ts, page.tsx, buying-the-game/page.tsx, GlossaryClient.tsx | Root source is `site.ts:10` — fix there cascades |
| StarCitizenHelp-live | FloatingCTA.tsx:38,56, Navbar.tsx:88, GettingStarted.tsx:165 alt text, guides.ts:1808,1836,1866,1888,1911 (JSON-LD!),1981,2075, glossary.ts:124, enlist/page.tsx OG title | `guides.ts:1911` is in JSON-LD and surfaces in Google rich results — highest urgency |
| freeflyevent-site | CTAButton.tsx:7-8, EventStatusBanner.tsx (multiple), EventCard.tsx, Footer.tsx:60, FreeFlyGuide.tsx:9, page.tsx (pervasive), layout.tsx:14,35,41, event-guide/page.tsx, glossary/page.tsx:126, should-i-buy/page.tsx:252, FAQPage JSON-LD:647 | ~50 instances; footer disclosure already correct — use it as reference wording |
| bestspacesim-site | page.tsx:92 | Single instance; FreeFlyCTA section on same page already correct |
| pledgemeaning-site | page.tsx:246,258,323-324, what-is-uec/page.tsx CTA, what-is-lti/page.tsx CTA, what-is-ccu/page.tsx CTA, CTAButton.tsx:34, faq.ts:25 | |
| o7meaning-site | CTAButton.tsx:33, page.tsx:162, in-star-citizen/page.tsx:126, faq/page.tsx:82 | faq.ts data already correct |
| fundedgame-site | page.tsx:223, the-story/page.tsx:262, CTAButton.tsx:13 | Footer already correct |
| iheldtheline-site | page.tsx:133 | Footer already correct |
| screferralreward-site | page.tsx headings/subtitles, get-the-code, event-tracker, HowItWorks.tsx, UecSpendGrid.tsx, OrgJsonLd.tsx, layout.tsx | faq.ts already correct — page copy lags behind |
| screferralbonus-site | page.tsx, layout.tsx, how-to-use/page.tsx, about-the-bonus/page.tsx, homepage-faq.tsx, faq/page.tsx:67, manifest.ts:8 | PLUS faq-page.tsx:152-153 actively argues bonus is NOT aUEC — see P1 |

### [CROSS-P2] rel="sponsored" missing on RSI enlist links

Google requires `rel="sponsored"` on affiliate/referral links. Missing on:
- bestspacesim-site `CTAButton.tsx` (has `rel="noreferrer"` only)
- o7meaning-site `CTAButton.tsx` (has `rel="noopener noreferrer"`)
- fundedgame-site `CTAButton.tsx` (has `rel="noopener noreferrer"`)
- iheldtheline-site `CTAButton.tsx` (has `rel="noopener noreferrer"`)

Already correct on: screferralreward-site, screferralbonus-site, pledgemeaning-site.

---

## Per-Site Findings

---

### dayonecitizen-main

**[P1] SQ42 falsely included in game packages — two pages**
- `src/app/day-one-citizen/pledge-vs-purchase/page.tsx:89-92` — bullet claims packages include "Access to Squadron 42." SQ42 has not been bundled since Feb 2016. The glossary entry for "Game Package" correctly says "sold separately" — this page contradicts it.
- `src/app/day-one-citizen/page.tsx:97-101` — "include a small ship plus access to both Star Citizen and Squadron 42." Remove "and Squadron 42."

**[P1] aUEC — root source**
- `src/lib/site.ts:10` — `ueecBonus: '50,000 UEC'` propagates to homepage, CTAButton, and body copy everywhere. Change to `'50,000 aUEC'`.

**[P2] FreeFlyBanner dates don't match next-free-fly.ts**
- `src/components/FreeFlyBanner.tsx:6-7` — `EVENT_START = '2026-05-16T17:00:00Z'` (event started May 14); `EVENT_END = '2026-05-28T00:00:00Z'` (event ends May 27 17:00Z). Banner shows the wrong end date — visitors see May 28 but event ends May 27.
- Fix: derive dates from `NEXT_FREE_FLY` in `next-free-fly.ts` instead of hardcoding.

**[P2] GiveawayBanner has no date guard — will go stale May 28**
- `src/components/GiveawayBanner.tsx` — no start/end date check; renders unconditionally.
- StarCitizenHelp already has a date guard at `2026-05-28T06:00:00Z`. Add the same here.

**[P2] Multiple page titles exceed 60 chars**
All use a `| dayonecitizen.com` suffix (+18 chars). Dropping it fixes most (Next.js injects site name via template anyway):
- `layout.tsx:29-32` — 76 chars (default + homepage title.absolute)
- `day-one-citizen/page.tsx:10` — 71 chars
- `day-one-citizen/starter-package/page.tsx:11` — 76 chars
- `beyond-the-basics/page.tsx:9` — 77 chars
- `beyond-the-basics/adding-friends/page.tsx:10` — 67 chars
- `beyond-the-basics/ccu-chains/page.tsx:10` — 76 chars
- `beyond-the-basics/party-management/page.tsx:10` — 82 chars
- `beyond-the-basics/inventory-management/page.tsx:10` — 79 chars
- `beyond-the-basics/shops-directory/page.tsx:10` — 79 chars

**[P2] about/page.tsx missing meta description**
- No `description` field in the metadata export. Next.js will not output a description meta tag for this page.

**[P2] Footer FTC disclosure doesn't name the referral code**
- `src/components/Footer.tsx:111-112` — Add "code STAR-GCQJ-N6NC" to the disclosure text.

**[P2] glossary/page.tsx description 157 chars** (limit 155)
- `src/app/glossary/page.tsx:8-10` — trim 2 chars.

**[P3] about/page.tsx FTC section is a copy-paste of footer text — code not named**
- `src/app/about/page.tsx:275-278`

**[P3] CLAUDE.md CTA table references stale /o7-meaning route**
- `CLAUDE.md:496` — route redirects to /about now.

**[P3] ueecBonus field misspelled in site.ts (double-e)**
- `src/lib/site.ts:10` — rename to `referralBonusAUEC` when fixing the value.

**CLEAN:** Referral codes correct · Cross-portfolio links in body copy only · Click tracking wired up · Redirects clean (o7citizen.com, www.dayonecitizen.com, retired routes) · Sitemap complete (27 routes) · JSON-LD present · OG images present · Crowdfunding cites RSI official page

---

### StarCitizenHelp-live

**[P1] aUEC — 13 instances including JSON-LD**
`guides.ts:1911` is in a JSON-LD FAQ schema and surfaces directly in Google rich results — highest urgency instance. Full list in cross-portfolio table above.

**[P2] tools/page.tsx title 91 chars** (limit 60)
- `src/app/tools/page.tsx:5`

**[P2] updates/page.tsx title 66 chars** (limit 60)
- `src/app/updates/page.tsx:5`

**[P2] enlist/page.tsx OG and Twitter title says "Bonus UEC"**
- `src/app/enlist/page.tsx:9,17` — description correctly says aUEC; title doesn't match.

**[P2] tools/page.tsx description 167 chars** (limit 155)
- `src/app/tools/page.tsx:6`

**[P2] GiveawayBanner links to freeflyevent.com from sitewide layout**
- `src/components/banners/GiveawayBanner.tsx:15` — in `layout.tsx` (every page); cross-link rule requires satellite links in body copy only. Banner expires May 28 — 5-day exposure, low urgency but noted.

**[P3] guides.ts:1873 FAQ answer may be factually inverted**
- States "legitimate signup credit is denominated in UEC (real Star Citizen pledge currency), not aUEC." If the bonus is aUEC, this answer is wrong and will confuse users.

**[P3] CLAUDE.md cross-link rule conflict**
- `CLAUDE.md:49` lists freeflyevent.com as an approved outbound destination. The network rule for this site allows only dayonecitizen.com. Reconcile.

**CLEAN:** Referral codes correct · GiveawayBanner date gate present (May 28 06:00Z) · Click tracking on all CTA surfaces · Footer has only dayonecitizen.com · Ships-not-wiped claim correct · Canonicals and OG images present

---

### freeflyevent-site

**[P2] ~50 UEC→aUEC instances across entire site**
CTAButton, EventStatusBanner, EventCard, FreeFlyGuide, Footer referral box, page.tsx body, layout.tsx metadata, event-guide, glossary, should-i-buy, FAQPage JSON-LD. Footer disclosure already uses "aUEC" — use it as the reference wording for all fixes.

**[P2] layout.tsx missing OG image**
- No `images` field in the openGraph or twitter blocks. No og:image for social/Bing unfurls during the peak DefenseCon window.

**[P2] CANCELLED_FREE_FLY title 85 chars** (limit 60)
- `src/app/page.tsx:58` — also contains "UEC" (fix both in one pass).

**[P3] Active bar banner shows giveaway CTA instead of referral CTA**
- `src/components/EventStatusBanner.tsx:92-107` — compact bar shows "Win a DefenseCon Starter Pack → Enter Giveaway" during active event. Hero variant is correct. During peak window the topmost strip drives to giveaway, not signup.

**[P3] CLAUDE.md CTAButton spec says "50,000 UEC"**
- `CLAUDE.md:38` — future agent rebuilds will re-introduce the wrong label.

**CLEAN:** Event dates all correct (DefenseCon, IAE 2025, Invictus 2025 — all fixed in previous session) · bonusOverride.text/badge use "aUEC" · Cross-links in body copy only · FTC disclosure names code and uses "aUEC" · Click tracking correct · Giveaway live and in sitemap (correct — entries close May 27) · Redirects clean · Event JSON-LD correct · Canonicals present on all pages

---

### screferralreward-site

**[P1] "first qualifying purchase" claim is factually wrong**
- `src/app/page.tsx:73,190` — subtitle says the recruit's bonus "lands after your first qualifying purchase." The FAQ on the same page correctly states no purchase is required. The qualifying-purchase requirement applies to the *recruiter's* Recruitment Point, not the recruit's aUEC credit.

**[P2] aUEC — all page copy says "50,000 UEC"; faq.ts already correct**
Align page-level copy (page.tsx, get-the-code, event-tracker, HowItWorks.tsx, UecSpendGrid.tsx, OrgJsonLd.tsx, layout.tsx) to match faq.ts which already uses "aUEC."

**[P2] Footer FTC disclosure doesn't name the referral code**
- `src/components/Footer.tsx:25` — STAR-GCQJ-N6NC not named.

**[P2] Footer link to dayonecitizen.com is in footer column (not body copy)**
- `src/components/Footer.tsx:43-46` — "Part of the dayonecitizen.com fan-site network" with a live anchor. Cross-link rule: body copy only. Remove the anchor (keep plain text if desired) or move to body copy.

**[P2] metadataBase and SITE_URL use apex; production domain is www**
- `src/app/layout.tsx:14` — `metadataBase: new URL('https://screferralreward.com')`. Production serves `www.screferralreward.com`. Canonical and OG URLs will resolve to apex, mismatching the serving domain.
- `src/data/referral.ts:5` — `SITE_URL = 'https://screferralreward.com'` — same issue in sitemap.

**[P3] events.ts Invictus 2956 has status 'upcoming' but dates overlap today**
- `src/data/events.ts:38-44` — May 15–27 window; today is May 23. Status should be 'live'.

**CLEAN:** next.config.mjs has no www→apex redirect (loop fix confirmed) · faq.ts: $40 threshold removed, aUEC labels correct · rel="sponsored" on CTAButton · Cross-links to dayonecitizen.com and freeflyevent.com in body copy

---

### screferralbonus-site

**[P1] faq-page.tsx actively contradicts the aUEC standard**
- `src/data/faq-page.tsx:152-153` — "The 50,000 UEC referral bonus is real, persistent UEC — separate from aUEC." This is the only place in the entire portfolio that explicitly argues the bonus is NOT aUEC. Fix or remove before fixing the site's other UEC labels.

**[P1] www→apex redirect in next.config.mjs risks redirect loop**
- `next.config.mjs:7-16` — www.screferralbonus.com → screferralbonus.com. Same pattern that caused an infinite loop on screferralreward.com. Verify Vercel is not routing apex→www at the platform level; if it is, remove this redirect from next.config.mjs immediately.

**[P2] dayonecitizen.com in NavBar (cross-link rule violation)**
- `src/lib/constants.ts:19` — external nav link to dayonecitizen.com appears in the top navigation on every page. Cross-link rule: body copy only. Remove from NAV_LINKS; add a body-copy mention instead.

**[P2] aUEC — all page copy says "50,000 UEC"**
page.tsx, layout.tsx, how-to-use, about-the-bonus, homepage-faq.tsx, faq/page.tsx:67, manifest.ts:8.

**[P2] Footer FTC disclosure doesn't name the referral code**
- `src/components/Footer.tsx:57` — STAR-GCQJ-N6NC not named in the disclosure paragraph.

**[P2] Organization JSON-LD sameAs links to screferralreward.com**
- `src/app/layout.tsx:76` — `sameAs: [HUB_URL, 'https://screferralreward.com']`. Remove screferralreward.com from the sameAs array.

**[P3] about-the-bonus page title ~70 chars** (limit 60)
- `src/app/about-the-bonus/page.tsx:12`

**CLEAN:** Click tracking correct · rel="sponsored" on CTAButton · Internal-only footer columns · FAQ JSON-LD on / and /faq · Sitemap covers all 4 routes

---

### bestspacesim-site

**[P1] freeflyevent.com cross-links in body copy**
- `src/app/page.tsx:287` — anchor to freeflyevent.com in WhyStarCitizen section
- `src/app/star-citizen/page.tsx:221` — "See the schedule on freeflyevent.com →"
- Rule: bestspacesim → dayonecitizen.com only. Remove or replace with dayonecitizen.com links.

**[P1] aUEC — page.tsx:92 says "50,000 bonus UEC"**
Internal inconsistency: the FreeFlyCTA section on the same page correctly says "aUEC."

**[P2] 2 page titles over 60 chars**
- `layout.tsx` default / homepage: 63 chars
- `comparison/page.tsx`: 68 chars

**[P2] comparison page description 160 chars** (limit 155)

**[P2] rel="sponsored" missing on CTAButton** — see cross-portfolio

**CLEAN:** RSI badge in footer · www→non-www redirect · FTC disclosure names code and uses "aUEC" · Alpha 4.8 version correct · No portfolio link columns · Canonicals, OG images, sitemap all correct

---

### pledgemeaning-site

**[P1] screferralreward.com cross-link in body copy**
- `src/app/page.tsx:251-258` — anchor to screferralreward.com in Referral Bonus section. Rule: pledgemeaning → dayonecitizen.com only. Remove the link.

**[P1] aUEC — multiple instances** — see cross-portfolio table

**[P1] 50,000 aUEC copy implies signup bonus (requires first pledge)**
- page.tsx multiple locations claim the 50,000 bonus is received at signup. faq.ts correctly states 50,000 requires first pledge; 5,000 is the signup-only credit.

**[P2] Footer FTC disclosure says "UEC bonuses" instead of "aUEC"**
- `src/components/Footer.tsx:61`

**[P2] Footer RSI badge wrapped in dayonecitizen.com anchor**
- `src/components/Footer.tsx:71-83` — the RSI badge image is inside `<a href="https://dayonecitizen.com">`. Cross-link rule prohibits footer links to portfolio sites. Remove the anchor; keep the badge as a plain image.

**[P2] NavBar and Footer not in root layout — per-page only**
- Each page.tsx imports them individually. Any new page will miss them. Move both to `src/app/layout.tsx`.

**[P3] Homepage canonical is relative "/" instead of absolute URL**
- `src/app/page.tsx:15-16`

**CLEAN:** rel="sponsored" on CTAButton (correct — only satellite site with this already right) · www→non-www redirect · Canonicals on all pages · OG images · Sitemap complete · No NavBar cross-portfolio links

---

### o7meaning-site

**[P1] aUEC — CTA label and body copy** — see cross-portfolio table
faq.ts data correctly uses "aUEC." Page copy and CTA button contradict it.

**[P1] 50,000 aUEC copy implies signup bonus (requires first pledge)**
- `src/app/page.tsx:162` and `in-star-citizen/page.tsx:126` — "Sign up with a referral code and receive 50,000 [aUEC/UEC]... at no extra cost." The 50,000 requires first pledge; 5,000 is the signup credit.

**[P2] rel="sponsored" missing on CTAButton** — see cross-portfolio

**[P2] /in-gaming noindex page linked from NavBar**
- "Coming soon" placeholder with `robots: { index: false }` is a top nav item on every page. Remove from NavBar until the page is built; sends crawl budget to a dead-end.

**[P3] Vercel Analytics missing**
- layout.tsx has no `<Analytics />`. bestspacesim and pledgemeaning both have it.

**[P3] Sitemap uses static lastModified date (2026-05-10)**
- `src/app/sitemap.ts` — use `new Date()` instead.

**CLEAN:** FTC disclosure names code and uses "aUEC" · RSI badge not wrapped in anchor · Comprehensive JSON-LD (WebSite, Organization, FAQPage) · Canonicals, OG images, sitemap (3 indexed routes) · No cross-portfolio nav links · faq.ts data correct

---

### fundedgame-site

**[P1] Crowdfunding data cites ccugame.app — user-visible**
- `src/data/milestones.ts:10` — source comment cites ccugame.app
- `src/components/FundingMilestoneChart.tsx:220-226` — figcaption explicitly links to ccugame.app as the data source
- Rule: crowdfunding figures must cite robertsspaceindustries.com/en/funding-goals. This is a visible attribution violation on the site's core content.

**[P1] freeflyevent.com cross-link in body copy**
- `src/app/page.tsx:268-275` — Rule: fundedgame → dayonecitizen.com only. Remove.

**[P1] aUEC — 3 instances** — see cross-portfolio table

**[P2] layout.tsx default title 66 chars** (limit 60)

**[P2] No JSON-LD schema anywhere**
- No WebSite, Organization, or Article schema in layout.tsx or any page.tsx. Only site in the network with zero JSON-LD.

**[P2] CTAButton missing trackingLabel on all usages**
- `src/app/page.tsx:36,232` and `src/app/the-story/page.tsx:267` — click log records 'unknown' for all fundedgame conversions.

**[P2] rel="sponsored" missing on CTAButton** — see cross-portfolio

**[P3] Milestones table ends at 2025 ($855M); headline shows $967M+**
- Visible disconnect; needs a 2026 row. Tie to the ccugame→RSI source fix.

**CLEAN:** vercel.json mostfundedgame.com redirects present · www.highestfundedgame.com redirect in next.config.mjs · Footer FTC names code and uses "aUEC"; RSI badge present; no network columns · Click tracking /api/log correct

---

### iheldtheline-site

**[P1] screferralreward.com + freeflyevent.com cross-links in body copy**
- `src/app/page.tsx:123-126` — freeflyevent.com link
- `src/app/page.tsx:129-134` — screferralreward.com link
- Rule: iheldtheline → dayonecitizen.com only. Remove both links.

**[P1] aUEC — page.tsx:133** — see cross-portfolio table

**[P2] layout description 188 chars** (limit 155)
- `src/data/site.ts` — SITE.description is 188 chars. layout.tsx metadata.description is set to this value; the root layout description will be truncated in SERPs.

**[P2] About page OG metadata missing images field**
- `src/app/about/page.tsx:10-15` — openGraph has title/description/url but no images.

**[P2] About page title is just "About"** — too generic for SEO
- Renders as "About | iheldtheline.com" (27 chars, within limit, but not descriptive).

**[P2] rel="sponsored" missing on CTAButton** — see cross-portfolio

**[P3] Click tracking Discord webhook unverified**
- CLAUDE.md notes env var was added but verification checklist still unchecked.

**CLEAN:** www→non-www redirect · Footer FTC names code and uses "aUEC"; no network columns · Comprehensive JSON-LD · CTAButton passes trackingLabel correctly on all usages · All indexed titles ≤60 chars

---

## Consolidated Action List

### P1 — Fix before next publish

| # | Issue | File(s) |
|---|-------|---------|
| 1 | dayonecitizen: SQ42 falsely in game packages (×2) | day-one-citizen/page.tsx:97-101, pledge-vs-purchase/page.tsx:89-92 |
| 2 | dayonecitizen: aUEC root source | site.ts:10 ueecBonus → '50,000 aUEC' |
| 3 | StarCitizenHelp: aUEC in JSON-LD (guides.ts:1911 in Google rich results) | guides.ts:1808-1981, FloatingCTA.tsx, Navbar.tsx, glossary.ts |
| 4 | freeflyevent: aUEC ~50 instances | CTAButton, EventStatusBanner, EventCard, layout.tsx, page.tsx, event-guide, glossary, should-i-buy, FAQPage JSON-LD |
| 5 | freeflyevent: layout.tsx missing OG image | layout.tsx |
| 6 | screferralbonus: faq-page.tsx:152-153 contradicts aUEC standard | faq-page.tsx:152-153 |
| 7 | screferralbonus: www→apex redirect may loop | next.config.mjs:7-16 |
| 8 | screferralbonus: dayonecitizen.com in NavBar (cross-link rule) | constants.ts:19 |
| 9 | screferralreward: "first qualifying purchase" claim is wrong | page.tsx:73,190 |
| 10 | bestspacesim: freeflyevent.com cross-links (×2) | page.tsx:287, star-citizen/page.tsx:221 |
| 11 | pledgemeaning: screferralreward.com cross-link | page.tsx:251-258 |
| 12 | pledgemeaning: 50k aUEC implies signup in body copy | page.tsx multiple |
| 13 | o7meaning: 50k aUEC implies signup | page.tsx:162, in-star-citizen/page.tsx:126 |
| 14 | fundedgame: crowdfunding cites ccugame.app (user-visible figcaption) | milestones.ts:10, FundingMilestoneChart.tsx:220-226 |
| 15 | fundedgame: freeflyevent.com cross-link | page.tsx:268-275 |
| 16 | iheldtheline: screferralreward.com + freeflyevent.com cross-links | page.tsx:123-134 |

### P2 — High priority

| # | Issue | File(s) |
|---|-------|---------|
| 17 | dayonecitizen: FreeFlyBanner dates wrong (shows May 28, ends May 27) | FreeFlyBanner.tsx:6-7 |
| 18 | dayonecitizen: GiveawayBanner no date guard | GiveawayBanner.tsx |
| 19 | dayonecitizen: 9 page titles over 60 chars | layout.tsx + beyond-the-basics pages |
| 20 | dayonecitizen: about/page.tsx missing meta description | about/page.tsx |
| 21 | dayonecitizen: footer FTC doesn't name code | Footer.tsx:111-112 |
| 22 | dayonecitizen: glossary description 157 chars | glossary/page.tsx |
| 23 | StarCitizenHelp: tools title 91 chars, updates title 66 chars | tools/page.tsx, updates/page.tsx |
| 24 | StarCitizenHelp: enlist OG/Twitter title says "Bonus UEC" | enlist/page.tsx:9,17 |
| 25 | StarCitizenHelp: tools description 167 chars | tools/page.tsx |
| 26 | freeflyevent: CANCELLED_FREE_FLY title 85 chars | page.tsx:58 |
| 27 | screferralreward: footer link to dayonecitizen.com not in body copy | Footer.tsx:43-46 |
| 28 | screferralreward: metadataBase/SITE_URL use apex; production is www | layout.tsx:14, referral.ts:5 |
| 29 | screferralreward: footer FTC doesn't name code | Footer.tsx:25 |
| 30 | screferralbonus: aUEC throughout all pages | page.tsx, layout.tsx, all pages |
| 31 | screferralbonus: footer FTC doesn't name code | Footer.tsx:57 |
| 32 | screferralbonus: sameAs links to screferralreward.com | layout.tsx:76 |
| 33 | bestspacesim: 2 titles over 60 chars | layout.tsx default, comparison/page.tsx |
| 34 | bestspacesim: comparison description 160 chars | comparison/page.tsx |
| 35 | bestspacesim, o7meaning, fundedgame, iheldtheline: rel="sponsored" missing | CTAButton.tsx (4 sites) |
| 36 | pledgemeaning: footer FTC says "UEC bonuses" | Footer.tsx:61 |
| 37 | pledgemeaning: footer RSI badge wrapped in anchor | Footer.tsx:71-83 |
| 38 | pledgemeaning: NavBar/Footer not in root layout | layout.tsx |
| 39 | o7meaning: /in-gaming noindex page linked from NavBar | NavBar |
| 40 | fundedgame: no JSON-LD anywhere | layout.tsx |
| 41 | fundedgame: title 66 chars | layout.tsx |
| 42 | fundedgame: CTAButton missing trackingLabel on all usages | page.tsx:36,232, the-story/page.tsx:267 |
| 43 | iheldtheline: layout description 188 chars | site.ts SITE.description |
| 44 | iheldtheline: about page OG missing images | about/page.tsx |
| 45 | iheldtheline: about page title too generic | about/page.tsx |

### P3 — Polish / low urgency

| # | Issue | File(s) |
|---|-------|---------|
| 46 | dayonecitizen: about disclosure doesn't name code | about/page.tsx:275-278 |
| 47 | dayonecitizen: CLAUDE.md references stale /o7-meaning route | CLAUDE.md:496 |
| 48 | dayonecitizen: ueecBonus field misspelled | site.ts:10 |
| 49 | StarCitizenHelp: guides.ts:1873 FAQ answer may have UEC/aUEC inverted | guides.ts:1873 |
| 50 | StarCitizenHelp: CLAUDE.md cross-link rule lists freeflyevent.com | CLAUDE.md:49 |
| 51 | freeflyevent: active bar banner shows giveaway CTA, not referral | EventStatusBanner.tsx:92-107 |
| 52 | freeflyevent: CLAUDE.md CTAButton spec says "50,000 UEC" | CLAUDE.md:38 |
| 53 | screferralreward: events.ts Invictus 2956 status 'upcoming' (should be 'live') | events.ts:38-44 |
| 54 | screferralbonus: about-the-bonus title ~70 chars | about-the-bonus/page.tsx:12 |
| 55 | pledgemeaning: homepage canonical is relative | page.tsx:15-16 |
| 56 | o7meaning: Vercel Analytics missing | layout.tsx |
| 57 | o7meaning: sitemap uses static lastModified date (2026-05-10) | sitemap.ts |
| 58 | fundedgame: milestones table ends at 2025, headline shows $967M+ | milestones.ts |

---

## Checks Not Run in v2 — Include in Next Audit Pass

These categories were not part of the v2 scope. Each should be added as a dedicated section in v3.

---

### Broken Source Links

✅ **Run: 2026-05-23**

All Comm-Link source URLs verified via the Star Citizen Wiki API (`api.star-citizen.wiki/api/comm-links/{id}`).

| ID | Title confirmed | Status |
|----|----------------|--------|
| 21134 | DefenseCon 2956 | ✅ VALID |
| 20861 | IAE 2955 Free Fly and Manufacturer Schedule | ✅ VALID |
| 20491 | About Invictus Launch Week 2955 | ✅ VALID |
| 20797 | IAE 2955 About | ✅ VALID |

**One broken URL found and fixed:**
- `screferralreward-site/src/data/events.ts` had `?text=Referral+Bonus` as a source — a dynamic search URL, not a stable citation. Replaced with `https://robertsspaceindustries.com/en/referral-program` (commit `d9e8b5d`+ next commit).

**One known-broken URL (non-code):**
- `https://support.robertsspaceindustries.com/hc/en-us/articles/115013102847-Referral-Program-FAQ` — returns HTTP 403 for unauthenticated requests. This URL is referenced in `screferralreward-site/CLAUDE.md` as a verification source but does not appear in any user-visible page code. The equivalent user-facing citation is `https://robertsspaceindustries.com/en/referral-program` (confirmed valid).

**Format note (no action required):**
- `freeflyevent-site/src/data/events.ts` uses old-format RSI URLs (`/comm-link/SCW/{id}-API`) for IAE 2025 and Invictus 2025. Both URLs resolve correctly. The newer `/en/comm-link/transmission/` format requires knowing the exact slug; old format is stable and needs no change.

---

### Sitemap Completeness vs. Live Routes

Verify that every `app/` route is in `sitemap.ts` and that no sitemap entry points to a route that no longer exists.

**What to check per site:**
- All `app/**/page.tsx` files → should have a corresponding entry in `sitemap.ts`
- All `sitemap.ts` entries → should have a corresponding `page.tsx`
- Known retired routes that must NOT appear: `/rewards-ladder` (screferralreward), `/o7-meaning` (dayonecitizen), `/weekly-update` (dayonecitizen), `/in-gaming` (o7meaning — noindex placeholder, confirm excluded)
- Confirm `giveaway.html` is removed from freeflyevent sitemap after May 28

---

### Custom 404 Pages

Check that every site has a `src/app/not-found.tsx`. Without one, Next.js shows a generic white error page — a missed conversion opportunity and a soft UX signal for crawlers.

**Minimum requirement:** branded 404 with a CTA back to homepage and the referral link.

---

### `rel="noopener noreferrer"` on External Links

All `<a target="_blank" href="...">` pointing to external domains should carry both `rel="noopener noreferrer"`. Missing `noopener` is a minor security issue (opener access); missing `noreferrer` leaks referrer to third-party sites.

**Note:** RSI enlist links should carry `rel="sponsored noopener noreferrer"` — all three attributes. CROSS-P2 verified `rel="sponsored"` presence but did not check the full attribute string.

---

### BreadcrumbList and Article Schema on Deep Pages

StarCitizenHelp has dozens of guide pages under `/game-guides/` — none have `BreadcrumbList` or `Article` JSON-LD. freeflyevent `/event-guide` and `/event-history` pages would also benefit. These are ranking signals for Google rich results.

**Priority targets:**
- StarCitizenHelp `/game-guides/**` — `Article` schema (author, datePublished, headline)
- StarCitizenHelp `/game-guides/**` — `BreadcrumbList` (Home > Guides > Page Name)
- freeflyevent `/event-guide` — `Article` schema
- dayonecitizen `/day-one-citizen/**` — `BreadcrumbList`

---

### OG Image Dimensions

The v2 audit confirmed OG images are *present* but did not verify dimensions. Mismatched sizes get cropped or letterboxed in link previews.

**Required dimensions:**
- `og:image` — 1200×630 (Facebook, Discord, LinkedIn)
- `twitter:image` (summary_large_image) — 1200×628 or 1200×600

**What to check:** Read each site's `layout.tsx` `openGraph.images` `width`/`height` fields and confirm they match actual file dimensions in `/public/images/hero/hero-01.jpg`. Several sites set dimensions in metadata but the placeholder hero images may be different sizes.

---

### Consistent Canonical Format Across All Pages

✅ **Run: 2026-05-23**

Grepped all `**/app/**/page.tsx` and `**/app/layout.tsx` for `alternates` across all 10 sites. 

**Findings:**

| Site | Format | Resolved value | Status |
|------|--------|----------------|--------|
| StarCitizenHelp-live | Absolute (`https://starcitizenhelp.com/...`) | — | ✅ |
| o7meaning-site | Absolute (`https://o7meaning.com/...`) | — | ✅ |
| screferralbonus-site | Absolute via `${SITE_URL}/path` | `https://screferralbonus.com/...` | ✅ |
| screferralreward-site | Relative `'/'`, `'/get-the-code'`, etc. | Resolved against `metadataBase: https://www.screferralreward.com` → correct | ✅ |
| dayonecitizen-main | Relative (`'/day-one-citizen'`, etc.) | Resolved against `metadataBase: https://dayonecitizen.com` → correct | ✅ |
| freeflyevent-site | Relative (`'/'`, `'/event-guide'`, etc.) | Resolved against `metadataBase: SITE_URL` → correct | ✅ |
| bestspacesim-site | Relative (`'/'`, `'/star-citizen'`, etc.) | Resolved against `metadataBase: SITE_URL` → correct | ✅ |
| iheldtheline-site | Relative (`'/'`, `'/faq'`, etc.) | Resolved against `metadataBase: SITE.url` → correct | ✅ |
| fundedgame-site | Layout: `'/'`; the-story: `'/the-story'` | Resolved against `metadataBase: https://highestfundedgame.com` → correct | ✅ |
| pledgemeaning-site | Homepage: absolute (fixed); sub-pages: relative | Correct | ✅ |

**All canonicals are functionally correct.** Next.js App Router resolves relative `alternates.canonical` values against `metadataBase`, and every site has `metadataBase` set in `layout.tsx`. No broken or mismatched canonicals found.

**Note on grep scope:** The canonical sweep only covered `page.tsx` files. `layout.tsx` files set default canonicals for pages that don't override them (e.g. fundedgame homepage inherits `'/'` from layout). This is correct behavior and not a risk.

---

### robots.txt Correctness

Verify that:
- All 10 production `robots.txt` files allow crawling of all indexed pages
- No sitemap entry points to a page that is `noindex` in its metadata
- Vercel preview deployment URLs (`*.vercel.app`) are not being indexed — check Google Search Console for unexpected `vercel.app` indexing

---

### Console Error Sweep (Production)

Load each production URL in a browser with devtools open and check for:
- React hydration mismatches (client/server HTML divergence)
- Missing env vars accessed at render time (`undefined` in output)
- Failed network requests (404 on images, fonts, or API routes)
- `next/image` warnings (missing `alt`, wrong `sizes`, unoptimized)

This cannot be caught by build checks alone.

---

*Section added 2026-05-23 — checks to incorporate in v3 audit.*

---

## Time-Sensitive: Giveaway Cleanup

**Do NOT act on these before giveaway entries close (end of May 27 / early May 28 UTC):**

- [ ] **freeflyevent-site** `public/giveaway.html` — add `<meta name="robots" content="noindex">`
- [ ] **freeflyevent-site** `src/app/sitemap.ts` — remove giveaway.html entry
- [ ] **dayonecitizen-main** `src/components/GiveawayBanner.tsx` — add date guard matching `2026-05-28T06:00:00Z`, or remove the component from NavBar
- [ ] **freeflyevent-site** `src/components/EventStatusBanner.tsx` — after giveaway closes, revert bar variant to show referral CTA instead of giveaway CTA

---

*Generated by 6 parallel read-only audit agents. 2026-05-23 (afternoon).*
