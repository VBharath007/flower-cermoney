# Validation

Passed:
- `npm run build`: Next.js 15.5.28 optimized production build, static page generation, and bundled routes succeeded.
- `npm run typecheck`: TypeScript completed without errors.
- Both bundled artwork files verified as RGBA PNGs with genuine transparent pixels.
- All six section IDs and navigation entries are implemented.

Not completed in this environment:
- Live desktop/mobile browser interaction and screenshot checks. The cloud browser could not connect to the local development server; local Playwright browser installation failed because the browser download was not a valid archive. Do not treat this as a visual QA pass.

Before launch, run `npm ci && npm run dev`, then verify:
1. TAP TO OPEN shakes the illustration, opens both doors, splits the illustration, and dismisses the overlay.
2. All six navigation dots, previous/next buttons, manual scroll, and replay work.
3. Layout at 390px, 768px, and 1440px viewport widths.
4. Update the sample past date, family details, location and artwork to your real event details.
5. Add the real MP4 and check playback on iOS/Android if video is needed.
6. Verify reduced-motion preference, Tab navigation, and keyboard button activation.
