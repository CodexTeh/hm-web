import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import logo from "@assets/icons/logo.png";
import { GetLanguage, GetUserLoginLoader } from "@redux-state/selectors";
import { signIn } from '@redux-state/actions';
import { colorPalette } from '@utils/colorPalette';

const LoginModal = ({ open, handleClose, setRegisterModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");
  const [password, setPassword] = useState('');

  const loading = GetUserLoginLoader();

  const dispatch = useDispatch();

  const language = GetLanguage(); // Get the current language (en or ar)
  const isRTL = language === "ar"; // Check if Arabic is enabled

  const login = () => {
    if (!email || !password) {
      alert(!isRTL ? "Please enter email and password" : "الرجاء إدخال البريد الإلكتروني وكلمة المرور");
    } else if (emailError) {
      alert(!isRTL ? "Please enter a valid email" : "الرجاء إدخال بريد إلكتروني صالح");
    } else {
      dispatch(signIn(email, password));
    }
  };


  const openRegisterModal = () => {
    setRegisterModal(true);
    handleClose();
  }

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (!validateEmail(newEmail)) {
      setEmailError(true);
      setEmailHelperText(isRTL ? "صيغة البريد الإلكتروني غير صحيحة" : "Invalid email format");
    } else {
      setEmailError(false);
      setEmailHelperText("");
    }
  };

  // Dynamic Text for Arabic/English
  const text = {
    title: isRTL ? "تسجيل الدخول" : "Login",
    email: isRTL ? "البريد الإلكتروني" : "Email",
    password: isRTL ? "كلمة المرور" : "Password",
    forgotPassword: isRTL ? "هل نسيت كلمة المرور؟" : "Forgot password?",
    login: isRTL ? "تسجيل الدخول" : "Login",
    or: isRTL ? "أو" : "Or",
    loginWithGoogle: isRTL ? "تسجيل الدخول باستخدام جوجل" : "Login with Google",
    loginWithMobile: isRTL ? "تسجيل الدخول برقم الهاتف" : "Login with Mobile number",
    noAccount: isRTL ? "ليس لديك حساب؟" : "Don't have an account?",
    register: isRTL ? "تسجيل" : "Register",
  };

  return (
    <Dialog
      open={open}
      maxWidth="xs"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          direction: isRTL ? "rtl" : "ltr",
        },
      }}
    >
      <DialogContent>
        {/* Logo */}
        <Box display="flex" justifyContent="center" mb={2}>
          <img src={logo} alt="HM Logo" width="140" height="140" />
        </Box>

        {/* Login Title */}
        <Typography variant="body1" align="center" color="textSecondary" mb={2}>
          {isRTL ? "قم بتسجيل الدخول باستخدام بريدك الإلكتروني وكلمة المرور" : "Login with your email & password"}
        </Typography>

        {/* Login Form */}
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            size="small"
            value={email}
            required
            onChange={handleEmailChange}
            label={isRTL ? "البريد الإلكتروني" : "Email"}
            type="email"
            variant="outlined"
            fullWidth
            error={emailError}
            helperText={emailHelperText}
            style={{ textAlign: isRTL ? "right" : "left" }}
          />
          {/* Password Field with Visibility Toggle */}
          <TextField
            size="small"
            label={text.password}
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Forgot Password Link */}
          {/* <Typography
            variant="body2"
            align={isRTL ? "left" : "right"}
            sx={{ color: colorPalette.theme, fontWeight: "bold", cursor: "pointer" }}
          >
            {text.forgotPassword}
          </Typography> */}

          {/* Login Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={login}
            sx={{
              backgroundColor: colorPalette.theme,
              color: "white",
              padding: "12px",
              borderRadius: "6px",
              "&:hover": { backgroundColor: colorPalette.theme },
            }}
          >
            {loading ? <CircularProgress size={30} color="inherit" /> : text.login}
          </Button>
        </Box>

        {/* Separator */}
        <Box display="flex" alignItems="center" my={2}>
          <Box flex={1} height="1px" bgcolor="lightgray" />
          <Typography variant="body2" mx={1} color="textSecondary">
            {text.or}
          </Typography>
          <Box flex={1} height="1px" bgcolor="lightgray" />
        </Box>

        {/* Register Section */}
        <Typography variant="body2" align="center" mt={2}>
          {text.noAccount}{" "}
          <Typography
            component="span"
            sx={{ color: colorPalette.theme, fontWeight: "bold", cursor: "pointer" }}
            onClick={openRegisterModal}
          >
            {text.register}
          </Typography>
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
