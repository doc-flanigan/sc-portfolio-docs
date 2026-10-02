# AI-fetch re-pull — 2026-10-01

**Source:** `node gsc-mcp-server/cta-report.mjs --days 14 --json`, from the `ai-bot:` rows in the click sheet.
**Window:** 2026-09-18 → 10-01 vs the prior 14 days.
**Purpose:** follow-up to the 2026-09-16 snapshot. Its −19.7% drop in user-triggered fetches overlapped 20 days of stale "Alpha 4.10 is not out yet" FAQ JSON-LD, so it was left unattributed.

## Verdict: not staleness. An engine-side shift, so no site action

The staleness was fixed on 2026-09-16, and the **whole current window is post-fix**. User-triggered fetches still fell further:

| | Current 14d | Prior 14d | Change |
|---|---|---|---|
| **User-triggered total** | **2,241** | 3,405 | **−34%** |
| chatgpt-user | 1,278 | 2,077 | −38% |
| meta-ai | 224 | 608 | −63% |
| claude-user | 441 | 418 | +6% |
| duckassistbot | 248 | 173 | +43% |

Crawler / indexing fetches **rose** over the same days:

| Crawler | Current | Prior | Change |
|---|---|---|---|
| oai-searchbot | 2,087 | 1,567 | +33% |
| claudebot | 1,135 | 761 | +49% |
| bytespider | 2,239 | 1,763 | +27% |

The pattern is OpenAI crawling more and live-fetching less. ChatGPT appears to be answering more from its own search index instead of fetching pages per question. That is consistent with an engine change, not with our content going stale. Claude and DuckAssist live fetches grew, which also points away from a site problem.

## Per site (user-triggered)

| Site | Current | Prior | Change |
|---|---|---|---|
| starcitizenhelp.com | 896 | 1,564 | −43% |
| dayonecitizen.com | 476 | 746 | −36% |
| iheldtheline.com | 367 | 468 | −22% |
| bestspacesim.com | 278 | 316 | −12% |
| freeflyevent.com | 99 | 135 | −27% |
| highestfundedgame.com | 99 | 121 | −18% |

- **Top fetched pages:** each site's homepage, almost all from chatgpt-user.
- **SCH `/updates`:** down to 86 (it was #2 at 266 in the 9/16 window). It was the page carrying the stale 4.10 copy. Fetches of it fell *after* the fix, which fits the engine shift and does not support "staleness suppressed fetches".
- **SCH `/game-guides/keybinds`:** 51, the most mixed-engine page (Claude 18, ChatGPT 20).

## What to do

- **Nothing on-site.** Don't chase user-triggered fetch volume as a KPI while OpenAI moves to index-served answers. Watch **oai-searchbot crawl coverage** instead; it's the input to being cited.
- Keep `llms.txt` and the self-referencing canonicals healthy. The crawlers are the audience now.
- **Next look:** the 2026-10-16 snapshot. If chatgpt-user keeps falling while oai-searchbot holds, treat it as the new baseline.
