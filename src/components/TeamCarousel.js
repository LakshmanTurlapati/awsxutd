import React, { useRef, useEffect, useState, useLayoutEffect, useMemo } from 'react';
import './TeamCarousel.css';

// Import all officer images
import prasadImage from '../assets/officers/prasad deshpande.jpg';
import akankshImage from '../assets/officers/Akanksha Katoch.jpeg';
import gunaImage from '../assets/officers/Guna shekar Daggupati.jpg';
import mahimaImage from '../assets/officers/Mahima Suresh.jpeg';
import snehaImage from '../assets/officers/Sneha Venkatesh.jpg';
import muattarImage from '../assets/officers/Muattar Fatima.jpg';
import hassanImage from '../assets/officers/Danyal Rehan.jpeg'; // Using available image as placeholder
import ishaImage from '../assets/officers/Deepa-KV.jpeg'; // Using available image as placeholder
import rishabhImage from '../assets/officers/Bhushan Bendigeri.jpeg'; // Using available image as placeholder
import niranjanImage from '../assets/officers/Thanush Ramesh.png'; // Using available image as placeholder
import nijaraImage from '../assets/officers/nijara.png'; // Using available image as placeholder
import chitraImage from '../assets/officers/Ariel-Tamez.jpeg'; // Using available image as placeholder
import sinmisolaImage from '../assets/officers/Giridhar E.jpeg'; // Using available image as placeholder
import manasiImage from '../assets/officers/Venkatgiri Sasanapuri.jpg'; // Using available image as placeholder
import devarshImage from '../assets/officers/Gangadhar Mahankali.jpeg'; // Using available image as placeholder
import suprajaImage from '../assets/officers/PriyaMedankar.jpeg'; // Using available image as placeholder
import ritviImage from '../assets/officers/Ritvi Shah.jpeg';
import shanmathyImage from '../assets/officers/Shanmathy .R.jpeg';
import milindImage from '../assets/officers/Mihir.jpg'; // Using available image as placeholder
import yuktaImage from '../assets/officers/Deepa-KV.jpeg'; // Using available image as placeholder
import philemonImage from '../assets/officers/Fernando.jpeg'; // Using available image as placeholder
import lakshmanImage from '../assets/officers/lakshman.png'; // Using available image as placeholder

const officers = [
  {
    name: "Prasad Deshpande",
    role: "President",
    image: prasadImage
  },
  {
    name: "Akanksha Katoch",
    role: "Vice President",
    image: akankshImage
  },
  {
    name: "Guna Shekar Daggupati",
    role: "CTO",
    image: gunaImage
  },
  {
    name: "Sri Mahima",
    role: "CMO",
    image: mahimaImage
  },
  // Marketing & Social Media
  {
    name: "Sneha",
    role: "Marketing & social media",
    image: snehaImage
  },
  {
    name: "Muttar",
    role: "Marketing & social media",
    image: muattarImage
  },
  {
    name: "Hassan Anas",
    role: "Marketing & social media",
    image: hassanImage
  },
  {
    name: "Narkhede",
    role: "Marketing & social media",
    image: ishaImage
  },
  {
    name: "Isha J",
    role: "Marketing & social media",
    image: ishaImage
  },
  // Technology Officers
  {
    name: "Balaiwar Rishabh",
    role: "Technology Officer",
    image: rishabhImage
  },
  {
    name: "Niranjan Sai",
    role: "Technology Officer",
    image: niranjanImage
  },
  {
    name: "Roy Nijara",
    role: "Technology Officer",
    image: nijaraImage
  },
  {
    name: "Londhe, Chitra",
    role: "Technology Officer",
    image: chitraImage
  },
  {
    name: "Sinmisola-akinjayeju",
    role: "Technology Officer",
    image: sinmisolaImage
  },
  {
    name: "Samant Manasi",
    role: "Technology Officer",
    image: manasiImage
  },
  {
    name: "Pathak, Devarsh Pareshbhai",
    role: "Technology Officer",
    image: devarshImage
  },
  // Growth Officers
  {
    name: "Sri Supraja",
    role: "Growth Officer",
    image: suprajaImage
  },
  {
    name: "Ritvi",
    role: "Growth Officer",
    image: ritviImage
  },
  // SOC
  {
    name: "Shanmathy",
    role: "SOC",
    image: shanmathyImage
  },
  {
    name: "Milind",
    role: "SOC",
    image: milindImage
  },
  {
    name: "Upadhye, Yukta Prasad",
    role: "SOC",
    image: yuktaImage
  },
  // Web Development
  {
    name: "Forson, Philemon Fiifi Eyiah",
    role: "Web Development",
    image: philemonImage
  },
  {
    name: "Turlapati, Lakshman",
    role: "Web Development",
    image: lakshmanImage
  }
];

