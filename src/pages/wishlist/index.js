import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, LinearProgress, Typography } from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { GetAllProductsCount, GetLanguage, GetUser } from '@redux-state/selectors';
import { colorPalette } from '@utils/colorPalette';
import Footer from '@components/Footer';
import { Api } from '@redux-state/common/api';
import ProductsView from '../products/Products/ProductsView';
import CartFloatButton from '../products/CartFloatButton';
import CardDrawer from '../products/CardDrawer/CartDrawer';

const WishList = ({ drawerWidth = 300 }) => {
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [open, setOpen] = useState(null);
  const [filter, setFilter] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [wishListProducts, setWishListProducts] = useState([]);
  const [loader, setLoader] = useState(false);

  const user = GetUser();
  const language = GetLanguage(); // Get the current language (en or ar)
  const isRTL = language === 'ar'; // Check if the language is Arabic

  // const pagination = useMemo(
  //   () => ({
  //     page: 0,
  //     perPage: rowsPerPage,
  //   }),
  //   [rowsPerPage]
  // );

  const itemsCount = GetAllProductsCount();
  const dispatch = useDispatch();

  const handleOpen = (value) => setOpen(value);
  const handleClose = () => setOpen(null);

  const loadProducts = async () => {
    setLoader(true);
    const wishListProducts = await Api.getWishListProducts(user.id);
    if (wishListProducts) {
      setWishListProducts(wishListProducts);
    }
    setLoader(false);
  };

  useEffect(() => {
    if (user) {
      loadProducts();
    }
  }, [dispatch]);


  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (
  //       window.innerHeight + document.documentElement.scrollTop + 1 >=
  //       document.documentElement.scrollHeight
  //     ) {
  //       if (products?.length > 0) {
  //         setRowsPerPage((rowsPerPage) => rowsPerPage + 10);
  //       }
  //     }
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [products]);

  // window.onbeforeunload = function () {
  //   window.scrollTo(0, 0);
  // };

  // const fetchFeedData = useCallback(() => {
  //   if (itemsCount > 0 && itemsCount <= pagination.perPage) {
  //     setHasMoreItems(false);
  //   }
  // }, [dispatch, pagination, itemsCount, pagination.perPage]);

  // useEffect(() => {
  //   fetchFeedData();
  // }, [pagination.perPage, fetchFeedData]);

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
            display: 'flex',
            flexDirection: 'row',
            cursor: 'pointer',
            transition: 'margin 0.3s ease',
            direction: isRTL ? 'rtl' : 'ltr',
          }}
        >
          <ProductsView
            hasMoreItems={hasMoreItems}
            loadProducts={loadProducts}
            isFetching={loader}
            products={wishListProducts}
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
