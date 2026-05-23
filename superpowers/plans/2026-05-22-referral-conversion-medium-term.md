# Referral Conversion — Medium Term Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish the StarCitizenHelp buyer's guide (draft → live page), add a purchase decision section to bestspacesim.com, seed and launch the r/DayOneCitizen subreddit, and produce the first YouTube video.

**Architecture:** StarCitizenHelp uses a data-driven guide system — add the guide object to `guides.ts`, no new route files needed. bestspacesim adds a new JSX section to the existing `page.tsx`. Subreddit and YouTube are non-code tasks with explicit content checklists.

**Tech Stack:** Next.js App Router (StarCitizenHelp, bestspacesim), TypeScript/TSX, Reddit, YouTube/DaVinci Resolve

---

## Task 1: Publish StarCitizenHelp buyer's guide

**Files:**
- Read: `E:\Claude Code\sc-portfolio\StarCitizenHelp-live\src\data\drafts\guide-14-worth-it.txt`
- Modify: `E:\Claude Code\sc-portfolio\StarCitizenHelp-live\src\data\guides.ts`

The guide system is data-driven. Adding an object to `guides.ts` automatically creates the route `/game-guides/is-star-citizen-worth-it` via `generateStaticParams()` in `src/app/game-guides/[slug]/page.tsx`. No new files needed.

- [ ] **Step 1: Read the draft file**

  Open `E:\Claude Code\sc-portfolio\StarCitizenHelp-live\src\data\drafts\guide-14-worth-it.txt` in full. This contains the complete guide object structure ready to add to guides.ts. Note the `contentHtml` field — it is stringified HTML.

- [ ] **Step 2: Check guides.ts structure**

  Open `E:\Claude Code\sc-portfolio\StarCitizenHelp-live\src\data\guides.ts`. Confirm the shape of existing guide objects. The array is exported as `guides` (or similar). Note the highest existing `id` value — the new guide should use id `14`.

- [ ] **Step 3: Add referral code to contentHtml before publishing**

  In the draft's `contentHtml`, find the section that explains how to sign up or buy. Add this paragraph immediately before or after the "how to buy" section:

  ```html
  <p>Before you buy, use a referral code when you enlist — you'll get 50,000 bonus UEC added to your account automatically. Use code <strong>STAR-GCQJ-N6NC</strong> at <a href="https://robertsspaceindustries.com/enlist?referral=STAR-GCQJ-N6NC" target="_blank" rel="noopener noreferrer" class="text-primary underline">robertsspaceindustries.com/enlist</a>.</p>
  ```

- [ ] **Step 4: Append guide object to guides.ts**

  Add the full guide object from the draft file to the end of the guides array in `guides.ts`. The object includes: `id`, `slug`, `title`, `description`, `skillLevel`, `tags`, `updatedAt`, `featured`, `helpfulCount`, `shareCount`, `metaTitle`, `metaDescription`, `h1`, `ogImage`, `ogImageAlt`, `contentHtml`, `jsonLd`.

  Ensure `updatedAt` uses today's date: `"2026-05-22"` (or the actual publish date).

- [ ] **Step 5: Verify the route builds**

  ```
  cd "E:\Claude Code\sc-portfolio\StarCitizenHelp-live"
  npm run dev
  ```

  Navigate to http://localhost:3000/game-guides/is-star-citizen-worth-it. Confirm:
  - Page renders with correct title and content
  - Referral code paragraph appears in the body
  - No TypeScript errors in the terminal

- [ ] **Step 6: Verify it appears in the guide index**

  Navigate to http://localhost:3000/game-guides. Confirm the new guide appears in the listing with correct title and description.

- [ ] **Step 7: Update sitemap**

  Check `E:\Claude Code\sc-portfolio\StarCitizenHelp-live\src\app\sitemap.ts` (or `sitemap.xml` if static). Confirm the new slug `/game-guides/is-star-citizen-worth-it` will be included. If sitemap is generated from the guides array, it will be automatic. If it's a static file, add the entry:
  ```xml
  <url>
    <loc>https://starcitizenhelp.com/game-guides/is-star-citizen-worth-it</loc>
    <lastmod>2026-05-22</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  ```

