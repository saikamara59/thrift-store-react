import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { CartContext } from "../contexts/CartContext";
import NavBar from "./NavBar";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { lastOrder } = useContext(CartContext);

  if (!lastOrder) {
    return (
      <main className="p-6 bg-blue-100 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4 text-center">No order found.</h1>
        <p className="text-lg text-gray-600 mb-6 text-center">
          Your order details are not available.
        </p>
        <button
          onClick={() => navigate("/home")}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Continue Shopping
        </button>
      </main>
    );
  }
  const orderNumber = lastOrder.id;
  const orderDate = lastOrder.date;
  const totalPrice = lastOrder.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shippingCost = 6.99;
  const total = totalPrice + shippingCost;

  return (
    <main className="p-6 bg-blue-100 min-h-screen">
      <NavBar />
      <div className="max-w-4xl mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4 text-center sm:text-left">
          Thank you for your order!
        </h1>
        <p className="text-lg font-semibold mb-8 text-center sm:text-left">
          Your order has been successfully placed.
        </p>
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
          <p className="mb-2">
            <strong>Order Number:</strong> {orderNumber}
          </p>
          <p className="mb-4">
            <strong>Order Date:</strong> {orderDate}
          </p>
          <h3 className="text-xl font-semibold mb-3">Items:</h3>
          <ul className="list-disc pl-5 mb-6">
            {lastOrder.items.map((item, index) => (
              <li key={index} className="mb-2">
                {item.name} x{item.quantity}: ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <h3 className="text-xl font-semibold mb-3">Shipping Address:</h3>
          {lastOrder.shippingInfo ? (
            <div className="mb-6">
              <p>{lastOrder.shippingInfo.name}</p>
              <p>{lastOrder.shippingInfo.address}</p>
              <p>
                {lastOrder.shippingInfo.city}, {lastOrder.shippingInfo.state}{" "}
                {lastOrder.shippingInfo.zip}
              </p>
            </div>
          ) : (
            <p className="mb-6">No shipping information available.</p>
          )}
          <p className="mb-2">
            <strong>Payment Method:</strong>{" "}
            {lastOrder.paymentInfo?.paymentMethod || "Not specified"}
          </p>
          <p className="mb-2">
            <strong>Shipping Method:</strong> Express
          </p>
          <p className="mb-6">
            <strong>Estimated Delivery:</strong> N/A
          </p>

          <div className="border-t pt-4">
            <p className="text-lg font-semibold">
              <strong>Subtotal:</strong> ${totalPrice.toFixed(2)}
            </p>
            <p className="text-lg font-semibold">
              <strong>Shipping:</strong> ${shippingCost.toFixed(2)}
            </p>
            <p className="text-xl font-bold">
              <strong>Total:</strong> ${total.toFixed(2)}
            </p>
          </div>
        </section>
        <section className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">What’s Next?</h3>
          <p>
            You will receive an email confirmation with the details of your
            order.
          </p>
        </section>
        <div className="flex flex-col sm:flex-row gap-4 justify-between mb-8">
          <button
            onClick={() => navigate("/products")}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 flex-1 shadow-md"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate("/order-history")}
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition duration-300 flex-1 shadow-md"
          >
            View Order History
          </button>
        </div>

        {/* Need Help Section */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
          <p>
            Contact me at{" "}
            <a
              href="mailto:mhsaidu@gmail.com"
              className="text-blue-500 hover:underline"
            >
              mhsaidu@gmail.com
            </a>
          </p>
        </section>
      </div>
    </main>
  );
};

export default OrderConfirmation;
