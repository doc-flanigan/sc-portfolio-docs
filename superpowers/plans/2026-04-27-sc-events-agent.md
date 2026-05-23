# sc-events Agent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `sc-events` agent and supporting plumbing that keeps Free Fly and referral-bonus calendars in sync across the SC portfolio sites, driven by a daily scheduled remote agent.

**Architecture:** Single canonical JSON (`o7citizen-main/src/data/events.json`) edited by an agent pair (Sonnet orchestrator + Haiku classifier) that polls CIG sources, diffs, and either opens a PR (new/edited events) or direct-commits (clock-driven status flips). Three consuming sites fetch the JSON via Next.js ISR.

**Tech Stack:** Node.js (validation script + tests via built-in `node --test`), TypeScript (consumer types and fetchers), Next.js 14 App Router (ISR fetch), `gh` CLI (PR + push), Claude Code agents (Sonnet 4.6 + Haiku 4.5), `/schedule` skill.

**Spec:** `docs/superpowers/specs/2026-04-27-event-calendar-sync-agent-design.md`

**Deviation from spec:** Spec section 5 located the agents at `~/.claude/agents/`. The plan places them in `o7citizen-main/.claude/agents/` so the `/schedule` remote agent finds them after cloning the repo. The spec has been updated to match.

---

## File Structure

| Path | Responsibility | Created/Modified |
|---|---|---|
| `o7citizen-main/scripts/validate-events.js` | Schema validator (CLI + module export) | Create |
| `o7citizen-main/scripts/validate-events.test.js` | Node test runner tests for validator | Create |
| `o7citizen-main/src/data/events.json` | Canonical event data — the source of truth | Create |
| `o7citizen-main/src/types/events.ts` | TypeScript types for the JSON | Create |
| `o7citizen-main/src/lib/events.ts` | Local fetcher (reads JSON via import) | Create |
| `freeflyevent-site/src/types/events.ts` | Same types, copied | Create |
| `freeflyevent-site/src/lib/events.ts` | Remote fetcher with ISR | Create |
| `screferralrewards-site/src/types/events.ts` | Same types, copied | Create |
| `screferralrewards-site/src/lib/events.ts` | Remote fetcher with ISR | Create |
| `bestspacesim-site/src/types/events.ts` | Same types, copied | Create |
| `bestspacesim-site/src/lib/events.ts` | Remote fetcher with ISR | Create |
| `o7citizen-main/.claude/agents/sc-events.md` | Sonnet orchestrator | Create |
| `o7citizen-main/.claude/agents/sc-events-classifier.md` | Haiku classifier subagent | Create |

User-level / external configuration (not files in any repo):
- GitHub fine-grained PAT scoped to `o7citizen-main`.
- `/schedule` routine `sc-events-daily` configured with the PAT as a secret.

---

## Task 1: Validation script (TDD)

**Files:**
- Create: `o7citizen-main/scripts/validate-events.js`
- Create: `o7citizen-main/scripts/validate-events.test.js`

This task uses Node's built-in test runner — no external test dependency.

- [ ] **Step 1: Write the failing test file**

Create `o7citizen-main/scripts/validate-events.test.js`:

```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
const { validate } = require('./validate-events');

const baseFreeFly = {
  id: 'free-fly-2026-may-aurora',
  type: 'free-fly',
  status: 'upcoming',
  name: 'May 2026 Aurora Free Fly',
  start: '2026-05-01T17:00:00Z',
  end: '2026-05-08T17:00:00Z',
  ships_summary: 'Aurora MR starter ship',
  description_plain: 'Anyone can play Star Citizen for free from May 1 through May 8, 2026.',
  source_url: 'https://robertsspaceindustries.com/comm-link/test',
  last_seen_at: '2026-04-25T03:00:00Z',
};

const baseFile = {
  schema_version: 1,
  last_updated: '2026-04-27T14:30:00Z',
  events: [baseFreeFly],
};

test('valid file passes', () => {
  assert.deepEqual(validate(baseFile), []);
});

test('rejects wrong schema_version', () => {
  const errs = validate({ ...baseFile, schema_version: 2 });
  assert.ok(errs.some(e => e.includes('schema_version')));
});

test('rejects unknown event type', () => {
  const bad = { ...baseFreeFly, type: 'lore-event' };
  const errs = validate({ ...baseFile, events: [bad] });
  assert.ok(errs.some(e => e.includes('type')));
});

test('rejects start >= end', () => {
  const bad = { ...baseFreeFly, start: '2026-05-10T00:00:00Z', end: '2026-05-08T00:00:00Z' };
  const errs = validate({ ...baseFile, events: [bad] });
  assert.ok(errs.some(e => e.includes('start must be before end')));
});

test('rejects id missing type prefix', () => {
  const bad = { ...baseFreeFly, id: 'random-id' };
  const errs = validate({ ...baseFile, events: [bad] });
  assert.ok(errs.some(e => e.includes('must start with "free-fly-"')));
});

test('referral-bonus requires bonus_summary', () => {
  const bad = {
    ...baseFreeFly,
    id: 'referral-bonus-2026-test',
    type: 'referral-bonus',
  };
  delete bad.ships_summary;
  const errs = validate({ ...baseFile, events: [bad] });
  assert.ok(errs.some(e => e.includes('bonus_summary')));
});

test('free-fly requires ships_summary', () => {
  const bad = { ...baseFreeFly };
  delete bad.ships_summary;
  const errs = validate({ ...baseFile, events: [bad] });
  assert.ok(errs.some(e => e.includes('ships_summary')));
});

test('rejects malformed ISO timestamp in start', () => {
  const bad = { ...baseFreeFly, start: '2026/05/01' };
  const errs = validate({ ...baseFile, events: [bad] });
  assert.ok(errs.some(e => e.includes('start')));
});

test('rejects empty source_url', () => {
  const bad = { ...baseFreeFly, source_url: 'not-a-url' };
  const errs = validate({ ...baseFile, events: [bad] });
  assert.ok(errs.some(e => e.includes('source_url')));
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd "E:/Claude Code/sc-portfolio/o7citizen-main"
node --test scripts/validate-events.test.js
```

