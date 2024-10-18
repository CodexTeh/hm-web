import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Select, MenuItem, FormControl, OutlinedInput } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CircularProgress, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { UploadIcon } from '@assets/icons/UploadIcon';
import { editProduct } from '@redux-state/actions';
import { GetEditProductLoading, GetCategories } from '@redux-state/common/selectors';
import { colorPalette } from '@utils/colorPalette';

import ModalView from '.';

const StyledMainBox = styled(Box)({
  backgroundColor: colorPalette.white,
  borderRadius: '8px',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '30px',
  maxHeight: '90vh',
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
});

const StyledUploadBox = styled(Box)({
  alignSelf: 'center',
});

const StyledUploadTextButton = styled(Button)({
  color: colorPalette.black,
  fontWeight: '600',
  textTransform: 'none'
});

const StyledUploadIcon = styled(UploadIcon)({
  marginRight: '6px',
});

const StyledDescriptionTypography = styled(Typography)({
  color: colorPalette.black,
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

  const allCategories = GetCategories();

  const arabicCategories = allCategories.filter((item) => item.language === 'ar');
  const categories = allCategories.filter((item) => item.language === 'en');


  const filterCategory = (categories, categoryValue) => {
    return categories.filter((categoryObj) => categoryObj.category.label === categoryValue)
      .map((categoryObj) => categoryObj.category)[0];
  };

  const filterSubcategoryByLabel = (categories, subcategoryLabel, categoryValue) => {
    const category = categories?.find(cat => cat.category.label === categoryValue?.label);

    if (!category) {
      return null; // Return null if the category is not found
    }

    // Then, find the subcategory with the matching value within the filtered category
    const subcategory = category.subcategories.find(sub => sub.label === subcategoryLabel);

    return subcategory;
  };

  const filterSubcategoryByValue = (categories, subcategoryValue, categoryValue) => {
    const category = categories?.find(cat => cat.category.label === categoryValue?.label);

    if (!category) {
      return null; // Return null if the category is not found
    }

    // Then, find the subcategory with the matching value within the filtered category
    const subcategory = category.subcategories.find(sub => sub.value === subcategoryValue);

    return subcategory;
  };

  const filterSubcategory = (categories, subcategoryValue, categoryValue) => {
    const category = categories.find(cat => cat.category.label === categoryValue.label);
    if (!category) {
      return null; // Return null if the category is not found
    }

    // Then, find the subcategory with the matching value within the filtered category
    const subcategory = category.subcategories.find(sub => sub.value === subcategoryValue?.value ? subcategoryValue?.value : subcategoryValue);

    return subcategory;
  };


  const [name, setName] = useState(data.name);
  const [arabicName, setArabicName] = useState(data.arabicName || '');
  const [description, setDescription] = useState(data.description);
  const [arabicDescription, setArabicDescription] = useState(data.arabicDescription || '');
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState(filterCategory(categories, data.category));
  const [arabicCategory, setArabicCategory] = useState(filterCategory(arabicCategories, data.arabicCategory));
  const [subCategory, setSubCategory] = useState(filterSubcategoryByLabel(categories, data.subCategory, category));
  const [arabicSubCategory, setArabicSubCategory] = useState(filterSubcategoryByLabel(arabicCategories, data.arabicSubCategory, arabicCategory));

  const handleCategoryChange = (value, setCategory, categories) => {
    setCategory(categories.filter(category => category.category.value === value)
      .map((categoryObj) => categoryObj.category)[0]);
  };

  const MAX_FILE_SIZE_KB = 400; // Maximum file size in KB

  const dispatch = useDispatch();

  const updateProduct = () => {
    if (name && arabicName && category && subCategory && description &&
      arabicDescription && arabicSubCategory && subCategory) {
      dispatch(editProduct(data.id, {
        category, arabicCategory, subCategory: filterSubcategoryByValue(categories, subCategory, category), arabicSubCategory: filterSubcategoryByValue(arabicCategories, arabicSubCategory, arabicCategory),
        name, arabicName, description, arabicDescription, images
      }, pagination))
    } else {
      alert("Fill all fields!")
    }
  }

  useEffect(() => {
    if (data?.image_urls) {
      const imageUrls = JSON.parse(data?.image_urls.replace(/'/g, '"'));
      if (imageUrls.length > 0) {
        const formattedImages = imageUrls?.map((imageUrl) => ({
          contentType: 'image/jpeg', // Assume default content type or fetch dynamically
          title: imageUrl?.split('/').pop(), // Extract the image name from URL
          url: imageUrl,
          file: null // No file object for backend images
        }));
        setImages(formattedImages);
      }
    }
  }, [data.image_urls]);

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

  const InputSubCatSelectField = useCallback(
    ({ label, value, setValue, category, values }) => {
      const subcategory = values.find(sub => sub.category.label === category.label);
      
      return (
        <Box>
          <StyledDescriptionTypography>{label}</StyledDescriptionTypography>
          <Select
            sx={{ height: 40 }}
            fullWidth
            value={value?.value ?? value}
            onChange={(e) => setValue(e.target.value)}
            label={label}
            input={<OutlinedInput />}
          >
            {subcategory.subcategories.map((subCat, subCatIndex) => (
              <MenuItem key={subCatIndex} value={subCat.value}>
                {subCat.label}
              </MenuItem>))}
          </Select>

        </Box>
      );
    },
    [category]
  );

  const InputCatSelectField = useCallback(
    ({ label, value, setValue, handleCategoryChange, categories }) => {
      return (
        <Box>
          <FormControl fullWidth>
            <StyledDescriptionTypography>{label}</StyledDescriptionTypography>
            <Select
              sx={{ height: 40 }}
              labelId="category-select-label"
              value={value?.value}
              onChange={(e) => handleCategoryChange(e.target.value, setValue, categories)}
              label={label}
              input={<OutlinedInput />}
            >
              {categories.map((category, index) => (
                <MenuItem key={index} value={category.category.value}>
                  {category.category.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      );
    },
    [category]
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
            border: `2px dashed ${colorPalette.orange}`,
            padding: '20px',
            margin: 2,
            height: 80,
            cursor: 'pointer',
            backgroundColor: isDragActive ? colorPalette.orange : colorPalette.whisper
          }}
        >
          <input {...getInputProps()} />
          <StyledUploadBox>
            <StyledUploadTextButton>
              <StyledUploadIcon color />
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
                  style={{ border: '1px solid #555', marginTop: 10 }}
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  width={180}
                  height={180}
                />
              </React.Fragment>
            ))}
          </Box>
        }
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, paddingLeft: 2 }}>
          <Box sx={{ marginRight: 10 }}>
            <InputTextField
              label={'Name:'}
              value={name}
              setValue={setName}
            />
            <InputCatSelectField
              label={'Category:'}
              value={category}
              categories={categories}
              setValue={setCategory}
              handleCategoryChange={handleCategoryChange}
            />
            {category?.value && <InputSubCatSelectField
              label={'Subcategory:'}
              value={subCategory}
              category={category}
              setValue={setSubCategory}
              values={categories}
            />}
            <InputTextField
              label={'Description:'}
              value={description}
              setValue={setDescription}
            />
          </Box>
          <Box>
            <div dir="rtl">
              <InputTextField
                label={'نام:'}
                value={arabicName}
                setValue={setArabicName}
              />
            </div>
            <div dir="rtl">
              <InputCatSelectField
                label={'زمرہ:'}
                categories={arabicCategories}
                value={arabicCategory}
                setValue={setArabicCategory}
                handleCategoryChange={handleCategoryChange}
              />
            </div>
            {arabicCategory?.value &&
              <div dir="rtl">
                <InputSubCatSelectField
                  label={'الفئة الفرعية:'}
                  category={arabicCategory}
                  value={arabicSubCategory}
                  setValue={setArabicSubCategory}
                  values={arabicCategories}
                />
              </div>
            }
            <div dir="rtl">
              <InputTextField
                label={'تفصیل:'}
                value={arabicDescription}
                setValue={setArabicDescription}
              />
            </div>

          </Box>
        </Box>
        {/* <InputTextField
          label={'Quantity:'}
          value={qtyOnHand}
          setValue={setQtyOnHand}
        /> */}
        {/* <InputTextField
          label={'Tax:'}
          value={tax}
          setValue={setTax}
        /> */}
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
