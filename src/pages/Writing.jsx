import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { posts } from '../content/writing'

const dateFormatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

export function Writing() {
  return (
    <div>
      <PageHeader
        eyebrow="02 — Writing & Ideas"
        title="Writing & Ideas"
        description="Market writeups, notes, and things I've been thinking about."
      />

      <div style={{ background: 'var(--color-paper)', padding: 'clamp(32px, 5vw, 64px) clamp(20px, 5vw, 48px) 96px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          {posts.length === 0 ? (
            <p style={{ color: 'var(--color-body-light)', fontSize: 15 }}>No posts yet — paste text to Claude Code to add one.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, borderTop: '1px solid rgba(28,28,28,0.12)' }}>
              {posts.map((post) => (
                <li key={post.slug} style={{ borderBottom: '1px solid rgba(28,28,28,0.12)' }}>
                  <Link
                    to={`/writing/${post.slug}`}
                    style={{ display: 'block', padding: '28px 0', textDecoration: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    <p className="label-caps" style={{ color: 'var(--color-body-light)', fontSize: 11, marginBottom: 8 }}>
                      {dateFormatter.format(new Date(post.date))}
                      {post.tags?.length ? ` — ${post.tags.join(', ')}` : ''}
                    </p>
                    <h2
                      className="font-editorial"
                      style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--color-ink)', marginBottom: 10 }}
                    >
                      {post.title}
                    </h2>
                    <p style={{ color: 'var(--color-body-light)', fontSize: 15, lineHeight: 1.65, maxWidth: '55ch' }}>
                      {post.excerpt}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
