import React, { useEffect, useState } from "react";
// import "./AllDramaMovies.css"; // Assuming you'll create this CSS file for styling

const AllDramaMovies = () => {
  const [dramaMovies, setDramaMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDramaMovies = async () => {
      try {
        const response = await fetch("http://localhost:3000/movies");
        if (!response.ok) throw new Error("Failed to fetch movies.");

        const movies = await response.json();
        // Filter movies that include "Drama" in their categories
        const filteredMovies = movies.filter((movie) =>
          movie.category.includes("Drama")
        );
        setDramaMovies(filteredMovies);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDramaMovies();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="drama-movies-container">
      <h1>All Drama Movies</h1>
      {dramaMovies.length === 0 ? (
        <p>No drama movies found.</p>
      ) : (
        <div className="movies-grid">
          {dramaMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={movie.image_url || "default-image-url.jpg"} // Fallback image if not available
                alt={movie.title}
                className="movie-image"
              />
              <div className="movie-info">
                <h2>{movie.title}</h2>
                <p>{movie.description}</p>
                <p><strong>Year:</strong> {movie.year}</p>
                <a
                  href={movie.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="trailer-link"
                >
                  Watch Trailer
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllDramaMovies;
