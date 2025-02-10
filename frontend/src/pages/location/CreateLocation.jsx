import Header from '../../components/shared/Header'
import Footer from '../../components/shared/Footer'
import CreateLocationForm from '../../components/location/CreateLocationForm'

const CreateLocation = () => {
  return (
    <div className="page location-background">
      <Header />
      <main>
        <CreateLocationForm />
      </main>
      <Footer />
    </div>
  )
}

export default CreateLocation
