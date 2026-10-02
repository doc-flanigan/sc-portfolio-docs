# SCH Domain Move — Runbook

**Purpose:** move starcitizenhelp.com 1:1 to `help.dayonecitizen.com`, a
hostname that follows the fan-site domain rule.
**Status: SCHEDULED — early January 2027** (Doc's decision, 2026-10-02;
replaces the 2026-10-01 "contingency only" call). Keep starcitizenhelp.com
through IAE (late Nov–early Dec), then run Phase 1 on a weekday in the first
full week of January. Nothing visible changes before then.
**Break-glass still applies:** if CIG/RSI makes contact before January, run
this runbook within one working day on their clock instead.

## Why move voluntarily (decided 2026-10-02)

- **The rule isn't a gray area.** RSI's Fan Site policy bars "Star Citizen",
  "Roberts Space Industries", "Cloud Imperium", "Turbulent" and "Squadron 42"
  from the domain, and also bars in-game entity names (ship manufacturers etc.).
  starcitizenhelp.com breaks the first clause directly. The new hostname
  contains none of them. Only the domain is the problem: content, referral
  links and fan-site status are fine, so a rename fixes it completely.
- **Enforcement looks inactive, not permissive.** There is no public record of
  CIG seizing fan domains. What exists is self-policing: StarCitizen-Kantine.de
  renamed itself to SC-Kantine.de in August 2025 to comply with this clause.
  The policy reserves "all rights in law and equity" for sites that could be
  confused with official ones, which points to notice-then-escalate.
  Near-term chance of a letter is low, but visibility is what turns a dormant
  rule into a ticket, and SCH is the network's most visible asset.
- **"Wait until they ask" only wins if they never ask.** A letter in late
  November means moving on CIG's clock during the window that produces the
  clicks. January is the quietest stretch, and leaves about two months of
  buffer after a ~10-week settle before Invictus (around May).
- **July's test doesn't argue against this.** Tranche 1 moved two guides onto
  *existing dayone URLs* on a host that ranks the same content about a position
  worse. A 1:1 move with the same paths is a different operation. Google's
  guidance: permanent redirects don't cost PageRank.

**Rejected destinations:**
- `dayonecitizen.com/help/` (subfolder): helps the hub most on paper, but the
  Change of Address tool doesn't apply to path moves, and it repeats the failed
  test (strong pages onto a property with an indexing problem). Revisit only
  once dayone is getting indexed and ranking on its own.
- New standalone .com: same redirect mechanics, no history, worse brand
  continuity, one more hostname to explain to AI crawlers. Only worth it if
  SCH shouldn't carry the dayone name.
- Folding into dayone's pages: still wrong (see tranche 1).

**Expectation to set:** Google treats a subdomain mostly as its own site, so
this will not fix dayonecitizen.com's rankings. That's acceptable. The goal is
to keep SCH's rankings, not to donate them to a weaker host.

## Why a rename and not a fold into dayone (original 2026-10-01 note)

The tranche-1 migration (Jul 2026) moved 2 SCH guides onto dayone. Rankings took
about 10 weeks to recover (party-management position 6.0 → 7.1,
inventory-management 7.1 → 6.8 by mid-Sep), and nothing was gained.
A 1:1 whole-site move (same pages, same paths, new host) is the kind of move
search engines handle best. SCH stays the in-game help site; only the hostname
changes. See `kill-review-2026-10.md` and memory `dayonecitizen-seo-push`.

## Target hostname

**Decided (Doc, 2026-10-01): `help.dayonecitizen.com`.** Any other new domain would have to build authority from zero.
- Follows the domain rule, and nothing new needs to be bought.
- DNS is already on Vercel, because dayonecitizen.com uses Vercel DNS, so adding
  the domain to the project works immediately.
- Matches `ask.dayonecitizen.com`.
- Brings SCH under the dayone brand without merging the two sites.

Alternative: a standalone compliant .com, if Doc wants SCH to keep its own
brand. That domain would need to be bought and registered in GSC and BWT
before the move, which costs a day. Decide this in advance, not on the day.

**Reporting gotcha with the subdomain:** `sc-domain:dayonecitizen.com` covers
every subdomain, so SCH traffic would land in dayone's GSC numbers. Add a
**URL-prefix property `https://help.dayonecitizen.com/`** for separate
reporting, and point the audit scripts at it.

---

## Phase 0: peacetime prep (do now; no visible change)

Doing this phase turns move day from "edit 25 files under pressure" into
"change one env var and redeploy".

