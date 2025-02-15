import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://35.201.179.41:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
})

export default apiClient



