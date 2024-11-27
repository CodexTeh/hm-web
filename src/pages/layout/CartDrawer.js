import { useState } from 'react';
import { useDispatch } from 'react-redux';
import LoginModal from '@components/Modal/LoginModal';
import { StyledMainBox } from './styles';
import { LinearProgress } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { colorPalette } from '@utils/colorPalette';
import { GetLanguage } from '../../redux-state/common/selectors';



const drawerWidth = 370;

export default function CardDrawer({ open, handleDrawerOpen, handleDrawerClose }) {

  const language = GetLanguage();
  const loading = false;

  const dispatch = useDispatch();

  return (
    <>
      {
        loading &&
        <LinearProgress color="primary" />
      }
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: colorPalette.emeraldGreen,
          },
        }}
        anchor={language === 'ar' ? 'left' : 'right'}
        onClose={handleDrawerClose}
        open={open}
      >
        <StyledMainBox>
          {loading &&
            <LinearProgress color="primary" />
          }
        </StyledMainBox>
      </Drawer>
      <LoginModal />
    </>
  );
}
