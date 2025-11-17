import React from 'react';
import { useRouteError, useNavigate } from 'react-router';
import {
  Box,
  Typography,
  Button,
  Container,
  Fade,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';
import { GetLanguage } from 'redux-state/selectors';
import { colorPalette } from 'utils/colorPalette';
import useRouter from 'helpers/useRouter';

const ErrorElement = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const router = useRouter();
  const language = GetLanguage();
  const isRTL = language === 'ar';
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Determine error type and messages
  const getErrorInfo = () => {
    const status = error?.status || error?.statusCode || error?.response?.status;
    
    if (status === 404 || error?.statusText === 'Not Found') {
      return {
        code: 404,
        title: isRTL ? 'الصفحة غير موجودة' : 'Page Not Found',
        message: isRTL
          ? 'عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.'
          : "Sorry, the page you're looking for doesn't exist or has been moved.",
        icon: '🔍',
      };
    }
    
    if (status === 500 || status >= 500) {
      return {
        code: 500,
        title: isRTL ? 'خطأ في الخادم' : 'Server Error',
        message: isRTL
          ? 'حدث خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقاً.'
          : 'A server error occurred. Please try again later.',
        icon: '⚠️',
      };
    }
    
    if (status === 403) {
      return {
        code: 403,
        title: isRTL ? 'غير مصرح' : 'Access Denied',
        message: isRTL
          ? 'ليس لديك صلاحية للوصول إلى هذه الصفحة.'
          : "You don't have permission to access this page.",
        icon: '🚫',
      };
    }

    // Generic error
    return {
      code: 'ERROR',
      title: isRTL ? 'حدث خطأ' : 'Something Went Wrong',
      message: isRTL
        ? 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.'
        : 'An unexpected error occurred. Please try again.',
      icon: '😕',
    };
  };

  const errorInfo = getErrorInfo();

  const handleGoHome = () => {
    router.push(null, '/');
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <Fade in={true} timeout={600}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colorPalette.snowWhite,
          py: { xs: 4, sm: 6, md: 8 },
          px: { xs: 2, sm: 3 },
          direction: isRTL ? 'rtl' : 'ltr',
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: { xs: 3, sm: 4 },
            }}
          >
            {/* Error Icon/Emoji with Animation */}
            <Box
              sx={{
                fontSize: { xs: '80px', sm: '120px', md: '150px' },
                lineHeight: 1,
                animation: 'bounce 2s infinite',
                '@keyframes bounce': {
                  '0%, 100%': {
                    transform: 'translateY(0)',
                  },
                  '50%': {
                    transform: 'translateY(-20px)',
                  },
                },
                mb: 2,
              }}
            >
              {errorInfo.icon}
            </Box>

            {/* Error Code */}
            {typeof errorInfo.code === 'number' && (
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '72px', sm: '96px', md: '120px' },
                  fontWeight: 700,
                  background: `linear-gradient(135deg, ${colorPalette.purple} 0%, ${colorPalette.theme} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1,
                  mb: 1,
                }}
              >
                {errorInfo.code}
              </Typography>
            )}

            {/* Error Title */}
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontSize: { xs: '24px', sm: '32px', md: '40px' },
                fontWeight: 600,
                color: colorPalette.darkGrey,
                mb: 1,
              }}
            >
              {errorInfo.title}
            </Typography>

            {/* Error Message */}
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '14px', sm: '16px', md: '18px' },
                color: colorPalette.grey,
                maxWidth: '600px',
                lineHeight: 1.7,
                mb: { xs: 2, sm: 3 },
              }}
            >
              {errorInfo.message}
            </Typography>

            {/* Action Buttons */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                width: '100%',
                maxWidth: '500px',
                mt: 2,
              }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<HomeIcon />}
                onClick={handleGoHome}
                sx={{
                  flex: { xs: 1, sm: 'none' },
                  backgroundColor: colorPalette.theme,
                  color: colorPalette.white,
                  px: 4,
                  py: 1.5,
                  fontSize: { xs: '14px', sm: '16px' },
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: 2,
                  boxShadow: `0 4px 14px 0 ${colorPalette.theme}40`,
                  '&:hover': {
                    backgroundColor: colorPalette.purple,
                    boxShadow: `0 6px 20px 0 ${colorPalette.theme}60`,
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {isRTL ? 'العودة للرئيسية' : 'Go to Home'}
              </Button>

              <Button
                variant="outlined"
                size="large"
                startIcon={!isRTL && <ArrowBackIcon />}
                endIcon={isRTL && <ArrowBackIcon />}
                onClick={handleGoBack}
                sx={{
                  flex: { xs: 1, sm: 'none' },
                  borderColor: colorPalette.theme,
                  color: colorPalette.theme,
                  px: 4,
                  py: 1.5,
                  fontSize: { xs: '14px', sm: '16px' },
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: 2,
                  '&:hover': {
                    borderColor: colorPalette.purple,
                    backgroundColor: `${colorPalette.theme}10`,
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {isRTL ? 'رجوع' : 'Go Back'}
              </Button>

              <Button
                variant="outlined"
                size="large"
                startIcon={<RefreshIcon />}
                onClick={handleRetry}
                sx={{
                  flex: { xs: 1, sm: 'none' },
                  borderColor: colorPalette.grey,
                  color: colorPalette.darkGrey,
                  px: 4,
                  py: 1.5,
                  fontSize: { xs: '14px', sm: '16px' },
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: 2,
                  '&:hover': {
                    borderColor: colorPalette.theme,
                    color: colorPalette.theme,
                    backgroundColor: `${colorPalette.theme}10`,
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {isRTL ? 'إعادة المحاولة' : 'Retry'}
              </Button>
            </Box>

            {/* Optional: Error Details (for development) */}
            {process.env.NODE_ENV === 'development' && error && (
              <Box
                sx={{
                  mt: 4,
                  p: 2,
                  backgroundColor: colorPalette.lightGrey,
                  borderRadius: 2,
                  maxWidth: '100%',
                  overflow: 'auto',
                  textAlign: 'left',
                  direction: 'ltr',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    color: colorPalette.darkGrey,
                    display: 'block',
                    wordBreak: 'break-all',
                  }}
                >
                  {error?.message || error?.toString() || 'Unknown error'}
                </Typography>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </Fade>
  );
};

export default ErrorElement;
