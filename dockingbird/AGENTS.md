# Dockingbird product website

- Never use emoji icons, emoji presentation selectors, or Unicode pictographs as UI icons. Use SVG paths or the existing brand SVG assets. This includes arrows, playback controls, success states, and auxiliary pages.
- Use actual product captures for product UI. Keep source provenance in `docs/product-media.md`; do not invent dashboards, sample metrics, or performance claims.
- Label accelerated recordings and demo data. Preserve the distinction between estimates and billing, and between supported and unavailable metrics.
- Keep the light purple identity, readable contrast, consistent type sizes, and compact responsive spacing. Inspect narrow, tablet, and desktop layouts after visual changes.
- Run `npm test`, `node --check public/assets/site.js`, and `npm run build` from this directory. Keep the D1/Turnstile waitlist contract intact.
