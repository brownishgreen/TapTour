import axios from 'axios'

const RAW = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
// 確保最後一定是 .../api
const baseURL = RAW.endsWith('/api')
  ? RAW
  : `${RAW.replace(/\/$/, '')}/api`

const apiClient = axios.create({
  baseURL,           // ← 用相對路徑，交給 Vite 代理
  withCredentials: true,     // 一定要
})

export default apiClient