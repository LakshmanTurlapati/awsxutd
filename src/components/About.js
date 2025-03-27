import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './About.css';
import logo from '../assets/awsxutd.png';
import advisorImage from '../assets/officers/advisor.jpeg';
import TeamCarousel from './TeamCarousel';

function About() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [advisorImageLoaded, setAdvisorImageLoaded] = useState(false);

  // Force the image to reload to see the placeholder effect
  useEffect(() => {
    // Reset image loaded state when component mounts
    setAdvisorImageLoaded(false);
    
    // Create a new image to preload
    const img = new Image();
    img.src = advisorImage;
    
    // Only mark as loaded after a small delay to ensure placeholder is visible
    img.onload = () => {
      setTimeout(() => setAdvisorImageLoaded(true), 500);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="about-page">
      <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      <nav className={`about-navbar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/gallery" className="nav-item">Gallery</Link>
        <a href="https://docs.google.com/forms/d/1Bv3maleWj92pPe9KJW-FNw7bXGIdbQBJaAYh5-58UvE/viewform?edit_requested=true" className="nav-item" target="_blank" rel="noopener noreferrer">Careers</a>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdkXRrus4jSACvdmW6HYDAXguP1UdX7_ZZ4OaBSMKVFd_WwNw/viewform" className="nav-item join-button" target="_blank" rel="noopener noreferrer">Join Us</a>
      </nav>
      
      <div className="vertical-line"></div>
      
      <div className="advisor-section">
        <div>
          <div className="advisor-image">
            <div className="image-placeholder"></div>
            <img 
              src={advisorImage} 
              alt="Prof. Engin Calisir" 
              style={{ opacity: advisorImageLoaded ? 1 : 0, position: 'relative', zIndex: 1 }}
              onLoad={() => {}} // We're handling loading in useEffect now
            />
          </div>
          <div className="advisor-name">
            Prof. <strong>Engin Calisir</strong>
            <div>Advisor</div>
          </div>
        </div>
        <div className="advisor-info">
          <p>
            A results-oriented senior IT executive with over 20 years of experience in information technology in higher education and research. Prof Engin is a professor in the Information Systems department and Assistant Dean, Technology and Facilities Services.
          </p>
        </div>
      </div>
      
      <div className="about-content">
        <h2>About Us</h2>
        <p>
          Welcome to the AWS Organization at The University of Texas at Dallas—a vibrant community dedicated to exploring the forefront of AWS cloud computing. We're all about igniting curiosity and fueling growth, offering workshops, mock interviews, certification paths, and Q&A sessions led by seasoned AWS experts. Whether you're just starting out or already deep in the tech trenches, our events are designed to broaden your horizons and sharpen your skills in cloud technology.
        </p>
        <p>
          Join us to tap into a network of passionate IT and engineering students, where learning meets opportunity. Here, you'll not only dive into the latest AWS innovations but also build connections with industry professionals, paving the way for both personal and professional success. Come be a part of our journey and experience firsthand how AWS can transform your academic and career paths at UTD!
        </p>
      </div>
      
      <div className="team-heading">
        <h2>Our Team</h2>
      </div>
      
      <div className="team-carousel-container">
        <TeamCarousel />
      </div>
      
      <div className="logo-container">
        <img src={logo} alt="AWS Logo" className="about-logo" />
      </div>
      
      <footer className="about-footer">
        © 2025 AWSxUTD Club.&nbsp;&nbsp;&nbsp;&nbsp;All rights reserved.
      </footer>
    </div>
  );
}

export default About;
