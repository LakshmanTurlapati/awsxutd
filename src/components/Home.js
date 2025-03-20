import React from 'react';
import './Home.css';
import logo from '../assets/awsxutd.png';

function Home() {
  return (
    <div className="home">
      <div className="banner">
        <img src={logo} alt="AWS Logo" className="logo" />
        <nav className="navbar">
          <a href="#about" className="nav-item">About Us</a>
          <a href="#gallery" className="nav-item">Gallery</a>
          <a href="#careers" className="nav-item">Careers</a>
          <a href="#join" className="nav-item join-button">Join Us</a>
        </nav>
        <div className="content-block">
          <h2 className="banner-heading">
            Join us and get ready to become <span className="highlight">AWS Certified</span>
          </h2>
          <p className="tagline">
            Learn, Build, and Innovate in the Cloud. Join us for hackathons, workshops, seminars, and more!
          </p>
          <button className="club-button">
            Join The Club Now!
          </button>
        </div>
        <div className="hexagon-frame"></div>
      </div>
    </div>
  );
}

export default Home; 