import Header from '../../components/shared/Header'
import Footer from '../../components/shared/Footer'
import UserTable from '../../components/users/UserTable'

const AdminPage = () => {
  return (
    <div className="page">
      <Header />
      <main>
        <UserTable />
      </main>
      <Footer />
    </div>
  )
}

export default AdminPage
