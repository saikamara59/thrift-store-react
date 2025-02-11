// src/contexts/UserContext.jsx


import React, { createContext, useState, useEffect } from 'react';

// Create UserContext
 const UserContext = createContext();

// UserProvider component to provide the user data
function UserProvider  ({ children }) {
  const [user, setUser] = useState(null);


  const value = {user,setUser}
  // useEffect(() => {

    
  //   const storedUser = localStorage.getItem("user"); // Example for stored user in localStorage
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser)); // Set user from localStorage or session
  //   }
  // }, []);

  return (
    <UserContext.Provider value={ value}>
      {children}
    </UserContext.Provider>
  );
};

export {UserProvider, UserContext}






