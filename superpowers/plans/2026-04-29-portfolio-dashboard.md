# Portfolio Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local Node.js dashboard server that shows live Vercel deploy status, GitHub commits, domain reachability, Claude Code process detection, and SEO context for all 10 sites in the SC portfolio network.

**Architecture:** A zero-dependency Node.js HTTP server (`dashboard/server.js`) polls four data sources every 60 seconds and caches results in memory. A self-contained `dashboard/index.html` fetches `/api/status` every 60 seconds and re-renders. GSC CSV data is parsed once at startup and cached to `dashboard/data/gsc-cache.json`.

**Tech Stack:** Node.js stdlib only (`http`, `https`, `fs`, `path`, `child_process`). No npm installs needed beyond what's already in the root `package.json`.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `dashboard/data/sites.js` | Create | Static config for all 10 sites: domains, roles, keywords, checklist, backlink tracking |
| `dashboard/scripts/parse-gsc.js` | Create | Parses `starcitizenhelp-site/Queries.csv` + `Chart.csv` → `gsc-cache.json` |
| `dashboard/data/gsc-cache.json` | Auto-generated | Cached GSC data, regenerated if missing or >24h old |
| `dashboard/fetchers.js` | Create | Four data fetchers: Vercel API, GitHub API, domain ping, Claude process detection |
| `dashboard/server.js` | Create | HTTP server on :4000, polling loop, `/api/status`, `/api/refresh` endpoints |
| `dashboard/index.html` | Create | Self-contained dashboard UI — all CSS and JS inline, polls server |
| `.env.example` | Create | Template for `VERCEL_TOKEN` and `GITHUB_TOKEN` |
| `package.json` | Modify | Add `"dashboard": "node dashboard/server.js"` script |

---

## Task 1: Scaffold + Site Config

**Files:**
- Create: `dashboard/data/sites.js`
- Create: `dashboard/data/.gitkeep` (directory marker)
- Create: `dashboard/scripts/.gitkeep`

- [ ] **Step 1: Create the directory structure**

```bash
mkdir -p "E:/Claude Code/sc-portfolio/dashboard/data"
mkdir -p "E:/Claude Code/sc-portfolio/dashboard/scripts"
```

Confirm both directories exist before continuing.

- [ ] **Step 2: Write `dashboard/data/sites.js`**

```javascript
// Static config for all 10 SC portfolio sites.
// Update backlinksFrom and linksOutTo manually as links are added.
// Update checklist items as pre-launch tasks complete.
module.exports = [
  {
    repo: 'o7citizen-main',
    domain: 'o7citizen.com',
    aliases: [],
    role: 'hub',
    roleLabel: 'Primary hub — plain-English SC guide for new players',
    keywords: ['star citizen beginner guide', 'what is star citizen', 'star citizen new player'],
    backlinksFrom: ['starcitizenhelp-site'],
    checklist: [
      { label: 'hero images', done: false },
      { label: 'referral URL', done: true },
      { label: 'footer', done: true },
      { label: 'fankit badge', done: false },
    ],
  },
  {
    repo: 'o7meaning-site',
    domain: 'o7meaning.com',
    aliases: [],
    role: 'content',
    roleLabel: 'Definition funnel — "what does o7 mean?"',
    keywords: ['what does o7 mean', 'o7 meaning', 'o7 star citizen'],
    backlinksFrom: ['starcitizenhelp-site', 'o7citizen-main'],
    checklist: [
      { label: 'hero images', done: false },
      { label: 'referral URL', done: true },
      { label: 'footer', done: true },
    ],
  },
  {
    repo: 'bestspacesim-site',
    domain: 'bestspacesim.com',
    aliases: [],
    role: 'content',
    roleLabel: 'Best space sim game comparisons',
    keywords: ['best space sim game', 'space simulation games', 'star citizen vs elite dangerous'],
    backlinksFrom: ['starcitizenhelp-site', 'o7citizen-main'],
    checklist: [
      { label: 'build started', done: false },
    ],
  },
  {
    repo: 'freeflyevent-site',
    domain: 'freeflyevent.com',
    aliases: [],
    role: 'content',
    roleLabel: 'Free Fly event tracker and new player guide',
    keywords: ['star citizen free fly', 'star citizen free trial', 'free fly event'],
    backlinksFrom: ['starcitizenhelp-site', 'o7citizen-main'],
    checklist: [
      { label: 'build started', done: false },
    ],
  },
  {
    repo: 'screferralreward-site',
    domain: 'screferralrewards.com',
    aliases: [],
    role: 'content',
    roleLabel: 'Referral rewards tracker — veteran recruitment ladder',
    keywords: ['star citizen referral rewards', 'referral ladder', 'star citizen recruitment'],
    backlinksFrom: ['starcitizenhelp-site', 'o7citizen-main'],
    checklist: [
      { label: 'build started', done: false },
    ],
  },
  {
    repo: 'screferralbonus-site',
    domain: 'screferralbonus.com',
    aliases: [],
    role: 'content',
    roleLabel: 'Referral bonus conversion — 50,000 UEC for new signups',
    keywords: ['star citizen referral bonus', 'star citizen referral code 2026', '50000 UEC'],
    backlinksFrom: ['starcitizenhelp-site', 'o7citizen-main'],
    checklist: [
      { label: 'all 8 agents complete', done: true },
      { label: 'screenshot placeholders', done: false },
      { label: 'referral URL verified', done: false },
      { label: 'custom domain DNS', done: false },
    ],
  },
  {
    repo: 'pledgemeaning-site',
    domain: 'pledgemeaning.com',
    aliases: [],
    role: 'content',
    roleLabel: 'Definition funnel — "what does pledge mean?"',
    keywords: ['what does pledge mean star citizen', 'star citizen pledge', 'star citizen ship pledge'],
    backlinksFrom: ['starcitizenhelp-site', 'o7citizen-main'],
    checklist: [
      { label: 'build started', done: false },
    ],
  },
  {
    repo: 'fundedgame-site',
    domain: 'highestfundedgame.com',
    aliases: ['mostfundedgame.com'],
    role: 'content',
    roleLabel: 'SC crowdfunding record story',
    keywords: ['highest funded game', 'most funded game', 'star citizen crowdfunding'],
    backlinksFrom: ['starcitizenhelp-site', 'o7citizen-main'],
    checklist: [
      { label: 'build started', done: false },
    ],
  },
  {
    repo: 'o7citizens-redirect',
    domain: 'o7citizens.com',
    aliases: ['o7citizen.gg'],
    role: 'redirect',
    roleLabel: 'Permanent redirects → o7citizen.com',
    keywords: [],
    backlinksFrom: [],
    checklist: [],
  },
  {
    repo: 'starcitizenhelp-site',
    domain: 'starcitizenhelp.com',
    aliases: [],
    role: 'legacy',
    roleLabel: 'Legacy deployment — SEO springboard for new network before sunset',
    keywords: ['star citizen help', 'star citizen how to add friends', 'star citizen guide'],
    sunsetDate: '2026-10-01',
    // Update this list as outbound links are added to starcitizenhelp.com pages.
    // New sites do NOT link back to starcitizenhelp.com (one-way authority flow).
    linksOutTo: [],
    backlinksFrom: [],
    checklist: [],
  },
];
```

