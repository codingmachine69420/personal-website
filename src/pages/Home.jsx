import { Link } from 'react-router-dom'

// Temporary internet photos. To use your own:
// 1. Put JPGs in public/images/sections/  (aim for ~1920px wide, under 400KB)
// 2. Replace each URL below with e.g. `${import.meta.env.BASE_URL}images/sections/driven.jpg`
// Compress photos at squoosh.app before adding them.
const PHOTOS = {
  driven:
    'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?w=1920&auto=format&q=80',
  curious:
    'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&auto=format&q=80',
  attitude:
    'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=1920&auto=format&q=80',
}

export function Home() {
  return (
    <>
      {/* ─────────────────────────────────────────
          SECTION 1 — DRIVEN
          Layout: text panel LEFT, accent frame RIGHT-OF-CENTER (on top of everything)
          ───────────────────────────────────────── */}
      <section
        className="relative overflow-hidden md:min-h-screen"
        style={{ background: 'var(--color-ink)' }}
      >
        {/* Full-bleed photo */}
        <img
          src={PHOTOS.driven}
          alt="Toronto skyline at dusk — CN Tower lit against a darkening sky"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        {/* Scrim: darkens the photo so text panel text is always readable */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(0,0,0,0.52)' }}
          aria-hidden="true"
        />

        {/* Accent frame — DESKTOP ONLY, sits on top (z-20), off-register to the right */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute hidden md:block"
          style={{
            left: '44%',
            top: '8%',
            width: '50%',
            height: '76%',
            border: '8px solid var(--color-accent)',
            zIndex: 20,
          }}
        />

        {/* Content wrapper — positions panel on the left */}
        <div
          className="relative flex items-center md:min-h-screen"
          style={{ zIndex: 10, padding: 'clamp(40px, 6vw, 80px) clamp(20px, 5vw, 48px)' }}
        >
          {/* Dark text panel */}
          <div style={{ background: 'var(--color-ink)', padding: 'clamp(24px, 4vw, 48px)', maxWidth: 460, width: '100%' }}>
            <span className="accent-rule" aria-hidden="true" />
            <p className="label-caps" style={{ color: 'var(--color-accent)', marginBottom: 16 }}>
              01 — DRIVEN
            </p>
            {/* TODO: Write your headline for this section */}
            <h1
              className="font-editorial"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#fff', marginBottom: 24 }}
            >
              TODO: Your headline here
            </h1>
            {/* TODO: One or two sentences. Max 34 characters wide by design. */}
            <p
              style={{
                color: 'var(--color-body-dark)',
                fontSize: 15,
                lineHeight: 1.65,
                maxWidth: '34ch',
                marginBottom: 32,
              }}
            >
              TODO: Body copy — two sentences max. This narrow column against the big
              headline is the whole effect.
            </p>
            <Link to="/driven" className="cta-link">
              Read More
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          SECTION 2 — CURIOUS
          Layout: accent frame LEFT (tucked BEHIND the panel), text panel RIGHT
          ───────────────────────────────────────── */}
      <section
        className="relative overflow-hidden md:min-h-screen"
        style={{ background: 'var(--color-ink)' }}
      >
        <img
          src={PHOTOS.curious}
          alt="Passport and map — places explored around the world"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(0,0,0,0.50)' }}
          aria-hidden="true"
        />

        {/* Accent frame — DESKTOP ONLY, z-8 (below the text panel at z-10, so it tucks behind) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute hidden md:block"
          style={{
            left: '4%',
            top: '12%',
            width: '47%',
            height: '68%',
            border: '8px solid var(--color-accent)',
            zIndex: 8,
          }}
        />

        {/* Content wrapper — panel pushed to the right */}
        <div
          className="relative flex items-center justify-end md:min-h-screen"
          style={{ zIndex: 10, padding: 'clamp(40px, 6vw, 80px) clamp(20px, 5vw, 48px)' }}
        >
          <div style={{ background: 'var(--color-ink)', padding: 'clamp(24px, 4vw, 48px)', maxWidth: 460, width: '100%' }}>
            <span className="accent-rule" aria-hidden="true" />
            <p className="label-caps" style={{ color: 'var(--color-accent)', marginBottom: 16 }}>
              02 — CURIOUS
            </p>
            {/* TODO: Write your headline for this section */}
            <h2
              className="font-editorial"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#fff', marginBottom: 24 }}
            >
              TODO: Your headline here
            </h2>
            {/* TODO: One or two sentences */}
            <p
              style={{
                color: 'var(--color-body-dark)',
                fontSize: 15,
                lineHeight: 1.65,
                maxWidth: '34ch',
                marginBottom: 32,
              }}
            >
              TODO: Body copy — two sentences max.
            </p>
            <Link to="/curious" className="cta-link">
              Read More
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          SECTION 3 — ATTITUDE
          Light variant: paper background, photo fills left half, content right.
          A dark panel bleeds across the photo/paper boundary at bottom-left.
          ───────────────────────────────────────── */}
      <section
        className="relative overflow-hidden md:min-h-screen"
        style={{ background: 'var(--color-paper)' }}
      >
        {/* LEFT HALF — photo. On mobile: full-width at 50vh in normal flow.
            On desktop: absolute, filling the left half of the section. */}
        <div className="relative h-[50vh] overflow-hidden md:absolute md:bottom-0 md:left-0 md:top-0 md:h-auto md:w-1/2">
          <img
            src={PHOTOS.attitude}
            alt="Hong Kong harbour skyline at night, lights reflecting on the water"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          {/* Light scrim — just enough to stop the photo fighting the dark bottom panel */}
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.18)' }}
            aria-hidden="true"
          />
        </div>

        {/* RIGHT HALF — content. On mobile: in normal flow below photo.
            On desktop: absolute, right half, vertically centered. */}
        <div
          className="relative flex flex-col justify-center md:absolute md:bottom-0 md:right-0 md:top-0 md:w-1/2"
          style={{ zIndex: 10, padding: 'clamp(32px, 5vw, 80px) clamp(20px, 5vw, 64px)' }}
        >
          <p className="label-caps" style={{ color: 'var(--color-body-light)', marginBottom: 20 }}>
            03 — ATTITUDE
          </p>
          {/* TODO: Write your headline */}
          <h2
            className="font-editorial"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'var(--color-ink)', marginBottom: 20 }}
          >
            TODO: Your headline here
          </h2>

          {/* Small black chip with accent text — e.g. a location or sub-label */}
          <div
            style={{
              display: 'inline-block',
              background: '#000',
              padding: '6px 14px',
              marginBottom: 32,
              alignSelf: 'flex-start',
            }}
          >
            {/* TODO: Short tag — e.g. "Hong Kong · Toronto" */}
            <span className="label-caps" style={{ color: 'var(--color-accent)' }}>
              TODO: Short tag
            </span>
          </div>

          {/* Four-label row with hairline dividers */}
          <div
            style={{
              display: 'flex',
              borderTop: '1px solid rgba(28,28,28,0.18)',
              borderBottom: '1px solid rgba(28,28,28,0.18)',
              marginBottom: 40,
            }}
          >
            {/* TODO: Replace these four labels with whatever you want — e.g. Finance · Markets · Travel · Sport */}
            {['TODO 1', 'TODO 2', 'TODO 3', 'TODO 4'].map((label, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  padding: '12px 0',
                  textAlign: 'center',
                  borderLeft: i > 0 ? '1px solid rgba(28,28,28,0.18)' : 'none',
                }}
              >
                <span className="label-caps" style={{ color: 'var(--color-body-light)', fontSize: 11 }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* TODO: Short body paragraph */}
          <p style={{ color: 'var(--color-body-light)', fontSize: 15, lineHeight: 1.65, maxWidth: '34ch' }}>
            TODO: A short paragraph here. Keep it tight — two or three sentences.
          </p>
          <div style={{ marginTop: 32 }}>
            <Link
              to="/attitude"
              className="cta-link"
              style={{ background: '#000', color: 'var(--color-accent)' }}
            >
              Explore
            </Link>
          </div>
        </div>

        {/* Dark panel — crosses the photo/paper boundary at the bottom-left.
            Hidden on mobile (too crowded). */}
        <div
          className="hidden md:block absolute"
          style={{
            bottom: 0,
            left: '28%',
            width: 360,
            background: 'var(--color-ink)',
            padding: '32px 40px',
            zIndex: 20,
          }}
        >
          {/* TODO: A label for this panel — e.g. "Hong Kong" */}
          <p className="label-caps" style={{ color: 'var(--color-accent)', marginBottom: 12 }}>
            TODO: Panel label
          </p>
          {/* TODO: A pull-quote or one-liner statement */}
          <p style={{ color: 'var(--color-body-dark)', fontSize: 15, lineHeight: 1.65, maxWidth: '30ch' }}>
            TODO: A short pull-quote or statement that lives in this panel.
          </p>
        </div>
      </section>
    </>
  )
}
