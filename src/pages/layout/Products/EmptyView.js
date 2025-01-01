import React from 'react';
import { Box, Typography } from '@mui/material';
import emptyIcon from '@assets/icons/empty.png'

const EmptyView = ({ isRTL }) => {

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      justifySelf: 'center',
      width: '100%',
      height: '100%',
      textAlign: isRTL ? 'right' : 'center' // Apply RTL text alignment if isRTL is true
    }}>
      <img
        src={emptyIcon}
        alt="empty"
        loading="lazy"
        style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} // Optionally flip the icon for RTL
      />
      <Typography
        sx={{ color: 'gray', marginTop: 2 }}
        variant="h6"
        fontWeight={520}
      >
        {isRTL ? 'عذراً، لم يتم العثور على منتج :(' : 'Sorry, No Product Found :('} {/* Arabic text for RTL */}
      </Typography>
    </Box>
  );
}

export default EmptyView;
