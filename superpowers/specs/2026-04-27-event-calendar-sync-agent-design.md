# sc-events — Event Calendar Sync Agent

**Date:** 2026-04-27
**Owner:** Doc_Flanigan (scott.gayden@gmail.com)
**Status:** Approved design — pending implementation plan

## 1. Purpose

Keep the Free Fly and referral-bonus event calendars across the SC domain portfolio in sync, automatically, by polling official Cloud Imperium Games (CIG) sources daily and updating a single canonical JSON file consumed at build time by every site that displays an event calendar.

## 2. Scope

### In scope

- **Free Fly events** — periods when anyone can play Star Citizen for free.
- **Referral-bonus events** — promotional periods when referral rewards are boosted.

### Out of scope

- General in-game events (Xenothreat windows, Invictus Launch Week, CitizenCon dates) — these stay in `sc-news`'s weekly digest.
- Real-world conventions, community meet-ups, dev streams.
- News / patch notes / lore — owned by `sc-news`.
- Any data not surfaced as an event calendar entry on a portfolio site.

### Consuming sites

- `o7citizen-main` (`/free-fly-events`)
- `freeflyevent-site` (entire site)
- `screferralrewards-site` (`/event-tracker`)
- `bestspacesim-site` (Free Fly section)

## 3. Architecture

```
                  ┌─────────────────────────────────────┐
                  │  CIG sources (read-only)            │
                  │  • api.star-citizen.wiki Comm-Links │
                  │  • developertracker.com/star-citizen│
                  └──────────────┬──────────────────────┘
                                 │
                       (1) daily poll, Haiku 4.5 classifier
                                 │
                                 ▼
                  ┌─────────────────────────────────────┐
                  │  sc-events agent (Anthropic remote, │
                  │   scheduled via /schedule)          │
                  │                                     │
                  │  fetch  → classify → diff → write   │
                  │  curl     Haiku       code   Sonnet │
                  └──────────────┬──────────────────────┘
                                 │
                       (2) write to canonical JSON
                                 │
                                 ▼
       ┌───────────────────────────────────────────────────┐
       │  o7citizen-main repo                              │
       │  src/data/events.json   ← single source of truth  │
       │                                                   │
       │  • clock-driven flip (UPCOMING→ACTIVE)            │
       │      → direct commit to main                      │
       │  • new entry / date edit                          │
       │      → PR on branch sc-events/update-YYYY-MM-DD   │
       └──────────────┬────────────────────────────────────┘
                      │
              (3) consuming sites fetch via ISR
                      │
       ┌──────────────┴───────────────────────────────────┐
       │ Each site fetches events.json with              │
       │ revalidate: 3600 (Next.js ISR).                 │
       │ Updates appear within ~1 hour without rebuild.  │
       └─────────────────────────────────────────────────┘
```

**Key property:** `events.json` in `o7citizen-main` is the only place state lives. The agent is stateless — every run reads sources fresh, reads the JSON fresh, recomputes.

## 4. Data contract — `src/data/events.json`

```json
{
  "schema_version": 1,
  "last_updated": "2026-04-27T14:30:00Z",
  "events": [
    {
      "id": "free-fly-2026-may-aurora",
      "type": "free-fly",
      "status": "upcoming",
      "name": "May 2026 Aurora Free Fly",
      "start": "2026-05-01T17:00:00Z",
      "end":   "2026-05-08T17:00:00Z",
      "ships_summary": "Aurora MR starter ship",
      "description_plain": "Anyone can play Star Citizen for free from May 1 through May 8, 2026, using a starter ship called the Aurora MR.",
      "source_url": "https://robertsspaceindustries.com/comm-link/...",
      "last_seen_at": "2026-04-25T03:00:00Z"
    },
    {
      "id": "referral-bonus-2026-anniversary",
      "type": "referral-bonus",
      "status": "active",
      "name": "12th Anniversary Referral Bonus",
      "start": "2026-04-25T00:00:00Z",
      "end":   "2026-05-09T23:59:59Z",
      "bonus_summary": "Doubled referral rewards — 100,000 UEC instead of the standard 50,000 UEC",
      "description_plain": "Players who sign up using a referral code between April 25 and May 9, 2026, receive 100,000 in-game money instead of the usual 50,000.",
      "source_url": "https://robertsspaceindustries.com/comm-link/...",
      "last_seen_at": "2026-04-25T03:00:00Z"
    }
  ]
}
```

