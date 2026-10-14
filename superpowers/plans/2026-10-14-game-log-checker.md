# Game.log Checker Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a browser-only Star Citizen Game.log checker at starcitizenhelp.com/tools/game-log-checker. It gives a plain-English verdict, problems with fixes and official sources, a setup summary, and a redacted bug-report copy. It goes to a private beta by Oct 25 and launches publicly by Nov 5, 2026.

**Architecture:** A pure TypeScript engine in `src/lib/gamelog/` (parse → system/crash extraction → rules → verdict → report). It has no DOM, Node, network or storage code, so a Discord bot can reuse it later. A thin client component calls `diagnose()` and renders the report. The page carries the static guide, FAQ and JSON-LD, and a route-scoped CSP (`connect-src 'self'`).

**Tech Stack:** Next.js 15 (App Router), React 18, TypeScript 5.6 (strict, target ES2017), Tailwind and the existing shadcn/ui components, Vitest (new, dev-only), tsx (new, dev-only, for the fixture script), and playwright-core with the local Chromium (already in the sc-portfolio root) for the browser check.

**Spec:** `docs/superpowers/specs/2026-10-14-game-log-checker-design.md` (approved 2026-10-14)

## Refinements to the spec (from the 2026-10-14 log research; same intent)

1. **`crash.ts` is its own unit.** The crash block carries `Is fatal error / Is GPU crash / Is Timeout / Is out of system memory / Is out of video memory / Exception`, which is enough to deserve a focused extractor.
2. **The out-of-memory rule ships enabled.** Its pattern is the crash block's own `Is out of system memory:` / `Is out of video memory:` keys, which appear in real logs, so it is not 🧪. The `unverified` gate stays in the engine for future rules.
3. **Verdict order is crashed → disconnected → stuck loading → froze/closed → normal.** A player stuck loading who force-quits produces both "stuck" and "no SystemQuit"; "stuck loading" is the more useful headline.
4. **Noise = every `[Error]`/`[Warning]` line,** with the top 5 tags as examples. There is no hand-maintained harmless list. The rules decide what is a real problem.
5. **Launcher-only codes (1032, 1034, 8001/8004) are excluded.** They are launcher errors and never appear as `Error Popup Opened` in Game.log.
6. **The "wrong GPU" rule reads only the chosen device.** It uses Vulkan `Chosen Vulkan GPU Device` or DX `D3D Adapter: Description`. Every log lists "Microsoft Basic Render Driver" in its adapter list, even on an RTX machine.

## Global Constraints

- Repo `E:\Claude Code\sc-portfolio\StarCitizenHelp-live`, branch `feat/game-log-checker` from `origin/main`. Open a PR; **merge only on Doc's explicit word**.
- TypeScript `strict: true`, `target: "ES2017"`. **No regex lookbehind `(?<=` `(?<!`, no named groups `(?<name>`, no `s` flag** (TS 5.6 rejects them below ES2018). Use capture groups and callbacks instead.
- `src/lib/gamelog/**` (non-test files) must contain **no** `fetch(`, `XMLHttpRequest`, `sendBeacon`, `WebSocket`, `localStorage`, `sessionStorage`, `indexedDB`, `document.cookie`, `window.` or `process.`. Task 7 enforces this with a test.
- Privacy banner copy, exact: **"Your log never leaves your computer. It's read right here in your browser. Nothing is uploaded, stored or sent anywhere. Try it with your internet off."**
- Plain-English copy for people who have never played: short sentences, jargon defined. Follow `E:\Claude Code\sc-portfolio\SHARED_CONVENTIONS.md`.
- Every error-code meaning comes from its RSI Knowledge Base article. Anything RSI doesn't document sets `commonCause: true`, and the UI labels it "Common cause (not confirmed by RSI)".
- Build with `npx tsc --noEmit`, `npm test` and `npx next build`. **Never `npm run build` locally**: its postbuild pings IndexNow.
- Raw Game.logs are never committed. Fixtures go through `scripts/make-gamelog-fixture.ts` (redaction), and the guard test in Task 4 must pass.
- Commit messages use `feat:` / `fix:` / `chore:` / `docs:` and end with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Beta: the page has `robots: { index: false, follow: false }` and stays out of the sitemap, `/tools`, nav and `llms.txt` until Task 12.
- Max input 100 MB.

## Review Focus

1. **A log from a game that is still running** (no `SystemQuit` yet). The verdict must say "stopped without closing normally" and tell the player to close the game and check again, never "crashed". Test in Task 6.
2. **Text pasted from Discord:** CRLF line endings, blank lines, leading spaces, a partial log with no header. It must parse without throwing and still find what is present. Tests in Task 1 (CRLF/blank lines) and Task 6 (header-less snippet).
3. **Redaction mangling or missing data.** Windows usernames with spaces or accents (`C:\Users\Doc Flanigan\`, `C:\Users\José\`) must be redacted, while GPU driver versions like `596.49.0.0` must survive (they look like IPs). Tests in Task 3.
4. **Logs with no GPU lines** (DX11 header trimmed, or a partial paste). The setup shows "Unknown", there's no wrong-GPU warning, and nothing throws. Test in Task 6.
5. **The wrong file dropped:** `error.dmp`, `screenshot.jpg` or `cvar.dump` from the Crashes folder, or an empty file. The player gets "This doesn't look like a Star Citizen Game.log", not a bogus verdict. Test in Task 6.

---

## File map

**StarCitizenHelp-live:**
| Path | Responsibility |
|---|---|
| `package.json` (modify) | add devDeps `vitest`, `tsx`; add `"test": "vitest run"` |
| `vitest.config.ts` (create) | Vitest with the `@` → `src` alias |
| `src/lib/gamelog/types.ts` | all shared types |
| `src/lib/gamelog/parse.ts` | `parse()`, `looksLikeGameLog()` |
| `src/lib/gamelog/system.ts` | `extractSystem()`, `emptySystem()`, `compareVersions()` |
| `src/lib/gamelog/crash.ts` | `extractCrash()`, `emptyCrash()` |
| `src/lib/gamelog/redact.ts` | `findHandle()`, `redact()`, `IPV4` |
| `src/lib/gamelog/errorCodes.ts` | `lookupCode()`, `KB_PREFIX` |
| `src/lib/gamelog/noise.ts` | `countNoise()` |
| `src/lib/gamelog/rules.ts` | `RULES`, `SOURCES` |
| `src/lib/gamelog/diagnose.ts` | `diagnose()`, `verdictFor()` |
| `src/lib/gamelog/bugReport.ts` | `toBugReport()` |
| `src/lib/gamelog/__tests__/*.test.ts` | unit tests |
| `src/lib/gamelog/__fixtures__/*.log` | redacted, trimmed real logs |
| `scripts/make-gamelog-fixture.ts` | dev-only: trim and redact a real log into a fixture |
| `src/views/GameLogChecker.tsx` | client component |
| `src/app/tools/game-log-checker/page.tsx` | metadata, static guide/FAQ, JSON-LD, PageSources |
| `next.config.ts` (modify) | add `headers()` with the CSP for this route |
| `src/app/sitemap.ts`, `src/views/Tools.tsx`, `src/app/llms.txt/route.ts` (modify, Task 12 only) | launch wiring |

**Other repos:** `docs/claims/*.md` (Task 9), `sc-portfolio/scripts/gamelog-checker-e2e.mjs` (Task 10), and dayonecitizen-main report-a-bug pages (Task 12).

---

### Task 1: Test tooling, types and the line parser

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`, `src/lib/gamelog/types.ts`, `src/lib/gamelog/parse.ts`
- Test: `src/lib/gamelog/__tests__/parse.test.ts`

**Interfaces:**
- Produces: every type in `types.ts`; `parse(text: string): LogLine[]`; `looksLikeGameLog(text: string): boolean`

- [ ] **Step 1: Branch and install dev tooling**

```bash
cd "E:/Claude Code/sc-portfolio/StarCitizenHelp-live"
git fetch -q origin && git checkout -B feat/game-log-checker origin/main
npm install -D vitest@^2.1.9 tsx@^4.19.2
npm pkg set scripts.test="vitest run"
```

- [ ] **Step 2: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  test: { include: ['src/**/*.test.ts'], environment: 'node' },
})
```

- [ ] **Step 3: Create `src/lib/gamelog/types.ts`**

```ts
export type Severity = 'problem' | 'warning' | 'info'

export interface LogLine {
  /** 1-based line number in the original text */
  n: number
  raw: string
  ts: string | null
  /** e.g. "Notice", "Error"; only set when the line has the `[Sev] <Tag>` shape */
  sev: string | null
  tag: string | null
  /** text after the timestamp (and after `[Sev] <Tag>` when present), trimmed */
  msg: string
}

export interface SystemInfo {
  branch: string | null
  version: string | null
  changelist: string | null
  environment: string | null
  cpu: string | null
  logicalCpus: number | null
  ramMb: number | null
  windowsBuild: number | null
  windowsLabel: string | null
  renderer: 'Vulkan' | 'DirectX 11' | null
  gpu: string | null
  gpuDriver: string | null
  vramMb: number | null
  adapters: string[]
  overlays: string[]
}

export interface CrashInfo {
  present: boolean
  fatal: boolean | null
  gpu: boolean | null
  timeout: boolean | null
  timeoutMessage: string | null
  outOfSystemMemory: boolean | null
  outOfVideoMemory: boolean | null
  exception: string | null
}

export interface Source {
  label: string
  url: string
}

export interface Finding {
  ruleId: string
  severity: Severity
  title: string
  explanation: string
  fixes: string[]
  sources: Source[]
  /** redacted log lines that triggered the finding, max 5 */
  evidence: string[]
  /** true when RSI doesn't document this; UI labels it "Common cause (not confirmed by RSI)" */
  commonCause: boolean
}

export type VerdictKind =
  | 'crashed'
  | 'disconnected'
  | 'stuck-loading'
  | 'froze-or-closed'
  | 'normal'
  | 'not-a-log'

export interface Verdict {
  kind: VerdictKind
  headline: string
  detail: string
}

export interface NoiseSummary {
  total: number
  top: Array<[string, number]>
}

export interface Report {
  verdict: Verdict
  findings: Finding[]
  system: SystemInfo
  crash: CrashInfo
  errorCodes: number[]
  noise: NoiseSummary
  lineCount: number
  handle: string | null
}

export interface RuleContext {
  lines: LogLine[]
  system: SystemInfo
  crash: CrashInfo
  errorCodes: number[]
  endedCleanly: boolean
  stuckLoading: boolean
  liveVersion: string | null
}

/** What a rule returns; evidence is RAW here, and diagnose() redacts it. */
export interface RuleResult {
  title: string
  explanation: string
  fixes: string[]
  sources: Source[]
  evidence: string[]
  severity?: Severity
  commonCause?: boolean
}

export interface Rule {
  id: string
  severity: Severity
  /** disabled until a real fixture proves the pattern */
  unverified?: boolean
  /** returns [] when not triggered; may return several (one per error code) */
  check: (ctx: RuleContext) => RuleResult[]
}
```

- [ ] **Step 4: Write the failing tests** in `src/lib/gamelog/__tests__/parse.test.ts`

```ts
import { describe, it, expect } from 'vitest'
import { parse, looksLikeGameLog } from '../parse'

describe('parse', () => {
  it('splits timestamp, severity, tag and message', () => {
    const [l] = parse(
      '<2026-09-01T05:47:23.785Z> [Notice] <SystemQuit> CSystem::Quit invoked with - cause=30016, reason=Quit via console command [Team_Unknown][System]',
    )
    expect(l).toMatchObject({ n: 1, ts: '2026-09-01T05:47:23.785Z', sev: 'Notice', tag: 'SystemQuit' })
    expect(l.msg.startsWith('CSystem::Quit invoked')).toBe(true)
  })

  it('keeps untagged timestamped lines with a trimmed message', () => {
    const [l] = parse('<2026-06-01T17:10:26.001Z>    - NVIDIA GeForce RTX 3090 Ti (vendor = 0x10de, device = 0x2203)')
    expect(l.tag).toBeNull()
    expect(l.sev).toBeNull()
    expect(l.msg).toBe('- NVIDIA GeForce RTX 3090 Ti (vendor = 0x10de, device = 0x2203)')
  })

  it('treats [VK] and [Trace] prefixes without a <Tag> as untagged', () => {
    const [vk, tr] = parse(
      '<2026-09-01T04:58:36.580Z> [VK] Chosen Vulkan GPU Device (NVIDIA GeForce RTX 3090 Ti) Driver Version (596.49.0.0) Vulkan API (1.4.329)\n' +
        '<2026-09-01T04:58:35.050Z> [Trace] Environment:   PUB',
    )
    expect(vk.tag).toBeNull()
    expect(vk.msg.startsWith('[VK] Chosen Vulkan GPU Device')).toBe(true)
    expect(tr.msg).toBe('[Trace] Environment:   PUB')
  })

  it('keeps crash-handler lines that have no timestamp', () => {
    const [l] = parse('Is GPU crash: No')
    expect(l).toMatchObject({ ts: null, tag: null, msg: 'Is GPU crash: No' })
  })

  it('handles CRLF, skips blank lines, and keeps original line numbers', () => {
    const lines = parse('first\r\n\r\n   \r\n<2026-01-01T00:00:00.000Z> [Error] <X> y\r\n')
    expect(lines.map((l) => l.n)).toEqual([1, 4])
    expect(lines[1]).toMatchObject({ sev: 'Error', tag: 'X', msg: 'y' })
  })
})

