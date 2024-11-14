import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube,  } from '@fortawesome/free-brands-svg-icons'; 

function Footer() {
  return (
    <footer className='footer'>
      <h1>Asian Movie Web</h1>
      <h2>Asian Entertainment Website</h2>
      <div className="icon-links">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} className="icon" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faYoutube} className="icon" />
        </a>
       
      </div>
    </footer>
  );
}

export default Footer;
