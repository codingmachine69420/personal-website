import { NeonSign } from './NeonSign'
import { interests } from '../content/interests'

export function InterestSigns() {
  return (
    <div className="flex flex-col items-center gap-3">
      <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
        {interests.map((interest, index) => (
          <li key={interest.id}>
            <NeonSign
              href={interest.href}
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
      <p className="font-display text-xs tracking-widest text-white/30 animate-pulse">
        ↑ click them
      </p>
    </div>
  )
}
