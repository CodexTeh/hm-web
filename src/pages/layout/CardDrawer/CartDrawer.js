import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/CancelRounded';
import LoginModal from '@components/Modal/LoginModal';
import { Box, Divider, IconButton, LinearProgress, Typography } from '@mui/material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Drawer from '@mui/material/Drawer';
import { colorPalette } from '@utils/colorPalette';
import { GetLanguage } from '@redux-state/common/selectors';
import EmptyCart from './EmptyCart';
import { StyledMainBox } from '../styles';
import CheckoutButton from './CheckoutButton';
import Cart from './CartItem';

const drawerWidth = 500;

export default function CardDrawer({ open, handleDrawerOpen, handleDrawerClose }) {

  const language = GetLanguage();
  const isRTL = language === 'ar';

  const loading = false;

  const dispatch = useDispatch();

  return (
    <>
      {
        loading &&
        <LinearProgress color="primary" />
      }
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: colorPalette.emeraldGreen,
          },
        }}
        anchor={language === 'ar' ? 'left' : 'right'}
        onClose={handleDrawerClose}
        open={open}
      >
        <StyledMainBox>
          {loading &&
            <LinearProgress color="primary" />
          }
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: isRTL ? 'row-reverse' : 'row', // Reverse layout for RTL
                alignItems: 'center',
              }}
            >
              <LocalMallIcon sx={{ color: colorPalette.greenButton }} />
              <Typography
                sx={{
                  color: colorPalette.greenButton,
                  fontWeight: 510,
                  variant: 'subtitle1',
                  marginLeft: isRTL ? 0 : 1,
                  marginRight: isRTL ? 1 : 0, // Adjust margin for RTL
                }}
              >
                {isRTL ? '0 عنصر' : '0 Item'}  {/* Arabic translation for RTL */}
              </Typography>
            </Box>
            <IconButton
              sx={{
                '&:hover': {
                  color: colorPalette.greenButton,  // Apply the green color on hover
                },
                color: colorPalette.nobel
              }}
              onClick={handleDrawerClose}
              edge="end"
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
              justifyContent: 'space-between',
              textAlign: 'center',
            }}
          >
            <Box />
            {/* <EmptyCart isRTL={isRTL} /> */}
            <Cart />
            <CheckoutButton isRTL={isRTL} />
          </Box>
        </StyledMainBox>
      </Drawer>
      <LoginModal />
    </>
  );
}
