import Header from '../../components/shared/Header'
import Footer from '../../components/shared/Footer'
import Admin from '../../components/admin/Admin'

const AdminPage = () => {
  return (
    <div className="page admin-page">
      <Header />
      <main>
        <Admin />
      </main>
      <Footer />
    </div>
  )
}

export default AdminPage