- [ ] **Step 3: Verify the file loads cleanly**

```bash
node -e "const s = require('./dashboard/data/sites.js'); console.log(s.length + ' sites loaded')"
```

Run from `E:/Claude Code/sc-portfolio`.
Expected output: `10 sites loaded`

- [ ] **Step 4: Commit**

```bash
git -C "E:/Claude Code/sc-portfolio" add dashboard/data/sites.js
git -C "E:/Claude Code/sc-portfolio" commit -m "feat: dashboard scaffold and site config"
```

---

## Task 2: GSC CSV Parser

**Files:**
- Create: `dashboard/scripts/parse-gsc.js`
- Output: `dashboard/data/gsc-cache.json` (auto-generated, not committed)

- [ ] **Step 1: Verify source CSVs exist**

```bash
ls "E:/Claude Code/sc-portfolio/starcitizenhelp-site/Queries.csv"
ls "E:/Claude Code/sc-portfolio/starcitizenhelp-site/Chart.csv"
```

Both must exist. If missing, stop — the source data is required.

- [ ] **Step 2: Write `dashboard/scripts/parse-gsc.js`**

```javascript
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../..');
const QUERIES_CSV = path.join(ROOT, 'starcitizenhelp-site/Queries.csv');
const CHART_CSV = path.join(ROOT, 'starcitizenhelp-site/Chart.csv');
const OUTPUT = path.join(__dirname, '../data/gsc-cache.json');

function parseCSV(content) {
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = (values[i] || '').trim().replace(/^"|"$/g, '');
    });
    return obj;
  });
}

function run() {
  const queries = parseCSV(fs.readFileSync(QUERIES_CSV, 'utf8'));
  const chart = parseCSV(fs.readFileSync(CHART_CSV, 'utf8'));

  const topQueries = queries.slice(0, 10).map(row => ({
    query: row['Top queries'],
    clicks: parseInt(row['Clicks']) || 0,
    impressions: parseInt(row['Impressions']) || 0,
    ctr: row['CTR'],
    position: parseFloat(row['Position']) || 0,
  }));

  const dailyImpressions = chart
    .filter(row => row['Impressions'] && row['Date'])
    .map(row => ({
      date: row['Date'],
      impressions: parseInt(row['Impressions']) || 0,
    }));

  const avgDailyImpressions = dailyImpressions.length
    ? Math.round(dailyImpressions.reduce((s, d) => s + d.impressions, 0) / dailyImpressions.length)
    : 0;

  // Latest row with an Indexed count
  const indexedRow = chart.slice().reverse().find(r => r['Indexed'] && r['Indexed'] !== '');
  const indexedPages = indexedRow ? parseInt(indexedRow['Indexed']) || 0 : 0;

  const result = { topQueries, dailyImpressions, avgDailyImpressions, indexedPages, generatedAt: Date.now() };
  fs.writeFileSync(OUTPUT, JSON.stringify(result, null, 2));
  console.log(`GSC cache written: ${topQueries.length} queries, avg ${avgDailyImpressions} imp/day, ${indexedPages} indexed pages`);
}

run();
```

- [ ] **Step 3: Run the parser and verify output**

```bash
node "E:/Claude Code/sc-portfolio/dashboard/scripts/parse-gsc.js"
```

Expected console output: something like:
`GSC cache written: 10 queries, avg 1100 imp/day, 19 indexed pages`

Then check the output:
```bash
node -e "const d = require('./dashboard/data/gsc-cache.json'); console.log('Top query:', d.topQueries[0].query, '|', d.topQueries[0].impressions, 'imp')"
```

Run from `E:/Claude Code/sc-portfolio`.
Expected: `Top query: star citizen friend request | 168 imp` (or similar — first row of Queries.csv)

- [ ] **Step 4: Add gsc-cache.json to .gitignore**

Open `E:/Claude Code/sc-portfolio/.gitignore`. If it doesn't exist, create it. Add:

```
.env
dashboard/data/gsc-cache.json
node_modules/
.superpowers/
```

- [ ] **Step 5: Commit**

```bash
git -C "E:/Claude Code/sc-portfolio" add dashboard/scripts/parse-gsc.js .gitignore
git -C "E:/Claude Code/sc-portfolio" commit -m "feat: GSC CSV parser for starcitizenhelp.com search data"
```

---

## Task 3: Data Fetchers

**Files:**
- Create: `dashboard/fetchers.js`

- [ ] **Step 1: Write `dashboard/fetchers.js`**

```javascript
const https = require('https');
const http = require('http');
const { exec } = require('child_process');

const VERCEL_TEAM = 'scottgayden-5755s-projects';
const GITHUB_ORG = 'doc-flanigan';

function fetchJSON(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, {
      headers: { 'User-Agent': 'sc-dashboard/1.0', ...headers },
      timeout: 8000,
    }, res => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error(`JSON parse failed: ${e.message}`)); }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Request timed out')); });
  });
}

async function fetchVercelStatus(site, token) {
  if (!token) return { readyState: 'NO_TOKEN', createdAt: null };
  try {
    const url = `https://api.vercel.com/v6/deployments?app=${site.repo}&teamId=${VERCEL_TEAM}&limit=1`;
    const data = await fetchJSON(url, { Authorization: `Bearer ${token}` });
    const dep = data.deployments && data.deployments[0];
    if (!dep) return { readyState: 'NOT_DEPLOYED', createdAt: null };
    return { readyState: dep.readyState, createdAt: dep.createdAt };
  } catch (e) {
    return { readyState: 'ERROR', createdAt: null, error: e.message };
  }
}

