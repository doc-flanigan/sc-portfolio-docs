# Competitor Teardown — startstarcitizen.com (July 2026)

**Recon date:** 2026-07-12
**Analyst:** Claude (crawl of live site: homepage, all 17 core pages, 3 sitemaps, robots.txt, llms.txt, + SERP checks)
**Their referral code:** `STAR-NTSD-NTKT`
**Verdict up front:** Not actually a clone of us — their blog archive starts November 2022 ("welcome-to-start-star-citizen", IAE 2952 era), so they were doing patch-stamped beginner guides + referral funnel before most of our network existed. Treat them as the incumbent in the "start playing" niche. Their core ~9 pages are genuinely fresh and accurate; everything around those pages (schema, blog, technical stack) is weak. That's the exploit surface.

---

## TL;DR

- One-person GoDaddy Website Builder fansite, ~9 money pages + 41 dead blog posts.
- Same playbook as ours: `(2026, 4.8.3)` title stamps, "Last Updated" date on every page, single referral code, answer-first Q&A copy, unofficial-fansite disclaimer, even an `llms.txt`.
- Core pages are **accurate** — starter pack prices/lineup verified correct, referral bonus 50,000 UEC correct, next-wipe and next-Free-Fly predictions current.
- Zero JSON-LD anywhere. No canonicals. Encoded `%3F`/`%26` in URLs. Blog dead since Oct 2024 with stale 3.18–3.23-era content still indexed. Download page still says "5,000 bonus credits" (stale, contradicts their own 50,000 elsewhere).
- Biggest strategic takeaways for us: they own a **"next wipe" page** (we have none network-wide) and **misnomer-capture pages** ("Sky Citizen", "Space Citizen") — both cheap, high-intent plays we should copy.

---

## 1. Site Map & Query Targets

Hosting/CMS: GoDaddy Websites+Marketing 8.0 (generator meta: "Starfield Technologies; Go Daddy Website Builder 8.0.0000", server `DPS/2.0.0-beta`). Three sitemaps: `sitemap.website.xml` (17 URLs, all lastmod 2026-07-07), `sitemap.blog.xml` (41 URLs, no lastmods), `sitemap.ols.xml` (404 — GoDaddy online-store leftover).

### Core pages (the money site)

| Route | Title stamp | Last Updated (on-page) | Target query | Our competing page |
|---|---|---|---|---|
| `/` | 2026, 4.8.3 | **22 Sep 2025** (stale, contradicts title) | star citizen beginner's guide / new player | dayonecitizen hub |
| `/enlist-with-referral` | 2026, 4.8.3 | — | star citizen referral code / account setup | dayonecitizen.com/referral-code |
| `/pick-a-starter-ship` | 2026, 4.8.3 | — | best star citizen starter ship / starter pack | dayonecitizen /starter-package |
| `/how-to-join-a-free-fly` | **July 2026**, 4.8.3 | 2 Jul 2026 | star citizen free fly / next free fly | freeflyevent.com (head-on) |
| `/what-is-a-wipe%3F` | 2026, 4.8.3 | — | what is a wipe / **when is the next wipe** | **none — gap in our network** |
| `/can-i-run-star-citizen` | 2026, 4.8.3 | 1 Jan 2026 | can my PC run star citizen / system requirements | SCH (partial) |
| `/star-citizen-play-tips` | 2026, 4.8.3 | — | star citizen tips for new players | SCH guides |
| `/how-to-download-%26-install` | 2026, 4.8.3 | 21 Jun 2026 | how to download/install star citizen | SCH /install |
| `/star-citizen-resources` | 2026, 4.8.3 | 17 Jun 2026 | star citizen resources / tools / creators | SCH shops-directory adjacent |
| `/sky-citizen` | 2025 | 2 Jan 2024 | **"sky citizen"** misnomer capture | none |
| `/space-citizen-start-guide` | 2025 | 16 May 2024 | **"space citizen"** misnomer capture | none |
| `/all-tips-and-tricks` | — | — | internal catalog page | — |
| `/blog`, `/about`, `/contact`, `/privacy-policy`, `/terms-and-conditions` | — | contact: 24 Feb 2024 | housekeeping | — |

