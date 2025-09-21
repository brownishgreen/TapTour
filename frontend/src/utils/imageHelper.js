export function getImageUrl(path, fallback = '/assets/images/default-activity.jpg') {
  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
  if (!path) return fallback
  if (path.startsWith('data:')) return path // base64 直接回傳
  // 已是絕對網址就不要再前綴
  if (/^https?:\/\//i.test(path)) return path

  const base = API_BASE.replace(/\/$/, '')
  const p = path.startsWith('/') ? path : `/${path}`
  return `${base}${p}`
}