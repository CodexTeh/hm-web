import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Typography,
  Box,
  Button,
  IconButton,
  Grid,
  Divider,
  Tooltip,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import { openLoginModal } from '@redux-state/actions';
import { useDispatch } from 'react-redux';
import { colorPalette } from '@utils/colorPalette';
import emptyProductImage from '@assets/icons/empty-product.jpg';
import { GetProductCatalogs, GetSubCategories, GetCategories, GetProducts, GetAllProductsCount, GetProductsLoading, GetCartDetails, GetUser } from "@redux-state/selectors";
import useRouter from '@helpers/useRouter';
import ProductsView from '@pages/products/Products/ProductsView';
import { getProducts, addToCart } from '@redux-state/actions';
import { Api } from '@redux-state/common/api';
import { addRemoveToWishlist } from '@redux-state/actions';
import { GetWishlistLoading, GetLanguage } from '@redux-state/selectors';
import { CustomCarousel } from '@components/CustomCarousal';
import SharePopover from '@components/ShareButon';
import CartFloatButton from '../products/CartFloatButton';
import CardDrawer from '../products/CardDrawer/CartDrawer';

export const ProductView = () => {
  const router = useRouter();
  const { barcode } = router.query;
  const [product, setProduct] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  // Language/RTL
  const language = GetLanguage(); // 'en' | 'ar'
  const isRTL = language === 'ar';

  // Fetch single product when barcode changes
  useEffect(() => {
    let cancelled = false;
    const fetchSingleProduct = async () => {
      if (!barcode) return;
      try {
        const product = await Api.getSpecificProduct(barcode);
        if (product && !cancelled) {
          setProduct(product);
        }
      } catch {
        // optional: handle error
      }
    };
    fetchSingleProduct();
    return () => {
      cancelled = true;
    };
  }, [barcode]);
  const discountValue = useMemo(() => {
    if (product) {
      const flash = product?.flash_sale;
      const discount = product?.discount_offer;
      if (typeof flash === 'number' && flash > 0) return flash;
      if (typeof discount === 'number' && discount > 0) return discount;
      return 0;
    } else {
      return 0;
    }
  }, [product]);

  const hasDiscount = discountValue > 0;

  const finalPrice = useMemo(() => {
    if (!product?.price) return '';
    const price = Number(product.price);
    const discount = Number(discountValue);
    if (!isFinite(price)) return '';
    const discounted = price - (price * discount) / 100;
    // keep consistent precision
    return discounted.toFixed(3);
  }, [product, discountValue]);

  // Derived data with safe defaults
  const imageUrls = useMemo(() => {
    if (!product?.image_urls) return [];
    try {
      // image_urls is a stringified JSON array or already an array
      if (typeof product.image_urls === 'string') {
        const parsed = JSON.parse(product.image_urls.replace(/'/g, '"'));
        return Array.isArray(parsed) ? parsed : [];
      }
      return Array.isArray(product.image_urls) ? product.image_urls : [];
    } catch {
      // Fallback: if it's a comma-separated string or single URL
      const v = product.image_urls;
      if (typeof v === 'string' && v.length > 0) return [v];
      return [];
    }
  }, [product]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [wishListItem, setWishListItem] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openShare, setOpenShare] = React.useState(false);

  const loopRef = useRef();
  
  
  const dispatch = useDispatch();
  
  const allCategories = GetCategories();
  const subCategories = GetSubCategories();
  const products = GetProducts();
  const itemsCount = GetAllProductsCount();
  const isFetching = GetProductsLoading();
  const cartDetails = GetCartDetails();
  const wishListLoading = GetWishlistLoading();
  const user = GetUser();

  const prevTotalPriceRef = useRef(cartDetails?.totalPrice);

  // share popper handlers
  const handleShareClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenShare((prev) => !prev);
  };

  const handleCloseShare = () => {
    setOpenShare(false);
    setAnchorEl(null);
  };

useEffect(() => {
  if (
    cartDetails &&
    typeof cartDetails.totalPrice !== 'undefined' &&
    cartDetails.totalPrice !== prevTotalPriceRef.current
  ) {
    handleDrawerOpen();
  }

  // update ref after checking
  prevTotalPriceRef.current = cartDetails?.totalPrice;
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [cartDetails]);


  const handleIncrease = (product, finalPrice) => {
    const existingProductIndex = cartDetails?.items.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
      const updatedItems = cartDetails.items.map((item, index) => {
        if (index === existingProductIndex) {
          if (item.quantity === parseInt(item?.qty_onhand)) {
            alert(isRTL
              ? `لا يمكنك إضافة أكثر من ${item?.qty_onhand}. لدينا فقط ${item?.qty_onhand} قطعة في المخزون.`
              : `You cannot add more than ${item?.qty_onhand}. We have only ${item?.qty_onhand} items in stock`);
            return item;
          }
          return {
            ...item,
            quantity: item.quantity + 1,
            totalPrice: (item.quantity + 1) * Number(finalPrice)
          };
        }
        return item;
      });

      const newTotalPrice = updatedItems.reduce((sum, item) => sum + Number(item.totalPrice), 0);
      dispatch(addToCart({ items: updatedItems, user: user, totalPrice: newTotalPrice }));
    } else {
      const updatedItems = [
        ...cartDetails.items,
        { ...product, quantity: 1, totalPrice: finalPrice }
      ];

      const newTotalPrice = updatedItems.reduce((sum, item) => sum + Number(item.totalPrice), 0);
      dispatch(addToCart({ items: updatedItems, user: user, totalPrice: newTotalPrice }));
    }
  };

  const handleDecrease = (product, finalPrice) => {
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
            totalPrice: newQuantity * Number(finalPrice)
          };
        }
        return item;
      }).filter(item => item !== null);

      const newTotalPrice = updatedItems.reduce((sum, item) => sum + Number(item.totalPrice), 0);
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
      const isBottomReached = element.scrollTop + element.clientHeight >= element.scrollHeight - 1;
      if (isBottomReached) {
        setRowsPerPage((prevRows) => prevRows + 10);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, pagination, itemsCount, pagination.perPage]);

  useEffect(() => {
    fetchFeedData();
  }, [pagination.perPage, fetchFeedData]);

  const allProductCatalogs = GetProductCatalogs();
  const splitByTypeAndLanguage = (array) => {
    return array.reduce((acc, item) => {
      const { type } = item;
      const language = 'en';
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
  } = splitByTypeAndLanguage(allProductCatalogs);

  const category = allCategories.find(category => category?.id?.toString() === product?.webCategory?.toString())
  const subCategory = subCategories.find(subcategory => subcategory?.id?.toString() === product?.subCategory?.toString())

  const enProductSize = enSizes.find(size => size?.id?.toString() === product?.size?.toString())
  const arProductSize = enSizes.find(size => size?.id?.toString() === product?.ar_size?.toString())

  const enProductBrand = enBrands.find(size => size?.id?.toString() === product?.brand?.toString())
  const arProductBrand = enBrands.find(size => size?.id?.toString() === product?.ar_brand?.toString())

  const enProductUnit = enUnits.find(unit => unit?.id?.toString() === product?.unit?.toString())
  const arProductUnit = enUnits.find(unit => unit?.id?.toString() === product?.ar_unit?.toString())

  const enProductMaterial = enMaterials.find(mat => mat?.id?.toString() === product?.material?.toString())
  const arProductMaterial = enMaterials.find(mat => mat?.id?.toString() === product?.ar_material?.toString())

  const enProductColor = enAvailableColors.find(color => color?.id?.toString() === product?.avalable_color?.toString())
  const arProductColor = enAvailableColors.find(color => color?.id?.toString() === product?.ar_color?.toString())

  const size = isRTL ? enSizes.find(size => size?.id?.toString() === arProductSize?.id?.toString()) : enSizes.find(size => size?.id?.toString() === enProductSize?.id?.toString())
  const brand = isRTL ? enBrands.find(brand => brand?.id?.toString() === arProductBrand?.id?.toString()) : enBrands.find(brand => brand?.id?.toString() === enProductBrand?.id?.toString())
  const unit = isRTL ? enUnits.find(unit => unit?.id?.toString() === arProductUnit?.id?.toString()) : enUnits.find(unit => unit?.id?.toString() === enProductUnit?.id?.toString())
  const material = isRTL ? enMaterials.find(material => material?.id?.toString() === arProductMaterial?.id?.toString()) : enMaterials.find(material => material?.id?.toString() === enProductMaterial?.id?.toString())
  const color = isRTL ? enAvailableColors.find(color => color?.id?.toString() === arProductColor?.id?.toString()) : enAvailableColors.find(color => color?.id?.toString() === enProductColor?.id?.toString())

  const existingProduct = cartDetails?.items.find(item => item?.id === product?.id);

  const qty = parseInt(product?.qty_onhand);

  const handleImageChange = (index) => {
    setSelectedIndex(index);
  };
  const gallery = [emptyProductImage];
  const images = imageUrls?.length > 0 ? imageUrls : gallery;

  const loadProducts = () => {
    const query = isRTL ? { arabicCategory: category?.id } : { webCategory: category?.id };
    dispatch(getProducts(pagination, query));
  }

  const checkWishlistProduct = async () => {
    const isWishlistProduct = await Api.checkWishlistProduct(product?.id, user?.id)
    setWishListItem(isWishlistProduct);
  }

  useEffect(() => {
    checkWishlistProduct();
    // eslint-disable-next-line
  }, [wishListLoading]);

  const wishlistTooltipText = () => {
    if (isRTL) {
      return wishListItem ? "إزالة من قائمة الأمنيات" : "إضافة إلى قائمة الأمنيات";
    }
    return wishListItem ? "Remove from Wishlist" : "Add to Wishlist"
  }

  const addRemoveInWishlist = () => {
    if (!user) return dispatch(openLoginModal(true));
    dispatch(addRemoveToWishlist({ productId: product.id, userId: user.id, type: wishListItem ? 'remove' : 'add' }));
  }
  const productLink = `${process.env.REACT_APP_FE_URL}/product/${product?.barcode}`;
  // Drawer handlers
  const handleDrawerOpen = useCallback(() => setOpenDrawer(true)
    , []);
  const handleDrawerClose = useCallback(() => setOpenDrawer(false), []);

  return (
    <Box sx={{ padding: 5, marginTop: 10 }}>
      {/* Back Button */}
      <Box
        sx={{
          position: 'sticky',
          top: 80,
          zIndex: 1000, 
          justifyContent: isRTL ? 'flex-end' : 'flex-start',
        }}
      >
        <IconButton
          onClick={() => window.location.replace('/home')}
          sx={{
            backgroundColor: colorPalette.theme,
            color: colorPalette.white,
            '&:hover': {
              backgroundColor: colorPalette.themeHover || '#333',
            },
          }}
        >
          {/* Flip icon for RTL */}
          <ArrowBackIcon sx={{ transform: isRTL ? 'rotate(180deg)' : 'none' }} />
        </IconButton>
      </Box>

      <Grid container spacing={2}>
        {/* Left Section: Carousel */}
        <Grid item xs={12} md={6} >
          {/* <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                maxWidth: { xs: '100%', md: 400 },
                mx: 'auto',
              }}
            > */}
          <CustomCarousel selectedIndex={selectedIndex} handleImageChange={handleImageChange} images={images} isRTL={isRTL} />
          {/* </Box> */}
        </Grid>

        {/* Right Section: Details */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', mt: -2 }}>
            <Typography variant="h1" sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '80%',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              fontWeight: 'bold',
              fontSize: { xs: 17, sm: 24 },
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
                  padding: 1,
                  border: `1px solid ${wishListItem ? colorPalette.theme : colorPalette.lightGrey}`,
                  borderRadius: '50%',
                  width: { xs: 30, md: 40 },
                  height: { xs: 30, md: 40 },
                }}
              >
                {wishListLoading ? <CircularProgress size={20} /> : wishListItem ? <FavoriteRoundedIcon sx={{
                  width: { xs: 20, md: 30 },
                  height: { xs: 20, md: 30 },
                }} /> : <FavoriteBorderRoundedIcon sx={{
                  width: { xs: 20, md: 30 },
                  height: { xs: 20, md: 30 },
                }} />}
              </IconButton>
            </Tooltip>
            {/* Share Button */}
            <Tooltip title="Share" arrow>
              <IconButton
                onClick={handleShareClick}
                sx={{
                  color: 'inherit',
                  padding: 1,
                  border: `1px solid ${openShare ? 'primary.main' : 'lightgrey'}`,
                  borderRadius: '50%',
                  width: { xs: 30, md: 40 },
                  height: { xs: 30, md: 40 },
                }}
                aria-label="Share"
              >
                <ShareRoundedIcon
                  sx={{
                    width: { xs: 20, md: 30 },
                    height: { xs: 20, md: 30 },
                  }} />
              </IconButton>
            </Tooltip>
            <SharePopover
              anchorEl={anchorEl}
              open={openShare}
              onClose={handleCloseShare}
              productLink={productLink}
              title={product?.website_name}
              isRTL={isRTL}
              productImage={images[0]}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', justifyContent: isMobile ? 'space-between' : 'flex-start', alignItems: isMobile ? 'center' : 'flex-start', marginTop: isMobile ? 0 : 5 }}>

            {/* Price */}
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: colorPalette.theme,
                mb: 1,
                fontSize: { xs: 14, sm: 28 }
              }}
            >
              {isRTL ? "ر۔ع  " : "OMR  "}{finalPrice}
              {hasDiscount && <Typography
                variant="body2"
                component="span"
                color='textDisabled'
                sx={{
                  textDecoration: 'line-through',
                  mx: 2,
                  fontSize: { xs: 13, sm: '1rem' },
                  direction: isRTL ? 'rtl' : 'ltr',
                  textAlign: isRTL ? 'right' : 'left',
                }}
              >
                {isRTL ? "ر۔ع" : "OMR"} {product?.price}
              </Typography>}
            </Typography>

            {/* Cart/Add controls */}
            <Box sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'flex-start',
              alignItems: { xs: 'stretch', sm: 'center' },
              gap: 1.5,
              width: isMobile ? null : '100%',
              mt: isMobile ? 1 : 4,
              mb: isMobile ? 0 : 4,
            }}>
              {qty > 0 && <Button
                variant="contained"
                fullWidth
                onClick={(e) => {
                  e.stopPropagation();
                  handleIncrease(product, finalPrice);
                }}
                size="large"
                sx={{
                  textTransform: 'capitalize',
                  background: colorPalette.theme,
                  width: '100%',
                  fontSize: { xs: 12, sm: 16 },
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {existingProduct && <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleIncrease(product, finalPrice);
                  }}
                  sx={{ color: colorPalette.white, p: 0, mr: 2, ml: 2 }}
                  size="small"
                >
                  <AddIcon />
                </IconButton>}

                <Typography
                  sx={{
                    color: colorPalette.white,
                    flexGrow: 1,
                    textAlign: 'center',
                    fontWeight: 600,
                    fontSize: { xs: 12, md: 16 }
                  }}
                >
                  {existingProduct ? existingProduct?.quantity : (isRTL ? "أضف إلى سلة التسوق" : "Add to Shopping Cart")}
                </Typography>

                {existingProduct && <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDecrease(product, finalPrice);
                  }}
                  sx={{ color: colorPalette.white, p: 0, ml: 2, mr: 2 }}
                  size="small"
                >
                  <RemoveIcon />
                </IconButton>}
              </Button>}

              <Typography
                sx={{
                  direction: isRTL ? 'rtl' : 'ltr',
                  textAlign: 'center',
                  width: isMobile ? null : '40%',
                  fontSize: { xs: 9, sm: 9, md: 12 }
                }}
                variant="body1"
                color="textSecondary"
              >
                {qty > 0 ? `${product?.qty_onhand} ${isRTL ? "القطع المتاحة" : "pieces available"}` : `${isRTL ? "إنتهى من المخزن" : "out of stock"}`}
              </Typography>
            </Box>
          </Box>
          {/* Product Attributes */}
          <Grid container spacing={2} mt={2}>
            {[{
              label: isRTL ? "مقاس: " : "Size: ", value: isRTL ? size?.ar_title : size?.title
            }, {
              label: isRTL ? "ماركة: " : "Brand: ", value: isRTL ? brand?.ar_title : brand?.title
            }, {
              label: isRTL ? "وحدة: " : "Unit: ", value: isRTL ? unit?.ar_title : unit?.title
            }, {
              label: isRTL ? "لون: " : "Color: ", value: isRTL ? color?.ar_title : color?.title
            }, {
              label: isRTL ? "رمز العنصر: " : "Material: ", value: isRTL ? material?.ar_title : material?.title
            }, {
              label: isRTL ? "الباركود: " : "Item Code: ", value: product?.barcode
            }].map((attr, idx) => (
              <Grid item xs={6} sm={6} md={4} key={idx}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    direction: isRTL ? 'rtl' : 'ltr',
                    textAlign: isRTL ? 'right' : 'left',
                    fontSize: { xs: 13, sm: 15 }
                  }}
                >
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    fontWeight={900}
                    sx={{
                      direction: isRTL ? 'rtl' : 'ltr',
                      textAlign: isRTL ? 'right' : 'left',
                      fontSize: { xs: 13, sm: 15 },
                    }}
                  >{attr.label}</Typography>{attr.value}
                </Typography>
              </Grid>
            ))}
          </Grid>
          <Divider sx={{ my: 2 }} />
          {/* Category/Subcategory */}
          {category &&
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1, display: 'flex', alignItems: 'start' }}>
              <strong dir={isRTL && "rtl"}>{isRTL ? "فئات: " : "Categories:"}</strong>

              {/* Category button */}
              <Button
                variant="outlined"
                size='small'
                sx={{
                  textTransform: 'lowercase',
                  color: colorPalette.black,
                  borderColor: colorPalette.boxShadowGrey,
                  ml: 2, // Adds margin to the left for spacing
                  fontSize: { xs: 10, md: 12 },
                  borderRadius: 2, // Optional: to make the button's corners rounded
                  padding: '4px 10px' // Optional: you can adjust the padding for better alignment
                }}
              >
                {isRTL ? category?.ar_category : category?.category}
              </Button>

              {/* Subcategory button (optional) */}
              {subCategory && (
                <Button
                  variant="outlined"
                  size='small'
                  sx={{
                    textTransform: 'lowercase',
                    color: colorPalette.black,
                    borderColor: colorPalette.boxShadowGrey,
                    fontSize: { xs: 10, md: 12 },
                    ml: 2, // Margin to space it from the first button
                    borderRadius: 2, // Optional: to round the corners
                    padding: '4px 10px' // Optional: better padding for alignment
                  }}
                >
                  {isRTL ? subCategory?.ar_subcategory : subCategory?.subcategory}
                </Button>
              )}
            </Typography>

          }
        </Grid>
      </Grid>
      <Divider sx={{ mb: { xs: 3, sm: 6 } }} />
      {/* Product Details */}
      <Typography
        sx={{
          direction: isRTL ? 'rtl' : 'ltr',
          textAlign: isRTL ? 'right' : 'left',
          fontWeight: 550,
          mb: 1,
          fontSize: { xs: 16, sm: 18 }
        }}
        variant="h6"
      >
        {isRTL ? "تفصیلات" : "Details"}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        dangerouslySetInnerHTML={{
          __html: (isRTL ? product?.arabicDescription : product?.webDescription) + ''
        }}
        sx={{
          mb: 2, direction: isRTL ? 'rtl' : 'ltr',
          textAlign: isRTL ? 'right' : 'left',
          fontSize: { xs: 13, sm: 15 }
        }}
      />
      <Divider sx={{ mb: { xs: 3, sm: 6 } }} />
      {/* Related Products */}
      <Typography
        sx={{
          direction: isRTL ? 'rtl' : 'ltr',
          textAlign: isRTL ? 'right' : 'left',
          fontWeight: 550,
          mb: { xs: 2, sm: 5 },
          fontSize: { xs: 16, sm: 18 }
        }}
        variant="h6"
      >
        {isRTL ? "المنتجات ذات الصلة" : "Related Products"}
      </Typography>
      <Box
        sx={{
          cursor: 'pointer',
          transition: 'margin 0.3s ease',
          direction: isRTL ? 'rtl' : 'ltr',
        }}
      >
        <ProductsView
          hasMoreItems={hasMoreItems}
          loadProducts={loadProducts}
          isFetching={isFetching}
          products={products}
          isRTL={isRTL}
          open={true}
          handleOpen={() => { }}
          setOpen={() => { }}
        />
      </Box>
      <CardDrawer open={openDrawer} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />

      <CartFloatButton open={openDrawer} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />

    </Box>
  );
};
