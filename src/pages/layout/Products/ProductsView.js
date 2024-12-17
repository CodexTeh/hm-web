import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { colorPalette } from '@utils/colorPalette';
import { ProductModal } from '@components/Modal/ProductModal';

const ProductsView = ({ products, isRTL, open, handleOpen, setOpen, ChildView }) => {

  return (
    <Grid
      container spacing={3}>
      {products.map((product, index) => {
        const imageUrls = product?.image_urls ? JSON.parse(product?.image_urls.replace(/'/g, '"')) : [];
        return (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={`${product.id}-${index}`}
            sx={{ direction: isRTL ? 'rtl' : 'ltr' }} // Ensure each card respects the language direction
          >
            {open === index + 1 && <ProductModal isRTL={isRTL} imageUrls={imageUrls} open={open === index + 1} setOpen={setOpen} product={product} ChildView={ChildView} />}

            <Card
              sx={{
                maxWidth: 300,
                margin: 'auto',
                position: 'relative',
                textAlign: isRTL ? 'right' : 'left', // Align text based on language
              }}
              onClick={() => {
                handleOpen(index + 1)
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
                height="300"
                image={
                  imageUrls?.length > 0 ? imageUrls[0] :
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
        )
      })}
    </Grid>
  );
};

export default ProductsView;
