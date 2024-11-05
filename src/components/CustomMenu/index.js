import React, {
  useState,
  useMemo,
  useCallback,
} from 'react';
import {
  styled,
  Box,
  Menu as Menu,
  MenuItem as MenuItem,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditModal from '../Modal/EditModal';

const StyledBox = styled(Box)({
  display: 'flex',
  alignItems: 'center'
});

const CustomMenu = ({
  actions,
  item,
  pagination,
  productCatalogs
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  const open = Boolean(anchorEl);

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [])

  const handleCloseModal = () => {
    setOpenEditModal(false);
  };
  const handleButtonClick = useCallback(
    (button) => {
      handleClose();
      switch (button.class) {
        case 'edit':
          setOpenEditModal(true);
          break;
        default:
          button.onClick();
      }
    },
    [handleClose]
  );

  const mappedActions = useMemo(
    () =>
      actions.map((button, index) => (
        <MenuItem
          key={index}
          onClick={() => {
            handleButtonClick(button);
          }}
        >
          {typeof button.component === 'function'
            ? button.component()
            : button.component}
          <span>{button.label}</span>
        </MenuItem>
      )),
    [actions, handleButtonClick]
  );

  return (
    <>
      <StyledBox>
        <IconButton
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          aria-label="more"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          MenuListProps={{
            'aria-labelledby': 'long-button'
          }}
          open={open}
          onClose={handleClose}
        >
          {mappedActions}
        </Menu>
      </StyledBox>
      {openEditModal && <EditModal
        data={item}
        productCatalogs={productCatalogs}
        openEditModal={openEditModal}
        onClose={handleCloseModal}
        pagination={pagination}
      />}
    </>
  );
};

export { CustomMenu };
