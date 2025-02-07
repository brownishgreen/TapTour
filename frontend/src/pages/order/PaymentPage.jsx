import Header from '../../components/shared/Header'
import Footer from '../../components/shared/Footer'
import Payment from '../../components/order/Payment'

const PaymentPage = () => {
  return (
    <div className="page">
      <Header />
      <main>
        <Payment />
      </main>
      <Footer />
    </div>
  )
}

export default PaymentPage
