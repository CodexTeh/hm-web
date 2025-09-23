import React from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";
import expressDeliveryImage from '@assets/icons/express.png';
import couponImage from '@assets/icons/coupon.png';
import flashsaleImage from '@assets/icons/flashsale.png';
import freeDeliveryImage from '@assets/icons/free-delivery.png';
import { GetLanguage } from '@redux-state/selectors';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

export const OffersSlider = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    arrows: true,
    rtl: GetLanguage() === 'ar', // Set RTL based on the language
    responsive: [
      {
        breakpoint: 1024, // For tablets
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // For mobile devices
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const offerImageStyle = {
    width: "93%",
    height: "auto",
    borderRadius: "6px",
    objectFit: "contain",
    outline: "none",
    cursor: "pointer",
  };
  const images = [flashsaleImage, couponImage, freeDeliveryImage, expressDeliveryImage]

  return (
    <Box
      sx={{
        width: "99%",
        alignSelf: "center",
        margin: "0 auto",
        borderBottom: "1px solid rgba(0, 0, 0, 0.1)", // Light border at the bottom
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)", // Subtle shadow effect
        paddingBottom: "1rem",
      }}
    >
      <Slider {...settings}>
        {images.map((image, index) => (
          <Box key={index} sx={{ padding: '25px 40px 10px 10px' }}>
            <img key={index} src={image} alt="Offer" style={offerImageStyle} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};
