import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import logo from "@assets/icons/logo.png";
import SearchBar from "@components/SearchBar";
import { changeLanguage } from "@redux-state/common/action";
import { GetLanguage } from "@redux-state/common/selectors";
import { colorPalette } from "@utils/colorPalette";

const pages = {
  en: ["Offers", "Contact"],
  ar: ["عروض", "اتصل"],
};
const settings = {
  en: ["Profile", "Account", "Dashboard", "Logout"],
  ar: ["الملف الشخصي", "الحساب", "لوحة القيادة", "تسجيل الخروج"],
};

const TopBar = ({ hasScrolled }) => {
  const dispatch = useDispatch();
  const language = GetLanguage();

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // Open/close user settings menu
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  // Language change handler
  const handleLanguageChange = (event) => {
    const newLang = event.target.value;
    dispatch(changeLanguage(newLang));
  };

  // Set RTL/LTR based on language
  const theme = createTheme({
    direction: language === "ar" ? "rtl" : "ltr",
  });

  React.useEffect(() => {
    document.body.dir = language === "ar" ? "rtl" : "ltr"; // Dynamically set the text direction
  }, [language]);

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        sx={{
          background: colorPalette.white,
          borderBottom: "1px solid rgb(241, 238, 238)",
          boxShadow: hasScrolled ? "0px 4px 10px rgba(0, 0, 0, 0.1)" : "none",
          transition: "box-shadow 0.3s ease",
        }}
        position="static"
      >
        <Container maxWidth="xl">
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
              }}
            >
              <img
                src={logo}
                alt="logo"
                style={{
                  width: 200,
                  height: 150,
                  marginRight: language === "ar" ? 0 : 10,
                  marginLeft: language === "ar" ? 10 : 0,
                }}
              />
            </Box>

            {/* Navigation Links */}
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              {pages[language].map((page, index) => (
                <Button
                  key={index}
                  sx={{
                    my: 2,
                    color: colorPalette.black,
                    mx: 1,
                    fontWeight: 500,
                  }}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="contained"
                sx={{
                  my: 2,
                  mx: 1,
                  background: colorPalette.theme,
                  color: colorPalette.white,
                  "&:hover": {
                    background: colorPalette.themeDark,
                  },
                }}
              >
                {language === "ar" ? "انضم" : "Join"}
              </Button>
            </Box>

            {/* User Settings + Language Switcher */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* Language Selector */}
              <Select
                value={language}
                onChange={handleLanguageChange}
                sx={{
                  mx: 2,
                  background: colorPalette.lightShadow,
                  borderRadius: 2,
                  "& .MuiSelect-select": {
                    padding: "8px 16px",
                  },
                }}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="ar">العربية</MenuItem>
              </Select>

              {/* User Avatar */}
              <Tooltip title={language === "ar" ? "افتح الإعدادات" : "Open settings"}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="User Avatar"
                    src="/static/images/avatar/2.jpg"
                    sx={{ width: 40, height: 40 }}
                  />
                </IconButton>
              </Tooltip>

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
                    <Typography>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>

          {/* SearchBar (Overlay when scrolled) */}
          {hasScrolled && (
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
                <SearchBar />
              </Box>
            </Box>
          )}
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default TopBar;
