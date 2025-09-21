import { useEffect, useState } from 'react'
import apiClient from '../../api/apiClient'
import { useSearchParams } from 'react-router-dom'
import Header from '../../components/shared/Header'
import Footer from '../../components/shared/Footer'
import HeroBanner from '../../components/shared/HeroBanner'
import SearchBar from '../../components/shared/SearchBar'
import CardItem from '../../components/shared/CardItem'
import Pagination from '../../components/shared/Pagination'
import { useAuth } from '../../components/context/AuthContext'
import { getImageUrl } from '../../utils/imageHelper'
const ProductsPage = () => {
  const { user } = useAuth()
  const userId = user?.id

  const [searchParams] = useSearchParams()
  const searchTerm = searchParams.get('search') || '' // 提取搜尋參數

  const [products, setProducts] = useState([]) // 取得產品資料
  const [currentPage, setCurrentPage] = useState(1) // 當前頁碼
  const [totalPages, setTotalPages] = useState(1) // 總頁數
  const [totalItems, setTotalItems] = useState(0) // 總數據數量
  const [error, setError] = useState(false) // 搜尋失敗狀態

  useEffect(() => {
    fetchProducts() // 請求產品資料
  }, [searchTerm, currentPage])

  // 請求產品資料
  const fetchProducts = async () => {
    try {
      setError(false) // 重置錯誤狀態
      if (searchTerm) {
        // 如果有搜尋條件，執行搜尋 API
        const response = await apiClient.get(
          `api/products?search=${encodeURIComponent(searchTerm)}`
        )

        if (response.data.length === 0) {
          // 如果搜尋結果為空，顯示錯誤圖片
          setError(true)
          setProducts([]) // 清空產品列表
          return
        }
        setProducts(response.data) // 設定搜尋結果
        setTotalPages(1) // 搜尋結果不需要分頁，頁數設為 1
        setTotalItems(response.data.length) // 設定搜尋結果的總數
      } else {
        // 如果沒有搜尋條件，執行分頁 API
        const response = await apiClient.get(
          `api/products/paginated?page=${currentPage}&limit=6`
        )
        const { products, totalPages, totalItems } = response.data

        setProducts(products) // 設定分頁的產品資料
        setTotalPages(totalPages) // 設定分頁的總頁數
        setTotalItems(totalItems) // 設定分頁的總數據數量
      }
    } catch (error) {
      setError(true)
      console.error('取得產品資料失敗', error)
    }
  }

  return (
    <div className="products-page">
      <Header />
      <div className="products-page__hero-banner">
        <HeroBanner
          imageURL="/src/assets/images/product-page-hero-banner.jpg"
          title="TapTour 特搜精選票券"
          description="高速 eSim 卡、機場接送、租車、旅遊保險、旅遊行程！"
        />
      </div>
      <main className="products-page__main">
        <SearchBar />
        {error ? (
          <div className="error-container">
            <img
              src="/assets/images/S__24428606.jpg"
              alt="搜尋失敗"
              className="error-image"
            />
          </div>
        ) : (
          <div className="products-page__card-container">
            {products.map((product, index) => (
              <CardItem
                key={index}
                buttonText="立刻購買"
                image={getImageUrl(product?.images?.[0]?.image_url) || '/default-image.jpg'}
                title={product?.name}
                subtitle={product?.category?.name}
                description={product?.description}
                itemId={product?.id}
                cardLink={`/products/${product?.id}`}
                userId={userId}
                itemType="product"
              />
            ))}
          </div>
        )}
      </main>
      {!searchTerm && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
      <Footer />
    </div>
  )
}

export default ProductsPage
