# Referral Microsites Polish — Implementation Plan

> Executed INLINE by the main session (Doc's instruction — no subagents).
> Spec: ../specs/2026-07-07-referral-sites-polish-design.md
> "Test" for these static sites = `npm run build` clean + live-page verify after deploy.

**Goal:** Flagship-grade, zero-maintenance passive funnels on screferralreward.com + screferralbonus.com.

## Global constraints
- Code STAR-GCQJ-N6NC everywhere; ledger-verified facts only (referral-* claims, freefly-* claims for the event tracker).
- Every factual claim on-page maps to a ledger usage line; regenerate each domain's manifest via `docs/claims/gen-sources.mjs <domain> <site>/src/data/page-sources.generated.json`.
- Match each site's existing visual language (reward: rounded/clean; bonus: industrial condensed-caps + corner brackets).
- No new routes, no nav changes.

## Task 1 — screferralreward: static hero
- Create `src/components/StaticHero.tsx` (server component: next/image priority hero band, tuned gradient, slot for eyebrow/title/sub).
- Replace HeroCarousel usage on `/` with StaticHero (distinct image); give /get-the-code and /event-tracker hero bands too (smaller variant) if they lack imagery.
- Build passes. Commit: `feat(polish): static cinematic heroes — replace carousel`.

## Task 2 — screferralreward: GEO-complete subpages
- /get-the-code: FAQ block + FAQPage JSON-LD; annotated signup screenshot (copy jpg to `public/images/referral/rsi-signup-referral-code-field.jpg`); editorial link → dayonecitizen.com/referral-code; PageSources.
- /event-tracker: FAQ block + FAQPage JSON-LD; PageSources (freefly claims).
- Ledger: add usage lines for both routes; regen manifest. Commit both repos.

## Task 3 — screferralbonus: static hero + overlay fix
- Same StaticHero approach adapted to the site's industrial style; fix the black-void overlay on `/`; hero bands on subpages.
- Commit: `feat(polish): static cinematic heroes — fix over-darkened hero`.

## Task 4 — screferralbonus: GEO-complete subpages + llms.txt
- /how-to-use: FAQ + FAQPage; signup screenshot; DOC editorial link; PageSources.
- /about-the-bonus: FAQ + FAQPage; PageSources.
- llms.txt: add the code + verify page list. Ledger usage lines; regen manifest. Commit both repos.

## Task 5 — evergreen sweep + docs (both sites)
- Grep for dated copy/stale states; verify event-tracker default; title-suffix dedupe check; FTC + fan-site disclaimers present.
- Add "annual touch: refresh 2026 in titles each January" note to both CLAUDE.mds.
- Commit, push both sites (Vercel deploy + IndexNow), live-verify all 7 pages (200 + heroes render + FAQPage present), update session memory.