- [ ] **Step 8: Commit**

  ```bash
  cd "E:\Claude Code\sc-portfolio\StarCitizenHelp-live"
  git add src/data/guides.ts
  git commit -m "feat: publish is-star-citizen-worth-it buyer's guide

  - Adds guide-14 from drafts to live guides array
  - Includes referral code STAR-GCQJ-N6NC in how-to-buy section
  - Route: /game-guides/is-star-citizen-worth-it"
  ```

- [ ] **Step 9: Submit to Google Search Console after deployment**

  After pushing and deploying: in GSC for starcitizenhelp.com, use URL Inspection → Request Indexing for:
  `https://starcitizenhelp.com/game-guides/is-star-citizen-worth-it`

---

## Task 2: Add purchase section to bestspacesim.com

**Files:**
- Modify: `E:\Claude Code\sc-portfolio\bestspacesim-site\src\app\page.tsx`

The homepage already has a "WhyStarCitizen" section and a "FreeFlyCTA" section at the bottom. Add a new "Getting Started" section between them — short, 2–3 paragraphs, with referral code and link to dayonecitizen.com.

- [ ] **Step 1: Read page.tsx**

  Open `E:\Claude Code\sc-portfolio\bestspacesim-site\src\app\page.tsx` in full. Identify:
  - The WhyStarCitizen section (4 reason cards) — the new section goes AFTER this
  - The FreeFlyCTA section at the bottom — the new section goes BEFORE this
  - The import section at the top — confirm CTAButton is already imported

