// Wraps a copy of whatever sits above it (typically a skyline) and mirrors
// it vertically, faded and blurred, to suggest a reflection on a wet street
// below the hero. Purely decorative, so it's hidden from assistive tech.
export function WetStreetReflection({ children, className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`street-reflection pointer-events-none absolute inset-x-0 top-full h-full ${className}`}
    >
      {children}
    </div>
  )
}
