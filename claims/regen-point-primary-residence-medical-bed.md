---
id: regen-point-primary-residence-medical-bed
claim: "By default a player regenerates at their primary residence; creating an imprint at a medical bed sets that bed as the regen point, and the location can be reset to the primary residence at a terminal at any medical bed or insurance office."
status: verified
sources:
  - https://support.robertsspaceindustries.com/hc/en-us/articles/4409996816535-Healing-and-Medical-Treatment
lastVerified: 2026-10-18
usage:
  - dayonecitizen.com /day-one-citizen/first-flight — "Your first week" death/regen section
---

Added 2026-10-18. RSI KB "Healing and Medical Treatment" (updated 2026-07-28): "Upon dying, you will begin this regeneration process at whichever medical bed you last selected as your regeneration [point]" and "If you are not in range of whichever bed was set as your last regen point or the bed is not functioning for some reason, you will instead respawn at your home location." 4.10.2 global.ini strings (tools/keybinds/raw/global.ini): Hints_ActorStatusRespawnMedBed "By default, you'll regen at your primary residence, but a new location can be selected via medical beds or at insurance offices."; Hints_ActorStatusRespawnLocationSet "To reset your regen location to your primary residence, use a terminal at any medical bed or insurance office."; Hints_Respawn_MedBed_SetRespawn "Create an imprint at a location to regen there after you die. You'll regen there until your location's reset or a new imprint's made." Medical-bed regen range depends on bed tier (T3 50,000 m, T2 8,000,000 m, T1 750,000,000,000 m).
