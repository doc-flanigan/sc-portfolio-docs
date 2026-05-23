# Beyond the Basics + StarCitizenHelp Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the "Beyond the Basics" section on dayonecitizen.com (7 guide pages migrated from StarCitizenHelp), then execute the StarCitizenHelp 301 migration after all destination pages are confirmed indexed in GSC.

**Architecture:** New `/beyond-the-basics/` route in dayonecitizen-main. Follows the same Next.js App Router pattern as existing `/day-one-citizen/` tutorial pages. Migration executes by adding redirects to StarCitizenHelp-live's `next.config.ts`.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS. Run `npm run build` before every commit.

**Prerequisites:**
- Plan 1 (Foundation) complete
- Plan 2 (Quick Wins) complete — StarCitizenHelp must have been cross-linking to dayonecitizen for at least 60 days before executing Task 7 (the 301 redirects)

**Spec:** `docs/superpowers/specs/2026-05-17-seo-strategy-design.md`
**Migration plan:** `docs/seo/migration-plan.md`

---

## Phase A: dayonecitizen Beyond the Basics Section

Run all Phase A tasks from `E:\Claude Code\sc-portfolio\dayonecitizen-main`.

### Task A1: Read Existing Tutorial Page Pattern

Before writing any new pages, understand the existing code pattern so the new section matches exactly.

**Files:**
- Read: `src/app/day-one-citizen/first-day/page.tsx` (or any tutorial step page)
- Read: `src/components/NavBar.tsx`
- Read: `src/app/sitemap.ts`

- [ ] **Step 1: Read a tutorial page to understand the component pattern**

Read `src/app/day-one-citizen/first-day/page.tsx`. Note:
- The import pattern for `Metadata`
- The `metadata` export structure (title, description, alternates.canonical)
- The JSX structure (outer wrapper div, section elements, heading hierarchy)
- Any shared layout components used

- [ ] **Step 2: Read NavBar.tsx to understand nav link pattern**

Read `src/components/NavBar.tsx`. Note:
- How navigation links are defined (array, hardcoded JSX, etc.)
- The className pattern for nav links
- Where to insert a new "Beyond the Basics" entry

- [ ] **Step 3: Read sitemap.ts to understand how routes are registered**

Read `src/app/sitemap.ts`. Note how existing routes are added to the sitemap array.

---

### Task A2: Create /beyond-the-basics Section Landing Page

**Files:**
- Create: `src/app/beyond-the-basics/page.tsx`

- [ ] **Step 1: Write the landing page**

Create `src/app/beyond-the-basics/page.tsx` with content drawn from the StarCitizenHelp guides that will be migrated here. Use the same component/styling pattern observed in Task A1.

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Star Citizen Beyond the Basics — Intermediate Guides | DayOneCitizen',
  description: 'Ready to go deeper? These guides cover Star Citizen mechanics for players who have completed their first 30 days: CCU chains, ship equipment, in-game shops, inventory, and more.',
  alternates: { canonical: 'https://dayonecitizen.com/beyond-the-basics' },
  openGraph: {
    title: 'Star Citizen Beyond the Basics — Intermediate Guides',
    description: 'CCU chains, ship equipment, in-game shops, inventory management, and more — guides for players ready to go deeper than the first 30 days.',
    url: 'https://dayonecitizen.com/beyond-the-basics',
  },
}

const guides = [
  {
    href: '/beyond-the-basics/ccu-chains',
    title: 'CCU Chains',
    description: 'Save hundreds on ships by chaining Cross-Chassis Upgrades through intermediate vessels.',
  },
  {
    href: '/beyond-the-basics/shops-directory',
    title: 'In-Game Shops Directory',
    description: 'Every in-game shop listed by location — weapons, armor, food, components, and medical supplies.',
  },
  {
    href: '/beyond-the-basics/ship-equipment',
    title: 'Ship Equipment',
    description: 'Understanding shields, weapons, thrusters, and components — what to upgrade and why.',
  },
  {
    href: '/beyond-the-basics/inventory-management',
    title: 'Inventory Management',
    description: 'How your personal inventory, ship storage, and cargo work together.',
  },
  {
    href: '/beyond-the-basics/adding-friends',
    title: 'Adding Friends',
    description: 'How to add contacts, form a party, and fly together with other players.',
  },
  {
    href: '/beyond-the-basics/food-drink-survival',
    title: 'Food, Drink & Survival',
    description: 'Hunger, thirst, debuffs, and where to find food and drink across the \'Verse.',
  },
  {
    href: '/beyond-the-basics/party-management',
    title: 'Party Management',
    description: 'Forming parties, inviting crew, and coordinating multi-crew ships.',
  },
]

