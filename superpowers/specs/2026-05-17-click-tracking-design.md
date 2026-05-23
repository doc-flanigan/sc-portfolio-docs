# Click Tracking Design — SC Portfolio Network

**Date:** 2026-05-17
**Scope:** All sites with referral CTAs in `E:\Claude Code\sc-portfolio\`
**Status:** Approved

---

## Goal

Track every referral CTA click across all 9 applicable sites, server-side, in real time. Each click logs a row to a shared Google Sheet and posts an embed to a Discord channel. No client-side analytics library — adblockers cannot suppress it.

---

## Sites in Scope

| Repo | Domain | CTA Component | Pattern |
|---|---|---|---|
| dayonecitizen-main | dayonecitizen.com | `CTAButton.tsx` | Full (rotator + trackingLabel) |
| freeflyevent-site | freeflyevent.com | `CTAButton.tsx` | Full |
| screferralreward-site | screferralrewards.com | `CTAButton.tsx` | Full |
| screferralbonus-site | screferralbonus.com | `CTAButton.tsx` | Full |
| fundedgame-site | highestfundedgame.com | `CTAButton.tsx` | Full |
| bestspacesim-site | bestspacesim.com | `CTAButton.tsx` | Full |
| o7meaning-site | o7meaning.com | `CTAButton.tsx` | Full |
| pledgemeaning-site | pledgemeaning.com | `CTAButton.tsx` | Simple (no rotator, no trackingLabel) |
| StarCitizenHelp-live | StarCitizenHelp | `ReferralCTA.tsx` + `FloatingCTA.tsx` | handleNavigate pattern |
| iheldtheline-site | iheldtheline.com | `CTAButton.tsx` (new) | New build — full pattern |

---

## Architecture

```
Browser click
    │
    ├─► navigate to RSI (target="_blank", immediate, not blocked)
    │
    └─► fetch POST /api/track-click  (fire-and-forget, keepalive: true)
              │
              ▼
         Next.js API route (server-side)
              │
              ├─► POST to Google Apps Script Web App URL
              │       └─► appends row to Google Sheet
              │
              └─► POST to Discord Webhook URL
                      └─► embed in #referral-clicks channel
```

Both the Apps Script call and Discord webhook call fire in parallel (`Promise.all`). If either fails, the error is logged server-side; the user experience is unaffected.

---

## Data Schema

### Google Sheet columns (in order)

| Column | Value | Example |
|---|---|---|
| Timestamp | ISO 8601 UTC | `2026-05-17T14:32:01.123Z` |
| Site | `window.location.hostname` | `dayonecitizen.com` |
| CTA Label | `trackingLabel` prop or `"CTAButton"` | `NavBar` |
| Referral Code | extracted from href | `STAR-GCQJ-N6NC` |
| Page | `window.location.pathname` | `/glossary` |

### Discord embed

```
Title:  Referral Click
Color:  #f0c040 (gold)
Fields:
  Site:          dayonecitizen.com
  CTA Label:     NavBar
  Referral Code: STAR-GCQJ-N6NC
  Page:          /glossary
