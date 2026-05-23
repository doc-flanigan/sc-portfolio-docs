# SEO Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `docs/seo/` documentation directory, add SEO blocks to all 10 live site CLAUDE.md files, and add an SEO Network Rules section to SHARED_CONVENTIONS.md so every future Claude session in any repo is grounded in the two-engine authority network strategy.

**Architecture:** Pure documentation and configuration — no changes to live site code. All `docs/seo/` files live in the sc-portfolio root. CLAUDE.md files in individual repos are updated by opening each repo directory and editing the file there.

**Tech Stack:** Markdown only. Run from `E:\Claude Code\sc-portfolio`.

**Spec:** `docs/superpowers/specs/2026-05-17-seo-strategy-design.md`

---

### Task 1: Create docs/seo/ Topic Files

**Files:**
- Create: `docs/seo/README.md`
- Create: `docs/seo/keyword-research.md`
- Create: `docs/seo/internal-linking.md`
- Create: `docs/seo/redirects.md`
- Create: `docs/seo/migration-plan.md`
- Create: `docs/seo/pending-and-status.md`
- Create: `docs/seo/legal-and-privacy.md`

- [ ] **Step 1: Write docs/seo/README.md**

```markdown
# SC Portfolio SEO Strategy

> Single source of truth for search engine optimization across all portfolio sites.
> This document is a contract — future Claude agents must not change keyword targets,
> add cross-site links, or restructure site content without checking here first.

**Last updated:** 2026-05-17
**Full spec:** `docs/superpowers/specs/2026-05-17-seo-strategy-design.md`

---

## Network Model

Two search-engine authority footholds drive the entire portfolio:

- **Google hub (transitional):** StarCitizenHelp.com → all cross-links point to dayonecitizen.com → sunset via 301 in 6–18 months
- **Google destination (permanent):** dayonecitizen.com — absorbs StarCitizenHelp authority on migration
- **Bing hub (permanent):** freeflyevent.com — cross-links to dayonecitizen.com and screferralreward.com

All other sites are satellites that link to the hubs. Cross-links are editorial/body copy only — never in footers or link lists.

## Sites

| Site | Role | Engine | Status |
|---|---|---|---|
| dayonecitizen.com | Google authority destination | Google | Live |
| starcitizenhelp.com | Transitional Google lender | Google | Live — sunset 6–18 mo |
| freeflyevent.com | Bing authority hub | Bing | Live |
| screferralreward.com | Conversion satellite (referral code) | Both | Live |
| screferralbonus.com | Conversion satellite (referral bonus) | Both | Live |
| bestspacesim.com | Awareness satellite (comparison) | Both | Live |
| pledgemeaning.com | Definition funnel satellite | Both | Live |
| fundedgame.com | Story funnel satellite | Both | Live |
| o7meaning.com | Broadest cold-traffic funnel | Both | Live |
| iheldtheline.com | Squadron 42 funnel | Both | Live |

## Topic Files

- [keyword-research.md](keyword-research.md) — primary keyword targets per site
- [internal-linking.md](internal-linking.md) — cross-site link map with placements
- [redirects.md](redirects.md) — all active redirects across the portfolio
- [migration-plan.md](migration-plan.md) — StarCitizenHelp sunset sequence
- [pending-and-status.md](pending-and-status.md) — technical SEO checklist per site
- [legal-and-privacy.md](legal-and-privacy.md) — analytics and privacy policy decisions
- [sites/](sites/) — per-site SEO files

## Phase Overview

- **Phase 1 (Months 1–3):** StarCitizenHelp quick wins + technical SEO foundation
- **Phase 2 (Months 2–6):** dayonecitizen Beyond the Basics + cross-link buildout
- **Phase 3 (Months 6–18):** StarCitizenHelp 301 migration → dayonecitizen

See `docs/superpowers/plans/` for the implementation plan for each phase.
```

- [ ] **Step 2: Write docs/seo/keyword-research.md**

```markdown
# Keyword Research

Primary keyword targets per site. Do not add or remove keywords without updating this file.

## dayonecitizen.com
**Intent:** New player onboarding
- "star citizen new player guide"
- "how to start star citizen"
- "star citizen beginner guide"
- "star citizen tutorial"
- "what is star citizen"
- Secondary (Beyond the Basics section): "star citizen ccu chain", "star citizen ship equipment guide"

## starcitizenhelp.com (transitional — maintain only)
**Intent:** Maintain existing rankings. No new keyword targeting.
- "how to add friends star citizen" (position ~7, 199 impressions)
- "star citizen shops directory" (position ~8, 119 impressions — 0% CTR needs fix)
- "star citizen food drink survival" (position ~6, 66 impressions)
- "star citizen ccu calculator" (position ~9)
- "star citizen tools" (position ~11, 112 impressions)

## freeflyevent.com
**Intent:** Event — highest conversion intent in the portfolio
- "star citizen free fly event"
- "star citizen free fly 2026"
- "is star citizen free to play"
- "when is the next star citizen free fly"
- "star citizen free fly dates"

## screferralreward.com
**Intent:** New player referral code conversion
- "star citizen referral code"
- "rsi referral code"
- "star citizen referral rewards"
- "star citizen referral program"
- "star citizen enlist referral"
> Domain is singular `screferralreward.com` — do not use plural in copy or internal links

## screferralbonus.com
**Intent:** New player referral bonus conversion
- "star citizen referral bonus"
- "star citizen 50000 UEC"
- "star citizen new player bonus"
- "star citizen referral code 2026"

## bestspacesim.com
**Intent:** Comparison/awareness
- "best space sim game"
- "best space simulation game 2026"
- "star citizen vs elite dangerous"
- "top space sim games"

## pledgemeaning.com
**Intent:** Definition funnel
- "what does pledge mean in star citizen"
- "star citizen pledge"
- "what is a pledge star citizen"

## fundedgame.com / highestfundedgame.com
**Intent:** Story/awareness top-of-funnel
- "highest funded game ever"
- "most crowdfunded game"
- "most funded game"
- "star citizen crowdfunding record"

## o7meaning.com
**Intent:** Broadest cold traffic — any gaming community (Twitch, Reddit, Discord)
- "o7 meaning"
- "what does o7 mean"
- "o7 gaming"
- "o7 salute meaning"
- "what is o7"

## iheldtheline.com
**Intent:** Squadron 42 warm traffic
- "squadron 42 release date"
- "squadron 42 gameplay"
- "squadron 42 story"
- "is squadron 42 out yet"
- "squadron 42 star citizen"
- "squadron 42 single player campaign"
```

