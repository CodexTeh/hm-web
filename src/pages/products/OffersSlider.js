import React from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";
import offerImage from '@assets/icons/express.jpg';
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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const offerImageStyle = {
    width: "80%",
    height: "auto",
    borderRadius: "6px",
    objectFit: "contain",
    outline: "none",
    cursor: "pointer",
  };

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
        {[...Array(6)].map((_, index) => (
          <Box key={index} sx={{ padding: '25px 40px 10px 30px' }}>
            <img src={offerImage} alt="Offer" style={offerImageStyle} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};
