import { NeonSign } from './NeonSign'
import { interests } from '../content/interests'

// The row of neon interest signs (golf / gaming / film / markets) that
// ignite in sequence on load. Purely decorative teasers on the landing
// page — the full write-ups live on /interests.
export function InterestSigns() {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
      {interests.map((interest, index) => (
        <li key={interest.id}>
          <NeonSign
            as="span"
            href="/interests"
            color={interest.color}
            buzz={interest.buzz}
            delay={0.3 + index * 0.35}
            className="font-display text-lg sm:text-2xl"
          >
            {interest.label}
          </NeonSign>
        </li>
      ))}
    </ul>
  )
}
