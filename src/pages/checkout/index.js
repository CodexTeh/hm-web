import React, { useState } from 'react';
import { Box, Typography, Button, Grid, TextField, Divider, Paper, Card, CardContent } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { colorPalette } from '@utils/colorPalette';
import MaxHeightTextarea from '@components/TextArea';
import PhoneTextInput from '@components/PhoneTextInput';
import { GetUser, GetLanguage } from '@redux-state/selectors';
import DeliveryCardSelection from './DeliveryCardSelectios';
import OrderSummary from './OrderSummary';

const CheckoutPage = () => {
  const user = GetUser();
  const language = GetLanguage();
  const isRTL = language === 'ar';

  const translations = {
    en: {
      contactNumber: 'Contact Number',
      shippingAddress: 'Shipping Address',
      deliverySchedule: 'Delivery Schedule',
      orderNote: 'Order Note',
      update: 'Update',
      add: 'Add',
    },
    ar: {
      contactNumber: 'رقم الاتصال',
      shippingAddress: 'عنوان الشحن',
      deliverySchedule: 'جدول التسليم',
      orderNote: 'ملاحظات الطلب',
      update: 'تحديث',
      add: 'إضافة',
    },
  };

  const currentTranslations = isRTL ? translations.ar : translations.en;

  const [billingAddress, setBillingAddress] = useState(
    "2231 Kidd Avenue, AK, Kansas, 99614, United States"
  );
  const [shippingAddress, setShippingAddress] = useState(
    "2148 Stratford Park, KY, Winchester, 40391, United States"
  );
  const [orderNote, setOrderNote] = useState("");
  const [phone, setPhone] = useState(user.phone);
  const [selectedOption, setSelectedOption] = useState("Express Delivery");

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
            }}
          >
            <Typography variant="h6">{step}</Typography>
          </Box>
          <Typography marginLeft={2} variant="h6">
            {text}
          </Typography>
        </Box>
        {hasAddButton && <Button
          variant="text"
          sx={{ color: colorPalette.theme }}
          startIcon={!isRTL && <AddIcon sx={{ marginRight: -1, marginLeft: 1 }} />}
          endIcon={isRTL && <AddIcon sx={{ marginLeft: -1, marginRight: 1 }} />}
        >
          <Typography variant="body2" fontWeight={510} sx={{ textTransform: 'none' }}>
            {buttonText}
          </Typography>
        </Button>}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
        background: colorPalette.greyBackground,
        direction: isRTL ? 'rtl' : 'ltr',
      }}
    >
      <Grid container spacing={3} sx={{ maxWidth: '1200px', width: '100%' }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ marginBottom: 3, padding: 2 }}>
            <CardContent>
              <Stepper
                step={1}
                text={currentTranslations.contactNumber}
                buttonText={currentTranslations.update}
              />
              <Box sx={{ marginTop: 5 }}>
                <PhoneTextInput value={phone} onChange={setPhone} />
              </Box>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card sx={{ marginBottom: 3, padding: 2 }}>
            <CardContent>
              <Stepper
                step={2}
                text={currentTranslations.shippingAddress}
                buttonText={currentTranslations.add}
              />
              <TextField
                fullWidth
                multiline
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                variant="outlined"
                rows={4}
                sx={{ marginTop: 1 }}
              />
            </CardContent>
          </Card>

          {/* Delivery Schedule */}
          <Card sx={{ marginBottom: 3, padding: 2 }}>
            <CardContent>
              <Stepper
                step={3}
                text={currentTranslations.deliverySchedule}
                buttonText={currentTranslations.add}
                hasAddButton={false}
              />
              <DeliveryCardSelection
                setSelectedOption={setSelectedOption}
                selectedOption={selectedOption}
                isRTL={isRTL}
              />
            </CardContent>
          </Card>

          {/* Order Note */}
          <Card sx={{ marginBottom: 3, padding: 2 }}>
            <CardContent>
              <Stepper
                step={4}
                text={currentTranslations.orderNote}
                buttonText={currentTranslations.add}
              />
              <MaxHeightTextarea
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                sx={{ marginTop: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Right Side */}
        <OrderSummary isRTL={isRTL} />
      </Grid>
    </Box>
  );
};

export default CheckoutPage;