- [ ] **Step 3: Write docs/seo/internal-linking.md**

```markdown
# Internal Linking Map

All cross-site links must be **editorial/body copy only** — placed inside prose where the link genuinely helps the reader. Never in footers, sidebars, or "related sites" lists.

## dayonecitizen.com → outbound

| To | Placement |
|---|---|
| freeflyevent.com | Weekly digest + events section whenever Free Fly mentioned: "Try the game free — check current Free Fly event dates" |
| screferralreward.com | Tutorial sign-up step: "Use a referral code when you enlist to get 50,000 UEC" |
| bestspacesim.com | "Why Star Citizen" or comparison context in any page |
| o7meaning.com | Glossary entry for o7 |
| fundedgame.com | "About the Game" background section: "the highest-funded game in history" |

## freeflyevent.com → outbound

| To | Placement |
|---|---|
| dayonecitizen.com | Prominent "New to Star Citizen? Start here" callout — highest-priority link on the site |
| screferralreward.com | "Claim your 50,000 UEC referral bonus when you enlist" |

## screferralreward.com → outbound

| To | Placement |
|---|---|
| dayonecitizen.com | "New player? Get your Day One guide first" |
| freeflyevent.com | "Check if there's a Free Fly event — try the game before you buy" |

## screferralbonus.com → outbound

| To | Placement |
|---|---|
| dayonecitizen.com | "New player guide" CTA — always present as secondary to the referral CTA |
| freeflyevent.com | "Try the game free during a Free Fly event before you buy" |

## bestspacesim.com → outbound

| To | Placement |
|---|---|
| dayonecitizen.com | "Getting started with Star Citizen" CTA after Star Citizen review section |
| freeflyevent.com | "Try Star Citizen free during Free Fly events" |

## pledgemeaning.com → outbound

| To | Placement |
|---|---|
| dayonecitizen.com | "New player guide" CTA |
| screferralreward.com | "Get a referral bonus when you make your first pledge" |

## fundedgame.com → outbound

| To | Placement |
|---|---|
| dayonecitizen.com | "Start playing — Day One guide for new players" CTA |
| freeflyevent.com | "Try it free during a Free Fly event first" |

## o7meaning.com → outbound

| To | Placement |
|---|---|
| dayonecitizen.com | Primary funnel: "o7 is the Star Citizen community salute — if you're new to the game, start here" |

## iheldtheline.com → outbound

| To | Placement |
|---|---|
| dayonecitizen.com | "Ready to jump into the full Star Citizen universe? Start here" |
| freeflyevent.com | "Try Star Citizen free during a Free Fly event" |
| screferralreward.com | "Get 50,000 UEC when you enlist" |

## starcitizenhelp.com → outbound (transitional only)

| To | Placement |
|---|---|
| dayonecitizen.com | Footer of every guide page: "Looking for a complete new player guide?" |
| freeflyevent.com | In any event-related guide content |
```

- [ ] **Step 4: Write docs/seo/redirects.md**

```markdown
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
```

- [ ] **Step 5: Write docs/seo/migration-plan.md**

```markdown
# StarCitizenHelp Migration Plan

**Timeline:** 6–18 months (medium sunset — light content investment while dayonecitizen mirrors content)
**Goal:** Transfer StarCitizenHelp's Google authority to dayonecitizen.com via 301 redirects after equivalent content is live and indexed.

## Pre-conditions (must ALL be true before any redirect goes live)

1. dayonecitizen.com equivalent page is live and confirmed indexed in GSC (impressions visible)
2. The StarCitizenHelp page has been cross-linking to dayonecitizen.com for at least 60 days
3. dayonecitizen /tools page confirmed live and indexed

Do NOT rush. Premature redirects before dayonecitizen has authority on the query cause a temporary traffic drop that can take weeks to recover.

## Page-by-Page Redirect Map

| StarCitizenHelp page | dayonecitizen destination | dayonecitizen page status |
|---|---|---|
| /game-guides/how-to-add-friends | /beyond-the-basics/adding-friends | Plan 3 |
| /game-guides/food-drink-survival | /beyond-the-basics/food-drink-survival | Plan 3 |
| /game-guides/party-management | /beyond-the-basics/party-management | Plan 3 |
| /game-guides/ccu-chains | /beyond-the-basics/ccu-chains | Plan 3 |
| /game-guides/in-game-shops-directory | /beyond-the-basics/shops-directory | Plan 3 |
| /game-guides/ship-equipment | /beyond-the-basics/ship-equipment | Plan 3 |
| /game-guides/inventory-management | /beyond-the-basics/inventory-management | Plan 3 |
| /tools | /tools | ✅ Already live |
| /* (everything else) | / (homepage) | ✅ Already live |

## Migration Execution Steps (Phase 3)

1. Confirm all dayonecitizen Beyond the Basics pages are live and indexed (check GSC — impressions > 0)
2. Add all redirects to `StarCitizenHelp-live/next.config.ts` in a single commit
3. Push to main → Vercel auto-deploys
4. Go to Google Search Console → Settings → Change of Address → select starcitizenhelp.com → dayonecitizen.com
5. Monitor weekly: StarCitizenHelp impressions should fall, dayonecitizen impressions should rise for the same queries
6. Full sunset confirmed when dayonecitizen reaches position parity on key queries (adding friends, CCU chains, shops directory)

## Monitoring Queries (check monthly in GSC)

- "how to add friends star citizen" — should shift from starcitizenhelp to dayonecitizen
- "star citizen ccu calculator" — same
- "star citizen shops directory" — same
- "star citizen food drink survival" — same
```

