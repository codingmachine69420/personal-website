import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const GLOW_CLASS = {
  magenta: 'neon-magenta',
  cyan: 'neon-cyan',
  blue: 'neon-blue',
  amber: 'neon-amber',
  jade: 'neon-jade',
}

const igniteVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0, 1, 0.3, 1, 0.15, 1],
    transition: { duration: 1.4, times: [0, 0.15, 0.35, 0.5, 0.7, 1] },
  },
}

// A glowing "tube" of text: a shared building block for the nav directory,
// interest signs, and any other neon lettering on the site.
// - Renders as a <Link> when `href` is given, otherwise as `as` (default span).
// - Flickers on for `delay` seconds after mount, then settles to a steady glow.
// - If `buzz`, it keeps an occasional imperfect flicker after settling.
export function NeonSign({
  as: Component = 'span',
  href,
  color = 'cyan',
  buzz = false,
  delay = 0,
  className = '',
  children,
  ...props
}) {
  const [ignited, setIgnited] = useState(false)
  const reducedMotion = usePrefersReducedMotion()
  const Tag = href ? Link : Component
  const tagProps = href ? { to: href } : {}
  const glow = GLOW_CLASS[color] ?? GLOW_CLASS.cyan

  return (
    <motion.span
      className="inline-block"
      initial={reducedMotion ? 'visible' : 'hidden'}
      animate="visible"
      variants={igniteVariants}
      transition={{ delay: reducedMotion ? 0 : delay, duration: reducedMotion ? 0 : 1.4 }}
      onAnimationComplete={() => setIgnited(true)}
    >
      <Tag
        {...tagProps}
        {...props}
        className={`${glow} ${ignited && buzz ? 'animate-buzz' : ''} inline-block transition-[filter] duration-300 ease-out hover:brightness-125 focus-visible:brightness-125 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70 ${className}`}
      >
        {children}
      </Tag>
    </motion.span>
  )
}
