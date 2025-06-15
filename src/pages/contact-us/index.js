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

// Your location data remains unchanged
const locations = [
  {
    id: 1,
    name_en: "Taimoor shop saada",
    name_ar: "متجر تيمور الصدة",
    lat: 17.046705,
    lng: 54.169690
  },
  {
    id: 2,
    name_en: "China village shop",
    name_ar: "متجر قرية الصين",
    lat: 17.021632,
    lng: 54.064655
  },
  {
    id: 3,
    name_en: "Sharqia shop",
    name_ar: "متجر الشرقية",
    lat: 17.014324,
    lng: 54.103949
  },
  {
    id: 4,
    name_en: "Gharbia shop near Majid isa",
    name_ar: "متجر الغربية بالقرب من مسجد عيسى",
    lat: 17.005715,
    lng: 54.063577
  }
];

const customIcon = new L.Icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  shadowSize: [41, 41],
});

const ContactPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const handleLocationChange = (event) => {
    const location = locations.find(loc => loc.id === event.target.value);
    setSelectedLocation(location);
  };

  const language = GetLanguage();
  const rtl = language === 'ar'; // Check if the language is Arabic

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "//embed.typeform.com/next/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // This hook will update the map's center when the selected location changes
  const MapCenterUpdater = ({ lat, lng }) => {
    const map = useMap();
    useEffect(() => {
      map.setView([lat, lng], map.getZoom());  // Update the center and retain zoom level
    }, [lat, lng, map]);

    return null;
  };

  return (
    <Box>
      {/* Banner Section */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 'auto',
          overflow: 'hidden',
          borderRadius: '8px',
          marginTop: 20
        }}
      >
        <img
          src={ContactImage}
          style={{
            borderRadius: '10px',
            width: '70%',  // Adjust the width as needed
            height: 250, // Maintain aspect ratio
            objectFit: 'cover', // Ensure the image covers the area without stretching
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'block',  // Ensures the image is centered
            filter: 'blur(1px)', // Apply blur effect (adjust the value as needed)
            opacity: 0.8, // Make the image slightly transparent
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
            width: '100%', // Ensure text container covers the full width
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 'bold' }}
          >
            Get in Touch
          </Typography>
          <Typography
            variant="body1"
            sx={{ marginTop: 2 }}
          >
            Start the conversation to establish good relationship and business.
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ direction: rtl ? 'rtl' : 'ltr', marginTop: 10 }}>
        <Grid container spacing={4}>
          {/* Contact Info Section */}
          <Grid item xs={12} md={6}>
            <Box sx={{
              backgroundColor: '#f4f4f6',
              borderRadius: 2,
              p: 4,
              textAlign: rtl ? 'right' : 'left',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
              <Typography variant="subtitle2" color="green" gutterBottom>
                {rtl ? 'تواصل معنا' : 'GET IN TOUCH'}
              </Typography>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {rtl ? 'اتصال سلس،' : 'Seamless Communication,'}
              </Typography>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {rtl ? 'أثر عالمي.' : 'Global Impact.'}
              </Typography>

              <Box mt={4}>
                <Box display="flex" alignItems="center" mb={3}>
                  <Box
                    sx={{ backgroundColor: '#6bc065', p: 2, borderRadius: '50%', mr: 2, ml: 2 }}
                  >
                    <span role="img" aria-label="office">📍</span>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {rtl ? 'مكتبي' : 'My Office'}
                    </Typography>
                    <Typography variant="body2">
                      New Industrial workshop area near Ramez hypermarket 211 Salalah
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" alignItems="center" mb={3}>
                  <Box
                    sx={{ backgroundColor: '#6bc065', p: 2, borderRadius: '50%', mr: 2, ml: 2 }}
                  >
                    <span role="img" aria-label="email">📧</span>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {rtl ? 'دعم البريد الإلكتروني' : 'My Email Support'}
                    </Typography>
                    <Box sx={{ cursor: 'pointer' }} onClick={() => window.open('mailto:hamuqaibal@gmail.com')}>
                      <Typography variant="body2">hamuqaibal@gmail.com</Typography>
                    </Box>
                  </Box>
                </Box>

                <Box display="flex" alignItems="center">
                  <Box
                    sx={{ backgroundColor: '#6bc065', p: 2, borderRadius: '50%', mr: 2, ml: 2 }}
                  >
                    <span role="img" aria-label="phone">📞</span>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {rtl ? 'لنأتحدث' : 'Let Me Talk'}
                    </Typography>
                    <Typography variant="body2">{process.env.REACT_APP_WHATSAPP_NUMBER}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Contact Form Section */}
          <Grid item xs={12} md={6}>
            <Box sx={{
              borderRadius: 2,
              textAlign: rtl ? 'right' : 'left',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
              <div data-tf-live="01JXPNAP0ZKP3BM07AW0MFZHAH"></div>
            </Box>
          </Grid>

          {/* Location Selector */}
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <Typography sx={{
                fontSize: '12px ',
                fontWeight: '700',
                paddingBottom: '3px',
                width: '50%',
                marginTop: 5,
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
            <Box mt={2} mb={4} sx={{ height: { xs: '300px', sm: '400px' }, width: '100%' }}>
              <MapContainer
                center={[selectedLocation.lat, selectedLocation.lng]}
                zoom={15}
                style={{ height: '100%', width: '100%', borderRadius: '8px' }}
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