- [ ] **Step 6: Write docs/seo/pending-and-status.md**

```markdown
# Technical SEO Checklist — Status Per Site

Updated: 2026-05-17. Check off items as completed. Open a session in sc-portfolio root to update this file.

## Legend
✅ Confirmed live | ⬜ Not done | ❓ Unknown / needs verification

## Indexing

| Site | sitemap.xml live | GSC verified | Bing WMT verified |
|---|---|---|---|
| dayonecitizen.com | ⬜ Verify | ⬜ Verify | ⬜ Verify |
| starcitizenhelp.com | ⬜ Verify | ⬜ Verify | ⬜ Verify |
| freeflyevent.com | ⬜ Verify | ⬜ Verify | ✅ Has Bing authority |
| screferralreward.com | ⬜ Verify | ⬜ Verify | ⬜ Verify |
| screferralbonus.com | ✅ (Agent 7 complete) | ⬜ Verify | ⬜ Verify |
| bestspacesim.com | ⬜ Verify | ⬜ Verify | ⬜ Verify |
| pledgemeaning.com | ⬜ Verify | ⬜ Verify | ⬜ Verify |
| fundedgame.com | ⬜ Verify | ⬜ Verify | ⬜ Verify |
| o7meaning.com | ✅ (Agent 6 complete) | ⬜ Verify | ⬜ Verify |
| iheldtheline.com | ⬜ Verify | ⬜ Verify | ⬜ Verify |

## Structured Data (JSON-LD)

| Site | WebSite | BreadcrumbList | Article (guides) | FAQPage | Event |
|---|---|---|---|---|---|
| dayonecitizen.com | ⬜ | ⬜ | ⬜ | ⬜ | n/a |
| starcitizenhelp.com | ⬜ | ⬜ | ✅ (in guides.ts jsonLd) | ⬜ | n/a |
| freeflyevent.com | ⬜ | ⬜ | n/a | ⬜ | ✅ (getEventStatus) |
| screferralreward.com | ✅ OrgJsonLd | ✅ BreadcrumbsJsonLd | n/a | ✅ FaqJsonLd | ⬜ |
| screferralbonus.com | ✅ (Agent 7) | n/a | n/a | ✅ (Agent 3) | n/a |
| bestspacesim.com | ⬜ | ⬜ | ⬜ | ⬜ | n/a |
| pledgemeaning.com | ⬜ | ⬜ | ⬜ | ✅ Add | n/a |
| fundedgame.com | ⬜ | ⬜ | ⬜ | ⬜ | n/a |
| o7meaning.com | ⬜ | ✅ (in pages) | n/a | ✅ (Agent 3) | n/a |
| iheldtheline.com | ⬜ | ⬜ | n/a | ⬜ | n/a |

## Redirects

| Redirect | Status |
|---|---|
| o7citizen.com → dayonecitizen.com | ✅ Live (1:1 path 308) |
| o7citizens.com → dayonecitizen.com | ✅ Live |
| o7citizen.gg → dayonecitizen.com | ❓ Verify |
| screferralrewards.com → screferralreward.com | ✅ Live (owner confirmed) |
| highestfundedgame.com → fundedgame.com | ❓ Verify |
| mostfundedgame.com → fundedgame.com | ❓ Verify |
| www.starcitizenhelp.com → starcitizenhelp.com | ✅ Live |

## Cross-Links (per internal-linking.md)

| Site | Cross-links added |
|---|---|
| dayonecitizen.com | ⬜ Plan 2 |
| freeflyevent.com | ⬜ Plan 2 |
| screferralreward.com | ⬜ Plan 2 |
| screferralbonus.com | ⬜ Plan 2 |
| bestspacesim.com | ⬜ Plan 2 |
| pledgemeaning.com | ⬜ Plan 2 |
| fundedgame.com | ⬜ Plan 2 |
| o7meaning.com | ⬜ Plan 2 |
| iheldtheline.com | ⬜ Plan 2 |
| starcitizenhelp.com | ⬜ Plan 2 |
```

- [ ] **Step 7: Write docs/seo/legal-and-privacy.md**

```markdown
# Legal and Privacy

## Analytics Decision (settled 2026-04-29)

**Tier 2 — Vercel Analytics + Speed Insights only. No GA4.**

Rationale:
- SC audience is heavily EU/UK — GDPR applies
- Cookie consent banners tank Core Web Vitals and referral conversion rates
- Vercel Analytics is cookieless — no consent banner required
- Privacy-first framing is on-brand for a plain-English fan site

This decision is final for all 10 portfolio sites. Do not add GA4, Mixpanel, or any cookie-based analytics without a strategy discussion.

## Privacy Policy Standard

Every site must have:
- `/privacy-policy` page
- `/cookie-policy` page (noting no tracking cookies are used)
- Shared `<LegalFooter>` component with passive notice: "This site uses privacy-friendly analytics that do not track you personally."

## Footer Requirements (from SHARED_CONVENTIONS.md)

Three items required verbatim on every site:

1. **Fan disclaimer:** "This is an unofficial fan site not affiliated with Cloud Imperium Games or Star Citizen®. Star Citizen® is a registered trademark of Cloud Imperium Rights LLC."
2. **FTC disclosure:** "Affiliate Disclosure: If you create a Star Citizen account using referral code STAR-GCQJ-N6NC, the site owner (Doc_Flanigan) will receive an in-game bonus reward. You still receive your full 50,000 UEC bonus."
3. **RSI fankit badge:** `/public/images/made-by-community.png` with alt text "Made by the Star Citizen Community"

## RSI Fankit Compliance Note

starcitizenhelp.com is being sunset (6–18 months) partly due to RSI Fankit FAQ restrictions around the word "Help" implying official support. dayonecitizen.com is clearly unofficial and fan-branded — no compliance issue.
```

- [ ] **Step 8: Commit**

```bash
git add docs/seo/
git commit -m "docs(seo): add SEO strategy topic files

README, keyword-research, internal-linking, redirects,
migration-plan, pending-and-status, legal-and-privacy"
```

---

### Task 2: Create docs/seo/sites/ Per-Site Files

