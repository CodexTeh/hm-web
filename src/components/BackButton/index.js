import React from 'react';
import {
  Box,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useRouter from '@helpers/useRouter';
import { colorPalette } from '@utils/colorPalette';
import { GetLanguage } from "@redux-state/selectors";

const BackButton = () => {
  const router = useRouter();
  const language = GetLanguage();
  const isRtl = language === 'ar';
  return (
    <Box
      sx={{
        position: 'sticky',
        top: 90,
        zIndex: 1000,
        justifyContent: isRtl ? 'flex-end' : 'flex-start',
      }}
    >
      <IconButton
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          router.back();
        }}
        sx={{
          backgroundColor: colorPalette.theme,
          color: colorPalette.white,
          '&:hover': {
            backgroundColor: colorPalette.themeHover || '#333',
          },
        }}
      >
        {/* Flip icon for RTL */}
        <ArrowBackIcon sx={{ transform: isRtl ? 'rotate(180deg)' : 'none' }} />
      </IconButton>
    </Box >
  );
};

export default BackButton;
