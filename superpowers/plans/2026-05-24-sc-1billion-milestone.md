# SC $1 Billion Milestone Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the SC portfolio to celebrate Star Citizen crossing $1 billion raised on May 24, 2026 — updating all stale figures, adding a homepage milestone callout, rewriting the story page ending, creating a new `/billion` visual showcase page, and patching two cross-portfolio sites.

**Architecture:** fundedgame-site is Next.js 14 App Router with TypeScript + Tailwind. Data lives in `src/data/milestones.ts` (single source of truth for funding figures). New `/billion` page is a standard App Router route at `src/app/billion/page.tsx`. The animated counter is extracted into a `'use client'` component. Cross-portfolio patches are single-line copy changes.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, React (client components for animation only)

---

## File Map

**fundedgame-site — Modify:**
- `src/data/milestones.ts` — data source of truth (funding figures + HEADLINE_STATS)
- `src/app/layout.tsx` — global metadata, JSON-LD structured data
- `src/app/page.tsx` — homepage hero copy + new milestone callout section
- `src/app/the-story/page.tsx` — metadata + final chapter rewrite
- `src/app/sitemap.ts` — add `/billion` route

**fundedgame-site — Create:**
- `src/components/BillionCounter.tsx` — animated number counter (client component)
- `src/app/billion/page.tsx` — new milestone showcase page

**Cross-portfolio — Modify:**
- `dayonecitizen-main/src/app/page.tsx:57` — `$700 million` → `$1 billion`
- `bestspacesim-site/src/app/star-citizen/page.tsx:23` — vague funding language → specific $1B claim

---

## Task 1: Update milestones.ts — data source of truth

**Files:**
- Modify: `fundedgame-site/src/data/milestones.ts`

- [ ] **Step 1: Open the file and replace the 2026 milestone row**

Current content to replace (lines 28–29):
```ts
  { year: 2026, amount: 967, label: '$967M (April 2026)', note: 'Closing on $1B. No other crowdfunded project in any category comes close.' },
```

Replace with:
```ts
  { year: 2026, amount: 1000, label: '$1 Billion Crossed', note: 'On May 24, 2026, the Anvil Odin — the largest ship in the game and the last concept ship ever announced — pushed Star Citizen past one billion dollars raised. The first crowdfunded project of any kind to reach this milestone.' },
```

- [ ] **Step 2: Replace HEADLINE_STATS**

Replace the entire `HEADLINE_STATS` export (lines 31–52) with:
```ts
export const HEADLINE_STATS = [
  {
    value: '$1B+',
    label: 'Raised from backers',
    sub: 'Crossed $1,000,000,000 on May 24, 2026',
  },
  {
    value: '6.5M+',
    label: 'Individual backers',
    sub: 'More than the population of Denmark',
  },
  {
    value: '14 yrs',
    label: 'In active development',
    sub: 'Since the 2012 Kickstarter that started it all',
  },
  {
    value: '#1',
    label: 'Crowdfunded project ever',
    sub: 'By a margin that almost looks like a typo',
  },
];
```

- [ ] **Step 3: Verify the file compiles**

```bash
cd "E:\Claude Code\sc-portfolio\fundedgame-site"
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
cd "E:\Claude Code\sc-portfolio\fundedgame-site"
git add src/data/milestones.ts
git commit -m "feat: update milestones data to $1B crossed — May 24, 2026"
```

---

## Task 2: Update layout.tsx — global metadata and JSON-LD

**Files:**
- Modify: `fundedgame-site/src/app/layout.tsx`

There are five stale references in this file (lines 31, 52, 60, 62, 67, 69).

- [ ] **Step 1: Update the JSON-LD description (line 31)**

Find:
```ts
      description:
        'Star Citizen is the highest-funded crowdfunding project in history, having raised over $700M from its passionate community.',
```

Replace with:
```ts
      description:
        'Star Citizen is the highest-funded crowdfunding project in history, having raised over $1 billion from its passionate community.',
```

- [ ] **Step 2: Update the default metadata description (line 52)**

Find:
```ts
    'Star Citizen has raised nearly $1 billion from 6.4 million backers — making it the most crowdfunded project in history. See the full funding record, year by year.',
```