Expected: every test fails with `Cannot find module './validate-events'` or similar.

- [ ] **Step 3: Implement the validator**

Create `o7citizen-main/scripts/validate-events.js`:

```javascript
const fs = require('fs');
const path = require('path');

const VALID_TYPES = new Set(['free-fly', 'referral-bonus']);
const VALID_STATUSES = new Set(['upcoming', 'active', 'past']);
const ISO_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;

function validateEvent(event, index) {
  const errors = [];
  const where = `events[${index}]`;

  if (typeof event.id !== 'string' || event.id.length === 0) {
    errors.push(`${where}.id: must be a non-empty string`);
  }
  if (!VALID_TYPES.has(event.type)) {
    errors.push(`${where}.type: must be one of ${[...VALID_TYPES].join(', ')}`);
  }
  if (event.id && event.type && !event.id.startsWith(event.type + '-')) {
    errors.push(`${where}.id: must start with "${event.type}-"`);
  }
  if (!VALID_STATUSES.has(event.status)) {
    errors.push(`${where}.status: must be one of ${[...VALID_STATUSES].join(', ')}`);
  }
  if (typeof event.name !== 'string' || event.name.length === 0) {
    errors.push(`${where}.name: must be a non-empty string`);
  }
  if (!ISO_RE.test(event.start || '')) {
    errors.push(`${where}.start: must be ISO 8601 UTC (e.g. 2026-05-01T00:00:00Z)`);
  }
  if (!ISO_RE.test(event.end || '')) {
    errors.push(`${where}.end: must be ISO 8601 UTC`);
  }
  if (event.start && event.end && event.start >= event.end) {
    errors.push(`${where}: start must be before end`);
  }
  if (typeof event.description_plain !== 'string' || event.description_plain.length === 0) {
    errors.push(`${where}.description_plain: must be a non-empty string`);
  }
  if (typeof event.source_url !== 'string' || !/^https?:\/\//.test(event.source_url)) {
    errors.push(`${where}.source_url: must be an http(s) URL`);
  }
  if (!ISO_RE.test(event.last_seen_at || '')) {
    errors.push(`${where}.last_seen_at: must be ISO 8601 UTC`);
  }
  if (event.type === 'free-fly') {
    if (typeof event.ships_summary !== 'string' || event.ships_summary.length === 0) {
      errors.push(`${where}.ships_summary: required for free-fly events`);
    }
  } else if (event.type === 'referral-bonus') {
    if (typeof event.bonus_summary !== 'string' || event.bonus_summary.length === 0) {
      errors.push(`${where}.bonus_summary: required for referral-bonus events`);
    }
  }
  return errors;
}

function validate(data) {
  const errors = [];
  if (data.schema_version !== 1) {
    errors.push(`schema_version: must be 1`);
  }
  if (!ISO_RE.test(data.last_updated || '')) {
    errors.push(`last_updated: must be ISO 8601 UTC`);
  }
  if (!Array.isArray(data.events)) {
    errors.push(`events: must be an array`);
    return errors;
  }
  for (let i = 0; i < data.events.length; i++) {
    errors.push(...validateEvent(data.events[i], i));
  }
  return errors;
}

function main() {
  const filePath = process.argv[2] || 'src/data/events.json';
  const abs = path.resolve(filePath);
  if (!fs.existsSync(abs)) {
    console.error(`File not found: ${abs}`);
    process.exit(2);
  }
  let data;
  try {
    data = JSON.parse(fs.readFileSync(abs, 'utf8'));
  } catch (e) {
    console.error(`Invalid JSON in ${abs}: ${e.message}`);
    process.exit(2);
  }
  const errors = validate(data);
  if (errors.length > 0) {
    console.error('Validation failed:');
    for (const err of errors) console.error('  - ' + err);
    process.exit(1);
  }
  console.log(`OK: ${data.events.length} event(s) valid`);
  process.exit(0);
}

if (require.main === module) {
  main();
}

module.exports = { validate, validateEvent };
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd "E:/Claude Code/sc-portfolio/o7citizen-main"
node --test scripts/validate-events.test.js
```

