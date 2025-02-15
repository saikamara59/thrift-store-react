import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { useNavigate } from 'react-router';
import NavBar from '../components/NavBar';

const ShoppingCart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingCost = 6.99;
  const total = subtotal + shippingCost;

  const handleCheckout = () => navigate('/checkout');

  return (
    <main className="min-h-screen bg-blue-200">
      <NavBar />
      <h1 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h1>
      <div className="max-w-7xl mx-auto p-4">
        
        {cartItems.length === 0 ? (
          <p className="text-lg">Your cart is empty.</p>
        ) : (
          <>
            <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-3 gap-7 shadow-md">
              {cartItems.map((item, index) => (
                <div key={item.id || index} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 w-auto max-w-xs">
                  <img src={item.image_url} alt={item.name} className="w-full h-48 object-cover rounded-md mb-4" />
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-lg font-bold mt-2">Price: ${item.price}</p>
                  <p className="text-gray-700">Size: {item.size}</p>
                  <p className="text-gray-700">Condition: {item.condition}</p>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Quantity:</label>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="w-full mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
              <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
              <p className="text-lg"><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
              <p className="text-lg"><strong>Shipping:</strong> ${shippingCost.toFixed(2)}</p>
              <p className="text-xl font-bold mt-4"><strong>Total:</strong> ${total.toFixed(2)}</p>
              <button onClick={handleCheckout} className="w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default ShoppingCart;


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