# IAE 2956 announcement-day runbook

Written 2026-10-02 from a rehearsal (throwaway worktrees, fake entry, three date states).
Goal: when CIG posts the IAE 2956 "Save the Date" (usually ~Nov 6-7; IAE 2955 ran Nov 20 - Dec 3, 2025),
the site change is a short data edit plus a few hand-edits listed below. Sources must be an official RSI Comm-Link
(Star Citizen Wiki API `api.star-citizen.wiki/api/comm-links` has the full text; RSI pages are JS shells).

## 1. Edit: freeflyevent-site (the main edit)

File: `freeflyevent-site/src/data/events.ts`. Paste at the TOP of `FREE_FLY_HISTORY` (array is newest-first).
**The id must be exactly `iae-2026`** (`getIae2956()` keys every IAE page, `/llms.txt`, `/sitemap.xml` off it).
`npm run propose-event -- <comm-link-url>` drafts this; always verify dates against the post.

```ts
  {
    id: 'iae-2026',
    name: 'Intergalactic Aerospace Expo 2956',
    start: '2026-11-19T17:00:00Z',   // ISO UTC. If CIG gives no time, pick one and say so in notes
    end: '2026-12-02T23:59:00Z',
    ships: ['<ship 1>', '<ship 2>'], // as named in the Comm-Link / Free Fly KB article
    bonusOverride: {                 // OMIT the whole block if there is no referral promo
      text: '50,000 UEC + <reward> — use a referral code at signup before <date>',
      badge: '+ <reward> — through <date>',
      expiresAt: '2026-12-04T20:00:00Z', // promo end, ISO UTC (can be later than `end`)
      // image: { src: '/images/<file>.webp', alt: '<descriptive alt>' },
    },
    notes: '<public-safe sentence: dates source, comm-link ids, caveats>',
    source: 'https://robertsspaceindustries.com/en/comm-link/transmission/<id>-<slug>',
  },
```

Field gotchas found in rehearsal:
- `bonusOverride.text` is injected into a sentence on the homepage meta description
  ("Sign up with a referral code for ${text}.") and the iae-2956 page. Write it as a noun phrase, do not start with "when you sign up".
- `notes` is emitted verbatim as the `description` of the homepage Event JSON-LD. Keep it public-safe and factual.
- `end` and `bonusOverride.expiresAt` are compared in UTC. Dates in titles use the server timezone on the homepage
  (BUG 1 below) - harmless on Vercel (UTC) but looks off locally.
- If `start` is more than 60 days away, `getEventStatus()` returns INACTIVE (banner and homepage will not show upcoming);
  the `/iae-2956` page still switches to "confirmed". Not an issue for a Nov 6-7 announcement.
- If CIG cancels free access, set `freeFlyActive: false` + `cancelledNote`.

Also hand-edit (these are hardcoded, they do NOT follow the data entry - see bugs):
1. `freeflyevent-site/src/app/is-star-citizen-free/page.tsx` ~line 213 "Recent Free Fly windows" table: add an IAE 2956 row (and the FAQ
   answer at ~line 61 if you want it listed). Without it the page never mentions IAE 2956 in body copy (only the meta description follows).
2. `freeflyevent-site/src/app/next-free-fly/page.tsx`: line 20 and 35 (meta description / OG description say "IAE in late November"),
   and line 100 (CitizenCon FAQ: "The next realistic window is IAE in late November"). Reword to something date-neutral, e.g.
   "Check the live banner for the confirmed IAE 2956 dates."
3. Optional polish: `free-fly-schedule/page.tsx` lines 137, 225 and `is-star-citizen-free/page.tsx` line 112, `event-history/page.tsx` line 79
   describe the IAE as "late November" in the evergreen pattern copy. They are not wrong as a pattern statement but read oddly when the
   real dates are Nov 19 etc. Fine to leave.
4. `iae-2956/page.tsx` ~line 66 area: the "venue is unannounced" sentence in the footer-of-page copy stays after announcement; update by hand if CIG names a venue.

## 2. Edit: dayonecitizen-main

1. `dayonecitizen-main/src/data/next-free-fly.ts` - set `NEXT_FREE_FLY`: `id: 'iae-2026'`, `name: 'IAE 2956 Free Fly'`, `start`, `end` (same ISO UTC as
   freeflyevent), `description` (also feeds the Google Calendar link), `label` ("November 19 - December 2, 2026"), `headline`.
   It drives the orange `FreeFlyBanner` in NavBar and the `/free-fly-events` status card.
