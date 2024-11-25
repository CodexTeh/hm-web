import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import LoginModal from '@components/Modal/LoginModal';
import { StyledCardBox, StyledCardContainer, StyledDivider, StyledEditBox, StyledMainBox } from './styles';
import SearchIcon from '@mui/icons-material/Search';
import { CardContent, IconButton, Input, InputAdornment, LinearProgress } from '@mui/material';
import { ArrowLeft, Tune } from '@mui/icons-material';
import Drawer from '@mui/material/Drawer';
import { GetToken } from '@redux-state/onboarding/selectors';
import { colorPalette } from '@utils/colorPalette';



const drawerWidth = 370;

export default function CardDrawer() {
  const [open, setOpen] = useState(false);

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
    <>
      {
        loading &&
        <LinearProgress color="primary" />
      }
      <IconButton
        sx={{
          position: 'fixed',
          bottom: '50%',
          left: 5,
          cursor: 'pointer',
          zIndex: 20
        }}
        onClick={handleDrawerOpen}
      >
      </IconButton>
      {open && <IconButton
        sx={{
          position: 'fixed',
          bottom: '50%',
          right: '50%',
          left: 5,
          cursor: 'pointer',
        }}
        onClick={handleDrawerClose}
      >
        <ArrowLeft color={colorPalette.black} />
      </IconButton>}
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
        // variant="persistent"
        anchor="right"
        open={open}
      >
        
        <StyledMainBox>
          <Input
            placeholder='Search Stamp'
            sx={{ background: 'white', width: '100%', padding: 1, borderRadius: 2 }}
            onChange={(e) => setSearchText(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="start">
                <Tune />
              </InputAdornment>
            }
          />
          {loading &&
            <LinearProgress color="primary" />
          }
        </StyledMainBox>
      </Drawer>
      <LoginModal />
    </>
  );
}
