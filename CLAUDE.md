# Personal Website — Claude Code Instructions

## Stack
Vite + React 19 + Tailwind CSS v4 (CSS-first `@theme {}`) + React Router v7 + Framer Motion 12.
GitHub Pages deploy: `base: '/personal-website/'` → all local assets prefixed with `import.meta.env.BASE_URL`.
`MotionConfig reducedMotion="user"` wraps all routes in `App.jsx` — Framer Motion respects OS motion preference automatically.

## Component registries (Motion Primitives / Watermelon UI)
`components.json` wires up the shadcn CLI against two copy-in registries, so any single component from either can be pulled with one command instead of hand-copying:
- `npx shadcn@latest add @motion-primitives/<name>` — [motion-primitives.com](https://motion-primitives.com), animated components built on Framer Motion + Tailwind.
- `npx shadcn@latest add @watermelon/<name>` — [ui.watermelon.sh](https://ui.watermelon.sh), Radix-based components (buttons, inputs, dashboards) built on Tailwind + Radix UI.
Supporting plumbing: `@/*` path alias → `src/*` (`vite.config.js`, `jsconfig.json`), `src/lib/utils.js` exports `cn()` (clsx + tailwind-merge) that pulled components expect at `@/lib/utils`.
`components.json` sets `cssVariables: false` deliberately — do NOT let a component-add inject shadcn's own `--primary`/`--radius`-style tokens into `src/index.css`; this site's five tokens (accent/ink/paper/body-dark/body-light) are the only palette. **Every pulled component still needs a manual pass before it's used on a page**: re-skin its classes to the site's three-tier type system and color tokens, and don't worry about border-radius specifically — `*, *::before, *::after { border-radius: 0 !important }` in `index.css` already forces hard corners globally, including on anything pulled in. Nothing has been pulled into an actual page yet — the registries are wired up and dry-run verified (Watermelon resolved end-to-end; Motion Primitives' registry 429'd under repeated test hits but resolved the correct URL), not yet used for real UI.

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
- Landing page background: `#000`. The hero and the nav-card grid both sit on this.

## Landing page structure (`src/pages/Home.jsx`)
A single hero (WIP banner + "Discovering Anson" headline + the Santorini jump photo, faded into the black background) sits above one uniform 4-card nav grid — Mindset, Projects & Experiences, Interests, Photo Gallery, all four cards the same size and treatment (no primary/secondary split).
Desktop and mobile hero each have their own variant (`hidden md:flex` / `md:hidden`); the nav grid is shared across breakpoints.
`ParallaxPhoto` component is in `src/components/ParallaxPhoto.jsx`.

**Dead code, not wired up:** `src/components/HomeSectionDriven.jsx`, `HomeSectionCurious.jsx`, `HomeSectionAttitude.jsx`, `HomeSectionJourneys.jsx`, and `src/utils/homeAnimations.js` are leftover from an earlier landing-page design (three hero sections). `Home.jsx` no longer imports any of them. Don't resurrect them or treat them as current architecture without checking with Anson first — they're candidates for deletion, not reference.

## Photos
All photos live in `public/images/gallery/`. In JSX, prefix with `import.meta.env.BASE_URL`. In CSS `url()`, no prefix needed.
The landing page hero photo is a single `jumpPhoto` const in `Home.jsx`. Other pages reference photos from their own `content/*.js` file (`content/gallery.js`, `content/projects.js`).

## Content rules
- `src/content/*.js` holds real personal content — **never fabricate** text for Projects, Writing, or Mindset blocks. Leave placeholders or ask Anson for real content, unless Anson explicitly asks for a draft he intends to rewrite himself — flag those clearly in the content file and in PRODUCT.md's Evidence on Hand (see the P&L Tracker project for the pattern).
- `src/content/projects.js` — SignalFeed and Algo Trading Bot are real, live projects with real screenshots. Earnings Signal Agent and P&L Tracker for Rideshare Drivers are in progress; the P&L Tracker's description is a Claude-authored draft awaiting Anson's rewrite.
- `src/content/writing.js` — empty, no posts yet.

## Collaboration preference
Explain what you're changing and why as you go — Anson is building mental models of this stack.
