import React, { useEffect, useRef, useState } from 'react';
import './Home.css';
import logo from '../assets/awsxutd.png';
import checkmark from '../assets/icons/checkmark.png';
import click from '../assets/icons/click.png';
import handshake from '../assets/icons/handshake.png';
import bannerImage from '../assets/banner.gif';
import { Link } from 'react-router-dom';

function Home() {
  const bannerRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    if (window.VANTA) {
      const vantaEffect = window.VANTA.DOTS({
        el: bannerRef.current,
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0xffffff,
        color2: 0xffffff,
        backgroundColor: 0x232f3e,
        size: 2,
        spacing: 30,
        showLines: false
      });
  
      if (vantaEffect.camera) {
        vantaEffect.camera.position.set(10, 150, 100);    // Set camera at (10, 150, 100)
        vantaEffect.camera.lookAt(0, 0, 0);              // Point it at the origin
        vantaEffect.camera.updateMatrix();               // Update the matrix with this position
        vantaEffect.camera.matrixAutoUpdate = true;     // Lock the camera
      }
  
      return () => {
        if (vantaEffect) vantaEffect.destroy();
      };
    }
  }, []);

  return (
    <div className="home">
      <div className="banner" ref={bannerRef}>
        <img src={logo} alt="AWS Logo" className="logo" />
        
        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <nav className={`navbar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link to="/about" className="nav-item">About Us</Link>
          <Link to="/gallery" className="nav-item">Gallery</Link>
          <a href="https://docs.google.com/forms/d/1Bv3maleWj92pPe9KJW-FNw7bXGIdbQBJaAYh5-58UvE/viewform?edit_requested=true" className="nav-item" target="_blank" rel="noopener noreferrer">Careers</a>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSdkXRrus4jSACvdmW6HYDAXguP1UdX7_ZZ4OaBSMKVFd_WwNw/viewform" className="nav-item join-button" target="_blank" rel="noopener noreferrer">Join Us</a>
        </nav>
        
        <div className="content-block">
          <h2 className="banner-heading">
            Join us and get ready to become <span className="highlight">AWS Certified</span>
          </h2>
          <p className="tagline">
            Learn, Build, and Innovate in the Cloud. Join us for hackathons, workshops, seminars, and more!
          </p>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSdkXRrus4jSACvdmW6HYDAXguP1UdX7_ZZ4OaBSMKVFd_WwNw/viewform" className="club-button" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            Join The Club Now!
          </a>
        </div>
        <div className="hexagon-frame">
          <img src={bannerImage} alt="Students working together" className="hexagon-image" />
          <img src={require('../assets/banner-overlay.png')} alt="Overlay" className="hexagon-overlay" />
        </div>
      </div>
      
      <div className="features-section">
        <div className="feature-item">
          <h3 className="feature-title">
            <span className="icon-wrapper">
              <img src={checkmark} alt="Checkmark icon" className="feature-icon" />
            </span>
            Certified Professionals & Mentors
          </h3>
          <p className="feature-description">
            Get guided by peers and faculty with hands-on AWS experience. They'll offer
            practical advice, share resources, and provide real-world insights.
          </p>
        </div>
        
        <div className="feature-item">
          <h3 className="feature-title">
            <span className="icon-wrapper">
              <img src={click} alt="Click icon" className="feature-icon" />
            </span>
            Hands-On Projects
          </h3>
          <p className="feature-description">
            Dive into hackathons and workshops where you'll build serverless apps,
            explore AI services, and experiment with AWS tools.
          </p>
        </div>
        
        <div className="feature-item">
          <h3 className="feature-title">
            <span className="icon-wrapper">
              <img src={handshake} alt="Handshake icon" className="feature-icon" />
            </span>
            Peer & Faculty Support
          </h3>
          <p className="feature-description">
            You're never alone in your learning journey. Our community is
            here to answer questions and celebrate every milestone.
          </p>
        </div>
      </div>
      
      <h3 className="bottom-right-heading">
        Advance your <span className="bold-text">cloud</span> skills through hands‐on <span className="bold-text">workshops</span>, expert <span className="bold-text">mentorship</span>, and a <span className="bold-text">collaborative</span> community
      </h3>
      
      <footer className="home-footer">
        © 2025 AWSxUTD Club.&nbsp;&nbsp;&nbsp;&nbsp;All rights reserved.
      </footer>
    </div>
  );
}

export default Home; 