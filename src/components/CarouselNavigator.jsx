import { forwardRef } from 'react'
import { motion } from 'framer-motion'

// Adapted from Watermelon UI's "carousel-navigator" registry component
// (registry.watermelon.sh/r/carousel-navigator.json): a pill-shaped bar with
// tap-animated prev/next buttons and a windowed dot indicator, reskinned onto
// this site's ink/accent tokens. Dropped the original's per-slide-color-theme
// and autoplay-progress-fill — neither made sense for a user-controlled
// lightbox. Windows the dots (max 7, centered on the current slide) so a
// long photo set doesn't render an unreadable row of dots.
// Originally built inline for Gallery's lightbox (pages/Gallery.jsx),
// extracted here so PipelineTable's per-project lightbox can reuse the same
// pattern instead of re-implementing it.
export const ArrowButton = forwardRef(function ArrowButton({ dir, onClick, label }, ref) {
  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      aria-label={label}
      whileTap={{ scale: 0.88 }}
      style={{
        width: 40, height: 40, flexShrink: 0,
        background: 'var(--color-accent)', border: 'none', color: 'var(--color-black, #000)',
        cursor: 'pointer', fontSize: '1.15rem', fontWeight: 700,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {dir === -1 ? '‹' : '›'}
    </motion.button>
  )
})

// `itemLabel` customizes the aria-labels per call site ("photo" on Gallery,
// "screenshot" on the pipeline lightbox) rather than a generic "slide".
export function CarouselNavigator({ total, index, onNavigate, onJump, prevRef, nextRef, itemLabel = 'item' }) {
  const windowSize = Math.min(total, 7)
  let start = Math.max(0, index - Math.floor(windowSize / 2))
  start = Math.min(start, total - windowSize)
  const dots = Array.from({ length: windowSize }, (_, i) => start + i)

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      background: 'rgba(255,255,255,0.06)', padding: '8px 8px',
    }}>
      <ArrowButton ref={prevRef} dir={-1} label={`Previous ${itemLabel}`} onClick={() => onNavigate(-1)} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '0 6px' }}>
        {dots.map((i) => (
          <motion.button
            key={i}
            onClick={() => onJump(i)}
            aria-label={`${itemLabel.charAt(0).toUpperCase()}${itemLabel.slice(1)} ${i + 1}`}
            aria-current={i === index}
            layout
            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            style={{
              height: 6, padding: 0, border: 'none', cursor: 'pointer',
              width: i === index ? 26 : 6,
              background: i === index ? 'var(--color-accent)' : 'rgba(255,255,255,0.35)',
            }}
          />
        ))}
      </div>
      <ArrowButton ref={nextRef} dir={1} label={`Next ${itemLabel}`} onClick={() => onNavigate(1)} />
    </div>
  )
}
