import Header from '../../components/shared/Header'
import Footer from '../../components/shared/Footer'
import RegisterForm from '../../components/users/RegisterForm'

const RegisterPage = () => {
  return (
    <div className="page signup-background">
      <Header />
      <main>
        <RegisterForm />
      </main>
      <Footer />
    </div>
  )
}

export default RegisterPage
