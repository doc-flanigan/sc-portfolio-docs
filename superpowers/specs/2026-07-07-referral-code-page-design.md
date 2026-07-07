# dayonecitizen.com/referral-code — Design Spec

**Date:** 2026-07-07
**Status:** Approved by Doc (remote session)
**Goal:** Make dayonecitizen.com **THE** authority — for both Google and AI
answer engines — on the query "star citizen referral code." Own the
transactional query on the hub rather than leaking it through SCH or the
passive screferral microsites. Convert intent: land → get the code → enlist.

## Strategic context

DOC currently has **no** page targeting "star citizen referral code" (only
`/beyond-the-basics/redeem-codes`, which is in-game promo codes — a different
thing). Copilot already surfaces Doc's code `STAR-GCQJ-N6NC` for this query
but attributes it to starcitizenhelp.com, where the code is only an embedded
link. This page fixes that: a purpose-built, GEO-armed page on the authority
hub. Aligns with the network consolidation thesis (SCH→DOC 301 migration) —
we build authority INTO DOC, not out to microsites. The screferral microsites
stay passive; no authority investment in them. See
[[project-dayonecitizen-seo-push]] and `docs/seo/migration-plan.md`.

## Route & rendering

- New route: `src/app/referral-code/page.tsx` (server component).
- Query-matched slug `/referral-code` — the domain already carries the "star
  citizen" context, so the short slug is cleaner than
  `/star-citizen-referral-code`.
- One small `'use client'` child, `CopyCode.tsx`, for the copy-to-clipboard
  code chip (the only interactive piece).
- `export const revalidate` consistent with sibling day-one pages.

## Metadata (the ranking surface)

- **Title:** `Star Citizen Referral Code 2026 — STAR-GCQJ-N6NC for 50,000 UEC Free`
- **Description:** `Use Star Citizen referral code STAR-GCQJ-N6NC when you create your RSI account to get a free 50,000 UEC bonus. Here's the code and exactly where to enter it.`
- Canonical `/referral-code`; OpenGraph + Twitter card (reuse brand OG image
  or a code-specific one if quick); `alternates.canonical` set.

## Structured data (GEO / rich results)

- **FAQPage** JSON-LD mirroring the visible FAQ.
- **BreadcrumbList** via existing `BreadcrumbsJsonLd` (Home › Referral Code).
- **PageSources** (`WebPage` + `citation`) via the existing ledger-driven
  component — cites robertsspaceindustries.com/referral-program.

## Page structure (top to bottom)

### 1. Above the fold — the extractable answer (what AI quotes, what converts)
- **H1:** `Star Citizen Referral Code`
- Bold lead sentence (the quotable answer):
  **The Star Citizen referral code is `STAR-GCQJ-N6NC`.** Enter it when you
  create your free RSI account to get a 50,000 UEC bonus.
- **`<CopyCode code="STAR-GCQJ-N6NC" />`** — displays the code, "Copy" button,
  "Copied ✓" state. Fires the same `/api/log` click-tracking POST as CTAs
  (trackingLabel `referral-code-copy`).
- Primary `CTAButton` → enlist URL with code pre-filled, `trackingLabel="referral-code-hero"`.
- One-line FTC affiliate disclosure inline near the CTA.

### 2. How to apply the code (screenshot-led — the differentiator)
- Centerpiece: the **annotated RSI signup screenshot** showing the Referral
  Code field highlighted with the "successfully applied" state and Doc's code.
  - **Source:** `StarCitizenHelp-live/public/images/guides/getting-started-rsi-account-referral-code.jpg`
  - **Destination:** copy to `dayonecitizen-main/public/images/referral/rsi-signup-referral-code-field.jpg`, rendered with `next/image`.
  - **Alt text:** `Star Citizen RSI signup form with the Referral Code field highlighted, showing code STAR-GCQJ-N6NC successfully applied.`
- Numbered steps beside/under the shot:
  1. Go to the RSI enlist page (link with code pre-filled).
  2. Fill in account name, email, password.
  3. **Paste `STAR-GCQJ-N6NC` in the Referral Code field** (the highlighted box).
  4. Confirm "Referral code successfully applied!" appears.
