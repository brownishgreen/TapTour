import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://taptour-backend.yuanologue.com',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export default apiClient



