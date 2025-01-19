import Header from '../components/Header'
import Footer from '../components/Footer'
import SearchBar from '../components/SearchBar'
import CardItem from '../components/CardItem'
import HeroBanner from '../components/HeroBanner'
import Pagination from '../components/Pagination'

const ActivitiesPage = ({ isLoggedIn, setIsLoggedIn }) => {
  const activities = Array(12).fill({
    buttonText: '深入瞭解',
    image:
      'https://images.unsplash.com/photo-1735506266367-d6941df3efdc?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Activity Title',
    subtitle: 'Subtitle',
    description: 'Description',
  })

  return (
    <div className="activities-page">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="activities-page__hero-banner">
        <HeroBanner
          imageURL="../src/assets/images/hero-banner-image.jpg"
          title="TapTour 提供各式行程"
          description="豐富你的生活體驗，發現各地的精彩活動。"
        />
      </div>
      <main className="activities-page__main">
        <SearchBar />
        <div className="activities-page__card-container">
          {activities.map((activity, index) => (
            <CardItem
              key={index}
              buttonText={activity.buttonText}
              image={activity.image}
              title={activity.title}
              subtitle={activity.subtitle}
              description={activity.description}
            />
          ))}
        </div>
        <Pagination />
      </main>
      <Footer />
    </div>
  )
}

export default ActivitiesPage