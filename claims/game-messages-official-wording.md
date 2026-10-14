---
id: game-messages-official-wording
claim: "The wording of Star Citizen's in-game error codes (ui_error_message_<code>: 211 codes in Alpha 4.10.2, 183 with a real message, the rest developer placeholders) and of the curated in-game messages and hints on SCH's error-codes page is quoted verbatim from the game's English localization file for the current build."
status: verified
sources:
  - "Star Citizen game files (CIG): Data.p4k → Data/Localization/english/global.ini, keys ui_error_message_*, plus the keys listed per message in StarCitizenHelp-live src/data/game-messages.curated.json. Build sc-alpha-4.10.2 (2026-10-12). Extracted with sc-portfolio tools/datacore/cli.py extract + tools/messages/build_messages.py."
lastVerified: 2026-10-14
usage:
  - starcitizenhelp.com /game-guides/error-codes — every official code/message/hint quote (src/data/game-messages.generated.json)
---

The generator fails if a curated key disappears from a new build and prints every string whose wording changed, so re-run it after each patch (`python tools/messages/build_messages.py`).

**The explanations are ours, not CIG's.** The "What it means / What to do" copy paraphrases the official string or hint, or the cited RSI KB article (rsi-error-* claims). A 2026-10-14 subagent fact-check found no errors. These points were reworded to match the sources: armistice zones are "typically around cities, landing zones and some stations" (Alpha 3.11 removed them from most stations); the size-limit advice for vehicle requests is generalised; the medical-bed tier note; the ICU-unavailable examples (despawned/destroyed ship, bed without MedGel). "AR Marker Tunnel" comes from the official hint Hints_RestrictedAreaTunnelNearby. The Partial Paralysis effects (ladders, heavy objects, piloting) come from the official Hints_ActorStatusEffectArmsLock* strings.

**Never add messages for features that are not live.** global.ini also holds strings for unreleased content.