- [ ] **Step 2: Add getting-started section to page.tsx**

  After the WhyStarCitizen section close tag and before the FreeFlyCTA section, insert:

  ```tsx
  {/* Getting Started with Star Citizen */}
  <section className="py-16 px-4" style={{ backgroundColor: '#0d1f16' }}>
    <div className="mx-auto max-w-3xl">
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#eef2ee' }}>
        Ready to try it? Here&apos;s where to start.
      </h2>
      <p className="mb-4" style={{ color: '#7a8f7d' }}>
        The cheapest way in is a{' '}
        <strong style={{ color: '#eef2ee' }}>starter package (~$45–$55)</strong>.
        For most new players, the{' '}
        <strong style={{ color: '#eef2ee' }}>Avenger Titan (~$55)</strong> is the best
        first ship — versatile enough for every beginner mission type, good cargo
        capacity, and comfortable to fly. The Aurora Mk II (~$45) works if you want
        the absolute minimum to get in the door.
      </p>
      <p className="mb-6" style={{ color: '#7a8f7d' }}>
        Before you buy: use a referral code when you create your account and you&apos;ll
        get{' '}
        <strong style={{ color: '#eef2ee' }}>50,000 bonus UEC</strong>{' '}
        added automatically. Use code{' '}
        <strong style={{ color: '#eef2ee' }}>STAR-GCQJ-N6NC</strong>.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <CTAButton
          href={`https://robertsspaceindustries.com/enlist?referral=STAR-GCQJ-N6NC`}
          trackingLabel="Getting Started Section CTA"
        >
          Enlist with Referral Code
        </CTAButton>
        <a
          href="https://dayonecitizen.com/day-one-citizen/starter-package"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium underline underline-offset-4"
          style={{ color: '#7a8f7d' }}
        >
          Compare all starter ships →
        </a>
      </div>
    </div>
  </section>
  ```

  Note: `CTAButton` uses `getRotatedReferralUrl()` internally — the `href` prop above is a fallback. Check CTAButton's props interface in `src/components/CTAButton.tsx`. If it ignores the `href` prop and always uses the rotator, remove the `href` prop and let the rotator handle it. If it accepts `href` as an override, keep it.

- [ ] **Step 3: Verify locally**

  ```
  cd "E:\Claude Code\sc-portfolio\bestspacesim-site"
  npm run dev
  ```

  Open http://localhost:3000. Scroll past the "Why Star Citizen" section. Confirm the new "Ready to try it?" section appears with correct colors, text, and a working CTA button.

- [ ] **Step 4: Commit**

  ```bash
  cd "E:\Claude Code\sc-portfolio\bestspacesim-site"
  git add src/app/page.tsx
  git commit -m "feat: add starter package purchase section to homepage

  - New section between WhyStarCitizen and FreeFlyCTA
  - Recommends Avenger Titan / Aurora Mk II with prices
  - Includes referral code STAR-GCQJ-N6NC and UEC bonus
  - Links to dayonecitizen.com/day-one-citizen/starter-package"
  ```

---

## Task 3: Seed and launch r/DayOneCitizen subreddit

**Files:** None (Reddit UI — manual steps)

Do NOT make the subreddit public until all seed content is in place.

- [ ] **Step 1: Configure subreddit settings**

  At reddit.com/r/DayOneCitizen → Mod Tools → Community Settings:
  - Display name: `DayOneCitizen`
  - Community description (shown in sidebar): 
    ```
    Your plain-English on-ramp for Star Citizen. Guides, beginner tips, and patient answers for new pilots. No question too basic, no pilot left behind.
    
    🔗 Full guide: https://dayonecitizen.com
    💬 Discord: {DISCORD_INVITE_URL}
    📖 Referral code: STAR-GCQJ-N6NC
    ```
  - Type: Set to **Private** until seeded, then change to **Public** in Step 6

- [ ] **Step 2: Set subreddit rules**

  Add Rules (Mod Tools → Rules):
  1. **Be helpful** — Answer questions honestly. No elitism toward new players.
  2. **No referral code spam** — One referral code post is allowed. No flooding.
  3. **No sales or trading** — This is a help community, not a marketplace.
  4. **Stay on topic** — Star Citizen and Day One Citizen content only.
  5. **No low-effort posts** — Put enough context in your post for someone to actually help you.

- [ ] **Step 3: Create pinned "About this community" post**

  Post as Doc_Flanigan:
  ```
  Title: Welcome to r/DayOneCitizen — your new player hub for Star Citizen

  Body:
  This community is the Reddit home of DayOneCitizen.com — a plain-English guide for anyone 
  starting Star Citizen for the first time.

  **What this subreddit is for:**
  - Questions from new and returning players
  - Tips and guides for getting started
  - Discussion of the game for people still learning the ropes

  **Resources:**
  - Full new player guide: https://dayonecitizen.com
  - Discord for real-time help: {DISCORD_INVITE_URL}
  - Starter ship comparison: https://dayonecitizen.com/day-one-citizen/starter-package

  **Referral code:** STAR-GCQJ-N6NC — use this when you enlist at RSI and you'll get 
  50,000 bonus UEC. Link: https://robertsspaceindustries.com/enlist?referral=STAR-GCQJ-N6NC

  o7 — Doc_Flanigan
  ```

  Pin this post (Mod Tools → Sticky).

- [ ] **Step 4: Create seed post — Starter ship guide**

  ```
  Title: Which starter ship should you buy first in Star Citizen? (2026 guide)

  Body: [Summarize the content from dayonecitizen.com/day-one-citizen/starter-package 
  in 3–5 paragraphs. Cover Aurora Mk II, Avenger Titan, and Cutlass Black. 
  End with a link to the full guide.]
  ```

- [ ] **Step 5: Create seed post — First 30 days guide**

  ```
  Title: What to do in your first 30 days in Star Citizen

  Body: [Summarize the dayonecitizen.com first-day content. 5 bullet points covering 
  the tutorial, delivery missions, not buying gear too early, setting home location, 
  and finding an org. End with the full guide link.]
  ```

- [ ] **Step 6: Create seed post — Free Fly explainer (time-sensitive)**

  ```
  Title: Star Citizen Free Fly is live until May 27 — here's everything you need to know

  Body: What it is, how to access it, what to do during it, and whether to buy before 
  it ends. Link to freeflyevent.com.
  ```

- [ ] **Step 7: Make subreddit public**

  Mod Tools → Community Settings → Type → change from Private to **Public**.

- [ ] **Step 8: Add subreddit link to dayonecitizen.com and Discord**

  - In Discord `#welcome` pinned message: add `📱 Reddit: https://reddit.com/r/DayOneCitizen`
  - In dayonecitizen.com footer or about page: add link to the subreddit

