import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Corrected import
import './index.css';
import { UserProvider } from './contexts/UserContext.jsx';
import App from './App.jsx';
import { CartProvider } from './contexts/CartContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     
      <UserProvider>
        <CartProvider>
        <App />
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);