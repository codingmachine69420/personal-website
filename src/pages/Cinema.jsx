import { useState } from 'react'
import { Link } from 'react-router-dom'
import { cinema } from '../content/interests'

const watched   = cinema.watchlist.filter((f) => f.watched)
const unwatched = cinema.watchlist.filter((f) => !f.watched)

function Stars({ rating }) {
  if (rating == null) return (
    <span className="label-caps" style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem' }}>Pending</span>
  )
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5 ? 1 : 0
  const empty = 5 - full - half
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <span style={{ color: 'var(--color-accent)', fontSize: '0.8rem', letterSpacing: 2 }}>
        {'★'.repeat(full)}
        {half ? '½' : ''}
        <span style={{ color: 'rgba(255,255,255,0.2)' }}>{'★'.repeat(empty)}</span>
      </span>
      <span className="label-caps" style={{ color: 'var(--color-body-dark)', fontSize: '0.75rem', marginLeft: 4 }}>
        {rating} / 5
      </span>
    </span>
  )
}

function PosterCard({ film }) {
  const [loaded, setLoaded] = useState(true)

  if (!film.poster || !loaded) return null

  return (
    <div style={{ flexShrink: 0, width: 120 }}>
      <img
        src={film.poster}
        alt={`${film.title} poster`}
        onError={() => setLoaded(false)}
        style={{ width: '100%', display: 'block', objectFit: 'cover' }}
        loading="lazy"
      />
      <p style={{
        color: 'rgba(255,255,255,0.5)',
        fontSize: '0.75rem', lineHeight: 1.4,
        marginTop: 8, fontFamily: 'var(--font-meta)',
        textTransform: 'uppercase', letterSpacing: '0.1em',
      }}>
        {film.title}
      </p>
    </div>
  )
}

function FilmRow({ film }) {
  const [posterLoaded, setPosterLoaded] = useState(true)
  const showPoster = film.watched && film.poster && posterLoaded

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '18px 0',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      {/* Status dot */}
      <span style={{
        width: 8, height: 8, flexShrink: 0,
        background: film.watched ? 'var(--color-accent)' : 'rgba(255,255,255,0.2)',
        display: 'block',
        marginTop: 1,
      }} aria-hidden="true" />

      {/* Small poster thumbnail */}
      {showPoster && (
        <img
          src={film.poster}
          alt=""
          aria-hidden="true"
          onError={() => setPosterLoaded(false)}
          loading="lazy"
          style={{ width: 36, height: 54, objectFit: 'cover', flexShrink: 0, opacity: 0.85 }}
        />
      )}
      {/* Spacer when no poster so titles stay aligned */}
      {film.watched && (!film.poster || !posterLoaded) && (
        <div style={{ width: 36, flexShrink: 0 }} />
      )}

      {/* Title */}
      <span style={{
        flex: 1,
        color: film.watched ? '#fff' : 'rgba(255,255,255,0.45)',
        fontSize: '1rem', lineHeight: 1.4,
        fontFamily: 'var(--font-reading)',
        textDecoration: film.watched ? 'none' : 'none',
      }}>
        {film.title}
      </span>

      {/* Rating */}
      <div style={{ flexShrink: 0 }}>
        {film.watched
          ? <Stars rating={film.rating} />
          : <span className="label-caps" style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>Up next</span>
        }
      </div>
    </div>
  )
}

export function Cinema() {
  const topRated = watched
    .filter((f) => f.poster && f.rating != null)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5)

  return (
    <div style={{ background: 'var(--color-ink)', minHeight: '100vh' }}>

      {/* ── Header ── */}
      <div style={{ padding: 'clamp(64px, 10vw, 120px) clamp(20px, 5vw, 48px) clamp(48px, 6vw, 72px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Link
            to="/interests"
            className="label-caps"
            style={{ color: 'var(--color-accent)', textDecoration: 'none', display: 'inline-block', marginBottom: 32 }}
          >
            ← Interests
          </Link>
          <div style={{ width: 44, height: 4, background: 'var(--color-accent)', marginBottom: 20 }} aria-hidden="true" />
          <h1 className="font-editorial" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: '#fff', marginBottom: 8 }}>
            Cinema
          </h1>
          <p className="label-caps" style={{ color: 'var(--color-body-dark)' }}>
            2026 Watchlist — {watched.length} watched · {unwatched.length} to go
          </p>
        </div>
      </div>

      {/* ── Featured posters — top-rated watched films ── */}
      {topRated.length > 0 && (
        <div style={{ padding: 'clamp(36px, 4vw, 56px) clamp(20px, 5vw, 48px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p className="label-caps" style={{ color: 'rgba(255,255,255,0.3)', marginBottom: 24 }}>Highest rated</p>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {topRated.map((film) => <PosterCard key={film.title} film={film} />)}
            </div>
          </div>
        </div>
      )}

      {/* ── Full list ── */}
      <div style={{ padding: 'clamp(36px, 4vw, 56px) clamp(20px, 5vw, 48px) 96px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
            <p className="label-caps" style={{ color: 'rgba(255,255,255,0.3)' }}>Full list</p>
            <span style={{
              background: '#c01400',
              color: '#fff',
              fontFamily: 'var(--font-meta)',
              fontSize: '0.6875rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              padding: '3px 10px 4px',
              display: 'inline-block',
              transform: 'rotate(-1.5deg)',
            }}>
              Classics Only
            </span>
          </div>
          {cinema.watchlist.map((film) => (
            <FilmRow key={film.title} film={film} />
          ))}
        </div>
      </div>

    </div>
  )
}