Expected: all 9 tests pass.

- [ ] **Step 5: Commit**

```bash
cd "E:/Claude Code/sc-portfolio/o7citizen-main"
git add scripts/validate-events.js scripts/validate-events.test.js
git commit -m "feat: add events.json validator with TDD"
```

---

## Task 2: Initial events.json + TypeScript types in o7citizen-main

**Files:**
- Create: `o7citizen-main/src/data/events.json`
- Create: `o7citizen-main/src/types/events.ts`

- [ ] **Step 1: Create the empty seed events.json**

Create `o7citizen-main/src/data/events.json`:

```json
{
  "schema_version": 1,
  "last_updated": "2026-04-27T00:00:00Z",
  "events": []
}
```

- [ ] **Step 2: Validate the seed file**

```bash
cd "E:/Claude Code/sc-portfolio/o7citizen-main"
node scripts/validate-events.js src/data/events.json
```

Expected: `OK: 0 event(s) valid`

- [ ] **Step 3: Create the types file**

Create `o7citizen-main/src/types/events.ts`:

```typescript
export type EventStatus = "upcoming" | "active" | "past";
export type EventType = "free-fly" | "referral-bonus";

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

export interface FreeFlyEvent extends BaseEvent {
  type: "free-fly";
  ships_summary: string;
}

export interface ReferralBonusEvent extends BaseEvent {
  type: "referral-bonus";
  bonus_summary: string;
}

export type SCEvent = FreeFlyEvent | ReferralBonusEvent;

export interface EventsFile {
  schema_version: 1;
  last_updated: string;
  events: SCEvent[];
}
```

- [ ] **Step 4: Verify types compile**

```bash
cd "E:/Claude Code/sc-portfolio/o7citizen-main"
npx tsc --noEmit
```

Expected: no errors. (If `tsc` reports unrelated errors from un-built site code, narrow to: `npx tsc --noEmit src/types/events.ts`.)

- [ ] **Step 5: Commit**

```bash
cd "E:/Claude Code/sc-portfolio/o7citizen-main"
git add src/data/events.json src/types/events.ts
git commit -m "feat: seed events.json and TypeScript types"
```

---

## Task 3: Local events fetcher in o7citizen-main

**Files:**
- Create: `o7citizen-main/src/lib/events.ts`

`o7citizen-main` reads its own JSON locally — no fetch needed.

- [ ] **Step 1: Verify the JSON import path resolves**

Check that `tsconfig.json` has a path alias for `@/data/`. If not, you'll use a relative import. Find the alias:

```bash
cd "E:/Claude Code/sc-portfolio/o7citizen-main"
grep -E '"paths"|"@/"' tsconfig.json
```

Expected: see the `@/*` mapping (typical Next.js scaffold). If absent, use `../data/events.json` from `src/lib/events.ts` instead of `@/data/events.json`.

- [ ] **Step 2: Verify TypeScript can import JSON**

Check `tsconfig.json` for `"resolveJsonModule": true`. If not set, add it under `compilerOptions`:

```json
{
  "compilerOptions": {
    "resolveJsonModule": true
  }
}
```

- [ ] **Step 3: Create the fetcher**

Create `o7citizen-main/src/lib/events.ts`:

```typescript
import eventsData from "@/data/events.json";
import type { EventsFile, SCEvent, EventStatus } from "@/types/events";

export function getEvents(): EventsFile {
  return eventsData as EventsFile;
}

export function activeEvents(): SCEvent[] {
  return getEvents().events.filter(e => e.status === "active");
}

export function upcomingEvents(): SCEvent[] {
  return getEvents().events.filter(e => e.status === "upcoming");
}

export function pastEvents(): SCEvent[] {
  return getEvents().events.filter(e => e.status === "past");
}
```

