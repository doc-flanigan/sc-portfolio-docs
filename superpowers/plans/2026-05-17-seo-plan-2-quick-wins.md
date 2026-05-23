# SEO Quick Wins + Cross-Portfolio Links Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Optimize StarCitizenHelp's 7–15 position pages for CTR and rankings, then wire up all editorial cross-links across the portfolio per the internal-linking map.

**Architecture:** Two independent workstreams — (A) StarCitizenHelp optimizations in `src/data/guides.ts` and `src/app/tools/page.tsx`, (B) cross-link additions to body copy across all other sites. Each task can be executed independently in its own repo session.

**Tech Stack:** Next.js 14, TypeScript. All changes go through `npm run build` before commit.

**Prerequisite:** Plan 1 (Foundation) complete — docs/seo/ directory and CLAUDE.md SEO blocks must exist.

**Spec:** `docs/superpowers/specs/2026-05-17-seo-strategy-design.md`

---

## Task 0: Technical SEO Foundation (All Sites)

Run from `E:\Claude Code\sc-portfolio`. These are manual verification steps, not code changes.

- [ ] **Step 1: Verify sitemaps are live on all 10 sites**

For each domain, visit `/sitemap.xml` and confirm it returns valid XML with page URLs:
- `https://dayonecitizen.com/sitemap.xml`
- `https://starcitizenhelp.com/sitemap.xml`
- `https://freeflyevent.com/sitemap.xml`
- `https://screferralreward.com/sitemap.xml`
- `https://screferralbonus.com/sitemap.xml`
- `https://bestspacesim.com/sitemap.xml`
- `https://pledgemeaning.com/sitemap.xml`
- `https://fundedgame.com/sitemap.xml`
- `https://o7meaning.com/sitemap.xml`
- `https://iheldtheline.com/sitemap.xml`

For any site where `/sitemap.xml` returns 404, open that site's repo and check for `src/app/sitemap.ts`. If missing, create it following the pattern in `screferralbonus-site/src/app/sitemap.ts` (Agent 7 complete — use as reference).

- [ ] **Step 2: Submit sitemaps to Google Search Console**

For each site that does not yet have GSC verified: go to `https://search.google.com/search-console/`, add the property, verify ownership (HTML file method works cleanly with Vercel — download the verification file and add it to `/public/`), then submit the sitemap URL.

- [ ] **Step 3: Submit sitemaps to Bing Webmaster Tools**

Go to `https://www.bing.com/webmasters/`. Add each domain. Use the GSC import option if available — it auto-imports verified GSC properties. Submit sitemaps.

- [ ] **Step 4: Update docs/seo/pending-and-status.md**

Mark the GSC and Bing WMT rows as ✅ for each site after verification.

---

## Workstream A: StarCitizenHelp Optimizations

Run these tasks from `E:\Claude Code\sc-portfolio\StarCitizenHelp-live`.

### Task A1: Fix in-game-shops-directory (0% CTR — Critical)

**Files:**
- Modify: `src/data/guides.ts` (slug: `in-game-shops-directory`)

The in-game-shops-directory page has 119 impressions at position 8.14 with **0% CTR**. This means the current title/description is completely uncompelling to searchers. Fixing the meta description is the highest-ROI change in the entire SEO plan.

- [ ] **Step 1: Read the current in-game-shops-directory entry in guides.ts**

Search for `slug: "in-game-shops-directory"` in `src/data/guides.ts`. Note the current `metaTitle`, `metaDescription`, and `title` values.

- [ ] **Step 2: Update the metaTitle and metaDescription**

Find the `in-game-shops-directory` entry and update/add these fields:

```typescript
metaTitle: "Star Citizen Shops Directory — Where to Buy Weapons, Armor & Gear (2026)",
metaDescription: "Every in-game shop in Star Citizen listed by location: New Babbage, Lorville, Area 18, Orison, Port Tressler. Find weapons, armor, food, ship components, and medical supplies in the 'Verse.",
h1: "Star Citizen In-Game Shops Directory (2026)",
```

