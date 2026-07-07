# Day One Citizen Discord — Shopfront Revival Design

**Date:** 2026-07-06
**Status:** Approved by Doc (remote session)
**Goal:** Credibility shopfront — a web visitor clicking the Discord link from any
portfolio site should land somewhere that looks alive and useful. Growth is a
bonus, not the goal.

## Diagnosis (surveyed 2026-07-06)

- 14 members; server created 2026-01-27.
- #general and #announcements have zero messages; last activity anywhere was a
  single intro exchange on 2026-06-05. No scheduled events.
- 35 channels / 7 categories / 33 roles — structure built for a scale the
  server doesn't have. Empty rooms are what make it read as dead.
- Native onboarding flags exist but onboarding is not actually configured.

## Design

### 1. Structure — consolidate hard, reversible

Everything hidden, nothing deleted. Visible layout (7 text + 2 voice):

- 📍 START HERE — #welcome (rewritten; reaction-role 🔔 → @Patch Drops for
  news pings), #rules, #announcements (becomes the news feed),
  #introduce-yourself
- 💬 COMMUNITY — #general, #new-player-help (renamed from #first-30-days;
  absorbs the help desk), #screenshots
- 🎙️ VOICE — General, Help Me Please 🆘

Hidden via @everyone VIEW_CHANNEL deny: account-and-pledge,
controls-and-hardware, install-and-crashes, patch-notes-discussion,
ship-questions, first-time, finding-your-org, off-topic, Newbie Lounge, AFK,
and the 📅 Events category (until a real event exists). Mod area and Doc's
Privates remain private as today.

Every visible channel gets a real topic and a pinned starter message linking
the relevant dayonecitizen.com / starcitizenhelp.com guide (cross-promotion).

### 2. Roles — dormant, not deleted

The 8 gameplay roles (Combat, Mining, …) and 5 region roles go dormant:
removed from any pick-list surfaces, kept in the role list. Active set: Mod,
Helper, Member, Founding Citizen, Backer, bots, and @Patch Drops repurposed as
the news-ping opt-in.

### 3. News heartbeat — cron + Haiku

- GitHub Actions cron in dayonecitizen-main, daily 23:30 UTC (CIG publish
  window: 15:00–22:00 UTC, mode 20:00 — same analysis as sc-news-watch).
- Polls api.star-citizen.wiki comm-links + developertracker.com RSS; diffs
  against a committed state file (same pattern as .github/sc-news-state.json).
- New items → Haiku 4.5 writes a 2–3 sentence plain-English summary (site
  Plain-English Standard applies); posted as a styled embed via webhook to
  #announcements, always linking the official source URL.
- @Patch Drops mention only on patch-note items.
- Secrets: DISCORD_NEWS_WEBHOOK_URL (new webhook), ANTHROPIC_API_KEY (repo
  already has it). Cost ≈ $0.10/month.
- Seeding: run the script once at deploy time so #announcements starts with
  the 2–3 most recent items, never empty.

### 4. Day-one polish

- Server description set (currently null); welcome screen configured.
- #general seeded with a pinned starter post.

## Out of scope

Events programming, growth campaigns, deletions, member-count goals,
Carl-bot automation beyond the single reaction-role message.

## Success test

A visitor clicking through from a site sees ≤10 channels, every one with
content, news posted within the last few days, and an obvious place to ask a
question.
