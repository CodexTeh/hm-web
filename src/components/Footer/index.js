import React, { useCallback, useEffect, useMemo, useState } from "react";
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
// keep qrcode import but don't render it until after mount
import { QRCodeCanvas } from "qrcode.react";

const Footer = () => {
  // minimal synchronous work on render
  const language = GetLanguage();
  const rtl = language === "ar";

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const iosLink = useMemo(() => "https://apps.apple.com/app/hm-awani/id6752559648", []);
  const androidLink = useMemo(() => "https://hmawani.com/contact-us", []);
  // const androidLink = useMemo(() => "https://play.google.com/store/apps/details?id=com.workvize.bloomfieldmtn&hl=en", []);

  // Defer heavy QR rendering until after mount to avoid blocking first paint
  const [showQR, setShowQR] = useState(false);
  useEffect(() => {
    // allow first paint; then render QR codes
    const id = window.setTimeout(() => setShowQR(true), 100); // small delay
    return () => window.clearTimeout(id);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // small memoized QR size
  const qrSize = useMemo(() => (isMobile ? 50 : 88), [isMobile]);

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
        <Grid item xs={12} sm={6} md={3}>
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
              <Apple fontSize="small" />
              <Box component="a" href={iosLink} target="_blank" rel="noopener noreferrer" sx={{ display: "inline-flex", p: 1, mt: 1, bgcolor: "#1f1f1f", borderRadius: 1.5 }}>
                {showQR ? (
                  <QRCodeCanvas value={iosLink} size={qrSize} bgColor="#1f1f1f" fgColor="#ffffff" />
                ) : (
                  // light placeholder avoids heavy canvas at first paint
                  <Box sx={{ width: qrSize, height: qrSize, bgcolor: "#111", borderRadius: 0.5 }} />
                )}
              </Box>
            </Box>

            {/* Android Card */}
            <Box sx={{ bgcolor: "#2b2b2b", borderRadius: 2, p: 1, display: "flex", alignItems: "center", flexDirection: 'column', textAlign: 'center' }}>
              <Android fontSize="small" />
              <Box component="a" href={androidLink} target="_blank" rel="noopener noreferrer" sx={{ display: "inline-flex", p: 1, mt: 1, bgcolor: "#1f1f1f", borderRadius: 1.5 }}>
                {showQR ? (
                  <QRCodeCanvas value={androidLink} size={qrSize} bgColor="#1f1f1f" fgColor="#ffffff" />
                ) : (
                  <Box sx={{ width: qrSize, height: qrSize, bgcolor: "#111", borderRadius: 0.5 }} />
                )}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Social Icons */}
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: { xs: 2, sm: 3 }, mt: { xs: 3, sm: 4 } }}>
        <IconButton
          component="a"
          href={process.env.REACT_APP_HM_FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: "#fff", "&:hover": { backgroundColor: "#444" }, fontSize: 30 }}
          aria-label="Open Facebook"
        >
          <Facebook fontSize="inherit" />
        </IconButton>

        <IconButton
          component="a"
          href={process.env.REACT_APP_HM_INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: "#fff", "&:hover": { backgroundColor: "#444" } }}
          aria-label="Open Instagram"
        >
          <img
            style={{ width: 30, height: 30 }}
            src="https://img.icons8.com/?size=80&id=ZRiAFreol5mE&format=png"
            alt="instagram"
            loading="lazy"
            decoding="async"
          />
        </IconButton>

        <IconButton
          component="a"
          href={process.env.REACT_APP_HM_TIKTOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: "#fff", "&:hover": { backgroundColor: "#444" } }}
          aria-label="Open TikTok"
        >
          <img
            style={{ width: 30, height: 30 }}
            src="https://img.icons8.com/?size=48&id=118640&format=png"
            alt="tiktok"
            loading="lazy"
            decoding="async"
          />
        </IconButton>

        <IconButton
          component="a"
          href={process.env.REACT_APP_HM_SNAPCHAT_URL}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: "#fff", "&:hover": { backgroundColor: "#444" } }}
          aria-label="Open SnapChat"
        >
          <img
            style={{ width: 30, height: 30 }}
            src="https://app.snapchat.com/web/deeplink/snapcode?username=hmawaniwebstore&type=SVG&bitmoji=enable"
            alt="snapchat"
            loading="lazy"
            decoding="async"
          />
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
          {rtl ? "© 2025 HM AWANI مؤسسة حسين بن علوي مقيبل للتجارة" : "© 2025 HUSSAIN BIN ALAWI MOQAIBAL TRAD. EST."}
        </Typography>
      </Box>
    </Box>
  );
};

export default React.memo(Footer);
