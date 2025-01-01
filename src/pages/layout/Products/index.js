import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Box, LinearProgress } from '@mui/material';
import { GetAllProductsCount, GetProducts, GetProductsLoading, GetLanguage } from '@redux-state/common/selectors';
import { getProducts, getProductCatalog, getCategories } from '@redux-state/common/action';
import ProductsView from './ProductsView';
import CategoryDrawer from '../CategoryDrawer';

const ProductCardView = ({ drawerWidth = 300 }) => {
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [open, setOpen] = useState(null);
  const [filter, setFilter] = useState({});

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

  useEffect(() => {
    dispatch(getProducts(pagination, filter));
  }, [dispatch, filter, pagination]);

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


  return (
    <>
      <Box
        sx={{
          padding: 2,
          display: 'flex',
          flexDirection: 'row',
          cursor: 'pointer',
          transition: 'margin 0.3s ease',
          direction: isRTL ? 'rtl' : 'ltr',
        }}
      >
        <CategoryDrawer setFilter={setFilter} pagination={pagination} height={'100vh'} />
        {/* {!isFetching && itemsCount > 10 && hasMoreItems && ( */}
        {/* <LinearProgress value={10} /> */}
        {/* )} */}

        <ProductsView products={products} isRTL={isRTL} open={open} handleOpen={handleOpen} setOpen={setOpen} />
        {/* Loading Spinner */}
      </Box>

      {isFetching && (
        <>
          <LinearProgress value={10} />
          <Typography
            sx={{ textAlign: 'center', color: 'gray' }}
            variant="body2"
          >
            {isRTL ? 'جار تحميل المنتجات...' : 'Loading more products...'}
          </Typography>
        </>
      )}
    </>
  );
};

export default ProductCardView;
