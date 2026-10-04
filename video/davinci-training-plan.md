# DaVinci Resolve training plan for the getting-started video

**Date:** 2026-10-04
**Goal:** be able to cut one 4–7 minute narrated tutorial without fighting the tool.
**Installed:** DaVinci Resolve 20.3.2 (free). Match training material to version 20.
**Scope:** the Edit page and the Deliver page only. Cut, Fusion, Color and Fairlight pages are off limits until video two.

The trick for a first video is that the narration is the timeline. The MP3 is rendered
before any footage exists, so the edit is "lay footage under a fixed voice track," not
"find the story in the footage." That removes most of what makes editing hard.

---

## Session 0 — Set up once (20 min)

1. Preferences → Memory and GPU → Decode options: enable GPU (RTX 3090 Ti).
2. Project Settings → Master Settings: timeline 1920x1080, 60 fps. Set this **before**
   importing anything; Resolve locks frame rate to the first clip otherwise.
3. Confirm the Stream Deck profile switches when Resolve is focused (layout is in the
   DaVinci workflow memory note).
4. Save a project called `sc-practice`. This one is throwaway.

## Session 1 — Practice rep on the stale footage (60–90 min)

Use the April footage and April narration that are already on disk and already
transcoded. The output is garbage by design; the point is reps.

- Footage: `videos/sc-tutorial-1080p.mp4`
- Narration: `audio/getting-started/narration_final.mp3`

Do these in order and stop when they feel automatic:

1. **Import** both into the Media Pool (drag from Explorer).
2. **Build the timeline**: drag the video in first, then the MP3 onto A2.
3. **Lock A2** (padlock on the track header). From here on, the voice never moves.
4. **Scrub**: Space to play, J/K/L to shuttle, arrows for single frames, Shift+Z to fit.
5. **Markers**: play the narration and press **M** every time the script changes
   section. Rename each marker to the section (double-click it). This is your shot list.
6. **Blade and ripple delete**: B for blade, click to cut, A for selection, click a
   section of dead footage, **Backspace** to ripple delete so the gap closes. Do this at
   least ten times on loading screens and idle moments.
7. **Slide clips**: drag a clip to start at a marker. Hold Shift to disable snapping
   when it fights you.
8. **Change clip speed**: right-click a clip → Change Clip Speed → set a percentage.
   Use it when a 40-second walk needs to cover 15 seconds of narration.
9. **Audio levels**: A1 game audio at -20 dB, A2 narration at 0 dB. Drag the volume line
   on the clip, or Inspector → Audio → Volume.
10. **Fade**: hover a clip's top corner, drag the white handle for a video or audio fade.
11. **Deliver**: Deliver page → custom → MP4, H.265, 1920x1080, 60 fps → Add to Render
    Queue → Render All. Export to `videos/practice-export.mp4` and watch it once.

If you finish and feel comfortable, that's all the training video one needs.

## Session 2 — The three extras you'll actually use (30 min)

1. **Text callouts**: Effects → Titles → **Text+**. Drag onto V2 above the footage, type
   "Hold F" or "F1 — mobiGlas." Set font size and position in the Inspector. Save one
   you like as a preset (right-click the clip → Generate Preset) so every callout matches.
2. **Zoom in on UI**: select the clip → Inspector → Transform → Zoom. Use a keyframe
   (the diamond) at the start and end if you want the zoom to animate. Good for the
   wallet screen and the ASOP terminal.
3. **Freeze frame**: right-click a clip → Freeze Frame, for holding on a menu while the
   narration finishes a sentence.

## What to skip entirely

- The Cut page. It's a second way to do what the Edit page does, with different muscle
  memory.
- Fusion, Color, Fairlight. The footage is already SDR after the transcode and the audio
  is two tracks at fixed levels.
- Proxy media and optimized media. 1080p H.264 plays fine on this machine.
- Any plugin or template pack.

## Resources, in the order I'd use them

1. **Blackmagic's own free training**: blackmagicdesign.com/products/davinciresolve/training.
   The Beginner's Guide to DaVinci Resolve is a free PDF with downloadable lesson media.
   Lesson 1 (Quick Start) and Lesson 2 (Editing) are the only two that matter here.
   About two hours if you do the exercises.
2. **One short YouTube overview** of the Edit page in the current Resolve version, under
   20 minutes, watched once before Session 1 so the panel names are familiar. Search
   "DaVinci Resolve edit page beginner" and pick the most recent one from a channel with
   a full Resolve catalogue. Skip anything titled "complete course" or over an hour.
3. **The Stream Deck layout** in the workflow memory note. After Session 1, the fifteen
   keys on it cover everything the first video needs.

## Checkpoints

| After | You should be able to |
|---|---|
| Session 0 | Open a 1080p60 project and import without a frame-rate prompt |
| Session 1 | Cut, ripple delete, slide to a marker, speed a clip, export |
| Session 2 | Add a matching text callout and a UI zoom in under a minute each |

When all three rows are true, record the real footage and cut the real video. Budget
one evening for the practice rep and one for the real cut.