- [ ] **Step 3: Run build to verify no TypeScript errors**

```bash
npm run build
```

Expected: build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/data/guides.ts
git commit -m "seo: fix in-game-shops-directory meta description (0% CTR fix)"
```

---

### Task A2: Optimize how-to-add-friends (Position 6.85 → Top 3)

**Files:**
- Modify: `src/data/guides.ts` (slug: `how-to-add-friends`)

This page has 199 impressions at position 6.85 with 1.01% CTR. A stronger title + FAQ schema pushes it to top 3 and increases click rate.

- [ ] **Step 1: Read the current how-to-add-friends entry in guides.ts**

Search for `slug: "how-to-add-friends"` in `src/data/guides.ts`. Note current values.

- [ ] **Step 2: Update meta and add FAQ JSON-LD**

Update the `how-to-add-friends` entry:

```typescript
metaTitle: "How to Add Friends in Star Citizen (2026) | StarCitizenHelp",
metaDescription: "Open your mobiGlas, go to Contacts, search by handle, and send a friend request. Complete guide to adding friends, joining parties, and inviting crew in Star Citizen.",
h1: "How to Add Friends in Star Citizen (2026)",
jsonLd: [
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do you add friends in Star Citizen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Open your mobiGlas (F1), navigate to the Contacts app, search for your friend's RSI handle, and send a friend request. They need to accept it before you appear in each other's lists."
        }
      },
      {
        "@type": "Question",
        "name": "Can you add friends in Star Citizen across different servers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Friend requests and the contact list work across all servers. Once friends, you can invite them to your party regardless of which server they're on."
        }
      },
      {
        "@type": "Question",
        "name": "How do you invite someone to a party in Star Citizen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Open your mobiGlas, go to the Contacts or Friends app, find your friend, and select 'Invite to Party'. They'll receive a notification to accept."
        }
      }
    ]
  }
],
```

- [ ] **Step 3: Run build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/data/guides.ts
git commit -m "seo: optimize how-to-add-friends meta + add FAQ schema"
```

---

### Task A3: Optimize food-drink-survival (Position 5.77 → Top 5)

**Files:**
- Modify: `src/data/guides.ts` (slug: `food-drink-survival`)

Position 5.77 means this is at the bottom of page 1 or top of page 2. A title/description improvement pushes it into the top 5 visible results.

- [ ] **Step 1: Read the current food-drink-survival entry in guides.ts**

Search for `slug: "food-drink-survival"` in `src/data/guides.ts`.

- [ ] **Step 2: Update meta fields**

```typescript
metaTitle: "Star Citizen Food, Drink & Survival Guide — Hunger, Thirst & Where to Buy (2026)",
metaDescription: "How food, drink, and survival mechanics work in Star Citizen: what the hunger and thirst meters do, debuffs to avoid, and where to buy food and drink across New Babbage, Lorville, and Area 18.",
h1: "Star Citizen Food, Drink & Survival Guide (2026)",
```

