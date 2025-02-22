import React, { useEffect, useState } from "react";
import axios from "axios";

function Banner() {
  const [animes, setAnimes] = useState([]);
  const [currentAnime, setCurrentAnime] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Fetch top animes once
    axios.get("https://api.jikan.moe/v4/top/anime")
      .then((res) => {
        setAnimes(res.data.data);
        setCurrentAnime(res.data.data[0]); // Set initial banner
      })
      .catch((err) => console.error("Error fetching top animes:", err));
  }, []);

  useEffect(() => {
    if (animes.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % animes.length;
        setCurrentAnime(animes[newIndex]);
        return newIndex;
      });
    }, 10000); // Change banner every 10 seconds

    return () => clearInterval(interval);
  }, [animes]);

  return (
    <div
      className="relative h-[25vh] md:h-[70vh] bg-cover bg-center flex items-end shadow-lg overflow-hidden transition-all duration-500 ease-in-out"
      style={{
        backgroundImage: currentAnime
          ? `url(${currentAnime.images.jpg.large_image_url})`
          : "url('https://wallpaperaccess.com/full/1700207.jpg')", // Fallback image
      }}
    >
      {/* Dark Overlay for Better Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

      {/* Anime Title Section */}
      <div className="relative w-full text-center text-white text-2xl md:text-4xl font-bold bg-black/50 backdrop-blur-sm p-3 md:p-5 shadow-md">
        {currentAnime ? currentAnime.title_english || currentAnime.title : "Anime Hub"}
      </div>
    </div>
  );
}

export default Banner;
