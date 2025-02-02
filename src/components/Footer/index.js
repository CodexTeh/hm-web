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
        padding: "40px 40px 20px 20px",
        direction: rtl ? "rtl" : "ltr"
      }}
    >
      {/* <Grid container spacing={4} sx={{ flexWrap: "wrap", overflowX: "hidden", flexDirection: rtl ? "row-reverse" : "row" }}> */}
      <Grid container spacing={4} sx={{ flexDirection: rtl ? "row-reverse" : "row", maxWidth: "100%" }}>

        {/* About Section */}
        <Grid item xs={3} sm={3} lg={3} md={3}>
          <Typography variant="body2" fontWeight={510} gutterBottom>
            {rtl ? "عن HM AWANI" : "ABOUT HM AWANI"}
          </Typography>
          <Box>
          <Typography variant="caption" gutterBottom>
            {rtl ? "تأسست شركة حسين مقيبل أواني في عام 1998، وهي متخصصة في توفير مستلزمات المطبخ والديكور المنزلي الفاخرة. وبفضل شغفنا بالجودة والتصميم، فإننا نصنع منتجات تعزز جمال ووظائف مساحة المعيشة الخاصة بك." : "Hussain Muqaibal Awani, founded in 1998, is dedicated to providing premium kitchen essentials and home decor. With a passion for quality and design, we create products that enhance the beauty and functionality of your living space."}
          </Typography>
          </Box>
        </Grid>

        {/* Policies Section */}
        <Grid item xs={3} sm={3} lg={3} md={3}>
          <Typography variant="body2" fontWeight={510} gutterBottom>
            {rtl ? "سياساتنا" : "OUR POLICIES"}
          </Typography>
          <Box>
            <Link href="/return-policy" fontSize={12} color="inherit" underline="hover">
              {rtl ? "سياسة الإرجاع" : "Return Policy"}
            </Link>
            <br />
            <Link href="/terms" fontSize={12} color="inherit" underline="hover">
              {rtl ? "الشروط والأحكام" : "Terms & Conditions"}
            </Link>
            <br />
            <Link href="/privacy-policy" fontSize={12} color="inherit" underline="hover">
              {rtl ? "سياسة الخصوصية" : "Privacy Policy"}
            </Link>
            <br />
            <Link href="/about-us" fontSize={12} color="inherit" underline="hover">
              {rtl ? "معلومات عنا" : "About Us"}
            </Link>
            <br />
            <Box sx={{ cursor: 'pointer' }} onClick={() => window.open('mailto:hamuqaibal@gmail.com')}>

            <Typography href="/privacy-policy" fontSize={12} color="inherit" underline="hover">
              {rtl ? "اتصل بنا" : "Contact Us"}
            </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Information Section */}
        <Grid item xs={3} sm={3} lg={3} md={3}>
          <Typography variant="body2" fontWeight={510} gutterBottom>
            {rtl ? "المعلومات" : "INFORMATION"}
          </Typography>
          <Box>
            <Link href="#" fontSize={12} color="inherit" underline="hover">
              {rtl ? "كتب الطبخ الإلكترونية" : "E-Recipe Books"}
            </Link>
            <br />
            <Link href="#" fontSize={12} color="inherit" underline="hover">
              {rtl ? "المدونات والوصفات" : "Blogs & Recipes"}
            </Link>
            <br />
            <Link href="#" fontSize={12} color="inherit" underline="hover">
              {rtl ? "جميع المدونات" : "All Blogs"}
            </Link>
          </Box>
        </Grid>

        {/* Need Help Section */}
        <Grid item xs={3} sm={3} lg={3} md={3}>
          <Typography variant="body2" fontWeight={510} gutterBottom>
            {rtl ? "تحتاج إلى مساعدة؟" : "NEED HELP?"}
          </Typography>
          <Box>
            <Link href="#" fontSize={12} color="inherit" underline="hover">
              {rtl ? "تتبع طلبك" : "Track Your Order"}
            </Link>
            <br />
            <Link href="#" fontSize={12} color="inherit" underline="hover">
              {rtl ? "طلب الخدمة عبر الإنترنت" : "Online Service Request"}
            </Link>
            <br />
            <Link href="#" fontSize={12} color="inherit" underline="hover">
              {rtl ? "تسجيل الضمان" : "Warranty Registration"}
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
          gap: "16px",
          mt: 4,
        }}
      >
        <IconButton
          sx={{
            border: "1px solid #fff",
            color: "#fff",
            "&:hover": { backgroundColor: "#444" },
          }}
          onClick={() => window.open(process.env.REACT_APP_HM_FACEBOOK_URL)}
        >
          <Facebook />
        </IconButton>
        <IconButton
          sx={{
            border: "1px solid #fff",
            color: "#fff",
            "&:hover": { backgroundColor: "#444" },
          }}
          onClick={() => window.open(process.env.REACT_APP_HM_INSTAGRAM_URL)}
        >
          <Instagram />
        </IconButton>
      </Box>

      {/* Move to Top Button */}
      <Box
        sx={{
          position: "fixed",
          bottom: "10px",
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

      <Box sx={{ borderTop: "1px solid #444", mt: 4, pt: 2, textAlign: "center" }}>
        <Typography variant="body2">
          {rtl ? "© 2025 HM AWANI Pvt. Ltd جميع الحقوق محفوظة" : "© 2025 HM AWANI Pvt. Ltd"}
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
