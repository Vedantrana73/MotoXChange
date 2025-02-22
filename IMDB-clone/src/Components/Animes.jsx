import React, { useEffect, useState } from "react";
import AnimeCard from "./AnimeCard";
import axios from "axios";

function Animes() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://api.jikan.moe/v4/top/anime`)
      .then((res) => {
        setAnimes(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-2xl">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white py-10 px-5">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center text-gray-200 mb-10 drop-shadow-lg">
        🔥 Trending Animes 🔥
      </h1>

      {/* Anime Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
        {animes.map((anime) => (
          <AnimeCard
            key={anime.mal_id}
            id={anime.mal_id}
            poster_path={anime.images.jpg.image_url}
            name={anime.title_english || anime.title}
          />
        ))}
      </div>
    </div>
  );
}

export default Animes;





// https://api.jikan.moe/v4/anime/{id}/full - for 1 by 1 animes
// https://api.jikan.moe/v4/top/anime - for top animes
