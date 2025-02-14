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

import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [orders, setOrders] = useState(() => {
    const storedOrders = localStorage.getItem('orders');
    return storedOrders ? JSON.parse(storedOrders) : [];
  });

  const [lastOrder, setLastOrder] = useState(() => {
    const storedLastOrder = localStorage.getItem('lastOrder');
    return storedLastOrder ? JSON.parse(storedLastOrder) : null;
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('lastOrder', JSON.stringify(lastOrder));
  }, [lastOrder]);

  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.product_id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, id: product.product_id, quantity: 1, price: parseFloat(product.price) }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const checkout = (shippingInfo, paymentInfo) => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    const order = {
      id: new Date().getTime(),
      date: new Date().toLocaleString(),
      items: cartItems,
      total: calculateTotal(),
      shippingInfo,
      paymentInfo,
    };

    setOrders((prevOrders) => [...prevOrders, order]);
    setLastOrder(order); // Save the last order
    setCartItems([]); // Clear the cart

    navigate('/order-confirmation'); // Redirect to order confirmation
  };

  const value = {
    cartItems,
    orders,
    lastOrder,
    addToCart,
    removeFromCart,
    updateQuantity,
    calculateTotal,
    checkout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext, CartProvider };