import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import LoginModal from '@components/Modal/LoginModal';
import { getCategories } from '@redux-state/common/action';
import CardDrawer from './CartDrawer';
import TopBar from './TopBar';
import CartFloatButton from './CartFloatButton';
import Banner from './Banner';
import ProductCardView from './Products';
import { Box } from '@mui/material';

export default function Layout() {

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ position: 'fixed', top: 0, zIndex: 30, width: '100%' }}><TopBar /></Box>
      <Banner />
      <ProductCardView />
      <CardDrawer open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
      <CartFloatButton open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
      <LoginModal />
    </>
  );
}
