# Click Tracking Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add server-side referral click tracking to all 10 sites in the SC portfolio, logging each click to a shared Google Sheet and posting a real-time embed to a Discord channel.

**Architecture:** Each site gets a `/api/track-click` Next.js API route that receives a POST from the CTA button's onClick handler, then fires both the Google Apps Script URL (Google Sheet row) and Discord webhook in parallel. The click navigates immediately — tracking is fire-and-forget with `keepalive: true`.

**Tech Stack:** Next.js 14 App Router, TypeScript, native `fetch` (no new dependencies), Google Apps Script, Discord webhooks.

---

## Pre-Work: Manual Setup (User Action — Do This First)

Before writing any code, complete these 5 steps to get the two env var values.

- [ ] **Step 1: Create Google Sheet**
  - Go to sheets.google.com → New blank spreadsheet
  - Name it: `SC Portfolio — Referral Click Log`
  - In row 1, add these headers exactly: `Timestamp` | `Site` | `CTA Label` | `Referral Code` | `Page`

- [ ] **Step 2: Add Apps Script**
  - In the sheet: Extensions → Apps Script
  - Delete any existing code, paste this exactly:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.site       || '',
    data.label      || '',
    data.referralCode || '',
    data.page       || '',
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

- [ ] **Step 3: Deploy Apps Script as web app**
  - Click Deploy → New deployment → select type: Web app
  - Execute as: **Me**
  - Who has access: **Anyone**
  - Click Deploy → authorize when prompted → copy the Web app URL
  - Save this URL — it becomes `CLICK_TRACKER_SHEET_URL`

- [ ] **Step 4: Create Discord webhook**
  - In your Discord server, go to the referral-clicks channel
  - Edit Channel → Integrations → Webhooks → New Webhook
  - Name it `SC Click Tracker`, click Copy Webhook URL
  - Save this URL — it becomes `DISCORD_CLICK_WEBHOOK_URL`

- [ ] **Step 5: Keep both URLs handy** — you will add them to `.env.local` and Vercel for each site.

---

## Task 1: API Route — dayonecitizen-main (reference implementation)

**Files:**
- Create: `dayonecitizen-main/src/app/api/track-click/route.ts`

- [ ] **Step 1: Create the API route**

Create `dayonecitizen-main/src/app/api/track-click/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { label, referralCode, page, site } = body

    if (
      typeof label !== 'string' ||
      typeof referralCode !== 'string' ||
      typeof page !== 'string' ||
      typeof site !== 'string'
    ) {
      return NextResponse.json({ ok: false }, { status: 400 })
    }

    const timestamp = new Date().toISOString()
    const sheetUrl = process.env.CLICK_TRACKER_SHEET_URL
    const discordUrl = process.env.DISCORD_CLICK_WEBHOOK_URL

    const calls: Promise<unknown>[] = []

    if (sheetUrl) {
      calls.push(
        fetch(sheetUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ timestamp, site, label, referralCode, page }),
        }).catch((err) => console.error('[track-click] Sheet error:', err))
      )
    }

    if (discordUrl) {
      calls.push(
        fetch(discordUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            embeds: [
              {
                title: 'Referral Click',
                color: 0xf0c040,
                fields: [
                  { name: 'Site', value: site, inline: true },
                  { name: 'CTA Label', value: label, inline: true },
                  { name: 'Referral Code', value: referralCode, inline: true },
                  { name: 'Page', value: page, inline: true },
                ],
                footer: { text: timestamp },
              },
            ],
          }),
        }).catch((err) => console.error('[track-click] Discord error:', err))
      )
    }

    await Promise.all(calls)
  } catch (err) {
    console.error('[track-click] Unexpected error:', err)
  }

  return NextResponse.json({ ok: true })
}
```

- [ ] **Step 2: Add env vars to `.env.local`**

