import Header from '../../components/shared/Header'
import Footer from '../../components/shared/Footer'
import LoginForm from '../../components/users/LoginForm'

const LoginPage = () => {
  return (
    <div className="page signin-background">
      <Header />
      <main>
        <LoginForm />
      </main>
      <Footer />
    </div>
  )
}

export default LoginPage