2. `dayonecitizen-main/src/data/referral-bonus.ts` - set `REFERRAL_BONUS` ONLY if CIG announces a referral promo:
   `active: true`, `itemName`, `itemDescription`, `startsAt`/`endsAt` as `YYYY-MM-DD` (inclusive, UTC), `sourceUrl`, `sourceLabel`.
   Renders in the "Any bonus event running right now?" block of `/referral-code`. It turns itself off after `endsAt` (page revalidates daily).
   Do not set it for the plain 50,000 UEC. Keep the single code `STAR-GCQJ-N6NC` everywhere.
3. `/referral-code` "next Free Fly" sentence and `/free-fly-events` "upcoming" state: **automatic once dayone #127 is merged** (both follow `NEXT_FREE_FLY`; all pages revalidate hourly). If #127 is NOT merged, hand-edit `referral-code/page.tsx` (~lines 342-347) to the real dates.
4. **Hand-edit:** `dayonecitizen-main/src/app/day-one-citizen/starter-package/page.tsx`, `#sale` section ("When the sale window is"): replace "We have not seen official dates for IAE 2956 or a 2026 Anniversary sale yet" with the announced IAE dates + Comm-Link `<SourceLink>` (and the Anniversary sale only if CIG has announced it). Update the matching FAQ answer + JSON-LD. Added by dayone #128.

## 3. Deploy and verify (both sites)

Commit `feat: add iae-2026` (freeflyevent) and `feat: add IAE 2956 Free Fly dates` (dayone), push, merge per normal PR rules, wait for the
Vercel prod deploy (IndexNow pings via postbuild). Pages ISR hourly, so a stale page fixes itself within ~1 hour; the `/free-fly.ics` route also
revalidates hourly. To force: redeploy.

| URL | Expected before start (UPCOMING) | Expected during (ACTIVE) | Expected after end |
|---|---|---|---|
| freeflyevent.com `/` | title "Next Star Citizen Free Fly - Intergalactic Aerospace Expo 2956, <dates>", banner "Upcoming ... starts in DD:HH:MM:SS", countdown, Event JSON-LD with right start/end | title "Free Fly Active - Ends <date>", banner "Free Fly Active", "ends in" countdown, bonus text in meta description | title "(Next: May)", banner "No Free Fly currently active", no Event JSON-LD |
| `/iae-2956` | title "IAE 2956 Free Fly Confirmed - <dates>", status "announced", ships and bonus listed, Event JSON-LD | "Is Live Now", "status: live now" | "Recap", "ended" |
| `/next-free-fly` | "The next Free Fly is IAE 2956", dates | "A Free Fly is live right now" | "CIG has not announced the next Free Fly yet", most recent = IAE 2956 |
| `/free-fly-schedule` | "No Free Fly is live at this moment", table row "Upcoming" | "A Free Fly is live right now", row "Live now" | row "Ended" |
| `/is-star-citizen-free` | meta description "Next window: IAE 2956, <dates>" | "IAE 2956 is live now through <date>" | "CIG runs them several times a year." |
| `/free-ships-right-now` | "No ships are free right now" (IAE ships not yet listed) | "N ships are free right now" + ship list | "No ships are free right now", ships kept in history table |
| `/free-fly.ics` | VEVENT `UID:iae-2026@freeflyevent.com`, DTSTART/DTEND match `start`/`end` | same | same (history stays in feed) |
| `/llms.txt` | IAE 2956 line shows confirmed dates | "live now, <dates>" | "ran <dates> (ended)" |
| `/sitemap.xml` | `/iae-2956` present, changefreq daily | same | same |
| dayonecitizen.com `/free-fly-events` | "No Free Fly running right now" (no upcoming text) | "Free Fly live right now" + `NEXT_FREE_FLY.name` + label | back to "No Free Fly running" |
| dayonecitizen.com any page with NavBar (e.g. `/`) | no orange banner | orange banner "Free Fly is live - play free until <date>" | banner gone (after next deploy for static pages - see BUG 2) |
| dayonecitizen.com `/referral-code` | bonus block "Not at the moment" until `startsAt` | "limited-time referral bonus is live: <item>" | block returns to "Not at the moment" after `endsAt` |

