import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from "react-redux";
import logo from "@assets/icons/logo.png";
import SearchBar from "@components/SearchBar";
import useRouter from '@helpers/useRouter';
import { removeToken } from "@helpers/tokenActions";
import { GetLanguage, GetUser } from "@redux-state/selectors";
import { logout, emptyCart, changeLanguage } from "@redux-state/actions";
import { colorPalette } from "@utils/colorPalette";

const TopBar = ({ hasScrolled, setHasScrolled }) => {
  const dispatch = useDispatch();
  const language = GetLanguage();
  const user = GetUser();
  const userName = user ? user.username.substring(0, 2).toUpperCase() : "?";
  const router = useRouter();

  const pages = {
    en: ["Shop", "Offers", "Flash Sale", "Contact Us"],
    ar: ["محل", "العروض", "بيع فلاش", "اتصل بنا"],
  };
  const settings = {
    en: [
      { title: "Profile", path: `/profile/${user?._id}` },
      { title: 'Wishlist', path: '/wishlist' },
      { title: 'My Orders', path: '/orders' },
      { title: "Logout", path: '/' }],
    ar: [
      { title: "الملف الشخصي", path: `/profile/${user?._id}` },
      { title: 'قائمة الرغبات', path: '/wishlist' },
      { title: 'طلباتي', path: '/orders' },
      { title: "تسجيل الخروج", path: '/' }],
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null); // For mobile menu
  const [anchorElUser, setAnchorElUser] = React.useState(null); // For user settings menu

  // Open/close navigation menu
  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  // Open/close user settings menu
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  // Language change handler
  const handleLanguageChange = (newLang) => {
    dispatch(changeLanguage(newLang));
  };

  // Set RTL/LTR based on language
  const theme = createTheme({
    direction: language === "ar" ? "rtl" : "ltr",
  });

  React.useEffect(() => {
    document.body.dir = language === "ar" ? "rtl" : "ltr"; // Dynamically set the text direction
  }, [language]);

  const renderSearchOverlay = React.useCallback(() => (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(10px)",
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <SearchBar setHasScrolled={setHasScrolled} hasScrolled={hasScrolled} />
      </Box>
    </Box>
  ), [hasScrolled, setHasScrolled]);

  const routeToPath = (path) => {
    router.push(`${path}`)
  }

  const onClickPage = (page) => {
    if (page === pages[language][0]) {
      routeToPath('/home')
    } else if (page === pages[language][1]) {
      routeToPath('/offers')
    } else if (page === pages[language][2]) {
      routeToPath('/flashSale')
    } else if (page === pages[language][3]) {
      routeToPath('/contact-us')
    }
  }

  // Check for mobile screens
  const themeInstance = useTheme();
  const isMobile = useMediaQuery(themeInstance.breakpoints.down("md"));

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        sx={{
          background: colorPalette.white,
          boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
          transition: "box-shadow 0.3s ease",
        }}
        position="static"
      >
        <Box sx={{ width: '100%' }}>
          <Toolbar
            sx={{
              height: 80,
              display: "flex",
              justifyContent: "space-between",
              flexDirection: language === "ar" ? "row-reverse" : "row",
            }}
            disableGutters
          >
            {/* Logo */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginLeft: 3,
                marginRight: 3,
                cursor: 'pointer'
              }}
              onClick={() => routeToPath('/')}
            >
              <img
                src={logo}
                alt="logo"
                style={{
                  width: isMobile ? 150 : 180, // Smaller logo for mobile
                  height: isMobile ? 120 : 180, // Smaller height for mobile
                  marginRight: language === "ar" ? 0 : 10,
                  marginLeft: language === "ar" ? 10 : 0,
                }}
              />
            </Box>
            {/* User Settings + Language Switcher */}
            <Box sx={{ display: 'flex', flexDirection: language === "ar" ? "row-reverse" : "row", alignItems: 'center' }}>
              {/* Navigation Links */}
              {!isMobile ? (
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    border: `1px solid ${colorPalette.lightGrey}`,
                    borderRadius: 20,
                    width: 30,
                    height: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }} onClick={() => setHasScrolled(true)}>

                    <SearchIcon
                      style={{
                        color: colorPalette.black,
                        width: 20,
                        height: 20
                      }}
                    />
                  </Box>
                  {pages[language].map((page, index) => (
                    <Button
                      key={index}
                      sx={{
                        my: 2,
                        color: colorPalette.black,
                        mx: 1,
                        fontWeight: 500,
                        fontSize: 13,

                      }}
                      onClick={() => onClickPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                  {/* <Button
                    variant="contained"
                    sx={{
                      my: 2,
                      mx: 1,
                      background: colorPalette.theme,
                      fontSize: 13,
                      color: colorPalette.white,
                      "&:hover": {
                        background: colorPalette.themeDark,
                      },
                    }}
                  >
                    {language === "ar" ? "انضم" : "Join"}
                  </Button> */}
                </Box>
              ) : (
                // Hamburger menu for mobile
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    size="large"
                    aria-label="open navigation menu"
                    onClick={handleOpenNavMenu}
                    color="primary"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                  >
                    {pages[language].map((page, index) => (
                      <MenuItem key={index} onClick={handleCloseNavMenu}>
                        <Typography>{page}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              )}
              <Box sx={{ display: "flex", alignItems: "center", marginX: 3 }}>
                {/* Language Toggle Buttons */}
                <Box sx={{
                  display: "flex", gap: 1, alignItems: "center",


                }}>
                  <Button
                    onClick={() => handleLanguageChange("en")}
                    variant={language === "en" ? "contained" : "outlined"}
                    sx={{
                      textTransform: "none",
                      borderColor: language === "en" ? colorPalette.theme : "transparent",
                      border: `1px solid ${colorPalette.theme}`,
                      backgroundColor: language === "en" ? colorPalette.theme : "transparent",
                      color: language === "en" ? "#fff" : colorPalette.theme,
                      "&:hover": {
                        backgroundColor: language === "en" ? colorPalette.theme : "rgba(25, 118, 210, 0.04)",
                      },
                    }}
                  >
                    EN
                  </Button>

                  <Button
                    onClick={() => handleLanguageChange("ar")}
                    variant={language === "ar" ? "contained" : "outlined"}
                    sx={{
                      textTransform: "none",
                      border: `1px solid ${colorPalette.theme}`,
                      backgroundColor: language === "ar" ? colorPalette.theme : "transparent",
                      color: language === "ar" ? "#fff" : colorPalette.theme,
                      "&:hover": {
                        backgroundColor: language === "ar" ? colorPalette.theme : "rgba(25, 118, 210, 0.04)",
                      },
                    }}
                  >
                    أربي
                  </Button>
                </Box>

                {/* User Menu */}
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: language === "ar" ? "left" : "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: language === "ar" ? "left" : "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings[language].map((setting, index) => (
                    <MenuItem key={index} onClick={handleCloseUserMenu}>
                      <Box onClick={() => {
                        if (setting.title === 'Logout') {
                          dispatch(logout());
                          dispatch(emptyCart());
                          removeToken();
                        } else {
                          routeToPath(setting.path)
                        }
                      }}><Typography>{setting.title}</Typography></Box>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              {user && <Box sx={{ marginRight: 3, marginLeft: 3 }}>
                <Tooltip title={language === "ar" ? "افتح الإعدادات" : "Open settings"}>
                  <IconButton onClick={handleOpenUserMenu} sx={{
                    p: 0,
                  }}>
                    <Avatar
                      sx={{
                        bgcolor: colorPalette.theme, // Customize background color
                        color: "#fff", // Customize text color
                        width: 48, // Set width
                        height: 48, // Set height
                        fontSize: 20, // Set font size
                        fontWeight: "bold",
                      }}
                    >
                      {userName}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </Box>}
            </Box>
          </Toolbar>

          {/* SearchBar (Overlay when scrolled) */}
          {hasScrolled && (
            renderSearchOverlay()
          )}
        </Box>
      </AppBar>
    </ThemeProvider>
  );
};

export default TopBar;
