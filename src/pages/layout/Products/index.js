import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Box, LinearProgress } from '@mui/material';
import { GetAllProductsCount, GetProducts, GetProductsLoading, GetLanguage } from '@redux-state/common/selectors';
import { getProducts, getProductCatalog, getCategories } from '@redux-state/common/action';
import ProductsView from './ProductsView';

const ProductCardView = ({ drawerWidth = 300 }) => {
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [open, setOpen] = useState(null);

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
    dispatch(getProducts(pagination)); // Fetch products
    dispatch(getProductCatalog());
    dispatch(getCategories());
  }, [dispatch, pagination]);

  const products = GetProducts();

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setRowsPerPage((rowsPerPage) => rowsPerPage + 10);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <Box
      sx={{
        padding: 2,
        cursor: 'pointer',
        marginLeft: isRTL ? 0 : `${drawerWidth}px`,
        marginRight: isRTL ? `${drawerWidth}px` : 0,
        transition: 'margin 0.3s ease',
        direction: isRTL ? 'rtl' : 'ltr',
      }}
    >
      <ProductsView products={products} isRTL={isRTL} open={open} handleOpen={handleOpen} setOpen={setOpen} />
      {/* Loading Spinner */}
      {isFetching && itemsCount > 10 && hasMoreItems && (
        <LinearProgress value={10} />
      )}
      {isFetching && (
        <Typography
          sx={{ textAlign: 'center', marginTop: 2, color: 'gray' }}
          variant="body2"
        >
          {isRTL ? 'جار تحميل المنتجات...' : 'Loading more products...'}
        </Typography>
      )}
    </Box>
  );
};

export default ProductCardView;
