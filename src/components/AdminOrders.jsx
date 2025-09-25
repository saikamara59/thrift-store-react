import { useEffect, useState } from "react";
import { fetchAdminOrders } from "../services/orderService";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await fetchAdminOrders();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      }
    };
    getOrders();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>All Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order.order_id || order.id}>
            <strong>Order #{order.order_id || order.id}</strong> by {order.username} — ${order.total_amount}
            <br />
            Shipping: {order.shipping_address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminOrders;