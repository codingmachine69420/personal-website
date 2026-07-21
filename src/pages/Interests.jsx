import { PageHeader } from '../components/PageHeader'
import { NeonSign } from '../components/NeonSign'
import { interests } from '../content/interests'

export function Interests() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="05 — Directory"
        title="Interests"
        color="jade"
        description="The personal side: golf, PC gaming, film, markets."
      />

      <div className="mx-auto max-w-3xl space-y-14 px-4">
        {interests.map((interest, index) => (
          <section key={interest.id} aria-labelledby={`${interest.id}-heading`}>
            <NeonSign
              as="h2"
              id={`${interest.id}-heading`}
              color={interest.color}
              buzz={interest.buzz}
              delay={index * 0.2}
              className="font-display text-2xl"
            >
              {interest.label}
            </NeonSign>
            <p className="mt-3 text-lg text-slate-300">{interest.blurb}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
