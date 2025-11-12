import React from 'react';
import { Typography, Box } from '@mui/material';
import shoppingBagIcon from 'assets/icons/cart.png';

const EmptyCart = ({ isRTL }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: { xs: 8, sm: 15 }, // Adjust top margin for mobile
        textAlign: isRTL ? 'right' : 'left',
      }}
    >
      <img
        src={shoppingBagIcon}
        alt="cart"
        loading="lazy"
        width={140}
        height={180}
        style={{
          maxWidth: '100%', // Ensure the image scales properly on small screens
          height: 'auto',   // Maintain the aspect ratio of the image
        }}
      />
      <Typography
        variant="subtitle1"
        fontWeight={520}
        sx={{
          marginBottom: 2,
          marginLeft: isRTL ? 2 : 0,
          marginRight: isRTL ? 0 : 2,
          fontSize: { xs: '0.rem', sm: '1.25rem' }, // Adjust font size for mobile
          textAlign: isRTL ? 'right' : 'left',
        }}
      >
        {isRTL ? 'لا توجد منتجات' : 'No products found'}
      </Typography>
    </Box>
  );
};

export default EmptyCart;
