# Legal and Privacy

## Analytics Decision (settled 2026-04-29)

**Tier 2 — Vercel Analytics + Speed Insights only. No GA4.**

Rationale:
- SC audience is heavily EU/UK — GDPR applies
- Cookie consent banners tank Core Web Vitals and referral conversion rates
- Vercel Analytics is cookieless — no consent banner required
- Privacy-first framing is on-brand for a plain-English fan site

This decision is final for all 10 portfolio sites. Do not add GA4, Mixpanel, or any cookie-based analytics without a strategy discussion.

## Privacy Policy Standard

Every site must have:
- `/privacy-policy` page
- `/cookie-policy` page (noting no tracking cookies are used)
- Shared `<LegalFooter>` component with passive notice: "This site uses privacy-friendly analytics that do not track you personally."

## Footer Requirements (from SHARED_CONVENTIONS.md)

Three items required verbatim on every site:

1. **Fan disclaimer:** "This is an unofficial fan site not affiliated with Cloud Imperium Games or Star Citizen®. Star Citizen® is a registered trademark of Cloud Imperium Rights LLC."
2. **FTC disclosure:** "Affiliate Disclosure: If you create a Star Citizen account using referral code STAR-GCQJ-N6NC, the site owner (Doc_Flanigan) will receive an in-game bonus reward. You still receive your full 50,000 UEC bonus."
3. **RSI fankit badge:** `/public/images/made-by-community.png` with alt text "Made by the Star Citizen Community"

## RSI Fan Site policy — domain compliance

**Corrected 2026-08-08 against the actual policy text.** The previous note here
said SCH was being sunset "partly due to RSI Fankit FAQ restrictions around the
word 'Help' implying official support." **That reason is wrong — the policy
contains no restriction on the word "Help."** The real rule is narrower and
harder:

> "You must also refrain from using any of the following official brands and
> marks in your site URL (domain): 'Star Citizen', 'Roberts Space Industries',
> 'Cloud Imperium', 'Turbulent', and 'Squadron 42'."
>
> "Also, you must not use the name of any in-game entities in your site URL,
> (i.e. ship manufacturers)…"

Audited all 16 owned domains on 2026-08-08:

| Domain | Status |
|---|---|
| **starcitizenhelp.com** | ❌ **HARD VIOLATION** — the domain literally contains "Star Citizen" |
| **42ndsquadron.com** | ⚠️ judgement call — "Squadron 42" reordered; its own /about page calls Squadron 42™ a CIG trademark |
| **millionmilehighclub.com** | ⚠️ in-game location name — barred by the in-game-entity rule. Undeveloped: **do not develop it** |
| all 13 others | ✅ clear (`citizen`, `sc`, `freefly`, `spacesim` etc. are not restricted marks) |

**Consequence:** SCH's domain has to change. That is a *rename*, NOT the
dayonecitizen migration — see `StarCitizenHelp-live/CLAUDE.md`, which has the
traffic case for keeping the site as a standalone specialist. A 1:1 whole-site
move to a compliant hostname preserves the franchise; folding the pages into
dayone destroys it.

### Required notice
The policy requires this notice, "open, obvious, and readily seen", not hidden or
in a smaller font, **plus a link to the official site**:

> "This is an unofficial Star Citizen fan site, not affiliated with the Cloud
> Imperium group of companies. All content on this site not authored by its host
> or users are property of their respective owners."

It does allow "this **or other notice** that easily distinguishes your site from
an official site", so the network's paraphrases are defensible. Audit 2026-08-08:
**starcitizenhelp.com is the only site carrying the wording verbatim**; the other
seven paraphrase it, and all eight do carry some disclaimer. Standardising on the
exact text is free insurance. Two sites (bestspacesim.com, o7meaning.com) reach
robertsspaceindustries.com **only through referral links** — add a plain official
link to satisfy the link requirement cleanly.
