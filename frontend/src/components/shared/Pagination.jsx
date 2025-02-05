import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }
  return (
    <div className="pagination">
      <button
        className="pagination__button"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        上一頁
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`pagination__page-number ${
            index + 1 === currentPage ? 'active' : ''
          }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className="pagination__button"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        下一頁
      </button>
    </div>
  )
}

export default Pagination