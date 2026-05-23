# Referral Conversion — Immediate Sprint Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Before the Free Fly event ends May 27 — populate the Day One Citizen Discord with pinned content, add Prospect/Backer roles, and add a Discord invite CTA below the referral button on freeflyevent, dayonecitizen, screferralreward, and screferralbonus. Also add "buy before it ends" urgency copy to freeflyevent.

**Architecture:** Discord tasks use the MCP Discord tools directly (no code). Site tasks create a `DiscordCTA.tsx` component per repo (each repo is independent — no shared package). A permanent Discord invite URL is required first; it flows as an env var (`NEXT_PUBLIC_DISCORD_INVITE_URL`) into all four sites.

**Tech Stack:** Discord MCP tools, Next.js App Router (all 4 sites use identical patterns), Vercel env vars, TypeScript/TSX

**Dependency:** Task 1 must complete before Tasks 4–8 (all code tasks need the invite URL). Tasks 2–3 are independent of the code tasks and can run in parallel.

---

## Task 1: Generate permanent Discord invite link

**Files:** None (Discord server settings — manual step)

- [ ] **Step 1: Create a permanent invite in Discord server settings**

  In the Day One Citizen Discord (server ID: `1465522722707869800`):
  - Open Server Settings → Invites → Create Invite
  - Set expiry: **Never**
  - Set max uses: **No limit**
  - Copy the invite URL (format: `https://discord.gg/XXXXXXX`)

- [ ] **Step 2: Record the invite URL**

  You will use this URL in every subsequent task. It is referenced as `{DISCORD_INVITE_URL}` throughout this plan.

---

## Task 2: Add Prospect and Backer roles to Discord

**Files:** None (Discord MCP tool calls)

These two roles enable targeted messaging to people who have signed up but not yet purchased (Prospect) vs. those who have bought a package (Backer).

- [ ] **Step 1: Create Prospect role**

  Use `mcp__discord__create_role` with:
  ```json
  {
    "name": "Prospect",
    "color": "#7fb3d5",
    "hoist": false,
    "mentionable": true,
    "reason": "Self-assignable role for players who signed up with a referral code but haven't pledged yet"
  }
  ```
  Expected: role created, note the returned role ID.

- [ ] **Step 2: Create Backer role**

  Use `mcp__discord__create_role` with:
  ```json
  {
    "name": "Backer",
    "color": "#c9a227",
    "hoist": false,
    "mentionable": true,
    "reason": "Self-assignable role for players who have purchased a game package"
  }
  ```
  Expected: role created, note the returned role ID.

- [ ] **Step 3: Verify both roles exist**

  Use `mcp__discord__list_roles`. Confirm "Prospect" and "Backer" appear in the list.

- [ ] **Step 4: Configure self-assign via Carl-bot (manual step)**

  This step requires the Carl-bot dashboard at carl.gg — cannot be done via MCP.
  - Log into carl.gg → Day One Citizen server → Reaction Roles
  - Create a reaction role post in `#welcome` or a dedicated channel
  - Add: ✅ = Prospect, 🚀 = Backer
  - Copy the message ID of the reaction role post for reference

---

## Task 3: Post pinned messages to Discord channels

**Files:** None (Discord MCP tool calls)

All four channels currently have zero pinned messages. Post and pin one message per channel. Use `mcp__discord__send_message` then `mcp__discord__pin_message` with the returned message ID.

- [ ] **Step 1: Post welcome message to #welcome (channel ID: `1505955219656278207`)**

  Message content:
  ```
  👋 **Welcome to Day One Citizen!**

  Your plain-English on-ramp for Star Citizen — no question too basic, no pilot left behind.

  **Getting started:**
  • New to the game? Start at https://dayonecitizen.com
  • Haven't signed up yet? Use referral code **STAR-GCQJ-N6NC** at https://robertsspaceindustries.com/enlist?referral=STAR-GCQJ-N6NC — you'll get 50,000 bonus UEC added to your account.
  • Ask anything in <#1505956275215794319> (first-30-days)

  **Assign your role:**
  React below — ✅ if you've signed up with a referral code, 🚀 if you've already bought a package.

  o7 — Doc_Flanigan
  ```

  Then pin the message using `mcp__discord__pin_message` with the returned message ID.