export default function BeyondTheBasicsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4">Beyond the Basics</h1>
      <p className="text-lg text-muted-foreground mb-10">
        Completed your first 30 days? These guides cover the mechanics that matter once you&apos;re
        comfortable in the &apos;Verse.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {guides.map((guide) => (
          <Link
            key={guide.href}
            href={guide.href}
            className="block rounded-lg border p-5 hover:bg-muted/50 transition-colors"
          >
            <h2 className="font-semibold text-lg mb-1">{guide.title}</h2>
            <p className="text-sm text-muted-foreground">{guide.description}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}
```

> Adjust className values to match the actual color tokens used in dayonecitizen-main (read `tailwind.config.ts` to confirm class names for muted text, borders, and hover states).

- [ ] **Step 2: Run build**

```bash
npm run build
```

Expected: build succeeds. Fix any TypeScript errors before proceeding.

- [ ] **Step 3: Commit**

```bash
git add src/app/beyond-the-basics/page.tsx
git commit -m "feat: add Beyond the Basics section landing page"
```

---

### Task A3: Create CCU Chains Guide

**Files:**
- Create: `src/app/beyond-the-basics/ccu-chains/page.tsx`

The source content lives in `StarCitizenHelp-live/src/data/guides.ts` under slug `ccu-chains`. Read the `contentHtml` from that file to use as the basis for this page — adapt it to dayonecitizen's plain-English tone rules (see `dayonecitizen-main/CLAUDE.md` § Plain-English Standard).

- [ ] **Step 1: Read the source content**

Read `StarCitizenHelp-live/src/data/guides.ts`. Locate the `ccu-chains` entry. Copy `contentHtml` as the starting point.

- [ ] **Step 2: Write the page**

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Star Citizen CCU Chains — How to Save on Ships (2026) | DayOneCitizen',
  description: 'A Cross-Chassis Upgrade (CCU) lets you pay the price difference between ships. Chaining CCUs through intermediate vessels can save you hundreds. Step-by-step guide with examples.',
  alternates: { canonical: 'https://dayonecitizen.com/beyond-the-basics/ccu-chains' },
  openGraph: {
    title: 'Star Citizen CCU Chains — How to Save on Ships (2026)',
    description: 'Save hundreds on Star Citizen ships by chaining Cross-Chassis Upgrades. Plain-English guide with worked examples.',
    url: 'https://dayonecitizen.com/beyond-the-basics/ccu-chains',
  },
}

export default function CcuChainsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <nav className="text-sm text-muted-foreground mb-6">
        <a href="/beyond-the-basics" className="underline hover:opacity-80">Beyond the Basics</a>
        {' › '}
        CCU Chains
      </nav>

      <h1 className="text-4xl font-bold mb-6">CCU Chains — How to Save on Ships</h1>

      {/* 
        Paste and adapt the contentHtml from StarCitizenHelp guides.ts ccu-chains entry here.
        Convert HTML to JSX (className instead of class, etc.).
        Apply dayonecitizen plain-English rules:
        - Wrap every SC term in <Term name="..."> on first mention
        - No sentences over 25 words
        - Avoid gaming verbs (use "released" not "dropped", "update" not "patch")
        - Numbers under 100 in words
      */}

      <div className="prose prose-invert max-w-none mt-6">
        {/* Content goes here — adapted from StarCitizenHelp contentHtml */}
      </div>

      <div className="mt-12 pt-8 border-t">
        <p className="text-sm text-muted-foreground">
          New to Star Citizen?{' '}
          <a href="/day-one-citizen" className="underline hover:opacity-80">
            Start with the Day One guide
          </a>{' '}
          before tackling CCU chains.
        </p>
      </div>
    </main>
  )
}
```

**Important:** After creating this skeleton, fill in the full content by adapting the StarCitizenHelp `contentHtml`. Do not leave the content empty — the page must have real content before the 301 redirect goes live in Phase B.

Apply the dayonecitizen plain-English rules from CLAUDE.md:
- Every SC abbreviation/term on first mention wraps in `<Term name="...">`
- No sentence over 25 words
- "Released" not "shipped/dropped", "update" not "patch/hotfix"

- [ ] **Step 3: Run build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/app/beyond-the-basics/ccu-chains/
git commit -m "feat: add Beyond the Basics CCU chains guide"
```

---

### Task A4: Create Remaining Six Beyond the Basics Guides

**Files:**
- Create: `src/app/beyond-the-basics/shops-directory/page.tsx`
- Create: `src/app/beyond-the-basics/ship-equipment/page.tsx`
- Create: `src/app/beyond-the-basics/inventory-management/page.tsx`
- Create: `src/app/beyond-the-basics/adding-friends/page.tsx`
- Create: `src/app/beyond-the-basics/food-drink-survival/page.tsx`
- Create: `src/app/beyond-the-basics/party-management/page.tsx`

For each guide, follow the exact same pattern as Task A3:
1. Read the corresponding StarCitizenHelp guide entry from `StarCitizenHelp-live/src/data/guides.ts`
2. Create the page file with proper metadata and adapted content
3. Apply dayonecitizen plain-English rules

| Page file | StarCitizenHelp slug | Canonical URL |
|---|---|---|
| shops-directory/page.tsx | `in-game-shops-directory` | `/beyond-the-basics/shops-directory` |
| ship-equipment/page.tsx | `ship-equipment` | `/beyond-the-basics/ship-equipment` |
| inventory-management/page.tsx | `inventory-management` | `/beyond-the-basics/inventory-management` |
| adding-friends/page.tsx | `how-to-add-friends` | `/beyond-the-basics/adding-friends` |
| food-drink-survival/page.tsx | `food-drink-survival` | `/beyond-the-basics/food-drink-survival` |
| party-management/page.tsx | `party-management` | `/beyond-the-basics/party-management` |

- [ ] **Step 1: Create shops-directory/page.tsx**

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Star Citizen In-Game Shops Directory — Where to Buy What (2026) | DayOneCitizen',
  description: 'Every Star Citizen in-game shop listed by location: New Babbage, Lorville, Area 18, Orison, Port Tressler. Find weapons, armor, food, ship components, and medical supplies.',
  alternates: { canonical: 'https://dayonecitizen.com/beyond-the-basics/shops-directory' },
}

export default function ShopsDirectoryPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <nav className="text-sm text-muted-foreground mb-6">
        <a href="/beyond-the-basics" className="underline hover:opacity-80">Beyond the Basics</a>
        {' › '}
        In-Game Shops Directory
      </nav>
      <h1 className="text-4xl font-bold mb-6">Star Citizen In-Game Shops Directory</h1>
      {/* Content adapted from StarCitizenHelp in-game-shops-directory contentHtml */}
      <div className="prose prose-invert max-w-none mt-6">
        {/* Fill with adapted content */}
      </div>
      <div className="mt-12 pt-8 border-t">
        <p className="text-sm text-muted-foreground">
          <a href="/beyond-the-basics" className="underline hover:opacity-80">Back to Beyond the Basics</a>
        </p>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Create ship-equipment/page.tsx** (follow same pattern, slug: `ship-equipment`)

- [ ] **Step 3: Create inventory-management/page.tsx** (slug: `inventory-management`)

- [ ] **Step 4: Create adding-friends/page.tsx** (slug: `how-to-add-friends`)

For adding-friends, also add FAQ JSON-LD schema (carry over from Plan 2 StarCitizenHelp optimization):

```tsx
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do you add friends in Star Citizen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Open your mobiGlas (F1), go to the Contacts app, search for your friend's RSI handle, and send a friend request. They accept it and you appear in each other's lists."
      }
    },
    {
      "@type": "Question",
      "name": "How do you invite someone to a party in Star Citizen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Open your mobiGlas, go to Friends or Contacts, find your friend, and select Invite to Party. They'll receive a notification to accept."
      }
    }
  ]
}