describe('looksLikeGameLog', () => {
  it('accepts text with Game.log markers', () => {
    expect(looksLikeGameLog('<2026-09-01T04:58:35.050Z> Branch: sc-alpha-4.10.2')).toBe(true)
    expect(looksLikeGameLog('Cloud Imperium Games public crash handler taking over...')).toBe(true)
    expect(looksLikeGameLog('[Notice] <Foo> bar [Team_UI][Disconnection]')).toBe(true)
  })
  it('rejects other text, binary and empty input', () => {
    expect(looksLikeGameLog('')).toBe(false)
    expect(looksLikeGameLog('hello world')).toBe(false)
    expect(looksLikeGameLog('\u0000\u0001MDMP\u0093\u00a7\u0000\u0000\u0004')).toBe(false)
    expect(looksLikeGameLog('\u0089PNG\r\n\u001a\n\u0000\u0000\u0000\rIHDR')).toBe(false)
  })
})
```

- [ ] **Step 5: Run and confirm they fail**

Run: `npx vitest run src/lib/gamelog/__tests__/parse.test.ts`
Expected: FAIL, "Failed to resolve import ../parse"

- [ ] **Step 6: Implement `src/lib/gamelog/parse.ts`**

```ts
import type { LogLine } from './types'

const TS = /^<(\d{4}-\d{2}-\d{2}T[\d:.]+Z)>\s?/
const TAGGED = /^\[([A-Za-z_]+)\]\s*<([^<>]{1,120})>\s?([\s\S]*)$/
const MARKERS = /Branch: sc-alpha|<SystemQuit>|public crash handler taking over|Log started on|\[Team_[A-Za-z]+\]/
const SCAN = 200000

export function parse(text: string): LogLine[] {
  const rows = text.split(/\r?\n/)
  const out: LogLine[] = []
  for (let i = 0; i < rows.length; i++) {
    const raw = rows[i]
    if (!raw.trim()) continue
    let rest = raw
    let ts: string | null = null
    const t = TS.exec(raw)
    if (t) {
      ts = t[1]
      rest = raw.slice(t[0].length)
    }
    const g = TAGGED.exec(rest.trim())
    if (g) out.push({ n: i + 1, raw, ts, sev: g[1], tag: g[2].trim(), msg: g[3].trim() })
    else out.push({ n: i + 1, raw, ts, sev: null, tag: null, msg: rest.trim() })
  }
  return out
}

export function looksLikeGameLog(text: string): boolean {
  if (!text) return false
  return MARKERS.test(text.slice(0, SCAN)) || MARKERS.test(text.slice(-SCAN))
}
```

- [ ] **Step 7: Run tests and the typecheck**

Run: `npx vitest run src/lib/gamelog/__tests__/parse.test.ts && npx tsc --noEmit`
Expected: all PASS; tsc exits 0

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json vitest.config.ts src/lib/gamelog/types.ts src/lib/gamelog/parse.ts src/lib/gamelog/__tests__/parse.test.ts
git commit -m "feat(gamelog): Vitest setup, shared types and Game.log line parser" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: System and crash extraction

**Files:**
- Create: `src/lib/gamelog/system.ts`, `src/lib/gamelog/crash.ts`
- Test: `src/lib/gamelog/__tests__/system.test.ts`, `src/lib/gamelog/__tests__/crash.test.ts`

**Interfaces:**
- Consumes: `parse()` and `LogLine`, `SystemInfo`, `CrashInfo` from Task 1
- Produces: `extractSystem(lines: LogLine[]): SystemInfo`, `emptySystem(): SystemInfo`, `compareVersions(a: string, b: string): number`, `extractCrash(lines: LogLine[]): CrashInfo`, `emptyCrash(): CrashInfo`

- [ ] **Step 1: Write the failing tests** in `src/lib/gamelog/__tests__/system.test.ts`

```ts
import { describe, it, expect } from 'vitest'
import { parse } from '../parse'
import { extractSystem, compareVersions } from '../system'

const T = '<2026-09-01T04:58:35.050Z> '
const VULKAN = [
  `${T}Host CPU: AMD Ryzen 7 5700X3D 8-Core Processor`,
  `${T}Logical CPU Count: 16`,
  `${T}[Trace] Environment:   PUB`,
  `${T}65457MB physical memory installed, 37081MB available, 43 percent of memory in use`,
  `${T}Windows 10 64 bit (build 10.0.26300)`,
  `${T}Branch: sc-alpha-4.10.2`,
  `${T}Changelist: 12881860`,
  `${T}- Microsoft Basic Render Driver (vendor = 0x1414, device = 0x008c)`,
  `${T}[VK] Available Vulkan Layer - Layer: VK_LAYER_NV_optimus (NVIDIA Optimus layer) Version: 1.4.329`,
  `${T}[VK] Available Vulkan Layer - Layer: VK_LAYER_OBS_HOOK (Open Broadcaster Software hook) Version: 1.3.216`,
  `${T}[VK] Available Vulkan Layer - Layer: VK_LAYER_OW_OVERLAY (Overwolf Overlay Layer) Version: 1.2.131`,
  `${T}[VK] Available Vulkan Layer - Layer: VK_LAYER_VALVE_steam_overlay (Steam Overlay Layer) Version: 1.3.207`,
  `${T}[VK] Available Vulkan Layer - Layer: GalaxyOverlayVkLayer_DEBUG (Galaxy Overlay Vulkan Layer) Version: 1.1.73`,
  `${T}[VK] Available Vulkan Layer - Layer: VK_LAYER_ROCKSTAR_GAMES_social_club (Rockstar Games Social Club Layer) Version: 1.0.70`,
  `${T}[VK] Chosen Vulkan GPU Device (NVIDIA GeForce RTX 3090 Ti) Driver Version (596.49.0.0) Vulkan API (1.4.329) `,
].join('\n')

const DX11 = [
  `${T}Windows 10 64 bit (build 10.0.19045)`,
  `${T}Branch: sc-alpha-4.8.0-hotfix`,
  `${T}Changelist: 11875683`,
  `${T}Renderer initialization`,
  `${T}- NVIDIA GeForce RTX 3090 Ti (vendor = 0x10de, device = 0x2203)`,
  `${T}- Adapter index: 0`,
  `${T}- Microsoft Basic Render Driver (vendor = 0x1414, device = 0x008c)`,
  `${T}D3D Adapter: Description: NVIDIA GeForce RTX 3090 Ti`,
  `${T}D3D Adapter: Driver version (UMD): 32.00.15.9649`,
  `${T}D3D Adapter: DedicatedVidMem = 24313`,
].join('\n')

describe('extractSystem', () => {
  it('reads a Vulkan header', () => {
    const s = extractSystem(parse(VULKAN))
    expect(s).toMatchObject({
      branch: 'sc-alpha-4.10.2', version: '4.10.2', changelist: '12881860', environment: 'PUB',
      cpu: 'AMD Ryzen 7 5700X3D 8-Core Processor', logicalCpus: 16, ramMb: 65457,
      windowsBuild: 26300, windowsLabel: 'Windows 11', renderer: 'Vulkan',
      gpu: 'NVIDIA GeForce RTX 3090 Ti', gpuDriver: '596.49.0.0',
    })
    expect(s.overlays.sort()).toEqual(['GOG Galaxy overlay', 'OBS', 'Overwolf', 'Rockstar Games launcher overlay', 'Steam overlay'])
    expect(s.adapters).toContain('Microsoft Basic Render Driver')
  })

  it('reads a DirectX 11 header and keeps the chosen GPU, not adapter 0', () => {
    const s = extractSystem(parse(DX11))
    expect(s).toMatchObject({
      version: '4.8.0', renderer: 'DirectX 11', gpu: 'NVIDIA GeForce RTX 3090 Ti',
      gpuDriver: '32.00.15.9649', vramMb: 24313, windowsLabel: 'Windows 10', windowsBuild: 19045,
    })
    expect(s.adapters).toEqual(['NVIDIA GeForce RTX 3090 Ti', 'Microsoft Basic Render Driver'])
    expect(s.overlays).toEqual([])
  })

  it('returns nulls when the header is missing (pasted fragment)', () => {
    const s = extractSystem(parse('<2026-01-01T00:00:00.000Z> [Notice] <SystemQuit> quit'))
    expect(s.gpu).toBeNull()
    expect(s.renderer).toBeNull()
    expect(s.version).toBeNull()
  })
})

describe('compareVersions', () => {
  it('orders dotted versions numerically', () => {
    expect(compareVersions('4.8.0', '4.10.2')).toBeLessThan(0)
    expect(compareVersions('4.10.2', '4.10.2')).toBe(0)
    expect(compareVersions('4.10.10', '4.10.2')).toBeGreaterThan(0)
    expect(compareVersions('4.10', '4.10.0')).toBe(0)
  })
})
```

And `src/lib/gamelog/__tests__/crash.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { parse } from '../parse'
import { extractCrash } from '../crash'

export const CRASH_BLOCK = [
  'Cloud Imperium Games public crash handler taking over...',
  'Details for StarCitizen.exe (md5=e968f7767c5fa2d2c4fdf2558758297b)...',
  'Saved dump file to C:\\Users\\<you>\\AppData\\Local\\Star Citizen\\Crashes\\error.dmp (md5=<id>)',
  'Exception STATUS_CRYENGINE_WATCH_DOG(0x2BADFF60) addr=0x00007FFD305C80DA digest=7d162c4400d80da931ddbcaacd0bf8e5',
  'Run from internal: No',
  'Is fatal error: No',
  'Is reported bug: No',
  'Is GPU crash: No',
  'Is Timeout: Yes',
  '- Timeout message: Main thread considered to be deadlocked after 2 timeout(s) of 30 second(s) each! (IsLoadingUnloading = False)',
  'Is out of system memory: No',
  'Is out of video memory: No',
  'All crash related data successfully handed over to crash info collector process',
].join('\n')

describe('extractCrash', () => {
  it('reads the crash handler block', () => {
    expect(extractCrash(parse(CRASH_BLOCK))).toEqual({
      present: true, fatal: false, gpu: false, timeout: true,
      timeoutMessage: 'Main thread considered to be deadlocked after 2 timeout(s) of 30 second(s) each! (IsLoadingUnloading = False)',
      outOfSystemMemory: false, outOfVideoMemory: false,
      exception: 'STATUS_CRYENGINE_WATCH_DOG(0x2BADFF60)',
    })
  })
  it('flags GPU and memory crashes', () => {
    const c = extractCrash(parse(CRASH_BLOCK.replace('Is GPU crash: No', 'Is GPU crash: Yes').replace('Is out of video memory: No', 'Is out of video memory: Yes')))
    expect(c.gpu).toBe(true)
    expect(c.outOfVideoMemory).toBe(true)
  })
  it('reports no crash when the block is absent', () => {
    expect(extractCrash(parse('Is GPU crash: Yes')).present).toBe(false)
  })
})
```

- [ ] **Step 2: Run and confirm they fail**

Run: `npx vitest run src/lib/gamelog/__tests__/system.test.ts src/lib/gamelog/__tests__/crash.test.ts`
Expected: FAIL, "Failed to resolve import ../system" / "../crash"

- [ ] **Step 3: Implement `src/lib/gamelog/system.ts`**

```ts
import type { LogLine, SystemInfo } from './types'

const OVERLAY_LAYERS: Array<[RegExp, string]> = [
  [/^VK_LAYER_OBS_HOOK$/, 'OBS'],
  [/^VK_LAYER_OW_/, 'Overwolf'],
  [/^VK_LAYER_VALVE_steam_overlay$/, 'Steam overlay'],
  [/^GalaxyOverlayVkLayer/, 'GOG Galaxy overlay'],
  [/^VK_LAYER_ROCKSTAR_GAMES_social_club$/, 'Rockstar Games launcher overlay'],
]

export function emptySystem(): SystemInfo {
  return {
    branch: null, version: null, changelist: null, environment: null, cpu: null, logicalCpus: null,
    ramMb: null, windowsBuild: null, windowsLabel: null, renderer: null, gpu: null, gpuDriver: null,
    vramMb: null, adapters: [], overlays: [],
  }
}

export function extractSystem(lines: LogLine[]): SystemInfo {
  const s = emptySystem()
  let vk: { gpu: string; driver: string } | null = null
  let dxGpu: string | null = null
  let dxDriver: string | null = null
  const overlays = new Set<string>()
  const adapters = new Set<string>()
  for (const { msg } of lines) {
    let m: RegExpExecArray | null
    if (!s.branch && (m = /^Branch:\s*(sc-alpha-(\d+(?:\.\d+)+)\S*)/.exec(msg))) { s.branch = m[1]; s.version = m[2]; continue }
    if (!s.changelist && (m = /^Changelist:\s*(\d+)/.exec(msg))) { s.changelist = m[1]; continue }
    if (!s.environment && (m = /^\[Trace\] Environment:\s+(\S+)/.exec(msg))) { s.environment = m[1]; continue }
    if (!s.cpu && (m = /^Host CPU:\s*(.+?)\s*$/.exec(msg))) { s.cpu = m[1]; continue }
    if (s.logicalCpus === null && (m = /^Logical CPU Count:\s*(\d+)/.exec(msg))) { s.logicalCpus = Number(m[1]); continue }
    if (s.ramMb === null && (m = /^(\d+)MB physical memory installed/.exec(msg))) { s.ramMb = Number(m[1]); continue }
    if (s.windowsBuild === null && (m = /^Windows \d+ 64 bit \(build 10\.0\.(\d+)\)/.exec(msg))) {
      s.windowsBuild = Number(m[1])
      s.windowsLabel = s.windowsBuild >= 22000 ? 'Windows 11' : 'Windows 10'
      continue
    }
    if (!vk && (m = /^\[VK\] Chosen Vulkan GPU Device \((.+?)\) Driver Version \(([^)]+)\)/.exec(msg))) { vk = { gpu: m[1], driver: m[2] }; continue }
    if ((m = /^\[VK\] Available Vulkan Layer - Layer: (\S+)/.exec(msg))) {
      for (const [re, name] of OVERLAY_LAYERS) if (re.test(m[1])) overlays.add(name)
      continue
    }
    if (!dxGpu && (m = /^D3D Adapter: Description:\s*(.+?)\s*$/.exec(msg))) { dxGpu = m[1]; continue }
    if (!dxDriver && (m = /^D3D Adapter: Driver version \(UMD\):\s*(\S+)/.exec(msg))) { dxDriver = m[1]; continue }
    if (s.vramMb === null && (m = /^D3D Adapter: DedicatedVidMem = (\d+)/.exec(msg))) { s.vramMb = Number(m[1]); continue }
    if ((m = /^- (.+?) \(vendor = 0x[0-9a-fA-F]+, device = 0x[0-9a-fA-F]+\)/.exec(msg))) { adapters.add(m[1]); continue }
  }
  if (vk) { s.renderer = 'Vulkan'; s.gpu = vk.gpu; s.gpuDriver = vk.driver }
  else if (dxGpu) { s.renderer = 'DirectX 11'; s.gpu = dxGpu; s.gpuDriver = dxDriver }
  s.adapters = Array.from(adapters)
  s.overlays = Array.from(overlays)
  return s
}

