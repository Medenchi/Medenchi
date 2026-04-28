import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/MalinaPreza/',  // ← ВАЖНО! С большой буквы и со слешами
})
