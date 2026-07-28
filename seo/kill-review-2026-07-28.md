# Domain Kill Review — prepared 2026-07-25, for decision 2026-07-28

> **EXECUTED 2026-07-27 (evening).** Doc approved the two kills; both 301s are
> live and verified in production:
> - pledgemeaning.com `/:path*` → dayonecitizen.com/glossary#letter-P
>   (pledgemeaning-site commit `d95000a`)
> - screferralreward.com `/:path*` → dayonecitizen.com/referral-code
>   (screferralreward-site commit `efe0dd3`)
> - Ops scripts updated (site-health → redirect-domain checks, deep-diag /
>   indexnow / verify-referral drop both, dashboard marked) — sc-portfolio
>   commit `3690c46`. CTAButton bug on pledgemeaning is moot per the kill.
> - Still manual for Doc: mark both domains non-renew at the registrar;
>   register o7meaning.com in BWT (DNS) so the Aug 28 window is real.
> - bestspacesim KEEP accepted; o7meaning + highestfundedgame decision
>   date: **2026-08-28**.

Scheduled at the 2026-07-18 domain trim ([[project-domain-trim]]). Candidates were
pledgemeaning + screferralreward ("likely kill"), o7meaning ("needs AI citations"),
highestfundedgame + bestspacesim ("same bar").

Data: GSC 2026-06-24→07-21 vs prior 28d · BWT AI Performance through 07-22 ·
own AI-bot fetch logger last 7d · click Sheet last 28d.

---

## TL;DR recommendation

| Domain | Google clicks | Real referral clicks | AI citations | Verdict |
|---|---|---|---|---|
| **pledgemeaning.com** | 0 | **0** | **0 bot fetches** | **KILL** |
| **screferralreward.com** | 0 | 0–1 | 2 (≈zero) | **KILL** |
| **bestspacesim.com** | 1 (first ever) | 5 | **2K, rising** | **KEEP** — thesis working |
| **o7meaning.com** | 0 | 0–1 | **NEVER MEASURED** | **DEFER** — criterion untested |
| **highestfundedgame.com** | 0 | 2 | 69, no queries | **HOLD to Aug 28** |

Two kills, not the four the July 18 note implied.

---

## Blocker found: o7meaning was never measurable

**o7meaning.com and pledgemeaning.com are not registered in Bing Webmaster Tools.**
The BWT account holds 11 sites (42ndsquadron, bestspacesim, dayonecitizen,
freeflyevent, highestfundedgame, iheldtheline, o7citizen, screferralbonus,
screferralreward, starcitizenhelp, untangledwork) — neither candidate is among them.
The AI-performance page returns "User is unauthorized to access the site."

o7meaning's stated survival criterion on July 18 was *"needs AI citations."* That
test was never run. **Killing it Monday would be killing it for failing a
measurement that never happened** — so the honest move is to register it, run the
window, and decide with data.

Partial substitute: our own AI-bot fetch logger (independent of BWT) recorded
**43 fetches to o7meaning in 7 days** — low, but real and non-zero.

---

## Per-domain detail

### KILL — pledgemeaning.com
- GSC: 0 clicks, impressions flat 140→154, **position worsening 12.3→17.3**. One
  page (`/`) carries everything.
- Referral clicks: **0 real.** The report's headline "27 clicks / 61.4% CTR" is an
  artifact — see the data-integrity note below. Its two genuine buttons
  (`home-referral-bonus` 21 impr, `home-final-cta` 23 impr) have **0 clicks between
  them**.
- Caveat, and it cuts both ways: pledgemeaning's CTAButton component was **logging
  every click under a generic label** (bug found 07-25, below), so click attribution
  on this domain was broken the whole time. But all 26 generic-label rows in the
  window belong to the single bot burst — there are **no scattered human clicks on
  any other day** — so "zero human CTA clicks in 28 days" still holds. Treat
  pre-07-25 *historical* click totals for this domain as unreliable.
- AI: **zero AI-bot fetches in 7 days** — the only site in the network with none.
  Every other property got at least 8 (42ndsquadron), and this is our own
  instrumentation, so the BWT gap doesn't hide anything here.
- **Nothing is reading it, nothing is citing it, nothing converts.** Clearest kill.
- Execution: 301 → dayonecitizen.com glossary/pledge definition. Same playbook as
  screferralbonus on 07-18.

### KILL — screferralreward.com
- GSC: 0 clicks, impressions 80→89, **position collapsing 41.8→52.0**.
- Referral: `homepage-cta` 82 impressions, **0 clicks**.
- AI (BWT, measured): **2 total citations, ever.** Zero grounding queries.
- Its twin screferralbonus.com was already retired 07-18 for the same profile, and
  dayonecitizen.com/referral-code is the designated authority page that already owns
  the query.