Quick check one-liner pattern: `curl -s https://freeflyevent.com/iae-2956 | grep -o '"@type":"Event".\{0,200\}'`.
Then request indexing for `/iae-2956` and `/` in GSC and BWT (IndexNow already fires on prod deploy).

## 4. Referral promo

- If CIG announces a promo (as with Foundation Festival: recruit reward after the promo ends, recruiter reward): put it in BOTH
  `bonusOverride` (freeflyevent) and `REFERRAL_BONUS` (dayone). Dates: `bonusOverride.expiresAt` is ISO UTC; `REFERRAL_BONUS.endsAt` is a UTC calendar date.
- Both auto-expire: ffe `getActiveBonusOverride()` returns null after `expiresAt`, dayone `isReferralBonusActive()` after `endsAt` 23:59:59Z.
- Never mention a second code. The standard 50,000 UEC bonus is unaffected by purchase.
- Check claims against the Comm-Link wording (recruiter vs recruit; purchase conditions) before publishing, and add the claim to the ledger in `docs/claims/`.

## 5. End-of-event cleanup (after the Free Fly and the promo have both ended)

1. freeflyevent: no edit needed for state (everything is date-derived). Keep the `iae-2026` entry (history, .ics, `/iae-2956` recap).
   Optionally trim `notes` and remove `bonusOverride.image`.
2. freeflyevent hand-edits: re-check `is-star-citizen-free` table row, `next-free-fly` line 20/35/100 wording, and remove any "IAE 2956 live" callouts you added.
3. dayone: set `REFERRAL_BONUS` back to the empty object (`active: false`, empty strings) once `endsAt` has passed (it already hides itself; this is tidiness).
   Leave `NEXT_FREE_FLY` pointing at IAE 2956 until the next event is announced (the page renders "No Free Fly running" when ended), or note in STATUS.md.
4. Fix `referral-code/page.tsx` line 345 copy to say the next window is historically a May flagship event.
5. Update `STATUS.md`, rerun `npm run deep-diag` (expect 0 FAIL), re-pull the BWT/GSC stats for the window, and note IAE 2956 results in the event-window playbook.

---

## Rehearsal results 2026-10-02

Method: worktrees `_wt/freeflyevent-site-rehearsal` and `_wt/dayonecitizen-main-rehearsal` off origin/main (deddc79 and 0d65f73), fake `iae-2026`
(ffe `FREE_FLY_HISTORY` top entry with `bonusOverride`; dayone `NEXT_FREE_FLY` + `REFERRAL_BONUS`), `npx next build` and `next start` on ports 3101/3102
per state. (a) UPCOMING start +10d; (b) ACTIVE started yesterday, ends +12d; (c) ENDED ended yesterday. No push, no `npm run build`.
Verdict meaning: PASS = state wording, countdown, banner, JSON-LD, ics correct; WARN = works but has stale/inconsistent copy (listed under bugs).

| Page | (a) UPCOMING | (b) ACTIVE | (c) ENDED |
|---|---|---|---|
| ffe `/` | PASS (title, "starts in" countdown banner, Event JSON-LD dates correct) | PASS (title "Active - Ends", "ends in" countdown, bonus in meta; date is TZ-dependent, BUG 1) | PASS (banner inactive, no Event LD; title "Next: May") |
| ffe `/iae-2956` | PASS (Confirmed, ships, bonus, Event LD) | PASS (Live Now; Event LD) | PASS with WARN (Recap OK; Event LD still `EventScheduled` + offer `InStock` for an ended event, BUG 6) |
| ffe `/next-free-fly` | WARN (status OK; meta + CitizenCon FAQ still "IAE in late November", BUG 2; no Event LD, by design) | WARN (same stale lines) | WARN (same stale lines contradict "has not announced") |
| ffe `/free-fly-schedule` | PASS (row "Upcoming"; evergreen "late November" pattern copy only) | PASS (live wording, row "Live now") | PASS (row "Ended") |
| ffe `/is-star-citizen-free` | WARN (meta follows; body table lacks IAE 2956, BUG 5) | WARN (meta "live now through Oct 15"; table row missing) | WARN (row missing) |
| ffe `/free-ships-right-now` | WARN ("next expected window" generic copy; IAE ships absent until live, expected) | PASS (4 ships listed) | PASS (history table has ships) |
| ffe `/free-fly.ics` | PASS (VEVENT iae-2026, DTSTART/DTEND exact) | PASS | PASS |
| ffe `/llms.txt` | PASS (confirmed dates) | PASS (live now) | PASS (ended) |
| ffe `/sitemap.xml` | PASS (`/iae-2956` daily) | PASS | PASS |
| dayone `/free-fly-events` | WARN ("No Free Fly running"; no upcoming copy, BUG 4) | PASS (live card, name and label) | PASS |
| dayone FreeFlyBanner (NavBar, e.g. `/`) | PASS (absent before start) | PASS (present on `/`, `/free-fly-events`, `/referral-code`) | PASS (absent) ; staleness risk BUG 2b |
| dayone `/referral-code` bonus block | PASS (inactive before `startsAt`) | PASS ("limited-time referral bonus is live: <item>") | PASS (still live until `endsAt`, as designed); hardcoded "expected late November... not announced yet" in all states, BUG 3 |
| Bonus text expiry | not run end-to-end (needs time travel); verified by code read: ffe `getActiveBonusOverride` (events.ts:232), dayone `isReferralBonusActive` (referral-bonus.ts) | | |

