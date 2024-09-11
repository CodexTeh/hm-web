import * as React from 'react';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

const ModalView = ({ content, open, close }) => {
  return (
    <Modal
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={close}
    >
      <Fade in={open}>
        {content()}
      </Fade>
    </Modal>
  );
}
export default ModalView;
