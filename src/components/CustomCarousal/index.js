import React from 'react';
import {
  Box,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { colorPalette } from '@utils/colorPalette';

export const CustomCarousel = ({ selectedIndex, handleImageChange, images, isRTL, showThumbs = true, width = '100%', height = 350, maxHeight = 350, showStatus = true, borderRadius = '8px' }) => {
  const renderArrowPrev = (onClickHandler, hasPrev, label) =>
    hasPrev && (
      <Box
        onClick={onClickHandler}
        aria-label={label}
        sx={{
          position: 'absolute',
          top: '50%',
          left: 30,
          transform: 'translateY(-50%)',
          zIndex: 2,
          width: 40,
          height: 40,
          backgroundColor: 'white',
          borderRadius: '50%',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <ArrowBackIosIcon />
      </Box>
    );

  const renderArrowNext = (onClickHandler, hasNext, label) =>
    hasNext && (
      <Box
        onClick={onClickHandler}
        aria-label={label}
        sx={{
          position: 'absolute',
          top: '50%',
          right: 30,
          transform: 'translateY(-50%)',
          zIndex: 2,
          width: 40,
          height: 40,
          backgroundColor: 'white',
          borderRadius: '50%',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <ArrowForwardIosIcon />
      </Box>
    );

  return (
    <Carousel
      showArrows={true}
      showThumbs={showThumbs}
      showStatus={showStatus}
      infiniteLoop={true}
      autoPlay={true}
      selectedItem={selectedIndex}
      onChange={handleImageChange}
      renderArrowPrev={renderArrowPrev}
      renderArrowNext={renderArrowNext}
      renderThumbs={() => images.map((image, index) => (
        <div
          key={index}
          style={{
            border: selectedIndex === index ? `2px solid ${colorPalette.theme}` : null,
            borderRadius: '8px',
            boxSizing: 'border-box',
            width: 74,
            // transform: isRTL ? 'scaleX(-1)' : 'none', // Flip thumbnails if RTL
          }}
        >
          <img
            src={image}
            alt={`Thumbnail-${index}`}
            style={{
              width: 70,
              height: 70,
              borderRadius: '6px',
              objectFit: 'fill',
              outline: 'none',
              // transform: isRTL ? 'scaleX(-1)' : 'none', // Flip thumbnails if RTL
            }}
          />
        </div>
      ))
      }
      style={{
        direction: isRTL ? 'rtl' : 'ltr', // Set direction for carousel
      }}
    >
      {images?.map((image, index) => (
        <div key={index}>
          <img
            src={image}
            alt={`Gallery-${index}`}
            style={{
              width: width,
              height: height,
              maxHeight: maxHeight,
              objectFit: 'contain',
              borderRadius: borderRadius,
              outline: 'none',
              // transform: isRTL ? 'scaleX(-1)' : 'none', // Flip main images if RTL
            }}
          />
        </div>
      ))}
    </Carousel>

  );
};