import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Chip,
  useMediaQuery,
  useTheme,
  Select,
  MenuItem,
  OutlinedInput,
  Button,
} from '@mui/material';
import { colorPalette } from '@utils/colorPalette';
import {
  GetUser,
  GetLanguage,
  GetProfile,
  GetLatestOrder,
  GetOrders,
} from '@redux-state/selectors';
import HomeIcon from '@mui/icons-material/Home';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { getHeaders } from "@components/TableView/getHeaders";
import TableView from "@components/TableView";
import { getOrders, toggleToast, emptyCart } from '@redux-state/actions';
import useRouter from '@helpers/useRouter';
import Barcode from 'react-barcode';
import { useLocation, useParams } from 'react-router-dom';

const statusMapper = {
  'processing': 1,
  'local-facility': 2,
  'out-for-delivery': 3,
  'delivered': 4,
};

const rtlStatusMapper = {
  'processing': 'جارٍ المعالجة',
  'local-facility': 'المرافق المحلية',
  'out-for-delivery': 'خارج للتوصيل',
  'delivered': 'تم التوصيل',
};

const translations = {
  en: {
    backToHome: 'Back to Home',
    orderStatus: 'Order Status',
    paymentStatus: 'Payment Status',
    orderNumber: 'Order Number',
    date: 'Date',
    total: 'Total',
    paymentMethod: 'Payment Method',
    totalAmount: 'Total Amount',
    orderDetails: 'Order Details',
    name: 'Name',
    totalItems: 'Total Items',
    deliveryTime: 'Delivery Time',
    shippingAddress: 'Shipping Address',
    subTotal: 'Sub Total',
    shippingCharge: 'Shipping Charge',
    discount: 'Discount',
    payOnline: 'PAY_ONLINE',
    expressDelivery: 'Express Delivery',
    pending: 'Pending',
    processing: 'Processing',
    atLocalFacility: 'At Local Facility',
    outForDelivery: 'Out For Delivery',
    completed: 'Completed',
  },
  ar: {
    backToHome: 'العودة إلى المنزل',
    orderStatus: 'حالة الطلب',
    paymentStatus: 'حالة الدفع',
    orderNumber: 'رقم الطلب',
    date: 'التاريخ',
    total: 'الإجمالي',
    paymentMethod: 'طريقة الدفع',
    totalAmount: 'المجموع الكلي',
    orderDetails: 'تفاصيل الطلب',
    name: 'الاسم',
    totalItems: 'إجمالي العناصر',
    deliveryTime: 'وقت التسليم',
    shippingAddress: 'عنوان الشحن',
    subTotal: 'الإجمالي الفرعي',
    shippingCharge: 'رسوم الشحن',
    discount: 'خصم',
    payOnline: 'ادفع عبر الإنترنت',
    expressDelivery: 'توصيل سريع',
    pending: 'في الانتظار',
    processing: 'قيد المعالجة',
    atLocalFacility: 'في المنشأة المحلية',
    outForDelivery: 'خرج للتوصيل',
    completed: 'اكتمل',
  },
};

