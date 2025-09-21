import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import apiClient from '../../api/apiClient'
import Header from '../../components/shared/Header'
import SearchBar from '../../components/shared/SearchBar'
import Footer from '../../components/shared/Footer'
import ImageGallery from '../../components/shared/ImageGallery'
import DetailPageTitle from '../../components/DetailPageTitle'
import DetailPageIntroduction from '../../components/DetailPageIntroduction'
import PriceInformation from '../../components/PriceInformation'
import { useAuth } from '../../components/context/AuthContext'
import CreateCommentForm from '../../components/CreateCommentForm'
import CommentsBlock from '../../components/CommentsBlock'

const ProductDetailPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [comments, setComments] = useState([])
  const { isLoggedIn, setIsLoggedIn, verifyLogin, user } = useAuth()

  useEffect(() => {
    verifyLogin() // 在頁面加載時檢查登入狀態
    const fetchProductAndComments = async () => {
      try {
        const [productResponse, commentsResponse] = await Promise.all([
          apiClient.get(`products/${id}`),
          apiClient.get(`comments/products/${id}`)
        ])
        setProduct(productResponse.data)
        setComments(commentsResponse.data)
      } catch (err) {
        console.error('取得商品和評論資料失敗', err)
      }
    }
    fetchProductAndComments()
  }, [id, verifyLogin])

  const handleNewComment = async (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments])

    apiClient
      .get(`comments/products/${id}`)
      .then((response) => setComments(response.data))
      .catch((err) => console.error('取得更新後的評論失敗', err))
  }

  const handleCommentDeleted = (commentId) => {
    setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId))
  }

  return (
    <div className="product-detail-page">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="product-detail-page__search-bar-wrapper">
        <SearchBar />
      </div>
      {product && (
        <div className="product-detail-page__container">
          <ImageGallery images={product.images} />
          <div className="product-detail-page-title-wrapper">
            <DetailPageTitle name={product.name} />
          </div>
          <div className="product-detail-page__wrapper">
            <main className="product-detail-page__main">
              <DetailPageIntroduction introduction={product.description} />
            </main>
            <aside className="product-detail-page__aside">
              <PriceInformation
                price={product.price}
                productId={product.id}
                user={user}
              />
            </aside>
          </div>
          <div className="product-detail-page__comments-wrapper">
            {isLoggedIn ? (
              <CreateCommentForm
                entityId={product.id}
                entityType="product"
                onCommentAdded={handleNewComment}
              />
            ) : (
              <p style={{ marginLeft: '10px' }}>⚠️ 請先登入以新增評論。</p>
            )}
            <CommentsBlock comments={comments} onCommentDeleted={handleCommentDeleted} />
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}

export default ProductDetailPage
