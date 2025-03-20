import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Box, MenuItem, OutlinedInput, Select, styled, TextField, Typography } from '@mui/material';
import { GetAllProductsCount, GetProducts, GetProductsLoading, GetLanguage, GetCategories, GetProductCatalogs } from '@redux-state/common/selectors';
import { getProducts, getProductCatalog, getCategories } from '@redux-state/common/action';
import { colorPalette } from '@utils/colorPalette';
import ProductsView from './ProductsView';
import CategoryDrawer from '../CategoryDrawer';

const StyledDescriptionFieldText = styled(TextField)({
  borderRadius: '8px',
  marginLeft: 10,
  marginRight: 10,
  background: colorPalette.white,
  maxWidth: 80
});

const ProductCardView = ({ drawerWidth = 300 }) => {
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [open, setOpen] = useState(null);
  const [filter, setFilter] = useState({});
  const [brand, setBrand] = useState();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [priceError, setPriceError] = useState('');


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
  const categories = GetCategories();
  const allProductCatalogs = GetProductCatalogs();

  const splitByTypeAndLanguage = (array) => {
    return array.reduce((acc, item) => {
      const { type } = item;
      const language = 'en';
      if (!acc[language]) {
        acc[language] = {};
      }

      if (!acc[language][type]) {
        acc[language][type] = [];
      }

      acc[language][type].push(item);
      return acc;
    }, {});
  };

  const {
    en: {
      brand: enBrands = []
    } = {},
  } = splitByTypeAndLanguage(allProductCatalogs || []);

  const dispatch = useDispatch();

  const handleOpen = (value) => setOpen(value);
  const handleClose = () => setOpen(null);

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/flashSale' || pathname === '/offers') {
      const filterKey = pathname === '/flashSale' ? 'flash_sale' : 'discount_offer';
      setFilter({ [filterKey]: filterKey });
    } else {
      if (categories?.length > 0) {
        const randomIndex = Math.floor(Math.random() * categories.length);
        setFilter({ webCategory: categories[randomIndex]?.id })
      }
    }
  }, [pathname, categories]);

  useEffect(() => {
    if (from && to && parseFloat(from) > parseFloat(to)) {
      setPriceError(isRTL ? 'يجب أن يكون من أقل من إلى' : 'From value should not be greater than To');
    } else {
      setPriceError('');
    }
  }, [from, to, isRTL]);

  useEffect(() => {
    dispatch(getProductCatalog());
    dispatch(getCategories());
  }, [dispatch]);

  const InputTextField = useCallback(
    ({ label, value, setValue, multiline, type = 'text' }) => {
      const handleChange = (e) => {
        let inputValue = e.target.value;

        

        // If the type is number, ensure it's not negative
        if (type === 'number') {
          // Ensure the value is a valid number and non-negative
          if (inputValue === '' || (parseFloat(inputValue) >= 0 && !isNaN(inputValue))) {
            setValue(inputValue);
          }
        } else {
          // For non-number fields, just update the value
          setValue(inputValue);
        }
      };
      return (
        <StyledDescriptionFieldText
          multiline={multiline}
          size='small'
          label={label}
          type={type}
          value={value}
          onChange={handleChange}
        />
      );
    },
    []
  );

  const InputBrandsSelectField = useCallback(
    () => {
      return (
        <Box>
          <Select
            sx={{ height: 40, background: colorPalette.white }}
            size='medium'
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            input={<OutlinedInput />}
          >
            <MenuItem>
              {isRTL ? 'حدد العلامة التجارية' : 'Select Brand'}
            </MenuItem>
            {enBrands?.map((brand, brandIndex) => (
              <MenuItem key={brandIndex} value={brand.id}>
                {isRTL ? brand.ar_title : brand.title}
              </MenuItem>))}
          </Select>
        </Box>
      );
    },
    [enBrands, brand]
  );

  const loadProducts = () => {
    dispatch(getProducts(pagination, filter));
  }

  useEffect(() => {
    if (filter) {
      loadProducts();
    }
  }, [dispatch, filter, pathname]);

  useEffect(() => {
    if (priceError) {
      alert(priceError) // Logging error instead of using alert
      return; // Skip further logic if there's an error
    }

    const newFilter = {};

    if (brand) {
      newFilter.brand = brand;
    }

    if (from && to) {
      newFilter.min_price = from;
      newFilter.max_price = to;
    }

    setFilter(newFilter);

  }, [brand, from, to, priceError]);



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
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Typography marginRight={2} variant="h6" fontWeight={600} >
              {isRTL ? 'التصفية حسب:' : 'Filter by:'}
            </Typography>
            <Typography marginRight={1} marginLeft={2} variant="body2" >
              {isRTL ? 'ماركة:' : 'Brand:'}
            </Typography>
            <InputBrandsSelectField />
            <Typography marginRight={1} marginLeft={2} variant="body2" >
              {isRTL ? 'نطاق السعر:' : 'Price Range:'}
            </Typography>
            <InputTextField
              label={isRTL ? 'من' : 'From'}
              type='number'
              value={from}
              setValue={setFrom}
            />
            <InputTextField
              label={isRTL ? 'ل' : 'To'}
              type='number'
              value={to}
              setValue={setTo}
            />
          </Box>
          <ProductsView filter={filter} hasMoreItems={hasMoreItems} loadProducts={loadProducts} isFetching={isFetching} isRTL={isRTL} open={open} handleOpen={handleOpen} setOpen={setOpen} />
        </Box>
      </Box>

    </Box>
  );
};

export default ProductCardView;
