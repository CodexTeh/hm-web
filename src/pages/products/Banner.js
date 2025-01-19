import React, { useState, useEffect, useRef } from 'react';
import bannerImage from '@assets/icons/banner.jpg';
import constants from '@helpers/constants';
import { Box, Typography } from '@mui/material';
import { GetLanguage } from '@redux-state/common/selectors';
import SearchBar from '../../components/SearchBar';

const Banner = () => {
  // State to track the drawer visibility
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Language detection
  const language = GetLanguage();

  const isRTL = language === 'ar';

  // Ref to the banner section
  const bannerRef = useRef(null);

  // Hook to track scroll position and determine when the bottom of the banner hits the top
  useEffect(() => {
    const handleScroll = () => {
      if (bannerRef.current) {
        const bannerBottom = bannerRef.current.getBoundingClientRect().bottom;

        // Check if the bottom of the banner reaches the top of the viewport
        if (bannerBottom <= window.innerHeight) {
          setDrawerVisible(true); // Open the drawer
        } else {
          setDrawerVisible(false); // Close the drawer
        }
      }
    };

    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Styles for the banner
  const wrapperStyle = {
    position: 'relative',
    // padding: '80px 0',
    backgroundImage: `url(${bannerImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    direction: isRTL ? 'rtl' : 'ltr', // Set direction based on language
  };

  const containerStyle = {
    margin: '0 auto',
    maxWidth: '94.75rem',
    padding: '0 1rem',
    position: 'relative',
    zIndex: 10,
  };



  return (
    <section ref={bannerRef} style={wrapperStyle}>
      <div style={containerStyle} />
    </section>
  );
};

export default Banner;
