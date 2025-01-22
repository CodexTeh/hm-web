import React from "react";
import { Box, Grid, Typography, Link } from "@mui/material";
import { colorPalette } from "../../utils/colorPalette";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        alignSelf:'center',
        width: '100%',
        marginTop: 2,
        backgroundColor: colorPalette.lightBlack, // Dark background similar to HM AWANI
        color: "#fff", // White text
        padding: "1rem 1.2rem", // Adjust padding for spacing
      }}
    >
      {/* Top Section: Footer Links */}
      <Grid padding={2} container spacing={4} justifyContent="space-between">
        {/* Column 1: Customer Support */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Customer Support
          </Typography>
          <Link href="#" color="inherit" underline="hover">
            Help Center
          </Link>
          <br />
          <Link href="#" color="inherit" underline="hover">
            Contact Us
          </Link>
          <br />
          <Link href="#" color="inherit" underline="hover">
            Returns
          </Link>
          <br />
          <Link href="#" color="inherit" underline="hover">
            Track Order
          </Link>
        </Grid>

        {/* Column 2: Company Info */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Company Info
          </Typography>
          <Link href="#" color="inherit" underline="hover">
            About Us
          </Link>
          <br />
          <Link href="#" color="inherit" underline="hover">
            Careers
          </Link>
          <br />
          <Link href="#" color="inherit" underline="hover">
            Privacy Policy
          </Link>
          <br />
          <Link href="#" color="inherit" underline="hover">
            Terms of Service
          </Link>
        </Grid>

        {/* Column 3: Social Media / App Links */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Stay Connected
          </Typography>
          <Link href="#" color="inherit" underline="hover">
            Facebook
          </Link>
          <br />
          <Link href="#" color="inherit" underline="hover">
            Instagram
          </Link>
          <br />
          <Link href="#" color="inherit" underline="hover">
            Twitter
          </Link>
          <br />
          <Link href="#" color="inherit" underline="hover">
            Download Our App
          </Link>
        </Grid>
      </Grid>

      {/* Bottom Section: Copyright */}
      <Box
        sx={{
          textAlign: "center",
          marginTop: "2rem",
          borderTop: "1px solid rgba(255, 255, 255, 0.2)", // Subtle divider
          paddingTop: "1rem",
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} HM AWANI Clone. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
