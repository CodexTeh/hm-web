import React from 'react';
import { Typography, Box } from '@mui/material';
import shoppingBagIcon from '@assets/icons/cart.png';

const EmptyCart = ({ isRTL }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        textAlign: isRTL ? 'right' : 'left',
      }}
    >
      <img
        src={shoppingBagIcon}
        alt="cart"
        loading="lazy"
        width={140}
        height={180}
      />
      <Typography
        variant="subtitle1"
        fontWeight={520}
        sx={{ marginBottom: 2, marginLeft: isRTL ? 2 : 0, marginRight: isRTL ? 0 : 2 }}
      >
        {isRTL ? 'لا توجد منتجات' : 'No products found'}
      </Typography>
    </Box>
  );
};

export default EmptyCart;
