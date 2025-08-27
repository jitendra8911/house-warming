import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
      // If you also set COEP anywhere, consider removing it for auth:
      // "Cross-Origin-Embedder-Policy": "unsafe-none"
    },
  },
})
