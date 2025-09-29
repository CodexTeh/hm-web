import React from "react";
import {
  Box,
  Typography,
  Grid,
  Link,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { GetLanguage } from "@redux-state/selectors";
import {
  Facebook,
  KeyboardArrowUp,
  Apple,
  Android
} from "@mui/icons-material";
import { QRCodeCanvas } from "qrcode.react";

const Footer = () => {
  const language = GetLanguage();
  const rtl = language === "ar";

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const iosLink = "https://apps.apple.com/app/hm-awani/id6752559648";
  const androidLink =
    "https://play.google.com/store/apps/details?id=com.workvize.bloomfieldmtn&hl=en";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#333",
        color: "#fff",
        pt: { xs: 4, sm: 5 },
        pb: { xs: 2, sm: 4 },
        px: { xs: 2, sm: 6, md: 10 },
        direction: rtl ? "rtl" : "ltr",
      }}
    >
      <Grid
        container
        spacing={3}
        xs={4}
        md={12}
        sx={{
          flexDirection: rtl ? "row-reverse" : "row",
          maxWidth: "100%",
        }}
      >
        {/* About */}
        <Grid item xs={6} sm={6} md={2}>
          <Typography
            variant="body1"
            fontWeight={600}
            gutterBottom
            sx={{ fontSize: { xs: 15, sm: 16 } }}
          >
            {rtl ? "عن HM AWANI" : "ABOUT HM AWANI"}
          </Typography>
          <Typography variant="caption" sx={{ fontSize: { xs: 12, sm: 13 } }}>
            {rtl
              ? "تأسست شركة حسين مقيبل أواني في عام 1984 وهي متخصصة في توفير مستلزمات المطبخ والديكور المنزلي الفاخرة."
              : "Hussain Muqaibal Awani, founded in 1984, is dedicated to providing premium kitchen essentials and home decor."}
          </Typography>
        </Grid>

        {/* Policies */}
        <Grid item xs={6} sm={6} md={2}>
          <Typography
            variant="body1"
            fontWeight={600}
            gutterBottom
            sx={{ fontSize: { xs: 15, sm: 16 } }}
          >
            {rtl ? "سياساتنا" : "OUR POLICIES"}
          </Typography>
          <Box>
            <Link href="/return-policy" fontSize={13} color="inherit" underline="hover" sx={{ display: "block", mb: 0.7 }}>
              {rtl ? "سياسة الإرجاع" : "Return Policy"}
            </Link>
            <Link href="/terms" fontSize={13} color="inherit" underline="hover" sx={{ display: "block", mb: 0.7 }}>
              {rtl ? "الشروط والأحكام" : "Terms & Conditions"}
            </Link>
            <Link href="/privacy-policy" fontSize={13} color="inherit" underline="hover" sx={{ display: "block" }}>
              {rtl ? "سياسة الخصوصية" : "Privacy Policy"}
            </Link>
          </Box>
        </Grid>

        {/* Information */}
        <Grid item xs={6} sm={6} md={2}>
          <Typography
            variant="body1"
            fontWeight={600}
            gutterBottom
            sx={{ fontSize: { xs: 15, sm: 16 } }}
          >
            {rtl ? "المعلومات" : "INFORMATION"}
          </Typography>
          <Box>
            <Link href="/about-us" fontSize={13} color="inherit" underline="hover" sx={{ display: "block", mb: 0.7 }}>
              {rtl ? "معلومات عنا" : "About Us"}
            </Link>
            <Link href="/contact-us" fontSize={13} color="inherit" underline="hover" sx={{ display: "block" }}>
              {rtl ? "اتصل بنا" : "Contact Us"}
            </Link>
          </Box>
        </Grid>

        {/* Help */}
        <Grid item xs={6} sm={6} md={2}>
          <Typography variant="body1" fontWeight={600} gutterBottom sx={{ fontSize: { xs: 15, sm: 16 } }}>
            {rtl ? "تحتاج إلى مساعدة؟" : "NEED HELP?"}
          </Typography>
          <Box>
            <Link href="/orders" fontSize={13} color="inherit" underline="hover" sx={{ display: "block", mb: 0.7 }}>
              {rtl ? "تتبع طلبك" : "Track Your Order"}
            </Link>
            <Link href="/contact-us" fontSize={13} color="inherit" underline="hover" sx={{ display: "block" }}>
              {rtl ? "طلب الخدمة عبر الإنترنت" : "Online Service Request"}
            </Link>
          </Box>
        </Grid>
        {/* App Download Cards */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="body1" fontWeight={600} gutterBottom sx={{ fontSize: { xs: 15, sm: 16 } }}>
            {rtl ? "امسح QR أو اضغط للتنزيل" : "SCAN OR CLICK TO DOWNLOAD APP"}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: 'row',
              gap: 1,
              alignItems: 'center',
            }}
          >
            {/* iOS Card */}
            <Box sx={{ bgcolor: "#2b2b2b", borderRadius: 2, p: 1, display: "flex", alignItems: "center", flexDirection: 'column', textAlign: 'center' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Apple fontSize="small" />
                <Box component="a" href={iosLink} target="_blank" rel="noopener noreferrer" sx={{ display: "inline-flex", p: 1, mt: 1, bgcolor: "#1f1f1f", borderRadius: 1.5 }}>
                  <QRCodeCanvas value={iosLink} size={isMobile ? 50 : 88} bgColor="#1f1f1f" fgColor="#ffffff" />
                </Box>
              </Box>
            </Box>
            {/* iOS Card */}
            <Box sx={{ bgcolor: "#2b2b2b", borderRadius: 2, p: 1, display: "flex", alignItems: "center", flexDirection: 'column', textAlign: 'center' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Android fontSize="small" />
                <Box component="a" href={androidLink} target="_blank" rel="noopener noreferrer" sx={{ display: "inline-flex", p: 1, mt: 1, bgcolor: "#1f1f1f", borderRadius: 1.5 }}>
                  <QRCodeCanvas value={androidLink} size={isMobile ? 50 : 88} bgColor="#1f1f1f" fgColor="#ffffff" />
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Social Icons */}
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: { xs: 2, sm: 3 }, mt: { xs: 3, sm: 4 } }}>
        <IconButton sx={{ color: "#fff", "&:hover": { backgroundColor: "#444" }, fontSize: 30 }} onClick={() => window.open(process.env.REACT_APP_HM_FACEBOOK_URL)} size="large" aria-label="Open Facebook">
          <Facebook fontSize="inherit" color="primary" />
        </IconButton>
        <IconButton sx={{ color: "#fff", "&:hover": { backgroundColor: "#444" } }} onClick={() => window.open(process.env.REACT_APP_HM_INSTAGRAM_URL)} size="large" aria-label="Open Instagram">
          <img style={{ width: 30, height: 30 }} src="https://img.icons8.com/?size=80&id=ZRiAFreol5mE&format=png" alt=""/>
        </IconButton>
        <IconButton sx={{ color: "#fff", "&:hover": { backgroundColor: "#444" } }} onClick={() => window.open(process.env.REACT_APP_HM_TIKTOK_URL)} size="large" aria-label="Open TikTok">
          <img style={{ width: 30, height: 30 }} src="https://img.icons8.com/?size=48&id=118640&format=png" alt=""/>
        </IconButton>
        <IconButton sx={{ color: "#fff", "&:hover": { backgroundColor: "#444" } }} onClick={() => window.open(process.env.REACT_APP_HM_SNAPCHAT_URL)} size="large" aria-label="Open SnapChat">
          <img style={{ width: 30, height: 30 }} src="https://app.snapchat.com/web/deeplink/snapcode?username=hmawaniwebstore&amp;type=SVG&amp;bitmoji=enable" alt=""/>
        </IconButton>
      </Box>

      {/* Back to Top Button */}
      <Box sx={{ position: "fixed", bottom: "12px", [rtl ? "right" : "left"]: "16px", zIndex: 1000 }}>
        <IconButton onClick={scrollToTop} sx={{ backgroundColor: "#fff", color: "#333", borderRadius: "50%", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", "&:hover": { backgroundColor: "#ddd" } }} aria-label={rtl ? "العودة للأعلى" : "Back to top"}>
          <KeyboardArrowUp />
        </IconButton>
      </Box>

      {/* Footer Bottom Bar */}
      <Box sx={{ borderTop: "1px solid #444", mt: { xs: 3, sm: 4 }, pt: 2, textAlign: "center" }}>
        <Typography variant="body2" sx={{ fontSize: { xs: 12, sm: 13 } }}>
          {rtl ? "© 2025 HM AWANI Pvt. Ltd جميع الحقوق محفوظة" : "© 2025 HM AWANI Pvt. Ltd"}
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
