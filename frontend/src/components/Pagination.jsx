import React from 'react'
import '../scss/components/_pagination.scss'

const Pagination = () => {
  return (
    <div className="pagination">
      <button className="pagination__button">上一頁</button>
      <span className="pagination__page-number">1</span>
      <span className="pagination__page-number">2</span>
      <span className="pagination__page-number">3</span>
      <span className="pagination__page-number">4</span>
      <span className="pagination__page-number">5</span>
      <button className="pagination__button">下一頁</button>
    </div>
  )
}

export default Pagination