// In the page component JSX, before the <main>:
// <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
```

- [ ] **Step 5: Create food-drink-survival/page.tsx** (slug: `food-drink-survival`)

- [ ] **Step 6: Create party-management/page.tsx** (slug: `party-management`)

- [ ] **Step 7: Run build after all six files are created**

```bash
npm run build
```

Fix any TypeScript errors before committing.

- [ ] **Step 8: Commit**

```bash
git add src/app/beyond-the-basics/
git commit -m "feat: add Beyond the Basics guide pages (shops, equipment, inventory, friends, food, party)"
```

---

### Task A5: Update sitemap.ts

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Read src/app/sitemap.ts**

Understand the current sitemap structure — how routes are defined, what priority/changeFrequency values existing pages use.

- [ ] **Step 2: Add all Beyond the Basics routes**

Add these entries to the sitemap, matching the priority/changeFrequency pattern of existing inner pages (typically `priority: 0.7`, `changeFrequency: 'monthly'`):

```typescript
{ url: 'https://dayonecitizen.com/beyond-the-basics', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
{ url: 'https://dayonecitizen.com/beyond-the-basics/ccu-chains', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
{ url: 'https://dayonecitizen.com/beyond-the-basics/shops-directory', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
{ url: 'https://dayonecitizen.com/beyond-the-basics/ship-equipment', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
{ url: 'https://dayonecitizen.com/beyond-the-basics/inventory-management', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
{ url: 'https://dayonecitizen.com/beyond-the-basics/adding-friends', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
{ url: 'https://dayonecitizen.com/beyond-the-basics/food-drink-survival', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
{ url: 'https://dayonecitizen.com/beyond-the-basics/party-management', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
```

- [ ] **Step 3: Run build**

```bash
npm run build
```

Visit `http://localhost:3000/sitemap.xml` after `npm run dev` to confirm new routes appear.

- [ ] **Step 4: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "seo: add Beyond the Basics routes to sitemap"
```

---

### Task A6: Add NavBar Link to Beyond the Basics

**Files:**
- Modify: `src/components/NavBar.tsx`

- [ ] **Step 1: Read NavBar.tsx**

Identify where nav links are defined and the exact pattern used.

- [ ] **Step 2: Add Beyond the Basics link**

Add a "Beyond the Basics" link after the Day One Citizen / tutorial link, using the same pattern as existing nav items. Example (adapt to actual pattern):

```tsx
{ href: '/beyond-the-basics', label: 'Beyond the Basics' },
```

or in JSX:

```tsx
<Link href="/beyond-the-basics" className={/* same className as other nav links */}>
  Beyond the Basics
</Link>
```

- [ ] **Step 3: Run build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/components/NavBar.tsx
git commit -m "feat: add Beyond the Basics to NavBar"
```

---

### Task A7: Push dayonecitizen Changes + Verify Indexing

- [ ] **Step 1: Push all changes**

```bash
git push
```

Vercel will auto-deploy. Confirm deployment succeeds in the Vercel dashboard.

- [ ] **Step 2: Verify pages are live**

Visit these URLs and confirm they render:
- `https://dayonecitizen.com/beyond-the-basics`
- `https://dayonecitizen.com/beyond-the-basics/ccu-chains`
- `https://dayonecitizen.com/beyond-the-basics/shops-directory`
- `https://dayonecitizen.com/beyond-the-basics/adding-friends`

- [ ] **Step 3: Verify sitemap includes new routes**

Visit `https://dayonecitizen.com/sitemap.xml` and confirm all 8 new routes appear.

- [ ] **Step 4: Request indexing in GSC**

In Google Search Console for dayonecitizen.com:
1. Use the URL Inspection tool for each new page
2. Click "Request Indexing"

Do this for all 8 new routes (landing page + 7 guides).

- [ ] **Step 5: Wait for indexing confirmation**

GSC typically shows impressions for newly indexed pages within 2–4 weeks. Do not proceed to Phase B until GSC shows impressions > 0 for at least the CCU chains, shops-directory, and adding-friends pages (the three highest-traffic StarCitizenHelp pages).

Check GSC weekly. When impressions appear → proceed to Phase B.

---

## Phase B: StarCitizenHelp Migration (301 Redirects)

**DO NOT START PHASE B until:**
1. dayonecitizen /beyond-the-basics pages confirmed indexed in GSC (impressions > 0)
2. StarCitizenHelp guides have been cross-linking to dayonecitizen for at least 60 days (Plan 2, Task A5)

Run Phase B tasks from `E:\Claude Code\sc-portfolio\StarCitizenHelp-live`.

### Task B1: Add Migration 301 Redirects to next.config.ts

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Read next.config.ts**

Read the current file. The `redirects` array currently contains www→apex and legacy slug redirects. We will append the migration redirects.

- [ ] **Step 2: Add migration redirects**

In the `redirects` array, add these entries **after** the existing entries (so existing legacy redirects are not affected):

```typescript
// Migration: StarCitizenHelp → dayonecitizen (Beyond the Basics)
{ source: '/game-guides/how-to-add-friends', destination: 'https://dayonecitizen.com/beyond-the-basics/adding-friends', permanent: true },
{ source: '/game-guides/food-drink-survival', destination: 'https://dayonecitizen.com/beyond-the-basics/food-drink-survival', permanent: true },
{ source: '/game-guides/party-management', destination: 'https://dayonecitizen.com/beyond-the-basics/party-management', permanent: true },
{ source: '/game-guides/ccu-chains', destination: 'https://dayonecitizen.com/beyond-the-basics/ccu-chains', permanent: true },
{ source: '/game-guides/in-game-shops-directory', destination: 'https://dayonecitizen.com/beyond-the-basics/shops-directory', permanent: true },
{ source: '/game-guides/ship-equipment', destination: 'https://dayonecitizen.com/beyond-the-basics/ship-equipment', permanent: true },
{ source: '/game-guides/inventory-management', destination: 'https://dayonecitizen.com/beyond-the-basics/inventory-management', permanent: true },
{ source: '/tools', destination: 'https://dayonecitizen.com/tools', permanent: true },
```

The updated `redirects` function in `next.config.ts` will look like:

```typescript
redirects: async () => [
  // existing: www → apex
  {
    source: '/:path*',
    has: [{ type: 'host', value: 'www.starcitizenhelp.com' }],
    destination: 'https://starcitizenhelp.com/:path*',
    permanent: true,
  },
  // existing: legacy numeric slugs
  { source: '/game-guides/1',  destination: '/game-guides/ship-equipment',            permanent: true },
  { source: '/game-guides/2',  destination: '/game-guides/first-days',                permanent: true },
  { source: '/game-guides/3',  destination: '/game-guides/medical-gameplay',          permanent: true },
  { source: '/game-guides/4',  destination: '/game-guides/keybinds',                  permanent: true },
  { source: '/game-guides/5',  destination: '/game-guides/inventory-management',      permanent: true },
  { source: '/game-guides/6',  destination: '/game-guides/transit-system',            permanent: true },
  { source: '/game-guides/7',  destination: '/game-guides/in-game-shops-directory',   permanent: true },
  { source: '/game-guides/8',  destination: '/game-guides/how-to-add-friends',        permanent: true },
  { source: '/game-guides/adding-friends-contacts', destination: '/game-guides/how-to-add-friends', permanent: true },
  { source: '/game-guides/9',  destination: '/game-guides/party-management',          permanent: true },
  { source: '/game-guides/10', destination: '/game-guides/food-drink-survival',       permanent: true },
  { source: '/game-guides/11', destination: '/game-guides/ccu-chains',                permanent: true },
  { source: '/game-guides/12', destination: '/game-guides/preparing-for-a-new-patch', permanent: true },
  // MIGRATION: game-guides → dayonecitizen Beyond the Basics
  { source: '/game-guides/how-to-add-friends',      destination: 'https://dayonecitizen.com/beyond-the-basics/adding-friends',      permanent: true },
  { source: '/game-guides/food-drink-survival',     destination: 'https://dayonecitizen.com/beyond-the-basics/food-drink-survival', permanent: true },
  { source: '/game-guides/party-management',        destination: 'https://dayonecitizen.com/beyond-the-basics/party-management',    permanent: true },
  { source: '/game-guides/ccu-chains',              destination: 'https://dayonecitizen.com/beyond-the-basics/ccu-chains',          permanent: true },
  { source: '/game-guides/in-game-shops-directory', destination: 'https://dayonecitizen.com/beyond-the-basics/shops-directory',     permanent: true },
  { source: '/game-guides/ship-equipment',          destination: 'https://dayonecitizen.com/beyond-the-basics/ship-equipment',      permanent: true },
  { source: '/game-guides/inventory-management',    destination: 'https://dayonecitizen.com/beyond-the-basics/inventory-management',permanent: true },
  { source: '/tools',                               destination: 'https://dayonecitizen.com/tools',                                  permanent: true },
],
```

> Important: In Next.js, when a source matches multiple redirect rules, the **first** matching rule wins. The legacy numeric slugs (`/game-guides/5` → `/game-guides/inventory-management`) must appear before the migration redirects (`/game-guides/inventory-management` → dayonecitizen) so numeric URLs chain through both redirects correctly. The order above is correct.

- [ ] **Step 3: Run build**

```bash
npm run build
```

- [ ] **Step 4: Test redirect locally**

```bash
npm run dev
```

In a browser, visit `http://localhost:3000/game-guides/how-to-add-friends`. Expected: redirects to `https://dayonecitizen.com/beyond-the-basics/adding-friends`.

Visit `http://localhost:3000/game-guides/8`. Expected: first redirects to `/game-guides/how-to-add-friends`, then to dayonecitizen (two-hop is fine).

- [ ] **Step 5: Commit**

```bash
git add next.config.ts
git commit -m "feat: add migration 301 redirects to dayonecitizen Beyond the Basics

Phase 3 SEO migration — StarCitizenHelp game guides and tools redirect
to their dayonecitizen.com equivalents. Prerequisite: Beyond the Basics
pages confirmed indexed in GSC before this commit was pushed."
```

- [ ] **Step 6: Push**

```bash
git push
```

Vercel auto-deploys. Confirm deployment succeeds.

- [ ] **Step 7: Test live redirects**

Visit each URL and confirm redirect to dayonecitizen:
- `https://starcitizenhelp.com/game-guides/how-to-add-friends` → `https://dayonecitizen.com/beyond-the-basics/adding-friends`
- `https://starcitizenhelp.com/game-guides/ccu-chains` → `https://dayonecitizen.com/beyond-the-basics/ccu-chains`
- `https://starcitizenhelp.com/tools` → `https://dayonecitizen.com/tools`

Use `curl -I https://starcitizenhelp.com/game-guides/ccu-chains` to confirm HTTP 301 status.

---

### Task B2: Submit GSC Change of Address

This is a manual step in Google Search Console.

- [ ] **Step 1: Open Google Search Console**

Go to `https://search.google.com/search-console` and select the `starcitizenhelp.com` property.

- [ ] **Step 2: Navigate to Change of Address**

Settings (gear icon) → Change of Address.

- [ ] **Step 3: Complete the Change of Address form**

Select `dayonecitizen.com` as the new domain. Follow the verification steps.

> GSC requires that 301 redirects from the old domain to the new domain are live before this form can be submitted — confirm Task B1 is live before attempting this step.

- [ ] **Step 4: Document the submission**

Update `docs/seo/pending-and-status.md` to note the date of GSC Change of Address submission.

---

### Task B3: Monitor Authority Transfer

- [ ] **Step 1: Set a 4-week monitoring reminder**

After the GSC Change of Address is submitted, check weekly:

**What to look for in GSC (starcitizenhelp.com):**
- Impressions declining for migrated queries ("how to add friends star citizen", "star citizen ccu calculator", "star citizen shops directory")

**What to look for in GSC (dayonecitizen.com):**
- Impressions increasing for those same queries
- New position data for `/beyond-the-basics/` pages

**Success condition:** dayonecitizen.com reaches position parity (within 3 positions) on key queries within 8 weeks of the redirects going live.

- [ ] **Step 2: Update docs/seo/pending-and-status.md after each monthly check**

Add a "Migration Status" section tracking impressions before/after for the three key queries.

---

### Verification Checklist

- [ ] All 8 dayonecitizen /beyond-the-basics pages live and rendering correctly
- [ ] Sitemap includes all 8 new routes
- [ ] GSC URL Inspection requested for all 8 pages
- [ ] StarCitizenHelp redirects confirmed live with HTTP 301
- [ ] GSC Change of Address submitted
- [ ] `docs/seo/migration-plan.md` updated with actual redirect go-live date
- [ ] `docs/seo/redirects.md` migration table updated from "Plan 3" to "✅ Live"
- [ ] `docs/seo/pending-and-status.md` migration row updated
