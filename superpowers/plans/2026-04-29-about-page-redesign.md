# About Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `/o7-meaning` page with a new `/about` page, update the nav link, and wire the 301 redirect.

**Architecture:** Create `src/app/about/page.tsx` as the new page, delete `src/app/o7-meaning/page.tsx`, flip the existing `/about`→`/o7-meaning` redirect in `next.config.mjs` to `/o7-meaning`→`/about`, and update `NAV_LINKS` in `src/lib/site.ts`. No new components required — all existing components (`NavBar`, `Footer`, `CTAButton`, `Term`) are reused.

**Tech Stack:** Next.js 14 App Router · TypeScript · Tailwind CSS · `src/lib/site.ts` for site constants

---

## File Map

| Action | File | What changes |
|---|---|---|
| Modify | `src/lib/site.ts` | `NAV_LINKS` entry: `o7 Meaning` → `About`, href `/o7-meaning` → `/about` |
| Modify | `next.config.mjs` | Remove `/about`→`/o7-meaning` redirect; add `/o7-meaning`→`/about` redirect |
| Create | `src/app/about/page.tsx` | New About page (full content below) |
| Delete | `src/app/o7-meaning/page.tsx` | Removed — redirect in `next.config.mjs` handles the old URL |

---

## Task 1: Update NAV_LINKS

**Files:**
- Modify: `src/lib/site.ts:20-26`

- [ ] **Step 1: Edit NAV_LINKS**

Open `E:\Claude Code\sc-portfolio\dayonecitizen-main\src\lib\site.ts`.

Find:
```typescript
{ href: '/o7-meaning', label: 'o7 Meaning' },
```

Replace with:
```typescript
{ href: '/about', label: 'About' },
```

- [ ] **Step 2: Verify**

The full `NAV_LINKS` array should now read:
```typescript
export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/day-one-citizen', label: 'Day One Citizen' },
  { href: '/glossary', label: 'Glossary' },
  { href: '/free-fly-events', label: 'Free Fly Events' },
  { href: '/about', label: 'About' },
] as const
```

- [ ] **Step 3: Commit**

```bash
cd "E:\Claude Code\sc-portfolio\dayonecitizen-main"
git add src/lib/site.ts
git commit -m "feat: rename nav link o7 Meaning → About, update href to /about"
```

---

## Task 2: Update redirects in next.config.mjs

**Files:**
- Modify: `next.config.mjs:47-51`

The current file has this entry (lines 49–51):
```javascript
// /about merged into /o7-meaning (which now carries the About content
// as a section near the bottom). 308 preserves backlink equity.
{ source: '/about', destination: '/o7-meaning', permanent: true },
```

- [ ] **Step 1: Replace the /about redirect with a /o7-meaning redirect**

Remove the three lines above and replace with:
```javascript
// /o7-meaning is now /about. 301 passes SEO equity to the new URL.
{ source: '/o7-meaning', destination: '/about', permanent: true },
```

The redirects array should end with:
```javascript
      { source: '/weekly-update', destination: '/', permanent: true },
      { source: '/weekly-update/:path*', destination: '/', permanent: true },
      // /o7-meaning is now /about. 301 passes SEO equity to the new URL.
      { source: '/o7-meaning', destination: '/about', permanent: true },
    ]
```

- [ ] **Step 2: Verify the full redirects() function looks correct**

```javascript
async redirects() {
  return [
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'o7citizen.com' }],
      destination: 'https://dayonecitizen.com/:path*',
      permanent: true,
    },
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'www.o7citizen.com' }],
      destination: 'https://dayonecitizen.com/:path*',
      permanent: true,
    },
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'o7citizens.com' }],
      destination: 'https://dayonecitizen.com/:path*',
      permanent: true,
    },
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'www.o7citizens.com' }],
      destination: 'https://dayonecitizen.com/:path*',
      permanent: true,
    },
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'o7citizen.gg' }],
      destination: 'https://dayonecitizen.com/:path*',
      permanent: true,
    },
    { source: '/weekly-update', destination: '/', permanent: true },
    { source: '/weekly-update/:path*', destination: '/', permanent: true },
    // /o7-meaning is now /about. 301 passes SEO equity to the new URL.
    { source: '/o7-meaning', destination: '/about', permanent: true },
  ]
},
```

- [ ] **Step 3: Commit**

