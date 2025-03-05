import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Footer from '@components/Footer';
import { getCategories } from '@redux-state/common/action';
import WhatsAppButton from '@components/WhatsAppButton';
import CardDrawer from './CardDrawer/CartDrawer';
import CartFloatButton from './CartFloatButton';
import Banner from './Banner';
import ProductCardView from './Products';
import { OffersSlider } from './OffersSlider';
import { Box } from '@mui/material';

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
    <Box sx={{ marginTop: 10 }}>
      <Banner />
      <OffersSlider />
      <ProductCardView />
      <CardDrawer open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
      <CartFloatButton open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
      <WhatsAppButton />
      <Footer />
    </Box>
  );
}