function TeamCarousel() {
  const carouselRef = useRef(null);
  const containerRef = useRef(null);
  const scrollSpeedRef = useRef(0.5); // Use ref instead of state since we never update it
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [autoScrollPos, setAutoScrollPos] = useState(0);
  const [isPaused, setIsPaused] = useState(true); 
  const [sectionWidth, setSectionWidth] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Clone officers to create continuous scroll effect - memoized to prevent recreating on every render
  const allOfficers = useMemo(() => [...officers, ...officers, ...officers], []);
  
  // Start with all images not loaded to show placeholders
  const [loadedImages, setLoadedImages] = useState({});
  
  // Pre-load officer images with delayed loading to show shimmer effect
  useEffect(() => {
    // Start with all images as not loaded
    const initialLoadState = {};
    allOfficers.forEach((_, index) => {
      initialLoadState[index] = false;
    });
    setLoadedImages(initialLoadState);
    
    // Create image preloaders without artificial delay
    allOfficers.forEach((officer, index) => {
      const img = new Image();
      img.src = officer.image;
      img.onload = () => {
        // Add a small delay to ensure shimmer is visible
        setTimeout(() => {
          setLoadedImages(prev => ({
            ...prev,
            [index]: true
          }));
        }, 300); // 300ms delay to show shimmer effect
      };
    });
  }, [allOfficers]);
  
  // Initialize container and calculate section width - prevent any visible jumps
  useLayoutEffect(() => {
    // Prevent any transitions during page load
    if (containerRef.current) {
      containerRef.current.style.visibility = 'hidden'; // Hide initially
    }
    
    const updateContainer = () => {
      if (containerRef.current) {
        // Calculate dimensions
        const contentWidth = containerRef.current.scrollWidth;
        const calculatedSectionWidth = contentWidth / 3;
        setSectionWidth(calculatedSectionWidth);
        
        // Position immediately without any animation - use translate3d for GPU acceleration
        containerRef.current.style.transition = 'none';
        containerRef.current.style.transform = `translate3d(-${calculatedSectionWidth}px, 0, 0)`;
        setAutoScrollPos(calculatedSectionWidth);
        
        // Force reflow to apply initial position
        void containerRef.current.offsetHeight;
        
        // Make visible only after positioning is complete
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.style.visibility = 'visible';
            // Use translate3d for better performance in Safari
            containerRef.current.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1.0)';
            setIsInitialized(true);
          }
        }, 50);
      }
    };
    
    // Run on mount and on resize
    updateContainer();
    window.addEventListener('resize', updateContainer);
    return () => window.removeEventListener('resize', updateContainer);
  }, []);

  // Only start auto-scrolling when fully initialized
  useEffect(() => {
    if (isInitialized) {
      const timer = setTimeout(() => {
        setIsPaused(false);
      }, 500); // Longer delay for Safari to fully render
      
      return () => clearTimeout(timer);
    }
  }, [isInitialized]);

  // Safari-optimized animation system
  useEffect(() => {
    let rafId = null;
    let lastTimestamp = 0;
    let velocity = scrollSpeedRef.current;
    const targetFps = 60;
    const frameTime = 1000 / targetFps;
    
    const smoothScroll = (timestamp) => {
      if (!containerRef.current || isPaused || !sectionWidth) {
        rafId = requestAnimationFrame(smoothScroll);
        return;
      }
      
      // Calculate delta time with a cap to prevent jumps
      const delta = lastTimestamp ? Math.min(timestamp - lastTimestamp, 100) : 16;
      lastTimestamp = timestamp;
      
      // Smoother movement with time-based animation
      const container = containerRef.current;
      const maxScroll = sectionWidth * 2;
      
      // Calculate frame-rate independent movement
      const distance = (velocity * delta) / frameTime;
      let newPos = autoScrollPos + distance;
      
      // Handle loop with special care for Safari
      if (newPos >= maxScroll - 10) { // Add buffer zone for smoother looping
        // Reset to first section without animation
        newPos = sectionWidth;
        container.style.transition = 'none';
        container.style.transform = `translate3d(-${newPos}px, 0, 0)`;
        
        // Force reflow to apply the instant position change
        void container.offsetHeight;
        
        // Restore transition for next movement - use shorter duration for Safari
        setTimeout(() => {
          if (container) {
            container.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1.0)';
          }
        }, 5); // Very short timeout to ensure the change is applied
        
        setAutoScrollPos(newPos);
        rafId = requestAnimationFrame(smoothScroll);
        return;
      }
      
      // Apply the transform using translate3d for GPU acceleration
      container.style.transform = `translate3d(-${newPos}px, 0, 0)`;
      setAutoScrollPos(newPos);
      
      rafId = requestAnimationFrame(smoothScroll);
    };
    
    rafId = requestAnimationFrame(smoothScroll);
    
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isPaused, sectionWidth, autoScrollPos, isInitialized]);
  
  // Mouse event handlers for manual control
  const handleMouseDown = (e) => {
    setIsPaused(true);
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(autoScrollPos);
    carouselRef.current.style.cursor = 'grabbing';
    
    // Immediately stop any transitions for instant response
    if (containerRef.current) {
      containerRef.current.style.transition = 'none';
    }
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging || !sectionWidth) return;
    e.preventDefault();
    
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX);
    
    // Use translate3d for GPU acceleration in Safari
    if (containerRef.current) {
      const newPos = scrollLeft - walk;
      // Prevent going outside bounds
      const boundedPos = Math.max(sectionWidth * 0.5, Math.min(newPos, sectionWidth * 2.5));
      setAutoScrollPos(boundedPos);
      containerRef.current.style.transform = `translate3d(-${boundedPos}px, 0, 0)`;
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
    carouselRef.current.style.cursor = 'grab';
    
    // Restore transition for smooth movement
    if (containerRef.current) {
      containerRef.current.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1.0)';
    }
    
    // Resume auto-scrolling after delay
    setTimeout(() => setIsPaused(false), 1000);
  };
  
  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      carouselRef.current.style.cursor = 'grab';
      setTimeout(() => setIsPaused(false), 1000);
    }
  };
  
  // Update wheel event handler to only affect carousel
  const handleWheel = (e) => {
    // Only if cursor is directly over carousel
    const rect = carouselRef.current.getBoundingClientRect();
    const isOverCarousel = (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    );
    
    // Only prevent default if directly over carousel
    if (isOverCarousel) {
      e.preventDefault();
      
      if (!containerRef.current || !sectionWidth) return;
      
      // Pause auto-scrolling
      setIsPaused(true);
      
      // Determine scroll direction and amount
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      
      // Apply movement directly to DOM
      const scrollAmount = delta * 2;
      const newPosition = autoScrollPos + scrollAmount;
      const boundedPosition = Math.max(sectionWidth, Math.min(newPosition, sectionWidth * 2));
      
      // Update DOM directly
      containerRef.current.style.transform = `translateX(-${boundedPosition}px)`;
      
      // Then update state
      setAutoScrollPos(boundedPosition);
      
      // Clear any existing timeout
      clearTimeout(window.wheelTimeout);
      
      // Create a new timeout to resume auto-scrolling
      window.wheelTimeout = setTimeout(() => setIsPaused(false), 750);
    }
  };
  
  // Add a targeted event listener that doesn't affect page scrolling
  useEffect(() => {
    // Only add the document listener if carousel exists
    if (!carouselRef.current) return;
    
    // A handler that checks exact bounds before stopping propagation
    const checkScrollBounds = (e) => {
      if (carouselRef.current) {
        const rect = carouselRef.current.getBoundingClientRect();
        const isOverCarousel = (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        );
        
        // Only prevent default if directly over carousel
        if (isOverCarousel) {
          e.preventDefault();
        }
      }
    };
    
    // Add the checker to document with capture: true for early interception
    document.addEventListener('wheel', checkScrollBounds, { passive: false, capture: true });
    
    return () => {
      document.removeEventListener('wheel', checkScrollBounds, { capture: true });
    };
  }, []);
  
  // Make sure to update the container transition to be more responsive
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transition = 'transform 0.2s ease';
    }
  }, []);
  
  // Touch events for mobile devices
  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsPaused(true);
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(autoScrollPos);
  };
  
  const handleTouchMove = (e) => {
    e.preventDefault();
    if (!isDragging || !sectionWidth) return;
    
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Reduced sensitivity
    
    requestAnimationFrame(() => {
      const newPos = scrollLeft - walk;
      const boundedPos = Math.max(sectionWidth, Math.min(newPos, sectionWidth * 2));
      setAutoScrollPos(boundedPos);
      containerRef.current.style.transform = `translateX(${-boundedPos}px)`;
    });
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
    setTimeout(() => setIsPaused(false), 1000);
  };

  return (
    <div 
      className="team-carousel prevent-swipe"
      ref={carouselRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="carousel-container" ref={containerRef}>
        {/* Add an extra empty card at the beginning for better fade effect */}
        <div className="officer-card empty-card"></div>
        
        {allOfficers.map((officer, index) => (
          <div key={index} className="officer-card">
            <div className="officer-image">
              {/* Always show the placeholder until image is loaded */}
              <div className="image-placeholder"></div>
              <img 
                src={officer.image} 
                alt={officer.name} 
                style={{ opacity: loadedImages[index] ? 1 : 0 }}
              />
              <div className="officer-info" style={{ 
                opacity: loadedImages[index] ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out'
              }}>
                <div className="officer-name">{officer.name}</div>
                <div className="officer-role">{officer.role}</div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Add an extra empty card at the end for better fade effect */}
        <div className="officer-card empty-card"></div>
      </div>
    </div>
  );
}

export default TeamCarousel; 