- [x] **P0.1 Single site-URL constant in SCH.** _(SCH PR #62, 2026-10-01)_ There is none today. The
  literal `https://starcitizenhelp.com` is hardcoded in about 25 source files
  (about 190 hits in about 50 files). Add `src/lib/site.ts` exporting
  `SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://starcitizenhelp.com'`
  and route everything below through it:
  - per-page `alternates.canonical` + `openGraph.url` (11 page files, plus the
    template in `game-guides/[slug]/page.tsx:23`)
  - `layout.tsx` (`metadataBase`, og.url)
  - JSON-LD in `app/page.tsx` (WebSite + SearchAction), `updates/page.tsx`,
    `game-guides/[slug]/page.tsx` (`SITE`), `PageSources.tsx` (`SITE_ORIGIN`)
  - `sitemap.ts` (`base`), `app/llms.txt/route.ts` (`SITE`)
  - `src/data/guides.ts`: about 30 `ogImage`/`image` absolute URLs + about 4
    in-body self-links. Make these relative or build them from SITE_URL.
  - `public/robots.txt` `Sitemap:` line: replace it with an `app/robots.ts`
    that uses SITE_URL.
  - `scripts/indexnow.mjs` already reads `NEXT_PUBLIC_SITE_URL`; just check it.
  - **Check it's a pure refactor:** build before and after, diff the generated
    HTML for every route, and expect **zero diff**. Ship it as a PR in
    `StarCitizenHelp-live`.
- [x] **P0.2 Make `next.config.ts` host redirects generic.** _(PR #62)_ Today: www → apex
  (`:10-11`) and `star-citizen-help.vercel.app` → apex (`:20-21`), both
  hardcoded. Prepare (but don't enable) a rule set keyed on SITE_URL. When
  SITE_URL is not starcitizenhelp.com, every `starcitizenhelp.com` /
  `www.starcitizenhelp.com` / vercel.app host 301s `/:path*` → `SITE_URL/:path*`.
- [ ] **P0.3 Renewal:** set starcitizenhelp.com to auto-renew, multi-year if
  the registrar allows it. The old domain carries the 301s, the backlinks, and
  `contact@starcitizenhelp.com` mail (`mailto:` in PrivacyPolicy, CookiePolicy,
  `views/Tools.tsx:632`). **Never let it lapse.**
- [x] **P0.4 Check the Change of Address tool supports this move** (different
  registrable domain → subdomain). **Answer (Doc's review 2026-10-02, from
  Google's docs):** yes. The tool covers moves from one domain or subdomain to
  another, including hosts like `m.example.com`. It does **not** cover path
  moves (`/help/`), and it doesn't move subdomains *under the source* unless
  each is submitted too (SCH has none besides `www`, which already 301s).
  Re-confirm in GSC on move day. If GSC still refuses, the fallback is 301s +
  sitemaps + Request Indexing on the top 20 URLs.
- [ ] **P0.6 Fan-site notice + disclosure travel with the pages.** The
  disclaimer must stay "open, obvious, readily seen" on every page of the new
  host, with a link to the official RSI site. The referral/affiliate disclosure
  moves too. Both live in the shared `Footer.tsx`, so they move automatically.
  The footer had no plain link to the official site (RSI was only reachable
  through referral and in-guide links). Added in SCH PR #66 (2026-10-02).
  Check all three on move day (step 4). The policy's real trigger is *looking
  official*, not using a referral code.
- [x] **P0.5 Optional, recommended anyway:** _(PR #62)_ add the `Link: rel="canonical"`
  HTTP header to SCH's middleware (the 747live hijack hardening never reached
  SCH; its middleware only logs AI bots). Build it from SITE_URL so it moves
  with the site.

---

## Phase 1: move day (about 4–6 hours)

Do it on a weekday morning, and **not during a Free Fly / IAE window** unless
CIG's deadline forces it.

1. **Snapshot baselines** (needed to judge recovery):
   - `node gsc-mcp-server/report.mjs`
   - BWT search + AI Performance pages for starcitizenhelp.com (Chrome flow)
   - `node gsc-mcp-server/cta-report.mjs --days 28`
   - Save these to `docs/seo/sch-move-baseline-YYYY-MM-DD.md`.
2. **Add the domain:** add `help.dayonecitizen.com` to Vercel project
   `star-citizen-help` (prj_tQVBlOddENyn3EmYyHJW7cm3cfVH). DNS is automatic on
   Vercel DNS. Wait for the cert.
3. **Flip the env:** in Vercel Production, set
   `NEXT_PUBLIC_SITE_URL=https://help.dayonecitizen.com`. Enable the P0.2
   redirect rules. Redeploy production.
4. **Verify** with GET, not HEAD (HEAD hides headers):
   - `https://starcitizenhelp.com/<path>` and `www.` → **301/308 to the same
     path** on the new host, for `/`, `/tools`, `/game-guides/keybinds`,
     `/updates` and one migrated tranche-1 slug. That last one must chain
     straight to dayone, not loop.
   - New host: self-referencing canonical, og:url, JSON-LD urls, sitemap.xml,
     robots.txt, `/llms.txt` all on the new host.
   - IndexNow key file is served at the new host.
   - CTA click → row in the Sheet with `site=help.dayonecitizen.com`.
   - `npm run deep-diag` (after the script updates in step 7).
   - Footer on the new host: fan-site disclaimer, RSI link, and affiliate
     disclosure all visible (P0.6).
5. **Search engines:**
   - GSC: add the URL-prefix property for the new host. Submit
     `/sitemap.xml`. **Change of Address** from `sc-domain:starcitizenhelp.com`
     → new property (or the P0.4 fallback). Request Indexing on the top 10
     pages.
   - BWT: add + verify the new host. Run the **Site Move** tool (old → new).
     Submit the sitemap.
   - IndexNow: ping every URL on the new host. Also ping the old URLs, so
     Bing re-crawls them and sees the 301s.
   - Keep the old GSC/BWT properties forever; that's where the 301s get
     monitored.
6. **AI-citation mitigation:** most AI assistants (ChatGPT search, Copilot)
   draw on Bing's index, so the BWT Site Move + IndexNow pings are the main
   lever. The 301s mean live fetches of old URLs still land on the right
   page. `llms.txt` on the new host lists new URLs automatically (P0.1).
7. **Workspace scripts** (replace the starcitizenhelp entries, or add the new
   host next to them):
   - `scripts/`: `site-health.mjs` (apex + project; move the old host into
     `REDIRECT_DOMAINS`), `deep-diag.mjs` (SITES + NETWORK_HOSTS),
     `indexnow-all.mjs`, `source-watch-agent.mjs`
   - `gsc-mcp-server/`: `report.mjs`, `index-audit.mjs`,
     `canonical-hijack-audit.mjs`, `ctr-gap-audit.mjs` (+ `ctr-gap-ignore.txt`
     page entries), `submit-sitemaps.mjs`, `freefly-pulse.mjs`,
     `migration-report.mjs` (6 source URLs)
   - `dashboard/data/sites.js`, `dashboard/index.html`, `commands.js`,
     `fetchers.js`
   - `dayonecitizen-main`: `/day-one-citizen/keybinds` has a cross-domain
     canonical to SCH's keybinds page (dayone PR #119). Repoint it to the
     new host.
   - `cta-report.mjs`: treat both hostnames as one site in per-site rollups.
   - SCH repo: `.github/workflows/guide-drift.yml:76` (live-page URL),
     user-agent strings in `scripts/patch_notes.py:52` and
     `scripts/guide_drift.py:36`
8. **Docs:** STATUS.md network map, root CLAUDE.md table, SHARED_CONVENTIONS.md,
   SCH CLAUDE.md, README, and this runbook's execution log below.
9. **Reply to CIG** (if they triggered the move) with the new hostname and the
   date the old one started redirecting.

**Rollback:** set the env var back, disable the P0.2 rules, and redeploy. Do
not roll back after day 3 or so: once Google has processed a Change of
Address, reversing it costs more than waiting.

## Phase 2: aftercare

- Day 1–7: watch daily that the old URLs 301 correctly; run `npm run site-health`.
- Weekly for 8 weeks: compare **combined G+B clicks**, top-query positions
  (`ccu chain calculator`, `ccu calculator`, `keyboard map`), BWT AI
  citations, and referral clicks against the baseline. Expect a dip for
  weeks, not days.
- Run the canonical-hijack audit at week 2 and week 6. Move-time URLs that
  Google hasn't re-crawled yet are exactly the weak spot 747live exploits.
- Keep starcitizenhelp.com renewed and redirecting for **at least 2–3 years**.
  The hard floor is one year: Change of Address only associates the two sites
  for 180 days, and old AI citations need the 301s to keep resolving.

**Recovery expectations (plan each engine separately):**
- **Google** (clean 1:1, redirects live *before* Change of Address is filed):
  crawl shifts in 1–2 weeks, rankings fluctuate through weeks 3–8, most queries
  resettle in about 10 weeks, stubborn gaps close by 3–6 months. July's
  ~10 weeks is the planning figure for the messy case, not the ceiling.
- **Bing:** follows 301s but refreshes more slowly. Budget a few extra weeks.
  Run Site Move and submit the new host in BWT.
- **AI citations (the weak leg):** the ~13K fetches were tied to the old
  hostname, and ChatGPT/Perplexity/etc. have no Change of Address. Some follow
  the redirect and re-cite the new URL. Others keep quoting the old host until
  a fresh fetch replaces it. Expect a sharper drop than Google and a less
  predictable return, measured in months.

## Execution log

_(empty — append here if this runbook is ever run)_