**Files:**
- Create: `docs/seo/sites/_template.md`
- Create: `docs/seo/sites/dayonecitizen.md`
- Create: `docs/seo/sites/starcitizenhelp.md`
- Create: `docs/seo/sites/freeflyevent.md`
- Create: `docs/seo/sites/screferralreward.md`
- Create: `docs/seo/sites/screferralbonus.md`
- Create: `docs/seo/sites/bestspacesim.md`
- Create: `docs/seo/sites/pledgemeaning.md`
- Create: `docs/seo/sites/fundedgame.md`
- Create: `docs/seo/sites/o7meaning.md`
- Create: `docs/seo/sites/iheldtheline.md`

- [ ] **Step 1: Write docs/seo/sites/_template.md**

```markdown
# [domain.com] — SEO Site File

**Network role:** [hub / satellite / transitional]
**Search engine:** [Google / Bing / both]
**GSC verified:** [yes / no / unknown]
**Bing WMT verified:** [yes / no / unknown]
**Repo:** [repo-directory-name]

---

## Primary Keywords

- "[keyword 1]"
- "[keyword 2]"
- "[keyword 3]"

## Cross-Links This Site Sends

| To | Placement |
|---|---|
| [domain] | "[body copy context]" |

## Cross-Links This Site Receives

| From | Placement |
|---|---|
| [domain] | "[body copy context]" |

## GSC Snapshot

*Update monthly from GSC export.*

| Page | Position | Impressions | CTR | Notes |
|---|---|---|---|---|
| / | — | — | — | |

## Open Tasks

- [ ] [task]
```

- [ ] **Step 2: Write docs/seo/sites/dayonecitizen.md**

```markdown
# dayonecitizen.com — SEO Site File

**Network role:** Google authority destination hub — permanent
**Search engine:** Google (primary), Bing
**GSC verified:** Verify
**Bing WMT verified:** Verify
**Repo:** dayonecitizen-main

---

## Primary Keywords

- "star citizen new player guide"
- "how to start star citizen"
- "star citizen beginner guide"
- "star citizen tutorial"
- "what is star citizen"
- Secondary (Beyond the Basics): "star citizen ccu chain", "star citizen ship equipment guide", "star citizen shops directory"

## Cross-Links This Site Sends

| To | Placement |
|---|---|
| freeflyevent.com | Weekly digest + events section when Free Fly mentioned |
| screferralreward.com | Tutorial sign-up step ("Use a referral code when you enlist") |
| bestspacesim.com | "Why Star Citizen" or comparison context |
| o7meaning.com | Glossary entry for o7 |
| fundedgame.com | "About the Game" background section |

## Cross-Links This Site Receives

| From | Placement |
|---|---|
| freeflyevent.com | "New to Star Citizen? Start here" callout |
| screferralreward.com | "New player? Get your Day One guide first" |
| screferralbonus.com | "New player guide" secondary CTA |
| bestspacesim.com | Post-review "Getting started" CTA |
| pledgemeaning.com | "New player guide" CTA |
| fundedgame.com | "Start playing" CTA |
| o7meaning.com | Primary funnel link |
| iheldtheline.com | "Jump into the full universe" CTA |
| starcitizenhelp.com | Guide footer link (transitional) |

## Open Tasks

- [ ] Verify GSC ownership in Search Console
- [ ] Verify Bing Webmaster Tools
- [ ] Add freeflyevent + screferralreward + fundedgame editorial cross-links (Plan 2)
- [ ] Build /beyond-the-basics section with 4 guide pages (Plan 3)
- [ ] Update sitemap.ts with /beyond-the-basics routes (Plan 3)
```

- [ ] **Step 3: Write docs/seo/sites/starcitizenhelp.md**

```markdown
# starcitizenhelp.com — SEO Site File

**Network role:** Transitional Google authority lender — sunset 6–18 months
**Search engine:** Google
**GSC verified:** Yes (has GSC export data)
**Bing WMT verified:** Unknown
**Repo:** StarCitizenHelp-live

---

## Primary Keywords (maintain only — no new targeting)

- "how to add friends star citizen" (position 6.85, 199 impressions — quick win target)
- "star citizen shops directory" (position 8.14, 119 impressions — 0% CTR, fix meta description)
- "star citizen food drink survival" (position 5.77, 66 impressions — close to top 5)
- "star citizen ccu calculator" (position ~9)
- "star citizen tools / fleet viewer" (position 10.96, 112 impressions)

## Cross-Links This Site Sends

| To | Placement |
|---|---|
| dayonecitizen.com | Footer of every guide page |
| freeflyevent.com | Any event-related guide content |

## Cross-Links This Site Receives

None — authority flows OUT from this site, not in.

## GSC Snapshot (2026-05-17 export)

| Page | Position | Impressions | CTR | Notes |
|---|---|---|---|---|
| /tools | 10.96 | 112 | 2.68% | Quick win: optimize title for calculator queries |
| /game-guides/how-to-add-friends | 6.85 | 199 | 1.01% | Quick win: improve meta, add FAQ schema |
| /enlist | 8.05 | 60 | 3.33% | Good CTR — maintain |
| /game-guides/food-drink-survival | 5.77 | 66 | 1.52% | Quick win: slight content expansion |
| /game-guides/ccu-chains | 7.44 | 54 | 1.85% | Maintain |
| /game-guides/in-game-shops-directory | 8.14 | 119 | 0% | CRITICAL: fix meta description |

## Open Tasks

- [ ] Fix in-game-shops-directory metaDescription (0% CTR — Plan 2)
- [ ] Optimize how-to-add-friends metaTitle/metaDescription + FAQ schema (Plan 2)
- [ ] Optimize food-drink-survival meta (Plan 2)
- [ ] Optimize tools page title for calculator queries (Plan 2)
- [ ] Add dayonecitizen footer cross-link to all guide contentHtml (Plan 2)
- [ ] Execute 301 migration to dayonecitizen once Phase 2 content is indexed (Plan 3)
```

- [ ] **Step 4: Write docs/seo/sites/freeflyevent.md**

