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

      // const newTotalPrice = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0);
      const newTotalPrice = updatedItems.reduce(
        (sum, item) => sum + parseFloat(item.totalPrice || 0),
        0
      );

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
      return discountedValue.toFixed(3);
    };

    const hasDiscount = discountValue > 0;

    const finalPrice = hasDiscount ? getDiscountedPrice() : item?.price;

    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: { xs: "row", md: "row" }, // Keep row layout on mobile for better space usage
          justifyContent: "space-between",
          width: "100%",
          padding: { xs: 1, md: 2 }, // Add padding instead of margins
          gap: { xs: 1, md: 2 }, // Use gap for consistent spacing
        }}
      >
        {/* Left section: Quantity selector and product info */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, md: 2 },
            flex: 1,
          }}
        >
          {/* Quantity selector */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: `1px solid ${colorPalette.lightGrey}`,
              borderRadius: 10,
              background: colorPalette.lightGrey,
              height: 110,
            }}
          >
            <IconButton
              onClick={() => handleIncrease(item, finalPrice)}
              size="small"
              sx={{ padding: { xs: 0.5, md: 1 } }} // Smaller padding on mobile
            >
              <AddIcon sx={{ width: 20, height: 20 }} />
            </IconButton>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "0.875rem", md: "1rem" },
                fontWeight: 500,
                my: 0.5,
              }}
            >
              {item.quantity}
            </Typography>
            <IconButton
              onClick={() => handleDecrease(item, finalPrice)}
              size="small"
              sx={{ padding: { xs: 0.5, md: 1 } }}
            >
              <RemoveIcon sx={{ width: 20, height: 20 }} />
            </IconButton>
          </Box>

          {/* Product image */}
          {image && (
            <Box
              sx={{
                flexShrink: 0,
                width: { xs: 40, md: 50 }, // Smaller image on mobile
                height: { xs: 40, md: 50 },
              }}
            >
              <img
                src={image.url || "/placeholder.svg"}
                alt={image.title}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
            </Box>
          )}

          {/* Product details */}
          <Box
            sx={{
              flex: 1,
              minWidth: 0, // Allow text to wrap properly
              textAlign: "left",
            }}
          >
            <Typography
              variant="subtitle2"
              fontWeight={500}
              sx={{
                fontSize: { xs: "0.75rem", md: "0.875rem" }, // Smaller text on mobile
                lineHeight: 1.2,
                mb: 0.5,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {item.website_name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#1976d2",
                fontWeight: 500,
                fontSize: { xs: "0.75rem", md: "0.875rem" },
              }}
            >
              {currency}
              {parseFloat(finalPrice)?.toFixed(3)}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.625rem", md: "0.75rem" } }}>
              {item.quantity} x lb
            </Typography>
          </Box>
        </Box>

        {/* Right section: Total price and remove button */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" }, // Stack vertically on mobile
            alignItems: "center",
            gap: { xs: 0.5, md: 1 },
            flexShrink: 0,
          }}
        >
          <Typography
            variant="body2"
            fontWeight={500}
            sx={{
              fontSize: { xs: "0.75rem", md: "0.875rem" },
              textAlign: "center",
            }}
          >
            {currency}
            {parseFloat((finalPrice * item.quantity).toFixed(3))}
          </Typography>
          <IconButton
            onClick={() => handleRemoveItem(item, finalPrice)}
            size="small"
            sx={{
              padding: { xs: 0.5, md: 1 },
              "&:hover": {
                color: "#d32f2f",
              },
            }}
          >
            <ClearIcon sx={{ width: { xs: 12, md: 15 }, height: { xs: 12, md: 15 } }} />
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
          <Divider sx={{ marginX: { xs: 0, md: -4 }, marginY: 2, ml: { md: 0 } }} />
        </Box>
      ))}
    </>
  );
};

export default Cart;
