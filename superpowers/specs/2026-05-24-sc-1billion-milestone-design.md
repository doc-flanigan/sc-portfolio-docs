# SC $1 Billion Milestone — Design Spec

**Date:** 2026-05-24  
**Trigger:** Star Citizen officially crossed $1,000,000,000 raised on May 24, 2026. The Anvil Odin — the largest ship in the game and the last concept ship — was the sale that pushed it over the line.  
**Live stats (source: robertsspaceindustries.com/en/funding-goals):** $1,000,012,999 raised · 6,543,109 backers  
**Urgency:** Search traffic for "star citizen 1 billion" / "billion dollar game" will spike within 24–72 hours. Ship today.

---

## Scope

Three workstreams:

1. **fundedgame-site** — Primary site. Full treatment: data/copy updates + new `/billion` visual showcase page + homepage milestone callout.
2. **Cross-portfolio copy patches** — Two single-line updates on `dayonecitizen-main` and `bestspacesim-site` where funding figures are stale.
3. **Sitemap / SEO** — Add `/billion` to sitemap, ensure metadata is correct.

---

## 1. fundedgame-site — Data & Copy Updates

### 1a. `src/data/milestones.ts`

**Update the 2026 row** (currently `{ year: 2026, amount: 967, label: '$967M (April 2026)', ... }`):

```ts
{ 
  year: 2026, 
  amount: 1000, 
  label: '$1 Billion Crossed', 
  note: 'On May 24, 2026, the Anvil Odin — the largest ship in the game and the last concept ship ever announced — pushed Star Citizen past one billion dollars raised. The first crowdfunded project of any kind to reach this milestone.' 
}
```

**Update `HEADLINE_STATS`:**

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

### 1b. `src/app/page.tsx` — Homepage

**Hero section:**
- Badge text: `"Crowdfunding world record · 2026"` (already correct, keep)
- Hero body copy: change `"Nearly <strong>$1 billion</strong>"` → `"Over <strong>$1 billion</strong>"`
- Change `"6 million backers"` → `"6.5 million backers"`

**New Milestone Callout section** — insert between `<HeroCarousel>` and the "By the Numbers" section:

```tsx
{/* $1B MILESTONE CALLOUT */}
<section className="relative border-b border-red/20 bg-crimson px-6 py-16 text-center">
  <div className="mx-auto max-w-3xl">
    <div className="inline-flex items-center gap-2 rounded-full border border-red/40 bg-red/10 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-red">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red" />
      May 24, 2026 — It happened
    </div>
    <div className="mt-6 font-display text-6xl font-semibold text-silverBright md:text-8xl lg:text-9xl">
      $1,000,000,000
    </div>
    <p className="mx-auto mt-4 max-w-xl text-base text-silver md:text-lg">
      The Anvil Odin — the largest ship in the game, and the last concept 
      ship ever announced — crossed the line. Star Citizen is now the only 
      crowdfunded project in any category to raise one billion dollars.
    </p>
    <Link href="/billion" className="mt-6 inline-block text-sm text-red underline hover:opacity-80">
      The full story of how $1 billion happened →
    </Link>
  </div>
</section>
```

### 1c. `src/app/the-story/page.tsx` — Story Page

**Metadata** (update both `title` and `description` in `metadata` export, plus OG/Twitter variants):
- Title: `"How Star Citizen Raised $1 Billion — The Full Crowdfunding Story"`
- Description: `"Star Citizen asked for $500,000 in 2012. On May 24, 2026, it crossed $1 billion raised from 6.5 million backers. The complete year-by-year crowdfunding story."`

**Final chapter** — replace eyebrow `"2023 — Today"` with `"2023 — 2026"` and rewrite:
- Title: `"One billion dollars."`
- Body: Update to celebrate the milestone. The Anvil Odin gets its own paragraph. Remove "within striking distance" language — it happened.

### 1d. `src/app/layout.tsx`

Check for any global `$967M` or "nearly $1 billion" references and update.

---

## 2. New `/billion` Page — Visual Showcase

**Route:** `src/app/billion/page.tsx`  
**SEO target queries:** "star citizen 1 billion", "star citizen billion dollars", "anvil odin", "most funded game 1 billion"

