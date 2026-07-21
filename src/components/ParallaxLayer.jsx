import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

// Wraps children and translates them vertically as the page scrolls, at a
// fraction of scroll speed set by `speed` (e.g. 0.2 = moves slowly/far away,
// 0.6 = moves faster/closer). Disabled entirely under reduced-motion.
export function ParallaxLayer({ speed = 0.3, className = '', children }) {
  const ref = useRef(null)
  const reducedMotion = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 200 * speed])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
