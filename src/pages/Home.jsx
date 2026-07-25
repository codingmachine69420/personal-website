import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

const BASE = import.meta.env.BASE_URL

// ParallaxPhoto — fills its positioned parent. Inner img is oversized for
// Framer Motion translateY parallax. Ken Burns runs via CSS on the img.
// pos controls objectPosition so key subjects align with frame elements.
function ParallaxPhoto({ src, alt, loading = 'lazy', strength = 9, pos = 'center center' }) {
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
            objectPosition: pos,
            display: 'block',
            animation: reduced ? 'none' : 'ken-burns 22s ease-in-out infinite alternate',
          }}
        />
      </motion.div>
    </div>
  )
}

const EASE = [0.16, 1, 0.3, 1]
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

const P = {
  hike:      `${BASE}images/gallery/Landing Page  (1).jpeg`,
  toronto:   `${BASE}images/gallery/Landing Page  (3).jpeg`,
  parthenon: `${BASE}images/gallery/Landing Page  (5).jpeg`,
  jump:      `${BASE}images/gallery/Landing Page  (6).jpeg`,
  sunset:    `${BASE}images/gallery/Landing Page  (7).jpeg`,
  hkNight:   `${BASE}images/gallery/Landing Page  (10).jpeg`,
}

const G = 20

export function Home() {
  return (
    <div style={{ background: '#000' }}>

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — Two-photo hero + "burst through" frame
          Left 55%: Anson hiking HK. Small frame centered on his
          figure — arms/body extend past all frame edges (NatGeo
          illusion: frame is smaller than subject area).
          Right 45%: Santorini sunset — large frame on right half.
          ══════════════════════════════════════════════════════ */}
      <section
        className="relative hidden md:block"
        style={{ height: '100vh', minHeight: 640, marginBottom: G }}
      >
        {/* Left: Anson hiking — objectPosition shifts view down so
            his raised arms appear near the frame's top edge */}
        <div style={{ position: 'absolute', top: 48, bottom: 48, left: 0, width: '55%' }}>
          <ParallaxPhoto
            src={P.hike}
            alt="Hiking in Hong Kong — arms raised over a green coastal bay"
            loading="eager"
            strength={7}
            pos="center 60%"
          />
        </div>

        {/* Right: Santorini orange sunset */}
        <div style={{ position: 'absolute', inset: 0, left: '54%' }}>
          <ParallaxPhoto
            src={P.sunset}
            alt="Sunset over the Santorini caldera — sailboat silhouetted against an orange sky"
            loading="eager"
            strength={10}
            pos="center center"
          />
        </div>

        {/* Small burst-through frame — the frame is smaller than the
            photo area, so Anson's figure breaks past the top, bottom,
            and sides. Pure CSS optical illusion — no compositing. */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none"
          variants={scaleIn}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.2 }}
          style={{
            position: 'absolute',
            top: '15%', left: '8%',
            width: '28%', bottom: '32%',
            border: '10px solid var(--color-accent)',
            zIndex: 3,
          }}
        />

        {/* Large frame on right half (sunset photo) */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none"
          variants={scaleIn}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.35 }}
          style={{
            position: 'absolute',
            top: '8%', left: '52%', right: '4%', bottom: '8%',
            border: '14px solid var(--color-accent)',
            zIndex: 4,
          }}
        />

        {/* Text panel — Driven */}
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
        <ParallaxPhoto src={P.hike} alt="Hiking in Hong Kong" loading="eager" strength={6} pos="center 60%" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, transparent 60%)' }} aria-hidden="true" />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 24px 40px', zIndex: 4 }}>
          <div style={{ width: 36, height: 3, background: 'var(--color-accent)', marginBottom: 12 }} />
          <h1 className="font-editorial" style={{ fontSize: '2.75rem', color: '#fff', marginBottom: 16, fontWeight: 900 }}>Built to Win.</h1>
          <Link to="/driven" className="cta-link">Read More</Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — Parthenon background + overlapping jump inset
          Full-bleed Parthenon. Left portrait frame. Two-tone panel.
          Jump photo floats top-right as an editorial inset — overlaps
          the section to break the grid.
          ══════════════════════════════════════════════════════ */}
      <section
        className="relative hidden md:block"
        style={{ height: '88vh', minHeight: 580, marginBottom: G }}
      >
        <div style={{ position: 'absolute', top: 40, bottom: 40, left: 0, right: 0 }}>
          <ParallaxPhoto
            src={P.parthenon}
            alt="Parthenon at the Acropolis, Athens — framed by olive tree branches above"
            strength={8}
            pos="center 40%"
          />
        </div>

        {/* Left portrait frame */}
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

        {/* Two-tone panel — Curious */}
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

        {/* Jump inset — overlaps top-right, breaks the layout grid.
            Outlined in accent, fades/scales in slightly after the panel. */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.38 }}
          style={{
            position: 'absolute',
            top: 40, right: '5%',
            width: '22%', height: '48%',
            overflow: 'hidden',
            zIndex: 9,
            outline: '3px solid var(--color-accent)',
          }}
        >
          <img
            src={P.jump}
            alt="Jumping off a sailboat into the Santorini caldera"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%', display: 'block' }}
            loading="lazy"
          />
        </motion.div>
      </section>

      {/* Section 2 mobile */}
      <section className="md:hidden relative" style={{ height: '75vh', minHeight: 420, marginBottom: G }}>
        <ParallaxPhoto src={P.parthenon} alt="Parthenon, Athens" strength={7} pos="center 40%" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, transparent 60%)' }} aria-hidden="true" />
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 20, width: 4, background: 'var(--color-accent)', zIndex: 4 }} aria-hidden="true" />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 24px 40px', zIndex: 4 }}>
          <h2 className="font-editorial" style={{ fontSize: '2.75rem', color: '#fff', marginBottom: 16, fontWeight: 900 }}>Always Somewhere New.</h2>
          <Link to="/curious" className="cta-link">Explore</Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — Split: stacked photos left + info card right
          Top: HK Victoria Harbour at night
          Bottom: Toronto Island bench, CN Tower
          Bridging text panel sits exactly on the photo seam.
          Right: Paper info card — the HK↔Toronto identity.
          ══════════════════════════════════════════════════════ */}
      <section
        className="relative hidden md:flex"
        style={{ minHeight: '85vh', height: '85vh' }}
      >
        <div style={{ flex: '0 0 58%', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '55%' }}>
            <ParallaxPhoto
              src={P.hkNight}
              alt="Hong Kong Victoria Harbour at night — city lights reflected in choppy water"
              strength={6}
              pos="center 40%"
            />
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%' }}>
            <ParallaxPhoto
              src={P.toronto}
              alt="Looking out at the Toronto skyline from Toronto Island — CN Tower reflected in still water"
              strength={8}
              pos="center center"
            />
          </div>

          {/* Bridging panel — centred on the photo seam */}
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

        {/* Right: paper info card */}
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
          <img src={P.hkNight} alt="Hong Kong harbour at night" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
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
