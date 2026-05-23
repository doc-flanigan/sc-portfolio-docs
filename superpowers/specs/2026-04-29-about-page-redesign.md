# About Page Redesign — Design Spec
**Date:** 2026-04-29
**Status:** Approved
**Repo:** `E:\Claude Code\sc-portfolio\dayonecitizen-main`

---

## What Changes

The `/o7-meaning` page is replaced by a new `/about` page. The nav link "o7 Meaning" becomes "About". The existing o7 definition content is reduced to a single mini-lesson section near the bottom. The page is restructured around the site's mission and Doc_Flanigan's personal origin story.

---

## Files

| Action | File |
|---|---|
| Create | `src/app/about/page.tsx` |
| Delete | `src/app/o7-meaning/page.tsx` (replaced by redirect) |
| Modify | `src/lib/site.ts` — update NAV_LINKS |
| Modify | `next.config.mjs` — add 301 redirect `/o7-meaning` → `/about` |

---

## Page Structure (top to bottom)

### 1. Hero — Mission Statement
```
eyebrow:  "About this site"
heading:  "DayOneCitizen."
subhead:  "Star Citizen for complete beginners. Plain English. No assumptions.
           No jargon without explanation. An unofficial fan site by Doc_Flanigan."
```
No visual demo box. Clean text-only hero, same styling as current page header.

### 2. Personal Story — "Why I Built This"
```
eyebrow:  "Why I built it"
heading:  "Why I built DayOneCitizen."
```

Full polished story (see **Story Content** below). No cards or lists — flowing prose with `<Term>` wraps on first SC-specific mentions.

### 3. What This Site Is / What This Site Is Not
Keep the existing two-column card layout exactly as-is (lines 308–367 of the original page). No changes to copy or styling.

### 4. Your First Lesson — "o7"
```
eyebrow:  "Your first lesson"
heading:  "o7 — the Star Citizen salute."
```

Brief, friendly explanation:
- What it means visually (o = head, 7 = arm raised to brow)
- What it communicates (hello · goodbye · respect · fly safe)
- Where you'll see it (Global Chat, org Discord, Spectrum, Twitch)
- How to use it: type it back

Keep the gold visual display card (`o7` in large font with the meaning tagline) from the current page.

Do NOT include the variants grid (\\o, o7o, \\o/) — that's "how to use o7" detail, which was explicitly removed.

### 5. FTC Disclosure
Keep exactly as-is (lines 369–402 of the original page). No changes.

### 6. CTA Section
Keep as-is. Update the heading from "Now you know the salute. Time to fly." to:
```
"Ready to start your day one?"
```
Subtext: keep the referral code line as-is.

---

## Story Content (polished, ready to implement)

Write this as flowing paragraphs with `<Term>` wraps on first mention of SC-specific terms. Terms to wrap: `Port Olisar`, `Avenger Titan`, `Crusader`, `Constellation`, `Quantum Travel`, `Global Chat`.

```
I still remember the sheer frustration of that first session. I was stumbling
around Port Olisar — a space station orbiting the planet Crusader — pressing
everything I could until I finally managed to call my Avenger Titan to a
landing pad. Then I couldn't find it.

A few minutes of wandering later, and some patient strangers in Global Chat
pointed me to the right pad. There it was: my little ship against that
enormous, rust-red planet behind it. My first taste of the scale of this game
was enough to give me goosebumps.

While I was trying to figure out how to close my rear ramp, a Constellation —
a ship easily five times the size of mine — landed on the pad next to me.
"That has to be the biggest ship in the game," I thought. It was not.

A few confused minutes later and I was in the pilot's seat, the ship was
flight-ready, and I lifted off. Straight into one of the docking rings.
I didn't know the mouse controlled pitch and yaw. I was just trying to look
down at the landing pad below me.

Back to Port Olisar. The second takeoff was only slightly less disastrous.
The third time I managed to hover above the station for about twenty minutes.
Partly because I was awestruck. Mostly because I could not figure out how
to go anywhere.

More patient strangers in Global Chat walked me through locking a Quantum
Travel destination. I pointed at Crusader and jumped. As I flew closer and
closer I was convinced I would land on it. Or crash into it. Either way,
an adventure.

More confused minutes passed. I still hadn't reached the surface. Back to
Global Chat. I felt like a complete idiot when they told me: Crusader is a
gas giant. There is no surface.

By that point I was so lost and frustrated I logged out and didn't touch
the game for months.

I came back eventually — only because my friend FireMedicSlim had the
patience to sit with me and walk me through everything I'd been doing wrong.
With someone to guide me, it all clicked. The confusion fell away and the
game underneath it finally showed itself.

That's why DayOneCitizen exists. Not because the game is bad. Because the
on-ramp is brutal if you're flying alone. This site is the help I wish I'd
had on my day one: no assumptions about what you know, no jargon without
explanation, no gatekeeping. Just plain English, from someone who still
remembers being new.

o7. Welcome to the 'Verse.
```

---

## Metadata

Keep the existing metadata from `o7-meaning/page.tsx` almost verbatim — the page still covers o7 in Section 4, so the title and description remain accurate. Update only the canonical URL:

```typescript
export const metadata: Metadata = {
  title: 'What Does o7 Mean? The Star Citizen Salute Explained',
  description: "o7 is an emoticon salute used across Star Citizen and gaming communities. The 'o' is a head, the '7' is a raised arm. Here's everything you need to know.",
  alternates: { canonical: '/about' },   // ← changed from /o7-meaning
  openGraph: {
    title: 'What Does o7 Mean? The Star Citizen Salute Explained',
    description: "o7 is an emoticon salute. The 'o' is a head, the '7' is a raised arm. Originated in EVE Online, now used across all of sci-fi gaming.",
    url: '/about',   // ← changed from /o7-meaning
    type: 'article',
  },
  twitter: { ...keep as-is... }
}
```

Keep both JSON-LD scripts (FAQPage and Article). Update `mainEntityOfPage` in Article schema from `/o7-meaning` to `/about`.

---

## NavBar Change

In `src/lib/site.ts`:

```typescript
// Before
{ href: '/o7-meaning', label: 'o7 Meaning' },

// After
{ href: '/about', label: 'About' },
```

---

## Redirect

In `next.config.mjs`, add to the `redirects()` array:

```javascript
{
  source: '/o7-meaning',
  destination: '/about',
  permanent: true,
},
```

---

## What Is Removed

These sections from the original page are deleted entirely:

| Section | Original lines |
|---|---|
| "o7 in Star Citizen" | 104–136 |
| "o7 in other games" | 138–170 |
| "How to use o7" | 172–210 |
| "Frequently asked questions" (visual accordion) | 212–235 |
| "Related terms" | 237–262 |
| "Built with absurd amounts of caffeine" closing card | 404–416 |

The FAQ JSON-LD schema is kept (it lives in the `<head>`, not visible on the page, and supports SEO).

---

## What Is NOT Changed

- Footer component
- CTAButton component
- NavBar component (only its data in `site.ts` changes)
- All other pages and routes
- The `#referral-disclosure` anchor ID on the FTC section (keep for any existing links)
