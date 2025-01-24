import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Padding from "./Components/Padding";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Hero from "./Pages/Hero";
import Featured from "./Components/Featured";
import WhyUs from "./Components/WhyUs";


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Padding />
      <Routes>
        <Route path="/" element={<><Hero /><Featured /><WhyUs/></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/*" element={<Register />} /> 
        <Route path="/settings" element={<Navbar />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
