import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { CartContext } from '../contexts/CartContext';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { lastOrder } = useContext(CartContext);
  if (!lastOrder) {
    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-4">No order found.</h1>
        <p>Your order details are not available.</p>
        <button
          onClick={() => navigate('/home')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
        >
          Continue Shopping
        </button>
      </main>
    );
  }

  const orderNumber = lastOrder.id;
  const orderDate = lastOrder.date;
  const totalPrice = lastOrder.items.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingCost = 6.99;
  const total = totalPrice + shippingCost;

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>
      <p>Your order has been successfully placed.</p>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Order Details</h2>
        <p>
          <strong>Order Number:</strong> {orderNumber}
        </p>
        <p>
          <strong>Order Date:</strong> {orderDate}
        </p>

        <h3 className="mt-4 text-xl font-semibold">Items:</h3>
        <ul className="list-disc pl-5">
          {lastOrder.items.map((item, index) => (
            <li key={index}>
              {item.name} x{item.quantity}: ${item.price.toFixed(2)}
            </li>
          ))}
        </ul>

        <h3 className="mt-4 text-xl font-semibold">Shipping Address:</h3>
        {lastOrder.shippingInfo ? (
          <>
            <p>{lastOrder.shippingInfo.name}</p>
            <p>{lastOrder.shippingInfo.address}</p>
            <p>
              {lastOrder.shippingInfo.city}, {lastOrder.shippingInfo.state} {lastOrder.shippingInfo.zip}
            </p>
          </>
        ) : (
          <p>No shipping information available.</p>
        )}

        <p>
          <strong>Payment Method:</strong> {lastOrder.paymentInfo?.paymentMethod || 'Not specified'}
        </p>
        <p>
          <strong>Shipping Method:</strong> Express
        </p>
        <p>
          <strong>Estimated Delivery:</strong> N/A
        </p>

        <h3 className="mt-4 text-xl font-semibold">What’s Next?</h3>
        <p>You will receive an email confirmation with the details of your order.</p>
      </section>

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => navigate('/products')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Continue Shopping
        </button>
        <button
          onClick={() => navigate('/order-history')}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          View Order History
        </button>
      </div>

      <section className="mt-6">
        <h3 className="text-xl font-semibold">Need Help?</h3>
        <p>
          Contact us at{' '}
          <a href="mailto:support@example.com" className="text-blue-500 hover:underline">
            support@example.com
          </a>
        </p>
      </section>
    </main>
  );
};

export default OrderConfirmation;