- **Verified 24-hour-window caveat** (claim `referral-code-24h-window`): the
  code must be applied at signup or within ~24 hours in account settings — it
  cannot be added later. Wrap in `<SourceLink>`.

### 3. What you get
- 50,000 UEC enlistment bonus (claim `referral-enlistment-bonus-50k-uec`).
- **No purchase required to claim it** (claim `referral-bonus-no-purchase-required`)
  — the bonus attaches to the free account and stays permanently.
- **FACT-CHECK GATE (build step, do before publish):** the source screenshot's
  marketing panel reads "earn 50,000 UEC *after buying a game package*," which
  appears to conflict with the no-purchase claim. Re-verify the precise mechanic
  against robertsspaceindustries.com/en/referral-program via web fetch (RSI
  pages are JS shells — use web search/fetch, absence ≠ refutation per
  [[feedback-fact-check-absence]]). Write copy to the reconciled truth; if the
  nuance is "applied free, spendable once you have game access," state that
  plainly. Update the claim file if the wording needs tightening.

### 4. Is it legit? (trust)
- Brief: it's RSI's own official referral program; the referrer (Doc_Flanigan)
  gets a small reward too — stated honestly.

### 5. FAQ (mirrors FAQPage schema)
- What is the Star Citizen referral code? → `STAR-GCQJ-N6NC`.
- Is it free? → Yes; no purchase required to hold the bonus.
- When do I enter it? → At signup, or within ~24 hours.
- Can I add it after I make my account? → Only within the ~24h window.
- How much is the bonus? → 50,000 UEC.

### 6. Bottom CTA
- `CTAButton` → enlist URL, `trackingLabel="referral-code-bottom"`.

## Plain-English standard (non-negotiable, per repo CLAUDE.md)
- Wrap glossary terms (`UEC`, `RSI`, `Backer`, etc.) in `<Term>` on first mention.
- Spell out non-glossary terms inline on first mention.
- Sentences under 25 words; no gaming verbs; numbers under 100 spelled out
  (except the code, version numbers, "50,000 UEC", dates).
- Every factual claim wrapped in `<SourceLink>` to the official source.

## Discovery & internal linking (Doc's placement decision)
- **Footer link** added to `src/components/Footer.tsx` (sitewide) — label e.g.
  "Referral Code". NOT added to the top nav.
- **`/llms.txt`** entry with a descriptive line (the GEO/AI entry point).
- **Sitemap** entry (auto if route-based; verify in `sitemap.ts`).
- **Two contextual in-body links** from existing pages (topical, not nav):
  - `/day-one-citizen/worth-buying` — where it mentions the bonus.
  - Homepage referral sentence (`src/app/page.tsx`).
  - (Optional third: `/beyond-the-basics/redeem-codes` — disambiguate "codes.")

## Claims ledger wiring
- Add `dayonecitizen.com /referral-code — ...` usage lines to the three claim
  files: `referral-enlistment-bonus-50k-uec.md`, `referral-code-24h-window.md`,
  `referral-bonus-no-purchase-required.md`.
- Regenerate the manifest:
  `node docs/claims/gen-sources.mjs dayonecitizen.com dayonecitizen-main/src/data/page-sources.generated.json`.
- Confirm `/referral-code` appears in the manifest before wiring `<PageSources>`.

## Tracking
- Reuse `CTAButton` tracking (`/api/log` → Sheet + Discord). New labels:
  `referral-code-hero`, `referral-code-copy`, `referral-code-bottom`.

## Out of scope
- Any change to the screferral microsites (stay passive).
- A/B copy testing (can add later via `CTAButton` `variants`).
- Top-nav link (explicitly excluded).
- New photography/screenshots beyond reusing the existing SCH shot.

## Success criteria
- Searching "star citizen referral code" resolves to this page over time;
  an AI answer engine asked the same question cites dayonecitizen.com.
- The code is copyable in one tap; the annotated screenshot shows exactly
  where to paste it.
- Clicks/copies flow through existing tracking.
- `npm run build` passes; page is mobile-responsive; all claims sourced.
