export function getImageUrl(path) {
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  return `${API_BASE}${path}`;
}
