import { useEffect } from 'react'
import Header from '../../components/shared/Header.jsx'
import Footer from '../../components/shared/Footer.jsx'
import ProductForm from '../../components/product/ProductForm.jsx'
import { useAuth } from '../../components/context/AuthContext.jsx'

const ManageProductPage = ({ mode }) => {
  const { verifyLogin } = useAuth()

  useEffect(() => {
    verifyLogin() // 在頁面加載時檢查登入狀態
  }, [verifyLogin])

  return (
    <div className="manage-product-page">
      <Header />
      <div className="manage-product-page__container create-product-background">
        <h1>{mode === 'edit' ? '編輯商品' : '新增商品'}</h1>
        <div className="manage-product-page__form">
          <ProductForm mode={mode} />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ManageProductPage