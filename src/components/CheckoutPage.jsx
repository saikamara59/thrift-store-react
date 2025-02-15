import React, { useState, useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/orderService';
import NavBar from './NavBar';

const CheckoutPage = () => {
  const { cartItems, checkout, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const [billingInfo, setBillingInfo] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardholderName: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    paymentMethod: 'creditCard',
  });

  const [useShippingAsBilling, setUseShippingAsBilling] = useState(false);
  const [error, setError] = useState('');

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingCost = 6.99;
  const total = subtotal + shippingCost;

  const validateForm = () => {
    if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.city || !shippingInfo.state || !shippingInfo.zip) {
      setError('Please fill out all shipping information fields.');
      return false;
    }
    if (!useShippingAsBilling && (!billingInfo.name || !billingInfo.address || !billingInfo.city || !billingInfo.state || !billingInfo.zip)) {
      setError('Please fill out all billing information fields.');
      return false;
    }
    if (!paymentInfo.cardholderName || !paymentInfo.cardNumber || !paymentInfo.expirationDate || !paymentInfo.cvv) {
      setError('Please fill out all payment information fields.');
      return false;
    }
    setError('');
    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    try {
      const orderData = {
        total_amount: total,
        shipping_address: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zip}`,
        items: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      const res = await createOrder(orderData);
      console.log('Order created:', res);
      checkout(shippingInfo, paymentInfo);
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Payment failed:', error);
      setError('Payment failed. Please try again.');
    }
  };

  const handleUseShippingAsBillingChange = () => {
    setUseShippingAsBilling(!useShippingAsBilling);
    if (!useShippingAsBilling) {
      setBillingInfo(shippingInfo);
    } else {
      setBillingInfo({
        name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
      });
    }
  };

  return (
    <main className="bg-blue-200 p-4">
      <NavBar />
      <h1 className="font-bold text-2xl text-center mb-6">Checkout</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-3 gap-7 shadow-md">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
                  <img src={item.image_url} alt={item.name} className="w-full h-48 object-cover rounded-md mb-4" />
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-600">Price: ${item.price}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-gray-600">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    className="w-full mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold">Order Total</h2>
              <p>Subtotal: ${subtotal.toFixed(2)}</p>
              <p>Shipping: ${shippingCost.toFixed(2)}</p>
              <p className="font-bold">Total: ${total.toFixed(2)}</p>
            </div>
          </>
        )}
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
        <form className="grid grid-cols-1 gap-4">
          {['name', 'address', 'city', 'state', 'zip'].map((field) => (
            <div key={field}>
              <label className="block text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type="text"
                value={shippingInfo[field]}
                onChange={(e) => setShippingInfo({ ...shippingInfo, [field]: e.target.value })}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          ))}
        </form>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
        <form className="grid grid-cols-1 gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={useShippingAsBilling}
              onChange={handleUseShippingAsBillingChange}
              className="mr-2"
            />
            Use shipping address for billing
          </label>
          {['name', 'address', 'city', 'state', 'zip'].map((field) => (
            <div key={field}>
              <label className="block text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type="text"
                value={billingInfo[field]}
                onChange={(e) => setBillingInfo({ ...billingInfo, [field]: e.target.value })}
                className="w-full p-2 border rounded-md"
                disabled={useShippingAsBilling}
                required={!useShippingAsBilling}
              />
            </div>
          ))}
        </form>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
        <form className="grid grid-cols-1 gap-4">
          {['cardholderName', 'cardNumber', 'expirationDate', 'cvv'].map((field) => (
            <div key={field}>
              <label className="block text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type={field === 'cardNumber' || field === 'cvv' ? 'password' : 'text'}
                value={paymentInfo[field]}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, [field]: e.target.value })}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          ))}
          <div>
            <label className="block text-gray-700">Payment Method</label>
            <select
              value={paymentInfo.paymentMethod}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, paymentMethod: e.target.value })}
              className="w-full p-2 border rounded-md"
            >
              <option value="creditCard">Credit Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
        </form>
      </section>

      <button
        onClick={handlePayment}
        className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
      >
        Confirm Payment
      </button>
    </main>
  );
};

export default CheckoutPage;