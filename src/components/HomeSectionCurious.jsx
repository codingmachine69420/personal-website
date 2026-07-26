import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ParallaxPhoto } from './ParallaxPhoto'
import { fadeUp, scaleIn } from '../utils/homeAnimations'

export function HomeSectionCurious({ P, isDesktop, G }) {
  return (
    <>
      {/* ── Desktop ── */}
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

        {/* Two-tone text panel */}
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
            <h2 className="font-editorial" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: '#fff', fontWeight: 700 }}>
              Always Exploring.
            </h2>
          </div>
          <div style={{ background: 'rgba(32,32,32,0.9)', padding: '18px 28px 24px' }}>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.0625rem', lineHeight: 1.55, maxWidth: '38ch', marginBottom: 20 }}>
              Seeking people and places to make myself feel uncomfortable.
            </p>
            <Link to="/curious" className="cta-link">Explore</Link>
          </div>
        </motion.div>

        {/* Jump inset — overlaps top-right, breaks the layout grid */}
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

      {/* ── Mobile ── */}
      <section className="md:hidden relative" style={{ height: '75vh', minHeight: 420, marginBottom: G }}>
        <ParallaxPhoto src={P.parthenon} alt="Parthenon, Athens" strength={7} pos="center 40%" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, transparent 60%)' }} aria-hidden="true" />
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 20, width: 4, background: 'var(--color-accent)', zIndex: 4 }} aria-hidden="true" />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 24px 40px', zIndex: 4 }}>
          <h2 className="font-editorial" style={{ fontSize: '2rem', color: '#fff', marginBottom: 16, fontWeight: 700 }}>Always Exploring.</h2>
          <Link to="/curious" className="cta-link">Explore</Link>
        </div>
      </section>
    </>
  )
}
