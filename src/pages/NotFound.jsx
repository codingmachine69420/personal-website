import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-32 text-center">
      <h1 className="neon-magenta font-display animate-buzz text-5xl">SIGN OUT</h1>
      <p className="mt-6 text-lg text-slate-300">This page doesn't exist.</p>
      <Link to="/" className="neon-cyan mt-8 inline-block">
        &larr; Back home
      </Link>
    </div>
  )
}
