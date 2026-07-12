# bestspacesim.com Polish Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert bestspacesim.com's accelerating Bing/Copilot momentum (776 AI citations through Jul 3, but only 3 pages ever cited; 0% CTR on the review/worth-it query clusters) into more cited pages and more clicks.

**Architecture:** Two new statically-rendered content pages (`/is-star-citizen-worth-it`, `/best-space-games`) built in the existing Next.js App Router style, GEO upgrades (extractable answer paragraphs + FAQPage JSON-LD) to the two existing money pages, a metadata/CTR pass, and claims-ledger + llms.txt + sitemap plumbing.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind (custom palette: deepGreen/greenMid/purple/offwhite/muted), claims ledger at `E:\Claude Code\sc-portfolio\docs\claims\`.

**Repo:** `E:\Claude Code\sc-portfolio\bestspacesim-site` (own git repo, deploys to Vercel; prod deploy auto-pings IndexNow).

## Global Constraints

- Layout title template is `%s · bestspacesim.com` (`src/app/layout.tsx:29`) — page `title` values must NOT include the site name (title-suffix doubling bug pattern).
- Cross-portfolio links go in **body copy only** — never footers or link lists (site CLAUDE.md).
- Referral code copy: `STAR-GCQJ-N6NC`; enlistment bonus is **50,000 aUEC** (ledger claim `referral-enlistment-bonus-50k-uec`).
- Factual claims: before adding/rewording any factual claim, grep `E:\Claude Code\sc-portfolio\docs\claims\*.md`; a `verified` entry is network canon. Any page that adds/changes a claim must update that claim file's `usage` list. Key claims for this plan: `funding-one-billion-may-2026`, `funding-most-crowdfunded-project`, `freefly-event-based-not-always-on`, `freefly-no-purchase-required`, `referral-enlistment-bonus-50k-uec`.
- Existing site copy says the current live build is **Alpha 4.8** — reuse that string, do not invent another version.
- Starter price: use "a starter Game Package from $45" — this matches freeflyevent.com/should-i-buy (network canon). Note `games.ts` has `priceUSD: 60` for Star Citizen; do not change it in this pass, it labels the typical RSI store bundle.
- Tone: honest, plain-English, no hype; alpha caveats stated plainly (matches existing pages).
- Every commit message follows `feat:` / `seo:` / `fix:` convention.
- No test suite exists in this repo. The verification cycle per task is: `npm run lint` + `npm run build` must pass, plus the grep checks specified in each task.
- Work on branch `feat/polish-pass` off `main`.

---

### Task 0: Branch + baseline build

**Files:** none (setup)

- [ ] **Step 1: Create branch and verify baseline**

```bash
cd "E:\Claude Code\sc-portfolio\bestspacesim-site"
git checkout main && git pull
git checkout -b feat/polish-pass
npm run build
```

Expected: build passes with existing 8 routes. If baseline build fails, STOP and report.

---

### Task 1: New page — `/is-star-citizen-worth-it`

The Bing worth-it cluster (`is star citizen worth it`, `... 2026`, `... worth playing`) shows ~25 impressions at positions 6–8.4 with 0 clicks, and Copilot already gives the site a 36.4% citation share on "is star citizen worth it" — with only the homepage to cite. This page gives that intent a dedicated, extractable target.

**Files:**
- Create: `src/app/is-star-citizen-worth-it/page.tsx`
- Modify: `src/app/sitemap.ts` (add route)
- Modify: `public/llms.txt` (add page entry)

**Interfaces:**
- Consumes: `GAMES` from `@/data/games` (field `score: 9.4` for star-citizen), `CTAButton` (`children?`, `trackingLabel?`), `SecondaryButton` (`children?`, `href?`, `external?`), `FREE_FLY_URL`/`HUB_URL` from `@/lib/links`, `BreadcrumbsJsonLd` (`items: {name, url}[]`), `PageSources` (`route: string`).
- Produces: route `/is-star-citizen-worth-it` — linked from Task 3 (/star-citizen) and Task 4 (/comparison FAQ).

- [ ] **Step 1: Create the page**

Write `src/app/is-star-citizen-worth-it/page.tsx`:

```tsx
import Link from 'next/link';
import { CTAButton } from '@/components/CTAButton';
import { SecondaryButton } from '@/components/SecondaryButton';
import { GAMES } from '@/data/games';
import { FREE_FLY_URL } from '@/lib/links';
import { BreadcrumbsJsonLd } from '@/components/BreadcrumbsJsonLd';
import { PageSources } from '@/components/PageSources';