Add to `dayonecitizen-main/.env.local` (create if it doesn't exist):
```
CLICK_TRACKER_SHEET_URL=<your Apps Script URL from Pre-Work Step 3>
DISCORD_CLICK_WEBHOOK_URL=<your Discord webhook URL from Pre-Work Step 4>
```

- [ ] **Step 3: Start dev server and smoke-test the route**

```bash
cd dayonecitizen-main
npm run dev
```

In a second terminal:
```bash
curl -X POST http://localhost:3000/api/track-click \
  -H "Content-Type: application/json" \
  -d '{"label":"Test","referralCode":"STAR-GCQJ-N6NC","page":"/","site":"localhost"}'
```

Expected response: `{"ok":true}`

Also verify:
- Google Sheet has a new row with the test data
- Discord channel received an embed titled "Referral Click"

- [ ] **Step 4: Stop dev server**

---

## Task 2: CTAButton — dayonecitizen-main

**Files:**
- Modify: `dayonecitizen-main/src/components/CTAButton.tsx`

- [ ] **Step 1: Add onClick tracking to the external link**

Open `dayonecitizen-main/src/components/CTAButton.tsx`. Add the `handleClick` function and wire it to the `<a>` tag. The full file after changes:

```typescript
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SITE } from '@/lib/site'
import { getRotatedReferralUrl, FALLBACK_REFERRAL_URL } from '@/lib/referral-rotator'

type Variant = 'primary' | 'ghost' | 'subtle'
type Size = 'sm' | 'md' | 'lg'

type Props = {
  href?: string
  children?: React.ReactNode
  variant?: Variant
  size?: Size
  className?: string
  external?: boolean
  trackingLabel?: string
  showIcon?: boolean
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-gold text-navy hover:bg-goldDark hover:text-navy shadow-[0_8px_30px_-12px_rgba(240,192,64,0.6)] hover:shadow-[0_12px_36px_-12px_rgba(240,192,64,0.85)]',
  ghost:
    'border border-gold/60 text-gold hover:bg-gold/10 hover:border-gold',
  subtle:
    'bg-navyLight text-starwhite hover:bg-navyLight/70 border border-white/5',
}

export default function CTAButton({
  href: hrefProp,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  external,
  trackingLabel,
  showIcon = true,
}: Props) {
  const [referralUrl, setReferralUrl] = useState(FALLBACK_REFERRAL_URL)
  useEffect(() => { setReferralUrl(getRotatedReferralUrl()) }, [])

  const href = hrefProp ?? referralUrl
  const isExternal = external ?? href.startsWith('http')
  const label = children ?? `Get ${SITE.ueecBonus.replace(',000', 'K')}`

  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy ${sizeClasses[size]} ${variantClasses[variant]} ${className}`

  const handleClick = () => {
    const code = href.split('referral=')[1] ?? ''
    fetch('/api/track-click', {
      method: 'POST',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        label: trackingLabel ?? 'unknown',
        referralCode: code,
        page: window.location.pathname,
        site: window.location.hostname,
      }),
    }).catch(() => {})
  }

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        data-track={trackingLabel}
        onClick={handleClick}
      >
        <span>{label}</span>
        {showIcon ? <ArrowUpRight size={size === 'lg' ? 20 : 16} aria-hidden /> : null}
      </a>
    )
  }

  return (
    <Link href={href} className={classes} data-track={trackingLabel}>
      <span>{label}</span>
      {showIcon ? <ArrowUpRight size={size === 'lg' ? 20 : 16} aria-hidden /> : null}
    </Link>
  )
}
```

- [ ] **Step 2: Verify build passes**

```bash
cd dayonecitizen-main
npm run build
```

Expected: exits with code 0, no TypeScript errors.

- [ ] **Step 3: Commit dayonecitizen-main**

```bash
cd dayonecitizen-main
git add src/app/api/track-click/route.ts src/components/CTAButton.tsx
git commit -m "feat: add server-side referral click tracking

