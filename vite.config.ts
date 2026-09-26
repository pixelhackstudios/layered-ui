import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // The site uses hash routing, so a subpath deploy (e.g. GitHub Pages at
  // /layered-ui/) only needs the asset base: SITE_BASE=/layered-ui/ npm run build
  base: process.env.SITE_BASE ?? '/',
  plugins: [react()],
})