Replace with:
```ts
    'Star Citizen crossed $1 billion raised on May 24, 2026 — making it the most crowdfunded project in history. See the full funding record, year by year.',
```

- [ ] **Step 3: Update OpenGraph title and description (lines 60–62)**

Find:
```ts
      title:
        'Star Citizen Has Raised $967M+ — The Highest-Funded Game in History',
      description:
        '$967M raised. 6.4M backers. No other crowdfunded project — game or otherwise — comes close. Here is the record.',
```

Replace with:
```ts
      title:
        'Star Citizen Just Crossed $1 Billion — The Highest-Funded Game in History',
      description:
        '$1 billion raised. 6.5M backers. No other crowdfunded project — game or otherwise — comes close. Here is the record.',
```

- [ ] **Step 4: Update Twitter title and description (lines 67–69)**

Find:
```ts
      title: 'Star Citizen: $967M+ Raised — The Highest-Funded Game Ever',
      description:
        'Star Citizen has raised nearly $1 billion from 6.4 million backers. The full crowdfunding record, year by year.',
```

Replace with:
```ts
      title: 'Star Citizen: $1 Billion Raised — The Most Funded Game Ever',
      description:
        'Star Citizen crossed $1 billion raised on May 24, 2026. The full crowdfunding record, year by year.',
```

- [ ] **Step 5: Verify no TypeScript errors**

```bash
cd "E:\Claude Code\sc-portfolio\fundedgame-site"
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/app/layout.tsx
git commit -m "seo: update global metadata to reflect $1B milestone"
```

---

## Task 3: Update page.tsx — homepage hero copy + milestone callout

**Files:**
- Modify: `fundedgame-site/src/app/page.tsx`

- [ ] **Step 1: Update hero body copy**

Find (lines 27–34):
```tsx
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-silver md:text-lg">
            Nearly <strong className="text-silverBright">$1 billion</strong>{' '}
            raised from more than{' '}
            <strong className="text-silverBright">6 million backers</strong>.
            One ambitious space sim that quietly broke every crowdfunding
            record in human history. This is the story of{' '}
            <em>Star Citizen</em>.
          </p>
```

Replace with:
```tsx
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-silver md:text-lg">
            Over <strong className="text-silverBright">$1 billion</strong>{' '}
            raised from more than{' '}
            <strong className="text-silverBright">6.5 million backers</strong>.
            One ambitious space sim that quietly broke every crowdfunding
            record in human history. This is the story of{' '}
            <em>Star Citizen</em>.
          </p>
```

- [ ] **Step 2: Add the milestone callout section**

Find the comment `{/* BY THE NUMBERS */}` (line 44). Insert the following block immediately before it (between the closing `</HeroCarousel>` tag and the `{/* BY THE NUMBERS */}` comment):

```tsx
      {/* $1B MILESTONE CALLOUT */}
      <section className="relative border-b border-red/20 bg-crimson px-6 py-16 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-red/40 bg-red/10 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-red">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red" />
            May 24, 2026 — It happened
          </div>
          <div className="mt-6 font-display text-6xl font-semibold leading-none tracking-tight text-silverBright md:text-8xl lg:text-[9rem]">
            $1,000,000,000
          </div>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-silver md:text-lg">
            The Anvil Odin — the largest ship in the game, and the last
            concept ship ever announced — crossed the line. Star Citizen is
            now the only crowdfunded project in any category to raise one
            billion dollars.
          </p>
          <Link
            href="/billion"
            className="mt-6 inline-block text-sm text-red underline hover:opacity-80"
          >
            The full story of how $1 billion happened →
          </Link>
        </div>
      </section>

```

- [ ] **Step 3: Verify dev server renders the new section**

```bash
cd "E:\Claude Code\sc-portfolio\fundedgame-site"
npm run dev
```

