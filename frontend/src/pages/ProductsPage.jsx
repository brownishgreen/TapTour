import '../scss/pages/_products.scss'
import Header from '../components/Header'
import Footer from '../components/Footer'
import HeroBanner from '../components/HeroBanner'
import SearchBar from '../components/SearchBar'
import CardItem from '../components/CardItem'
import Pagination from '../components/Pagination'

const ProductsPage = ({ isLoggedIn, setIsLoggedIn }) => {
  const products = Array(12).fill({
    buttonText: '立刻購買',
    image:
      'https://plus.unsplash.com/premium_photo-1684407617372-106ebb96091e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Activity Title',
    subtitle: 'Subtitle',
    description: 'Description',
  })

  return (
    <div className="products-page">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="products-page__hero-banner">
        <HeroBanner
          imageURL="../src/assets/images/product-page-hero-banner.jpg"
          title="TapTour 特搜精選票券"
          description="高速 eSim 卡、機場接送、租車、旅遊保險、旅遊行程！"
        />
      </div>
      <main className="products-page__main">
        <SearchBar />
        <div className="products-page__card-container">
          {products.map((product, index) => (
            <CardItem
              key={index}
              buttonText={product.buttonText}
              image={product.image}
              title={product.title}
              subtitle={product.subtitle}
              description={product.description}
            />
          ))}
        </div>
      </main>
      <Pagination />
      <HeroBanner
        imageURL="../src/assets/images/product-page-bottom-hero-banner.jpg"
        title="以自己的方式探索世界"
        description="利用「旅程」，探索世界，發現更多可能。"
      />
      <Footer />
    </div>
  )
}

export default ProductsPage
