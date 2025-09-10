import React, { useEffect } from 'react';
import { Container, Typography, Grid, Box, LinearProgress } from '@mui/material';
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

  return (
    <>
      {profile ?
        <>
          <Container sx={{
            marginTop: { xs: 20, sm: 20, md: 20 },
            direction: isRTL ? 'rtl' : 'ltr'
          }}>
            {profileLoading && <LinearProgress value={10} />}
            <Typography
              variant="h4"
              textAlign={isRTL ? 'right' : 'center'}
              marginBottom={6}
              sx={{
                fontWeight: 600,
                fontSize: { xs: 22, sm: 30 }
              }}
            >
              {translations.profile[language]}
            </Typography>
            <Grid container spacing={2}>
              {/* Username */}
              <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between" flexDirection={isRTL ? 'row-reverse' : 'row'}>
                  <Typography variant="h6" fontWeight={500}>{translations.username[language]}</Typography>
                  <Typography variant="body1">{profile?.username}</Typography>
                </Box>
              </Grid>
              {/* Email */}
              <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between" flexDirection={isRTL ? 'row-reverse' : 'row'}>
                  <Typography variant="h6" fontWeight={500}>{translations.email[language]}</Typography>
                  <Typography variant="body1">{profile?.email}</Typography>
                </Box>
              </Grid>
              {/* Contact */}
              <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between" flexDirection={isRTL ? 'row-reverse' : 'row'}>
                  <Typography variant="h6" fontWeight={500}>{translations.contact[language]}</Typography>
                  <Typography variant="body1">{profile?.phone}</Typography>
                </Box>
              </Grid>
              {/* Address */}
              <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between" flexDirection={isRTL ? 'row-reverse' : 'row'}>
                  <Typography variant="h6" fontWeight={500}>{translations.address[language]}</Typography>
                  <Typography variant="body1">{profile?.location}</Typography>
                </Box>
              </Grid>
            </Grid>
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