- [ ] **Step 2: Post pinned guide to #first-30-days (channel ID: `1505956275215794319`)**

  Message content:
  ```
  📌 **Your first 30 days in Star Citizen — where to start**

  1. **Complete the tutorial** — open the MobiGlas (F1) and look for the New Player Experience missions.
  2. **Do delivery missions first** — they pay reliably and teach navigation. Find them in the mission app.
  3. **Don't buy anything yet** — earn aUEC in-game before spending real money on components.
  4. **Set your home location** — at a hospital or clinic so respawning is convenient.
  5. **Get the full guide** → https://dayonecitizen.com/day-one-citizen

  Ask anything in this channel — no question is too basic.
  ```

  Pin the message.

- [ ] **Step 3: Post pinned purchase guide to #account-and-pledge (channel ID: `1505956275870105792`)**

  Message content:
  ```
  📌 **Thinking about buying? Here's what we recommend.**

  **The sweet spot for most new players: Aurora Mk II or Avenger Titan (~$45–$55)**

  🚀 **Aurora Mk II (~$45)** — cheapest entry, good all-rounder. Best if you want to learn everything from scratch.
  ⚡ **Avenger Titan (~$55)** — recommended for most players. Flies well, decent cargo, versatile enough for every beginner mission type.
  🔴 **Cutlass Black (~$65–$75)** — ready if you want to play seriously from day one. More ship than most beginners need.

  **Before you buy:** Use referral code **STAR-GCQJ-N6NC** at checkout — you get 50,000 bonus UEC added to your account.

  Full starter package comparison → https://dayonecitizen.com/day-one-citizen/starter-package

  Ask purchase questions in this channel — happy to help you pick the right ship.
  ```

  Pin the message.

- [ ] **Step 4: Post Free Fly event info to #events (channel ID: `1507268022270689432`)**

  Message content:
  ```
  🎉 **Free Fly Event — active now until May 27, 2026**

  Anyone can try Star Citizen for free until May 27 — no purchase required.

  **If you're in the Free Fly and thinking about buying:**
  Buy a starter pack before the event ends and you keep the ships you've been flying. Your progress carries over.

  Starter ship guide → https://dayonecitizen.com/day-one-citizen/starter-package
  Use code **STAR-GCQJ-N6NC** when you enlist to get 50,000 bonus UEC.
  ```

  No need to pin this one — it's time-sensitive and will be outdated after May 27.

- [ ] **Step 5: Verify pins are set**

  Use `mcp__discord__list_pinned_messages` on channels `welcome`, `first-30-days`, and `account-and-pledge`. Confirm each has exactly 1 pinned message.

---

## Task 4: DiscordCTA component + urgency callout — freeflyevent-site

**Files:**
- Create: `E:\Claude Code\sc-portfolio\freeflyevent-site\src\components\DiscordCTA.tsx`
- Create: `E:\Claude Code\sc-portfolio\freeflyevent-site\src\components\UrgencyCallout.tsx`
- Modify: `E:\Claude Code\sc-portfolio\freeflyevent-site\src\app\page.tsx`
- Modify: `E:\Claude Code\sc-portfolio\freeflyevent-site\.env.local`

**Palette:** Orange `#ff5500`, background `#080c14`, muted `#6b7890`, white `#f5f8ff`

- [ ] **Step 1: Add env var to .env.local**

  Open `E:\Claude Code\sc-portfolio\freeflyevent-site\.env.local` and add:
  ```
  NEXT_PUBLIC_DISCORD_INVITE_URL={DISCORD_INVITE_URL}
  ```
  Replace `{DISCORD_INVITE_URL}` with the URL from Task 1.

