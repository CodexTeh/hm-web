import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Select, MenuItem, FormControl, OutlinedInput, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CircularProgress, IconButton } from '@mui/material';
import { colorPalette } from 'utils/colorPalette';
import EditProductCatalog from 'components/Modal/EditProductCatalog';
import { AddProductCatalogLoading } from 'redux-state/common/selectors';
import { addProductCatalog, getProductCatalog } from '../../redux-state/common/action';


const StyledMainBox = styled(Box)({
  backgroundColor: colorPalette.white,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '8px', // Width of the scrollbar
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: colorPalette.orange, // Color of the scrollbar thumb
    borderRadius: '10px', // Rounded corners for the scrollbar thumb
    border: '2px solid #ffffff', // Adds padding around the scrollbar thumb
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#f1f1f1', // Color of the scrollbar track
    borderRadius: '10px',
  }
});

const StyledHeaderTypography = styled(Typography)({
  color: colorPalette.black,
  fontSize: '23px ',
  fontWeight: '600',
  textAlign: 'center',
  marginTop: 20
});


const StyledDescriptionTypography = styled(Typography)({
  color: colorPalette.black,
  fontSize: '12px ',
  fontWeight: '700',
  paddingBottom: '3px',
  width: '50%',
  marginTop: 5,
});

const StyledFooterBox = styled(Box)({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  margin: 15,
  marginTop: 100
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

const StyledDescriptionFieldText = styled(TextField)({
  borderRadius: '8px',
  marginTop: 5,
  width: '489px'
});

export const StyledGenerateImageText = styled(Typography)({
  color: colorPalette.spanishGray,
  fontSize: '18px',
  fontWeight: 600
});

const StyledSaveButton = styled(Button)({
  fontWeight: 'bold',
});

const ProductCatalog = () => {

  const addProdCatLoader = AddProductCatalogLoading();

  const [openEditModal, setOpenEditModal] = useState(false);
  const [title, setTitle] = useState('');
  const [arabicTitle, setArabicTitle] = useState('');
  const [type, setType] = useState();

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    setOpenEditModal(false);
  };

  // useEffect(() => {
  //   dispatch(getProductCatalog());
  // }, [])



  const types = [
    {
      value: 1, label: "brand"
    },
    {
      value: 2, label: "material"
    },
    {
      value: 3, label: "available-color"
    },
    { value: 4, label: "unit" },
    {
      value: 5, label: "size"
    }
  ]

  const getLabelByValue = (value) => {
    const type = types.find(type => type.value === value);
    return type ? type.label : null;
  };


  const InputTextField = useCallback(
    ({ label, value, setValue, disabled = false }) => {
      return (
        <Box>
          <StyledDescriptionTypography>{label}</StyledDescriptionTypography>
          <StyledDescriptionFieldText
            disabled={disabled}
            size='small'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></StyledDescriptionFieldText>
        </Box>
      );
    },
    [type]
  );

  const addCategory = () => {
    const value = Math.floor(Math.random() * 1000);
    if (title && arabicTitle && type) {
      const englishProductCatalog = {
        title: title,
        language: "en",
        type: getLabelByValue(type),
        value: value
      }

      const arabicProductCatalog = {
        title: arabicTitle,
        language: "ar",
        type: getLabelByValue(type),
        value
      }
      dispatch(addProductCatalog(englishProductCatalog))
      dispatch(addProductCatalog(arabicProductCatalog))
      setTitle(null)
      setArabicTitle(null)
      setType(null)
    } else {
      alert("Fill all fields")
    }
  }

  const InputTypeSelectField = useCallback(
    ({ label, value, setValue, values, enableText }) => {
      return (
        <Box sx={{ width: '489px' }}>
          <FormControl fullWidth>
            <StyledDescriptionTypography>{label}</StyledDescriptionTypography>
            <Select
              sx={{ height: 40 }}
              labelId="category-select-label"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              label={label}
              fullWidth
              input={<OutlinedInput />}
            >
              <MenuItem onClick={() => {
                setValue(null)
              }}>
                {enableText}
              </MenuItem>
              {values.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      );
    },
    [title, arabicTitle]
  );


  return (
    <StyledMainBox>
      <StyledHeaderTypography>
        Add Product Catalog
      </StyledHeaderTypography>
      <Box sx={{ marginTop: 5 }}>
        <InputTypeSelectField
          label={'Select Catalog Type:'}
          enableText={'Unselect'}
          value={type}
          values={types}
          setValue={setType}
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, paddingLeft: 0 }}>
        <Box sx={{ marginRight: 10 }}>
          <InputTextField
            label={'Catalog Title:'}
            value={title}
            setValue={setTitle}
          />
        </Box>
        <Box>
          <div dir="rtl">
            <InputTextField
              label='عنوان الكتالوج:'
              value={arabicTitle}
              setValue={setArabicTitle}
            />
          </div>
        </Box>
      </Box>
      <StyledFooterBox>
        <StyledSaveButton disabled={addProdCatLoader} variant='contained' onClick={() => addCategory()}>
          {addProdCatLoader ?
            <CircularProgress color="inherit" size={20} />

            : "Save Changes"}
        </StyledSaveButton>
        <StyledSaveButton sx={{ marginTop: 5 }} disabled={addProdCatLoader} variant='contained' onClick={() => setOpenEditModal(true)}>
          Edit Product Catalog
        </StyledSaveButton>
      </StyledFooterBox>
      {openEditModal && <EditProductCatalog
        openEditModal={openEditModal}
        onClose={handleCloseModal}
      />}
    </StyledMainBox >

  );
};

export default ProductCatalog;
