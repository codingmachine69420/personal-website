import { useEffect, useState } from 'react'
import { HomeSectionDriven } from '../components/HomeSectionDriven'
import { HomeSectionCurious } from '../components/HomeSectionCurious'
import { HomeSectionAttitude } from '../components/HomeSectionAttitude'

const BASE = import.meta.env.BASE_URL

// Tracks the md breakpoint so eager-loading is limited to whichever
// hero variant is actually visible — avoids fetching both on load.
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches,
  )
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)')
    const handler = (e) => setIsDesktop(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])
  return isDesktop
}

const P = {
  hike:      `${BASE}images/gallery/hiking-hong-kong.jpeg`,
  toronto:   `${BASE}images/gallery/toronto-skyline.jpeg`,
  parthenon: `${BASE}images/gallery/parthenon-athens.jpeg`,
  jump:      `${BASE}images/gallery/santorini-jump.jpeg`,
  sunset:    `${BASE}images/gallery/santorini-sunset.jpeg`,
  hkNight:   `${BASE}images/gallery/hong-kong-harbour-night.jpeg`,
}

const G = 20 // gutter between sections

export function Home() {
  const isDesktop = useIsDesktop()
  return (
    <div style={{ background: '#000' }}>

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

      <HomeSectionDriven P={P} isDesktop={isDesktop} G={G} />
      <HomeSectionCurious P={P} isDesktop={isDesktop} G={G} />
      <HomeSectionAttitude P={P} />
    </div>
  )
}
