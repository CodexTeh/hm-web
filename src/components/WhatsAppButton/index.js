import React from "react";
import { IconButton, Box } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { GetLanguage } from "@redux-state/selectors";
import { colorPalette } from "@utils/colorPalette";

const WhatsAppButton = () => {
  const language = GetLanguage();
  const rtl = language === 'ar';
  const phoneNumber = process.env.REACT_APP_WHATSAPP_NUMBER; // Replace with the desired phone number
  const message = "Hello! I would like to inquire about your services."; // Replace with a default message

  const handleWhatsAppRedirect = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "16px",
        right: !rtl ? "16px" : null,
        left: rtl ? "16px" : null,
        zIndex: 1000,
      }}
    >
      <IconButton
        onClick={handleWhatsAppRedirect}
        sx={{
          backgroundColor: colorPalette.theme, // WhatsApp green color
          color: "#fff",
          "&:hover": { backgroundColor: colorPalette.theme },
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <WhatsAppIcon fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default WhatsAppButton;
