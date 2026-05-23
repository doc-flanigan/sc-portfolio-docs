# Shared Conventions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a single `SHARED_CONVENTIONS.md` at the portfolio root and update all 9 site CLAUDE.md files to reference it, eliminating duplicated network-wide facts and rules.

**Architecture:** Option B — shared file is the source of truth; each site CLAUDE.md keeps a 3-line Quick Reference block inline and replaces all other duplicated sections with a one-line pointer. No scripts or automation required.

**Tech Stack:** Markdown only. No code changes to any site.

---

## Quick Reference Block (identical for every site)

This block goes near the top of every site CLAUDE.md, immediately after the `## Project Overview` section:

```markdown
## Quick Reference
Referral code: STAR-GCQJ-N6NC
Enlist URL: https://www.robertsspaceindustries.com/enlist?referral=STAR-GCQJ-N6NC
Hub: https://dayonecitizen.com
Full network conventions: E:\Claude Code\sc-portfolio\SHARED_CONVENTIONS.md
```

## Network Conventions Pointer (identical for every site)

This replaces all duplicated footer spec, commit convention, tech stack, and tone rule sections:

```markdown
## Network Conventions
See `E:\Claude Code\sc-portfolio\SHARED_CONVENTIONS.md` for footer spec,
tone rules, commit convention, tech stack, and agentic build pattern.
```

---

## Task 1: Create SHARED_CONVENTIONS.md

**Files:**
- Create: `E:\Claude Code\sc-portfolio\SHARED_CONVENTIONS.md`

- [ ] **Step 1: Create the file with this exact content**

```markdown
# SC Portfolio — Shared Conventions

> Single source of truth for network-wide facts and working rules.
> All site CLAUDE.md files reference this document.
> To update: edit this file. Changes take effect immediately in all sessions.

---

## Part 1 — Network Facts

### Quick Reference
```
Referral code:  STAR-GCQJ-N6NC
Enlist URL:     https://www.robertsspaceindustries.com/enlist?referral=STAR-GCQJ-N6NC
Hub:            https://dayonecitizen.com
Bonus:          50,000 UEC
```

### Referral Details
- **Code:** STAR-GCQJ-N6NC
- **Enlist URL:** https://www.robertsspaceindustries.com/enlist?referral=STAR-GCQJ-N6NC
- **Bonus:** 50,000 UEC, automatic at signup with the code. No purchase required.

### Hub URL
- **Canonical:** https://dayonecitizen.com
- **Legacy redirect:** https://o7citizen.com (308-redirects to dayonecitizen.com on a 1:1 path basis)

Use `dayonecitizen.com` in all new copy. The legacy redirect is there for existing links; do not create new references to o7citizen.com.

### Footer Spec

Use these three items verbatim on every site:

**1. Fan disclaimer:**
> This is an unofficial fan site not affiliated with Cloud Imperium Games or
> Star Citizen®. Star Citizen® is a registered trademark of Cloud Imperium
> Rights LLC.

**2. FTC disclosure:**
> Affiliate Disclosure: If you create a Star Citizen account using referral
> code STAR-GCQJ-N6NC, the site owner (Doc_Flanigan) will receive an in-game
> bonus reward. You still receive your full 50,000 UEC bonus.

**3. RSI fankit badge:**
Include the RSI "Made by the Community" badge image from
`/public/images/made-by-community.png` with alt text
`"Made by the Star Citizen Community"`.

### Tech Stack
- **Framework:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Animation:** framer-motion (on sites that use motion effects)
- **Hosting:** Vercel — auto-deploy on push to `main`
- **Build rule:** `npm run build` must pass before every commit. Fix all TypeScript and build errors before committing.

---

## Part 2 — Working Rules

### Tone Rules

Write for someone who has never played Star Citizen. Apply to all user-facing copy on all pages.

1. **Spell out every term on first mention.** Example: "UEC (in-game currency)", "ASOP terminal (the in-game ship spawning kiosk)". On sites using the `<Term>` component, wrap glossary-backed terms instead of spelling out inline.
2. **For terms not in the glossary, define inline in the same sentence.** Example: "Comm-Link, the official RSI blog" or "Bar Citizen — the community's name for an in-person meet-up."
3. **Ship and place names get a one-line context on first mention.** Example: "Drake Caterpillar (a large cargo ship)", "Nyx (a recently opened star system)".
4. **Avoid gaming verbs.** Use "released" not "shipped" or "went live." Use "update" not "patch" or "hotfix." Use "reward" not "drop." Use "players" not "users." Never: meta, nerf, buff, grind, carry, kit.
5. **Numbers under 100 in words.** Write *ten*, *twenty-five*, *one hundred*. Keep version numbers (Alpha 4.7.2) and dates (April 30, 2026) as digits.
6. **Sentences under twenty-five words.** If a sentence runs longer, split it.
7. **Every factual claim cites a source.** Link to the originating RSI blog post or official forum post. Use plain labels like "Official RSI blog post" — not "Comm-Link" or "Spectrum reply."

### Commit Convention

```
feat:  description
fix:   description
seo:   description
docs:  description
chore: description
```

One-line subject. Add a body explaining the *why* when the reason isn't obvious from the subject. When correcting facts, quote verbatim from the authoritative source in the commit body.

### Agentic Build Pattern

Build incrementally. Complete and confirm each agent before proceeding to the next. Never attempt to build a full site in one pass. If an agent fails, report exactly what failed and why before continuing.
```