Posts click data to Google Sheet + Discord on every CTA click.
Fire-and-forget — navigation is never blocked."
```

---

## Task 3: Group A Replication — 6 remaining sites

Apply the identical changes from Tasks 1–2 to each of these repos. The code is **exactly the same** in every case — copy `route.ts` verbatim, apply the same `CTAButton.tsx` edit.

**Sites:** `freeflyevent-site`, `screferralreward-site`, `screferralbonus-site`, `fundedgame-site`, `bestspacesim-site`, `o7meaning-site`

For **each** site, repeat these steps:

- [ ] **Step 1: Create API route**

Copy the route from Task 1 verbatim. Example for `freeflyevent-site`:

Create `freeflyevent-site/src/app/api/track-click/route.ts` — identical content to `dayonecitizen-main/src/app/api/track-click/route.ts` (full content shown in Task 1, Step 1).

Repeat for:
- `screferralreward-site/src/app/api/track-click/route.ts`
- `screferralbonus-site/src/app/api/track-click/route.ts`
- `fundedgame-site/src/app/api/track-click/route.ts`
- `bestspacesim-site/src/app/api/track-click/route.ts`
- `o7meaning-site/src/app/api/track-click/route.ts`

- [ ] **Step 2: Add env vars to each `.env.local`**

Add to each repo's `.env.local`:
```
CLICK_TRACKER_SHEET_URL=<your Apps Script URL>
DISCORD_CLICK_WEBHOOK_URL=<your Discord webhook URL>
```

Files:
- `freeflyevent-site/.env.local`
- `screferralreward-site/.env.local`
- `screferralbonus-site/.env.local`
- `fundedgame-site/.env.local`
- `bestspacesim-site/.env.local`
- `o7meaning-site/.env.local`

- [ ] **Step 3: Update CTAButton.tsx in each site**

Each site has `src/components/CTAButton.tsx`. The current file in each of these repos matches the dayonecitizen-main original. Apply the same edit: add `handleClick` and `onClick={handleClick}` to the external `<a>` tag.

The full updated `CTAButton.tsx` for each Group A site is identical to the dayonecitizen-main version shown in Task 2, Step 1 — **except** that some sites may not import `{ SITE }` from `@/lib/site`. Read each file first and preserve its existing imports and label logic; only add `handleClick` and wire `onClick`.

If a site's CTAButton is already identical to dayonecitizen-main, replace it with the full updated version from Task 2 Step 1. For any site where the CTAButton differs, the minimal change is:

```typescript
// Add this function inside the component, before the return:
const handleClick = () => {
  const code = href.split('referral=')[1] ?? ''
  fetch('/api/track-click', {
    method: 'POST',
    keepalive: true,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      label: trackingLabel ?? 'unknown',
      referralCode: code,
      page: window.location.pathname,
      site: window.location.hostname,
    }),
  }).catch(() => {})
}

// Add onClick={handleClick} to the external <a> tag only
```

- [ ] **Step 4: Verify builds**

Run in each repo:
```bash
npm run build
```

Expected: exits 0 for all 6 repos.

- [ ] **Step 5: Commit each repo**

For each of the 6 repos:
```bash
git add src/app/api/track-click/route.ts src/components/CTAButton.tsx
git commit -m "feat: add server-side referral click tracking"
```

---

## Task 4: Group B — pledgemeaning-site

**Files:**
- Create: `pledgemeaning-site/src/app/api/track-click/route.ts`
- Modify: `pledgemeaning-site/src/components/CTAButton.tsx`

- [ ] **Step 1: Create API route**

Create `pledgemeaning-site/src/app/api/track-click/route.ts` — identical content to Task 1 Step 1.

- [ ] **Step 2: Add env vars**

Add to `pledgemeaning-site/.env.local`:
```
CLICK_TRACKER_SHEET_URL=<your Apps Script URL>
DISCORD_CLICK_WEBHOOK_URL=<your Discord webhook URL>
```

- [ ] **Step 3: Rewrite CTAButton.tsx**

The current component has no `'use client'` directive, no rotator, and no onClick. Replace `pledgemeaning-site/src/components/CTAButton.tsx` entirely:

```typescript
'use client'

const ENLIST_URL =
  'https://www.robertsspaceindustries.com/enlist?referral=STAR-GCQJ-N6NC'
const REFERRAL_CODE = 'STAR-GCQJ-N6NC'

interface CTAButtonProps {
  className?: string
}