### Metadata

```ts
title: 'Star Citizen Just Hit $1 Billion — The Most Crowdfunded Project in History'
description: 'On May 24, 2026, Star Citizen crossed one billion dollars raised from 6.5 million backers. The Anvil Odin — the largest ship in the game — pushed it over the line.'
canonical: '/billion'
```

### Page Structure

**Section 1 — Hero / The Number**
- Full-width section with `$1,000,012,999` in the largest display font on the site (~9xl or 10xl).
- Subtitle: `"Raised by 6,543,109 backers — May 24, 2026"`
- Visual treatment: the number should feel monumental. White/silverBright on deep crimson background. No animation required but a CSS `@keyframes` count-up from `$999,999,999` to `$1,000,012,999` over 2s would be ideal (implement with `useEffect` + `requestAnimationFrame`).
- Sub-label: `"The first crowdfunded project in any category to reach this milestone."`

**Section 2 — The Ship That Crossed the Line**
- Two-column layout (image left, text right on desktop; stacked on mobile)
- Image: hero placeholder from `/public/images/hero/` with alt `"Anvil Odin — Star Citizen's largest ship"`
- Headline: `"The Anvil Odin crossed the line."`
- Body: 2–3 paragraphs. The Anvil Odin is described as the largest ship ever built for Star Citizen, and the last concept ship CIG ever announced — meaning no new ship concepts will be revealed going forward. The sale of the Odin was the final push that sent the total past $1,000,000,000. Write this with the same editorial voice as the-story page: factual, present-tense weight.

**Section 3 — In Context (Comparison Cards)**
Three `StatCard`-style cards to make $1B land for someone who doesn't follow crowdfunding:

| Stat | Value | Label | Sub |
|---|---|---|---|
| Star Citizen | $1B+ | Raised through crowdfunding | From 6.5 million individual backers |
| Next-largest crowdfunded game | ~$10M or less | By comparison | Verify exact figure before publishing — most crowdfunded games top out in the single-digit millions |
| Typical AAA game budget | $100–200M | Development cost | Star Citizen raised 5–10× a typical AAA budget through crowdfunding alone |

**Section 4 — The Arc**
- Reuse `<FundingMilestoneChart variant="full" />` — the updated data will include the $1B point and it'll render correctly.
- Section header: `"14 years to $1 billion."` with a link to `/the-story` for the full narrative.

**Section 5 — CTA**
- Headline: `"The universe they built with it is still running."`
- Sub: Standard referral/starter pack pitch. 50k UEC offer.
- `<CTAButton trackingLabel="billion-page-cta" />`

---

## 3. Cross-Portfolio Copy Patches

### `dayonecitizen-main` — `src/app/page.tsx:57`

```diff
- , having raised over $700 million through crowdfunding.
+ , having raised over $1 billion through crowdfunding — the most funded project of any kind, ever.
```

### `bestspacesim-site` — `src/app/star-citizen/page.tsx:23`

```diff
- 'It is one of the highest-funded crowdfunded games on record.'
+ 'It crossed $1 billion in crowdfunding on May 24, 2026 — making it the most funded project of any kind in history.'
```

---

## 4. Sitemap

Add `/billion` to `src/app/sitemap.ts` in `fundedgame-site`. Priority: `1.0` (matches homepage). `changeFrequency: 'monthly'`.

---

## SEO Notes

- `/billion` targets new high-intent queries created by this event. Speed matters — Google will index within 24–48 hours if it crawls the sitemap.
- The homepage milestone callout section adds fresh content to the existing #1 ranking page for "most funded game" queries.
- `dayonecitizen-main` and `bestspacesim-site` updates remove embarrassingly stale figures that could undermine credibility with readers and crawlers alike.
- Do NOT add `/billion` to `freeflyevent-site` or `o7meaning-site` — it would be off-topic.

---

## Out of Scope

- Animated counter component is a nice-to-have; static figure is acceptable if time-constrained.
- No new hero images required (use existing placeholders).
- No new Anvil Odin photography — use a placeholder with correct alt text; replace when CIG releases press kit assets.
- No changes to screferralrewards, pledgemeaning, or o7meaning sites.
