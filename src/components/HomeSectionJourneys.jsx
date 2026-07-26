import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const BASE = import.meta.env.BASE_URL

// Curated photos with editorial captions — separate from the short gallery.js labels.
const JOURNEYS = [
  {
    src: 'Parthenon in Athens.jpeg',
    alt: 'The Parthenon at the Acropolis, Athens',
    caption: 'Athens — after the Acropolis. The Parthenon has been standing for 2,500 years. Whatever you\'re worried about is fine.',
  },
  {
    src: 'santorini-streets.jpeg',
    alt: 'Streets of Santorini at golden hour with friends',
    caption: 'Santorini at golden hour. We got completely lost looking for a restaurant and found a better one.',
  },
  {
    src: 'hong-kong-skyline.jpeg',
    alt: 'Hong Kong skyline at dusk from Victoria Peak',
    caption: 'Victoria Peak, dusk. No matter how long I\'m away from Hong Kong, this view resets something.',
  },
  {
    src: 'madrid-royal-palace.jpeg',
    alt: 'Royal Palace of Madrid — ceiling fresco and chandelier',
    caption: 'Royal Palace of Madrid — every square metre of that ceiling hand-painted. I stayed in this room longer than I planned.',
  },
  {
    src: 'Vietnam with a friend we met.jpeg',
    alt: 'Vietnam — with a friend met along the way',
    caption: 'Vietnam. The guy across the table we\'d met two days earlier. By the end of the week he felt like someone we\'d always known.',
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

function Lightbox({ photo, onClose }) {
  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Close on Escape
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
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
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            alignSelf: 'flex-end',
            background: 'none', border: 'none',
            color: 'rgba(255,255,255,0.6)', cursor: 'pointer',
            fontSize: '1.25rem', lineHeight: 1, padding: 8, marginBottom: 12,
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
        >
          ✕
        </button>

        {/* Photo */}
        <img
          src={`${BASE}images/gallery/${photo.src}`}
          alt={photo.alt}
          style={{ maxHeight: '65vh', maxWidth: '100%', objectFit: 'contain', display: 'block' }}
        />

        {/* Caption */}
        <p style={{
          color: 'rgba(255,255,255,0.8)',
          fontSize: '1.0625rem', lineHeight: 1.65,
          marginTop: 22, marginBottom: 22,
          textAlign: 'center', maxWidth: '52ch',
          fontFamily: 'var(--font-reading)',
        }}>
          {photo.caption}
        </p>

        {/* Link to gallery */}
        <Link to="/gallery" className="cta-link" style={{ textDecoration: 'none' }}>
          View Photo Gallery
        </Link>
      </div>
    </div>
  )
}

export function HomeSectionJourneys() {
  const [active, setActive] = useState(null)

  return (
    <>
      <section style={{ background: '#000', padding: 'clamp(56px, 7vw, 96px) clamp(20px, 5vw, 48px) 80px' }}>

        {/* Section header */}
        <div style={{ marginBottom: 44 }}>
          <div style={{ width: 44, height: 4, background: 'var(--color-accent)', marginBottom: 16 }} aria-hidden="true" />
          <p className="label-caps" style={{ color: 'var(--color-body-dark)' }}>More From Journeys</p>
        </div>

        {/* Photo grid — captions always visible */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          columnGap: 4,
          rowGap: 36,
        }}>
          {JOURNEYS.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, delay: (i % 4) * 0.07 }}
              onClick={() => setActive(photo)}
              style={{ cursor: 'pointer' }}
            >
              {/* Photo */}
              <div style={{ position: 'relative', height: 300, overflow: 'hidden' }}>
                <img
                  src={`${BASE}images/gallery/${photo.src}`}
                  alt={photo.alt}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover', display: 'block',
                    transition: 'transform 0.45s ease',
                  }}
                  loading="lazy"
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>

              {/* Caption — always visible */}
              <p style={{
                color: 'rgba(255,255,255,0.65)',
                fontSize: '0.9375rem', lineHeight: 1.6,
                marginTop: 12,
                fontFamily: 'var(--font-reading)',
              }}>
                {photo.caption}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {active && <Lightbox photo={active} onClose={() => setActive(null)} />}
    </>
  )
}
