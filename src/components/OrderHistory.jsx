import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { useNavigate } from 'react-router';
import NavBar from './NavBar';

const OrderHistory = () => {
  const { orders } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <main className="bg-blue-100 min-h-screen">
      <NavBar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-6">Order History</h1>
        {!orders || orders.length === 0 ? (
          <p className="text-lg text-gray-600">No orders yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-xl font-bold mb-2">Order #{order.id}</h2>
                <p className="text-gray-600 mb-2">Date: {order.date}</p>
                <p className="text-lg font-semibold mb-4">
                  Total: ${order.total.toFixed(2)}
                </p>
                <ul className="space-y-2">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex justify-between">
                      <span>
                        {item.name} - {item.quantity} x ${item.price.toFixed(2)}
                      </span>
                      <span className="font-semibold">
                        ${(item.quantity * item.price).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default OrderHistory;