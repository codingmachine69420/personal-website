import { Routes, Route, Navigate } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Mindset } from './pages/Mindset'
import { ProjectsExperiences } from './pages/ProjectsExperiences'
import { Gallery } from './pages/Gallery'
import { Interests } from './pages/Interests'
import { Cinema } from './pages/Cinema'
import { WritingPost } from './pages/WritingPost'
import { NotFound } from './pages/NotFound'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />

          {/* Primary pages */}
          <Route path="mindset"  element={<Mindset />} />
          <Route path="projects" element={<ProjectsExperiences />} />
          <Route path="gallery"  element={<Gallery />} />
          <Route path="interests"        element={<Interests />} />
          <Route path="interests/cinema" element={<Cinema />} />

          {/* Legacy writing post route */}
          <Route path="writing/:slug" element={<WritingPost />} />

          {/* Old routes — redirect to nearest equivalent */}
          <Route path="driven"   element={<Navigate to="/"         replace />} />
          <Route path="curious"  element={<Navigate to="/mindset"  replace />} />
          <Route path="attitude" element={<Navigate to="/mindset"  replace />} />
          <Route path="writing"  element={<Navigate to="/mindset"  replace />} />
          <Route path="work"     element={<Navigate to="/projects" replace />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </MotionConfig>
  )
}

export default App