```bash
cd "E:\Claude Code\sc-portfolio\dayonecitizen-main"
git add next.config.mjs
git commit -m "feat: redirect /o7-meaning → /about (permanent 301)"
```

---

## Task 3: Create src/app/about/page.tsx

**Files:**
- Create: `src/app/about/page.tsx`

This is the new About page. Write the file with the exact content below.

- [ ] **Step 1: Create the directory and file**

```bash
mkdir -p "E:\Claude Code\sc-portfolio\dayonecitizen-main\src\app\about"
```

- [ ] **Step 2: Write the file**

Write `E:\Claude Code\sc-portfolio\dayonecitizen-main\src\app\about\page.tsx` with this exact content:

```typescript
import type { Metadata } from 'next'
import { Check, X } from 'lucide-react'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import CTAButton from '@/components/CTAButton'
import Term from '@/components/Term'
import { SITE } from '@/lib/site'

const FAQ = [
  {
    q: 'What does o7 mean?',
    a: "o7 is a salute. The 'o' is a head and the '7' is an arm raised to the brow. Tilt your head sideways and you'll see it. It's used to say hello, goodbye, respect, or 'fly safe' across many online gaming and military sci-fi communities.",
  },
  {
    q: 'Where did o7 originate?',
    a: "o7 originated in EVE Online in the early 2000s, where pilots used it as a quick respect emoticon in local chat. It has since spread to most online sci-fi gaming communities, including Star Citizen, Elite Dangerous, the X-series, and military aviation circles.",
  },
  {
    q: 'How do you respond to o7?',
    a: "Respond with o7 back. It's a mutual salute. You can also use \\o (a hand wave) or o7o (saluting with both hands) for variety. Some people add the recipient's name, like 'o7 Doc' for a more personal greeting.",
  },
  {
    q: 'Is o7 only used in Star Citizen?',
    a: 'No. o7 is common across many gaming communities — EVE Online (where it started), Elite Dangerous, Star Citizen, World of Warships, military flight sims, and any community with a strong "fly safe" culture. It also appears on Twitch, Discord, and gaming Twitter.',
  },
  {
    q: 'What does \\o mean vs. o7?',
    a: '\\o is a wave (open hand raised, casual hello or goodbye). o7 is a salute (formal respect, fly safe, godspeed). \\o\\ /o/ are dancing/cheering. o7o is a two-handed salute. They are all from the same family of typed emoticons.',
  },
]

export const metadata: Metadata = {
  title: 'What Does o7 Mean? The Star Citizen Salute Explained',
  description:
    "o7 is an emoticon salute used across Star Citizen and gaming communities. The 'o' is a head, the '7' is a raised arm. Here's everything you need to know.",
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'What Does o7 Mean? The Star Citizen Salute Explained',
    description:
      "o7 is an emoticon salute. The 'o' is a head, the '7' is a raised arm. Originated in EVE Online, now used across all of sci-fi gaming.",
    url: '/about',
    type: 'article',
  },
  twitter: {
    title: 'What Does o7 Mean? The Star Citizen Salute Explained',
    description: "o7 is an emoticon salute. 'o' is a head, '7' is a raised arm.",
    card: 'summary_large_image',
  },
}

export default function AboutPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'What Does o7 Mean? The Star Citizen Salute Explained',
    description:
      "o7 is an emoticon salute used across Star Citizen and gaming communities. The 'o' is a head, the '7' is a raised arm.",
    author: { '@type': 'Person', name: SITE.author },
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    mainEntityOfPage: `${SITE.url}/about`,
    image: `${SITE.url}/images/hero/hero-01.jpg`,
  }

  return (
    <>
      <NavBar />
      <main className="bg-navy">

        {/* ── Hero ── */}
        <header className="border-b border-white/5 bg-gradient-to-b from-navy to-navyLight/30 pb-16 pt-32 sm:pt-40">
          <div className="container-narrow">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              About this site
            </p>
            <h1 className="heading-display text-4xl sm:text-5xl">
              DayOneCitizen.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-starwhite/85">
              Star Citizen for complete beginners. Plain English. No assumptions.
              No jargon without explanation. An unofficial fan site by {SITE.author}.
            </p>
          </div>
        </header>

        <article className="container-narrow space-y-12 py-16">

          {/* ── Personal Story ── */}
          <section>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Why I built it
            </p>
            <h2 className="heading-display text-3xl">
              Why I built DayOneCitizen.
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-starwhite/85">
              <p>
                I still remember the sheer frustration of that first session. I was stumbling
                around Port Olisar — a space station that once orbited the planet{' '}
                <Term name="Crusader">Crusader</Term> — pressing everything I could until I
                finally managed to call my Avenger Titan to a landing pad. Then I
                couldn&rsquo;t find it.
              </p>
              <p>
                A few minutes of wandering later, some patient strangers in global chat
                pointed me to the right pad. There it was: my little ship against that
                enormous, rust-red planet behind it. My first taste of the scale of this
                game was enough to give me goosebumps.
              </p>
              <p>
                While I was trying to figure out how to close my rear ramp, a{' '}
                <Term name="Constellation">Constellation</Term> — a ship easily five times
                the size of mine — landed on the pad next to me. &ldquo;That has to be the
                biggest ship in the game,&rdquo; I thought. It was not.
              </p>
              <p>
                A few confused minutes later I was in the pilot&rsquo;s seat, the ship was
                flight-ready, and I lifted off. Straight into one of the docking rings.
                I didn&rsquo;t know the mouse controlled pitch and yaw. I was just trying
                to look down at the landing pad below me.
              </p>
              <p>
                Back to Port Olisar. The second takeoff was only slightly less disastrous.
                The third time I managed to hover above the station for about twenty minutes.
                Partly because I was awestruck. Mostly because I could not figure out how
                to go anywhere.
              </p>
              <p>
                More patient strangers in global chat walked me through locking a{' '}
                <Term name="Quantum Travel">Quantum Travel</Term> destination. I pointed
                at Crusader and jumped. As I flew closer and closer I was convinced I
                would land on it. Or crash into it. Either way, an adventure.
              </p>
              <p>
                More confused minutes passed. I still hadn&rsquo;t reached the surface.
                Back to global chat. I felt like a complete idiot when they told me:
                Crusader is a gas giant. There is no surface.
              </p>
              <p>
                By that point I was so lost and frustrated I logged out and didn&rsquo;t
                touch the game for months.
              </p>
              <p>
                I came back eventually — only because my friend FireMedicSlim had the
                patience to sit with me and walk me through everything I&rsquo;d been
                doing wrong. With someone to guide me, it all clicked. The confusion fell
                away and the game underneath it finally showed itself.
              </p>
              <p>
                That&rsquo;s why DayOneCitizen exists. Not because the game is bad.
                Because the on-ramp is brutal if you&rsquo;re flying alone. This site is
                the help I wish I&rsquo;d had on my day one: no assumptions about what you
                know, no jargon without explanation, no gatekeeping. Just plain English,
                from someone who still remembers being new.
              </p>
              <p className="font-semibold text-gold">
                o7. Welcome to the &lsquo;Verse.
              </p>
            </div>
          </section>

          {/* ── What This Site Is / Is Not ── */}
          <section className="grid gap-6 md:grid-cols-2">
            <div className="card-surface p-7">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
                <Check size={20} aria-hidden />
              </div>
              <h3 className="heading-display text-xl">What this site is</h3>
              <ul className="mt-4 space-y-3 text-sm text-starwhite/85">
                <li>
                  <strong className="text-starwhite">An unofficial fan site.</strong>{' '}
                  Made by a player, for players. Not a CIG product.
                </li>
                <li>
                  <strong className="text-starwhite">Plain-English.</strong>{' '}
                  Every term is defined the first time it&rsquo;s used. The
                  glossary is one click away from every page.
                </li>
                <li>
                  <strong className="text-starwhite">Honest about the game.</strong>{' '}
                  Star Citizen is in alpha. It&rsquo;s ambitious, beautiful,
                  and sometimes broken. We say so.
                </li>
                <li>
                  <strong className="text-starwhite">Free.</strong> The site,
                  the glossary, all of it.
                </li>
              </ul>
            </div>
            <div className="card-surface p-7">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/15 text-red-300">
                <X size={20} aria-hidden />
              </div>
              <h3 className="heading-display text-xl">What this site is not</h3>
              <ul className="mt-4 space-y-3 text-sm text-starwhite/85">
                <li>
                  <strong className="text-starwhite">Not affiliated with CIG.</strong>{' '}
                  <Term name="CIG">Cloud Imperium Games</Term> has nothing to
                  do with this site.
                </li>
                <li>
                  <strong className="text-starwhite">Not official.</strong> For
                  the source of truth go to robertsspaceindustries.com.
                </li>
                <li>
                  <strong className="text-starwhite">Not a hype machine.</strong>{' '}
                  We don&rsquo;t cheerlead delays or pretend everything is fine
                  when it&rsquo;s not.
                </li>
                <li>
                  <strong className="text-starwhite">Not a doomposting machine, either.</strong>{' '}
                  The constant &laquo;SC is a scam&raquo; rage-bait isn&rsquo;t
                  useful for anyone trying to decide if they want to play.
                </li>
                <li>
                  <strong className="text-starwhite">Not a wiki.</strong> Star
                  Citizen Wiki is excellent for deep dives. We&rsquo;re the
                  on-ramp, not the encyclopedia.
                </li>
              </ul>
            </div>
          </section>

          {/* ── First Lesson: o7 ── */}
          <section className="border-t border-white/5 pt-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Your first lesson
            </p>
            <h2 className="heading-display text-2xl">
              o7 — the Star Citizen salute.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-starwhite/85">
              <strong>o7</strong> is an emoticon salute. The lowercase{' '}
              <strong>o</strong> is a head. The <strong>7</strong> is an arm
              raised to the brow. Tilt your head sideways and you&rsquo;ll see it.
            </p>
            <div className="mt-6 inline-flex items-center gap-6 rounded-2xl border border-gold/30 bg-gold/5 px-8 py-5">
              <span className="font-display text-6xl text-gold">o7</span>
              <span className="text-sm text-starwhite/80">
                Means: hello · goodbye · respect · fly safe
              </span>
            </div>
            <p className="mt-6 text-base leading-relaxed text-starwhite/85">
              You&rsquo;ll see it everywhere — global chat, your{' '}
              <Term name="Org">org</Term>&rsquo;s Discord server,{' '}
              <Term name="Spectrum">Spectrum</Term> (the official Star Citizen
              forum), Twitch streams. When someone rescues you from a crash,
              when you log off for the night, when a streamer asks for a salute
              in chat. Type it back. That&rsquo;s all there is to it.
            </p>
          </section>

          {/* ── FTC Disclosure ── */}
          <section id="referral-disclosure" className="border-t border-white/5 pt-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              FTC disclosure
            </p>
            <h2 className="heading-display text-2xl">
              About the referral links.
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-starwhite/85">
              <p>
                This site contains <strong>referral links</strong> to{' '}
                <Term name="RSI">Roberts Space Industries</Term>. If you create
                a Star Citizen account using the{' '}
                <Term name="Referral Code">referral code</Term> on this site,
                you receive{' '}
                <strong className="text-gold">50,000 UEC free</strong> on
                signup. I (the site owner, {SITE.author}) receive a small
                in-game bonus reward for referring you. There is no monetary
                kickback.
              </p>
              <p>
                <strong>Cost to you: zero.</strong> The bonus is from{' '}
                <Term name="CIG">CIG</Term> to you. You&rsquo;d pay the same
                amount whether you used my code, a friend&rsquo;s code, or no
                code at all. If you have a friend who already plays Star
                Citizen, use <em>their</em> code — they earned the introduction.
              </p>
              <div className="rounded-2xl border border-gold/20 bg-gold/5 p-4">
                <p className="font-mono text-sm text-gold">
                  Referral code: {SITE.referralCode}
                </p>
              </div>
            </div>
          </section>

        </article>

        {/* ── CTA ── */}
        <section className="border-t border-white/5 bg-gradient-to-r from-navyLight to-navy py-16">
          <div className="container-narrow">
            <div className="card-surface flex flex-col items-start gap-5 p-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  New to Star Citizen?
                </p>
                <h2 className="heading-display text-2xl">
                  Ready to start your day one?
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Use a <Term name="Referral Code">referral code</Term> on
                  signup and start with 50,000 <Term name="UEC">UEC</Term> free.
                </p>
              </div>
              <CTAButton size="lg" trackingLabel="about-bottom-cta">
                Use my referral code
              </CTAButton>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </>
  )
}
```

