import React from 'react'

const PriceInformation = ({ price }) => {
  return <div className="price-information">
    <div className="price-information__container">
      <div className="price-information__price">NT$ {price} 起</div>
      <div className="price-information__description">
        <p className="price-information__description-title">每名成人（價格依人數而有不同）</p>
        <div className="price-information__description-content">
          <div className="price-information__description-content-title">
            選擇日期<br />
          </div>
          <input type="date" className="price-information__date" />
          <br />
          <div className="price-information__description-content-title">
            選擇人數<br />
          </div>
          <input type="number" style={{ width: '45px' }} max="5" min="1" placeholder="1" /> 人
          <br />
          <div className="price-information__description-content-note">
            免費取消，活動前1日隨時取消並獲全額退款。
            <br />
            先預訂後付款！確保名額同時保有彈性。
          </div>
        </div>
        <button className="price-information__button primary-button">立即預訂</button>
      </div>
    </div>
  </div>
}

export default PriceInformation