- [ ] **Step 2: Create DiscordCTA.tsx**

  Create `E:\Claude Code\sc-portfolio\freeflyevent-site\src\components\DiscordCTA.tsx`:
  ```tsx
  'use client'
  import Link from 'next/link'

  const DISCORD_URL = process.env.NEXT_PUBLIC_DISCORD_INVITE_URL ?? '#'

  export function DiscordCTA() {
    return (
      <div className="mt-3 text-center">
        <p className="text-sm" style={{ color: '#6b7890' }}>
          Already signed up?{' '}
          <Link
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#ff7733' }}
            className="underline underline-offset-4 hover:opacity-80 transition-opacity"
          >
            Join the DayOneCitizen Discord
          </Link>{' '}
          for starter help and ship advice.
        </p>
      </div>
    )
  }
  ```

- [ ] **Step 3: Create UrgencyCallout.tsx**

  Create `E:\Claude Code\sc-portfolio\freeflyevent-site\src\components\UrgencyCallout.tsx`:
  ```tsx
  'use client'

  // Remove this component from page.tsx after May 27, 2026
  const EVENT_END = new Date('2026-05-28T00:00:00Z')

  export function UrgencyCallout() {
    if (new Date() >= EVENT_END) return null
    return (
      <div className="mx-auto max-w-2xl px-4 py-3">
        <div
          className="rounded-lg border px-4 py-3 text-sm text-center"
          style={{ borderColor: '#ff5500', backgroundColor: '#1a0800', color: '#ffcca0' }}
        >
          <strong>Free Fly ends May 27.</strong>{' '}
          Buy a starter pack before it ends and you keep the ships you&apos;ve been flying — your progress carries over.
        </div>
      </div>
    )
  }
  ```

- [ ] **Step 4: Add both components to page.tsx**

  Open `E:\Claude Code\sc-portfolio\freeflyevent-site\src\app\page.tsx`.

  At the top of the file, add to the imports:
  ```tsx
  import { DiscordCTA } from '@/components/DiscordCTA'
  import { UrgencyCallout } from '@/components/UrgencyCallout'
  ```

  Find the main referral `<CTAButton>` in the page JSX. Add `<DiscordCTA />` immediately after it (not inside the same container — as its own sibling element):
  ```tsx
  <CTAButton trackingLabel="Homepage CTA">
    {/* existing button content */}
  </CTAButton>
  <DiscordCTA />
  ```

  Find a natural section break below the hero/event status area and add `<UrgencyCallout />` there. A good position is after the main event details card but before any FAQ or secondary sections.

- [ ] **Step 5: Verify locally**

  ```
  cd "E:\Claude Code\sc-portfolio\freeflyevent-site"
  npm run dev
  ```
  Open http://localhost:3000. Confirm:
  - Discord CTA text appears below the main enlist button
  - Orange urgency callout box appears on the page
  - Both disappear cleanly if you temporarily set `EVENT_END = new Date('2020-01-01')` then restore

- [ ] **Step 6: Commit**

  ```bash
  cd "E:\Claude Code\sc-portfolio\freeflyevent-site"
  git add src/components/DiscordCTA.tsx src/components/UrgencyCallout.tsx src/app/page.tsx
  git commit -m "feat: add Discord invite CTA and Free Fly urgency callout

  - DiscordCTA renders below main enlist button with invite link
  - UrgencyCallout shows 'buy before May 27' message, auto-hides after event end
  - Both use NEXT_PUBLIC_DISCORD_INVITE_URL env var"
  ```

---

## Task 5: DiscordCTA component — dayonecitizen-main

**Files:**
- Create: `E:\Claude Code\sc-portfolio\dayonecitizen-main\src\components\DiscordCTA.tsx`
- Modify: `E:\Claude Code\sc-portfolio\dayonecitizen-main\src\app\day-one-citizen\buying-the-game\page.tsx`
- Modify: `E:\Claude Code\sc-portfolio\dayonecitizen-main\.env.local`

