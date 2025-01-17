import Header from '../components/Header'
import Footer from '../components/Footer'
import SearchBar from '../components/SearchBar'
import CardItem from '../components/CardItem'
import HeroBanner from '../components/HeroBanner'
import '../scss/pages/_activities.scss'
const ActivitiesPage = () => {
  return (
    <div>
      <Header />
      <div className="activities-page__hero-banner">
        <HeroBanner />
      </div>
      <main className="activities-page__main">
        <SearchBar />
        <div className="activities-page__card-container">
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ActivitiesPage