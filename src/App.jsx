import React from "react";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import SignUpForm from "./components/SignUpForm";
import NavBar from "./components/NavBar";
import SignInForm from "./components/SignInForm";

const App = () => {

  const { user } = useContext(UserContext);
  return (
     
      <Routes> 
         {user ? (
          <Route path="/" element={<LandingPage />}/>
    ): (
    <>
    <Route path="/home" element={ <HomePage />}/>
    <Route path="/sign-in" element={<SignInForm />}/>
    <Route path="/sign-up" element={<SignUpForm />}/>
    </> 
  )} 
    </Routes>
  
  );
};

export default App;
