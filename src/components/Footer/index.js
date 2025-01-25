import React from "react";
import { Box, Typography, TextField, Button, Grid, Link, IconButton } from "@mui/material";
import { Facebook, Instagram, KeyboardArrowUp, Pinterest, Twitter, YouTube } from "@mui/icons-material";

const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box sx={{ backgroundColor: "#333", color: "#fff", padding: "40px 20px 20px" }}>
      <Grid container spacing={4}>
        {/* Newsletter Section */}
        {/* <Grid item xs={3} sm={3} lg={3} md={3}>
          <Typography variant="body2" fontWeight={510} gutterBottom>
            SUBSCRIBE TO OUR NEWSLETTER
          </Typography>
          <Typography variant="body2" gutterBottom>
            Subscribe to email alerts. We promise not to spam your inbox.
          </Typography>
          <Box sx={{ display: "flex", mt: 2 }}>
            <TextField
              variant="outlined"
              placeholder="Email address"
              size="small"
              sx={{
                backgroundColor: "#fff",
                borderRadius: "4px",
                marginRight: "8px",
                flex: 1,
              }}
            />
            <Button
              variant="contained"
              color="warning"
              sx={{ textTransform: "none" }}
            >
              Subscribe
            </Button>
          </Box>
        </Grid> */}

        {/* About Section */}
        <Grid item xs={3} sm={3} lg={3} md={3}>
          <Typography variant="body2" fontWeight={510} gutterBottom>
            ABOUT HM AWANI
          </Typography>
          <Box>
            <Link href="#" fontSize={12} color="inherit" underline="hover">
              HM AWANI
            </Link>
            <br />
            <Link href="#" fontSize={12} color="inherit" underline="hover">
              Investors
            </Link>
          </Box>
        </Grid>

        {/* Policies Section */}
        <Grid item xs={3} sm={3} lg={3} md={3}>
          <Typography variant="body2" fontWeight={510} gutterBottom>
            OUR POLICIES
          </Typography>
          <Box>
            <Link href="/return-policy" fontSize={12} color="inherit" underline="hover">
              Return Policy
            </Link>
            <br />
            <Link href="/terms" fontSize={12} color="inherit" underline="hover">
              Terms & Conditions
            </Link>
            <br />
            <Link href="/privacy-policy" fontSize={12} color="inherit" underline="hover">
              Privacy Policy
            </Link>
          </Box>
        </Grid>

        {/* Information Section */}
        <Grid item xs={3} sm={3} lg={3} md={3}>
          <Typography variant="body2" fontWeight={510} gutterBottom>
            INFORMATION
          </Typography>
          <Box>
            <Link href="#" fontSize={12} color="inherit" underline="hover">
              E-Recipe Books
            </Link>
            <br />
            <Link href="#" fontSize={12} color="inherit" underline="hover">
              Blogs & Recipes
            </Link>
            <br />
            <Link href="#" fontSize={12} color="inherit" underline="hover">
              All Blogs
            </Link>
          </Box>
        </Grid>

        {/* Need Help Section */}
        <Grid item xs={3} sm={3} lg={3} md={3}>
          <Typography variant="body2" fontWeight={510} gutterBottom>
            NEED HELP?
          </Typography>
          <Box>
            <Link href="#" fontSize={12} color="inherit" underline="hover">
              Track Your Order
            </Link>
            <br />
            <Link href="#" fontSize={12} color="inherit" underline="hover">
              Online Service Request
            </Link>
            <br />
            <Link href="#" fontSize={12} color="inherit" underline="hover">
              Warranty Registration
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
        >
          <Facebook />
        </IconButton>
        <IconButton
          sx={{
            border: "1px solid #fff",
            color: "#fff",
            "&:hover": { backgroundColor: "#444" },
          }}
        >
          <Twitter />
        </IconButton>
        <IconButton
          sx={{
            border: "1px solid #fff",
            color: "#fff",
            "&:hover": { backgroundColor: "#444" },
          }}
        >
          <Instagram />
        </IconButton>
        <IconButton
          sx={{
            border: "1px solid #fff",
            color: "#fff",
            "&:hover": { backgroundColor: "#444" },
          }}
        >
          <Pinterest />
        </IconButton>
        <IconButton
          sx={{
            border: "1px solid #fff",
            color: "#fff",
            "&:hover": { backgroundColor: "#444" },
          }}
        >
          <YouTube />
        </IconButton>
      </Box>

      {/* Move to Top Button */}
      <Box
        sx={{
          position: "fixed",
          bottom: "10px",
          left: "16px",
          zIndex: 1000,
        }}
      >
        <IconButton
          onClick={scrollToTop}
          sx={{
            backgroundColor: "#fff",
            color: "#333",
            borderRadius: "50%",  // Makes the button circular
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",  // Adds shadow effect
            "&:hover": { backgroundColor: "#ddd" },
          }}
        >
          <KeyboardArrowUp />
        </IconButton>
      </Box>

      <Box
        sx={{
          borderTop: "1px solid #444",
          mt: 4,
          pt: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="body2">
          © 2025 HM AWANI Pvt. Ltd
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
