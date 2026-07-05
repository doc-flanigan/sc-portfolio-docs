# 42ndsquadron.com Finish — Design

2026-07-05. Site is LIVE (apex 200, GA4 firing, llms.txt, IndexNow) — prior "half-built /
not deployed" memory was stale. Scope approved: integration first, then content. Answer the
Call page lands on 42ndsquadron.com (not iheldtheline).

## Phase A — Network integration
1. **Inbound editorial links** (body copy only): iheldtheline homepage + /vanduul →
   42ndsquadron.com (differentiation: iht = release tracking/marketing history, 42ndsq =
   lore depth); iht llms.txt Related entry; iht CLAUDE.md gets a documented sister-site
   exception (precedent: SCH→freeflyevent). dayonecitizen glossary "Squadron 42" entry →
   42ndsquadron.com editorial link; dayone llms.txt Related; dayone CLAUDE.md cross-link
   list updated.
2. **Dashboard**: add 42ndsquadron.com to dashboard/data/sites.js.
3. **Search consoles**: GSC + BWT property registration staged as a manual 2-minute user
   step (needs authenticated session); sitemap URL ready.
4. **Housekeeping**: fix stale memories (undeveloped-domains); claim-file usage labels
   "42ndsquadron.com (pre-launch)" → "42ndsquadron.com".

## Phase B — Content & GEO arming
1. **/answer-the-call**: extractable definition of the phrase (official — 2018 CitizenCon
   SQ42 trailer, comm-link 16801, verify via wiki API), marketing context, recruitment
   framing → enlist CTA. FAQ + FAQPage schema, Sources via new ledger claim
   `answer-the-call-official-phrase`. Add to llms.txt + sitemap.
2. **GEO pass** on history, ships, odin-system, vanduul, characters: bold extractable
   answer paragraph + 3-Q visible FAQ mirrored in FAQPage JSON-LD per page (recipe in
   geo-audit memory). Extend Sources coverage where ledger claims exist.
3. **Gate**: claims-ledger check-first on all new copy; build green; push (auto-deploy +
   IndexNow); curl-verify.

## Success criteria
Inbound links live from iht + dayone; dashboard shows site 11; /answer-the-call live with
FAQ schema; all content pages have answer + FAQ; ledger + memories consistent with "live".

Constraints: official-CIG-sources-only; referral copy "50,000 UEC"; cross-links body-copy
only; branch is `master` in this repo.
