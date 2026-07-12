# New-Player Acquisition Keyword Clusters — Research 2026-07-12

Goal: make the network the authoritative answer set for people who have **never played
Star Citizen** and are deciding whether/how to start — because every one of them who
converts goes through an RSI account creation, which is where the referral code lives.

Method: web SERP/PAA research (agent sweep of Google/Bing/AI-answer surfaces, July 2026)
cross-referenced against our own GSC + BWT AI-Performance data (2026-07-10 snapshot) and a
route-level coverage audit of all 11 sites.

Related docs: `keyword-research.md` (per-site targets — update it when pages ship),
`search-snapshot-2026-07-10.md`, `geo-audit-2026-07-05.md`.

---

## Factual anchors (re-verify against live sources before publishing; ledger candidates)

| Fact | Status | Source |
|---|---|---|
| SC is NOT on Steam, Epic, or any storefront — RSI launcher only | Unchanged mid-2026 | starcitizen.tools/Steam, Wikipedia |
| SC is NOT on PS5/Xbox/Game Pass; PC only | Unchanged | multiple |
| **SQ42 console port (PS5/Xbox) signaled by CIG job postings** | 2025-26 hiring news | VideoGamer, TweakTown |
| Cheapest entry: Citizen Starter Pack **$45** — now **Aurora MkII** (replaced Mustang Alpha ~alpha 4.7), 10K UEC, 6-mo insurance | Re-verify on RSI page before use | robertsspaceindustries.com/en/pledge/Packages/Citizen-Starter-Pack |
| Still alpha: 4.8 live May 14 2026; 4.9 slipped to August (bug focus); 4.10 in Evocati Jul 8 | Current | Massively OP 2026-07-02 |
| 1.0: no date; Roberts said 2027-2028 (Aug 2025); community reads 2028+ | Data void | scfocus.org |
| SQ42: "fully playable start to finish," targeted **end of 2026**, Roberts "can't 100% guarantee" (May 2026) | Biggest 2026 hook | PC Gamer |
| No CitizenCon in 2026 (DefenseCon May 14 etc. instead) — most third-party content hasn't absorbed this | Freshness edge | agent sweep |
| Funding ≈ $960M → **$1B milestone imminent** | Pre-position now | PC Gamer |
| **Foundation Festival free fly expected ~Jul 16 2026** with starter discounts + **"new referral program"** | THIS WEEK — needs same-week coverage | TechPowerUp 338558 |
| Referral: 50K UEC at signup; retroactive only within 24h; referrer point after recruit spends $40 | Matches ledger | RSI Referral FAQ |
| ⚠️ BoostRoom claims "VR support" shipped — **uncorroborated, do not repeat** | Fact-check trap | — |

---

## Cluster map — demand → owner → verdict

### 1. Platform / availability — **BIGGEST GAP, HIGH winnability**
Queries: "is star citizen on steam" · "star citizen steam" · "is star citizen on ps5 / xbox / console" · "is star citizen on game pass" · "where to buy star citizen" · "how to download star citizen" · "is star citizen out/released yet" · "star citizen steam deck"

- Intent: the literal first question a shopper asks — they check their usual storefront.
- SERP today: Wikipedia, starcitizen.tools, PCGamesN (thin), **stale 2020-2023 content-farm pages for console/Game Pass**. RSI's own /download pages are JS shells AI crawlers read poorly.
- Our coverage: one buried FAQ answer inside dayone `/buying-the-game`. Nothing targets it.
- **Action: NEW dayone page `/day-one-citizen/is-star-citizen-on-steam` (or `/platforms`)** — answer-first "No — PC only, RSI launcher only, here's the 2-minute real way to get it," plus the SQ42-console-port nuance nobody stale has, plus Steam Deck long-tail ("runs 5-20 fps with tinkering — not supported"). Funnels directly into buying-the-game → starter-package → referral-code. Yes/no questions are exactly what Copilot cites one page for.

### 2. Cost / free — already strong, one gap
Queries: "is star citizen free" (66 AI citations, ours) · "star citizen price" · "how much does star citizen cost" · "star citizen starter pack" · **"do you have to buy ships with real money"** · "cheapest way to start"

- Our coverage: freeflyevent `/is-star-citizen-free` + `/should-i-buy`; dayone `/starter-package` (already ranking), `/pledge-vs-purchase`, `/worth-buying`.
- Gap: **"do you have to buy ships with real money"** — #1 skeptic objection, only wiki/forum threads rank, pairs perfectly with the 50K-UEC referral pitch (earn ships in-game faster).
- Freshness edge: most ranking content still says the $45 pack contains the Mustang Alpha — it's now the Aurora MkII. Our starter-package page must say Aurora (verify first).
- **Action: NEW dayone page `/day-one-citizen/ships-real-money`** (or fold as a major section + FAQ into starter-package and worth-buying); **audit `/starter-package` for Mustang→Aurora staleness.**

### 3. Hardware — already winning, but the winner is sunsetting
Queries: "star citizen system requirements (2026)" · "star citizen specs" (80 citations @ 44% share — **on SCH**) · "can my pc run star citizen" · "download size" · "ssd required" · "on laptop"

- SCH `/game-guides/system-requirements` ranks top-4 and owns the AI-citation share — but SCH is transitional/maintain-only. dayone `/system-specs` must inherit this cluster (tranche-2 301 candidate priority).
- **Fresh trigger: July 2026 minimum-spec bump** (Win10/11 only, SSD mandatory, AVX2/FMA3 requirement kills old CPUs) — breaking-news window open now.
- Differentiator nobody does well: "official minimums lie" (real-world: 6-core, 32GB, NVMe).
- **Action: update dayone `/system-specs` with the July 2026 spec change THIS WEEK + "official minimums vs reality" section; prioritize SCH system-requirements → dayone 301 in tranche-2.**

