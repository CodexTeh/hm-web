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
  Tooltip,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useDispatch } from 'react-redux';
import { colorPalette } from '@utils/colorPalette';
import { GetProductCatalogs, GetCategories, GetProducts, GetAllProductsCount, GetProductsLoading, GetCartDetails, GetUser } from "@redux-state/selectors";
import ProductsView from '@pages/products/Products/ProductsView';
import { getProducts, addToCart } from '@redux-state/common/action';
import { Api } from '@redux-state/common/api';
import { addRemoveToWishlist } from '@redux-state/common/action';
import { GetWishlistLoading } from '@redux-state/common/selectors';

export const ProductModal = ({ isRTL, open, setOpen, product, imageUrls }) => {

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [wishListItem, setWishListItem] = useState(false);

  const loopRef = useRef();

  const handleOpen = (value) => setOpen(value);

  const dispatch = useDispatch();

  const allCategories = GetCategories();
  const products = GetProducts();
  const itemsCount = GetAllProductsCount();
  const isFetching = GetProductsLoading();
  const cartDetails = GetCartDetails();
  const wishListLoading = GetWishlistLoading();
  const user = GetUser();

  const handleIncrease = (product) => {
    // Find the existing product in the cart
    const existingProductIndex = cartDetails?.items.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
      const updatedItems = cartDetails.items.map((item, index) => {
        if (index === existingProductIndex) {
          return {
            ...item,
            quantity: item.quantity + 1,
            totalPrice: (item.quantity + 1) * product.price
          };
        }
        return item;
      });

      const newTotalPrice = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0);

      // Update the state (or dispatch the action to update the Redux store)
      dispatch(addToCart({ items: updatedItems, user: user, totalPrice: newTotalPrice }));
    } else {
      const updatedItems = [
        ...cartDetails.items,
        { ...product, quantity: 1, totalPrice: product.price }
      ];

      const newTotalPrice = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0);

      // Update the state (or dispatch the action to update the Redux store)
      dispatch(addToCart({ items: updatedItems, user: user, totalPrice: newTotalPrice }));
    }
  };

  const handleDecrease = (product) => {
    const existingProductIndex = cartDetails?.items.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
      const updatedItems = cartDetails.items.map((item, index) => {
        if (index === existingProductIndex) {
          const newQuantity = item.quantity > 1 ? item.quantity - 1 : 0;
          if (newQuantity === 0) {
            return null; // Remove the item
          }
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: newQuantity * product.price
          };
        }
        return item;
      }).filter(item => item !== null); // Filter out the null values (removed items)

      const newTotalPrice = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0);

      dispatch(addToCart({ items: updatedItems, user: user, totalPrice: newTotalPrice }));
    }
  };

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

  const enProductBrand = enBrands.find(size => size?._id === product?.brand)
  const arProductBrand = arBrands.find(size => size?._id === product?.ar_brand)

  const size = isRTL ? arSizes.find(size => size?.value === arProductSize?.value) : enSizes.find(size => size?.value === enProductSize?.value)
  const brand = isRTL ? arBrands.find(brand => brand?.value === arProductBrand?.value) : enBrands.find(brand => brand?.value === enProductBrand?.value)

  const existingProduct = cartDetails?.items.find(item => item.id === product.id);

  const qty = parseInt(product?.qty_onhand);

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

  const loadProducts = () => {
    const filter = isRTL ? { arabicCategory: category?.id } : { webCategory: category?.id };
    dispatch(getProducts(pagination, filter));
  }

  const checkWishlistProduct = async () => {
    const isWishlistProduct = await Api.checkWishlistProduct(product?.id, user?.id)
    setWishListItem(isWishlistProduct);
  }

  useEffect(() => {
    loadProducts();
  }, [dispatch]);

  useEffect(() => {
    checkWishlistProduct();
  }, [wishListLoading]);


  useEffect(() => {
  }, [])

  const wishlistTooltipText = () => {
    if (isRTL) {
      return wishListItem ? "إزالة من قائمة الأمنيات" : "إضافة إلى قائمة الأمنيات";
    }
    return wishListItem ? "Remove from Wishlist" : "Add to Wishlist"
  }

  const addRemoveInWishlist = () => {
    dispatch(addRemoveToWishlist({ productId: product.id, userId: user.id, type: wishListItem ? 'remove' : 'add' }));
  }
  console.log('yoyo', wishListItem);

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
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" sx={{
                display: '-webkit-box',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '80%',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                fontWeight: 'bold',
                marginBottom: 1,
                direction: isRTL ? 'rtl' : 'ltr',
                textAlign: isRTL ? 'right' : 'left',
              }}>
                {isRTL ? product?.arabicName : product?.website_name}
              </Typography>
              <Tooltip title={wishlistTooltipText()} arrow>
                <IconButton
                  onClick={addRemoveInWishlist}
                  sx={{
                    color: colorPalette.theme,
                    padding: 1, // Add some padding for better spacing
                    border: `1px solid ${wishListItem ? colorPalette.theme : colorPalette.lightGrey}`, // Border color same as theme
                    borderRadius: '50%', // Makes it fully rounded
                    width: 40, // Fixed width
                    height: 40, // Fixed height
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {wishListLoading ? <CircularProgress size={20} /> : wishListItem ? <FavoriteRoundedIcon /> : <FavoriteBorderRoundedIcon />}
                </IconButton>
              </Tooltip>
            </Box>
            <Typography variant="body2" marginTop={5} color="textSecondary" sx={{
              marginBottom: 1, direction: isRTL ? 'rtl' : 'ltr',
              textAlign: isRTL ? 'right' : 'left',
            }}>
              {isRTL ? "مقاس: " : "Size: "}{size?.title}
            </Typography>
            <Typography variant="body2" marginTop={5} color="textSecondary" sx={{
              marginBottom: 1, direction: isRTL ? 'rtl' : 'ltr',
              textAlign: isRTL ? 'right' : 'left',
            }}>
              {isRTL ? "ماركة: " : "Brand: "}{brand?.title}
            </Typography>


            <Typography
              variant="h4"
              sx={{ fontWeight: 'bold', marginTop: 5, color: colorPalette.theme, marginBottom: 1 }}
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
              {qty > 0 && <Button
                variant="contained"
                fullWidth
                onClick={(e) => {
                  e.stopPropagation();
                  handleIncrease(product);
                }}
                size="large"
                sx={{
                  textTransform: 'capitalize',
                  background: colorPalette.theme,
                  padding: '12px',
                  width: '60%',
                  display: 'flex',
                  justifyContent: 'space-between', // Push icons to corners
                  alignItems: 'center',
                }}
              >
                {existingProduct && <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleIncrease(product);
                  }}
                  sx={{ color: colorPalette.white, padding: 0 }}
                >
                  <AddIcon />
                </IconButton>}

                <Typography
                  sx={{
                    color: colorPalette.white,
                    flexGrow: 1,
                    textAlign: 'center'
                  }}
                >
                  {existingProduct ? existingProduct?.quantity : (isRTL ? "أضف إلى سلة التسوق" : "Add to Shopping Cart")}
                </Typography>

                {existingProduct && <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDecrease(product);
                  }}
                  sx={{ color: colorPalette.white, padding: 0 }}
                >
                  <RemoveIcon />
                </IconButton>}
              </Button>}

              <Typography sx={{
                direction: isRTL ? 'rtl' : 'ltr',
                textAlign: isRTL ? 'right' : 'left',
              }} variant="body1" color="textSecondary">
                {qty > 0 ? `${product?.qty_onhand} ${isRTL ? "القطع المتاحة" : "pieces available"}` : `${isRTL ? "إنتهى من المخزن" : "out of stock"}`}
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
        }} variant="h6" marginBottom={1} fontWeight={550}>
          {isRTL ? "تفصیلات" : "Details"}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          dangerouslySetInnerHTML={{
            __html: isRTL ? product?.arabicDescription : product?.webDescription + ''
          }}
          sx={{
            marginBottom: 2, direction: isRTL ? 'rtl' : 'ltr',
            textAlign: isRTL ? 'right' : 'left',
          }}
        />

        <Divider sx={{ marginBottom: 10 }} />

        <Typography sx={{
          direction: isRTL ? 'rtl' : 'ltr',
          textAlign: isRTL ? 'right' : 'left',
        }} variant="h6" marginBottom={5} fontWeight={550}>
          {isRTL ? "المنتجات ذات الصلة" : "Related Products"}
        </Typography>

        <ProductsView hasMoreItems={hasMoreItems} loadProducts={loadProducts} isFetching={isFetching} products={products} isRTL={isRTL} open={open} handleOpen={handleOpen} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
