import Header from '../components/Header'
import Footer from '../components/Footer'
import RegisterForm from '../components/RegisterForm'

const RegisterPage = () => {
  return (
    <div className="register-page signup-background">
      <Header />
      <main>
        <RegisterForm />
      </main>
      <Footer />
    </div>
  )
}

export default RegisterPage
