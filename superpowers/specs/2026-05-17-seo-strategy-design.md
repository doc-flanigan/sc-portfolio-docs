# SEO Strategy Design — SC Domain Portfolio
**Date:** 2026-05-17  
**Status:** Approved — implementation plan in progress  
**Scope:** All 10 live sites in the sc-portfolio network  

---

## 1. Goals

Drive referral signups through organic search by building a coordinated two-engine authority network across all portfolio sites. Every SEO decision is subordinate to one mission: deliver genuine plain-English value to real people searching for Star Citizen information, and earn their trust before asking for a referral click.

This document is both a human strategy reference and a contract that future Claude agents must follow. Do not add cross-site links, change keyword targets, or restructure site content without checking this document first.

---

## 2. Network Architecture

### Two-Engine Authority Model

The portfolio has two existing search authority footholds — one per major engine. The strategy uses both as hubs to inject authority into the wider network.

**Google engine (transitional → permanent)**
```
StarCitizenHelp.com  ──── cross-links + eventual 301s ────▶  dayonecitizen.com
  Google authority now                                         Google destination
  Light content investment                                     Absorbs authority
  Sunset via 301 in 6–18 months                               on migration
                                                                     │
                                              ┌──────────────────────┤
                                              ▼                      ▼
                                     screferralreward.com     screferralbonus.com
                                     bestspacesim.com         pledgemeaning.com
                                     fundedgame.com           o7meaning.com
                                     iheldtheline.com
                                     (satellite sites)
```

**Bing engine (permanent)**
```
freeflyevent.com  ──── cross-links ────▶  dayonecitizen.com
  Bing authority, permanent                screferralreward.com
  Event-driven traffic spikes
  Highest-intent audience in portfolio
```

### Cross-Linking Discipline

- Every cross-site link must be **contextual/editorial** — placed inside body copy where it genuinely helps the reader
- Never place cross-portfolio links in footer link lists, sidebar widgets, or standalone "related sites" blocks
- StarCitizenHelp cross-links flow toward dayonecitizen specifically (warming up the migration destination, not diluting authority across the network)
- Each satellite site links primarily to dayonecitizen and freeflyevent — the two hubs — not to each other

---

## 3. Phased Roadmap

### Phase 1 — Quick Wins (Months 1–3)

**StarCitizenHelp optimization (do not add new content — optimize existing):**

| Page | Current Position | Impressions | Problem | Fix |
|---|---|---|---|---|
| Adding friends guide | 6.85 | 199 | Ranking well, CTR could improve | Sharpen title tag, add FAQ schema |
| In-game shops directory | 8.14 | 119 | **0% CTR at position 8** — broken meta description | Rewrite meta description urgently |
| Tools page | 10.96 | 112 | Too generic for calculator keywords | Target specific calculator queries in title |
| Food/drink/survival | 5.77 | 66 | Almost top 5 | One content expansion pass |
| CCU chains guide | 7.44 | 54 | Near page 1 | Internal link boost from other guides |

**Foundation (all sites):**
- Verify sitemap.xml is live and submitted in GSC for all 10 sites
- Verify Bing Webmaster Tools is set up for all 10 sites (freeflyevent is confirmed; verify others)
- Add JSON-LD structured data: `WebSite` + `BreadcrumbList` on all sites; `Article` on guide pages; `FAQPage` on definition funnel sites (o7meaning, pledgemeaning)
- Add editorial cross-links from StarCitizenHelp guides → dayonecitizen in guide body copy

### Phase 2 — Build + Migration Prep (Months 2–6)

**dayonecitizen.com content build:**
- Create "Beyond the Basics" section with these pages migrated from StarCitizenHelp:
  - CCU chains guide
  - Ship equipment guide
  - In-game shops directory
  - Inventory management guide
- Integrate tutorial-adjacent StarCitizenHelp guides as supplementary pages within relevant tutorial steps:
  - Adding friends → supplement to the social/party tutorial step
  - Food/drink/survival → supplement to the survival tutorial step
  - Party management → supplement to the multiplayer tutorial step
- Tools page equivalent confirmed live at dayonecitizen.com/tools before any StarCitizenHelp redirect

**Cross-linking buildout:**
- freeflyevent → dayonecitizen + screferralreward editorial links live
- All satellite sites: audit existing cross-links against the map in Section 5 and fill gaps

**Satellite site content:**
- One pillar page + 2–3 cluster pages per satellite site (see Section 4 for keyword targets)
- Community channel placeholder pages on dayonecitizen (YouTube, Reddit, Discord links) so Google sees the brand ecosystem forming

### Phase 3 — Migration + Authority Transfer (Months 6–18)

**StarCitizenHelp sunset sequence (do not redirect until dayonecitizen equivalent is confirmed live):**

| StarCitizenHelp URL | dayonecitizen.com destination |
|---|---|
| /game-guides/adding-friends-contacts | /tutorial/[social step] or /beyond-the-basics/adding-friends |
| /game-guides/food-drink-survival | /tutorial/[survival step] or /beyond-the-basics/food-drink |
| /game-guides/party-management | /tutorial/[multiplayer step] or /beyond-the-basics/party-management |
| /game-guides/ccu-chains | /beyond-the-basics/ccu-chains |
| /game-guides/in-game-shops-directory | /beyond-the-basics/shops-directory |
| /game-guides/ship-equipment | /beyond-the-basics/ship-equipment |
| /game-guides/inventory-management | /beyond-the-basics/inventory-management |
| /tools | /tools |
| /* (everything else) | / (homepage) |

**Migration steps:**
1. Confirm dayonecitizen equivalent page is live and indexed
2. Add 301 redirect in StarCitizenHelp next.config.mjs
3. Submit GSC "Change of Address" tool after all redirects are in place
4. Monitor: StarCitizenHelp should lose impressions as dayonecitizen gains equivalent positions over 4–8 weeks
5. Full sunset confirmed when dayonecitizen reaches position parity on key queries (adding friends, CCU chains, shops directory)

**Community channel SEO (as channels launch):**
- YouTube channel description and video descriptions link to dayonecitizen.com
- Subreddit sidebar links to dayonecitizen.com
- Discord server links in dayonecitizen.com navigation
- Video transcripts published as guide pages on dayonecitizen (compounding content flywheel)
- Reddit FAQ threads → new cluster pages on dayonecitizen

---

## 4. Keyword Targets Per Site

### dayonecitizen.com (Google destination hub)
**Primary:** "star citizen new player guide", "how to start star citizen", "star citizen beginner guide", "star citizen tutorial", "what is star citizen"  
**Secondary (Beyond the Basics):** "star citizen ccu chain", "star citizen ship equipment guide", "star citizen inventory management"  
**Intent:** New player onboarding — top of funnel

### freeflyevent.com (Bing authority, permanent)
**Primary:** "star citizen free fly event", "star citizen free fly 2026", "is star citizen free to play", "when is the next star citizen free fly", "star citizen free fly dates"  
**Intent:** Event — highest conversion intent in the portfolio. Every Free Fly visitor is actively trying the game right now.

### screferralreward.com (conversion funnel — new player)
**Primary:** "star citizen referral code", "rsi referral code", "star citizen referral rewards", "star citizen referral program", "star citizen enlist referral"  
**Intent:** New player referral conversion — captures the "referral code / referral rewards" keyword cluster  
**Note:** Domain is singular `screferralreward.com`. The plural `screferralrewards.com` is owned and 301-redirects here — do not use plural as the canonical domain in copy or links. Veterans already have accounts and are not the audience; do not add tier ladder, recruitment tracking, or veteran-facing content.

### screferralbonus.com (conversion funnel — new player)
**Primary:** "star citizen referral bonus", "star citizen 50000 UEC", "star citizen new player bonus", "star citizen referral code 2026"  
**Intent:** New player referral conversion — captures the "bonus / UEC" keyword cluster. Same audience as screferralreward.com, different search entry point.  
**Note:** Sister site to screferralreward.com. Both serve new players only. Do not add veteran tier ladder or recruitment content here.

### bestspacesim.com (comparison / awareness)
**Primary:** "best space sim game", "best space simulation game 2026", "star citizen vs elite dangerous", "top space sim games"  
**Intent:** Comparison — mid-funnel awareness

### pledgemeaning.com (definition funnel)
**Primary:** "what does pledge mean in star citizen", "star citizen pledge", "what is a pledge star citizen"  
**Intent:** Definition — cold traffic entering SC vocabulary

### fundedgame.com / highestfundedgame.com (story funnel)
**Primary:** "highest funded game ever", "most crowdfunded game", "most funded game", "star citizen crowdfunding record"  
**Intent:** Top-of-funnel awareness — cold traffic who don't yet know what Star Citizen is

### o7meaning.com (broadest cold traffic funnel)
**Primary:** "o7 meaning", "what does o7 mean", "o7 gaming", "o7 salute meaning", "what is o7"  
**Intent:** Definition — widest top-of-funnel. Audience comes from any gaming community (Twitch, Reddit, Discord) with zero SC context. Answer their question immediately, introduce SC naturally, funnel to dayonecitizen before hitting any referral CTA.

### iheldtheline.com (Squadron 42 funnel)
**Primary:** "squadron 42 release date", "squadron 42 gameplay", "squadron 42 story", "is squadron 42 out yet", "squadron 42 star citizen", "squadron 42 single player campaign"  
**Intent:** SC-adjacent warm traffic. Squadron 42 searchers already know the IP — bridge them to the full Star Citizen universe and referral signup.

### StarCitizenHelp.com (transitional — maintain only)
**No new keyword targeting.** Optimize existing pages for CTR only. All SEO investment on this domain goes to Phase 1 quick wins, then stops.

---

## 5. Cross-Linking Map

All links are editorial/contextual — placed in body copy, not footers or link lists.

### dayonecitizen.com → outbound
| Destination | Placement |
|---|---|
| freeflyevent.com | Weekly digest + events section whenever Free Fly is mentioned: "Try the game free — check current Free Fly event dates" |
| screferralreward.com | Tutorial sign-up step: "Use a referral code when you enlist to get 50,000 UEC" |
| bestspacesim.com | "Why Star Citizen" or comparison context |
| o7meaning.com | Glossary entry for o7 |
| fundedgame.com | "About the Game" background section: "the highest-funded game in history" |

### freeflyevent.com → outbound
| Destination | Placement |
|---|---|
| dayonecitizen.com | Prominent "New to Star Citizen? Start here" callout — highest-priority link on the site. This is the hottest audience in the portfolio. |
| screferralreward.com | "Claim your 50,000 UEC referral bonus when you enlist" |

### screferralreward.com → outbound
| Destination | Placement |
|---|---|
| dayonecitizen.com | "New player? Get your Day One guide first" |
| freeflyevent.com | "Check if there's a Free Fly event — try the game before you buy" |
| screferralbonus.com | Link sparingly — only when content naturally distinguishes the two (e.g. "looking for just the signup bonus? see screferralbonus.com") |

### screferralbonus.com → outbound
| Destination | Placement |
|---|---|
| dayonecitizen.com | "New player guide" CTA — secondary to the referral CTA, but always present |
| freeflyevent.com | "Try the game free during a Free Fly event before you buy" |

### bestspacesim.com → outbound
| Destination | Placement |
|---|---|
| dayonecitizen.com | "Getting started with Star Citizen" CTA after Star Citizen review section |
| freeflyevent.com | "Try Star Citizen free during Free Fly events" |

### pledgemeaning.com → outbound
| Destination | Placement |
|---|---|
| dayonecitizen.com | "New player guide" CTA |
| screferralreward.com | "Get a referral bonus when you make your first pledge" |

### fundedgame.com → outbound
| Destination | Placement |
|---|---|
| dayonecitizen.com | "Start playing — Day One guide for new players" CTA |
| freeflyevent.com | "Try it free during a Free Fly event first" |

### o7meaning.com → outbound
| Destination | Placement |
|---|---|
| dayonecitizen.com | Primary funnel link: "o7 is the Star Citizen community salute — if you're new to the game, start here" |

### iheldtheline.com → outbound
| Destination | Placement |
|---|---|
| dayonecitizen.com | "Ready to jump into the full Star Citizen universe? Start here" |
| freeflyevent.com | "Try Star Citizen free during a Free Fly event" |
| screferralreward.com | "Get 50,000 UEC when you enlist" |

### StarCitizenHelp.com → outbound (transitional only)
| Destination | Placement |
|---|---|
| dayonecitizen.com | Footer of every guide page: "Looking for a complete new player guide?" |
| freeflyevent.com | In any event-related guide content |

---

## 6. Technical SEO Checklist (All Sites)

Apply to all 10 live sites. Track completion in `docs/seo/pending-and-status.md`.

### Indexing
- [ ] `sitemap.xml` live and returning valid XML
- [ ] `sitemap.xml` submitted in Google Search Console
- [ ] `sitemap.xml` submitted in Bing Webmaster Tools
- [ ] `robots.txt` present and not blocking crawlable pages
- [ ] GSC ownership verified for all 10 domains
- [ ] Bing Webmaster Tools verified for all 10 domains

### On-Page
- [ ] Unique `<title>` and `<meta description>` on every page (no duplicates)
- [ ] Single `<h1>` per page
- [ ] Canonical tags on all pages (`<link rel="canonical">`)
- [ ] No orphan pages (every page reachable via internal link)

### Structured Data (JSON-LD)
- [ ] `WebSite` schema on all homepages
- [ ] `BreadcrumbList` on all inner pages
- [ ] `Article` schema on all guide/blog pages
- [ ] `FAQPage` schema on definition funnel sites: o7meaning.com, pledgemeaning.com
- [ ] `Event` schema on freeflyevent.com for active/upcoming events

### Performance
- Next.js + Vercel handles Core Web Vitals baseline — verify with PageSpeed Insights after any major content changes
- All hero images served as WebP via Next.js Image component
- Vercel Analytics + Speed Insights enabled on all sites (cookieless — no consent banner required)

### Redirects
- [ ] o7citizen.com → dayonecitizen.com 308 redirects confirmed live
- [ ] o7citizens.com → dayonecitizen.com confirmed live
- [ ] o7citizen.gg → dayonecitizen.com confirmed live
- [ ] screferralrewards.com (plural) → screferralreward.com (singular) confirmed live ✅ (owner confirmed)
- [ ] highestfundedgame.com + mostfundedgame.com → fundedgame.com confirmed live

---

## 7. Documentation Structure

The full SEO strategy lives in `docs/seo/` at the sc-portfolio root. This is the authoritative reference — CLAUDE.md files in each site repo point here.

```
docs/seo/
  README.md                   ← entry point; links to all topic files
  keyword-research.md         ← keyword targets per site (mirrors Section 4)
  internal-linking.md         ← cross-linking map (mirrors Section 5)
  redirects.md                ← all active redirects across the portfolio
  migration-plan.md           ← StarCitizenHelp sunset sequence (mirrors Section 3 Phase 3)
  pending-and-status.md       ← technical SEO checklist status per site
  legal-and-privacy.md        ← Tier 2 analytics decision, privacy policy standard
  sites/
    _template.md              ← blank template for new sites
    dayonecitizen.md
    starcitizenhelp.md
    freeflyevent.md
    screferralreward.md
    screferralbonus.md
    bestspacesim.md
    pledgemeaning.md
    fundedgame.md
    o7meaning.md
    iheldtheline.md
```

### Per-Site File Format (`sites/<site>.md`)
Each file covers: domain, network role, primary keywords, cross-links this site sends, cross-links this site receives, current GSC/Bing status, open tasks.

---

## 8. CLAUDE.md SEO Block (Per Site)

Add the following section to each site's CLAUDE.md. This ensures every future Claude session in any site repo knows the SEO strategy without reading the full docs/seo/ directory.

```markdown
## SEO

**Network role:** [hub / satellite / transitional authority lender]
**Search engine:** [Google / Bing / both]

**Primary keywords:**
- [keyword 1]
- [keyword 2]
- [keyword 3]

**Cross-links this site must send:**
- → [destination]: "[anchor text context]"
- → [destination]: "[anchor text context]"

**Do not:**
- Add cross-portfolio links in footers or link lists — editorial/body only
- Target new keywords not listed above without updating docs/seo/

**Full strategy:** `E:\Claude Code\sc-portfolio\docs\seo\README.md`
```

### SHARED_CONVENTIONS.md Addition

Add a `## SEO Network Rules` section to `SHARED_CONVENTIONS.md` with:
- The two-engine authority model summary (3–4 sentences)
- The cross-link discipline rule (editorial/contextual only)
- The StarCitizenHelp transitional status and migration direction
- Pointer to `docs/seo/README.md`

This loads into every site session that reads SHARED_CONVENTIONS.md.

---

## 9. Measurement & Cadence

### Tools
- **Google Search Console** — primary measurement for all Google traffic
- **Bing Webmaster Tools** — primary measurement for Bing (freeflyevent.com is the anchor; watch position transfer to other sites as cross-links build)
- **Vercel Analytics + Speed Insights** — cookieless, no consent banner required
- **Click tracking** (`/api/log`) — referral CTA clicks → Google Sheet + Discord (already live on all sites)

### Monthly Review
1. Pull GSC position report for StarCitizenHelp — track Phase 1 quick-win pages
2. Pull GSC position report for dayonecitizen — watch for growth as cross-links accumulate
3. Check freeflyevent Bing positions — confirm authority is holding during cross-link buildout
4. Update `docs/seo/pending-and-status.md` with completed technical checklist items

### Migration Trigger
Begin Phase 3 StarCitizenHelp redirects when:
- dayonecitizen equivalent page is confirmed live and indexed (GSC shows impressions)
- StarCitizenHelp page has been cross-linking to dayonecitizen for at least 60 days
- Do not rush the trigger — premature redirects before dayonecitizen has authority on the query will cause a temporary traffic drop

---

## 10. Future Domain Assets (Undeveloped)

These domains are owned but not deployed. Do not build or redirect them without a strategy discussion first — each represents a distinct keyword opportunity that should be planned before any dev work starts.

| Domain | Likely keyword opportunity | Natural network role |
|---|---|---|
| **42ndsquadron.com** | "42nd squadron star citizen", squadron/org community queries | Complements iheldtheline.com (both Squadron 42 adjacent); could be a player org hub or Sq42 lore/community site |
| **o7citizen.gg** | .gg TLD carries strong gaming-community credibility; same o7 brand equity as the redirect chain | Could redirect to dayonecitizen.com, or become a gaming-community-specific entry point distinct from the .com |
| **millionmilehighclub.com** | Exploration-focused players; the "Mile High Club" phrase has broad recognition outside SC | Top-of-funnel awareness play for exploration/travel content; natural funnel to dayonecitizen.com |

**Decision rule:** Before deploying any of these, determine (a) whether it earns its own GSC property or redirects, and (b) which existing site it feeds in the cross-linking map.

---

## 11. Decisions Log

| Date | Decision | Reason |
|---|---|---|
| 2026-04-29 | Hybrid doc format (human + agent-readable) | Single source of truth that serves both strategy reference and agent contract |
| 2026-04-29 | Tier 2 analytics (Vercel only, no GA4) | SC audience is heavily EU/UK (GDPR); banners tank Core Web Vitals; privacy-first is on-brand |
| 2026-04-29 | Per-site docs/seo/sites/ structure | Each site needs its own keyword map; a single flat file gets unwieldy |
| 2026-05-17 | Approach A: Two-engine authority network | Two existing footholds (Google + Bing) — network effect beats consolidation |
| 2026-05-17 | StarCitizenHelp: medium sunset timeline (6–18 months) | Light content investment while dayonecitizen mirrors content; authority transfers via 301 |
| 2026-05-17 | Migrate only Game Guides + Tools from StarCitizenHelp | dayonecitizen content is strong; only gaps are game guides and tools |
| 2026-05-17 | "Beyond the Basics" section on dayonecitizen | Keeps 12-step tutorial clean while giving intermediate guides a proper home |
| 2026-05-17 | CLAUDE.md + SHARED_CONVENTIONS.md as strategy persistence layer | Memory system is path-specific; CLAUDE.md travels with each repo |