- [ ] **Step 3: Verify the file was created**

```bash
ls "E:\Claude Code\sc-portfolio\dayonecitizen-main\src\app\about"
```

Expected: `page.tsx` appears in the listing.

- [ ] **Step 4: Run TypeScript check**

```bash
cd "E:\Claude Code\sc-portfolio\dayonecitizen-main"
npx tsc --noEmit
```

Expected: no errors. If errors appear, fix them before continuing.

- [ ] **Step 5: Commit**

```bash
cd "E:\Claude Code\sc-portfolio\dayonecitizen-main"
git add src/app/about/page.tsx
git commit -m "feat: create /about page with mission statement, personal story, o7 lesson"
```

---

## Task 4: Delete src/app/o7-meaning/page.tsx

**Files:**
- Delete: `src/app/o7-meaning/page.tsx`
- Delete: `src/app/o7-meaning/` directory (if empty after file removal)

- [ ] **Step 1: Delete the old page file**

```bash
rm "E:\Claude Code\sc-portfolio\dayonecitizen-main\src\app\o7-meaning\page.tsx"
```

- [ ] **Step 2: Remove the empty directory**

```bash
rmdir "E:\Claude Code\sc-portfolio\dayonecitizen-main\src\app\o7-meaning"
```

If `rmdir` fails because the directory is not empty, check what else is in it:
```bash
ls "E:\Claude Code\sc-portfolio\dayonecitizen-main\src\app\o7-meaning"
```
If only non-essential files remain (e.g. `__tests__`), remove them too. If there are other page files, do not delete the directory — report back.

