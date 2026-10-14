# Game.log Checker: design

**Date:** 2026-10-14 · **Owner:** Doc · **Status:** approved in conversation, awaiting written-spec review
**Site:** starcitizenhelp.com (`StarCitizenHelp-live`), which becomes help.dayonecitizen.com in January 2027
**Deadline:** public launch by **Nov 5, 2026**, before the IAE structure freeze (~Nov 6)

## 1. Intent

**What Doc asked for:** a tool where players give it their Star Citizen `Game.log` and get a diagnosis.
Doc wants it to be explicit that the log never leaves the player's browser and that no information
is sent. Friends and org mates will test it with their own logs.

**Goals, in priority order:**
1. Actually help players who crashed, got disconnected, or got stuck loading: plain English, a
   concrete fix, and the official RSI source.
2. Earn links and search traffic. Tools get linked, and searches like "game.log", "star citizen
   crash" and "error 30000" are steady.
3. Feed the funnel to dayone's bug-report guides and the new-player CTA.

**Success:**
- Correct, useful verdicts for the common cases: crash, GPU crash, disconnect code, froze/closed,
  stuck loading, wrong GPU, below minimum specs, overlays, old log.
- Other sites link to it.
- It ranks for error-code and Game.log searches.
- Beta testers find no wrong verdicts on their logs.

**Non-goals for v1:** the Discord bot (phase 2, after IAE), an AI-written explanation, judging driver
age, shareable report links, and any server-side processing.

## 2. Evidence base (Doc's local logs, scanned 2026-10-14)

There are 129 logs (LIVE `logbackups` + PTU, Oct 2024 → Oct 2026), from 337 to 49,834 lines each,
median 3,719. Findings:
- **Noise:** 108,897 `[Error]` lines are routine and harmless. "CPU Particle Limit reached" alone
  accounts for 76,073 of them. The tool must not report these as problems.
- **Clean exit:** 120 of 129 sessions end with the `<SystemQuit>` tag. The other 9 ended
  abnormally; 4 of those carry the crash-handler block.
