import React from "react";
import { Container, Typography, Box, Paper } from "@mui/material";

const TermsAndConditions = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Terms and Conditions
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            1. Introduction
          </Typography>
          <Typography variant="body1">
            Welcome to our website. By accessing or using our site, you agree to be bound by the following terms and conditions.
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            2. Use of the Website
          </Typography>
          <Typography variant="body1">
            You agree to use this website in accordance with all applicable laws and regulations. Unauthorized use of this website may give rise to a claim for damages.
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            3. Intellectual Property
          </Typography>
          <Typography variant="body1">
            The content, design, and other materials on this website are owned by us and protected by applicable copyright laws.
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            4. Limitation of Liability
          </Typography>
          <Typography variant="body1">
            We are not responsible for any damages resulting from the use or inability to use this website.
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            5. Changes to Terms
          </Typography>
          <Typography variant="body1">
            We reserve the right to modify these terms at any time. You should check this page periodically for updates.
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            6. Contact Us
          </Typography>
          <Typography variant="body1">
            If you have any questions about these terms, please contact us at support@example.com.
          </Typography>
        </Box>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Your Company. All Rights Reserved.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default TermsAndConditions;
