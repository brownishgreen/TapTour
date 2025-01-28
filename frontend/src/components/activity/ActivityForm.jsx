import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import apiClient from '../../api/apiClient.js'
import axios from 'axios'
const ActivityForm = ({ mode }) => {
  console.log('Received mode:', mode)

  const { id } = useParams()
  const activityId = id && !isNaN(Number(id)) ? Number(id) : null
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
    if (isEditMode && activityId) {
      console.log("Fetching data for edit mode with id:", activityId)
      axios
        .get(`http://localhost:3000/api/activities/${activityId}`)
        .then((response) => setFormData(response.data))
        .catch((error) => console.error('獲取活動資料失敗', error));
    }
  }, [isEditMode, activityId]);
  // 當 isEdit 或 id 改變時，執行 useEffect

  //更新表單資料
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: ["price", "time"].includes(name) ? (Number(value) || 0) : value
    }))
  }

  // const handleImageChange = (event) => {
  //   console.log("Submitting form with data:", formData)
  //   const { name, files } = event.target
  //   const file = files[0]
  //   setFormData(prev => ({
  //     ...prev,
  //     [name]: file
  //   }))
  // }




  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isEditMode && (activityId === null || isNaN(activityId))) {
      alert("無法更新活動，因為 ID 無效！");
      return;
    }

    // 檢查 formData 內部沒有 undefined
    if (!formData || Object.keys(formData).length === 0) {
      alert('表單資料為空，請檢查輸入。')
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null && formData[key] !== undefined) {
        data.append(key, formData[key])
      }
    });

    console.log(' Submitting FormData', Array.from(data.entries()))

    try {
      const url = isEditMode
        ? `http://localhost:3000/api/activities/${activityId}`
        : 'http://localhost:3000/api/activities'
      const method = isEditMode ? 'put' : 'post'
      const response = await axios({
        method,
        url,
        data,
        headers: {
          "Content-Type": 'multipart/form-data'
        },
        withCredentials: true
      })

      console.log('Server Response:', response.data)
      alert(`${isEditMode ? '活動更新' : '建立活動'}成功`)
    } catch (error) {
      console.error('錯誤:', error.response || error.message)
      console.error('錯誤詳細資訊:', error.response?.data)
      alert(`${isEditMode ? '活動更新' : '活動建立'}失敗，請檢查錯誤`)
    }
  }
    return (
      <form className="activity-form" onSubmit={handleSubmit}>
        <div className="activity-form__form">
          <div className="activity-form__form-item">

            <label htmlFor="name">活動名稱</label>
            <input type="text" id="name" name="name" value={formData.name || ''} onChange={handleInputChange} />

            <label htmlFor="time">活動所需時間</label>
            <input type="text" id="time" value={formData.time || ''} name="time" onChange={handleInputChange} />

            <label htmlFor="price">活動單價</label>
            <input type="text" id="price" name="price" value={formData.price || ''} onChange={handleInputChange} />

            <label htmlFor="location">活動所在景點</label>
            <input type="text" id="location" name="location" value={formData.location || ''} onChange={handleInputChange} />

            <label htmlFor="description">活動介紹</label>
            <textarea id="description" name="description" value={formData.description || ''} onChange={handleInputChange} />
          
            {/* <div className="activity-form__image-upload">
            {[...Array(5)].map((_, index) => (
              <div className="activity-form__image-upload-item" key={index}>
                <label htmlFor={`image-${index}`}>活動圖片</label>
                <input type="file" id={`image-${index}`} name={`image-${index}`} onChange={handleImageChange}/>
              </div>
            ))}
          </div> */}
            <div className="activity-form__form-item-button">
              <button type="submit">{isEditMode ? '更新活動' : '新增活動'}</button>
            </div>
          </div>
        </div>
      </form>
    )
  }

export default ActivityForm