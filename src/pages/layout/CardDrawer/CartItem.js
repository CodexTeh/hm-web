import React, { useState } from 'react';
import { Box, Button, Typography, IconButton, Avatar, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ClearIcon from '@mui/icons-material/Clear';
import { colorPalette } from '../../../utils/colorPalette';

const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => setQuantity(Math.max(quantity - 1, 1));

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: `1px solid ${colorPalette.lightGrey}`,
          borderRadius: 10,
          background: colorPalette.lightGrey,
          height: 110,
        }}>
          <IconButton onClick={handleIncrease}>
            <AddIcon sx={{ width: 17, height: 17, color: colorPalette.black }} />
          </IconButton>
          <Typography variant="body1">{quantity}</Typography>
          <IconButton onClick={handleDecrease}>
            <RemoveIcon sx={{ width: 17, height: 17, color: colorPalette.black }} />
          </IconButton>
        </Box>
        <Avatar sx={{ marginLeft: 2, marginRight: 2 }} src={item.image} alt={item.name} />

        <Box sx={{ marginLeft: 2, textAlign: 'start' }}>
          <Typography variant="subtitle1" fontWeight={510}>{item.name}</Typography>
          <Typography variant="body1" sx={{ color: colorPalette.greenButton }} fontWeight={510}>${(item.price * quantity).toFixed(2)}</Typography>
          <Typography variant="body2" color="textSecondary">{item.quantityDetails}</Typography>
        </Box>
      </Box>
      <Box sx={{ textAlign: 'right', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Typography variant="body1" fontWeight={510}>${(item.price * quantity).toFixed(2)}</Typography>
        <IconButton sx={{ marginLeft: 2 }} onClick={() => alert('Item removed')}>
          <ClearIcon sx={{
            width: 15, height: 15, '&:hover': {
              color: colorPalette.red,  // Apply the green color on hover
            },
          }} />
        </IconButton>
      </Box>
    </Box>
  );
};

const Cart = () => {
  const cartItems = [
    {
      name: 'Apples',
      price: 1.6,
      image: 'https://via.placeholder.com/100',
      quantityDetails: '1 X 1lb',
    },
    {
      name: 'Baby Spinach',
      price: 0.6,
      image: 'https://via.placeholder.com/100',
      quantityDetails: '1 X 2Pfund',
    },
    {
      name: 'Brussels Sprout',
      price: 3.0,
      image: 'https://via.placeholder.com/100',
      quantityDetails: '1 X 1lb',
    },
  ];

  return (
    <>
      {cartItems.map((item, index) => (
        <Box sx={{ width: '100%' }}>
          <CartItem key={index} item={item} />
          <Divider sx={{ marginX: -4, marginY: 2 }} />
        </Box>
      ))}
    </>
  );
};

export default Cart;