async function fetchGitHubCommit(site, token) {
  try {
    const url = `https://api.github.com/repos/${GITHUB_ORG}/${site.repo}/commits?per_page=1`;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const data = await fetchJSON(url, headers);
    if (!Array.isArray(data) || !data[0]) return { message: null, author: null, timestamp: null };
    const c = data[0].commit;
    return {
      message: c.message.split('\n')[0].slice(0, 72),
      author: c.author.name,
      timestamp: c.author.date,
    };
  } catch (e) {
    return { message: null, author: null, timestamp: null, error: e.message };
  }
}

function pingDomain(domain) {
  return new Promise(resolve => {
    const url = `https://${domain}`;
    const req = https.get(url, { timeout: 5000 }, res => {
      resolve({ ok: res.statusCode < 400, statusCode: res.statusCode });
      res.resume();
    });
    req.on('error', () => resolve({ ok: false, statusCode: null }));
    req.on('timeout', () => { req.destroy(); resolve({ ok: false, statusCode: null, timedOut: true }); });
  });
}

const REPO_PATTERN = /(o7citizen-main|o7meaning-site|bestspacesim-site|freeflyevent-site|screferralreward-site|screferralbonus-site|pledgemeaning-site|fundedgame-site|o7citizens-redirect|starcitizenhelp-site)/i;

function detectClaudeProcesses() {
  return new Promise(resolve => {
    const cmd = `powershell -NoProfile -Command "Get-CimInstance Win32_Process -Filter 'name=""claude.exe""' | Select-Object -ExpandProperty CommandLine"`;
    exec(cmd, { timeout: 10000 }, (err, stdout) => {
      if (err || !stdout.trim()) return resolve([]);
      const repos = stdout.trim().split('\n')
        .map(line => { const m = line.match(REPO_PATTERN); return m ? m[1] : null; })
        .filter(Boolean);
      resolve([...new Set(repos)]);
    });
  });
}

async function pollAllSites(sites, env) {
  const activeClaudeRepos = await detectClaudeProcesses();
  const results = await Promise.all(
    sites.map(async site => {
      const [vercel, github, ping] = await Promise.all([
        fetchVercelStatus(site, env.VERCEL_TOKEN),
        fetchGitHubCommit(site, env.GITHUB_TOKEN),
        pingDomain(site.domain),
      ]);
      return {
        repo: site.repo,
        vercel,
        github,
        ping,
        claudeActive: activeClaudeRepos.includes(site.repo),
      };
    })
  );
  return results;
}

module.exports = { pollAllSites };
```

- [ ] **Step 2: Smoke-test the domain ping function in isolation**

```bash
node -e "
const { pollAllSites } = require('./dashboard/fetchers.js');
const sites = [{ repo: 'test', domain: 'google.com' }];
pollAllSites(sites, {}).then(r => console.log('Ping result:', JSON.stringify(r[0].ping)));
"
```

Run from `E:/Claude Code/sc-portfolio`.
Expected: `Ping result: {"ok":true,"statusCode":200}` (or 301/302 — any < 400 is `ok: true`)

- [ ] **Step 3: Smoke-test GitHub fetch (no token, public repo)**

```bash
node -e "
const { pollAllSites } = require('./dashboard/fetchers.js');
const sites = [{ repo: 'o7citizen-main', domain: 'o7citizen.com' }];
pollAllSites(sites, {}).then(r => console.log('GitHub:', JSON.stringify(r[0].github)));
"
```

Run from `E:/Claude Code/sc-portfolio`.
Expected: object with `message`, `author`, `timestamp` populated — not nulls. If rate-limited, you'll see an error message in the object (that's fine for now; set `GITHUB_TOKEN` in `.env` to fix).

- [ ] **Step 4: Commit**

```bash
git -C "E:/Claude Code/sc-portfolio" add dashboard/fetchers.js
git -C "E:/Claude Code/sc-portfolio" commit -m "feat: data fetchers for Vercel, GitHub, domain ping, Claude process detection"
```

---

## Task 4: Server + Environment Setup

**Files:**
- Create: `dashboard/server.js`
- Create: `.env.example`
- Modify: `package.json` (add dashboard script)

- [ ] **Step 1: Write `dashboard/server.js`**

```javascript
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const sites = require('./data/sites.js');
const { pollAllSites } = require('./fetchers.js');

const PORT = 4000;
const POLL_MS = 60 * 1000;
const GSC_CACHE = path.join(__dirname, 'data/gsc-cache.json');
const GSC_MAX_AGE_MS = 24 * 60 * 60 * 1000;
const PARSE_GSC = path.join(__dirname, 'scripts/parse-gsc.js');

function loadEnv() {
  const envPath = path.join(__dirname, '../.env');
  const env = {};
  if (fs.existsSync(envPath)) {
    fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const idx = trimmed.indexOf('=');
      if (idx === -1) return;
      env[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim();
    });
  }
  return {
    VERCEL_TOKEN: process.env.VERCEL_TOKEN || env.VERCEL_TOKEN || '',
    GITHUB_TOKEN: process.env.GITHUB_TOKEN || env.GITHUB_TOKEN || '',
  };
}

function ensureGscCache() {
  try {
    if (fs.existsSync(GSC_CACHE)) {
      const age = Date.now() - fs.statSync(GSC_CACHE).mtimeMs;
      if (age < GSC_MAX_AGE_MS) return;
    }
    console.log('[gsc] Regenerating GSC cache...');
    execSync(`node "${PARSE_GSC}"`, { stdio: 'inherit' });
  } catch (e) {
    console.warn('[gsc] Could not generate GSC cache:', e.message);
  }
}

function loadGscCache() {
  try {
    if (!fs.existsSync(GSC_CACHE)) return null;
    return JSON.parse(fs.readFileSync(GSC_CACHE, 'utf8'));
  } catch (e) {
    return null;
  }
}

const env = loadEnv();
let cachedStatus = null;

