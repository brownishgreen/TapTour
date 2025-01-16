import Header from '../components/Header'
import Footer from '../components/Footer'
import SearchBar from '../components/SearchBar'
import '../scss/pages/_activities.scss'
const ActivitiesPage = () => {
  return (
    <div>
      <Header />
      <main className="activities-page__main">
        <SearchBar />
      </main>
      <Footer />
    </div>
  )
}

export default ActivitiesPage