import { EditorialPage } from '../components/EditorialPage'
import { HomeSectionJourneys } from '../components/HomeSectionJourneys'
import { page } from '../content/curious'

export function Curious() {
  return (
    <div>
      <EditorialPage {...page} />
      <HomeSectionJourneys />
    </div>
  )
}
