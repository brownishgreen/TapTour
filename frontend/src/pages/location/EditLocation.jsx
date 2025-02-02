import Header from '../../components/shared/Header'
import Footer from '../../components/shared/Footer'
import EditLocationForm from '../../components/location/EditLocationForm'

const EditLocation = () => {
  return (
    <div className="page">
      <Header />
      <main>
        <EditLocationForm />
      </main>
      <Footer />
    </div>
  )
}

export default EditLocation
