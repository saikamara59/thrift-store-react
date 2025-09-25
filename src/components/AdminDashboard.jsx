import { Link } from "react-router-dom";

const AdminDashboard = () => (
  <div>
    <h1>Admin Dashboard</h1>
    <p>Welcome, admin! Here you can manage products, orders, and users.</p>
    <ul>
      <li><Link to="/admin/orders">View All Orders</Link></li>
      <li><Link to="/admin/products">Manage Products</Link></li>
      <li><Link to="/admin/users">Manage Users</Link></li>
    </ul>
  </div>
);

export default AdminDashboard;