import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';
import logo from '../assets/awsxutd.png';

function About() {
  return (
    <div className="about-page">
      <nav className="about-navbar">
        <Link to="/" className="nav-item">Home</Link>
        <a href="#gallery" className="nav-item">Gallery</a>
        <a href="#careers" className="nav-item">Careers</a>
        <Link to="/join" className="nav-item join-button">Join Us</Link>
      </nav>
      
      <div className="logo-container">
        <img src={logo} alt="AWS Logo" className="about-logo" />
      </div>
      
      <footer className="footer">
        © 2025 AWSxUTD Club.&nbsp;&nbsp;&nbsp;&nbsp;All rights reserved.
      </footer>
    </div>
  );
}

export default About;
