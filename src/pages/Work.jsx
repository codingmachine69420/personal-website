import { PageHeader } from '../components/PageHeader'
import { bio, experience, education, leadership, competitions, resumeUrl } from '../content/work'

const sectionHeading = (text, id) => (
  <h2
    id={id}
    className="font-editorial"
    style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--color-ink)', marginBottom: 32, paddingTop: 64 }}
  >
    {text}
  </h2>
)

export function Work() {
  return (
    <div>
      <PageHeader eyebrow="01 — Work & Experience" title="Work & Experience" />

      <div style={{ background: 'var(--color-paper)', padding: 'clamp(32px, 5vw, 64px) clamp(20px, 5vw, 48px) 96px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>

          <p style={{ color: 'var(--color-body-light)', fontSize: 15, lineHeight: 1.65, maxWidth: '60ch', marginBottom: 32 }}>
            {bio}
          </p>

          <a
            href={`${import.meta.env.BASE_URL}${resumeUrl.replace(/^\//, '')}`}
            target="_blank"
            rel="noreferrer"
            className="cta-link"
          >
            Download Resume (PDF)
          </a>

          {sectionHeading('Experience', 'experience-heading')}
          <ol style={{ borderLeft: '2px solid rgba(28,28,28,0.12)', paddingLeft: 32, display: 'flex', flexDirection: 'column', gap: 40 }}>
            {experience.map((role) => (
              <li key={`${role.org}-${role.role}`} style={{ position: 'relative' }}>
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: -40,
                    top: 6,
                    width: 10,
                    height: 10,
                    background: 'var(--color-accent)',
                    display: 'block',
                  }}
                />
                <h3 style={{ fontSize: 17, fontWeight: 600, color: 'var(--color-ink)', marginBottom: 4 }}>
                  {role.role}
                </h3>
                <p className="label-caps" style={{ color: 'var(--color-body-light)', fontSize: 11, marginBottom: 8 }}>
                  {role.org} &middot; {role.period} &middot; {role.location}
                </p>
                <p style={{ color: 'var(--color-body-light)', fontSize: 15, lineHeight: 1.65, marginBottom: 10 }}>
                  {role.summary}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {role.bullets.map((bullet, i) => (
                    <li key={i} style={{ display: 'flex', gap: 10, color: 'var(--color-body-light)', fontSize: 15, lineHeight: 1.65 }}>
                      <span style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: 2 }}>▸</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          {sectionHeading('Leadership & Extracurriculars', 'leadership-heading')}
          <ol style={{ borderLeft: '2px solid rgba(28,28,28,0.12)', paddingLeft: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
            {leadership.map((item) => (
              <li key={`${item.org}-${item.role}`} style={{ position: 'relative' }}>
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: -40,
                    top: 6,
                    width: 10,
                    height: 10,
                    background: 'var(--color-accent)',
                    display: 'block',
                  }}
                />
                <h3 style={{ fontSize: 17, fontWeight: 600, color: 'var(--color-ink)', marginBottom: 4 }}>
                  {item.role}
                </h3>
                <p className="label-caps" style={{ color: 'var(--color-body-light)', fontSize: 11, marginBottom: 8 }}>
                  {item.org} &middot; {item.period}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {item.bullets.map((bullet, i) => (
                    <li key={i} style={{ display: 'flex', gap: 10, color: 'var(--color-body-light)', fontSize: 15, lineHeight: 1.65 }}>
                      <span style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: 2 }}>▸</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          {sectionHeading('Case Competitions', 'competitions-heading')}
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {competitions.map((c, i) => (
              <li key={i} style={{ display: 'flex', gap: 12, color: 'var(--color-body-light)', fontSize: 15, lineHeight: 1.65 }}>
                <span style={{ color: 'var(--color-accent)', flexShrink: 0 }}>▸</span>
                {c}
              </li>
            ))}
          </ul>

          {sectionHeading('Education', 'education-heading')}
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 24 }}>
            {education.map((item) => (
              <li key={item.school}>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: 'var(--color-ink)', marginBottom: 4 }}>
                  {item.school}
                </h3>
                <p className="label-caps" style={{ color: 'var(--color-body-light)', fontSize: 11, marginBottom: 8 }}>
                  {item.program} &middot; {item.period}
                </p>
                <p style={{ color: 'var(--color-body-light)', fontSize: 15, lineHeight: 1.65 }}>
                  {item.notes}
                </p>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </div>
  )
}
