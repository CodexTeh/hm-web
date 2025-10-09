import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import TuneIcon from '@mui/icons-material/Tune'
import Refresh from '@mui/icons-material/Refresh'
import {
  Box, Card, CardContent, IconButton, MenuItem, OutlinedInput, Select, styled,
  TextField, Typography
} from '@mui/material';
import {
  GetAllProductsCount, GetProducts, GetProductsLoading, GetLanguage,
  GetCategories, GetProductCatalogs, GetSearchText
} from '@redux-state/common/selectors';
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

const ALL_VALUE = 'all';

// --- NEW SORTING CONSTANTS ---
const SORT_OPTIONS = {
  NONE: 'none',
  PRICE_ASC: 'price_asc',
  PRICE_DESC: 'price_desc',
};
// -----------------------------

const ProductCardView = () => {
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [open, setOpen] = useState(null);
  const [filter, setFilter] = useState(null);
  const [brand, setBrand] = useState(ALL_VALUE);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [priceError, setPriceError] = useState('');
  // --- NEW STATE FOR SORTING ---
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.NONE);
  // -----------------------------


  const language = GetLanguage();
  const isRTL = language === 'ar';

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
  const searchText = GetSearchText();
  const allProductCatalogs = GetProductCatalogs();

  // ... (splitByTypeAndLanguage and enBrands logic remains the same)

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
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/flashSale' || pathname === '/offers') {
      const filterKey = pathname === '/flashSale' ? 'flash_sale' : 'discount_offer';
      setFilter({ [filterKey]: filterKey });
    } else {
      if (categories?.length > 0) {
        const randomIndex = Math.floor(Math.random() * categories.length);
        setFilter({ webCategory: categories[randomIndex]?.id })
      } else if (searchText) {
        setFilter({ website_name: searchText }); // Set to empty object if no categories available
      }
    }
  }, [pathname, categories, searchText]);

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
    // ... (InputTextField definition remains the same)
    ({ label, value, setValue, multiline, type = 'text' }) => {
      const handleChange = (e) => {
        let inputValue = e.target.value;
        if (type === 'number') {
          if (inputValue === '' || (parseFloat(inputValue) >= 0 && !isNaN(inputValue))) {
            setValue(inputValue);
          }
        } else {
          setValue(inputValue);
        }
        setSortBy(SORT_OPTIONS.NONE)
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
    // ... (InputBrandsSelectField definition remains the same)
    () => {
      const bilingualAll = isRTL ? 'الكل' : 'All';

      return (
        <Box sx={{ mb: 1, ml: 1 }}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, color: 'text.secondary', minWidth: 70, mb: 1 }}
          >
            {isRTL ? 'ماركة' : 'Brand'}
          </Typography>

          <Select
            sx={{ height: 40, background: colorPalette.white }}
            size="medium"
            value={brand ?? ALL_VALUE}
            onChange={(e) => {
              setSortBy(SORT_OPTIONS.NONE);
              setBrand(e.target.value)
            }}
            input={<OutlinedInput />}
          >
            <MenuItem value={ALL_VALUE}>{bilingualAll}</MenuItem>

            {(enBrands ?? []).map((b, idx) => (
              <MenuItem key={idx} value={b.id}>
                {isRTL ? b.ar_title : b.title}
              </MenuItem>
            ))}
          </Select>
        </Box>
      );
    }, [isRTL, brand, enBrands]
  );

  // --- NEW INPUT COMPONENT FOR SORTING ---
  const InputSortBySelectField = useCallback(() => {
    return (
      <Box sx={{ mb: 1, ml: 1 }}>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 600, color: 'text.secondary', minWidth: 70, mb: 1 }}
        >
          {isRTL ? 'ترتيب حسب' : 'Sort By'}
        </Typography>

        <Select
          sx={{ height: 40, background: colorPalette.white, minWidth: 150 }}
          size="medium"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          input={<OutlinedInput />}
        >
          <MenuItem value={SORT_OPTIONS.NONE}>{isRTL ? 'بدون ترتيب' : 'Default'}</MenuItem>
          <MenuItem value={SORT_OPTIONS.PRICE_ASC}>{isRTL ? ' من الأقل للأعلى' : 'Low to High'}</MenuItem>
          <MenuItem value={SORT_OPTIONS.PRICE_DESC}>{isRTL ? ' من الأعلى للأقل' : 'High to Low'}</MenuItem>
        </Select>
      </Box>
    );
  }, [isRTL, sortBy]);

  const RenderProductsView = useCallback(() => {
    return (
      <ProductsView
        filter={filter}
        hasMoreItems={hasMoreItems}
        loadProducts={loadProducts}
        isFetching={isFetching}
        isRTL={isRTL}
        open={open}
        setOpen={setOpen}
        handleOpen={handleOpen}
        sortBy={sortBy}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, hasMoreItems, isFetching, isRTL, open, sortBy]);
  // ---------------------------------------
      console.log('yoyo', filter);

  const loadProducts = () => {
    if (sortBy === SORT_OPTIONS.NONE) {
      dispatch(getProducts(pagination, filter));
    }
  }

  useEffect(() => {
    if (filter && Object.keys(filter).length > 0) {
      loadProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, filter, pathname]);

  useEffect(() => {
    if (priceError) {
      alert(priceError)
      return;
    }

    // --- LOGIC TO UPDATE FILTER BASED ON BRAND, PRICE, AND SORT ---
    // Make sure we carry over any existing filters (like the one from /flashSale)
    const newFilter = { };

    if (brand !== ALL_VALUE) {
      newFilter.brand = brand;
    }
    if (from && to) {
      newFilter.min_price = from;
      newFilter.max_price = to;
    }

    // Add sort to the filter object
    if (sortBy && sortBy !== SORT_OPTIONS.NONE) {
      newFilter.min_price = 1;
      newFilter.max_price = 1000;
    }
    if (searchText) {
      newFilter.website_name = searchText;
    }

    // Only update filter state if it has changed to prevent infinite loops
    setFilter(newFilter);

  }, [brand, from, to, priceError, sortBy, searchText]); // **Added sortBy as a dependency**

  const products = GetProducts();

  useEffect(() => {
    // ... (Scroll logic remains the same)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
                boxShadow: '0 6px 18px rgba(0,0,0,0.04)',
              }}
              aria-label={isRTL ? 'تصفية وترتيب حسب' : 'Filter and Sort by'}
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
                    {isRTL ? 'التصفية والترتيب' : 'Filter & Sort'}
                  </Typography>
                  <IconButton onClick={() => {
                    const randomIndex = Math.floor(Math.random() * categories.length);
                    setFrom('');
                    setTo('');
                    setBrand(ALL_VALUE);
                    setSortBy(SORT_OPTIONS.NONE);
                    setFilter(null);
                    dispatch(getProducts(pagination, { webCategory: categories[randomIndex]?.id }));
                  }}>
                    <Refresh color="primary" />
                  </IconButton>
                  <Box sx={{ flexGrow: 1 }} />
                </Box>

                {/* Inputs Grid */}
                <Box
                  sx={{ direction: isRTL ? 'rtl' : 'ltr', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap' }}
                >

                  {/* BRAND SELECT */}
                  <InputBrandsSelectField fullWidth />

                  {/* PRICE RANGE INPUTS */}
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.secondary', ml: 1, mr: 1, mb: 1 }}>
                      {isRTL ? 'نطاق السعر' : 'Price Range'}
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                      <InputTextField label={isRTL ? 'من' : 'From'} type="number" value={from} setValue={setFrom} />
                      <InputTextField label={isRTL ? 'إلى' : 'To'} type="number" value={to} setValue={setTo} />
                    </Box>
                  </Box>

                  {/* --- NEW SORT BY SELECT --- */}
                  <InputSortBySelectField />
                  {/* --------------------------- */}
                </Box>

              </CardContent>
            </Card>
          </Box>


          {/* PRODUCTS LIST */}
          <RenderProductsView />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCardView;