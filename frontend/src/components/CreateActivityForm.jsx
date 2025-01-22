import React from 'react'
import '../scss/components/_create-activity-form.scss'

const CreateActivityForm = () => {
  return (
    <div className="create-activity-form">
      <div className="create-activity-form__form">
        <div className="create-activity-form__form-item">
          <label htmlFor="activity-name">活動名稱</label>
          <input type="text" id="activity-name" />
          <label htmlFor="activity-time">活動所需時間</label>
          <input type="text" id="activity-time" />
          <label htmlFor="activity-price">活動單價</label>
          <input type="text" id="activity-price" />
          <label htmlFor="activity-location">活動所在景點</label>
          <input type="text" id="activity-location" />
          <label htmlFor="activity-description">活動介紹</label>
          <textarea id="activity-description" />
          <div className="create-activity-form__image-upload">
            <div className="create-activity-form__image-upload-item">
              <label htmlFor="activity-image">活動圖片</label>
              <input type="file" id="activity-image" />
            </div>
            <div className="create-activity-form__image-upload-item">
              <label htmlFor="activity-image">活動圖片</label>
              <input type="file" id="activity-image" />
            </div>
            <div className="create-activity-form__image-upload-item">
              <label htmlFor="activity-image">活動圖片</label>
              <input type="file" id="activity-image" />
            </div>
            <div className="create-activity-form__image-upload-item">
              <label htmlFor="activity-image">活動圖片</label>
              <input type="file" id="activity-image" />
            </div>
            <div className="create-activity-form__image-upload-item">
              <label htmlFor="activity-image">活動圖片</label>
              <input type="file" id="activity-image" />
            </div>
          </div>
          <div className="create-activity-form__form-item-button">
            <button type="submit">提交</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateActivityForm