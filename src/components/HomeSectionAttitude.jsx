import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ParallaxPhoto } from './ParallaxPhoto'
import { EASE, fadeIn } from '../utils/homeAnimations'

export function HomeSectionAttitude({ P }) {
  return (
    <>
      {/* ── Desktop ── */}
      <section
        className="relative hidden md:flex"
        style={{ minHeight: '85vh', height: '85vh' }}
      >
        {/* Left: stacked photos with bridging text panel on the seam */}
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
            <h2 className="font-editorial" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: '#fff', marginBottom: 12, fontWeight: 700 }}>
              Be the Driver.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.0625rem', lineHeight: 1.55, maxWidth: '38ch', marginBottom: 18 }}>
              Hard mode is the only way success feels deserved. And when the critics show up, the unbothered don't flinch.
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
          <h2 className="font-editorial" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--color-ink)', marginBottom: 10, fontWeight: 700 }}>
            HK · Toronto
          </h2>
          <div style={{ alignSelf: 'flex-start', background: 'var(--color-accent)', padding: '4px 12px', marginBottom: 24 }}>
            <span className="label-caps" style={{ fontSize: '0.75rem', color: '#000' }}>Finance + Markets</span>
          </div>

          <div style={{ display: 'flex', borderTop: '1px solid rgba(28,28,28,0.15)', borderBottom: '1px solid rgba(28,28,28,0.15)', marginBottom: 28 }}>
            {['Finance', 'Travel', 'Markets', 'Photos'].map((tab, i) => (
              <div key={tab} style={{ flex: 1, padding: '12px 0', textAlign: 'center', borderLeft: i > 0 ? '1px solid rgba(28,28,28,0.15)' : 'none' }}>
                <span className="label-caps" style={{ fontSize: '0.75rem', color: 'var(--color-body-light)' }}>{tab}</span>
              </div>
            ))}
          </div>

          <p className="label-caps" style={{ color: 'var(--color-ink)', marginBottom: 8, fontSize: '0.75rem' }}>Background</p>
          <p style={{ color: 'var(--color-body-light)', fontSize: '1.0625rem', lineHeight: 1.6, marginBottom: 28 }}>
            UofT Finance. Raised in Hong Kong, building in Toronto.
          </p>

          <div style={{ flex: 1, background: 'var(--color-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 120 }}>
            <span className="label-caps" style={{ color: 'var(--color-body-dark)', fontSize: '0.75rem', letterSpacing: '0.2em' }}>
              HK ←——————————→ YYZ
            </span>
          </div>
        </motion.div>
      </section>

      {/* ── Mobile ── */}
      <section className="md:hidden" style={{ background: 'var(--color-ink)' }}>
        <div style={{ position: 'relative', height: '65vh', overflow: 'hidden' }}>
          <img src={P.hkNight} alt="Hong Kong harbour at night" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, transparent 55%)' }} aria-hidden="true" />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 24px 40px' }}>
            <div style={{ width: 36, height: 3, background: 'var(--color-accent)', marginBottom: 12 }} aria-hidden="true" />
            <h2 className="font-editorial" style={{ fontSize: '2rem', color: '#fff', marginBottom: 16, fontWeight: 700 }}>Be the Driver.</h2>
            <Link to="/attitude" className="cta-link">Discover</Link>
          </div>
        </div>
        <div style={{ padding: '36px 24px 48px' }}>
          <p style={{ color: 'var(--color-body-dark)', fontSize: '1.0625rem', lineHeight: 1.6, marginBottom: 28 }}>
            UofT Finance. Raised in Hong Kong, building in Toronto.
          </p>
          <Link to="/attitude" className="cta-link">Discover</Link>
        </div>
      </section>
    </>
  )
}
