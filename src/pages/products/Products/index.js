import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { GetAllProductsCount, GetProducts, GetProductsLoading, GetLanguage } from '@redux-state/common/selectors';
import { getProducts, getProductCatalog, getCategories } from '@redux-state/common/action';
import { colorPalette } from '@utils/colorPalette';
import ProductsView from './ProductsView';
import CategoryDrawer from '../CategoryDrawer';

const ProductCardView = ({ drawerWidth = 300 }) => {
  const [rowsPerPage, setRowsPerPage] = useState(20);
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

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/flashSale' || pathname === '/offers') {
      const filterKey = pathname === '/flashSale' ? 'flash_sale' : 'discount_offer';
      setFilter({ [filterKey]: filterKey });
    } else {
      setFilter({})
    }
  }, [pathname]);


  useEffect(() => {
    dispatch(getProductCatalog());
    dispatch(getCategories());
  }, [dispatch]);

  const loadProducts = () => {
    dispatch(getProducts(pagination, filter));
  }

  useEffect(() => {
    loadProducts();
  }, [dispatch, filter, pathname]);

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
    <Box sx={{ background: colorPalette.greyBackground }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          cursor: 'pointer',
          transition: 'margin 0.3s ease',
          direction: isRTL ? 'rtl' : 'ltr',
        }}
      >
        <CategoryDrawer setFilter={setFilter} pagination={pagination} height={'100vh'} />
        <ProductsView filter={filter} hasMoreItems={hasMoreItems} loadProducts={loadProducts} isFetching={isFetching} products={products} isRTL={isRTL} open={open} handleOpen={handleOpen} setOpen={setOpen} />
      </Box>

    </Box>
  );
};

export default ProductCardView;
