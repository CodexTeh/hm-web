import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Button,
  IconButton,
  Grid,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { colorPalette } from '@utils/colorPalette';

export const ProductModal = ({ open, handleClose, product }) => {
  const [isReadMore, setIsReadMore] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleImageChange = (index) => {
    setSelectedIndex(index);
  };

  const CustomCarousel = () => {
    const renderArrowPrev = (onClickHandler, hasPrev, label) =>
      hasPrev && (
        <Box
          onClick={onClickHandler}
          aria-label={label}
          sx={{
            position: 'absolute',
            top: '50%',
            left: 15,
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
            right: 15,
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
        showThumbs={true}
        infiniteLoop={true}
        autoPlay={false}
        selectedItem={selectedIndex}
        onChange={handleImageChange}
        renderArrowPrev={renderArrowPrev}
        renderArrowNext={renderArrowNext}
        renderThumbs={() =>
          product.gallery.map((image, index) => (
            <div
              key={index}
              style={{
                border: selectedIndex === index ? `2px solid ${colorPalette.greenButton}` : null,
                borderRadius: '8px',
                boxSizing: 'border-box',
              }}
            >
              <img
                src={image}
                alt={`Thumbnail-${index}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '6px',
                  objectFit: 'contain',
                  outline: 'none'
                }}
              />
            </div>
          ))
        }

      >
        {product.gallery.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Gallery-${index}`}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: 300,
                objectFit: 'contain',
                borderRadius: '8px',
                outline: 'none'
              }}
            />
          </div>
        ))}
      </Carousel>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: { borderRadius: 10, padding: 20 },
      }}
    >
      <DialogActions>
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogActions>
      <DialogContent>
        <Grid container spacing={2}>
          {/* Left Section: Carousel */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <CustomCarousel />
            </Box>
          </Grid>

          {/* Right Section: Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
              {product.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
              {product.weight}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ marginBottom: 2, maxHeight: isReadMore ? 'none' : 60, overflow: isReadMore ? 'visible' : 'hidden' }}
            >
              {product.description}
            </Typography>
            <Button
              variant="text"
              sx={{ color: colorPalette.greenButton, marginBottom: 2, fontSize: 14, textTransform: 'capitalize', fontWeight: 'bold' }}
              onClick={() => setIsReadMore(!isReadMore)}
            >
              {isReadMore ? 'Show less' : 'Read more'}
            </Button>

            <Typography
              variant="h4"
              sx={{ fontWeight: 'bold', color: colorPalette.greenButton, marginBottom: 1 }}
            >
              ${product.price.toFixed(2)}
              <Typography
                variant="body2"
                component="span"
                color='textDisabled'
                sx={{
                  textDecoration: 'line-through',
                  marginLeft: 1,
                  fontSize: '1rem',
                }}
              >
                ${product.oldPrice.toFixed(2)}
              </Typography>
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

              <Button
                variant="contained"
                fullWidth
                sx={{
                  textTransform: 'capitalize',
                  background: colorPalette.greenButton,
                  padding: '12px',
                  width: '60%',
                  marginBottom: 2,
                }}
              >
                Add to Shopping Cart
              </Button>
              <Typography variant="body2" color="textSecondary">
                {product.available} pieces available
              </Typography>
            </Box>

            <Divider sx={{ marginY: 2 }} />
            <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
              <strong>Categories:</strong> {product.categories.join(', ')}
            </Typography>
            {/* <Typography variant="body2" color="textSecondary">
              <strong>Sellers:</strong>{' '}
              <Button
                variant="text"
                sx={{
                  textTransform: 'capitalize',
                  padding: 0,
                  margin: 0,
                  color: 'primary.main',
                }}
              >
                {product.seller}
              </Button>
            </Typography> */}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
