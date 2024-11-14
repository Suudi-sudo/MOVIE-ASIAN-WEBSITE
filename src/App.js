
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Trending from './pages/Trending';
import Popular from './pages/Popular';
import AllDrama from './pages/AllDrama';

import './App.css';

import { useState } from 'react';

function App() {
  
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <Router>
      <div className="App">
        <Navbar setSearchQuery={setSearchQuery}/>
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery}/>} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/all-drama" element={<AllDrama />} />
          
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;