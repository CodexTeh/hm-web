import React, { useMemo } from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";
import expressDeliveryImage from '@assets/icons/express.png';
import couponImage from '@assets/icons/coupon.png';
import flashsaleImage from '@assets/icons/flashsale.png';
import freeDeliveryImage from '@assets/icons/free-delivery.png';
import { GetLanguage } from '@redux-state/selectors';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const OffersSlider = () => {
  const language = GetLanguage?.() || 'en'; // fallback for SSR/undefined
  function NextArrow(props) {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          marginLeft: 20,
          marginRight: 20,
          zIndex: 1,
          cursor: "pointer",
        }}
        onClick={onClick}
      />
    );
  }

  function PrevArrow(props) {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          marginLeft: 20,
          marginRight: 20,
          zIndex: 1,
          cursor: "pointer",
        }}
        onClick={onClick}
      />
    );
  }

  const settings = useMemo(() => ({
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    arrows: true,
    rtl: language === 'ar',
    lazyLoad: false, // Ensure not using slick lazy loading
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  }), [language]); // Only changes direction if language changes

  const images = useMemo(
    () => [flashsaleImage, couponImage, freeDeliveryImage, expressDeliveryImage],
    []
  );

  const offerImageStyle = useMemo(() => ({
    width: "93%",
    height: "auto",
    borderRadius: "6px",
    objectFit: "contain",
    outline: "none",
    cursor: "pointer",
  }), []);

  return (
    <Box
      sx={{
        width: "99%",
        alignSelf: "center",
        margin: "0 auto",
        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        paddingBottom: "1rem",
      }}
    >
      <Slider {...settings}>
        {images.map((image, idx) => (
          <Box key={idx} sx={{ padding: '25px 40px 10px 10px' }}>
            <img src={image} alt={`Offer ${idx + 1}`} style={offerImageStyle} loading="eager" />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};
