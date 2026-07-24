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
        <div className="columns-1 sm:columns-3 md:columns-4" style={{ columnGap: 4 }}>
          {allPhotos.map((photo) => (
            <figure
              key={photo.src}
              tabIndex={0}
              style={{ breakInside: 'avoid', marginBottom: 4, position: 'relative', overflow: 'hidden' }}
              className="gallery-item"
            >
              <img
                src={`${import.meta.env.BASE_URL}${photo.src.replace(/^\//, '')}`}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                style={{ width: '100%', height: 'auto', aspectRatio: `${photo.width} / ${photo.height}`, display: 'block' }}
                loading="lazy"
                decoding="async"
              />
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
                  transition: 'opacity 0.2s',
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
