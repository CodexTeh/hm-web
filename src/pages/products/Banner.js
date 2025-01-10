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

  const flexStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '2.5rem',
    textAlign: 'center',
    flexDirection: 'column',
  };

  const textContainerStyle = {
    // maxWidth: '724px',
    marginTop: '18%',
    textAlign: 'center', // Adjust text alignment based on language
    zIndex: 20,
    alignItems: 'center'
  };

  const headingStyle = {
    fontWeight: 'bold',
    lineHeight: 1.25,
    color: '#000',
    textAlign: 'center',
    // fontSize: 36,
  };

  const descriptionStyle = {
    fontSize: '1.125rem',
    lineHeight: 1.7,
    fontWeight: 'normal',
    color: '#6B7280',
    marginTop: '1rem',
  };

  return (
    <section ref={bannerRef} style={wrapperStyle}>
      <div style={containerStyle}>
        <div style={flexStyle}>
          <div style={textContainerStyle}>
            <Typography variant="h3" style={headingStyle}>
              {isRTL ? constants.AR_BANNER_HEADER : constants.BANNER_HEADER}
            </Typography>
            <Typography variant="body1" style={descriptionStyle}>
              {isRTL ? constants.AR_BANNER_SUB_HEADER : constants.BANNER_SUB_HEADER}
            </Typography>
            <Box sx={{ marginTop: 5 }}>
              <SearchBar />
            </Box>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
