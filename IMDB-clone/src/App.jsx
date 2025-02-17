import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Animes from "./components/Animes";
import AnimeDetails from "./components/AnimeDetails";
import Banner from './components/Banner'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Banner /><Animes /></>} />
        <Route path="/anime/:id" element={<AnimeDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