Footer: timestamp
```

---

## Environment Variables

Same two values added to **every** Vercel project in scope:

| Variable | Description |
|---|---|
| `CLICK_TRACKER_SHEET_URL` | Google Apps Script web app deploy URL |
| `DISCORD_CLICK_WEBHOOK_URL` | Discord channel webhook URL |

Also add both to `.env.local` in each repo for local development.

---

## Files Changed Per Repo

### Group A — Full CTAButton sites (7 repos)
`dayonecitizen-main`, `freeflyevent-site`, `screferralreward-site`, `screferralbonus-site`, `fundedgame-site`, `bestspacesim-site`, `o7meaning-site`

**New:** `src/app/api/track-click/route.ts`
**Modified:** `src/components/CTAButton.tsx`

### Group B — Simple CTAButton (1 repo)
`pledgemeaning-site`

**New:** `src/app/api/track-click/route.ts`
**Modified:** `src/components/CTAButton.tsx` — add `'use client'`, add `onClick` with tracking fetch, hardcode label as `"CTAButton"`, extract code from `ENLIST_URL`

### Group D — New CTAButton build (1 repo)
`iheldtheline-site`

**New:** `src/lib/referral-rotator.ts` — copy from any Group A site (same 3 codes)
**New:** `src/components/CTAButton.tsx` — gold button, full pattern matching site design system (navy/gold/starwhite palette). CTA label: `"Join Star Citizen While You Wait"`. Accepts `trackingLabel` prop.
**New:** `src/app/api/track-click/route.ts` — same as Group A
**Modified:** `src/app/page.tsx` — add `<CTAButton trackingLabel="Homepage CTA" />` after the "What is Squadron 42" section (before the section cards grid)

### Group C — handleNavigate sites (1 repo)
`StarCitizenHelp-live`

**New:** `src/app/api/track-click/route.ts`
**Modified:** `src/components/referral/ReferralCTA.tsx` — add tracking fetch to `handleNavigate`; extract code from `referralUrl.split('referral=')[1]`
**Modified:** `src/components/referral/FloatingCTA.tsx` — add tracking fetch to `handleNavigate`; `referralCode` is already in component state, use directly

---

## API Route Spec

**File:** `src/app/api/track-click/route.ts`

```typescript
// Request body
{
  label: string        // CTA label or "CTAButton"
  referralCode: string // e.g. "STAR-GCQJ-N6NC"
  page: string         // window.location.pathname
  site: string         // window.location.hostname
}

// Response (always 200 — never block the UI on tracking failure)
{ ok: true }
```

Behavior:
- Parse and validate body (all fields required, strings only, max 200 chars each)
- Call `Promise.all([postToSheet(...), postToDiscord(...)])`
- Catch errors per-call, log to console, never rethrow
- Return `{ ok: true }` regardless of tracking success

---

## Apps Script Code

Deploy this as a Google Apps Script web app (Execute as: Me, Access: Anyone):

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.site       || '',
    data.label      || '',
    data.referralCode || '',
    data.page       || '',
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

## CTAButton onClick (Group A pattern)

```typescript
const handleTrack = () => {
  const code = referralUrl.split('referral=')[1] ?? ''
  fetch('/api/track-click', {
    method: 'POST',
    keepalive: true,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      label: trackingLabel ?? 'unknown',
      referralCode: code,
      page: window.location.pathname,
      site: window.location.hostname,
    }),
  }).catch(() => {})
}
```

Added to the `onClick` of the external `<a>` tag only. The `<Link>` path (internal links) is never a referral and is not modified.

---

## Manual Setup Steps (one-time, done before deployment)

1. **Create Google Sheet** — add a header row: `Timestamp | Site | CTA Label | Referral Code | Page`
2. **Open Apps Script** — in the sheet: Extensions → Apps Script → paste `doPost()` above → Save
3. **Deploy as web app** — Deploy → New deployment → Web app → Execute as: Me → Who has access: Anyone → Deploy → copy the URL
4. **Create Discord webhook** — in your channel: Edit Channel → Integrations → Webhooks → New Webhook → Copy Webhook URL
5. **Add env vars to Vercel** — for each of the 9 projects: add `CLICK_TRACKER_SHEET_URL` and `DISCORD_CLICK_WEBHOOK_URL`
6. **Add to `.env.local`** — in each local repo for development testing

---

## Rollout Order

1. Complete manual setup (steps 1–4 above) — get both URLs
2. Implement Group A (7 repos — identical changes, easiest to batch)
3. Implement Group B (pledgemeaning-site — small component, slightly different)
4. Implement Group C (StarCitizenHelp-live — two components)
5. Implement Group D (iheldtheline-site — new CTAButton + referral-rotator + page placement)
6. Add env vars to all 10 Vercel projects
7. Verify with a test click on each site

---

## Non-Goals

- No rate limiting (fan site volumes don't warrant it)
- No deduplication (double-clicks are rare and informative)
- No client-side fallback if the API route is down
- No tracking of non-referral link clicks
