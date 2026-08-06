// Photo-mosaic banner with a bold title band across the middle — matches
// the "CINEMA RETROSPECTIVE" reference Anson supplied: real photos edge-to-
// edge (no gaps, no rotation), a solid black stripe cutting across with the
// page title in large tracked uppercase, more photos above and below.
// Replaces the old "Photo banner — coming" placeholder on Mindset and
// Projects & Experiences.
//
// `pos` is a hand-picked objectPosition per photo (look at the photo, don't
// default to 'center center') so cropping never hides the actual subject.
// `grow` varies tile width for a mosaic feel instead of a uniform grid.

const BASE = import.meta.env.BASE_URL

function CollageTile({ src, alt, pos, grow = 1 }) {
  return (
    <div style={{ flex: grow, minWidth: 0, overflow: 'hidden' }}>
      <img
        src={`${BASE}${src.replace(/^\//, '')}`}
        alt={alt}
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, display: 'block' }}
        loading="lazy"
      />
    </div>
  )
}

export function CollageBanner({ title, topPhotos, bottomPhotos }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'clamp(240px, 32vw, 380px)', overflow: 'hidden' }}>
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        {topPhotos.map((p) => <CollageTile key={p.src} {...p} />)}
      </div>

      {/* Title band — decorative, not a heading; the real <h1> for the page
          follows below this banner, so this stays a <p> to avoid a second
          top-level heading landing in the accessibility tree. */}
      <div style={{
        background: '#000',
        padding: 'clamp(14px, 2.5vw, 26px) clamp(16px, 3vw, 32px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <p className="font-editorial" style={{ color: '#fff', fontSize: 'clamp(1.375rem, 4.5vw, 2.75rem)', letterSpacing: '0.12em', textAlign: 'center', margin: 0 }}>
          {title}
        </p>
      </div>

      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        {bottomPhotos.map((p) => <CollageTile key={p.src} {...p} />)}
      </div>
    </div>
  )
}