### Blog (dead weight)
41 posts, **newest is late Oct 2024** ("roadmap update companion" cadence died there). Archive spans Nov 2022 → Oct 2024: patch-release speculation (3.18/3.19/3.23 release dates), event recaps (IAE 2023, CitizenCon 2023, Invictus 2954), ship posts. All still indexed, none re-stamped. Blog posts also resolve at `/f/<slug>` (GoDaddy duplicate path) — the SERP surfaced `startstarcitizen.com/f/welcome-to-start-star-citizen` with a "(2025, 4.4)" homepage title, i.e., duplicate/stale variants leak into Google.

Navigation: flat global nav — every core page links to all 15 others (16 internal links per page, identical). No contextual in-body linking strategy beyond funnel pointers to `/enlist-with-referral` and `/pick-a-starter-ship`.

---

## 2. Referral Mechanics

- **Single static code** `STAR-NTSD-NTKT`, present on **every page** of the site (footer-level plus in-copy). No rotation, no A/B. Same single-code policy we adopted.
- Enlist URL: `https://robertsspaceindustries.com/enlist?referral=STAR-NTSD-NTKT` — correct `/enlist` path (same as our policy).
- Funnel shape = ours: homepage "Get Started In Four Steps!" → "Learn How to Claim Your Free 50000 Credit Bonus" → `/enlist-with-referral` → `/pick-a-starter-ship` → buy pack. "enlist" appears 9–14x per page.
- **Bonus claims:**
  - "50000 FREE STAR CITIZEN CREDITS! Using a referral code is the only way to receive the bonus 50000 Star Citizen game credits (UEC) for free." — correct (50,000 UEC is current canon; matches our ledger).
  - Verification tip: "If the referral code worked, you will see a balance of 50000 UEC in your account." — implies no-purchase grant, consistent with our no-purchase fact-check position. No differentiation for us here.
  - They track **"special referral bonus periods"** (promo windows where recruits who spend $40 get a bonus ship/vehicle) and point readers to the starter-ship page for current status. We don't surface referral promo windows anywhere — small mimic candidate.
  - **⚠ Claim to fact-check:** "you can only use a Star Citizen referral code within the first 24 hours of when you set up a Star Citizen account." Official FAQ language is that the code is applied at enlistment; the 24-hour-window framing is at minimum unsourced. Run through sc-fact-check — if wrong, it's a differentiation point for our /referral-code page.
  - **Internal contradiction:** `/how-to-download-&-install` still says referral gets you "**5000** bonus in-game credits" (the pre-increase stale figure) while every other page says 50,000. Exactly the stale-canon bug we swept our own network for on 2026-07-12.
- Disclosure: persistent "Unofficial Fansite" h2 + CIG disclaimer on every page. No explicit "this is our referral code / we benefit" disclosure that we observed — our honest-disclosure stance is stronger.

## 3. GEO / AI-Search Signals

- **JSON-LD: zero blocks on every page crawled.** No FAQPage, HowTo, Article, DefinedTerm, Organization — nothing. This is their single biggest technical gap vs us.
- **llms.txt: present** (1.4 KB) — flat list of 12 page links with stamped titles. Likely GoDaddy auto-generation; not curated, no descriptions/sections like ours.
- **Answer-first formatting: genuinely good.** Pages are structured as Q&A ("What is a Star Citizen Free Fly?", "When is the next wipe?", "How do I know the referral code worked?") with direct one-sentence answers followed by elaboration — textbook GEO copy, no schema to back it.
- **Freshness stamps: aggressive and mostly maintained** on core pages — `(2026, 4.8.3)` in titles AND in llms.txt titles, "(July 2026, 4.8.3)" on the free-fly page, on-page "Last Updated" dates. But: homepage on-page stamp says 22 Sep 2025 under a 2026 title; sky/space-citizen titles still say 2025; Google cache shows "(2026, 4.8.2)" for the enlist page (they bump, Google lags).
- **Sources/citations:** occasional deep links to RSI support articles (min-specs, refunds FAQ) and Spectrum threads — better than typical fansites, but no PageSources/claims discipline; the free-fly page still cites an "alpha 4.0.1 current issues" Spectrum thread (stale).
- Given Copilot/Bing's known fondness for exactly this kind of stamped Q&A copy, they're a real threat in AI answers **despite** zero schema. Add their money queries ("next star citizen wipe", "star citizen free fly July 2026", "best starter ship") to the 13-query AI-search benchmark battery to confirm.

