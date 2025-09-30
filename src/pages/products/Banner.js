import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import bannerImage from '@assets/icons/banner.jpg';
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
  const handleImageChange = (index) => setCurrentBannerIndex(index);

  return (
    bannerUrls?.length > 0 ? <CustomCarousel
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
    /> :
      <img
        src={bannerImage}
        alt='Fallback-0'
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
  );
};

export default Banner;