import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import LoginModal from '@components/Modal/LoginModal';
import { colorPalette } from '@utils/colorPalette';
import { GetLanguage } from '@redux-state/common/selectors';

import LocalMallIcon from '@mui/icons-material/LocalMall';
import { StyledCartBoxContainer, StyledCartContainer } from './styles';

export default function CartFloatButton({ open, handleDrawerOpen, handleDrawerClose }) {
  const fixedCenterLeftPosition = {
    position: 'fixed',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifySelf: 'flex-end',
    display: 'flex',
    bottom: '50%',
    background: colorPalette.greenButton,
    right: 0,
    cursor: 'pointer',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    zIndex: 100
  };

  const fixedCenterRightPosition = {
    ...fixedCenterLeftPosition,
    right: 'auto',
    left: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  };

  const dispatch = useDispatch();
  const language = GetLanguage();

  return (
    <Box
      sx={language === 'ar' ? fixedCenterRightPosition : fixedCenterLeftPosition}
      onClick={handleDrawerOpen}
    >
      <StyledCartContainer>
        <StyledCartBoxContainer>
          <LocalMallIcon style={{ width: 18, height: 18, color: colorPalette.white }} />
          <Typography
            sx={{
              color: colorPalette.white,
              marginLeft: language === 'ar' ? 0 : 1,
              marginRight: language === 'ar' ? 1 : 0,
            }}
            variant="body2"
          >
            {language === 'ar' ? '0 عنصر' : '0 Item'}
          </Typography>
        </StyledCartBoxContainer>
        <Box
          sx={{
            background: colorPalette.white,
            padding: 1,
            marginTop: 2,
            borderRadius: 1,
          }}
        >
          <Typography
            sx={{ color: colorPalette.greenButton }}
            variant="body2"
          >
            {language === 'ar' ? '٠ دولار' : '$ 0.00'}
          </Typography>
        </Box>
      </StyledCartContainer>
      <LoginModal />
    </Box>
  );
}
