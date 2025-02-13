import React, { useState, useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/orderService';



const CheckoutPage = () => {
  const { cartItems} = useContext(CartContext);
  console.log('CheckoutPage cartItems:', cartItems);

  

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

  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shippingCost = 6.99;
  const total = subtotal + shippingCost;

  console.log('Subtotal:', subtotal);
 console.log('Shipping Cost:', shippingCost);
  console.log('Total:', total)
  

  const handlePayment = async () => {
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
      console.log('Order Data:', orderData);


      const res = await createOrder(orderData); // 
      console.log('Order created:', res);
      navigate('/order-confirmation');
    } catch (error) {
      console.log('Payment failed:', error);
      alert('Payment failed. Please try again.');
    }
  };

  // Update billing info when checkbox is toggled
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
    <main>
      <h1>Checkout</h1>
      <section>
        <h2>Order Summary</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div>
              {cartItems.map((item) => (
                <div key={item.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
                  <img
                    src={item.image_url}
                    alt={item.name}
                    style={{ width: '100px', height: 'auto' }}
                  />
                  <h3>{item.name}</h3>
                  <p>Price: ${item.price}</p>
                  <p>Description :{item.description}</p>
                  <p>Condition: {item.condition}</p>

                  <div>
                    <label>Quantity:</label>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    />
                  </div>
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                  <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div>
              <h2>Order Total</h2>
              <p>Subtotal: ${subtotal.toFixed(2)}</p>
              <p>Shipping: ${shippingCost.toFixed(2)}</p>
              <p>Total: ${total.toFixed(2)}</p>
            </div>
          </>
        )}
      </section>

      <section>
        <h2>Shipping Information</h2>
        <form>
          <label>Name</label>
          <input
            type="text"
            value={shippingInfo.name}
            onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
          />
          <label>Address</label>
          <input
            type="text"
            value={shippingInfo.address}
            onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
          />
          <label>City</label>
          <input
            type="text"
            value={shippingInfo.city}
            onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
          />
          <label>State</label>
          <input
            type="text"
            value={shippingInfo.state}
            onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
          />
          <label>Zip Code</label>
          <input
            type="text"
            value={shippingInfo.zip}
            onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
          />
        </form>
      </section>

      <section>
        <h2>Billing Information</h2>
        <form>
          <label>
            <input
              type="checkbox"
              checked={useShippingAsBilling}
              onChange={handleUseShippingAsBillingChange}
            />
            Use shipping address for billing
          </label>
          <br />
          <label>Name</label>
          <input
            type="text"
            value={billingInfo.name}
            onChange={(e) => setBillingInfo({ ...billingInfo, name: e.target.value })}
            disabled={useShippingAsBilling}
          />
          <label>Address</label>
          <input
            type="text"
            value={billingInfo.address}
            onChange={(e) => setBillingInfo({ ...billingInfo, address: e.target.value })}
            disabled={useShippingAsBilling}
          />
          <label>City</label>
          <input
            type="text"
            value={billingInfo.city}
            onChange={(e) => setBillingInfo({ ...billingInfo, city: e.target.value })}
            disabled={useShippingAsBilling}
          />
          <label>State</label>
          <input
            type="text"
            value={billingInfo.state}
            onChange={(e) => setBillingInfo({ ...billingInfo, state: e.target.value })}
            disabled={useShippingAsBilling}
          />
          <label>Zip Code</label>
          <input
            type="text"
            value={billingInfo.zip}
            onChange={(e) => setBillingInfo({ ...billingInfo, zip: e.target.value })}
            disabled={useShippingAsBilling}
          />
        </form>
      </section>

      <section>
        <h2>Payment Information</h2>
        <form>
          <label>Cardholder Name</label>
          <input
            type="text"
            value={paymentInfo.cardholderName}
            onChange={(e) => setPaymentInfo({ ...paymentInfo, cardholderName: e.target.value })}
          />
          <label>Card Number</label>
          <input
            type="text"
            value={paymentInfo.cardNumber}
            onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
          />
          <label>Expiration Date</label>
          <input
            type="text"
            value={paymentInfo.expirationDate}
            onChange={(e) => setPaymentInfo({ ...paymentInfo, expirationDate: e.target.value })}
          />
          <label>CVV</label>
          <input
            type="text"
            value={paymentInfo.cvv}
            onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
          />
          <label>Payment Method</label>
          <select
            value={paymentInfo.paymentMethod}
            onChange={(e) => setPaymentInfo({ ...paymentInfo, paymentMethod: e.target.value })}
          >
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </form>
      </section>

      <button onClick={handlePayment}>Confirm Payment</button>
    </main>
  );
};

export default CheckoutPage;

