# Shared Conventions — Design Spec
**Date:** 2026-04-29
**Status:** Approved

## Problem

Network-wide facts (referral URL, hub URL, footer text) and working rules (tone, commit convention) are duplicated across 7 site CLAUDE.md files. When they change, every file drifts independently.

## Decision

Single `SHARED_CONVENTIONS.md` at the `/sc-portfolio` root (Option B). Each site CLAUDE.md keeps a 3-line Quick Reference block inline for fast lookup, and replaces all other duplicated sections with a one-line pointer to the shared file.

## File Location

```
E:\Claude Code\sc-portfolio\SHARED_CONVENTIONS.md
```

Not inside any individual site repo. Accessible from any site session via absolute path.

## Structure

```
Part 1 — Network Facts
  Quick Reference        3-line block; also embedded in each site CLAUDE.md
  Referral Details       Code, enlist URL, bonus amount
  Hub URL                dayonecitizen.com canonical; o7citizen.com legacy
  Footer Spec            Verbatim text for all 3 footer items
  Tech Stack             Next.js 14 · TypeScript · Tailwind · Vercel · build rule

Part 2 — Working Rules
  Tone Rules             7 plain-English rules from dayonecitizen CLAUDE.md
  Commit Convention      feat/fix/seo/docs/chore
  Agentic Build Pattern  Incremental agents, confirm-before-proceeding rule
```

## What Is Excluded (and Why)

- **24h grace period warning** — removed from all sites per user decision 2026-04-29
- **Authoritative sources list** — owned by sc-news and sc-fact-check agents; including it here creates a second copy to keep in sync
- **Color palettes** — site-specific, stay in each CLAUDE.md
- **Page routes and component specs** — site-specific, stay in each CLAUDE.md

## Site CLAUDE.md Update Pattern

Each site CLAUDE.md gets two changes:

1. **Quick Reference block added near the top:**
```
## Quick Reference
Referral code: STAR-GCQJ-N6NC
Enlist URL: https://www.robertsspaceindustries.com/enlist?referral=STAR-GCQJ-N6NC
Hub: https://dayonecitizen.com
Full network conventions: E:\Claude Code\sc-portfolio\SHARED_CONVENTIONS.md
```

2. **Duplicate sections replaced** with:
```
## Network Conventions
See `E:\Claude Code\sc-portfolio\SHARED_CONVENTIONS.md` for footer spec,
tone rules, commit convention, tech stack, and agentic build pattern.
```

Sections to remove from each CLAUDE.md:
- Footer Spec / Footer: Standard three-section (all variants)
- Commit Convention (all variants)
- Tech stack if restated
- Hub Link line (kept in Quick Reference instead)
- Referral URL line (kept in Quick Reference instead)

## Data Accuracy Rule (site-specific, not shared)

The hard verification rule ("READ THIS BEFORE EDITING DATA") is **not** in Shared Conventions — it is site-specific. Current status:
- `screferralreward-site` — already has it ✅
- `freeflyevent-site` — add it (same events data pattern, same risk)
- `fundedgame-site` — future consideration (funding numbers get stale)
- All others — lower risk, no structured data layer requiring it

## Hub URL Note

All site CLAUDE.md files currently reference `https://o7citizen.com` as the hub. The canonical hub is now `https://dayonecitizen.com` (renamed April 2026; old domain 308-redirects). The Quick Reference block and SHARED_CONVENTIONS.md will use `dayonecitizen.com`. Existing site CLAUDE.md inline references will be updated in the same pass.
