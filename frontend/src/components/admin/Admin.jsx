import UsersTable from './UsersTable'
import LocationsTable from './LocationsTable'
import ActivitiesTable from './ActivitiesTable'
import ProductsTable from './ProductsTable'


const Admin = () => {
  return (
    <div>
      <div className="main-title">
        <h3>後台管理</h3>
      </div>

      {/* Tabs navigation */}
      <ul className="nav nav-tabs" id="adminTabs" role="tablist">
        <li className="nav-item">
          <button
            className="nav-link active"
            id="users-tab"
            data-bs-toggle="tab"
            data-bs-target="#users"
          >
            用戶管理
          </button>
        </li>
        <li className="nav-item">
          <button
            className="nav-link"
            id="locations-tab"
            data-bs-toggle="tab"
            data-bs-target="#locations"
          >
            景點管理
          </button>
        </li>
        <li className="nav-item">
          <button
            className="nav-link"
            id="activities-tab"
            data-bs-toggle="tab"
            data-bs-target="#activities"
          >
            活動管理
          </button>
        </li>
        <li className="nav-item">
          <button
            className="nav-link"
            id="products-tab"
            data-bs-toggle="tab"
            data-bs-target="#products"
          >
            產品管理
          </button>
        </li>
      </ul>

      {/* Tabs content */}
      <div className="tab-content">
        <div className="tab-pane fade show active" id="users">
          <UsersTable />
        </div>
        <div className="tab-pane fade" id="locations">
          <LocationsTable />
        </div>
        <div className="tab-pane fade" id="activities">
          <ActivitiesTable />
        </div>
        <div className="tab-pane fade" id="products">
          <ProductsTable />
        </div>
      </div>
    </div>
  )
}

export default Admin
