import React, { useEffect, useState } from 'react';
import { Box, LinearProgress } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch } from 'react-redux';
import { GetToastMessage, GetToastType, GetToggleToast, GetProductsLoading } from '@redux-state/common/selectors';
import { toggleToast } from '@redux-state/common/action';
import NotificationCard from '@components/NotificationCard';
import TopBar from './TopBar';
const Layout = () => {

  const dispatch = useDispatch();
  const togleToast = GetToggleToast();
  const toastMessage = GetToastMessage();
  const toastType = GetToastType();
  const isFetching = GetProductsLoading();

  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY; // Current scroll position
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight; // Total scrollable height
      const scrolledPercentage = (scrollPosition / totalHeight) * 100;

      if (scrolledPercentage >= 5 && !hasScrolled) {
        setHasScrolled(true);
      } else if (scrolledPercentage < 5 && hasScrolled) {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasScrolled]);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(toggleToast(false, ''));
  };

  return (
    <Box sx={{ position: 'fixed', top: 0, zIndex: 30, width: '100%' }}>
      <TopBar hasScrolled={hasScrolled} />
      {isFetching && <LinearProgress value={10} />}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={togleToast}
        autoHideDuration={6000}
        onClose={handleClose}>
        <Alert
          // onClose={handleClose}
          severity={toastType}
          variant="filled"
        >
          <NotificationCard onClose={handleClose} message={toastMessage} />
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Layout;
