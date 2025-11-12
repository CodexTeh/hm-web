import React, { useEffect } from 'react';
import {
  Container, Typography, Grid, Box, LinearProgress, Button
} from '@mui/material';
import { GetProfile, GetProfileLoading } from "redux-state/selectors";
import { getProfile } from "redux-state/actions";
import { GetLanguage } from 'redux-state/common/selectors';

import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import OrderList from '../orders';
import { useIsSmallScreen } from '../../theme';

const translations = {
  profile: {
    en: "User Profile",
    ar: "الملف الشخصي",
  },
  username: {
    en: "Username:",
    ar: "اسم المستخدم:",
  },
  email: {
    en: "Email:",
    ar: "البريد الإلكتروني:",
  },
  contact: {
    en: "Contact:",
    ar: "رقم التواصل:",
  },
  address: {
    en: "Address:",
    ar: "العنوان:",
  },
  notfound: {
    en: "Page Not Found",
    ar: "الصفحة غير موجودة",
  },
  deactivate: {
    en: "Deactivate Account",
    ar: "تعطيل الحساب",
  }
};

const UserProfile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const profile = GetProfile();
  const language = GetLanguage();
  const isRTL = language === 'ar';
  const profileLoading = GetProfileLoading();
  const isMobile = useIsSmallScreen();

  useEffect(() => {
    if (userId) {
      dispatch(getProfile(userId))
    }
  }, [dispatch, userId]);

  return (
    <>
      {profile ?
        <>
          <Container
            maxWidth="md"
            sx={{
              marginTop: { xs: 15, sm: 20, md: 20 },
              direction: isRTL ? 'rtl' : 'ltr',
            }}
          >
            {profileLoading && <LinearProgress value={10} />}

            {/* Title */}
            <Typography
              variant="h4"
              textAlign={isRTL ? 'right' : 'center'}
              mb={{ xs: 4, sm: 6 }}
              sx={{
                fontWeight: 600,
                fontSize: { xs: 22, sm: 30 }
              }}
            >
              {translations.profile[language]}
            </Typography>

            {/* Profile Fields */}
            <Grid container spacing={2}>
              {/* Username */}
              <Grid item xs={12}>
                <Box
                  display="flex"
                  alignItems='center'
                >
                  <Typography variant={isMobile ? "subtitle1" : "h6"} fontWeight={900}>
                    {translations.username[language]}
                  </Typography>
                  <Typography variant="subtitle2" margin={1}>{profile?.username}</Typography>
                </Box>
              </Grid>
              {/* Email */}
              <Grid item xs={12}>
                <Box
                  display="flex"
                  alignItems='center'
                >
                  <Typography variant={isMobile ? "subtitle1" : "h6"} fontWeight={900}>
                    {translations.email[language]}
                  </Typography>
                  <Typography variant="subtitle2" margin={1}>{profile?.email}</Typography>
                </Box>
              </Grid>
              {/* Contact */}
              <Grid item xs={12}>
                <Box
                  display="flex"
                  alignItems='center'
                >
                  <Typography variant={isMobile ? "subtitle1" : "h6"} fontWeight={900}>
                    {translations.contact[language]}
                  </Typography>
                  <Typography variant="subtitle2" margin={1}>{profile?.phone}</Typography>
                </Box>
              </Grid>
              {/* Address */}
              <Grid item xs={12}>
                <Box
                  display="flex"
                  alignItems='center'
                >
                  <Typography variant={isMobile ? "subtitle1" : "h6"} fontWeight={900}>
                    {translations.address[language]}
                  </Typography>
                  <Typography variant="subtitle2" margin={1}>{profile?.location}</Typography>
                </Box>
              </Grid>
            </Grid>
            {/* Deactivate Account Button */}
            <Box mt={5} textAlign={isRTL ? 'right' : 'center'} alignItems='center' justifyContent='center' display='flex'>
              <Button
                variant="contained"
                color="error"
                onClick={() => window.open('https://api.hmawani.com/support')}
                fullWidth={isRTL ? true : false} // full width on Arabic for better usability
                sx={{
                  maxWidth: { xs: '70%', sm: '250px' },
                  fontWeight: 600,
                  fontSize: { xs: 12, sm: 16 },
                }}
              >
                {translations.deactivate[language]}
              </Button>
            </Box>
          </Container>
          <OrderList />
        </>
        :
        <Typography
          variant="h4"
          textAlign={isRTL ? 'right' : 'center'}
          marginBottom={10}
          sx={{
            fontWeight: 600,
            fontSize: { xs: 22, sm: 30 }
          }}
        >
          {translations.notfound[language]}
        </Typography>
      }
    </>
  );
};

export default UserProfile;