export function compareVersions(a: string, b: string): number {
  const pa = a.split('.').map(Number)
  const pb = b.split('.').map(Number)
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] ?? 0) - (pb[i] ?? 0)
    if (d !== 0) return d
  }
  return 0
}
```

- [ ] **Step 4: Implement `src/lib/gamelog/crash.ts`**

```ts
import type { CrashInfo, LogLine } from './types'

export function emptyCrash(): CrashInfo {
  return {
    present: false, fatal: null, gpu: null, timeout: null, timeoutMessage: null,
    outOfSystemMemory: null, outOfVideoMemory: null, exception: null,
  }
}

const FLAGS: Array<[string, keyof CrashInfo]> = [
  ['Is fatal error', 'fatal'],
  ['Is GPU crash', 'gpu'],
  ['Is Timeout', 'timeout'],
  ['Is out of system memory', 'outOfSystemMemory'],
  ['Is out of video memory', 'outOfVideoMemory'],
]

export function extractCrash(lines: LogLine[]): CrashInfo {
  const c = emptyCrash()
  const start = lines.findIndex((l) => l.msg.indexOf('public crash handler taking over') !== -1)
  if (start < 0) return c
  c.present = true
  for (const { msg } of lines.slice(start)) {
    for (const [label, key] of FLAGS) {
      if (msg.indexOf(label + ':') === 0) {
        ;(c as unknown as Record<string, boolean>)[key] = /^yes/i.test(msg.slice(label.length + 1).trim())
      }
    }
    let m: RegExpExecArray | null
    if ((m = /^- Timeout message:\s*(.+)$/.exec(msg))) c.timeoutMessage = m[1]
    if ((m = /^Exception (\S+)/.exec(msg))) c.exception = m[1]
  }
  return c
}
```

- [ ] **Step 5: Run tests and typecheck**

Run: `npx vitest run src/lib/gamelog && npx tsc --noEmit`
Expected: all PASS; tsc exits 0

- [ ] **Step 6: Commit**

```bash
git add src/lib/gamelog/system.ts src/lib/gamelog/crash.ts src/lib/gamelog/__tests__/system.test.ts src/lib/gamelog/__tests__/crash.test.ts
git commit -m "feat(gamelog): extract setup (build, CPU, RAM, Windows, GPU/driver, overlays) and the crash block" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Redaction

**Files:**
- Create: `src/lib/gamelog/redact.ts`
- Test: `src/lib/gamelog/__tests__/redact.test.ts`

**Interfaces:**
- Produces: `findHandle(text: string): string | null`, `redact(text: string, handle: string | null): string`, `IPV4: RegExp` (global, for the fixture guard)

- [ ] **Step 1: Write the failing tests** in `src/lib/gamelog/__tests__/redact.test.ts`

```ts
import { describe, it, expect } from 'vitest'
import { findHandle, redact } from '../redact'

describe('findHandle', () => {
  it('reads the handle from the login line', () => {
    expect(findHandle('[Notice] <Legacy login response> [CIG-net] User Login Success - Handle[Some_Pilot] - Time[304095033]')).toBe('Some_Pilot')
  })
  it('falls back to nickname="..."', () => {
    expect(findHandle('<Channel Created> nickname="Pilot-42" playerGEID=201926432186')).toBe('Pilot-42')
  })
  it('returns null when absent', () => {
    expect(findHandle('no handle here')).toBeNull()
  })
})

describe('redact', () => {
  it('removes the handle in any letter case', () => {
    expect(redact('Player[Some_Pilot] and some_pilot', 'Some_Pilot')).toBe('Player[<handle>] and <handle>')
  })
  it('removes Windows usernames, including spaces and accents', () => {
    expect(redact('Saved to C:\\Users\\Doc Flanigan\\AppData\\Local\\Star Citizen\\Crashes\\error.dmp', null))
      .toBe('Saved to C:\\Users\\<you>\\AppData\\Local\\Star Citizen\\Crashes\\error.dmp')
    expect(redact('D:\\Users\\José\\x.log', null)).toBe('D:\\Users\\<you>\\x.log')
  })
  it('removes IPv4 addresses with ports', () => {
    expect(redact('remoteAddr=35.190.12.7:64090 localAddr=10.0.0.5:51234', null)).toBe('remoteAddr=<ip> localAddr=<ip>')
  })
  it('keeps GPU driver versions that only look like IPs', () => {
    expect(redact('Driver Version (596.49.0.0) Vulkan API (1.4.329)', null)).toBe('Driver Version (596.49.0.0) Vulkan API (1.4.329)')
    expect(redact('Driver version (UMD): 32.00.15.9649', null)).toBe('Driver version (UMD): 32.00.15.9649')
  })
  it('removes GUIDs, long hex session ids, account/player ids and emails', () => {
    const out = redact(
      'node_id=1f0c2a9e-3b4d-4c5e-8f9a-0b1c2d3e4f5a session=6af83debdeae014640944eba6d512663 geid 201926432186 - accountId 98765432 me@example.com',
      null,
    )
    expect(out).toBe('node_id=<id> session=<id> geid <id> - accountId <id> <email>')
  })
})
```

- [ ] **Step 2: Run and confirm they fail**

Run: `npx vitest run src/lib/gamelog/__tests__/redact.test.ts`
Expected: FAIL, "Failed to resolve import ../redact"

- [ ] **Step 3: Implement `src/lib/gamelog/redact.ts`** (ES2017-safe: no lookbehind or named groups)

```ts
const OCTET = '(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)'
/** Strict IPv4 (each octet 0-255), optional :port. Global; reset lastIndex before reuse. */
export const IPV4 = new RegExp(`(^|[^\\d.])(${OCTET}\\.${OCTET}\\.${OCTET}\\.${OCTET})(:\\d{1,5})?(?![\\d.])`, 'g')

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function findHandle(text: string): string | null {
  const m = /Handle\[([A-Za-z0-9_-]{2,})\]/.exec(text) || /nickname="([A-Za-z0-9_-]{2,})"/.exec(text)
  return m ? m[1] : null
}

export function redact(text: string, handle: string | null): string {
  let s = text
  if (handle) s = s.replace(new RegExp(escapeRegExp(handle), 'gi'), '<handle>')
  s = s.replace(/([A-Za-z]:\\Users\\)[^\\\r\n"']+/g, '$1<you>')
  s = s.replace(/[\w.+-]+@[\w-]+\.[A-Za-z][\w.-]*/g, '<email>')
  s = s.replace(/\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\b/g, '<id>')
  s = s.replace(/\b[0-9a-fA-F]{24,}\b/g, '<id>')
  s = s.replace(/\b(geid|accountId|account_id|playerGEID|player_id|playerid)([=:\s[]+)\d+/gi, '$1$2<id>')
  s = s.replace(/\b\d{9,}\b/g, '<id>')
  IPV4.lastIndex = 0
  s = s.replace(IPV4, (_m, pre: string) => `${pre}<ip>`)
  return s
}
```

- [ ] **Step 4: Run tests and typecheck**

Run: `npx vitest run src/lib/gamelog/__tests__/redact.test.ts && npx tsc --noEmit`
Expected: all PASS. If the GUID test fails because `<id>` lands inside the GUID, check that the GUID replacement runs before the 24+ hex rule (it does in the code above).

- [ ] **Step 5: Commit**

