import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { GetAllProductsCount, GetProducts, GetProductsLoading, GetLanguage } from '@redux-state/common/selectors';
import { getProducts, getProductCatalog, getCategories } from '@redux-state/common/action';
import { colorPalette } from '@utils/colorPalette';
import Footer from '@components/Footer';
import ProductsView from '../products/Products/ProductsView';
import CartFloatButton from '../products/CartFloatButton';
import CardDrawer from '../products/CardDrawer/CartDrawer';

const WishList = ({ drawerWidth = 300 }) => {
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [open, setOpen] = useState(null);
  const [filter, setFilter] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);

  const language = GetLanguage(); // Get the current language (en or ar)
  const isRTL = language === 'ar'; // Check if the language is Arabic

  const pagination = useMemo(
    () => ({
      page: 0,
      perPage: rowsPerPage,
    }),
    [rowsPerPage]
  );

  const isFetching = GetProductsLoading();
  const itemsCount = GetAllProductsCount();
  const dispatch = useDispatch();

  const handleOpen = (value) => setOpen(value);
  const handleClose = () => setOpen(null);

  useEffect(() => {
    dispatch(getProductCatalog());
    dispatch(getCategories());
  }, [dispatch]);

  const loadProducts = () => {
    dispatch(getProducts(pagination, filter));
  };

  useEffect(() => {
    loadProducts();
  }, [dispatch, filter]);

  const products = GetProducts();

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        if (products?.length > 0) {
          setRowsPerPage((rowsPerPage) => rowsPerPage + 10);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [products]);

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  const fetchFeedData = useCallback(() => {
    if (itemsCount > 0 && itemsCount <= pagination.perPage) {
      setHasMoreItems(false);
    }
  }, [dispatch, pagination, itemsCount, pagination.perPage]);

  useEffect(() => {
    fetchFeedData();
  }, [pagination.perPage, fetchFeedData]);

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
          }}
        >
          {/* Heart Icon */}
          <FavoriteRoundedIcon sx={{ fontSize: 40, color: colorPalette.theme, marginBottom: 1 }} />

          {/* Wishlist Title */}
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: colorPalette.darkText }}>
            {isRTL ? 'قائمتي المفضلة' : 'My Wishlist'}
          </Typography>
        </Box>

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
            isFetching={isFetching}
            products={products}
            isRTL={isRTL}
            open={open}
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
