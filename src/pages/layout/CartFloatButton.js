import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import LoginModal from '@components/Modal/LoginModal';
import { GetToken } from '@redux-state/onboarding/selectors';
import { colorPalette } from '@utils/colorPalette';
import CardDrawer from './CartDrawer';
import TopBar from './TopBar';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { StyledCartBoxContainer, StyledCartContainer } from './styles';

export default function CartFloatButton() {

  const fixedCenterLeftPosition = {
    position: 'fixed',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifySelf: 'flex-end',
    display: 'flex',
    bottom: '50%',
    background: colorPalette.greenButton,
    right: 5,
    cursor: 'pointer',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4
  };
  const [open, setOpen] = useState(true);

  const token = GetToken();
  const loading = false;

  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState('');
  const [fileUrl, setFileUrl] = useState();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div onClick={handleDrawerOpen}>
      <Box sx={fixedCenterLeftPosition}
        color="primary" aria-label="add">
        <StyledCartContainer>
          <StyledCartBoxContainer>
            <LocalMallIcon style={{ width: 18, height: 18, color: colorPalette.white }} />
            <Typography sx={{ color: colorPalette.white, marginLeft: 1 }} variant='body2'>0 Item</Typography>
          </StyledCartBoxContainer>
          <Box sx={{ background: colorPalette.white, padding: 1, marginTop: 2, borderRadius: 1 }}>
            <Typography sx={{ color: colorPalette.greenButton }} variant='body2'>$ 0.00</Typography>
          </Box>
        </StyledCartContainer>
        <LoginModal />
      </Box>
    </div>
  );
}
