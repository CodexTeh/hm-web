import React, { useState, useEffect, useRef, useMemo } from 'react';
import bannerImage from '@assets/icons/banner.jpg';
import { useDispatch } from 'react-redux';
import { GetLanguage, GetBanners } from '@redux-state/common/selectors';
import { getBanners } from '@redux-state/common/action';

const Banner = () => {
  // State to track the drawer visibility and current banner image
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBanners());
  }, []);

  // Language detection
  const language = GetLanguage();
  const banners = GetBanners();

  const isRTL = language === 'ar';

  const bannerUrls = useMemo(() => (isRTL ? banners?.arBannerUrls : banners?.bannerUrls)?.filter(item => item !== '') || [], [isRTL, banners]);

  // Use effect to start the banner rotation every 2 seconds
  useEffect(() => {
    if (bannerUrls.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentBannerIndex(prevIndex => (prevIndex + 1) % bannerUrls.length); // Loop through banners
      }, 5000); // Change every 3 seconds

      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [bannerUrls]);

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
    backgroundImage: `url(${bannerUrls[currentBannerIndex] || bannerImage})`, // Use the current banner image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    padding: 30,
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
