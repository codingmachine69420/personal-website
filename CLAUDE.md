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
`components.json` sets `cssVariables: false` deliberately — do NOT let a component-add inject shadcn's own `--primary`/`--radius`-style tokens into `src/index.css`; this site's five tokens (accent/ink/paper/body-dark/body-light) are the only palette. **Every pulled component still needs a manual pass before it's used on a page**: re-skin its classes to the site's three-tier type system and color tokens, and don't worry about border-radius specifically — `*, *::before, *::after { border-radius: 0 !important }` in `index.css` already forces hard corners globally, including on anything pulled in. Watermelon's registry resolves end-to-end via the CLI (dry-run confirmed) and its full item index is fetchable at `https://registry.watermelon.sh/r/registry.json` (1067 items — `curl` it and grep rather than guessing names). Motion Primitives' registry has repeatedly returned a Vercel bot-challenge (`X-Vercel-Mitigated: challenge`, not a normal rate limit) on both the CLI and WebFetch — when a Motion Primitives-style effect is wanted, hand-build the documented pattern (see `src/components/TextEffect.jsx`) rather than retrying the fetch.
- `src/components/TextEffect.jsx`: hand-built equivalent of Motion Primitives' real `TextEffect` API — `per` ('word' | 'char'), `as` (rendered tag), `preset` ('fade' | 'slide'), `delay`. Used on Home's hero headline and description paragraph (both hero variants), all with `preset="slide"`. Runs once on mount; inherits `reducedMotion="user"` from `MotionConfig` in `App.jsx` automatically. Extend the `PRESETS` map in the component if another named preset from their docs is wanted — don't hardcode a new one-off animation elsewhere.
- Four Watermelon UI components have been pulled and reskinned onto this site's tokens (all use `framer-motion`, already a dependency — the registry's own `motion`/`lucide-react` deps were dropped, not installed):
  - `src/components/ExpandableProfileCard.jsx` (from `expandable-profile-card`) — the headshot on Projects & Experiences; click morphs it via shared `layoutId` into a split popup showing the resume blurb, employer logos, and Open Resume button. The static resume strip stays exactly as it was — this is a second, additional way in, not a replacement.
  - `src/components/PipelineTable.jsx` — Projects & Experiences' project list, replacing the old stacked-card layout entirely. A biotech-pipeline-style table (Program | stage bar across Idea Generation → Developing → Testing → Live), hand-built since neither registry ships this chart shape — the "+"-to-expand row uses Watermelon's `collapsible`/`expand-details` pattern, but the stage bar (a div spanning `grid-column: 1 / reached+2`) and its cursor-following tooltip on hover are custom: no pulled progress component spans an arbitrary subset of external columns, and no pulled tooltip (Watermelon's `tooltip-*` variants included) tracks the raw cursor instead of anchoring to its trigger element. `stageIndex` per project lives in `content/projects.js`, derived from that project's own status text, not guessed. **Row order is always stage-determined** — Live first, then Testing, then Developing, then Idea Generation last — per Anson's direct instruction (2026-08-15). `PipelineTable` sorts by `stageIndex` descending itself (stable sort, so same-stage projects keep their relative order from `content/projects.js`); the content file's own array order does NOT need to be hand-maintained to match display order.
  - Mindset's card grid (from `expandable-event-card` + `minimal-carousel`) — clicking a card morphs it (shared `layoutId`, not a copy) into a full-screen reader; a "Keep reading" strip inside lets you switch to another essay without closing, animated as a calm crossfade rather than re-triggering the morph each time. Replaced the old inline-expand-below-the-row panel entirely. The reader has **no top cover-photo banner** — an earlier version showed the essay's own photo again as a strip at the top, which just duplicated the same image already inline in the essay text; removed per feedback, don't re-add it, on this or future Mindset popups.
  - Gallery's lightbox nav (from `carousel-navigator`) — the old floating side arrows are gone; navigation is now a bottom pill bar (prev/next + a windowed dot indicator, max 7 dots centered on the current photo — a full row of 31 wouldn't fit or read as useful). Per-slide color themes and the autoplay progress-fill from the original were dropped; this is a user-controlled lightbox, not an autoplaying carousel.
  - `src/components/LabeledProgressIndicator.jsx` (from `labeled-progress-indicator`) — Interests page's "watched X of Y" stat, now a cycling label over an animated accent-fill bar with a shimmer sweep. The two cycling labels are real derived values (watched count / remaining count), not invented copy.

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
A single hero (status banner + "Discovering Anson" headline + the Santorini jump photo, faded into the black background) sits above one uniform 4-card nav grid — Mindset, Projects & Experiences, Interests, Photo Gallery, all four cards the same size and treatment (no primary/secondary split). The status banner reads "Constantly Updated!" (⟳ icon) — was "Work in Progress" (⚠) until Anson asked for it to read as ongoing/positive rather than unfinished/a warning.
Desktop and mobile hero each have their own variant (`hidden md:flex` / `md:hidden`); the nav grid is shared across breakpoints.
`ParallaxPhoto` component is in `src/components/ParallaxPhoto.jsx` — has no entrance motion, deliberately (see Component registries section above for why).
Hero headline uses `TextEffect` for a word reveal, the accent rule above it draws in via `scaleX`, and the nav cards fade up staggered on scroll into view — all framer-motion, all one-time, all inherit `reducedMotion="user"`.

