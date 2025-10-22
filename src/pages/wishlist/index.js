/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, LinearProgress, Typography } from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { GetLanguage, GetUser, GetWishlistLoading } from '@redux-state/selectors';
import { colorPalette } from '@utils/colorPalette';
import Footer from '@components/Footer';
import { Api } from '@redux-state/common/api';
import { getProductsSuccess } from '@redux-state/common/action';
import ProductsView from '../products/Products/ProductsView';
import CartFloatButton from '../products/CartFloatButton';
import CardDrawer from '../products/CardDrawer/CartDrawer';

const WishList = ({ drawerWidth = 300 }) => {
  // eslint-disable-next-line no-unused-vars
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [open, setOpen] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loader, setLoader] = useState(false);

  const user = GetUser();
  const wishlistLoading = GetWishlistLoading();
  const language = GetLanguage(); // Get the current language (en or ar)
  const isRTL = language === 'ar'; // Check if the language is Arabic

  const dispatch = useDispatch();

  const handleOpen = (value) => setOpen(value);

  const loadProducts = async () => {
    setLoader(true);
    const wishListProducts = await Api.getWishListProducts(user.id);
    if (wishListProducts?.length > 0) {
      dispatch(getProductsSuccess({ products: wishListProducts, count: wishListProducts.length }));
    } else {
      dispatch(getProductsSuccess({ products: [], count: 0 }));
    }
    setLoader(false);
  };

  useEffect(() => {
    if (user) {
      loadProducts();
    }
  }, [dispatch, user, wishlistLoading]);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <Box sx={{ background: colorPalette.greyBackground, minHeight: '100vh', padding: 3 }}>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '24px 0',
            marginTop: 10
          }}
        >

          {/* Heart Icon */}
          <FavoriteRoundedIcon sx={{ fontSize: 40, color: colorPalette.theme, marginBottom: 1 }} />

          {/* Wishlist Title */}
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: colorPalette.darkText }}>
            {isRTL ? 'قائمتي المفضلة' : 'My Wishlist'}
          </Typography>
        </Box>
        {loader && <LinearProgress value={10} />}

        {/* Product Grid */}
        <Box
          sx={{
            transition: 'margin 0.3s ease',
            direction: isRTL ? 'rtl' : 'ltr',
          }}
        >
          <ProductsView
            hasMoreItems={hasMoreItems}
            loadProducts={loadProducts}
            isFetching={loader}
            isRTL={isRTL}
            open={open}
            loadMore={loader}
            handleOpen={handleOpen}
            setOpen={setOpen}
          />
        </Box>
        <CardDrawer open={drawerOpen} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
        <CartFloatButton open={drawerOpen} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
      </Box>
      <Footer />
    </>
  );
};

export default WishList;
