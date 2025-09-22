import React from 'react';
import { Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

const SharePopover = ({
  anchorEl,
  open,
  onClose,
  productLink,
  isRTL
}) => {
  // Build platform share URLs (these are generic web share endpoints)
  const encoded = encodeURIComponent(productLink);
  const waLink = `https://wa.me/?text=${encoded}`;
  const instaLink = `https://www.instagram.com/?url=${encodeURIComponent(productLink)}`;
  const fbLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productLink)}`;

  // Prevent default navigation in case of some platforms
  const openLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement={isRTL ? 'bottom-end' : 'bottom-start'}
      transition
      disablePortal={false}
      style={{ zIndex: 1300 }}
    >
      {({ TransitionProps }) => (
        <Grow {...TransitionProps}>
          <Paper elevation={3} sx={{ px: 1, py: 1.5 }}>
            <ClickAwayListener onClickAway={onClose}>
              <MenuList dense disablePadding>
                <MenuItem onClick={() => openLink(waLink)} sx={{ minWidth: 180, justifyContent: 'center' }}>
                  <WhatsAppIcon color="success" sx={{ mr: 1 }} />
                  WhatsApp
                </MenuItem>
                <MenuItem onClick={() => openLink(instaLink)} sx={{ minWidth: 180, justifyContent: 'center' }}>
                  <InstagramIcon color="action" sx={{ mr: 1 }} />
                  Instagram
                </MenuItem>
                <MenuItem onClick={() => openLink(fbLink)} sx={{ minWidth: 180, justifyContent: 'center' }}>
                  <FacebookIcon color="primary" sx={{ mr: 1 }} />
                  Facebook
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

export default SharePopover;