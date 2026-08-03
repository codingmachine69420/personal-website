import { Link } from 'react-router-dom'
import { directory } from '../content/site'

const primary   = directory.slice(0, 2) // Mindset, Projects & Experiences
const secondary = directory.slice(2)    // Interests, Photo Gallery

export function Home() {
  return (
    <div style={{ background: '#000', minHeight: '100vh' }}>

      {/* ── WIP notice ── */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '28px 24px 0' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          background: '#c01400',
          border: '1.5px solid rgba(255,255,255,0.2)',
          padding: '9px 22px 11px',
          transform: 'rotate(-1deg)',
        }}>
          <span style={{ color: '#fff', fontSize: '1rem' }}>⚠</span>
          <span className="font-editorial" style={{ color: '#fff', fontSize: '1rem', letterSpacing: '0.08em' }}>
            Work in Progress
          </span>
        </div>
      </div>

      {/* ── Hero ── */}
      <div style={{
        maxWidth: 1000,
        margin: '0 auto',
        padding: 'clamp(56px, 10vw, 120px) clamp(20px, 5vw, 48px) clamp(48px, 6vw, 72px)',
      }}>
        <div style={{ width: 56, height: 4, background: 'var(--color-accent)', marginBottom: 28 }} aria-hidden="true" />
        <h1
          className="font-editorial"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)', color: '#fff', marginBottom: 24, lineHeight: 0.92 }}
        >
          Discovering<br />Anson
        </h1>
        <p style={{
          color: 'var(--color-body-dark)',
          fontSize: '1.125rem',
          lineHeight: 1.7,
          maxWidth: '48ch',
          fontFamily: 'var(--font-reading)',
        }}>
          Finance & markets by day, builder by night. Based between Toronto and Hong Kong.
        </p>
      </div>

      {/* ── Primary nav cards ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 2,
        borderTop: '2px solid rgba(255,255,255,0.06)',
      }}>
        {primary.map((item) => (
          <Link
            key={item.id}
            to={item.href}
            style={{ textDecoration: 'none', display: 'block' }}
          >
            <div
              style={{
                background: 'var(--color-ink)',
                padding: 'clamp(40px, 6vw, 72px) clamp(24px, 4vw, 48px)',
                borderBottom: '3px solid transparent',
                transition: 'border-color 0.2s',
                height: '100%',
              }}
              onMouseEnter={e => e.currentTarget.style.borderBottomColor = 'var(--color-accent)'}
              onMouseLeave={e => e.currentTarget.style.borderBottomColor = 'transparent'}
            >
              <p className="label-caps" style={{ color: 'var(--color-accent)', marginBottom: 20 }}>
                0{item.floor}
              </p>
              <h2
                className="font-editorial"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', color: '#fff', marginBottom: 16 }}
              >
                {item.label}
              </h2>
              <p style={{ color: 'var(--color-body-dark)', fontSize: '0.9375rem', lineHeight: 1.65, maxWidth: '36ch' }}>
                {item.description}
              </p>
              <p className="label-caps" style={{ color: 'var(--color-accent)', marginTop: 32, fontSize: '0.75rem' }}>
                Explore →
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Secondary links ── */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        flexWrap: 'wrap',
      }}>
        {secondary.map((item) => (
          <Link
            key={item.id}
            to={item.href}
            style={{ textDecoration: 'none', flex: '1 1 200px' }}
          >
            <div
              style={{
                padding: 'clamp(24px, 4vw, 40px) clamp(24px, 4vw, 48px)',
                borderRight: '1px solid rgba(255,255,255,0.06)',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.6'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <p className="label-caps" style={{ color: 'rgba(255,255,255,0.3)', marginBottom: 10, fontSize: '0.75rem' }}>
                0{item.floor}
              </p>
              <p className="label-caps" style={{ color: '#fff', marginBottom: 8 }}>
                {item.label}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.875rem', fontFamily: 'var(--font-reading)' }}>
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

    </div>
  )
}
