import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner.tsx"; // Import Toaster
import NotFound from "./pages/NotFound.tsx";
import Navbar from "./components/Navbar.tsx";
import Padding from "./components/Padding.tsx";
import Register from "./pages/Register.tsx";
import EMICalculator from "./pages/EMICalculator.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Profile from "./pages/Profile.tsx";
import SellCar from "./pages/SellCar.tsx";
import ListingPage from "./pages/ListingPage.tsx";
import CarDetail from "./pages/CarDetail.tsx";

function App() {
  return (
    <BrowserRouter>
      <Toaster richColors position="bottom-right" /> {/* Add Toaster here */}
      <Padding />
      <Navbar />
      <Main />
    </BrowserRouter>
  );
}

function Main() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/emi-calculator" element={<EMICalculator />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/sell-car" element={<SellCar/>}/>
      <Route path="/buy-car" element={<ListingPage/>}/>
      <Route path="/car/:id" element={<CarDetail/>}/>
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
