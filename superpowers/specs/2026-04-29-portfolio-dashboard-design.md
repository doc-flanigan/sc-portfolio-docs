# SC Portfolio Dashboard — Design Spec
**Date:** 2026-04-29
**Status:** Approved

---

## Overview

A local Node.js server that serves a single-pane-of-glass dashboard for the Doc_Flanigan SC fan site network. Displays live status for all 10 repos — Vercel deploy state, GitHub last commit, domain reachability, Claude Code process detection — plus SEO context and network vision pulled from real data sources.

Run with `npm run dashboard`. Opens at `http://localhost:4000`.

---

## Site Inventory

| Repo | Primary Domain | Aliases | Role |
|---|---|---|---|
| o7citizen-main | o7citizen.com | — | Primary hub |
| o7meaning-site | o7meaning.com | — | Content |
| bestspacesim-site | bestspacesim.com | — | Content |
| freeflyevent-site | freeflyevent.com | — | Content |
| screferralreward-site | screferralrewards.com | — | Content |
| screferralbonus-site | screferralbonus.com | — | Content (LIVE — all 8 agents complete 2026-04-27) |
| pledgemeaning-site | pledgemeaning.com | — | Content |
| fundedgame-site | highestfundedgame.com | mostfundedgame.com | Content |
| o7citizens-redirect | o7citizens.com | o7citizen.gg | Redirect |
| starcitizenhelp-site | starcitizenhelp.com | — | Legacy / SEO Springboard |

**GitHub:** `github.com/doc-flanigan/{repo-name}`
**Vercel:** `vercel.com/scottgayden-5755s-projects/{repo-name}`

---

## Architecture

```
dashboard/
  server.js          Node.js HTTP server (no framework, stdlib only)
  index.html         Dashboard UI (served by server.js)
  data/
    sites.js         Static site config (domains, roles, keywords, etc.)
    gsc-cache.json   Parsed GSC CSV data (read once at startup)
  scripts/
    parse-gsc.js     Parses starcitizenhelp-site CSV exports into gsc-cache.json
```

The server runs on `localhost:4000`. The dashboard HTML polls `/api/status` every 60 seconds. There is no external LLM dependency — all data comes from REST APIs and local sources.

---

## Data Sources

### 1. Vercel API
- **Endpoint:** `https://api.vercel.com/v9/projects/{projectId}/deployments?limit=1`
- **Team:** `scottgayden-5755s-projects`
- **Auth:** `VERCEL_TOKEN` env var (set in `.env` at project root)
- **Polled:** Every 60s on the server
- **Data extracted:** `readyState` (READY / BUILDING / ERROR), `createdAt` (timestamp of last deploy)

### 2. GitHub API
- **Endpoint:** `https://api.github.com/repos/doc-flanigan/{repo}/commits?per_page=1`
- **Auth:** `GITHUB_TOKEN` env var (optional — public repos work without it, but token avoids rate limiting)
- **Polled:** Every 60s on the server
- **Data extracted:** Last commit message, author, timestamp

### 3. Domain Reachability (HTTP Ping)
- **Method:** `http.get()` or `https.get()` to each primary domain, 5s timeout
- **Data extracted:** HTTP status code (200 = live, anything else or timeout = not live)
- **Note:** Done server-side to avoid CORS restrictions

### 4. Local Claude Code Process Detection
- **Method:** PowerShell via `child_process.exec('powershell -Command "Get-CimInstance Win32_Process -Filter \\"name=\'claude.exe\'\\""')`
- **Note:** `wmic` is deprecated in Windows 11; use `Get-CimInstance` instead
- **Logic:** Check for `claude.exe` processes; extract `CommandLine` property to identify which repo directory each instance is running in
- **Data extracted:** Which repos currently have an active Claude Code session; approximate agent context if detectable from window title or log file

### 5. GSC CSV Data (starcitizenhelp.com)
- **Source:** `starcitizenhelp-site/Queries.csv`, `starcitizenhelp-site/Chart.csv`
- **Method:** Parsed once at server startup by `scripts/parse-gsc.js`, cached in `data/gsc-cache.json`
- **`parse-gsc.js` contract:**
  - Input: reads `../starcitizenhelp-site/Queries.csv` and `../starcitizenhelp-site/Chart.csv` relative to `dashboard/`
  - Output: writes `data/gsc-cache.json` with shape:
    ```json
    {
      "topQueries": [{ "query": "", "clicks": 0, "impressions": 0, "ctr": "", "position": 0 }],
      "dailyImpressions": [{ "date": "", "impressions": 0 }],
      "avgDailyImpressions": 0,
      "indexedPages": 0
    }
    ```
  - Called automatically at server startup if `gsc-cache.json` is missing or older than 24h
- **Data extracted:** Top 10 queries (clicks, impressions, CTR, position), daily impressions trend, indexed page count

---

## Dashboard Layout

### Header Bar
- Title: "SC Portfolio Dashboard"
- Meta: `doc-flanigan · {N} repos · refreshed {N}s ago`
- Stats row: Live count (green) · Building count (yellow) · Redirect count (gray) · Claude Active count (purple)

### Referral Bar
- Label + full referral URL + Copy button
- URL: `https://www.robertsspaceindustries.com/enlist?referral=STAR-GCQJ-N6NC`

### Vision Panel
- Title: "Network Vision"
- Three stat tiles:
  - GSC Impressions (legacy): ~daily average from Chart.csv
  - Sunset Countdown: months remaining to starcitizenhelp.com sunset (target Oct 2026)
  - Top Legacy Query: highest-impression query from Queries.csv + target new site