```bash
git add src/lib/gamelog/redact.ts src/lib/gamelog/__tests__/redact.test.ts
git commit -m "feat(gamelog): redaction (handle, Windows username, IPs, IDs, emails) that keeps driver versions" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Fixture builder, real-log fixtures, and the fixture guard

**Files:**
- Create: `scripts/make-gamelog-fixture.ts`, `src/lib/gamelog/__fixtures__/*.log` (9 files), `src/lib/gamelog/__tests__/fixtures.test.ts`

**Interfaces:**
- Consumes: `findHandle`, `redact`, `IPV4` (Task 3); `looksLikeGameLog` (Task 1)
- Produces: fixture files `normal-vulkan.log`, `normal-dx11.log`, `crash-timeout.log`, `error-30000.log`, `error-30028.log`, `error-70003.log`, `stuck-loading.log`, `abnormal-exit.log`, `ptu.log`, read by Tasks 6, 7 and 10

- [ ] **Step 1: Create `scripts/make-gamelog-fixture.ts`**

```ts
// Dev-only. Trims a real Game.log to its useful regions and redacts it.
// Usage: npx tsx scripts/make-gamelog-fixture.ts "<source.log>" src/lib/gamelog/__fixtures__/<name>.log [head=150] [tail=80]
import { readFileSync, writeFileSync } from 'node:fs'
import { findHandle, redact } from '../src/lib/gamelog/redact'

const [, , src, out, headArg = '150', tailArg = '80'] = process.argv
if (!src || !out) {
  console.error('usage: make-gamelog-fixture <source.log> <out.log> [head] [tail]')
  process.exit(1)
}
const KEEP = /Branch:|Changelist:|Host CPU|Logical CPU|physical memory installed|Windows \d+ 64 bit|Environment:|\[VK\] (Chosen Vulkan GPU Device|Available Vulkan Layer)|D3D Adapter: (Description|Driver version|DedicatedVidMem)|\(vendor = 0x|<Error Popup (Opened|Closed)>|<SystemQuit>|Handle\[|public crash handler taking over|^Is |^Exception |^- Timeout message|^Saved |^Copied Game\.log|All crash related data|Log started on/
const text = readFileSync(src, 'utf8')
const handle = findHandle(text)
const rows = text.split(/\r?\n/)
const head = Number(headArg)
const tail = Number(tailArg)
const kept = rows.filter((r, i) => i < head || i >= rows.length - tail || KEEP.test(r.replace(/^<[^>]+>\s*/, '')))
writeFileSync(out, redact(kept.join('\n'), handle) + '\n')
console.log(`${out}: kept ${kept.length}/${rows.length} lines; handle ${handle ? 'found and redacted' : 'NOT FOUND, check by hand'}`)
```

- [ ] **Step 2: Pick the source logs** (read-only search of Doc's install)

```bash
L="E:/Program Files/Roberts Space Industries/StarCitizen/LIVE/logbackups"
P="E:/Program Files/Roberts Space Industries/StarCitizen/PTU/logbackups"
echo "error 30000:"; grep -l "errorCode=30000" "$L"/*.log | tail -1
echo "error 30028:"; grep -l "errorCode=30028" "$L"/*.log | tail -1
echo "error 70003:"; grep -l "errorCode=70003" "$L"/*.log "$P"/*.log 2>/dev/null | tail -1
echo "stuck loading (CET long wait in last 80 lines):"; for f in "$L"/*.log; do tail -80 "$f" | grep -q "CContextEstablisherTaskLongWait" && echo "$f"; done | tail -1
echo "abnormal exit (no SystemQuit, no crash block, not stuck loading):"; for f in "$L"/*.log; do grep -q "<SystemQuit>" "$f" || grep -q "crash handler taking over" "$f" || tail -300 "$f" | grep -q "CContextEstablisherTaskLongWait" || echo "$f"; done | tail -1
echo "ptu:"; ls "$P"/*.log | tail -1
```

Fixed picks (they exist in Doc's install as of 2026-10-14):
- `normal-vulkan` ← `$L/Game Build(12545750) 31 Aug 26 (23 58 22).log`
- `normal-dx11` ← `$L/Game Build(11875683) 01 Jun 26 (12 10 26).log`
- `crash-timeout` ← `$L/Game Build(10766222) 27 Nov 25 (18 09 23).log`

If a search prints nothing for `stuck-loading`, use the `2024-10-24` log that contains `CET running for a long time`, with `tail=400`. Then check that the fixture's last 300 parsed lines contain the CET line. If they don't, skip that fixture and its test, and note it for the beta.

- [ ] **Step 3: Build the 9 fixtures**

```bash
cd "E:/Claude Code/sc-portfolio/StarCitizenHelp-live"
F=src/lib/gamelog/__fixtures__; mkdir -p "$F"
npx tsx scripts/make-gamelog-fixture.ts "$L/Game Build(12545750) 31 Aug 26 (23 58 22).log" $F/normal-vulkan.log
npx tsx scripts/make-gamelog-fixture.ts "$L/Game Build(11875683) 01 Jun 26 (12 10 26).log" $F/normal-dx11.log
npx tsx scripts/make-gamelog-fixture.ts "$L/Game Build(10766222) 27 Nov 25 (18 09 23).log" $F/crash-timeout.log
# replace each <...> with the path printed in Step 2:
npx tsx scripts/make-gamelog-fixture.ts "<error 30000 path>" $F/error-30000.log
npx tsx scripts/make-gamelog-fixture.ts "<error 30028 path>" $F/error-30028.log
npx tsx scripts/make-gamelog-fixture.ts "<error 70003 path>" $F/error-70003.log
npx tsx scripts/make-gamelog-fixture.ts "<stuck path>" $F/stuck-loading.log
npx tsx scripts/make-gamelog-fixture.ts "<abnormal path>" $F/abnormal-exit.log
npx tsx scripts/make-gamelog-fixture.ts "<ptu path>" $F/ptu.log
ls -la $F
```

Expected: 9 files, each under ~60 KB. Every line prints `handle found and redacted`. If any prints `NOT FOUND`, open that fixture and confirm by hand that no handle appears; the guard test below also catches it.

- [ ] **Step 4: Write the guard test** `src/lib/gamelog/__tests__/fixtures.test.ts`

```ts
import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { IPV4 } from '../redact'
import { looksLikeGameLog } from '../parse'

const DIR = path.join(__dirname, '..', '__fixtures__')
const FILES = readdirSync(DIR).filter((f) => f.endsWith('.log'))

describe('fixtures are safe to commit', () => {
  it('has the expected fixture set', () => {
    for (const f of ['normal-vulkan.log', 'normal-dx11.log', 'crash-timeout.log', 'error-30000.log', 'abnormal-exit.log', 'ptu.log']) {
      expect(FILES).toContain(f)
    }
  })
  for (const f of FILES) {
    it(`${f} has no personal data`, () => {
      const t = readFileSync(path.join(DIR, f), 'utf8')
      expect(t).not.toMatch(/flanigan/i)
      expect(t).not.toMatch(/[A-Za-z]:\\Users\\(?!<you>)/)
      IPV4.lastIndex = 0
      expect(IPV4.test(t)).toBe(false)
      expect(t).not.toMatch(/[\w.+-]+@[\w-]+\.[A-Za-z]{2,}/)
    })
    it(`${f} still looks like a Game.log`, () => {
      expect(looksLikeGameLog(readFileSync(path.join(DIR, f), 'utf8'))).toBe(true)
    })
  }
})
```

(The `(?!` negative lookahead is ES5 and allowed. Only lookbehind is banned.)

- [ ] **Step 5: Run the tests**

Run: `npm test`
Expected: all PASS. A failure here means personal data leaked. Fix `redact.ts` (with a new test in `redact.test.ts`), rebuild the fixture, and **never** hand-edit around the guard.

- [ ] **Step 6: Commit**

```bash
git add scripts/make-gamelog-fixture.ts src/lib/gamelog/__fixtures__ src/lib/gamelog/__tests__/fixtures.test.ts
git commit -m "chore(gamelog): fixture builder + 9 redacted real-log fixtures + personal-data guard test" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Error codes and noise

**Files:**
- Create: `src/lib/gamelog/errorCodes.ts`, `src/lib/gamelog/noise.ts`
- Test: `src/lib/gamelog/__tests__/errorCodes.test.ts`, `src/lib/gamelog/__tests__/noise.test.ts`

**Interfaces:**
- Consumes: `Source`, `LogLine`, `NoiseSummary` (Task 1)
- Produces: `interface ErrorCodeInfo { title: string; meaning: string; fixes: string[]; source: Source }`, `lookupCode(code: number): ErrorCodeInfo | null`, `KB_PREFIX: string`, `countNoise(lines: LogLine[]): NoiseSummary`

- [ ] **Step 1: Write the failing tests**

`src/lib/gamelog/__tests__/errorCodes.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { lookupCode, KB_PREFIX } from '../errorCodes'

describe('lookupCode', () => {
  it('knows the documented in-game codes', () => {
    for (const c of [30000, 30003, 30009, 30018, 30028, 19000, 19005, 60015, 40015, 65000, 41070]) {
      const info = lookupCode(c)
      expect(info, String(c)).not.toBeNull()
      expect(info!.source.url.startsWith(KB_PREFIX)).toBe(true)
      expect(info!.fixes.length).toBeGreaterThan(0)
    }
  })
  it('maps related codes to one article', () => {
    expect(lookupCode(30018)).toBe(lookupCode(30009))
    expect(lookupCode(19003)).toBe(lookupCode(19000))
    expect(lookupCode(40015)).toBe(lookupCode(60015))
  })
  it('returns null for undocumented codes', () => {
    expect(lookupCode(70003)).toBeNull()
    expect(lookupCode(1032)).toBeNull() // launcher-only, never in Game.log
  })
})
```

`src/lib/gamelog/__tests__/noise.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { parse } from '../parse'
import { countNoise } from '../noise'

describe('countNoise', () => {
  it('counts Error/Warning lines and lists the top tags', () => {
    const t = '<2026-01-01T00:00:00.000Z> '
    const lines = parse([
      `${t}[Error] <CPU Particle Limit reached> a`, `${t}[Error] <CPU Particle Limit reached> b`,
      `${t}[Warning] <Expensive Entity> c`, `${t}[Notice] <Error Popup Opened> errorCode=30000`,
    ].join('\n'))
    expect(countNoise(lines)).toEqual({ total: 3, top: [['CPU Particle Limit reached', 2], ['Expensive Entity', 1]] })
  })
})
```

- [ ] **Step 2: Run and confirm they fail**

Run: `npx vitest run src/lib/gamelog/__tests__/errorCodes.test.ts src/lib/gamelog/__tests__/noise.test.ts`
Expected: FAIL, unresolved imports

- [ ] **Step 3: Implement `src/lib/gamelog/errorCodes.ts`** (wording from the RSI KB articles, read 2026-10-14)

```ts
import type { Source } from './types'

export const KB_PREFIX = 'https://support.robertsspaceindustries.com/hc/en-us/articles/'

export interface ErrorCodeInfo {
  title: string
  meaning: string
  fixes: string[]
  source: Source
}

const kb = (code: string, path: string): Source => ({ label: `RSI Support: Error Code ${code}`, url: KB_PREFIX + path })

const VERIFY = 'Verify your game files: in the RSI Launcher, open Settings and click Verify.'

const E30000: ErrorCodeInfo = {
  title: 'lost connection to the game server',
  meaning: "RSI calls 30000 its general timeout message. You lost your connection to the game server (often because the server crashed), or timed out while connecting.",
  fixes: [
    VERIFY,
    'Fully close the RSI Launcher (check Task Manager for extra copies), then log in again.',
    'If you use a VPN, turn it off and reconnect.',
    "Rename the USER folder in ...\\StarCitizen\\LIVE (it holds the game's local settings, so renaming keeps a backup). RSI suggests deleting it.",
    'If it keeps happening, add your details to the Issue Council.',
  ],
  source: kb('30000', '360053608633-Error-Code-30000'),
}
const E30003: ErrorCodeInfo = {
  title: 'connection problem',
  meaning: 'RSI is still investigating 30003. Most reports point to network problems and file corruption they cause, or to programs that manage your internet traffic.',
  fixes: [
    'Turn off or uninstall network "optimizer" software such as cFosSpeed (often bundled with MSI, Gigabyte and ASRock motherboards).',
    VERIFY,
  ],
  source: kb('30003', '360002285233-Error-Code-30003'),
}
const E30009: ErrorCodeInfo = {
  title: 'login problem after leaving in a ship',
  meaning: 'RSI is tracking this login error. It shows up most often after you logged out or crashed inside a ship, or in a no-fly zone.',
  fixes: [
    'Wait a while and try again. It sometimes clears on its own.',
    'If a friend is still in the game and your ship is still there, ask them to destroy it.',
    'Try flying that same ship in Arena Commander, which can clear it in the Universe.',
    'Until RSI fixes it, avoid logging out in a ship bed.',
    'If you use a VPN, try a different region.',
  ],
  source: kb('30009/30018', '360038342233-Error-Code-30009-30018'),
}
const E30028: ErrorCodeInfo = {
  title: 'kicked for inactivity',
  meaning: 'You were kicked for being inactive.',
  fixes: [
    'Restart the game and carry on.',
    "If you weren't inactive, make sure your PC's clock is correct (sync it with an internet time server).",
  ],
  source: kb('30028', '360052827894-Error-Code-30028'),
}
const E19000: ErrorCodeInfo = {
  title: 'authentication error',
  meaning: 'The 19000-series codes mean your PC and account failed to connect properly with the game servers. This is not about your two-factor login.',
  fixes: [
    'Wait a few minutes and try again.',
    'Check the RSI Status page for server problems.',
    "Work through RSI's troubleshooting article (linked below). It covers the many possible causes.",
  ],
  source: kb('19000 / 19005', '36547864392471-Error-Code-19000-19005'),
}
const E60015: ErrorCodeInfo = {
  title: 'game instance not working',
  meaning: 'The server instance the game tried to put you in is not working properly. (40015 is the same error.)',
  fixes: ['Change your login region before choosing to enter the Universe.'],
  source: kb('60015', '360041558213-Error-Code-60015'),
}
const E65000: ErrorCodeInfo = {
  title: 'failed to load into the Universe',
  meaning: 'Something went wrong while the game was loading you into the Persistent Universe, usually a temporary network problem.',
  fixes: [
    'Wait a while, then try again.',
    'Check the RSI Status page for known server issues.',
    'If it keeps happening, run Character Repair from your RSI account page.',
  ],
  source: kb('65000', '34409251540887-Error-Code-65000'),
}
const E41070: ErrorCodeInfo = {
  title: 'character problem',
  meaning: 'Something is wrong with your character data, which stops the game from loading you in.',
  fixes: [
    'Wait 10 to 15 minutes, then try again.',
    "Join a friend's party and let the party leader enter the Universe.",
    "See RSI's article (linked below) for more steps.",
  ],
  source: kb('41070', '33938335789207-Error-Code-41070'),
}

const CODES: Record<string, ErrorCodeInfo> = {
  '30000': E30000, '30003': E30003, '30009': E30009, '30018': E30009, '30028': E30028,
  '60015': E60015, '40015': E60015, '65000': E65000, '41070': E41070,
}

export function lookupCode(code: number): ErrorCodeInfo | null {
  if (code >= 19000 && code <= 19999) return E19000
  return CODES[String(code)] ?? null
}
```

- [ ] **Step 4: Implement `src/lib/gamelog/noise.ts`**

```ts
import type { LogLine, NoiseSummary } from './types'

export function countNoise(lines: LogLine[]): NoiseSummary {
  const counts = new Map<string, number>()
  let total = 0
  for (const l of lines) {
    if (l.sev !== 'Error' && l.sev !== 'Warning') continue
    total++
    const k = l.tag ?? '(untagged)'
    counts.set(k, (counts.get(k) ?? 0) + 1)
  }
  const top = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5)
  return { total, top }
}
```

- [ ] **Step 5: Run tests and typecheck**

Run: `npm test && npx tsc --noEmit`
Expected: all PASS

- [ ] **Step 6: Commit**

```bash
git add src/lib/gamelog/errorCodes.ts src/lib/gamelog/noise.ts src/lib/gamelog/__tests__/errorCodes.test.ts src/lib/gamelog/__tests__/noise.test.ts
git commit -m "feat(gamelog): RSI-documented error codes (KB-sourced) and noise summary" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Rules, verdict and `diagnose()`

**Files:**
- Create: `src/lib/gamelog/rules.ts`, `src/lib/gamelog/diagnose.ts`
- Test: `src/lib/gamelog/__tests__/diagnose.test.ts`

**Interfaces:**
- Consumes: Tasks 1–5 (`parse`, `looksLikeGameLog`, `extractSystem`, `emptySystem`, `compareVersions`, `extractCrash`, `emptyCrash`, `findHandle`, `redact`, `lookupCode`, `countNoise`)
- Produces: `RULES: Rule[]`, `SOURCES: Record<string, Source>`, `diagnose(text: string, opts?: { liveVersion?: string | null }): Report`, `verdictFor(ctx: RuleContext): Verdict`

- [ ] **Step 1: Write the failing tests** in `src/lib/gamelog/__tests__/diagnose.test.ts`

```ts
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { diagnose } from '../diagnose'

const fx = (n: string) => readFileSync(path.join(__dirname, '..', '__fixtures__', n), 'utf8')
const LIVE = { liveVersion: '4.10.2' }
const ids = (r: ReturnType<typeof diagnose>) => r.findings.map((f) => f.ruleId)
const T = '<2026-01-01T00:00:00.000Z> '

describe('diagnose: real fixtures', () => {
  it('normal Vulkan session', () => {
    const r = diagnose(fx('normal-vulkan.log'), LIVE)
    expect(r.verdict.kind).toBe('normal')
    expect(r.system.renderer).toBe('Vulkan')
    expect(r.findings.filter((f) => f.severity === 'problem')).toEqual([])
    const ov = r.findings.find((f) => f.ruleId === 'overlays-installed')
    if (ov) expect(ov.severity).toBe('info')
  })

  it('DX11 session: old build warned, no wrong-GPU false alarm from the Basic Render adapter', () => {
    const r = diagnose(fx('normal-dx11.log'), LIVE)
    expect(r.system.renderer).toBe('DirectX 11')
    expect(ids(r)).toContain('old-build')
    expect(ids(r)).not.toContain('wrong-gpu')
  })

  it('timeout crash', () => {
    const r = diagnose(fx('crash-timeout.log'), LIVE)
    expect(r.verdict.kind).toBe('crashed')
    expect(r.verdict.headline).toMatch(/froze and was shut down/)
    expect(ids(r)).toContain('crash-timeout')
  })

  it('GPU and out-of-memory crash variants', () => {
    const gpu = diagnose(fx('crash-timeout.log').replace('Is GPU crash: No', 'Is GPU crash: Yes'), LIVE)
    expect(gpu.verdict.headline).toMatch(/GPU crash/)
    expect(ids(gpu)).toContain('crash-gpu')
    const oom = diagnose(fx('crash-timeout.log').replace('Is out of system memory: No', 'Is out of system memory: Yes'), LIVE)
    expect(oom.verdict.headline).toMatch(/out of memory/)
    expect(ids(oom)).toContain('crash-out-of-memory')
  })

  it('documented disconnect code', () => {
    const r = diagnose(fx('error-30000.log'), LIVE)
    expect(r.verdict.kind).toBe('disconnected')
    expect(r.errorCodes).toContain(30000)
    const f = r.findings.find((x) => x.ruleId === 'error-code')!
    expect(f.title).toMatch(/^Error 30000/)
    expect(f.commonCause).toBe(false)
  })

  it('undocumented code is labelled as such', () => {
    const r = diagnose(fx('error-70003.log'), LIVE)
    const f = r.findings.find((x) => x.title.indexOf('70003') !== -1)!
    expect(f.commonCause).toBe(true)
  })

  it('abnormal exit: tells the player the game may still be running', () => {
    const r = diagnose(fx('abnormal-exit.log'), LIVE)
    expect(r.verdict.kind).toBe('froze-or-closed')
    expect(r.verdict.detail).toMatch(/still running/)
  })

  it('PTU log gets the test-build note', () => {
    expect(ids(diagnose(fx('ptu.log'), LIVE))).toContain('ptu-log')
  })

  it('never puts the handle or Windows username into evidence', () => {
    for (const n of ['normal-vulkan.log', 'crash-timeout.log', 'error-30000.log']) {
      for (const f of diagnose(fx(n), LIVE).findings) {
        for (const e of f.evidence) expect(e).not.toMatch(/flanigan|\\Users\\(?!<you>)/i)
      }
    }
  })
})

describe('diagnose: review-focus inputs', () => {
  it('still-running game (no SystemQuit) is not called a crash', () => {
    const r = diagnose(fx('normal-vulkan.log').split('\n').filter((l) => l.indexOf('<SystemQuit>') === -1).join('\n'), LIVE)
    expect(r.verdict.kind).toBe('froze-or-closed')
    expect(r.verdict.detail).toMatch(/still running/)
  })

  it('header-less pasted fragment: no throw, unknown GPU, no wrong-GPU warning', () => {
    const r = diagnose(`${T}[Notice] <Error Popup Opened> errorCode=30028 [Team_UI][Disconnection]\n${T}[Notice] <SystemQuit> CSystem::Quit`, LIVE)
    expect(r.verdict.kind).toBe('disconnected')
    expect(r.system.gpu).toBeNull()
    expect(ids(r)).not.toContain('wrong-gpu')
  })

  it('wrong file (crash dump bytes, image, empty) gives not-a-log', () => {
    for (const t of ['', '\u0000\u0001MDMP\u0093\u00a7', '\u0089PNG\r\n\u001a\nIHDR']) {
      expect(diagnose(t, LIVE).verdict.kind).toBe('not-a-log')
    }
  })
})

describe('diagnose: synthetic rules', () => {
  it('integrated GPU chosen while a discrete GPU exists', () => {
    const r = diagnose([
      `${T}Branch: sc-alpha-4.10.2`,
      `${T}- NVIDIA GeForce RTX 3050 Laptop GPU (vendor = 0x10de, device = 0x25a2)`,
      `${T}- Intel(R) UHD Graphics 620 (vendor = 0x8086, device = 0x5917)`,
      `${T}D3D Adapter: Description: Intel(R) UHD Graphics 620`,
      `${T}[Notice] <SystemQuit> CSystem::Quit`,
    ].join('\n'), LIVE)
    const f = r.findings.find((x) => x.ruleId === 'wrong-gpu')!
    expect(f.title).toMatch(/wrong graphics card/)
    expect(f.fixes.join(' ')).toMatch(/RTX 3050/)
  })

  it('below minimum RAM and CPU threads', () => {
    const r = diagnose([`${T}Branch: sc-alpha-4.10.2`, `${T}Logical CPU Count: 2`, `${T}8072MB physical memory installed, 2000MB available`, `${T}[Notice] <SystemQuit> q`].join('\n'), LIVE)
    const f = r.findings.find((x) => x.ruleId === 'below-min-specs')!
    expect(f.explanation).toMatch(/8 GB/)
    expect(f.explanation).toMatch(/2 CPU threads/)
  })
})
```

- [ ] **Step 2: Run and confirm they fail**

Run: `npx vitest run src/lib/gamelog/__tests__/diagnose.test.ts`
Expected: FAIL, "Failed to resolve import ../diagnose"

- [ ] **Step 3: Implement `src/lib/gamelog/rules.ts`**

```ts
import type { Rule, RuleContext, RuleResult, Source } from './types'
import { lookupCode } from './errorCodes'
import { compareVersions } from './system'

const KB = 'https://support.robertsspaceindustries.com/hc/en-us/articles/'

export const SOURCES = {
  drivers: { label: 'RSI Support: Keep Graphics Drivers Up-to-date', url: `${KB}360042816254-Keep-Graphics-Drivers-Up-to-date` },
  vulkan: { label: 'RSI Support: Vulkan Troubleshooting', url: `${KB}38193952128535-Vulkan-Troubleshooting` },
  sendFiles: { label: 'RSI Support: Send In-Game Files for RSI Support', url: `${KB}360000065688-Send-In-Game-Files-for-RSI-Support` },
  pagefile: { label: 'RSI Support: Out of memory errors - set your pagefile', url: `${KB}360000083387-Out-of-memory-errors-set-your-pagefile` },
  overlays: { label: 'RSI Support: Unsupported Applications, Peripherals, and Overlays', url: `${KB}360000083167-Unsupported-Applications-Peripherals-and-Overlays` },
  support: { label: 'RSI Support', url: 'https://support.robertsspaceindustries.com/hc/en-us' },
  status: { label: 'RSI Status page', url: 'https://status.robertsspaceindustries.com/' },
  issueCouncil: { label: 'RSI Issue Council', url: 'https://issue-council.robertsspaceindustries.com/' },
  reportBug: { label: 'How to gather evidence for a bug report (dayonecitizen.com)', url: 'https://dayonecitizen.com/report-a-bug/gathering-evidence' },
  specs: { label: 'Star Citizen system requirements', url: 'https://starcitizenhelp.com/game-guides/system-requirements' },
} satisfies Record<string, Source>

const VERIFY = 'Verify your game files: in the RSI Launcher, open Settings and click Verify.'
const DRIVER = 'Update your graphics driver.'
const CRASH_FILES = "If it keeps happening, send RSI the crash files in %LOCALAPPDATA%\\Star Citizen\\Crashes (error.dmp, game.log, screenshot.jpg). Open the folder by pasting that path into File Explorer's address bar."

const grab = (ctx: RuleContext, re: RegExp, max = 3): string[] =>
  ctx.lines.filter((l) => re.test(l.raw)).slice(-max).map((l) => l.raw)

const crashEvidence = (ctx: RuleContext) => grab(ctx, /^(Is (GPU crash|Timeout|fatal error|out of (system|video) memory)|Exception |- Timeout message)/, 5)
const isOom = (ctx: RuleContext) => ctx.crash.outOfSystemMemory === true || ctx.crash.outOfVideoMemory === true

const IGPU = /Microsoft Basic Render Driver|Intel\(R\) (UHD|Iris|HD) Graphics|Radeon\(TM\) Graphics|AMD Radeon Graphics/i
const DGPU = /GeForce|Quadro|Radeon RX|Radeon Pro|Arc\(TM\) A\d|Arc A\d/i

export const RULES: Rule[] = [
  {
    id: 'crash-gpu', severity: 'problem',
    check: (ctx) => (ctx.crash.present && ctx.crash.gpu === true ? [{
      title: 'GPU crash',
      explanation: "Star Citizen's crash report says this was a GPU crash: the graphics card or its driver stopped responding.",
      fixes: [DRIVER, 'Turn off overlays (Steam, Discord, OBS, GeForce Experience and similar) and test again.', 'Try the other graphics renderer: switch between Vulkan and DirectX 11 in Graphics settings.', CRASH_FILES],
      sources: [SOURCES.drivers, SOURCES.vulkan, SOURCES.overlays], evidence: crashEvidence(ctx),
    }] : []),
  },
  {
    id: 'crash-out-of-memory', severity: 'problem',
    check: (ctx) => {
      if (!ctx.crash.present || !isOom(ctx)) return []
      const video = ctx.crash.outOfVideoMemory === true
      const r: RuleResult = video
        ? { title: 'Ran out of video memory', explanation: "The crash report says your graphics card ran out of memory (VRAM).",
            fixes: ['Lower texture quality and resolution in Graphics settings.', 'Close other programs that use the graphics card (browsers, video players, overlays).', DRIVER],
            sources: [SOURCES.drivers], evidence: crashEvidence(ctx), commonCause: true }
        : { title: 'Ran out of system memory', explanation: 'The crash report says your PC ran out of memory (RAM plus the Windows pagefile).',
            fixes: ["Follow RSI's pagefile guide (linked below). A pagefile that's too small is the usual cause.", 'Close other programs, especially web browsers, while you play.'],
            sources: [SOURCES.pagefile], evidence: crashEvidence(ctx) }
      return [r]
    },
  },
  {
    id: 'crash-timeout', severity: 'problem',
    check: (ctx) => (ctx.crash.present && ctx.crash.timeout === true && ctx.crash.gpu !== true && !isOom(ctx) ? [{
      title: 'The game froze and was shut down',
      explanation: "The game stopped responding, and its crash handler closed it. The log calls this a timeout: the main game thread looked stuck.",
      fixes: [VERIFY, DRIVER, CRASH_FILES],
      sources: [SOURCES.sendFiles, SOURCES.drivers], evidence: crashEvidence(ctx),
    }] : []),
  },
  {
    id: 'crash-other', severity: 'problem',
    check: (ctx) => (ctx.crash.present && ctx.crash.gpu !== true && ctx.crash.timeout !== true && !isOom(ctx) ? [{
      title: 'The game crashed',
      explanation: "The log ends with Star Citizen's crash report. It doesn't name one simple cause, so the next step is a clean check of your files and drivers.",
      fixes: [VERIFY, DRIVER, CRASH_FILES],
      sources: [SOURCES.sendFiles, SOURCES.reportBug], evidence: crashEvidence(ctx),
    }] : []),
  },
  {
    id: 'error-code', severity: 'problem',
    check: (ctx) => ctx.errorCodes.map((code): RuleResult => {
      const evidence = grab(ctx, new RegExp(`errorCode=${code}\\b`), 2)
      const info = lookupCode(code)
      if (info) return { title: `Error ${code}: ${info.title}`, explanation: info.meaning, fixes: info.fixes, sources: [info.source], evidence }
      return {
        title: `Error ${code}`,
        explanation: `RSI doesn't have a public article for error ${code} yet. Note the code and the time it happened.`,
        fixes: ['Restart the game and try again.', 'Search RSI Support for the code, and check the RSI Status page.'],
        sources: [SOURCES.support, SOURCES.status], evidence, commonCause: true,
      }
    }),
  },
  {
    id: 'stuck-loading', severity: 'problem',
    check: (ctx) => (ctx.stuckLoading ? [{
      title: 'Loading got stuck',
      explanation: 'Near the end of the log, the game reports a loading step "running for a long time": it was waiting a long time for part of loading in (such as spawning) to finish.',
      fixes: ["Give it a few minutes. If nothing moves, go back to the menu and join again.", 'Check the RSI Status page for server problems.'],
      sources: [SOURCES.status], evidence: grab(ctx, /CContextEstablisherTaskLongWait/, 2), commonCause: true,
    }] : []),
  },
  {
    id: 'froze-or-closed', severity: 'problem',
    check: (ctx) => (!ctx.crash.present && !ctx.endedCleanly ? [{
      title: 'The game stopped without closing normally',
      explanation: "This log has no normal shutdown at the end and no crash report. Usually the game froze and was force-closed, or Windows or the PC shut it down. If the game is still running, this log isn't finished yet: close the game, then check Game.log again.",
      fixes: ['Look in %LOCALAPPDATA%\\Star Citizen\\Crashes for a newer crash report.', DRIVER, VERIFY],
      sources: [SOURCES.drivers], evidence: [], commonCause: true,
    }] : []),
  },
  {
    id: 'wrong-gpu', severity: 'warning',
    check: (ctx) => {
      const gpu = ctx.system.gpu
      if (!gpu || !IGPU.test(gpu)) return []
      const discrete = ctx.system.adapters.find((a) => a !== gpu && DGPU.test(a))
      return [discrete
        ? { title: 'The game used the wrong graphics card', explanation: `The game ran on ${gpu} instead of your ${discrete}. Laptops often do this.`,
            fixes: [`In Windows Settings → System → Display → Graphics, set StarCitizen.exe to "High performance" so it uses your ${discrete}.`, 'Update both graphics drivers.'],
            sources: [SOURCES.specs], evidence: grab(ctx, /D3D Adapter: Description|Chosen Vulkan GPU Device/, 1) }
        : { title: 'Running on integrated graphics', explanation: `The game ran on ${gpu}. Star Citizen needs a dedicated graphics card, and integrated graphics are below the minimum requirements.`,
            fixes: ['Check that your PC has a dedicated graphics card and that its driver is installed.'],
            sources: [SOURCES.specs], evidence: grab(ctx, /D3D Adapter: Description|Chosen Vulkan GPU Device/, 1) }]
    },
  },
  {
    id: 'below-min-specs', severity: 'warning',
    check: (ctx) => {
      const parts: string[] = []
      const { ramMb, logicalCpus } = ctx.system
      if (ramMb !== null && ramMb < 15000) parts.push(`about ${Math.round(ramMb / 1024)} GB of RAM (the minimum is 16 GB)`)
      if (logicalCpus !== null && logicalCpus < 4) parts.push(`${logicalCpus} CPU threads (the minimum is a quad-core CPU)`)
      return parts.length ? [{
        title: 'Below the minimum system requirements',
        explanation: `This PC has ${parts.join(' and ')}. Expect crashes and long loading times below the minimum.`,
        fixes: ['Close every other program while you play.', 'Compare your PC with the system requirements (linked below).'],
        sources: [SOURCES.specs], evidence: grab(ctx, /physical memory installed|Logical CPU Count/, 2),
      }] : []
    },
  },
  {
    id: 'overlays-installed', severity: 'warning',
    check: (ctx) => {
      if (!ctx.system.overlays.length) return []
      const troubled = ctx.crash.present || !ctx.endedCleanly
      return [{
        title: 'Overlay programs installed',
        explanation: `These programs can hook into the game: ${ctx.system.overlays.join(', ')}. They don't always cause trouble, and RSI lists some overlays as unsupported.`,
        fixes: ['If you crash or see graphics glitches, turn these overlays off and test again.'],
        sources: [SOURCES.overlays], evidence: [], severity: troubled ? 'warning' : 'info',
      }]
    },
  },
  {
    id: 'old-build', severity: 'warning',
    check: (ctx) => {
      const v = ctx.system.version
      const live = ctx.liveVersion
      if (!v || !live || compareVersions(v, live) >= 0) return []
      return [{
        title: 'This log is from an older version',
        explanation: `This log is from Alpha ${v}, and the current version is ${live}. If you're fixing a problem now, check your newest Game.log (the one in the LIVE folder, not logbackups).`,
        fixes: [], sources: [], evidence: grab(ctx, /Branch: sc-alpha/, 1),
      }]
    },
  },
  {
    id: 'ptu-log', severity: 'info',
    check: (ctx) => {
      const env = ctx.system.environment
      if (!env || env === 'PUB') return []
      return [{
        title: `This is a ${env} (test build) log`,
        explanation: 'Test builds have their own known issues. Report bugs from test builds on the Issue Council for that build.',
        fixes: [], sources: [SOURCES.issueCouncil], evidence: grab(ctx, /Environment:/, 1),
      }]
    },
  },
]
```

- [ ] **Step 4: Implement `src/lib/gamelog/diagnose.ts`**

```ts
import { parse, looksLikeGameLog } from './parse'
import { extractSystem, emptySystem } from './system'
import { extractCrash, emptyCrash } from './crash'
import { countNoise } from './noise'
import { RULES } from './rules'
import { findHandle, redact } from './redact'
import type { Finding, Report, RuleContext, Severity, Verdict } from './types'

export interface DiagnoseOptions {
  liveVersion?: string | null
}

const ORDER: Record<Severity, number> = { problem: 0, warning: 1, info: 2 }

export function verdictFor(ctx: RuleContext): Verdict {
  const { crash, errorCodes, endedCleanly, stuckLoading } = ctx
  if (crash.present) {
    if (crash.gpu) return { kind: 'crashed', headline: 'Your game crashed (a GPU crash)', detail: 'The crash report says the graphics card or its driver stopped responding.' }
    if (crash.outOfSystemMemory || crash.outOfVideoMemory) {
      return { kind: 'crashed', headline: 'Your game crashed: it ran out of memory', detail: crash.outOfVideoMemory ? 'The crash report says the graphics card ran out of video memory.' : 'The crash report says the PC ran out of system memory.' }
    }
    if (crash.timeout) return { kind: 'crashed', headline: 'Your game froze and was shut down', detail: 'The game stopped responding and its crash handler closed it.' }
    return { kind: 'crashed', headline: 'Your game crashed', detail: "The log ends with Star Citizen's crash report." }
  }
  if (errorCodes.length) return { kind: 'disconnected', headline: `You were disconnected: error ${errorCodes.join(', ')}`, detail: 'The game showed an error popup with this code. See what it means below.' }
  if (stuckLoading) return { kind: 'stuck-loading', headline: 'The game got stuck loading', detail: 'Near the end, the game was waiting a long time for loading to finish.' }
  if (!endedCleanly) return { kind: 'froze-or-closed', headline: 'The game stopped without closing normally', detail: "No crash report and no normal shutdown, so it probably froze or was force-closed. If the game is still running, close it and check again." }
  return { kind: 'normal', headline: 'This session ended normally', detail: 'No crash, disconnect code or freeze found in this log.' }
}

export function diagnose(text: string, opts: DiagnoseOptions = {}): Report {
  const handle = findHandle(text)
  if (!looksLikeGameLog(text)) {
    return {
      verdict: { kind: 'not-a-log', headline: "This doesn't look like a Star Citizen Game.log", detail: 'Pick the file named Game.log in your StarCitizen\\LIVE folder (not error.dmp or screenshot.jpg from the Crashes folder).' },
      findings: [], system: emptySystem(), crash: emptyCrash(), errorCodes: [], noise: { total: 0, top: [] }, lineCount: 0, handle,
    }
  }
  const lines = parse(text)
  const system = extractSystem(lines)
  const crash = extractCrash(lines)
  const errorCodes: number[] = []
  for (const l of lines) {
    if (l.tag !== 'Error Popup Opened') continue
    const m = /errorCode=(\d+)/.exec(l.msg)
    if (m && errorCodes.indexOf(Number(m[1])) === -1) errorCodes.push(Number(m[1]))
  }
  const endedCleanly = lines.some((l) => l.tag === 'SystemQuit')
  const stuckLoading = lines.slice(-300).some((l) => l.tag === 'CContextEstablisherTaskLongWait')
  const ctx: RuleContext = { lines, system, crash, errorCodes, endedCleanly, stuckLoading, liveVersion: opts.liveVersion ?? null }
  const findings: Finding[] = []
  for (const rule of RULES) {
    if (rule.unverified) continue
    for (const r of rule.check(ctx)) {
      findings.push({
        ruleId: rule.id, severity: r.severity ?? rule.severity, title: r.title, explanation: r.explanation,
        fixes: r.fixes, sources: r.sources, evidence: r.evidence.slice(0, 5).map((e) => redact(e, handle)), commonCause: r.commonCause ?? false,
      })
    }
  }
  findings.sort((a, b) => ORDER[a.severity] - ORDER[b.severity])
  return { verdict: verdictFor(ctx), findings, system, crash, errorCodes, noise: countNoise(lines), lineCount: lines.length, handle }
}
```

- [ ] **Step 5: Run tests and typecheck**

Run: `npm test && npx tsc --noEmit`
Expected: all PASS. If a fixture-based assertion fails, look at the fixture (e.g. `stuck-loading.log` may not end with CET lines). Fix the fixture choice per Task 4 Step 2 rather than loosening the rule.

- [ ] **Step 6: Commit**

```bash
git add src/lib/gamelog/rules.ts src/lib/gamelog/diagnose.ts src/lib/gamelog/__tests__/diagnose.test.ts
git commit -m "feat(gamelog): rules, verdict precedence and diagnose()" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 7: Bug-report text, the purity guard, and performance

**Files:**
- Create: `src/lib/gamelog/bugReport.ts`
- Test: `src/lib/gamelog/__tests__/bugReport.test.ts`, `src/lib/gamelog/__tests__/purity.test.ts`

**Interfaces:**
- Consumes: `Report` (Task 1), `redact` (Task 3), `diagnose` (Task 6)
- Produces: `toBugReport(report: Report): string`

- [ ] **Step 1: Write the failing tests**

`src/lib/gamelog/__tests__/bugReport.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { diagnose } from '../diagnose'
import { toBugReport } from '../bugReport'

const fx = (n: string) => readFileSync(path.join(__dirname, '..', '__fixtures__', n), 'utf8')

describe('toBugReport', () => {
  it('summarises verdict, build and setup without personal data', () => {
    const r = diagnose(fx('crash-timeout.log'), { liveVersion: '4.10.2' })
    const t = toBugReport(r)
    expect(t).toMatch(/Verdict: Your game froze and was shut down/)
    expect(t).toMatch(/Build: sc-alpha-/)
    expect(t).toMatch(/Crash: GPU crash = no, timeout = yes/)
    expect(t).not.toMatch(/flanigan/i)
    expect(t).not.toMatch(/\\Users\\(?!<you>)/)
  })
  it('keeps the GPU driver version', () => {
    const t = toBugReport(diagnose(fx('normal-vulkan.log'), { liveVersion: '4.10.2' }))
    expect(t).toMatch(/GPU: .+ \(driver \d+\.\d+/)
  })
  it('re-redacts even if a handle slipped into the report object', () => {
    const r = diagnose(fx('normal-vulkan.log'), { liveVersion: '4.10.2' })
    r.handle = 'Leaky_Pilot'
    r.findings.push({ ruleId: 'x', severity: 'problem', title: 'Leaky_Pilot', explanation: '', fixes: [], sources: [], evidence: [], commonCause: false })
    expect(toBugReport(r)).not.toMatch(/Leaky_Pilot/)
  })
})
```

`src/lib/gamelog/__tests__/purity.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { diagnose } from '../diagnose'

const DIR = path.join(__dirname, '..')
const SRC = readdirSync(DIR).filter((f) => f.endsWith('.ts'))
const BANNED = /\bfetch\s*\(|XMLHttpRequest|sendBeacon|WebSocket|localStorage|sessionStorage|indexedDB|document\.cookie|\bwindow\.|\bprocess\./

describe('engine purity (privacy guarantee)', () => {
  for (const f of SRC) {
    it(`${f} has no network, storage or environment access`, () => {
      expect(readFileSync(path.join(DIR, f), 'utf8')).not.toMatch(BANNED)
    })
  }
})

describe('performance', () => {
  it('diagnoses a 50,000-line log in under a second', () => {
    const base = readFileSync(path.join(DIR, '__fixtures__', 'normal-vulkan.log'), 'utf8').split('\n')
    const big: string[] = []
    while (big.length < 50000) big.push(...base)
    const t0 = Date.now()
    diagnose(big.join('\n'), { liveVersion: '4.10.2' })
    expect(Date.now() - t0).toBeLessThan(1000)
  })
})
```

- [ ] **Step 2: Run and confirm they fail**

Run: `npx vitest run src/lib/gamelog/__tests__/bugReport.test.ts src/lib/gamelog/__tests__/purity.test.ts`
Expected: bugReport FAIL (unresolved import); purity may already pass. That's fine, it's a guard.

- [ ] **Step 3: Implement `src/lib/gamelog/bugReport.ts`**

```ts
import { redact } from './redact'
import type { Report } from './types'

const yn = (v: boolean | null) => (v === null ? 'unknown' : v ? 'yes' : 'no')

export function toBugReport(r: Report): string {
  const s = r.system
  const out: string[] = [
    'Star Citizen Game.log summary (starcitizenhelp.com/tools/game-log-checker)',
    `Verdict: ${r.verdict.headline}`,
    `Build: ${s.branch ?? 'unknown'}${s.changelist ? ` (changelist ${s.changelist})` : ''}${s.environment ? `, ${s.environment}` : ''}`,
    `GPU: ${s.gpu ?? 'unknown'}${s.gpuDriver ? ` (driver ${s.gpuDriver})` : ''}${s.renderer ? `, ${s.renderer}` : ''}`,
    `CPU: ${s.cpu ?? 'unknown'}${s.logicalCpus !== null ? `, ${s.logicalCpus} threads` : ''}`,
    `RAM: ${s.ramMb !== null ? `${Math.round(s.ramMb / 1024)} GB` : 'unknown'}`,
    `Windows: ${s.windowsLabel ?? 'unknown'}${s.windowsBuild !== null ? ` (build ${s.windowsBuild})` : ''}`,
  ]
  if (r.crash.present) {
    out.push(`Crash: GPU crash = ${yn(r.crash.gpu)}, timeout = ${yn(r.crash.timeout)}, fatal = ${yn(r.crash.fatal)}, out of system memory = ${yn(r.crash.outOfSystemMemory)}, out of video memory = ${yn(r.crash.outOfVideoMemory)}`)
    if (r.crash.exception) out.push(`Exception: ${r.crash.exception}`)
  }
  if (r.errorCodes.length) out.push(`Error codes: ${r.errorCodes.join(', ')}`)
  const shown = r.findings.filter((f) => f.severity !== 'info')
  if (shown.length) {
    out.push('', 'Problems found:')
    for (const f of shown) out.push(`- ${f.title}`)
  }
  const ev = r.findings.reduce<string[]>((acc, f) => acc.concat(f.evidence), []).slice(0, 12)
  if (ev.length) {
    out.push('', 'Key log lines:')
    for (const e of ev) out.push(e)
  }
  return redact(out.join('\n'), r.handle)
}
```

- [ ] **Step 4: Run tests and typecheck**

Run: `npm test && npx tsc --noEmit`
Expected: all PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/gamelog/bugReport.ts src/lib/gamelog/__tests__/bugReport.test.ts src/lib/gamelog/__tests__/purity.test.ts
git commit -m "feat(gamelog): redacted bug-report summary, engine purity guard, 50k-line perf test" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 8: The page, client component and CSP (beta: noindex)

**Files:**
- Create: `src/views/GameLogChecker.tsx`, `src/app/tools/game-log-checker/page.tsx`
- Modify: `next.config.ts` (add `headers`)

**Interfaces:**
- Consumes: `diagnose` (Task 6), `toBugReport` (Task 7), `Report`/`Finding` (Task 1), `LIVE_VERSION` from `@/data/patch-status`, `PageSources` from `@/components/PageSources`, `SITE_URL` from `@/lib/site`, ui `Button` and `Textarea`
- Produces: route `/tools/game-log-checker`; a file input `input[type=file]` and an `h2` with the verdict headline (Task 10 relies on both)

- [ ] **Step 1: Create `src/views/GameLogChecker.tsx`**

```tsx
'use client'
import { useCallback, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { diagnose } from '@/lib/gamelog/diagnose'
import { toBugReport } from '@/lib/gamelog/bugReport'
import type { Finding, Report } from '@/lib/gamelog/types'
import { LIVE_VERSION } from '@/data/patch-status'

const MAX_BYTES = 100 * 1024 * 1024

const VERDICT_STYLE: Record<Report['verdict']['kind'], string> = {
  crashed: 'border-red-500/50 bg-red-500/10',
  disconnected: 'border-amber-500/50 bg-amber-500/10',
  'stuck-loading': 'border-amber-500/50 bg-amber-500/10',
  'froze-or-closed': 'border-amber-500/50 bg-amber-500/10',
  normal: 'border-emerald-500/50 bg-emerald-500/10',
  'not-a-log': 'border-white/20 bg-white/[0.04]',
}
const SEVERITY_LABEL: Record<Finding['severity'], string> = { problem: 'Problem', warning: 'Warning', info: 'Info' }

function FindingCard({ f }: { f: Finding }) {
  return (
    <li className="rounded-lg border border-white/[0.08] bg-white/[0.04] p-5">
      <p className="text-xs uppercase tracking-wider text-foreground/60 mb-1">
        {SEVERITY_LABEL[f.severity]}{f.commonCause ? ' · Common cause (not confirmed by RSI)' : ''}
      </p>
      <h3 className="font-semibold text-primary mb-2">{f.title}</h3>
      <p className="text-foreground/80 mb-3">{f.explanation}</p>
      {f.fixes.length > 0 && (
        <>
          <p className="text-sm font-semibold text-foreground/90 mb-1">What to try</p>
          <ol className="list-decimal pl-6 space-y-1 text-foreground/80 mb-3">{f.fixes.map((x) => <li key={x}>{x}</li>)}</ol>
        </>
      )}
      {f.sources.length > 0 && (
        <p className="text-sm text-foreground/70">
          Source:{' '}
          {f.sources.map((s, i) => (
            <span key={s.url}>{i > 0 ? ' · ' : ''}<a href={s.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{s.label}</a></span>
          ))}
        </p>
      )}
      {f.evidence.length > 0 && (
        <details className="mt-3">
          <summary className="cursor-pointer text-sm text-foreground/60">Log lines we found</summary>
          <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-all text-xs text-foreground/70">{f.evidence.join('\n')}</pre>
        </details>
      )}
    </li>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex gap-4 py-1 border-b border-white/[0.06] last:border-0">
      <dt className="w-32 shrink-0 text-foreground/60">{k}</dt>
      <dd className="text-foreground/90 break-words min-w-0">{v}</dd>
    </div>
  )
}

export default function GameLogChecker() {
  const [report, setReport] = useState<Report | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [pasted, setPasted] = useState('')
  const [dragging, setDragging] = useState(false)
  const [copied, setCopied] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null)

  const run = useCallback((text: string) => {
    setError(null)
    setCopied(false)
    setReport(diagnose(text, { liveVersion: LIVE_VERSION }))
  }, [])

  const readFile = useCallback(async (file: File) => {
    if (file.size > MAX_BYTES) {
      setReport(null)
      setError('That file is over 100 MB. Game.log files are usually 1 to 20 MB, so check you picked Game.log.')
      return
    }
    run(await file.text())
  }, [run])

  const clear = () => {
    setReport(null); setError(null); setPasted(''); setCopied(false)
    if (fileInput.current) fileInput.current.value = ''
  }

  const copy = async () => {
    if (!report) return
    await navigator.clipboard.writeText(toBugReport(report))
    setCopied(true)
  }

  const s = report?.system
  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) void readFile(f) }}
        className={`rounded-lg border-2 border-dashed p-8 text-center transition-colors ${dragging ? 'border-primary bg-primary/10' : 'border-white/20 bg-white/[0.03]'}`}
      >
        <p className="text-foreground/90 mb-4">Drop your <strong>Game.log</strong> here, or</p>
        <label className="inline-block">
          <span className="sr-only">Choose your Game.log file</span>
          <input ref={fileInput} type="file" accept=".log,.txt,text/plain" className="block mx-auto text-sm"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) void readFile(f) }} />
        </label>
      </div>

      <div className="mt-6">
        <label htmlFor="gamelog-paste" className="block text-sm text-foreground/80 mb-2">Or paste the log text (for example from Discord):</label>
        <Textarea id="gamelog-paste" value={pasted} onChange={(e) => setPasted(e.target.value)} rows={5} placeholder="Paste Game.log text here" />
        <div className="mt-3 flex flex-wrap gap-3">
          <Button onClick={() => run(pasted)} disabled={!pasted.trim()}>Check pasted text</Button>
          {(report || error) && <Button variant="outline" onClick={clear}>Clear</Button>}
        </div>
      </div>

      {error && <p role="alert" className="mt-6 text-amber-300">{error}</p>}

      {report && (
        <section aria-live="polite" className="mt-10 space-y-8">
          <div className={`rounded-lg border p-6 ${VERDICT_STYLE[report.verdict.kind]}`}>
            <h2 className="text-2xl font-rsi-nav text-primary mb-2">{report.verdict.headline}</h2>
            <p className="text-foreground/85">{report.verdict.detail}</p>
          </div>

          {report.findings.length > 0 && (
            <div>
              <h2 className="text-xl font-rsi-nav text-primary mb-4">What we found</h2>
              <ul className="space-y-4">{report.findings.map((f, i) => <FindingCard key={`${f.ruleId}-${i}`} f={f} />)}</ul>
            </div>
          )}

          {s && report.verdict.kind !== 'not-a-log' && (
            <div>
              <h2 className="text-xl font-rsi-nav text-primary mb-4">Your setup</h2>
              <dl className="rounded-lg border border-white/[0.08] bg-white/[0.04] p-5 text-sm">
                <Row k="Game build" v={`${s.branch ?? 'Unknown'}${s.environment ? ` (${s.environment === 'PUB' ? 'LIVE' : s.environment})` : ''}`} />
                <Row k="Graphics card" v={`${s.gpu ?? 'Unknown'}${s.gpuDriver ? `, driver ${s.gpuDriver}` : ''}`} />
                <Row k="Renderer" v={s.renderer ?? 'Unknown'} />
                <Row k="CPU" v={`${s.cpu ?? 'Unknown'}${s.logicalCpus !== null ? ` (${s.logicalCpus} threads)` : ''}`} />
                <Row k="RAM" v={s.ramMb !== null ? `${Math.round(s.ramMb / 1024)} GB` : 'Unknown'} />
                <Row k="Windows" v={`${s.windowsLabel ?? 'Unknown'}${s.windowsBuild !== null ? ` (build ${s.windowsBuild})` : ''}`} />
                <Row k="Overlays" v={s.overlays.length ? s.overlays.join(', ') : s.renderer === 'Vulkan' ? 'None found' : 'Only visible in Vulkan logs'} />
              </dl>
            </div>
          )}

          {report.noise.total > 0 && (
            <div className="rounded-lg border border-white/[0.08] bg-white/[0.04] p-5 text-sm text-foreground/80">
              <h2 className="font-semibold text-foreground/90 mb-1">About the {report.noise.total.toLocaleString()} &ldquo;Error&rdquo; lines</h2>
              <p>Every Game.log is full of lines marked Error. Almost all are routine engine messages, not problems
                (the most common here: {report.noise.top.slice(0, 3).map(([t]) => t).join(', ')}). The checker ignores them
                and looks for the specific signs of real trouble above.</p>
            </div>
          )}

          {report.verdict.kind !== 'not-a-log' && (
            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={() => void copy()}>{copied ? 'Copied: check it before you paste' : 'Copy summary for a bug report'}</Button>
              <a href="https://dayonecitizen.com/report-a-bug/gathering-evidence" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                How to file a good bug report
              </a>
            </div>
          )}
        </section>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Create `src/app/tools/game-log-checker/page.tsx`**

```tsx
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'
import GameLogChecker from '@/views/GameLogChecker'
import { PageSources } from '@/components/PageSources'

/** Private beta until Task 12 flips this to false. */
const BETA = true
const PAGE_URL = `${SITE_URL}/tools/game-log-checker`
const TITLE = 'Star Citizen Game.log Checker: Find Out Why Your Game Crashed'
const DESCRIPTION = 'Free Star Citizen Game.log checker. Drop in your log and get a plain-English diagnosis of crashes, disconnect error codes and freezes. Your log never leaves your browser.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  robots: BETA ? { index: false, follow: false } : undefined,
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, type: 'website', images: [{ url: '/images/heroes/hero-06.jpg', width: 1920, height: 1080, alt: 'Star Citizen Game.log checker' }] },
}

