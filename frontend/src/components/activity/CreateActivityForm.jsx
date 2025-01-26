import React, { useState } from 'react'
import apiClient from '../../api/apiClient.js'
const CreateActivityForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    time: '',
    price: '',
    location: '',
    description: '',
    images: null
  })

  const handleInputChange = (event) => {
    const { id, value } = event.target
    setFormData({ ...formData, [id]: value})
  }

  const handleImageChange = (event) => {
    const { id, files } = event.target
    const file = files[0]
    setFormData({ ...formData, [id]: file})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData()
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null) { //確保沒有空值
        data.append(key, formData[key])
      }
    })

    try {
      const response = await apiClient.post('api/activities', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log('活動創建成功', response.data)
      alert('活動創建成功')
    } catch (error) {
      console.error('活動創建失敗', error)
      alert('活動創建失敗')
    }
  }

  return (
    <form className="create-activity-form" onSubmit={handleSubmit}>
      <div className="create-activity-form__form">
        <div className="create-activity-form__form-item">

          <label htmlFor="name">活動名稱</label>
          <input type="text" id="name" value={formData.name} onChange={handleInputChange}/>

          <label htmlFor="time">活動所需時間</label>
          <input type="text" id="time" value={formData.time} onChange={handleInputChange}/>

          <label htmlFor="price">活動單價</label>
          <input type="text" id="price" value={formData.price} onChange={handleInputChange}/>

          <label htmlFor="location">活動所在景點</label>
          <input type="text" id="location" value={formData.location} onChange={handleInputChange}/>

          <label htmlFor="description">活動介紹</label>
          <textarea id="description" value={formData.description} onChange={handleInputChange}/>
          
          <div className="create-activity-form__image-upload">
            {[...Array(5)].map((_, index) => (
              <div className="create-activity-form__image-upload-item" key={index}>
                <label htmlFor={`image-${index}`}>活動圖片</label>
                <input type="file" id={`image-${index}`} onChange={handleImageChange}/>
              </div>
            ))}
          </div>
          <div className="create-activity-form__form-item-button">
            <button type="submit">提交</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default CreateActivityForm