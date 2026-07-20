# Portfolio Image & Screenshot Audit — 2026-07-19

Per-site, per-page list of screenshots/pictures that are missing and would simplify what the page explains.
Audited: all 10 active content sites. (o7citizens-redirect = pure redirect, screferralbonus = retired — skipped.)

**The headline finding:** apart from StarCitizenHelp and iheldtheline, almost no page in the network has a
single procedural screenshot — everything visual is explained in prose over the same 18 generic hero renders.
The RSI signup → referral code → 50K UEC flow is described on at least 6 sites and pictured on only 2 pages.

---

# ⚡ STATUS UPDATE — Reuse pass executed 2026-07-19 (same day)

Existing screenshots were wired across the network the same evening. **~65 image placements across 7 repos, all builds green.**
The per-site audit below is the ORIGINAL pre-reuse state; items now covered are listed here.

## Assets discovered that the original audit missed

- **`images/Star_Citizen/` (portfolio root): 1,031 personal in-game screenshots, 2018–2026**, descriptively named
  (`SC-<patch>_<date>_<subject>_f.jpg`). Scenic/ship/character shots — ships, landing zones, hangars, careers,
  Invictus expo, portraits. This is the network's biggest untapped image source.
- **`images/launcher/`: 12 UI captures of RSI Launcher v2.13.3** (Apr 2026) — home/update/launch states,
  LIVE/PTU dropdown, RSI menu, Status panel, and every Settings tab (Application, Accessibility, Games+Verify,
  Storage, Download, About).
- **`images/issue council/`: 2 captures** — Issue Council landing (project cards) and project page (search + pinned issues).
- **`images/Fankit_2025_11_19/`: ~275 official CIG wallpapers** (non-commercial license — usable per the existing
  Fankit decision with disclaimer).
- SCH `public/images/ships/`: 8 clean ship renders (Aurora MR, Mustang Alpha, Avenger Titan, Cutlass Black,
  Prospector, Arrow, C2, Vanguard) — now shared cross-site.
- ⚠️ Cleanup done: `freeflyevent-site/public/images/Screenshot 2026-05-23 121907.jpg` was a **Vercel domain-config
  dashboard screenshot sitting in a public web folder** — unreferenced; deleted (recoverable from git history).

## What the reuse pass covered (by site)

- **dayonecitizen** — 33 placements / 16 pages: buying-the-game full store flow ×5, install ×3, rsi-launcher ×4,
  first-day (mission manager), first-ship + /de/starterpaket (Aurora/Mustang pairs), keybinds menu,
  adding-friends ×6, party-management, inventory ×2, ship-equipment ×2, ccu-chains ×2, food-drink ×2,
  /de/star-citizen-kaufen ×2, report-a-bug manifest 2/28 fulfilled (issue-council home + project search).
- **starcitizenhelp** — /enlist now renders its annotated signup shot; /updates shows the launcher build-number
  location (caption patch-generic).
- **freeflyevent** — 8 placements / 4 pages: signup shot on home + event-guide step 1 + is-star-citizen-free;
  launcher on step 3; mission manager on step 6; 4-planet strip (New Babbage / Area18 Plaza / Orison / Lorville)
  on step 7; starter-packages list on /should-i-buy.
- **bestspacesim** — 13 placements / 4 pages: 5-career grid (mining/hauling/salvage/medical/racing from the
  personal library) + atmospheric-flight shot on /star-citizen; real image on the SC ranking card + Aurora/Titan +
  signup shot on home; cost + referral shots on /worth-it; launcher live-build + packages list on /scam.
- **pledgemeaning** — 6 placements: pledge store menu, add-to-cart, Avenger Titan, signup shot on home;
  both CCU shots on /what-is-ccu.
- **fundedgame** — 2 placements on home (seamless-universe Crusader shot, signup shot); /billion "Anvil Odin"
  mislabel fixed — recaptioned as illustrative art, not the Odin.
- **screferralreward** — home now renders the annotated signup shot it already owned.

## Still needed after reuse (net gaps — the real capture list now)

1. **R2 — RSI account Settings → Referral screen** (the retroactive 24h path): still uncaptured, wanted on 4 sites.
2. **R3 — mobiGlas wallet showing 50,000 UEC**: still uncaptured; the funnel payoff shot, wanted on 5 sites.
3. **R9 — RSI funding tracker $1B / 6.5M accounts**: bestspacesim /scam + /player-count, fundedgame.
4. **R10 — Odin system map**: iheldtheline + 42ndsquadron (CIG Q3-2025 newsletter has a downloadable map).
5. **dayone /report-a-bug**: 26 of 28 manifest shots still uncaptured (sign-in flow, filing form, statuses, evidence).
6. **dayone /first-launch + /getting-around + /first-flight**: character creation, hab room, transit routes,
   annotated cockpit HUD — check the 1,031-shot library for hab/transit/cockpit shots before capturing fresh.
7. **In-game chat shots (o7meaning)**: SC global chat / Spectrum / Twitch / Discord `o7` — nothing exists; o7meaning
   got zero reuse and remains the least-illustrated site.
8. **Competitor-game screenshots (bestspacesim)**: Elite/NMS/EVE/X4/Starfield cards still gradients — needs
   press-kit sourcing, not capture.
9. **Player-count / funding bar charts** (bestspacesim, fundedgame /billion): build as SVG/chart components.
10. **SQ42-specific stills (iheldtheline, 42ndsquadron)**: trailer stills, Vanduul glyphs, cast/character renders,
    Idris interior — source from CIG media/Fankit; the library's Invictus expo shots (`Invictus-D4-Bengal-Idris` etc.)
    are candidates worth reviewing for 42ndsquadron /ships.
11. **Shader-compile / mid-download / launcher-download-page shots** (dayone /install step gaps).
12. **SCH surgical gaps unchanged**: keybind keyboard diagram, shader-cache Explorer path, Lorville CBD +
    station concourse + buying kiosk, interdiction HUD, shield MFD, injury HUD, StarJump viewer, CCU configurator.

*(iheldtheline and 42ndsquadron received no reuse placements — their needs are SQ42-specific and nothing in the
current asset pool matches. Their original audit sections below stand as-is.)*

---

## Reusable shots — capture once, use everywhere

These repeat across many sites. One capture session covers them all:

| # | Shot | Used by |
|---|------|---------|
| R1 | RSI signup form, Referral Code field highlighted, `STAR-GCQJ-N6NC` entered + "successfully applied" confirmation (already exists: `rsi-signup-referral-code-field.jpg` on dayone /referral-code + screferralreward /get-the-code — just not everywhere it's needed) | dayone, SCH /enlist, freeflyevent ×3, bestspacesim ×2, fundedgame, pledgemeaning, screferralreward home |
| R2 | RSI account **Settings → Referral** entry screen (the "add code within 24h after signup" path) — never captured anywhere | dayone ×2, screferralreward, freeflyevent |
| R3 | In-game **mobiGlas wallet showing 50,000 UEC** balance (the payoff shot) | screferralreward ×2, dayone /first-launch, pledgemeaning /what-is-uec, freeflyevent |
| R4 | RSI store **starter Game Package page** ($45 Citizen / $60 Generalist, "Add to cart") | dayone, freeflyevent /should-i-buy, bestspacesim /worth-it + /scam, pledgemeaning home |
| R5 | **Aurora Mk II and Mustang Alpha** exterior shots (side-by-side pair) | dayone /first-ship + /de/starterpaket, bestspacesim home |
| R6 | **ASOP terminal** with starter ship listed + hangar assigned | dayone /first-day, freeflyevent guide, SCH (covered already) |
| R7 | RSI Launcher — full annotated UI (LAUNCH, channel selector LIVE/PTU, Settings gear, build number visible) | dayone /rsi-launcher, SCH /updates, freeflyevent guide, bestspacesim /scam |
| R8 | RSI pledge-store **CCU configurator** (From-ship → To-ship, price difference shown) + My Hangar **"Apply Upgrade"** | SCH /ccu-chains, dayone /ccu-chains, pledgemeaning /what-is-ccu |
| R9 | RSI **funding tracker** showing $1B+ and 6.5M accounts | bestspacesim /scam + /player-count, fundedgame (context) |
| R10 | **Odin system map** (RSI Star Map capture or Q3-2025 newsletter map) | iheldtheline /odin-system, 42ndsquadron /odin-system + home |

---

## dayonecitizen.com (hub) — repo: dayonecitizen-main

Biggest gap in the network: ~20 procedural guide pages with **zero** screenshots.
Note: the `/report-a-bug` section already has a formal intake manifest
(`public/images/report-a-bug/manifest.json`, 28 shots, all `captured: false`) — those are pre-specified;
everything else below is net-new.

### /about
- Annotated "o7" glyph graphic: "o" labeled *head*, "7" labeled *saluting arm* (page explains this in prose only).

### /day-one-citizen/buying-the-game
- RSI top nav with **Enlist Now** button highlighted.
- Signup form with Referral Code field + code entered (R1).
- Starter package page with "Add to cart" (R4).
- RSI account Library with launcher **Download** button circled.

### /day-one-citizen/install
- RSI Library Download button circled (~20 MB installer).
- Launcher install-location / drive-selection dialog ("install on an SSD" step).
- Launcher mid-download, ~100 GB progress bar.
- First-launch **shader-compilation screen** (so new players don't think it froze).

### /day-one-citizen/rsi-launcher
- Annotated full Launcher UI (R7).
- Channel dropdown open: LIVE / PTU / EPTU.
- Settings → **Verify** file-verification option.

### /day-one-citizen/first-launch
- Character-creation screen.
- Starting hab room: bed, storage terminal/wardrobe, door.
- mobiGlas wallet with 50,000 UEC (R3).

### /day-one-citizen/first-day
- ASOP terminal with starter ship + hangar number (R6).
- Inner Thought hold-F menu on a kiosk showing "Set Destination".
- Hab interior at spawn (can reuse first-launch shot).

### /day-one-citizen/getting-around
- Annotated route shots or simple map diagrams per city: hab elevator → tram → spaceport → ASOP (Lorville monorail + Area18 minimum).
- Transit "Set Destination" kiosk placing a HUD marker.
- ASOP terminal at a hangar-bay entrance.

### /day-one-citizen/first-flight
- Annotated cockpit HUD: power triangle, speed, shields, target display ("press 1 to power on" state).
- StarMap with destination selected + quantum marker.
- Quantum targeting reticule aligned mid-cockpit.
- Landing-gear HUD state on approach.

### /day-one-citizen/first-ship
- Aurora Mk II vs Mustang Alpha side-by-side exteriors (R5).

### /day-one-citizen/keybinds
- In-game Key Bindings menu (Escape → Key Bindings) showing categories + rebind.
- Cockpit MFD capacitor/power-distribution display.

### /day-one-citizen/starter-package *(optional)*
- Aurora Mk II / Citizen Starter pack thumbnail + small ship thumbnails for the six role packs.

### /day-one-citizen/system-specs *(optional)*
- In-game graphics Settings menu ("settings to start with on day one").

### /day-one-citizen/pledge-vs-purchase *(optional)*
- RSI "Melt / Reclaim" buy-back screen (melting is prose-only).

### /report-a-bug section — 28 shots pre-specified in manifest.json, all uncaptured
- /report-a-bug: signed-out Issue Council landing, Sign In circled; optional Bug-vs-Feedback decision graphic.
- /gathering-evidence (8): Launcher build number circled; Explorer at `StarCitizen\LIVE` with Game.log; rolled backup logs; Win+R dxdiag; "Save All Information"; saved DxDiag.txt; good evidence screenshot example; video-clip frame.
- /searching-the-council (6): RSI sign-in redirect (blur email); Issue Council project tiles; search box with keyword; results list; status filter; "I can reproduce this" control.
- /filing-a-report (7): Create/New Report button; project/version/channel selectors numbered; strong issue-title example; reproduction-steps field (**the most important shot**); attachment area; More-info + Submit; confirmation.
- /after-you-file: the four status badges (Open/Confirmed/Under Investigation/Acknowledged); vote control on another report; optional lifecycle diagram.

### /beyond-the-basics/adding-friends
- RSI website player search → profile "Add Friend" button.
- Main-menu Friends panel "+ Add Friend" (pre-Enter Universe).
- F11 Commlink Contacts tab, right-click "Send Friend Request".
- Hold-F Inner Thought wheel over a nearby player.

### /beyond-the-basics/party-management
- F11 Friends list right-click "Invite to Party".
- mobiGlas Contacts "Invite to Party".
- HUD showing party members as friendly markers.

### /beyond-the-basics/quantum-travel
- Cockpit view: purple diamond quantum markers + spool bar filling (hold-B state).
- StarMap planning a longer/Pyro trip.
- mobiGlas vehicle/component-health screen.

### /beyond-the-basics/inventory-management
- Annotated inventory screen (I): personal / local storage / ship cargo panels labeled.
- Dragging an item between two panels.

### /beyond-the-basics/ship-equipment
- Loadout/component-manager screen with a component slot.
- Cockpit power-triangle MFD.
- Shield-management display (front/rear/left/right faces).

### /beyond-the-basics/ccu-chains
- My Hangar "Apply Upgrade" applying a CCU and/or pledge-store CCU token page with price difference (R8).

### /beyond-the-basics/food-drink-survival
- mobiGlas Character status tab (F1) with hunger/thirst meters.
- Optional: water bottles / nutrition bars in inventory.

### /beyond-the-basics/shops-directory
- Annotated location shots or maps: New Babbage "The Commons", Area18 "The Plaza", Lorville CBD — marking component/weapon/armor shops.

### /beyond-the-basics/redeem-codes *(optional)*
- RSI account Settings Referral entry screen (R2).

### /referral-code *(optional)*
- R2 account-settings shot for the "within ~24 hours" path (signup-time field already pictured).

### German pages
- /de/star-citizen-kaufen: same shots as /buying-the-game (Enlist Now, store package, Library Download).
- /de/starterpaket: Aurora vs Mustang pair (R5).
- /de/referral-code: covered (shares R1).

### /free-fly-events *(optional)*
- RSI Free Fly promo/landing page showing the no-purchase download flow.

### /tools *(optional)*
- Small preview thumbnails for Erkul + fleet-viewer tool cards (currently one CCU shot + text).

### /quick-reference *(optional, low)*
- In-game Key Bindings screen beside the printable table.

**No image needs:** /, /day-one-citizen (hub), /ships-real-money, /worth-buying, /is-star-citizen-on-steam, /next-wipe, /beyond-the-basics (hub), /glossary, /fact-check, /de/auf-deutsch, /de/echtgeld-schiffe, /de/lohnt-sich-star-citizen, /de/star-citizen-auf-steam

---

## starcitizenhelp.com — repo: StarCitizenHelp-live

Best-illustrated site in the network; gaps are targeted.

### /updates — Current Patch Notes *(entirely text today)*
- RSI Launcher header showing current live patch version/build number.
- In-game shot of the newest headline location (Nyx / a Pyro landing zone) for "three connected star systems".
- Marquee new ship from a recent patch (RSI Apollo medical bay interior, or Drake Ironclad).
- New-feature UI shot (Engineering/Crafting or Breaker station).

### /tools
- StarJump.io 3D ship viewer / comparison screen (the how-to steps have no image).
- Small UI thumbnail per external-tool card (Trade Calculator, Mining Profitability, Star Map, Loadout Optimizer, Item Finder, Fleet Manager).
- CCU Game "import your hangar" view (step 1 of the how-to).

### /enlist
- R1 signup shot with 50K confirmation (step 2 "Verify Code Applied" describes a confirmation never pictured here).

### /game-guides/in-game-shops-directory *(priority SEO page)*
- Lorville Central Business District shop area (heading has no image).
- Space Station shopping concourse.
- In-store buying kiosk / purchase interaction (the "Buying Guide" half is unillustrated).

### /game-guides/keybinds
- Annotated keyboard-layout diagram(s): on-foot vs flight.
- Rebind dialog (clicking a binding to reassign).

### /game-guides/transit-system
- Area18 tram, New Babbage transit line, space-station elevator/transit hub (each section text-only).

### /game-guides/preparing-for-a-new-patch
- File Explorer at `%LOCALAPPDATA%\Star Citizen` shader-cache folder (the delete walkthrough has no visual).

### /game-guides/system-requirements
- In-game Graphics settings menu, annotated for "lower these first".

### /game-guides/ccu-chains
- RSI store CCU configurator From/To purchase screen (R8) — availability listing shown, actual purchase screen not.

### /game-guides/medical-gameplay
- Health/injury HUD showing injury tiers / damage states.

### /game-guides/how-to-quantum-travel
- Interdiction alert as it appears on the HUD ("What Interdiction Looks Like" section).

### /game-guides/ship-equipment
- Ship MFD shield-configuration face (front/rear allocation described, not shown).

**No image needs:** /first-days, /adding-friends-contacts, /how-to-call-your-ship, /how-to-do-missions, /food-drink-survival, /star-citizen-redeem-codes, /getting-started, /, /game-guides index, /glossary, /about, legal pages.

---

## freeflyevent.com — repo: freeflyevent-site

Not a single procedural screenshot on the site, yet nearly every page walks the signup → referral → launcher → in-game flow in prose.

### / — Home
- R1 signup shot with Referral Code field circled (the single most-repeated instruction on the site).
- RSI dashboard showing the 50,000 UEC credit posted (R3 variant).
- In-game ship-selection / ASOP rental terminal for the "pick a ship from the Free Fly list" step (R6).

### /event-guide — Your First Free Fly *(highest-value screenshot target on the site — 9 procedural steps, zero images)*
- Step 1: RSI homepage with **Enlist Now** highlighted + signup form (R1).
- Step 2: RSI dashboard where the 50K bonus appears + account-settings code entry within 24h (R2/R3).
- Step 3: RSI Launcher download page / installed launcher (the ~100 GB download).
- Step 4: in-game Free Fly ship roster / rental terminal.
- Step 5: spawn point at starting station with tutorial contract markers.
- Step 6: mobiGlas contracts / delivery-mission terminal.
- Step 7: one representative shot each of Microtech, ArcCorp, Crusader, Hurston.

### /is-star-citizen-free
- Simple three-tier diagram: Free RSI account → Free Fly window → paid Game Package.
- Reuse R1 in the "50,000 UEC head start" block.

### /next-free-fly
- Visual year-cadence timeline/calendar (May flagship + November IAE, repeating) — currently a text table.

### /event-history
- Horizontal timeline graphic of every catalogued event 2022→2026 (bars per year).

### /should-i-buy
- RSI store starter-package listing (Citizen $45 / Generalist $60) (R4).
- Optional: gameplay stills for the "what works well" list (mining, cargo, salvage, multi-crew).

### /glossary *(low priority)*
- Small inline shots for purely-visual terms: mobiGlas, ASOP terminal, Quantum Travel HUD, Landing Pad.

---

## iheldtheline.com — repo: iheldtheline-site

Well-illustrated overall (headers, cast photos, video thumbnails, playtest invite email). Gaps are in lore/gameplay explainers and news detail pages.

### /odin-system *(strongest diagram candidate)*
- Labeled Odin system map (R10): white dwarf, Fortune's Cross, The Coil, Gainey, Odin II + Villi/Raleigh Station, Odin III, Odin IV. CIG's Q3-2025 newsletter shipped a downloadable map.
- Still of **The Coil** (arc-charge storms / debris tunnels).

### /gameplay — six systems described in prose, nothing inline; one still per system:
- Seamless transitions (on-foot → ship → surface, no loading).
- AI companions / squad combat.
- Zero-G traversal (prologue sequence).
- Living NPC crew (hangar/bridge/mess-hall, or the janitor).
- Space combat (42nd formation flying / turret combat).

### /vanduul
- Map/diagram of the human retreat: Orion → Tiber "the Grinder" → Virgil with 2681/2712/2736 beats.
- Sample of the Vanduul constructed language (intercepted-communication glyphs, March-2025 newsletter).

### /i-held-the-line-trailer
- Four stills matching the "What the Showcase Showed" list: squad combat, formation flying, on-foot corridors, large-scale space battle.

### /release-date
- Visual milestone timeline graphic (2012 announce → 2015 "2016" window → 2020 → 2023 feature-complete → 2024 CitizenCon 2026 window → May 2026 content-complete).
- Optional: screenshot of the actual "Letter from the Chairman" heading it cites.

### /news/[slug] — detail pages have zero images
- One relevant image per news beat (CitizenCon 2954 reveal still for the 2026-window story; Abbey Road orchestra photo for the score story; Odin map for the Odin reveal). Pattern already exists on /playtest-event — extend it.

### /cast/[slug]
- In-game character render beside each actor photo (Bishop, MacLaren, Old Man Colton…).

### /worth-buying *(light)*
- Abbey Road recording-session photo (96-piece orchestra) for the "164 minutes of score" bullet.

### /playtest-event *(optional, low)* — map or exterior photo of CIG Manchester studio.
### /bishops-speech *(optional, low)* — stills for the three "beat by beat" moments.

**No image needs:** /, /videos, /cast index, /sq42-vs-star-citizen, /faq, /about, /news index.

---

## bestspacesim.com — repo: bestspacesim-site

No real game screenshots anywhere — every game-ranking card is a CSS gradient with title text.
The five competitor games (Elite, NMS, EVE, X4, Starfield) have zero imagery.
⚠️ Competitor-game screenshots: check press-kit/fair-use terms per game before publishing.

### / — Home
- One representative gameplay screenshot per ranked game (SC, Elite Dangerous, No Man's Sky, EVE, X4, Starfield) to fill the empty card thumbnails.
- "Seamless atmospheric flight": single shot or 3-frame strip — quantum travel → atmospheric entry → city street.
- Avenger Titan and Aurora Mk II images for the "Getting Started" first-ship mentions.
- R1 referral shot for the 50K UEC line.

### /best-space-games
- One screenshot beside each of the 6 ranked entries (currently 100% prose).
- Optional: ranked-podium/scorecard graphic (9.4, 8.2, …).

### /comparison
- Small game logos/thumbnail icons in comparison-table column headers.
- Representative screenshot per game in the "at a glance" list.

### /star-citizen — Review (9.4/10)
- Career shots for "careers do real work": mining, hauling (physicalised cargo), salvage, medical rescue, racing — one each or a 5-tile grid.
- Seamless-atmospheric-flight shot (shared with home).
- Optional: visual scorecard graphic for the 9.4/10.

### /is-star-citizen-worth-it
- RSI store starter Game Package ($45) page — one-time price, no subscription (R4).
- R1 referral 50K shot.
- Optional: worth-it / not-worth-it decision graphic.

### /is-star-citizen-a-scam — argument rests on verifiable figures; show them:
- Live RSI funding tracker: $1B+ and 6.5M accounts (R9) — the strongest "not a scam" visual.
- Launcher/game showing Alpha 4.9 live (proof it's playable today) (R7).
- Squadron 42 in-game screenshot (rebuts "vaporware").
- Pledge-store shot with ship prices / $45 starter (R4).

### /star-citizen-player-count — entirely about numbers; entirely imageless:
- RSI "6.5 million Star Citizens" counter (R9 crop).
- **Bar/range chart** visualizing the "estimates disagree ~5x" claim (≈13K daily vs ≈63K concurrent) — clearest chart opportunity on the site.
- Busy landing-zone shot ("servers feel populated").
- Optional: small diagram of the three verifiable signals.

### /star-citizen-vs/[slug] — ×5 (elite-dangerous, no-mans-sky, eve-online, x4-foundations, starfield)
- Two-up side-by-side gameplay screenshot per matchup (SC | opponent) under the "feature by feature" heading — repeats across all 5 pages.
- Optional: visual score-bar comparing the two ScoreBadge scores.

---

## highestfundedgame.com — repo: fundedgame-site

Has one good data visual (the SVG FundingMilestoneChart, used on all 3 pages). No real screenshots.

### / — Home
- **Real Anvil Odin image** for the "$1B milestone / the ship that crossed the line" callout.
- Gameplay screenshot showing the seamless universe (ship + planet + station, no loading) for "What is Star Citizen?".
- R1 referral shot for the "How do you get started" section.

### /the-story
- Screenshot of the original 2012 **Star Citizen Kickstarter page** ($500K ask / $2.1M raised) — the story's opening beat.
- Pledge-store concept-art / ship-lineup shot ("records start falling" chapter).
- Stanton PU alpha gameplay shot (2016–2019 chapter); Pyro reveal image (2023 chapter).
- Optional: "SC vs next-largest crowdfunded campaign" bar comparison.

### /billion
- **Real Anvil Odin image** — the "ship that crossed the line" section currently shows generic `hero-06`, an unrelated ship. (Same asset as home.)
- **Bar chart** for the "in context" stats: $1B+ vs ~$10M next-largest crowdfunded game vs $100–200M AAA budget (~100× / 5–10× scale) — three text tiles begging for proportional bars.

---

## o7meaning.com — repo: o7meaning-site

Zero screenshots site-wide; hero carousel only.

### / — Home
- Real chat screenshot of `o7` in context — SC in-game Global chat or Spectrum (leads the funnel).
- Twitch chat wall-of-`o7` at end of stream.
- Discord `o7` greeting message.
- Rotated-figure illustration of the salute read sideways (copy says "turn your head ninety degrees" — a graphic replaces the mental gymnastics).
- Optional: in-game `/salute` emote.

### /in-gaming
- EVE Online local chat with `o7` (the claimed origin — period-authentic capture is the strongest evidence).
- Elite Dangerous chat `o7` between Commanders.
- Twitch wall-of-o7s / "o7 to the fallen".
- Discord `o7` greeting.
- Small `o7` vs `7o` mirrored-figure glyph visual for the "How to Use" list.

### /in-star-citizen
- SC in-game chat window with `o7` / "o7 citizen" (the page's core claim, currently 100% prose).
- RSI Spectrum post/thread showing `o7`.
- In-game salute emote mid-animation.
- YouTube/creator thumbnail featuring `o7`.
- Optional: labeled composite of the "Where You Will See It" list.

### /faq *(low priority)*
- One representative o7-in-chat screenshot near the top; no unique gap.

---

## pledgemeaning.com — repo: pledgemeaning-site

Zero screenshots site-wide; the site defines "pledge" by pointing at a store it never shows.

### / — Home
- **RSI pledge store UI**: ship/package listing with the "Pledge"/"Add to cart" button and price — the page's entire subject, unpictured.
- Starter-package contents screen (game access + starter ship + insurance line) (R4).
- Ship in the player's RSI "My Hangar" account view (what you get in return).
- A pledged ship in-game / on a landing pad (Aurora, Mustang, or Avenger Titan — all named in copy).
- R1/R3 referral 50K confirmation for the conversion section.
- Optional: captioned store-vs-Steam screenshot pair for "pledge vs buy".

### /what-is-uec
- mobiGlas wallet showing aUEC balance (R3) — page defines the currency, never shows it.
- In-game shop/terminal purchase screen with a UEC price (Dumper's Depot etc.).
- RSI store "Buy UEC" page.
- Optional: labeled aUEC-vs-UEC contrast graphic.

### /what-is-lti
- RSI store ship-detail showing "Lifetime Insurance (LTI)" vs a "3 months" tier — the clearest proof of what LTI looks like.
- In-game insurance claim terminal (claiming a destroyed hull).
- Hangar/account view with a ship's insurance badge.
- Optional: diagram of LTI carrying through a CCU.

### /what-is-ccu
- RSI store CCU/Upgrade configurator: from-ship → to-ship with price difference (R8).
- "Apply upgrade" action in the RSI Hangar (R8).
- Visual CCU-chain diagram: Aurora → Avenger Titan → Cutlass Black with running cost ($120 vs $140 direct) — currently three text cards.
- Optional: Warbond CCU store label during an IAE event.

---

## screferralreward.com — repo: screferralreward-site

Has ONE real screenshot (annotated RSI signup, on /get-the-code Step 2 only).

### / — Home
- The annotated R1 signup screenshot near the CTA — the homepage's core promise is entirely prose while the asset already exists (`/images/rsi-signup-referral-code-field.jpg`).
- mobiGlas wallet with 50,000 UEC (R3) — "instantly add 50,000 UEC" is never visually confirmed.
- Optional: in-game shop/kiosk purchase screen to anchor the "What 50,000 UEC Gets You" grid.

### /get-the-code
- Account-settings referral screen (R2) for the retroactive 24-hour path — described in Step 1 + FAQ, never shown.
- mobiGlas wallet 50K shot (R3) for Steps 4–5.
- Optional Step 5: in-game shop/kiosk buy screen.
- Optional Step 3: wider signup-form crop (email/handle/password/country — existing shot is cropped to the code field).

---

## 42ndsquadron.com — repo: 42ndsquadron-site

Decent generic photography (hasgaha credits); gaps are subject-specific.

### / — Home
- Small Odin-system / UEE-frontier locator map for the "Theater of Operations · Odin system" row (share R10).

### /history
- Capture of the actual May-2025 subscriber-newsletter ship render/wallpaper (section describes it; current image is a generic dogfight).
- Optional: still from the CitizenCon 2953 "I Held the Line" showcase for "Formation Flying in Combat".

### /ships
- **Idris interior** shot (crew/corridors/bridge) — the "Living Idris" section explicitly describes interior NPC life but is paired with an exterior shot.

### /vanduul
- Vanduul constructed-language glyph sample (subtitle still or lore sheet) — the one distinctly visual section with no image.
- Optional: a Vanduul capital ship (only the Scythe fighter is shown).

### /characters — no images at all on this page
- Portrait grid: actor headshots or in-game renders for the four confirmed roles (Hamill/Colton, Oldman/Bishop, Anderson/MacLaren, Cavill/Enright).
- Still from the CitizenCon 2015 "Bishop's Speech" cinematic for the cast-announcement section.

### /odin-system *(strongest need on the site)*
- Odin on the official RSI Star Map (R10) — the page says "it appears on the official star map" and shows nothing.
- Diagram/labeled shot locating Fortune's Cross and The Coil within the system.
- Magnetic-aurora / white-dwarf environmental effect capture (ideally an Odin/"I Held the Line" still, not the generic Eclipse shot).

### /answer-the-call
- Still/title card from the Oct 12, 2018 SQ42 CitizenCon trailer — the page is built around that trailer but shows a generic portrait.

**No image needs:** /about.

---

## Top 10 highest-impact captures (if prioritizing)

1. **R1 everywhere it's missing** — the signup/referral shot exists; wiring it into freeflyevent, SCH /enlist, bestspacesim, pledgemeaning, screferralreward home is near-free conversion support.
2. **R3 mobiGlas 50K wallet** — the payoff shot for the entire referral funnel; used by 5 sites, captured nowhere.
3. **freeflyevent /event-guide step shots** — 9-step procedural page, zero images, on the Bing-engine flagship.
4. **dayone /buying-the-game + /install + /first-day chain** — the hub's core new-player funnel is 100% prose.
5. **dayone /report-a-bug manifest (28 shots)** — already spec'd, placeholders rendering live on the site.
6. **R10 Odin system map** — unlocks the strongest page on both iheldtheline and 42ndsquadron.
7. **bestspacesim game thumbnails ×6** — every ranking card is an empty gradient; the site reviews games it never shows.
8. **R9 funding tracker $1B / 6.5M** — anchors bestspacesim /scam + /player-count and fundedgame.
9. **Real Anvil Odin image** — fundedgame /billion literally mislabels a generic ship as "the ship that crossed the line."
10. **42ndsquadron /characters portrait grid** — the only page in the network about people, with zero faces on it.
