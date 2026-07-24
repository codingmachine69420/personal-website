import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

// ─────────────────────────────────────────────────────────────────
// ParallaxPhoto — fills its positioned parent completely.
// The inner image is 124% tall (12% bleed each side). Framer Motion
// maps scroll progress to a small translateY, creating depth without
// a manual event listener.  Ken Burns (slow zoom) runs on the img
// via CSS @keyframes so the two transforms compose cleanly.
// ─────────────────────────────────────────────────────────────────
function ParallaxPhoto({ src, alt, loading = 'lazy', strength = 9 }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const s = reduced ? 0 : strength
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${s}%`, `${s}%`])

  return (
    <div ref={ref} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <motion.div style={{ y, position: 'absolute', top: `-${s}%`, left: 0, width: '100%', height: `${100 + s * 2}%` }}>
        <img
          src={src}
          alt={alt}
          loading={loading}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            animation: reduced ? 'none' : 'ken-burns 22s ease-in-out infinite alternate',
          }}
        />
      </motion.div>
    </div>
  )
}

// Shared easing for all reveals
const EASE = [0.16, 1, 0.3, 1]

// Reusable reveal variants
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.75, ease: EASE } },
}
const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}
const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show:   { opacity: 1, scale: 1,  transition: { duration: 0.85, ease: EASE } },
}

// ─────────────────────────────────────────────────────────────────
// Photos — swap these for your own once you have them.
// ─────────────────────────────────────────────────────────────────
const P = {
  city:   'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?w=1920&auto=format&q=80',
  forest: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&auto=format&q=80',
  travel: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&auto=format&q=80',
  hk:     'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=1920&auto=format&q=80',
  night:  'https://images.unsplash.com/photo-1519923834699-ef0b7eeef0c1?w=1200&auto=format&q=80',
}

const G = 20 // black gutter between sections (px)

export function Home() {
  return (
    <div style={{ background: '#000' }}>

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — Two-photo hero  (desktop)
          Left 46%  city photo,  inset 48px top+bottom
          Right 55% forest photo, full height
          14px outline frame straddles the column seam
          Solid text panel lower-left, 60px offset from edges
          ══════════════════════════════════════════════════════ */}
      <section
        className="relative hidden md:block"
        style={{ height: '100vh', minHeight: 640, marginBottom: G }}
      >
        {/* Left photo — inset so black shows above/below (museum wall) */}
        <div style={{ position: 'absolute', top: 48, bottom: 48, left: 0, width: '46%' }}>
          <ParallaxPhoto src={P.city} alt="Toronto skyline at dusk" loading="eager" strength={7} />
        </div>

        {/* Right photo — full section height for contrast */}
        <div style={{ position: 'absolute', inset: 0, left: '45%' }}>
          <ParallaxPhoto src={P.forest} alt="Forest path through tall pines" loading="eager" strength={10} />
        </div>

        {/* Outline frame — appears to straddle the seam.
            Fades + scales in on load (section is above fold). */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none"
          variants={scaleIn}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.35 }}
          style={{
            position: 'absolute',
            top: '8%', left: '42%', right: '6%', bottom: '8%',
            border: '14px solid var(--color-accent)',
            zIndex: 4,
          }}
        />

        {/* Solid text panel — fades up on load */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.55 }}
          style={{
            position: 'absolute',
            bottom: 80, left: 60,
            width: 'min(360px, 36%)',
            background: 'rgba(0,0,0,0.84)',
            padding: '28px 32px 32px',
            zIndex: 6,
          }}
        >
          <div style={{ width: 44, height: 4, background: 'var(--color-accent)', marginBottom: 16 }} aria-hidden="true" />
          <p className="label-caps" style={{ color: 'var(--color-body-dark)', marginBottom: 10 }}>01 — Driven</p>
          <h1 className="font-editorial" style={{ fontSize: 'clamp(2.25rem, 3.5vw, 3.5rem)', color: '#fff', marginBottom: 14, fontWeight: 900 }}>
            {/* TODO: your headline */}
            Built to Win.
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, lineHeight: 1.8, maxWidth: '32ch', marginBottom: 24 }}>
            {/* TODO: 1–2 sentences */}
            Finance and markets by conviction. Two cities, one direction — always forward.
          </p>
          <Link to="/driven" className="cta-link">Read More</Link>
        </motion.div>
      </section>

      {/* Section 1 mobile */}
      <section className="md:hidden relative" style={{ height: '80vh', minHeight: 480, marginBottom: G }}>
        <ParallaxPhoto src={P.city} alt="Toronto skyline at dusk" loading="eager" strength={6} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, transparent 60%)' }} aria-hidden="true" />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 24px 40px', zIndex: 4 }}>
          <div style={{ width: 36, height: 3, background: 'var(--color-accent)', marginBottom: 12 }} />
          <h1 className="font-editorial" style={{ fontSize: '2.75rem', color: '#fff', marginBottom: 16, fontWeight: 900 }}>Built to Win.</h1>
          <Link to="/driven" className="cta-link">Read More</Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — Reversed  (frame LEFT, two-tone panel RIGHT)
          Single photo, inset 40px top+bottom.
          Frame spans full section height — top/bottom bars dissolve
          into the black space above/below the photo inset.
          Two-tone panel slides in from the right as section enters view.
          ══════════════════════════════════════════════════════ */}
      <section
        className="relative hidden md:block"
        style={{ height: '88vh', minHeight: 580, marginBottom: G }}
      >
        <div style={{ position: 'absolute', top: 40, bottom: 40, left: 0, right: 0 }}>
          <ParallaxPhoto src={P.travel} alt="World travel — passport and maps" strength={8} />
        </div>

        {/* Frame — portrait, full section height, whileInView scales in */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none"
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          style={{
            position: 'absolute',
            top: 0, bottom: 0, left: '7%',
            width: '38%',
            border: '14px solid var(--color-accent)',
            zIndex: 5,
          }}
        />

        {/* Two-tone panel — slides up + fades as section enters */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.18 }}
          style={{
            position: 'absolute',
            top: '16%', left: '44%',
            width: 'min(300px, 28%)',
            zIndex: 7,
          }}
        >
          <div style={{ background: 'rgba(10,10,10,0.93)', padding: '24px 28px 18px' }}>
            <p className="label-caps" style={{ color: 'var(--color-accent)', marginBottom: 10 }}>02 — Curious</p>
            <h2 className="font-editorial" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', color: '#fff', fontWeight: 900 }}>
              {/* TODO: your headline */}
              Always Somewhere New.
            </h2>
          </div>
          <div style={{ background: 'rgba(32,32,32,0.9)', padding: '18px 28px 24px' }}>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, lineHeight: 1.8, maxWidth: '28ch', marginBottom: 20 }}>
              {/* TODO: 1–2 sentences */}
              From Athens to Seoul — curiosity as a way of living, not just a personality trait.
            </p>
            <Link to="/curious" className="cta-link">Explore</Link>
          </div>
        </motion.div>
      </section>

      {/* Section 2 mobile */}
      <section className="md:hidden relative" style={{ height: '75vh', minHeight: 420, marginBottom: G }}>
        <ParallaxPhoto src={P.travel} alt="World travel" strength={7} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, transparent 60%)' }} aria-hidden="true" />
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 20, width: 4, background: 'var(--color-accent)', zIndex: 4 }} aria-hidden="true" />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 24px 40px', zIndex: 4 }}>
          <h2 className="font-editorial" style={{ fontSize: '2.75rem', color: '#fff', marginBottom: 16, fontWeight: 900 }}>Always Somewhere New.</h2>
          <Link to="/curious" className="cta-link">Explore</Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — Split: photo column left (58%) + info card right (42%)
          Left: two stacked photos. Text panel bridges the seam between them.
          Right: paper info card — location, tag, 4 tabs, copy, map bar.
          ══════════════════════════════════════════════════════ */}
      <section
        className="relative hidden md:flex"
        style={{ minHeight: '85vh', height: '85vh' }}
      >
        {/* Left: stacked photos */}
        <div style={{ flex: '0 0 58%', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '55%' }}>
            <ParallaxPhoto src={P.hk} alt="Hong Kong harbour at night" strength={6} />
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%' }}>
            <ParallaxPhoto src={P.night} alt="City lights at night" strength={8} />
          </div>

          {/* Bridging text panel — centred on the seam, overlaps both photos */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            style={{
              position: 'absolute',
              top: '55%', left: 44,
              width: 'min(300px, 52%)',
              transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.88)',
              padding: '24px 28px',
              zIndex: 10,
            }}
          >
            <div style={{ width: 36, height: 3, background: 'var(--color-accent)', marginBottom: 14 }} aria-hidden="true" />
            <p className="label-caps" style={{ color: 'var(--color-accent)', marginBottom: 8 }}>03 — Attitude</p>
            <h2 className="font-editorial" style={{ fontSize: 'clamp(1.6rem, 2.2vw, 2.25rem)', color: '#fff', marginBottom: 12, fontWeight: 900 }}>
              {/* TODO: your headline */}
              Perspective Is Everything.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, lineHeight: 1.75, maxWidth: '28ch', marginBottom: 18 }}>
              How you see the room matters more than the room itself.
            </p>
            <Link to="/attitude" className="cta-link">Discover</Link>
          </motion.div>
        </div>

        {/* Right: light info card */}
        <motion.div
          variants={{ hidden: { opacity: 0, x: 32 }, show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          style={{
            flex: '0 0 42%',
            background: 'var(--color-paper)',
            padding: '48px 40px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <p className="label-caps" style={{ color: 'var(--color-body-light)', marginBottom: 10 }}>Where I'm From</p>
          <h2 className="font-editorial" style={{ fontSize: 'clamp(2rem, 3.2vw, 3.2rem)', color: 'var(--color-ink)', marginBottom: 10, fontWeight: 900 }}>
            HK · Toronto
          </h2>
          <div style={{ alignSelf: 'flex-start', background: 'var(--color-accent)', padding: '4px 12px', marginBottom: 24 }}>
            <span className="label-caps" style={{ fontSize: 10, color: '#000' }}>Finance + Markets</span>
          </div>

          <div style={{ display: 'flex', borderTop: '1px solid rgba(28,28,28,0.15)', borderBottom: '1px solid rgba(28,28,28,0.15)', marginBottom: 28 }}>
            {['Finance', 'Travel', 'Markets', 'Photos'].map((tab, i) => (
              <div key={tab} style={{ flex: 1, padding: '12px 0', textAlign: 'center', borderLeft: i > 0 ? '1px solid rgba(28,28,28,0.15)' : 'none' }}>
                <span className="label-caps" style={{ fontSize: 10, color: 'var(--color-body-light)' }}>{tab}</span>
              </div>
            ))}
          </div>

          <p className="label-caps" style={{ color: 'var(--color-ink)', marginBottom: 8, fontSize: 10 }}>Background</p>
          <p style={{ color: 'var(--color-body-light)', fontSize: 14, lineHeight: 1.8, marginBottom: 28 }}>
            {/* TODO: your background copy */}
            UofT Finance. Raised in Hong Kong, building in Toronto. Two cities, one perspective on how capital moves through the world.
          </p>

          <div style={{ flex: 1, background: 'var(--color-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 120 }}>
            <span className="label-caps" style={{ color: 'var(--color-body-dark)', fontSize: 10, letterSpacing: '0.2em' }}>
              HK ←——————————→ YYZ
            </span>
          </div>
        </motion.div>
      </section>

      {/* Section 3 mobile */}
      <section className="md:hidden" style={{ background: 'var(--color-ink)' }}>
        <div style={{ position: 'relative', height: '65vh', overflow: 'hidden' }}>
          <img src={P.hk} alt="Hong Kong harbour at night" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, transparent 55%)' }} aria-hidden="true" />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 24px 40px' }}>
            <div style={{ width: 36, height: 3, background: 'var(--color-accent)', marginBottom: 12 }} />
            <h2 className="font-editorial" style={{ fontSize: '2.75rem', color: '#fff', marginBottom: 16, fontWeight: 900 }}>Perspective Is Everything.</h2>
            <Link to="/attitude" className="cta-link">Discover</Link>
          </div>
        </div>
        <div style={{ padding: '36px 24px 48px' }}>
          <p style={{ color: 'var(--color-body-dark)', fontSize: 14, lineHeight: 1.8, marginBottom: 28 }}>
            UofT Finance. Raised in Hong Kong, building in Toronto.
          </p>
          <Link to="/attitude" className="cta-link">Discover</Link>
        </div>
      </section>

    </div>
  )
}
