import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import TuneIcon from '@mui/icons-material/Tune'
import { Box, Card, CardContent, Grid, MenuItem, OutlinedInput, Select, styled, TextField, Typography } from '@mui/material';
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
  const [filter, setFilter] = useState(null);
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
      setFilter(newFilter);
    }

    if (from && to) {
      newFilter.min_price = from;
      newFilter.max_price = to;
      setFilter(newFilter);
    }

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
          flexDirection: { xs: 'column', md: 'row' },
          cursor: 'pointer',
          transition: 'margin 0.3s ease',
          direction: isRTL ? 'rtl' : 'ltr',
          marginLeft: { xs: 2, md: 0 },
          marginRight: { xs: 2, md: 0 }
        }}
      >

        <CategoryDrawer setFilter={setFilter} pagination={pagination} height={'100vh'} />
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', mt: 2 }}>
          {/* FILTER BAR */}
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Card
              elevation={3}
              sx={{
                borderRadius: 2.5,
                width: { xs: '90%', md: '70%', lg: '60%' },
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
                boxShadow: '0 6px 18px rgba(0,0,0,0.04)',
              }}
              aria-label={isRTL ? 'تصفية حسب' : 'Filter by'}
            >
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                {/* Header */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.25,
                    mb: 2,
                    direction: isRTL ? 'rtl' : 'ltr',
                  }}
                >
                  <TuneIcon color="primary" />
                  <Typography
                    variant="h6"
                    component="div"
                    fontWeight={700}
                    color="text.primary"
                    sx={{ letterSpacing: 0.4, fontSize: { xs: 17, sm: 19 } }}
                  >
                    {isRTL ? 'التصفية حسب' : 'Filter by'}
                  </Typography>
                  <Box sx={{ flexGrow: 1 }} />
                </Box>

                {/* Inputs Grid: 2 columns on md+, 1 column on xs */}
                <Grid container spacing={2} alignItems="flex-start">
                  {/* Brand */}
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                        {isRTL ? 'ماركة' : 'Brand'}
                      </Typography>
                      <InputBrandsSelectField />
                    </Box>
                  </Grid>

                  {/* Price Range */}
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                        {isRTL ? 'نطاق السعر' : 'Price Range'}
                      </Typography>

                      <Box
                        sx={{
                          display: 'flex',
                          gap: 1,
                          flexDirection: { xs: 'column', sm: 'row' },
                          alignItems: 'stretch',
                        }}
                      >
                        <InputTextField
                          label={isRTL ? 'من' : 'From'}
                          type="number"
                          value={from}
                          setValue={setFrom}
                          // Ensure inputs look like pills on all sizes
                          sx={{
                            flex: 1,
                            minWidth: 120,
                            '& .MuiInputBase-root': {
                              borderRadius: 999, // pill shape
                              pl: 2,
                              pr: 2,
                            },
                            '& .MuiOutlinedInput-input': {
                              paddingY: 1.25,
                              paddingX: 2,
                            },
                          }}
                        />
                        <InputTextField
                          label={isRTL ? 'إلى' : 'To'}
                          type="number"
                          value={to}
                          setValue={setTo}
                          sx={{
                            flex: 1,
                            minWidth: 120,
                            '& .MuiInputBase-root': {
                              borderRadius: 999,
                              pl: 2,
                              pr: 2,
                            },
                            '& .MuiOutlinedInput-input': {
                              paddingY: 1.25,
                              paddingX: 2,
                            },
                          }}
                        />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>


          {/* PRODUCTS LIST */}
          <ProductsView
            filter={filter}
            hasMoreItems={hasMoreItems}
            loadProducts={loadProducts}
            isFetching={isFetching}
            isRTL={isRTL}
            open={open}
            setOpen={setOpen}
            handleOpen={handleOpen}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCardView;
