import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Mobile from './Mobile';

function MobileDetector({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const [previousPath, setPreviousPath] = useState('/');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Store the current path if it's not the mobile path
    if (location.pathname !== '/mobile') {
      setPreviousPath(location.pathname);
    }
  }, [location.pathname]);

  useEffect(() => {
    // Function to check if device is mobile
    const checkMobile = () => {
      const mobileBreakpoint = 767; // Match with your CSS mobile breakpoint
      const isMobileDevice = window.innerWidth <= mobileBreakpoint;
      setIsMobile(isMobileDevice);
      
      if (isMobileDevice && location.pathname !== '/mobile') {
        // If mobile and not on mobile page, redirect to mobile
        navigate('/mobile', { replace: true });
      } else if (!isMobileDevice && location.pathname === '/mobile') {
        // If desktop and on mobile page, redirect back to previous page
        navigate(previousPath, { replace: true });
      }
    };

    // Check on initial load
    checkMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, [location.pathname, navigate, previousPath]);

  // If it's a mobile device and not already on the mobile page, show mobile component
  if (isMobile && location.pathname !== '/mobile') {
    return <Mobile />;
  }

  // Otherwise, render the normal content
  return children;
}

export default MobileDetector; 