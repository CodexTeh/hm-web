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
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { colorPalette } from '@utils/colorPalette';
import { GetProductCatalogs, GetCategories, GetProducts } from "@redux-state/common/selectors";
import ProductsView from '@pages/layout/Products/ProductsView';


export const ProductModal = ({ isRTL, open, setOpen, product, imageUrls }) => {
  const [isReadMore, setIsReadMore] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleOpen = (value) => setOpen(value);

  const allCategories = GetCategories();
  const products = GetProducts();

  const allProductCatalogs = GetProductCatalogs();
  const splitByTypeAndLanguage = (array) => {
    return array.reduce((acc, item) => {
      const { type, language } = item;

      if (!acc[language]) {
        acc[language] = {};
      }

      if (!acc[language][type]) {
        acc[language][type] = [];
      }

      acc[language][type].push(item);
      return acc;
    }, {});
  };

  const {
    en: {
      brand: enBrands = [],
      'available-color': enAvailableColors = [],
      material: enMaterials = [],
      unit: enUnits = [],
      size: enSizes = []
    } = {},
    ar: {
      brand: arBrands = [],
      'available-color': arAvailableColors = [],
      material: arMaterials = [],
      unit: arUnits = [],
      size: arSizes = []
    } = {}
  } = splitByTypeAndLanguage(allProductCatalogs);

  const enCategory = allCategories.find(category => category?._id === product?.category)
  const arCategory = allCategories.find(category => category?._id === product?.arabicCategory)
  const enSubCategory = enCategory?.subcategories.find(category => category?._id === product?.subCategory)
  const arSubCategory = arCategory?.subcategories.find(category => category?._id === product?.arabicSubCategory)

  const category = isRTL ? arCategory : enCategory;
  const subCategory = isRTL ? arSubCategory : enSubCategory;

  const enProductSize = enSizes.find(size => size?._id === product?.size)
  const arProductSize = arSizes.find(size => size?._id === product?.ar_size)

  const size = isRTL ? arSizes.find(size => size?.value === arProductSize?.value) : enSizes.find(size => size?.value === enProductSize?.value)

  const handleImageChange = (index) => {
    setSelectedIndex(index);
  };
  const gallery = [
    'https://via.placeholder.com/60x60.png?text=1',
    'https://via.placeholder.com/60x60.png?text=2',
    'https://via.placeholder.com/60x60.png?text=3',
    'https://via.placeholder.com/60x60.png?text=3',
  ]

  const images = imageUrls?.length > 0 ? imageUrls : gallery;

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
          images.map((image, index) => (
            <div
              key={index}
              style={{
                border: selectedIndex === index ? `2px solid ${colorPalette.greenButton}` : null,
                borderRadius: '8px',
                boxSizing: 'border-box'
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
        {images?.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Gallery-${index}`}
              style={{
                width: '100%',
                height: 350,
                maxHeight: 350,
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
      onClose={() => setOpen(null)}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        style: { borderRadius: 10, padding: 20 },
      }}
    >
      <DialogActions>
        <IconButton
          onClick={() => setOpen(null)}
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
                justifyContent: 'center'
              }}
            >
              <CustomCarousel />
            </Box>
          </Grid>

          {/* Right Section: Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
              {product?.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
              {size?.title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              dangerouslySetInnerHTML={{
                __html: product?.description + ''
              }}
              sx={{ marginBottom: 2, maxHeight: isReadMore ? 'none' : 70, overflow: isReadMore ? 'visible' : 'hidden' }}
            />
            <Button
              variant="text"
              sx={{ color: colorPalette.greenButton, marginBottom: 5, marginTop: 2, fontSize: 16, textTransform: 'capitalize', fontWeight: 'bold' }}
              onClick={() => setIsReadMore(!isReadMore)}
            >
              {isReadMore ? 'Show less' : 'Read more'}
            </Button>

            <Typography
              variant="h4"
              sx={{ fontWeight: 'bold', color: colorPalette.greenButton, marginBottom: 1 }}
            >
              ${product?.price?.toFixed(2)}
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
                OMR {1}
              </Typography>
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
              <Button
                variant="contained"
                fullWidth
                size='large'
                sx={{
                  textTransform: 'capitalize',
                  background: colorPalette.greenButton,
                  padding: '12px',
                  width: '60%',
                }}
              >
                Add to Shopping Cart
              </Button>
              <Typography variant="body1" color="textSecondary">
                {product?.qty_onhand} pieces available
              </Typography>
            </Box>

            <Divider sx={{ marginY: 2 }} />
            {category && <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
              <strong>Categories:</strong>
              <Button
                variant="outlined"
                size='small'
                sx={{
                  textTransform: 'lowercase',
                  color: colorPalette.black,
                  borderColor: colorPalette.lavenderGray,
                  marginLeft: 2

                }}
              >
                {category?.category?.label}
              </Button>
              <Button
                variant="outlined"
                size='small'
                sx={{
                  textTransform: 'lowercase',
                  color: colorPalette.black,
                  borderColor: colorPalette.lavenderGray,
                  marginLeft: 2
                }}
              >
                {subCategory?.label}
              </Button>
            </Typography>}
          </Grid>
        </Grid>
        <Divider sx={{ marginBottom: 10 }} />
        <Typography variant="h6" marginBottom={5} fontWeight={550}>
          Related Products
        </Typography>
        <ProductsView products={products} isRTL={isRTL} open={open} handleOpen={handleOpen} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