const OrderList = () => {
  const { userId } = useParams();

  const location = useLocation();

  // Extract the query parameter from the URL using URLSearchParams
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('orderId');

  const user = userId ? GetProfile() : GetUser();
  const dispatch = useDispatch();
  const language = GetLanguage();
  const latestOrder = GetLatestOrder();
  const orders = GetOrders();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();

  const [currentOrder, setCurrentOrder] = useState(null);

  const t = translations[language];
  const isRTL = language === 'ar';

  const rows = {
    component: (item) => getCells(item),
    items: currentOrder?.cart?.items?.length > 0 ? currentOrder?.cart.items : [],
  };

  const getCells = useMemo(() => {
    return (item) => {

      const discountValue = item?.flash_sale > 0 ? item?.flash_sale : item?.discount_offer ? item?.discount_offer : 0;

      const getDiscountedPrice = () => {
        const numPrice = Number(item?.price);
        const numDiscount = Number(discountValue);
        const discountedValue = Number(numPrice) - (numPrice * numDiscount) / 100;
        return discountedValue.toFixed(1);
      };

      const hasDiscount = discountValue > 0;

      const finalPrice = hasDiscount ? getDiscountedPrice() : item?.price;
      let formattedImages;
      if (item?.image_urls) {
        try {
          const imageUrls = JSON.parse(item?.image_urls.replace(/'/g, '"'));
          if (Array.isArray(imageUrls) && imageUrls.length > 0) {
            formattedImages = imageUrls.map((imageUrl) => ({
              contentType: 'image/jpeg',
              title: imageUrl?.split('/').pop(),
              url: imageUrl,
              file: null,
            }));
          }
        } catch (e) {
          console.error('Invalid JSON in image_urls:', e);
          formattedImages = [];
        }
      }

      const baseCells = {
        barcode: <Barcode height={20} width={1} fontSize={14} value={item.barcode} />,
        item: (
          <Box sx={{ display: 'flex', flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center' }}>
            <img
              src={formattedImages[0]?.url}
              alt={item.title}
              loading="lazy"
              width={50}
              height={50}
            />
            <Box>
              <Typography marginLeft={2} color="black">
                {(isRTL ? item.arabicName : item.website_name).slice(0, 40)}
              </Typography>
              <Typography marginLeft={2} fontWeight={510} color={colorPalette.theme}>
                {isRTL ? 'ر۔ع' : 'OMR'} {finalPrice}
              </Typography>
            </Box>
          </Box>
        ),
        quantity: <Typography color="black">{item?.quantity}</Typography>,
        price: (
          <Typography color="black">
            {isRTL ? 'ر۔ع' : 'OMR'} {finalPrice} x {item.quantity} = {item.totalPrice}
          </Typography>
        ),
      };

      return baseCells;
    };
  }, [isRTL]);

  useEffect(() => {
    if (orders?.length > 0 && (latestOrder || orderId)) {
      setCurrentOrder(orders.find((item) => item.orderId === (orderId ? orderId : latestOrder)));
    } else if (orders?.length && (!latestOrder || !orderId)) {
      const lastOrder = orders
        .filter((order) => order?.createdAt) // Ensure the `createdAt` field exists
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]; // Sort by createdAt descending
      setCurrentOrder(lastOrder);

    }
  }, [latestOrder, orderId, orders]);

  useEffect(() => {
    dispatch(emptyCart());

    dispatch(getOrders());
  }, [dispatch]);
  useEffect(() => {
    if (orderId && orders?.length > 0) {
      dispatch(
        toggleToast(true, `Thanks for shopping with HM. Order number: ${orderId} You are the next one!`, 'success')
      );
    }

  }, [dispatch, orderId, orders]);

  const steps = useMemo(() => [
    t.pending, t.processing, t.atLocalFacility, t.outForDelivery, t.completed
  ], [t]);

  const infoCards = useMemo(() => ([
    { label: t.orderNumber, value: currentOrder?.orderId || 'N/A' },
    { label: t.date, value: currentOrder?.createdAt ? moment(currentOrder.createdAt).format('MMMM D, YYYY') : 'N/A' },
    { label: t.total, value: `${isRTL ? 'ر۔ع' : 'OMR'} ${currentOrder?.cart?.totalPrice?.toFixed(1) || 0}` },
    { label: t.paymentMethod, value: t.payOnline },
  ]), [currentOrder, isRTL, t]);

  const details = useMemo(() => ([
    { label: t.name, value: user?.username || 'N/A' },
    { label: t.totalItems, value: `${currentOrder?.cart?.items?.length || 0}` },
    // { label: t.deliveryTime, value: t.expressDelivery },
    { label: t.shippingAddress, value: currentOrder?.cart?.orderDetails?.shipping_address || 'N/A' },
    { label: t.totalAmount, value: currentOrder?.cart?.totalPrice?.toFixed(1) || 0 },
  ]), [currentOrder, isRTL, t, user]);

  const pricing = useMemo(() => ([
    { label: t.subTotal, value: currentOrder?.cart?.totalPrice?.toFixed(1) || 0 },
    // { label: t.shippingCharge, value: '50' },
    // { label: t.discount, value: '0' },
    { label: t.totalAmount, value: currentOrder?.cart?.totalPrice?.toFixed(1) || 0 },
  ]), [currentOrder, t]);

  const InputOrderSelectField = useCallback(
    ({ }) => {

      return (
        <Box sx={{ marginTop: 3 }}>
          <Typography fontWeight={510}>{isRTL ? 'طلبات:' : 'Orders:'}</Typography>
          <Select
            sx={{ height: 40, width: 200, background: colorPalette.white }}
            fullWidth
            value={currentOrder?.orderId}
            onChange={(e) => setCurrentOrder(orders.find((item) => item.orderId === e.target.value))}
            label={currentOrder}
            input={<OutlinedInput />}
          >
            {orders?.map((item, itemIndex) => (
              <MenuItem key={itemIndex} value={item.orderId}>
                {item.orderId}
              </MenuItem>))}
          </Select>

        </Box>
      );
    },
    [orders, currentOrder, isRTL, orderId]
  );

  const renderStepper = () => (
    <Box sx={{ mb: 4 }}>
      <Stepper activeStep={statusMapper[currentOrder?.status]} alternativeLabel sx={{ direction: 'ltr' }}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );

  const renderInfoCards = () => (
    <Grid container spacing={3} sx={{ mb: 4, padding: isMobile ? 2 : 3 }} dir={isRTL ? 'rtl' : 'ltr'}>
      {infoCards.map((card, index) => (
        <Grid key={index} item xs={12} sm={6} md={3}>
          <Card variant="outlined" sx={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
            <CardContent>
              <Typography variant="body1" sx={{ color: colorPalette.black }}>
                {card.label}
              </Typography>
              <Typography variant="caption" marginTop={1} color="textSecondary">
                {card.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const renderDetails = (detailsList) => (
    <Box sx={{ maxWidth: '600px' }}>
      <Grid container direction="column" spacing={2}>
        {detailsList.map((detail, index) => (
          <Grid item key={index}>
            <Box sx={{ display: 'flex' }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 'bold',
                  minWidth: '150px',
                  textAlign: isRTL ? 'right' : 'left',
                }}
              >
                {detail.label}:
              </Typography>
              <Typography
                variant="body2"
                sx={{ textAlign: isRTL ? 'right' : 'left', ml: isRTL ? 0 : 1 }}
              >
                {detail.value}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <Box
      sx={{
        background: orders?.items?.length > 0 ? colorPalette.greyBackground : colorPalette.white,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: isMobile ? 3 : 9,
      }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <Box sx={{
        alignSelf: 'center',
        width: isMobile ? '100%' : '70%',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 5,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      }}>
        <Button
          variant="text"
          sx={{ color: colorPalette.theme }}
          onClick={() => router.push('/')}
          startIcon={!isRTL && <HomeIcon sx={{ marginRight: -1, marginLeft: 1 }} />}
          endIcon={isRTL && <HomeIcon sx={{ marginLeft: -1, marginRight: 1 }} />}
        >
          <Typography variant="body1" fontWeight={510} marginLeft={1} sx={{ textTransform: 'none' }}>
            {t.backToHome}
          </Typography>
        </Button>
        {orders?.length > 0 && <InputOrderSelectField />}

      </Box>
      {orders?.length > 0 ?
        <Box
          sx={{
            background: colorPalette.white,
            width: isMobile ? '100%' : '70%',
            alignSelf: 'center',
            border: 0.2,
            borderRadius: 2,
            borderColor: '#e4e7eb',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Order and Payment Status */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : isRTL ? 'row-reverse' : 'row',
              justifyContent: isMobile ? 'center' : 'space-between',
              alignItems: 'center',
              padding: '20px 40px 20px 40px',
              background: colorPalette.greyBackground,
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {t.orderStatus}:
              </Typography>
              <Chip
                label={isRTL ? rtlStatusMapper[currentOrder?.status] : currentOrder?.status}
                sx={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  borderColor: 'transparent',
                  background: colorPalette.coneGreen,
                  color: colorPalette.coneDarkGreen,
                }}
                color="warning"
                variant="outlined"
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {t.paymentStatus}:
              </Typography>
              <Chip
                label={t.payOnline}
                sx={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  borderColor: colorPalette.lightGreen,
                }}
                color="success"
                variant="outlined"
              />
            </Box>
          </Box>

          {/* Order Info */}
          {renderInfoCards()}

          {/* Stepper */}
          {renderStepper()}

          {/* Total Amount and Order Details */}
          <Grid container spacing={3} padding={isMobile ? 2 : 5} dir={isRTL ? 'rtl' : 'ltr'}>
            {/* <Grid item xs={12} sm={6}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                {t.totalAmount}
              </Typography>
              {renderDetails(pricing)}
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                {t.orderDetails}
              </Typography>
              {renderDetails(details)}
            </Grid>
          </Grid>

          <Box padding={5}>
            <TableView
              headers={getHeaders(isRTL ? 'arOrder' : 'Order')}
              page={0}
              rows={rows}
              rowsPerPage={null}
              setPage={null}
              setRowsPerPage={null}
              totalRows={0}
              showPaginations={false}
              type={'orders'}
            />
          </Box>
        </Box> :
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignSelf: 'center' }}>
          <Typography variant="h5" color="textSecondary">
            {isRTL ? "لم يتم العثور على أي طلبات" : "No Orders Found"}
          </Typography>
        </Box>
      }
    </Box>
  );
};

export default OrderList;
