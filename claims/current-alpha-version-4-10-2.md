---
id: current-alpha-version-4-10-2
claim: "The current live Star Citizen build is Alpha 4.10.2 (build 4.10.2-live.12881860), deployed October 9, 2026; the deployment was routine maintenance with no mention of a wipe or reset."
status: verified
sources:
  - https://status.robertsspaceindustries.com/issues/2026-10-09_live-deployment/
  - https://support.robertsspaceindustries.com/hc/en-us/articles/360056254754-Star-Citizen-Alpha-4-10-2-Known-Issues
lastVerified: 2026-10-09
usage:
  - dayonecitizen.com /day-one-citizen/next-wipe — current-patch header + "did 4.10.2 wipe" answer (no)
---

Flipped 2026-10-09 (supersedes current-alpha-version-4-10-1, retained as history because
"did 4.10.1 wipe" answers still render). Triggered by a source-watch hit on the RSI status
page for the 2026-10-09 live deployment issue.

Confirmed via the RSI status page issue body: "The Live Service is currently in
maintenance to deploy Star Citizen Alpha 4.10.2" and the 1400 UTC update line "Star
Citizen Alpha 4.10.2-live.12881860 available for download, Servers online." The matching
Known Issues KB article (360056254754) carries an `edited_at` of 2026-10-09, corroborating
4.10.2 as the live build.

**LTP / starting-aUEC not independently confirmed for this patch.** Unlike the 4.10.1 flip,
the official Patch-Notes comm-link for 4.10.2 was not yet retrievable via either sanctioned
fetch path (api.star-citizen.wiki/api/comm-links had not indexed it; comm-link 21334 that a
verification pass pointed at is "RSI Discovery Month," an unrelated Discovery Month event
post, not the release notes) at the time of this entry. Per
[[feedback_fact_check_absence]], absence of a wipe statement in the deployment notice is
not proof of "no wipe" — so site copy says only that the deployment notice itself describes
routine maintenance with no reset language, and carries forward the 20,000 aUEC starting
figure from 4.10.1 (new-character-starting-auec-20000.md) rather than asserting it was
reconfirmed in 4.10.2's own notes.

Version-dependent and incomplete — next pass should re-fetch the Patch-Notes comm-link (it
should post the same day; the delay appears to be wiki-mirror indexing lag, not CIG not
publishing it), confirm or correct the LTP/aUEC statement, and update this claim plus
dayonecitizen.com's "did 4.10.2 wipe" answer with the explicit Build Information line.
