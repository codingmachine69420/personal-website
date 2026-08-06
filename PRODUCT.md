# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primarily the site owner, Anson Chan — a self-directed space he controls to document and present himself. Finance recruiters, employers, classmates, competition judges, and general professional/personal network are real visitors and will size him up during hiring or general acquaintance, but the site is not narrowly optimized for a hiring funnel; it doubles as personal expression.

## Product Purpose

A personal site for Anson Chan, a 21-year-old BBA Co-Op Specialist in Finance student at the University of Toronto (2023–2027), based between Toronto and Hong Kong. It presents a fuller person than a resume or LinkedIn profile can: mindset essays, professional projects, a photo gallery, and interest pages. Success is a visitor coming away with a rounded impression of who he is, not just what he's done.

## Positioning

The differentiator is breadth and personhood: the site pairs a legitimate finance/markets track record with builder projects, travel/photography, and personal reflection, presented as one coherent person rather than a segmented resume. Site name: "Discovering Anson."

## Operating Context

- Multi-page React site (React Router v7) with route-level code splitting (React.lazy + Suspense).
- Nav: **Mindset** · **Projects & Experiences** · **Interests** · **Photo Gallery** — four sections; wordmark is "Discovering Anson."
- Old routes (/driven, /curious, /attitude, /work, /writing) redirect to their nearest equivalents.
- Visual identity: NatGeo-editorial magazine aesthetic — black gutters, ochre accent frames (`--color-accent: #D9A21B`), three-tier type system (Barlow Condensed display, Source Serif 4 body, Barlow metadata/labels), no border-radius anywhere. This is incumbent authority, not something to casually override.
- Gallery: masonry grid (`columns-2 sm:columns-3 md:columns-4`), real personal travel/life photos, always-visible captions.
- Resume linked as static PDF (`/resume.pdf`) — prominent strip on Projects & Experiences page, with a real headshot and employer logo plates (RBC, Odysseus Capital Asia, PwC) alongside it.
- Projects & Experiences' hero title block plays a slow, one-shot fade/slide-up reveal on mount (`framer-motion`, `duration: 1.2s`, ease `[0.16, 1, 0.3, 1]` — the same easing curve used in `index.css` for `.film-frame`). Respected by `MotionConfig reducedMotion="user"` automatically. Home's equivalent reveal was removed per feedback (an entrance-scale artifact on the photo frame read as an unwanted pop) — Home's hero is now static. Don't re-add motion to Home without checking first.
- `src/components/CollageBanner.jsx`: photo-mosaic banner (used on Mindset and Projects & Experiences in place of the old striped "Photo banner — coming" placeholder) — real photos edge-to-edge in a top row and bottom row, with a solid black title band across the middle (page name, `.font-editorial`, so it renders uppercase automatically). Modeled directly on a reference image Anson supplied (a "CINEMA RETROSPECTIVE" photo-grid banner) — this superseded an earlier scattered/rotated/shadowed version built one request prior; don't revert to that version without checking first. The banner's title text is a `<p>`, not a heading — the page's real `<h1>` still follows below it, so there's no duplicate top-level heading in the accessibility tree. Each photo has a hand-picked `objectPosition` (checked by looking at the photo) so cropping never hides the actual subject — never default to `pos: 'center center'` when adding one without looking at it first. `grow` varies tile width for a mosaic feel instead of a uniform grid.
- TMDB API (env var `VITE_TMDB_TOKEN`, baked at build via GitHub Actions secret) fetches Cinema posters; results cached in sessionStorage per session.

## Capabilities and Constraints

- **Mindset** (`/mindset`): 4-column card grid expanding inline below each row. Real essay content for High Agency, Value Driven, Delusional Optimism, Curiosity. Four placeholder cards in row 2. Do not invent new essay text.
- **Projects & Experiences** (`/projects`): four entries — SignalFeed (sentiment AI agent, portrait side carousel), Algo Trading Bot (MNQ trading bot, stacked layout, flagged as still in development/not traded live), Earnings Signal Agent (in progress, no real screenshot yet), P&L Tracker for Rideshare Drivers (in progress — idea-stage description Claude drafted for Anson to rewrite, not sourced from anything he wrote). Real screenshots for SignalFeed and Algo Trading Bot. Do not fabricate project descriptions beyond what exists; the P&L Tracker's prose is an explicit exception flagged as a draft, not evidence of a built thing.
- **Interests** (`/interests`): Hub page → Cinema (`/interests/cinema`) watchlist with TMDB posters, star ratings, CLASSICS ONLY badge. More interest categories to follow. The paper-background body section has a decorative tattoo-flash-style icon scatter behind the content (`src/components/TattooScatter.jsx` — basketball, running shoe (Marathon Training), music notes (Viola/Orchestra), laptop, plane, sailboat, mountain (climbing), hiking boot; hard-edged line art — miter joins, square caps, no rounding — in accent ochre / ink at 0.45–0.55 opacity, `pointer-events: none`). Anson confirmed the concept and asked for more icons/contrast/harder edges in round 2 — treat the current icon set and styling as approved, not a draft.
- **Photo Gallery** (`/gallery`): Real personal travel photos already populated, organized by year. Each photo opens a fullscreen lightbox on click with carousel navigation (prev/next arrows, looping, arrow-key and ESC support, focus trap, focus restoration to the clicked photo on close).
- **Writing posts**: `src/content/writing.js` — `posts = []`, empty. Do not fabricate posts.
- Home (`/`): Editorial hub with hero ("Discovering Anson"), four nav cards of identical size/treatment (Mindset / Projects & Experiences / Interests / Photo Gallery) — no primary/secondary split. WIP banner present.

## Brand Commitments

- Site title / wordmark: "Discovering Anson"
- Hero intro: "Hi, I'm Anson and I am 21. I will be great…" (Anson's own words — do not alter)
- Tagline: "Building the best version of myself." (Anson's own words — do not alter)
- Location: Toronto, Canada / Hong Kong
- Contact: ansonpy.chan@mail.utoronto.ca; LinkedIn (linkedin.com/in/anson-chan-67b155291)

## Evidence on Hand

- Real, populated: gallery photos (including a 2024 case-competition photo — his first case comp, a 1st-place finish), Mindset essays (all four sections), SignalFeed + Algo Trading Bot descriptions and screenshots, Cinema watchlist with ratings, resume PDF, real headshot photo, real employer logos (RBC, Odysseus Capital Asia, PwC).
- Not yet populated (do not fabricate): writing posts, project demo/repo URLs, an Allay LLP logo (no file on hand — ask before adding a fourth logo). The P&L Tracker for Rideshare Drivers project is a Claude-authored draft description Anson intends to rewrite — don't treat its prose as confirmed fact elsewhere in the site.

## Product Principles

1. Show the whole person — professional rigor and personal life belong on equal footing.
2. Never fabricate evidence — empty content stays visibly open until Anson supplies the real thing.
3. Preserve the NatGeo-editorial visual identity as incumbent authority.
4. Toronto and Hong Kong are both real, load-bearing parts of his identity.

## Accessibility & Inclusion

WCAG AA target. Skip link present. `MotionConfig reducedMotion="user"` + CSS `prefers-reduced-motion` fallback. Journey carousel and Mindset cards are fully keyboard navigable. Lightbox has focus trap and focus restoration.
