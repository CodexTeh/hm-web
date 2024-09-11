import React from 'react';
import { Edit, Inventory } from '@mui/icons-material';
import { ToolTip } from '../ToolTip';
const rotatedStyle = {
  transform: 'rotate(40deg)' // Rotate the icon by 180 degrees
};

export const GetActions = () => {

  let actions = [];
  actions = [
    {
      class: 'edit',
      component: (
        <ToolTip
          color="disabled"
          Icon={
            <Edit
              color={'primary'}
              style={rotatedStyle}
            />
          }
          title="Edit"
        />
      )
    },
    {
      class: 'Archive',
      component: (
        <ToolTip
          color="primary"
          Icon={<Inventory color="primary" />}
          title="Archive"
        />
      ),
      onClick: () =>
        console.log("Helo")

    }
  ];
  return actions;
};
