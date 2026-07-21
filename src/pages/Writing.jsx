import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { posts } from '../content/writing'

const dateFormatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

export function Writing() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="02 — Directory"
        title="Writing & Ideas"
        color="cyan"
        description="Market writeups, notes, and things I've been thinking about."
      />

      <div className="mx-auto max-w-3xl px-4">
        <ul className="divide-y divide-white/10 rounded-lg border border-white/10 bg-night-900/50">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                to={`/writing/${post.slug}`}
                className="block px-6 py-6 transition-colors hover:bg-white/5 focus-visible:bg-white/5 focus-visible:outline-none"
              >
                <p className="text-sm text-slate-500">{dateFormatter.format(new Date(post.date))}</p>
                <h2 className="neon-cyan font-display mt-1 text-xl">{post.title}</h2>
                <p className="mt-2 text-slate-300">{post.excerpt}</p>
                {post.tags?.length ? (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-slate-400"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
