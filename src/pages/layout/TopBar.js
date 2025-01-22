import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import { alpha, styled, Switch } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import logo from '@assets/icons/logo.png';
import SearchBar from '@components/SearchBar';
import { changeLanguage } from '@redux-state/common/action';
import { GetLanguage } from '@redux-state/common/selectors';
import { colorPalette } from '@utils/colorPalette';

const pages = {
  en: ['Offers', 'Contact'],
  ar: ['عروض', 'اتصل']
};
const settings = {
  en: ['Profile', 'Account', 'Dashboard', 'Logout'],
  ar: ['الملف الشخصي', 'الحساب', 'لوحة القيادة', 'تسجيل الخروج']
};

const GreenSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: colorPalette.theme,
    '&:hover': {
      backgroundColor: alpha(colorPalette.theme, theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: colorPalette.theme,
  },
}));

const TopBar = ({ hasScrolled }) => {
  const dispatch = useDispatch();
  const language = GetLanguage();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const CachedGreenSwitch = React.useCallback(() => {
    return (
      <GreenSwitch
        checked={language === 'ar'}
        onChange={() => {
          const lang = language === 'ar' ? 'en' : 'ar';
          dispatch(changeLanguage(lang));
        }}
      />
    );
  }, [language, dispatch]);

  // Set theme for RTL
  const theme = createTheme({
    direction: language === 'ar' ? 'rtl' : 'ltr',
  });

  React.useEffect(() => {
    document.body.dir = language === 'ar' ? 'rtl' : 'ltr'; // Set the body direction
  }, [language]);

  return (
    <ThemeProvider theme={theme}>
      <AppBar sx={{
        background: colorPalette.white, height: 75
      }} position="static">
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              flexDirection: language === 'ar' ? 'row-reverse' : 'row',
            }}
            disableGutters
          >
            <Box sx={{ display: 'flex', alignItems: 'start', position: 'absolute', left: 0, bottom: -60 }}>
              <img src={logo} alt="logo" style={{ width: 200, height: 160, marginRight: language === 'ar' ? 0 : 5, marginLeft: language === 'ar' ? 5 : 0 }} />
            </Box>
            {hasScrolled && <Box sx={{
              background: hasScrolled ? 'rgba(255, 255, 255, 0.4)' : '',
              position: 'absolute',
              width: '100%',
              height: '100%',
              zIndex: 10,
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <SearchBar />
              </Box>
            </Box>}
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              {pages[language].map((page, index) => (
                <Button
                  key={index}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: colorPalette.black, display: 'block', mx: 1 }}
                >
                  {page}
                </Button>
              ))}
              <Button
                onClick={handleCloseNavMenu}
                variant="contained"
                sx={{ my: 2, background: colorPalette.theme, mx: 1 }}
              >
                {language === 'ar' ? 'انضم' : 'Join'}
              </Button>
              <Tooltip title={language === 'ar' ? 'افتح الإعدادات' : 'Open settings'}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CachedGreenSwitch />
                <Typography sx={{ textAlign: 'center', color: colorPalette.black, mx: 1 }}>
                  {language === 'ar' ? 'العربية' : 'Arabic'}
                </Typography>
              </Box>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: language === 'ar' ? 'left' : 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: language === 'ar' ? 'left' : 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings[language].map((setting, index) => (
                  <MenuItem key={index} onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default TopBar;
