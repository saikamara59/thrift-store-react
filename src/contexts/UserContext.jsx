// src/contexts/UserContext.jsx
import React from 'react'
import { createContext, useState } from 'react';
import { data } from 'react-router-dom';

const UserContext = createContext();

// Add the new getUserFromToken function
const getUserFromToken = () => {
    const token = localStorage.setItem('token', data.token);


  if (!token) return null;

  return JSON.parse(atob(token.split('.')[1])).payload;
};

function UserProvider({ children }) {
  // call getUserFromToken() to get our initial user state
  const [user, setUser] = useState(null);

  const value = { user, setUser };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };




