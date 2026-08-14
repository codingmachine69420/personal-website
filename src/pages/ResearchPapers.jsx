import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { papers } from '../content/interests'

const BASE = import.meta.env.BASE_URL

function PaperRow({ paper }) {
  return (
    <div style={{
      display: 'flex', gap: 20,
      padding: '24px 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      {paper.cover ? (
        <img
          src={`${BASE}${paper.cover.replace(/^\//, '')}`}
          alt={`${paper.title} cover`}
          loading="lazy"
          style={{ width: 84, flexShrink: 0, objectFit: 'cover' }}
        />
      ) : (
        <div style={{ width: 84, height: 108, flexShrink: 0, background: 'rgba(255,255,255,0.06)' }} aria-hidden="true" />
      )}

      <div style={{ flex: 1, minWidth: 0 }}>
        <a
          href={paper.link}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'block', color: '#fff', textDecoration: 'none',
            fontFamily: 'var(--font-reading)', fontSize: '1.0625rem', lineHeight: 1.4, marginBottom: 8,
          }}
        >
          {paper.title} ↗
        </a>
        <p style={{ color: 'var(--color-body-dark)', fontSize: '0.9375rem', lineHeight: 1.65 }}>
          {paper.why}
        </p>
      </div>
    </div>
  )
}

export function ResearchPapers() {
  return (
    <div style={{ background: 'var(--color-ink)', minHeight: '100vh' }}>

      {/* ── Header ── */}
      <div style={{ padding: 'clamp(64px, 10vw, 120px) clamp(20px, 5vw, 48px) clamp(48px, 6vw, 72px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Link
            to="/interests"
            className="label-caps"
            style={{ color: 'var(--color-accent)', textDecoration: 'none', display: 'inline-block', marginBottom: 32 }}
          >
            ← Interests
          </Link>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: 44, height: 4, background: 'var(--color-accent)', marginBottom: 20, transformOrigin: 'left' }}
            aria-hidden="true"
          />
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-editorial"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: '#fff', marginBottom: 8 }}
          >
            Reading List
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="label-caps"
            style={{ color: 'var(--color-body-dark)' }}
          >
            {papers.list.length} paper{papers.list.length === 1 ? '' : 's'}
          </motion.p>
        </div>
      </div>

      {/* ── List ── */}
      <div style={{ padding: 'clamp(36px, 4vw, 56px) clamp(20px, 5vw, 48px) 96px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          {papers.list.length > 0 ? (
            papers.list.map((paper) => <PaperRow key={paper.title} paper={paper} />)
          ) : (
            <p className="label-caps" style={{ color: 'rgba(255,255,255,0.3)' }}>
              More to follow
            </p>
          )}
        </div>
      </div>

    </div>
  )
}
