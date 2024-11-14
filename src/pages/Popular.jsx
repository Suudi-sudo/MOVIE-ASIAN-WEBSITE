import React, { useEffect, useState } from "react";
// import "./PopularMovies.css"; // Assuming you'll create this CSS file for styling

const PopularMovies = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await fetch("https://json-server-movies-oy4o.onrender.com/movies");
        if (!response.ok) throw new Error("Failed to fetch movies.");
        
        const movies = await response.json();
        // Filter movies that are popular
        const filteredMovies = movies.filter((movie) => movie.popular);
        setPopularMovies(filteredMovies);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="popular-movies-container">
      <h1>Popular Movies</h1>
      {popularMovies.length === 0 ? (
        <p>No popular movies found.</p>
      ) : (
        <div className="movies-grid">
          {popularMovies.map((movie) => (
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

export default PopularMovies;
