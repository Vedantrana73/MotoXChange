import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound.tsx";
import Navbar from "./components/Navbar.tsx";
import Padding from "./components/Padding.tsx";
import BasicRegister from "./pages/BasicRegister.tsx";
import Home from "./pages/Home.tsx";
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
      <Route path = "/register" element={<BasicRegister/>}/>
    </Routes>
  )
}
export default App
