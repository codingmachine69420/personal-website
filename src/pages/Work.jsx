import { PageHeader } from '../components/PageHeader'
import { bio, experience, education, resumeUrl } from '../content/work'

export function Work() {
  return (
    <div className="pb-24">
      <PageHeader eyebrow="01 — Directory" title="Work & Experience" color="magenta" />

      <div className="mx-auto max-w-3xl px-4">
        <p className="text-lg text-slate-300">{bio}</p>

        <a
          href={resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="glow-box-magenta neon-magenta font-display mt-6 inline-block rounded border border-neon-magenta/50 px-6 py-3 text-sm transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
        >
          Download Resume (PDF)
        </a>

        <section className="mt-16" aria-labelledby="experience-heading">
          <h2 id="experience-heading" className="neon-cyan font-display mb-6 text-xl">
            Experience
          </h2>
          <ol className="space-y-10 border-l border-white/10 pl-6">
            {experience.map((role) => (
              <li key={`${role.org}-${role.role}`} className="relative">
                <span
                  aria-hidden="true"
                  className="glow-box-cyan absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-neon-cyan"
                />
                <h3 className="text-lg font-semibold text-white">{role.role}</h3>
                <p className="text-sm text-slate-400">
                  {role.org} &middot; {role.period} &middot; {role.location}
                </p>
                <p className="mt-2 text-slate-300">{role.summary}</p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-slate-400">
                  {role.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16" aria-labelledby="education-heading">
          <h2 id="education-heading" className="neon-cyan font-display mb-6 text-xl">
            Education
          </h2>
          <ul className="space-y-6">
            {education.map((item) => (
              <li key={item.school}>
                <h3 className="text-lg font-semibold text-white">{item.school}</h3>
                <p className="text-sm text-slate-400">
                  {item.program} &middot; {item.period}
                </p>
                <p className="mt-1 text-slate-300">{item.notes}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
