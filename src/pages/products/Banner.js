import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import bannerImage from '@assets/icons/banner.jpg';
import { useImagesPreloaded } from '@helpers/usePreloadImages'; // use the hook above
import { CustomCarousel } from '@components/CustomCarousal';
import { GetLanguage, GetBanners } from '@redux-state/common/selectors';
import { getBanners } from '@redux-state/common/action';

const Banner = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => { dispatch(getBanners()); }, [dispatch]);

  const language = GetLanguage();
  const banners = GetBanners();

  const isRTL = language === 'ar';
  const bannerUrls = useMemo(() =>
    (isRTL ? banners?.arBannerUrls : banners?.bannerUrls)?.filter(item => item) || [bannerImage], 
    [isRTL, banners]
  );

  // 🚨 Wait until all banners are preloaded
  const bannersReady = useImagesPreloaded(bannerUrls);

  // Auto-rotate logic
  useEffect(() => {
    if (bannerUrls.length > 1 && bannersReady) {
      const intervalId = setInterval(() => {
        setCurrentBannerIndex((prev) => (prev + 1) % bannerUrls.length);
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [bannerUrls, bannersReady]);

  const handleImageChange = (index) => setCurrentBannerIndex(index);

  // Skeleton or loader until images are ready!
  if (!bannersReady) {
    return (
      <div style={{
        height: 350,
        width: '100%',
        background: '#f4f4f4',
        borderRadius: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Your fancy loader here if you like */}
        <span>Loading banners...</span>
      </div>
    );
  }

  return (
    <CustomCarousel
      selectedIndex={currentBannerIndex}
      handleImageChange={handleImageChange}
      images={bannerUrls}
      isRTL={isRTL}
      hasChildImages={false}
      showThumbs={false}
      borderRadius={'0px'}
      showStatus={false}
      maxHeight='100%'
      width='100%'
      height='100%'
    />
  );
};

export default Banner;