## 4. Content Quality & Fact Spot-Checks

Depth: core pages run ~600–1,900 words of real content; starter-ship and can-i-run pages are the deepest. Tone: patient, new-player-first, plain English — same register as dayonecitizen.

Spot-checked claims (5):

| Claim | Verdict |
|---|---|
| Referral bonus = 50,000 UEC, free | ✅ Correct (matches RSI + our ledger) |
| Citizen Starter Pack = Aurora MkII, $45, 25% discounted; updated 25 Mar 2026; Aurora MR pack removed 29 May 2025 | ✅ Verified via RSI pledge page + independent sites; impressively current, with dated change-log facts |
| Duelist Starter Pack $75 (Avenger Titan); Privateer Pack $125 (Cutlass Black) | ✅ Consistent with current 2026 pack lineup |
| Next wipe "when 4.9 releases in mid-to-late July 2026"; 4.8 included modified LTP+rep wipe | ⚠ Plausible/current speculation, clearly framed; verify against our event tracker |
| Next Free Fly "expected on or around 16 July 2026 for Foundation Festival"; 4–5 Free Flys/year, 7–10 days each; Jan 2025 Red Festival Free Fly cancelled | ✅/⚠ Cadence facts correct; the 16 Jul prediction is unannounced speculation (they label it as such). Cross-check vs freeflyevent events.ts — if Foundation Fest Free Fly is real and we're not front-running it, fix that this week |
| Download "over 70GB" | ⚠ Understated for 2026 (live install is comfortably ~100 GB+); technically-true-but-stale phrasing |
| "5000 bonus in-game credits" (download page) | ❌ Stale — contradicts their own 50,000 elsewhere |

Staleness profile: fresh core (5 of 9 money pages touched Jun–Jul 2026), rotten periphery (blog 20+ months dead, misnomer pages 2+ years, homepage date stamp 10 months old).

## 5. Technical

- **Stack:** GoDaddy Website Builder 8.0 (Starfield), server `DPS/2.0.0-beta`, GoDaddy hosting. No framework, no build pipeline. `cache-control: max-age=30` everywhere.
- **Weight:** 100–157 KB of HTML per page before assets; builder-generated markup; expect mediocre LCP/CWV vs our static Next.js sites.
- **URL hygiene:** literal `?` and `&` in slugs (`/what-is-a-wipe%3F`, `/how-to-download-%26-install`) — encoding-fragile, share/crawl-risky, and locked in by their builder.
- **No canonical tags on any page** + duplicate `/f/` blog paths already leaking into SERPs.
- **robots.txt:** 2 lines (`Disallow: /404`). No AI-crawler directives either way.
- **No analytics-visible A/B or event tracking; no OG-optimized social layer observed.**
- They rank: own their brand SERP and appear alongside starcitizen.tools, scfocus.org, citizen-logbook, starcitizenreferralprogram.com and **our dayonecitizen /starter-package** in referral/starter SERPs.

## 6. Worth Mimicking

1. **A "wipe" page.** "What is a wipe / when is the next wipe" is a recurring, high-anxiety, high-intent new-player query tied to every patch cycle — they own it, we have nothing. Evergreen page + per-patch prediction update = exactly our playbook.
2. **Misnomer-capture pages** ("Sky Citizen", "Space Citizen"). Zero-competition typo/confusion queries funneled into the beginner guide. Cheap satellite-page play (candidates: dayonecitizen or o7meaning pattern; also "Star Citizens", "Citizen Star").
3. **Dated change-log facts inside evergreen pages** ("Aurora MR pack removed 29 May 2025", "Citizen Starter Pack updated to Aurora MkII on 25 March 2026"). Very LLM-quotable; strengthens freshness signals. Adopt in our starter-package + referral pages.
4. **Forward-looking event prediction with honest framing** ("not officially announced, expected on or around 16 July 2026"). freeflyevent should always carry a labeled next-window prediction, not just confirmed events.
5. **Referral promo-window tracking** ("special referral bonus period" — recruit spends $40, gets bonus ship). Add a small auto-checkable section to dayonecitizen /referral-code.
6. **Patch stamp in the on-page month granularity** ("July 2026, 4.8.3") on time-sensitive pages.

