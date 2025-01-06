import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, Box, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { colorPalette } from '@utils/colorPalette';
import { ProductModal } from '@components/Modal/ProductModal';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { GetUser, GetCartDetails } from '@redux-state/selectors';
import { addToCart } from '@redux-state/common/action';
import EmptyView from './EmptyView';

const ProductsView = ({ products, isRTL, open, handleOpen, setOpen, ChildView }) => {
  const user = GetUser();
  const dispatch = useDispatch();

  const cartDetails = GetCartDetails();

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

  return (
    <>
      {products?.length ?
        <Grid
          sx={{ marginLeft: !open ? 0.5 : null }}
          container spacing={3}>
          {products.map((product, index) => {
            const existingProduct = cartDetails?.items.find(item => item.id === product.id);

            const imageUrls = product?.image_urls ? JSON.parse(product?.image_urls.replace(/'/g, '"')) : [];
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
                {open === index + 1 && <ProductModal isRTL={isRTL} imageUrls={imageUrls} open={open === index + 1} setOpen={setOpen} product={product} ChildView={ChildView} />}

                <Card
                  sx={{
                    maxWidth: 300,
                    maxHeight: '96%',
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
                  <Box
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
                    {isRTL ? '٪10' : '10%'}
                  </Box>
                  {/* Product Image */}
                  <CardMedia
                    component="img"
                    height="300"
                    image={
                      imageUrls?.length > 0 ? imageUrls[0] :
                        'https://pickbazar-react-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F1%2FApples.jpg&w=3840&q=75'
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
                    }} variant="body1" component="div">
                      {isRTL ? product?.arabicName || product?.website_name : product?.website_name}
                    </Typography>
                    {/* Product Weight */}
                    <Typography marginTop={2} variant="body2" color="textDisabled">
                      {isRTL ? '1 باوند' : '1 lb'}
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
                        <Typography
                          variant="caption"
                          color="textDisabled"
                          sx={{ textDecoration: 'line-through' }}
                        >
                          {isRTL ? '٢ ر۔ع' : '2 OMR'}
                        </Typography>
                        {/* Current Price */}
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 'bold',
                            color: colorPalette.greenButton,
                          }}
                        >
                          {isRTL ? `د.إ ${product?.price.toFixed(2)}` : `OMR ${product?.price.toFixed(2)}`}
                        </Typography>
                      </Box>
                      {/* Add to Cart Button or Quantity Control */}
                      {existingProduct ? (
                        <Box sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          border: `1px solid ${colorPalette.lightGrey}`,
                          borderRadius: 10,
                          background: colorPalette.greenButton,
                          width: 100,
                          height: 40,
                          marginTop: 4,
                          marginBottom: 4,
                        }} onClick={(e) => e.stopPropagation()}>
                          <IconButton onClick={() => handleIncrease(product)}>
                            <AddIcon sx={{ color: colorPalette.white }} />
                          </IconButton>
                          <Typography variant="body1" sx={{ color: colorPalette.white }} fontWeight={510}>{existingProduct.quantity}</Typography>
                          <IconButton onClick={() => handleDecrease(product)}>
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
                            color: colorPalette.greenButton,
                            width: 100,
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleIncrease(product)
                          }}
                        >
                          {isRTL ? 'السلة' : 'Cart'}
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        : <EmptyView isRTL={isRTL} />}
    </>
  );
};

export default ProductsView;
