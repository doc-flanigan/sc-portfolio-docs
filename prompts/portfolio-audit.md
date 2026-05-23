# SC Portfolio — Full Audit & Diagnostic Prompt

> **How to use:** Paste the entire PROMPT section below into a Claude Code CLI session
> started from `E:\Claude Code\sc-portfolio\`. The audit is read-only and runs
> autonomously. You will be notified when the report is ready.

---

## PROMPT

You are running a comprehensive read-only audit of the Star Citizen fan site portfolio
located at `E:\Claude Code\sc-portfolio\`. Your job is to investigate, document, and
report — take NO action and make NO changes to any file. At the end you will save a
single report file and notify the user.

---

### PORTFOLIO OVERVIEW

The portfolio is a network of Star Citizen fan sites. All are deployed on Vercel.
Network hub is dayonecitizen.com. The referral codes in use are:
- Primary (×2 weight): STAR-GCQJ-N6NC
- Secondary (×1 weight): STAR-C2GJ-XSSS
- Referral rotator lives in `src/lib/referral-rotator.ts` on each site

**Sites and repos:**

| Repo | Live domain(s) | Role |
|------|---------------|------|
| `dayonecitizen-main` | dayonecitizen.com | Hub — new player guide |
| `freeflyevent-site` | freeflyevent.com | Free Fly event tracker |
| `screferralreward-site` | screferralreward.com | Referral code info |
| `screferralbonus-site` | screferralbonus.com | Referral bonus info |
| `bestspacesim-site` | bestspacesim.com | Space sim comparison |
| `StarCitizenHelp-live` | starcitizenhelp.com | In-game help guides |
| `pledgemeaning-site` | pledgemeaning.com | Definition funnel |
| `o7meaning-site` | o7meaning.com | Definition funnel |
| `fundedgame-site` | highestfundedgame.com, mostfundedgame.com | Crowdfunding story |
| `dayonecitizen-main` | (also) o7citizen.com | 308 redirect to dayonecitizen.com |

Shared conventions are at `E:\Claude Code\sc-portfolio\SHARED_CONVENTIONS.md`.
Each site has a `CLAUDE.md` at its repo root describing its purpose and SEO role.

---

### AUDIT SCOPE

Run all of the following checks. Use parallel subagents where the work is independent.

#### 1. Routing & Domain Audit
For each site:
- Read `next.config.js` (or `next.config.ts`) for redirect/rewrite rules
- Read `vercel.json` if present
- Check that www → non-www redirects exist (or non-www → www, consistent per site)
- Check that secondary domains (e.g. screferralbonus.com, mostfundedgame.com, o7citizen.com)
  redirect properly to the primary domain
- Flag any site where the redirect logic is missing or ambiguous
- **Known issue to investigate:** screferralreward.com — Vercel reports it as connected
  but the site may not be routing correctly. Dig into the Next.js config and any
  middleware to find the root cause.

#### 2. Broken Internal Links
For each site, scan all `.tsx` files under `src/app/` and `src/components/`:
- Find all `href` values in `<Link>`, `<a>`, and `CTAButton` components
- Cross-reference internal hrefs against actual page files that exist under `src/app/`
- Flag any href that points to a route with no corresponding `page.tsx`
- Flag any `href="/"` back-links on sub-pages that should point to a section index instead

#### 3. Referral Code Consistency
Across all sites:
- Find every hardcoded referral code or RSI enlist URL
- Confirm codes are limited to STAR-GCQJ-N6NC and STAR-C2GJ-XSSS
- Confirm the referral rotator (`src/lib/referral-rotator.ts`) exists on every site
  that uses a CTA button
- Flag any site still using a hardcoded single code instead of the rotator
- Flag any site where the enlist URL is malformed or points to the wrong code

#### 4. SEO & AI Citation Audit
For each site, read all `page.tsx` files that export `metadata`:
- Check that `title` is unique across the portfolio (no duplicate titles)
- Check that `description` is present, meaningful, and under 160 characters
- Check that `alternates.canonical` is set and matches the expected URL
- Check that Open Graph `title`, `description`, and `url` are present
- Check for JSON-LD schema (`<script type="application/ld+json">`) on pages that
  would benefit from it (event pages, guide pages, definition pages)
- Check `sitemap.ts` or `sitemap.xml` for completeness — are all live routes included?
- Check `robots.txt` — is anything incorrectly blocked?
- Flag pages with `noindex` that should be indexed
- Flag pages without `noindex` that should NOT be indexed (e.g. giveaway.html)
- **AI citation check:** Look for pages making factual claims about Star Citizen
  without a source reference. Pages that want AI citations need verifiable, specific
  claims with dates and sources. Flag vague or unsourced claims.

#### 5. Content & Pricing Accuracy
- Check `src/data/events.ts` on freeflyevent-site for any events with dates in the past
  that are still marked as ACTIVE or UPCOMING
- Check any hardcoded ship prices or package names across all sites against what was
  reported as current store data:
  - Citizen Starter Pack: $45 WB / $60
  - Generalist 'DefenseCon' Starter Pack: $51 WB / $60
  - Salvager Starter Pack: $75
  - Miner Starter Pack: $75
  - Duelist Starter Pack: $75
  - Hauler Starter Pack: $80
  - Outsider Starter Pack: $85
  - Privateer Starter Pack: $125
- Flag any page that references the Aurora Mk II, Avenger Titan, or Cutlass Black
  with prices that don't match the above (these ship names may appear in older content)
- Check freeflyevent-site for the giveaway page (`public/giveaway.html`) — confirm
  whether `noindex` has been added yet (should be added after May 27 2026)

#### 6. Cross-Site Link Consistency
Per the SEO strategy, links between sites must follow these rules:
- dayonecitizen.com → can link to any site in the network
- freeflyevent.com → must link to dayonecitizen.com ("New to SC? Start here") and
  screferralreward.com ("claim your bonus")
- starcitizenhelp.com → links only to dayonecitizen.com (authority migration)
- screferralreward.com / screferralbonus.com → link to dayonecitizen.com
- bestspacesim.com → links to dayonecitizen.com and screferralreward.com
- Cross-portfolio links must appear in BODY COPY only, NOT in footers or link lists

Check each site's `src/app/` and `src/components/Footer.tsx` for violations of these rules.

#### 7. Style & UX Consistency
For each site, check against its CLAUDE.md color palette and component spec:
- Does the navbar match the spec? Are the correct links present?
- Does the footer match the SHARED_CONVENTIONS.md footer spec?
- Is the `DiscordCTA` component present on high-intent pages
  (referral pages, buying-decision pages)?
- Is the `/api/log` click tracking endpoint wired to all CTA buttons?
- Are there any pages that use raw `<a>` tags for internal navigation instead of
  Next.js `<Link>`?
- Are there pages missing a `CTAButton` that should have one?

#### 8. Fact-Check (use sc-fact-check subagent)
Dispatch the `sc-fact-check` subagent to verify factual claims on the following pages.
Pass each page's text content (read from the TSX file) to the agent:
- `dayonecitizen-main/src/app/day-one-citizen/worth-buying/page.tsx`
- `dayonecitizen-main/src/app/day-one-citizen/starter-package/page.tsx`
- `freeflyevent-site/src/data/events.ts` (event dates and ship names)
- `starcitizenhelp.com` — any guide that makes specific factual claims about
  game mechanics, patch versions, or prices

The sc-fact-check agent cross-references claims against the Star Citizen Wiki
Comm-Link API. Ask it to return: claim, verdict (verified / unverified / wrong),
and source URL.

---

### HOW TO RUN THIS AUDIT

1. Read `E:\Claude Code\sc-portfolio\SHARED_CONVENTIONS.md` first.
2. Read each site's `CLAUDE.md` to understand intent and SEO role.
3. Dispatch parallel subagents (use the `Explore` subagent type) for checks 1–7,
   grouping by site or by check type to avoid context overload.
4. Dispatch the `sc-fact-check` subagent for check 8.
5. Collect all findings. Do NOT fix anything.
6. Compile everything into a single report at:
   `E:\Claude Code\sc-portfolio\docs\audits\YYYY-MM-DD-portfolio-audit.md`
   (use today's actual date in the filename)
7. Structure the report as:

```
# SC Portfolio Audit — [DATE]

## Summary
[3-5 bullet points of the most critical findings]

## 1. Routing & Domain Issues
[findings or "None found"]

## 2. Broken Internal Links
[findings or "None found"]

## 3. Referral Code Issues
[findings or "None found"]

## 4. SEO & AI Citation Issues
[findings or "None found"]

## 5. Content & Pricing Issues
[findings or "None found"]

## 6. Cross-Site Link Issues
[findings or "None found"]

## 7. Style & UX Issues
[findings or "None found"]

## 8. Fact-Check Results
[claim | verdict | source]

## Recommended Fix Priority
### P1 — Fix immediately (broken, losing traffic/conversions)
### P2 — Fix soon (SEO/quality degradation)
### P3 — Polish (nice to have)
```

8. When the report file is saved, output a single message:
   "Audit complete. Report saved to docs/audits/[filename]. Review it and let me know
   which fixes to prioritize."

---

### CONSTRAINTS

- Read only. No file edits, no commits, no npm installs, no server starts.
- Do not prompt the user during the audit unless you are genuinely blocked and
  cannot proceed without information that is not in the codebase or CLAUDE.md files.
- Minimize interruptions. Batch any questions into a single message if you must ask.
- Run subagents in parallel where checks are independent.
- If a site's repo does not exist locally at the expected path, note it in the report
  as "repo not found locally" and continue.
