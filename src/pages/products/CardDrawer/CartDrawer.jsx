import CloseIcon from '@mui/icons-material/CancelRounded';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Drawer from '@mui/material/Drawer';
import { colorPalette } from 'utils/colorPalette';
import { GetLanguage, GetCartDetails } from 'redux-state/common/selectors';
import EmptyCart from './EmptyCart';
import { StyledMainBox } from '../styles';
import CheckoutButton from './CheckoutButton';
import Cart from './CartItem';

const drawerWidth = 600;

export default function CardDrawer({ open, handleDrawerOpen, handleDrawerClose }) {

  const language = GetLanguage();
  const cartDetails = GetCartDetails();

  const isRTL = language === 'ar';

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: { xs: 280, md: drawerWidth },
            boxSizing: 'border-box',
            background: colorPalette.emeraldGreen,
          },
        }}
        anchor={language === 'ar' ? 'left' : 'right'}
        onClose={handleDrawerClose}
        open={open}
      >
        <StyledMainBox>
          <Box
            sx={{
              width: { xs: '100%', md: '100%' },
              display: 'flex',
              direction: 'ltr',
              justifyContent: { xs: 'space-between', md: 'space-between' },
              alignItems: 'center',
              marginBottom: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '40%',
              }}
            >
              <LocalMallIcon sx={{ color: colorPalette.theme, width:{ xs: 20 } }} />
              <Typography
                sx={{
                  color: colorPalette.theme,
                  fontWeight: 510,
                  variant: 'subtitle1',
                  fontSize: { xs: '14px', md: '16px' },
                  marginLeft: 1,
                  marginRight: isRTL ? 1 : 0, // Adjust margin for RTL
                }}
              >
                {isRTL ? cartDetails.items.length + ' عنصر' : cartDetails.items.length + ' Items'}
              </Typography>
            </Box>
            <IconButton
              sx={{
                '&:hover': {
                  color: colorPalette.theme,  // Apply the green color on hover
                },
                color: colorPalette.nobel
              }}
              onClick={handleDrawerClose}
              edge="start"
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ marginX: -2 }} />
          <Box
            sx={{
              padding: 2,
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Box />
            {cartDetails?.items?.length > 0
              ?
              <Cart isRTL={isRTL} cartDetails={cartDetails} />
              :
              <EmptyCart isRTL={isRTL} />}
            <CheckoutButton handleDrawerClose={handleDrawerClose} isRTL={isRTL} cartDetails={cartDetails} />
          </Box>
        </StyledMainBox>

      </Drawer>
    </>
  );
}
