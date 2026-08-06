import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/personal-website/',
  resolve: {
    // '@/' alias so components pulled from the shadcn-compatible registries
    // (Motion Primitives, Watermelon UI — see components.json) resolve their
    // internal imports (e.g. '@/lib/utils') without hand-editing each file.
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
