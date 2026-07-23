import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div style={{ background: 'var(--color-ink)', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 20px', textAlign: 'center' }}>
      <span
        style={{ display: 'block', height: 8, background: 'var(--color-accent)', width: 64, marginBottom: 24 }}
        aria-hidden="true"
      />
      <p className="label-caps" style={{ color: 'var(--color-accent)', marginBottom: 20 }}>
        404 — Not Found
      </p>
      <h1
        className="font-editorial"
        style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: '#fff', marginBottom: 24 }}
      >
        Wrong Turn
      </h1>
      <p style={{ color: 'var(--color-body-dark)', fontSize: 15, lineHeight: 1.65, maxWidth: '34ch', marginBottom: 40 }}>
        That page doesn't exist. Head back and find what you're looking for.
      </p>
      <Link to="/" className="cta-link">
        Back to Home
      </Link>
    </div>
  )
}
