import Header from '../../components/shared/Header'
import Footer from '../../components/shared/Footer'
import HistoryOrders from '../../components/order/HistoryOrders'

const HistoryOrdersPage = () => {
  return (
    <div className="page">
      <Header />
      <main>
        <HistoryOrders />
      </main>
      <Footer />
    </div>
  )
}

export default HistoryOrdersPage
