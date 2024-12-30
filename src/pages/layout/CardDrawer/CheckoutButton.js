import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { colorPalette } from '@utils/colorPalette';

const CheckoutButton = ({ isRTL }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Button
        variant="contained"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          borderRadius: '50px', // Rounded corners
          backgroundColor: colorPalette.greenButton, // Green color
          padding: '10px 10px',
          color: 'white',
          textTransform: 'none',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: colorPalette.greenButton, // Darker green on hover
          },
        }}
      >
        <Typography
          sx={{
            marginLeft: isRTL ? 0 : 2,
            marginRight: isRTL ? 2 : 0,
            fontWeight: 510,
            variant: 'subtitle1',
            textAlign: isRTL ? 'right' : 'left', // Text alignment for RTL
          }}
        >
          {isRTL ? 'الدفع' : 'Checkout'} {/* Arabic translation for RTL */}
        </Typography>
        <Box
          sx={{
            borderRadius: '25px',
            backgroundColor: 'white',
            padding: '5px 20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: colorPalette.greenButton, // Green text for the price
            fontWeight: 'bold',
          }}
        >
          {isRTL ? `د.إ 0.00` : `OMR 0.00`}

        </Box>
      </Button>
    </Box>
  );
};

export default CheckoutButton;
