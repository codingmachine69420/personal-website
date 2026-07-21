const GLOW_CLASS = {
  magenta: 'neon-magenta',
  cyan: 'neon-cyan',
  blue: 'neon-blue',
  amber: 'neon-amber',
  jade: 'neon-jade',
}

export function PageHeader({ eyebrow, title, color = 'cyan', description }) {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-10 pt-16 text-center sm:pt-24">
      {eyebrow ? (
        <p className="mb-2 text-sm uppercase tracking-widest text-slate-500">{eyebrow}</p>
      ) : null}
      <h1 className={`font-display text-3xl sm:text-5xl ${GLOW_CLASS[color] ?? GLOW_CLASS.cyan}`}>{title}</h1>
      {description ? <p className="mt-4 text-lg text-slate-300">{description}</p> : null}
    </div>
  )
}
