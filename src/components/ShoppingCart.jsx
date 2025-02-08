import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';



const ShoppingCart = () => {
  const { cartItems, removeFromCart, updateQuantity} = useContext(CartContext);

  const subtotal = cartItems.reduce(
    (total,item) => total + item.price * item.quantity,
    0
  );
  const shippingCost = 6.99;
  const total = subtotal + shippingCost;

  return (
    <main>
    <h1>Shopping Cart</h1>
    <section>
      {cartItems.length === 0 ?(
        <p> Your cart is empty.</p>

      ):(
        <>
        <div>
          {cartItems.map((item)=> (
           <div key={item.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }} >
           <img
           src={item.image_url}
           alt={item.name}
           style={{ width: '100px', height: 'auto' }}
         />
        <h3>{item.name}</h3>
                  <p>Price: ${item.price}</p>
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
                </div>
          ))}
          </div>
          <div>
              <h2>Order Summary</h2>
              <p>Subtotal: ${subtotal.toFixed(2)}</p>
              <p>Shipping: ${shippingCost.toFixed(2)}</p>
              <p>Total: ${total.toFixed(2)}</p>
              <button>Proceed to Checkout</button>
            </div>
        </>
      ) }
    </section>
    </main>
  )
}

export default ShoppingCart