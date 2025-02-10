import { useNavigate, useLocation } from 'react-router-dom'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const navigate = useNavigate()
  const location = useLocation()

  // 更新 URL 並滾動到頂部
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return // 確保頁碼有效

    // 更新 URL 參數
    const searchParams = new URLSearchParams(location.search)
    searchParams.set('page', page)
    navigate(`${location.pathname}?${searchParams.toString()}`) // 導航到新 URL

    // 更新父組件狀態
    onPageChange(page)

    // 滾動到頂部
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }, 100) // 讓滾動行為稍微延遲，確保 React 狀態有時間更新
  }

  return (
    <div className="pagination">
      {/* 上一頁按鈕 */}
      <button
        className="pagination__button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        上一頁
      </button>

      {/* 頁碼按鈕 */}
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`pagination__page-number ${
            index + 1 === currentPage ? 'active' : ''
          }`}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      {/* 下一頁按鈕 */}
      <button
        className="pagination__button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        下一頁
      </button>
    </div>
  )
}

export default Pagination
