# Domain Review — 2026-10-01 (renew / redirect / drop)

> **Status:** Opus first pass, approved by Doc on 2026-10-01 ("do it"). Under the
> routing policy, kill reviews belong in Fable sessions, so treat these tiers as
> confirmed but open to a Fable re-read.
> **Executed today:** o7meaning.com 301 (below). The other changes wait on
> renewal dates or on Doc's call.

## Framing

Domains are cheap, at about $10–15 per .com per year. Dropping every candidate
saves roughly $150 a year. **Live sites are the expensive part.** Each one needs
a patch-content refresh, the canonical-hijack hardening, fact-checks, CTA tests,
and a slot in every audit script. So the main question here is which domains
still deserve a live site. Whether to renew a domain matters much less.

A 301 domain is worth renewing only when it has something to pass on:
backlinks, old bookmarks, or people who remember the brand. A domain with none
of these isn't worth paying for as a 301.

## Data

- Referral clicks and CTA impressions: click Sheet, 2026-07-06 → 2026-10-01
  (`node gsc-mcp-server/cta-report.mjs --days 87`). Impression logging starts 7/6.
- Search: `search-snapshot-2026-09-16.md` (GSC + BWT, 28d).
- User-triggered AI-bot fetches: the same cta-report window (logger live since 7/22).
- Domain inventory and expiry dates: Vercel team domain list. **Only
  dayonecitizen.com (expires about 2027-04-29) and verifytheverse.com were bought
  through Vercel.** The rest use Vercel DNS but are registered elsewhere, mostly
  in late April 2026, so they renew around April 2027. Expiry dates and prices
  for those domains are not visible here.

| Domain | Referral clicks (87d) | CTA impr | Search (28d, G+B clicks) | AI fetches (87d) |
|---|---|---|---|---|
| starcitizenhelp.com | 167 | 20,278 | 1,344 | 13,153 |
| freeflyevent.com | 135 | 413 | 37 (post-Free-Fly lull) | 1,587 |
| dayonecitizen.com | 79 | 11,318 | 98 | 4,908 |
| bestspacesim.com | 32 | 1,332 | 46 | 1,495 |
| iheldtheline.com | 4 | 1,245 | 33 | 2,652 |
| highestfundedgame.com | 2 | 270 | 4 | 767 |
| o7meaning.com | 0 | 182 | 1 | (24 per 14d, −85%) |
| 42ndsquadron.com | 0 | 45 | n/a (not in GSC/BWT reports) | n/a |

## Decisions

### Tier 1: keep as live sites (renew)

| Domain | Note |
|---|---|
| starcitizenhelp.com | Brings in most of the network's traffic. It breaks the fan-site domain rule (contains an RSI mark), but the fix is a rename, and a rename means renewing this domain as a 301 for years. **Renew either way.** Sunset/rename strategy is a separate discussion (started 2026-10-01). |
| freeflyevent.com | 32.7% CTA click rate, the best in the network. Value comes in spikes around Free Fly and IAE. The Bing site. |
| dayonecitizen.com | The hub. Auto-renew is already on at Vercel. |
| bestspacesim.com | 2.4% CTA click rate, the best of the non-event sites. Bing clicks growing. Template for AI-citation-first sites. |
| iheldtheline.com | **Probation.** Search and AI traffic are real, but only 4 referral clicks in 87d. Judge it after the October SQ42 event / CitizenCon, its best window. If it still converts about zero, demote it to a lore archive with no CTA work, or fold it into dayone. |

### Tier 2: keep as redirects (renew, no site)

| Domain | Target | Note |
|---|---|---|
| o7citizen.com | dayonecitizen.com (1:1 paths) | Hub domain before the rebrand, so old links and bookmarks still point to it. Keep at least one more year. |
| heldtheline.com | iheldtheline.com | Only if it costs under about $15 a year. Otherwise drop it. |
| highestfundedgame.com | (live site for now) | **HOLD** one more cycle for the $1B funding milestone. If the milestone passes without it ranking, demote it to a 301 → dayone or drop it. |

### Tier 3: don't renew

| Domain | Status / action |
|---|---|
| **o7meaning.com** | **KILLED 2026-10-01**: whole domain 301 → `dayonecitizen.com/glossary#term-o7` (o7meaning-site `5ac46b6`, verified live on apex, www and vercel.app). Today was the hard-read date set in August. The rule then was "BWT AI citations appear → keep, still zero → flip". The BWT AI Performance page was **not** checked this session (it needs the Chrome flow). Our own logger shows AI fetches down 85% and there are 0 clicks on every channel, so we flipped it. If Doc's BWT check shows a meaningful citation base, the 301 is a one-line revert. |
| 42ndsquadron.com | Recommended: merge its 8 pages into iheldtheline (same SQ42 lore audience, and the domain that actually ranks), 301 for one year, then drop it. **Waiting on Doc's call; not executed.** |
| pledgemeaning.com, screferralreward.com, screferralrewards.com, screferralbonus.com | Already killed in July. No backlinks or traffic, so a 301 isn't worth paying for. Let them lapse. |
| mostfundedgame.com, 07citizen.com, o7citizens.com, o7citizen.gg | Defensive typo variants with no traffic. Vercel shows mostfundedgame and 07citizen never had a verified config. The .gg costs the most to keep. |
| millionmilehighclub.com | Never to be developed (hard rule). **The only domain with value outside the SC community. List it on Afternic or Sedo before it lapses.** |

Out of scope: verifytheverse.com (bought 2026-09-29), and the client and
personal domains on the same Vercel team.

**End state:** 5 live sites (4 if 42ndsquadron merges and iheldtheline fails
probation), 3 redirects, 11 domains dropped.

## Manual for Doc

- [ ] Registrar: turn off auto-renew for every Tier 3 domain (o7meaning,
      pledgemeaning, screferralreward, screferralrewards, screferralbonus,
      mostfundedgame, 07citizen, o7citizens, o7citizen.gg, millionmilehighclub;
      42ndsquadron once merged).
- [ ] List millionmilehighclub.com (and the screferral domains if you want to)
      on Afternic or Sedo. Listing is free.
- [ ] Optional: glance at BWT AI Performance for o7meaning.com to confirm
      the kill.
- [ ] Decide on the 42ndsquadron → iheldtheline merge.

## Execution record

- 2026-10-01 o7meaning.com 301 → dayonecitizen.com/glossary#term-o7
  (o7meaning-site `5ac46b6`). Ops scripts updated: site-health now checks it
  as a redirect domain; deep-diag, indexnow, the GSC/BWT audit scripts and
  source-watch drop it; the dashboard marks it KILLED.
- Still to do in a cheap session: other sites' body links to o7meaning.com now
  ride the 301. Sweeping them to point straight at the glossary is optional.
