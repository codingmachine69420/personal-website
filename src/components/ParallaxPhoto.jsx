import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

export function ParallaxPhoto({ src, alt, loading = 'lazy', strength = 9, pos = 'center center' }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const s = reduced ? 0 : strength
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${s}%`, `${s}%`])

  return (
    <div ref={ref} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <motion.div style={{ y, position: 'absolute', top: `-${s}%`, left: 0, width: '100%', height: `${100 + s * 2}%` }}>
        <img
          src={src}
          alt={alt}
          loading={loading}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: pos,
            display: 'block',
            animation: reduced ? 'none' : 'ken-burns 22s ease-in-out infinite alternate',
          }}
        />
      </motion.div>
    </div>
  )
}
