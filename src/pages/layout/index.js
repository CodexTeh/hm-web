import React from 'react';
import TopBar from './TopBar';
import { Box } from '@mui/material';

const Layout = () => {
  return (
    <Box sx={{ position: 'fixed', top: 0, zIndex: 30, width: '100%' }}><TopBar /></Box>
  );
};

export default Layout;