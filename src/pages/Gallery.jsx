import { useState, useRef, useEffect, useCallback, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageHeader } from '../components/PageHeader'
import { photosByYear } from '../content/gallery'

const BASE = import.meta.env.BASE_URL

// Flatten all photos from all years into one array — no year breaks
const allPhotos = photosByYear.flatMap(({ photos }) => photos)

// Deterministic tilt per position — scrapbook, not a grid. Small enough
// that rotated frames never collide inside the masonry columns.
const TILTS = [-1.3, 0.9, -0.6, 1.2, -1.0, 0.5, -1.4, 0.8, -0.4, 1.1]

// Adapted from Watermelon UI's "carousel-navigator" registry component
// (registry.watermelon.sh/r/carousel-navigator.json): a pill-shaped bar with
// tap-animated prev/next buttons and a windowed dot indicator, reskinned onto
// this site's ink/accent tokens. Dropped the original's per-slide-color-theme
// and autoplay-progress-fill — neither made sense for a user-controlled
// 31-photo lightbox — and windowed the dots (max 7, centered on the current
// photo) since a full row of 31 dots wouldn't fit or read as useful.
const ArrowButton = forwardRef(function ArrowButton({ dir, onClick, label }, ref) {
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

function CarouselNavigator({ total, index, onNavigate, onJump, prevRef, nextRef }) {
  const windowSize = Math.min(total, 7)
  let start = Math.max(0, index - Math.floor(windowSize / 2))
  start = Math.min(start, total - windowSize)
  const dots = Array.from({ length: windowSize }, (_, i) => start + i)

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      background: 'rgba(255,255,255,0.06)', padding: '8px 8px', marginTop: 22,
    }}>
      <ArrowButton ref={prevRef} dir={-1} label="Previous photo" onClick={() => onNavigate(-1)} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '0 6px' }}>
        {dots.map((i) => (
          <motion.button
            key={i}
            onClick={() => onJump(i)}
            aria-label={`Photo ${i + 1}`}
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
      <ArrowButton ref={nextRef} dir={1} label="Next photo" onClick={() => onNavigate(1)} />
    </div>
  )
}

function GalleryLightbox({ photos, index, onClose, onNavigate, onJump }) {
  const closeBtnRef = useRef(null)
  const prevBtnRef = useRef(null)
  const nextBtnRef = useRef(null)
  const photo = photos[index]

  // Move focus to close button on open
  useEffect(() => { closeBtnRef.current?.focus() }, [])

  // Body scroll lock while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // ESC to close, arrow keys to navigate, Tab trapped between the three controls
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'ArrowLeft') { onNavigate(-1); return }
      if (e.key === 'ArrowRight') { onNavigate(1); return }
      if (e.key !== 'Tab') return
      // DOM order: close button renders first (header row), then prev/next (navigator row)
      const nodes = [closeBtnRef.current, prevBtnRef.current, nextBtnRef.current].filter(Boolean)
      if (!nodes.length) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, onNavigate])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.93)',
        zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(16px, 4vw, 40px)',
      }}
    >
      {/* Modal content — center-anchored (not trigger-anchored, so
          transform-origin: center is correct here), scales in slightly
          rather than from scale(0) since nothing in the real world appears
          from nothing. Exit is faster than entry — the system's response
          to closing should feel snappier than the deliberate open. */}
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: 900, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 12 }}>
          <p className="label-caps" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>
            {index + 1} / {photos.length}
          </p>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'none', border: 'none',
              color: 'rgba(255,255,255,0.7)',
              cursor: 'pointer',
              fontSize: '1.25rem', lineHeight: 1,
              minWidth: 44, minHeight: 44,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <img
            src={`${BASE}${photo.src.replace(/^\//, '')}`}
            alt={photo.alt}
            style={{ maxHeight: '65vh', maxWidth: '100%', objectFit: 'contain', display: 'block' }}
          />
        </div>

        <p style={{
          color: 'rgba(255,255,255,0.85)',
          fontSize: '1.0625rem', lineHeight: 1.65,
          marginTop: 22,
          textAlign: 'center', maxWidth: '52ch',
          fontFamily: 'var(--font-reading)',
        }}>
          {photo.caption}
        </p>

        <CarouselNavigator
          total={photos.length}
          index={index}
          onNavigate={onNavigate}
          onJump={onJump}
          prevRef={prevBtnRef}
          nextRef={nextBtnRef}
        />
      </motion.div>
    </motion.div>
  )
}

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null)
  const triggerRef = useRef(null)

  const handleClose = useCallback(() => {
    setActiveIndex(null)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }, [])

  const handleNavigate = useCallback((dir) => {
    setActiveIndex((i) => (i + dir + allPhotos.length) % allPhotos.length)
  }, [])

  const handleJump = useCallback((i) => setActiveIndex(i), [])

  return (
    <div>
      <PageHeader
        eyebrow="04 — Gallery"
        title="Gallery"
        description="Photos — travel and elsewhere."
      />

      <div style={{ background: '#0B0B0B', padding: 'clamp(24px, 4vw, 56px)' }}>
        <div
          className="columns-1 sm:columns-2 md:columns-3"
          style={{ columnGap: 'clamp(24px, 3vw, 40px)' }}
        >
          {allPhotos.map((photo, i) => (
            <figure
              key={photo.src}
              className="film-frame"
              style={{
                breakInside: 'avoid',
                marginBottom: 'clamp(32px, 4vw, 52px)',
                transform: `rotate(${TILTS[i % TILTS.length]}deg)`,
              }}
            >
              {/* Top sprocket row */}
              <div className="film-sprockets" aria-hidden="true" />

              {/* The gate — photo sits flush between the perforations */}
              <div style={{ padding: '0 10px' }}>
                <button
                  onClick={(e) => { triggerRef.current = e.currentTarget; setActiveIndex(i) }}
                  aria-label={`Open photo: ${photo.alt}`}
                  style={{ display: 'block', width: '100%', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                >
                  <img
                    src={`${BASE}${photo.src.replace(/^\//, '')}`}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    style={{
                      width: '100%',
                      height: 'auto',
                      aspectRatio: `${photo.width} / ${photo.height}`,
                      display: 'block',
                    }}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              </div>

              {/* Bottom sprocket row */}
              <div className="film-sprockets" aria-hidden="true" />

              {/* Frame number printed on the rebate, as on real film stock */}
              <div className="film-edge" aria-hidden="true">
                Frame {String(i + 1).padStart(2, '0')}
              </div>

              {/* Typed label — always visible */}
              <figcaption className="film-label">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <GalleryLightbox
            key="lightbox"
            photos={allPhotos}
            index={activeIndex}
            onClose={handleClose}
            onNavigate={handleNavigate}
            onJump={handleJump}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
