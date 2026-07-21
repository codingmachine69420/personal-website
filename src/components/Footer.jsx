import { site } from '../content/site'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-night-950 py-8 text-center text-sm text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4">
        <div className="flex flex-wrap justify-center gap-4">
          {site.social.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-neon-cyan hover:[text-shadow:0_0_8px_var(--color-neon-cyan)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>
        <p>
          &copy; {new Date().getFullYear()} {site.name}. Built with React, Tailwind, and neon.
        </p>
      </div>
    </footer>
  )
}
