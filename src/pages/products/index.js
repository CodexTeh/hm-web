import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import LoginModal from '@components/Modal/LoginModal';
import Footer from '@components/Footer';
import { getCategories } from '@redux-state/common/action';
import WhatsAppButton from '@components/WhatsAppButton';
import CardDrawer from './CardDrawer/CartDrawer';
import CartFloatButton from './CartFloatButton';
import Banner from './Banner';
import ProductCardView from './Products';
import { OffersSlider } from './OffersSlider';

export default function Products() {

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
      <Banner />
      <OffersSlider />
      <ProductCardView />
      <CardDrawer open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
      <CartFloatButton open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
      <WhatsAppButton />
      <LoginModal />
      <Footer />
    </>
  );
}