const sc = GAMES.find((g) => g.id === 'star-citizen')!;

export const metadata = {
  title: 'Is Star Citizen Worth It in 2026? An Honest Verdict',
  description:
    'Yes — if you want a living universe and can tolerate alpha bugs. No — if you want a polished 30-hour story. Costs, who should buy, who should wait, and how to try it free.',
  alternates: { canonical: '/is-star-citizen-worth-it' },
};

const faqs = [
  {
    q: 'Is Star Citizen worth it in 2026?',
    a: 'Yes, for players who want the deepest living-universe sim available and can tolerate alpha-stage bugs. Star Citizen scores 9.4/10 in our rankings — the highest of any space sim we review — because of its seamless atmospheric flight, single-shard persistent universe, and working careers like mining, hauling, salvage, and medical rescue. It is not worth it if you want a polished, finished game: the current live build is Alpha 4.8, and server hiccups and missing quality-of-life features are part of the deal.',
  },
  {
    q: 'How much does Star Citizen cost to start?',
    a: 'A starter Game Package from $45 is the minimum purchase, and it is a one-time payment — no subscription is required to play. Signing up with a referral code (like STAR-GCQJ-N6NC) adds a 50,000 aUEC enlistment bonus to your in-game wallet.',
  },
  {
    q: 'Can I try Star Citizen for free before buying?',
    a: 'Yes. Cloud Imperium runs Free Fly events several times a year — typically around Invictus Launch Week in May and the Intergalactic Aerospace Expo in November — during which anyone with a free RSI account can play the live game at no cost, no purchase required. Between events, actual flight is gated to a Game Package purchase.',
  },
  {
    q: 'Is Star Citizen still in alpha?',
    a: 'Yes. Crowdfunding launched in October 2012 and the game has been in public alpha development since. On May 24, 2026 it crossed $1 billion raised, making it the most crowdfunded project of any kind in history. The current live build is Alpha 4.8.',
  },
  {
    q: 'Is Star Citizen worth it for solo players?',
    a: 'Partially. There is no dedicated single-player mode in the live game — Squadron 42, the story campaign, is a separate title. Solo players can run missions, mine, haul, and explore alone in the shared universe, but the game is designed around a multiplayer world. If you want a pure single-player space game, Starfield, X4: Foundations, or No Man’s Sky may suit you better.',
  },
];

const worthIt = [
  'You want a living, persistent universe over a scripted campaign',
  'You enjoy flight sims, EVE-style economies, or immersive sims',
  'You can roll with alpha bugs because the game improves every patch',
  'You have a mid-to-high-end PC',
];

const notWorthIt = [
  'You want a tight, polished 30-hour story — look at Starfield instead',
  'A crashed server or lost cargo run would ruin your week',
  'You expect every career and feature to be finished today',
  'You are on older hardware — the sim is demanding',
];

