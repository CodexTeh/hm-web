import React, { useEffect } from 'react';
import { Container, Typography, Grid, Paper, Box, LinearProgress } from '@mui/material';
import { GetProfile, GetProfileLoading } from "@redux-state/selectors";
import { getProfile } from "@redux-state/actions";
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import OrderList from '../orders';

const UserProfile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const profile = GetProfile();
  const profileLoading = GetProfileLoading();

  useEffect(() => {
    if (userId) {
      dispatch(getProfile(userId))
    }
  }, [userId])

  return (
    <>
      {profile ?
        <>
          <Container sx={{ marginTop: 20 }}>
            {profileLoading && <LinearProgress value={10} />}
            <Typography variant="h4" textAlign='center' marginBottom={10}>
              User Profile
            </Typography>
            <Grid container spacing={2}>
              {/* Username */}
              <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6">Username:</Typography>
                  <Typography variant="body1">{profile?.username}</Typography>
                </Box>
              </Grid>

              {/* Email */}
              <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6">Email:</Typography>
                  <Typography variant="body1">{profile?.email}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6">Contact #:</Typography>
                  <Typography variant="body1">{profile?.phone}</Typography>
                </Box>
              </Grid>

              {/* Address */}
              <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6">Address:</Typography>
                  <Typography variant="body1">{profile?.location}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Container>
          <OrderList />
        </>
        :
        <Typography variant="h4" textAlign='center' marginBottom={10}>
          Page Not Found
        </Typography>
      }
    </>

  );
};

export default UserProfile;