- **Crash-handler block:** "Cloud Imperium Games public crash handler taking over...",
  `Is fatal error: Yes/No`, `Is GPU crash: Yes/No`, and saved-file lines for `error.dmp`,
  `screenshot.jpg`, `cvar.dump`, `build.info` and `game.log` under
  `%LOCALAPPDATA%\Star Citizen\Crashes\`.
- **Disconnect codes:** `<Error Popup Opened> errorCode=N [Team_UI][Disconnection]`, in 10 sessions.
- **Stuck loading:** `<CContextEstablisherTaskLongWait> ... "CET running for a long time"`.
- **System header** (every log): `Host CPU:`, `Logical CPU Count:`, `Windows ... (build ...)`,
  `Branch: sc-alpha-X.Y.Z`, `Changelist:`, `BuildDateStamp:`, physical memory, the
  `[VK] Chosen Vulkan GPU Device (<name>) Driver Version (<ver>)` line, and
  `[VK] Available Vulkan Layer - Layer: <name>` lines (OBS, Steam, GOG Galaxy, Rockstar).
- **Personal data in logs:** handle, Windows username inside paths, IPs, session/mission/player IDs.

**Official sources:** the RSI Knowledge Base has per-code articles for 30000, 30003, 30009/30018,
30028, 19000/19005, 60015, 65000, 41070, 8001/8004, 1032 and 1034. It also has articles on
pagefile/out of memory, unsupported apps & overlays, Vulkan troubleshooting, keeping graphics drivers
up to date, sending in-game files to RSI support, and the current known issues.

## 3. Privacy (headline requirement, technically enforced)

1. **No network request carries log data.** The engine is pure and contains no `fetch`,
   `XMLHttpRequest`, `navigator.sendBeacon` or `WebSocket`; a test enforces this. Click tracking
   (`/api/log`) fires only on the referral CTA and sends only its label.
2. **No persistence:** no localStorage, sessionStorage, IndexedDB or cookies for log data. The log
   lives only in component state. "Clear" and closing the tab erase it.
3. **CSP on this route:** `connect-src 'self'`. Vercel Analytics posts to a same-origin path, so
   `'self'` covers it. Verify this during the build, and if any existing script needs another host,
   list that host explicitly in the spec before shipping. Even a compromised script can't send data
   to a third-party host.
4. **Redaction** is applied to every displayed example line and to the bug-report text. It covers
   the handle (read from the log's own login/nickname lines), `C:\Users\<name>\` →
   `C:\Users\<you>\` (including names with spaces), IPv4/IPv6, GUIDs and long hex/numeric IDs
   (session, mission, player, account) and emails. The full raw log is never displayed.
5. **Copy matches the code:**
   - Privacy banner above the drop zone: "Your log never leaves your computer. It's read right here
     in your browser. Nothing is uploaded, stored or sent anywhere. Try it with your internet off."
   - FAQ entry: "Is my log uploaded anywhere?"
   - The bug-report copy is labelled "check before you paste".
6. **Usage measurement:** page views only, through the existing Vercel Analytics. There is no
   "check ran" event, because any usage event would contradict "no info is sent".

## 4. Page & UX: `/tools/game-log-checker`

- **Title:** "Star Citizen Game.log Checker: Find Out Why Your Game Crashed", with a matching
  description. Registered in the sitemap only at launch.
- **Order:**
  1. Privacy banner (§3.5).
  2. "Where's my Game.log?" box: `...\StarCitizen\LIVE\Game.log`, the `logbackups` folder for
     older sessions, and the `Crashes` folder, with a copy-paste path. Tip: check the log right
     after the problem, before relaunching, because a relaunch overwrites `Game.log`.
  3. Input: drag-and-drop or file picker, plus a paste-text area for logs shared on Discord.
  4. Report card:
     - verdict;
     - problems: what it means, what to try, and the official source;
     - setup: build and current-or-not, GPU and driver, CPU and cores, RAM, Windows, renderer,
       overlays;
     - harmless-noise count with a one-line explanation;
     - "Copy for bug report" and a link to dayone `/report-a-bug/gathering-evidence`.
  5. Below the tool: a short common-problems guide and an FAQ.
- **JSON-LD:** WebApplication and FAQPage, matching the visible content.
- **Site wiring:** a card on `/tools`; a `/tools` → checker link; an `llms.txt` entry.
- **Mobile:** paste works on phones, where players often have the log from Discord. The layout is
  usable at 360 px.
- **Limits:** 100 MB max input. Non-log or empty input gets a friendly "this doesn't look like a
  Star Citizen Game.log" message, detected by the absence of any `Branch: sc-alpha` / `<SystemQuit>`
  / CIG header markers.

## 5. Architecture: `src/lib/gamelog/`

Pure TypeScript, with no DOM and no Node APIs, so a Discord bot can reuse it unchanged in phase 2
(the engine moves to a shared package at that point, not now).

| Unit | Responsibility | Interface |
|---|---|---|
| `types.ts` | Shared types | `LogLine`, `SystemInfo`, `Finding`, `Verdict`, `Report`, `Rule` |
| `parse.ts` | Split text into lines and parse the `<ts> [Sev] <Tag> msg` structure. Keeps untagged lines (crash block, header) with line numbers. | `parse(text): LogLine[]` |
| `system.ts` | Extract the setup from the header and VK lines | `extractSystem(lines): SystemInfo` |
| `noise.ts` | Known-harmless tag list and counts | `countNoise(lines): {total, top: [tag, n][]}` |
| `errorCodes.ts` | Code → {title, meaning, fixes[], kbUrl}, for RSI-documented codes only | `lookupCode(n)`; unknown codes → `null` |
| `rules.ts` | Rule data. Each rule has id, severity (`problem` / `warning` / `info`), match (pattern or small function), explanation, fixes, sources[], and an `unverified` flag. | `RULES: Rule[]` |
| `diagnose.ts` | Orchestration: parse → system → rules → verdict → report | `diagnose(text, opts?: {liveVersion}): Report` |
| `redact.ts` | Strip personal data (§3.4) | `redact(text, ctx): string` |
| `bugReport.ts` | Plain-text bug-report summary, always redacted | `toBugReport(report): string` |

- **Current version:** comes from `LIVE_VERSION` in `src/data/patch-status.ts`, which is already
  machine-owned. It's passed into `diagnose()` so the engine stays pure, and compared with the log's
  `Branch: sc-alpha-X.Y.Z`.
- **UI:** `src/app/tools/game-log-checker/page.tsx` holds the metadata, static guide/FAQ and
  JSON-LD. `src/views/GameLogChecker.tsx` is the client component: read file → `diagnose()` →
  render. No other logic lives in the UI.

## 6. v1 rules

**Verdict precedence:**
1. Crashed (crash-handler block; shows GPU crash Yes/No and fatal Yes/No)
2. Disconnected with error N
3. Froze or was closed (no `SystemQuit`, no crash block)
4. Stuck loading (CET long-wait lines among the final entries)
5. Ended normally

**Problems:**
- **`crash-gpu`:** update graphics drivers, disable overlays, try switching between Vulkan and
  DX11. Sources: KB "Keep Graphics Drivers Up-to-date" and "Vulkan Troubleshooting".
- **`crash-other`:** send the Crashes-folder files to RSI support ("Send In-Game Files for RSI
  Support"), and link to dayone report-a-bug.
- **`error-code`:** one entry per documented code (§2), each with the code-specific meaning and
  fix and a link to its KB article. An unknown code reads "code N isn't documented by RSI yet",
  with a link to RSI support.
- **`stuck-loading`:** relog and wait. Labelled "common cause", because RSI doesn't document it.
- **`out-of-memory` 🧪:** KB pagefile article. Ships only after a beta log confirms the exact
  string.

**Warnings:**
- **`wrong-gpu`:** the `Chosen Vulkan GPU Device` (or the DX adapter actually used) matches the
  Microsoft Basic Render Driver or an integrated-graphics name (Intel UHD/Iris/Arc integrated, AMD
  "Radeon(TM) Graphics"). If another adapter in the log's adapter list is a discrete GPU, the
  warning names it ("the game picked your built-in graphics instead of your <name>"). Otherwise it
  says integrated graphics are below the minimum.
- **`below-min-specs`:** RAM under 16 GB, or logical CPUs under 4, judged against RSI's minimum
  requirements.
- **`overlays-installed`:** OBS, Steam, GOG Galaxy or Rockstar Vulkan layers. Worded as "can hook
  into the game; if you crash, try turning them off", never as a cause. Source: KB "Unsupported
  Applications, Peripherals, and Overlays".
- **`old-build`:** the log's branch is older than `LIVE_VERSION`.

**Info:** **`ptu-log`** (report via the PTU channel); the setup summary; the noise count.

A rule marked 🧪 stays disabled until a fixture proves its pattern.

## 7. Accuracy & ledger

- Every error-code meaning is a factual claim. Add one ledger claim per code group under
  `docs/claims/` with the KB URL as the source and the checker route in `usage`.
- Copy follows the network tone rules in `SHARED_CONVENTIONS.md`.
- When the KB and the game files disagree, the game files win
  (see the 2026-10-14 quantum-key lesson).

## 8. Testing

- **Framework:** add Vitest to `StarCitizenHelp-live` (dev dependency only) with an `npm test`
  script.
- **Fixtures:** `src/lib/gamelog/__fixtures__/`, all redacted before commit. Starting set from
  Doc's logs:
  - the 4 crash logs (GPU crash: No);
  - an abnormal exit without a crash block;
  - error-popup sessions;
  - a CET long-wait session;
  - normal sessions;
  - a PTU log;
  - a non-log file.
  Fixtures can be trimmed to the relevant regions plus the header to keep the repo small.
- **Tests:**
  - one per rule (match and non-match);
  - a full `diagnose()` check per fixture;
  - redaction (no handle, Windows username, IP or GUID survives, including names with spaces);
  - the no-network check (no `fetch`/XHR/`sendBeacon`/`WebSocket` in `src/lib/gamelog/`);
  - performance (a 50k-line log diagnoses in under 1 s in Node).
- **Fixture guard:** a test fails if any fixture contains Doc's handle, the Windows username or an
  IPv4 address.
- **Pre-launch browser check (Playwright, local Chromium):**
  - drop each fixture and assert the verdict;
  - assert zero network requests to other hosts while diagnosing;
  - check at 360 px.
- **Build gates:** `npx tsc --noEmit`, `npm test`, `npx next build` (never `npm run build`
  locally).

## 9. Timeline

| Dates | Milestone |
|---|---|
| Oct 15–24 | Engine, rules, page and tests; PR to SCH |
| **Oct 25 – Nov 1** | **Private beta:** hidden URL with `robots: noindex`, not in the sitemap, nav or `/tools`. Friends and org mates test their logs and report misses (with the log) in a private Discord channel. Doc decides which logs to share; Claude redacts them into fixtures and fixes the rules. |
| Nov 2–5 | **Launch:** remove noindex; sitemap, `/tools` card and `llms.txt`; link from dayone report-a-bug pages (dayone PR); IndexNow and GSC Request Indexing; Discord announcement |
| After IAE | **Phase 2:** Discord bot (`/checklog` with attachment, ephemeral reply, in-memory only, honest privacy text, 10 MB Discord limit), with the engine extracted to a shared package |

## 10. Risks

- **A wrong verdict damages trust.** Mitigated by the precedence rules, the "common cause"
  labelling, 🧪 gating and the beta.
- **Log format changes between patches.** Mitigated by fixtures per build; re-check on each major
  patch, alongside the keybinds pipeline.
- **CSP breaks existing site scripts.** Apply it to this route only and verify analytics and the
  CTA still work.
- **Overlay false alarms.** Use "installed, can hook in" wording, never "causing your crash".