async function doPoll() {
  try {
    const dynamic = await pollAllSites(sites, env);
    const merged = sites.map((site, i) => ({ ...site, ...dynamic[i] }));
    cachedStatus = { sites: merged, gsc: loadGscCache(), polledAt: Date.now() };
    const ts = new Date().toISOString().slice(11, 19);
    console.log(`[${ts}] Polled ${merged.length} sites`);
  } catch (e) {
    console.error('[poll] Error:', e.message);
  }
}

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];

  if (req.method === 'GET' && url === '/') {
    const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(html);
  }

  if (req.method === 'GET' && url === '/api/status') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
    });
    return res.end(JSON.stringify(cachedStatus || { sites: [], gsc: null, polledAt: null }));
  }

  if (req.method === 'GET' && url === '/api/refresh') {
    doPoll().then(() => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, polledAt: cachedStatus?.polledAt }));
    });
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

ensureGscCache();
doPoll();
setInterval(doPoll, POLL_MS);

server.listen(PORT, '127.0.0.1', () => {
  console.log(`\nSC Portfolio Dashboard → http://localhost:${PORT}`);
  console.log(`Polling every ${POLL_MS / 1000}s | Press Ctrl+C to stop\n`);
});
```

- [ ] **Step 2: Write `.env.example`**

Create `E:/Claude Code/sc-portfolio/.env.example`:

```
# Copy to .env and fill in your tokens.
# .env is gitignored — do not commit it.

# Vercel personal access token: vercel.com/account/tokens
VERCEL_TOKEN=

# GitHub personal access token (read:repo scope only, optional — avoids rate limiting on public repos)
GITHUB_TOKEN=
```

- [ ] **Step 3: Add dashboard script to `package.json`**

Open `E:/Claude Code/sc-portfolio/package.json`. The current content is:

```json
{
  "name": "sc-portfolio",
  "version": "1.0.0",
  "main": "extract.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "sharp": "^0.34.5"
  }
}
```

Add the dashboard script:

```json
{
  "name": "sc-portfolio",
  "version": "1.0.0",
  "main": "extract.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dashboard": "node dashboard/server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "sharp": "^0.34.5"
  }
}
```

- [ ] **Step 4: Verify the server starts**

```bash
node "E:/Claude Code/sc-portfolio/dashboard/server.js"
```

Expected output within ~5 seconds:
```
[gsc] (may regenerate cache here)
SC Portfolio Dashboard → http://localhost:4000
Polling every 60s | Press Ctrl+C to stop

[HH:MM:SS] Polled 10 sites
```

Then in a second terminal:
```bash
curl http://localhost:4000/api/status
```

Expected: a JSON object with `sites` array (10 items) and `polledAt` timestamp. Kill the server with Ctrl+C.

- [ ] **Step 5: Commit**

```bash
git -C "E:/Claude Code/sc-portfolio" add dashboard/server.js .env.example package.json
git -C "E:/Claude Code/sc-portfolio" commit -m "feat: dashboard server with polling loop and API endpoints"
```

---

## Task 5: Dashboard UI

**Files:**
- Create: `dashboard/index.html`

This is the full self-contained UI. All CSS and JS are inline. The page fetches `/api/status` on load and every 60 seconds, then re-renders.

- [ ] **Step 1: Write `dashboard/index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>SC Portfolio Dashboard</title>
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: #0d1117;
  color: #e8eaf0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 15px;
  padding: 1rem;
  line-height: 1.4;
}

a { color: inherit; text-decoration: none; }

