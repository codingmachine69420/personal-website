import { PageHeader } from '../components/PageHeader'
import { photosByYear } from '../content/gallery'

// Flatten all photos from all years into one array — no year breaks
const allPhotos = photosByYear.flatMap(({ photos }) => photos)

// Deterministic tilt per position — scrapbook, not a grid. Small enough
// that rotated frames never collide inside the masonry columns.
const TILTS = [-1.3, 0.9, -0.6, 1.2, -1.0, 0.5, -1.4, 0.8, -0.4, 1.1]

export function Gallery() {
  return (
    <div>
      <PageHeader
        eyebrow="04 — Gallery"
        title="Gallery"
        description="Photos — travel and elsewhere."
      />

      <div style={{ background: '#0B0B0B', padding: 'clamp(24px, 4vw, 56px)' }}>
        <div
          className="columns-1 sm:columns-2 md:columns-3"
          style={{ columnGap: 'clamp(24px, 3vw, 40px)' }}
        >
          {allPhotos.map((photo, i) => (
            <figure
              key={photo.src}
              className="film-frame"
              style={{
                breakInside: 'avoid',
                marginBottom: 'clamp(32px, 4vw, 52px)',
                transform: `rotate(${TILTS[i % TILTS.length]}deg)`,
              }}
            >
              {/* Top sprocket row */}
              <div className="film-sprockets" aria-hidden="true" />

              {/* The gate — photo sits flush between the perforations */}
              <div style={{ padding: '0 10px' }}>
                <img
                  src={`${import.meta.env.BASE_URL}${photo.src.replace(/^\//, '')}`}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  style={{
                    width: '100%',
                    height: 'auto',
                    aspectRatio: `${photo.width} / ${photo.height}`,
                    display: 'block',
                  }}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Bottom sprocket row */}
              <div className="film-sprockets" aria-hidden="true" />

              {/* Typed label — always visible */}
              <figcaption className="film-label">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  )
}
