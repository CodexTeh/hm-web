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
import Drawer from "@mui/material/Drawer";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import logo from "@assets/icons/logo.png";
import SearchBar from "@components/SearchBar";
import useRouter from '@helpers/useRouter';
import { useDispatch } from "react-redux";
import { removeToken } from "@helpers/tokenActions";
import { GetLanguage, GetUser } from "@redux-state/selectors";
import { logout, emptyCart, changeLanguage } from "@redux-state/actions";
import { colorPalette } from "@utils/colorPalette";

const TopBar = ({ hasScrolled, setHasScrolled, stopScroll, setStopScroll }) => {
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

  // State for menu/drawer
  const [anchorElUser, setAnchorElUser] = React.useState(null); // User menu
  const [drawerOpen, setDrawerOpen] = React.useState(false); // Mobile nav drawer

  // Responsive
  const themeInstance = useTheme();
  const isMobile = useMediaQuery(themeInstance.breakpoints.down("md"));

  // Dynamic theme direction
  const theme = createTheme({
    direction: language === "ar" ? "rtl" : "ltr",
  });

  React.useEffect(() => {
    document.body.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  // Handlers
  const routeToPath = (path) => router.push(`${path}`);
  const onClickPage = (page) => {
    if (page === pages[language][0]) routeToPath('/home');
    else if (page === pages[language][1]) routeToPath('/offers');
    else if (page === pages[language][2]) routeToPath('/flashSale');
    else if (page === pages[language][3]) routeToPath('/contact-us');
    setDrawerOpen(false); // Always close drawer if on mobile
  };

  const handleLanguageChange = (newLang) => dispatch(changeLanguage(newLang));

  // User Menu
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  // Drawer for mobile nav
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setDrawerOpen(open);
  };

  // Search overlay
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
        <SearchBar setHasScrolled={setHasScrolled} hasScrolled={hasScrolled} stopScroll={stopScroll} setStopScroll={setStopScroll} />
      </Box>
    </Box>
  ), [hasScrolled, setHasScrolled, stopScroll]);

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        elevation={hasScrolled ? 2 : 0}
        sx={{
          background: colorPalette.white,
          transition: "box-shadow 0.3s",
          position: "sticky",
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: 64, md: 80 },
            px: { xs: 1, md: 4 },
            display: "flex",
            flexDirection: language === "ar" ? "row-reverse" : "row",
            justifyContent: "space-between"
          }}
        >
          {/* Left side: Hamburger on mobile, logo always */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isMobile && (
              <IconButton
                edge="end"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                
                sx={{ mr: 0, ml: language === "ar" ? 3 : -1.5 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: 'pointer'
              }}
              onClick={() => routeToPath('/')}
            >
              <img
                src={logo}
                alt="logo"
                style={{
                  width: isMobile ? 140 : 180, // Smaller logo for mobile
                  height: isMobile ? 80 : 70, // Smaller height for mobile
                  marginRight: language === "ar" ? 0 : 10,
                  marginLeft: language === "ar" ? 10 : 0,
                  objectFit: "cover"
                }}
              />
            </Box>
          </Box>

          {/* Middle: Navigation (hidden on mobile) */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {pages[language].map((page, idx) => (
                <Button
                  key={idx}
                  onClick={() => onClickPage(page)}
                  sx={{
                    color: colorPalette.black,
                    fontWeight: 500,
                    fontSize: 14,
                    mx: 0.5,
                    '&:hover': { background: colorPalette.lightGrey }
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          )}

          {/* Right: Search, Language, Avatar */}
          <Box sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.5, sm: 1.5, md: 2 }
          }}>
            {/* Search Icon */}
            <IconButton
              aria-label="search"
              onClick={() => setHasScrolled(true)}
              sx={{ color: colorPalette.black }}
            >
              <SearchIcon />
            </IconButton>

            {/* Language Switcher */}
            <Box sx={{
              display: "flex",
              flexDirection: { xs: "row", md: "row" },
              gap: { xs: 0.5, md: 1 },
              alignItems: "center"
            }}>
              <Button
                size="small"
                onClick={() => handleLanguageChange("en")}
                variant={language === "en" ? "contained" : "outlined"}
                sx={{
                  textTransform: "none",
                  border: `1px solid ${colorPalette.theme}`,
                  backgroundColor: language === "en" ? colorPalette.theme : "transparent",
                  color: language === "en" ? "#fff" : colorPalette.theme,
                  minWidth: 35,
                  width: { xs: 35, md: "auto" },
                }}
              >
                EN
              </Button>
              <Button
                size="small"
                onClick={() => handleLanguageChange("ar")}
                variant={language === "ar" ? "contained" : "outlined"}
                sx={{
                  textTransform: "none",
                  border: `1px solid ${colorPalette.theme}`,
                  backgroundColor: language === "ar" ? colorPalette.theme : "transparent",
                  color: language === "ar" ? "#fff" : colorPalette.theme,
                  minWidth: 30,
                  width: { xs: 35, md: "auto" },
                }}
              >
                عربى
              </Button>
            </Box>

            {/* User Avatar */}
            {user && (
              <Box ml={isMobile ? 0 : 2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title={language === "ar" ? "افتح الإعدادات" : "Open settings"}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      sx={{
                        bgcolor: colorPalette.theme,
                        color: "#fff",
                        width: isMobile ? 40 : 48,
                        height: isMobile ? 40 : 48,
                        fontSize: isMobile ? 18 : 20,
                      }}
                    >
                      {userName}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Box>
        </Toolbar>

        {/* --- Drawer for mobile navigation --- */}
        <Drawer
          anchor={language === "ar" ? "right" : "left"}
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: { width: 220, p: 2, bgcolor: colorPalette.white }
          }}
        >
          <Box
            role="presentation"
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1
            }}
          >
            {pages[language].map((page, idx) => (
              <Button
                key={idx}
                onClick={() => onClickPage(page)}
                sx={{
                  justifyContent: language === "ar" ? "flex-end" : "flex-start",
                  color: colorPalette.black,
                  fontWeight: 500,
                  width: "100%",
                  textAlign: language === "ar" ? "right" : "left"
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Drawer>

        {/* --- User Menu --- */}
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
                if (setting.title === 'Logout' || setting.title === "تسجيل الخروج") {
                  dispatch(logout());
                  dispatch(emptyCart());
                  removeToken();
                } else {
                  routeToPath(setting.path);
                }
              }}>
                <Typography>{setting.title}</Typography>
              </Box>
            </MenuItem>
          ))}
        </Menu>

        {/* --- Search Overlay --- */}
        {hasScrolled && renderSearchOverlay()}
      </AppBar>
    </ThemeProvider>
  );
};

export default TopBar;
