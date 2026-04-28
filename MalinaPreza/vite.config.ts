import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const base = (() => {
  // Dev режим
  if (process.env.NODE_ENV === 'development') {
    return '/'
  }

  // Production — попробуй несколько вариантов
  const possibilities = [
    '/MalinaPreza/',      // основной
    '/malinapreza/',      // если маленькие буквы
    '/malina-preza/',     // если с дефисом
  ]

  // Или используй переменную окружения
  if (process.env.VITE_BASE_PATH) {
    return process.env.VITE_BASE_PATH
  }

  return possibilities[0] // берём первый по умолчанию
})()

export default defineConfig({
  plugins: [react()],
  base,
})
