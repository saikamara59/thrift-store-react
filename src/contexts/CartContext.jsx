// import React, { createContext, useState } from 'react';

// // Create the CartContext
// export const CartContext = createContext();

// // CartProvider component
// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//    console.log('Cart Items:', cartItems)
//   // Add a product to the cart
//   const [orders, setOrders] = useState([]);  


//   const addToCart = (product) => {
//     setCartItems((prevCart) => [...prevCart, { ...product, quantity: 1 }]); 
//   };
  
  

//   // Remove a product from the cart
  
  

//   // Update the quantity of a product in the cart
//   const updateQuantity = (productId, quantity) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === productId ? { ...item, quantity } : item
//       )
//     );
//   };

//   // Clear the entire cart
//   const clearCart = () => {
//     setCartItems([]);
//   };

//   // Value to be provided by the context
//   const value = {
//     cartItems,
//     addToCart,
//     removeFromCart,
//     updateQuantity,
//     clearCart,
//   };

//   return (
//     <CartContext.Provider value={value}>
//       {children}
//     </CartContext.Provider>
//   );
// };

import React, { createContext, useState } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // Array to hold cart items
  console.log('Cart Items:', cartItems)
  
  const [orders, setOrders] = useState([]); // Array to hold past orders

  // Add a product to the cart
  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.product_id);
      if (existingItem) {
        // If the item already exists, increment its quantity
        return prevCart.map((item) =>
          item.id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If the item doesn't exist, add it to the cart
        return [
          ...prevCart,
          {
            ...product,
            id: product.product_id, // Map product_id to id
            quantity: 1,
            price: parseFloat(product.price), // Ensure price is a number
          },
        ];
      }
    });
  };

  // Remove a product from the cart entirely
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  // Update the quantity of a product in the cart
  const updateQuantity = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Calculate the total price of items in the cart
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Handle checkout (save the order and clear the cart)
  const checkout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    const order = {
      id: new Date().getTime(), // Unique order ID based on timestamp
      date: new Date().toLocaleString(), // Date when the order was placed
      items: cartItems,
      total: calculateTotal(), // Use calculateTotal to get the order total
    };

    // Save order to orders state
    setOrders((prevOrders) => [...prevOrders, order]);

    // Save the last order to localStorage
    localStorage.setItem('lastOrder', JSON.stringify(order));

    // Clear the cart after checkout
    setCartItems([]);
  };

  // Value to be provided by the context
  const value = {
    cartItems,
    orders,
    addToCart,
    removeFromCart,
    updateQuantity,
    calculateTotal, // Include calculateTotal in the context value
    checkout,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
