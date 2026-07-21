import { PageHeader } from '../components/PageHeader'
import { photos } from '../content/gallery'

export function Gallery() {
  return (
    <div className="pb-24">
      <PageHeader eyebrow="04 — Directory" title="Gallery" color="amber" description="Photos — travel and elsewhere." />

      <div className="mx-auto max-w-5xl columns-1 gap-4 px-4 sm:columns-2 lg:columns-3">
        {photos.map((photo) => (
          <figure
            key={photo.src}
            className="mb-4 break-inside-avoid overflow-hidden rounded-lg border border-white/10 bg-night-900/50"
          >
            <img src={photo.src} alt={photo.alt} className="w-full" loading="lazy" />
            <figcaption className="px-3 py-2 text-sm text-slate-400">{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
