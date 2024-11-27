import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Card, CardContent, CardMedia, Typography, Button, Box, LinearProgress } from '@mui/material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { GetAllProductsCount, GetProducts, GetProductsLoading, GetLanguage } from '@redux-state/common/selectors';
import { getProducts } from '@redux-state/common/action';
import { colorPalette } from '@utils/colorPalette';
import { ProductModal } from '@components/Modal/ProductModal';

const product = {
  name: 'Apples',
  weight: '1 lb',
  description:
    'An apple is a sweet, edible fruit produced by an apple tree (Malus domestica). Apple trees are ble fruit produced by an apple tree (Malus domestica). Apple trees arble fruit produced by an apple tree (Malus domestica). Apple trees ar...',
  price: 1.6,
  oldPrice: 2.0,
  available: 18,
  categories: ['fruits & vegetables', 'fruits'],
  seller: 'Grocery Shop',
  image:
    'https://via.placeholder.com/300x300.png?text=Product+Image',
  gallery: [
    'https://via.placeholder.com/60x60.png?text=1',
    'https://via.placeholder.com/60x60.png?text=2',
    'https://via.placeholder.com/60x60.png?text=3',
    'https://via.placeholder.com/60x60.png?text=3',
  ],
};


const ProductCardView = ({ drawerWidth = 300 }) => {
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [open, setOpen] = useState(false);

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(getProducts(pagination)); // Fetch products
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
      onClick={handleOpen}
    >
      {open && <ProductModal open={open} handleClose={handleClose} product={product} />}
      {isFetching && itemsCount > 10 && hasMoreItems && (
        <LinearProgress value={10} />
      )}
      <Grid container spacing={3}>
        {products.map((product, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={`${product.id}-${index}`}
            sx={{ direction: isRTL ? 'rtl' : 'ltr' }} // Ensure each card respects the language direction
          >
            <Card
              sx={{
                maxWidth: 300,
                margin: 'auto',
                position: 'relative',
                textAlign: isRTL ? 'right' : 'left', // Align text based on language
              }}
            >
              {/* Discount Badge */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 10,
                  [isRTL ? 'left' : 'right']: 10, // Adjust position for RTL
                  backgroundColor: colorPalette.yellowGolden,
                  padding: '3px 8px',
                  borderRadius: 10,
                  color: colorPalette.white,
                  fontSize: 12,
                }}
              >
                {isRTL ? '٪10' : '10%'}
              </Box>
              {/* Product Image */}
              <CardMedia
                component="img"
                height="150"
                image={
                  'https://pickbazar-react-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F1%2FApples.jpg&w=3840&q=75'
                }
                alt={product?.name}
                sx={{ objectFit: 'contain' }}
              />
              <CardContent>
                {/* Product Name */}
                <Typography variant="subtitle2" component="div">
                  {isRTL ? product?.arabicName || product?.name : product?.name}
                </Typography>
                {/* Product Weight */}
                <Typography variant="body2" color="textDisabled">
                  {isRTL ? '1 باوند' : '1 lb'}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: isRTL ? 'row-reverse' : 'row', // Reverse for RTL
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  {/* Pricing */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: isRTL ? 'end' : 'start', // Align text for RTL
                      marginTop: 1,
                    }}
                  >
                    {/* Old Price */}
                    <Typography
                      variant="caption"
                      color="textDisabled"
                      sx={{ textDecoration: 'line-through' }}
                    >
                      {isRTL ? '٢ ر۔ع' : '2 OMR'}
                    </Typography>
                    {/* Current Price */}
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 'bold',
                        color: colorPalette.greenButton,
                      }}
                    >
                      {isRTL ? `د.إ${product?.price.toFixed(2)}` : `$${product?.price.toFixed(2)}`}
                    </Typography>
                  </Box>
                  {/* Add to Cart Button */}
                  <Button
                    variant="contained"
                    startIcon={
                      !isRTL && <LocalMallIcon style={{ width: 16, height: 16 }} />
                    }
                    endIcon={
                      isRTL && <LocalMallIcon style={{ width: 16, height: 16 }} />
                    } // Adjust icon position for RTL
                    sx={{
                      fontWeight: 'bold',
                      marginTop: 2,
                      textTransform: 'capitalize',
                      borderRadius: 10,
                      background: colorPalette.white,
                      color: colorPalette.greenButton,
                      width: 100,
                    }}
                  >
                    {isRTL ? 'السلة' : 'Cart'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Loading Spinner */}
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
