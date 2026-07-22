export function PageHeader({ eyebrow, title, description }) {
  return (
    <div style={{ background: 'var(--color-ink)', padding: 'clamp(40px, 6vw, 80px) clamp(20px, 5vw, 48px) 0' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', paddingBottom: 'clamp(32px, 4vw, 56px)' }}>
        <span
          style={{
            display: 'block',
            height: 8,
            background: 'var(--color-accent)',
            width: 64,
            marginBottom: 20,
          }}
          aria-hidden="true"
        />
        {eyebrow && (
          <p className="label-caps" style={{ color: 'var(--color-accent)', marginBottom: 14 }}>
            {eyebrow}
          </p>
        )}
        <h1
          className="font-editorial"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#fff' }}
        >
          {title}
        </h1>
        {description && (
          <p style={{ color: 'var(--color-body-dark)', fontSize: 15, lineHeight: 1.65, maxWidth: '50ch', marginTop: 16 }}>
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
