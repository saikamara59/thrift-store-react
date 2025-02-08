import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; // Corrected import
import { UserContext } from '../contexts/UserContext';

const NavBar = () => {
  // Access user and setUser from the UserContext
  const { user, setUser } = useContext(UserContext);

  // Handle sign-out
  const handleSignOut = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    // Clear the user state
    setUser(null);
  };

  return (
    <nav>
      {user ? (
        <ul>
          <li>Welcome, {user.username}</li>
          <li>
            <Link to="/home" onClick={handleSignOut}>
              Sign Out
            </Link>
          </li>
          <li><Link to="/products"></Link></li>
          <li> <Link to="/cart">View Cart</Link></li>
        </ul>
        
      ) : (
        <ul>
          <li>
            <Link to="/sign-in">Sign In</Link>
          </li>
          <li>
            <Link to="/sign-up">Sign Up</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;