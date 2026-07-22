import { site } from '../content/site'

export function Footer() {
  return (
    <footer
      style={{
        background: 'var(--color-ink)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '40px clamp(20px, 5vw, 48px)',
      }}
    >
      <div
        style={{
          maxWidth: 860,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <p className="label-caps" style={{ color: 'var(--color-body-dark)' }}>
          &copy; {new Date().getFullYear()} {site.name}
        </p>
        <div style={{ display: 'flex', gap: 32 }}>
          {site.social.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="label-caps"
              style={{ color: 'var(--color-body-dark)', textDecoration: 'none', transition: 'color 0.15s' }}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--color-body-dark)'}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
