import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  FormControl,
  MenuItem,
  Select,
} from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import Footer from '@components/Footer';
import WhatsAppButton from '@components/WhatsAppButton';
import ContactImage from '@assets/icons/contact.jpg';
import { GetLanguage } from "@redux-state/selectors";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Locations
const locations = [
  { id: 1, name_en: "Taimoor shop saada", name_ar: "متجر تيمور الصدة", lat: 17.046705, lng: 54.169690 },
  { id: 2, name_en: "China village shop", name_ar: "متجر قرية الصين", lat: 17.021632, lng: 54.064655 },
  { id: 3, name_en: "Sharqia shop", name_ar: "متجر الشرقية", lat: 17.014324, lng: 54.103949 },
  { id: 4, name_en: "Gharbia shop near Majid isa", name_ar: "متجر الغربية بالقرب من مسجد عيسى", lat: 17.005715, lng: 54.063577 },
];

// Custom map icon
const customIcon = new L.Icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
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

  const handleLocationChange = (event) => {
    const location = locations.find(loc => loc.id === event.target.value);
    setSelectedLocation(location);
  };

  // For embedded form
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "//embed.typeform.com/next/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  return (
    <Box>
      {/* Banner Section */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: 150, sm: 220, md: 300 },
          overflow: 'hidden',
          borderRadius: 2,
          mt: { xs: 12, sm: 8, md: 15 },
          mb: { xs: 3, sm: 5, md: 7 },
        }}
      >
        <img
          src={ContactImage}
          alt="Contact"
          style={{
            borderRadius: 12,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            filter: 'blur(1px)',
            opacity: 0.8,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'white',
            zIndex: 10,
            width: '100%',
            px: { xs: 2, sm: 0 },
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: 18, sm: 26, md: 32 },
              letterSpacing: 1,
            }}
          >
            {rtl ? 'تواصل معنا' : 'Get in Touch'}
          </Typography>
          <Typography
            variant="body2"
            sx={{ mt: 1, fontSize: { xs: 12, sm: 16 } }}
          >
            {rtl
              ? "ابدأ المحادثة لبناء علاقة وعمل جيد."
              : "Start the conversation to establish good relationship and business."
            }
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ direction: rtl ? 'rtl' : 'ltr', mb: 4 }}>
        <Grid container spacing={{ xs: 2, md: 4 }}>
          {/* Contact Info Section */}
          <Grid item xs={12} md={6}>
            <Box sx={{
              backgroundColor: '#f4f4f6',
              borderRadius: 2,
              p: { xs: 2, sm: 4 },
              textAlign: rtl ? 'right' : 'left',
              height: '100%',
              minHeight: 220,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <Typography variant="subtitle2" color="green" gutterBottom sx={{ fontSize: { xs: 14, sm: 16 } }}>
                {rtl ? 'تواصل معنا' : 'GET IN TOUCH'}
              </Typography>
              <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: 20, sm: 27 } }}>
                {rtl ? 'اتصال سلس،' : 'Seamless Communication,'}
              </Typography>
              <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: 20, sm: 27 } }}>
                {rtl ? 'أثر عالمي.' : 'Global Impact.'}
              </Typography>

              <Box mt={3}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Box sx={{
                    backgroundColor: '#6bc065',
                    p: { xs: 1.2, sm: 2 },
                    borderRadius: '50%',
                    mr: 2, ml: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <span role="img" aria-label="office" style={{ fontSize: 20 }}>📍</span>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ fontSize: { xs: 13, sm: 15 } }}>
                      {rtl ? 'مكتبي' : 'My Office'}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: { xs: 12, sm: 14 } }}>
                      New Industrial workshop area near Ramez hypermarket 211 Salalah
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" mb={2}>
                  <Box sx={{
                    backgroundColor: '#6bc065',
                    p: { xs: 1.2, sm: 2 },
                    borderRadius: '50%',
                    mr: 2, ml: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <span role="img" aria-label="email" style={{ fontSize: 20 }}>📧</span>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ fontSize: { xs: 13, sm: 15 } }}>
                      {rtl ? 'دعم البريد الإلكتروني' : 'My Email Support'}
                    </Typography>
                    <Box sx={{ cursor: 'pointer' }} onClick={() => window.open(`mailto:${process.env.REACT_APP_EMAIL_ADDRESS}`, '_blank')}>
                      <Typography variant="body2" sx={{ fontSize: { xs: 12, sm: 14 } }}>
                        {process.env.REACT_APP_EMAIL_ADDRESS}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center">
                  <Box sx={{
                    backgroundColor: '#6bc065',
                    p: { xs: 1.2, sm: 2 },
                    borderRadius: '50%',
                    mr: 2, ml: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <span role="img" aria-label="phone" style={{ fontSize: 20 }}>📞</span>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ fontSize: { xs: 13, sm: 15 } }}>
                      {rtl ? 'لنأتحدث' : 'Let Me Talk'}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: { xs: 12, sm: 14 } }}>
                      {process.env.REACT_APP_WHATSAPP_NUMBER}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Contact Form Section */}
          <Grid item xs={12} md={6}>
            <Box sx={{
              borderRadius: 2,
              height: '100%',
              p: { xs: 2, sm: 4 },
              textAlign: rtl ? 'right' : 'left',
              minHeight: 220,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <div data-tf-live="01JXPNAP0ZKP3BM07AW0MFZHAH"></div>
            </Box>
          </Grid>

          {/* Location Selector */}
          <Grid item xs={12} md={4}>
            <FormControl fullWidth sx={{ mt: { xs: 2, md: 4 } }}>
              <Typography
                sx={{
                  fontSize: { xs: 13, md: 15 },
                  fontWeight: 700,
                  pb: 1,
                  textAlign: rtl ? 'right' : 'left'
                }}>
                {rtl ? 'حدد موقع المتجر' : 'Select a Shop Location'}
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
          <Grid item xs={12}>
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