```markdown
# freeflyevent.com — SEO Site File

**Network role:** Bing authority hub — permanent
**Search engine:** Bing (primary), Google
**GSC verified:** Verify
**Bing WMT verified:** Yes (confirmed Bing authority)
**Repo:** freeflyevent-site

---

## Primary Keywords

- "star citizen free fly event"
- "star citizen free fly 2026"
- "is star citizen free to play"
- "when is the next star citizen free fly"
- "star citizen free fly dates"

## Cross-Links This Site Sends

| To | Placement |
|---|---|
| dayonecitizen.com | "New to Star Citizen? Start here" callout — highest-priority link on site |
| screferralreward.com | "Claim your 50,000 UEC referral bonus when you enlist" |

## Cross-Links This Site Receives

| From | Placement |
|---|---|
| dayonecitizen.com | Weekly digest + events section |

## Open Tasks

- [ ] Add dayonecitizen "New to Star Citizen" editorial callout in homepage body (Plan 2)
- [ ] Add screferralreward link in referral bonus section (Plan 2)
- [ ] Verify GSC submitted
- [ ] Confirm Event JSON-LD is live and validating
```

- [ ] **Step 5: Write remaining per-site files (screferralreward, screferralbonus, bestspacesim, pledgemeaning, fundedgame, o7meaning, iheldtheline)**

Write each file following the `_template.md` pattern, using keyword targets from `keyword-research.md` and link placements from `internal-linking.md`. Content for each:

**docs/seo/sites/screferralreward.md:**
```markdown
# screferralreward.com — SEO Site File

**Network role:** Conversion satellite — new player referral code
**Search engine:** Both
**GSC verified:** Verify
**Bing WMT verified:** Verify
**Repo:** screferralrewards-site (GitHub slug uses plural — live domain is singular)

## Primary Keywords
- "star citizen referral code"
- "rsi referral code"
- "star citizen referral rewards"
- "star citizen referral program"
- "star citizen enlist referral"

## Cross-Links This Site Sends
| To | Placement |
|---|---|
| dayonecitizen.com | "New player? Get your Day One guide first" |
| freeflyevent.com | "Check if there's a Free Fly event — try the game before you buy" |

## Cross-Links This Site Receives
| From | Placement |
|---|---|
| dayonecitizen.com | Tutorial sign-up step |
| freeflyevent.com | Referral bonus section |
| pledgemeaning.com | "Get a referral bonus when you pledge" |
| iheldtheline.com | "Get 50,000 UEC when you enlist" |
| screferralbonus.com | Light cross-link when content distinguishes the two sites |

## Open Tasks
- [ ] Add dayonecitizen + freeflyevent editorial cross-links (Plan 2)
- [ ] Verify GSC + Bing WMT
```

**docs/seo/sites/screferralbonus.md:**
```markdown
# screferralbonus.com — SEO Site File

**Network role:** Conversion satellite — new player referral bonus
**Search engine:** Both
**GSC verified:** Verify
**Bing WMT verified:** Verify
**Repo:** screferralbonus-site

## Primary Keywords
- "star citizen referral bonus"
- "star citizen 50000 UEC"
- "star citizen new player bonus"
- "star citizen referral code 2026"

## Cross-Links This Site Sends
| To | Placement |
|---|---|
| dayonecitizen.com | "New player guide" secondary CTA — always present |
| freeflyevent.com | "Try the game free during a Free Fly event before you buy" |

## Cross-Links This Site Receives
| From | Placement |
|---|---|
| screferralreward.com | Light cross-link only |

## Open Tasks
- [ ] Add dayonecitizen + freeflyevent editorial cross-links (Plan 2)
- [ ] Swap screenshot placeholders on /how-to-use for real images
- [ ] Verify GSC + Bing WMT
```

**docs/seo/sites/bestspacesim.md:**
```markdown
# bestspacesim.com — SEO Site File

**Network role:** Comparison/awareness satellite
**Search engine:** Both
**Repo:** bestspacesim-site

## Primary Keywords
- "best space sim game"
- "best space simulation game 2026"
- "star citizen vs elite dangerous"
- "top space sim games"

## Cross-Links This Site Sends
| To | Placement |
|---|---|
| dayonecitizen.com | "Getting started with Star Citizen" CTA after Star Citizen review |
| freeflyevent.com | "Try Star Citizen free during Free Fly events" |

## Cross-Links This Site Receives
| From | Placement |
|---|---|
| dayonecitizen.com | "Why Star Citizen" comparison context |

## Open Tasks
- [ ] Add dayonecitizen + freeflyevent editorial cross-links (Plan 2)
- [ ] Verify GSC + Bing WMT
```

**docs/seo/sites/pledgemeaning.md:**
```markdown
# pledgemeaning.com — SEO Site File

**Network role:** Definition funnel satellite
**Search engine:** Both
**Repo:** pledgemeaning-site

## Primary Keywords
- "what does pledge mean in star citizen"
- "star citizen pledge"
- "what is a pledge star citizen"

## Cross-Links This Site Sends
| To | Placement |
|---|---|
| dayonecitizen.com | "New player guide" CTA |
| screferralreward.com | "Get a referral bonus when you make your first pledge" |

## Cross-Links This Site Receives
| From | Placement |
|---|---|
| dayonecitizen.com | Glossary/pledge section |

## Open Tasks
- [ ] Add dayonecitizen + screferralreward editorial cross-links (Plan 2)
- [ ] Add FAQPage JSON-LD schema
- [ ] Verify GSC + Bing WMT
```

**docs/seo/sites/fundedgame.md:**
```markdown
# fundedgame.com — SEO Site File

**Network role:** Story/awareness top-of-funnel satellite
**Search engine:** Both
**Repo:** fundedgame-site

## Primary Keywords
- "highest funded game ever"
- "most crowdfunded game"
- "most funded game"
- "star citizen crowdfunding record"

## Cross-Links This Site Sends
| To | Placement |
|---|---|
| dayonecitizen.com | "Start playing — Day One guide for new players" CTA |
| freeflyevent.com | "Try it free during a Free Fly event first" |

## Cross-Links This Site Receives
| From | Placement |
|---|---|
| dayonecitizen.com | "About the Game" background section |

## Open Tasks
- [ ] Add dayonecitizen + freeflyevent editorial cross-links (Plan 2)
- [ ] Verify highestfundedgame.com + mostfundedgame.com redirect to fundedgame.com
- [ ] Verify GSC + Bing WMT
```