- Execution: 301 → dayonecitizen.com/referral-code, mirroring the twin.

### KEEP — bestspacesim.com (verdict flipped)
This is the surprise, and it argues against the July 18 framing.
- **AI citations: ~2,000 and climbing** (Jul 18→24: 52, 72, 63, 50, 47, 47, **92** —
  new highs into month-end). On 07-20 the note was "vs-pages ✗ (1 citation)."
- Grounding queries are real and high-share: "star citizen review 2026" 234 @ **23.9%**,
  "space sim games" 170 @ **25.1%**, "space sim game" 154 @ 24.0%,
  "is star citizen worth it" 94 @ **29.4%**, "star citizen review" 81 @ 27.8%.
  It is winning ~a quarter of the citation share on *generic, non-branded* space-sim
  queries — the exact GEO thesis the network was built on.
- Google: **first click ever** (`/star-citizen-vs/starfield`), and position improved
  **31.5 → 15.6**. Impressions dipped 79→46, but rank is moving the right way.
- Referral clicks: 5 — most of any candidate.
- Killing this now would destroy the network's best working example of GEO-without-Google.

### DEFER to 2026-08-28 — o7meaning.com
- GSC negative: 0 clicks, impressions **falling 912→629**, position **17.3→21.1**.
- One bright spot: `/in-star-citizen` sits at **position 8.3** on 134 impressions.
- AI: unmeasured (see blocker). 43 bot fetches/7d.
- Action now: add + verify in BWT (DNS, same pattern as the other 10), then decide at
  the next review with a real 4-week citation window. Cost of holding: one renewal.
- If citations are still ~nil on Aug 28, kill without further debate.

### HOLD to 2026-08-28 — highestfundedgame.com
- Genuinely borderline. Impressions **rising 151→206**, but position **worsening
  36.2→40.6**, 0 clicks.
- AI: 69 citations, bursty, and **zero grounding queries attributed** — citations
  without query attribution is weak evidence.
- 91 AI-bot fetches/7d (healthy crawler interest), 2 referral clicks.
- Same deadline as o7meaning. Judge both on the August citation window.

---

## Data-integrity issue found (affects all future readouts)

`cta-report.mjs` overstated pledgemeaning by **27 clicks**. Cause: 26 rows labelled
`click:CTAButton` — a generic default label wired to none of the site's real buttons —
all fired in a **31-second burst on 2026-07-14 22:37 CST** (~1/sec, some 0s apart),
same referral code, same page. That is a script or retry loop hitting `/api/log`, not
26 humans. A 27th row is the known `test-e2e-0711` junk label, which slips the report's
filter because the regex tests the raw prefix (`click:`) rather than the label after it.
`click:CTAButton` appears on **no other site**.

**FIXED 2026-07-25** (commit `3e35d86`, sc-portfolio main): `cta-report.mjs` now
strips the `click:`/`impression:` prefix before testing junk-label patterns, and
excludes the bare generic `CTAButton`. Verified pledgemeaning 27 → **0 clicks**.
Healthy sites each lost exactly 1 click (SCH 39→38, freefly 17→16, dayone 14→13) —
that is the same fix correctly removing the one `test-e2e-0711` row that sat on nearly
every site, not filter overreach. AI-bot section byte-identical.

**Still open — a real live bug, not dead code.**
`pledgemeaning-site/src/components/CTAButton.tsx:54` hardcodes `label: 'CTAButton'`
in `handleClick` and **never reads the `trackingLabel` prop**, even though the
impression handler on line 33 uses it correctly. Call sites *do* pass proper labels
(`home-referral-bonus`, `home-final-cta`) — the click path silently discards them.
Not a shared-component defect: `dayonecitizen-main/src/components/CTAButton.tsx:124`
is implemented correctly.

Consequence: every genuine human click on pledgemeaning has been logging under the
generic label, and our new filter now drops those too — so that domain will report 0
attributed clicks until the component is fixed. **If the kill is approved this is
moot; if pledgemeaning is spared, fix `handleClick` first or its next review will be
blind in exactly the same way.**

Until fixed, treat single-digit click counts on low-traffic sites as unverified: the
lone clicks on o7meaning (1) and screferralreward (1) also come from labels outside
the tracked-button set.

---

## Suggested Monday agenda

1. Approve the two kills; execute 301s + mark domains for non-renewal.
2. Accept bestspacesim as a keeper; consider it the template for GEO-first properties.
3. Register o7meaning in BWT today-ish so the August window is real.
4. Set a single Aug 28 decision date for o7meaning + highestfundedgame.
5. Hand the cta-report fixes to a cheap session.
