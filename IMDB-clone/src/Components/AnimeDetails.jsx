import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function AnimeDetails() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://api.jikan.moe/v4/anime/${id}/full`)
      .then((res) => {
        console.log(res.data); // ✅ Debugging: See API response in console
        setAnime(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching anime details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return <div className="flex items-center justify-center min-h-screen text-white text-2xl">Loading...</div>;

  if (!anime)
    return <div className="flex items-center justify-center min-h-screen text-red-500 text-2xl">Anime details not found!</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white py-10 px-5 flex flex-col items-center">
      {/* Anime Title */}
      <h1 className="text-5xl font-extrabold text-gray-200 shadow-md mb-6 text-center">
        {anime.title_english || anime.title}
      </h1>

      {/* Anime Image */}
      <div className="relative w-[90%] max-w-3xl">
        <img
          className="w-50 h-full rounded-xl shadow-2xl border-4 border-gray-700 transform transition-transform duration-300 hover:scale-105"
          src={anime.images.jpg.image_url}
          alt={anime.title}
        />
      </div>

      {/* Anime Details */}
      <div className="mt-8 max-w-3xl bg-gray-800/80 p-6 rounded-lg shadow-lg border border-gray-600">
        <p className="text-gray-300 italic text-lg text-center mb-4">
          {anime.synopsis || "No synopsis available."}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-200 text-lg">
          <p><b>Japanese Title:</b> {anime.title_japanese || "N/A"}</p>
          <p><b>Episodes:</b> {anime.episodes || "Unknown"}</p>
          <p><b>Duration:</b> {anime.duration || "Unknown"}</p>
          <p><b>Status:</b> {anime.status || "Unknown"}</p>
          <p><b>Aired:</b> {anime.aired?.string || "Unknown"}</p>
          <p><b>Rating:</b> {anime.rating || "N/A"}</p>
          <p className="col-span-2"><b>Genres:</b> {anime.genres?.map((genre) => genre.name).join(", ") || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}

export default AnimeDetails;