### Field rules

| Field | Rule |
|---|---|
| `schema_version` | Integer. Currently `1`. Bumped on any breaking change to consumer contract. |
| `last_updated` | ISO 8601 UTC. Updated only when `events` is modified. Not updated on no-op runs. |
| `id` | Kebab-case, deterministic: `<type>-<year>-<short-name>`. Recomputed identically on every run so the agent recognises events it has seen before. |
| `type` | Discriminator: `"free-fly"` \| `"referral-bonus"`. |
| `status` | `"upcoming"` \| `"active"` \| `"past"`. Maintained by the agent. |
| `name` | Plain title from CIG announcement, lightly normalised. |
| `start` / `end` | ISO 8601 UTC. If source gives no time, default `start` to `T00:00:00Z` and `end` to `T23:59:59Z`. |
| `ships_summary` | Free Fly only. One short line. |
| `bonus_summary` | Referral Bonus only. One short line. |
| `description_plain` | One to three sentences, plain-English, abbreviation-free. Follows the prose rules in `o7citizen-main/CLAUDE.md`. |
| `source_url` | The canonical Comm-Link or Spectrum thread. |
| `last_seen_at` | ISO 8601 UTC. When the agent last verified this event in source data. |

### Consumer TypeScript shape

```typescript
type EventStatus = "upcoming" | "active" | "past";
type EventType = "free-fly" | "referral-bonus";

interface BaseEvent {
  id: string;
  type: EventType;
  status: EventStatus;
  name: string;
  start: string;
  end: string;
  description_plain: string;
  source_url: string;
  last_seen_at: string;
}

interface FreeFlyEvent extends BaseEvent {
  type: "free-fly";
  ships_summary: string;
}

interface ReferralBonusEvent extends BaseEvent {
  type: "referral-bonus";
  bonus_summary: string;
}

type SCEvent = FreeFlyEvent | ReferralBonusEvent;

interface EventsFile {
  schema_version: 1;
  last_updated: string;
  events: SCEvent[];
}
```

### Deliberate omissions

- No `description_html`, no rich text, no nested objects. Sites format in components.
- No localisation. English-only for now.
- No `created_at` separate from `last_seen_at`. Git history is the audit log.

## 5. Agents

### 5a. `sc-events` — main orchestrator + writer

- **Location:** `o7citizen-main/.claude/agents/sc-events.md` (in-repo, not user-level — needed so the `/schedule` remote agent finds it after cloning the repo).
- **Model:** `sonnet-4-6`
- **Tools:** `Bash`, `WebFetch`, `Read`, `Write`, `Grep`, `Glob`, `Task` (for invoking the classifier subagent)
- **Responsibilities:** orchestration, diff computation, prose composition (`description_plain`, `name`, `ships_summary` / `bonus_summary`), commit/PR decision, git operations.

### 5b. `sc-events-classifier` — Haiku subagent

- **Location:** `o7citizen-main/.claude/agents/sc-events-classifier.md`
- **Model:** `haiku-4-5`
- **Tools:** none beyond the model itself (it receives candidate text and returns structured JSON).
- **Responsibilities:** scan ~50–100 candidate Comm-Links and Spectrum posts, return a filtered list of `{source_url, type, confidence}` where `type ∈ {free-fly, referral-bonus, neither}`.

### 5c. Source files reused from sc-news

