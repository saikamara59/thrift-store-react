import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import  NavBar from '../components/NavBar'

const ShoppingCart = () => {
  const { cartItems, removeFromCart, updateQuantity ,checkout} = useContext(CartContext);
  console.log('cartItems:', cartItems)

  const subtotal = cartItems.reduce(
    (total,item) => total + item.price * item.quantity,
    0
  );
  const shippingCost = 6.99;
  const total = subtotal + shippingCost;
  const navigate = useNavigate();

  const handleCheckout = async () => {
        try {
          await checkout(); // Call the checkout function from CartContext
          navigate('/checkout'); // Navigate to the checkout page
        } catch (error) {
          console.log('Error during checkout:', error);
          alert('Checkout failed. Please try again.'); // Show error message to the user
        }
      };

  return (
    <main>
      <NavBar/>
    <h1>Shopping Cart</h1>
    <section>
      {cartItems.length === 0 ?(
        <p> Your cart is empty.</p>

      ):(
        <>
        <div>
        {cartItems.map((item, index) => (
  <div key={item.id || index} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
    <img
      src={item.image_url}
      alt={item.name}
      style={{ width: '100px', height: 'auto' }}
    />
    <h3>{item.name}</h3>
    <p>Description: {item.description}</p>
            <p>Price: ${item.price}</p>
            <p>Size: {item.size}</p>
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
  </div>
))}
          </div>
          <div>
              <h2>Order Summary</h2>
              <p>Subtotal: ${subtotal.toFixed(2)}</p>
              <p>Shipping: ${shippingCost.toFixed(2)}</p>
              <p>Total: ${total.toFixed(2)}</p>
              <button onClick={handleCheckout}>Proceed to Checkout</button>
            </div>
        </>
      ) }
    </section>
    </main>
  )
}

export default ShoppingCart


// import React, { useContext,useEffect } from 'react';
// import { CartContext } from '../contexts/CartContext';
// import { useNavigate } from 'react-router-dom';

// const ShoppingCart = () => {
//   const {
//     cartItems,
//     removeFromCart,
//     updateQuantity,
//     calculateTotal,
//     checkout,
//   } = useContext(CartContext);
// console.log('cartItems:', cartItems)
//   const navigate = useNavigate();

//   // Calculate subtotal, shipping cost, and total
//   const subtotal = calculateTotal(); // Use the calculateTotal function from CartContext
//   const shippingCost = 6.99;
//   const total = subtotal + shippingCost;

//   // Handle checkout
//   const handleCheckout = async () => {
//     try {
//       await checkout(); // Call the checkout function from CartContext
//       navigate('/checkout'); // Navigate to the checkout page
//     } catch (error) {
//       console.log('Error during checkout:', error);
//       alert('Checkout failed. Please try again.'); // Show error message to the user
//     }
//   };

//   // Debug: Log cart items to verify their structure
//   useEffect(() => {
//     console.log('Cart Items:', cartItems);
//   }, [cartItems]);

//   return (
//     <main>
//       <h1>Shopping Cart</h1>
//       <section>
//         {cartItems.length === 0 ? (
//           <p>Your cart is empty.</p>
//         ) : (
//           <>
//             <div>
//               {cartItems.map((item) => (
//                 <div key={item.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
//                   <img
//                     src={item.image_url}
//                     alt={item.name}
//                     style={{ width: '100px', height: 'auto' }}
//                   />
//                   <h3>{item.name}</h3>
//                   <p>Description: {item.description}</p>
//                   <p>Price: ${typeof item.price === 'number' ? item.price.toFixed(2) : 'Invalid Price'}</p>
//                   <p>Size: {item.size}</p>
//                   <p>Condition: {item.condition}</p>
//                   <div>
//                     <label>Quantity:</label>
//                     <input
//                       type="number"
//                       value={item.quantity}
//                       min="1"
//                       onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
//                     />
//                   </div>
//                   <button onClick={() => removeFromCart(item.id)}>Remove</button>
//                 </div>
//               ))}
//             </div>
//             <div>
//               <h2>Order Summary</h2>
//               <p>Subtotal: ${subtotal.toFixed(2)}</p>
//               <p>Shipping: ${shippingCost.toFixed(2)}</p>
//               <p>Total: ${total.toFixed(2)}</p>
//               <button onClick={handleCheckout}>Proceed to Checkout</button>
//             </div>
//           </>
//         )}
//       </section>
//     </main>
//   );
// };

// export default ShoppingCart;