- [ ] **Step 3: Run build to confirm no broken imports**

```bash
cd "E:\Claude Code\sc-portfolio\dayonecitizen-main"
npm run build
```

Expected: build completes with no errors. The `/o7-meaning` route should no longer appear in the build output. If build errors reference the deleted file, investigate before proceeding.

- [ ] **Step 4: Commit**

```bash
cd "E:\Claude Code\sc-portfolio\dayonecitizen-main"
git add -A
git commit -m "feat: remove /o7-meaning page (replaced by /about + 301 redirect)"
```

---

## Task 5: Final verification and push

- [ ] **Step 1: Confirm build passes cleanly**

```bash
cd "E:\Claude Code\sc-portfolio\dayonecitizen-main"
npm run build
```

Expected output includes:
- `Route (app)` table lists `/about` ✓
- `Route (app)` table does NOT list `/o7-meaning` ✓  
- Zero TypeScript errors
- Zero build errors

- [ ] **Step 2: Confirm redirect wiring**

Start dev server:
```bash
npm run dev
```

Open browser and visit `http://localhost:3000/o7-meaning`. Should redirect to `http://localhost:3000/about`.

Visit `http://localhost:3000/about`. Should render the new page with:
- Heading "DayOneCitizen."
- Personal story section "Why I built DayOneCitizen."
- What This Site Is / Is Not cards
- "Your first lesson" o7 section with gold display card
- FTC Disclosure
- CTA with heading "Ready to start your day one?"

