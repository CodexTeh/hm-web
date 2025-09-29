import React from "react";
import { IconButton, Box } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { GetLanguage } from "@redux-state/selectors";
import { colorPalette } from "@utils/colorPalette";

const WhatsAppButton = () => {
  const language = GetLanguage();
  const rtl = language === 'ar';

  // Expecting REACT_APP_WHATSAPP_NUMBER in E.164 format like +96898890195
  const phoneE164 = (process.env.REACT_APP_WHATSAPP_NUMBER || '').trim();
  const phoneForWaMe = phoneE164.replace(/^\+/, ''); // wa.me must NOT include '+'

  const message = rtl
    ? "مرحبًا، لدي بعض الأسئلة حول منتجاتك وسأكون ممتنًا لمساعدتك."
    : "Hello, I have a few questions about your products and would appreciate your assistance.";

  const handleWhatsAppRedirect = () => {
    if (!phoneForWaMe) return;
    const url = `https://wa.me/${phoneForWaMe}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "16px",
        right: !rtl ? "20px" : undefined,
        left: rtl ? "20px" : undefined,
        zIndex: 1000,
      }}
    >
      <IconButton
        onClick={handleWhatsAppRedirect}
        sx={{
          backgroundColor: colorPalette.theme,
          color: "#fff",
          "&:hover": { backgroundColor: colorPalette.theme },
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
        aria-label={rtl ? "التواصل عبر واتساب" : "Chat on WhatsApp"}
      >
        <WhatsAppIcon fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default WhatsAppButton;