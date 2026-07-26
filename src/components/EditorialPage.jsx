// Shared template for the Driven, Curious, and Attitude pages.
// Each page passes its own `page` data object from src/content/<page>.js.
// Add content by editing those data files — no need to touch this component.
//
// photos: array of {src, alt} with at least 3 items.
//   - Desktop: large left (3fr) + two stacked right (2fr) mosaic grid.
//   - Mobile: first photo only, full-bleed.

const resolveUrl = (src) =>
  src.startsWith('http') ? src : `${import.meta.env.BASE_URL}${src.replace(/^\//, '')}`

function Block({ block }) {
  if (block.type === 'text') {
    return (
      <p style={{ color: 'var(--color-body-light)', fontSize: '1.125rem', lineHeight: 1.6, marginBottom: 24, maxWidth: '66ch' }}>
        {block.content}
      </p>
    )
  }

  if (block.type === 'heading') {
    return (
      <h2
        className="font-editorial"
        style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--color-ink)', marginBottom: 16, marginTop: 56 }}
      >
        {block.content}
      </h2>
    )
  }

  if (block.type === 'image') {
    return (
      <figure style={{ marginBottom: 48, marginTop: 8 }}>
        <img
          src={resolveUrl(block.src)}
          alt={block.alt}
          className="w-full object-cover"
          style={{ maxHeight: 560, display: 'block' }}
          loading="lazy"
        />
        {block.caption && (
          <figcaption
            className="label-caps"
            style={{ color: 'var(--color-body-light)', marginTop: 12, fontSize: '0.875rem' }}
          >
            {block.caption}
          </figcaption>
        )}
      </figure>
    )
  }

  if (block.type === 'link') {
    const isExternal = block.href.startsWith('http')
    return (
      <a
        href={block.href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noreferrer' : undefined}
        style={{
          display: 'block',
          background: 'var(--color-ink)',
          padding: '24px 32px',
          marginBottom: 12,
          color: '#fff',
          textDecoration: 'none',
          transition: 'opacity 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
      >
        <p className="label-caps" style={{ color: 'var(--color-accent)', marginBottom: 8 }}>
          {block.label}
        </p>
        {block.description && (
          <p style={{ color: 'var(--color-body-dark)', fontSize: 15, lineHeight: 1.65 }}>
            {block.description}
          </p>
        )}
      </a>
    )
  }

  return null
}

export function EditorialPage({ title, label, photos, blocks = [] }) {
  const [p0, p1, p2] = photos

  return (
    <div>
      {/* ── Full-bleed photo header ── */}
      <header
        className="relative overflow-hidden"
        style={{ minHeight: '70vh', background: 'var(--color-ink)' }}
      >
        {/* Desktop: 3-photo mosaic — large left + two stacked right */}
        <div
          className="hidden md:grid absolute inset-0"
          style={{ gridTemplateColumns: '3fr 2fr', gridTemplateRows: '1fr 1fr', gap: 2 }}
        >
          {/* Left: spans full height */}
          <div style={{ gridRow: '1 / 3', overflow: 'hidden', position: 'relative' }}>
            <img src={resolveUrl(p0.src)} alt={p0.alt}
              className="absolute inset-0 w-full h-full object-cover" loading="eager" />
          </div>
          {/* Top right */}
          <div style={{ overflow: 'hidden', position: 'relative' }}>
            <img src={resolveUrl(p1.src)} alt={p1.alt}
              className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          </div>
          {/* Bottom right */}
          <div style={{ overflow: 'hidden', position: 'relative' }}>
            <img src={resolveUrl(p2.src)} alt={p2.alt}
              className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          </div>
        </div>

        {/* Mobile: first photo only */}
        <img
          src={resolveUrl(p0.src)}
          alt={p0.alt}
          className="md:hidden absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />

        {/* Scrim */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(0,0,0,0.50)' }}
          aria-hidden="true"
        />

        {/* Accent frame — top-right, desktop only */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute hidden md:block"
          style={{
            right: '6%',
            top: '10%',
            width: '42%',
            height: '68%',
            border: '8px solid var(--color-accent)',
            zIndex: 20,
          }}
        />

        {/* Title panel — anchored bottom-left */}
        <div
          className="absolute bottom-0 left-0"
          style={{
            background: 'var(--color-ink)',
            padding: 'clamp(24px, 4vw, 48px) clamp(24px, 5vw, 56px)',
            maxWidth: 520,
            zIndex: 10,
          }}
        >
          <span className="accent-rule" aria-hidden="true" />
          <p className="label-caps" style={{ color: 'var(--color-accent)', marginBottom: 14 }}>
            {label}
          </p>
          <h1
            className="font-editorial"
            style={{ fontSize: 'clamp(2.75rem, 6vw, 5rem)', color: '#fff', margin: 0 }}
          >
            {title}
          </h1>
        </div>
      </header>

      {/* ── Content area ── */}
      <div style={{ background: 'var(--color-paper)', minHeight: '40vh' }}>
        <div
          style={{
            maxWidth: 860,
            margin: '0 auto',
            padding: 'clamp(48px, 6vw, 96px) clamp(20px, 5vw, 48px)',
          }}
        >
          {blocks.length === 0 ? (
            <div style={{ padding: '40px 0' }}>
              <p className="label-caps" style={{ color: 'var(--color-accent)', marginBottom: 16 }}>
                This page is empty
              </p>
              <p style={{ color: 'var(--color-body-light)', fontSize: 15, lineHeight: 1.65, maxWidth: '50ch' }}>
                Add content by editing{' '}
                <code style={{ fontFamily: 'monospace', background: 'rgba(0,0,0,0.08)', padding: '2px 6px' }}>
                  src/content/{title.toLowerCase()}.js
                </code>
                . Paste text to Claude Code and it will add it for you.
              </p>
            </div>
          ) : (
            blocks.map((block, i) => <Block key={i} block={block} />)
          )}
        </div>
      </div>
    </div>
  )
}
