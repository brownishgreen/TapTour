import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // ✅ 允許外部訪問
    port: 4173, // ✅ Railway 預設 port
  },
  preview: {
    allowedHosts: ['taptour-production-bf83.up.railway.app'], // ✅ 允許 Railway 部署的主機
  },
})