import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ setSearchQuery }) => {
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); 
  };

  return (
    <nav className="navbar">
      <h1>Asian Movies Web</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/trending">Trending</Link></li>
        <li><Link to="/popular">Popular</Link></li>
        <li><Link to="/all-drama">All Drama</Link></li>
      </ul>
      <input
        type="text"
        placeholder="Search..."
        className="search-bar"
        onChange={handleSearchChange} 
      />
    </nav>
  );
};

export default Navbar;