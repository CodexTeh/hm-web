import React from "react";
import { Container, Typography, Box, Paper } from "@mui/material";

const ReturnPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Return Policy
        </Typography>

        <Typography variant="body1" sx={{ mt: 2 }}>
          Thank you for shopping at [Your E-Commerce Store Name]. If you are not
          entirely satisfied with your purchase, we're here to help.
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            1. Returns
          </Typography>
          <Typography variant="body1">
            You have **30 calendar days** to return an item from the date you
            received it. To be eligible for a return, the item must be unused
            and in the same condition that you received it. It must also be in
            the original packaging.
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            2. Refunds
          </Typography>
          <Typography variant="body1">
            Once we receive your item, we will inspect it and notify you that we
            have received your returned item. We will immediately notify you of
            the status of your refund after inspecting the item.
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            If your return is approved, we will initiate a refund to your credit
            card (or original method of payment). You will receive the credit
            within a certain number of days, depending on your card issuer's
            policies.
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            3. Shipping
          </Typography>
          <Typography variant="body1">
            You will be responsible for paying for your own shipping costs for
            returning your item. Shipping costs are non-refundable. If you
            receive a refund, the cost of return shipping will be deducted from
            your refund.
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            4. Non-Returnable Items
          </Typography>
          <Typography variant="body1">
            Certain types of items cannot be returned, such as:
            <ul>
              <li>Perishable goods (food, flowers, etc.)</li>
              <li>Personalized items</li>
              <li>Intimate or sanitary goods</li>
              <li>Gift cards</li>
              <li>Health and personal care items</li>
            </ul>
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            5. Exchanges
          </Typography>
          <Typography variant="body1">
            We only replace items if they are defective or damaged. If you need
            to exchange it for the same item, send us an email at support@yourstore.com and
            send your item to our return address.
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            6. Contact Us
          </Typography>
          <Typography variant="body1">
            If you have any questions about our Return Policy, please contact us
            at support@yourstore.com.
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

export default ReturnPolicy;
