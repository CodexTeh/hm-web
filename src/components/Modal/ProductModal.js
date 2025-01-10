import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  LinearProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useDispatch } from 'react-redux';
import { colorPalette } from '@utils/colorPalette';
import { GetProductCatalogs, GetCategories, GetProducts, GetAllProductsCount, GetProductsLoading } from "@redux-state/common/selectors";
import ProductsView from '@pages/products/Products/ProductsView';
import { getProducts } from '@redux-state/common/action';

export const ProductModal = ({ isRTL, open, setOpen, product, imageUrls }) => {
  const [isReadMore, setIsReadMore] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [hasMoreItems, setHasMoreItems] = useState(true);

  const loopRef = useRef();

  const handleOpen = (value) => setOpen(value);

  const dispatch = useDispatch();

  const allCategories = GetCategories();
  const products = GetProducts();
  const itemsCount = GetAllProductsCount();
  const isFetching = GetProductsLoading();

  const pagination = useMemo(
    () => ({
      page: 0,
      perPage: rowsPerPage,
    }),
    [rowsPerPage]
  );

  useEffect(() => {
    const handleScroll = () => {
      const element = loopRef.current;
      if (!element) return;

      const isBottomReached =
        element.scrollTop + element.clientHeight >= element.scrollHeight - 1;


      if (isBottomReached) {
        setRowsPerPage((prevRows) => prevRows + 10); // Load more items
      }
    };

    const element = loopRef.current;
    if (element) {
      element.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener('scroll', handleScroll);
      }
    };
  }, [loopRef?.current?.scrollTop]);

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  const fetchFeedData = useCallback(() => {
    if (itemsCount > 0 && itemsCount <= pagination.perPage) {
      setHasMoreItems(false);
    }
  }, [dispatch, pagination, itemsCount, pagination.perPage]);

  useEffect(() => {
    fetchFeedData();
  }, [pagination.perPage, fetchFeedData]);

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

  const enCategory = allCategories.find(category => category?._id === product?.webCategory)
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

  useEffect(() => {
    const filter = isRTL ? { arabicCategory: category?.arabicCategory } : { Category: category?.webCategory };
    dispatch(getProducts(pagination, filter)); // Fetch products
  }, [dispatch, pagination]);


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
                border: selectedIndex === index ? `2px solid ${colorPalette.theme}` : null,
                borderRadius: '8px',
                boxSizing: 'border-box',
                transform: isRTL ? 'scaleX(-1)' : 'none', // Flip thumbnails if RTL
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
                  outline: 'none',
                  transform: isRTL ? 'scaleX(-1)' : 'none', // Flip thumbnails if RTL
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
                width: '100%',
                height: 350,
                maxHeight: 350,
                objectFit: 'contain',
                borderRadius: '8px',
                outline: 'none',
                transform: isRTL ? 'scaleX(-1)' : 'none', // Flip main images if RTL
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
      <DialogContent ref={loopRef} sx={{
        overflowY: 'auto', // Ensure the scrollbar appears when needed
        '&::-webkit-scrollbar': {
          width: '8px', // Customize scrollbar width
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: colorPalette.theme,
          borderRadius: '8px',
          border: '2px solid #fff',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: colorPalette.theme,
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#f1f1f1',
        },
      }}>
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
            <Typography variant="h5" sx={{
              fontWeight: 'bold', marginBottom: 1, direction: isRTL ? 'rtl' : 'ltr',
              textAlign: isRTL ? 'right' : 'left',
            }}>
              {isRTL ? product?.arabicName : product?.website_name}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{
              marginBottom: 1, direction: isRTL ? 'rtl' : 'ltr',
              textAlign: isRTL ? 'right' : 'left',
            }}>
              {size?.title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              dangerouslySetInnerHTML={{
                __html: isRTL ? product?.arabicDescription : product?.webDescription + ''
              }}
              sx={{
                marginBottom: 2, maxHeight: isReadMore ? 'none' : 100, overflow: isReadMore ? 'visible' : 'hidden', direction: isRTL ? 'rtl' : 'ltr',
                textAlign: isRTL ? 'right' : 'left',
              }}
            />
            <Button
              variant="text"
              sx={{
                color: colorPalette.theme,
                marginBottom: 5,
                marginTop: 2,
                fontSize: 16,
                textTransform: 'capitalize',
                fontWeight: 'bold',
                direction: isRTL ? 'rtl' : 'ltr', // Adjust text direction dynamically
                textAlign: isRTL ? 'right' : 'left', // Align text for RTL
              }}
              onClick={() => setIsReadMore(!isReadMore)}
            >
              {isRTL
                ? isReadMore
                  ? 'عرض أقل' // Arabic for "Show less"
                  : 'اقرأ المزيد' // Arabic for "Read more"
                : isReadMore
                  ? 'Show less'
                  : 'Read more'}
            </Button>


            <Typography
              variant="h4"
              sx={{ fontWeight: 'bold', color: colorPalette.theme, marginBottom: 1 }}
            >
              {isRTL ? "ر۔ع  " : "OMR  "}{product?.price?.toFixed(2)}
              <Typography
                variant="body2"
                component="span"
                color='textDisabled'
                sx={{
                  textDecoration: 'line-through',
                  marginLeft: 2,
                  marginRight: 2,
                  fontSize: '1rem',
                  direction: isRTL ? 'rtl' : 'ltr',
                  textAlign: isRTL ? 'right' : 'left',
                }}
              >
                {isRTL ? "ر۔ع" : "OMR"} {1}
              </Typography>
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
              <Button
                variant="contained"
                fullWidth
                size='large'
                sx={{
                  textTransform: 'capitalize',
                  background: colorPalette.theme,
                  padding: '12px',
                  width: '60%',
                }}
              >
                {isRTL ? "أضف إلى سلة التسوق" : "Add to Shopping Cart"}
              </Button>
              <Typography sx={{
                direction: isRTL ? 'rtl' : 'ltr',
                textAlign: isRTL ? 'right' : 'left',
              }} variant="body1" color="textSecondary">
                {product?.qty_onhand} {isRTL ? "القطع المتاحة" : "pieces available"}
              </Typography>
            </Box>

            <Divider sx={{ marginY: 2 }} />
            {category && <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
              <strong dir={isRTL && "rtl"}>{isRTL ? "فئات: " : "Categories:"}</strong>
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
              {subCategory && <Button
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
              </Button>}
            </Typography>}
          </Grid>
        </Grid>
        <Divider sx={{ marginBottom: 10 }} />
        <Typography sx={{
          direction: isRTL ? 'rtl' : 'ltr',
          textAlign: isRTL ? 'right' : 'left',
        }} variant="h6" marginBottom={5} fontWeight={550}>
          {isRTL ? "المنتجات ذات الصلة" : "Related Products"}
        </Typography>
        <ProductsView products={products} isRTL={isRTL} open={open} handleOpen={handleOpen} setOpen={setOpen} />
        {isFetching && itemsCount > 10 && hasMoreItems && (
          <LinearProgress value={10} />
        )}
        {isFetching && (
          <Typography
            sx={{ textAlign: 'center', marginTop: 2, color: 'gray' }}
            variant="body2"
          >
            {isRTL ? 'جار تحميل المنتجات...' : 'Loading more products...'}
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};
