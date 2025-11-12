import React from 'react';
import { Card, CardContent, Typography, IconButton, Box, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const NotificationCard = ({ message, onClose, type = 'info', open = true }) => {
  // Define background colors for different message types
  const bgColor = {
    success: '#e6f7e6', // Light green
    error: '#fdecea', // Light red
    warning: '#fff4e5', // Light orange
    info: '#e3f2fd', // Light blue
  }[type] || '#e3f2fd';

  return (
    <Slide direction="down" in={open} mountOnEnter unmountOnExit>
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 2,
          borderRadius: 2,
          boxShadow: 3,
          border: '1px solid #ddd',
          // backgroundColor: bgColor,
          maxWidth: 400,
          margin: '16px auto',
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 0,
            flexGrow: 1,
          }}
        >
          <Typography variant="body2" sx={{ color: 'text.primary' }}>
            {message}
          </Typography>
        </CardContent>
        <IconButton
          onClick={onClose}
          sx={{
            marginLeft: '8px',
            padding: '4px',
            color: 'text.secondary',
            '&:hover': { color: 'red' }, // Change color on hover
          }}
          aria-label="Close notification"
        >
          <CloseIcon />
        </IconButton>
      </Card>
    </Slide>
  );
};

export default NotificationCard;
