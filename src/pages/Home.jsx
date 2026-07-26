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
      <HomeSectionDriven P={P} isDesktop={isDesktop} G={G} />
      <HomeSectionCurious P={P} isDesktop={isDesktop} G={G} />
      <HomeSectionAttitude P={P} />
    </div>
  )
}
