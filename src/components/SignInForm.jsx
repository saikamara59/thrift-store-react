// src/components/SignInForm/SignInForm.jsx
import React from 'react';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { signIn } from '../services/authService';
import { UserContext } from '../contexts/UserContext';
import storelogo from '../assets/storelogo.png'; 
import thriftbg from '../assets/thriftstore.jpg'; 

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const signedInUser = await signIn(formData);
      setUser(signedInUser);
      navigate('/products');
    } catch (err) {
      setMessage(err.message || 'An error occurred during sign-in.');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${thriftbg})` }}
    >
      <div className="absolute top-5 left-5">
        <img src={storelogo} alt="Store Logo" className="h-12" />
      </div>

      <main className="bg-red-400 bg-opacity-80 p-7 rounded-lg shadow-lg w-full max-w-md inner-shadow inset-shadow-indigo-500">
        <h1 className="text-4xl mb-4 text-center font-irish font-bold">Sign In</h1>
        {message && <p className="text-red-200 text-center mb-4">{message}</p>}
        <h2 className="text-center text-lg">Enter your correct details to get started</h2>
        <form autoComplete="off" onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-2xl font-medium p-2">
              Username
            </label>
            <input
              type="text"
              autoComplete="off"
              id="username"
              value={formData.username}
              name="username"
              placeholder="Enter your username"
              onChange={handleChange}
              required
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-medium text-2xl">
              Password
            </label>
            <input
              type="password"
              autoComplete="off"
              id="password"
              value={formData.password}
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-blue-500/50"
            >
              Sign In
            </button>
            <button
              type="button"
              className="w-full py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 shadow-xl delay-150"
              onClick={() => navigate('/home')}
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SignInForm;
