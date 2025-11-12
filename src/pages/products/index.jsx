import { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Footer from 'components/Footer';
import { getCategories, getBanners } from 'redux-state/common/action';
import WhatsAppButton from 'components/WhatsAppButton';
import CardDrawer from './CardDrawer/CartDrawer';
import CartFloatButton from './CartFloatButton';
import Banner from './Banner';
import ProductCardView from './Products';
import { OffersSlider } from './OffersSlider';
import { Box } from '@mui/material';
import { GetCartDetails } from 'redux-state/selectors';

export default function Products() {

  // Local state
  const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useDispatch();
  const cartDetails = GetCartDetails();
  const prevTotalPriceRef = useRef(cartDetails?.totalPrice);

  // Fetch categories on mount
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBanners());
  }, [dispatch]);

  useEffect(() => {
    if (
      cartDetails &&
      typeof cartDetails.totalPrice !== 'undefined' &&
      cartDetails.totalPrice !== prevTotalPriceRef.current
    ) {
      handleDrawerOpen();
    }

    // update ref after checking
    prevTotalPriceRef.current = cartDetails?.totalPrice;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartDetails]);
  // Drawer handlers
  const handleDrawerOpen = useCallback(() => setOpenDrawer(true), []);
  const handleDrawerClose = useCallback(() => setOpenDrawer(false), []);

  return (
    <Box sx={{ paddingTop: 10 }}>
      <Banner />
      <OffersSlider />
      <ProductCardView />
      <CardDrawer open={openDrawer} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
      <CartFloatButton open={openDrawer} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
      <WhatsAppButton />
      <Footer />
    </Box>
  );
}