**Palette:** Navy `#0a0e1a`, gold `#f0c040`, muted `#8892a4`

- [ ] **Step 1: Add env var to .env.local**

  Open `E:\Claude Code\sc-portfolio\dayonecitizen-main\.env.local` and add:
  ```
  NEXT_PUBLIC_DISCORD_INVITE_URL={DISCORD_INVITE_URL}
  ```

- [ ] **Step 2: Create DiscordCTA.tsx**

  Create `E:\Claude Code\sc-portfolio\dayonecitizen-main\src\components\DiscordCTA.tsx`:
  ```tsx
  'use client'
  import Link from 'next/link'

  const DISCORD_URL = process.env.NEXT_PUBLIC_DISCORD_INVITE_URL ?? '#'

  export function DiscordCTA() {
    return (
      <div className="mt-3 text-center">
        <p className="text-sm" style={{ color: '#8892a4' }}>
          Already enlisted?{' '}
          <Link
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#f0c040' }}
            className="underline underline-offset-4 hover:opacity-80 transition-opacity"
          >
            Join the DayOneCitizen Discord
          </Link>{' '}
          for starter help and ship advice.
        </p>
      </div>
    )
  }
  ```

- [ ] **Step 3: Add DiscordCTA to buying-the-game page**

  Open `E:\Claude Code\sc-portfolio\dayonecitizen-main\src\app\day-one-citizen\buying-the-game\page.tsx`.

  Add to imports:
  ```tsx
  import { DiscordCTA } from '@/components/DiscordCTA'
  ```

  Find the `<CTAButton>` that links to the RSI enlist URL. Add `<DiscordCTA />` immediately after it:
  ```tsx
  <CTAButton ... trackingLabel="Buying the Game CTA">
    Enlist Now
  </CTAButton>
  <DiscordCTA />
  ```

- [ ] **Step 4: Verify locally**

  ```
  cd "E:\Claude Code\sc-portfolio\dayonecitizen-main"
  npm run dev
  ```
  Navigate to http://localhost:3000/day-one-citizen/buying-the-game. Confirm Discord CTA link appears below the enlist button.

- [ ] **Step 5: Commit**

  ```bash
  cd "E:\Claude Code\sc-portfolio\dayonecitizen-main"
  git add src/components/DiscordCTA.tsx src/app/day-one-citizen/buying-the-game/page.tsx
  git commit -m "feat: add Discord invite CTA to buying-the-game step"
  ```

---

## Task 6: DiscordCTA component — screferralreward-site

**Files:**
- Create: `E:\Claude Code\sc-portfolio\screferralreward-site\src\components\DiscordCTA.tsx`
- Modify: `E:\Claude Code\sc-portfolio\screferralreward-site\src\app\get-the-code\page.tsx`
- Modify: `E:\Claude Code\sc-portfolio\screferralreward-site\.env.local`

**Palette:** Charcoal `#111418`, gold `#ffd700`, muted `#6b7280`

- [ ] **Step 1: Add env var to .env.local**

  Open `E:\Claude Code\sc-portfolio\screferralreward-site\.env.local` and add:
  ```
  NEXT_PUBLIC_DISCORD_INVITE_URL={DISCORD_INVITE_URL}
  ```

- [ ] **Step 2: Create DiscordCTA.tsx**

  Create `E:\Claude Code\sc-portfolio\screferralreward-site\src\components\DiscordCTA.tsx`:
  ```tsx
  'use client'
  import Link from 'next/link'

  const DISCORD_URL = process.env.NEXT_PUBLIC_DISCORD_INVITE_URL ?? '#'

  export function DiscordCTA() {
    return (
      <div className="mt-3 text-center">
        <p className="text-sm" style={{ color: '#6b7280' }}>
          Already signed up?{' '}
          <Link
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#ffd700' }}
            className="underline underline-offset-4 hover:opacity-80 transition-opacity"
          >
            Join the DayOneCitizen Discord
          </Link>{' '}
          for starter help and ship advice.
        </p>
      </div>
    )
  }
  ```

