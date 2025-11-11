import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch } from 'react-redux';
import { GetUser, GetToken, GetToastMessage, GetToastType, GetToggleToast, GetRegisterModalState, GetloginModalState } from '@redux-state/selectors';
import { toggleToast, openLoginModal, openRegisterModal } from '@redux-state/actions';
import LoginModal from '@components/Modal/LoginModal';
import RegisterModal from '@components/Modal/RegisterModal';
import TopBar from './TopBar';
const Layout = () => {

  const dispatch = useDispatch();
  const togleToast = GetToggleToast();
  const toastMessage = GetToastMessage();
  const toastType = GetToastType();
  const user = GetUser();
  const token = GetToken();

  const registerModal = GetRegisterModalState();
  const loginModal = GetloginModalState();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(toggleToast(false, ''));
  };

  const onCLoseLoginModal = () => {
    dispatch(openLoginModal(false));
  }
  const onCLoseRegisterModal = () => {
    dispatch(openRegisterModal(false));
  }
  useEffect(() => {
    if (!token) {
      // dispatch(openLoginModal(true));
      onCLoseRegisterModal();
    } else {
      onCLoseLoginModal();
      dispatch(openRegisterModal(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return (
    <Box sx={{ position: 'fixed', top: 0, zIndex: 30, width: '100%' }}>
      <TopBar />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={togleToast}
        autoHideDuration={3000}
        onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={toastType}
          sx={{
            width: 350,
            margin: 2,
            direction: 'ltr'
          }}
          variant="filled"
        >
          {toastMessage}
        </Alert>
      </Snackbar>
      {!user &&
        <>
          {loginModal && <LoginModal open={loginModal} handleClose={onCLoseLoginModal} />}
          {registerModal && <RegisterModal open={registerModal} handleClose={onCLoseRegisterModal} />}
        </>
      }
    </Box>
  );
};

export default Layout;
