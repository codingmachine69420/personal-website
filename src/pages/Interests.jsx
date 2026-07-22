import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'

const pages = [
  { label: '01 — Driven', href: '/driven', description: 'What pushes me forward.' },
  { label: '02 — Curious', href: '/curious', description: 'What I explore and why.' },
  { label: '03 — Attitude', href: '/attitude', description: 'How I carry myself.' },
]

export function Interests() {
  return (
    <div>
      <PageHeader eyebrow="05 — Interests" title="Interests" />

      <div style={{ background: 'var(--color-paper)', padding: 'clamp(32px, 5vw, 64px) clamp(20px, 5vw, 48px) 96px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          {pages.map((page) => (
            <Link
              key={page.href}
              to={page.href}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '28px 0',
                borderBottom: '1px solid rgba(28,28,28,0.12)',
                textDecoration: 'none',
                gap: 16,
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.6'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <div>
                <p className="label-caps" style={{ color: 'var(--color-accent)', marginBottom: 6 }}>
                  {page.label}
                </p>
                <p style={{ color: 'var(--color-body-light)', fontSize: 15 }}>{page.description}</p>
              </div>
              <span style={{ color: 'var(--color-accent)', fontSize: 20, flexShrink: 0 }}>→</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