Visit `http://localhost:3000` — NavBar should show "About" (not "o7 Meaning").

- [ ] **Step 3: Push to GitHub**

```bash
cd "E:\Claude Code\sc-portfolio\dayonecitizen-main"
git push origin main
```

---

## Spec Coverage Check

| Spec requirement | Task |
|---|---|
| Nav link "o7 Meaning" → "About", href `/o7-meaning` → `/about` | Task 1 |
| 301 redirect `/o7-meaning` → `/about` | Task 2 |
| Remove existing `/about` → `/o7-meaning` redirect | Task 2 |
| Hero: "About this site" eyebrow, "DayOneCitizen." heading, mission subhead | Task 3 |
| Personal story section with polished prose and Term wraps | Task 3 |
| What This Site Is / Is Not cards (unchanged) | Task 3 |
| "Your first lesson" o7 section with gold display card | Task 3 |
| FTC Disclosure (unchanged) | Task 3 |
| CTA heading updated to "Ready to start your day one?" | Task 3 |
| Metadata: canonical updated to `/about`, OG url updated | Task 3 |
| Article JSON-LD `mainEntityOfPage` updated to `/about` | Task 3 |
| FAQ JSON-LD kept in `<head>` | Task 3 |
| Delete `src/app/o7-meaning/page.tsx` | Task 4 |
| Sections removed: o7 in Star Citizen, o7 in other games, How to use o7, FAQ accordion, Related terms, "Built with caffeine" card | Task 3 (not included in new page) + Task 4 |
| `npm run build` passes | Task 4 + Task 5 |