- [ ] **Step 2: Verify the file exists and is non-empty**

Open `E:\Claude Code\sc-portfolio\SHARED_CONVENTIONS.md` and confirm it has both Part 1 and Part 2 sections.

---

## Task 2: Update o7meaning-site/CLAUDE.md

**Files:**
- Modify: `E:\Claude Code\sc-portfolio\o7meaning-site\CLAUDE.md`

Current file has these sections to replace:
- `## Referral URL` (line 73)
- `## Hub Link` (line 75)
- `## Footer Spec (same as all sites)` (lines 87–93)
- `## Commit Convention` (line 94)

- [ ] **Step 1: Add Quick Reference block after `## Project Overview` section**

After the paragraph ending `...referral signup.`, insert:

```markdown

## Quick Reference
Referral code: STAR-GCQJ-N6NC
Enlist URL: https://www.robertsspaceindustries.com/enlist?referral=STAR-GCQJ-N6NC
Hub: https://dayonecitizen.com
Full network conventions: E:\Claude Code\sc-portfolio\SHARED_CONVENTIONS.md
```

- [ ] **Step 2: Replace the four duplicated sections at the bottom**

Remove these four sections entirely:
```
## Referral URL
https://www.robertsspaceindustries.com/enlist?referral=STAR-GCQJ-N6NC

## Hub Link
https://o7citizen.com

## Color Palette
  --slate: #1a1f2e
  ...

## Footer Spec (same as all sites)
1. "This is an unofficial fan site not affiliated with CIG or Star Citizen."
2. "FTC Disclosure: Referral links on this site earn the site owner an in-game
   bonus reward when you sign up."
3. RSI Fankit "made by community" badge

## Commit Convention
feat/fix/seo/docs: [description]
```

Replace with:

```markdown
## Color Palette
  --slate: #1a1f2e
  --slate-mid: #252d40
  --cyan: #00d4ff
  --cyan-dark: #0099bb
  --white: #f0f4f8
  --muted: #7a8599

## Network Conventions
See `E:\Claude Code\sc-portfolio\SHARED_CONVENTIONS.md` for footer spec,
tone rules, commit convention, tech stack, and agentic build pattern.
```

Note: Color Palette stays — it is site-specific. Only the referral, hub, footer, and commit sections are replaced.

- [ ] **Step 3: Verify**

Confirm the file contains `## Quick Reference` near the top and `## Network Conventions` near the bottom, and no longer contains `## Referral URL`, `## Hub Link`, or `## Commit Convention` as standalone sections.

- [ ] **Step 4: Commit**

```bash
cd "E:\Claude Code\sc-portfolio\o7meaning-site"
git add CLAUDE.md
git commit -m "docs: add shared conventions reference, update hub to dayonecitizen.com"
```

---

## Task 3: Update bestspacesim-site/CLAUDE.md

**Files:**
- Modify: `E:\Claude Code\sc-portfolio\bestspacesim-site\CLAUDE.md`

Current duplicated sections to replace:
- `## Referral URL` (line 69)
- `## Hub Link:` (line 72)
- `## Footer Spec: Standard three-section footer` (line 82)
- `## Commit Convention:` (line 84)

- [ ] **Step 1: Add Quick Reference block after `## Project Overview` section**