- [ ] **Step 3: Add DiscordCTA to get-the-code page**

  Open `E:\Claude Code\sc-portfolio\screferralreward-site\src\app\get-the-code\page.tsx`.

  Add to imports:
  ```tsx
  import { DiscordCTA } from '@/components/DiscordCTA'
  ```

  Find the main `<CTAButton>` and add `<DiscordCTA />` immediately after it:
  ```tsx
  <CTAButton trackingLabel="Get the Code CTA" />
  <DiscordCTA />
  ```

- [ ] **Step 4: Verify locally**

  ```
  cd "E:\Claude Code\sc-portfolio\screferralreward-site"
  npm run dev
  ```
  Navigate to http://localhost:3000/get-the-code. Confirm Discord CTA appears below the main button.

- [ ] **Step 5: Commit**

  ```bash
  cd "E:\Claude Code\sc-portfolio\screferralreward-site"
  git add src/components/DiscordCTA.tsx src/app/get-the-code/page.tsx
  git commit -m "feat: add Discord invite CTA to get-the-code page"
  ```

---

## Task 7: DiscordCTA component — screferralbonus-site

**Files:**
- Create: `E:\Claude Code\sc-portfolio\screferralbonus-site\src\components\DiscordCTA.tsx`
- Modify: `E:\Claude Code\sc-portfolio\screferralbonus-site\src\app\page.tsx`
- Modify: `E:\Claude Code\sc-portfolio\screferralbonus-site\.env.local`

**Palette:** Charcoal `#111418`, gold `#ffd700`, muted `#6b7280`

- [ ] **Step 1: Add env var to .env.local**

  Open `E:\Claude Code\sc-portfolio\screferralbonus-site\.env.local` and add:
  ```
  NEXT_PUBLIC_DISCORD_INVITE_URL={DISCORD_INVITE_URL}
  ```

- [ ] **Step 2: Create DiscordCTA.tsx**

  Create `E:\Claude Code\sc-portfolio\screferralbonus-site\src\components\DiscordCTA.tsx`:
  ```tsx
  'use client'
  import Link from 'next/link'

  const DISCORD_URL = process.env.NEXT_PUBLIC_DISCORD_INVITE_URL ?? '#'

  export function DiscordCTA() {
    return (
      <div className="mt-3 text-center">
        <p className="text-sm" style={{ color: '#6b7280' }}>
          Already signed up?{' '}
          <Link
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#ffd700' }}
            className="underline underline-offset-4 hover:opacity-80 transition-opacity"
          >
            Join the DayOneCitizen Discord
          </Link>{' '}
          for starter help and ship advice.
        </p>
      </div>
    )
  }
  ```

- [ ] **Step 3: Add DiscordCTA to homepage**

  Open `E:\Claude Code\sc-portfolio\screferralbonus-site\src\app\page.tsx`.

  Add to imports:
  ```tsx
  import { DiscordCTA } from '@/components/DiscordCTA'
  ```

  Find the main `<CTAButton>` in the hero section (above the fold). Add `<DiscordCTA />` immediately after it:
  ```tsx
  <CTAButton trackingLabel="Hero CTA" />
  <DiscordCTA />
  ```

- [ ] **Step 4: Verify locally**

  ```
  cd "E:\Claude Code\sc-portfolio\screferralbonus-site"
  npm run dev
  ```
  Open http://localhost:3000. Confirm Discord CTA appears below the main hero button.

- [ ] **Step 5: Commit**

  ```bash
  cd "E:\Claude Code\sc-portfolio\screferralbonus-site"
  git add src/components/DiscordCTA.tsx src/app/page.tsx
  git commit -m "feat: add Discord invite CTA below hero CTA"
  ```