const FAQ: Array<{ q: string; a: string }> = [
  { q: 'Is my log uploaded anywhere?', a: "No. Your Game.log is read inside your own browser. Nothing is uploaded, stored or sent anywhere, and closing the tab erases it. You can prove it: load this page, turn off your internet, and the checker still works." },
  { q: 'Where is my Game.log?', a: 'In your Star Citizen install folder, inside LIVE. By default that is C:\\Program Files\\Roberts Space Industries\\StarCitizen\\LIVE\\Game.log. Older sessions are in the logbackups folder next to it, and crash reports are in %LOCALAPPDATA%\\Star Citizen\\Crashes.' },
  { q: 'Why does my log have thousands of errors?', a: 'Every Game.log has thousands of lines marked Error. Almost all are routine engine messages and not problems. The checker ignores them and looks for the specific signs of real trouble: crash reports, disconnect error codes, freezes and loading stalls.' },
  { q: 'What does error 30000 mean?', a: 'RSI calls 30000 its general timeout message: you lost your connection to the game server, often because the server crashed. Verifying your game files and fully restarting the RSI Launcher are RSI’s first suggested fixes. The checker shows the full list when it finds the code.' },
  { q: 'What should I send RSI support after a crash?', a: 'The files in %LOCALAPPDATA%\\Star Citizen\\Crashes (error.dmp, game.log and screenshot.jpg). The checker’s "Copy summary for a bug report" button gives you a short, privacy-safe summary to go with them.' },
]

