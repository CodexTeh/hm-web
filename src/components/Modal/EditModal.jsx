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
import Close from '@mui/icons-material/Close';
import { UploadIcon } from 'assets/icons/UploadIcon';
import { editProduct } from 'redux-state/actions';
import { GetEditProductLoading, GetCategories } from 'redux-state/common/selectors';
import { colorPalette } from 'utils/colorPalette';

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
  pagination, productCatalogs }) => {

  const {
    en: {
      brand: enBrands = [],
      'available-color': enAvailableColors = [],
      material: enMaterials = [],
      unit: enUnits = [],
      size: enSizes = []
    } = {},
    ar: {
      brand: arBrands = [],
      'available-color': arAvailableColors = [],
      material: arMaterials = [],
      unit: arUnits = [],
      size: arSizes = []
    } = {}
  } = productCatalogs || {};

  const loading = GetEditProductLoading();

  const allCategories = GetCategories();

  const arabicCategories = allCategories.filter((item) => item.language === 'ar');
  const categories = allCategories.filter((item) => item.language === 'en');


  const filterCategory = (categories, categoryValue) => {
    return categories.filter((categoryObj) => categoryObj._id.toString() === categoryValue)
      .map((categoryObj) => categoryObj)[0];
  };

  const filterSubcategoryByUuid = (categories, subcategoryId, categoryValue) => {
    const category = categories?.find(cat => cat?._id === categoryValue?._id);

    if (!category) {
      return null; // Return null if the category is not found
    }

    // Then, find the subcategory with the matching value within the filtered category
    const subcategory = category.subcategories.find(sub => sub._id === subcategoryId);

    return subcategory;
  };

  const [name, setName] = useState(data.name);
  const [arabicName, setArabicName] = useState(data.arabicName || '');
  const [description, setDescription] = useState(data.description);
  const [arabicDescription, setArabicDescription] = useState(data.arabicDescription || '');
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState(filterCategory(categories, data.category));
  const [arabicCategory, setArabicCategory] = useState(filterCategory(arabicCategories, data.arabicCategory));
  const [subCategory, setSubCategory] = useState(filterSubcategoryByUuid(categories, data.subCategory, data.category));
  const [arabicSubCategory, setArabicSubCategory] = useState(filterSubcategoryByUuid(arabicCategories, data.arabicSubCategory, data.arabicCategory));
  const [brand, setBrand] = useState(data.brand || '');
  const [arabicBrand, setArabicBrand] = useState(data.ar_brand || '');
  const [material, setMaterial] = useState(data.material || '');
  const [arabicMaterial, setArabicMaterial] = useState(data.ar_material || '');
  const [size, setSize] = useState(data.size || '');
  const [arabicSize, setArabicSize] = useState(data.ar_size || '');
  const [unit, setUnit] = useState(data.unit || '');
  const [arabicUnit, setArabicUnit] = useState(data.ar_unit || '');
  const [availableColor, setAvailableColor] = useState(data.avalable_color || '');
  const [arabicAvailableColor, setArabicAvailableColor] = useState(data.ar_color || '');
  const [flashSale, setFlashSale] = useState(data.flash_sale || '');
  const [arabicFlashSale, setArabicFlashSale] = useState(data.ar_flash_sale || '');

  useEffect(() => {
    if (category) {
      setArabicCategory(arabicCategories.filter(cat => cat.category?.value === category?.category?.value)
        .map((categoryObj) => categoryObj)[0])
    }
  }, [category])

  useEffect(() => {
    if (arabicCategory) {
      setCategory(categories.filter(cat => cat.category?.value === arabicCategory?.category?.value)
        .map((categoryObj) => categoryObj)[0])
    }
  }, [arabicCategory])

  useEffect(() => {
    if (arabicSubCategory && arabicCategory) {
      const filteredSubCategory = arabicCategory.subcategories.filter(subCat => subCat._id === subCategory)
        .map((subCatObj) => subCatObj)[0]
      const selectSubCat = category.subcategories.filter(subCat => subCat.value === filteredSubCategory?.value)
        .map((subCatObj) => subCatObj)[0]
      if (selectSubCat) {
        setSubCategory(selectSubCat?._id)
      }
    }
  }, [arabicSubCategory])

  useEffect(() => {
    if (subCategory && category) {
      const filteredSubCategory = category.subcategories.filter(subCat => subCat._id === subCategory)
        .map((subCatObj) => subCatObj)[0]
      const selectSubCat = arabicCategory.subcategories.filter(subCat => subCat.value === filteredSubCategory?.value)
        .map((subCatObj) => subCatObj)[0]
      if (selectSubCat) {
        setArabicSubCategory(selectSubCat._id)
      }
    }
  }, [subCategory])

  useEffect(() => {
    if (category) {
      setSubCategory(filterSubcategoryByUuid(categories, data.subCategory, category))
    }
  }, [category])

  useEffect(() => {
    if (arabicCategory) {
      setArabicSubCategory(filterSubcategoryByUuid(arabicCategories, data.arabicSubCategory, arabicCategory))
    }
  }, [arabicCategory])

  useEffect(() => {
    if (arabicBrand && arBrands?.length > 0) {
      const arBrand = arBrands.filter(arbrand => arbrand.id === arabicBrand)
        .map((brand) => brand)[0]

      setBrand(enBrands.filter(brand => brand?.value === arBrand?.value)
        .map((brand) => brand)[0]?.id)
    }
  }, [arabicBrand])

  useEffect(() => {
    if (brand && enBrands?.length > 0) {
      const enBrand = enBrands.filter(enbrand => enbrand.id === brand)
        .map((brand) => brand)[0]

      setArabicBrand(arBrands.filter(brand => brand?.value === enBrand?.value)
        .map((brand) => brand)[0]?.id)
    }
  }, [brand])


  const handleCategoryChange = (value, setCategory, categories) => {
    setCategory(filterCategory(categories, value));
  };

  const MAX_FILE_SIZE_KB = 400; // Maximum file size in KB

  const dispatch = useDispatch();

  const updateProduct = () => {
    if (name && arabicName && category && arabicCategory && description &&
      arabicDescription && arabicSubCategory && subCategory &&
      brand && arabicBrand && material && arabicMaterial && size
      && arabicSize && unit && arabicUnit && availableColor
      && arabicAvailableColor && flashSale && arabicFlashSale) {

      dispatch(editProduct(data.id, {
        category, arabicCategory, subCategory, arabicSubCategory,
        name, arabicName, description, arabicDescription, brand,
        arabicBrand, material, arabicMaterial, size
        , arabicSize, unit, arabicUnit, availableColor
        , arabicAvailableColor, flashSale, arabicFlashSale, images
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
      const subcategory = values.find(sub => sub._id === category._id);
      return (
        <Box>
          <StyledDescriptionTypography>{label}</StyledDescriptionTypography>
          <Select
            sx={{ height: 40 }}
            fullWidth
            value={value?._id ?? value}
            onChange={(e) => setValue(e.target.value)}
            label={label}
            input={<OutlinedInput />}
          >
            {subcategory.subcategories.map((subCat, subCatIndex) => (
              <MenuItem key={subCatIndex} value={subCat._id}>
                {subCat.label}
              </MenuItem>))}
          </Select>

        </Box>
      );
    },
    [category, arabicCategory, subCategory, arabicSubCategory]
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
              value={value?._id}
              onChange={(e) => handleCategoryChange(e.target.value, setValue, categories)}
              label={label}
              input={<OutlinedInput />}
            >
              {categories.map((category, index) => (
                <MenuItem key={index} value={category._id}>
                  {category.category.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      );
    },
    [category, arabicCategory]
  );

  const InputProdCatSelectField = useCallback(
    ({ label, value, setValue, setArabicValue, productCatalogs, enableText }) => {
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
              {productCatalogs?.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
            {category?.category?.value && <InputSubCatSelectField
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
            <InputProdCatSelectField
              label={'Select Brand:'}
              enableText={'Unselect'}
              productCatalogs={enBrands}
              value={brand}
              setValue={setBrand}
              setArabicValue={setArabicBrand}
            />
            <InputProdCatSelectField
              label={'Select Material:'}
              enableText={'Unselect'}
              productCatalogs={enMaterials}
              value={material}
              setValue={setMaterial}
            />
            <InputProdCatSelectField
              label={'Select Size:'}
              enableText={'Unselect'}
              productCatalogs={enSizes}
              value={size}
              setValue={setSize}
            />
            <InputProdCatSelectField
              label={'Select Unit:'}
              enableText={'Unselect'}
              productCatalogs={enUnits}
              value={unit}
              setValue={setUnit}
            />
            <InputProdCatSelectField
              label={'Select Available Color:'}
              enableText={'Unselect'}
              productCatalogs={enAvailableColors}
              value={availableColor}
              setValue={setAvailableColor}
            />
            <InputTextField
              label={'Flash Sale:'}
              value={flashSale}
              setValue={setFlashSale}
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
            {arabicCategory?.category?.value &&
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
            <div dir="rtl">
              <InputProdCatSelectField
                label='اختر العلامة التجارية:'
                enableText={'Unselect'}
                productCatalogs={arBrands}
                value={arabicBrand}
                setValue={setArabicBrand}
              />
            </div>
            <div dir="rtl">
              <InputProdCatSelectField
                label='اختر المادة:'
                enableText={'Unselect'}
                productCatalogs={arMaterials}
                value={arabicMaterial}
                setValue={setArabicMaterial}
              />
            </div>
            <div dir="rtl">
              <InputProdCatSelectField
                label='اختر الحجم:'
                enableText={'Unselect'}
                productCatalogs={arSizes}
                value={arabicSize}
                setValue={setArabicSize}
              />
            </div>
            <div dir="rtl">
              <InputProdCatSelectField
                label='اختر الوحدة:'
                enableText={'Unselect'}
                productCatalogs={arUnits}
                value={arabicUnit}
                setValue={setArabicUnit}
              />
            </div>
            <div dir="rtl">
              <InputProdCatSelectField
                label='حدد الألوان المتاحة:'
                enableText={'Unselect'}
                productCatalogs={arAvailableColors}
                value={arabicAvailableColor}
                setValue={setArabicAvailableColor}
              />
            </div>
            <div dir="rtl">
              <InputTextField
                label='بيع فلاش:'
                value={arabicFlashSale}
                setValue={setArabicFlashSale}
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