**docs/seo/sites/o7meaning.md:**
```markdown
# o7meaning.com — SEO Site File

**Network role:** Broadest cold-traffic funnel satellite
**Search engine:** Both
**Repo:** o7meaning-site

## Primary Keywords
- "o7 meaning"
- "what does o7 mean"
- "o7 gaming"
- "o7 salute meaning"
- "what is o7"

## Cross-Links This Site Sends
| To | Placement |
|---|---|
| dayonecitizen.com | Primary funnel: "o7 is the Star Citizen community salute — if you're new to the game, start here" |

## Cross-Links This Site Receives
| From | Placement |
|---|---|
| dayonecitizen.com | Glossary entry for o7 |

## Notes
Audience comes from any gaming community with zero SC context (Twitch, Reddit, Discord).
Answer their question immediately. Introduce SC naturally. Funnel to dayonecitizen BEFORE hitting referral CTA.
FAQPage JSON-LD is already live (Agent 3 complete). BreadcrumbList is live in /in-star-citizen.

## Open Tasks
- [ ] Add dayonecitizen editorial cross-link in /in-star-citizen page body (Plan 2)
- [ ] Verify GSC + Bing WMT
```

**docs/seo/sites/iheldtheline.md:**
```markdown
# iheldtheline.com — SEO Site File

**Network role:** Squadron 42 funnel satellite
**Search engine:** Both
**Repo:** iheldtheline-site

## Primary Keywords
- "squadron 42 release date"
- "squadron 42 gameplay"
- "squadron 42 story"
- "is squadron 42 out yet"
- "squadron 42 star citizen"
- "squadron 42 single player campaign"

## Cross-Links This Site Sends
| To | Placement |
|---|---|
| dayonecitizen.com | "Ready to jump into the full Star Citizen universe? Start here" |
| freeflyevent.com | "Try Star Citizen free during a Free Fly event" |
| screferralreward.com | "Get 50,000 UEC when you enlist" |

## Cross-Links This Site Receives
None currently.

## Open Tasks
- [ ] Add dayonecitizen + freeflyevent + screferralreward editorial cross-links (Plan 2)
- [ ] Verify GSC + Bing WMT
- [ ] Flesh out CLAUDE.md with full project overview (site was scaffolded without a project overview section)
```

- [ ] **Step 6: Commit**

```bash
git add docs/seo/sites/
git commit -m "docs(seo): add per-site SEO files for all 10 live sites"
```

---

### Task 3: Update SHARED_CONVENTIONS.md with SEO Network Rules

**Files:**
- Modify: `SHARED_CONVENTIONS.md`

- [ ] **Step 1: Read the current end of SHARED_CONVENTIONS.md**

Run: `tail -20 SHARED_CONVENTIONS.md`

Find the last section heading to know where to append.

- [ ] **Step 2: Append SEO Network Rules section**

Add this section at the end of `SHARED_CONVENTIONS.md`:

```markdown
---

## Part N — SEO Network Rules

> Full strategy: `docs/seo/README.md`
> Per-site keyword targets: `docs/seo/keyword-research.md`
> Cross-link map: `docs/seo/internal-linking.md`

### Two-Engine Authority Model

The portfolio has two search-engine footholds. StarCitizenHelp.com holds Google authority and is transitioning that authority to dayonecitizen.com via 301 redirects over 6–18 months. freeflyevent.com holds Bing authority permanently. All other sites are satellites that link to these hubs.

### Cross-Link Discipline (applies to all sites)

- Cross-site links must be **editorial/body copy** — placed inside prose where the link genuinely helps the reader
- **Never** place cross-portfolio links in footers, sidebars, or "related sites" lists
- Authority flows from StarCitizenHelp → dayonecitizen. Do not cross-link from StarCitizenHelp to satellite sites

### Site Roles Summary

| Site | Role |
|---|---|
| dayonecitizen.com | Google authority destination — permanent hub |
| starcitizenhelp.com | Transitional Google lender → sunset 6–18 months |
| freeflyevent.com | Bing authority hub — permanent |
| screferralreward.com / screferralbonus.com | Conversion satellites — new player referral |
| bestspacesim.com / pledgemeaning.com / fundedgame.com / o7meaning.com / iheldtheline.com | Awareness/definition/story satellites |

### StarCitizenHelp Constraint

starcitizenhelp.com is being sunset due to RSI Fankit FAQ restrictions. Do not invest in new content for this domain. Optimize existing pages for CTR only (Phase 1). All cross-links from StarCitizenHelp point to dayonecitizen.com.
```

> Note: Replace "Part N" with the actual next part number after reading the file in Step 1.

- [ ] **Step 3: Commit**

```bash
git add SHARED_CONVENTIONS.md
git commit -m "docs(seo): add SEO Network Rules to SHARED_CONVENTIONS.md"
```

---

### Task 4: Add SEO Blocks to Hub CLAUDE.md Files

**Files:**
- Modify: `dayonecitizen-main/CLAUDE.md`
- Modify: `StarCitizenHelp-live/CLAUDE.md`
- Modify: `freeflyevent-site/CLAUDE.md`

Open each repo directory to edit its CLAUDE.md. Append the SEO block at the end of each file.

- [ ] **Step 1: Append SEO block to dayonecitizen-main/CLAUDE.md**