After the paragraph ending `...referral signup.`, insert:

```markdown

## Quick Reference
Referral code: STAR-GCQJ-N6NC
Enlist URL: https://www.robertsspaceindustries.com/enlist?referral=STAR-GCQJ-N6NC
Hub: https://dayonecitizen.com
Full network conventions: E:\Claude Code\sc-portfolio\SHARED_CONVENTIONS.md
```

- [ ] **Step 2: Replace duplicated sections at the bottom**

Remove:
```
## Referral URL
https://www.robertsspaceindustries.com/enlist?referral=STAR-GCQJ-N6NC

## Hub Link: https://o7citizen.com

## Footer Spec: Standard three-section footer

## Commit Convention: feat/fix/seo/docs: [description]
```

Replace with:

```markdown
## Network Conventions
See `E:\Claude Code\sc-portfolio\SHARED_CONVENTIONS.md` for footer spec,
tone rules, commit convention, tech stack, and agentic build pattern.
```

Keep `## Color Palette` section intact — it is site-specific.

- [ ] **Step 3: Verify**

Confirm `## Quick Reference` is present near the top and `## Network Conventions` at the bottom. Confirm `## Referral URL`, `## Hub Link`, `## Footer Spec`, and `## Commit Convention` are gone.

- [ ] **Step 4: Commit**

```bash
cd "E:\Claude Code\sc-portfolio\bestspacesim-site"
git add CLAUDE.md
git commit -m "docs: add shared conventions reference, update hub to dayonecitizen.com"
```

---

## Task 4: Update freeflyevent-site/CLAUDE.md + add data verification rule

**Files:**
- Modify: `E:\Claude Code\sc-portfolio\freeflyevent-site\CLAUDE.md`

Current duplicated sections to replace:
- `## Referral URL:` (line 77)
- `## Hub Link:` (line 78)
- `## Footer: Standard three-section` (line 80)
- `## Commit Convention:` (line 82)

- [ ] **Step 1: Add Quick Reference block after `## Project Overview` section**

After the paragraph ending `...referral signup.`, insert:

```markdown

## Quick Reference
Referral code: STAR-GCQJ-N6NC
Enlist URL: https://www.robertsspaceindustries.com/enlist?referral=STAR-GCQJ-N6NC
Hub: https://dayonecitizen.com
Full network conventions: E:\Claude Code\sc-portfolio\SHARED_CONVENTIONS.md
```

- [ ] **Step 2: Replace duplicated sections**

Remove:
```
## Referral URL: https://www.robertsspaceindustries.com/enlist?referral=STAR-GCQJ-N6NC
## Hub Link: https://o7citizen.com
## Color Palette: spaceBlack #080c14, orange #ff5500
## Footer: Standard three-section
## Urgency Note: During active Free Fly events...
## Commit Convention: feat/fix/seo/docs: [description]
```

Replace with:

```markdown
## Color Palette
  --space-black: #080c14
  --black-mid: #0f1520
  --orange: #ff5500
  --orange-dark: #cc4400
  --white: #f5f8ff
  --muted: #6b7890

## Urgency Note
During active Free Fly events this site is the #1 conversion opportunity in
the portfolio. EventStatusBanner must be unmissable above the fold.

## Network Conventions
See `E:\Claude Code\sc-portfolio\SHARED_CONVENTIONS.md` for footer spec,
tone rules, commit convention, tech stack, and agentic build pattern.
```

- [ ] **Step 3: Add the data verification rule**

After the `## Maintenance` section and before the end of the file, add:

```markdown
## Data Verification Rule (READ THIS BEFORE EDITING src/data/events.ts)

Every entry in `FREE_FLY_HISTORY` must be verifiable against an official RSI
Comm-Link. Do not use third-party event trackers as the source of truth.

Authoritative sources for event data:
1. **Star Citizen Wiki API** — `https://api.star-citizen.wiki/api/comm-links`
   Search by event name. The field `translations.en_EN` contains the full
   Comm-Link body. This is the easiest way in — RSI Comm-Link pages are
   JS-rendered and block most scrapers.
2. **Official RSI** — `robertsspaceindustries.com` Free Fly event pages directly.

When adding a new event entry:
- Set the `source` field to the Comm-Link URL you verified against.
- Verify both the event dates AND the included ships before saving.
- If a Comm-Link describes only one side of the referral reward, look for the
  event-overview Comm-Link — it usually documents both sides. Use that one.

