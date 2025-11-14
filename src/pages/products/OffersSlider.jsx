import React, { useMemo } from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";
// Import useNavigate from react-router-dom
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import expressDeliveryImage from "assets/icons/express.png";
import couponImage from "assets/icons/coupon.png";
import flashsaleImage from "assets/icons/flashsale.png";
import freeDeliveryImage from "assets/icons/free-delivery.png";
import { GetLanguage } from "redux-state/selectors";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const OffersSlider = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const language = GetLanguage?.() || "en"; // fallback for SSR/undefined
  const rtl = language === "ar";

  // --- NextArrow and PrevArrow components (no changes needed here) ---
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
  // -------------------------------------------------------------------

  const settings = useMemo(
    () => ({
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
      rtl: language === "ar",
      lazyLoad: false,
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
    }),
    [language]
  );

  // Modify `images` to be an array of objects, each with src and route
  const offersData = useMemo(
    () => [
      { src: flashsaleImage, route: "/flashSale" },
      { src: couponImage, route: "/offers" },
      { src: freeDeliveryImage }, // Changed '/test' to match your request
      { src: expressDeliveryImage }, // Changed '/test1' to match your request
    ],
    []
  );

  const offerImageStyle = useMemo(
    () => ({
      width: "93%",
      height: "auto",
      borderRadius: "6px",
      objectFit: "contain",
      outline: "none",
      // cursor: "pointer", // Cursor will be handled by the parent Box's sx prop for clickability
    }),
    []
  );

  // Function to handle image click
  const handleOfferClick = (route, idx) => {
    if (route) {
      navigate(route);
    } else {
      const message = rtl
        ? "مرحبًا، لدي بعض الأسئلة حول منتجاتك وسأكون ممتنًا لمساعدتك."
        : "Hello, I have a few questions about your products and would appreciate your assistance.";
      const phoneE164 = (process.env.VITE_WHATSAPP_NUMBER || "").trim();
      const phoneForWaMe = phoneE164.replace(/^\+/, "");
      const url = `https://wa.me/${phoneForWaMe}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

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
        {offersData.map((offer, idx) => (
          // Add onClick to the Box component
          <Box
            key={idx}
            sx={{
              padding: "25px 40px 10px 10px",
              cursor: "pointer", // Make the entire clickable area indicate interactivity
            }}
            onClick={() => handleOfferClick(offer.route, idx)}
          >
            <LazyLoadImage
              width="93%"
              alt={`Offer ${idx + 1}`}
              src={offer.src}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};