(If the path alias isn't configured, replace `@/` imports with relative paths.)

- [ ] **Step 4: Verify it type-checks**

```bash
cd "E:/Claude Code/sc-portfolio/o7citizen-main"
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
cd "E:/Claude Code/sc-portfolio/o7citizen-main"
git add src/lib/events.ts tsconfig.json
git commit -m "feat: add local events fetcher with status filters"
```

---

## Task 4: Resolve GitHub username/org for o7citizen-main

This produces the value `<USERNAME>` used in the next task's fetcher URL. (Spec open question #1.)

- [ ] **Step 1: Query gh for the owner**

```bash
cd "E:/Claude Code/sc-portfolio/o7citizen-main"
gh repo view --json owner --jq '.owner.login'
```

Expected: a single line, e.g. `Doc-Flanigan`. Record this value — you'll substitute it for `<USERNAME>` in Task 5.

- [ ] **Step 2: Confirm the raw URL is reachable**

Substitute the username into the URL and curl it:

```bash
USER=$(gh repo view --json owner --jq '.owner.login')
curl -sI "https://raw.githubusercontent.com/${USER}/o7citizen-main/main/src/data/events.json" | head -1
```

Expected: `HTTP/2 200`. (If 404, the seed commit hasn't pushed yet — push main, then retry.)

If `main` hasn't been pushed yet:

```bash
cd "E:/Claude Code/sc-portfolio/o7citizen-main"
git push origin main
```

Then re-run the curl.

---

## Task 5: Remote events fetcher in three consuming sites

Repeat the same three steps for each of: `freeflyevent-site`, `screferralrewards-site`, `bestspacesim-site`.

**Files (per site):**
- Create: `<site>/src/types/events.ts` (identical content per site)
- Create: `<site>/src/lib/events.ts` (URL-substituted)

- [ ] **Step 1: Copy types into freeflyevent-site**

```bash
cp "E:/Claude Code/sc-portfolio/o7citizen-main/src/types/events.ts" \
   "E:/Claude Code/sc-portfolio/freeflyevent-site/src/types/events.ts"
```

- [ ] **Step 2: Create the remote fetcher in freeflyevent-site**

Set `USER` to the value from Task 4 Step 1. Create `freeflyevent-site/src/lib/events.ts` with `<USERNAME>` replaced:

```typescript
import type { EventsFile, SCEvent } from "@/types/events";

const EVENTS_URL =
  "https://raw.githubusercontent.com/<USERNAME>/o7citizen-main/main/src/data/events.json";

export async function getEvents(): Promise<EventsFile> {
  const res = await fetch(EVENTS_URL, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(`events.json fetch failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as EventsFile;
}

export async function activeEvents(): Promise<SCEvent[]> {
  return (await getEvents()).events.filter(e => e.status === "active");
}

export async function upcomingEvents(): Promise<SCEvent[]> {
  return (await getEvents()).events.filter(e => e.status === "upcoming");
}

export async function pastEvents(): Promise<SCEvent[]> {
  return (await getEvents()).events.filter(e => e.status === "past");
}
```

After creating, replace `<USERNAME>` with the actual value from Task 4. Use Edit / sed:

```bash
cd "E:/Claude Code/sc-portfolio/freeflyevent-site"
USER=$(cd ../o7citizen-main && gh repo view --json owner --jq '.owner.login')
sed -i "s|<USERNAME>|${USER}|g" src/lib/events.ts
```

- [ ] **Step 3: Type-check freeflyevent-site**

```bash
cd "E:/Claude Code/sc-portfolio/freeflyevent-site"
npx tsc --noEmit
```

Expected: no errors. (If unrelated errors from existing code, narrow scope: `npx tsc --noEmit src/lib/events.ts src/types/events.ts`.)

- [ ] **Step 4: Commit freeflyevent-site**

```bash
cd "E:/Claude Code/sc-portfolio/freeflyevent-site"
git add src/types/events.ts src/lib/events.ts
git commit -m "feat: add remote events fetcher with ISR (1h revalidate)"
```

- [ ] **Step 5: Repeat steps 1–4 for screferralrewards-site**

Run the same three commands with `screferralrewards-site` substituted for `freeflyevent-site`.

- [ ] **Step 6: Repeat steps 1–4 for bestspacesim-site**

Run the same three commands with `bestspacesim-site` substituted for `freeflyevent-site`.

---

## Task 6: Author the sc-events-classifier (Haiku) agent

**Files:**
- Create: `o7citizen-main/.claude/agents/sc-events-classifier.md`

- [ ] **Step 1: Create the agent file**

Create `o7citizen-main/.claude/agents/sc-events-classifier.md`:

```markdown
---
name: sc-events-classifier
description: Classifier subagent invoked by sc-events. Given a list of candidate Comm-Link and Spectrum items, classifies each as free-fly, referral-bonus, or neither, with a confidence rating. Returns strict JSON only. Do not invoke directly from a user prompt.
tools:
model: haiku-4-5
---

# sc-events-classifier

You receive a JSON array of candidate items in your input. Each item has:

- `source_url` (string)
- `title` (string)
- `excerpt` (string — first 500 chars of body)

For each item, decide whether it announces:

- A **Free Fly event** — a period when anyone can play Star Citizen for free without buying it. Keywords: "Free Fly", "play free", "free flight", "free trial".
- A **Referral bonus event** — a promotion where players who sign up using a referral code receive bonus in-game currency or rewards beyond the standard amount. Keywords: "referral bonus", "doubled rewards", "bonus UEC", "anniversary referral".
- **Neither.**

## Output

Return STRICT JSON, no prose, no markdown fences. Schema:

```json
[
  {
    "source_url": "<the item's source_url verbatim>",
    "type": "free-fly | referral-bonus | neither",
    "confidence": "high | medium | low"
  }
]
```

## Confidence guide

- `high`: title or first paragraph clearly announces start/end dates of a free fly window or a referral promotion.
- `medium`: text discusses the event but specifics (dates, eligibility) are unclear.
- `low`: keyword present but context suggests retrospective coverage, marketing copy, or an unrelated topic.

## Rules

- Discard nothing — every input gets exactly one entry in the output array. Items classified as `"neither"` are still listed; the orchestrator filters them out.
- Do not invent items.
- Do not deduplicate.
- Output order matches input order.
- Return ONLY the JSON array. Nothing before. Nothing after.
- Do not add commentary, explanations, or summaries.
```

- [ ] **Step 2: Smoke-test the classifier with a sample input**

Open Claude Code in `o7citizen-main` and dispatch the subagent on this fixture:

```
Use the sc-events-classifier subagent with this input:

[
  {
    "source_url": "https://example.com/comm-link/free-fly-may-2026",
    "title": "Free Fly Event Returns: May 1-8, 2026",
    "excerpt": "Star Citizen's annual Free Fly event runs from May 1 through May 8, 2026, giving anyone a chance to try the game with the Aurora MR starter ship at no cost..."
  },
  {
    "source_url": "https://example.com/comm-link/anniversary-referral",
    "title": "12th Anniversary: Doubled Referral Rewards",
    "excerpt": "From April 25 to May 9, 2026, new players signing up with a referral code will receive 100,000 UEC instead of the standard 50,000 UEC..."
  },
  {
    "source_url": "https://example.com/comm-link/lore-update",
    "title": "Spectrum Dispatch: A History of the Banu",
    "excerpt": "The Banu civilisation has long been a subject of speculation among xenoarchaeologists..."
  },
  {
    "source_url": "https://example.com/comm-link/old-coverage",
    "title": "Looking Back at the 2024 Free Fly",
    "excerpt": "It's been over a year since the 2024 Free Fly window. Here's what we learned..."
  }
]
```

Expected output (something like):

```json
[
  {"source_url": "https://example.com/comm-link/free-fly-may-2026", "type": "free-fly", "confidence": "high"},
  {"source_url": "https://example.com/comm-link/anniversary-referral", "type": "referral-bonus", "confidence": "high"},
  {"source_url": "https://example.com/comm-link/lore-update", "type": "neither", "confidence": "high"},
  {"source_url": "https://example.com/comm-link/old-coverage", "type": "free-fly", "confidence": "low"}
]
```

If the output deviates structurally (missing items, extra prose, wrong field names), iterate on the prompt before continuing. Confidence ratings can vary by judgment — that's fine; structure must be exact.

- [ ] **Step 3: Commit**

```bash
cd "E:/Claude Code/sc-portfolio/o7citizen-main"
git add .claude/agents/sc-events-classifier.md
git commit -m "feat: add sc-events-classifier (Haiku 4.5) subagent"
```

---

## Task 7: Author the sc-events orchestrator (Sonnet) agent

**Files:**
- Create: `o7citizen-main/.claude/agents/sc-events.md`

- [ ] **Step 1: Create the orchestrator agent file**

Create `o7citizen-main/.claude/agents/sc-events.md`:

```markdown
---
name: sc-events
description: Maintains the canonical event calendar JSON for the SC domain portfolio. Polls CIG sources for Free Fly and referral-bonus events, diffs against o7citizen-main/src/data/events.json, opens a PR for new/edited events, and direct-commits clock-driven status flips. Designed to run on a daily schedule via /schedule.
tools: Bash, WebFetch, Read, Write, Grep, Glob, Task
model: sonnet-4-6
---

# sc-events

You maintain the event calendar JSON file at `src/data/events.json` in this repository. You run on a daily schedule.

## Scope

You handle ONLY two event types:

- **Free Fly events** — periods anyone can play Star Citizen for free.
- **Referral-bonus events** — promotional periods with boosted referral rewards.

Anything else (lore drops, ship sales, patch notes, conventions, tournaments, dev streams) — leave to `sc-news`. Drop them.

You touch ONLY `src/data/events.json`. Never edit anything else.

## Sources

Two co-primary sources. Always check both for the date window.

### Source A — Star Citizen Wiki API (Comm-Links)

```bash
curl -s "https://api.star-citizen.wiki/api/comm-links?limit=50" > /tmp/comm-links.json
```

Each item has `id`, `title`, `rsi_url`, `category`, `created_at`, and `translations.en_EN` (full body text).

### Source B — Developer Tracker RSS (Spectrum staff posts)

```bash
curl -s "https://developertracker.com/star-citizen/rss" > /tmp/dev-tracker.xml
```

Each `<item>` has `<title>`, `<link>`, `<dc:creator>`, `<pubDate>`, and `<description>` (HTML body).

## Six-phase pipeline

### Phase 1: Fetch

Run both `curl` commands. Verify both produce non-empty output. If both fail, exit silently with no commit.

### Phase 2: Classify

Build a candidate list from the fetched data. For each Comm-Link in the JSON and each `<item>` in the RSS, extract `{source_url, title, excerpt}` where:

- `source_url` is `rsi_url` (Comm-Links) or `<link>` (RSS items).
- `title` is `title` or `<title>`.
- `excerpt` is the first 500 characters of body text — `translations.en_EN` for Comm-Links, stripped HTML from `<description>` for RSS items.

Filter to items dated within the past 14 days (using `created_at` for Comm-Links, `<pubDate>` for RSS). This bounds the work.

Dispatch the `sc-events-classifier` subagent with the candidate list. It returns classification JSON.

Drop items where `type == "neither"` or `confidence == "low"`.

### Phase 3: Load current state

Read `src/data/events.json`. If the file does not exist (first run), initialise in memory with:

```json
{ "schema_version": 1, "last_updated": "<now-iso>", "events": [] }
```

Build a map from `id` → event for fast lookup.

### Phase 4: Diff and decide

Run two independent passes.

**Pass A (source-driven):** for each remaining classified candidate, derive its `id` deterministically:

- Free-fly: `free-fly-<year>-<short-name>` where `<short-name>` is a kebab-cased descriptor pulled from the title (e.g. `may-aurora`, `iae-2026`). If the title is ambiguous, use the first 8 hex characters of `sha256(source_url)` as the short-name suffix: `free-fly-2026-a3f9c1d2`.
- Referral-bonus: `referral-bonus-<year>-<short-name>` (e.g. `anniversary`, `spring-promo`, or `referral-bonus-2026-a3f9c1d2`).

The same `source_url` MUST always produce the same `id`. Never include the current date or a random value in `id` derivation.

For each candidate:

- **No matching event in current state** → emit `NEW`.
- **Matching event, but `start`, `end`, `name`, or summary differs** → emit `EDIT`.
- **Matching event, content identical** → bump `last_seen_at` to now (no commit alone).

**Pass B (clock-driven):** for each event already in the current state, compute `expected_status`:

- `now < start` → `"upcoming"`
- `start <= now <= end` → `"active"`
- `now > end` → `"past"`

If `expected_status != event.status`, emit `STATUS_FLIP`.

### Phase 5: Write

If there are any `NEW` or `EDIT` changes, compose the prose fields. For each:

- **`name`**: lightly normalised event title from the source. Under 60 characters.
- **`description_plain`**: ONE TO THREE sentences, plain-English, abbreviation-free. Follow the rules from `CLAUDE.md` exactly:
  - Spell out abbreviations on first use.
  - Same-sentence plain explanation for any game term.
  - No gaming verbs ("dropped", "shipped", "went live"). Use "released", "starts", "runs".
  - Numbers under 100 in words.
  - Sentences under 25 words.
- **`ships_summary`** (free-fly only): one short line listing included ship(s) with a one-line context. Example: `Aurora MR starter ship and Cutlass Black medium freighter`.
- **`bonus_summary`** (referral-bonus only): one short line stating the bonus amount and who qualifies. Example: `Doubled referral rewards — 100,000 in-game money instead of the standard 50,000.`
- **`status`**: derived from `now` against `start`/`end` per Phase 4 Pass B.
- **`last_seen_at`**: now (ISO 8601 UTC).

Apply Pass B status flips to the in-memory state.

Write the merged state back to `src/data/events.json`. Sort `events` by `start` ascending. Bump top-level `last_updated` to the current ISO 8601 UTC.

### Phase 6: Validate and commit

Before any git operation, validate:

```bash
node scripts/validate-events.js src/data/events.json
```

If validation fails (non-zero exit), print the errors and abort with no commit. Do not attempt to fix and retry; abort.

Determine commit policy from the changes detected:

**If any change is `NEW` or `EDIT`** (Pass A produced source changes):

```bash
DATE=$(date -u +%Y-%m-%d)
BRANCH="sc-events/update-${DATE}"
git checkout -b "${BRANCH}"
git add src/data/events.json
git commit -m "events: update calendar (${DATE})"
git push origin "${BRANCH}"
gh pr create --title "events: update calendar (${DATE})" --body "<see body template below>"
```

PR body template (substitute the bracketed content):

```
Automated update from sc-events.

## Changes

[For each NEW: "- NEW: <name> — <start> to <end> — <source_url>"]
[For each EDIT: "- EDIT: <name> — was <old start>/<old end>, now <new start>/<new end> — <source_url>"]

## Status flips folded in

[For each STATUS_FLIP: "- <name>: <from> → <to>"]
[Or: "None."]

## Pending review (NOT written to events.json)

[For each abstained candidate: "- <source_url> — <reason, e.g. 'no end date in source'>"]
[Or: "None."]
```

**Else if any `STATUS_FLIP` occurred** (Pass B only, no source changes):

```bash
git checkout main
git pull --rebase
git add src/data/events.json
git commit -m "events: status flip <event-name> <from>→<to>"
git push origin main
```

If `git push` fails, retry once with `git pull --rebase`. If still failing, abort and exit silently — the next run picks up.

**Else** (no `NEW`, `EDIT`, or `STATUS_FLIP`): no commit. Log "no changes" and exit.

## Failure rules

- **Wiki API down** → fall back to RSS only. Note in PR body if a write happens.
- **Both sources down** → exit with no commit.
- **Classifier returns malformed JSON** → retry once. Second failure → exit with no commit, log raw output.
- **Self-validation fails** → abort, no commit, log offending diff.
- **Date ambiguity in source** → leave the event out, log under "Pending review" in PR body.
- **Source conflict** (Comm-Link vs Spectrum disagree) → Comm-Link wins, Spectrum disagreement noted in PR body.
- **`gh pr create` fails** → branch and commit are left in place. Manual PR creation is acceptable.

## Idempotency

You are stateless. Two consecutive runs an hour apart on unchanged sources MUST produce zero commits. Deterministic `id` derivation is what makes this hold — never include a timestamp or random value in `id`.

## Output

When you finish, respond with a short summary:

- Sources polled (and which, if any, failed).
- Number of candidates classified.
- Counts of `NEW` / `EDIT` / `STATUS_FLIP` / no-op.
- Final action (PR opened with URL, direct commit hash, or "no changes").
- Any abstained items with reasons.

Keep the summary under 200 words.
```

- [ ] **Step 2: Smoke-test the orchestrator in dry-run mode**

To smoke-test without pushing, you'll point the agent at a copy of the repo and watch what it WOULD do. Open Claude Code in `o7citizen-main` and dispatch:

```
Use the sc-events agent. Do everything EXCEPT git commit, git push, and gh pr create — instead, print the exact commands you would run, and print the proposed events.json content. Do not modify the working tree.
```

This is an ad-hoc dry run, not a permanent flag — you're asking the model to abstain from side effects this once. Expected: the agent describes what it polled, what it classified, the proposed JSON, and the exact git/gh commands it would have executed.

If the agent attempts to actually push or open a PR despite the instruction, do NOT proceed. Refine the prompt with stronger guard rails before continuing.

- [ ] **Step 3: Commit**

```bash
cd "E:/Claude Code/sc-portfolio/o7citizen-main"
git add .claude/agents/sc-events.md
git commit -m "feat: add sc-events (Sonnet 4.6) orchestrator agent"
git push origin main
```

---

## Task 8: Provision GitHub PAT

This task is manual — token creation cannot be automated.

- [ ] **Step 1: Create the fine-grained PAT**

1. Go to https://github.com/settings/tokens?type=beta
2. Click **"Generate new token"**.
3. Set:
   - **Token name:** `sc-events agent`
   - **Expiration:** 90 days (rotate this; mark calendar)
   - **Resource owner:** the account that owns `o7citizen-main`
   - **Repository access:** "Only select repositories" → choose `o7citizen-main`
   - **Repository permissions:**
     - **Contents:** Read and write
     - **Pull requests:** Read and write
     - All other permissions: No access
4. Generate the token. **Copy it immediately** — you will not see it again.

- [ ] **Step 2: Verify the token works**

In a terminal, set the token and check it can read and (dry-run) push:

```bash
export GH_TOKEN=<paste-token>
gh auth status
gh repo view <USERNAME>/o7citizen-main
```

Expected: `gh auth status` reports authenticated as the token; `gh repo view` returns the repo without error.

If `gh` is using a different auth source (oauth) and ignoring `GH_TOKEN`, run `gh auth logout` first so `GH_TOKEN` is the active credential.

- [ ] **Step 3: Store the token for the /schedule routine**

The `/schedule` skill exposes secrets to scheduled agents via its own mechanism. Open Claude Code and:

```
/schedule
```

Use the skill to create the routine (next task) — at routine creation time, you'll be prompted for environment variables. Provide `GH_TOKEN=<paste-token>` then.

If the `/schedule` skill stores secrets in a config file, the location is documented by the skill itself; check its README. Do not commit the token to any repo.

---

## Task 9: First-run bootstrap (manual, local)

This task validates the full pipeline end-to-end before scheduling.

- [ ] **Step 1: Open Claude Code in o7citizen-main**

```bash
cd "E:/Claude Code/sc-portfolio/o7citizen-main"
export GH_TOKEN=<your-token>
claude
```

- [ ] **Step 2: Dispatch sc-events**

In the Claude session:

```
Use the sc-events agent. Run a full sweep. Open a PR if you find new or changed events; direct-commit any pure status flips; otherwise no-op.
```

Expected outcomes (any of these is success):

- A PR appears at `https://github.com/<USERNAME>/o7citizen-main/pulls` titled `events: update calendar (...)`.
- A direct commit appears on `main` titled `events: status flip ...`.
- A summary message saying "no changes" with no commit.

- [ ] **Step 3: Review the PR (if one was opened)**

Open the PR. Verify:

- Each `NEW` / `EDIT` line in the body has a real `source_url`.
- The diff in `events.json` is well-formed JSON.
- Each `description_plain` follows the plain-English rules (no abbreviations without spelling out, no gaming verbs, sentences under 25 words).

If anything looks wrong, leave the PR open — close it manually, refine the agent prompt in `o7citizen-main/.claude/agents/sc-events.md`, and re-run from Step 2.

- [ ] **Step 4: Merge the PR (if it looks correct)**

```bash
cd "E:/Claude Code/sc-portfolio/o7citizen-main"
gh pr merge <PR-NUMBER> --squash --delete-branch
```

- [ ] **Step 5: Verify consuming sites pick up the data**

Wait one Vercel build cycle for `o7citizen-main`, then trigger a build on each consumer (or wait one ISR window of 1 hour). Visit each site's events page and confirm the data renders.

If the consumer fetcher returns a 404, the URL substitution in Task 5 may be wrong. Re-run:

```bash
grep -r 'raw.githubusercontent.com' \
  E:/Claude\ Code/sc-portfolio/freeflyevent-site/src/lib/events.ts \
  E:/Claude\ Code/sc-portfolio/screferralrewards-site/src/lib/events.ts \
  E:/Claude\ Code/sc-portfolio/bestspacesim-site/src/lib/events.ts
```

Fix any wrong URLs and commit.

---

## Task 10: Schedule the daily cron

**Files:** none (routine state lives in `/schedule` skill storage, not the repo).

- [ ] **Step 1: Open Claude Code and invoke /schedule**

```bash
cd "E:/Claude Code/sc-portfolio/o7citizen-main"
claude
```

In the session:

```
/schedule
```

- [ ] **Step 2: Create the routine**

Tell `/schedule`:

```
Create a routine named "sc-events-daily" with:
- cron: 30 16 * * *
- working directory: o7citizen-main (latest main)
- agent: sc-events
- prompt: "Run a full sweep. Open a PR if you find new or changed events; direct-commit any pure status flips; otherwise no-op."
- environment variable GH_TOKEN: <paste-token>
```

The exact UX depends on the `/schedule` skill — follow its prompts. If it asks about repo authentication, point it at `o7citizen-main`.

- [ ] **Step 3: List routines to verify**

```
/schedule list
```

Expected: `sc-events-daily` appears with next-fire time set to the next 16:30 UTC.

- [ ] **Step 4: Run a manual fire to validate the cron path**

```
/schedule run sc-events-daily
```

Expected: same outcome as Task 9 Step 2 — PR, direct commit, or no-op. If it fails, the most likely causes are:

- `GH_TOKEN` not propagating into the scheduled environment → re-add via `/schedule update`.
- Agent file not discovered → confirm `o7citizen-main/.claude/agents/sc-events.md` is on `main` and the routine pulls latest.
- Network timeout on CIG sources → ignore once; investigate if it persists.

---

## Self-review

(Done after writing this plan.)

**Spec coverage:** All 10 spec sections traced to tasks:

| Spec section | Plan task |
|---|---|
| 3 Architecture | Task 5 (consumer fetcher), Task 7 (orchestrator), Task 10 (schedule) |
| 4 Data contract | Task 2 (seed + types), Task 1 (validation) |
| 5 Agents | Tasks 6 + 7 |
| 6 Pipeline | Task 7 (encoded in agent prompt) |
| 7 Wiring | Tasks 4, 5, 8, 10 |
| 8 Error handling | Task 1 (validator), Task 7 (failure rules in prompt) |
| 9 Open questions | Q1 → Task 4; Q2 → Task 8; Q3/Q4/Q5 deferred (noted below) |
| 10 Locked decisions | All honoured; no contradictions |

**Deferred spec open questions** (no task — not blockers for v1):

- Q3 `description_plain` length cap — left to prompt's quality bar; revisit if outputs run long.
- Q4 Persistent abstain log — only in PR body for v1.
- Q5 PR auto-merge — manual merge for v1.

**Placeholder scan:** No "TBD"/"TODO" in actionable steps. The classifier prompt fixture in Task 6 Step 2 uses `example.com` URLs intentionally as test fixtures, not placeholders.

**Type consistency:** `EventStatus`, `EventType`, `BaseEvent`, `FreeFlyEvent`, `ReferralBonusEvent`, `SCEvent`, `EventsFile` — all consistent across Tasks 2, 3, 5. Function names (`getEvents`, `activeEvents`, `upcomingEvents`, `pastEvents`) consistent between Task 3 (sync) and Task 5 (async — Promise-wrapped).