---

## Task 4: First YouTube video — starter ship guide

**Files:** None (creative production — checklist format)

This is the highest-leverage YouTube video for referral conversion because it directly addresses the $45 purchase decision. Complete all pre-production steps before filming.

- [ ] **Step 1: Write a bullet-point script outline**

  Structure:
  1. Hook (15 sec): "You've been in the Free Fly and you're thinking about buying — but which ship? Let me save you 30 minutes of Reddit reading."
  2. Context (30 sec): What a starter pack is, price range ($45–$75), what you get.
  3. Aurora Mk II (90 sec): Who it's for, strengths, weaknesses, gameplay demo clip.
  4. Avenger Titan (90 sec): Why it's the recommendation for most players, demo clip.
  5. Cutlass Black (60 sec): For players ready to play seriously from day one.
  6. Referral code mention (30 sec): Natural — "before you buy, use a referral code, you get 50,000 UEC free. I'll put mine in the description."
  7. Outro (30 sec): Subscribe, Discord link, dayonecitizen.com.

  Total target runtime: ~6–8 minutes.

- [ ] **Step 2: Gather SC footage**

  Record or capture existing footage of:
  - Aurora Mk II: cockpit, exterior flyby, landing at a station
  - Avenger Titan: same shots
  - Cutlass Black: same shots
  - At least one mission clip per ship (delivery run or combat)

  Use existing transcoded footage from the DaVinci workflow if available.

- [ ] **Step 3: Stream the recording session on Twitch**

  Stream at least the commentary/gameplay portion on Twitch. This gives you the VOD for the YouTube upload and starts building a Twitch audience.

- [ ] **Step 4: Export VOD and edit in DaVinci Resolve**

  - Export Twitch VOD at source quality
  - Edit in DaVinci: cut dead air, add B-roll ship footage, add lower-thirds for ship names/prices
  - Mix audio: voice clear, game audio ~20% under voice
  - Add intro card and outro card (Discord + subscribe)

- [ ] **Step 5: Upload to YouTube**

  - Title: `Which Ship Should You Buy First in Star Citizen? (2026 Starter Pack Guide)`
  - Description:
    ```
    Which starter ship is right for you? I break down every starter pack under $75 so 
    you know exactly what you're buying before you spend a dollar.

    Use referral code STAR-GCQJ-N6NC when you sign up at RSI — you'll get 50,000 bonus 
    UEC added to your account automatically:
    https://robertsspaceindustries.com/enlist?referral=STAR-GCQJ-N6NC

    Full new player guide → https://dayonecitizen.com
    Discord → {DISCORD_INVITE_URL}
    Reddit → https://reddit.com/r/DayOneCitizen

    Timestamps:
    0:00 - Intro
    0:15 - What is a starter pack?
    0:45 - Aurora Mk II
    2:15 - Avenger Titan (recommended)
    3:45 - Cutlass Black
    5:15 - How to use a referral code
    5:45 - Outro
    ```
  - Tags: star citizen, star citizen starter pack, star citizen beginner guide, which ship to buy star citizen, star citizen 2026, aurora mk ii, avenger titan
  - Thumbnail: Side-by-side of the three ships with text overlay "Which Ship?" — use a screenshot from in-game

- [ ] **Step 6: Add end screen and cards in YouTube Studio**

  - End screen: Subscribe button + link to dayonecitizen.com (as external link)
  - Card at the referral mention timestamp: link to RSI signup with referral code

- [ ] **Step 7: Add YouTube channel link to dayonecitizen.com and Discord**

  - dayonecitizen.com: add YouTube channel link in footer or navigation
  - Discord: add YouTube channel link to `#welcome` pinned message
