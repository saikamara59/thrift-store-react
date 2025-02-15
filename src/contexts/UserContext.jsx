// src/contexts/UserContext.jsx

import React from 'react'
import  { createContext, useState} from 'react';

// Create UserContext
 const UserContext = createContext();
 const getUserFromToken = () => {
  const token = localStorage.getItem('token');

  if (!token) return null;

  return JSON.parse(atob(token.split('.')[1])).payload;
};

// UserProvider component to provide the user data
function UserProvider  ({ children }) {
  const [user, setUser] = useState(getUserFromToken());


  const value = {user,setUser}
  

    
  return (
    <UserContext.Provider value={ value}>
      {children}
    </UserContext.Provider>
  );
};

export {UserProvider, UserContext}






