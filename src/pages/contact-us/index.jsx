import React, { useEffect, useState, useMemo } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Button,
  Alert,
  styled,
} from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import Footer from 'components/Footer';
import WhatsAppButton from 'components/WhatsAppButton';
import ContactImage from 'assets/icons/contact.jpg';
import { GetLanguage } from "redux-state/selectors";
import { colorPalette } from 'utils/colorPalette';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Import Material-UI icons
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import BackButton from 'components/BackButton';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Custom styled component for the outer container
const StyledContactCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper, // White background
  borderRadius: theme.shape.borderRadius * 2, // More rounded corners
  padding: theme.spacing(3),
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)', // Subtle shadow
  border: '1px solid #eee', // Light border
  display: 'flex',
  flexDirection: 'column',
}));

const StyledContactItem = styled(Box)(({ theme }) => {
  const isRtl = theme.direction === 'rtl';
  return {
    display: 'flex',
    flexDirection: isRtl ? 'row-reverse' : 'row',
    justifyContent: isRtl ? 'flex-end' : 'flex-start',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    '&:last-of-type': { marginBottom: 0 },

    '& .MuiSvgIcon-root': {
      marginRight: isRtl ? 0 : theme.spacing(1.5),
      marginLeft: isRtl ? theme.spacing(1.5) : 0,
    },
  };
});


// Locations
const locations = [
  { id: 1, name_en: "Taimoor Road Shop - Saada", name_ar: "محل طريق تيمور - صعدة", lat: 17.046705, lng: 54.169690 },
  { id: 2, name_en: "Chinese Village Shop - Salalah", name_ar: "متجر القرية الصينية - صلالة", lat: 17.021632, lng: 54.064655 },
  { id: 3, name_en: "Al Salam Street Shop - Salalah", name_ar: "محل شارع السلام - صلالة", lat: 17.014324, lng: 54.103949 },
  { id: 4, name_en: "Al Salam Street Shop - Salalah Gharbia", name_ar: "محل شارع السلام - صلالة الغربية", lat: 17.005715, lng: 54.063577 },
];

// Custom map icon
const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: markerShadow,
  shadowSize: [41, 41],
});

// Map center updater for selected location
const MapCenterUpdater = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], map.getZoom());
  }, [lat, lng, map]);
  return null;
};

const ContactPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const language = GetLanguage();
  const rtl = language === 'ar';

  // Form State
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ type: '', message: '' });

  const handleLocationChange = (event) => {
    const location = locations.find(loc => loc.id === event.target.value);
    setSelectedLocation(location);
  };

  // Simple validation
  const validate = useMemo(() => {
    return () => {
      const newErrors = {};
      if (!form.name.trim()) newErrors.name = rtl ? 'الاسم مطلوب' : 'Name is required';
      if (!form.phone.trim()) newErrors.phone = rtl ? 'رقم الهاتف مطلوب' : 'phone is required';
      if (!form.email.trim()) {
        newErrors.email = rtl ? 'البريد الإلكتروني مطلوب' : 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
        newErrors.email = rtl ? 'صيغة البريد الإلكتروني غير صحيحة' : 'Invalid email format';
      }
      if (form.phone && !/^[\d\s+()-]{6,}$/.test(form.phone.trim())) {
        newErrors.phone = rtl ? 'صيغة رقم الهاتف غير صحيحة' : 'Invalid phone format';
      }
      if (!form.subject.trim()) newErrors.subject = rtl ? 'الموضوع مطلوب' : 'Subject is required';
      if (!form.message.trim() || form.message.trim().length < 10) {
        newErrors.message = rtl ? 'يرجى كتابة رسالة لا تقل عن 10 أحرف' : 'Please enter a message of at least 10 characters';
      }
      return newErrors;
    };
  }, [form, rtl]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  // Build Gmail compose URL
  const buildGmailComposeUrl = () => {
    const to = 'support@hmawani.com';
    const su = encodeURIComponent(form.subject.trim());
    // Include useful context in the body
    const selectedShop = rtl ? selectedLocation?.name_ar : selectedLocation?.name_en;
    const bodyLines = [
      rtl ? `الاسم: ${form.name}` : `Name: ${form.name}`,
      rtl ? `البريد: ${form.email}` : `Email: ${form.email}`,
      form.phone ? (rtl ? `الهاتف: ${form.phone}` : `Phone: ${form.phone}`) : '',
      rtl ? `المتجر المختار: ${selectedShop}` : `Selected Shop: ${selectedShop}`,
      '',
      rtl ? 'الرسالة:' : 'Message:',
      form.message,
    ].filter(Boolean);
    const body = encodeURIComponent(bodyLines.join('\n'));

    // Gmail web compose
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${su}&body=${body}`;
  };

  const message = rtl
    ? "مرحبًا، لدي بعض الأسئلة حول منتجاتك وسأكون ممتنًا لمساعدتك."
    : "Hello, I have a few questions about your products and would appreciate your assistance.";

  // Optional: mailto fallback if user wants to use default email client instead of Gmail
  const buildMailtoUrl = () => {
    const to = 'support@hmawani.com';
    const su = encodeURIComponent(form.subject.trim());
    const selectedShop = rtl ? selectedLocation?.name_ar : selectedLocation?.name_en;
    const bodyLines = [
      rtl ? `الاسم: ${form.name}` : `Name: ${form.name}`,
      rtl ? `البريد: ${form.email}` : `Email: ${form.email}`,
      form.phone ? (rtl ? `الهاتف: ${form.phone}` : `Phone: ${form.phone}`) : '',
      rtl ? `المتجر المختار: ${selectedShop}` : `Selected Shop: ${selectedShop}`,
      '',
      rtl ? 'الرسالة:' : 'Message:',
      form.message,
    ].filter(Boolean);
    const body = encodeURIComponent(bodyLines.join('\n'));
    return `mailto:${to}?subject=${su}&body=${body}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlert({ type: '', message: '' });

    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    // Try Gmail compose
    const gmailUrl = buildGmailComposeUrl();
    const win = window.open(gmailUrl, '_blank', 'noopener,noreferrer');

    // If popup blocked or not opened, fallback to mailto
    if (!win) {
      window.location.href = buildMailtoUrl();
    } else {
      setAlert({
        type: 'success',
        message: rtl
          ? 'تم فتح نافذة البريد لإرسال رسالتك.'
          : 'Email compose window opened. You can send your message there.',
      });
    }
  };

  const whatsappNumber = process.env.VITE_WHATSAPP_NUMBER || '+96898890195';
  const emailAddress = 'support@hmawani.com';
  const officeLocation = rtl ? 'المنطقة الصناعية الجديدة بالقرب من مستودع شركة بيبسي صلالة - سلطنة عمان' : 'New Industrial Area Near Pepsi Co. Warehouse Salalah -Sultanate of Oman';

  // Remove Typeform script effect from original code — not needed anymore.

  return (
    <Box>
      {/* Banner Section */}
      <Box
        sx={{
          width: '100%',
          height: { xs: 150, sm: 220, md: 550 },
          overflow: 'hidden',
          mt: { xs: 12, sm: 8, md: 10 },
          mb: { xs: 3, sm: 5, md: 7 },
        }}
      >
        <img
          src={ContactImage}
          alt="Contact"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'fill',
            display: 'block',
          }}
        />
      </Box>
      <BackButton routeToHome={true} />
      <Container maxWidth="lg" sx={{ direction: rtl ? 'rtl' : 'ltr', mb: 4 }}>
        <Grid container spacing={{ xs: 2, md: 4 }}>
          {/* Contact Info Section */}
          <Grid item size={{xs:12, md:6}}>
            <StyledContactCard sx={{ textAlign: rtl ? 'right' : 'left' }}>
              <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom
                sx={{ color: 'text.primary', pb: 2 }}
              >
                {rtl ? 'لنبدأ محادثة' : 'Let\'s start a conversation'}
              </Typography>

              <Box sx={{ mt: 2 }}>
                {/* Office Address */}
                <StyledContactItem>
                  <LocationOnIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                  <Typography variant="body1" sx={{ fontSize: { xs: 14, sm: 16 }, color: 'text.primary', mr: rtl ? 2 : null }}>
                    {officeLocation}
                  </Typography>
                </StyledContactItem>

                {/* Email Support */}
                <StyledContactItem>
                  <MailOutlineIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                  <Box sx={{ mr: rtl ? 2 : null }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                      {rtl ? 'دعم البريد الإلكتروني' : 'Email support'}
                    </Typography>
                    <Box component="a" href={`mailto:${emailAddress}`} target="_blank" rel="noopener noreferrer" sx={{ display: "inline-flex", color: colorPalette.theme }}>
                      {emailAddress}
                    </Box>
                  </Box>
                </StyledContactItem>

                {/* Phone Number */}
                <StyledContactItem>
                  <PhoneOutlinedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                  <Box sx={{ mr: rtl ? 2 : null }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'text.primary', mr: rtl ? 2 : null }}>
                      {rtl ? 'هاتف' : 'Phone'}
                    </Typography>
                    <Box component="a" href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer" sx={{ display: "inline-flex", color: colorPalette.theme }}>
                      {whatsappNumber}
                    </Box>
                  </Box>
                </StyledContactItem>
              </Box>

              {/* Action Buttons */}
              {/* Uncomment the buttons if needed */}
              {/* <Box sx={{ mt: 3, display: 'flex', gap: 1, justifyContent: rtl ? 'flex-start' : 'flex-end' }}>
      <Button
        variant="contained"
        color="primary"
        sx={{
          textTransform: 'none',
          fontWeight: 'bold',
          minWidth: 100,
          bgcolor: 'text.primary',
          color: 'background.paper',
          '&:hover': {
            bgcolor: 'grey.800',
          },
        }}
        onClick={() => window.open(`mailto:${emailAddress}`, '_blank')}
      >
        {rtl ? 'بريد إلكتروني' : 'Email'}
      </Button>
      <Button
        variant="outlined"
        color="inherit"
        startIcon={<WhatsAppIcon fontSize="small" />}
        sx={{
          textTransform: 'none',
          fontWeight: 'bold',
          minWidth: 100,
          borderColor: 'text.primary',
          color: 'text.primary',
          '&:hover': {
            borderColor: 'grey.800',
            color: 'grey.800',
          },
        }}
        onClick={() => window.open(`https://wa.me/${cleanWhatsAppNumber}`, '_blank')}
      >
        {rtl ? 'واتساب' : 'WhatsApp'}
      </Button>
    </Box> */}
            </StyledContactCard>
          </Grid>


          {/* Custom Contact Form Section (replaces Typeform) */}
          <Grid item size={{xs:12, md:6}}>
            <Box sx={{
              borderRadius: 2,
              height: '100%',
              minHeight: 220,
              display: 'flex',
              flexDirection: 'column',
              p: 2,
              backgroundColor: '#ffffff',
              border: '1px solid #eee',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              textAlign: rtl ? 'right' : 'left', // Ensure text alignment for RTL
            }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                {rtl ? 'أرسل لنا رسالة' : 'Send us a Message'}
              </Typography>

              {alert.message && (
                <Alert severity={alert.type} sx={{ mb: 2 }}>
                  {alert.message}
                </Alert>
              )}

              <Box component="form" noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2} direction={rtl ? 'row-reverse' : 'row'}>
                  <Grid item size={{ xs:12, sm:6 }}>
                    <TextField
                      fullWidth
                      label={rtl ? 'الاسم الكامل' : 'Full Name'}
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      size="small"
                      InputProps={{
                        style: { textAlign: rtl ? 'right' : 'left' },
                      }}
                    />
                  </Grid>
                  <Grid item size={{ xs:12, sm:6 }}>
                    <TextField
                      fullWidth
                      label={rtl ? 'البريد الإلكتروني' : 'Email'}
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      size="small"
                      InputProps={{
                        style: { textAlign: rtl ? 'right' : 'left' },
                      }}
                    />
                  </Grid>
                  <Grid item size={{ xs:12, sm:6 }}>
                    <TextField
                      fullWidth
                      label={rtl ? 'رقم الهاتف' : 'Phone'}
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      error={!!errors.phone}
                      helperText={errors.phone}
                      size="small"
                      InputProps={{
                        style: { textAlign: rtl ? 'right' : 'left' },
                      }}
                    />
                  </Grid>
                  <Grid item size={{ xs:12, sm:6 }}>
                    <TextField
                      fullWidth
                      label={rtl ? 'الموضوع' : 'Subject'}
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      error={!!errors.subject}
                      helperText={errors.subject}
                      size="small"
                      InputProps={{
                        style: { textAlign: rtl ? 'right' : 'left' },
                      }}
                    />
                  </Grid>
                  <Grid item size={{xs:12}}>
                    <TextField
                      fullWidth
                      label={rtl ? 'الرسالة' : 'Message'}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      error={!!errors.message}
                      helperText={errors.message}
                      multiline
                      minRows={4}
                      InputProps={{
                        style: { textAlign: rtl ? 'right' : 'left' },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        mt: 1,
                        px: 3,
                        py: 1.1,
                        fontWeight: 600,
                        borderRadius: 2,
                        background: colorPalette.theme,
                        textAlign: rtl ? 'right' : 'left',  // Ensure button text aligns for RTL
                      }}
                    >
                      {rtl ? 'أرسل رسالة' : 'Send Message'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>


          {/* Location Selector */}
          <Grid item size={{xs:12, md:4}}>
            <FormControl fullWidth sx={{ mt: { xs: 2, md: -4 } }}>
              <Typography
                sx={{
                  fontSize: { xs: 13, md: 15 },
                  fontWeight: 700,
                  pb: 1,
                  pt: 1,
                  textAlign: rtl ? 'right' : 'left'
                }}>
                {rtl ? 'موقع المحلات التجارية' : 'Shops Location:'}
              </Typography>
              <Select value={selectedLocation.id} onChange={handleLocationChange}>
                {locations.map(location => (
                  <MenuItem key={location.id} value={location.id}>
                    {rtl ? location.name_ar : location.name_en}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Map Section */}
          <Grid item size={{xs:12}}>
            <Box mt={2} mb={4} sx={{ height: { xs: 230, sm: 320, md: 400 }, width: '100%' }}>
              <MapContainer
                center={[selectedLocation.lat, selectedLocation.lng]}
                zoom={15}
                style={{ height: '100%', width: '100%', borderRadius: 8 }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker icon={customIcon} position={[selectedLocation.lat, selectedLocation.lng]}>
                  <Popup>{rtl ? selectedLocation.name_ar : selectedLocation.name_en}</Popup>
                </Marker>
                <MapCenterUpdater lat={selectedLocation.lat} lng={selectedLocation.lng} />
              </MapContainer>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <WhatsAppButton />
      <Footer />
    </Box>
  );
};

export default ContactPage;
