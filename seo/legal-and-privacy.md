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

## RSI Fankit Compliance Note

starcitizenhelp.com is being sunset (6–18 months) partly due to RSI Fankit FAQ restrictions around the word "Help" implying official support. dayonecitizen.com is clearly unofficial and fan-branded — no compliance issue.
