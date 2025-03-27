import React from 'react';
import './Mobile.css';
import mobileLoader from '../assets/mobile loader.mp4';
import logo from '../assets/awsxutd.png';

function Mobile() {
  return (
    <div className="mobile-page">
      <div className="mobile-content">
        <h1>Mobile Website is Under Development</h1>
        
        <div className="video-container">
          <video autoPlay loop muted playsInline className="mobile-video">
            <source src={mobileLoader} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        <p>We're working on creating a better mobile experience for you!</p>
        
        <a 
          href="https://docs.google.com/forms/d/e/1FAIpQLSdkXRrus4jSACvdmW6HYDAXguP1UdX7_ZZ4OaBSMKVFd_WwNw/viewform" 
          className="mobile-join-button" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Join Us
        </a>
      </div>
      
      <div className="mobile-logo-container">
        <img src={logo} alt="AWS Logo" className="mobile-logo" />
      </div>
      
      <footer className="mobile-footer">
        © 2025 AWSxUTD Club.&nbsp;&nbsp;&nbsp;&nbsp;All rights reserved.
      </footer>
    </div>
  );
}

export default Mobile;