/* ── Header ── */
.dash-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: #0a0e1a;
  border: 1px solid #1e293b;
  border-radius: 8px;
  margin-bottom: 0.6rem;
}
.dash-title { font-size: 1.1rem; font-weight: 700; color: #f0c040; }
.dash-meta { font-size: 0.75rem; color: #4a5568; margin-top: 2px; }
.stats-row { display: flex; gap: 1.5rem; }
.stat { text-align: center; }
.stat-num { font-size: 1.2rem; font-weight: 700; }
.stat-label { font-size: 0.68rem; color: #4a5568; text-transform: uppercase; letter-spacing: 0.05em; }

/* ── Referral bar ── */
.referral-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  background: #0a0e1a;
  border: 1px solid #1e293b;
  border-radius: 6px;
  margin-bottom: 0.6rem;
  font-size: 0.78rem;
}
.referral-label { color: #4a5568; text-transform: uppercase; letter-spacing: 0.06em; font-size: 0.68rem; white-space: nowrap; }
.referral-url { color: #60a5fa; font-family: monospace; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.copy-btn {
  background: #1e293b;
  border: 1px solid #2d3748;
  color: #94a3b8;
  padding: 3px 12px;
  border-radius: 4px;
  font-size: 0.7rem;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s;
}
.copy-btn:hover { background: #2d3748; color: #e8eaf0; }
.copy-btn.copied { color: #4ade80; border-color: #14532d; }

/* ── Vision panel ── */
.vision-panel {
  background: #0a0e1a;
  border: 1px solid #1e293b;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  margin-bottom: 0.6rem;
}
.vision-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.6rem;
}
.vision-title { font-size: 0.75rem; font-weight: 700; color: #a78bfa; text-transform: uppercase; letter-spacing: 0.06em; }
.vision-sub { font-size: 0.68rem; color: #4a5568; }
.vision-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.6rem; margin-bottom: 0.6rem; }
.vision-tile {
  background: #141c2e;
  border-left: 2px solid #4c1d95;
  border-radius: 4px;
  padding: 0.5rem 0.75rem;
}
.vision-tile-label { font-size: 0.65rem; color: #8892a4; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 3px; }
.vision-tile-val { font-size: 0.95rem; font-weight: 700; color: #a78bfa; }
.vision-tile-sub { font-size: 0.68rem; color: #4a5568; margin-top: 2px; }

.link-map {
  background: #141c2e;
  border-radius: 4px;
  padding: 0.5rem 0.75rem;
  font-size: 0.72rem;
}
.link-map-label { font-size: 0.62rem; color: #4a5568; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 5px; }
.link-flow { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
.link-node {
  padding: 2px 8px;
  border-radius: 3px;
  font-size: 0.68rem;
  background: #1e293b;
}
.link-node-legacy { color: #f87171; border: 1px solid #7f1d1d44; }
.link-node-hub { color: #f0c040; border: 1px solid #78600544; }
.link-node-content { color: #60a5fa; border: 1px solid #1e3a5f44; }
.link-arrow { color: #4a5568; }
.link-note { font-size: 0.65rem; color: #4a5568; margin-top: 5px; }
.seo-plan-link { font-size: 0.68rem; color: #4a5568; font-style: italic; margin-top: 4px; }
.seo-plan-link a { color: #60a5fa; }

/* ── Section label ── */
.section-label {
  font-size: 0.68rem;
  color: #4a5568;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
  margin: 0.75rem 0 0.3rem;
  padding-left: 2px;
}

/* ── Site rows ── */
.site-list { display: flex; flex-direction: column; gap: 2px; }

.site-row {
  display: grid;
  grid-template-columns: 200px 110px 1fr auto;
  gap: 0.75rem;
  align-items: start;
  padding: 0.65rem 0.75rem;
  background: #161b22;
  border: 1px solid #21262d;
  border-radius: 6px;
  transition: border-color 0.15s;
}
.site-row:hover { border-color: #30363d; }
.site-row-hub { border-left: 3px solid #f0c040; }
.site-row-content { border-left: 3px solid #3b82f6; }
.site-row-legacy { border-left: 3px solid #dc2626; }
.site-row-redirect { border-left: 3px solid #4b5563; opacity: 0.7; }

/* Domain column */
.domain-name { font-weight: 600; font-size: 0.95rem; line-height: 1.2; }
.domain-name-hub { color: #f0c040; }
.domain-name-content { color: #e8eaf0; }
.domain-name-legacy { color: #f87171; }
.domain-name-redirect { color: #94a3b8; }
.domain-aliases { font-size: 0.72rem; color: #4a5568; margin-top: 2px; }
.repo-name { font-size: 0.68rem; color: #4a5568; font-family: monospace; margin-top: 2px; }
.sunset-badge {
  display: inline-block;
  margin-top: 4px;
  font-size: 0.65rem;
  background: #7f1d1d33;
  color: #f87171;
  border: 1px solid #dc262644;
  padding: 1px 7px;
  border-radius: 3px;
}

/* Status column */
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 9px;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 600;
  white-space: nowrap;
}
.badge-live { background: #14532d33; color: #4ade80; border: 1px solid #16a34a44; }
.badge-building { background: #78350f33; color: #fbbf24; border: 1px solid #d9770644; }
.badge-failed { background: #7f1d1d33; color: #f87171; border: 1px solid #dc262644; }
.badge-legacy { background: #7f1d1d33; color: #f87171; border: 1px solid #dc262644; }
.badge-redirect { background: #1e293b; color: #94a3b8; border: 1px solid #334155; }
.badge-unknown { background: #1e293b; color: #6b7280; border: 1px solid #374151; }
.status-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.deploy-time { font-size: 0.68rem; color: #4a5568; margin-top: 3px; }
.ping-ok { font-size: 0.68rem; color: #4ade80; margin-top: 2px; }
.ping-fail { font-size: 0.68rem; color: #f87171; margin-top: 2px; }
.claude-active { font-size: 0.65rem; color: #a78bfa; margin-top: 3px; }

/* Info column */
.role-label { font-size: 0.78rem; color: #8892a4; margin-bottom: 4px; }
.commit-line {
  font-size: 0.72rem;
  color: #4a5568;
  font-family: monospace;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 420px;
}
.commit-line span { color: #60a5fa; }

/* SEO block */
.seo-block {
  background: #0d1117;
  border: 1px solid #1e293b;
  border-radius: 4px;
  padding: 5px 7px;
  margin-top: 4px;
  font-size: 0.72rem;
}
.seo-row { display: flex; align-items: baseline; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 2px; }
.seo-lbl { font-size: 0.62rem; color: #4a5568; text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap; }
.seo-kw { color: #60a5fa; }
.seo-sep { color: #374151; }
.seo-stat-green { color: #4ade80; }
.seo-stat-yellow { color: #fbbf24; }
.seo-stat-muted { color: #8892a4; }
.seo-stat-red { color: #f87171; }
.backlink-ok { color: #4ade80; }
.backlink-miss { color: #4a5568; }

/* GSC query bars */
.gsc-bars { margin-top: 4px; }
.gsc-bar-row { display: flex; align-items: center; gap: 6px; margin-bottom: 3px; }
.gsc-query { color: #8892a4; font-size: 0.68rem; min-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.gsc-track { background: #1e293b; border-radius: 2px; height: 5px; width: 80px; }
.gsc-fill { background: #4ade80; height: 5px; border-radius: 2px; }
.gsc-pos { color: #fbbf24; font-size: 0.68rem; min-width: 44px; text-align: right; }
.gsc-imp { color: #4a5568; font-size: 0.68rem; min-width: 54px; text-align: right; }

/* Checklist badges */
.checklist { display: flex; gap: 5px; flex-wrap: wrap; margin-top: 4px; }
.check-badge { font-size: 0.65rem; padding: 1px 7px; border-radius: 3px; }
.check-done { background: #14532d33; color: #4ade80; }
.check-warn { background: #78350f33; color: #fbbf24; }

/* Links column */
.link-group { display: flex; flex-direction: column; gap: 4px; }
.link-btn {
  display: block;
  background: #1e293b;
  border: 1px solid #2d3748;
  color: #94a3b8;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.72rem;
  text-align: center;
  white-space: nowrap;
  transition: background 0.15s;
}
.link-btn:hover { background: #2d3748; color: #e8eaf0; }

/* Footer */
.dash-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.75rem;
  padding: 0.5rem 0.75rem;
  background: #0a0e1a;
  border: 1px solid #1e293b;
  border-radius: 6px;
  font-size: 0.68rem;
  color: #4a5568;
}
.api-indicators { display: flex; gap: 1rem; }
.api-dot { display: inline-flex; align-items: center; gap: 5px; }
.dot { width: 6px; height: 6px; border-radius: 50%; }
.dot-ok { background: #4ade80; }
.dot-warn { background: #fbbf24; }
.dot-err { background: #f87171; }
.refresh-btn {
  background: #1e293b;
  border: 1px solid #2d3748;
  color: #94a3b8;
  padding: 3px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.7rem;
  transition: background 0.15s;
}
.refresh-btn:hover { background: #2d3748; color: #e8eaf0; }
</style>
</head>
<body>

<div id="root"><p style="color:#4a5568;padding:2rem">Loading dashboard...</p></div>

<script>
const REFERRAL_URL = 'https://www.robertsspaceindustries.com/enlist?referral=STAR-GCQJ-N6NC';
const VERCEL_BASE = 'https://vercel.com/scottgayden-5755s-projects';
const GITHUB_BASE = 'https://github.com/doc-flanigan';
const SUNSET_DATE = new Date('2026-10-01');

let lastPolledAt = null;
let secondsTimer = null;

// ── Helpers ──────────────────────────────────────────────────────────────────

function relativeTime(iso) {
  if (!iso) return 'unknown';
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 2) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function relativeMs(ms) {
  if (!ms) return '—';
  const diffMs = Date.now() - ms;
  const secs = Math.floor(diffMs / 1000);
  if (secs < 60) return `${secs}s ago`;
  return relativeTime(new Date(ms).toISOString());
}

function monthsUntil(date) {
  const now = new Date();
  const diff = (date.getFullYear() - now.getFullYear()) * 12 + (date.getMonth() - now.getMonth());
  return Math.max(0, diff);
}

function deriveStatus(site) {
  if (site.role === 'redirect') return 'REDIRECT';
  if (site.role === 'legacy') return 'LEGACY';
  const rs = site.vercel?.readyState;
  if (rs === 'READY' && site.ping?.ok) return 'LIVE';
  if (rs === 'BUILDING' || rs === 'QUEUED') return 'BUILDING';
  if (rs === 'ERROR') return 'FAILED';
  if (rs === 'NOT_DEPLOYED' || rs === 'NO_TOKEN') return 'BUILDING';
  return 'UNKNOWN';
}

function statusBadge(status) {
  const map = {
    LIVE: 'badge-live', BUILDING: 'badge-building', FAILED: 'badge-failed',
    LEGACY: 'badge-legacy', REDIRECT: 'badge-redirect', UNKNOWN: 'badge-unknown',
  };
  const dot = status !== 'REDIRECT' ? '<span class="status-dot"></span>' : '→';
  const label = status === 'REDIRECT' ? 'REDIRECT' : status;
  return `<span class="status-badge ${map[status] || 'badge-unknown'}">${dot}${label}</span>`;
}

function gscBarRows(topQueries) {
  if (!topQueries || !topQueries.length) return '';
  const maxImp = Math.max(...topQueries.slice(0, 3).map(q => q.impressions));
  return topQueries.slice(0, 3).map(q => {
    const pct = maxImp > 0 ? Math.round((q.impressions / maxImp) * 100) : 0;
    return `<div class="gsc-bar-row">
      <span class="gsc-query">${q.query}</span>
      <div class="gsc-track"><div class="gsc-fill" style="width:${pct}%"></div></div>
      <span class="gsc-pos">pos ${q.position.toFixed(1)}</span>
      <span class="gsc-imp">${q.impressions.toLocaleString()} imp</span>
    </div>`;
  }).join('');
}

function checklistBadges(checklist) {
  if (!checklist || !checklist.length) return '';
  return `<div class="checklist">${checklist.map(c =>
    `<span class="check-badge ${c.done ? 'check-done' : 'check-warn'}">${c.done ? '✓' : '⚠'} ${c.label}</span>`
  ).join('')}</div>`;
}

function seoBadge(label, has) {
  return `<span class="${has ? 'backlink-ok' : 'backlink-miss'}">${has ? '✓' : '✗'} ${label}</span>`;
}

// ── Row renderers ─────────────────────────────────────────────────────────────

function renderRow(site, gsc) {
  const status = deriveStatus(site);
  const rowClass = `site-row site-row-${site.role}`;
  const nameClass = `domain-name domain-name-${site.role}`;
  const isLive = status === 'LIVE';

  // Domain col
  const aliases = site.aliases?.length
    ? `<div class="domain-aliases">+ ${site.aliases.join(', ')}</div>` : '';
  const sunsetBadge = site.role === 'legacy'
    ? `<div><span class="sunset-badge">SUNSET ~Oct 2026 (${monthsUntil(SUNSET_DATE)}mo)</span></div>` : '';
  const domainCol = `
    <div>
      <div class="${nameClass}">${site.domain}</div>
      ${aliases}
      <div class="repo-name">${site.repo}</div>
      ${sunsetBadge}
    </div>`;

  // Status col
  const deployTime = site.vercel?.createdAt
    ? `<div class="deploy-time">deployed ${relativeTime(new Date(site.vercel.createdAt).toISOString())}</div>` : '';
  const pingLine = site.role === 'redirect' ? ''
    : site.ping?.ok
      ? `<div class="ping-ok">⬤ ${site.ping.statusCode} OK</div>`
      : `<div class="ping-fail">⬤ not live</div>`;
  const claudeLine = site.claudeActive
    ? `<div class="claude-active">⬡ Claude active</div>` : '';
  const statusCol = `
    <div>
      ${statusBadge(status)}
      ${deployTime}
      ${pingLine}
      ${claudeLine}
    </div>`;

  // Info col — build SEO block
  let seoBlock = '';
  if (site.role === 'legacy' && gsc) {
    const linksOut = site.linksOutTo || [];
    seoBlock = `<div class="seo-block">
      <div class="seo-row">
        <span class="seo-lbl">GSC</span>
        <span class="seo-stat-green">~${gsc.avgDailyImpressions.toLocaleString()} imp/day</span>
        <span class="seo-stat-muted">${gsc.indexedPages} indexed pages</span>
      </div>
      <div class="gsc-bars">${gscBarRows(gsc.topQueries)}</div>
      <div class="seo-row" style="margin-top:5px">
        <span class="seo-lbl">Links out to</span>
        ${linksOut.length ? linksOut.map(r => `<span class="seo-stat-green">${r}</span>`).join('<span class="seo-sep">·</span>') : '<span class="seo-stat-muted">none added yet</span>'}
      </div>
    </div>`;
  } else if (site.role === 'content' || site.role === 'hub') {
    const kws = (site.keywords || []).map(k => `<span class="seo-kw">${k}</span><span class="seo-sep">·</span>`).join('').replace(/<span class="seo-sep">·<\/span>$/, '');
    const blFromSCH = (site.backlinksFrom || []).includes('starcitizenhelp-site');
    const blFromHub = site.role === 'hub' ? null : (site.backlinksFrom || []).includes('o7citizen-main');
    const backlinkRow = site.role !== 'hub' ? `
      <div class="seo-row">
        <span class="seo-lbl">Linked from</span>
        ${seoBadge('starcitizenhelp', blFromSCH)}
        ${blFromHub !== null ? seoBadge('o7citizen.com', blFromHub) : ''}
      </div>` : '';
    seoBlock = `<div class="seo-block">
      <div class="seo-row"><span class="seo-lbl">Keywords</span>${kws}</div>
      ${backlinkRow}
    </div>`;
  }

  const commitLine = site.github?.message
    ? `<div class="commit-line">⬡ <span>${site.github.message}</span> · ${relativeTime(site.github.timestamp)}</div>` : '';

  const infoCol = `
    <div>
      <div class="role-label">${site.roleLabel}</div>
      ${commitLine}
      ${seoBlock}
      ${checklistBadges(site.checklist)}
    </div>`;

  // Links col
  const liveLink = isLive ? `<a class="link-btn" href="https://${site.domain}" target="_blank">🌐 Visit</a>` : '';
  const linksCol = `
    <div class="link-group">
      ${liveLink}
      <a class="link-btn" href="${GITHUB_BASE}/${site.repo}" target="_blank">⬡ GitHub</a>
      <a class="link-btn" href="${VERCEL_BASE}/${site.repo}" target="_blank">▲ Vercel</a>
    </div>`;

  return `<div class="${rowClass}">${domainCol}${statusCol}${infoCol}${linksCol}</div>`;
}

// ── Full render ───────────────────────────────────────────────────────────────

function render(data) {
  if (!data || !data.sites) {
    document.getElementById('root').innerHTML = '<p style="color:#f87171;padding:2rem">Failed to load status. Is the server running?</p>';
    return;
  }

  const { sites, gsc, polledAt } = data;
  lastPolledAt = polledAt;

  const hub = sites.find(s => s.role === 'hub');
  const legacy = sites.find(s => s.role === 'legacy');
  const redirect = sites.find(s => s.role === 'redirect');
  const content = sites
    .filter(s => s.role === 'content')
    .sort((a, b) => {
      const order = { LIVE: 0, BUILDING: 1, FAILED: 2, UNKNOWN: 3 };
      return (order[deriveStatus(a)] ?? 3) - (order[deriveStatus(b)] ?? 3);
    });

  const liveCount = sites.filter(s => deriveStatus(s) === 'LIVE').length;
  const buildCount = sites.filter(s => ['BUILDING', 'FAILED'].includes(deriveStatus(s))).length;
  const redirectCount = sites.filter(s => deriveStatus(s) === 'REDIRECT').length;
  const claudeCount = sites.filter(s => s.claudeActive).length;

  // Vision panel
  const sunsetMo = monthsUntil(SUNSET_DATE);
  const topQuery = gsc?.topQueries?.[0];
  const visionPanel = `
    <div class="vision-panel">
      <div class="vision-header">
        <span class="vision-title">⬡ Network Vision</span>
        <span class="vision-sub">Target: 6 content sites live by Q3 2026</span>
      </div>
      <div class="vision-grid">
        <div class="vision-tile">
          <div class="vision-tile-label">GSC Impressions (legacy)</div>
          <div class="vision-tile-val">~${gsc ? gsc.avgDailyImpressions.toLocaleString() : '—'}<span style="font-size:0.72rem;color:#4a5568">/day</span></div>
          <div class="vision-tile-sub">starcitizenhelp.com · Jan–Apr 2026</div>
        </div>
        <div class="vision-tile">
          <div class="vision-tile-label">Sunset Countdown</div>
          <div class="vision-tile-val" style="color:#f87171">~${sunsetMo} mo</div>
          <div class="vision-tile-sub">starcitizenhelp.com → archive Oct 2026</div>
        </div>
        <div class="vision-tile">
          <div class="vision-tile-label">Top Legacy Query</div>
          <div class="vision-tile-val" style="font-size:0.78rem;color:#60a5fa">${topQuery ? topQuery.query : '—'}</div>
          <div class="vision-tile-sub">${topQuery ? `${topQuery.impressions.toLocaleString()} imp · pos ${topQuery.position.toFixed(1)} · target: o7citizen.com` : ''}</div>
        </div>
      </div>
      <div class="link-map">
        <div class="link-map-label">SEO authority flow (one-way)</div>
        <div class="link-flow">
          <span class="link-node link-node-legacy">starcitizenhelp.com</span>
          <span class="link-arrow">→</span>
          <span class="link-node link-node-hub">o7citizen.com</span>
          <span class="link-arrow">·</span>
          <span class="link-node link-node-content">o7meaning.com</span>
          <span class="link-arrow">·</span>
          <span class="link-node link-node-content">freeflyevent.com</span>
          <span class="link-arrow">·</span>
          <span class="link-node link-node-content">bestspacesim.com</span>
          <span class="link-arrow">·</span>
          <span class="link-node link-node-content">+ more</span>
        </div>
        <div class="link-note">New sites do not link back to starcitizenhelp.com</div>
        <div class="seo-plan-link">SEO Plan: <a href="#">[link when ready]</a></div>
      </div>
    </div>`;

  const html = `
    <div class="dash-header">
      <div>
        <div class="dash-title">SC Portfolio Dashboard</div>
        <div class="dash-meta">doc-flanigan · ${sites.length} repos · <span id="refresh-ago">—</span></div>
      </div>
      <div class="stats-row">
        <div class="stat"><div class="stat-num" style="color:#4ade80">${liveCount}</div><div class="stat-label">Live</div></div>
        <div class="stat"><div class="stat-num" style="color:#fbbf24">${buildCount}</div><div class="stat-label">Building</div></div>
        <div class="stat"><div class="stat-num" style="color:#94a3b8">${redirectCount}</div><div class="stat-label">Redirect</div></div>
        <div class="stat"><div class="stat-num" style="color:#a78bfa">${claudeCount}</div><div class="stat-label">Claude Active</div></div>
      </div>
    </div>

    <div class="referral-bar">
      <span class="referral-label">Referral URL</span>
      <span class="referral-url">${REFERRAL_URL}</span>
      <button class="copy-btn" onclick="copyReferral(this)">Copy</button>
    </div>

    ${visionPanel}

    <div class="section-label">★ Primary Hub</div>
    <div class="site-list">${hub ? renderRow(hub, gsc) : ''}</div>

    <div class="section-label">Content Sites</div>
    <div class="site-list">${content.map(s => renderRow(s, gsc)).join('')}</div>

    <div class="section-label">Legacy — SEO Springboard</div>
    <div class="site-list">${legacy ? renderRow(legacy, gsc) : ''}</div>

    <div class="section-label">Redirects</div>
    <div class="site-list">${redirect ? renderRow(redirect, gsc) : ''}</div>

    <div class="dash-footer">
      <div class="api-indicators">
        <span class="api-dot"><span class="dot ${data.sites.some(s => s.vercel?.readyState && s.vercel.readyState !== 'NO_TOKEN') ? 'dot-ok' : 'dot-warn'}"></span> Vercel API</span>
        <span class="api-dot"><span class="dot ${data.sites.some(s => s.github?.message) ? 'dot-ok' : 'dot-warn'}"></span> GitHub API</span>
        <span class="api-dot"><span class="dot ${data.sites.some(s => s.ping?.ok) ? 'dot-ok' : 'dot-warn'}"></span> Domain pings</span>
      </div>
      <span>Auto-refreshes every 60s</span>
      <button class="refresh-btn" onclick="manualRefresh()">↺ Refresh now</button>
    </div>`;

  document.getElementById('root').innerHTML = html;
  startSecondsTicker();
}

// ── Data fetching ─────────────────────────────────────────────────────────────

function fetchStatus() {
  return fetch('/api/status')
    .then(r => r.json())
    .then(data => { render(data); })
    .catch(() => {
      document.getElementById('root').innerHTML =
        '<p style="color:#f87171;padding:2rem">Cannot reach dashboard server. Run <code>npm run dashboard</code> and refresh.</p>';
    });
}

function manualRefresh() {
  fetch('/api/refresh').then(() => fetchStatus());
}

function startSecondsTicker() {
  if (secondsTimer) clearInterval(secondsTimer);
  secondsTimer = setInterval(() => {
    const el = document.getElementById('refresh-ago');
    if (el && lastPolledAt) el.textContent = 'refreshed ' + relativeMs(lastPolledAt);
  }, 1000);
}

function copyReferral(btn) {
  navigator.clipboard.writeText(REFERRAL_URL).then(() => {
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
  });
}

// ── Boot ──────────────────────────────────────────────────────────────────────

fetchStatus();
setInterval(fetchStatus, 60000);
</script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git -C "E:/Claude Code/sc-portfolio" add dashboard/index.html
git -C "E:/Claude Code/sc-portfolio" commit -m "feat: dashboard UI — self-contained HTML with live polling"
```

---

## Task 6: End-to-End Smoke Test

- [ ] **Step 1: Create `.env` with your tokens**

Create `E:/Claude Code/sc-portfolio/.env` (not committed):

```
VERCEL_TOKEN=your_actual_vercel_token_here
GITHUB_TOKEN=your_actual_github_token_here
```

Get your Vercel token at: `vercel.com/account/tokens` (create a new one, read-only scope is fine).
Get your GitHub token at: `github.com/settings/tokens` — create a classic token with `public_repo` scope.

- [ ] **Step 2: Start the server**

```bash
npm run dashboard
```

Run from `E:/Claude Code/sc-portfolio`.
Expected output:
```
SC Portfolio Dashboard → http://localhost:4000
Polling every 60s | Press Ctrl+C to stop

[HH:MM:SS] Polled 10 sites
```

- [ ] **Step 3: Open the dashboard**

Open `http://localhost:4000` in your browser. Verify:
- Header shows correct repo count (10) and a "refreshed Ns ago" counter ticking
- Referral URL bar shows the full RSI URL with Copy button
- Vision panel shows GSC impressions and sunset countdown
- All 10 sites appear in their correct sections (hub / content / legacy / redirect)
- Content sites show keywords and backlink badges
- Legacy site shows top 3 GSC queries with bar charts
- Links column shows GitHub and Vercel buttons (Visit button only for live sites)

- [ ] **Step 4: Verify Vercel data**

Check that at least `screferralbonus-site` (known-live) shows `LIVE` badge and a deploy timestamp. If Vercel shows `NO_TOKEN`, your `VERCEL_TOKEN` isn't loading — double-check `.env` file location and format.

- [ ] **Step 5: Verify GitHub data**

Check that commit messages appear in the info column. If they show `null`, your GitHub rate limit may be hit — add a `GITHUB_TOKEN` to `.env`.

- [ ] **Step 6: Test manual refresh**

Click "↺ Refresh now". The "refreshed Ns ago" counter should reset to "0s ago" within a few seconds.

- [ ] **Step 7: Final commit**

```bash
git -C "E:/Claude Code/sc-portfolio" add .
git -C "E:/Claude Code/sc-portfolio" status
```

Confirm only `dashboard/data/gsc-cache.json` and `.env` are untracked (both should be gitignored). Then:

```bash
git -C "E:/Claude Code/sc-portfolio" commit -m "feat: complete SC portfolio dashboard — Vercel, GitHub, ping, Claude detection, GSC data"
```

---

## Self-Review Notes

**Spec coverage check:**
- ✅ All 10 sites in `sites.js`
- ✅ Vercel API (v6 deployments endpoint, team slug, token)
- ✅ GitHub API (last commit message, author, timestamp)
- ✅ Domain ping (server-side, 5s timeout, `ok: statusCode < 400`)
- ✅ Claude process detection (PowerShell `Get-CimInstance`, not deprecated wmic)
- ✅ GSC CSV parser (`parse-gsc.js`, auto-runs if cache missing or >24h old)
- ✅ Header bar with stats
- ✅ Referral bar with copy button
- ✅ Vision panel (GSC tiles, sunset countdown, link flow diagram, SEO plan placeholder)
- ✅ Site sections: hub / content / legacy / redirect
- ✅ Dense list rows: 4-column grid (domain, status, info, links)
- ✅ Status derivation logic (LIVE, BUILDING, FAILED, LEGACY, REDIRECT, UNKNOWN)
- ✅ SEO block per row (keywords + backlinks for content; GSC bars + linksOutTo for legacy)
- ✅ Pre-launch checklist badges
- ✅ Auto-refresh every 60s (server poll + client poll)
- ✅ Manual refresh button
- ✅ "Refreshed Ns ago" ticker
- ✅ Font size 15px base for ultrawide
- ✅ No external npm deps in server.js (stdlib only)
- ✅ `.env.example` provided
- ✅ `gsc-cache.json` gitignored
- ✅ `npm run dashboard` script in package.json
- ✅ One-way link flow (starcitizenhelp → new sites, NOT reverse)
