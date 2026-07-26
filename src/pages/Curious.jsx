import { EditorialPage } from '../components/EditorialPage'
import { page } from '../content/curious'

// The essay blocks in curious.js serve as the thoughts content — no separate section needed.
export function Curious() {
  return <EditorialPage {...page} />
}
