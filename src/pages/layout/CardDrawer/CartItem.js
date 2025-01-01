import React from 'react';
import { Box, Typography, IconButton, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ClearIcon from '@mui/icons-material/Clear';
import { colorPalette } from '@utils/colorPalette';
import { useDispatch } from 'react-redux';
import { addToCart } from '@redux-state/actions';
import { GetUser } from '@redux-state/selectors';


const Cart = ({ cartDetails }) => {
  const user = GetUser();
  const dispatch = useDispatch();

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

  const handleRemoveItem = (product) => {
    // Find the existing product in the cart
    const existingProductIndex = cartDetails?.items.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
      // Remove the item directly from the cart
      const updatedItems = cartDetails.items.filter(item => item.id !== product.id);

      const newTotalPrice = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0);

      // Update the cart (dispatch the action to update the Redux store)
      dispatch(addToCart({ items: updatedItems, user: user, totalPrice: newTotalPrice }));
    }
  };

  const CartItem = ({ item }) => {
    let image;
    if (item?.image_urls) {
      const imageUrls = JSON.parse(item?.image_urls.replace(/'/g, '"'));
      if (imageUrls.length > 0) {
        const formattedImages = imageUrls?.map((imageUrl) => ({
          contentType: 'image/jpeg', // Assume default content type or fetch dynamically
          title: imageUrl?.split('/').pop(), // Extract the image name from URL
          url: imageUrl,
          file: null // No file object for backend images
        }));
        image = formattedImages[0];
      }
    }

    return (
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: `1px solid ${colorPalette.lightGrey}`,
            borderRadius: 10,
            background: colorPalette.lightGrey,
            height: 110,
          }}>
            <IconButton onClick={() => handleIncrease(item)}>
              <AddIcon sx={{ width: 17, height: 17, color: colorPalette.black }} />
            </IconButton>
            <Typography variant="body1">{item.quantity}</Typography>
            <IconButton onClick={() => handleDecrease(item)}>
              <RemoveIcon sx={{ width: 17, height: 17, color: colorPalette.black }} />
            </IconButton>
          </Box>
          {image &&
            <Box sx={{ marginLeft: 4, marginRight: 2 }}>
              <img
                src={image.url}
                alt={image.title}
                loading="lazy"
                width={50}
                height={50}
              />
            </Box>
          }

          <Box sx={{ marginLeft: 2, textAlign: 'start' }}>
            <Typography variant="subtitle1" fontWeight={510}>{item.website_name}</Typography>
            <Typography variant="body1" sx={{ color: colorPalette.greenButton }} fontWeight={510}>${(item.price)}</Typography>
            <Typography variant="body2" color="textSecondary">{item.quantity} x lb</Typography>
          </Box>
        </Box>
        <Box sx={{ textAlign: 'right', display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 2 }}>
          <Typography variant="body1" fontWeight={510}>${(item.price * item.quantity)}</Typography>
          <IconButton onClick={() => handleRemoveItem(item)} sx={{ marginLeft: 2 }}>
            <ClearIcon sx={{
              width: 15, height: 15, '&:hover': {
                color: colorPalette.red,  // Apply the green color on hover
              },
            }} />
          </IconButton>
        </Box>
      </Box>
    );
  };

  return (
    <>
      {cartDetails.items.map((item, index) => (
        <Box sx={{ marginBottom: 5, marginLeft: -2, marginRight: -2 }}>
          <CartItem key={index} item={item} />
          <Divider sx={{ marginX: -4, marginY: 2 }} />
        </Box>
      ))}
    </>
  );
};

export default Cart;
