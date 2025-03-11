import React from 'react';
import { Box, Typography, IconButton, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ClearIcon from '@mui/icons-material/CancelRounded';
import { colorPalette } from '@utils/colorPalette';
import { useDispatch } from 'react-redux';
import { addToCart } from '@redux-state/actions';
import { GetUser } from '@redux-state/selectors';


const Cart = ({ isRTL, cartDetails }) => {
  const user = GetUser();
  const dispatch = useDispatch();

  const currency = isRTL ? "ر۔ع " : "OMR "

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

  const handleRemoveItem = (product, finalPrice) => {
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

    const discountValue = item?.flash_sale > 0 ? item?.flash_sale : item?.discount_offer ? item?.discount_offer : 0;

    const getDiscountedPrice = () => {
      const numPrice = Number(item?.price);
      const numDiscount = Number(discountValue);
      const discountedValue = Number(numPrice) - (numPrice * numDiscount) / 100;
      return discountedValue.toFixed(1);
    };

    const hasDiscount = discountValue > 0;

    const finalPrice = hasDiscount ? getDiscountedPrice() : item?.price;

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
            marginRight: 4,
            height: 110,
          }}>
            <IconButton onClick={() => handleIncrease(item, finalPrice)}>
              <AddIcon sx={{ width: 17, height: 17, color: colorPalette.black }} />
            </IconButton>
            <Typography variant="body1">{item.quantity}</Typography>
            <IconButton onClick={() => handleDecrease(item, finalPrice)}>
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
            <Typography sx={{ maxWidth: 180 }} variant="subtitle2" fontWeight={510}>{item.website_name}</Typography>
            <Typography variant="body1" sx={{ color: colorPalette.theme }} fontWeight={510}>{currency}{(finalPrice)}</Typography>
            <Typography variant="body2" color="textSecondary">{item.quantity} x lb</Typography>
          </Box>
        </Box>
        <Box sx={{ textAlign: 'right', display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 2 }}>
          <Typography variant="body2" fontWeight={510}>{currency}{(finalPrice * item.quantity).toFixed(1)}</Typography>
          <IconButton onClick={() => handleRemoveItem(item, finalPrice)} sx={{ marginLeft: 2 }}>
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
