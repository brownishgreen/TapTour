import { useEffect } from 'react'
import { useLocation } from 'react-router-dom' // 獲取當前的 URL 資訊

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname]) // 監聽 pathname 變化，變更時滾動到頂部

  return null // 這個組件不會渲染任何內容
}

export default ScrollToTop
