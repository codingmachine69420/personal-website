import { Link } from 'react-router-dom'
import { site, directory } from '../content/site'
import { ParallaxPhoto } from '../components/ParallaxPhoto'

const jumpPhoto = `${import.meta.env.BASE_URL}images/gallery/santorini-jump.jpeg`

const primary   = directory.slice(0, 2) // Mindset, Projects & Experiences
const secondary = directory.slice(2)    // Interests, Photo Gallery

export function Home() {
  return (
    <div style={{ background: '#000', minHeight: '100vh' }}>

      {/* ── WIP notice ── */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '28px 24px 0' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          background: '#c01400',
          border: '1.5px solid rgba(255,255,255,0.2)',
          padding: '9px 22px 11px',
          transform: 'rotate(-1deg)',
        }}>
          <span style={{ color: '#fff', fontSize: '1rem' }}>⚠</span>
          <span className="font-editorial" style={{ color: '#fff', fontSize: '1rem', letterSpacing: '0.08em' }}>
            Work in Progress
          </span>
        </div>
      </div>

      {/* ── Hero (desktop): text left, jump photo bleeding in on the right ── */}
      <div className="hidden md:flex" style={{ minHeight: 560 }}>
        <div style={{
          flex: '1 1 480px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px) clamp(48px, 6vw, 72px) clamp(32px, 6vw, 64px)',
        }}>
          <div style={{ width: 56, height: 4, background: 'var(--color-accent)', marginBottom: 28 }} aria-hidden="true" />
          <h1
            className="font-editorial"
            style={{ fontSize: 'clamp(3.5rem, 7vw, 7rem)', color: '#fff', marginBottom: 24, lineHeight: 0.92 }}
          >
            Discovering<br />Anson
          </h1>
          <p style={{
            color: 'var(--color-body-dark)',
            fontSize: '1.125rem',
            lineHeight: 1.7,
            maxWidth: '46ch',
            fontFamily: 'var(--font-reading)',
          }}>
            Hi, I'm Anson and I am 21. I will be great. This website represents who I am and the things I do — it also is the start of a journey into something bigger than I could imagine right now.
          </p>
          <p className="label-caps" style={{ color: 'var(--color-accent)', marginTop: 20, fontSize: '0.8125rem' }}>
            {site.tagline}
          </p>
        </div>

        <div style={{ flex: '1 1 480px', position: 'relative', overflow: 'hidden' }}>
          <ParallaxPhoto
            src={jumpPhoto}
            alt="Anson mid-air, jumping off a sailboat into the Santorini caldera"
            loading="eager"
            strength={8}
            pos="center 72%"
          />
          {/* Fade the photo's inner edge to black so it bleeds out of the text panel rather than sitting in a hard tile */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #000 0%, rgba(0,0,0,0.55) 22%, transparent 55%)' }} aria-hidden="true" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 26%, transparent 74%, rgba(0,0,0,0.55) 100%)' }} aria-hidden="true" />
        </div>
      </div>

      {/* ── Hero (mobile): photo strip fading down into the text ── */}
      <div className="md:hidden" style={{ position: 'relative' }}>
        <div style={{ position: 'relative', height: '46vh', minHeight: 320, overflow: 'hidden' }}>
          <ParallaxPhoto
            src={jumpPhoto}
            alt="Anson mid-air, jumping off a sailboat into the Santorini caldera"
            loading="eager"
            strength={5}
            pos="center 72%"
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #000 0%, rgba(0,0,0,0.35) 45%, transparent 75%)' }} aria-hidden="true" />
        </div>
        <div style={{
          padding: '0 clamp(20px, 5vw, 48px) clamp(48px, 6vw, 72px)',
          marginTop: -8,
        }}>
          <div style={{ width: 56, height: 4, background: 'var(--color-accent)', marginBottom: 28 }} aria-hidden="true" />
          <h1
            className="font-editorial"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)', color: '#fff', marginBottom: 24, lineHeight: 0.92 }}
          >
            Discovering<br />Anson
          </h1>
          <p style={{
            color: 'var(--color-body-dark)',
            fontSize: '1.125rem',
            lineHeight: 1.7,
            maxWidth: '52ch',
            fontFamily: 'var(--font-reading)',
          }}>
            Hi, I'm Anson and I am 21. I will be great. This website represents who I am and the things I do — it also is the start of a journey into something bigger than I could imagine right now.
          </p>
          <p className="label-caps" style={{ color: 'var(--color-accent)', marginTop: 20, fontSize: '0.8125rem' }}>
            {site.tagline}
          </p>
        </div>
      </div>

      {/* ── Primary nav cards ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 2,
        borderTop: '2px solid rgba(255,255,255,0.06)',
      }}>
        {primary.map((item) => (
          <Link
            key={item.id}
            to={item.href}
            style={{ textDecoration: 'none', display: 'block' }}
          >
            <div
              className="nav-card"
              style={{
                background: 'var(--color-ink)',
                padding: 'clamp(40px, 6vw, 72px) clamp(24px, 4vw, 48px)',
              }}
            >
              <p className="label-caps" style={{ color: 'var(--color-accent)', marginBottom: 20 }}>
                0{item.floor}
              </p>
              <h2
                className="font-editorial"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', color: '#fff', marginBottom: 16 }}
              >
                {item.label}
              </h2>
              <p style={{ color: 'var(--color-body-dark)', fontSize: '0.9375rem', lineHeight: 1.65, maxWidth: '36ch', whiteSpace: 'pre-line' }}>
                {item.description}
              </p>
              <p className="label-caps" style={{ color: 'var(--color-accent)', marginTop: 32, fontSize: '0.75rem' }}>
                Explore →
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Secondary links ── */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        flexWrap: 'wrap',
      }}>
        {secondary.map((item) => (
          <Link
            key={item.id}
            to={item.href}
            style={{ textDecoration: 'none', flex: '1 1 200px' }}
          >
            <div
              style={{
                padding: 'clamp(24px, 4vw, 40px) clamp(24px, 4vw, 48px)',
                borderRight: '1px solid rgba(255,255,255,0.06)',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.6'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <p className="label-caps" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 10, fontSize: '0.75rem' }}>
                0{item.floor}
              </p>
              <p className="label-caps" style={{ color: '#fff', marginBottom: 8 }}>
                {item.label}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', fontFamily: 'var(--font-reading)' }}>
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

    </div>
  )
}
