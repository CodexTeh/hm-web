import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Select, MenuItem, FormControl, OutlinedInput, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CircularProgress, IconButton } from '@mui/material';
import { GetProductCatalogs } from '@redux-state/common/selectors';
import { EditProductCatalogLoading } from '@redux-state/common/selectors';
import { editProductCatalog } from '@redux-state/common/action';
import { colorPalette } from '@utils/colorPalette';
import ModalView from '.';


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

const EditCategory = ({
  openEditModal,
  onClose, }) => {
  const dispatch = useDispatch();

  const allProductCatalogs = GetProductCatalogs();
  const editProductCatLoader = EditProductCatalogLoading();

  const arabicProductCatalogs = allProductCatalogs?.filter((item) => item.language === 'ar');
  const englishProductCatalogs = allProductCatalogs?.filter((item) => item.language === 'en');

  const [title, setTitle] = useState('');
  const [arabicTitle, setArabicTitle] = useState('');
  const [prodCatId, setProdCatId] = useState('');
  const [arabicProdCatId, setArabicProdCatId] = useState('');

  const getLabelById = (id, productCatalogs) => {
    const item = productCatalogs.find(item => item.id === id);
    return item ? item.title : null;
  };

  useEffect(() => {
    if (prodCatId) {
      setTitle(getLabelById(prodCatId, englishProductCatalogs))
    }
  }, [prodCatId])

  useEffect(() => {
    if (arabicProdCatId) {
      setArabicTitle(getLabelById(arabicProdCatId, arabicProductCatalogs))
    }
  }, [arabicProdCatId])

  const InputTextField = useCallback(
    ({ label, value, setValue, disabled = false }) => {
      return (
        <Box sx={{ marginTop: 3 }}>
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
    []
  );

  const updateCategory = () => {
    const englishProdCat = { id: prodCatId, title: title };
    const arabicProdCat = { id: arabicProdCatId, title: arabicTitle };

    // Check for conditions to dispatch actions
    const shouldUpdateEnglish = prodCatId && title;
    const shouldUpdateArabic = arabicProdCatId && arabicTitle;

    if (shouldUpdateEnglish && shouldUpdateArabic) {
      // Update both English and Arabic categories
      dispatch(editProductCatalog(englishProdCat));
      dispatch(editProductCatalog(arabicProdCat));
    } else if (shouldUpdateEnglish) {
      // Update only English category
      dispatch(editProductCatalog(englishProdCat));
    } else if (shouldUpdateArabic) {
      // Update only Arabic category
      dispatch(editProductCatalog(arabicProdCat));
    } else {
      alert("Please fill at least one field");
      return; // Exit if no valid input
    }

    // Clear fields after dispatching
    setTitle(null);
    setProdCatId(null);
    setArabicTitle(null);
    setArabicProdCatId(null);
  };

  const InputProdCatSelectField = useCallback(
    ({ label, value, setValue, productCatalogs, enableText }) => {
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
              {productCatalogs.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.title} ({item.type})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      );
    },
    []
  );

  const CategoriesView = () => {
    return (
      <StyledMainBox>
        <StyledHeaderTypography>
          Edit Product Catalog
        </StyledHeaderTypography>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 6, paddingRight: 6 }}>
          <Box sx={{ marginRight: 10 }}>
            <InputProdCatSelectField
              label={'Select Parent Category:'}
              enableText={'Unselect'}
              productCatalogs={englishProductCatalogs}
              value={prodCatId}
              setValue={setProdCatId}
            />
            {prodCatId && <InputTextField
              label={'Product Catalog:'}
              value={title}
              setValue={setTitle}
            />}
          </Box>
          <Box>
            <div dir="rtl">
              <InputProdCatSelectField
                label={'اختر الفئة:'}
                enableText={'قم بإلغاء التحديد'}
                productCatalogs={arabicProductCatalogs}
                value={arabicProdCatId}
                setValue={setArabicProdCatId}
              />
            </div>
            {arabicProdCatId && <div dir="rtl">
              <InputTextField
                label={'فئة:'}
                value={arabicTitle}
                setValue={setArabicTitle}
              />
            </div>}
          </Box>
        </Box>
        <StyledFooterBox>
          <StyledSaveButton disabled={editProductCatLoader} variant='contained' onClick={updateCategory}>
            {editProductCatLoader ?
              <CircularProgress color="inherit" size={20} />

              : "Save Changes"}
          </StyledSaveButton>
        </StyledFooterBox>
      </StyledMainBox >

    );
  };

  return (
    <ModalView
      content={CategoriesView} open={openEditModal} close={onClose}
    />
  );
};

export default EditCategory;