**Dead code — deleted 2026-08-09:** the earlier three-hero-section landing design (`src/components/HomeSectionDriven.jsx`, `HomeSectionCurious.jsx`, `HomeSectionAttitude.jsx`, `HomeSectionJourneys.jsx`, `src/utils/homeAnimations.js`) and a wider cluster of unrouted page components discovered by an `/impeccable audit` (`src/pages/Attitude.jsx`, `Curious.jsx`, `Driven.jsx`, `Work.jsx`, `Writing.jsx`, `Projects.jsx`, `src/components/EditorialPage.jsx`, and their now-orphaned `src/content/attitude.js` / `curious.js` / `driven.js` / `work.js`) were removed outright, not left as reference. `src/App.jsx`'s `<Navigate>` redirects for `/driven`, `/curious`, `/attitude`, `/writing`, `/work` never imported these files, so the redirects are unaffected. If old-design reference is ever needed again, it's in git history, not the working tree.

## Photos
All photos live in `public/images/gallery/`. In JSX, prefix with `import.meta.env.BASE_URL`. In CSS `url()`, no prefix needed.
The landing page hero photo is a single `jumpPhoto` const in `Home.jsx`. Other pages reference photos from their own `content/*.js` file (`content/gallery.js`, `content/projects.js`).

## Content rules
- `src/content/*.js` holds real personal content — **never fabricate** text for Projects, Writing, or Mindset blocks. Leave placeholders or ask Anson for real content, unless Anson explicitly asks for a draft he intends to rewrite himself — flag those clearly in the content file and in PRODUCT.md's Evidence on Hand (see the P&L Tracker project for the pattern).
- Project descriptions are written in **first person** ("I want", "I believe", "I built") per Anson's direct instruction — not third person ("Anson believes..."). All seven entries in `src/content/projects.js` are now first person; SignalFeed, Algo Trading Bot, and Earnings Signal Agent were converted on 2026-08-15 (pronoun/voice only, content unchanged, per Anson's explicit go-ahead).
- `src/content/projects.js` — SignalFeed, Algo Trading Bot, AI Newsletter, and Daily Gap Ups are real, live projects (Algo Trading Bot is backtested only, not traded live — see its `status`; AI Newsletter and Daily Gap Ups are both live scheduled agents that email Anson automated reports — a daily AI intelligence brief and a pre-market gap report respectively — per his direct instruction on 2026-08-15). Both have real screenshots of the actual emails they send (`AI Newsleter.png` — note the filename typo, referenced as-is, not renamed — and `Gap Ups.png`). Earnings Signal Agent, P&L Tracker for Rideshare Drivers, and Compersion and Solace are all pre-build/idea stage or Developing. The P&L Tracker's and Compersion and Solace's descriptions are Claude-authored drafts awaiting Anson's rewrite — flagged inline in the file. Each entry's `stageIndex`/`pipelineSummary` feed `PipelineTable.jsx` (see Component registries above).
- `src/content/writing.js` — empty, no posts yet.

## Collaboration preference
Explain what you're changing and why as you go — Anson is building mental models of this stack.
