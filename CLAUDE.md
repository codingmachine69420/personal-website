# Personal Website — Claude Code Instructions

## Stack
Vite + React 19 + Tailwind CSS v4 (CSS-first `@theme {}`) + React Router v7 + Framer Motion 12.
GitHub Pages deploy: `base: '/personal-website/'` → all local assets prefixed with `import.meta.env.BASE_URL`.
`MotionConfig reducedMotion="user"` wraps all routes in `App.jsx` — Framer Motion respects OS motion preference automatically.

## Design tokens
- `--color-accent: #D9A21B` — ochre; frames, rules, CTA buttons
- `--color-ink: #1C1C1C` — near-black for dark panels
- `--color-paper: #F4F2ED` — warm off-white for light content areas
- `--color-body-dark: #B8B8B8` — muted text on dark backgrounds
- `--color-body-light: #4A4A4A` — muted text on light backgrounds

## Typography — three-tier, never deviate
- **Display** — `var(--font-display)` = Barlow Condensed, **always uppercase**, weight 700. Class: `.font-editorial`
- **Reading** — `var(--font-reading)` = Source Serif 4, weight 400. Body copy only.
- **Metadata** — `var(--font-meta)` = Barlow, weight 500/600. Nav, labels, buttons. Classes: `.label-caps`, `.cta-link`
- **Never use Inter.** Hard rule.
- Min font-size: `0.75rem` (12px). Nothing below that — accessibility floor.
- Source Serif 4 weight 600 is loaded but reserved for future long-form writing.

## Visual rules
- **No border-radius anywhere.** Hard corners are intentional — NatGeo editorial aesthetic.
- Accent frames: `border: Npx solid var(--color-accent)` (not `outline`, except the Curious jump inset which uses `outline`).
- Section gutter between landing page panels: `marginBottom: 20` (defined as `G = 20` in `Home.jsx`).
- Landing page background: `#000`. All three hero sections sit on this.

## Landing page structure (`src/pages/Home.jsx` assembles three section components)
1. **Driven** (`HomeSectionDriven`) — HK hiking (left 55%) + Santorini sunset (right 45%) + burst-through ochre frame + text panel bottom-left
2. **Curious** (`HomeSectionCurious`) — Parthenon full-bleed + left portrait frame + two-tone text panel + jump photo inset top-right
3. **Attitude** (`HomeSectionAttitude`) — Stacked HK night (top 55%) + Toronto (bottom 45%) on left; paper info card on right; bridging text panel centred on photo seam

Each section has a desktop variant (`hidden md:block`) and a mobile variant (`md:hidden`).
Shared animation variants live in `src/utils/homeAnimations.js`.
`ParallaxPhoto` component is in `src/components/ParallaxPhoto.jsx`.

## Photos
All photos live in `public/images/gallery/`. In JSX, prefix with `import.meta.env.BASE_URL`. In CSS `url()`, no prefix needed.
Landing page photos are referenced via the `P` object in `Home.jsx`.

## Content rules
- `src/content/*.js` holds real personal content — **never fabricate** text for Projects, Writing, Driven/Curious/Attitude blocks. Leave placeholders or ask Anson for real content.
- `src/content/projects.js` — all TODO, no real projects yet.
- `src/content/writing.js` — empty, no posts yet.

## Collaboration preference
Explain what you're changing and why as you go — Anson is building mental models of this stack.
