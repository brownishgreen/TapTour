import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 這裡改成從環境變數讀取
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
})

export default apiClient
