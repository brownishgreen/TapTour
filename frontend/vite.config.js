import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // allow all hosts
    port: 4173, // default port
  },
  preview: {
    allowedHosts: ['taptour-production-bf83.up.railway.app'], // allow all hosts
  },
})