The banner state, countdown, homepage hero card, and Event JSON-LD schema all
derive from `FREE_FLY_HISTORY` via `getEventStatus()` — no other files need
editing when an event is added.
```

- [ ] **Step 4: Verify**

Confirm the file has `## Quick Reference`, `## Network Conventions`, and `## Data Verification Rule (READ THIS BEFORE EDITING src/data/events.ts)`.

- [ ] **Step 5: Commit**

```bash
cd "E:\Claude Code\sc-portfolio\freeflyevent-site"
git add CLAUDE.md
git commit -m "docs: add shared conventions reference and data verification rule"
```

---

## Task 5: Update pledgemeaning-site/CLAUDE.md

**Files:**
- Modify: `E:\Claude Code\sc-portfolio\pledgemeaning-site\CLAUDE.md`

Current duplicated sections to replace:
- `## Referral URL:` (line 59)
- `## Hub Link:` (line 60)
- `## Footer: Standard three-section` (line 62)
- `## Commit Convention:` (line 63)

- [ ] **Step 1: Add Quick Reference block after `## Project Overview` section**

After the paragraph ending `...referral.`, insert:

```markdown

## Quick Reference
Referral code: STAR-GCQJ-N6NC
Enlist URL: https://www.robertsspaceindustries.com/enlist?referral=STAR-GCQJ-N6NC
Hub: https://dayonecitizen.com
Full network conventions: E:\Claude Code\sc-portfolio\SHARED_CONVENTIONS.md
```

- [ ] **Step 2: Replace duplicated sections at the bottom**

Remove:
```
## Referral URL: https://www.robertsspaceindustries.com/enlist?referral=STAR-GCQJ-N6NC
## Hub Link: https://o7citizen.com
## Color Palette: midnight #0f1420, amber #ff9c00, cream #f5f0e8
## Footer: Standard three-section
## Commit Convention: feat/fix/seo/docs: [description]
```

Replace with:

```markdown
## Color Palette
  --midnight: #0f1420
  --midnight-mid: #171e2e
  --amber: #ff9c00
  --amber-dark: #cc7d00
  --cream: #f5f0e8
  --muted: #7a8099

## Network Conventions
See `E:\Claude Code\sc-portfolio\SHARED_CONVENTIONS.md` for footer spec,
tone rules, commit convention, tech stack, and agentic build pattern.
```

- [ ] **Step 3: Verify and commit**

```bash
cd "E:\Claude Code\sc-portfolio\pledgemeaning-site"
git add CLAUDE.md
git commit -m "docs: add shared conventions reference, update hub to dayonecitizen.com"
```

---

## Task 6: Update fundedgame-site/CLAUDE.md

**Files:**
- Modify: `E:\Claude Code\sc-portfolio\fundedgame-site\CLAUDE.md`

Current duplicated sections to replace:
- `## Referral URL:` (line 62)
- `## Hub Link:` (line 63)
- `## Footer: Standard three-section` (line 65)
- `## Commit Convention:` (line 66)

- [ ] **Step 1: Add Quick Reference block after `## Project Overview` section**

After the paragraph ending `...o7citizen.com.`, insert:

```markdown

## Quick Reference
Referral code: STAR-GCQJ-N6NC
Enlist URL: https://www.robertsspaceindustries.com/enlist?referral=STAR-GCQJ-N6NC
Hub: https://dayonecitizen.com
Full network conventions: E:\Claude Code\sc-portfolio\SHARED_CONVENTIONS.md
```

- [ ] **Step 2: Replace duplicated sections**

Remove:
```
## Referral URL: https://www.robertsspaceindustries.com/enlist?referral=STAR-GCQJ-N6NC
## Hub Link: https://o7citizen.com
## Color Palette: crimson #1a0a0a, silver #c0c8d0, red #cc2200
## Footer: Standard three-section
## Commit Convention: feat/fix/seo/docs: [description]
```

Replace with:

```markdown
## Color Palette
  --crimson: #1a0a0a
  --crimson-mid: #261010
  --silver: #c0c8d0
  --silver-bright: #e8eef4
  --red: #cc2200
  --muted: #7a8088

## Network Conventions
See `E:\Claude Code\sc-portfolio\SHARED_CONVENTIONS.md` for footer spec,
tone rules, commit convention, tech stack, and agentic build pattern.
```

