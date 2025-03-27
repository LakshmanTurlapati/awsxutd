import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Join.css';

function Join() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="join-page">
      <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      <nav className={`join-navbar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/about" className="nav-item">About Us</Link>
        <Link to="/gallery" className="nav-item">Gallery</Link>
        <a href="https://docs.google.com/forms/d/1Bv3maleWj92pPe9KJW-FNw7bXGIdbQBJaAYh5-58UvE/viewform?edit_requested=true" className="nav-item" target="_blank" rel="noopener noreferrer">Careers</a>
      </nav>
      
      <div className="join-content">
        <h2>Join Us</h2>
        <p>This is the join page. More content will be added here.</p>
      </div>
      
      <footer className="join-footer">
        © 2025 AWSxUTD Club. All rights reserved.
      </footer>
    </div>
  );
}

export default Join; 