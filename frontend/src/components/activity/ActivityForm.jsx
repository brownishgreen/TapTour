import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import apiClient from '../../api/apiClient.js'
import axios from 'axios'
const ActivityForm = ({ mode }) => {
  console.log('Received mode:', mode)

  const { id } = useParams()
  const activityId = id && !isNaN(Number(id)) ? Number(id) : null
  const isEditMode = mode === 'edit' // 判斷模式
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    time: '',
    price: '',
    location: '',
    description: '',
    category_id: '',
    images: []
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

  // 獲取所有分類
  useEffect(() => {
    axios.get('http://localhost:3000/api/categories')
      .then((response) => setCategories(response.data))
      .catch((error) => console.error('獲取分類資料失敗', error))
  }, [])
  // 當 isEdit 或 id 改變時，執行 useEffect

  //更新表單資料
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: ["price", "time", "category_id"].includes(name) ? (Number(value) || 0) : value
    }))
  }
  // 處理圖片上傳
  const handleImageChange = (event) => {
    //只接受圖片格式
    const files = Array.from(event.target.files).filter(file => file.type.startsWith('image/'))

    if (files.length === 0) {
      alert('請選擇有效的圖片文件');
      return;
    }

    if (files.length > 5) {
      alert('最多只能上傳 5 張圖片');
      return;
    }

    setFormData((prev) => ({
      ...prev,
      images: files // 更新圖片到 formData
    }))
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    // 檢查表單資料是否為空
    const requiredFields = ['name', 'time', 'price', 'location', 'description', 'category_id']
    for (const field of requiredFields) {
      if (formData[field] === null || formData[field] === undefined || formData[field] === '') {
        alert(`${field} 是必填欄位`)
        return
      }
    }
    // 檢查價格是否為空
    if (formData.price === null || formData.price === undefined || formData.price === '') {
      alert('價格不能為空');
      return;
    }

    // 檢查活動名稱是否為空
    if (!formData.name.trim()) {
      alert("活動名稱不能為空");
      return;
    }

    console.log("🚀 Debugging formData:", formData)


    //圖片數量在允許範圍內
    if (!Array.isArray(formData.images) || formData.images.length > 5) {
      alert('最多只能上傳 5 張圖片')
      return
    }

    if (isEditMode && (activityId === null || isNaN(activityId))) {
      alert("無法更新活動，因為 ID 無效！");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'images') {
        //逐一上傳圖片
        formData.images.forEach((image) => {
          data.append('images', image)
        })
      } else if (formData[key] !== null && formData[key] !== undefined) {
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
            <div className="activity-form__category">
              <label htmlFor="category_id" style={{marginBottom: '10px'}}>活動類別</label>
              <select
                id="category_id"
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
              >
                <option value="">請選擇活動類別</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
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


            <div className="activity-form__image-upload">
              <label htmlFor="images">活動圖片（最多 5 張）</label>
              <input
                type="file"
                id="images"
                name="images"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </div>
            <div className="activity-form__form-item-button">
              <button type="submit">{isEditMode ? '更新活動' : '新增活動'}</button>
            </div>
            </div>
          </div>
      </form>
    )
  }

export default ActivityForm