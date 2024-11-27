import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import LoginModal from '@components/Modal/LoginModal';
import { getCategories } from '@redux-state/common/action';
import CardDrawer from './CartDrawer';
import TopBar from './TopBar';
import CartFloatButton from './CartFloatButton';
import Banner from './Banner';
import ProductCardView from './Products';

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
      <TopBar />
      <Banner />
      <ProductCardView />
      <CardDrawer open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
      <CartFloatButton open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
      <LoginModal />
    </>
  );
}
