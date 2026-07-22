import { PageHeader } from '../components/PageHeader'
import { photosByYear } from '../content/gallery'

// Flatten all photos from all years into one array — no year breaks
const allPhotos = photosByYear.flatMap(({ photos }) => photos)

export function Gallery() {
  return (
    <div>
      <PageHeader
        eyebrow="04 — Gallery"
        title="Gallery"
        description="Photos — travel and elsewhere."
      />

      <div style={{ background: '#000', padding: 4 }}>
        <div
          style={{
            columns: 3,
            columnGap: 4,
          }}
          className="sm:columns-3 columns-1 md:columns-4"
        >
          {allPhotos.map((photo) => (
            <figure
              key={photo.src}
              style={{
                breakInside: 'avoid',
                marginBottom: 4,
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
              }}
              className="gallery-item"
            >
              <img
                src={`${import.meta.env.BASE_URL}${photo.src.replace(/^\//, '')}`}
                alt={photo.alt}
                style={{ width: '100%', display: 'block' }}
                loading="lazy"
              />
              {/* Caption on hover */}
              <figcaption
                className="gallery-caption"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'rgba(0,0,0,0.72)',
                  color: '#fff',
                  fontSize: 11,
                  fontFamily: 'var(--font-body)',
                  letterSpacing: '0.04em',
                  padding: '8px 12px',
                  opacity: 0,
                  transition: 'opacity 0.2s',
                  pointerEvents: 'none',
                }}
              >
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  )
}
