# Claims Ledger

Central registry of fact-checked claims used across the Doc_Flanigan Star Citizen fan-site
network. One markdown file per claim. This is the **single source of truth** for what has
been verified, against which official CIG source, when, and where the claim appears on our
pages.

**Why this exists** (2026-07-03/04 evidence): the fact-checker called a TRUE claim
(Cavill = Enright, comm-link 20401) inaccurate because prior verification wasn't queryable;
StarCitizenHelp and freeflyevent contradicted each other on referral mechanics; "hundreds of
millions" went stale with no map of which pages needed updating; six event records had
drifted wrong. Absence of confirmation in a fresh search is NOT refutation — check here first.

## Schema

One file per claim: `docs/claims/<id>.md`

```markdown
---
id: short-kebab-slug
claim: "The canonical claim text, one sentence."
status: verified            # verified | unverifiable | refuted
sources:
  - https://official-cig-source-url
lastVerified: 2026-07-03    # date the source was last checked
usage:
  - site.com /page — section or component
  - repo-name/src/data/file.ts — canonical data record
---

Free-form notes: verification details, gotchas, wording nuances, incident history.
```

Keep it minimal — friction kills the ledger. `usage` lines are `site + page + section`,
best effort; data-file entries point at the repo file that renders the claim.

**Statuses**
- `verified` — confirmed against an official CIG source (comm-link, RSI page, official press release).
- `unverifiable` — cannot be confirmed from official CIG sources alone (e.g. comparative
  superlatives). Sites may still use it with softened wording; the note says how.
- `refuted` — official sources contradict it. Site copy using it must be fixed; the usage
  list is the blast-radius map.

## How to query

```bash
# Is there a ledger entry touching Cavill?
grep -ril "cavill" docs/claims/

# All refuted or unverifiable claims
grep -l "status: refuted\|status: unverifiable" docs/claims/*.md

# Which pages does a claim live on?
grep -A20 "^usage:" docs/claims/funding-one-billion-may-2026.md

# Staleness sweep — oldest verifications first
node docs/claims/stale.mjs            # all, oldest first
node docs/claims/stale.mjs --days 90  # only entries older than 90 days
```

## Workflow rules (what keeps this alive)

1. **sc-fact-check / sc-event-tracker** — check the ledger BEFORE issuing any verdict
   (especially ❌ or ❓), and write every new verdict back: update `lastVerified` on
   re-confirmed claims, create files for newly verified claims, flip `status` on refuted
   ones. A ledger `verified` entry with a pinned source outranks a failed fresh search.
2. **Site content edits** — any edit that adds, changes, or removes a factual claim updates
   the matching claim file's `usage` list (or creates the claim file). Each site CLAUDE.md
   carries this rule.
3. **Staleness sweep** — periodically re-verify oldest `lastVerified` first
   (`node docs/claims/stale.mjs`). Event records and version-dependent claims go stale
   fastest.

## Later phase (not v1)

Generate per-page public "Sources" sections from the ledger — a GEO citation-trust signal.
