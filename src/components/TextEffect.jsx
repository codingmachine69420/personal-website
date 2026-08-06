import { motion } from 'framer-motion'

// Motion-Primitives-style word reveal (their registry's own "Text Effect"
// component was unreachable when this was built — Vercel was challenge-
// gating the fetch — so this is a hand-built equivalent of the same
// documented pattern: split into words, fade + blur + rise in, staggered
// left to right). Runs once on mount; inherits reducedMotion="user" from
// the MotionConfig wrapping every route in App.jsx, so it's a no-op for
// anyone with reduced-motion set at the OS level.
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0 } },
}

const word = {
  hidden: { opacity: 0, y: '0.4em', filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

export function TextEffect({ children, delay = 0, style }) {
  const words = String(children).split(' ')
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={container}
      transition={{ delayChildren: delay }}
      style={{ display: 'inline-block', ...style }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={word}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'inline-block', marginRight: '0.28em', willChange: 'transform, filter' }}
        >
          {w}
        </motion.span>
      ))}
    </motion.span>
  )
}
