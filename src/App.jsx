import { Routes, Route, Navigate } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Work } from './pages/Work'
import { Writing } from './pages/Writing'
import { WritingPost } from './pages/WritingPost'
import { Projects } from './pages/Projects'
import { Gallery } from './pages/Gallery'
import { Interests } from './pages/Interests'
import { Cinema } from './pages/Cinema'
import { NotFound } from './pages/NotFound'
import { Driven } from './pages/Driven'
import { Curious } from './pages/Curious'
import { Attitude } from './pages/Attitude'

function App() {
  return (
    <MotionConfig reducedMotion="user">
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        {/* Old routes redirect to their new homes */}
        <Route path="work" element={<Navigate to="/driven" replace />} />
        <Route path="writing" element={<Navigate to="/curious" replace />} />
        <Route path="writing/:slug" element={<WritingPost />} />
        <Route path="projects" element={<Navigate to="/attitude" replace />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="interests" element={<Interests />} />
        <Route path="interests/cinema" element={<Cinema />} />
        <Route path="driven" element={<Driven />} />
        <Route path="curious" element={<Curious />} />
        <Route path="attitude" element={<Attitude />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    </MotionConfig>
  )
}

export default App
