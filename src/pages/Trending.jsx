import React, { useEffect, useState } from "react";
const TrendingMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch("http://localhost:3000/movies");
        if (!response.ok) throw new Error("Failed to fetch movies.");
        
        const movies = await response.json();
        const filteredMovies = movies.filter(movie => movie.trending);
        setTrendingMovies(filteredMovies);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="trending-movies-container">
      <h1>Trending Movies</h1>
      {trendingMovies.length === 0 ? (
        <p>No trending movies found.</p>
      ) : (
        <div className="movies-grid">
          {trendingMovies.map(movie => (
            <div key={movie.id} className="movie-card">
              <img src={movie.image_url} alt={movie.title} className="movie-image" />
              <div className="movie-info">
                <h2>{movie.title}</h2>
                <p>{movie.description}</p>
                <p><strong>Year:</strong> {movie.year}</p>
                <a href={movie.video_url} target="_blank" rel="noopener noreferrer" className="trailer-link">
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

export default TrendingMovies;
