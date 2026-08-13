import { motion } from 'framer-motion'

// One-time reveal on mount, matching the pattern already established by
// Home.jsx's hero (accent rule scaleX-in, staggered fade-up text) and
// PipelineTable's stage bar — same curve, same cadence. Runs once; inherits
// reducedMotion="user" from the MotionConfig wrapping every route in App.jsx.
export function PageHeader({ eyebrow, title, description }) {
  return (
    <div style={{ background: 'var(--color-ink)', padding: 'clamp(40px, 6vw, 80px) clamp(20px, 5vw, 48px) 0' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', paddingBottom: 'clamp(32px, 4vw, 56px)' }}>
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'block',
            height: 8,
            background: 'var(--color-accent)',
            width: 64,
            marginBottom: 20,
            transformOrigin: 'left',
          }}
          aria-hidden="true"
        />
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="label-caps"
            style={{ color: 'var(--color-accent)', marginBottom: 14 }}
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-editorial"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#fff' }}
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ color: 'var(--color-body-dark)', fontSize: 15, lineHeight: 1.65, maxWidth: '50ch', marginTop: 16 }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </div>
  )
}
