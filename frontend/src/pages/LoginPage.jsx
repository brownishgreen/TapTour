import Header from '../components/Header'
import Footer from '../components/Footer'
import LoginForm from '../components/LoginForm'

const LoginPage = () => {
  return (
    <div className="login-page signin-background">
      <Header />
      <main>
        <LoginForm />
      </main>
      <Footer />
    </div>
  )
}

export default LoginPage
