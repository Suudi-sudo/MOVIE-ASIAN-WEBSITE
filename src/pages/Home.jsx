import React, { useState, useEffect } from 'react';

function Home({ searchQuery }) {
  const [chineseDramas, setChineseDramas] = useState([]);
  const [koreanDramas, setKoreanDramas] = useState([]);
  const [thailandDramas, setThailandDramas] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  
  // State for adding/updating movies
  const [newMovie, setNewMovie] = useState({
    id: null,
    title: '',
    category: '',
    description: '',
    year: '',
    video_url: ''
  });

  // Fetch Chinese dramas
  useEffect(() => {
    fetch('http://localhost:3000/cdrama')
      .then((response) => response.json())
      .then((data) => {
        setChineseDramas(data);
        if (!featuredMovie && data.length > 0) {
          setFeaturedMovie(data[0]);
        }
      })
      .catch((error) => console.log("Error fetching Chinese dramas:", error));
  }, []);

  // Fetch Korean dramas
  useEffect(() => {
    fetch('http://localhost:3000/kdrama')
      .then((response) => response.json())
      .then((data) => setKoreanDramas(data))
      .catch((error) => console.log("Error fetching Korean dramas:", error));
  }, []);

  // Fetch Thailand dramas
  useEffect(() => {
    fetch('http://localhost:3000/thai_movies')
      .then((response) => response.json())
      .then((data) => setThailandDramas(data))
      .catch((error) => console.log("Error fetching Thailand dramas:", error));
  }, []);

  const getYouTubeID = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleSelectMovie = (movie) => {
    setFeaturedMovie(movie);
    setNewMovie(movie); // Set selected movie for editing
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({ ...newMovie, [name]: value });
  };

  // Handle form submission to add or update a movie
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (newMovie.id) {
      // Update existing movie
      if (newMovie.category.includes("Chinese")) {
        setChineseDramas(chineseDramas.map(movie => movie.id === newMovie.id ? newMovie : movie));
      } else if (newMovie.category.includes("Korean")) {
        setKoreanDramas(koreanDramas.map(movie => movie.id === newMovie.id ? newMovie : movie));
      } else if (newMovie.category.includes("Thailand")) {
        setThailandDramas(thailandDramas.map(movie => movie.id === newMovie.id ? newMovie : movie));
      }
    } else {
      // Add new movie
      const newId = Date.now(); 
      setChineseDramas([...chineseDramas, { id: newId, ...newMovie }]);
    }

    // Reset form
    setNewMovie({
      id: null,
      title: '',
      category: '',
      description: '',
      year: '',
      video_url: ''
    });
    
    // Reset featured movie after adding/updating
    setFeaturedMovie(null);
  };

  // Handle delete movie
  const handleDeleteMovie = (id) => {
    setChineseDramas(chineseDramas.filter(movie => movie.id !== id));
    setKoreanDramas(koreanDramas.filter(movie => movie.id !== id));
    setThailandDramas(thailandDramas.filter(movie => movie.id !== id));

    if (featuredMovie && featuredMovie.id === id) {
      setFeaturedMovie(null); 
    }
  };

  // Filter movies based on search query
  const filteredChineseDramas = chineseDramas.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredKoreanDramas = koreanDramas.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredThailandDramas = thailandDramas.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='willo'>
      <div className="featured-section">
        {featuredMovie && (
          <div>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${getYouTubeID(featuredMovie.video_url)}`} 
              title={featuredMovie.title}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
            <h2>{featuredMovie.title}</h2>
            <p>Category: {featuredMovie.category.join(', ')}</p>
            <p>Description: {featuredMovie.description}</p>
            <p>Year: {featuredMovie.year}</p>
            <button onClick={() => handleDeleteMovie(featuredMovie.id)}>Delete Movie</button>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <h3>{newMovie.id ? "Update Movie" : "Add New Movie"}</h3>
        <input type="text" name="title" placeholder="Title" value={newMovie.title} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={newMovie.category} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={newMovie.description} onChange={handleChange} required></textarea>
        <input type="text" name="year" placeholder="Year" value={newMovie.year} onChange={handleChange} required />
        <input type="text" name="video_url" placeholder="YouTube Video URL" value={newMovie.video_url} onChange={handleChange} required /> 
        <button type="submit">{newMovie.id ? "Update Movie" : "Add Movie"}</button>
      </form>

      <div className="category-section">
        <h3>Chinese Drama</h3>
        <div className="movie-grid">
          {filteredChineseDramas.map((movie) => (
            <img
              key={movie.id}
              src={`https://img.youtube.com/vi/${getYouTubeID(movie.video_url)}/hqdefault.jpg`} 
              alt={movie.title}
              onClick={() => handleSelectMovie(movie)}
            />
          ))}
        </div>

        <h3>Korean Drama</h3>
        <div className="movie-grid">
          {filteredKoreanDramas.map((movie) => (
            <img
              key={movie.id}
              src={`https://img.youtube.com/vi/${getYouTubeID(movie.video_url)}/hqdefault.jpg`} 
              alt={movie.title}
              onClick={() => handleSelectMovie(movie)}
            />
          ))}
        </div>

        <h3>Thailand Drama</h3>
        <div className="movie-grid">
          {filteredThailandDramas.map((movie) => (
            <img
              key={movie.id}
              src={`https://img.youtube.com/vi/${getYouTubeID(movie.video_url)}/hqdefault.jpg`} 
              alt={movie.title}
              onClick={() => handleSelectMovie(movie)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;