### 4. Worth-it / skepticism — SERP owned by gold sellers; objection pages are open
Queries: "is star citizen worth it 2026" · **"is star citizen a scam"** · **"is star citizen pay to win"** · **"star citizen player count" / "how many people play"** · "will star citizen ever be finished" · "star citizen wipes"

- SERP today: boostroom/ssegold/expcarry (currency sellers — zero credibility), UNILAD "scam" piece, Metacritic. Player count = pure **data void**; every ranking site fabricates a number (13K vs 34K vs 63K).
- Our coverage: bestspacesim `/is-star-citizen-worth-it` + "star citizen review 2026" (51 citations); scam/P2W/player-count have only passing mentions network-wide.
- **Actions (bestspacesim is the natural owner — comparison/awareness charter):**
  - NEW `/is-star-citizen-a-scam` — sober: 13-year alpha, $960M, SQ42 actually playable, flight-blades controversy addressed straight.
  - NEW `/star-citizen-player-count` — "why there's no official count" + real signals (accounts, funding rate, server caps). Data-void pages get outsized AI citations.
  - P2W: major section + FAQ on the scam page or worth-it page (flight-blades cash-only flap = fresh ammo, address honestly).
  - "Wipes" = newcomer anxiety with no dedicated page anywhere — FAQ on dayone worth-buying (it already mentions wipes) may suffice; watch demand.

### 5. Getting started — crowded, defend with freshness
Queries: "star citizen beginner guide (2026)" · "how to start" · **"star citizen first ship" / "best starter ship" / "avenger titan vs aurora"** · "what to do in star citizen"

- SERP: YouTube-heavy + **startstarcitizen.com — a direct clone of our playbook** (beginner guide + referral + starter-ship picker, patch-stamped "2026, 4.8.3"). Worth a full teardown (like the starcitizenreferrals.com recon).
- Thin sub-fields we can win: "first ship" decision content (only startstarcitizen + one forum thread rank) and "what to do in SC" (professions list).
- **Action: NEW dayone page `/day-one-citizen/first-ship` (Aurora vs Titan decision, patch-stamped); add patch stamps (4.8.x) to the day-one series titles/copy where honest.**

### 6. Comparisons — already winning, expand
- bestspacesim ranks #2-3 for "best space sim 2026" and the three-way vs query; its 9.4/8.2/8.0 scores are being quoted verbatim by answer engines.
- Existing vs pages: elite-dangerous, no-mans-sky, eve-online, x4, starfield.
- **Action: keep Elite Dangerous sections current (2025-26 resurgence: Colonisation, Powerplay 2.0) so scores stay credible; prep "SQ42 vs Starfield" for SQ42 launch window.**

### 7. Referral-adjacent — contested; freshness + honesty win
- New rival wave: starcitizencoupon.app (sharp "fake codes debunk" format), screfcode.com, screfer.com, citizenfreefly.com, starcitizentour.com, goox.de + RSI-org-page squatting ([CODES], [COUPON] org names riding RSI's domain authority).
- Our `/promo-codes` fact-check page (shipped Jul 11) is exactly the right format — the recon is validated.
- **Action: same-week coverage of Foundation Festival's "new referral program" changes on freeflyevent + screferral sites; keep "current referral bonus" freshness. Free-fly-dates/calendar queries are less contested than "referral code" and funnel identically — freeflyevent already owns this.**

### 8. Discovered extras
- **"squadron 42 release date"** — building all year; PC Gamer beatable on freshness ("end of 2026, not guaranteed, GTA VI shadow"). iheldtheline `/release-date` owns this — keep it current with each Roberts statement.
- **"star citizen single player" / "can you play solo"** — dual intent (SQ42 vs solo PU), weakly served. Candidate: iheldtheline or dayone FAQ.
- **"star citizen 1.0 release date"** — data void (scfocus + one cynical blog). Candidate: NEW iheldtheline or dayone page "what 1.0 means + realistic read." Zero network coverage today.
- **"star citizen $1 billion"** — milestone imminent; **highestfundedgame.com is literally built for this query.** Pre-position: update copy to "$960M and counting, approaching $1B," prep a same-day update for when it crosses.
- "star citizen mac" — long-tail void, fold into platforms page.

---

## Priority queue

**This week (calendar-locked):**
1. Foundation Festival coverage (freeflyevent + referral sites) — free fly ~Jul 16, new referral program details, starter discounts.
2. dayone `/system-specs` July-2026 spec-bump update + "minimums vs reality."
3. highestfundedgame $1B pre-positioning.

**New pages (highest ROI first):**
4. dayone platforms page ("is SC on Steam/console/Game Pass") — biggest gap × weakest SERP.
5. bestspacesim `/star-citizen-player-count` — pure data void.
6. bestspacesim `/is-star-citizen-a-scam` (+ P2W section).
7. dayone `/ships-real-money` — top skeptic objection, native referral fit.
8. dayone `/first-ship` — Aurora vs Titan.
9. 1.0-release-date explainer (owner TBD: iheldtheline vs dayone).

**Maintenance:**
- Audit starter-package for Mustang→Aurora staleness (network-wide grep "Mustang").
- Patch-stamp day-one series (4.8.x) where honest.
- startstarcitizen.com full competitor teardown.
- Update `keyword-research.md` as each page ships.
- New claims-ledger entries needed: not-on-steam/PC-only, SQ42-console-port-hiring, starter-pack-Aurora-$45, no-CitizenCon-2026, 1.0-no-date, funding-$960M.
