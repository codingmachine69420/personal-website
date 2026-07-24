# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primarily the site owner, Anson Chan — a self-directed space he controls to document and present himself. Finance recruiters, employers, classmates, competition judges, and general professional/personal network are real visitors and will size him up during hiring or general acquaintance, but the site is not narrowly optimized for a hiring funnel; it doubles as personal expression.

## Product Purpose

A personal site for Anson Chan, a BBA Co-Op Specialist in Finance student at the University of Toronto (2023–2027), based between Toronto and Hong Kong. It presents a fuller person than a resume or LinkedIn profile can: professional record (Work & Experience) alongside writing, personal projects, a photo gallery, and personality-driven interest pages (Driven / Curious / Attitude). Success is a visitor coming away with a rounded impression of who he is, not just what he's done.

## Positioning

The differentiator is breadth and personhood, not a narrower professional claim: the site pairs a legitimate finance/markets track record with builder projects, travel/photography, and personal reflection (Driven/Curious/Attitude), presented as one coherent person rather than a segmented resume.

## Operating Context

- Multi-page React site (React Router) with sections: Home, Work, Writing (+ post pages), Projects, Gallery, Interests (with Driven/Curious/Attitude sub-pages).
- Visual identity is a NatGeo-editorial magazine aesthetic: museum-wall photo layouts with black gutters, ochre accent frames (`--color-accent: #D9A21B`), Big Shoulders Display headlines, Cormorant Garamond wordmark, Space Mono labels, DM Sans body copy, Framer Motion parallax/Ken Burns on hero photos, and scroll-triggered reveals — already implemented in tokens, nav, landing sections, and a gallery masonry layout. This is incumbent visual authority, not something init overrides.
- Gallery is organized by year (2019–2026) with real personal travel/life photos already populated.
- Resume is linked as a static PDF (`/resume.pdf`).

## Capabilities and Constraints

- Work & Experience content (roles, education, leadership, competitions) is real and populated from his actual resume.
- Projects page is currently placeholder TODOs (no real project descriptions, stack, links, or images yet) — **future work must not invent projects**; leave placeholders or ask for real content rather than fabricating.
- Writing section has no posts yet (`posts = []`) — an empty state, not missing evidence to fabricate.
- Interests directory (Driven/Curious/Attitude) has empty blurbs and empty content blocks on all three sub-pages — **future work must not invent personal narrative, achievements, or anecdotes for these**; they are open until Anson supplies real text.
- Interest page hero photos are currently Unsplash stock placeholders, not his own images.

## Brand Commitments

- Site title: "Anson's World."
- Tagline: "Finance & markets by day, builder by night."
- Location line: "Toronto, Canada / Hong Kong."
- Contact: ansonpy.chan@mail.utoronto.ca; LinkedIn (linkedin.com/in/anson-chan-67b155291).

## Evidence on Hand

- Real, populated: work experience, education, leadership roles, competition results (`src/content/work.js`); gallery photos by year 2019–2026 (`src/content/gallery.js`).
- Not yet populated (do not fabricate): Projects (`src/content/projects.js` — all TODO), Writing posts (`src/content/writing.js` — empty), Interests blurbs (`src/content/interests.js`), and Driven/Curious/Attitude page content blocks (`src/content/driven.js`, `curious.js`, `attitude.js` — all empty).

## Product Principles

1. Show the whole person — professional rigor and personal life belong on equal footing, not siloed into a narrow pitch.
2. Never fabricate evidence — empty projects, writing, and interest content stay visibly open until Anson supplies the real thing.
3. Preserve the existing NatGeo-editorial visual identity (museum-wall layouts, ochre frames, Big Shoulders Display/Cormorant Garamond/Space Mono typography, Framer Motion parallax) as incumbent authority; treat it as evidence, not something to casually override.
4. Toronto and Hong Kong are both real, load-bearing parts of his identity, not decorative flavor.

## Accessibility & Inclusion

No product-specific accessibility requirement has been established beyond standard web accessibility practice.
