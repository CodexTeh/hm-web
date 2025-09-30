import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch } from 'react-redux';
import { GetUser, GetToken, GetToastMessage, GetToastType, GetToggleToast } from '@redux-state/selectors';
import { toggleToast } from '@redux-state/actions';
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


  const [hasScrolled, setHasScrolled] = useState(false);
  const [stopScroll, setStopScroll] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);

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
    if (!stopScroll) {
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [hasScrolled, stopScroll]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(toggleToast(false, ''));
  };

  const onCLoseLoginModal = () => {
    setLoginModal(false)
  }
  const onCLoseRegisterModal = () => {
    setRegisterModal(false)
  }
  useEffect(() => {
    if (!token) {
      setLoginModal(true)
      onCLoseRegisterModal();
    } else {
      onCLoseLoginModal();
      setRegisterModal(true)
    }
  }, [token])

  return (
    <Box sx={{ position: 'fixed', top: 0, zIndex: 30, width: '100%' }}>
      {/* <TopBar hasScrolled={hasScrolled} setHasScrolled={setHasScrolled} stopScroll={stopScroll} setStopScroll={setStopScroll}/> */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={togleToast}
        autoHideDuration={6000}
        onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={toastType}
          sx={{
            width: 350,
          }}
          variant="filled"
        >
          {toastMessage}
        </Alert>
      </Snackbar>
      {!user &&
        <>
          {loginModal && <LoginModal open={loginModal} handleClose={onCLoseLoginModal} setRegisterModal={setRegisterModal} />}
          {registerModal && <RegisterModal setLoginModal={setLoginModal} open={registerModal} handleClose={onCLoseRegisterModal} />}
        </>
      }
    </Box>
  );
};

export default Layout;