---

## Task 8: Add NEXT_PUBLIC_DISCORD_INVITE_URL to Vercel for all 4 sites

**Files:** None (Vercel dashboard — or use Vercel CLI)

- [ ] **Step 1: Add env var via Vercel CLI for all 4 projects**

  Run once per project, replacing `{DISCORD_INVITE_URL}` with the URL from Task 1:

  ```bash
  cd "E:\Claude Code\sc-portfolio\freeflyevent-site"
  vercel env add NEXT_PUBLIC_DISCORD_INVITE_URL production
  # paste the invite URL when prompted

  cd "E:\Claude Code\sc-portfolio\dayonecitizen-main"
  vercel env add NEXT_PUBLIC_DISCORD_INVITE_URL production

  cd "E:\Claude Code\sc-portfolio\screferralreward-site"
  vercel env add NEXT_PUBLIC_DISCORD_INVITE_URL production

  cd "E:\Claude Code\sc-portfolio\screferralbonus-site"
  vercel env add NEXT_PUBLIC_DISCORD_INVITE_URL production
  ```

  Repeat for `preview` and `development` environments if prompted.

- [ ] **Step 2: Trigger redeploys**

  Push the commits from Tasks 4–7 to trigger Vercel production deploys. Alternatively:
  ```bash
  cd "E:\Claude Code\sc-portfolio\freeflyevent-site" && vercel --prod
  cd "E:\Claude Code\sc-portfolio\dayonecitizen-main" && vercel --prod
  cd "E:\Claude Code\sc-portfolio\screferralreward-site" && vercel --prod
  cd "E:\Claude Code\sc-portfolio\screferralbonus-site" && vercel --prod
  ```

- [ ] **Step 3: Smoke test all 4 live sites**

  On each production URL, confirm:
  - Discord CTA text is visible below the main enlist button
  - The link opens the correct Discord invite
  - freeflyevent.com shows the urgency callout box

---

## Task 9: Manual setup steps checklist

These steps cannot be done via code or MCP — they require UI tools.

- [ ] **Carl-bot welcome DM configuration**
  - Log in at carl.gg → Day One Citizen server → Logs → Welcome
  - Enable DM on join
  - Set message:
    ```
    Welcome to Day One Citizen! Whether you're in the Free Fly or just signed up — ask anything in #new-player-help. Haven't enlisted yet? Use code STAR-GCQJ-N6NC at https://robertsspaceindustries.com/enlist?referral=STAR-GCQJ-N6NC to get 50,000 bonus UEC.
    ```

- [ ] **Discord onboarding prompts**
  - Open Discord → Day One Citizen server → Server Settings → Onboarding
  - Add Question 1: "What's your Star Citizen status?"
    - Option A: "🎮 Free Fly — just trying it out" → assign role `Just Curious`
    - Option B: "✅ Signed up with a referral code" → assign role `Prospect`
    - Option C: "🚀 Bought a game package" → assign role `Backer`
    - Option D: "🔄 Returning pilot, back after a break" → assign role `Returning Pilot`
  - Add Question 2: "What are you interested in?"
    - Options: Combat / Mining / Trading / Exploration / Salvage / FPS
    - Each assigns the corresponding gameplay role and shows the relevant gameplay channel

- [ ] **Verify onboarding works**
  - Use an alt account or ask a test user to join and complete onboarding
  - Confirm they receive the correct roles and see the right channels

---

## Post-Sprint Cleanup (after May 27)

- [ ] Remove `<UrgencyCallout />` from `freeflyevent-site/src/app/page.tsx`
- [ ] Remove import of `UrgencyCallout` from `page.tsx`
- [ ] Optionally delete `UrgencyCallout.tsx` (or keep with updated date for next event)
- [ ] Update `#events` channel in Discord with "Free Fly has ended" post
