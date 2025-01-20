import React from 'react'
import '../scss/components/_detail-page-introduction.scss'
const DetailPageIntroduction = ({ introduction }) => {
  return (
    <div className="detail-page-introduction">
      <div className="detail-page-introduction__container">
      <p className="detail-page-introduction__about">關於</p>
      <p className="detail-page-introduction__content">{introduction}</p>
      <p className="detail-page-introduction__more">現在預訂並稍後付款且可以免費取消</p>
      </div>
    </div>
    
  )
}

export default DetailPageIntroduction