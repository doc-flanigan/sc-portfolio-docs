---
id: asop-call-ship-deliver-then-retrieve
claim: "To call a ship at an ASOP terminal, interact (F) and choose Deliver, then Retrieve; the ship appears in your hangar, reached from the hangar elevators near the ASOP terminals."
status: verified
sources:
  - https://support.robertsspaceindustries.com/hc/en-us/articles/360025028633-Getting-Started-in-the-Verse
lastVerified: 2026-10-18
usage:
  - dayonecitizen.com /day-one-citizen/getting-around — retrieve-your-ship steps
  - dayonecitizen.com /day-one-citizen/first-day — call-your-ship steps
  - dayonecitizen-main/src/data/day-one-steps.ts — "Do this now" ship-call step
---

Added 2026-10-18. RSI KB "Getting Started in the 'Verse" (updated 2026-07-27): "Approach the vehicle retrieval console and interact with F to Deliver and then Retrieve one of your ships ... Once your ship has been delivered, head to your hangar to board! You can reach your hangar from the elevators near the ASOP terminals." 4.10.2 UI strings in tools/keybinds/raw/global.ini agree: ShipSelector_ClaimLabel_Deliver=Deliver and ShipSelector_Label_Retrieve=Retrieve; Hints_ASOP3 also says to select 'Retrieve' on the vehicle you want brought to a hangar.