- [ ] **Step 3: Run build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/data/guides.ts
git commit -m "seo: optimize food-drink-survival meta for top-5 push"
```

---

### Task A4: Optimize Tools Page for Calculator Queries

**Files:**
- Modify: `src/app/tools/page.tsx`

The tools page is at position 10.96 with 112 impressions. The current title leads with "Fleet Viewer" (StarJump) but the highest-value queries are calculator-focused ("star citizen ccu calculator", "star citizen mining calculator"). Reordering the title captures those clicks.

- [ ] **Step 1: Read src/app/tools/page.tsx**

Confirm the current `metadata` export values.

- [ ] **Step 2: Update the metadata export**

Replace the existing `metadata` export:

```typescript
export const metadata: Metadata = {
  title: 'Star Citizen Calculators & Tools — CCU Chain, Mining, Loadout (2026) | StarCitizenHelp',
  description: 'Free Star Citizen calculators: CCU chain planner, mining profit calculator, ship loadout builder, and the StarJump fleet viewer. All in one place, updated for 2026.',
  keywords: [
    'star citizen ccu calculator',
    'star citizen calculator',
    'star citizen ccu chain calculator',
    'star citizen mining calculator',
    'star citizen loadout calculator',
    'starjump fleet viewer',
    'star citizen tools 2026',
  ],
  alternates: { canonical: 'https://starcitizenhelp.com/tools' },
  openGraph: {
    title: 'Star Citizen Calculators & Tools — CCU Chain, Mining, Loadout (2026)',
    description: 'Free Star Citizen calculators: CCU chain planner, mining profit calculator, ship loadout builder, and the StarJump fleet viewer.',
    url: 'https://starcitizenhelp.com/tools',
    type: 'website',
    images: [{ url: '/images/heroes/hero-06.jpg', width: 1920, height: 1080, alt: 'Star Citizen tools and calculators' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Star Citizen Calculators & Tools (2026) | StarCitizenHelp',
    description: 'Free Star Citizen calculators: CCU chain planner, mining profit, ship loadout, StarJump fleet viewer.',
    images: ['/images/heroes/hero-06.jpg'],
  },
}
```

- [ ] **Step 3: Run build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/app/tools/page.tsx
git commit -m "seo: optimize tools page title for calculator keyword cluster"
```

---

### Task A5: Add dayonecitizen Cross-Link to All StarCitizenHelp Guides

**Files:**
- Modify: `src/data/guides.ts` (all entries)

Every guide needs a `footerHtml` property that includes a contextual link to dayonecitizen.com. This is the primary mechanism for transferring authority from StarCitizenHelp to dayonecitizen before the 301 migration.

- [ ] **Step 1: Read guides.ts to understand current footerHtml usage**

Check whether any guides already use `footerHtml`. Note the HTML pattern used.

- [ ] **Step 2: Add footerHtml to all guide entries that don't already have one**

For each guide entry in the `guides` array, add or append to `footerHtml`:

```typescript
footerHtml: `
<div class="mt-12 pt-8 border-t border-gray-700/50">
  <p class="text-gray-400 text-sm">
    New to Star Citizen?
    <a href="https://dayonecitizen.com" class="text-primary underline hover:text-primary/80" target="_blank" rel="noopener">
      DayOneCitizen.com
    </a>
    has a complete first-30-days guide written for brand new players.
  </p>
</div>
`,
```

If a guide already has `footerHtml`, append the dayonecitizen paragraph inside the existing wrapper rather than creating a duplicate div.

- [ ] **Step 3: Verify the footerHtml renders in GuideDetail**

Read `src/views/GuideDetail.tsx` and confirm `footerHtml` is rendered via `dangerouslySetInnerHTML` or similar. If it is not rendered, find where `headerHtml` and `contentHtml` are rendered and add `footerHtml` in the same pattern.

- [ ] **Step 4: Run build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/data/guides.ts src/views/GuideDetail.tsx
git commit -m "seo: add dayonecitizen cross-link footer to all guides"
```

---

### Task A6: Push StarCitizenHelp Changes

- [ ] **Step 1: Push to GitHub**

```bash
git push
```

Vercel will auto-deploy. Confirm deployment succeeds in the Vercel dashboard.

- [ ] **Step 2: Verify live**

Visit these URLs and confirm the updated meta shows in browser dev tools (View Page Source → search for `<title>` and `<meta name="description"`):
- `https://starcitizenhelp.com/game-guides/in-game-shops-directory`
- `https://starcitizenhelp.com/game-guides/how-to-add-friends`
- `https://starcitizenhelp.com/tools`

- [ ] **Step 3: Validate FAQ schema**

Go to `https://search.google.com/test/rich-results` and test `https://starcitizenhelp.com/game-guides/how-to-add-friends`. Expected: FAQPage rich result detected.

---

## Workstream B: Cross-Portfolio Editorial Links

Each task below is for a different site. Run each from that site's directory.

### Task B1: freeflyevent-site — Add dayonecitizen + screferralreward Links

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/event-guide/page.tsx`

- [ ] **Step 1: Read src/app/page.tsx**

Find the "New Player" or beginner-focused section in the homepage. If no such section exists, find the section after the FreeFlyGuide component or after the referral bonus section.

- [ ] **Step 2: Add dayonecitizen callout block to homepage**

In the homepage JSX, after the `<FreeFlyGuide />` component (or in the most appropriate new-player section), add:

```tsx
{/* SEO cross-link: dayonecitizen */}
<section className="mt-12 rounded-lg border border-orange-500/30 bg-[#0f1520] px-6 py-5">
  <h2 className="text-lg font-bold text-[#f5f8ff] mb-2">New to Star Citizen?</h2>
  <p className="text-[#6b7890] text-sm leading-relaxed">
    Free Fly is a great time to start. If you&apos;ve never played before,{' '}
    <a
      href="https://dayonecitizen.com"
      className="text-orange-400 underline hover:text-orange-300"
      target="_blank"
      rel="noopener"
    >
      DayOneCitizen.com
    </a>{' '}
    has a plain-English guide for your first 30 days in the &apos;Verse.
  </p>
</section>
```

- [ ] **Step 3: Add screferralreward link in referral bonus section**

Find the section in `page.tsx` that discusses the referral bonus. After the existing CTA button or referral bonus explanation, add:

```tsx
<p className="text-[#6b7890] text-sm mt-3">
  Want the full referral code details?{' '}
  <a
    href="https://screferralreward.com"
    className="text-orange-400 underline hover:text-orange-300"
    target="_blank"
    rel="noopener"
  >
    screferralreward.com
  </a>{' '}
  has everything you need.
</p>
```

- [ ] **Step 4: Add dayonecitizen link in event-guide page**

Read `src/app/event-guide/page.tsx`. Find the "sign up" or "getting started" step. Add a contextual link:

```tsx
<p className="text-[#6b7890] text-sm mt-4">
  Once you&apos;re signed up,{' '}
  <a
    href="https://dayonecitizen.com"
    className="text-orange-400 underline hover:text-orange-300"
    target="_blank"
    rel="noopener"
  >
    DayOneCitizen.com
  </a>{' '}
  will walk you through your first 30 days step by step.
</p>
```

- [ ] **Step 5: Run build**

```bash
npm run build
```

- [ ] **Step 6: Commit and push**

```bash
git add src/app/page.tsx src/app/event-guide/page.tsx
git commit -m "seo: add dayonecitizen + screferralreward editorial cross-links"
git push
```

---

### Task B2: screferralreward-site — Add dayonecitizen + freeflyevent Links

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Read src/app/page.tsx**

Find a natural placement after the main referral code block — the "How It Works" section or after the UEC Spend Grid.

- [ ] **Step 2: Add dayonecitizen link**

After the `<HowItWorks />` component or in a "What's next after you sign up?" section:

```tsx
{/* SEO cross-link: dayonecitizen */}
<p className="text-center text-sm text-muted mt-6">
  New to Star Citizen?{' '}
  <a
    href="https://dayonecitizen.com"
    className="text-gold underline hover:text-goldDark"
    target="_blank"
    rel="noopener"
  >
    Get your Day One guide
  </a>{' '}
  before you dive in.
</p>
```

- [ ] **Step 3: Add freeflyevent link**

In the event tracker section or near the countdown timer, add:

```tsx
<p className="text-sm text-muted mt-3">
  Not ready to buy yet?{' '}
  <a
    href="https://freeflyevent.com"
    className="text-gold underline hover:text-goldDark"
    target="_blank"
    rel="noopener"
  >
    Check if there&apos;s a Free Fly event
  </a>{' '}
  — you can try Star Citizen before you commit.
</p>
```

- [ ] **Step 4: Run build**

```bash
npm run build
```

- [ ] **Step 5: Commit and push**

```bash
git add src/app/page.tsx
git commit -m "seo: add dayonecitizen + freeflyevent editorial cross-links"
git push
```

---

### Task B3: screferralbonus-site — Add dayonecitizen + freeflyevent Links

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Read src/app/page.tsx**

Find the "What's next?" or post-CTA section. The SecondaryLink component (`"New Player Guide at dayonecitizen.com"`) may already exist — if so, verify it links to `https://dayonecitizen.com` and is placed in the body, not just the footer.

- [ ] **Step 2: Verify or add dayonecitizen SecondaryLink**

If `<SecondaryLink />` already renders "New Player Guide at dayonecitizen.com" visibly in the page body above the fold, this link is done. If it is only in the final CTA block at the bottom, also add it earlier:

```tsx
{/* SEO cross-link: dayonecitizen — placed in new-player context */}
<p className="text-sm text-muted mt-4 text-center">
  Never played Star Citizen?{' '}
  <a
    href="https://dayonecitizen.com"
    className="text-gold underline hover:text-goldDark"
    target="_blank"
    rel="noopener"
  >
    DayOneCitizen.com
  </a>{' '}
  is your first stop.
</p>
```

- [ ] **Step 3: Add freeflyevent link in the "Is the Bonus Always Active?" section**

Read the page for the section that explains you can try before you buy. Add:

```tsx
<p className="text-sm text-muted mt-3">
  <a
    href="https://freeflyevent.com"
    className="text-gold underline hover:text-goldDark"
    target="_blank"
    rel="noopener"
  >
    Free Fly events
  </a>{' '}
  let you try Star Citizen for free — check current event dates before you create your account.
</p>
```

- [ ] **Step 4: Run build**

```bash
npm run build
```

- [ ] **Step 5: Commit and push**

```bash
git add src/app/page.tsx
git commit -m "seo: add dayonecitizen + freeflyevent editorial cross-links"
git push
```

---

### Task B4: o7meaning-site — Add dayonecitizen Link in /in-star-citizen

**Files:**
- Modify: `src/app/in-star-citizen/page.tsx`

- [ ] **Step 1: Read src/app/in-star-citizen/page.tsx**

Find the section that introduces Star Citizen to the reader — likely after explaining what o7 means in the game context.

- [ ] **Step 2: Add dayonecitizen link after the SC intro**

After the paragraph that explains o7 in Star Citizen context, add:

```tsx
<p className="text-[#7a8599] text-sm mt-6 leading-relaxed">
  If you&apos;re curious about Star Citizen,{' '}
  <a
    href="https://dayonecitizen.com"
    className="text-[#00d4ff] underline hover:text-[#0099bb]"
    target="_blank"
    rel="noopener"
  >
    DayOneCitizen.com
  </a>{' '}
  is a plain-English guide for new players — no jargon, just what you actually need to know on your first day.
</p>
```

- [ ] **Step 3: Run build**

```bash
npm run build
```

- [ ] **Step 4: Commit and push**

```bash
git add src/app/in-star-citizen/page.tsx
git commit -m "seo: add dayonecitizen editorial cross-link in /in-star-citizen"
git push
```

---

### Task B5: fundedgame-site — Add dayonecitizen + freeflyevent Links

**Files:**
- Modify: main homepage or content page (read the repo to identify the correct file)

- [ ] **Step 1: Read the repo structure**

```bash
find src -name "*.tsx" | grep -v node_modules | sort
```

Identify the main content page. Likely `src/app/page.tsx`.

- [ ] **Step 2: Read the main page**

Find the section that pivots from "this is the most funded game" to "here's how to play it".

- [ ] **Step 3: Add dayonecitizen + freeflyevent links in the CTA section**

```tsx
{/* SEO cross-links: dayonecitizen + freeflyevent */}
<div className="mt-8 space-y-3 text-sm text-center">
  <p>
    Ready to play the most funded game in history?{' '}
    <a
      href="https://dayonecitizen.com"
      className="underline hover:opacity-80"
      style={{ color: 'var(--primary, #00d4ff)' }}
      target="_blank"
      rel="noopener"
    >
      Start with the Day One guide
    </a>{' '}
    — written for players who have never launched a ship.
  </p>
  <p>
    Not sure yet?{' '}
    <a
      href="https://freeflyevent.com"
      className="underline hover:opacity-80"
      style={{ color: 'var(--primary, #00d4ff)' }}
      target="_blank"
      rel="noopener"
    >
      Free Fly events
    </a>{' '}
    let you try Star Citizen at no cost for a limited time.
  </p>
</div>
```

> Use the site's actual primary color Tailwind class (read tailwind.config.ts to confirm) rather than the inline style if a class is available.

- [ ] **Step 4: Run build**

```bash
npm run build
```

- [ ] **Step 5: Commit and push**

```bash
git add src/
git commit -m "seo: add dayonecitizen + freeflyevent editorial cross-links"
git push
```

---

### Task B6: pledgemeaning-site — Add dayonecitizen + screferralreward Links

**Files:**
- Modify: main page (read repo to identify)

- [ ] **Step 1: Read the repo structure and main page**

```bash
find src -name "*.tsx" | grep -v node_modules | sort
```

Read the main page. Find the section that explains what pledging means and what to do next.

- [ ] **Step 2: Add dayonecitizen link in "What should I do?" section**

```tsx
<p className="text-sm mt-4">
  New to Star Citizen?{' '}
  <a
    href="https://dayonecitizen.com"
    className="underline hover:opacity-80"
    target="_blank"
    rel="noopener"
  >
    DayOneCitizen.com
  </a>{' '}
  has a plain-English guide for your first 30 days — no jargon, no assumed knowledge.
</p>
```

- [ ] **Step 3: Add screferralreward link near the pledge/purchase section**

```tsx
<p className="text-sm mt-3">
  When you make your first pledge,{' '}
  <a
    href="https://screferralreward.com"
    className="underline hover:opacity-80"
    target="_blank"
    rel="noopener"
  >
    use a referral code
  </a>{' '}
  to get 50,000 UEC added to your hangar at no extra cost.
</p>
```

- [ ] **Step 4: Run build, commit, push**

```bash
npm run build
git add src/
git commit -m "seo: add dayonecitizen + screferralreward editorial cross-links"
git push
```

---

### Task B7: bestspacesim-site — Add dayonecitizen + freeflyevent Links

**Files:**
- Modify: main page or Star Citizen review section (read repo to identify)

- [ ] **Step 1: Read the repo structure and Star Citizen review section**

```bash
find src -name "*.tsx" | grep -v node_modules | sort
```

Find where Star Citizen is reviewed or recommended.

- [ ] **Step 2: Add dayonecitizen link after Star Citizen section**

```tsx
<p className="text-sm mt-4">
  Ready to try it?{' '}
  <a
    href="https://dayonecitizen.com"
    className="underline hover:opacity-80"
    target="_blank"
    rel="noopener"
  >
    DayOneCitizen.com
  </a>{' '}
  is the plain-English getting-started guide for new players.
</p>
```

- [ ] **Step 3: Add freeflyevent link near the "Try before you buy" context**

```tsx
<p className="text-sm mt-3">
  Star Citizen runs{' '}
  <a
    href="https://freeflyevent.com"
    className="underline hover:opacity-80"
    target="_blank"
    rel="noopener"
  >
    Free Fly events
  </a>{' '}
  where you can play for free for a limited time before committing.
</p>
```

- [ ] **Step 4: Run build, commit, push**

```bash
npm run build
git add src/
git commit -m "seo: add dayonecitizen + freeflyevent editorial cross-links"
git push
```

---

### Task B8: iheldtheline-site — Add dayonecitizen + freeflyevent + screferralreward Links

**Files:**
- Modify: main page and/or Squadron 42 content pages (read repo to identify)

- [ ] **Step 1: Read the repo structure**

```bash
find src -name "*.tsx" | grep -v node_modules | sort
```

- [ ] **Step 2: Read the main page and identify cross-link placement**

Find the section that bridges Squadron 42 to the full Star Citizen universe.

- [ ] **Step 3: Add three cross-links in the Star Citizen bridge section**

```tsx
{/* SEO cross-links */}
<div className="mt-8 space-y-2 text-sm">
  <p>
    Ready to jump into the full Star Citizen universe?{' '}
    <a href="https://dayonecitizen.com" className="underline hover:opacity-80" target="_blank" rel="noopener">
      DayOneCitizen.com
    </a>{' '}
    is the plain-English getting-started guide for new players.
  </p>
  <p>
    <a href="https://freeflyevent.com" className="underline hover:opacity-80" target="_blank" rel="noopener">
      Free Fly events
    </a>{' '}
    let you try Star Citizen at no cost — check current event dates.
  </p>
  <p>
    When you sign up, use a referral code at{' '}
    <a href="https://screferralreward.com" className="underline hover:opacity-80" target="_blank" rel="noopener">
      screferralreward.com
    </a>{' '}
    to get 50,000 UEC added to your hangar.
  </p>
</div>
```

- [ ] **Step 4: Run build, commit, push**

```bash
npm run build
git add src/
git commit -m "seo: add dayonecitizen + freeflyevent + screferralreward editorial cross-links"
git push
```

---

### Task B9: dayonecitizen-main — Add Outbound Cross-Links

**Files:**
- Modify: `src/app/free-fly-events/page.tsx` (freeflyevent link)
- Modify: relevant tutorial step page for referral code mention (screferralreward link)
- Modify: `src/app/page.tsx` or about section (fundedgame link)

- [ ] **Step 1: Read src/app/free-fly-events/page.tsx**

Find where Free Fly events are described. Add:

```tsx
<p className="text-sm mt-4">
  For live event status and countdowns,{' '}
  <a
    href="https://freeflyevent.com"
    className="text-primary underline hover:text-primary/80"
    target="_blank"
    rel="noopener"
  >
    freeflyevent.com
  </a>{' '}
  tracks every Star Citizen Free Fly event with real-time status.
</p>
```

- [ ] **Step 2: Read the tutorial sign-up step page**

Likely `src/app/day-one-citizen/buying-the-game/page.tsx` or `starter-package/page.tsx`. Find where the user is told to create an account. Add:

```tsx
<p className="text-sm mt-4">
  When you create your account, use a referral code to get 50,000 UEC free.{' '}
  <a
    href="https://screferralreward.com"
    className="text-primary underline hover:text-primary/80"
    target="_blank"
    rel="noopener"
  >
    screferralreward.com
  </a>{' '}
  has the code and step-by-step instructions.
</p>
```

- [ ] **Step 3: Read src/app/page.tsx**

Find the "About Star Citizen" or background section on the homepage. Add:

```tsx
<p className="text-sm mt-3">
  Star Citizen is{' '}
  <a
    href="https://fundedgame.com"
    className="text-primary underline hover:text-primary/80"
    target="_blank"
    rel="noopener"
  >
    the highest-funded game in history
  </a>
  , having raised over $700 million through crowdfunding.
</p>
```

- [ ] **Step 4: Run build**

```bash
npm run build
```

- [ ] **Step 5: Commit and push**

```bash
git add src/
git commit -m "seo: add freeflyevent, screferralreward, fundedgame editorial cross-links"
git push
```

---

### Verification

- [ ] Visit each modified site and confirm cross-links appear in body copy (not footers)
- [ ] Check all outbound links open correctly
- [ ] Update `docs/seo/pending-and-status.md` — mark Cross-Links row as ✅ for each completed site
- [ ] Pull GSC data for starcitizenhelp.com in 4 weeks to check CTR improvement on in-game-shops-directory (target: >1% CTR from 0%)
