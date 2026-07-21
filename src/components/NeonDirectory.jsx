import { Link } from 'react-router-dom'
import { NeonSign } from './NeonSign'
import { directory } from '../content/site'

const chipGlow = {
  magenta: 'border-neon-magenta/60 text-neon-magenta',
  cyan: 'border-neon-cyan/60 text-neon-cyan',
  blue: 'border-neon-blue/60 text-neon-blue',
  amber: 'border-neon-amber/60 text-neon-amber',
  jade: 'border-neon-jade/60 text-neon-jade',
}

// Styled after the stacked building-directory signs outside Mong Kok
// walk-up buildings: one glowing plate per "floor", each linking to a page.
export function NeonDirectory() {
  return (
    <nav aria-label="Site directory" className="mx-auto w-full max-w-xl">
      <ol className="divide-y divide-white/10 rounded-lg border border-white/10 bg-night-900/70 shadow-2xl shadow-black/50">
        {directory.map((item, index) => (
          <li key={item.id}>
            <Link
              to={item.href}
              className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-white/5 focus-visible:bg-white/5 focus-visible:outline-none"
            >
              <span
                aria-hidden="true"
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded border font-display text-xs ${chipGlow[item.color]}`}
              >
                {item.floor}
              </span>
              <span className="min-w-0 flex-1 text-left">
                <NeonSign
                  as="span"
                  color={item.color}
                  delay={0.4 + index * 0.25}
                  className="font-display block text-base sm:text-lg"
                >
                  {item.label}
                </NeonSign>
                <span className="mt-0.5 block truncate text-sm text-slate-400 group-hover:text-slate-300">
                  {item.description}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}
