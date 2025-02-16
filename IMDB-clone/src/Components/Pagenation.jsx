import React, { useState, useEffect } from 'react';

function PaginatedMovies() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const moviesPerPage = 10; // Number of movies per page

  // Fetch movies from the API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?s=horror&page=${currentPage}&apikey=dd573251`
        );
        const data = await response.json();
        if (data.Response === 'True') {
          setMovies(data.Search);
          setTotalResults(parseInt(data.totalResults, 10));
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [currentPage]);

  // Calculate total pages
  const totalPages = Math.ceil(totalResults / moviesPerPage);

  // Handle page change
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="max-w-10xl mx-auto p-4">
      {/* <h1 className="text-3xl font-bold text-center mb-8">Horror Movies</h1> */}

      {/* Movie Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg transform hover:scale-125 duration-500"
          >
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{movie.Title}</h3>
              <p className="text-gray-400">{movie.Year}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:bg-gray-500"
        >
          Previous
        </button>
        <span className="text-lg font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:bg-gray-500"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PaginatedMovies;
