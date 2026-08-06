// A loose photo collage used in place of the "Photo banner — coming"
// placeholder on Mindset and Projects & Experiences. Deliberately not a grid:
// each photo has its own size, rotation, vertical offset, and shadow depth
// ("elevation") so it reads as a scattered stack of real prints rather than
// a blocky tile row. `pos` is a hand-picked objectPosition per photo so
// cropping never hides the actual subject — pick it by looking at the photo,
// not by guessing "center center".

const BASE = import.meta.env.BASE_URL

function CollagePhoto({ src, alt, pos, width, height, rotate, lift, shadow, accent }) {
  return (
    <div
      style={{
        position: 'relative',
        flexShrink: 0,
        width,
        height,
        transform: `translateY(${lift}px) rotate(${rotate}deg)`,
        border: `4px solid ${accent ? 'var(--color-accent)' : 'var(--color-paper)'}`,
        boxShadow: shadow,
      }}
    >
      <img
        src={`${BASE}${src.replace(/^\//, '')}`}
        alt={alt}
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, display: 'block' }}
        loading="lazy"
      />
    </div>
  )
}

export function CollageBanner({ photos }) {
  return (
    <div
      style={{
        height: 'clamp(200px, 28vw, 340px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(10px, 2vw, 26px)',
        padding: '0 clamp(20px, 4vw, 48px)',
        overflow: 'hidden',
        background: '#1a1a1a',
      }}
    >
      {photos.map((photo) => (
        <CollagePhoto key={photo.src} {...photo} />
      ))}
    </div>
  )
}
