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
- Resume linked as static PDF (`/resume.pdf`) — prominent strip on Projects & Experiences page.
- TMDB API (env var `VITE_TMDB_TOKEN`, baked at build via GitHub Actions secret) fetches Cinema posters; results cached in sessionStorage per session.

## Capabilities and Constraints

- **Mindset** (`/mindset`): 4-column card grid expanding inline below each row. Real essay content for High Agency, Value Driven, Delusional Optimism, Curiosity. Four placeholder cards in row 2. Do not invent new essay text.
- **Projects & Experiences** (`/projects`): SignalFeed (sentiment AI agent, portrait side carousel), Bobby (MNQ trading bot, stacked layout), Work in Progress. Real screenshots for SignalFeed only. Do not fabricate project descriptions beyond what exists.
- **Interests** (`/interests`): Hub page → Cinema (`/interests/cinema`) watchlist with TMDB posters, star ratings, CLASSICS ONLY badge. More interest categories to follow.
- **Photo Gallery** (`/gallery`): Real personal travel photos already populated.
- **Writing posts**: `src/content/writing.js` — `posts = []`, empty. Do not fabricate posts.
- Home (`/`): Editorial hub with hero ("Discovering Anson"), two primary nav cards (Mindset / Projects & Experiences), two secondary links (Interests / Photo Gallery). WIP banner present.

## Brand Commitments

- Site title / wordmark: "Discovering Anson"
- Hero intro: "Hi, I'm Anson and I am 21. I will be great…" (Anson's own words — do not alter)
- Location: Toronto, Canada / Hong Kong
- Contact: ansonpy.chan@mail.utoronto.ca; LinkedIn (linkedin.com/in/anson-chan-67b155291)

## Evidence on Hand

- Real, populated: gallery photos, Mindset essays (all four sections), SignalFeed + Bobby project descriptions, Cinema watchlist with ratings, resume PDF.
- Not yet populated (do not fabricate): Bobby screenshots (placeholder-2.svg), WIP project, writing posts, project demo/repo URLs.

## Product Principles

1. Show the whole person — professional rigor and personal life belong on equal footing.
2. Never fabricate evidence — empty content stays visibly open until Anson supplies the real thing.
3. Preserve the NatGeo-editorial visual identity as incumbent authority.
4. Toronto and Hong Kong are both real, load-bearing parts of his identity.

## Accessibility & Inclusion

WCAG AA target. Skip link present. `MotionConfig reducedMotion="user"` + CSS `prefers-reduced-motion` fallback. Journey carousel and Mindset cards are fully keyboard navigable. Lightbox has focus trap and focus restoration.
