import React from 'react';
import { Box } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch } from 'react-redux';
import { GetToastMessage, GetToastType, GetToggleToast } from '@redux-state/common/selectors';
import { toggleToast } from '@redux-state/common/action';
import NotificationCard from '@components/NotificationCard';
import TopBar from './TopBar';
const Layout = () => {

  const dispatch = useDispatch();
  const togleToast = GetToggleToast();
  const toastMessage = GetToastMessage();
  const toastType = GetToastType();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(toggleToast(false, ''));
  };

  return (
    <Box sx={{ position: 'fixed', top: 0, zIndex: 30, width: '100%' }}><TopBar />
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
