/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, TextField, Card, CardContent } from '@mui/material';
import { colorPalette } from '@utils/colorPalette';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { GetUser, GetLanguage, GetCartDetails } from '@redux-state/selectors';
import { useDispatch } from 'react-redux';
import PhoneTextInput from '@components/PhoneTextInput';
import { emptyCart, addToCart } from '@redux-state/common/action';
import pusher from '@helpers/pusherConfig';
import constants from '@helpers/constants';
import useRouter from '@helpers/useRouter';
import { toggleToast } from '@redux-state/common/action';
import OrderSummary from './OrderSummary';
import BackButton from '@components/BackButton';

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
    box-sizing: border-box;
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }

    /* firefox */
    &:focus-visible {
      outline: 0;
    }
  `,
);

const CheckoutPage = () => {
  const user = GetUser();
  const dispatch = useDispatch();
  const language = GetLanguage();
  const cart = GetCartDetails();

  const router = useRouter()

  const isRTL = language === 'ar';

  const translations = {
    en: {
      contactNumber: 'Contact Number',
      email: 'Email',
      name: 'Name',
      shippingAddress: 'Shipping Address',
      deliverySchedule: 'Delivery Schedule',
      orderNote: 'Order Note',
      update: 'Update',
      add: 'Add',
    },
    ar: {
      contactNumber: 'رقم الاتصال',
      email: 'بريد إلكتروني',
      name: 'اسم',
      shippingAddress: 'عنوان الشحن',
      deliverySchedule: 'جدول التسليم',
      orderNote: 'ملاحظات الطلب',
      update: 'تحديث',
      add: 'إضافة',
    },
  };

  const currentTranslations = isRTL ? translations.ar : translations.en;

  const [shippingAddress, setShippingAddress] = useState(user?.location);
  const [orderNote, setOrderNote] = useState("");
  const [phone, setPhone] = useState(user?.phone);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState("Express Delivery");

  useEffect(() => {
    dispatch(addToCart({
      ...cart, orderDetails: {
        shipping_address: shippingAddress,
        phone: phone,
        order_note: orderNote
      }
    }))
  }, [orderNote, phone, selectedDeliveryOption, shippingAddress])

  const getOrderMessage = (data) => {
    if (isRTL) {
      return `شكرًا لتسوقك مع اتش ام. رقم الطلب: ${data.orderId} أنت القادم التالي!`;
    } else {
      return `Thanks for shopping with HM. Order number: ${data.orderId} You are the next one!`;
    }
  };

  useEffect(() => {
    const channel = pusher.subscribe(constants.ORDER_PLACE_CHANNEL);
    channel.bind(constants.order, function (data) {
      // dispatch(
      //   setLatestOrders(data.orderId)
      // );
      dispatch(
        toggleToast(true, getOrderMessage(data), 'success')
      );
      dispatch(emptyCart());
      router.push('/orders')
    });
    return () => {
      channel.unbind(constants.order);
      pusher.unsubscribe(constants.ORDER_PLACE_CHANNEL);
    };
  }, []);

  const Stepper = ({ step, text, buttonText, hasAddButton = true }) => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: isRTL ? 'row-reverse' : 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 5,
          textAlign: isRTL ? 'right' : 'left',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: isRTL ? 'row-reverse' : 'row',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              borderRadius: 20,
              background: colorPalette.theme,
              width: 30,
              height: 30,
              textAlign: 'center',
              justifyContent: 'center',
              color: colorPalette.white,
              lineHeight: '30px',
              marginLeft: isRTL ? 1 : 0,
            }}
          >
            <Typography variant="h6">{step}</Typography>
          </Box>
          <Typography marginLeft={2} variant="h6">
            {text}
          </Typography>
        </Box>
        {/* {hasAddButton && <Button
          variant="text"
          sx={{ color: colorPalette.theme }}
          startIcon={!isRTL && <AddIcon sx={{ marginRight: -1, marginLeft: 1 }} />}
          endIcon={isRTL && <AddIcon sx={{ marginLeft: -1, marginRight: 1 }} />}
        >
          <Typography variant="body2" fontWeight={510} sx={{ textTransform: 'none' }}>
            {buttonText}
          </Typography>
        </Button>} */}
      </Box>
    );
  };

  return (
    <Box sx={{ background: colorPalette.greyBackground, marginTop: 10 }}>
      <Box sx={{ background: colorPalette.greyBackground }}>
        <BackButton />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 15,
          background: cart?.items?.length > 0 ? colorPalette.greyBackground : colorPalette.white,
          direction: isRTL ? 'rtl' : 'ltr',
        }}
      >

        {cart?.items?.length > 0 ? <Grid container spacing={3} sx={{ maxWidth: '1200px', width: '100%' }}>
          <Grid item xs={12} md={8}>
            <Card sx={{ marginBottom: 3, padding: 2 }}>
              <CardContent sx={{ direction: 'ltr' }}>
                <Stepper
                  step={1}
                  text={currentTranslations.contactNumber}
                  buttonText={currentTranslations.update}
                />
                <Box sx={{ marginTop: 5 }}>
                  <PhoneTextInput rtl={isRTL} value={phone} onChange={setPhone} />
                </Box>
              </CardContent>
            </Card>

            {/* Email */}
            <Card sx={{ marginBottom: 3, padding: 2 }}>
              <CardContent sx={{ direction: 'ltr' }}>
                <Stepper
                  step={2}
                  text={currentTranslations.email}
                />
                <div dir={isRTL ? "rtl" : "ltr"}>
                  <TextField
                    fullWidth
                    disabled
                    value={user?.email}
                    variant="outlined"
                    rows={4}
                    sx={{ marginTop: 1 }}
                  />
                </div>

              </CardContent>
            </Card>
            {/* Name */}
            <Card sx={{ marginBottom: 3, padding: 2 }}>
              <CardContent sx={{ direction: 'ltr' }}>
                <Stepper
                  step={3}
                  text={currentTranslations.name}
                />
                <div dir={isRTL ? "rtl" : "ltr"}>

                  <TextField
                    fullWidth
                    disabled
                    value={user?.username}
                    variant="outlined"
                    rows={4}
                    sx={{ marginTop: 1 }}
                  />
                </div>
              </CardContent>
            </Card>
            {/* Shipping Address */}
            <Card sx={{ marginBottom: 3, padding: 2 }}>
              <CardContent sx={{ direction: 'ltr' }}>
                <Stepper
                  step={4}
                  text={currentTranslations.shippingAddress}
                  buttonText={currentTranslations.add}
                />
                <div dir={isRTL ? "rtl" : "ltr"}>

                  <TextField
                    fullWidth
                    multiline
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    variant="outlined"
                    rows={4}
                    sx={{ marginTop: 1 }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Delivery Schedule */}
            {/* <Card sx={{ marginBottom: 3, padding: 2 }}>
            <CardContent>
              <Stepper
                step={3}
                text={currentTranslations.deliverySchedule}
                buttonText={currentTranslations.add}
                hasAddButton={false}
              />
              <DeliveryCardSelection
                setSelectedDeliveryOption={setSelectedDeliveryOption}
                selectedDeliveryOption={selectedDeliveryOption}
                isRTL={isRTL}
              />
            </CardContent>
          </Card> */}

            {/* Order Note */}
            <Card sx={{ marginBottom: 3, padding: 2 }}>
              <CardContent sx={{ direction: 'ltr' }}>
                <Stepper
                  step={5}
                  text={currentTranslations.orderNote}
                  buttonText={currentTranslations.add}
                />
                <div dir={isRTL ? "rtl" : "ltr"}>
                  <TextField
                    fullWidth
                    multiline
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    variant="outlined"
                    rows={4}
                    sx={{ marginTop: 1 }}
                  />
                </div>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Side */}
          <OrderSummary isRTL={isRTL} shippingAddress={shippingAddress} deliverySchedule={selectedDeliveryOption} />
        </Grid> :
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignSelf: 'center' }}>
            <Typography variant="h5" color="textSecondary">
              {isRTL ? "العربة فارغة" : "Cart is Empty"}
            </Typography>
          </Box>}
      </Box>
    </Box>

  );
};

export default CheckoutPage;
