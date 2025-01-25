import React from "react";
import { Container, Typography, Box, Paper } from "@mui/material";

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Privacy Policy
        </Typography>

        <Typography variant="body1" sx={{ mt: 2 }}>
          Welcome to [Your E-Commerce Store Name]. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner.
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            1. Information We Collect
          </Typography>
          <Typography variant="body1">
            We may collect personal information, including but not limited to:
            <ul>
              <li>Your name, email address, and contact details.</li>
              <li>Billing and shipping address.</li>
              <li>Payment information.</li>
              <li>Purchase history and preferences.</li>
              <li>IP address, browser type, and browsing behavior.</li>
            </ul>
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            2. How We Use Your Information
          </Typography>
          <Typography variant="body1">
            Your information is used to:
            <ul>
              <li>Process your orders and transactions.</li>
              <li>Provide customer support.</li>
              <li>Send promotional emails and updates.</li>
              <li>Improve our website and services.</li>
              <li>Prevent fraudulent transactions and ensure security.</li>
            </ul>
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            3. Sharing Your Information
          </Typography>
          <Typography variant="body1">
            We do not sell or rent your personal information. However, we may share your data with trusted third-party service providers for purposes such as:
            <ul>
              <li>Payment processing (e.g., PayPal, Stripe).</li>
              <li>Shipping and order fulfillment.</li>
              <li>Marketing and promotional services.</li>
              <li>Legal compliance and fraud prevention.</li>
            </ul>
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            4. Security of Your Information
          </Typography>
          <Typography variant="body1">
            We take reasonable security measures to protect your personal information from unauthorized access, disclosure, or misuse.
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            5. Your Rights
          </Typography>
          <Typography variant="body1">
            You have the right to:
            <ul>
              <li>Access, update, or delete your personal information.</li>
              <li>Opt-out of marketing communications at any time.</li>
              <li>Request information on how your data is being used.</li>
            </ul>
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            6. Cookies and Tracking Technologies
          </Typography>
          <Typography variant="body1">
            We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and personalize content.
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            7. Third-Party Links
          </Typography>
          <Typography variant="body1">
            Our website may contain links to third-party sites. We are not responsible for the privacy practices of these sites.
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            8. Changes to This Privacy Policy
          </Typography>
          <Typography variant="body1">
            We reserve the right to update this policy at any time. Please review it periodically for changes.
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            9. Contact Us
          </Typography>
          <Typography variant="body1">
            If you have any questions about our privacy policy, please contact us at support@yourstore.com.
          </Typography>
        </Box>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} [Your E-Commerce Store Name]. All Rights Reserved.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;
