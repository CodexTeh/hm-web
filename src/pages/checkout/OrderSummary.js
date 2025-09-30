/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Typography, Button, Grid, Divider, CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { GetUser, GetCartDetails, GetProductCatalogs, GetPlaceOrderLoading } from '@redux-state/selectors';
import { placeOrder } from '@redux-state/common/action';
import { colorPalette } from '@utils/colorPalette';

const OrderSummary = ({ isRTL, selectedDeliveryOption, shippingAddress }) => {
  const user = GetUser();
  const cartDetails = GetCartDetails();
  const allProductCatalogs = GetProductCatalogs();
  const placeOrderLoading = GetPlaceOrderLoading();

  const dispatch = useDispatch();

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
          const discountValue = item?.flash_sale > 0 ? item?.flash_sale : item?.discount_offer ? item?.discount_offer : 0;

          const getDiscountedPrice = () => {
            const numPrice = Number(item?.price);
            const numDiscount = Number(discountValue);
            const discountedValue = Number(numPrice) - (numPrice * numDiscount) / 100;
            return discountedValue.toFixed(3);
          };

          const hasDiscount = discountValue > 0;

          const finalPrice = hasDiscount ? getDiscountedPrice() : item?.price;

          const enProductSize = enSizes.find(size => size?.id?.toString() === item?.size?.toString());
          const arProductSize = arSizes.find(size => size?.id?.toString() === item?.ar_size?.toString());

          const size = isRTL
            ? arSizes.find(size => size?.id?.toString() === arProductSize?.id?.toString())
            : enSizes.find(size => size?.id?.toString() === enProductSize?.id?.toString());

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
                variant="caption"
                color='textDisabled'
                sx={{
                  display: '-webkit-box',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '40%',
                  WebkitLineClamp: 3,
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
                {isRTL ? finalPrice + " ر۔ع" : 'OMR ' + finalPrice}
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
            {isRTL ? cartDetails.totalPrice.toFixed(3) + " ر۔ع" : 'OMR ' + cartDetails.totalPrice.toFixed(3)}
          </Typography>
        </Box>
        <Box sx={{ marginTop: 3 }}>
          <Button onClick={() => {
            if (!shippingAddress) {
              alert(isRTL
                ? "يرجى إضافة عنوان الشحن وخيارات التسليم"
                : "Please add shipping address and delivery options")
              return
            }
            if (cartDetails.orderDetails) {
              dispatch(placeOrder(user, cartDetails))
            }
          }} sx={{ background: colorPalette.theme, textTransform: 'capitalize', fontSize: 16 }} variant="contained" fullWidth>
            {placeOrderLoading ? <CircularProgress size={25} color={colorPalette.white} /> : currentTranslations.placeOrder}
          </Button>
        </Box>
      </Box>
    </Grid >
  );
};

export default OrderSummary;