## 7. Gaps We Exploit

1. **Zero structured data.** No FAQPage/HowTo/Article/DefinedTerm anywhere vs our fully GEO-armed network. Their Q&A copy is schema-ready and they can't ship schema on GoDaddy builder without pain.
2. **Platform ceiling.** GoDaddy builder = no canonicals, ugly encoded URLs, heavy pages, duplicate `/f/` paths, no IndexNow, no llms.txt curation, no CWV headroom. They cannot out-engineer us.
3. **Stale periphery.** 41 dead blog posts (3.18-era release speculation, 2023 events) still indexed under their domain authority; homepage "Last Updated 22 Sep 2025"; 5,000-UEC stale figure on the install page; 4.0.1 Spectrum citation. Our claims-ledger + stale.mjs discipline is a durable advantage — their equivalent failures are visible right now.
4. **No sources discipline.** We cite comm-links with PageSources; they occasionally link a support article. AI engines increasingly reward citation density.
5. **Fact-check wedge candidates:** the "24-hour referral window" claim (verify → publish the correct rule with source), and "download is over 70GB" (publish the real current install size, patch-stamped).
6. **Narrow surface.** 9 money pages, no keybinds/ships-database/orgs/trading content, no CCU coverage, blog abandoned. Every adjacent query is uncontested by them.
7. **Single point of failure freshness.** One hobbyist manually re-stamping pages; our verify-referral ritual + event tracker + scripts scale past them on every patch cycle.

## 8. Action List

- [ ] **Build a wipe page** — "Star Citizen Wipes Explained + When Is the Next Wipe? (2026, 4.8.x)" on dayonecitizen (hub authority) with FAQPage schema, claims-ledger entries for wipe history, updated each patch cycle. Direct counter to their strongest unique page.
- [ ] **freeflyevent: front-run Foundation Festival 2026.** Confirm via sc-event-tracker whether a Free Fly window ~16 Jul 2026 is expected; publish a labeled prediction now (they already have; the event is days away).
- [ ] **sc-fact-check the 24-hour referral-window claim**; if false/imprecise, add the sourced correct rule to dayonecitizen /referral-code as a differentiator ("other sites tell you X — the official FAQ says Y").
- [ ] **Add dated change-log facts** (Aurora MkII pack swap 25 Mar 2026, Aurora MR removal 29 May 2025 — verify both via ledger first) to dayonecitizen /starter-package.
- [ ] **Publish current install size** (sourced, patch-stamped) on SCH /install — beats their stale "70GB".
- [ ] **Spin up misnomer pages** ("sky citizen", "space citizen" variants) — decide placement (o7meaning pattern vs dayonecitizen satellites); their versions are 2+ years stale and beatable.
- [ ] **Add to AI-search benchmark battery:** "when is the next star citizen wipe", "star citizen free fly july 2026", "best star citizen starter ship 2026" — measure whether startstarcitizen.com is being cited by Copilot/Bing at our expense (re-run ~Jul 28 with existing 13-query battery).
- [ ] **Monitor list:** add startstarcitizen.com next to starcitizenreferrals.com in the monthly verify-referral ritual notes; re-crawl core-page stamps monthly (they re-stamp ~patch cadence). Also seen in the same SERPs: scfocus.org, citizen-logbook.com, starcitizenreferralprogram.com, starcitizencodereferral.com.

---
*Method note: full HTML crawl of all 17 website-sitemap URLs + sitemap/robots/llms.txt on 2026-07-12; JSON-LD, referral links, headings, stamps and claim excerpts extracted programmatically; prices/bonus verified against RSI pledge page and independent 2026 sources via web search. Blog posts assessed via sitemap + SERP only.*
