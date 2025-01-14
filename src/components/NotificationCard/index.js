import React from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const NotificationCard = ({ message, onClose }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
        borderRadius: 2,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e0e0e0',
        width: '100%',
        maxWidth: '400px',
        margin: '16px auto',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '0 !important',
        }}
      >
        <Typography variant="body1">
          {message}
        </Typography>
      </CardContent>
      <IconButton
        onClick={onClose}
        sx={{ marginLeft: '8px', padding: '4px' }}
      >
        <CloseIcon />
      </IconButton>
    </Card>
  );
};

export default NotificationCard;
