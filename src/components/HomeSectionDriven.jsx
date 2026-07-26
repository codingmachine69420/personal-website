import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ParallaxPhoto } from './ParallaxPhoto'
import { fadeUp, scaleIn } from '../utils/homeAnimations'

export function HomeSectionDriven({ P, isDesktop, G }) {
  return (
    <>
      {/* ── Desktop ── */}
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
            loading={isDesktop ? 'eager' : 'lazy'}
            strength={7}
            pos="center 60%"
          />
        </div>

        {/* Right: Santorini sunset */}
        <div style={{ position: 'absolute', inset: 0, left: '54%' }}>
          <ParallaxPhoto
            src={P.sunset}
            alt="Sunset over the Santorini caldera — sailboat silhouetted against an orange sky"
            loading={isDesktop ? 'eager' : 'lazy'}
            strength={10}
            pos="center center"
          />
        </div>

        {/* Small burst-through frame — Anson's figure breaks past all edges */}
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

        {/* Text panel */}
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
          <h1 className="font-editorial" style={{ fontSize: 'clamp(2.75rem, 6vw, 5rem)', color: '#fff', marginBottom: 14, fontWeight: 700 }}>
            Work Compounds
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.0625rem', lineHeight: 1.55, maxWidth: '38ch', marginBottom: 24 }}>
            The will to improve. We all start life as a blank page — I have no regrets, because I am driven to use each failure and mold it into something greater.
          </p>
          <Link to="/driven" className="cta-link">Read More</Link>
        </motion.div>
      </section>

      {/* ── Mobile ── */}
      <section className="md:hidden relative" style={{ height: '80vh', minHeight: 480, marginBottom: G }}>
        <ParallaxPhoto src={P.hike} alt="Hiking in Hong Kong" loading={isDesktop ? 'lazy' : 'eager'} strength={6} pos="center 60%" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, transparent 60%)' }} aria-hidden="true" />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 24px 40px', zIndex: 4 }}>
          <div style={{ width: 36, height: 3, background: 'var(--color-accent)', marginBottom: 12 }} aria-hidden="true" />
          <h1 className="font-editorial" style={{ fontSize: '2.75rem', color: '#fff', marginBottom: 16, fontWeight: 700 }}>Work Compounds</h1>
          <Link to="/driven" className="cta-link">Read More</Link>
        </div>
      </section>
    </>
  )
}
