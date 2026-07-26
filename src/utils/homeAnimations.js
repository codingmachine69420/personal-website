export const EASE = [0.16, 1, 0.3, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.75, ease: EASE } },
}
export const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show:   { opacity: 1, scale: 1,  transition: { duration: 0.85, ease: EASE } },
}
