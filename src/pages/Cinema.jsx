import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { cinema } from '../content/interests'

const TMDB_TOKEN     = import.meta.env.VITE_TMDB_TOKEN
const POSTER_CACHE_KEY = 'tmdb_poster_cache_v1'

const watchedFilms   = cinema.watchlist.filter((f) => f.watched)
const unwatchedFilms = cinema.watchlist.filter((f) => !f.watched)

function Stars({ rating }) {
  if (rating == null) return (
    <span className="label-caps" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>Pending</span>
  )
  const full  = Math.floor(rating)
  const half  = rating % 1 >= 0.5 ? 1 : 0
  const empty = 5 - full - half
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      {/* Visual star display — hidden from screen readers */}
      <span aria-hidden="true" style={{ color: 'var(--color-accent)', fontSize: '0.8rem', letterSpacing: 2 }}>
        {'★'.repeat(full)}
        {half ? '½' : ''}
        <span style={{ color: 'rgba(255,255,255,0.25)' }}>{'★'.repeat(empty)}</span>
      </span>
      {/* Accessible text label */}
      <span className="sr-only">Rating: {rating} out of 5</span>
      <span aria-hidden="true" className="label-caps" style={{ color: 'var(--color-body-dark)', fontSize: '0.75rem', marginLeft: 4 }}>
        {rating} / 5
      </span>
    </span>
  )
}

function PosterCard({ film, posterUrl }) {
  const [visible, setVisible] = useState(true)
  const url = posterUrl || film.poster
  if (!url || !visible) return null
  return (
    <div style={{ flexShrink: 0, width: 110 }}>
      <img
        src={url}
        alt={`${film.title} poster`}
        onError={() => setVisible(false)}
        loading="lazy"
        style={{ width: '100%', display: 'block', objectFit: 'cover' }}
      />
      <p style={{
        color: 'rgba(255,255,255,0.55)',
        fontSize: '0.75rem', lineHeight: 1.4, marginTop: 8,
        fontFamily: 'var(--font-meta)', textTransform: 'uppercase', letterSpacing: '0.1em',
      }}>
        {film.title}
      </p>
    </div>
  )
}

function FilmRow({ film, posterUrl }) {
  const [imgVisible, setImgVisible] = useState(true)
  const url = posterUrl || film.poster
  const showThumb = film.watched && url && imgVisible

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16,
      padding: '18px 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <span style={{
        width: 8, height: 8, flexShrink: 0,
        background: film.watched ? 'var(--color-accent)' : 'rgba(255,255,255,0.25)',
        display: 'block',
      }} aria-hidden="true" />

      {film.watched && (
        showThumb
          ? <img
              src={url}
              alt=""
              aria-hidden="true"
              onError={() => setImgVisible(false)}
              loading="lazy"
              style={{ width: 36, height: 54, objectFit: 'cover', flexShrink: 0, opacity: 0.85 }}
            />
          : <div style={{ width: 36, height: 54, flexShrink: 0, background: 'rgba(255,255,255,0.06)' }} />
      )}

      <span style={{
        flex: 1,
        color: film.watched ? '#fff' : 'rgba(255,255,255,0.5)',
        fontSize: '1rem', lineHeight: 1.4,
        fontFamily: 'var(--font-reading)',
      }}>
        {film.title}
      </span>

      <div style={{ flexShrink: 0 }}>
        {film.watched
          ? <Stars rating={film.rating} />
          : <span className="label-caps" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>Up next</span>
        }
      </div>
    </div>
  )
}

export function Cinema() {
  const [posterMap, setPosterMap] = useState({})

  useEffect(() => {
    if (!TMDB_TOKEN) return
    const toFetch = cinema.watchlist.filter((f) => f.watched && !f.poster)
    if (!toFetch.length) return

    // Return cached data for this session if available
    try {
      const cached = sessionStorage.getItem(POSTER_CACHE_KEY)
      if (cached) { setPosterMap(JSON.parse(cached)); return }
    } catch (_) {}

    // Batch-fetch all posters in parallel
    Promise.allSettled(
      toFetch.map((film) =>
        fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(film.title)}&language=en-US&page=1`,
          { headers: { Authorization: `Bearer ${TMDB_TOKEN}` } }
        )
          .then((r) => r.json())
          .then((d) => {
            const path = d.results?.[0]?.poster_path
            return { title: film.title, url: path ? `https://image.tmdb.org/t/p/w300${path}` : null }
          })
      )
    ).then((results) => {
      const map = {}
      results.forEach((r) => {
        if (r.status === 'fulfilled' && r.value?.url) map[r.value.title] = r.value.url
      })
      setPosterMap(map)
      try { sessionStorage.setItem(POSTER_CACHE_KEY, JSON.stringify(map)) } catch (_) {}
    })
  }, [])

  const topRated = watchedFilms
    .filter((f) => (f.poster || posterMap[f.title]) && f.rating != null)
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
            2026 Watchlist — {watchedFilms.length} watched · {unwatchedFilms.length} to go
          </p>
        </div>
      </div>

      {/* ── Featured posters ── */}
      {topRated.length > 0 && (
        <div style={{ padding: 'clamp(36px, 4vw, 56px) clamp(20px, 5vw, 48px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p className="label-caps" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>Highest rated</p>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {topRated.map((film) => (
                <PosterCard key={film.title} film={film} posterUrl={posterMap[film.title]} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Full list ── */}
      <div style={{ padding: 'clamp(36px, 4vw, 56px) clamp(20px, 5vw, 48px) 96px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
            <p className="label-caps" style={{ color: 'rgba(255,255,255,0.5)' }}>Full list</p>
            <span style={{
              background: '#c01400', color: '#fff',
              fontFamily: 'var(--font-meta)', fontSize: '0.6875rem',
              fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em',
              padding: '3px 10px 4px', display: 'inline-block',
              transform: 'rotate(-1.5deg)',
            }}>
              Classics Only
            </span>
          </div>
          {cinema.watchlist.map((film) => (
            <FilmRow key={film.title} film={film} posterUrl={posterMap[film.title]} />
          ))}
        </div>
      </div>

    </div>
  )
}
