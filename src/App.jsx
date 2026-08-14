import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { Layout } from './components/Layout'

// Route-level code splitting — each page loads only when first visited
const Home                = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })))
const Mindset             = lazy(() => import('./pages/Mindset').then(m => ({ default: m.Mindset })))
const ProjectsExperiences = lazy(() => import('./pages/ProjectsExperiences').then(m => ({ default: m.ProjectsExperiences })))
const Gallery             = lazy(() => import('./pages/Gallery').then(m => ({ default: m.Gallery })))
const Interests           = lazy(() => import('./pages/Interests').then(m => ({ default: m.Interests })))
const Cinema              = lazy(() => import('./pages/Cinema').then(m => ({ default: m.Cinema })))
const ResearchPapers      = lazy(() => import('./pages/ResearchPapers').then(m => ({ default: m.ResearchPapers })))
const WritingPost         = lazy(() => import('./pages/WritingPost').then(m => ({ default: m.WritingPost })))
const NotFound            = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })))

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Suspense fallback={<div style={{ background: 'var(--color-black, #000)', minHeight: '100vh' }} />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />

            {/* Primary pages */}
            <Route path="mindset"          element={<Mindset />} />
            <Route path="projects"         element={<ProjectsExperiences />} />
            <Route path="gallery"          element={<Gallery />} />
            <Route path="interests"        element={<Interests />} />
            <Route path="interests/cinema" element={<Cinema />} />
            <Route path="interests/papers" element={<ResearchPapers />} />

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
      </Suspense>
    </MotionConfig>
  )
}

export default App
