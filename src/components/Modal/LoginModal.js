import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { signIn } from '@redux-state/actions';
import { GetToken, GetUserLoginLoader } from '@redux-state/onboarding/selectors';
import ModalView from './index';

const StyledMainBox = styled(Box)({
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
  display: 'flex',
  flexDirection: 'column',
  height: 'auto',
  padding: '20px',
  paddingLeft: '62.5px',
  paddingTop: '40px',
  width: '610px'
});

const StyledHeaderTypography = styled(Typography)({
  color: '#333!important',
  fontSize: '23px!important',
  fontWeight: '600!important',
  paddingBottom: '0px',
  textAlign: 'center',
  width: '489px'
});


const StyledDescriptionTypography = styled(Typography)({
  color: '#333!important',
  fontSize: '14px!important',
  fontWeight: '700!important',
  paddingBottom: '3px',
  width: '50 %',
  marginTop: 5,
});

const StyledDescriptionFieldText = styled(TextField)({
  borderRadius: '8px',
  marginTop: 5,
  width: '489px'
});

const StyledFooterBox = styled(Box)({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  marginTop: '15px',
  width: '490px'
});

const StyledLoginButton = styled(Button)({
  backgroundColor: '#E4CCFF!important',
  borderRadius: '30px!important',
  color: '#632DDD!important',
  fontSize: '14px!important',
  fontWeight: 'bold',
  height: '45px',
  marginRight: '8px',
  width: '140px'
});

const LoginModal = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const token = GetToken();
  const loading = GetUserLoginLoader();

  const dispatch = useDispatch();

  const login = () => {
    dispatch(signIn(email, password))
  }

  useEffect(() => {
    if (token) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [token])


  const EditModalView = () => {
    return (
      <StyledMainBox>
        <StyledHeaderTypography>
          Login
        </StyledHeaderTypography>
        <StyledDescriptionTypography>Email:</StyledDescriptionTypography>
        <StyledDescriptionFieldText
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></StyledDescriptionFieldText>
        <StyledDescriptionTypography>Password:</StyledDescriptionTypography>
        <StyledDescriptionFieldText
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></StyledDescriptionFieldText>
        <StyledFooterBox>
          <StyledLoginButton
            onClick={login}
          >{loading ? <CircularProgress size={30} color="inherit" /> : 'Login'}</StyledLoginButton>
        </StyledFooterBox>
      </StyledMainBox>
    )
  }

  return (
    <ModalView
      content={EditModalView} open={!isLogin}
      close={isLogin}
    />
  );
};

export default LoginModal;
