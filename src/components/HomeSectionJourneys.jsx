import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'

const BASE = import.meta.env.BASE_URL

const JOURNEYS = [
  {
    src: 'Parthenon in Athens.jpeg',
    alt: 'The Parthenon at the Acropolis, Athens',
    caption: "Athens — after the Acropolis. The Parthenon has been standing for 2,500 years. Whatever you're worried about is fine.",
  },
  {
    src: 'santorini-streets.jpeg',
    alt: 'Streets of Santorini at golden hour with friends',
    caption: 'Santorini at golden hour. We got completely lost looking for a restaurant and found a better one.',
  },
  {
    src: 'hong-kong-skyline.jpeg',
    alt: 'Hong Kong skyline at dusk from Victoria Peak',
    caption: "Victoria Peak, dusk. No matter how long I'm away from Hong Kong, this view resets something.",
  },
  {
    src: 'madrid-royal-palace.jpeg',
    alt: 'Royal Palace of Madrid — ceiling fresco and chandelier',
    caption: 'Royal Palace of Madrid — every square metre of that ceiling hand-painted. I stayed in this room longer than I planned.',
  },
  {
    src: 'Vietnam with a friend we met.jpeg',
    alt: 'Vietnam — with a friend met along the way',
    caption: "Vietnam. The guy across the table we'd met two days earlier. By the end of the week he felt like someone we'd always known.",
  },
  {
    src: 'Korea.jpeg',
    alt: 'Seoul, Korea, 2024',
    caption: 'Seoul, 2024. A city that moves fast and eats well. Keep up or get left behind.',
  },
  {
    src: 'Prague during Christmas.jpeg',
    alt: 'Prague Christmas markets',
    caption: 'Prague in December. Christmas markets, mulled wine, cobblestones underfoot. The cold makes it feel more alive.',
  },
  {
    src: 'Japan with Parents.jpeg',
    alt: 'Japan with parents',
    caption: 'Japan with my parents. Best food, best company. Some trips are worth doing with the people who matter most.',
  },
]

const CARD_W = 320
const GAP    = 20

function ArrowButton({ dir, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === -1 ? 'Previous photo' : 'Next photo'}
      className="journey-arrow"
      style={{
        width: 44, height: 44,
        border: '1px solid var(--color-accent)',
        background: 'none',
        color: disabled ? 'rgba(217,162,27,0.3)' : 'var(--color-accent)',
        cursor: disabled ? 'default' : 'pointer',
        fontSize: '1.25rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {dir === -1 ? '←' : '→'}
    </button>
  )
}

function Lightbox({ photo, onClose }) {
  const closeBtnRef   = useRef(null)
  const galleryLinkRef = useRef(null)

  // Move focus to close button on open
  useEffect(() => { closeBtnRef.current?.focus() }, [])

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // ESC to close + focus trap between close button and gallery link
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key !== 'Tab') return
      const nodes = [closeBtnRef.current, galleryLinkRef.current].filter(Boolean)
      if (!nodes.length) return
      const first = nodes[0]
      const last  = nodes[nodes.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

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
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: 860, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <button
          ref={closeBtnRef}
          onClick={onClose}
          aria-label="Close lightbox"
          style={{
            alignSelf: 'flex-end',
            background: 'none', border: 'none',
            color: 'rgba(255,255,255,0.7)',
            cursor: 'pointer',
            fontSize: '1.25rem', lineHeight: 1,
            minWidth: 44, minHeight: 44,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 12,
          }}
        >
          ✕
        </button>
        <img
          src={`${BASE}images/gallery/${photo.src}`}
          alt={photo.alt}
          style={{ maxHeight: '65vh', maxWidth: '100%', objectFit: 'contain', display: 'block' }}
        />
        <p style={{
          color: 'rgba(255,255,255,0.85)',
          fontSize: '1.0625rem', lineHeight: 1.65,
          marginTop: 22, marginBottom: 22,
          textAlign: 'center', maxWidth: '52ch',
          fontFamily: 'var(--font-reading)',
        }}>
          {photo.caption}
        </p>
        <Link ref={galleryLinkRef} to="/gallery" className="cta-link" style={{ textDecoration: 'none' }}>
          View Photo Gallery
        </Link>
      </div>
    </div>
  )
}

export function HomeSectionJourneys() {
  const [active, setActive] = useState(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd]     = useState(false)
  const scrollRef  = useRef(null)
  const triggerRef = useRef(null) // element that opened the lightbox — restore focus on close

  const syncArrows = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setAtStart(el.scrollLeft <= 0)
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 1)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', syncArrows, { passive: true })
    syncArrows()
    return () => el.removeEventListener('scroll', syncArrows)
  }, [syncArrows])

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * (CARD_W + GAP), behavior: 'smooth' })
  }

  const handleClose = useCallback(() => {
    setActive(null)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }, [])

  return (
    <>
      <section style={{ background: 'var(--color-ink)', padding: 'clamp(48px, 6vw, 80px) clamp(20px, 5vw, 48px) 72px' }}>

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 36 }}>
          <div>
            <div style={{ width: 44, height: 4, background: 'var(--color-accent)', marginBottom: 14 }} aria-hidden="true" />
            <p className="label-caps" style={{ color: 'var(--color-body-dark)' }}>More From Journeys</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <ArrowButton dir={-1} disabled={atStart} onClick={() => scroll(-1)} />
            <ArrowButton dir={1}  disabled={atEnd}   onClick={() => scroll(1)} />
          </div>
        </div>

        {/* Carousel — keyboard navigable via individual card buttons */}
        <div
          ref={scrollRef}
          role="region"
          aria-label="Journey photos"
          className="no-scrollbar"
          style={{ overflowX: 'auto', display: 'flex', gap: GAP }}
        >
          {JOURNEYS.map((photo) => (
            <button
              key={photo.src}
              className="journey-card"
              aria-label={`Open photo: ${photo.alt}`}
              onClick={(e) => { triggerRef.current = e.currentTarget; setActive(photo) }}
              style={{
                flexShrink: 0, width: CARD_W,
                background: 'none', border: 'none', padding: 0,
                cursor: 'pointer', textAlign: 'left',
              }}
            >
              <div style={{ height: 280, overflow: 'hidden' }}>
                <img
                  src={`${BASE}images/gallery/${photo.src}`}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <p style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.9375rem', lineHeight: 1.6,
                marginTop: 14,
                fontFamily: 'var(--font-reading)',
              }}>
                {photo.caption}
              </p>
            </button>
          ))}
        </div>
      </section>

      {active && <Lightbox photo={active} onClose={handleClose} />}
    </>
  )
}
