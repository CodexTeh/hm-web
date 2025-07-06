import React from "react";
import { Box, Typography, Grid, Link, IconButton } from "@mui/material";
import { GetLanguage } from "@redux-state/selectors";
import { Facebook, Instagram, KeyboardArrowUp } from "@mui/icons-material";

const Footer = () => {
  const language = GetLanguage();
  const rtl = language === 'ar';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box
      sx={{
        backgroundColor: "#333",
        color: "#fff",
        pt: { xs: 4, sm: 5 },
        pb: { xs: 2, sm: 4 },
        px: { xs: 2, sm: 6, md: 10 },
        direction: rtl ? "rtl" : "ltr"
      }}
    >
      <Grid
        container
        spacing={{ xs: 2, sm: 3, md: 4 }}
        sx={{
          flexDirection: rtl ? "row-reverse" : "row",
          maxWidth: "100%",
        }}
      >
        {/* About Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="body1" fontWeight={600} gutterBottom sx={{ fontSize: { xs: 15, sm: 16 } }}>
            {rtl ? "عن HM AWANI" : "ABOUT HM AWANI"}
          </Typography>
          <Typography variant="caption" sx={{ fontSize: { xs: 12, sm: 13 } }}>
            {rtl
              ? "تأسست شركة حسين مقيبل أواني في عام 1984 وهي متخصصة في توفير مستلزمات المطبخ والديكور المنزلي الفاخرة. وبفضل شغفنا بالجودة والتصميم، فإننا نصنع منتجات تعزز جمال ووظائف مساحة المعيشة الخاصة بك."
              : "Hussain Muqaibal Awani, founded in 1984, is dedicated to providing premium kitchen essentials and home decor. With a passion for quality and design, we create products that enhance the beauty and functionality of your living space."
            }
          </Typography>
        </Grid>

        {/* Policies Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="body1" fontWeight={600} gutterBottom sx={{ fontSize: { xs: 15, sm: 16 } }}>
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

        {/* Information Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="body1" fontWeight={600} gutterBottom sx={{ fontSize: { xs: 15, sm: 16 } }}>
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

        {/* Need Help Section */}
        <Grid item xs={12} sm={6} md={3}>
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
      </Grid>

      {/* Social Media Icons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: { xs: 2, sm: 3 },
          mt: { xs: 3, sm: 4 },
        }}
      >
        <IconButton
          sx={{
            border: "1px solid #fff",
            color: "#fff",
            "&:hover": { backgroundColor: "#444" },
            fontSize: 22
          }}
          onClick={() => window.open(process.env.REACT_APP_HM_FACEBOOK_URL)}
          size="large"
        >
          <Facebook fontSize="inherit" />
        </IconButton>
        <IconButton
          sx={{
            border: "1px solid #fff",
            color: "#fff",
            "&:hover": { backgroundColor: "#444" },
            fontSize: 22
          }}
          onClick={() => window.open(process.env.REACT_APP_HM_INSTAGRAM_URL)}
          size="large"
        >
          <Instagram fontSize="inherit" />
        </IconButton>
      </Box>

      {/* Move to Top Button */}
      <Box
        sx={{
          position: "fixed",
          bottom: "12px",
          [rtl ? "right" : "left"]: "16px",
          zIndex: 1000,
        }}
      >
        <IconButton
          onClick={scrollToTop}
          sx={{
            backgroundColor: "#fff",
            color: "#333",
            borderRadius: "50%",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            "&:hover": { backgroundColor: "#ddd" },
          }}
        >
          <KeyboardArrowUp />
        </IconButton>
      </Box>

      {/* Copyright */}
      <Box sx={{
        borderTop: "1px solid #444",
        mt: { xs: 3, sm: 4 },
        pt: 2,
        textAlign: "center"
      }}>
        <Typography variant="body2" sx={{ fontSize: { xs: 12, sm: 13 } }}>
          {rtl
            ? "© 2025 HM AWANI Pvt. Ltd جميع الحقوق محفوظة"
            : "© 2025 HM AWANI Pvt. Ltd"
          }
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
