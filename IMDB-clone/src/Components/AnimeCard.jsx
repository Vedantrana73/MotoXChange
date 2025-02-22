import React from "react";
import { Link } from "react-router-dom";

function AnimeCard({ id, poster_path, name }) {
  return (
    <Link
      to={`/anime/${id}`}
      className="flex flex-col items-center w-full sm:w-[200px] md:w-[240px] lg:w-[280px] xl:w-[320px] transition-transform duration-300 hover:scale-105"
    >
      {/* Anime Poster */}
      <div className="relative group w-full overflow-hidden rounded-xl shadow-lg cursor-pointer">
        <img
          className="h-[50vh] w-full object-cover rounded-xl transition-all duration-300 group-hover:brightness-75 group-hover:scale-105"
          src={poster_path}
          alt={name}
        />

        {/* Hover Overlay Effect */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <p className="text-white font-bold text-lg md:text-xl px-3 text-center">
            View Details
          </p>
        </div>
      </div>

      {/* Anime Title */}
      <div className="text-center text-white font-bold bg-gray-900/80 px-4 py-2 mt-3 rounded-lg w-full text-sm md:text-base shadow-md transition-colors hover:bg-gray-800">
        {name}
      </div>
    </Link>
  );
}

export default AnimeCard;
