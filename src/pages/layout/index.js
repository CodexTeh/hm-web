import React, { useEffect, useState } from 'react';
import { Box, LinearProgress } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch } from 'react-redux';
import { GetUser, GetToken, GetToastMessage, GetToastType, GetToggleToast, GetProductsLoading } from '@redux-state/selectors';
import { toggleToast, openLoginModal } from '@redux-state/actions';
import NotificationCard from '@components/NotificationCard';
import LoginModal from '@components/Modal/LoginModal';
import RegisterModal from '@components/Modal/RegisterModal';
import TopBar from './TopBar';
const Layout = () => {

  const dispatch = useDispatch();
  const togleToast = GetToggleToast();
  const toastMessage = GetToastMessage();
  const toastType = GetToastType();
  const isFetching = GetProductsLoading();
  const user = GetUser();
  const token = GetToken();


  const [hasScrolled, setHasScrolled] = useState(false);
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

  useEffect(() => {
    if (!user) {
      dispatch(openLoginModal(true));
    }
  }, [dispatch]);

  return (
    <Box sx={{ position: 'fixed', top: 0, zIndex: 30, width: '100%' }}>
      <TopBar hasScrolled={hasScrolled} setHasScrolled={setHasScrolled} />
      {isFetching && <LinearProgress value={10} />}
      <Snackbar
        sx={{ bottom: 20, right: 20 }}
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
