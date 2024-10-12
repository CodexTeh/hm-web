import React from 'react';
import { IconButton, Tooltip } from '@mui/material';

export const ToolTip = ({ color, title, Icon, placement }) => {
  return (
    <Tooltip color={color} title={title} placement={placement}>
      {Icon && <IconButton>{Icon}</IconButton>}
    </Tooltip>
  );
};
