import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { useNavigate } from 'react-router';
import NavBar from './NavBar';


const OrderHistory = () => {
  const { orders } = useContext(CartContext);
const navigate = useNavigate();


  localStorage.removeItem(getUserFromToken());
  navigate('/home'); 

  return (
    <main>
      <NavBar/>
      <h1>Order History</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
            <h2>Order #{order.id}</h2>
            <p>Date: {order.date}</p>
            <p>Total: ${order.total.toFixed(2)}</p>
            <ul>
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.name} - {item.quantity} x ${item.price}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </main>
  );
};

export default OrderHistory;
