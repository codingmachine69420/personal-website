import { PageHeader } from '../components/PageHeader'
import { photosByYear } from '../content/gallery'

export function Gallery() {
  return (
    <div>
      <PageHeader
        eyebrow="04 — Gallery"
        title="Gallery"
        description="Photos — travel and elsewhere."
      />

      <div style={{ background: 'var(--color-paper)', padding: 'clamp(32px, 5vw, 64px) clamp(20px, 5vw, 48px) 96px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 64 }}>
          {photosByYear.map(({ year, photos }) => (
            <section key={year}>
              {/* Year divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
                <span
                  className="font-editorial"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-ink)', lineHeight: 1 }}
                >
                  {year}
                </span>
                <div style={{ flex: 1, height: 2, background: 'var(--color-accent)' }} aria-hidden="true" />
              </div>

              {/* Masonry grid */}
              <div style={{ columns: '1', columnGap: 16 }} className="sm:columns-2 lg:columns-3">
                {photos.map((photo) => (
                  <figure
                    key={photo.src}
                    style={{
                      breakInside: 'avoid',
                      marginBottom: 16,
                      background: 'var(--color-ink)',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}${photo.src.replace(/^\//, '')}`}
                      alt={photo.alt}
                      style={{ width: '100%', display: 'block' }}
                      loading="lazy"
                    />
                    <figcaption
                      className="label-caps"
                      style={{ color: 'var(--color-body-dark)', padding: '10px 14px', fontSize: 10 }}
                    >
                      {photo.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
