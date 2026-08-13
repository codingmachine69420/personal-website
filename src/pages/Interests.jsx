import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cinema } from '../content/interests'
import { TattooScatter } from '../components/TattooScatter'
import { LabeledProgressIndicator } from '../components/LabeledProgressIndicator'

export function Interests() {
  const watched  = cinema.watchlist.filter((f) => f.watched).length
  const total    = cinema.watchlist.length

  return (
    <div>
      {/* ── Header — same one-time reveal cadence as PageHeader.jsx / Home's hero ── */}
      <div style={{ background: 'var(--color-ink)', padding: 'clamp(64px, 10vw, 120px) clamp(20px, 5vw, 48px) clamp(48px, 6vw, 80px)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: 44, height: 4, background: 'var(--color-accent)', marginBottom: 24, transformOrigin: 'left' }}
            aria-hidden="true"
          />
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-editorial"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: '#fff', marginBottom: 24 }}
          >
            Hobbies &amp; Interests
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{ color: 'var(--color-body-dark)', fontSize: '1.125rem', lineHeight: 1.7, maxWidth: '52ch' }}
          >
            Things I keep coming back to outside of work. The obsessions, the lists, the ongoing projects of living a full life.
          </motion.p>
        </div>
      </div>

      {/* ── Articles ── */}
      <div style={{ background: 'var(--color-paper)', borderTop: '3px solid var(--color-accent)', position: 'relative', overflow: 'hidden' }}>
        <TattooScatter />
        <div style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(48px, 6vw, 80px) clamp(20px, 5vw, 48px) 96px', position: 'relative', zIndex: 1 }}>

          {/* Cinema article */}
          <article style={{ borderBottom: '1px solid rgba(28,28,28,0.1)', paddingBottom: 64 }}>
            <p className="label-caps" style={{ color: 'var(--color-ink)', marginBottom: 16 }}>Cinema</p>

            <h2 className="font-editorial" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--color-ink)', marginBottom: 24, lineHeight: 0.95 }}>
              Film as Art Form
            </h2>

            <p style={{ color: 'var(--color-body-light)', fontSize: '1.0625rem', lineHeight: 1.75, maxWidth: '60ch', marginBottom: 32 }}>
              {cinema.teaser}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap', maxWidth: '60ch' }}>
              <Link
                to="/interests/cinema"
                className="cta-link"
                style={{ textDecoration: 'none' }}
              >
                Current Watchlist
              </Link>
              <LabeledProgressIndicator
                labels={[`${watched} of ${total} watched`, `${total - watched} left on the list`]}
                percent={total ? (watched / total) * 100 : 0}
              />
            </div>
          </article>

          {/* Placeholder — more interests to come */}
          <p className="label-caps" style={{ color: 'rgba(28,28,28,0.3)', marginTop: 48 }}>
            More to follow
          </p>
        </div>
      </div>
    </div>
  )
}