export default function GameLogCheckerPage() {
  const jsonLd = [
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Star Citizen Game.log Checker', url: PAGE_URL, applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any (runs in your browser)', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, description: DESCRIPTION },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
  ]
  return (
    <div className="container mx-auto px-4 py-16 pt-24 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="text-3xl md:text-4xl font-bold font-rsi-nav tracking-tight mb-4 text-primary">Star Citizen Game.log Checker</h1>
      <p className="text-foreground/80 text-lg mb-6">Drop in your Game.log and find out why your game crashed, froze or disconnected, in plain English, with the fix and RSI&apos;s official help article.</p>

      <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-4 mb-6">
        <p className="text-foreground/90"><strong>Your log never leaves your computer.</strong> It&apos;s read right here in your browser. Nothing is uploaded, stored or sent anywhere. Try it with your internet off.</p>
      </div>

      <div className="rounded-lg border border-white/[0.08] bg-white/[0.04] p-5 mb-8 text-sm text-foreground/80">
        <h2 className="font-semibold text-foreground/90 mb-2">Where&apos;s my Game.log?</h2>
        <p className="mb-2">In your install folder, inside <code>LIVE</code>:</p>
        <pre className="overflow-x-auto whitespace-pre-wrap break-all rounded bg-black/30 p-3 mb-2">C:\Program Files\Roberts Space Industries\StarCitizen\LIVE\Game.log</pre>
        <p className="mb-2">Older sessions are in the <code>logbackups</code> folder next to it. Crash reports are in <code>%LOCALAPPDATA%\Star Citizen\Crashes</code> (paste that into File Explorer&apos;s address bar).</p>
        <p><strong>Tip:</strong> check the log right after the problem. Relaunching the game starts a new Game.log, and the old one moves to <code>logbackups</code>.</p>
      </div>

      <GameLogChecker />

      <section className="mt-16">
        <h2 className="text-2xl font-rsi-nav text-primary mb-4">Common problems the checker finds</h2>
        <ul className="list-disc pl-6 space-y-2 text-foreground/80">
          <li><strong>Crashes</strong>, including GPU crashes, out-of-memory crashes and freezes the game&apos;s watchdog shut down.</li>
          <li><strong>Disconnect error codes</strong> such as 30000, 30009/30018, 30028, 60015, 65000, 41070 and the 19000 series, each with RSI&apos;s own explanation and fix.</li>
          <li><strong>Loading that got stuck</strong>, and sessions that ended without a normal shutdown.</li>
          <li><strong>Setup problems:</strong> the game running on the wrong graphics card, a PC below the minimum requirements, overlays that can interfere, and logs from an old version.</li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-rsi-nav text-primary mb-4">Questions</h2>
        {FAQ.map(({ q, a }) => (
          <details key={q} className="rounded-lg border border-white/10 bg-white/[0.03] mb-3">
            <summary className="cursor-pointer px-5 py-4 font-semibold text-primary">{q}</summary>
            <p className="px-5 pb-4 text-foreground/80">{a}</p>
          </details>
        ))}
      </section>

      <PageSources route="/tools/game-log-checker" />
    </div>
  )
}
```

- [ ] **Step 3: Check the PageSources import name, then add the CSP in `next.config.ts`**

Run: `grep -n "export" src/components/PageSources.tsx | head -3`. If it's a default export, change the import in `page.tsx` to `import PageSources from '@/components/PageSources'`.

In `next.config.ts`, add a `headers` property to `nextConfig` next to `redirects`:

```ts
  // Game.log Checker privacy guarantee: the page may only talk to its own origin.
  // Vercel Analytics / Speed Insights and /api/log are same-origin, so 'self' covers them.
  headers: async () => [
    {
      source: '/tools/game-log-checker',
      headers: [{ key: 'Content-Security-Policy', value: "connect-src 'self'" }],
    },
  ],
