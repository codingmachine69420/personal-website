import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Work } from './pages/Work'
import { Writing } from './pages/Writing'
import { WritingPost } from './pages/WritingPost'
import { Projects } from './pages/Projects'
import { Gallery } from './pages/Gallery'
import { Interests } from './pages/Interests'
import { NotFound } from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="work" element={<Work />} />
        <Route path="writing" element={<Writing />} />
        <Route path="writing/:slug" element={<WritingPost />} />
        <Route path="projects" element={<Projects />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="interests" element={<Interests />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
