import Header from '../../components/shared/Header'
import SearchBar from '../../components/shared/SearchBar'
import ImageCarousel from '../../components/shared/ImageCarousel'
import Pagination from '../../components/shared/Pagination'
import LocationsList from '../../components/location/LocationsList'
import Footer from '../../components/shared/Footer'

const LocationsPage = () => {
  const Locationscarousel = [
    {
      src: '/assets/images/backgrounds/5mezpWin6T8.jpg',
      alt: 'First Slide',
      caption: '走進壯麗高山秘境，遠離喧囂，擁抱自然的純淨與自由',
    },
    {
      src: '/assets/images/backgrounds/streetwindy.jpg',
      alt: 'Second Slide',
      caption: '探索浮動市集，木屋倒映水波，體驗古樸原始的生活韻味',
    },
    {
      src: '/assets/images/backgrounds/ituaTXxbrPA.jpg',
      alt: 'Third Slide',
      caption: '沿著鐵軌探索未知旅程，小鎮風光與遠山城市交織成畫卷',
    },
  ]
  return (
    <div>
      <Header />
      <main>
        <ImageCarousel items={Locationscarousel} />
        <SearchBar />
        {<LocationsList />}
        <Pagination />
      </main>
      <Footer />
    </div>
  )
}

export default LocationsPage
