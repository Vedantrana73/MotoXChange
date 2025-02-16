import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound.tsx";
import Navbar from "./components/Navbar.tsx";
import Padding from "./components/Padding.tsx";
import Register from "./pages/Register.tsx";
import EMICalculator from '../src/pages/EMICalculator.tsx'
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";

function App() {
  

  return (
    <BrowserRouter>
      <Padding/>
      <Navbar/>
      <Main/>
    </BrowserRouter>
  )
}

function Main()
{
  return(
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path = "/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/emi-calculator" element={<EMICalculator/>}/>
      <Route path="/*" element={<NotFound/>}/>
    </Routes>
  )
}
export default App
