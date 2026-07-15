---
id: rsi-website-no-german-locale
claim: "robertsspaceindustries.com does not serve a functional German (or French) locale — /de/ and /fr/ paths 302-redirect to the /en/ equivalent; the site (store, comm-links, enlist/account-creation flow) is English-only."
status: verified
sources:
  - https://robertsspaceindustries.com/en/referral-program
lastVerified: 2026-07-12
usage:
  - (not yet placed on a page)
  - dayonecitizen.com /de/referral-code — English-signup walkthrough framing
  - dayonecitizen.com /de/auf-deutsch — website-language section
---

2026-07-14: frontmatter status was wrongly `refuted` (bad write on 2026-07-12 — body evidence below verifies the claim); corrected to `verified` during the first dev-post cross-audit.

Verified 2026-07-12 via direct HTTP HEAD check: curl -sSI https://robertsspaceindustries.com/de/referral-program -> 302 Found, location: /en/referral-program. Same result for /de/, /de/enlist, /de/comm-link, and /fr/ (control). No German-language enlist/account-creation flow exists; a German visitor completing referral signup does so in English. Re-check with curl -sSI on future audits — this is a fast, non-JS-dependent test unlike other RSI pages.
