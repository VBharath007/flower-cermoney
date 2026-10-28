# Teal & Gold Flower Ceremony Invitation

A complete Next.js App Router + TypeScript + Tailwind CSS v4 project with Framer Motion animations. Six full-screen scenes, a replayable opening overlay, responsive layouts, keyboard-accessible navigation, and reduced-motion support.

## Run locally

Install Node.js 22 LTS or newer. Extract this folder and open a terminal here:

```bash
npm ci
npm run dev
```

Open http://localhost:3000. Production:

```bash
npm run build
npm start
```

## Change your invitation

Edit `lib/invitation.ts`:
- Bride, groom, parents, venue, date labels, time, and map link.
- Set `dateISO` to the real date, including `+05:30` for India. The supplied design says 16 Nov 2026; it is deliberately retained as sample content. Since that date is past, the countdown shows zeros and a completed message. Set a future date to see the live countdown.
- Add your real video to `public/video/flower-ceremony.mp4`, then set `videoSrc: '/video/flower-ceremony.mp4'`. No actual ceremony video was supplied. Until configured, the section honestly shows a coming-soon panel, not a broken or fake player.
- Optional subtitles: add a WebVTT file and set `videoCaptions`.
- Change SEO title and description in `app/layout.tsx` when changing names.
- Global palette lives in `app/globals.css`: `--teal`, `--deep`, `--gold`, `--ivory`, `--pale`.

## Sections

1. Opening: split teal doors, tug-of-war illustration, TAP TO OPEN, and a welcome scene revealed behind the doors.
2. Bride & groom: illustrated couple centered, names on the two sides on desktop; portrait above two name columns on mobile.
3. Flower ceremony invitation: message, date, time, venue, animated petals, flowers, and lamps.
4. Countdown and location: real time calculation with an explicit past-event state.
5. Ceremony film: HTML5 video when configured; coming-soon artwork otherwise.
6. Family details and gratitude: both families, thank-you message, replay control.

## Opening animation specification

Reference inspected: https://wedding-invittation.vercel.app/

The reference's observed sequence and public animation parameters have been recreated in a fresh Next.js implementation:
- Perspective: 2200px.
- Button disappears over 0.22 seconds.
- Illustration shake: `[0, -2, 3, -4, 4, -3, 2, 0]` over 0.52 seconds; easing `[0.36, 0.07, 0.19, 0.97]`.
- Illustration divides into two clipped halves, traveling -72vw / +72vw with -3 / +3 degrees of rotation and fading out over 1.38 seconds after a 0.52-second delay; easing `[0.65, 0, 0.25, 1]`.
- Doors rotate around their outside edges by -108 / +108 degrees, for 1.7 seconds after a 0.28-second delay; easing `[0.7, 0, 0.2, 1]`.
- Overlay exit begins at 1.9 seconds and fades for 0.6 seconds.
- Reduced-motion preference simplifies the sequence.

This matches the opening sequence and timing, not a claim of pixel-identical rendering. Teal illustrations were regenerated/recoloured from the supplied reference site's visible illustration assets. Floral SVG ornaments, backgrounds, and six-section content have been adapted to the supplied teal-and-gold flow image. The reference itself has a wedding journey section; this project intentionally follows the user's flower ceremony flow instead.

## Files

- `components/Opening.tsx`: door, rope shake, split illustration, tap button.
- `components/Invitation.tsx`: six scenes, navigation, countdown, video.
- `components/Decorations.tsx`: SVG floral ornaments, corners, lamps, petals.
- `app/globals.css`: theme, responsive layouts, ornament animations.
- `lib/invitation.ts`: editable content.
- `public/images/`: bundled transparent teal illustrations (no runtime reference-site dependency).

Fonts load from Google Fonts with local serif fallbacks; the invitation remains functional if that service is unavailable. For fully offline typography, self-host the fonts and replace the CSS import.

## Asset provenance

Reference artwork source: reference site `/preloader.png` and `/nandha.png`. Teal variations produced using the built-in image generation tool. Please replace sample faces/artwork with your own if this invitation is for a different couple. Prompts are recorded in `ASSET-PROMPTS.md`.

## Deployment

Import this project into Vercel as a Next.js project, or deploy to a server supporting `next start`. No API keys, database, or environment variables are needed. No deployment has been performed as part of this deliverable.