export default function CTAButton({ className = '' }: CTAButtonProps) {
  const handleClick = () => {
    fetch('/api/track-click', {
      method: 'POST',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        label: 'CTAButton',
        referralCode: REFERRAL_CODE,
        page: window.location.pathname,
        site: window.location.hostname,
      }),
    }).catch(() => {})
  }

  return (
    <a
      href={ENLIST_URL}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={handleClick}
      className={`inline-block bg-amber hover:bg-amber-dark text-midnight font-bold px-8 py-4 rounded-lg text-lg transition-colors shadow-lg shadow-amber/20 ${className}`}
    >
      Create Your Account — Get 50,000 UEC Free
    </a>
  )
}
```

Note: Changed from `<Link>` to `<a>` tag (Link doesn't support `onClick` with `target="_blank"` reliably for tracking purposes), and added `'use client'` for the browser `fetch` call. Visual output is identical.

- [ ] **Step 4: Verify build**

```bash
cd pledgemeaning-site
npm run build
```

Expected: exits 0.

- [ ] **Step 5: Commit**

```bash
git add src/app/api/track-click/route.ts src/components/CTAButton.tsx
git commit -m "feat: add server-side referral click tracking"
```

---

## Task 5: Group C — StarCitizenHelp-live

**Files:**
- Create: `StarCitizenHelp-live/src/app/api/track-click/route.ts`
- Modify: `StarCitizenHelp-live/src/components/referral/ReferralCTA.tsx`
- Modify: `StarCitizenHelp-live/src/components/referral/FloatingCTA.tsx`

- [ ] **Step 1: Create API route**

Create `StarCitizenHelp-live/src/app/api/track-click/route.ts` — identical content to Task 1 Step 1.

- [ ] **Step 2: Add env vars**

Add to `StarCitizenHelp-live/.env.local`:
```
CLICK_TRACKER_SHEET_URL=<your Apps Script URL>
DISCORD_CLICK_WEBHOOK_URL=<your Discord webhook URL>
```

- [ ] **Step 3: Update ReferralCTA.tsx**

In `StarCitizenHelp-live/src/components/referral/ReferralCTA.tsx`, update `handleNavigate` to fire tracking before opening the tab:

```typescript
const handleNavigate = () => {
  fetch('/api/track-click', {
    method: 'POST',
    keepalive: true,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      label: 'ReferralCTA',
      referralCode: referralUrl.split('referral=')[1] ?? '',
      page: window.location.pathname,
      site: window.location.hostname,
    }),
  }).catch(() => {})
  window.open(referralUrl, '_blank', 'noopener,noreferrer')
}
```

- [ ] **Step 4: Update FloatingCTA.tsx**

In `StarCitizenHelp-live/src/components/referral/FloatingCTA.tsx`, update `handleNavigate`. Note: `referralCode` is already in component state — use it directly:

```typescript
const handleNavigate = () => {
  fetch('/api/track-click', {
    method: 'POST',
    keepalive: true,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      label: 'FloatingCTA',
      referralCode: referralCode,
      page: window.location.pathname,
      site: window.location.hostname,
    }),
  }).catch(() => {})
  window.open(referralUrl, '_blank', 'noopener,noreferrer')
}
```

- [ ] **Step 5: Verify build**

```bash
cd StarCitizenHelp-live
npm run build
```

Expected: exits 0.

- [ ] **Step 6: Commit**

```bash
git add src/app/api/track-click/route.ts src/components/referral/ReferralCTA.tsx src/components/referral/FloatingCTA.tsx
git commit -m "feat: add server-side referral click tracking"
```

---

## Task 6: Group D — iheldtheline-site (new CTAButton)

**Files:**
- Create: `iheldtheline-site/src/lib/referral-rotator.ts`
- Create: `iheldtheline-site/src/components/CTAButton.tsx`
- Create: `iheldtheline-site/src/app/api/track-click/route.ts`
- Modify: `iheldtheline-site/src/app/page.tsx`

- [ ] **Step 1: Create referral-rotator.ts**

Create `iheldtheline-site/src/lib/referral-rotator.ts`:

```typescript
const REFERRAL_CODES = ['STAR-GCQJ-N6NC', 'STAR-RXW4-JPN3', 'STAR-C2GJ-XSSS'] as const
const BASE_URL = 'https://www.robertsspaceindustries.com/enlist?referral='
export const FALLBACK_REFERRAL_URL = BASE_URL + REFERRAL_CODES[0]