```

- [ ] **Step 4: Typecheck, test and build**

Run: `npx tsc --noEmit && npm test && npx next build`
Expected: all pass. The build output lists `/tools/game-log-checker`.

- [ ] **Step 5: Smoke-test the production build locally**

```bash
npx next start -p 4010 &
sleep 6
curl -sI http://localhost:4010/tools/game-log-checker | grep -i -E "^HTTP|content-security-policy"
curl -s http://localhost:4010/tools/game-log-checker | grep -o '<meta name="robots" content="[^"]*"'
```

Expected: `HTTP/1.1 200`, `content-security-policy: connect-src 'self'`, and `<meta name="robots" content="noindex, nofollow"`. Stop the server by PID afterwards (`netstat -ano | grep :4010`, then `taskkill //PID <pid> //F`). Never kill `node.exe` by image name.

- [ ] **Step 6: Commit**

```bash
git add src/views/GameLogChecker.tsx src/app/tools/game-log-checker/page.tsx next.config.ts
git commit -m "feat: Game.log Checker page (private beta, noindex) with route-scoped CSP connect-src 'self'" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 9: Ledger claims for the error-code meanings

**Files (docs repo `E:\Claude Code\sc-portfolio\docs`):**
- Create: `claims/rsi-error-30000.md`, `claims/rsi-error-30003.md`, `claims/rsi-error-30009-30018.md`, `claims/rsi-error-30028.md`, `claims/rsi-error-19000-series.md`, `claims/rsi-error-60015-40015.md`, `claims/rsi-error-65000.md`, `claims/rsi-error-41070.md`
- Then in SCH: regenerate `src/data/page-sources.generated.json`

**Interfaces:**
- Consumes: the wording in `errorCodes.ts` (Task 5). Each claim restates that entry's meaning, and the two must agree.
- Produces: verified claims whose `usage` names `starcitizenhelp.com /tools/game-log-checker`, so `PageSources` lists them on the page

- [ ] **Step 1: Pull the docs repo first** (standing rule)

```bash
cd "E:/Claude Code/sc-portfolio/docs" && git pull --rebase
```

- [ ] **Step 2: Create the 8 claim files.** Use this exact shape. The `claim` sentence paraphrases the `meaning` in `errorCodes.ts`, and the source is that entry's KB URL. The first file in full:

```markdown
---
id: rsi-error-30000
claim: "Star Citizen error code 30000 is RSI's general timeout message: the player lost connection to the game server (often a server crash) or timed out while connecting. RSI's suggested fixes include verifying game files, fully restarting the RSI Launcher, turning off a VPN, and deleting the USER folder in the LIVE install folder."
status: verified
sources:
  - https://support.robertsspaceindustries.com/hc/en-us/articles/360053608633-Error-Code-30000
