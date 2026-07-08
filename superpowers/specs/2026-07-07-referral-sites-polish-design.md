# Referral Microsites Polish Pass — Design Spec

**Date:** 2026-07-07
**Status:** Approved by Doc (remote session; execute inline, no subagents)
**Sites:** screferralreward.com (`screferralreward-site`) + screferralbonus.com (`screferralbonus-site`)
**Goal:** One-time "passive shopfront polish": both sites look flagship-grade
(dayonecitizen/iheldtheline bar) and then need zero maintenance. They stay
standing as passive exact-match funnels — no shutdown, no ongoing content
machinery, no authority-building campaign.

## Observed state (2026-07-07 browser survey)

- **screferralreward** (3 pages: /, /get-the-code, /event-tracker; 462 lines):
  content-solid (how-it-works steps, event tracker with graceful "no active
  event" default, existing editorial links to dayonecitizen + freeflyevent),
  but the homepage hero carousel renders as an EMPTY dark box with pagination
  dots — reads as broken. /get-the-code and /event-tracker have no FAQPage and
  no PageSources.
- **screferralbonus** (4 pages: /, /how-to-use, /about-the-bonus, /faq; 1,141
  lines): strong industrial visual identity (condensed caps, corner-bracket
  code box, numbered sections) but hero imagery over-darkened to a near-black
  void. FAQPage only on / and /faq; PageSources only on /. llms.txt does NOT
  contain the referral code.

## Design

### 1. Static cinematic heroes (replace carousels)
Carousels are wrong for set-and-forget one-decision pages: client JS, can
fail (and visibly has), nobody watches 18 slides. Replace `HeroCarousel`
usage on BOTH sites with a static hero band:
- One epic image per page from the existing 18-image `public/images/hero/`
  set, `next/image` with `priority`, distinct image per page and per site.
- Gradient overlay tuned so the artwork actually reads (fix the black-void
  problem) while text stays legible.
- Implemented as a small server component per site (`StaticHero.tsx`),
  matching each site's existing visual language. No client JS.
- `HeroCarousel.tsx` stays in the repo (unused) — reversible.

### 2. GEO-complete every page (7 pages total)
- FAQPage JSON-LD mirroring a visible Q&A block on every page that lacks it
  (reward: /get-the-code, /event-tracker; bonus: /how-to-use,
  /about-the-bonus). Q&A content drawn from ledger-verified facts only.
- PageSources (ledger-driven) on every page: add
  `screferralreward.com /route` / `screferralbonus.com /route` usage lines to
  the relevant claim files (referral-enlistment-bonus-50k-uec,
  referral-bonus-no-purchase-required, referral-code-24h-window,
  referral-recruitment-point-40-usd; event-tracker also freefly-event-based-
  not-always-on / freefly-typical-duration where used), regenerate each
  site's page-sources manifest with gen-sources.mjs.
- Fix screferralbonus llms.txt: add the code STAR-GCQJ-N6NC and confirm all
  pages listed. Verify screferralreward llms.txt likewise (it already
  contains the code).

### 3. Annotated signup screenshot (reuse)
Copy `getting-started-rsi-account-referral-code.jpg` (already reused on DOC
/referral-code) into both sites and render it on screferralbonus /how-to-use
and screferralreward /get-the-code with the proven alt text — visual proof of
exactly where the code goes.

### 4. One quiet editorial link per site → dayonecitizen.com/referral-code
Body-copy link ("full walkthrough with screenshots") on /get-the-code and
/how-to-use. Passes EMD equity to the DOC authority page; consistent with the
network consolidation thesis. No nav/footer changes for this.

### 5. Evergreen sweep
- Audit dated copy; confirm the event tracker's no-active-event default and
  any countdown logic can never show stale/negative states.
- "2026" in titles/H1s stays (it IS the query) and becomes the documented
  single annual touch — note this in both repos' CLAUDE.mds.
- Verify FTC affiliate disclosure + fan-site disclaimer in both footers.
- Title-suffix dedupe check (the `| domain | domain` bug pattern).

## Out of scope
New pages, nav changes, any recurring content automation, shutting anything
down, authority-building campaigns for these domains.

## Success criteria
- Above-the-fold on all 7 pages looks deliberate and cinematic — no empty
  boxes, no black voids.
- Every page has FAQPage + PageSources with ledger-verified facts.
- Both llms.txt files carry the code and full page lists.
- Both sites build clean and deploy; IndexNow pings fire.
- Zero rot risk: nothing on either site can silently go stale except the
  documented annual "2026" title touch.