```markdown
---

## SEO

**Network role:** Google authority destination hub — permanent
**Search engine:** Google (primary), Bing

**Primary keywords:**
- "star citizen new player guide"
- "how to start star citizen"
- "star citizen beginner guide"
- "star citizen tutorial"
- "what is star citizen"

**Cross-links this site must send (body copy only):**
- → freeflyevent.com: Weekly digest + events section when Free Fly mentioned
- → screferralreward.com: Tutorial sign-up step ("Use a referral code when you enlist")
- → bestspacesim.com: "Why Star Citizen" comparison context
- → o7meaning.com: Glossary entry for o7
- → fundedgame.com: "About the Game" background section ("the highest-funded game in history")

**Do not:**
- Place cross-portfolio links in footers or link lists — editorial/body copy only
- Target new keywords without updating `E:\Claude Code\sc-portfolio\docs\seo\keyword-research.md`

**Full strategy:** `E:\Claude Code\sc-portfolio\docs\seo\README.md`
```

- [ ] **Step 2: Append SEO block to StarCitizenHelp-live/CLAUDE.md**

```markdown
---

## SEO

**Network role:** Transitional Google authority lender — sunset in 6–18 months via 301 redirect to dayonecitizen.com
**Search engine:** Google

**STATUS: Do NOT target new keywords. Light optimization of existing pages only.**

**Maintain these rankings (no new targeting):**
- "how to add friends star citizen" (position ~7, quick win)
- "star citizen shops directory" (position ~8, 0% CTR — fix meta description)
- "star citizen food drink survival" (position ~6, close to top 5)
- "star citizen tools / ccu calculator" (position ~11)

**Cross-links this site must send (body copy only):**
- → dayonecitizen.com: Footer of every guide page ("Looking for a complete new player guide?")
- → freeflyevent.com: In any event-related guide content

**Do not:**
- Add new content or target new keywords — investment in this domain stops at Phase 1 quick wins
- Cross-link to satellite sites — authority flows toward dayonecitizen.com only

**Migration plan:** `E:\Claude Code\sc-portfolio\docs\seo\migration-plan.md`
**Full strategy:** `E:\Claude Code\sc-portfolio\docs\seo\README.md`
```

- [ ] **Step 3: Append SEO block to freeflyevent-site/CLAUDE.md**

```markdown
---

## SEO

**Network role:** Bing authority hub — permanent
**Search engine:** Bing (primary), Google

**Primary keywords:**
- "star citizen free fly event"
- "star citizen free fly 2026"
- "is star citizen free to play"
- "when is the next star citizen free fly"
- "star citizen free fly dates"

**Cross-links this site must send (body copy only):**
- → dayonecitizen.com: Prominent "New to Star Citizen? Start here" callout — highest-priority link on this site
- → screferralreward.com: "Claim your 50,000 UEC referral bonus when you enlist"

**Do not:**
- Place cross-portfolio links in footers or link lists — editorial/body copy only
- Target new keywords without updating `E:\Claude Code\sc-portfolio\docs\seo\keyword-research.md`

**Full strategy:** `E:\Claude Code\sc-portfolio\docs\seo\README.md`
```

- [ ] **Step 4: Commit all three**

```bash
git -C dayonecitizen-main add CLAUDE.md && git -C dayonecitizen-main commit -m "docs(seo): add SEO block to CLAUDE.md"
git -C StarCitizenHelp-live add CLAUDE.md && git -C StarCitizenHelp-live commit -m "docs(seo): add SEO block to CLAUDE.md"
git -C freeflyevent-site add CLAUDE.md && git -C freeflyevent-site commit -m "docs(seo): add SEO block to CLAUDE.md"
```

---

### Task 5: Add SEO Blocks to Referral Site CLAUDE.md Files

**Files:**
- Modify: `screferralreward-site/CLAUDE.md` (note: GitHub repo slug uses plural, live domain is singular)
- Modify: `screferralbonus-site/CLAUDE.md`

- [ ] **Step 1: Append SEO block to screferralreward-site/CLAUDE.md**

```markdown
---

## SEO

**Network role:** Conversion satellite — new player referral code funnel
**Search engine:** Both

**Primary keywords:**
- "star citizen referral code"
- "rsi referral code"
- "star citizen referral rewards"
- "star citizen referral program"
- "star citizen enlist referral"

**Note:** Live domain is singular `screferralreward.com`. Do not use plural in copy or links. The plural `screferralrewards.com` 301-redirects here.

**Cross-links this site must send (body copy only):**
- → dayonecitizen.com: "New player? Get your Day One guide first"
- → freeflyevent.com: "Check if there's a Free Fly event — try the game before you buy"

**Do not:**
- Add veteran tier ladder or recruitment content — new players only
- Place cross-portfolio links in footers or link lists — editorial/body copy only
- Target new keywords without updating `E:\Claude Code\sc-portfolio\docs\seo\keyword-research.md`

**Full strategy:** `E:\Claude Code\sc-portfolio\docs\seo\README.md`
```

- [ ] **Step 2: Append SEO block to screferralbonus-site/CLAUDE.md**

```markdown
---

## SEO

**Network role:** Conversion satellite — new player referral bonus funnel
**Search engine:** Both

**Primary keywords:**
- "star citizen referral bonus"
- "star citizen 50000 UEC"
- "star citizen new player bonus"
- "star citizen referral code 2026"

**Cross-links this site must send (body copy only):**
- → dayonecitizen.com: "New player guide" secondary CTA — always present after the referral CTA
- → freeflyevent.com: "Try the game free during a Free Fly event before you buy"

**Do not:**
- Add veteran tier ladder or recruitment content — new players only
- Place cross-portfolio links in footers or link lists — editorial/body copy only
- Target new keywords without updating `E:\Claude Code\sc-portfolio\docs\seo\keyword-research.md`

**Full strategy:** `E:\Claude Code\sc-portfolio\docs\seo\README.md`
```

- [ ] **Step 3: Commit**

```bash
git -C screferralreward-site add CLAUDE.md && git -C screferralreward-site commit -m "docs(seo): add SEO block to CLAUDE.md"
git -C screferralbonus-site add CLAUDE.md && git -C screferralbonus-site commit -m "docs(seo): add SEO block to CLAUDE.md"
```

> Note: the screferralreward-site GitHub repo directory may be named `screferralrewards-site` (plural). Use the actual directory name when running `git -C`.

---

### Task 6: Add SEO Blocks to Satellite Site CLAUDE.md Files

