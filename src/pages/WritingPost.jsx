import { Link, useParams } from 'react-router-dom'
import { posts } from '../content/writing'

const dateFormatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

export function WritingPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div style={{ background: 'var(--color-paper)', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 20px', textAlign: 'center' }}>
        <h1 className="font-editorial" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-ink)', marginBottom: 16 }}>
          Post not found
        </h1>
        <p style={{ color: 'var(--color-body-light)', marginBottom: 32 }}>That one doesn't exist yet.</p>
        <Link to="/writing" className="cta-link" style={{ background: 'var(--color-ink)', color: '#fff' }}>
          &larr; Back to Writing
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Dark header */}
      <div style={{ background: 'var(--color-ink)', padding: 'clamp(40px, 6vw, 80px) clamp(20px, 5vw, 48px) 0' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', paddingBottom: 'clamp(32px, 4vw, 56px)' }}>
          <Link
            to="/writing"
            className="label-caps"
            style={{ color: 'var(--color-accent)', textDecoration: 'none', display: 'inline-block', marginBottom: 24 }}
          >
            &larr; Writing & Ideas
          </Link>
          <span
            style={{ display: 'block', height: 8, background: 'var(--color-accent)', width: 64, marginBottom: 20 }}
            aria-hidden="true"
          />
          <p className="label-caps" style={{ color: 'var(--color-body-dark)', marginBottom: 14 }}>
            {dateFormatter.format(new Date(post.date))}
            {post.tags?.length ? ` — ${post.tags.join(', ')}` : ''}
          </p>
          <h1 className="font-editorial" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#fff' }}>
            {post.title}
          </h1>
        </div>
      </div>

      {/* Body */}
      <div style={{ background: 'var(--color-paper)', padding: 'clamp(40px, 6vw, 80px) clamp(20px, 5vw, 48px) 96px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          {post.body.map((paragraph, i) => (
            <p key={i} style={{ color: 'var(--color-body-light)', fontSize: 15, lineHeight: 1.65, marginBottom: 24 }}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