### Bugs / stale copy found (real code on origin/main, NOT fixed)

1. `freeflyevent-site/src/app/page.tsx:26` - `status.endsAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })` has no `timeZone: 'UTC'`.
   Home title/description said "Ends October 14" while `/iae-2956` (which sets `timeZone: 'UTC'`, iae-2956/page.tsx:38) said October 15 for the same instant
   (end 02:00Z). Harmless on Vercel (UTC server) but wrong for any non-UTC build/server and for end times near midnight UTC. Fix: add `timeZone: 'UTC'`.
2. `freeflyevent-site/src/app/next-free-fly/page.tsx` lines 20 and 35 (meta + OG description: "the yearly pattern (IAE in late November)") and
   line 100 (CitizenCon FAQ answer ends "The next realistic window is IAE in late November.") are static strings. They stay in every state: once IAE 2956 is
   announced, live, or ended they contradict the page. Fix: derive from `getIae2956()` or drop the sentence.
   2b. `dayonecitizen-main/src/components/FreeFlyBanner.tsx:6-17` is a `'use client'` component that evaluates `new Date()` during render; NavBar is rendered
   inside static pages (`/` is `○ Static`, no `revalidate`). The banner HTML is therefore frozen at build time: an upcoming event gets no banner at start time and an ended
   event keeps one until the next deploy, for non-JS clients and crawlers (hydration may correct it for browsers; not verified in a browser). Only `/free-fly-events`
   (`revalidate = 3600`) is time-safe. Fix: render the banner on the server with ISR on the layout, or have the client compute state in `useEffect`.
3. `dayonecitizen-main/src/app/referral-code/page.tsx:345-347` - "The next one is expected around IAE in late November ... It has not been announced yet." is
   hardcoded; appears in all states including after announcement. Fix: branch on `getFreeFlyStatus()`.
4. `dayonecitizen-main/src/app/free-fly-events/page.tsx:~140-165` - only `isActive` is branched; the `'upcoming'` state falls into "No Free Fly is running at the moment"
   with no mention of the announced event. Fix: add an `upcoming` branch using `NEXT_FREE_FLY.name`/`label`.
5. `freeflyevent-site/src/app/is-star-citizen-free/page.tsx` ~line 213 ("Recent Free Fly windows" table) and FAQ at ~line 61 are hardcoded lists with no IAE 2956 row
   in any state (only the meta description follows `getIae2956()`). Needs manual row on announcement day (see section 1).
6. `/iae-2956` Event JSON-LD after the event ended still has `eventStatus: EventScheduled` and `offers.availability: InStock` (iae-2956/page.tsx). Cosmetic; ended events
   should drop the Offer or use `EventCompleted`-style handling.
7. (Data hygiene, not a bug) `notes` is published as the homepage Event JSON-LD `description` ("REHEARSAL FAKE ENTRY. Not real." leaked in the rehearsal). Keep `notes` public-safe.
8. (Info) `/next-free-fly`, `/free-fly-schedule`, `/is-star-citizen-free`, `/free-ships-right-now` carry no Event JSON-LD; only `/` (active/upcoming) and `/iae-2956` do. Matches current design.
9. (Info) `/iae-2956` keeps "the IAE 2956 venue is unannounced" in all states; update by hand once CIG names a venue.