lastVerified: 2026-10-14
usage:
  - starcitizenhelp.com /tools/game-log-checker — error-code finding text (src/lib/gamelog/errorCodes.ts) and FAQ "What does error 30000 mean?"
---

RSI KB "Error Code 30000" (updated 2026-07-29): "Code 30000 is our general timeout message. This appears when the player loses connection to the game server (server crash) or times out connecting but remains connected to the hub server."
```

The other seven use the same frontmatter. Each `claim`, `sources` URL and a one-line KB quote come from the matching `errorCodes.ts` entry:
- `rsi-error-30003`: URL `…/360002285233-Error-Code-30003`; claim "RSI is still investigating error 30003; most reports point to network problems and resulting file corruption, or programs that manage internet traffic such as cFosSpeed."
- `rsi-error-30009-30018`: URL `…/360038342233-Error-Code-30009-30018`; claim "Errors 30009/30018 are a login issue RSI is tracking that appears most often after logging out or crashing inside a ship or in a no-fly zone."
- `rsi-error-30028`: URL `…/360052827894-Error-Code-30028`; claim "Error 30028 means the player was kicked for inactivity."
- `rsi-error-19000-series`: URL `…/36547864392471-Error-Code-19000-19005`; claim "19000-series errors are authentication failures between the player's PC/account and the game servers, not related to multi-factor login."
- `rsi-error-60015-40015`: URL `…/360041558213-Error-Code-60015`; claim "Error 60015 (or its 40015 variant) means the game instance the player is being placed in is not working properly; RSI's fix is to change login region before entering the Universe."
- `rsi-error-65000`: URL `…/34409251540887-Error-Code-65000`; claim "Error 65000 means something went wrong while loading into the Persistent Universe, usually temporary network issues."
- `rsi-error-41070`: URL `…/33938335789207-Error-Code-41070`; claim "Error 41070 generally means an issue with the player's character data that prevents loading into the game."

- [ ] **Step 3: Commit and push the docs repo**

```bash
cd "E:/Claude Code/sc-portfolio/docs"
git add claims/rsi-error-*.md
git commit -m "feat(claims): RSI error-code meanings for the Game.log Checker (8 KB-sourced claims)" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git push origin master
```

- [ ] **Step 4: Regenerate page sources in SCH and check they appear**

```bash
cd "E:/Claude Code/sc-portfolio/StarCitizenHelp-live"
npm run -s gen-sources
grep -c "rsi-error-" src/data/page-sources.generated.json
npx tsc --noEmit && npx next build
```

Expected: the count is 8 or more, and the build passes.

- [ ] **Step 5: Commit**

```bash
git add src/data/page-sources.generated.json
git commit -m "chore: page sources for the Game.log Checker error-code claims" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 10: Browser check, PR, and private beta deploy

**Files:**
- Create: `E:\Claude Code\sc-portfolio\scripts\gamelog-checker-e2e.mjs` (sc-portfolio repo; it uses that repo's `playwright-core`)

**Interfaces:**
- Consumes: the route, `input[type=file]` and the verdict `h2` (Task 8); the fixtures (Task 4)

- [ ] **Step 1: Create the browser check script**

```js
// Usage: node scripts/gamelog-checker-e2e.mjs <baseUrl> <fixturesDir>
import { chromium } from 'playwright-core'
import path from 'node:path'

const [, , base, dir] = process.argv
const exe = process.env.CHROMIUM_PATH || `${process.env.LOCALAPPDATA}/ms-playwright/chromium-1234/chrome-win64/chrome.exe`
const CASES = [
  ['normal-vulkan.log', /ended normally/i],
  ['crash-timeout.log', /froze and was shut down/i],
  ['error-30000.log', /error 30000/i],
  ['abnormal-exit.log', /without closing normally/i],
]
const origin = new URL(base).origin
const browser = await chromium.launch({ executablePath: exe })
let failed = 0
for (const width of [1280, 360]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } })
  const offsite = []
  const cspErrors = []
  page.on('request', (r) => { if (new URL(r.url()).origin !== origin && !r.url().startsWith('data:')) offsite.push(r.url()) })
  page.on('console', (m) => { if (/Content Security Policy/i.test(m.text())) cspErrors.push(m.text()) })
  await page.goto(`${base}/tools/game-log-checker`, { waitUntil: 'networkidle' })
  for (const [file, expected] of CASES) {
    const before = offsite.length
    await page.setInputFiles('input[type=file]', path.join(dir, file))
    try {
      await page.getByRole('heading', { level: 2, name: expected }).first().waitFor({ timeout: 5000 })
      console.log(`ok   ${width}px ${file}`)
    } catch {
      failed++
      console.log(`FAIL ${width}px ${file}: verdict heading ${expected} not found`)
    }
    if (offsite.length !== before) { failed++; console.log(`FAIL ${width}px ${file}: off-site requests while diagnosing: ${offsite.slice(before).join(', ')}`) }
  }
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
  if (overflow) { failed++; console.log(`FAIL ${width}px: horizontal scroll`) }
  if (cspErrors.length) { failed++; console.log(`FAIL ${width}px: CSP violations: ${cspErrors.join(' | ')}`) }
  if (offsite.length) console.log(`note ${width}px: off-site requests during page load: ${offsite.join(', ')}`)
  await page.close()
}
await browser.close()
console.log(failed ? `${failed} FAILED` : 'ALL PASSED')
process.exit(failed ? 1 : 0)
```

- [ ] **Step 2: Run it against the local production build**

```bash
cd "E:/Claude Code/sc-portfolio/StarCitizenHelp-live" && npx next build && (npx next start -p 4010 &) && sleep 6
cd "E:/Claude Code/sc-portfolio" && node scripts/gamelog-checker-e2e.mjs http://localhost:4010 "E:/Claude Code/sc-portfolio/StarCitizenHelp-live/src/lib/gamelog/__fixtures__"
```

Expected: `ALL PASSED`. Any "off-site requests during page load" note must be examined. Fonts and images are fine (CSP `connect-src` doesn't cover them), but no `fetch`/XHR may go off-site. Stop the server by PID.

- [ ] **Step 3: Offline proof (manual, 1 minute).** With the local server running, open the page in Chrome, then DevTools → Network → **Offline**. Drop `crash-timeout.log`. The verdict must appear. Note "offline check passed" for the PR body.

- [ ] **Step 4: Commit the script (sc-portfolio repo) and open the SCH PR**

```bash
cd "E:/Claude Code/sc-portfolio" && git add scripts/gamelog-checker-e2e.mjs && git commit -m "chore: browser check for the Game.log Checker (verdicts, no off-site requests, CSP, 360px)" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" && git push origin main
cd "E:/Claude Code/sc-portfolio/StarCitizenHelp-live" && git push -u origin feat/game-log-checker
gh pr create --base main --title "feat: Game.log Checker (private beta, noindex)" --body "<summary: what it does, the privacy guarantees and how they're enforced (purity test, CSP, offline check), the test counts, ALL PASSED from the browser check, beta = noindex and unlinked. End with: 🤖 Generated with [Claude Code](https://claude.com/claude-code)>"
```

- [ ] **Step 5: After Doc says "merge":** squash-merge, wait for the Vercel production deploy, then verify production:

```bash
curl -sI https://starcitizenhelp.com/tools/game-log-checker | grep -i -E "^HTTP|content-security-policy"
curl -s https://starcitizenhelp.com/tools/game-log-checker | grep -o '<meta name="robots" content="[^"]*"'
curl -s https://starcitizenhelp.com/sitemap.xml | grep -c game-log-checker
cd "E:/Claude Code/sc-portfolio" && node scripts/gamelog-checker-e2e.mjs https://starcitizenhelp.com "E:/Claude Code/sc-portfolio/StarCitizenHelp-live/src/lib/gamelog/__fixtures__"
```

Expected: 200, CSP present, `noindex, nofollow`, sitemap count `0`, and `ALL PASSED`.

---

### Task 11: Private beta (Oct 25 – Nov 1)

Process task. No code until a miss comes in.

- [ ] **Step 1:** Give Doc the beta message to post in a private Discord channel. Include the URL, "drop your Game.log (especially from a crash, a disconnect code, or a stuck loading screen)", "nothing is uploaded", "if it gets something wrong or misses a problem, send the log here", and "AMD/Intel GPU and laptop players especially wanted".
- [ ] **Step 2:** For each log Doc chooses to share, build a fixture with `scripts/make-gamelog-fixture.ts` (Task 4). Then write a failing test in `diagnose.test.ts` for the correct verdict and finding, fix `rules.ts`, `system.ts` or `errorCodes.ts`, and run `npm test && npx tsc --noEmit && npx next build`. Each code change that adds a factual claim (a new error code) also gets a ledger claim (Task 9 shape).
- [ ] **Step 3:** Batch the beta fixes into one PR by Nov 1. Merge only on Doc's word.
- [ ] **Step 4:** Re-run the browser check against production after the beta fixes deploy.

---

### Task 12: Public launch (Nov 2–5)

**Files:**
- Modify: `src/app/tools/game-log-checker/page.tsx` (`BETA = false`), `src/app/sitemap.ts`, `src/views/Tools.tsx`, `src/app/llms.txt/route.ts`
- dayonecitizen-main: the report-a-bug pages (separate PR)

- [ ] **Step 1: Flip off beta.** In `page.tsx` set `const BETA = false`.
- [ ] **Step 2: Add a sitemap entry** in `src/app/sitemap.ts` after the `/tools` line:

```ts
    { url: `${base}/tools/game-log-checker`, lastModified: new Date('2026-11-03'), changeFrequency: 'monthly', priority: 0.8 },
```

- [ ] **Step 3: Add a `/tools` card.** In `src/views/Tools.tsx`, directly under the intro `<div className="text-center mb-12">…</div>` block, add:

```tsx
      <div className="mb-12 rounded-lg border border-primary/40 bg-primary/10 p-6 text-center">
        <h2 className="text-2xl font-rsi-nav text-primary mb-2">New: Game.log Checker</h2>
        <p className="text-foreground/80 max-w-2xl mx-auto mb-4">Find out why your game crashed, froze or disconnected. Drop in your Game.log for a plain-English diagnosis. Your log never leaves your browser.</p>
        <a href="/tools/game-log-checker" className="inline-block rounded-md bg-primary px-5 py-2 font-semibold text-primary-foreground hover:bg-primary/90">Check my Game.log</a>
      </div>
```

- [ ] **Step 4: Add an `llms.txt` line.** In `src/app/llms.txt/route.ts`, after the `[Tools](...)` line, add:

```ts
    `- [Game.log Checker](${SITE}/tools/game-log-checker): Free in-browser Star Citizen Game.log checker — plain-English diagnosis of crashes, disconnect error codes (30000, 30009/30018, 19000-series…) and freezes, with RSI's official fixes. Logs are never uploaded.`,
```

- [ ] **Step 5: Verify, PR, merge on Doc's word, then check production**

Run: `npx tsc --noEmit && npm test && npx next build`. Open a PR. After the merge, check that production has no `noindex`, that the sitemap contains the URL, and that the browser check reports `ALL PASSED`. The production deploy pings IndexNow. Then give Doc the Search Console **Request Indexing** step for the URL.

- [ ] **Step 6: Link from dayone (separate PR in `dayonecitizen-main`).** On `/report-a-bug/gathering-evidence` and `/report-a-bug/after-you-file`, add one sentence in the body near the Game.log section: "Not sure what your Game.log says? Our sister site's <a href="https://starcitizenhelp.com/tools/game-log-checker">Game.log Checker</a> reads it in your browser and explains crashes and error codes in plain English." Use the page's existing link markup. Build with `npx next build`, open the PR, and merge on Doc's word.

- [ ] **Step 7: Announce and record.** Give Doc a Discord announcement draft. Update `STATUS.md` (launched, URL, measure GSC queries for "game.log" / "star citizen crash" / "error 30000" after 2–4 weeks, and Discord bot phase 2 after IAE). Commit and push sc-portfolio.