- Internal Link Flow diagram (static, text-based):
  `starcitizenhelp.com → o7citizen.com → [content sites]`
  Note: starcitizenhelp links OUT to new network; new sites do NOT link back to it
- SEO Plan link: placeholder `[SEO Plan — link when ready]` (update once plan is complete)

### Site List — Primary Hub
Single row for `o7citizen-main`. Left accent: gold.

### Site List — Content Sites
One row per content site. Left accent: blue. Sorted by build progress (live first).

### Site List — Legacy
One row for `starcitizenhelp-site`. Left accent: red. Special treatment (see below).

### Site List — Redirects
One row for `o7citizens-redirect`. Left accent: gray. Dimmed opacity.

---

## Site Row Layout (Dense List)

Each row is a CSS grid with 4 columns:

```
[180px domain col] [90px status col] [flex info col] [auto links col]
```

**Domain column:**
- Primary domain name (colored by role)
- Alias domains (if any), in muted text
- Repo name in monospace muted text
- Legacy rows: SUNSET badge with target date

**Status column:**
- Status badge: LIVE (green) / BUILDING (yellow) / FAILED (red) / LEGACY (red) / REDIRECT (gray)
- Last deploy time from Vercel (e.g., "deployed 3h ago")
- Domain ping result: `⬤ 200 OK` (green) or `⬤ not live` (red)

**Info column:**
- Site role description (one line, muted)
- Last commit: icon + commit message excerpt + relative timestamp
- SEO block (see below)
- Pre-launch checklist badges

**Links column:**
- `🌐` → live domain (only if live)
- `⬡ GH` → github.com/doc-flanigan/{repo}
- `▲ VC` → vercel.com/scottgayden-5755s-projects/{repo}

---

## SEO Block (per row)

Compact sub-panel within the info column.

**Content sites:**
- Target keywords: 2–4 keyword phrases (hardcoded in `data/sites.js`, derived from each site's CLAUDE.md)
- GSC status: "not yet indexed" until site is live and has real data
- Backlink status: which network sites currently link to this one
  - `starcitizenhelp ✓/✗` — has the legacy site added its link yet?
  - `o7citizen.com ✓/✗` — has the hub linked to this content site?

**Legacy site (starcitizenhelp.com):**
- GSC summary: daily impressions, avg position, indexed page count (from CSV cache)
- Top 3 queries with mini bar chart (impressions), position number
- Outbound links tracker: which new network sites have received a link from it yet

---

## Status Derivation Logic

| Condition | Status shown |
|---|---|
| Vercel `readyState === 'READY'` AND domain ping 200 | LIVE |
| Vercel `readyState === 'BUILDING'` | BUILDING |
| Vercel `readyState === 'ERROR'` | FAILED |
| No Vercel deployment exists yet | BUILDING |
| Repo is `o7citizens-redirect` | REDIRECT |
| Repo is `starcitizenhelp-site` | LEGACY |

---

## Auto-Refresh Behavior

- Server polls all APIs every 60 seconds and caches results in memory
- Dashboard HTML polls `GET /api/status` every 60 seconds
- Manual "Refresh now" button forces an immediate re-poll
- "Refreshed Ns ago" counter updates every second in the browser (JS `setInterval`)

---

## API Endpoints (server.js)

| Endpoint | Response |
|---|---|
| `GET /` | Serves `index.html` |
| `GET /api/status` | JSON: all site statuses, timestamps, GSC cache |
| `GET /api/refresh` | Forces immediate re-poll, returns updated status |

---

## Environment Variables

```
# .env (in sc-portfolio root, not committed)
VERCEL_TOKEN=your_vercel_token
GITHUB_TOKEN=your_github_token   # optional, prevents rate limiting
```

---

## File Location

Dashboard lives at `E:\Claude Code\sc-portfolio\dashboard\`. Added as a script to the root `package.json`:

```json
"scripts": {
  "dashboard": "node dashboard/server.js"
}
```

---

## Target Keywords per Site (for SEO block)

Hardcoded in `data/sites.js` — update as SEO plan matures:

| Site | Keywords |
|---|---|
| o7citizen.com | star citizen beginner guide, what is star citizen, star citizen new player |
| o7meaning.com | what does o7 mean, o7 meaning, o7 star citizen |
| bestspacesim.com | best space sim game, space simulation games, star citizen vs elite dangerous |
| freeflyevent.com | star citizen free fly, star citizen free trial, free fly event |
| screferralrewards.com | star citizen referral code, star citizen referral bonus, 50000 UEC |
| pledgemeaning.com | what does pledge mean star citizen, star citizen pledge |
| highestfundedgame.com | highest funded game, most funded game, star citizen crowdfunding |
| starcitizenhelp.com | star citizen help, star citizen how to add friends, star citizen guide |

---

## Constraints & Notes

- No external npm dependencies in `server.js` — Node.js stdlib only (`http`, `https`, `fs`, `child_process`, `path`)
- `index.html` is self-contained: all CSS inline, no external assets
- **Font sizing:** Base font size `15px` (target display is 3440×1440 ultrawide; standard 13px reads too small). Domain names `1rem`, status badges `0.8rem`, meta/muted text `0.75rem`. Row height scales accordingly.
- `.env` file is gitignored; dashboard ships with `.env.example`
- GSC data is read once at startup — no live GSC API integration (CSV export is sufficient for now)
- The SEO plan link in the Vision panel is a placeholder until the plan doc is complete
- starcitizenhelp.com links OUT to new network sites; new sites do NOT link back to it (one-way authority flow)
- The dashboard itself lives in the `sc-portfolio-agents` GitHub repo (`github.com/doc-flanigan/sc-portfolio-agents`)
