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
import emptyProductImage from '@assets/icons/empty-product.jpg';
import { GetProductCatalogs, GetSubCategories, GetCategories, GetProducts, GetAllProductsCount, GetProductsLoading, GetCartDetails, GetUser } from "@redux-state/selectors";
import ProductsView from '@pages/products/Products/ProductsView';
import { getProducts, addToCart } from '@redux-state/common/action';
import { Api } from '@redux-state/common/api';
import { addRemoveToWishlist } from '@redux-state/common/action';
import { GetWishlistLoading } from '@redux-state/common/selectors';
import { CustomCarousel } from '../CustomCarousal';

export const ProductModal = ({ isRTL, open, setOpen, product, imageUrls, finalPrice, hasDiscount }) => {

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [wishListItem, setWishListItem] = useState(false);

  const loopRef = useRef();

  const handleOpen = (value) => setOpen(value);

  const dispatch = useDispatch();

  const allCategories = GetCategories();
  const subCategories = GetSubCategories();
  const products = GetProducts();
  const itemsCount = GetAllProductsCount();
  const isFetching = GetProductsLoading();
  const cartDetails = GetCartDetails();
  const wishListLoading = GetWishlistLoading();
  const user = GetUser();

  const handleIncrease = (product, finalPrice) => {
    // Find the existing product in the cart
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

      const newTotalPrice = updatedItems.reduce((sum, item) => sum +  Number(item.totalPrice), 0);

      // Update the state (or dispatch the action to update the Redux store)
      dispatch(addToCart({ items: updatedItems, user: user, totalPrice: newTotalPrice }));
    } else {
      const updatedItems = [
        ...cartDetails.items,
        { ...product, quantity: 1, totalPrice: finalPrice }
      ];

      const newTotalPrice = updatedItems.reduce((sum, item) => sum + Number(item.totalPrice), 0);

      // Update the state (or dispatch the action to update the Redux store)
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
      }).filter(item => item !== null); // Filter out the null values (removed items)

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

  const enProductSize = enSizes.find(size => size?.id === product?.size)
  const arProductSize = enSizes.find(size => size?.id === product?.ar_size)

  const enProductBrand = enBrands.find(size => size?.id === product?.brand)
  const arProductBrand = enBrands.find(size => size?.id === product?.ar_brand)

  const enProductUnit = enUnits.find(unit => unit?.id === product?.unit)
  const arProductUnit = enUnits.find(unit => unit?.id === product?.ar_unit)

  const enProductMaterial = enMaterials.find(mat => mat?.id === product?.material)
  const arProductMaterial = enMaterials.find(mat => mat?.id === product?.ar_material)

  const enProductColor = enAvailableColors.find(color => color?.id === product?.color)
  const arProductColor = enAvailableColors.find(color => color?.id === product?.ar_color)

  const size = isRTL ? enSizes.find(size => size?.value === arProductSize?.value) : enSizes.find(size => size?.value === enProductSize?.value)
  const brand = isRTL ? enBrands.find(brand => brand?.value === arProductBrand?.value) : enBrands.find(brand => brand?.value === enProductBrand?.value)
  const unit = isRTL ? enUnits.find(unit => unit?.value === arProductUnit?.value) : enUnits.find(unit => unit?.value === enProductUnit?.value)
  const material = isRTL ? enMaterials.find(material => material?.value === arProductMaterial?.value) : enMaterials.find(material => material?.value === enProductMaterial?.value)
  const color = isRTL ? enAvailableColors.find(color => color?.value === arProductColor?.value) : enAvailableColors.find(color => color?.value === enProductColor?.value)

  const existingProduct = cartDetails?.items.find(item => item.id === product.id);

  const qty = parseInt(product?.qty_onhand);

  const handleImageChange = (index) => {
    setSelectedIndex(index);
  };
  const gallery = [
    emptyProductImage
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
    dispatch(getProducts(pagination, {}));
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
              <CustomCarousel selectedIndex={selectedIndex} handleImageChange={handleImageChange} images={images} isRTL={isRTL} />
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
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                fontWeight: 'bold',
                marginBottom: 1,
                direction: isRTL ? 'rtl' : 'ltr',
                textAlign: isRTL ? 'right' : 'left',
              }}>
                {isRTL ? product?.arabicName : product?.website_name}
              </Typography>
              {user && <Tooltip title={wishlistTooltipText()} arrow>
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
              </Tooltip>}
            </Box>
            <Typography variant="body2" marginTop={2} color="textSecondary" sx={{
              marginBottom: 1, direction: isRTL ? 'rtl' : 'ltr',
              textAlign: isRTL ? 'right' : 'left',
            }}>
              {isRTL ? "مقاس: " : "Size: "}{isRTL ? size?.ar_title : size?.title}
            </Typography>
            <Typography variant="body2" marginTop={2} color="textSecondary" sx={{
              marginBottom: 1, direction: isRTL ? 'rtl' : 'ltr',
              textAlign: isRTL ? 'right' : 'left',
            }}>
              {isRTL ? "ماركة: " : "Brand: "}{isRTL ? brand?.ar_title : brand?.title}
            </Typography>
            <Typography variant="body2" marginTop={2} color="textSecondary" sx={{
              marginBottom: 1, direction: isRTL ? 'rtl' : 'ltr',
              textAlign: isRTL ? 'right' : 'left',
            }}>
              {isRTL ? "وحدة: " : "Unit: "}{isRTL ? unit?.ar_title : unit?.title}
            </Typography>
            <Typography variant="body2" marginTop={2} color="textSecondary" sx={{
              marginBottom: 1, direction: isRTL ? 'rtl' : 'ltr',
              textAlign: isRTL ? 'right' : 'left',
            }}>
              {isRTL ? "لون: " : "Color: "}{isRTL ? color?.ar_title : color?.title}
            </Typography>
            <Typography variant="body2" marginTop={2} color="textSecondary" sx={{
              marginBottom: 1, direction: isRTL ? 'rtl' : 'ltr',
              textAlign: isRTL ? 'right' : 'left',
            }}>
              {isRTL ? "مادة: " : "Material: "}{isRTL ? material?.ar_title : material?.title}
            </Typography>


            <Typography
              variant="h4"
              sx={{ fontWeight: 'bold', marginTop: 2, color: colorPalette.theme, marginBottom: 1 }}
            >
              {isRTL ? "ر۔ع  " : "OMR  "}{finalPrice}
              {hasDiscount && <Typography
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
                {isRTL ? "ر۔ع" : "OMR"} {product?.price}
              </Typography>}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
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
                    handleIncrease(product, finalPrice);
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
                    handleDecrease(product, finalPrice);
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
                {isRTL ? category?.ar_category : category?.category}
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
                {isRTL ? subCategory?.ar_subcategory : subCategory?.subcategory}
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