- [ ] **Step 3: Verify and commit**

```bash
cd "E:\Claude Code\sc-portfolio\fundedgame-site"
git add CLAUDE.md
git commit -m "docs: add shared conventions reference, update hub to dayonecitizen.com"
```

---

## Task 7: Update o7citizens-redirect/CLAUDE.md

**Files:**
- Modify: `E:\Claude Code\sc-portfolio\o7citizens-redirect\CLAUDE.md`

This is a minimal redirect-only project. The only section to update is the commit convention.

- [ ] **Step 1: Add Quick Reference block after `## Project Overview` section**

After the paragraph ending `...o7citizen.com.`, insert:

```markdown

## Quick Reference
Referral code: STAR-GCQJ-N6NC
Enlist URL: https://www.robertsspaceindustries.com/enlist?referral=STAR-GCQJ-N6NC
Hub: https://dayonecitizen.com
Full network conventions: E:\Claude Code\sc-portfolio\SHARED_CONVENTIONS.md
```

- [ ] **Step 2: Replace commit convention line**

Remove:
```
## Commit Convention: feat/fix: [description]
```

Replace with:
```markdown
## Network Conventions
See `E:\Claude Code\sc-portfolio\SHARED_CONVENTIONS.md` for commit convention
and tech stack.
```

- [ ] **Step 3: Verify and commit**

```bash
cd "E:\Claude Code\sc-portfolio\o7citizens-redirect"
git add CLAUDE.md
git commit -m "docs: add shared conventions reference"
```

---

## Task 8: Update screferralreward-site/CLAUDE.md

**Files:**
- Modify: `E:\Claude Code\sc-portfolio\screferralreward-site\CLAUDE.md`

This file is the most complete and already has a strong verification rule. Changes are additive — add Quick Reference, replace the duplicate sections, keep the verification rule and site-specific hosting details.

Sections to replace:
- `## Referral details` block (lines 92–99) — move to Quick Reference
- `## Tech stack` (line 120) — replace with pointer
- `## Commit convention` (line 136) — replace with pointer
- The footer spec block (lines 111–118)

- [ ] **Step 1: Add Quick Reference block after `## What this site is` section**

After the `## Domain` section, insert:

```markdown
## Quick Reference
Referral code: STAR-GCQJ-N6NC
Enlist URL: https://www.robertsspaceindustries.com/enlist?referral=STAR-GCQJ-N6NC
Hub: https://dayonecitizen.com
Full network conventions: E:\Claude Code\sc-portfolio\SHARED_CONVENTIONS.md
```

- [ ] **Step 2: Replace footer spec, tech stack, and commit convention**

Remove `## Footer spec` section (the 3-item list), `## Tech stack` section, and `## Commit convention` section.

Replace all three with:

```markdown
## Network Conventions
See `E:\Claude Code\sc-portfolio\SHARED_CONVENTIONS.md` for footer spec,
tone rules, commit convention, and tech stack.
```

Keep intact:
- `## Verification rule (READ THIS BEFORE EDITING DATA)` — site-specific, stays
- `## Tone rules` — site-specific phrasing for this site's recruit-perspective rule, stays
- `## Referral details` — can be removed since Quick Reference covers it, OR kept as a more detailed supplement. Keep it for now since it includes context about the code behavior.
- `## Color palette`, `## Pages`, `## Data layer`, `## Hosting`, `## Things explicitly out of scope` — all stay

- [ ] **Step 3: Update hub URL in Referral details**

Find: `**Hub:** https://o7citizen.com`
Replace with: `**Hub:** https://dayonecitizen.com`

- [ ] **Step 4: Verify and commit**

```bash
cd "E:\Claude Code\sc-portfolio\screferralreward-site"
git add CLAUDE.md
git commit -m "docs: add shared conventions reference, update hub to dayonecitizen.com"
```

---

## Task 9: Update screferralbonus-site/CLAUDE.md

**Files:**
- Modify: `E:\Claude Code\sc-portfolio\screferralbonus-site\CLAUDE.md`

Sections to replace:
- `## Referral URL` (line 173)
- `## Hub Link` (line 176)
- `## Footer Spec (mandatory)` (lines 192–207)
- `## Commit Message Convention` (lines 208–214)

Keep intact: `## PR/Merge Description Template` — site-specific workflow, stays.

- [ ] **Step 1: Add Quick Reference block after `## Project Overview` section**

