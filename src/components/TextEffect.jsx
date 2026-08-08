import { motion } from 'framer-motion'

// Hand-built equivalent of Motion Primitives' "Text Effect" component
// (motion-primitives.com/docs/text-effect) — their registry has been behind
// a Vercel bot-challenge (X-Vercel-Mitigated: challenge, not a normal rate
// limit) every time it's been fetched from this machine, on both the CLI and
// WebFetch, so this is typed by hand rather than pulled. Supports the same
// per/as/preset surface as their real component:
//   <TextEffect per="word" as="h3" preset="slide">Some text</TextEffect>
// `per`: 'word' | 'char' — segment granularity.
// `preset`: 'fade' (opacity + blur + rise) | 'slide' (clipped slide-up).
// `as`: the HTML tag framer-motion renders the outer element as.
// Runs once on mount; inherits reducedMotion="user" from the MotionConfig
// wrapping every route in App.jsx, so it's a no-op for reduced-motion users.
const PRESETS = {
  fade: {
    container: { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } },
    item: {
      hidden: { opacity: 0, y: '0.4em', filter: 'blur(6px)' },
      visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
    },
    duration: 0.6,
    clip: false,
  },
  slide: {
    container: { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } },
    item: {
      hidden: { y: '100%', opacity: 0 },
      visible: { y: '0%', opacity: 1 },
    },
    duration: 0.5,
    clip: true,
  },
}

export function TextEffect({
  children,
  per = 'word',
  as = 'span',
  preset = 'fade',
  delay = 0,
  style,
}) {
  const { container, item, duration, clip } = PRESETS[preset] ?? PRESETS.fade
  const segments = per === 'char' ? String(children).split('') : String(children).split(' ')
  const MotionTag = motion[as] ?? motion.span

  return (
    <MotionTag
      initial="hidden"
      animate="visible"
      variants={container}
      transition={{ delayChildren: delay }}
      style={{ display: 'inline-block', ...style }}
    >
      {segments.map((seg, i) => {
        const word = (
          <motion.span
            variants={item}
            transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'inline-block', willChange: 'transform, opacity, filter' }}
          >
            {seg === ' ' ? ' ' : seg}
          </motion.span>
        )
        // Slide needs an overflow-hidden mask per segment so text rises out
        // of a clipped band instead of sliding in over already-visible area.
        return clip ? (
          <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: per === 'word' ? '0.28em' : 0 }}>
            {word}
          </span>
        ) : (
          <span key={i} style={{ display: 'inline-block', marginRight: per === 'word' ? '0.28em' : 0 }}>
            {word}
          </span>
        )
      })}
    </MotionTag>
  )
}
