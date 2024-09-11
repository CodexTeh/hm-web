import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { UploadIcon } from '../../assets/icons/UploadIcon';
import ModalView from '../Modal';
import { colorPalette } from '../../utils/colorPalette';
import { editProduct } from '../../../redux-state/actions';

const StyledMainBox = styled(Box)({
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
  display: 'flex',
  flexDirection: 'column',
  height: 'auto',
  padding: '20px',
  paddingLeft: '62.5px',
  paddingTop: '40px',
  width: '610px'
});

const StyledHeaderTypography = styled(Typography)({
  color: '#333!important',
  fontSize: '23px!important',
  fontWeight: '600!important',
  paddingBottom: '0px',
  textAlign: 'center',
  width: '489px'
});

const StyledUploadBox = styled(Box)({
  alignItems: 'center',
  display: 'flex',
  gap: '4px',
  marginTop: '6px',
  paddingBottom: '0px',
  width: '100 %'
});

const StyledImageTextTypography = styled(Typography)({
  color: '#333!important',
  fontSize: '14px!important',
  fontWeight: '700!important',
  width: '55%'
});

const StyledUploadTextButton = styled(Button)({
  color: '#632DDD',
  fontWeight: '600!important',
  textTransform: 'none'
});

const StyledUploadIcon = styled(UploadIcon)({
  marginRight: '6px'
});

const StyledBodyBox = styled(Box)({
  color: '#666',
  fontSize: '14px',
  marginBottom: '4px',
  overflow: 'hidden'
});

const StyledImage = styled('img')({
  borderRadius: '8px',
  maxHeight: '100%',
  maxWidth: '100%'
});

const StyledBold = styled('b')({
  fontSize: '16px!important',
  fontWeight: '700!important'
});

const StyledDescriptionTypography = styled(Typography)({
  color: '#333!important',
  fontSize: '14px!important',
  fontWeight: '700!important',
  paddingBottom: '3px',
  width: '50 %',
  marginTop: 5,
});

const StyledDescriptionFieldText = styled(TextField)({
  borderRadius: '8px',
  marginTop: 5,
  width: '489px'
});


const StyledFooterBox = styled(Box)({
  alignItems: 'center',
  display: 'flex',
  gap: '4px',
  justifyContent: 'space-between',
  marginBottom: '10px',
  marginLeft: '20px',
  marginTop: '5px',
  width: '460px'
});

const StyledCancelButton = styled(Button)({
  backgroundColor: '#E4CCFF!important',
  borderRadius: '30px!important',
  color: '#632DDD!important',
  fontSize: '14px!important',
  fontWeight: 'bold',
  height: '45px',
  marginRight: '8px',
  outline: 'none',
  padding: '8px 0px!important',
  width: '140px'
});

const StyledSaveButton = styled(Button)({
  borderRadius: '30px!important',
  color: colorPalette.bloodRed,
  fontSize: '14px !important',
  fontWeight: 'bold',
  height: '45px',
  marginRight: '8px',
  outline: 'none',
  padding: '8px 0px!important',
  width: '140px'
});

const EditModal = ({ data,
  openEditModal,
  onClose,
  pagination }) => {
  const { getRootProps } = useDropzone({
    multiple: false,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/gif': ['.gif'],
      'image/svg+xml': ['.svg']
    }
  });
  

  const [category, setCategory] = useState(data.category);
  const [name, setName] = useState(data.name);
  const [price, setPrice] = useState(data.price);
  const [qtyOnHand, setQtyOnHand] = useState(data.qty_onhand);
  const [tax, setTax] = useState(data.tax);

  const dispatch = useDispatch();

  const updateProduct = () => {
    dispatch(editProduct(data._id, { category, name, price, qtyOnHand, tax  }))
  }

  const EditModalView = () => {
    return (
      <StyledMainBox>
        <StyledHeaderTypography>
          Edit
        </StyledHeaderTypography>
        <StyledUploadBox>
          <StyledImageTextTypography>Image</StyledImageTextTypography>
          <StyledUploadTextButton {...getRootProps()}>
            <StyledUploadIcon />
            Upload from your files
          </StyledUploadTextButton>
        </StyledUploadBox>
        {/* <StyledBodyBox>
          <StyledImage src={productImage} />
        </StyledBodyBox> */}
        <StyledDescriptionTypography>Name:</StyledDescriptionTypography>
        <StyledDescriptionFieldText
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></StyledDescriptionFieldText>
        <StyledDescriptionTypography>Category:</StyledDescriptionTypography>
        <StyledDescriptionFieldText
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        ></StyledDescriptionFieldText>
        <StyledDescriptionTypography>Price:</StyledDescriptionTypography>
        <StyledDescriptionFieldText
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        ></StyledDescriptionFieldText>
        <StyledDescriptionTypography>Quantity:</StyledDescriptionTypography>
        <StyledDescriptionFieldText
          value={qtyOnHand}
          onChange={(e) => setQtyOnHand(e.target.value)}
        ></StyledDescriptionFieldText>
        <StyledDescriptionTypography>Tax:</StyledDescriptionTypography>
        <StyledDescriptionFieldText
          value={tax}
          onChange={(e) => setTax(e.target.value)}
        ></StyledDescriptionFieldText>
        <StyledFooterBox>
          <StyledCancelButton onClick={() => onClose()}>Cancel</StyledCancelButton>
          <StyledSaveButton onClick={() => updateProduct()}>
            Save Changes
          </StyledSaveButton>
        </StyledFooterBox>
      </StyledMainBox>
    )
  }

  return (
    <ModalView
      content={EditModalView} open={openEditModal} close={onClose}
    />
  );
};

export default EditModal;
