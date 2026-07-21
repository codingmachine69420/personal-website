import { useEffect, useState } from 'react'

// CSS in index.css already collapses animation/transition durations when
// prefers-reduced-motion is set. This hook is for the JS-driven motion
// (Framer Motion variants, scroll parallax) that CSS alone can't touch.
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const listener = (event) => setReduced(event.matches)
    query.addEventListener('change', listener)
    return () => query.removeEventListener('change', listener)
  }, [])

  return reduced
}
