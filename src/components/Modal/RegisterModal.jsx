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
import logo from "assets/icons/logo.jpeg";
import PhoneTextInput from 'components/PhoneTextInput';
import useRouter from 'helpers/useRouter';
import { GetLanguage, GetUserRegisterationLoader, GetRegisterModalState } from "redux-state/selectors";
import { colorPalette } from 'utils/colorPalette';
import { openLoginModal, createAccount } from "redux-state/actions";

const RegisterModal = ({ handleClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [username, setUsername] = useState('');

  const registerModal = GetRegisterModalState();
  const loading = GetUserRegisterationLoader();
  const language = GetLanguage(); // Get the current language (en or ar)
  const isRTL = language === "ar"; // Check if Arabic is enabled

  const router = useRouter();
  const dispatch = useDispatch();

  // Dynamic Text for Arabic/English
  const text = {
    title: isRTL ? "تسجيل حساب جديد" : "Register",
    name: isRTL ? "الاسم" : "Name",
    email: isRTL ? "البريد الإلكتروني" : "Email",
    password: isRTL ? "كلمة المرور" : "Password",
    phone: isRTL ? "رقم الهاتف" : "Phone Number",
    address: isRTL ? "العنوان" : "Address",
    terms: isRTL ? "الشروط" : "terms",
    policy: isRTL ? "السياسة" : "policy",
    register: isRTL ? "تسجيل" : "Register",
    or: isRTL ? "أو" : "Or",
    alreadyAccount: isRTL ? "لديك حساب بالفعل؟" : "Already have an account?",
    login: isRTL ? "تسجيل الدخول" : "Login",
  };

  const openSigninModal = () => {
    dispatch(openLoginModal(true));
    handleClose();
  }

  const signUp = () => {
    if (!email || !password || !phone || !address || !username) {
      alert(!isRTL ? "Please enter all fields" : "الرجاء إدخال كافة الحقول")
    } else if (emailError) {
      alert(!isRTL ? "Please enter a valid email" : "الرجاء إدخال بريد إلكتروني صالح");
    } else {
      dispatch(createAccount(username, email, password, phone, address))
    }
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

  return (
    <Dialog
      open={registerModal}
      maxWidth="xs"
      fullWidth
      scroll="paper"
      onClose={handleClose}
      sx={{
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0,0,0,0.1)", // very light dimming
        },
        "& .MuiDialog-paper": {
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          direction: isRTL ? "rtl" : "ltr",
        },
      }}
    >
      <DialogContent>
        {/* Logo */}
        <Box display="flex" justifyContent="center">
          <img src={logo} alt="HM Logo" style={{
            objectFit: "contain",
            height: "80px",
          }} />
        </Box>

        {/* Terms & Policy Text */}
        <Typography variant="caption" align="center" color="textSecondary" >
          {isRTL ? "بالتسجيل، أنت توافق على" : "By signing up, you agree to our"}{" "}
          <Typography
            component="span"
            onClick={() => router.push(null, "/terms")}
            sx={{ color: colorPalette.theme, fontWeight: "bold", cursor: "pointer" }}
          >
            {text.terms}
          </Typography>{" "}
          &{" "}
          <Typography
            onClick={() => router.push(null, "/return-policy")}
            component="span"
            sx={{ color: colorPalette.theme, fontWeight: "bold", cursor: "pointer" }}
          >
            {text.policy}
          </Typography>
        </Typography>

        {/* Registration Form */}
        <div dir={isRTL ? "rtl" : "ltr"}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              value={username}
              margin="normal"
              onChange={(e) => setUsername(e.target.value)}
              required size="small" label={text.name} variant="outlined" fullWidth />
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
            <PhoneTextInput size="small" value={phone} onChange={setPhone} />

            <TextField
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required size="small" label={text.address} variant="outlined" fullWidth />

            {/* Password Field with Visibility Toggle */}
            <TextField required
              size="small"
              label={text.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              fullWidth
              onClick={signUp}
              sx={{
                backgroundColor: colorPalette.theme,
                color: "white",
                padding: "12px",
                borderRadius: "6px",
                "&:hover": { backgroundColor: colorPalette.theme },
              }}
            >
              {loading ? <CircularProgress size={30} /> : text.register}
            </Button>
          </Box>
        </div>
        {/* Separator */}
        <Box display="flex" alignItems="center" my={1}>
          <Box flex={1} height="1px" bgcolor="lightgray" />
          <Typography variant="body2" mx={1} color="textSecondary">
            {text.or}
          </Typography>
          <Box flex={1} height="1px" bgcolor="lightgray" />
        </Box>

        {/* Login Redirect */}
        <Typography variant="body2" align="center">
          {text.alreadyAccount}{" "}
          <Typography
            component="span"
            sx={{ color: colorPalette.theme, fontWeight: "bold", cursor: "pointer" }}
            onClick={openSigninModal}
          >
            {text.login}
          </Typography>
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