export function getRotatedReferralUrl(): string {
  const code = REFERRAL_CODES[Math.floor(Math.random() * REFERRAL_CODES.length)]
  return BASE_URL + code
}
```

- [ ] **Step 2: Create CTAButton.tsx**

Create `iheldtheline-site/src/components/CTAButton.tsx`:

```typescript
'use client'
import { useState, useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { getRotatedReferralUrl, FALLBACK_REFERRAL_URL } from '@/lib/referral-rotator'

type Props = {
  trackingLabel?: string
  className?: string
}

export default function CTAButton({ trackingLabel, className = '' }: Props) {
  const [referralUrl, setReferralUrl] = useState(FALLBACK_REFERRAL_URL)
  useEffect(() => { setReferralUrl(getRotatedReferralUrl()) }, [])

  const handleClick = () => {
    const code = referralUrl.split('referral=')[1] ?? ''
    fetch('/api/track-click', {
      method: 'POST',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        label: trackingLabel ?? 'CTAButton',
        referralCode: code,
        page: window.location.pathname,
        site: window.location.hostname,
      }),
    }).catch(() => {})
  }

  return (
    <a
      href={referralUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`inline-flex items-center gap-2 rounded-full bg-gold text-navy font-semibold px-6 py-3 hover:bg-goldDark transition-colors ${className}`}
    >
      Join Star Citizen While You Wait
      <ArrowUpRight size={16} aria-hidden />
    </a>
  )
}
```

- [ ] **Step 3: Create API route**

Create `iheldtheline-site/src/app/api/track-click/route.ts` — identical content to Task 1 Step 1.

- [ ] **Step 4: Add env vars**

Add to `iheldtheline-site/.env.local`:
```
CLICK_TRACKER_SHEET_URL=<your Apps Script URL>
DISCORD_CLICK_WEBHOOK_URL=<your Discord webhook URL>
```

- [ ] **Step 5: Add CTA to homepage**

In `iheldtheline-site/src/app/page.tsx`, add the import at the top of the file:

```typescript
import CTAButton from '@/components/CTAButton'
```

Then add a new section between the closing `</section>` of "What is Squadron 42" and the opening `<section>` of the section cards grid. The insertion point is after line 103 (`</section>`) and before line 106 (`<section className="border-t border-white/5 bg-navyLight py-20 sm:py-28">`):

```tsx
{/* Referral CTA */}
<section className="border-t border-white/5 py-12 sm:py-16">
  <div className="container-wide text-center">
    <p className="text-muted text-sm mb-6">
      Squadron 42 is coming — Star Citizen is playable right now.
    </p>
    <CTAButton trackingLabel="Homepage CTA" />
  </div>
</section>
```

- [ ] **Step 6: Verify build**

```bash
cd iheldtheline-site
npm run build
```

Expected: exits 0.

- [ ] **Step 7: Commit**

```bash
git add src/lib/referral-rotator.ts src/components/CTAButton.tsx src/app/api/track-click/route.ts src/app/page.tsx
git commit -m "feat: add referral CTA and server-side click tracking

Adds referral rotator, CTAButton component, and /api/track-click route.
CTA placed on homepage with label 'Join Star Citizen While You Wait'."
```

---

## Task 7: Vercel Environment Variables

Add both env vars to every Vercel project. Do this in the Vercel dashboard for each project.

- [ ] **Step 1: Add vars to all 10 Vercel projects**

For each project listed below, go to: Vercel Dashboard → [Project] → Settings → Environment Variables → Add:

| Key | Value | Environment |
|---|---|---|
| `CLICK_TRACKER_SHEET_URL` | your Apps Script URL | Production, Preview, Development |
| `DISCORD_CLICK_WEBHOOK_URL` | your Discord webhook URL | Production, Preview, Development |

Projects to update:
1. dayonecitizen-main
2. freeflyevent-site
3. screferralreward-site
4. screferralbonus-site
5. fundedgame-site
6. bestspacesim-site
7. o7meaning-site
8. pledgemeaning-site
9. StarCitizenHelp-live
10. iheldtheline-site

- [ ] **Step 2: Redeploy each project**

After adding env vars, trigger a redeploy for each project so the new vars are picked up. In the Vercel dashboard: Deployments → latest deployment → Redeploy (or push a new commit to trigger auto-deploy).

---

## Task 8: End-to-End Verification

- [ ] **Step 1: Test each live site**

On each deployed site, click a referral CTA and verify:
1. The RSI enlist page opens in a new tab
2. Your Google Sheet gets a new row within ~5 seconds
3. Your Discord channel receives an embed

Sites to verify:
- dayonecitizen.com
- freeflyevent.com
- screferralrewards.com
- screferralbonus.com
- highestfundedgame.com
- bestspacesim.com
- o7meaning.com
- pledgemeaning.com
- StarCitizenHelp (your domain)
- iheldtheline.com

- [ ] **Step 2: Verify Google Sheet columns are correct**

Confirm each row has all 5 fields populated: Timestamp, Site, CTA Label, Referral Code, Page. If any field is blank, check that `trackingLabel` props are set on the CTAButtons causing the blank label.

- [ ] **Step 3: Verify Discord embed format**

Confirm embeds show all 4 fields (Site, CTA Label, Referral Code, Page) and display in gold color.