Open `http://localhost:3000` in a browser. Confirm:
- Hero says "Over $1 billion" and "6.5 million backers"
- A new dark section appears below the carousel with `$1,000,000,000` in large type
- "The full story of how $1 billion happened →" links to `/billion` (404 is fine at this stage)

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: update homepage hero copy and add $1B milestone callout section"
```

---

## Task 4: Update the-story/page.tsx — metadata + final chapter

**Files:**
- Modify: `fundedgame-site/src/app/the-story/page.tsx`

- [ ] **Step 1: Update page metadata**

Find (lines 10–26):
```ts
export const metadata: Metadata = {
  title: 'How Star Citizen Raised $967M — The Full Crowdfunding Story',
  description:
    'Star Citizen asked for $500,000 in 2012. By 2026 it had raised $967M from 6.4 million backers. The complete year-by-year crowdfunding story.',
  alternates: { canonical: '/the-story' },
  openGraph: {
    title: 'How Star Citizen Raised $967M — The Full Crowdfunding Story',
    description:
      'From a $500K Kickstarter to $967M raised. The complete year-by-year story of the most crowdfunded project in history.',
    images: ['/images/hero/hero-04.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Star Citizen Raised $967M — The Full Crowdfunding Story',
    description:
      'From a $500K Kickstarter to $967M raised. The complete year-by-year story of the most crowdfunded project in history.',
  },
};
```

Replace with:
```ts
export const metadata: Metadata = {
  title: 'How Star Citizen Raised $1 Billion — The Full Crowdfunding Story',
  description:
    'Star Citizen asked for $500,000 in 2012. On May 24, 2026, it crossed $1 billion raised from 6.5 million backers. The complete year-by-year crowdfunding story.',
  alternates: { canonical: '/the-story' },
  openGraph: {
    title: 'How Star Citizen Raised $1 Billion — The Full Crowdfunding Story',
    description:
      'From a $500K Kickstarter to $1 billion raised. The complete year-by-year story of the most crowdfunded project in history.',
    images: ['/images/hero/hero-04.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Star Citizen Raised $1 Billion — The Full Crowdfunding Story',
    description:
      'From a $500K Kickstarter to $1 billion raised. The complete year-by-year story of the most crowdfunded project in history.',
  },
};
```

- [ ] **Step 2: Update the intro paragraph**

Find (lines 57–63):
```tsx
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-silver md:text-lg">
            In October 2012, a former game designer named Chris Roberts asked
            the internet for half a million dollars. Fourteen years later,
            more than 6.4 million people have contributed nearly a billion
            dollars to the project he was pitching — outpacing every other
            crowdfunded campaign on record by a margin that almost looks like
            a typo.
          </p>
```

Replace with:
```tsx
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-silver md:text-lg">
            In October 2012, a former game designer named Chris Roberts asked
            the internet for half a million dollars. Fourteen years later,
            more than 6.5 million people have contributed over one billion
            dollars to the project he was pitching — outpacing every other
            crowdfunded campaign on record by a margin that almost looks like
            a typo.
          </p>
```

- [ ] **Step 3: Rewrite the final chapter**

Find the `{/* NARRATIVE — Most funded ever */}` section (lines 185–215) and replace the entire `<Chapter>` block with:

```tsx
      {/* NARRATIVE — One Billion */}
      <Chapter
        eyebrow="2023 — 2026"
        title="One billion dollars."
      >
        <p>
          In 2023, RSI announced the Pyro star system, the project&rsquo;s
          first major addition outside Stanton. The reveal kicked off another
          wave of pledges. By 2024, Star Citizen had crossed $700 million in
          total crowdfunding. By early 2026, that number stood past $967
          million — and the community knew what was coming.
        </p>
        <p>
          On May 24, 2026, it happened. The Anvil Odin — the largest ship
          ever conceived for Star Citizen, and the last concept ship CIG ever
          announced — sold enough units to push the cumulative total past
          $1,000,000,000. No other crowdfunded project in any category, game
          or otherwise, has reached that number. Star Citizen isn&rsquo;t
          just the most funded game ever made; it&rsquo;s the most funded
          crowdfunded project of any kind, full stop, and now by a margin
          that crosses a threshold most people assumed no crowdfunding
          campaign would ever reach.
        </p>
        <p>
          The game is still in development. The promise — a single, seamless,
          shared universe spanning multiple star systems — is still being
          built one patch at a time. Every milestone year on the chart above
          represents not just dollars raised, but a fanbase that decided,
          again, that the project was worth funding for one more year.
        </p>
      </Chapter>
```

- [ ] **Step 4: Check dev server — /the-story**

With `npm run dev` still running, open `http://localhost:3000/the-story`. Confirm:
- Final chapter heading reads "One billion dollars."
- Body text references "May 24, 2026" and "Anvil Odin"
- No "within striking distance" language remains

- [ ] **Step 5: Commit**

```bash
git add src/app/the-story/page.tsx
git commit -m "feat: update story page to celebrate $1B milestone and Anvil Odin"
```

---

## Task 5: Create BillionCounter.tsx — animated number component

**Files:**
- Create: `fundedgame-site/src/components/BillionCounter.tsx`

- [ ] **Step 1: Create the component**

Create `src/components/BillionCounter.tsx` with this content:

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  target: number;
  duration?: number;
  className?: string;
};

export function BillionCounter({ target, duration = 2000, className }: Props) {
  const start = target - 2_000_000;
  const [count, setCount] = useState(start);
  const rafRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const range = target - start;

    const step = (timestamp: number) => {
      if (startTimeRef.current === undefined) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(start + range * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, start]);

  return (
    <span className={className} suppressHydrationWarning>
      ${count.toLocaleString('en-US')}
    </span>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd "E:\Claude Code\sc-portfolio\fundedgame-site"
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/BillionCounter.tsx
git commit -m "feat: add BillionCounter animated number component"
```

---

## Task 6: Create /billion page — visual showcase

**Files:**
- Create: `fundedgame-site/src/app/billion/page.tsx`

**Before writing:** look up the next-largest crowdfunded video game to fill the comparison stat accurately. A reliable source: search "largest crowdfunded video games history" — the Shenmue III Kickstarter raised ~$7.2M in 2015, which is widely cited as one of the highest outside Star Citizen. Use `~$10M or less` as a safe conservative figure if you can't verify a specific game.

- [ ] **Step 1: Create the page file**

Create `src/app/billion/page.tsx` with this content:

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { BillionCounter } from '@/components/BillionCounter';
import { CTAButton } from '@/components/CTAButton';
import { Footer } from '@/components/Footer';
import { FundingMilestoneChart } from '@/components/FundingMilestoneChart';
import { SecondaryButton } from '@/components/SecondaryButton';
import { StatCard } from '@/components/StatCard';

export const metadata: Metadata = {
  title: 'Star Citizen Just Hit $1 Billion — The Most Crowdfunded Project in History',
  description:
    'On May 24, 2026, Star Citizen crossed one billion dollars raised from 6.5 million backers. The Anvil Odin — the largest ship in the game — pushed it over the line.',
  alternates: { canonical: '/billion' },
  openGraph: {
    title: 'Star Citizen Just Hit $1 Billion — The Most Crowdfunded Project in History',
    description:
      'On May 24, 2026, Star Citizen crossed one billion dollars raised. The Anvil Odin — the largest ship in the game — pushed it over the line.',
    images: ['/images/hero/hero-01.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Star Citizen Just Hit $1 Billion',
    description:
      'The most crowdfunded project in history just crossed a new threshold. Here\'s the story.',
  },
};

const LIVE_TOTAL = 1_000_012_999;
const LIVE_BACKERS = 6_543_109;

const COMPARISON_STATS = [
  {
    value: '$1B+',
    label: 'Star Citizen raised',
    sub: `From ${LIVE_BACKERS.toLocaleString('en-US')} individual backers`,
  },
  {
    value: '~$10M',
    label: 'Next-largest crowdfunded game',
    sub: 'Star Citizen raised roughly 100× more than the next gaming campaign',
  },
  {
    value: '$100–200M',
    label: 'Typical AAA game budget',
    sub: 'Star Citizen raised 5–10× a major studio budget through crowdfunding alone',
  },
];

export default function BillionPage() {
  return (
    <main className="relative">
      {/* HERO — THE NUMBER */}
      <section className="relative overflow-hidden border-b border-red/10 bg-crimson px-6 pb-28 pt-24 text-center md:pt-36">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(204,34,0,0.18),transparent_65%)]"
        />
        <div className="relative mx-auto max-w-5xl">
          <Link
            href="/"
            className="text-xs uppercase tracking-[0.25em] text-silver/70 hover:text-silverBright"
          >
            ← The full story
          </Link>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-red/40 bg-red/10 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-red">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red" />
            May 24, 2026
          </div>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight text-silverBright md:text-6xl">
            Star Citizen crossed
            <br />
            one billion dollars.
          </h1>
          <div className="mt-8 font-display text-[4rem] font-semibold leading-none tracking-tight text-silverBright drop-shadow-[0_2px_40px_rgba(204,34,0,0.4)] md:text-[6rem] lg:text-[8rem]">
            <BillionCounter target={LIVE_TOTAL} duration={2200} />
          </div>
          <p className="mt-6 text-base text-silver md:text-lg">
            Raised by{' '}
            <strong className="text-silverBright">
              {LIVE_BACKERS.toLocaleString('en-US')} backers
            </strong>{' '}
            — the first crowdfunded project of any kind to reach this
            milestone.
          </p>
        </div>
      </section>

      {/* THE SHIP THAT CROSSED THE LINE */}
      <section className="relative border-b border-red/10 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="order-2 md:order-1">
              <div className="text-xs uppercase tracking-[0.3em] text-red">
                The ship that crossed the line
              </div>
              <h2 className="mt-3 font-display text-4xl leading-tight text-silverBright md:text-5xl">
                Anvil Odin.
              </h2>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-silver md:text-lg">
                <p>
                  The Anvil Odin is the largest ship ever conceived for Star
                  Citizen — a capital-class vessel that dwarfs everything
                  previously in the game. It is also the last concept ship
                  Cloud Imperium will ever announce. With the Odin, CIG closed
                  the concept ship era that began with the original Kickstarter
                  campaign fourteen years ago.
                </p>
                <p>
                  The sale of the Anvil Odin in May 2026 generated enough
                  pledges to push the cumulative funding total past
                  $1,000,000,000. The largest ship in the game crossed the
                  largest milestone in crowdfunding history. It is an unlikely
                  kind of poetry.
                </p>
                <p>
                  For the backers who have been funding this project since
                  2012, the moment lands differently than a round number. It
                  is confirmation that what they were paying for — a seamless,
                  shared, living universe — was worth building. The funding
                  did not stop. It never really did.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="overflow-hidden rounded-2xl border border-red/15 bg-crimsonMid/40">
                <img
                  src="/images/hero/hero-06.jpg"
                  alt="Anvil Odin — Star Citizen's largest ship and the last concept ship ever announced"
                  className="h-80 w-full object-cover opacity-80 md:h-96"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IN CONTEXT — COMPARISON STATS */}
      <section className="relative border-b border-red/10 bg-crimsonMid/30 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-[0.3em] text-red">
              In context
            </div>
            <h2 className="mt-3 font-display text-4xl text-silverBright md:text-5xl">
              What $1 billion actually means.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-silver md:text-lg">
              Crowdfunding a billion dollars has never been done. Here is the
              scale of it.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {COMPARISON_STATS.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* THE ARC — FUNDING CHART */}
      <section className="relative px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-red/15 bg-crimsonMid/30 p-6 md:p-10">
            <div className="flex flex-col items-baseline justify-between gap-2 md:flex-row">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-red">
                  The arc
                </div>
                <h2 className="mt-2 font-display text-3xl text-silverBright md:text-4xl">
                  14 years to $1 billion.
                </h2>
              </div>
              <Link
                href="/the-story"
                className="text-sm text-silver hover:text-silverBright"
              >
                Read the full story →
              </Link>
            </div>
            <FundingMilestoneChart variant="full" className="mt-8" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative border-t border-red/10 bg-crimson-fade px-6 py-24 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-red">
            Want to be part of it?
          </div>
          <h2 className="mt-3 font-display text-4xl text-silverBright md:text-5xl">
            The universe they built with it is still running.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-silver md:text-lg">
            Star Citizen is still in development — and it&rsquo;s playable
            right now. Sign up with our referral code and you&rsquo;ll get
            50,000 UEC of in-game currency free. Try a Free Fly event, or
            pick up a starter pack and join the persistent universe today.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 md:flex-row">
            <CTAButton trackingLabel="billion-page-cta" />
            <SecondaryButton />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Verify dev server — /billion**

With `npm run dev` running, open `http://localhost:3000/billion`. Confirm:
- The animated counter counts up to `$1,000,012,999`
- Anvil Odin section renders (image will be a placeholder — that is fine)
- Three comparison StatCards render
- FundingMilestoneChart renders (chart height, no console errors)
- CTAButton and SecondaryButton render

- [ ] **Step 3: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/billion/page.tsx
git commit -m "feat: add /billion milestone showcase page with animated counter and Anvil Odin section"
```

---

## Task 7: Update sitemap.ts — add /billion

**Files:**
- Modify: `fundedgame-site/src/app/sitemap.ts`

- [ ] **Step 1: Add the /billion route**

Find the return array in `sitemap.ts` (currently two entries). Add a third entry:

```ts
    {
      url: `${SITE_URL}/billion`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
```

The full return should now read:
```ts
  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/the-story`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/billion`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
```

- [ ] **Step 2: Verify sitemap renders**

With dev server running, open `http://localhost:3000/sitemap.xml`. Confirm three URLs appear including `.../billion`.

- [ ] **Step 3: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "seo: add /billion to sitemap at priority 1"
```

---

## Task 8: Full build verification — fundedgame-site

- [ ] **Step 1: Run production build**

```bash
cd "E:\Claude Code\sc-portfolio\fundedgame-site"
npm run build
```

Expected: build completes with no errors. Warnings about image optimization are acceptable. Any TypeScript or import error must be fixed before proceeding.

- [ ] **Step 2: Spot-check page metadata in build output**

Look at the build output — Next.js lists routes. Confirm `/billion` appears as a static page in the route list.

- [ ] **Step 3: Commit if any build fixes were needed**

```bash
git add -A
git commit -m "fix: resolve build issues from $1B milestone changes"
```

---

## Task 9: Cross-portfolio patch — dayonecitizen-main

**Files:**
- Modify: `dayonecitizen-main/src/app/page.tsx` (line 57)

- [ ] **Step 1: Update the funding figure**

Find (line 57):
```tsx
          , having raised over $700 million through crowdfunding.
```

Replace with:
```tsx
          , having raised over $1 billion through crowdfunding — the most funded project of any kind, ever.
```

- [ ] **Step 2: Verify dev server**

```bash
cd "E:\Claude Code\sc-portfolio\dayonecitizen-main"
npm run dev
```

Open `http://localhost:3000`. Confirm the updated funding figure appears in the relevant paragraph. Stop the dev server.

- [ ] **Step 3: Build check**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "seo: update Star Citizen funding figure from \$700M to \$1B"
```

---

## Task 10: Cross-portfolio patch — bestspacesim-site

**Files:**
- Modify: `bestspacesim-site/src/app/star-citizen/page.tsx` (line 23)

- [ ] **Step 1: Update the funding copy**

Find (line 23):
```ts
      'Crowdfunding launched in October 2012, and the game has been in public alpha development since. It is one of the highest-funded crowdfunded games on record. The current live build is Alpha 4.8 — that matters, and we will not pretend otherwise.',
```

Replace with:
```ts
      'Crowdfunding launched in October 2012, and the game has been in public alpha development since. On May 24, 2026, it crossed $1 billion raised — making it the most crowdfunded project of any kind in history. The current live build is Alpha 4.8 — that matters, and we will not pretend otherwise.',
```

- [ ] **Step 2: Build check**

```bash
cd "E:\Claude Code\sc-portfolio\bestspacesim-site"
npm run build
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/star-citizen/page.tsx
git commit -m "seo: update Star Citizen funding copy to reflect $1B milestone"
```

---

## Completion Checklist

- [ ] `fundedgame-site/src/data/milestones.ts` — 2026 row updated, HEADLINE_STATS updated
- [ ] `fundedgame-site/src/app/layout.tsx` — all 5 stale references updated
- [ ] `fundedgame-site/src/app/page.tsx` — hero copy + milestone callout section
- [ ] `fundedgame-site/src/app/the-story/page.tsx` — metadata + final chapter
- [ ] `fundedgame-site/src/components/BillionCounter.tsx` — created
- [ ] `fundedgame-site/src/app/billion/page.tsx` — created
- [ ] `fundedgame-site/src/app/sitemap.ts` — `/billion` added at priority 1
- [ ] `fundedgame-site` build passes
- [ ] `dayonecitizen-main/src/app/page.tsx` — $700M → $1B
- [ ] `bestspacesim-site/src/app/star-citizen/page.tsx` — vague language → $1B
