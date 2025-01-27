import { useState } from 'react'
import { useParams } from 'react-router-dom'
import apiClient from '../../api/apiClient.js'
import axios from 'axios'
const CreateActivityForm = ({ mode }) => {

  const { id } = useParams() //抓去編輯模式的活動之ID
  const isEditMode = mode === 'edit' // 判斷模式

  const [formData, setFormData] = useState({
    name: '',
    time: '',
    price: '',
    location: '',
    description: '',
    images: null
  })

  // 如果 mode 是 edit，則從後端獲取活動資料
  useEffect(() => {
    if (isEditMode && id ) {
      axios
        .get(`http://localhost:3000/api/activities/${id}`)
        .then(response => setFormData(response.data))
        .catch(error => console.error('獲取活動資料失敗', error))
    }
  }, [isEditMode, id]) // 當 isEdit 或 id 改變時，執行 useEffect

  //更新表單資料
  const handleInputChange = (event) => {
    const { id, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleImageChange = (event) => {
    const { id, files } = event.target
    const file = files[0]
    setFormData(prev => ({
      ...prev,
      [id]: file
    }))
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
      const response = isEditMode 
        ? await axios.put(`http://localhost:3000/api/activities/${id}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        })
        : await axios.post('http://localhost:3000/api/activities', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        })

      console.log(`${isEditMode ? '更新' : '創建'}成功`, response.data)
      alert(`${isEditMode ? '活動更新' : '活動創建'}成功`)
    } catch (error) {
      console.error(`${isEditMode ? '更新' : '創建'}失敗`, error)
      alert(`${isEditMode ? '活動更新' : '活動創建'}失敗`)
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