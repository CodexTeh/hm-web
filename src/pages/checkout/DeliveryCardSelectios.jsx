import React, { useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { colorPalette } from 'utils/colorPalette';

const deliveryOptions = [
  {
    title: "Express Delivery",
    description: "90 min express delivery",
  },
  {
    title: "Morning",
    description: "8.00 AM - 11.00 AM",
  },
  {
    title: "Noon",
    description: "11.00 AM - 2.00 PM",
  },
  {
    title: "Afternoon",
    description: "2.00 PM - 5.00 PM",
  },
  {
    title: "Evening",
    description: "5.00 PM - 8.00 PM",
  },
];

const DeliveryCardSelection = ({ selectedDeliveryOption, setSelectedDeliveryOption, isRTL }) => {
  const handleCardClick = (title) => {
    setSelectedDeliveryOption(title);
  };

  return (
    <Grid container spacing={2}>
      {deliveryOptions.map((option) => (
        <Grid item xs={12} sm={6} md={4} key={option.title}>
          <Card
            onClick={() => handleCardClick(option.title)}
            sx={{
              cursor: "pointer",
              border: selectedDeliveryOption === option.title ? `1px solid ${colorPalette.theme}` : null,
              backgroundColor: "#f9f9f9",
            }}
          >
            <CardContent>
              <Typography
                variant="body1"
                component="div"
                sx={{ fontWeight: "bold", color: "#333" }}
              >
                {option.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "#555", marginTop: 1 }}>
                {option.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default DeliveryCardSelection;
