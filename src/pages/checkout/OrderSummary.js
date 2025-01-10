import React from 'react';
import { Box, Typography, Button, Grid, Divider } from '@mui/material';
import { GetUser, GetCartDetails, GetProductCatalogs } from '@redux-state/selectors';
import { colorPalette } from '../../utils/colorPalette';

const OrderSummary = ({ isRTL }) => {
  const user = GetUser();
  const cartDetails = GetCartDetails();
  const allProductCatalogs = GetProductCatalogs();

  const splitByTypeAndLanguage = (array) => {
    return array.reduce((acc, item) => {
      const { type, language } = item;

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
      brand: enBrands = [],
      'available-color': enAvailableColors = [],
      material: enMaterials = [],
      unit: enUnits = [],
      size: enSizes = []
    } = {},
    ar: {
      brand: arBrands = [],
      'available-color': arAvailableColors = [],
      material: arMaterials = [],
      unit: arUnits = [],
      size: arSizes = []
    } = {}
  } = splitByTypeAndLanguage(allProductCatalogs);

  const translations = {
    en: {
      yourOrder: "Your Order",
      subTotal: "SubTotal",
      placeOrder: "Place Order",
    },
    ar: {
      yourOrder: "طلبك",
      subTotal: "المجموع الفرعي",
      placeOrder: "وضع النظام",
    }
  };

  const currentTranslations = isRTL ? translations.ar : translations.en;

  return (
    <Grid item xs={12} md={4}>
      <Box
        sx={{
          padding: 2,
          background: colorPalette.greyBackground,
          direction: isRTL ? 'rtl' : 'ltr',
          textAlign: isRTL ? 'right' : 'left',
        }}
      >
        <Typography marginBottom={5} textAlign='center' variant="h6" fontWeight="bold">
          {currentTranslations.yourOrder}
        </Typography>
        {cartDetails.items.map((item, index) => {
          const enProductSize = enSizes.find(size => size?._id === item?.size);
          const arProductSize = arSizes.find(size => size?._id === item?.ar_size);

          const size = isRTL
            ? arSizes.find(size => size?.value === arProductSize?.value)
            : enSizes.find(size => size?.value === enProductSize?.value);

          return (
            <Box
              sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: isRTL ? 'row-reverse' : 'row',
                justifyContent: 'space-between',
              }}
              key={index}
            >
              <Typography fontWeight={510}>{item.quantity} x </Typography>
              <Typography
                variant="subtitle2"
                color='textDisabled'
                sx={{
                  display: '-webkit-box',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '40%',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {item.website_name}
              </Typography>
              <Typography
                color='textDisabled'

                variant="subtitle2"
              >
                | {size?.title}
              </Typography>
              <Typography
                color='textDisabled'
                variant="subtitle2">
                {isRTL ? item.price.toFixed(2) + " ر۔ع" : 'OMR ' + item.price.toFixed(2)}
              </Typography>
            </Box>
          );
        })}
        <Divider sx={{ margin: '16px 0' }} />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: isRTL ? 'row-reverse' : 'row',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body2"
            color='textDisabled'
          >
            {currentTranslations.subTotal}
          </Typography>
          <Typography variant="body2"
            color='textDisabled'
          >
            {isRTL ? cartDetails.totalPrice.toFixed(2) + " ر۔ع" : 'OMR ' + cartDetails.totalPrice.toFixed(2)}
          </Typography>
        </Box>
        <Box sx={{ marginTop: 3 }}>
          <Button sx={{ background: colorPalette.theme, textTransform: 'capitalize', fontSize: 16 }} variant="contained" fullWidth>
            {currentTranslations.placeOrder}
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default OrderSummary;
