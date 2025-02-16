import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // ✅ 允許外部訪問
    port: 4173, // ✅ Railway 預設 port（如果有變更，請對應調整）
  },
})
