import React, { useEffect } from 'react';
import {
  Container, Typography, Grid, Box, LinearProgress, Button
} from '@mui/material';
import { GetProfile, GetProfileLoading } from "@redux-state/selectors";
import { getProfile } from "@redux-state/actions";
import { GetLanguage } from '@redux-state/common/selectors';

import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import OrderList from '../orders';

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
    en: "Contact #:",
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

  useEffect(() => {
    if (userId) {
      dispatch(getProfile(userId))
    }
  }, [userId]);

  // Handle deactivate click → opens Gmail with pre-filled template
  const handleDeactivate = () => {
    const subject = encodeURIComponent("Request for Account Deletion");
    const body = encodeURIComponent(
      `Hello Support Team,

I would like to request the deletion of my account associated with this email.

Username: ${profile?.username || ""}
Email: ${profile?.email || ""}

Please confirm once the deletion has been completed.

Thank you.`
    );

    // Use %0A for newlines if you prefer strict URL encoding
    window.location.href = `mailto:support@hmawani.com?subject=${subject}&body=${body}`;
  };


  return (
    <>
      {profile ?
        <>
          <Container
            maxWidth="md"
            sx={{
              marginTop: { xs: 20, sm: 20, md: 20 },
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
                  justifyContent="space-between"
                  flexDirection={isRTL ? 'row-reverse' : 'row'}
                >
                  <Typography variant="h6" fontWeight={500}>
                    {translations.username[language]}
                  </Typography>
                  <Typography variant="body1">{profile?.username}</Typography>
                </Box>
              </Grid>
              {/* Email */}
              <Grid item xs={12}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  flexDirection={isRTL ? 'row-reverse' : 'row'}
                >
                  <Typography variant="h6" fontWeight={500}>
                    {translations.email[language]}
                  </Typography>
                  <Typography variant="body1">{profile?.email}</Typography>
                </Box>
              </Grid>
              {/* Contact */}
              <Grid item xs={12}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  flexDirection={isRTL ? 'row-reverse' : 'row'}
                >
                  <Typography variant="h6" fontWeight={500}>
                    {translations.contact[language]}
                  </Typography>
                  <Typography variant="body1">{profile?.phone}</Typography>
                </Box>
              </Grid>
              {/* Address */}
              <Grid item xs={12}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  flexDirection={isRTL ? 'row-reverse' : 'row'}
                >
                  <Typography variant="h6" fontWeight={500}>
                    {translations.address[language]}
                  </Typography>
                  <Typography variant="body1">{profile?.location}</Typography>
                </Box>
              </Grid>
            </Grid>
            {/* Deactivate Account Button */}
            <Box mt={5} textAlign={isRTL ? 'right' : 'center'}>
              <Button
                variant="contained"
                color="error"
                onClick={() => window.open('https://api.hmawani.com/support')}
                fullWidth={isRTL ? true : false} // full width on Arabic for better usability
                sx={{
                  maxWidth: { xs: '100%', sm: '250px' },
                  fontWeight: 600,
                  fontSize: { xs: 14, sm: 16 },
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
