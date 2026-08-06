import { useState, useRef, useEffect, useCallback, forwardRef } from 'react'
import { PageHeader } from '../components/PageHeader'
import { photosByYear } from '../content/gallery'

const BASE = import.meta.env.BASE_URL

// Flatten all photos from all years into one array — no year breaks
const allPhotos = photosByYear.flatMap(({ photos }) => photos)

// Deterministic tilt per position — scrapbook, not a grid. Small enough
// that rotated frames never collide inside the masonry columns.
const TILTS = [-1.3, 0.9, -0.6, 1.2, -1.0, 0.5, -1.4, 0.8, -0.4, 1.1]

const CarouselArrow = forwardRef(function CarouselArrow({ dir, onClick, label }, ref) {
  return (
    <button
      ref={ref}
      onClick={onClick}
      aria-label={label}
      style={{
        position: 'absolute',
        [dir === -1 ? 'left' : 'right']: 0,
        top: 0, bottom: 0, width: 48,
        background: 'rgba(0,0,0,0.5)',
        border: 'none', color: '#fff',
        cursor: 'pointer', fontSize: '1.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.15s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(217,162,27,0.8)' }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.5)' }}
    >
      {dir === -1 ? '‹' : '›'}
    </button>
  )
})

function GalleryLightbox({ photos, index, onClose, onNavigate }) {
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
      // DOM order: close button renders first (header row), then prev/next (image row)
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
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.93)',
        zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(16px, 4vw, 40px)',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
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
          <CarouselArrow ref={prevBtnRef} dir={-1} label="Previous photo" onClick={() => onNavigate(-1)} />
          <CarouselArrow ref={nextBtnRef} dir={1} label="Next photo" onClick={() => onNavigate(1)} />
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
      </div>
    </div>
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

      {activeIndex !== null && (
        <GalleryLightbox
          photos={allPhotos}
          index={activeIndex}
          onClose={handleClose}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  )
}
