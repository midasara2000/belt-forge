import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const builtAt = new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC'

// https://vite.dev/config/
export default defineConfig({
  base: '/belt-forge/',
  plugins: [react()],
  define: {
    __BF_BUILT_AT__: JSON.stringify(builtAt),
  },
})
