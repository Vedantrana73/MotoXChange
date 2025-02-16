import { useEffect,useState } from "react";
import "./App.css";
import Banner from "./Components/Banner";
import Movies from "./Components/Movies";
import Navbar from "./Components/navbar";
import Watchlist from "./Components/Watchlist";
import Pagenation from "./Components/Pagenation";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  const [movies,setmovies]=useState([]);

  // async function useApi(){
  //   const response=await fetch("http://www.omdbapi.com/?s=movie&y=2025&apikey=dd573251");
  //   const res=await response.json();
  //   console.log(res);
  // }

  async function useApi() {
    try {
      const response = await fetch(
        "http://www.omdbapi.com/?s=horror&y=2025&apikey=dd573251"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const res = await response.json();
      console.log(res)
      if(res.Response){
        setmovies(res.Search);
      }
    } catch (error) {
      console.error("Failed to fetch:", error.message);
    }
  }
  

  

  useEffect(()=>{
    useApi();
  },[])


  return (
    
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Movies movies={movies}/>
                <Pagenation />
              </>
            }
          />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
