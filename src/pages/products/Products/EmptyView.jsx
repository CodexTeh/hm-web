import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import emptyIcon from 'assets/icons/empty.png';
import { GetProductsLoading } from 'redux-state/common/selectors';

const EmptyView = ({ isRTL }) => {
  const productLoading = GetProductsLoading();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        justifySelf: 'center',
        width: '100%',
        height: { xs: 280, sm: 350, md: 380 }, // Responsive height, tweak as needed
        minHeight: 220,
        textAlign: isRTL ? 'right' : 'center',
        px: { xs: 2, sm: 0 }, // Padding on mobile to avoid text clipping
      }}
    >
      {/* Show Loader if products are loading */}
      {productLoading ? (
        <CircularProgress
          sx={{
            color: 'primary.main', // You can customize the color
            size: { xs: 50, sm: 60 }, // Responsive loader size
            mb: { xs: 2, sm: 3 }, // Margin for spacing
          }}
        />
      ) : (
        <>
          <Box
            component="img"
            src={emptyIcon}
            alt="empty"
            loading="lazy"
            sx={{
              width: { xs: 95, sm: 120, md: 150 },   // Responsive image size
              height: 'auto',
              maxHeight: { xs: 110, sm: 130, md: 170 },
              mb: { xs: 1.5, sm: 2 },
              transform: isRTL ? 'scaleX(-1)' : 'none'
            }}
          />
          <Typography
            sx={{
              color: 'gray',
              mt: { xs: 1.2, sm: 2 },
              fontSize: { xs: 16, sm: 19, md: 21 },
              fontWeight: 520,
              lineHeight: 1.3,
              maxWidth: 340,
            }}
            variant="h6"
          >
            {isRTL ? 'عذراً، لم يتم العثور على منتج :(' : 'Sorry, No Product Found :('}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default EmptyView;