The list of canonical CIG sources (Wiki API endpoints, Dev Tracker RSS) is duplicated between `sc-news.md` and `sc-events.md` for now. If duplication becomes painful, extract to `~/.claude/agents/references/sc-sources.md` and reference from both. Out of scope for v1.

## 6. Pipeline — six phases

| # | Phase | Actor | Output |
|---|---|---|---|
| 1 | Fetch | Bash (`curl`) | Raw JSON + RSS XML on disk |
| 2 | Classify | `sc-events-classifier` (Haiku) | List of `{source_url, type, confidence}` |
| 3 | Load current state | Read | In-memory parse of `events.json` |
| 4 | Diff + decide | Sonnet (orchestrator) | List of changes: `NEW` / `EDIT` / `STATUS_FLIP` / `NOOP` |
| 5 | Write | Sonnet | Updated `events.json` (only if `NEW` or `EDIT` exists) |
| 6 | Commit | Bash + `gh` | PR or direct commit, per hybrid policy |

### Diff logic (Phase 4)

Two independent passes — source-driven and clock-driven — composed at the end.

**Pass A: source-driven (per classified candidate)**

- Derive `id`. Match against existing event IDs.
- **No match** → `NEW` (Phase 5 writes; Phase 6 opens PR).
- **Match, dates or summary fields differ** → `EDIT` (Phase 5 rewrites entry; Phase 6 opens PR).
- **Match, identical content** → bump `last_seen_at` only. No commit by itself.

**Pass B: clock-driven (per known event in `events.json`)**

Compute `expected_status` from `start`, `end`, and now:
- `now < start` → `"upcoming"`
- `start <= now <= end` → `"active"`
- `now > end` → `"past"`

If `expected_status != event.status`, emit `STATUS_FLIP`.

This pass runs for every event regardless of whether it appeared in today's source pull — events frequently age past `end` long after the source stops mentioning them.

**Composition:**
- If Pass A produced any `NEW` or `EDIT`, those drive a PR. Any `STATUS_FLIP`s in the same run get folded into the same PR (one branch, one merge).
- If Pass A produced only `last_seen_at` bumps (or nothing) and Pass B produced `STATUS_FLIP`s, direct-commit the flips to `main`.
- If both passes are empty, no commit. `last_seen_at` bumps alone never commit.

### Commit policy (Phase 6)

```
if any change in {NEW, EDIT}:
    branch = sc-events/update-YYYY-MM-DD
    commit message: "events: <add|update> <event name>"
    open PR with body: diff summary + source URLs + per-change description_plain
elif any STATUS_FLIP:
    commit directly to main
    message: "events: status flip <event name> <from>→<to>"
    push origin main
else:
    no-op, log "no changes"
```

### Abstain rules

- Classifier `confidence: low` → drop.
- Date ambiguity in source → leave event out, log under `pending_review` in PR body (never written to `events.json`).
- Source conflict (Comm-Link vs Spectrum) → Comm-Link wins, Spectrum disagreement noted in PR body.
- Empty `events.json` on first run → seed PR titled `events: seed initial calendar`.

## 7. Wiring

### 7a. Schedule

```
/schedule create sc-events-daily
  cron:    30 16 * * *        # 16:30 UTC daily
  agent:   sc-events
  prompt:  "Run a full sweep. Open a PR if you find new or changed events;
           direct-commit any pure status flips; otherwise no-op."
```

### 7b. GitHub auth

- **Fine-grained PAT** scoped to `o7citizen-main` only.
- Permissions: `Contents: write`, `Pull requests: write`.
- Stored as routine secret, exposed to the agent as `GH_TOKEN`.
- Agent uses `gh` CLI authenticated via that env var.
- GitHub App migration deferred to a future iteration.

### 7c. Consuming-site fetcher

Each consuming site (except `o7citizen-main`, which reads its own JSON locally) gets:

```typescript
// src/lib/events.ts
import type { EventsFile } from "@/types/events";

const EVENTS_URL =
  "https://raw.githubusercontent.com/<user>/o7citizen-main/main/src/data/events.json";

export async function getEvents(): Promise<EventsFile> {
  const res = await fetch(EVENTS_URL, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`events.json fetch failed: ${res.status}`);
  return res.json() as Promise<EventsFile>;
}
```

`<user>` is the GitHub username/org owning `o7citizen-main`.

### 7d. Deploy behaviour

- `o7citizen-main`: Vercel auto-rebuild on push (existing GitHub integration).
- Other sites: Next.js ISR `revalidate: 3600` picks up changes within an hour. No deploy hooks, no Action chains, no cross-repo orchestration.

## 8. Error handling

| Failure | Behaviour |
|---|---|
| Wiki API down | Fall back to Dev Tracker RSS only. Note in PR body if a write happens. |
| Both sources down | Exit Phase 1. No commit. Next run picks up. |
| Classifier returns malformed JSON | Retry classifier once. On second failure, exit. No commit. Log raw output. |
| Sonnet writes invalid `events.json` | Self-validation (see 8a) catches it. Abort, no commit. |
| `gh pr create` fails | Branch left in place. Manual PR creation. Better than losing work. |
| `git push` to main fails (status flip) | Retry once with `git pull --rebase`. If still failing, abort. Wait for next run. |
| Date ambiguity in source | Leave event out. Log under `pending_review` in PR body (informational only). |

### 8a. Self-validation before any commit

```bash
node -e "JSON.parse(require('fs').readFileSync('src/data/events.json'))"
```

Plus schema check: every event has required fields, `start < end`, `status` is a valid enum, `id` matches `<type>-` prefix. If validation fails: abort, no commit, log the offending diff.

### 8b. Idempotency

The agent is stateless and re-runnable. Two consecutive runs an hour apart on unchanged sources produce zero commits. Deterministic `id` derivation makes this guarantee hold.

### 8c. First-run bootstrap

1. Detect missing `events.json`.
2. Initialise: `{ schema_version: 1, last_updated: <now>, events: [] }`.
3. Run normal sweep. Confirmed candidates become `NEW`.
4. Open one seed PR.

User merges once; subsequent runs are incremental.

### 8d. Monitoring

- **Success path:** PR in GitHub inbox, or status-flip commit on `main`. Both visible without active monitoring.
- **No-change days:** silent. `/schedule` logs are proof of life.
- **Failure path:** visible via `/schedule` routine logs.
- No heartbeat commits — git history stays clean.

## 9. Open questions for implementation

These are not blockers — they are decisions the implementation plan should resolve:

1. **GitHub username/org owning `o7citizen-main`**, used in the consumer fetcher URL (`raw.githubusercontent.com/<user>/o7citizen-main/...`). Determine from `gh repo view` during implementation.
2. **Routine secret for `GH_TOKEN`** — exact storage location depends on the `/schedule` skill's secret-handling.
3. **`description_plain` length** — hard character cap, or left to the prompt's quality bar?
4. **Abstained candidates** — log persistently anywhere, or only in the next-write PR body?
5. **PR auto-merge** — label PRs that pass self-validation for auto-merge after a delay, or always require manual merge?

## 10. Locked decisions (for traceability)

| Decision | Choice |
|---|---|
| Event scope | Free Fly + Referral Bonus only |
| Source of truth | Single JSON in `o7citizen-main` |
| Consumption model | Build-time / ISR fetch from raw GitHub URL |
| Trigger model | Scheduled remote agent (`/schedule`) |
| Cadence | Daily, 16:30 UTC |
| Model split | Haiku 4.5 for classification, Sonnet 4.6 for writing |
| Agent identity | New agent (`sc-events`), not an extension of `sc-news` |
| Commit policy | Hybrid: PR for new/edit, direct commit for status flip |
| Auth | Fine-grained PAT scoped to `o7citizen-main` |
| Status storage | Stored in JSON, not derived (per hybrid commit policy) |
