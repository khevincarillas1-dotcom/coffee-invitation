import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/save_response.php": {
        target: "http://localhost",
        rewrite: () => "/coffee-invitation/save_response.php",
      },
    },
  },
})
