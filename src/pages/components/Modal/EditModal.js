import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { CircularProgress, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { editProduct } from '@redux-state/actions';
import { GetEditProductLoading } from '@redux-state/common/selectors';
import { UploadIcon } from '../../assets/icons/UploadIcon';
import { colorPalette } from '../../utils/colorPalette';
import ModalView from '../Modal';

const StyledMainBox = styled(Box)({
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '30px',
  width: '610px',
});

const StyledHeaderTypography = styled(Typography)({
  color: '#333 ',
  fontSize: '23px ',
  fontWeight: '600',
  textAlign: 'center',
});

const StyledUploadBox = styled(Box)({
  alignSelf: 'center',
});

const StyledUploadTextButton = styled(Button)({
  color: '#632DDD',
  fontWeight: '600',
  textTransform: 'none'
});

const StyledUploadIcon = styled(UploadIcon)({
  marginRight: '6px'
});

const StyledDescriptionTypography = styled(Typography)({
  color: '#333 ',
  fontSize: '12px ',
  fontWeight: '700',
  paddingBottom: '3px',
  width: '50%',
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
  justifyContent: 'space-between',
  margin: 15,
  width: '90%'
});

export const StyledGenerateButtonContainer = styled(Box)({
  alignSelf: 'center',
  display: 'grid',
  margin: 'auto'
});

export const StyledIconButten = styled(IconButton)({
  backgroundColor: colorPalette.white,
  borderRadius: '.375rem',
  justifyContent: 'center',
  marginLeft: '.375rem',
  minHeight: '3.25rem',
  minWidth: '3.25rem',
  padding: '.5rem'
});

export const StyledGenerateImageText = styled(Typography)({
  color: colorPalette.spanishGray,
  fontSize: '18px',
  fontWeight: 600
});

const StyledCancelButton = styled(Button)({
});

const StyledSaveButton = styled(Button)({
  fontWeight: 'bold',
});

const EditModal = ({ data,
  openEditModal,
  onClose,
  pagination }) => {

  const loading = GetEditProductLoading();

  const [category, setCategory] = useState(data.category);
  const [name, setName] = useState(data.name);
  const [price, setPrice] = useState(data.price);
  const [qtyOnHand, setQtyOnHand] = useState(data.qty_onhand);
  const [tax, setTax] = useState(data.tax);
  const [images, setImages] = useState([]);

  const MAX_FILE_SIZE_KB = 400; // Maximum file size in KB

  const dispatch = useDispatch();

  const updateProduct = () => {
    dispatch(editProduct(data._id, { category, name, price, qtyOnHand, tax, images }, pagination))
  }


  useEffect(() => {
    if (data?.imageUrls?.length > 0) {
      const formattedImages = data?.imageUrls?.map((imageUrl) => ({
        contentType: 'image/jpeg', // Assume default content type or fetch dynamically
        title: imageUrl?.split('/').pop(), // Extract the image name from URL
        url: imageUrl,
        file: null // No file object for backend images
      }));
      setImages(formattedImages);
    }
  }, [data.imageUrls]);

  const removeImage = (key) => {
    // Remove the object with the matching id
    const updatedImages = images.filter((image, index) => index !== key);

    // Set the new state by adding new images
    setImages([...updatedImages]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,
    maxFiles: 5,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/gif': ['.gif'],
      'image/svg+xml': ['.svg']
    },
    onDrop: (files) => {
      if (images?.length !== 4 && images?.length + files?.length < 5) {
        const validFiles = files.filter(file => file.size <= MAX_FILE_SIZE_KB * 1024);
        if (validFiles.length !== files.length) {
          alert(`Some files were too large and have been ignored. Maximum size is ${MAX_FILE_SIZE_KB} KB.`);
        }

        if (validFiles.length > 0) {
          const newImages = validFiles?.map((file) => ({
            contentType: file.type,
            title: file.name,
            file: file,
            url: URL.createObjectURL(file)
          }));

          setImages([...images, ...newImages]); // Append new images
        }
      } else {
        alert('You cannot select more than 4 images.');
      }
    }
  });

  const InputTextField = useCallback(
    ({ label, value, setValue }) => {
      return (
        <Box>
          <StyledDescriptionTypography>{label}</StyledDescriptionTypography>
          <StyledDescriptionFieldText
            size='small'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></StyledDescriptionFieldText>
        </Box>
      );
    },
    []
  );

  const EditModalView = () => {
    return (
      <StyledMainBox>
        <StyledHeaderTypography>
          Edit
        </StyledHeaderTypography>

        <Box
          {...getRootProps()}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            border: `2px dashed ${colorPalette.purpleBlue}`,
            padding: '20px',
            margin: 2,
            height: 10,
            cursor: 'pointer',
            backgroundColor: isDragActive ? colorPalette.lightGrey : colorPalette.whisper
          }}
        >
          <input {...getInputProps()} />
          <StyledUploadBox>
            <StyledUploadTextButton>
              <StyledUploadIcon />
              Drag & drop some files here, or click to select files
            </StyledUploadTextButton>
          </StyledUploadBox>
        </Box>
        {images?.length > 0 &&
          <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            {images.map((item, index) => (
              <React.Fragment key={index}>
                <Box onClick={() => removeImage(index)} sx={{ width: 20, height: 20, position: 'relative', left: 15, top: -2, zIndex: 20, border: '1px solid #555', borderRadius: 20, background: 'white', cursor: 'pointer' }}>
                  <Close sx={{ width: 18, height: 18 }} />
                </Box>
                <img
                  style={{ border: '1px solid #555' }}
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  width={120}
                  height={120}
                />
              </React.Fragment>
            ))}
          </Box>
        }
        <InputTextField
          label={'Name:'}
          value={name}
          setValue={setName}
        />
        <InputTextField
          label={'Category:'}
          value={category}
          setValue={setCategory}
        />
        <InputTextField
          label={'Price:'}
          value={price}
          setValue={setPrice}
        />
        <InputTextField
          label={'Quantity:'}
          value={qtyOnHand}
          setValue={setQtyOnHand}
        />
        <InputTextField
          label={'Tax:'}
          value={tax}
          setValue={setTax}
        />
        <StyledFooterBox>
          <StyledCancelButton onClick={() => onClose()}>Cancel</StyledCancelButton>
          <StyledSaveButton disabled={loading} variant='contained' onClick={() => updateProduct()}>
            {loading ?
              <CircularProgress color="inherit" size={20} />

              : "Save Changes"}
          </StyledSaveButton>
        </StyledFooterBox>
      </StyledMainBox >
    )
  }

  return (
    <ModalView
      content={EditModalView} open={openEditModal} close={onClose}
    />
  );
};

export default EditModal;
