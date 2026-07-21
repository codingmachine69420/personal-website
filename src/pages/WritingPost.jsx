import { Link, useParams } from 'react-router-dom'
import { posts } from '../content/writing'

const dateFormatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

export function WritingPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="neon-magenta font-display text-3xl">Post not found</h1>
        <p className="mt-4 text-slate-300">That one doesn't exist (yet).</p>
        <Link to="/writing" className="neon-cyan mt-6 inline-block">
          &larr; Back to Writing &amp; Ideas
        </Link>
      </div>
    )
  }

  return (
    <article className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:pt-24">
      <Link to="/writing" className="text-sm text-slate-400 hover:text-neon-cyan">
        &larr; Back to Writing &amp; Ideas
      </Link>
      <p className="mt-6 text-sm text-slate-500">{dateFormatter.format(new Date(post.date))}</p>
      <h1 className="neon-cyan font-display mt-1 text-3xl sm:text-4xl">{post.title}</h1>
      <div className="prose-invert mt-8 space-y-4 text-lg leading-relaxed text-slate-300">
        {post.body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </article>
  )
}
