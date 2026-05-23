# Referral Conversion Growth Strategy
**Date:** 2026-05-22  
**Status:** Approved — ready for implementation planning  
**Scope:** All 10 SC portfolio sites + Day One Citizen Discord + off-site channels (YouTube, Reddit, TikTok)

---

## 1. Problem Statement

Referral prospects (players who sign up using Doc's code) are not converting to referrals (RSI requires $45 in purchases before the referral credit is earned). Two root causes:

1. **Traffic quality gap** — The highest-traffic source (Free Fly events) attracts visitors with the lowest purchase intent. They're trying the game specifically because it's free.
2. **Post-signup void** — Once a prospect signs up, there is no follow-up mechanism. The Spectrum outreach tool exists but new players don't check it. Discord, Reddit, and YouTube exist but were dormant and unpopulated.

The fix is not more traffic — it's a nurture path from signup to purchase decision.

---

## 2. Core Strategy

**Approach C — Hybrid: Quick wins on existing pages + Community nurture foundation.**

Three timeframes:

- **Immediate (now–May 27):** Capture Free Fly traffic into Discord before event ends and traffic drops. Add purchase urgency while event intent is highest.
- **Medium term (2–6 weeks):** Fill on-page content gaps, seed community channels, launch subreddit and first YouTube video.
- **Longer term (ongoing):** YouTube series, TikTok repurposing, Reddit community presence.

---

## 3. Immediate Sprint (now–May 27)

### 3A — Configure Discord (Day One Citizen server)

**Server:** Day One Citizen (ID: 1465522722707869800)  
**Current state:** 48 channels, 32 roles, Carl-bot installed, Community/Onboarding features enabled. All key channels are empty — no pinned messages anywhere.

**Content to populate (no new channels needed):**

| Channel | Action | Content |
|---|---|---|
| `#welcome` | Add pinned post | Server intro, referral code STAR-GCQJ-N6NC, link to dayonecitizen.com, how to self-assign Backer role |
| `#first-30-days` | Add pinned post | "First 5 things to do in Star Citizen" with links to dayonecitizen.com guides |
| `#account-and-pledge` | Add pinned post | Starter pack comparison (Aurora vs Avenger Titan), what 5,000 UEC bonus gets you, link to dayonecitizen.com/starter-package |
| `#events` | Add event post | Current Free Fly details, ends May 27, why buying before it ends is worth considering |

**New roles to add:**

| Role | Color | Self-assignable | Purpose |
|---|---|---|---|
| `Prospect` | Light blue | Yes | Signed up with referral code, hasn't purchased yet |
| `Backer` | Gold | Yes | Purchased a game package — referral credit earned |

These enable targeted messaging: ping `@Prospect` with purchase nudges, ping `@Backer` to thank and activate as advocates.

**Carl-bot welcome DM** (configure on member join):  
> *"Welcome to Day One Citizen! Whether you're in the Free Fly or just signed up — ask anything in #new-player-help. If you haven't enlisted yet, use code STAR-GCQJ-N6NC when you sign up to get bonus UEC."*  
> *(Fill in the exact UEC amount once the content audit above confirms the current RSI referral bonus.)*

**Onboarding prompts** (post-join, uses Discord's native GUILD_ONBOARDING):

- **Q1: "What's your Star Citizen status?"**
  - 🎮 Free Fly — just trying it out → assigns `Just Curious`
  - ✅ Signed up with a referral code → assigns `Prospect`
  - 🚀 Bought a game package → assigns `Backer`
  - 🔄 Returning pilot, back after a break → assigns `Returning Pilot`

- **Q2: "What are you interested in?"**
  - Combat / Mining / Trading / Exploration / Salvage / FPS → assigns corresponding gameplay role and routes to that gameplay channel

Note: Pre-join screening questions should NOT ask about purchase status — that gates the prospects you most want inside the server. Keep pre-join to rules acceptance only.

### 3B — Add Discord CTAs to Sites

Add "Join our Discord" invite link below (not competing with) the main enlist CTA on:

- **freeflyevent.com** — below the enlist CTA: *"Already signed up? Join the DayOneCitizen Discord for starter help and ship advice."*
- **dayonecitizen.com** — at the end of the "enlist" tutorial step, same message.
- **screferralreward.com / screferralbonus.com** — on the post-code step as a "what's next" action.

One Discord invite link, consistent message, four placement points.

### 3C — Purchase Urgency on freeflyevent.com

Add event-specific banner to the homepage and `/should-i-buy` page while the event is active:

> *"The Free Fly ends May 27. Buy a starter package before it ends and you keep the ships you've been flying — your progress carries over."*

This is factually accurate and is the single most compelling reason to buy now rather than later. Remove or update this banner after May 27.

---

## 4. Medium Term (2–6 weeks)

### 4A — Publish StarCitizenHelp Buyer's Guide

A completed draft exists at `StarCitizenHelp-live/src/data/drafts/guide-14-worth-it.txt`. Publish it as a proper route on starcitizenhelp.com.

- Create a page at `/game-guides/is-star-citizen-worth-it` (or equivalent existing guide route pattern)
- Add meta title targeting "is star citizen worth it 2026" and "should I buy star citizen"
- Weave referral code STAR-GCQJ-N6NC into the "how to buy" section
- Add to sitemap.xml and submit in GSC
- Note: this is a transitional page per the SEO strategy — it will eventually 301 to a dayonecitizen.com equivalent

### 4B — Add Purchase Content to bestspacesim.com

bestspacesim.com has comparison-intent visitors (searching "best space sim game") with zero purchase content. After the Star Citizen review section, add:

- A "Getting started" subsection: what $45 gets you, recommended starter ships (Aurora Mk II or Avenger Titan for most players)
- Referral code with the RSI signup link
- Link to dayonecitizen.com for the full new player guide

Short — 2–3 paragraphs. The intent is already there; just capture it.

### 4C — Launch Subreddit (r/DayOneCitizen)

Do not go live empty. Seed before making public:

1. Pinned "About this community" post linking to dayonecitizen.com and Discord invite
2. Pinned "Use a referral code when you sign up" post with the code and what the bonus gets you
3. 3–4 seed posts pulling from existing site content (starter ship guide, first 30 days, Free Fly explainer)
4. Sidebar: community description, Discord invite, dayonecitizen.com link, rules (no spam, be helpful, no political content)

Once seeded and public: add subreddit link to dayonecitizen.com footer and the Discord `#welcome` channel.

### 4D — First YouTube Video

**Title:** "Which Ship Should You Buy First in Star Citizen? (2026 Starter Pack Guide)"

This directly addresses the $45 purchase decision — the exact bottleneck in the referral funnel.

**Structure:**
1. Brief intro: what you get at each price point ($45 / $55 / $65)
2. Aurora Mk II — who it's for (brand new, wants to learn everything slowly)
3. Avenger Titan — who it's for (recommended for most new players, versatile)
4. Cutlass Black — who it's for (ready to play seriously from day one)
5. Natural moment: "before you buy, use a referral code — you get 5,000 bonus UEC"
6. End screen: Discord invite + subscribe + dayonecitizen.com

**Production workflow:**
- Stream on Twitch → export VOD → edit in DaVinci Resolve (existing workflow from patch notes pipeline)
- Upload to YouTube with referral code in description and RSI signup link
- Add YouTube channel link to dayonecitizen.com and Discord

**Description template:**
```
Which starter ship is right for you? I break down every starter pack under $65 so you know exactly what you're buying before you spend a dollar.

Use referral code STAR-GCQJ-N6NC when you sign up at RSI:
https://robertsspaceindustries.com/enlist?referral=STAR-GCQJ-N6NC
You'll get bonus UEC added to your account.

New player guide → https://dayonecitizen.com
Discord → [TBD: generate permanent invite link in Discord server settings]
```

> **Content audit flag:** The UEC bonus amount is stated inconsistently across the portfolio (5,000 on some pages, 50,000 on others). Verify the current RSI referral bonus amount before publishing any new content and audit existing pages for consistency.

---

## 5. Longer Term (ongoing)

### 5A — YouTube Series: Getting Started in Star Citizen

Build a "Getting Started" playlist (5–8 videos) mirroring the dayonecitizen.com tutorial steps:

1. Starter ship guide (4D above — first)
2. Your first 30 minutes
3. How to make your first money
4. Finding a crew / org basics
5. CCU chains — how to upgrade ships without overpaying
6. Free Fly survival guide (publish before each event)

Each video transcript feeds a new guide page on dayonecitizen (content flywheel per SEO spec).

### 5B — TikTok

Post from desktop via tiktok.com or CapCut desktop app. Repurpose 30–60 second clips from Twitch/YouTube content — ship moments, first mining runs, landing sequences. Add after YouTube workflow is established. Referral code in bio link (link-in-bio tool pointing to dayonecitizen.com).

### 5C — Reddit Presence Beyond the Subreddit

Occasional helpful answers in r/starcitizen and r/starcitizeninternational. Answer new player questions genuinely. No spam — just earn trust and let the flair/profile link to dayonecitizen.com. Drives subreddit and Discord discovery from the largest SC communities.

---

## 6. Deferred Topics

- **Discord channel simplification** — 48 channels need role-gating (Carl-bot reaction roles or Discord onboarding visibility) to avoid overwhelming new members. Planned as a separate design session. Goal: only START HERE + HELP DESK visible by default; GAMEPLAY channels unlock via interest selection in onboarding.

---

## 7. What Is Not in Scope

- Changing the referral code rotator or split (currently 67% STAR-GCQJ-N6NC / 33% STAR-C2GJ-XSSS — already set)
- Adding veteran-tier or recruitment-tracking content to screferralreward.com or screferralbonus.com (audience is new players only per SEO spec)
- Building new sites for undeveloped domains (42ndsquadron.com, o7citizen.gg, millionmilehighclub.com) — separate strategy discussion required

---

## 8. Success Metrics

| Metric | Tool | Target |
|---|---|---|
| Discord member count | Discord | 25+ members by end of Free Fly event window |
| Referral CTA clicks from Discord invite | /api/log | Track `trackingLabel: "Discord CTA"` |
| Prospect → Backer role conversions | Discord role audit | Weekly manual check |
| StarCitizenHelp buyer's guide GSC impressions | Google Search Console | Appearing within 4 weeks of publish |
| YouTube first video views | YouTube Studio | 100+ views in first 30 days |
| Reddit subscribers | r/DayOneCitizen | 10+ after first month public |

---

## 9. Decisions Log

| Date | Decision | Reason |
|---|---|---|
| 2026-05-22 | Approach C (hybrid) | Two root causes require two tracks: on-page quick wins + community nurture |
| 2026-05-22 | Discord is primary post-signup nurture channel | Spectrum outreach has low open rate; Discord is async and permission-based |
| 2026-05-22 | No pre-join purchase screening question | Would gate the exact prospects the server exists to nurture |
| 2026-05-22 | Prospect/Backer roles self-assignable via onboarding | Enables targeted @mentions without manual moderation |
| 2026-05-22 | YouTube before TikTok | Establish production workflow first; TikTok repurposes YouTube output |
| 2026-05-22 | Starter pack guide as first YouTube video | Directly addresses the $45 purchase bottleneck — highest leverage content |
