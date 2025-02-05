import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const App = () => {
  return (
      <BrowserRouter>
      <Routes>
    <Route path="/" element={<LandingPage />}/>
    <Route path="/home" element={<HomePage />}/>
    <Route path="/signin" element={<SignIn />}/>
    <Route path="/signup" element={<SignUp />}/>
    </Routes>
    </BrowserRouter>
  );
};

export default App;
