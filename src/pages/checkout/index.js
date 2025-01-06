import React, { useState } from 'react';
import { Box, Typography, Button, Grid, TextField, Divider, Paper, Card, CardContent } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { colorPalette } from '@utils/colorPalette';
import MaxHeightTextarea from '@components/TextArea';
import PhoneTextInput from '@components/PhoneTextInput';

const CheckoutPage = () => {
  const [billingAddress, setBillingAddress] = useState("2231 Kidd Avenue, AK, Kansas, 99614, United States");
  const [shippingAddress, setShippingAddress] = useState("2148 Stratford Park, KY, Winchester, 40391, United States");
  const [orderNote, setOrderNote] = useState("");
  const [phone, setPhone] = useState("");

  const Stepper = ({ step, text, buttonText }) => {

    return (
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Box sx={{ borderRadius: 20, background: colorPalette.greenButton, width: 30, height: 30, textAlign: 'center', justifyContent: 'center', color: colorPalette.white }}>
            <Typography variant="h6">{step}</Typography>
          </Box>
          <Typography marginLeft={2} variant="h6">{text}</Typography>
        </Box>
        <Button variant="text" sx={{ color: colorPalette.greenButton }} startIcon={<AddIcon sx={{ marginRight: -1 }} />}>
          <Typography variant="body2" fontWeight={510} sx={{ textTransform: 'none' }}>{buttonText}</Typography>
        </Button>
      </Box>
    )
  }


  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 15, background: colorPalette.greyBackground }}>
      <Grid container spacing={3} sx={{ maxWidth: '1200px', width: '100%' }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ marginBottom: 3 }}>
            <CardContent>
              <Stepper step={1} text='Contact Number' buttonText='Update' />
              <Box sx={{ marginTop: 5 }}>
                <PhoneTextInput value={phone} onChange={setPhone} />
              </Box>
            </CardContent>
          </Card>

          {/* Billing Address */}
          <Card sx={{ marginBottom: 3 }}>
            <CardContent>
              <Stepper step={1} text='Shipping Address' buttonText='Add' />
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card sx={{ marginBottom: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">3. Shipping Address</Typography>
              <TextField
                fullWidth
                multiline
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                variant="outlined"
                rows={4}
                sx={{ marginTop: 1 }}
              />
              <Button variant="outlined" sx={{ marginTop: 2 }} startIcon={<AddIcon />}>
                Add
              </Button>
            </CardContent>
          </Card>

          {/* Delivery Schedule */}
          <Card sx={{ marginBottom: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">4. Delivery Schedule</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: 1 }}>
                <Button variant="outlined" sx={{ marginRight: 1, marginBottom: 1 }}>
                  Express Delivery
                </Button>
                <Button variant="outlined" sx={{ marginRight: 1, marginBottom: 1 }}>
                  Morning 8:00 AM - 11:00 AM
                </Button>
                <Button variant="outlined" sx={{ marginRight: 1, marginBottom: 1 }}>
                  Noon 11:00 AM - 2:00 PM
                </Button>
                <Button variant="outlined" sx={{ marginRight: 1, marginBottom: 1 }}>
                  Afternoon 2:00 PM - 5:00 PM
                </Button>
                <Button variant="outlined" sx={{ marginRight: 1, marginBottom: 1 }}>
                  Evening 5:00 PM - 8:00 PM
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Order Note */}
          <Card sx={{ marginBottom: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">5. Order Note</Typography>
              <MaxHeightTextarea
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                sx={{ marginTop: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Right Side */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2, height: '100%' }}>
            <Typography variant="h6" fontWeight="bold">Your Order</Typography>
            <Divider sx={{ margin: '16px 0' }} />
            <Box>
              <Typography>3 x Crawford Shortie | 50lb - $15.00</Typography>
              <Typography>3 x Hill Mini Pack Mix | 10pcs - $22.50</Typography>
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="body2">Sub Total: $37.50</Typography>
              <Typography variant="body2">Tax: Calculated at checkout</Typography>
              <Typography variant="body2">Estimated Shipping: Calculated at checkout</Typography>
            </Box>
            <Box sx={{ marginTop: 3 }}>
              <Button variant="contained" fullWidth>
                Check Availability
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckoutPage;
