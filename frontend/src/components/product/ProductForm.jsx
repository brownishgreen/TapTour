import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect} from 'react'
import axios from 'axios'
const ProductForm = ({ mode }) => {

  const navigate = useNavigate()

  console.log('Received mode:', mode)

  const { id } = useParams()
  const productId = Number(id) || null;
  const isEditMode = mode === 'edit' // 判斷模式
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    location_id: '',
    description: '',
    category_id: '',
    images: []
  })

  // 如果 mode 是 edit，則從後端獲取商品資料
  useEffect(() => {
    if (isEditMode && productId) {
      console.log("Fetching data for edit mode with id:", productId)
      axios
        .get(`http://localhost:3000/api/products/${productId}`)
        .then((response) => setFormData(response.data))
        .catch((error) => console.error('獲取商品資料失敗', error));
    }
  }, [isEditMode, productId]);

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
      [name]: ["price", "category_id"].includes(name) ? Number(value) || 0 : value
    }))
  }
  // 處理圖片上傳
  const handleImageChange = (event) => {
    //只接受圖片格式
    const files = Array.from(event.target.files).filter(file => file.type.startsWith('image/'))

    if (files.length > 5) {
      alert('最多只能上傳 5 張圖片');
      return;
    }

    setFormData((prev) => ({
      ...prev,
      images: files // 更新圖片到 formData
    }))

    console.log('已經選擇圖片數量', files.length)
  }

  const validationForm = () => {
    const requiredFields = ['name', 'price', 'description', 'category_id']
    for (const field of requiredFields) {
      if (!formData[field]?.toString().trim()) {
        alert(`${field} 是必填欄位`)
        return false
      }
    }
    if (formData.images.length === 0) {
      alert('請至少上傳一張圖片')
      return false
    }
    return true
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('提交表單時的資料', formData)

    if (!validationForm()) {
      console.log('表單驗證失敗')
      return
    }

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'images') {
        //逐一上傳圖片
        formData.images.forEach((image) => {
          data.append(`images`, image)
        })
      } else if (formData[key] !== null && formData[key] !== undefined) {
        data.append(key, formData[key])
      }
    });

    console.log(' Submitting FormData', Array.from(data.entries()))

    try {
      const url = isEditMode
        ? `http://localhost:3000/api/products/${productId}`
        : 'http://localhost:3000/api/products'
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
      alert(`${isEditMode ? '商品更新' : '建立商品'}成功`)
      const redirectPath = isEditMode ? `/products/${productId}` : '/products'
      navigate(redirectPath)
    } catch (error) {
      console.error('錯誤:', error.response || error.message)
      console.error('錯誤詳細資訊:', error.response?.data)
      alert(`${isEditMode ? '商品更新' : '商品建立'}失敗，請檢查錯誤`)
    }
  }
  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="product-form__form">
        <div className="product-form__form-item">
          <div className="product-form__category">
            <label htmlFor="category_id" style={{ marginBottom: '10px' }}>商品類別</label>
            <select
              id="category_id"
              name="category_id"
              value={formData.category_id}
              onChange={handleInputChange}
            >
              <option value="">請選擇商品類別</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <label htmlFor="name">商品名稱</label>
          <input type="text" id="name" name="name" value={formData.name || ''} onChange={handleInputChange} />

          <label htmlFor="price">商品單價</label>
          <input type="text" id="price" name="price" value={formData.price || ''} onChange={handleInputChange} />

          {/* 改下拉式選單給location table */}
          <label htmlFor="location">商品所在景點</label>
          <input type="text" id="location" name="location" value={formData.location || ''} onChange={handleInputChange} />



          <label htmlFor="description">商品介紹</label>
          <textarea id="description" name="description" value={formData.description || ''} onChange={handleInputChange} />


          <div className="product-form__image-upload">
            <label htmlFor="images">商品圖片（最多 5 張）</label>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </div>
          <div className="product-form__form-item-button">
            <button type="submit">{isEditMode ? '更新商品' : '新增商品'}</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ProductForm