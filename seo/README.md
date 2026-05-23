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
