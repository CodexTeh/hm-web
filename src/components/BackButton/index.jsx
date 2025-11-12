import React from 'react';
import {
  Box,
  Button,
  Typography,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import useRouter from 'helpers/useRouter';
import { colorPalette } from 'utils/colorPalette';
import { GetLanguage } from "redux-state/selectors";
import { useIsSmallScreen } from '../../theme';

const BackButton = ({ routeToHome = false }) => {
  const router = useRouter();
  const language = GetLanguage();
  const isRtl = language === 'ar';
  const isMobile = useIsSmallScreen();

  return (
    <Box sx={{
      alignSelf: 'center',
      width: isMobile ? '100%' : '70%',
      display: 'flex',
      flexDirection: 'row',
      // direction: 'ltr',
      marginBottom: 5,
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    }}>
      <Button
        variant="text"
        sx={{ color: colorPalette.theme, direction: 'ltr' }}
        onClick={() => routeToHome ? router.push('/home') : router.back({ isRender: true })}
        startIcon={!isRtl && <HomeIcon sx={{ marginRight: -1, marginLeft: 1 }} />}
        endIcon={isRtl && <HomeIcon sx={{ marginLeft: -1, marginRight: 1 }} />}
      >
        <Typography variant={isMobile ? "body2" : "body1"} fontWeight={510} marginLeft={1} sx={{ textTransform: 'none', marginRight: isRtl ? 1 : 0 }}>
          {isRtl ? 'العودة إلى المنزل' : 'Back to Home'}
        </Typography>
      </Button>
    </Box>
  );
};

export default BackButton;
