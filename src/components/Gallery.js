import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Gallery.css';

// Import all images
import img1 from '../assets/gallary/IMG_0998.jpg';
import img2 from '../assets/gallary/IMG_1001.jpg';
import img3 from '../assets/gallary/IMG_1006.jpg';
import img4 from '../assets/gallary/IMG_1152.jpg';
import img5 from '../assets/gallary/IMG_8039.jpg';
import img6 from '../assets/gallary/IMG_8042.jpg';
import img7 from '../assets/gallary/IMG_8046.jpg';
import img8 from '../assets/gallary/IMG_8063.jpg';
import img9 from '../assets/gallary/PXL_20240919_170633499.jpg';
import img10 from '../assets/gallary/PXL_20240919_175938514.jpg';
import img11 from '../assets/gallary/PXL_20240919_181141574.jpg';
import img12 from '../assets/gallary/PXL_20241119_173356482.jpg';
import img13 from '../assets/gallary/PXL_20241119_173408819.jpg';
import img14 from '../assets/gallary/WhatsApp Image 2024-11-19 at 1.56.41 PM (1).jpeg';

// Image descriptions
const imageDescriptions = [
  'AWS Workshop Session with students',
  'Cloud Architecture Demo presentation',
  'Certification Preparation study group',
  'Networking Event with AWS professionals',
  'Hackathon Winners showcase',
  'Cloud Computing Talk by industry experts',
  'Dev Environment Setup workshop',
  'Project Showcase session',
  'AWS community meetup',
  'Team collaboration session',
  'Technical discussion panel',
  'Student engagement activities',
  'AWS cloud services presentation',
  'Training and certification session'
];

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close popup when Escape key is pressed
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Handle popup click outside to close
  const handlePopupClick = (e) => {
    if (e.target.classList.contains('image-popup-overlay')) {
      setSelectedImage(null);
    }
  };

  useEffect(() => {
    const allImages = [
      { src: img1, alt: imageDescriptions[0] },
      { src: img2, alt: imageDescriptions[1] },
      { src: img3, alt: imageDescriptions[2] },
      { src: img4, alt: imageDescriptions[3] },
      { src: img5, alt: imageDescriptions[4] },
      { src: img6, alt: imageDescriptions[5] },
      { src: img7, alt: imageDescriptions[6] },
      { src: img8, alt: imageDescriptions[7] },
      { src: img9, alt: imageDescriptions[8] },
      { src: img10, alt: imageDescriptions[9] },
      { src: img11, alt: imageDescriptions[10] },
      { src: img12, alt: imageDescriptions[11] },
      { src: img13, alt: imageDescriptions[12] },
      { src: img14, alt: imageDescriptions[13] }
    ];

    const loadImageDimensions = async () => {
      const dimensions = await Promise.all(
        allImages.map(image => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = image.src;
            img.onload = () => {
              resolve({ width: img.naturalWidth, height: img.naturalHeight });
            };
            img.onerror = () => {
              resolve({ width: 1, height: 1 }); // Fallback if image fails to load
            };
          });
        })
      );

      // Shuffle images for random arrangement and add dimensions
      const imagesWithDimensions = allImages.map((image, index) => ({
        ...image,
        width: dimensions[index].width,
        height: dimensions[index].height,
        loaded: false
      })).sort(() => 0.5 - Math.random());

      setImages(imagesWithDimensions);
      setLoading(false);
    };

    loadImageDimensions();
  }, []);

  // Generate placeholder items for the loading state
  const placeholderItems = Array.from({ length: 8 }, (_, index) => ({
    id: `placeholder-${index}`,
    width: 1,
    height: Math.random() * 0.5 + 0.7 // Random height between 0.7 and 1.2 to create varied aspect ratios
  }));

  return (
    <div className="gallery-page">
      <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      <nav className={`gallery-navbar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/about" className="nav-item">About Us</Link>
        <a href="https://docs.google.com/forms/d/1Bv3maleWj92pPe9KJW-FNw7bXGIdbQBJaAYh5-58UvE/viewform?edit_requested=true" className="nav-item" target="_blank" rel="noopener noreferrer">Careers</a>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdkXRrus4jSACvdmW6HYDAXguP1UdX7_ZZ4OaBSMKVFd_WwNw/viewform" className="nav-item join-button" target="_blank" rel="noopener noreferrer">Join Us</a>
      </nav>
      
      <div className="gallery-content">
        <h2>Explore Our Gallery:</h2>
      </div>
      <div className="scrollable-container">
        <div className="gallery-flow">
          {loading ? (
            // Display placeholder items during loading
            placeholderItems.map((item) => (
              <div
                key={item.id}
                className="gallery-item"
                style={{ paddingBottom: `${(item.height / item.width) * 100}%` }}
              >
                <div className="image-placeholder"></div>
              </div>
            ))
          ) : (
            // Display actual gallery images when loaded
            images.map((image, index) => (
              <div
                key={index}
                className="gallery-item"
                style={{ paddingBottom: `${(image.height / image.width) * 100}%`, cursor: 'pointer' }}
                onClick={() => setSelectedImage(image)}
              >
                {!image.loaded && <div className="image-placeholder"></div>}
                <img
                  src={image.src}
                  alt={image.alt}
                  className="gallery-image"
                  loading="lazy"
                  onLoad={() => {
                    setImages(prevImages => {
                      const newImages = [...prevImages];
                      newImages[index] = { ...newImages[index], loaded: true };
                      return newImages;
                    });
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none'; // Hide broken images
                  }}
                  style={{ opacity: image.loaded ? 1 : 0 }}
                />
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Image Popup */}
      {selectedImage && (
        <div className="image-popup-overlay" onClick={handlePopupClick}>
          <div className="image-popup-container">
            <img src={selectedImage.src} alt={selectedImage.alt} className="image-popup" />
            <div className="image-popup-caption">{selectedImage.alt}</div>
            <button className="image-popup-close" onClick={() => setSelectedImage(null)}>×</button>
          </div>
        </div>
      )}
      
      <div className="fade-in"></div>
      <div className="fade-out"></div>
      <footer className="gallery-footer">
        © 2025 AWSxUTD Club. All rights reserved.
      </footer>
    </div>
  );
}

export default Gallery;