import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import AboutUs from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import OwnerDashboard from "./pages/OwnerDashboard.tsx";

function App() {
  return (
    <BrowserRouter>
      <Toaster richColors position="bottom-right" /> {/* Add Toaster here */}
      <ConditionalLayout />
    </BrowserRouter>
  );
}

function ConditionalLayout() {
  const location = useLocation();
  const hideNavbarRoutes = ["/owner-dashboard"]; // Add routes where navbar should be hidden

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && (
        <>
          <Padding />
          <Navbar />
        </>
      )}
      <Main />
    </>
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
<<<<<<< HEAD
      <Route path="/sell-car" element={<SellCar/>}/>
      <Route path="/buy-car" element={<ListingPage/>}/>
      <Route path="/car/:id" element={<CarDetail/>}/>
      <Route path="/saved-cars" element = {<SavedCars/>}/>
=======
      <Route path="/sell-car" element={<SellCar />} />
      <Route path="/buy-car" element={<ListingPage />} />
      <Route path="/car/:id" element={<CarDetail />} />
      <Route path="/contact-us" element={<Contact />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/owner-dashboard" element={<OwnerDashboard />} />
>>>>>>> 8808a8591e3fd223f0d1a81da79f1e62dbca3f1c
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
