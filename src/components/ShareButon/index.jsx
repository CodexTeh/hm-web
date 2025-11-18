import React from "react";
import {
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  Box,
} from "@mui/material";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";

const SharePopover = ({
  anchorEl,
  open,
  onClose,
  productLink,
  title,
  isRTL,
}) => {
  const caption = `${productLink}`;
  // const encodedText = encodeURIComponent(caption);
  
  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement={isRTL ? "bottom-end" : "bottom-start"}
      transition
      disablePortal={false}
      style={{ zIndex: 1300 }}
    >
      {({ TransitionProps }) => (
        <Grow {...TransitionProps}>
          <Paper elevation={3} sx={{ p: 1.5 }}>
            <ClickAwayListener onClickAway={onClose}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                <FacebookShareButton  url={productLink}>
                  <FacebookIcon size={32} round />
                </FacebookShareButton>

                <TwitterShareButton style={{ margin: 5 }} url={productLink} title={title}>
                  <XIcon size={32} round />
                </TwitterShareButton>
                <WhatsappShareButton
                  url={caption}
                  title={title}
                  separator=":: "
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              </Box>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

export default SharePopover;