export default function WorthItPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Is Star Citizen Worth It?', url: '/is-star-citizen-worth-it' },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="mx-auto max-w-4xl px-4 pt-12 sm:px-6 sm:pt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple">
          Honest verdict · 2026
        </p>
        <h1 className="mt-3 text-balance font-display text-4xl font-semibold leading-tight text-offwhite sm:text-5xl md:text-6xl">
          Is Star Citizen worth it in 2026?
        </h1>
        <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-offwhite/85 sm:text-lg">
          <strong className="text-offwhite">Short answer: yes — if you want the deepest living
          universe in gaming and can tolerate alpha bugs; no — if you want a
          polished, finished story.</strong> Star Citizen scores {sc.score}/10 in our
          rankings, the highest of the six space sims we review. It is also,
          plainly, alpha software. This page tells you which side of that line
          you are on before you spend a dollar.
        </p>
      </section>

      <section className="mx-auto mt-12 max-w-4xl px-4 sm:px-6">
        <h2 className="font-display text-2xl font-semibold text-offwhite sm:text-3xl">
          What it actually costs
        </h2>
        <div className="mt-3 space-y-4 text-base leading-relaxed text-offwhite/85">
          <p>
            The minimum buy-in is a starter Game Package from $45 — a one-time
            purchase, no subscription. Everything flyable can eventually be
            earned in-game with aUEC, so the hundred-dollar ships on the store
            are optional pledges, not requirements. Signing up with referral
            code STAR-GCQJ-N6NC adds a 50,000 aUEC enlistment bonus — a
            meaningful starter wallet for gear, ammo, and rentals.
          </p>
          <p>
            Better yet: you may not need to spend anything to find out.
            Cloud Imperium runs Free Fly events several times a year where the
            full live game is playable on a free account —{' '}
            <a
              href={FREE_FLY_URL}
              className="text-purple hover:text-purple-dark"
            >
              freeflyevent.com tracks the next Free Fly window
            </a>{' '}
            and explains how to join one.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-4xl px-4 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-purple/40 bg-greenMid/40 p-6">
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-purple">
              Worth it if…
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-offwhite/90">
              {worthIt.map((p) => (
                <li key={p} className="flex gap-2">
                  <span aria-hidden className="text-purple">+</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-greenMid bg-greenMid/30 p-6">
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted">
              Not worth it if…
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-offwhite/85">
              {notWorthIt.map((c) => (
                <li key={c} className="flex gap-2">
                  <span aria-hidden className="text-muted">–</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-4xl px-4 sm:px-6">
        <h2 className="font-display text-2xl font-semibold text-offwhite sm:text-3xl">
          Frequently asked questions
        </h2>
        <div className="mt-4 space-y-6">
          {faqs.map((f) => (
            <article key={f.q}>
              <h3 className="font-display text-lg font-semibold text-offwhite">
                {f.q}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-offwhite/85">
                {f.a}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-4xl px-4 sm:px-6">
        <div className="rounded-3xl border border-purple/40 bg-gradient-to-br from-greenMid/80 to-deepGreen p-8 shadow-glow">
          <h2 className="font-display text-2xl font-semibold text-offwhite sm:text-3xl">
            Decided? Or still weighing it?
          </h2>
          <p className="mt-3 max-w-2xl text-offwhite/80">
            If you are in, sign up with the referral code for the 50,000 aUEC
            bonus. If you want the full breakdown first, read our{' '}
            <Link href="/star-citizen" className="text-purple hover:text-purple-dark">
              Star Citizen review
            </Link>{' '}
            or see{' '}
            <Link href="/comparison" className="text-purple hover:text-purple-dark">
              how it compares to the rest of the genre
            </Link>
            .
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <CTAButton trackingLabel="worth-it-cta">Try Star Citizen Free</CTAButton>
            <SecondaryButton>Star Citizen Beginner&apos;s Guide</SecondaryButton>
          </div>
        </div>
      </section>

      <PageSources route="/is-star-citizen-worth-it" />
    </>
  );
}
```

- [ ] **Step 2: Add route to sitemap**

In `src/app/sitemap.ts`, change the routes line:

```ts
  const routes = [
    '',
    '/comparison',
    '/star-citizen',
    '/is-star-citizen-worth-it',
    '/best-space-games',
    ...versusRoutes,
  ];
```

(Both new routes added here once — Task 2 relies on this too. Priority mapping stays as-is; new routes get 0.8 default, which is fine.)

- [ ] **Step 3: Add llms.txt entry**

In `public/llms.txt`, in the `## Pages` list after the Star Citizen Review line, add:

```
- [Is Star Citizen Worth It?](https://bestspacesim.com/is-star-citizen-worth-it): Honest 2026 verdict — who should buy, who should wait, what it costs, and how to try it free.
```

- [ ] **Step 4: Update claims ledger usage**

For each of `funding-one-billion-may-2026.md`, `funding-most-crowdfunded-project.md`, `freefly-event-based-not-always-on.md`, `freefly-no-purchase-required.md`, `referral-enlistment-bonus-50k-uec.md` in `E:\Claude Code\sc-portfolio\docs\claims\`: read the file, confirm the page copy above matches the canonical claim text (adjust page copy if the ledger wording differs — ledger wins), and add to its `usage` list:

```
- bestspacesim.com /is-star-citizen-worth-it
```

(Match the exact usage-entry format already in each file — read one first. Also grep the ledger for a starter-price claim: `grep -il "45" "E:/Claude Code/sc-portfolio/docs/claims/"*.md`. If a verified claim covers the $45 starter price, add this page to its usage; if none exists, create `starter-package-from-45-usd.md` per the ledger README format with the RSI store pledge page as source.)

- [ ] **Step 5: Verify and commit**

```bash
npm run lint && npm run build
```

Expected: build passes, route `/is-star-citizen-worth-it` appears in build output. Then:

```bash
git add src/app/is-star-citizen-worth-it src/app/sitemap.ts public/llms.txt
git commit -m "feat: dedicated /is-star-citizen-worth-it verdict page with FAQPage schema"
cd "E:\Claude Code\sc-portfolio\docs" && git add claims && git commit -m "docs(claims): bestspacesim worth-it page usage" && cd "E:\Claude Code\sc-portfolio\bestspacesim-site"
```

(Note: `docs/` is its own git repo — sc-portfolio-docs — commit claims changes there.)

---

### Task 2: New page — `/best-space-games`

"best space games" is the site's weakest AI query (7.8% citation share vs 27–36% on sim-specific queries) — the broader query has no matching page.

**Files:**
- Create: `src/app/best-space-games/page.tsx`
- Modify: `public/llms.txt` (add page entry)
- (sitemap route already added in Task 1 Step 2)

**Interfaces:**
- Consumes: `GAMES` (all six entries; fields `rank`, `title`, `score`, `tagline`, `bestFor`, `priceLabel`, `id`), `BreadcrumbsJsonLd`, `PageSources`, `CTAButton`, `SITE_URL` from `@/lib/links`.
- Produces: route `/best-space-games`, linked from Task 4's comparison FAQ.

- [ ] **Step 1: Create the page**

Write `src/app/best-space-games/page.tsx`:

```tsx
import Link from 'next/link';
import { CTAButton } from '@/components/CTAButton';
import { GAMES } from '@/data/games';
import { SITE_URL } from '@/lib/links';
import { BreadcrumbsJsonLd } from '@/components/BreadcrumbsJsonLd';
import { PageSources } from '@/components/PageSources';

export const metadata = {
  title: 'Best Space Games 2026 — 6 Titles Actually Worth Playing',
  description:
    'The best space games of 2026, ranked: Star Citizen (9.4), Elite Dangerous, No Man’s Sky, EVE Online, X4, and Starfield — with an honest one-line verdict for each.',
  alternates: { canonical: '/best-space-games' },
};

const ranked = [...GAMES].sort((a, b) => a.rank - b.rank);

const faqs = [
  {
    q: 'What is the best space game in 2026?',
    a: 'Star Citizen is our top pick at 9.4/10 for players who want a persistent living universe with seamless planet-to-space flight — with the caveat that it is still in alpha. If you want a finished game instead, Elite Dangerous (8.2/10) is the strongest complete space sim, and No Man’s Sky is the best relaxed pick.',
  },
  {
    q: 'What is the best free space game?',
    a: 'None of our top six is fully free-to-play, but Star Citizen is free during its periodic Free Fly events — no purchase required, just a free RSI account. That makes it the best way to play a AAA-scale space game for $0, when an event window is open.',
  },
  {
    q: 'What is the best single-player space game?',
    a: 'For story, Starfield. For empire-building depth, X4: Foundations. For chill exploration, No Man’s Sky. Star Citizen and EVE Online are multiplayer-first and not built around a solo campaign.',
  },
  {
    q: 'Are space sims hard to learn?',
    a: 'The deep ones are. Star Citizen, EVE Online, and X4 all have steep learning curves; Elite Dangerous is moderate; No Man’s Sky and Starfield are the most approachable. Our comparison table scores each game so you can match depth to your patience.',
  },
];

export default function BestSpaceGamesPage() {
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: ranked.length,
    itemListElement: ranked.map((g) => ({
      '@type': 'ListItem',
      position: g.rank,
      name: g.title,
      url:
        g.id === 'star-citizen'
          ? `${SITE_URL}/star-citizen`
          : `${SITE_URL}/star-citizen-vs/${g.id}`,
    })),
  };
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Best Space Games', url: '/best-space-games' },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="mx-auto max-w-4xl px-4 pt-12 sm:px-6 sm:pt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple">
          Ranked · 2026
        </p>
        <h1 className="mt-3 text-balance font-display text-4xl font-semibold leading-tight text-offwhite sm:text-5xl md:text-6xl">
          The best space games in 2026
        </h1>
        <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-offwhite/85 sm:text-lg">
          The best space game in 2026 is <strong className="text-offwhite">Star
          Citizen</strong> for players who want a living universe, <strong className="text-offwhite">Elite
          Dangerous</strong> for pure flight, and <strong className="text-offwhite">No
          Man&apos;s Sky</strong> for relaxed exploration. Here are the six titles
          actually worth your time, ranked — each with an honest one-line
          verdict and what it really costs.
        </p>
      </section>

      <section className="mx-auto mt-12 max-w-4xl px-4 sm:px-6">
        <ol className="space-y-6">
          {ranked.map((g) => (
            <li
              key={g.id}
              className="rounded-2xl border border-greenMid bg-greenMid/30 p-6"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className="font-display text-2xl font-semibold text-offwhite">
                  {g.rank}. {g.title}
                </h2>
                <span className="text-sm font-semibold text-purple">
                  {g.score}/10
                </span>
              </div>
              <p className="mt-2 text-base leading-relaxed text-offwhite/85">
                {g.tagline}
              </p>
              <p className="mt-2 text-sm text-offwhite/70">
                <strong className="text-offwhite/90">Best for:</strong> {g.bestFor}
              </p>
              <p className="mt-1 text-sm text-muted">{g.priceLabel}</p>
              <p className="mt-3 text-sm">
                {g.id === 'star-citizen' ? (
                  <Link
                    href="/star-citizen"
                    className="text-purple hover:text-purple-dark"
                  >
                    Read the full Star Citizen review →
                  </Link>
                ) : (
                  <Link
                    href={`/star-citizen-vs/${g.id}`}
                    className="text-purple hover:text-purple-dark"
                  >
                    Star Citizen vs {g.title} →
                  </Link>
                )}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto mt-12 max-w-4xl px-4 sm:px-6">
        <h2 className="font-display text-2xl font-semibold text-offwhite sm:text-3xl">
          Frequently asked questions
        </h2>
        <div className="mt-4 space-y-6">
          {faqs.map((f) => (
            <article key={f.q}>
              <h3 className="font-display text-lg font-semibold text-offwhite">
                {f.q}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-offwhite/85">
                {f.a}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-4xl px-4 pb-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-4">
          <CTAButton trackingLabel="best-space-games-cta" />
          <Link href="/comparison" className="text-sm text-purple hover:text-purple-dark">
            Or filter the full comparison table →
          </Link>
        </div>
      </section>

      <PageSources route="/best-space-games" />
    </>
  );
}
```

- [ ] **Step 2: Add llms.txt entry**

In `public/llms.txt` `## Pages` list, after the Comparison Table line, add:

```
- [Best Space Games 2026](https://bestspacesim.com/best-space-games): Ranked list of the six space games worth playing, with honest verdicts and prices.
```

- [ ] **Step 3: Update claims ledger usage**

The Free Fly FAQ reuses `freefly-event-based-not-always-on` and `freefly-no-purchase-required` — add `- bestspacesim.com /best-space-games` to each file's usage list (docs repo).

- [ ] **Step 4: Verify and commit**

```bash
npm run lint && npm run build
```

Expected: `/best-space-games` in build output. Then:

```bash
git add src/app/best-space-games public/llms.txt
git commit -m "feat: /best-space-games ranked page targeting broader space-games queries"
cd "E:\Claude Code\sc-portfolio\docs" && git add claims && git commit -m "docs(claims): bestspacesim best-space-games usage" && cd "E:\Claude Code\sc-portfolio\bestspacesim-site"
```

---

### Task 3: Upgrade `/star-citizen` review page (GEO + intent split + link fixes)

The review cluster ("star citizen review", "... 2026") sits at positions 3–8.8 with 0 clicks. This page now focuses its title on the review intent (the new Task 1 page owns worth-it), gains an extractable verdict paragraph + FAQ schema, and fixes a duplicated footer paragraph by replacing it with the freeflyevent.com editorial link the site CLAUDE.md requires.

**Files:**
- Modify: `src/app/star-citizen/page.tsx`

**Interfaces:**
- Consumes: route `/is-star-citizen-worth-it` from Task 1.
- Produces: nothing downstream.

- [ ] **Step 1: Retitle metadata toward review intent**

In `src/app/star-citizen/page.tsx:13-18`, replace the metadata:

```tsx
export const metadata = {
  title: 'Star Citizen Review 2026 — Scored 9.4/10, Alpha Caveats Included',
  description:
    'Our full Star Citizen review for 2026: what the simulation actually does, what is still rough, who it is for — scored 9.4/10, with every alpha caveat stated plainly.',
  alternates: { canonical: '/star-citizen' },
};
```

- [ ] **Step 2: Add extractable verdict paragraph**

Immediately after the `<h1>` block's closing `</h1>` (line 98), replace the existing intro `<p className="mt-5 ...">…</p>` (lines 99–104) with:

```tsx
        <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-offwhite/80 sm:text-lg">
          <strong className="text-offwhite">Verdict: 9.4/10.</strong> Star
          Citizen is the deepest living-universe space sim available in 2026 —
          seamless planet-to-space flight, a single-shard persistent world, and
          careers that do real work — and it is still alpha software with the
          bugs to match. This review covers what it actually does, what is
          rough, and who it is for.{' '}
          <Link
            href="/is-star-citizen-worth-it"
            className="text-purple hover:text-purple-dark"
          >
            Want the short worth-it answer? Start here →
          </Link>
        </p>
```

- [ ] **Step 3: Add FAQ section + FAQPage JSON-LD**

Add a `faqs` array after the `sections` array (after line 56):

```tsx
const faqs = [
  {
    q: 'Is Star Citizen worth it in 2026?',
    a: 'Yes for players who want a living universe and can tolerate alpha bugs; no for players who want a polished, finished story. We score it 9.4/10 — the highest of the six space sims we rank — with the alpha caveats stated plainly in this review.',
  },
  {
    q: 'Is Star Citizen pay-to-win?',
    a: 'Ships bought with real money are also earnable in-game with aUEC, and skill matters more than hull size in most encounters. The store sells time, not exclusive power — though the line is a fair debate in the community.',
  },
  {
    q: 'Can I play Star Citizen for free?',
    a: 'During a Free Fly event, yes — anyone with a free RSI account can play the live game at no cost. Cloud Imperium runs these several times a year, typically around Invictus in May and IAE in November.',
  },
];
```

In the component body, add the JSON-LD object after `reviewJsonLd` (after line 77):

```tsx
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
```

Add a second script tag right after the existing `reviewJsonLd` script (line 87–90):

```tsx
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
```

And render the FAQ section between the Strengths/Caveats section (ends line 170) and the dual-CTA section (starts line 172):

```tsx
      <section className="mx-auto mt-12 max-w-4xl px-4 sm:px-6">
        <h2 className="font-display text-2xl font-semibold text-offwhite sm:text-3xl">
          Frequently asked questions
        </h2>
        <div className="mt-4 space-y-6">
          {faqs.map((f) => (
            <article key={f.q}>
              <h3 className="font-display text-lg font-semibold text-offwhite">
                {f.q}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-offwhite/85">
                {f.a}
              </p>
            </article>
          ))}
        </div>
      </section>
```

- [ ] **Step 4: Fix the duplicated footer paragraph → freeflyevent editorial link**

The page's closing section (lines 214–245) has two near-duplicate dayonecitizen paragraphs ("Looking for the next Free Fly event? Check dayonecitizen.com…" and "Heading to dayonecitizen.com for the beginner network instead."). Replace BOTH with one dayonecitizen line and one freeflyevent line. The whole section becomes:

```tsx
      <section className="mx-auto mt-12 max-w-4xl px-4 pb-4 text-sm text-muted sm:px-6">
        <p>
          Want to compare Star Citizen against the rest of the genre?{' '}
          <Link href="/comparison" className="text-purple hover:text-purple-dark">
            See the full feature-by-feature comparison →
          </Link>
        </p>
        <p className="mt-2">
          Want to try it before you buy?{' '}
          <a
            href={FREE_FLY_URL}
            className="text-purple hover:text-purple-dark"
          >
            freeflyevent.com
          </a>{' '}
          tracks the next Free Fly window, when the live game is playable free.
        </p>
        <p className="mt-2">
          Brand new to the game?{' '}
          <a
            href={HUB_URL}
            target="_blank"
            rel="noreferrer"
            className="text-purple hover:text-purple-dark"
          >
            dayonecitizen.com
          </a>{' '}
          walks you through your first hour in plain English.
        </p>
      </section>
```

Update the import on line 7 to include FREE_FLY_URL:

```tsx
import { HUB_URL, FREE_FLY_URL } from '@/lib/links';
```

- [ ] **Step 5: Verify and commit**

```bash
npm run lint && npm run build
grep -c "FAQPage" src/app/star-citizen/page.tsx
```

Expected: build passes; grep returns 1. Then:

```bash
git add src/app/star-citizen/page.tsx
git commit -m "seo: star-citizen review — verdict paragraph, FAQPage schema, freeflyevent cross-link"
```

---

### Task 4: Upgrade `/comparison` for GEO (static extractable content)

/comparison has 4 citations ever — because its content lives inside the client-side `ComparisonExplorer` and is invisible to AI crawlers. Add server-rendered extractable prose + FAQ around the explorer.

**Files:**
- Modify: `src/app/comparison/page.tsx`

**Interfaces:**
- Consumes: `GAMES` (fields `rank`, `title`, `score`, `tagline`, `priceLabel`), routes `/is-star-citizen-worth-it` (Task 1) and `/best-space-games` (Task 2), `PageSources`.
- Produces: nothing downstream.

- [ ] **Step 1: Add an "At a glance" static section**

In `src/app/comparison/page.tsx`, after the `<ComparisonExplorer>` section (ends line 44), insert:

```tsx
      <section className="mx-auto mt-14 max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-2xl font-semibold text-offwhite sm:text-3xl">
          Every space sim at a glance
        </h2>
        <ol className="mt-5 space-y-3">
          {[...GAMES]
            .sort((a, b) => a.rank - b.rank)
            .map((g) => (
              <li key={g.id} className="text-base leading-relaxed text-offwhite/85">
                <strong className="text-offwhite">
                  {g.rank}. {g.title} ({g.score}/10)
                </strong>{' '}
                — {g.tagline} <span className="text-muted">({g.priceLabel})</span>
              </li>
            ))}
        </ol>
      </section>
```

- [ ] **Step 2: Add FAQ + FAQPage JSON-LD + PageSources**

Add a `faqs` array after the metadata block (after line 13):

```tsx
const faqs = [
  {
    q: 'Which space sim is best overall in 2026?',
    a: 'Star Citizen (9.4/10) tops our rankings for players who want a persistent living universe, with the caveat that it is alpha software. Elite Dangerous (8.2/10) is the strongest finished space sim.',
  },
  {
    q: 'Which space sim can I try for free?',
    a: 'Star Citizen is free during its periodic Free Fly events — no purchase required, just a free RSI account. The other games on this list are paid, though several see frequent Steam sales.',
  },
  {
    q: 'Which space sim is best for single-player?',
    a: 'X4: Foundations for empire-building depth, Starfield for story, No Man’s Sky for relaxed exploration. Star Citizen and EVE Online are multiplayer-first.',
  },
];
```

In the component, before `return`, add:

```tsx
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
```

Render the JSON-LD script right after `<BreadcrumbsJsonLd …/>`:

```tsx
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
```

Render the FAQ section after the "Popular head-to-head matchups" section (ends line 64), and close with PageSources:

```tsx
      <section className="mx-auto mt-14 max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-2xl font-semibold text-offwhite sm:text-3xl">
          Frequently asked questions
        </h2>
        <div className="mt-4 space-y-6">
          {faqs.map((f) => (
            <article key={f.q}>
              <h3 className="font-display text-lg font-semibold text-offwhite">
                {f.q}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-offwhite/85">
                {f.a}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted">
          Deciding on Star Citizen specifically?{' '}
          <Link
            href="/is-star-citizen-worth-it"
            className="text-purple hover:text-purple-dark"
          >
            Read the honest worth-it verdict →
          </Link>{' '}
          Or see the{' '}
          <Link href="/best-space-games" className="text-purple hover:text-purple-dark">
            full ranked list of the best space games →
          </Link>
        </p>
      </section>

      <PageSources route="/comparison" />
```

Add the import at the top:

```tsx
import { PageSources } from '@/components/PageSources';
```

- [ ] **Step 3: Sharpen metadata for CTR**

Replace the metadata block (lines 8–13):

```tsx
export const metadata = {
  title: 'Space Sim Comparison 2026 — 6 Games Scored Side by Side',
  description:
    'Star Citizen vs Elite Dangerous vs No Man’s Sky vs EVE, X4 & Starfield — scored side by side. Filter by multiplayer, free-to-try, and price to find your game.',
  alternates: { canonical: '/comparison' },
};
```

- [ ] **Step 4: Verify and commit**

```bash
npm run lint && npm run build
```

Expected: build passes. Then:

```bash
git add src/app/comparison/page.tsx
git commit -m "seo: comparison page — static at-a-glance list, FAQPage schema, sources"
```

---

### Task 5: Regenerate sources manifest + full verification

**Files:**
- Modify (generated): `src/data/page-sources.generated.json`

**Interfaces:**
- Consumes: claims-ledger usage entries from Tasks 1–2; `docs/claims/gen-sources.mjs`.
- Produces: manifest entries so `PageSources` renders on the new routes.

- [ ] **Step 1: Regenerate the manifest**

```bash
node "E:\Claude Code\sc-portfolio\docs\claims\gen-sources.mjs"
```

(Check the script's usage header first — it may take a site/domain argument or regenerate all sites at once. Regenerate whatever covers bestspacesim.com.)

- [ ] **Step 2: Verify new routes appear in the manifest**

```bash
node -e "const j=require('E:/Claude Code/sc-portfolio/bestspacesim-site/src/data/page-sources.generated.json'); console.log(Object.keys(j.routes))"
```

Expected: includes `/is-star-citizen-worth-it` and `/best-space-games` (and `/comparison` only if comparison-page copy claims were registered — comparison uses scores/opinions, so it may legitimately be absent and `PageSources` renders nothing there; that is acceptable).

- [ ] **Step 3: Full build + route check**

```bash
npm run lint && npm run build
```

Expected: 10 routes including both new pages; zero lint errors (watch for the known network pitfall: a lint `any` freezes Vercel deploys).

- [ ] **Step 4: Commit**

```bash
git add src/data/page-sources.generated.json
git commit -m "chore: regenerate page-sources manifest for new routes"
```

---

### Task 6: Fact-check gate + ship

**Files:** none new.

- [ ] **Step 1: Fact-check the new copy**

Dispatch the `sc-fact-check` agent on the two new pages' copy (paste the faqs + body paragraphs of `/is-star-citizen-worth-it` and `/best-space-games`). Remember the network rule: absence of a source is not refutation — require a web-search before any ❌ verdict. Fix any flagged copy and update ledger usage if wording changes.

- [ ] **Step 2: Push branch and merge**

```bash
git push -u origin feat/polish-pass
```

Then merge to `main` (direct merge is this repo's norm; open a PR instead if the diff wants review):

```bash
git checkout main && git merge --no-ff feat/polish-pass && git push origin main
```

Vercel deploys prod on push; IndexNow pings Bing automatically on prod deploy.

- [ ] **Step 3: Post-deploy verification**

- `curl -s https://bestspacesim.com/is-star-citizen-worth-it | grep -o 'FAQPage'` → non-empty
- `curl -s https://bestspacesim.com/best-space-games | grep -o 'ItemList'` → non-empty
- `curl -s https://bestspacesim.com/sitemap.xml | grep -c 'is-star-citizen-worth-it\|best-space-games'` → 2
- `curl -s https://bestspacesim.com/llms.txt | grep -c 'worth-it\|best-space-games'` → ≥2

- [ ] **Step 4: Measurement note**

Log in the session memory: recheck BWT Search Performance + AI Performance for bestspacesim.com in ~2–3 weeks (≈July 21–25). Success criteria: cited-pages count rises above 3; worth-it/review clusters gain CTR > 0; "best space games" citation share rises from 7.8%.

---

## Deliberate scope exclusions (do NOT do in this pass)

- No homepage title change — it already ranks position 2.6 on its money query; don't disturb it.
- No NavBar changes — new pages are reachable via body links, sitemap, and llms.txt; nav stays minimal.
- No `games.ts` price/score edits.
- No new versus pages.
