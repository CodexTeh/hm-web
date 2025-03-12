import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, Box, IconButton, CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import emptyProductImage from '@assets/icons/empty-product.jpg';
import { colorPalette } from '@utils/colorPalette';
import { ProductModal } from '@components/Modal/ProductModal';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { GetUser, GetCartDetails, GetProductCatalogs } from '@redux-state/selectors';
import { addToCart } from '@redux-state/common/action';
import EmptyView from './EmptyView';

const ProductsView = ({ filter, hasMoreItems, isFetching, loadProducts, products, isRTL, open, handleOpen, setOpen, ChildView, loadMore = true }) => {
  const user = GetUser();
  const dispatch = useDispatch();

  const cartDetails = GetCartDetails();
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
      size: enSizes = []
    } = {},
  } = splitByTypeAndLanguage(allProductCatalogs || []);

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

      const newTotalPrice = updatedItems.reduce((sum, item) => sum + Number(item.totalPrice), 0);

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

  return (
    <Box sx={{ width: '93%', marginRight: 5, marginTop: 3 }}>
      {products?.length ?
        <Grid
          sx={{ marginLeft: !open ? 0.5 : null, maxWidth: '100%' }}
          container spacing={3}>
          {products.map((product, index) => {
            const existingProduct = cartDetails?.items.find(item => item.id === product.id);

            const enProductSize = enSizes.find(size => size?.id?.toString() === product?.size?.toString());
            const arProductSize = enSizes.find(size => size?.id?.toString() === product?.ar_size?.toString());

            const size = isRTL
              ? enSizes.find(size => size?.id?.toString() === arProductSize?.id?.toString())
              : enSizes.find(size => size?.id?.toString() === enProductSize?.id);

            const imageUrls = product?.image_urls ? JSON.parse(product?.image_urls.replace(/'/g, '"')) : [];

            const discountValue = product?.flash_sale > 0 ? product?.flash_sale : product?.discount_offer ? product?.discount_offer : 0;

            const getDiscountedPrice = () => {
              const numPrice = Number(product?.price);
              const numDiscount = Number(discountValue);
              const discountedValue = Number(numPrice) - (numPrice * numDiscount) / 100;
              return discountedValue.toFixed(1);
            };

            const hasDiscount = discountValue > 0;

            const finalPrice = hasDiscount ? getDiscountedPrice() : product?.price;

            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={`${product.id}-${index}`}
                sx={{ direction: isRTL ? 'rtl' : 'ltr' }} // Ensure each card respects the language direction
              >
                {open === index + 1 && <ProductModal filter={filter} hasDiscount={hasDiscount} isRTL={isRTL} imageUrls={imageUrls} open={open === index + 1} setOpen={setOpen} product={product} ChildView={ChildView} finalPrice={finalPrice} />}

                <Card
                  sx={{
                    maxWidth: 300,
                    height: '70vh',
                    margin: 'auto',
                    position: 'relative',
                    textAlign: isRTL ? 'right' : 'left', // Align text based on language
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpen(index + 1)
                  }}
                >
                  {/* Discount Badge */}
                  {hasDiscount && <Box
                    sx={{
                      position: 'absolute',
                      top: 10,
                      [isRTL ? 'left' : 'right']: 10, // Adjust position for RTL
                      backgroundColor: colorPalette.yellowGolden,
                      padding: '3px 8px',
                      borderRadius: 10,
                      color: colorPalette.white,
                      fontSize: 12,
                    }}
                  >
                    {isRTL ? `٪${discountValue}` : `${discountValue}%`}
                  </Box>}
                  {/* Product Image */}
                  <CardMedia
                    component="img"
                    height="300"
                    image={
                      imageUrls?.length > 0 ? imageUrls[0] :
                        emptyProductImage
                    }
                    alt={product?.website_name}
                    sx={{ objectFit: 'contain' }}
                  />
                  <CardContent>
                    {/* Product Name */}
                    <Typography sx={{
                      display: '-webkit-box',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      lineHeight: 1.2,
                      fontWeight: '510',
                      WebkitLineClamp: 2, // Limit to two lines
                      WebkitBoxOrient: 'vertical',
                      marginBottom: 2
                    }} variant="body1" component="div">
                      {isRTL ? product?.arabicName || product?.website_name : product?.website_name}
                    </Typography>
                    <Typography sx={{
                      direction: isRTL ? 'rtl' : 'ltr',
                      textAlign: isRTL ? 'right' : 'left',
                    }} variant="caption" color="textSecondary">
                      {`${product?.qty_onhand} ${isRTL ? "القطع المتاحة" : "pieces available"}`}
                    </Typography>
                    {/* Product Weight */}
                    <Typography marginTop={2} variant="body2" color="textDisabled">
                      {isRTL ? size?.ar_title : size?.title}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: isRTL ? 'row-reverse' : 'row', // Reverse for RTL
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      {/* Pricing */}
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: isRTL ? 'end' : 'start', // Align text for RTL
                          marginTop: 1,
                        }}
                      >
                        {/* Old Price */}
                        {discountValue > 0 && <Typography
                          variant="caption"
                          color="textDisabled"
                          sx={{ textDecoration: 'line-through' }}
                        >
                          {isRTL ? `د.إ ${product?.price}` : `OMR ${product?.price}`}
                        </Typography>}
                        {/* Current Price */}
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 'bold',
                            color: colorPalette.theme,
                          }}
                        >
                          {isRTL ? `د.إ ${finalPrice}` : `OMR ${finalPrice}`}
                        </Typography>
                      </Box>
                      {/* Add to Cart Button or Quantity Control */}
                      {parseInt(product?.qty_onhand) ?

                        existingProduct ? (
                          <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            border: `1px solid ${colorPalette.lightGrey}`,
                            borderRadius: 10,
                            background: colorPalette.theme,
                            width: 100,
                            height: 40,
                            marginTop: 4,
                            marginBottom: 4,
                          }} onClick={(e) => e.stopPropagation()}>
                            <IconButton onClick={() => handleIncrease(product, finalPrice)}>
                              <AddIcon sx={{ color: colorPalette.white }} />
                            </IconButton>
                            <Typography variant="body1" sx={{ color: colorPalette.white }} fontWeight={510}>{existingProduct.quantity}</Typography>
                            <IconButton onClick={() => handleDecrease(product, finalPrice)}>
                              <RemoveIcon sx={{ color: colorPalette.white }} />
                            </IconButton>
                          </Box>
                        ) : (
                          <Button
                            variant="contained"
                            startIcon={
                              !isRTL && <LocalMallIcon style={{ width: 16, height: 16, marginLeft: 10 }} />
                            }
                            endIcon={
                              isRTL && <LocalMallIcon style={{ width: 16, height: 16, marginRight: 10 }} />
                            }
                            sx={{
                              fontWeight: 'bold',
                              marginTop: 4,
                              marginBottom: 4,
                              height: 40,
                              textTransform: 'capitalize',
                              borderRadius: 10,
                              background: colorPalette.white,
                              color: colorPalette.theme,
                              width: 100,
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleIncrease(product, finalPrice)
                            }}
                          >
                            {isRTL ? 'السلة' : 'Cart'}
                          </Button>
                        )
                        :
                        <Typography sx={{
                          direction: isRTL ? 'rtl' : 'ltr',
                          textAlign: isRTL ? 'right' : 'left',
                        }} variant="caption" color="textSecondary">
                          {`${isRTL ? "إنتهى من المخزن" : "out of stock"}`}
                        </Typography>
                      }
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        : <EmptyView isRTL={isRTL} />}

      {products?.length > 0 && <Box sx={{ display: 'flex', justifyContent: 'center', position: 'initial', zIndex: 20, bottom: -10 }}>
        {loadMore && <Button
          sx={{
            alignSelf: 'center',
            background: colorPalette.theme,
            marginBottom: 3,
            marginTop: 3
          }}
          size='large'
          disabled={!hasMoreItems}
          variant='contained'
          onClick={loadProducts}
        >
          {isFetching ? (
            <CircularProgress color="inherit" size={20} />
          ) : isRTL ? 'جار تحميل المنتجات' : 'Load more products'}
        </Button>}
      </Box>}
    </Box>
  );
};

export default ProductsView;
