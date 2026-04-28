import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // поменяй на '/malinapreza/' если нужен subpath на GitHub Pages
})
