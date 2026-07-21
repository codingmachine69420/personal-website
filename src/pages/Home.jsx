import { motion } from 'framer-motion'
import { site } from '../content/site'
import { HongKongSkyline, TorontoSkyline } from '../components/skyline'
import { ParallaxLayer } from '../components/ParallaxLayer'
import { WetStreetReflection } from '../components/WetStreetReflection'
import { InterestSigns } from '../components/InterestSigns'
import { NeonDirectory } from '../components/NeonDirectory'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export function Home() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <>
      <section className="relative isolate min-h-[560px] overflow-hidden bg-night-950 pb-28 pt-20 sm:min-h-[680px] sm:pb-36 sm:pt-28">
        {/* Night-sky ambience */}
        <div className="absolute inset-0 -z-30 bg-gradient-to-b from-night-950 via-night-900 to-night-950" />
        <div className="absolute inset-0 -z-30 bg-[radial-gradient(ellipse_60%_40%_at_50%_15%,rgba(77,125,255,0.12),transparent)]" />
        {/* Contrast safeguard: recede the skyline a touch behind the headline/tagline */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_38%,rgba(5,6,13,0.6),transparent_70%)]"
        />

        {/* Hong Kong skyline: farther back, dimmer, slower parallax */}
        <ParallaxLayer speed={reducedMotion ? 0 : 0.15} className="absolute inset-x-0 bottom-0 -z-20 h-[42vh] opacity-40">
          <HongKongSkyline className="h-full w-full" />
        </ParallaxLayer>

        {/* Toronto skyline: closer, brighter, faster parallax, with a street-level reflection */}
        <ParallaxLayer speed={reducedMotion ? 0 : 0.4} className="absolute inset-x-0 bottom-0 -z-10 h-[36vh]">
          <div className="relative h-full w-full">
            <TorontoSkyline className="h-full w-full" />
            <WetStreetReflection className="h-16 sm:h-24">
              <TorontoSkyline className="h-full w-full" />
            </WetStreetReflection>
          </div>
        </ParallaxLayer>

        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-8 px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.8 }}
            className="neon-cyan font-display text-4xl leading-tight sm:text-6xl"
          >
            {site.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.8, delay: 0.15 }}
            className="max-w-xl text-lg text-slate-300"
          >
            {site.tagline}
          </motion.p>
          <InterestSigns />
        </div>
      </section>

      <section className="relative px-4 pb-24 pt-4 sm:-mt-12">
        <NeonDirectory />
      </section>
    </>
  )
}