After the paragraph ending `...new player guidance.`, insert:

```markdown

## Quick Reference
Referral code: STAR-GCQJ-N6NC
Enlist URL: https://www.robertsspaceindustries.com/enlist?referral=STAR-GCQJ-N6NC
Hub: https://dayonecitizen.com
Full network conventions: E:\Claude Code\sc-portfolio\SHARED_CONVENTIONS.md
```

- [ ] **Step 2: Replace duplicated bottom sections**

Remove:
```
## Referral URL
https://www.robertsspaceindustries.com/enlist?referral=STAR-GCQJ-N6NC

## Hub Link
https://o7citizen.com
```

Remove `## Footer Spec (mandatory)` and `## Commit Message Convention` sections.

Replace all removed sections with:

```markdown
## Network Conventions
See `E:\Claude Code\sc-portfolio\SHARED_CONVENTIONS.md` for footer spec,
tone rules, commit convention, tech stack, and agentic build pattern.
```

Keep `## Color Palette`, `## Sister Site`, and `## PR/Merge Description Template` intact.

- [ ] **Step 3: Verify and commit**

```bash
cd "E:\Claude Code\sc-portfolio\screferralbonus-site"
git add CLAUDE.md
git commit -m "docs: add shared conventions reference, update hub to dayonecitizen.com"
```

---

## Task 10: Update dayonecitizen-main/CLAUDE.md

**Files:**
- Modify: `E:\Claude Code\sc-portfolio\dayonecitizen-main\CLAUDE.md`

This file is the source of the tone rules now living in SHARED_CONVENTIONS.md. The site-specific extensions (`<Term>` component, `<SourceLink>`, pre-commit checklist) stay here. Only the commit convention and footer spec (if present) get replaced with a pointer.

- [ ] **Step 1: Add Quick Reference block after `## Project Overview` section**

After the `> **Brand history:**` blockquote, insert:

```markdown

## Quick Reference
Referral code: STAR-GCQJ-N6NC
Enlist URL: https://www.robertsspaceindustries.com/enlist?referral=STAR-GCQJ-N6NC
Hub: https://dayonecitizen.com
Full network conventions: E:\Claude Code\sc-portfolio\SHARED_CONVENTIONS.md
```

- [ ] **Step 2: Add a note at the top of the Plain-English Standard section**

After the `## Plain-English Standard (NON-NEGOTIABLE)` heading, insert one line:

```markdown
> Base tone rules are in SHARED_CONVENTIONS.md § Tone Rules. The rules below extend and supersede them for this site.
```

- [ ] **Step 3: Search for any standalone Commit Convention or Footer Spec sections**

Run a search for `## Commit` and `## Footer` in the file. If either exists as a standalone section, replace it with:

```markdown
## Network Conventions
See `E:\Claude Code\sc-portfolio\SHARED_CONVENTIONS.md` for footer spec,
commit convention, tech stack, and agentic build pattern.
```

If neither exists (the file may already be structured differently), skip this step.

- [ ] **Step 4: Verify**

Confirm `## Quick Reference` is present, the Plain-English Standard note is in place, and no o7citizen.com references remain in the Quick Reference or hub-facing copy.

- [ ] **Step 5: Commit**

```bash
cd "E:\Claude Code\sc-portfolio\dayonecitizen-main"
git add CLAUDE.md
git commit -m "docs: add shared conventions reference, note shared tone rules"
```

---

## Spec Coverage Check

| Spec requirement | Covered by |
|---|---|
| SHARED_CONVENTIONS.md at portfolio root | Task 1 |
| Quick Reference block in every CLAUDE.md | Tasks 2–10 |
| Footer spec verbatim text | Task 1 Part 1 |
| Hub URL updated to dayonecitizen.com | Tasks 2–10 Step 1/3 |
| Commit convention in shared file | Task 1 Part 2 |
| Tone rules (7) in shared file | Task 1 Part 2 |
| Agentic build pattern in shared file | Task 1 Part 2 |
| 24h grace period removed | Not added to SHARED_CONVENTIONS.md ✅ |
| Authoritative sources excluded | Not in shared file ✅ |
| Data verification rule added to freeflyevent-site | Task 4 Step 3 |
| Color palettes kept site-specific | Tasks 2–9 preserve Color Palette sections |
| screferralreward-site verification rule preserved | Task 8 explicitly keeps it |
