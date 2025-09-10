import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { colorPalette } from '@utils/colorPalette';
import useRouter from '@helpers/useRouter';
import { GetUser } from '@redux-state/selectors';
import { openLoginModal } from '@redux-state/actions';
import { useDispatch } from 'react-redux';


const CheckoutButton = ({ isRTL, cartDetails }) => {
  const user = GetUser();
  const router = useRouter();

  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        background: colorPalette.white
      }}
    >
      <Button
        variant="contained"
        onClick={() => {
          if (!user) return dispatch(openLoginModal(true));
          router.push('/checkout')
        }}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: { xs: '70%', md: '90%' },
          marginBottom: 2,
          borderRadius: '50px', // Rounded corners
          backgroundColor: colorPalette.theme, // Green color
          padding: '15px 10px',
          color: 'white',
          textTransform: 'none',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: colorPalette.theme, // Darker green on hover
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
            color: colorPalette.theme, // Green text for the price
            fontWeight: 'bold',
          }}
        >
          {isRTL ? parseFloat(cartDetails?.totalPrice?.toFixed(3)) + " ر۔ع" : 'OMR ' + parseFloat(cartDetails?.totalPrice?.toFixed(3))}

        </Box>
      </Button>
    </Box>
  );
};

export default CheckoutButton;
