import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Adapted from Watermelon UI's "labeled-progress-indicator" registry
// component (registry.watermelon.sh/r/labeled-progress-indicator.json):
// a cycling label over an animated fill bar with a slow shimmer sweep.
// Reskinned onto the paper-section tokens (this sits on --color-paper on
// the Interests page, not a dark panel) and the two labels are real values
// ("Watched" / "Remaining"), not invented copy.
export function LabeledProgressIndicator({ labels, percent, intervalMs = 2600 }) {
  const [labelIndex, setLabelIndex] = useState(0)

  useEffect(() => {
    if (labels.length < 2) return
    const id = setInterval(() => setLabelIndex((i) => (i + 1) % labels.length), intervalMs)
    return () => clearInterval(id)
  }, [labels.length, intervalMs])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10, width: '100%', maxWidth: 320 }}>
      <AnimatePresence mode="wait">
        <motion.p
          key={labelIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="label-caps"
          style={{ color: 'var(--color-body-light)', margin: 0 }}
        >
          {labels[labelIndex]}
        </motion.p>
      </AnimatePresence>

      <div style={{ height: 6, width: '100%', overflow: 'hidden', background: 'rgba(28,28,28,0.1)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ position: 'relative', height: '100%', background: 'var(--color-accent)', overflow: 'hidden' }}
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', inset: 0, width: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)' }}
          />
        </motion.div>
      </div>
    </div>
  )
}