**Files:**
- Modify: `bestspacesim-site/CLAUDE.md`
- Modify: `pledgemeaning-site/CLAUDE.md`
- Modify: `fundedgame-site/CLAUDE.md`
- Modify: `o7meaning-site/CLAUDE.md`
- Modify: `iheldtheline-site/CLAUDE.md`

- [ ] **Step 1: Append SEO block to bestspacesim-site/CLAUDE.md**

```markdown
---

## SEO

**Network role:** Comparison/awareness satellite
**Search engine:** Both

**Primary keywords:**
- "best space sim game"
- "best space simulation game 2026"
- "star citizen vs elite dangerous"
- "top space sim games"

**Cross-links this site must send (body copy only):**
- → dayonecitizen.com: "Getting started with Star Citizen" CTA after Star Citizen review section
- → freeflyevent.com: "Try Star Citizen free during Free Fly events"

**Do not:**
- Place cross-portfolio links in footers or link lists — editorial/body copy only

**Full strategy:** `E:\Claude Code\sc-portfolio\docs\seo\README.md`
```

- [ ] **Step 2: Append SEO block to pledgemeaning-site/CLAUDE.md**

```markdown
---

## SEO

**Network role:** Definition funnel satellite
**Search engine:** Both

**Primary keywords:**
- "what does pledge mean in star citizen"
- "star citizen pledge"
- "what is a pledge star citizen"

**Cross-links this site must send (body copy only):**
- → dayonecitizen.com: "New player guide" CTA
- → screferralreward.com: "Get a referral bonus when you make your first pledge"

**Do not:**
- Place cross-portfolio links in footers or link lists — editorial/body copy only

**Full strategy:** `E:\Claude Code\sc-portfolio\docs\seo\README.md`
```

- [ ] **Step 3: Append SEO block to fundedgame-site/CLAUDE.md**

```markdown
---

## SEO

**Network role:** Story/awareness top-of-funnel satellite
**Search engine:** Both

**Primary keywords:**
- "highest funded game ever"
- "most crowdfunded game"
- "most funded game"
- "star citizen crowdfunding record"

**Cross-links this site must send (body copy only):**
- → dayonecitizen.com: "Start playing — Day One guide for new players" CTA
- → freeflyevent.com: "Try it free during a Free Fly event first"

**Do not:**
- Place cross-portfolio links in footers or link lists — editorial/body copy only

**Full strategy:** `E:\Claude Code\sc-portfolio\docs\seo\README.md`
```

- [ ] **Step 4: Append SEO block to o7meaning-site/CLAUDE.md**

```markdown
---

## SEO

**Network role:** Broadest cold-traffic funnel satellite
**Search engine:** Both

**Primary keywords:**
- "o7 meaning"
- "what does o7 mean"
- "o7 gaming"
- "o7 salute meaning"
- "what is o7"

**Audience note:** Visitors come from any gaming community (Twitch, Reddit, Discord) with zero Star Citizen context. Answer their question immediately. Introduce SC naturally. Funnel to dayonecitizen.com BEFORE hitting the referral CTA — cold traffic needs the onboarding experience first.

**Cross-links this site must send (body copy only):**
- → dayonecitizen.com: Primary funnel in /in-star-citizen page: "o7 is the Star Citizen community salute — if you're new to the game, start here"

**Do not:**
- Place cross-portfolio links in footers or link lists — editorial/body copy only

**Full strategy:** `E:\Claude Code\sc-portfolio\docs\seo\README.md`
```

- [ ] **Step 5: Append SEO block to iheldtheline-site/CLAUDE.md**

```markdown
---

## SEO

**Network role:** Squadron 42 funnel satellite
**Search engine:** Both

**Primary keywords:**
- "squadron 42 release date"
- "squadron 42 gameplay"
- "squadron 42 story"
- "is squadron 42 out yet"
- "squadron 42 star citizen"
- "squadron 42 single player campaign"

**Cross-links this site must send (body copy only):**
- → dayonecitizen.com: "Ready to jump into the full Star Citizen universe? Start here"
- → freeflyevent.com: "Try Star Citizen free during a Free Fly event"
- → screferralreward.com: "Get 50,000 UEC when you enlist"

**Do not:**
- Place cross-portfolio links in footers or link lists — editorial/body copy only

**Full strategy:** `E:\Claude Code\sc-portfolio\docs\seo\README.md`
```

- [ ] **Step 6: Commit all five**

```bash
git -C bestspacesim-site add CLAUDE.md && git -C bestspacesim-site commit -m "docs(seo): add SEO block to CLAUDE.md"
git -C pledgemeaning-site add CLAUDE.md && git -C pledgemeaning-site commit -m "docs(seo): add SEO block to CLAUDE.md"
git -C fundedgame-site add CLAUDE.md && git -C fundedgame-site commit -m "docs(seo): add SEO block to CLAUDE.md"
git -C o7meaning-site add CLAUDE.md && git -C o7meaning-site commit -m "docs(seo): add SEO block to CLAUDE.md"
git -C iheldtheline-site add CLAUDE.md && git -C iheldtheline-site commit -m "docs(seo): add SEO block to CLAUDE.md"
```

> Note: `git -C <dir>` runs git in the given directory. Use the actual directory names as they exist in sc-portfolio — check with `ls` if unsure of the exact name.

---

### Verification

- [ ] Confirm `docs/seo/` directory contains 7 topic files + `sites/` subdirectory with 11 files (template + 10 sites)
- [ ] Confirm SHARED_CONVENTIONS.md now has a SEO Network Rules section
- [ ] Confirm all 10 site CLAUDE.md files end with a `## SEO` block
- [ ] Push all repos to GitHub (Vercel auto-deploy not triggered — no code changes)

```bash
git -C dayonecitizen-main push
git -C StarCitizenHelp-live push
git -C freeflyevent-site push
git -C screferralreward-site push
git -C screferralbonus-site push
git -C bestspacesim-site push
git -C pledgemeaning-site push
git -C fundedgame-site push
git -C o7meaning-site push
git -C iheldtheline-site push
```
